# Trainer-Skript 04 - Copilot für Power BI

> **Themen:** Was Copilot leisten kann · Daten vorbereiten · Modell gestalten · Berichte generieren · Zusammenfassungen
> **Schüler-Skript:** 04_copilot_power_bi.md

---

## Einstieg

**Frage ans Plenum:** Wer von euch hat schon mal mit ChatGPT, GitHub Copilot oder einem anderen KI-Assistenten gearbeitet?

- Kurz Handzeichen zählen
- Folgefrage: War das Ergebnis sofort nutzbar oder musstet ihr nachbessern?
- Überleitung: Genau das gilt auch für Copilot in Power BI. Er nimmt Arbeit ab, aber er ersetzt das Fachwissen nicht.

**Kerngedanke ansprechen:**
- Copilot ist kein Ersatz für den Data Analyst, sondern ein Beschleuniger
- Voraussetzung für gute Ergebnisse: saubere Daten und ein durchdachtes semantisches Modell
- Wer Müll reinkippt, bekommt Müll zurück. Garbage in, garbage out.

---

## Block 1 - Was Copilot für Power BI leisten kann

**Frage ans Plenum:** Welche typischen Schritte gehören zur Berichtsentwicklung in Power BI?

> **Erwartete Antworten:** Daten importieren, transformieren, Modell bauen, Visuals erstellen, veröffentlichen
> Genau diese Phasen kann Copilot unterstützen. Aber nicht überall gleich stark.

**Die drei Phasen vorstellen:**

- **Daten vorbereiten & modellieren**: Beziehungen zusammenfassen, Kennzahlen vorschlagen, DAX generieren
  *Kennzahlen sind in Power BI berechnete Werte wie "Gesamtumsatz" oder "Durchschnittlicher Bestellwert". Sie werden mit DAX definiert. DAX steht für Data Analysis Expressions - die Formelsprache von Power BI, ähnlich wie Excel-Formeln, aber für Datenmodelle gedacht.*

- **Daten visualisieren & analysieren**: Berichtsseiten generieren, Inhalte vorschlagen, Fragen beantworten

- **Berichte sichern & verteilen**: Zusammenfassungen und Narrativ-Visuals erstellen
  *Narrativ-Visual ist ein spezielles Diagramm in Power BI, das automatisch einen Text mit den wichtigsten Erkenntnissen aus dem Bericht generiert. Kein Diagramm, sondern lesbarer Fließtext.*

**Wichtig klarmachen:**
- Die Datenbereinigung in Power Query bleibt manuell. Copilot hilft erst danach.
- Voraussetzung: F64- oder Power BI Premium-Kapazität und Schreibzugriff auf den Arbeitsbereich
  *F64 ist eine Kapazitätsstufe in Microsoft Fabric. Premium bedeutet eine erweiterte Power BI-Lizenz für Unternehmen. Beide sind kostenpflichtig und müssen vom Administrator eingerichtet werden. Schreibzugriff bedeutet: Man muss Rechte haben, den Arbeitsbereich zu bearbeiten - nicht nur lesen.*
- Wer keine Premium-Lizenz hat, sieht den Copilot-Button gar nicht erst

**Frage ans Plenum:** Warum kann Copilot die Datenbereinigung in Power Query nicht übernehmen?

> **Erwartete Antwort:** Weil Copilot auf dem semantischen Modell arbeitet, das erst nach der Bereinigung entsteht. Außerdem kennt Copilot die fachlichen Regeln nicht, was richtig und was falsch ist.
> Domänenwissen bleibt beim Menschen.

---

## Block 2 - Daten für Copilot vorbereiten

**Überleitung:** Wenn die Datengrundlage schlecht ist, sind auch die Copilot-Ergebnisse schlecht. Deshalb zuerst: Datenqualität.

**Die sechs Qualitätsdimensionen durchgehen:**

- **Vollständigkeit**: Fehlende Werte erzeugen Lücken in Visuals
  *Wenn eine Zelle leer ist, weiß Power BI nicht was dort stehen sollte. Copilot kann das nicht raten - er rechnet einfach ohne den fehlenden Wert.*

