import React from 'react';
import type { FormData } from '../types';
import { Tooltip } from '../components/Tooltip';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

const MODULES = [
  {
    id: 'search',
    label: 'Search Kampagnen',
    description: 'Textanzeigen bei Suchanfragen',
    tooltip: 'Erscheinen Sie, wenn potenzielle Kunden aktiv nach Ihren Fahrzeugen suchen. Höchste Kaufabsicht – ideal für Leads.',
    recommended: true,
    icon: '🔍',
  },
  {
    id: 'pmax',
    label: 'Performance Max',
    description: 'KI-gestützte Multi-Channel-Kampagnen',
    tooltip: 'Google KI verteilt Ihr Budget automatisch auf Search, Display, YouTube, Gmail und Maps – für maximale Reichweite.',
    recommended: true,
    icon: '🤖',
  },
  {
    id: 'vehicle',
    label: 'Vehicle Ads',
    description: 'Fahrzeuglisten direkt in Google Suchergebnissen',
    tooltip: 'Zeigen Sie Ihr Fahrzeuginventar direkt in der Google-Suche mit Foto, Preis und Modell. Ideal wenn Sie einen Online-Bestand haben.',
    recommended: false,
    icon: '🚗',
  },
  {
    id: 'brand',
    label: 'Brand Kampagnen',
    description: 'Schutz des eigenen Markennamens',
    tooltip: 'Verhindert, dass Wettbewerber auf Ihren Markennamen bieten und Ihre potenziellen Kunden abfangen.',
    recommended: false,
    icon: '🛡',
  },
  {
    id: 'display',
    label: 'Display / YouTube',
    description: 'Visuelle Anzeigen auf Websites & YouTube',
    tooltip: 'Banner-Anzeigen auf Millionen von Websites und Video-Anzeigen auf YouTube. Ideal für Markenbekanntheit und Retargeting.',
    recommended: false,
    icon: '📺',
  },
];

export const Step7: React.FC<Props> = ({ data, onChange }) => {
  const toggleModule = (id: string) => {
    const current = data.module;
    const updated = current.includes(id)
      ? current.filter(m => m !== id)
      : [...current, id];
    onChange({ module: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Kampagnen-Module</h2>
      <p className="text-gray-400 mb-6">Welche Kampagnentypen sollen eingesetzt werden? (Mehrfachauswahl möglich)</p>

      <div className="space-y-3">
        {MODULES.map(mod => (
          <label
            key={mod.id}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              data.module.includes(mod.id)
                ? 'border-primary bg-primary/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
            }`}
          >
            <input
              type="checkbox"
              checked={data.module.includes(mod.id)}
              onChange={() => toggleModule(mod.id)}
              className="mt-1 w-4 h-4 accent-violet-500"
            />
            <span className="text-2xl mt-0.5">{mod.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">{mod.label}</span>
                {mod.recommended && (
                  <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">Empfohlen</span>
                )}
                <Tooltip content={mod.tooltip} />
              </div>
              <div className="text-sm text-gray-400 mt-0.5">{mod.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
