exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch(e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!payload.dealer?.email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'dealer.email required' }) };
  }

  const SHEET_ID = '1JNMrsv7H2j3ptKAUAQm7_SjB6cgqb-smpcANx2LHPzU';
  const SA_JSON = process.env.GOOGLE_SA_JSON;

  if (!SA_JSON) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing GOOGLE_SA_JSON env var' }) };
  }

  try {
    const sa = JSON.parse(SA_JSON);

    // Get OAuth2 token via JWT
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    };

    // Build JWT manually using Node.js crypto
    const crypto = require('crypto');
    const base64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    const headerB64 = base64url(header);
    const claimB64 = base64url(claimSet);
    const sigInput = `${headerB64}.${claimB64}`;
    
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(sigInput);
    const sig = sign.sign(sa.private_key, 'base64url');
    const jwt = `${sigInput}.${sig}`;

    // Exchange JWT for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      throw new Error('No access token: ' + JSON.stringify(tokenData));
    }
    const token = tokenData.access_token;

    // Append row to sheet
    const d = payload;
    const row = [
      d.timestamp || new Date().toISOString(),
      d.dealer.name || '',
      d.dealer.company || '',
      d.dealer.email || '',
      d.dealer.phone || '',
      d.dealer.city || '',
      d.inputs?.paket || '',
      d.inputs?.portalName || '',
      d.inputs?.portalSpend || '',
      d.inputs?.portalCPL || '',
      d.inputs?.googleBudget || '',
      d.inputs?.googleCPL || '',
      d.results?.portalLeads || '',
      d.results?.googleLeads || '',
      d.results?.allIn || '',
      d.results?.portalEquiv || '',
      d.results?.saving || '',
      d.results?.savingYear || ''
    ];

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Rechner-Daten!A:R:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: [row] })
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.text();
      throw new Error('Sheets append failed: ' + err);
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };

  } catch(e) {
    console.error('save-calc error:', e.message);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: e.message })
    };
  }
};