- **Gültigkeit**: Werte außerhalb des erlaubten Bereichs verfälschen Darstellung
  *Beispiel: Eine Altersspalte enthält den Wert 200. Technisch ist das eine Zahl, inhaltlich aber unsinnig. Power BI erkennt das nicht als Fehler - Copilot rechnet damit.*

- **Konsistenz**: Inkonsistente Daten beeinflussen datumsbezogene Visuals
  *Inkonsistenz bedeutet zum Beispiel: Derselbe Monat ist mal als "Jan" und mal als "Januar" und mal als "01" gespeichert. Power BI behandelt das als drei verschiedene Kategorien.*

- **Eindeutigkeit**: Duplikate beeinträchtigen die Datengenauigkeit
  *Duplikat: Derselbe Datensatz kommt mehrfach vor. Häufig passiert das beim Zusammenführen von Datenquellen. Power BI summiert dann doppelt - Copilot merkt das nicht.*

- **Datenbeziehungen**: Ohne Beziehungen keine tabellenübergreifenden Visuals
  *Beziehungen in Power BI verbinden zwei Tabellen über eine gemeinsame Spalte, zum Beispiel KundenID. Ohne diese Verbindung kann Power BI nicht über Tabellengrenzen hinweg filtern oder aggregieren.*

- **DAX-Berechnungen**: Fehlende Kennzahlen reduzieren mögliche Erkenntnisse
  *Wenn im Modell keine Kennzahlen definiert sind, kann Copilot keine sinnvollen Vorschläge machen. Er braucht eine Grundlage aus definierten Berechnungen.*

**Frage ans Plenum:** Was passiert, wenn ihr eine Kundentabelle mit 10 Prozent Duplikaten an Copilot übergebt und einen Bericht generieren lasst?

> **Erwartete Antwort:** Umsätze werden doppelt gezählt, Kundenzahlen sind zu hoch, alle abgeleiteten Kennzahlen sind falsch
> Copilot erkennt das nicht. Er rechnet stur mit dem, was im Modell steht.

**Power Query als Pflichtschritt:**
- **Profilieren**: Spaltenqualität, -verteilung und -profil bewerten
  *Profiling in Power Query zeigt auf einen Blick: Wie viele Zeilen sind leer? Welche Werte kommen wie oft vor? Gibt es Ausreißer? Wie ein automatischer Qualitätsbericht.*
- **Bereinigen**: Inkonsistenzen, unerwartete Werte und NULL-Werte beheben
  *NULL bedeutet in Datenbanken: kein Wert vorhanden. Nicht dasselbe wie 0 oder ein leerer Text. NULL muss man explizit behandeln, weil Berechnungen mit NULL-Werten oft unerwartet reagieren.*
- **Transformieren**: Sprechende Namen vergeben, Datentypen anpassen, Form anpassen

**Klare Ansage:**
- Power Query ist der erste und unverzichtbare Schritt
- Ohne sauber vorbereitete Daten ist Copilot wertlos
- Diese Arbeit kann KI nicht abnehmen. Punkt.

---

## Block 3 - Semantisches Modell mit Copilot gestalten

**Überleitung:** Wenn die Daten stimmen, fängt der spannende Teil an. Hier kann Copilot wirklich Arbeit abnehmen.

**Beziehungen aufbauen:**
- Beziehungen ermöglichen Filter und Aggregationen über mehrere Tabellen
  *Aggregation bedeutet: Einzelwerte zu einem Gesamtwert zusammenfassen - zum Beispiel alle Einzelumsätze zu einem Jahresumsatz summieren.*
- Automatische Beziehungserkennung als Startpunkt nutzen
- Copilot kann das initiale Modell zusammenfassen und fehlende Beziehungen aufzeigen

**Sternschema als Idealfall:**
- Eine zentrale Faktentabelle (Umsätze, Bestellungen, Transaktionen)
  *Faktentabelle: Die Haupttabelle mit den Messwerten. Hier liegen die eigentlichen Zahlen - zum Beispiel jede einzelne Bestellung mit Menge, Preis und Datum.*
