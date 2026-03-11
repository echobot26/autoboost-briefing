import React from 'react';
import type { FormData } from '../types';
import { Tooltip } from '../components/Tooltip';
import { ChipSelect } from '../components/ChipSelect';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export const Step2: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        Marken & Modelle
        <Tooltip content="Welche Automarken sollen in Google Ads beworben werden? Jede Marke braucht eigene Kampagnen für optimale Performance." />
      </h2>
      <p className="text-gray-400 mb-6">
        Wir haben die Automarken von Ihrer Website erkannt. Bitte bestätigen oder entfernen Sie die Chips und fügen Sie ggf. weitere hinzu.
      </p>

      {data.marken.length === 0 && (
        <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-600/30 rounded-lg">
          <p className="text-yellow-400 text-sm">Keine Marken automatisch erkannt. Bitte fügen Sie Ihre Automarken manuell hinzu.</p>
        </div>
      )}

      <ChipSelect
        items={data.marken}
        onChange={marken => onChange({ marken })}
        placeholder="Weitere Marke hinzufügen..."
      />

      <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <p className="text-sm text-gray-400">
          <span className="text-accent font-medium">💡 Tipp:</span> Jede Automarke bekommt eigene Kampagnen mit spezifischen Keywords. Das ermöglicht präzises Targeting und optimale Budget-Verteilung.
        </p>
      </div>
    </div>
  );
};
