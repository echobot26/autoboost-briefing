import https from 'https';
import http from 'http';

const CAR_BRANDS = [
  'VW', 'Volkswagen', 'Audi', 'BMW', 'Mercedes-Benz', 'Mercedes', 'Skoda', 'SEAT', 'Cupra',
  'Porsche', 'Opel', 'Ford', 'Renault', 'Peugeot', 'Citroen', 'Fiat', 'Toyota', 'Hyundai',
  'Kia', 'Mazda', 'Nissan', 'Volvo', 'Jaguar', 'Land Rover', 'MINI', 'Alfa Romeo', 'Jeep',
  'Tesla', 'BYD', 'MG', 'Dacia', 'Mitsubishi', 'Suzuki', 'Honda', 'Subaru', 'Lexus',
  'Smart', 'Genesis'
];

const GERMAN_CITIES = [
  'Berlin', 'Hamburg', 'München', 'Munich', 'Köln', 'Cologne', 'Frankfurt', 'Stuttgart',
  'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen', 'Bremen', 'Dresden', 'Hannover', 'Nuremberg',
  'Nürnberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster', 'Karlsruhe',
  'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen', 'Mönchengladbach', 'Braunschweig',
  'Chemnitz', 'Aachen', 'Kiel', 'Halle', 'Magdeburg', 'Freiburg', 'Krefeld', 'Mainz',
  'Lübeck', 'Erfurt', 'Oberhausen', 'Rostock', 'Kassel', 'Hagen', 'Hamm', 'Saarbrücken',
  'Mülheim', 'Potsdam', 'Leverkusen', 'Osnabrück', 'Heidelberg', 'Darmstadt', 'Regensburg',
  'Ingolstadt', 'Würzburg', 'Fürth', 'Ulm', 'Heilbronn', 'Pforzheim', 'Wolfsburg',
  'Offenbach', 'Göttingen', 'Bottrop', 'Reutlingen', 'Koblenz', 'Bremerhaven', 'Erlangen',
  'Trier', 'Jena', 'Moers', 'Siegen', 'Hildesheim', 'Cottbus', 'Salzgitter', 'Kaiserslautern'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AutoBoostBot/1.0)',
        'Accept': 'text/html',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function extractPhone(html) {
  const text = html.replace(/<[^>]+>/g, ' ');
  const patterns = [
    /(\+49[\s\-\.]?\d{3,4}[\s\-\.]?\d{3,8})/g,
    /(0\d{2,4}[\s\-\/]?\d{3,8}(?:[\s\-\/]\d{1,5})?)/g,
  ];
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      return matches[0].trim();
    }
  }
  return '';
}

function extractCompany(html) {
  const ogMatch = html.match(/<meta[^>]+property="og:site_name"[^>]+content="([^"]+)"/i);
  if (ogMatch) return ogMatch[1];
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1]
      .replace(/\s*[-|–]\s*.+$/, '')
      .trim();
  }
  return '';
}

function extractBrands(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const found = new Set();
  for (const brand of CAR_BRANDS) {
    const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text)) {
      if (brand.toLowerCase() === 'mercedes' && !found.has('Mercedes-Benz')) {
        const mbRegex = /Mercedes[\s-]Benz/i;
        found.add(mbRegex.test(text) ? 'Mercedes-Benz' : 'Mercedes');
      } else if (brand !== 'Mercedes') {
        found.add(brand);
      }
    }
  }
  if (found.has('Mercedes') && found.has('Mercedes-Benz')) {
    found.delete('Mercedes');
  }
  if (found.has('VW') && found.has('Volkswagen')) {
    found.delete('VW');
  }
  return Array.from(found).slice(0, 15);
}

function extractCities(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const found = new Set();
  for (const city of GERMAN_CITIES) {
    const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text)) {
      if (city === 'Munich') found.add('München');
      else if (city === 'Cologne') found.add('Köln');
      else found.add(city);
    }
  }
  return Array.from(found).slice(0, 10);
}

function extractSegments(html) {
  const text = html.replace(/<[^>]+>/g, ' ').toLowerCase();
  const segments = [];
  if (/gewerbe|firmenwagen|b2b|geschäftskunden/.test(text)) segments.push('gewerbe');
  if (/flotte|fuhrpark|flottenmanagement/.test(text)) segments.push('flotte');
  if (/privatkunden|privat|b2c/.test(text)) segments.push('b2c');
  if (segments.length === 0) segments.push('b2c');
  return segments;
}

export const handler = async (event) => {
  const domain = event.queryStringParameters && event.queryStringParameters.domain;

  if (!domain) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'domain parameter required' }),
    };
  }

  try {
    const url = domain.startsWith('http') ? domain : `https://${domain}`;
    const html = await fetchUrl(url);

    const result = {
      company: extractCompany(html),
      phone: extractPhone(html),
      brands: extractBrands(html),
      cities: extractCities(html),
      segments: extractSegments(html),
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error('Scrape error:', err.message);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ company: '', phone: '', brands: [], cities: [], segments: [] }),
    };
  }
};
