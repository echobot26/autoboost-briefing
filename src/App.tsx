import { useState, useEffect } from 'react';
import type { FormData, ScrapeResult } from './types';
import { ProgressBar } from './components/ProgressBar';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';
import { Step6 } from './steps/Step6';
import { Step7 } from './steps/Step7';
import { Step8 } from './steps/Step8';

const TOTAL_STEPS = 8;

const initialFormData: FormData = {
  unternehmensname: '',
  website: '',
  ansprechpartner: '',
  email: '',
  telefon: '',
  marken: [],
  standorte: [],
  segmente: [],
  hauptziel: '',
  zielRoas: '',
  leadZiel: '',
  kpis: [],
  tagesbudget: '',
  budgetType: '',
  module: ['search', 'pmax'],
  starttermin: '',
  laufendeKampagnen: '',
  saisonalesBesonderes: '',
  anmerkungen: '',
};

const STEP_TITLES = [
  'Kundeninformationen',
  'Marken & Modelle',
  'Standorte',
  'Kundensegmente',
  'Ziele & KPIs',
  'Budget',
  'Kampagnen-Module',
  'Timing & Abschluss',
];

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const domain = params.get('domain');
    if (domain) {
      const website = domain.startsWith('http') ? domain : `https://${domain}`;
      setFormData(prev => ({ ...prev, website }));
      scrapeWebsite(domain);
    }
  }, []);

  const scrapeWebsite = async (domain: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/.netlify/functions/scrape?domain=${encodeURIComponent(domain)}`);
      if (res.ok) {
        const data: ScrapeResult = await res.json();
        setFormData(prev => ({
          ...prev,
          unternehmensname: data.company || prev.unternehmensname,
          telefon: data.phone || prev.telefon,
          marken: data.brands.length > 0 ? data.brands : prev.marken,
          standorte: data.cities.length > 0 ? data.cities : prev.standorte,
          segmente: data.segments.length > 0 ? data.segments : prev.segmente,
        }));
      }
    } catch (e) {
      console.log('Scrape failed, continuing without pre-fill');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(data.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      }
    } catch (e) {
      setSubmitError('Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Vielen Dank!</h1>
            <p className="text-gray-300 text-lg">
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
          <div className="p-4 bg-card border border-gray-700 rounded-xl text-left space-y-2">
            <p className="text-sm text-gray-400">📋 <strong className="text-gray-200">Zusammenfassung:</strong></p>
            <p className="text-sm text-gray-300">Unternehmen: <span className="text-white">{formData.unternehmensname || '–'}</span></p>
            <p className="text-sm text-gray-300">Marken: <span className="text-white">{formData.marken.join(', ') || '–'}</span></p>
            <p className="text-sm text-gray-300">Budget: <span className="text-white">{formData.tagesbudget ? `€${formData.tagesbudget}/Tag` : '–'}</span></p>
          </div>
          <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
            <p className="text-sm text-gray-300">
              Bei Fragen: <a href="mailto:claire@echomotion.ai" className="text-accent hover:underline">claire@echomotion.ai</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 data={formData} onChange={updateFormData} loading={loading} />;
      case 2: return <Step2 data={formData} onChange={updateFormData} />;
      case 3: return <Step3 data={formData} onChange={updateFormData} />;
      case 4: return <Step4 data={formData} onChange={updateFormData} />;
      case 5: return <Step5 data={formData} onChange={updateFormData} />;
      case 6: return <Step6 data={formData} onChange={updateFormData} />;
      case 7: return <Step7 data={formData} onChange={updateFormData} />;
      case 8: return <Step8 data={formData} onChange={updateFormData} onSubmit={handleSubmit} submitting={submitting} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">AB</span>
            </div>
            <span className="text-white font-bold text-lg">AutoBoost</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-300">Google Ads Briefing</h1>
        </div>

        {/* Progress */}
        <ProgressBar current={step} total={TOTAL_STEPS} />

        {/* Step indicator */}
        <div className="mb-4">
          <span className="text-xs text-gray-500 uppercase tracking-wider">{STEP_TITLES[step - 1]}</span>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-gray-800 p-6 md:p-8 mb-6">
          {renderStep()}
        </div>

        {/* Error message */}
        {submitError && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">❌ {submitError}</p>
          </div>
        )}

        {/* Navigation */}
        {step < TOTAL_STEPS && (
          <div className="flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-colors border border-gray-700"
              >
                ← Zurück
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-xl transition-all"
            >
              Weiter →
            </button>
          </div>
        )}

        {step === TOTAL_STEPS && step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-colors border border-gray-700"
          >
            ← Zurück
          </button>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-600">
          <p>AutoBoost by Echomotion · Google Ads für Autohäuser</p>
        </div>
      </div>
    </div>
  );
}

export default App;
