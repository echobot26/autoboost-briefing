import { google } from 'googleapis';

const SHEET_ID = '1cET-7BqT5k8r5mUL2wczPzLGAnQFSRmKjXy5AwJ0ufs';
const SHEET_NAME = 'Briefings';

const HEADERS = [
  'Timestamp', 'Unternehmensname', 'Website', 'Ansprechpartner', 'Email',
  'Telefon', 'Marken', 'Standorte', 'Segmente', 'Hauptziel', 'ZielROAS',
  'LeadZiel', 'KPIs', 'Tagesbudget', 'BudgetTyp', 'Module',
  'Starttermin', 'LaufendeKampagnen', 'SaisonalesBesonderes', 'Anmerkungen'
];

async function getAuth() {
  const saKeyB64 = process.env.GOOGLE_SA_KEY;
  if (!saKeyB64) throw new Error('GOOGLE_SA_KEY environment variable not set');
  const saKey = JSON.parse(Buffer.from(saKeyB64, 'base64').toString('utf8'));
  return new google.auth.GoogleAuth({
    credentials: saKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

async function ensureSheetExists(sheets) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const sheetsList = meta.data.sheets || [];
  const exists = sheetsList.some(s => s.properties.title === SHEET_NAME);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [{
          addSheet: {
            properties: { title: SHEET_NAME }
          }
        }]
      }
    });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    });
  } else {
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:T1`,
    });
    if (!headerCheck.data.values || headerCheck.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [HEADERS] },
      });
    }
  }
}

export const handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ success: false, error: 'Method not allowed' }) };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    await ensureSheetExists(sheets);

    const row = [
      new Date().toISOString(),
      data.unternehmensname || '',
      data.website || '',
      data.ansprechpartner || '',
      data.email || '',
      data.telefon || '',
      (data.marken || []).join(', '),
      (data.standorte || []).join(', '),
      (data.segmente || []).join(', '),
      data.hauptziel || '',
      data.zielRoas || '',
      data.leadZiel || '',
      (data.kpis || []).join(', '),
      data.tagesbudget ? `€${data.tagesbudget}/Tag` : '',
      data.budgetType || '',
      (data.module || []).join(', '),
      data.starttermin || '',
      data.laufendeKampagnen || '',
      data.saisonalesBesonderes || '',
      data.anmerkungen || '',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Submit error:', err.message);
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
