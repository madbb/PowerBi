# Trainer-Skript 01 - Einführung in die Datenanalyse

> **Themen:** Analysekategorien · Datenrollen · Aufgaben eines Data Analysts
> **Schüler-Skript:** 01_einfuehrung_datenanalyse.md

---

## Einstieg

**Frage ans Plenum:** Wer von euch hat schon mal mit Daten gearbeitet - Excel, Berichte, Auswertungen?

- Kurz ankommen lassen, ein paar Reaktionen abwarten
- Überleitung: Daten haben die meisten gesehen - aber was macht man wirklich damit?

**Kerngedanke ansprechen:**
- Viele Unternehmen haben riesige Datenmengen - nutzen sie kaum
- Datenanalyse = Rohdaten zu handlungsrelevanten Erkenntnissen
- Ziel ist immer: eine Geschichte erzählen, die Entscheidungen unterstützt

---

## Block 1 - Die fünf Analysekategorien

**Frage ans Plenum:** Was glaubt ihr - welche Frage stellt man sich bei einer Datenanalyse zuerst?

> **Erwartete Antwort:** Was ist passiert? / Was sind unsere Zahlen?
> Das ist die beschreibende Analyse - die Basis für alles.

**Die fünf Kategorien durchgehen - als Steigerung präsentieren:**

- **Beschreibend** - Was ist geschehen? KPIs, ROI, historische Zusammenfassung
  *KPIs = Key Performance Indicators, auf Deutsch: Kennzahlen. Zum Beispiel Umsatz, Kundenzahl oder Reklamationsquote. ROI = Return on Investment, also wie viel Gewinn ein investierter Betrag gebracht hat. Schüler fragen oft: "Was ist der Unterschied zu einem normalen Bericht?" - Antwort: keiner, beschreibende Analyse ist genau das.*

- **Diagnostisch** - Warum ist es geschehen? Anomalien finden, Ursachen erklären
  *Anomalie bedeutet einfach: etwas Unerwartetes in den Daten. Zum Beispiel ein Umsatzeinbruch in einem Monat ohne erkennbaren Grund. Die diagnostische Analyse sucht nach dem Warum dahinter.*

- **Prädiktiv** - Was wird passieren? Muster aus der Vergangenheit, neuronale Netze, Regressionen
  *Neuronale Netze und Regressionen sind Methoden aus der Statistik und KI, um Vorhersagen zu treffen. Schüler müssen das nicht im Detail verstehen - der Kernpunkt ist: man nutzt Vergangenheitsdaten um Zukunft abzuschätzen.*

- **Präskriptiv** - Was sollte getan werden? Handlungsempfehlungen, maschinelles Lernen gestützt
  *Maschinelles Lernen bedeutet: Ein Computerprogramm erkennt selbst Muster in Daten, ohne dass man ihm explizit sagt wonach es suchen soll. Die präskriptive Analyse geht einen Schritt weiter als die prädiktive: sie empfiehlt nicht nur was passieren wird, sondern was man tun sollte.*

- **KI-gestützt** - Welche Muster stecken drin? Sprachverarbeitung, Bilderkennung, Codegenerierung, minimaler menschlicher Eingriff
  *Sprachverarbeitung heißt: der Computer liest und versteht Text automatisch, zum Beispiel Kundenbewertungen. Das läuft heute weitgehend ohne menschliches Zutun.*

**Wichtig betonen:** Die Kategorien bauen aufeinander auf - ohne beschreibende Analyse keine diagnostische, ohne diagnostische keine prädiktive usw.

**Beispiel Einzelhandel kurz skizzieren** (steht im Schüler-Skript, hier nur als Ankerpunkt):
- Konsummuster der Vergangenheit - beschreibend
- Warum Umsatzanstieg? - diagnostisch
- Welche Produkte weiter gefragt? - prädiktiv
- Nachbestellen ja/nein? - präskriptiv
- Kundenbewertungen in Echtzeit - KI

