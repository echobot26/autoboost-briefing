export interface FormData {
  // Step 1
  unternehmensname: string;
  website: string;
  ansprechpartner: string;
  email: string;
  telefon: string;

  // Step 2
  marken: string[];

  // Step 3
  standorte: string[];

  // Step 4
  segmente: string[];

  // Step 5
  hauptziel: 'leads' | 'roas' | 'sichtbarkeit' | '';
  zielRoas: string;
  leadZiel: string;
  kpis: string[];

  // Step 6
  tagesbudget: string;
  budgetType: 'flexibel' | 'fix' | '';

  // Step 7
  module: string[];

  // Step 8
  starttermin: string;
  laufendeKampagnen: 'ja' | 'nein' | '';
  saisonalesBesonderes: string;
  anmerkungen: string;
}

export interface ScrapeResult {
  company: string;
  phone: string;
  brands: string[];
  cities: string[];
  segments: string[];
}