- Mehrere Dimensionstabellen drumherum (Kunden, Produkte, Datum, Region)
  *Dimensionstabellen: Beschreibende Tabellen, die Kontext liefern. Die Kundentabelle sagt, wer bestellt hat. Die Produkttabelle sagt, was bestellt wurde. Die Datumstabelle ermöglicht Zeitfilter.*
- Power BI ist für dieses Schema optimiert
  *Sternschema heißt es, weil das Diagramm aussieht wie ein Stern: Die Faktentabelle in der Mitte, die Dimensionen drumherum wie Zacken.*

**Frage ans Plenum:** Warum funktioniert ein Sternschema in Power BI besser als eine einzige große Tabelle?

> **Erwartete Antworten:** Bessere Performance, klarere Filter, weniger Duplikate, einfachere DAX-Berechnungen
> Außerdem: Copilot versteht Sternschemata besser und schlägt sinnvollere Kennzahlen vor.

**Quickmeasures und DAX mit Copilot:**

- **Quickmeasures**: Datenfelder zuweisen, Power BI generiert DAX-Code. Gut zum Lernen.
  *Quickmeasures sind vorgefertigte Berechnungsschablonen. Man wählt eine Vorlage aus (zum Beispiel "Prozentualer Anteil vom Gesamtwert"), füllt die Felder aus und Power BI schreibt den DAX-Code automatisch. Man sieht den generierten Code danach und kann ihn studieren.*

- **DAX-Abfrageansicht**: Vierte Ansicht neben Bericht, Tabelle, Modell. Copilot ist hier integriert.
  *Power BI Desktop hat vier Ansichten: Bericht (die Canvas mit Diagrammen), Tabelle (die Daten als Raster), Modell (die Beziehungen als Diagramm) und DAX-Abfrageansicht (für Berechnungen und Tests). Die vierte Ansicht ist neu und weniger bekannt.*

- DAX aus natürlicher Sprache: "Total sales for all salespeople individually" wird zu einer SUMMARIZECOLUMNS-Abfrage
  *SUMMARIZECOLUMNS ist eine DAX-Funktion, die Daten gruppiert und zusammenfasst. Schüler müssen sie nicht auswendig kennen - der Punkt ist: Copilot schreibt diese Funktion aus einem einfachen deutschen Satz heraus.*

- Eingabe "suggest measures": Copilot schlägt neue Kennzahlen vor (durchschnittlicher Gewinn, Umsatz pro Partner)
- Über "Modell mit Änderungen aktualisieren" werden Kennzahlen dauerhaft ins Modell übernommen

**Praxistipp einbauen:**
- Copilot in der DAX-Abfrageansicht ist auch ein Lernwerkzeug
- Wer DAX nicht versteht, kann sich Beispiele generieren lassen und sie nachvollziehen
- Aber: immer prüfen, ob die Berechnung fachlich stimmt

---

## Block 4 - Berichte mit Copilot erstellen

**Überleitung:** Jetzt zur sichtbaren Magie. Aus einem Prompt entsteht eine komplette Berichtsseite.

*Prompt ist der englische Begriff für die Eingabe oder Anweisung, die man einem KI-System gibt. "Erstelle eine Berichtsseite zu Umsätzen nach Region" ist ein Prompt.*

**In Power BI Desktop:**

- Copilot-Bereich über Menüband-Schaltfläche öffnen
- Vorgeschlagene Eingabeaufforderungen sind sichtbar
- Chat-Feld für eigene Prompts
- Typische Aufgaben: neue Berichtsseite, Inhalte vorschlagen, Datenfrage beantworten

**Was Copilot konkret generiert:**
- Vollständige Berichtsseite in einheitlichem Design
- Kopfzeile mit Datenschnitten
  *Datenschnitt ist ein Filterelement im Bericht: Ein Dropdown oder eine Schaltflächenleiste, mit der der Benutzer die angezeigten Daten einschränken kann, zum Beispiel nach Jahr oder Region.*
