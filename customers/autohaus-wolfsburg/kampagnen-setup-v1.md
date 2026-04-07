# Kampagnen-Setup Vorschläge — Autohaus Wolfsburg
**Erstellt:** 07.04.2026 | **Budget:** 10.000 €/Monat | **Ziel-CPL:** 25 €
**Conversion:** Formular-Submit auf fahrzeuge.autohaus-wolfsburg.de
**Ausschluss:** Stegelmann-Fahrzeuge (Ausschluss-Label im Feed)

---

## Vorab: Gemeinsame Grundlagen (beide Varianten)

### Geografisches Targeting (Empfehlung)
- **Primär:** 50 km Radius um Wolfsburg → deckt Braunschweig, Gifhorn, Helmstedt, Salzgitter ab
- **Sekundär:** 80 km für Audi / Premium-Modelle (höhere Zahlungsbereitschaft → längere Anfahrt ok)
- **Gardelegen (Hotz):** ausgeklammert — eigener Schritt nach KIA-Entscheidung
- **Negativ-Ausschluss:** Hannover, Hamburg (zu weit, falsches Signal)

### Stegelmann-Ausschluss
- Im Vehicle Feed: Fahrzeuge mit Händler-Label "Stegelmann" via Feed-Filter ausschließen
- In Search-Kampagnen: Negative Keywords `stegelmann`, `autohaus stegelmann`
- Sobald Feed konfiguriert: eigene Supplemental Feed Regel oder Custom Label `exclude=true`

### Gesellschafts-Abrechnung (Tracking)
- Jede Gesellschaft bekommt **eigene Kampagnen mit eigenem Label**
- UTM-Parameter: `utm_campaign=hw-[gesellschaft]-[marke]-[typ]`
- Beispiel: `utm_campaign=hw-hotz-heitmann-audi-gw`
- Budget-Split vorläufig nach Fahrzeugbestand — finale Verteilung nach Briefing mit Thorsten

**Vorläufiger Budget-Split (Annahme 3 Gesellschaften):**

| Gesellschaft | Anteil | Monatsbudget |
|---|---|---|
| Hotz und Heitmann (Wolfsburg, Hauptstandort) | 50% | 5.000 € |
| Kühl | 30% | 3.000 € |
| Gesellschaft 3 (TBD) | 20% | 2.000 € |

---

# VARIANTE A — "Vehicle Ads First"
**Philosophie:** Vehicle Ads als Hauptkanal, Search als Ergänzung. Maximale Sichtbarkeit im Inventar-Format. Hohes Vertrauen in Feed-Qualität erforderlich.

## Kampagnenstruktur

```
Account: Autohaus Wolfsburg (270-052-0198)
│
├── [VA] Hotz & Heitmann — Gebrauchtwagen (Vehicle Ads)
├── [VA] Hotz & Heitmann — Neuwagen (Vehicle Ads)
├── [S] Hotz & Heitmann — VW (Search)
├── [S] Hotz & Heitmann — Audi (Search)
├── [S] Hotz & Heitmann — SEAT/CUPRA/Skoda (Search)
│
├── [VA] Kühl — Gebrauchtwagen (Vehicle Ads)
├── [VA] Kühl — Neuwagen (Vehicle Ads)
├── [S] Kühl — [Marken] (Search)
│
└── [VA/S] Gesellschaft 3 (analog)
```

## Budget-Verteilung Variante A

| Kampagnentyp | Anteil | Betrag |
|---|---|---|
| Vehicle Ads (alle Gesellschaften) | 60% | 6.000 €/Monat |
| Search (alle Gesellschaften) | 40% | 4.000 €/Monat |

**Vehicle Ads Tagesbudget:** ~200 €/Tag (aufgeteilt auf ~4–6 Kampagnen)
**Search Tagesbudget:** ~133 €/Tag (aufgeteilt auf ~6–8 Kampagnen)

## Vehicle Ads Konfiguration

**Feed-Einstellungen:**
- Quelle: AUTOHAUSEN-Feed via Fares Chaabni → Google Merchant Center
- Custom Labels: `gesellschaft` (hotz-heitmann / kuehl / gesellschaft3)
- Filter: `exclude_dealer = stegelmann`
- Pflichtfelder NW: Energieeffizienzklasse, CO2, Kraftstoffverbrauch

**Kampagnen-Settings:**
- Ziel: Leads (Formular-Submit)
- Gebotstyp: Ziel-CPA = 25 €
- Targeting: 50 km Wolfsburg (Audi: 80 km)
- Anzeigenrotation: Optimiert

## Search-Kampagnen — Keywords & Anzeigen (Variante A)

### [S] VW-Kampagne — Ad Groups & Keywords

**Ad Group: VW Golf kaufen**
```
Keywords (Broad Match Modifier / Phrase):
"VW Golf gebraucht Wolfsburg"
"Golf kaufen Wolfsburg"
"VW Golf Händler Wolfsburg"
"gebrauchter Golf Wolfsburg"
[VW Golf Wolfsburg]
[Golf kaufen Wolfsburg]

Negative: stegelmann, leasing only, ersatzteile, werkstatt
```

