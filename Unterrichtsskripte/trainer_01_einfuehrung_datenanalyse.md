# Trainer-Skript 01 — Einführung in die Datenanalyse

> **Themen:** Analysekategorien · Datenrollen · Aufgaben eines Data Analysts  
> **Schüler-Skript:** 01_einfuehrung_datenanalyse.md

---

## Einstieg

**Frage ans Plenum:** Wer von euch hat schon mal mit Daten gearbeitet — Excel, Berichte, Auswertungen?

- Kurz ankommen lassen, ein paar Reaktionen abwarten
- Überleitung: Daten haben die meisten gesehen — aber was macht man wirklich *damit*?

**Kerngedanke ansprechen:**
- Viele Unternehmen haben riesige Datenmengen — nutzen sie kaum
- Datenanalyse = Rohdaten → handlungsrelevante Erkenntnisse
- Ziel ist immer: eine Geschichte erzählen, die Entscheidungen unterstützt

---

## Block 1 — Die fünf Analysekategorien

**Frage ans Plenum:** Was glaubt ihr — welche Frage stellt man sich bei einer Datenanalyse zuerst?

> **Erwartete Antwort:** Was ist passiert? / Was sind unsere Zahlen?  
> → Das ist die beschreibende Analyse — die Basis für alles.

**Die fünf Kategorien durchgehen — als Steigerung präsentieren:**

- **Beschreibend** → Was ist geschehen? — KPIs, ROI, historische Zusammenfassung
- **Diagnostisch** → Warum ist es geschehen? — Anomalien finden, Ursachen erklären
- **Prädiktiv** → Was wird passieren? — Muster aus der Vergangenheit, neuronale Netze, Regressionen
- **Präskriptiv** → Was sollte getan werden? — Handlungsempfehlungen, ML-gestützt
- **KI-gestützt** → Welche Muster stecken drin? — Sprachverarbeitung, Bilderkennung, Codegenerierung, minimaler menschlicher Eingriff

**Wichtig betonen:** Die Kategorien bauen aufeinander auf — ohne beschreibende Analyse keine diagnostische, ohne diagnostische keine prädiktive usw.

**Beispiel Einzelhandel kurz skizzieren** (steht im Schüler-Skript, hier nur als Ankerpunkt):
- Konsummuster der Vergangenheit → beschreibend
- Warum Umsatzanstieg? → diagnostisch
- Welche Produkte weiter gefragt? → prädiktiv
- Nachbestellen ja/nein? → präskriptiv
- Kundenbewertungen in Echtzeit → KI

**Frage ans Plenum:** Welche dieser Analyse-Typen macht ihr in eurem Job heute schon — bewusst oder unbewusst?

> **Erwartete Antworten:** Die meisten machen beschreibend (Berichte, Tabellen). Manche diagnostisch (warum laufen die Zahlen schlecht). Selten prädiktiv oder präskriptiv.  
> → Guter Aufhänger: Power BI hilft, weiter nach oben zu kommen in dieser Skala.

**Vertrauen in Daten — kurz ansprechen:**
- Datenanalyse funktioniert nur wenn das Unternehmen seinen eigenen Daten vertraut
- Daten müssen aus verlässlichen Quellen kommen, verständlich aufbereitet sein
- Ohne Vertrauen → Entscheidungsträger ignorieren die Ergebnisse

---

## Block 2 — Datenrollen

**Frage ans Plenum:** Was glaubt ihr — wer ist für die Daten in einem Unternehmen zuständig? Gibt es da eine Rolle oder viele?

> **Erwartete Antwort:** Verschiedene Meinungen — IT, Controlling, Datenbankadmin...  
> → Überleitung: Es gibt tatsächlich fünf spezialisierte Rollen, die sich überschneiden.

**Die fünf Rollen durchgehen — Abgrenzungen betonen:**

- **Business Analyst** — Interpretation, wirtschaftliche Abläufe, Entscheidungsunterstützung. Kein Fokus auf technische Aufbereitung. Kann dieselbe Person sein wie ein Data Analyst.
- **Data Analyst** — Das sind wir. Schnittstelle zwischen Rohdaten und Entscheidungsträgern. Profilieren, bereinigen, transformieren, modellieren, berichten. Auch verantwortlich für Sicherheit der Power BI-Ressourcen.
- **Data Engineer** — Baut die Infrastruktur. ETL-Prozesse, Datenfluss, Datenplattformen. Geht über Datenbankadmin hinaus. Schafft die Grundlage auf der wir als Analysts aufbauen.
- **Analytics Engineer** — Schließt die Lücke zwischen Engineer und Analyst. Technischer als ein Analyst, näher am Business als ein Engineer. Kuratiert Daten in Data Lakes, baut semantische Modelle.
- **Data Scientist** — Erweiterte Analysen, ML-Modelle, Deep Learning. Kommt zu uns wenn er Visualisierungen braucht.

**Frage ans Plenum:** Wo würdet ihr euch selbst einordnen — oder wo wollt ihr hin?

> **Erwartete Antworten:** Die meisten landen beim Data Analyst, manche beim Business Analyst.  
> → Keine falsche Antwort — Ziel des Kurses ist der Data Analyst-Bereich für die PL-300.

**Zusammenarbeit betonen:**
- Als Data Analyst bekommt ihr Daten vom Data Engineer (aus Data Warehouse / Data Lake)
- Data Scientists kommen zu euch für Visualisierung und Berichte
- Das ist kein Silo — sondern ein Team