- Kartenvisuals für KPIs (Umsatz, Kosten, Gewinn)
  *Kartenvisual zeigt eine einzelne Kennzahl groß und prominent an - zum Beispiel "Gesamtumsatz: 1,4 Mio. Euro". Gut für die wichtigsten Zahlen auf einen Blick.*
- Flächendiagramme im Zeitverlauf
- Säulendiagramme nach Kategorie
- Kartenvisual nach Region
  *Achtung: "Kartenvisual" (Karte, englisch "card") und "Kartenvisual" (Landkarte, englisch "map") sind zwei verschiedene Dinge in Power BI. Letzteres zeigt Daten geografisch auf einer Landkarte.*

**Im Power BI-Dienst:**

- Beim Veröffentlichen entstehen zwei Elemente: semantisches Modell und Bericht
- Direkter Weg im Dienst: Auslassungspunkte am Modell - "Bericht erstellen" - Copilot-Schaltfläche
  *Auslassungspunkte sind die drei Punkte (...) die in vielen Programmen ein Kontextmenü öffnen.*
- Funktionalität ist identisch zum Desktop

**Frage ans Plenum:** Ihr lasst Copilot eine Berichtsseite generieren. Was solltet ihr danach unbedingt tun, bevor ihr den Bericht freigebt?

> **Erwartete Antworten:** Visuals prüfen, Zahlen kontrollieren, Layout anpassen, Beschriftungen prüfen, Filter testen
> Copilot liefert einen ersten Entwurf. Nicht ungeprüft veröffentlichen.

**Wichtig betonen:**
- Copilot-Ergebnisse sind immer Entwürfe
- KI-generierte Antworten können Fehler enthalten
- Wenn Copilot nicht erscheint: Lizenz prüfen, Admin-Aktivierung prüfen, semantisches Modell auswählen

---

## Block 5 - Zusammenfassungen mit Copilot

**Überleitung:** Ein Bericht ist erst dann gut, wenn die Zielgruppe ihn versteht. Zusammenfassungen helfen dabei.

**Narrativ-Visual:**

- Benutzerdefiniertes Visual, das Daten aus Berichtsgrafiken zusammenfasst
- Mehr Kontrolle über Formatierung und Text als automatische Zusammenfassungen
- Verfügbar in Power BI Desktop und im Dienst

**Vorgeschlagene Prompts:**
- "Eine Zusammenfassung geben"
- "Wahrscheinliche Fragen der Unternehmensleitung beantworten"
- "Eine Aufzählungsliste mit Erkenntnissen erstellen"

**Optionen:**
- Eigene Eingabeaufforderung formulieren
- Auswahl: alle Visuals der Seite oder nur bestimmte einbeziehen
- Wechsel zwischen benutzerdefinierter und Copilot-Zusammenfassung zum Vergleich

**Copilot-Bereich für Zusammenfassungen:**

- Entwickler nutzen es für Ideen zur Datendarstellung
- Verbraucher nutzen es zum schnellen Verstehen
- Wichtig: Copilot berücksichtigt alle Daten im Modell, auch hinter aktuell nicht angewendeten Filtern
  *Das bedeutet: Wenn nur der Zeitraum 2024 im Filter eingestellt ist, kann Copilot trotzdem auf Daten aus 2023 zugreifen wenn man ihn danach fragt. Das ist wichtig zu wissen, damit Zusammenfassungen nicht falsch interpretiert werden.*
- Umfang in der Prompt spezifizieren: gesamter Bericht oder nur aktuelle Seite

**Frage ans Plenum:** Welcher Unterschied besteht zwischen einer Zusammenfassung im Narrativ-Visual und einer Zusammenfassung im Copilot-Bereich?