RSA Anzeige 1:
- Headline 1: VW Golf — Gebraucht kaufen in Wolfsburg
- Headline 2: Über 200 Fahrzeuge verfügbar
- Headline 3: Jetzt Anfrage stellen — CPL ab 25 €
- Description 1: Ihr VW-Händler direkt in Wolfsburg. Top-gepflegte Gebrauchtwagen mit Garantie.
- Description 2: Einfach online anfragen — wir melden uns innerhalb von 24 Stunden.
- Final URL: `https://fahrzeuge.autohaus-wolfsburg.de/?cat=[VW-Golf-Filter]&colV_i=1`

**Ad Group: VW Tiguan / T-Roc / T-Cross**
```
"VW Tiguan kaufen Wolfsburg"
"VW T-Roc gebraucht"
"SUV VW Wolfsburg"
[VW Tiguan Wolfsburg]
```

**Ad Group: VW ID-Modelle (Elektro)**
```
"VW ID.4 kaufen"
"VW ID.3 Wolfsburg"
"Elektroauto VW Wolfsburg"
[VW ID Wolfsburg]
```

### [S] Audi-Kampagne — Ad Groups & Keywords

**Ad Group: Audi A3 / A4 / A6**
```
"Audi A3 gebraucht Wolfsburg"
"Audi kaufen Wolfsburg"
"Audi Händler Wolfsburg"
[Audi A3 Wolfsburg]
[Audi kaufen Wolfsburg]
```

RSA Anzeige:
- Headline 1: Audi kaufen in Wolfsburg
- Headline 2: Zertifizierte Gebrauchwagen
- Headline 3: Jetzt Probefahrt anfragen
- Description 1: Offizieller Audi-Händler in Wolfsburg. Große Auswahl A3, A4, Q-Modelle.
- Description 2: Persönliche Beratung, faire Preise. Jetzt unverbindlich anfragen.
- Final URL: `https://fahrzeuge.autohaus-wolfsburg.de/?cat=[Audi-Filter]&colV_i=1`

**Ad Group: Audi Q-Modelle (SUV)**
```
"Audi Q3 kaufen"
"Audi Q5 Wolfsburg"
"Audi SUV gebraucht Wolfsburg"
```

### [S] SEAT / CUPRA / Škoda

**Ad Group: SEAT / CUPRA**
```
"CUPRA Formentor kaufen"
"SEAT Ateca gebraucht Wolfsburg"
"CUPRA Händler Wolfsburg"
```

**Ad Group: Škoda**
```
"Škoda Octavia kaufen Wolfsburg"
"Škoda Kodiaq gebraucht"
"Škoda Händler Wolfsburg"
```

## Anzeigenerweiterungen (alle Kampagnen)

**Sitelinks:**
- "Alle Gebrauchtwagen" → fahrzeuge.autohaus-wolfsburg.de/?colV_i=1
- "Alle Neuwagen" → fahrzeuge.autohaus-wolfsburg.de/?colV=1
- "Standorte & Öffnungszeiten" → autohaus-wolfsburg.de/standorte-oeffnungszeiten
- "Jetzt Probefahrt buchen" → Kontaktseite

**Callouts:**
- "Offizieller VW-Händler seit 1946"
- "Über 2.000 Mitarbeiter"
- "Kostenlose Probefahrt"
- "Finanzierung ab 0% möglich"
- "TÜV-geprüfte Gebrauchtwagen"

**Standorterweiterungen:**
- Alle Standorte aus GBP verknüpfen (sobald GBP-Zugang steht)

**Anruferweiterungen:**
- 05361 204-0 (Hauptstandort)
- Nur Mo–Sa 09:00–18:00 Uhr schalten

**Strukturierte Snippets:**
- Marken: VW, Audi, SEAT, CUPRA, Škoda
- Fahrzeugtypen: SUV, Limousine, Kombi, Elektro, Nutzfahrzeuge

## Erwartete Performance Variante A

| Metrik | Schätzung |
|---|---|
| Leads/Monat | 350–450 |
| Ø CPL | 22–28 € |
| Vehicle Ads Anteil | ~60–70% der Leads |
| Search Anteil | ~30–40% der Leads |
| Impressionen/Monat | 200.000–350.000 |

---

# VARIANTE B — "Search First + Vehicle Ads Support"
**Philosophie:** Search als Hauptkanal für sofortige Kontrollierbarkeit (kein Feed-Abhängigkeit nötig). Vehicle Ads als ergänzendes Format, sobald Feed steht. Ideal für schnellen Start ohne vollständigen Feed.

## Kampagnenstruktur

