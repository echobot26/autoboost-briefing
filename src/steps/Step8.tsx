import React from 'react';
import type { FormData } from '../types';
import { Tooltip } from '../components/Tooltip';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  onSubmit: () => void;
  submitting?: boolean;
}

export const Step8: React.FC<Props> = ({ data, onChange, onSubmit, submitting }) => {
  const hasMercedes = data.marken.some(m =>
    m.toLowerCase().includes('mercedes') || m.toLowerCase() === 'mb'
  );
  const hasPrivatkunden = data.segmente.includes('b2c');
  const showMBWarning = hasMercedes && hasPrivatkunden;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Timing & Besonderheiten</h2>
      <p className="text-gray-400 mb-6">Fast geschafft! Noch ein paar letzte Details.</p>

      <div className="space-y-6">
        {/* Starttermin */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Gewünschter Starttermin
            <Tooltip content="Wann sollen die Kampagnen live gehen? Wir benötigen ca. 5–7 Werktage zur Einrichtung." />
          </label>
          <input
            type="date"
            value={data.starttermin}
            onChange={e => onChange({ starttermin: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary [color-scheme:dark]"
          />
        </div>

        {/* Laufende Kampagnen */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Gibt es aktuell laufende Google Ads Kampagnen?
          </label>
          <div className="flex gap-3">
            {['ja', 'nein'].map(opt => (
              <label
                key={opt}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  data.laufendeKampagnen === opt
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="laufendeKampagnen"
                  value={opt}
                  checked={data.laufendeKampagnen === opt}
                  onChange={() => onChange({ laufendeKampagnen: opt as 'ja' | 'nein' })}
                  className="accent-violet-500"
                />
                <span className="font-medium text-white capitalize">{opt === 'ja' ? 'Ja' : 'Nein'}</span>
              </label>
            ))}
          </div>

          {data.laufendeKampagnen === 'ja' && (
            <div className="mt-3 p-4 bg-accent/10 border border-accent/30 rounded-xl">
              <p className="text-accent font-medium text-sm">📤 Account teilen</p>
              <p className="text-gray-300 text-sm mt-1">
                Bitte teilen Sie Ihren Google Ads Account via MCC-Einladung:
              </p>
              <p className="text-white font-mono font-bold mt-1">3582036991</p>
              <p className="text-gray-400 text-xs mt-1">
                Google Ads → Einstellungen → Zugriff & Sicherheit → Nutzer einladen
              </p>
            </div>
          )}
        </div>

        {/* Saisonale Besonderheiten */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Saisonale Besonderheiten
            <Tooltip content="Gibt es bestimmte Zeiten im Jahr, in denen Ihr Geschäft besonders gut läuft oder Sie Aktionen planen? Wir können das Budget entsprechend planen." />
          </label>
          <textarea
            value={data.saisonalesBesonderes}
            onChange={e => onChange({ saisonalesBesonderes: e.target.value })}
            placeholder="z.B. Sommer-Aktionen, Jahresende-Push, Frühjahrsangebote..."
            rows={3}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* MB Warning */}
        {showMBWarning && (
          <div className="p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-xl">
            <p className="text-yellow-400 font-medium">⚠️ Hinweis: Mercedes-Benz Neuwagen</p>
            <p className="text-yellow-300/80 text-sm mt-1">
              Freie Mercedes-Benz Händler dürfen keine Google Ads für MB-Neuwagen (PKW) schalten. Bitte klären Sie Ihren Händlerstatus, bevor wir Kampagnen für MB-Neuwagen aufsetzen.
            </p>
          </div>
        )}

        {/* Anmerkungen */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Weitere Anmerkungen
            <Tooltip content="Gibt es noch etwas, das wir wissen sollten? Besonderheiten Ihres Unternehmens, spezielle Wünsche oder Fragen?" />
          </label>
          <textarea
            value={data.anmerkungen}
            onChange={e => onChange({ anmerkungen: e.target.value })}
            placeholder="Weitere Informationen, Fragen oder besondere Wünsche..."
            rows={4}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* DSGVO */}
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
          <p className="text-xs text-gray-400">
            🔒 <strong className="text-gray-300">Datenschutz:</strong> Ihre Daten werden vertraulich behandelt und ausschließlich für die Kampagnenplanung verwendet. Sie können jederzeit Auskunft oder Löschung beantragen:{' '}
            <a href="mailto:claire@echomotion.ai" className="text-accent hover:underline">
              claire@echomotion.ai
            </a>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Wird übermittelt...
            </>
          ) : (
            <>
              🚀 Briefing absenden
            </>
          )}
        </button>
      </div>
    </div>
  );
};
