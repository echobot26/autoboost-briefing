import React from 'react';
import type { FormData } from '../types';
import { Tooltip } from '../components/Tooltip';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

const SEGMENTE = [
  { id: 'b2c', label: 'B2C Privatkunden', description: 'Privatpersonen, die ein Fahrzeug kaufen oder leasen möchten' },
  { id: 'gewerbe', label: 'Gewerbe / Firmenwagen', description: 'Unternehmen, die Fahrzeuge als Betriebsmittel kaufen' },
  { id: 'flotte', label: 'Flottenkunden', description: 'Unternehmen mit mehreren Fahrzeugen im Fuhrpark' },
];

export const Step4: React.FC<Props> = ({ data, onChange }) => {
  const toggleSegment = (id: string) => {
    const current = data.segmente;
    const updated = current.includes(id)
      ? current.filter(s => s !== id)
      : [...current, id];
    onChange({ segmente: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        Kundensegmente
        <Tooltip content="Wen wollen Sie mit Ihren Anzeigen erreichen? B2C = Privatkäufer, Gewerbe = Firmen die Autos als Betriebsmittel kaufen, Flotte = Unternehmen mit mehreren Fahrzeugen." />
      </h2>
      <p className="text-gray-400 mb-6">
        Welche Kundengruppen sollen durch Google Ads angesprochen werden? (Mehrfachauswahl möglich)
      </p>

      <div className="space-y-3">
        {SEGMENTE.map(seg => (
          <label
            key={seg.id}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              data.segmente.includes(seg.id)
                ? 'border-primary bg-primary/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
            }`}
          >
            <input
              type="checkbox"
              checked={data.segmente.includes(seg.id)}
              onChange={() => toggleSegment(seg.id)}
              className="mt-1 w-4 h-4 accent-violet-500"
            />
            <div>
              <div className="font-medium text-white">{seg.label}</div>
              <div className="text-sm text-gray-400 mt-0.5">{seg.description}</div>
            </div>
          </label>
        ))}
      </div>

      {data.segmente.length === 0 && (
        <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600/30 rounded-lg">
          <p className="text-yellow-400 text-sm">Bitte mindestens ein Kundensegment auswählen.</p>
        </div>
      )}
    </div>
  );
};