```
Account: Autohaus Wolfsburg (270-052-0198)
│
├── [S] Marken-Search: VW PKW (alle Modelle)
├── [S] Marken-Search: VW Nutzfahrzeuge
├── [S] Marken-Search: Audi
├── [S] Marken-Search: SEAT + CUPRA
├── [S] Marken-Search: Škoda
├── [S] Generic: Gebrauchtwagen Wolfsburg (markenübergreifend)
├── [S] Generic: Neuwagen Wolfsburg (markenübergreifend)
├── [VA] Vehicle Ads — GW gesamt (startet sobald Feed live)
└── [VA] Vehicle Ads — NW (Phase 2)
```

## Budget-Verteilung Variante B

| Kampagnentyp | Anteil | Betrag |
|---|---|---|
| Search (Marken-Kampagnen) | 50% | 5.000 €/Monat |
| Search (Generic/Gebrauchtwagen) | 20% | 2.000 €/Monat |
| Vehicle Ads (ab Feed-Live) | 30% | 3.000 €/Monat |

## Besonderheit Variante B: Generic-Kampagnen

**Ad Group: "Gebrauchtwagen Wolfsburg" (markenübergreifend)**
```
Keywords:
"gebrauchtwagen wolfsburg"
"auto kaufen wolfsburg"
"autohaus wolfsburg gebrauchtwagen"
"gebrauchter pkw wolfsburg"
[gebrauchtwagen wolfsburg]
[auto kaufen wolfsburg]

Negative: stegelmann, motorrad, wohnmobil (wenn nicht gewünscht)
```

RSA Anzeige:
- Headline 1: Gebrauchtwagen in Wolfsburg kaufen
- Headline 2: VW, Audi, Skoda & mehr
- Headline 3: Top-Auswahl | Faire Preise
- Description 1: Ihr Autohaus in Wolfsburg — über 500 Fahrzeuge aller Marken. Jetzt online filtern und anfragen.
- Description 2: VW, Audi, SEAT, CUPRA, Škoda. Persönliche Beratung & kostenlose Probefahrt.
- Final URL: `https://fahrzeuge.autohaus-wolfsburg.de/?colV_i=1`

**Ad Group: "Neuwagen Wolfsburg"**
```
"neuwagen wolfsburg"
"neuwagen kaufen wolfsburg"
"vw neuwagen wolfsburg"
"auto neukauf wolfsburg"
```

RSA Anzeige:
- Headline 1: Neuwagen direkt beim Händler
- Headline 2: VW · Audi · SEAT · Škoda
- Headline 3: Jetzt konfigurieren & anfragen
- Final URL: `https://fahrzeuge.autohaus-wolfsburg.de/?colV=1`

## Marken-spezifische Kampagnen Variante B

Zusätzlich zu Variante A: eigene Kampagnen für **VW Nutzfahrzeuge** — da separater Kundentypus:

**Ad Group: VW NFZ**
```
"VW Transporter kaufen Wolfsburg"
"VW Crafter gebraucht"
"VW Nutzfahrzeuge Wolfsburg"
"Transporter NFZ Wolfsburg"
[vw transporter wolfsburg]
```

RSA Anzeige:
- Headline 1: VW Nutzfahrzeuge in Wolfsburg
- Headline 2: Transporter, Crafter, Caddy
- Headline 3: Gebraucht & Neu verfügbar
- Final URL: `https://fahrzeuge.autohaus-wolfsburg.de/?cat=[NFZ-Filter]`

## Erwartete Performance Variante B

| Metrik | Schätzung |
|---|---|
| Leads/Monat (Phase 1, ohne VA) | 280–380 |
| Leads/Monat (Phase 2, mit VA) | 380–500 |
| Ø CPL | 24–30 € (Phase 1) → 20–26 € (Phase 2) |
| Vorteil | Startet sofort, kein Feed nötig |
| Nachteil | CPL initial etwas höher als Variante A |

---

# Empfehlung

| Kriterium | Variante A | Variante B |
|---|---|---|
| Feed verfügbar | ✅ Optimal | ⚠️ Kann starten ohne |
| Startgeschwindigkeit | ⏳ Wartet auf Feed | ✅ Sofort |
| CPL-Potenzial | 🏆 Niedriger (22–28€) | Etwas höher initial |
| Kontrolle | Mittel | Hoch |
| Empfehlung | Phase 2 (nach Feed) | **Phase 1 (jetzt starten)** |

**Mein Vorschlag: Mit Variante B starten** (Search-only, sofort), parallel Feed finalisieren, dann **automatisch auf Variante A umstellen** sobald Vehicle Ads live sind. Das gibt sofortige Daten und den kürzesten Weg zum ersten Lead.

---

# Offene Punkte für Freigabe

- [ ] Gesellschaften bestätigen (Kühl + 3. Gesellschaft) + Budget-Split final
- [ ] Stegelmann-Filter im Feed technisch bestätigen (Fares)
- [ ] Neuwagen: PAngV-Pflichtfelder im Feed vorhanden?
- [ ] Targeting-Radius bestätigen (50km / 80km Audi)
- [ ] Anruferweiterung: Welche Nummer pro Gesellschaft?
- [ ] Startdatum freigeben

---
*Erstellt von Claire · Autoboost by Echomotion · 07.04.2026*
