import React from 'react';
import type { FormData } from '../types';
import { Tooltip } from '../components/Tooltip';
import { ChipSelect } from '../components/ChipSelect';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export const Step3: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        Standorte
        <Tooltip content="Wie viele Standorte hat Ihr Autohaus? Jeder Standort beeinflusst das empfohlene Budget und das regionale Targeting." />
      </h2>
      <p className="text-gray-400 mb-6">
        Wir haben Städte und Standorte von Ihrer Website extrahiert. Bitte bestätigen oder passen Sie an.
      </p>

      {data.standorte.length === 0 && (
        <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-600/30 rounded-lg">
          <p className="text-yellow-400 text-sm">Keine Standorte automatisch erkannt. Bitte fügen Sie Ihre Standorte manuell hinzu.</p>
        </div>
      )}

      <ChipSelect
        items={data.standorte}
        onChange={standorte => onChange({ standorte })}
        placeholder="Stadt oder Standort hinzufügen..."
      />

      <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <p className="text-sm text-gray-400">
          <span className="text-accent font-medium">💡 Tipp:</span> Für jeden Standort wird ein eigenes regionales Targeting erstellt. So erreichen Sie Kunden in Ihrer Umgebung gezielt.
        </p>
      </div>
    </div>
  );
};