> **Erwartete Antworten:** Narrativ-Visual ist Teil des Berichts und für Leser sichtbar. Copilot-Bereich ist eine temporäre Sicht für den jeweiligen Benutzer.
> Narrativ-Visual ist also für die Veröffentlichung, Copilot-Bereich für die Arbeit damit.

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Copilot beschleunigt Berichtsentwicklung, ersetzt aber kein Fachwissen
- Voraussetzung: F64 oder Premium, sauberes semantisches Modell, aktivierter Copilot
- Power Query bleibt Pflicht. Copilot fängt erst danach an.
- Sternschema ist die ideale Basis für Copilot-Vorschläge
- DAX-Abfrageansicht: Abfragen aus natürlicher Sprache, Kennzahlen über "suggest measures"
- Berichtsseiten in Desktop und Dienst aus Prompts generieren
- Narrativ-Visual für persistente Zusammenfassungen, Copilot-Bereich für temporäre
- Alle Ergebnisse sind Entwürfe. Immer prüfen.

**Übergang zu Skript 05:**
"Wir haben Power BI jetzt von außen gesehen: was es kann, in welchem Kontext es lebt, wie KI dabei hilft. Im nächsten Skript steigen wir konkret in Power BI Desktop ein und bauen unseren ersten Bericht."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren. Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Welche Lizenzanforderung gilt für die Nutzung von Copilot in Power BI?

- a) Power BI Pro reicht aus
- b) Power BI Free mit angemeldetem Microsoft-Konto
- c) F64-Kapazität oder Power BI Premium mit Schreibzugriff auf den Arbeitsbereich (richtig)
- d) Keine Lizenz nötig, Copilot ist kostenlos

> **Antwort:** c) Copilot benötigt F64 oder Power BI Premium und Schreibzugriff auf den jeweiligen Arbeitsbereich.

---

**Frage 2:** Welche Aufgabe bleibt auch bei Einsatz von Copilot Aufgabe des Entwicklers?

- a) DAX-Berechnungen vorschlagen
- b) Berichtsseiten generieren
- c) Daten in Power Query profilieren, bereinigen und transformieren (richtig)
- d) Zusammenfassungen erstellen

> **Antwort:** c) Die Datenaufbereitung in Power Query ist manuell und bleibt Aufgabe des Entwicklers. Copilot fängt erst beim semantischen Modell an.

---

**Frage 3:** In welcher Ansicht von Power BI Desktop ist Copilot für DAX-Abfragen integriert?

- a) Berichtsansicht
- b) Modellansicht
- c) Tabellenansicht
- d) DAX-Abfrageansicht (richtig)

> **Antwort:** d) Die DAX-Abfrageansicht ist die vierte Ansicht in Power BI Desktop. Hier kann Copilot DAX aus natürlicher Sprache generieren und Kennzahlen vorschlagen.

---

**Frage 4:** Welches Datenmodell ist die ideale Grundlage für Copilot-Vorschläge in Power BI?

- a) Eine einzige große Tabelle mit allen Daten
- b) Stern- oder Schneeflockenschema mit Faktentabelle und Dimensionstabellen (richtig)
- c) Mehrere unverbundene Tabellen ohne Beziehungen
- d) Verschachtelte JSON-Strukturen

> **Antwort:** b) Power BI ist für Stern- und Schneeflockenschemata optimiert. Copilot liefert auf dieser Basis die besten Vorschläge.

---

**Frage 5:** Was ist der Unterschied zwischen einem Narrativ-Visual und der Zusammenfassung im Copilot-Bereich?

- a) Es gibt keinen Unterschied, beide funktionieren identisch
- b) Narrativ-Visual ist nur im Dienst verfügbar, Copilot-Bereich nur in Desktop
- c) Das Narrativ-Visual ist Teil des veröffentlichten Berichts und für alle sichtbar. Der Copilot-Bereich liefert temporäre Zusammenfassungen für den jeweiligen Benutzer. (richtig)
- d) Narrativ-Visual generiert immer englischen Text, Copilot-Bereich nur deutschen

> **Antwort:** c) Das Narrativ-Visual ist Bestandteil des Berichts und wird mit veröffentlicht. Der Copilot-Bereich liefert Zusammenfassungen ad hoc und ist nicht Teil des Berichts.