**Frage ans Plenum:** Welche dieser Analyse-Typen macht ihr in eurem Job heute schon - bewusst oder unbewusst?

> **Erwartete Antworten:** Die meisten machen beschreibend (Berichte, Tabellen). Manche diagnostisch (warum laufen die Zahlen schlecht). Selten prädiktiv oder präskriptiv.
> Guter Aufhänger: Power BI hilft, weiter nach oben zu kommen in dieser Skala.

**Vertrauen in Daten - kurz ansprechen:**
- Datenanalyse funktioniert nur wenn das Unternehmen seinen eigenen Daten vertraut
- Daten müssen aus verlässlichen Quellen kommen, verständlich aufbereitet sein
- Ohne Vertrauen: Entscheidungsträger ignorieren die Ergebnisse

---

## Block 2 - Datenrollen

**Frage ans Plenum:** Was glaubt ihr - wer ist für die Daten in einem Unternehmen zuständig? Gibt es da eine Rolle oder viele?

> **Erwartete Antwort:** Verschiedene Meinungen - IT, Controlling, Datenbankadmin...
> Überleitung: Es gibt tatsächlich fünf spezialisierte Rollen, die sich überschneiden.

**Die fünf Rollen durchgehen - Abgrenzungen betonen:**

- **Business Analyst** - Interpretation, wirtschaftliche Abläufe, Entscheidungsunterstützung. Kein Fokus auf technische Aufbereitung. Kann dieselbe Person sein wie ein Data Analyst.
  *Faustregel: Der Business Analyst schaut auf die fertigen Zahlen und zieht Schlüsse. Er tippt selbst keine SQL-Abfragen.*

- **Data Analyst** - Das sind wir. Schnittstelle zwischen Rohdaten und Entscheidungsträgern. Profilieren, bereinigen, transformieren, modellieren, berichten. Auch verantwortlich für Sicherheit der Power BI-Ressourcen.
  *Schnittstelle bedeutet: Wir stehen in der Mitte. Wir bekommen die Rohdaten von der IT und liefern fertige Berichte an die Führungskräfte.*

- **Data Engineer** - Baut die Infrastruktur. ETL-Prozesse, Datenfluss, Datenplattformen. Geht über Datenbankadmin hinaus. Schafft die Grundlage auf der wir als Analysts aufbauen.
  *ETL steht für Extract, Transform, Load - auf Deutsch: Daten herausziehen, umformen, laden. Das ist der Prozess, Daten aus verschiedenen Quellen in ein zentrales System zu bringen. Der Data Engineer baut diese Pipelines.*

- **Analytics Engineer** - Schließt die Lücke zwischen Engineer und Analyst. Technischer als ein Analyst, näher am Business als ein Engineer. Kuratiert Daten in Data Lakes, baut semantische Modelle.
  *Data Lake ist ein zentraler Speicherort für große Mengen unterschiedlichster Daten - strukturiert und unstrukturiert. Vorstellen wie ein riesiger Datensee, aus dem man sich das herausholt was man braucht. Kuratieren bedeutet: aufbereiten und ordnen, damit andere damit arbeiten können.*

- **Data Scientist** - Erweiterte Analysen, ML-Modelle, Deep Learning. Kommt zu uns wenn er Visualisierungen braucht.
  *ML = Machine Learning, auf Deutsch: maschinelles Lernen. Deep Learning ist eine Unterkategorie davon, die besonders gut bei Bild- und Spracherkennung funktioniert. Der Data Scientist entwickelt diese Modelle - er braucht uns für die schöne Aufbereitung der Ergebnisse.*

**Frage ans Plenum:** Wo würdet ihr euch selbst einordnen - oder wo wollt ihr hin?

> **Erwartete Antworten:** Die meisten landen beim Data Analyst, manche beim Business Analyst.
> Keine falsche Antwort - Ziel des Kurses ist der Data Analyst-Bereich für die PL-300.

