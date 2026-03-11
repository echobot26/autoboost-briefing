import React from 'react';
import type { FormData } from '../types';
import { Tooltip } from '../components/Tooltip';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export const Step6: React.FC<Props> = ({ data, onChange }) => {
  const brands = data.marken.length;
  const locations = data.standorte.length;

  const baseAmount = brands * locations * 15;
  const minRec = Math.max(30, Math.round(baseAmount * 0.7));
  const maxRec = Math.max(30, Math.round(baseAmount * 1.3));

  const hasRecommendation = brands > 0 && locations > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Budget</h2>
      <p className="text-gray-400 mb-6">Legen Sie Ihr tägliches Werbebudget fest.</p>

      {/* Budget Recommendation */}
      {hasRecommendation && (
        <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-accent text-xl">💡</span>
            <div>
              <p className="text-accent font-semibold">Budget-Empfehlung</p>
              <p className="text-2xl font-bold text-white mt-1">€{minRec} – €{maxRec} / Tag</p>
              <p className="text-sm text-gray-400 mt-1">
                Basierend auf {brands} Marke{brands !== 1 ? 'n' : ''} × {locations} Standort{locations !== 1 ? 'en' : ''} × €15 Basis (±30%)
              </p>
              <p className="text-sm text-gray-400 mt-0.5">
                = ca. €{Math.round(minRec * 30.4)} – €{Math.round(maxRec * 30.4)} / Monat
              </p>
            </div>
          </div>
        </div>
      )}

      {!hasRecommendation && (
        <div className="mb-6 p-4 bg-gray-800 border border-gray-600 rounded-xl text-sm text-gray-400">
          💡 Fügen Sie Marken und Standorte hinzu (Schritte 2 & 3), um eine Budget-Empfehlung zu erhalten.
        </div>
      )}

      {/* Tagesbudget Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
          Tagesbudget (€/Tag)
          <Tooltip content="Das Tagesbudget ist der Betrag, den Google Ads täglich ausgeben darf. Das Monatsbudget ergibt sich daraus × 30,4. Starten Sie lieber kleiner und skalieren Sie nach Ergebnissen." />
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
          <input
            type="number"
            value={data.tagesbudget}
            onChange={e => onChange({ tagesbudget: e.target.value })}
            placeholder={hasRecommendation ? String(minRec) : "50"}
            min="1"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
        {data.tagesbudget && (
          <p className="text-sm text-gray-400 mt-1">
            ≈ €{Math.round(parseFloat(data.tagesbudget) * 30.4)} / Monat
          </p>
        )}
      </div>

      {/* Budget Type */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Budget-Typ</label>
        <div className="space-y-2">
          {[
            { id: 'flexibel', label: 'Flexibel (Google optimiert)', desc: 'Google kann täglich bis zu 2× das Tagesbudget ausgeben, um Peaks zu nutzen. Monatslimit bleibt.' },
            { id: 'fix', label: 'Fix (Obergrenzen je Kampagne)', desc: 'Strenge Tagesobergrenzen pro Kampagne. Mehr Kontrolle, weniger Flexibilität.' },
          ].map(opt => (
            <label
              key={opt.id}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                data.budgetType === opt.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="budgetType"
                value={opt.id}
                checked={data.budgetType === opt.id}
                onChange={() => onChange({ budgetType: opt.id as FormData['budgetType'] })}
                className="mt-1 accent-violet-500"
              />
              <div>
                <div className="font-medium text-white">{opt.label}</div>
                <div className="text-sm text-gray-400 mt-0.5">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