---

## Block 3 — Aufgaben eines Data Analysts

**Frage ans Plenum:** Was glaubt ihr — welche Aufgabe nimmt den meisten Teil der Arbeitszeit eines Data Analysts in Anspruch?

> **Erwartete Antwort:** Oft wird "Berichte erstellen" oder "Visualisierungen" genannt.  
> → Richtige Antwort: Datenvorbereitung. Das überrascht viele.

**Die fünf Aufgaben als Kreislauf erklären:**

**Vorbereiten** (zeitaufwändigster Schritt — iterativ, zieht sich durch das gesamte Projekt)
- Daten profilieren — was haben wir überhaupt?
- Bereinigen — Fehler, fehlende Werte, falsche Typen korrigieren
- Transformieren — Strukturen anpassen, konvertieren
- Verbindungsart zur Quelle wählen (hat Auswirkung auf Performance)
- Datenschutz: personenbezogene Daten anonymisieren oder entfernen

> ⚠️ Betonen: Fehlerhafte Daten → ungültige Berichte → Vertrauensverlust → schlechte Entscheidungen. Garbage in, garbage out.

**Modellieren**
- Beziehungen zwischen Tabellen definieren
- Metriken und Berechnungen hinzufügen
- Auf Genauigkeit und Performance optimieren

> 💡 Hinweis für die Klasse: Wenn ein Bericht langsam ist, liegt es fast nie an der Visualisierung — fast immer an der Vorbereitung oder Modellierung.

**Visualisieren**
- Geeignete Visuals wählen — nicht jedes Diagramm passt zu jedem Datentyp
- Barrierefreiheit bedenken: Farben, Schriftgrößen
- KI-Features nutzen (Copilot, Quick Insights) — kein Code nötig
- Weniger ist mehr — nicht alle Datenpunkte auf einmal

**Analysieren**
- Erkenntnisse gewinnen, Muster und Trends identifizieren
- Vorhersagen treffen
- Ergebnisse verständlich kommunizieren
- Erweiterte Features: Azure ML, Cognitive Services, Copilot-Integration

**Verwalten**
- Berichte, Dashboards, Arbeitsbereiche pflegen
- Freigabe und Verteilung steuern
- Sicherheit: wer sieht welche Daten?
- Datensilos abbauen durch gemeinsame semantische Modelle
- Wichtige Daten zertifizieren → Vertrauen stärken

**Frage ans Plenum:** Welche dieser fünf Aufgaben klingt für euch am anspruchsvollsten?

> **Erwartete Antworten:** Modellieren und Analysieren werden oft genannt.  
> → Alle fünf sind wichtig und kommen im Kurs dran — die PL-300 prüft alle Bereiche.

---

## Abschluss & Übergang

**Kurze Zusammenfassung ansprechen:**
- 5 Analysekategorien (beschreibend bis KI-gestützt)
- 5 Datenrollen (wir sind der Data Analyst — Schnittstelle zwischen Daten und Entscheidung)
- 5 Analyst-Aufgaben (Vorbereiten · Modellieren · Visualisieren · Analysieren · Verwalten)

**Übergang zu Skript 02:**
> "Bevor wir mit echter Datenarbeit anfangen, schauen wir uns Power BI als Werkzeug an — welche Komponenten es gibt und wie der typische Arbeitsablauf aussieht."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren — Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Ein Unternehmen möchte verstehen, *warum* der Umsatz im letzten Quartal gesunken ist. Welche Analysekategorie ist das?

- a) Beschreibend
- b) Diagnostisch ✅
- c) Prädiktiv
- d) Präskriptiv

> **Antwort:** b) Diagnostisch — es geht um die Ursache eines vergangenen Ereignisses.

---

**Frage 2:** Welche Rolle ist primär verantwortlich dafür, die Dateninfrastruktur und ETL-Prozesse aufzubauen?

- a) Data Analyst
- b) Business Analyst
- c) Data Engineer ✅
- d) Data Scientist

> **Antwort:** c) Data Engineer — er baut die Infrastruktur, auf der der Data Analyst aufbaut.

---

**Frage 3:** Ein Power-BI-Bericht läuft sehr langsam. Wo liegt die Ursache am wahrscheinlichsten?

- a) Zu viele Visualisierungen auf der Seite
- b) Falsche Farbwahl im Design
- c) Datenvorbereitung oder Modellierung ✅
- d) Zu viele Benutzer greifen gleichzeitig zu

> **Antwort:** c) Datenvorbereitung oder Modellierung — Performance-Probleme entstehen fast immer dort, nicht in der Visualisierungsschicht.

---

**Frage 4:** Welche Aufgabe eines Data Analysts ist typischerweise am zeitaufwändigsten?

- a) Visualisieren
- b) Analysieren
- c) Verwalten
- d) Vorbereiten ✅

> **Antwort:** d) Vorbereiten — es ist ein iterativer Prozess, der sich durch das gesamte Projekt zieht.

---

**Frage 5:** Ein Data Scientist hat ein ML-Modell entwickelt und möchte die Ergebnisse präsentieren. An wen wendet er sich?

- a) Data Engineer
- b) Business Analyst
- c) Data Analyst ✅
- d) Analytics Engineer

> **Antwort:** c) Data Analyst — der Data Scientist kommt zum Data Analyst für Visualisierung und Berichterstellung.