**Zusammenarbeit betonen:**
- Als Data Analyst bekommt ihr Daten vom Data Engineer (aus Data Warehouse / Data Lake)
- Data Scientists kommen zu euch für Visualisierung und Berichte
- Das ist kein Silo - sondern ein Team

*Data Warehouse: Ein Datenlager, das speziell für Analysen optimiert ist. Im Gegensatz zu operativen Datenbanken (die für schnelle Einzeltransaktionen gebaut sind) ist ein Data Warehouse für große Auswertungen über lange Zeiträume ausgelegt.*

---

## Block 3 - Aufgaben eines Data Analysts

**Frage ans Plenum:** Was glaubt ihr - welche Aufgabe nimmt den meisten Teil der Arbeitszeit eines Data Analysts in Anspruch?

> **Erwartete Antwort:** Oft wird "Berichte erstellen" oder "Visualisierungen" genannt.
> Richtige Antwort: Datenvorbereitung. Das überrascht viele.

**Die fünf Aufgaben als Kreislauf erklären:**

**Vorbereiten** (zeitaufwändigster Schritt - iterativ, zieht sich durch das gesamte Projekt)
- Daten profilieren - was haben wir überhaupt?
  *Profiling bedeutet: Daten untersuchen bevor man sie verarbeitet. Wie viele Zeilen? Wie viele Lücken? Welche Wertebereiche kommen vor? Wie eine erste Qualitätsprüfung.*
- Bereinigen - Fehler, fehlende Werte, falsche Typen korrigieren
- Transformieren - Strukturen anpassen, konvertieren
- Verbindungsart zur Quelle wählen (hat Auswirkung auf Performance)
- Datenschutz: personenbezogene Daten anonymisieren oder entfernen
  *Personenbezogene Daten sind Daten, über die man eine Person identifizieren kann: Name, Adresse, E-Mail, Ausweisnummer. Die DSGVO schreibt vor, wie damit umgegangen werden muss - das ist auch Aufgabe des Data Analysts.*

**Wichtig betonen:** Fehlerhafte Daten führen zu ungültigen Berichten, Vertrauensverlust und schlechten Entscheidungen. Garbage in, garbage out.

*Garbage in, garbage out: Ein englischer Fachbegriff, der besagt: Wer schlechte Daten reinkippt, bekommt schlechte Ergebnisse raus. Klingt banal, ist aber der häufigste Fehler in der Praxis.*

**Modellieren**
- Beziehungen zwischen Tabellen definieren
  *Beziehungen in Power BI sind wie Fremdschlüssel in einer Datenbank: Sie sagen dem Programm, welche Spalte in Tabelle A mit welcher Spalte in Tabelle B zusammenhängt. Zum Beispiel: KundenID in der Bestelltabelle verweist auf KundenID in der Kundentabelle.*
- Metriken und benutzerdefinierte Berechnungen hinzufügen
- Auf Genauigkeit und Performance optimieren

**Hinweis für die Klasse:** Wenn ein Bericht langsam ist, liegt es fast nie an der Visualisierung - fast immer an der Vorbereitung oder Modellierung.

**Visualisieren**
- Geeignete Visuals wählen - nicht jedes Diagramm passt zu jedem Datentyp
  *Visual ist der Fachbegriff in Power BI für ein einzelnes Diagramm, eine Karte oder Tabelle auf einer Berichtsseite.*
- Barrierefreiheit bedenken: Farben, Schriftgrößen
- KI-Features nutzen (Copilot, Quick Insights) - kein Code nötig
  *Quick Insights ist eine Power BI-Funktion, die automatisch interessante Muster in den Daten sucht und als fertige Diagramme anzeigt - ohne dass man etwas konfigurieren muss.*
- Weniger ist mehr - nicht alle Datenpunkte auf einmal

**Analysieren**
- Erkenntnisse gewinnen, Muster und Trends identifizieren
- Vorhersagen treffen
- Ergebnisse verständlich kommunizieren
- Erweiterte Features: Azure ML, Cognitive Services, Copilot-Integration
  *Azure ML und Cognitive Services sind Cloud-Dienste von Microsoft für maschinelles Lernen und KI. Als Data Analyst muss man sie nicht selbst programmieren - aber man kann sie in Power BI-Berichte einbinden.*

