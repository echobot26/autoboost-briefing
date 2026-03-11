import React from 'react';
import type { FormData } from '../types';
import { Tooltip } from '../components/Tooltip';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  loading?: boolean;
}

export const Step1: React.FC<Props> = ({ data, onChange, loading }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Kundeninformationen</h2>
      <p className="text-gray-400 mb-6">Bitte geben Sie Ihre grundlegenden Kontaktdaten ein.</p>

      {loading && (
        <div className="mb-4 p-3 bg-accent/10 border border-accent/30 rounded-lg flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-accent text-sm">Website wird analysiert und Felder werden vorausgefüllt...</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Unternehmensname
            <Tooltip content="Name Ihres Autohauses oder Unternehmens, wie er in den Anzeigen erscheinen soll." />
          </label>
          <input
            type="text"
            value={data.unternehmensname}
            onChange={e => onChange({ unternehmensname: e.target.value })}
            placeholder="z.B. Autohaus Muster GmbH"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Website
            <Tooltip content="Die URL Ihrer Unternehmenswebsite. Diese wird für die automatische Vorausfüllung genutzt." />
          </label>
          <input
            type="text"
            value={data.website}
            onChange={e => onChange({ website: e.target.value })}
            placeholder="z.B. https://autohaus-muster.de"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Ansprechpartner
            <Tooltip content="Name der Person, die für die Google Ads Kampagnen zuständig ist." />
          </label>
          <input
            type="text"
            value={data.ansprechpartner}
            onChange={e => onChange({ ansprechpartner: e.target.value })}
            placeholder="Vor- und Nachname"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            E-Mail
            <Tooltip content="Ihre E-Mail-Adresse für die Kommunikation rund um die Kampagnen." />
          </label>
          <input
            type="email"
            value={data.email}
            onChange={e => onChange({ email: e.target.value })}
            placeholder="name@autohaus.de"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            Telefon
            <Tooltip content="Ihre Telefonnummer für Rückfragen." />
          </label>
          <input
            type="tel"
            value={data.telefon}
            onChange={e => onChange({ telefon: e.target.value })}
            placeholder="+49 123 456789"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};
