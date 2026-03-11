import React from 'react';
import type { FormData } from '../types';
import { Tooltip } from '../components/Tooltip';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

const KPIS = [
  { id: 'ctr', label: 'Klickrate (CTR)' },
  { id: 'cpl', label: 'Kosten pro Lead (CPL)' },
  { id: 'cvr', label: 'Conversion Rate' },
  { id: 'impressions', label: 'Impressions / Sichtbarkeit' },
];

export const Step5: React.FC<Props> = ({ data, onChange }) => {
  const toggleKpi = (id: string) => {
    const current = data.kpis;
    const updated = current.includes(id)
      ? current.filter(k => k !== id)
      : [...current, id];
    onChange({ kpis: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Ziele & KPIs</h2>
      <p className="text-gray-400 mb-6">Was ist das Hauptziel Ihrer Google Ads Kampagnen?</p>

      {/* Hauptziel */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">Hauptziel *</label>
        <div className="space-y-2">
          {[
            { id: 'leads', label: 'Mehr Leads', icon: '🎯', desc: 'Kontaktanfragen, Probefahrtbuchungen, Anrufe' },
            { id: 'roas', label: 'Mehr Umsatz (ROAS)', icon: '💰', desc: 'Maximaler Return on Ad Spend' },
            { id: 'sichtbarkeit', label: 'Mehr Sichtbarkeit', icon: '👁', desc: 'Markenbekanntheit und Reichweite steigern' },
          ].map(opt => (
            <label
              key={opt.id}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                data.hauptziel === opt.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="hauptziel"
                value={opt.id}
                checked={data.hauptziel === opt.id}
                onChange={() => onChange({ hauptziel: opt.id as FormData['hauptziel'] })}
                className="accent-violet-500"
              />
              <span className="text-xl">{opt.icon}</span>
              <div>
                <div className="font-medium text-white">{opt.label}</div>
                <div className="text-sm text-gray-400">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ROAS Target */}
      {data.hauptziel === 'roas' && (
        <div className="mb-6 p-4 bg-gray-800 border border-gray-600 rounded-xl">
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Ziel-ROAS (%)
            <Tooltip content="ROAS = Return on Ad Spend. Beispiel: Bei €1.000 Werbebudget und ROAS 500% = €5.000 Umsatz durch Anzeigen. Typisch für Autohäuser: 300–600%." />
          </label>
          <input
            type="number"
            value={data.zielRoas}
            onChange={e => onChange({ zielRoas: e.target.value })}
            placeholder="z.B. 400"
            min="0"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
          <p className="text-xs text-gray-500 mt-2">Typischer Wert für Autohäuser: 300–600%</p>
        </div>
      )}

      {/* Lead Goal */}
      {data.hauptziel === 'leads' && (
        <div className="mb-6 p-4 bg-gray-800 border border-gray-600 rounded-xl">
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Lead-Ziel pro Monat
            <Tooltip content="Wie viele Kontaktanfragen, Probefahrtbuchungen oder Anrufe sollen pro Monat durch Google Ads generiert werden?" />
          </label>
          <input
            type="number"
            value={data.leadZiel}
            onChange={e => onChange({ leadZiel: e.target.value })}
            placeholder="z.B. 50"
            min="0"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
      )}

      {/* KPIs */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Wichtigste KPIs (Mehrfachauswahl)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {KPIS.map(kpi => (
            <label
              key={kpi.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                data.kpis.includes(kpi.id)
                  ? 'border-accent bg-accent/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <input
                type="checkbox"
                checked={data.kpis.includes(kpi.id)}
                onChange={() => toggleKpi(kpi.id)}
                className="accent-cyan-400"
              />
              <span className="text-sm text-white">{kpi.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