**Verwalten**
- Berichte, Dashboards, Arbeitsbereiche pflegen
  *Arbeitsbereiche in Power BI sind wie Projektordner im Browser: Dort liegen die fertigen Berichte, Modelle und Dashboards. Mehrere Personen können gemeinsam daran arbeiten.*
- Freigabe und Verteilung steuern
- Sicherheit: wer sieht welche Daten?
- Datensilos abbauen durch gemeinsame semantische Modelle
  *Datensilo: Eine Abteilung hat ihre Daten, eine andere ihre Daten - und beide reden nicht miteinander. Das führt zu widersprüchlichen Berichten. Semantische Modelle, die zentral gepflegt werden, lösen dieses Problem.*
- Wichtige Daten zertifizieren: Vertrauen stärken

**Frage ans Plenum:** Welche dieser fünf Aufgaben klingt für euch am anspruchsvollsten?

> **Erwartete Antworten:** Modellieren und Analysieren werden oft genannt.
> Alle fünf sind wichtig und kommen im Kurs dran - die PL-300 prüft alle Bereiche.

---

## Abschluss & Übergang

**Kurze Zusammenfassung ansprechen:**
- 5 Analysekategorien (beschreibend bis KI-gestützt)
- 5 Datenrollen (wir sind der Data Analyst - Schnittstelle zwischen Daten und Entscheidung)
- 5 Analyst-Aufgaben (Vorbereiten · Modellieren · Visualisieren · Analysieren · Verwalten)

**Übergang zu Skript 02:**
"Bevor wir mit echter Datenarbeit anfangen, schauen wir uns Power BI als Werkzeug an - welche Komponenten es gibt und wie der typische Arbeitsablauf aussieht."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren - Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Ein Unternehmen möchte verstehen, warum der Umsatz im letzten Quartal gesunken ist. Welche Analysekategorie ist das?

- a) Beschreibend
- b) Diagnostisch (richtig)
- c) Prädiktiv
- d) Präskriptiv

> **Antwort:** b) Diagnostisch - es geht um die Ursache eines vergangenen Ereignisses.

---

**Frage 2:** Welche Rolle ist primär verantwortlich dafür, die Dateninfrastruktur und ETL-Prozesse aufzubauen?

- a) Data Analyst
- b) Business Analyst
- c) Data Engineer (richtig)
- d) Data Scientist

> **Antwort:** c) Data Engineer - er baut die Infrastruktur, auf der der Data Analyst aufbaut.

---

**Frage 3:** Ein Power-BI-Bericht läuft sehr langsam. Wo liegt die Ursache am wahrscheinlichsten?

- a) Zu viele Visualisierungen auf der Seite
- b) Falsche Farbwahl im Design
- c) Datenvorbereitung oder Modellierung (richtig)
- d) Zu viele Benutzer greifen gleichzeitig zu

> **Antwort:** c) Datenvorbereitung oder Modellierung - Performance-Probleme entstehen fast immer dort, nicht in der Visualisierungsschicht.

---

**Frage 4:** Welche Aufgabe eines Data Analysts ist typischerweise am zeitaufwändigsten?

- a) Visualisieren
- b) Analysieren
- c) Verwalten
- d) Vorbereiten (richtig)

> **Antwort:** d) Vorbereiten - es ist ein iterativer Prozess, der sich durch das gesamte Projekt zieht.

---

**Frage 5:** Ein Data Scientist hat ein ML-Modell entwickelt und möchte die Ergebnisse präsentieren. An wen wendet er sich?

- a) Data Engineer
- b) Business Analyst
- c) Data Analyst (richtig)
- d) Analytics Engineer

> **Antwort:** c) Data Analyst - der Data Scientist kommt zum Data Analyst für Visualisierung und Berichterstellung.
