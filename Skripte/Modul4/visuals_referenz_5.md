# Power BI Visuals – Referenz Teil 5

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skripte 18 & 19 · Schüler-Skript</div>
  <div class="pbi-page-title">Visuals in Power BI – Teil 5</div>
  <div class="pbi-page-sub">Datenschnitt (Slicer) · Q&A-Visual · Smart Narrative</div>
</div>

> Dieser Teil behandelt drei Visuals die keine klassischen Diagramme sind: den Datenschnitt als Filterelement, das Q&A-Visual für natürlichsprachige Abfragen und Smart Narrative für automatisch generierte Textzusammenfassungen. Die Kontrollwerte beziehen sich auf das techtrade-Modell.

---

# 1. Datenschnitt (Slicer)

## Zweck

Der Datenschnitt ist das wichtigste interaktive Filterelement in Power BI. Er filtert alle anderen Visuals auf der Seite — oder seitenübergreifend wenn er synchronisiert ist. Anders als der Filterbereich ist der Datenschnitt direkt auf der Berichtsseite sichtbar und für Benutzer sofort erkennbar.

**Wann verwenden:**
- Wenn Benutzer selbst filtern sollen und der Filter sichtbar sein soll
- Für Hauptfilterdimensionen die häufig verwendet werden (Region, Kanal, Zeitraum)
- Als zentrales Navigationselement auf Übersichtsseiten

**Wann nicht verwenden:**
- Für technische oder permanente Filter — dafür Filterbereich (ausgeblendet oder gesperrt)
- Wenn der Slicer und ein Filterbereichsfilter für dasselbe Feld existieren — das verwirrt Benutzer
- Für Felder mit sehr vielen Werten (über 50) — Dropdown-Slicer verwenden

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Feld | Textfeld oder Datum | Ja | Das Feld nach dem gefiltert wird. Nur ein Feld möglich. |

## Varianten und Stile

Der Datenschnitt hat sechs verschiedene Darstellungsstile:

| Stil | Beschreibung | Wann geeignet |
|---|---|---|
| Liste | Alle Werte als scrollbare Liste | Viele Werte, genaue Auswahl |
| Kacheln | Alle Werte als klickbare Schaltflächen | Wenige Werte (2–6), Touch-freundlich |
| Dropdownliste | Kompaktes Auswahlfeld | Wenn Platz knapp ist, fragt Modell erst beim Öffnen ab |
| Zwischen (Datum) | Zwei Kalenderfelder mit Bereichsauswahl | Datumsfelder, freie Bereichsauswahl |
| Vor (Datum) | Alle Werte bis zu einem Datum | Datumsfelder, "bis heute"-Filter |
| Relativ (Datum) | "Letzte 7 Tage", "Letzter Monat" | Datumsfelder, dynamischer Zeitraum |

Stil wechseln: Visual anklicken → Format → Visual → Slicer-Einstellungen → Stil.

## Wichtige Format-Optionen

**Format → Visual → Slicer-Einstellungen**
- *Stil:* Liste, Kacheln, Dropdown, Datum-Varianten.
- *Auswahl → Einzelauswahl:* Nur ein Wert gleichzeitig wählbar (Standard: Mehrfachauswahl möglich).
- *Auswahl → Alle auswählen anzeigen:* Schaltfläche "Alle" einblenden zum schnellen Zurücksetzen.

**Format → Visual → Werte**
- *Schriftart, Größe:* Texte im Slicer — groß genug für Touch-Bedienung (min. 14pt).
- *Hintergrundfarbe:* Farbe der nicht ausgewählten Elemente.
- *Ausgewählte Farbe:* Hervorgehobene Farbe für ausgewählte Elemente.

**Format → Allgemein → Visualheader**
- *Anzeigen:* Für Slicer ausschalten — die Symbole (Fokusmodus, Exportieren) wirken beim Slicer unpassend und störend.

## Slicer synchronisieren

Slicer können seitenübergreifend synchronisiert werden: Ansicht → Slicer synchronisieren.

Im Dialog für jeden Slicer festlegen:
- **Sichtbar:** Slicer auf dieser Seite anzeigen (Augensymbol).
- **Synchronisiert:** Slicer filtert diese Seite auch wenn er dort nicht sichtbar ist.

Typischer Einsatz: Region-Slicer auf Übersichtsseite. Detailseiten synchronisiert aber ausgeblendet — der Filter wirkt ohne sichtbaren Slicer.

## Kontrollwerte (techtrade)

Slicer auf `orders[Kanal]` → "Online" auswählen. Alle anderen Visuals auf der Seite filtern auf Online. Erwarteter Umsatz: **1.334.622**

Slicer auf `salesreps[Region]` → "Nord" auswählen. Erwarteter Umsatz: **684.413**

Datums-Slicer auf `Datum[Date]` → Bereich: 2022-01-01 bis 2024-12-30 (gesamter Zeitraum). Alle Daten vorhanden.

## Häufige Fehler

**Slicer und Filterbereich für dasselbe Feld gleichzeitig.** Das verwirrt Benutzer — sie wissen nicht welches Element "gewinnt". Entweder Slicer oder Filterbereich, nie beides für dieselbe Dimension.

**Slicer-Visualheader nicht ausgeblendet.** Die Fokusmodus- und Weitere-Optionen-Symbole machen beim Slicer keinen Sinn. Format → Allgemein → Visualheader → Aus.

**Liste statt Dropdown bei vielen Werten.** Ein Slicer mit 50 Kundennamen als Liste beansprucht enorm viel Platz. Dropdown-Stil wählen.

**Keine Möglichkeit zum Zurücksetzen.** Wenn Benutzer versehentlich falsch filtern, müssen sie die Filterung rückgängig machen können. "Alle auswählen anzeigen" einschalten oder eine Reset-Schaltfläche mit Lesezeichen anlegen.

## Abgrenzung

**Datenschnitt vs. Filterbereich:** Datenschnitt: sichtbar auf der Seite, für Benutzerinteraktion. Filterbereich: kann ausgeblendet und gesperrt werden, für technische oder permanente Filter.

**Datenschnitt vs. Schaltflächen mit Lesezeichen:** Datenschnitt: direkte Filterung. Schaltflächen mit Lesezeichen: mehr Kontrolle über das Erscheinungsbild, können den ausgeblendeten Slicer steuern ohne ihn sichtbar zu machen.

---

# 2. Q&A-Visual

## Zweck

Das Q&A-Visual erlaubt es Benutzern, **Fragen in natürlicher Sprache** zu stellen. Power BI interpretiert die Frage und generiert automatisch ein passendes Visual. Kein Ziehen von Feldern, kein Konfigurieren von Wells.

**Wann verwenden:**
- Für Benutzer die selten mit Power BI arbeiten und den Berichtsaufbau nicht kennen
- Als ergänzendes Explorationselement neben fertigen Berichten
- Wenn Benutzer ad-hoc Fragen stellen die nicht im vorbereiteten Bericht beantwortet werden

**Wann nicht verwenden:**
- Als Ersatz für einen gut gestalteten Bericht — das Q&A-Visual ist ein Einstieg, kein Ziel
- Wenn die Feldnamen im Modell schlecht benannt sind (technisch, englisch, kryptisch) — Q&A basiert auf Feldnamen und Synonymen

## Wells

Das Q&A-Visual hat keine klassischen Wells. Benutzer tippen ihre Frage in das Textfeld.

## Bedienung

**Frage eingeben:** Ins Textfeld klicken → Frage tippen. Power BI schlägt Fragen vor während der Benutzer tippt.

**Visual-Typ angeben:** Zur Frage den Diagrammtyp hinzufügen: "...als Balkendiagramm", "...als Ringdiagramm".

**In echtes Visual umwandeln:** Zahnrad-Symbol oben rechts im Visual → "In Standard-Visual umwandeln". Das generierte Visual wird zu einem echten Balken- oder Liniendiagramm das normal bearbeitet werden kann.

## Synonyme konfigurieren

Wenn das Modell deutschsprachige Feldnamen hat, versteht Q&A bereits viele Begriffe. Synonyme erweitern das Vokabular:

Daten-Tab → In diesem Modell die Fragen stellen → Synonyme verwalten.

Beispiele für nützliche Synonyme:
- Für `orders[Kanal]`: "Vertriebskanal", "Verkaufskanal", "Kanal"
- Für `[Umsatz]`: "Erlös", "Einnahmen", "Verkaufswert"
- Für `products[Kategorie]`: "Produktgruppe", "Warengruppe"

## Typische Fragen (techtrade)

| Frage | Erwartetes Ergebnis |
|---|---|
| "Umsatz nach Region" | Balkendiagramm, 5 Regionen |
| "Umsatz nach Region als Balkendiagramm" | Balkendiagramm, sortiert |
| "Höchster Umsatz" | Kartenvisual: West 724.155 |
| "Umsatz 2023 nach Kategorie" | Balkendiagramm: Hardware 477.175, Software 120.459, Dienstleistung 102.801, Zubehör 47.051 |
| "Bestellungen je Status" | Balken oder Ringdiagramm nach Status |

## Wichtige Format-Optionen

**Format → Visual → Frage**
- *Schriftart, Größe:* Größe des Texteingabefelds.
- *Fragehinweise anzeigen:* Vordefinierte Fragevorschläge anzeigen oder ausblenden.

## Häufige Fehler

**Schlechte Feldnamen im Modell.** Q&A versteht "Bestelldatum", "Kategorie", "Umsatz" — aber nicht "ord_date", "cat_id", "rev_net_rab". Vor dem Einsetzen von Q&A alle Felder und Tabellen mit sinnvollen deutschen Namen versehen.

**Fehlende Synonyme.** Benutzer fragen nach "Erlös" — aber das Feld heißt `[Umsatz]`. Ohne Synonym findet Q&A keinen Treffer. Synonyme für alle wichtigen Measures und Felder anlegen.

**Q&A als Hauptnavigation verwenden.** Q&A ist ein Zusatz für explorative Fragen. Der Bericht selbst sollte alle wichtigen Fragen bereits mit vorbereiteten Visuals beantworten.

## Abgrenzung

**Q&A-Visual vs. Decomposition Tree:** Decomposition Tree: manuelles Aufschlüsseln eines bekannten Werts. Q&A: freie Fragen in natürlicher Sprache, Power BI generiert das Visual.

---

# 3. Smart Narrative

## Zweck

Smart Narrative generiert **automatisch einen erklärenden Text** auf Basis der Daten im Bericht. Power BI analysiert Visuals oder das gesamte Modell und formuliert Kernaussagen als lesbaren Text. Der Text aktualisiert sich dynamisch wenn Slicer oder Filter geändert werden.

**Wann verwenden:**
- Berichte die erklärt werden sollen ohne dass Benutzer selbst interpretieren müssen
- Bildungsberichte und externe Präsentationen wo Kontext wichtig ist
- Als dynamische Zusammenfassung die immer den aktuellen Filterzustand beschreibt

**Wann nicht verwenden:**
- Wenn der Text zu technisch oder generisch wirkt — Smart Narrative produziert manchmal unnatürliche Formulierungen
- Wenn Benutzer selbst interpretieren sollen — dann schränkt ein vorgefertigter Text die Analyse ein
- Auf Dashboards für erfahrene Analysten — sie lesen lieber Zahlen als Text

## Wells

Smart Narrative hat keine klassischen Wells. Es analysiert alle Visuals auf der aktuellen Seite oder das gesamte Modell.

## Bedienung

**Einfügen:** Visualisierungsbereich → Smart Narrative (Sprechblase mit Zauberstab).

Power BI generiert sofort einen Text. Beispiel auf Basis der techtrade-Daten:

*"Der Gesamtumsatz beträgt 3,29 Mio. Die Region West führt mit 724.155 und liegt 37,2% über der Region Süd mit 527.627. Hardware macht 61,8% des Umsatzes aus."*

**Text bearbeiten:** Im Visual direkt klicken und tippen. Statischer Text bleibt statisch, dynamische Werte werden durch Measures verknüpft.

**Dynamische Werte einbetten:** Cursor im Text positionieren → **Wert** → Measure oder Feld auswählen. Der eingebettete Wert aktualisiert sich bei Filteränderungen.

Beispiel für manuellen Text mit dynamischen Werten:

*"Die Region [dynamisch: aktive Region per Slicer] erzielte im gewählten Zeitraum einen Umsatz von [dynamisch: [Umsatz]] Euro."*

## Wichtige Format-Optionen

**Format → Visual → Textfeld**
- *Schriftart, Größe:* Text anpassen.
- *Ausrichtung:* Links, Mitte, Rechts.

**Format → Visual → Zusammenfassung**
- *Automatische Zusammenfassung aktualisieren:* Ob Power BI den Text bei Datenänderungen automatisch neu generiert.

## Kontrollwerte (techtrade)

Nach Generierung auf der Übersichtsseite sollte Smart Narrative folgende Kernaussagen enthalten:

- Gesamtumsatz: 3.286.373 (oder 3,29 Mio.)
- Führende Region: West mit 724.155
- Schwächste Region: Süd mit 527.627
- Hardware-Dominanz: 2.032.297 (61,8%)

## Häufige Fehler

**Generierter Text ungeprüft übernehmen.** Smart Narrative formuliert manchmal unnatürlich oder betont unwichtige Kennzahlen. Den generierten Text immer lesen und manuell überarbeiten.

**Dynamische Werte nicht verknüpft.** Wenn ein Wert direkt eingetippt wird ("3.286.373") statt als dynamischer Wert verknüpft, aktualisiert er sich nicht bei Filteränderungen. Immer Measures als dynamische Werte einbetten.

**Smart Narrative als Ersatz für gut gestaltete Visuals.** Ein gut gestalteter Bericht kommuniziert seine Aussagen durch Visuals — Smart Narrative ist ein Ergänzung für Benutzer die lieber lesen als interpretieren.

## Abgrenzung

**Smart Narrative vs. Textfeld:** Normales Textfeld: statischer Text, manuell geschrieben. Smart Narrative: automatisch generierter Text mit dynamischen Werten die sich aktualisieren.

**Smart Narrative vs. Q&A-Visual:** Q&A: Benutzer stellt Fragen, Power BI antwortet mit einem Visual. Smart Narrative: Power BI formuliert automatisch Aussagen ohne Benutzerinteraktion.

---

## Vergleich der drei Visuals

| Visual | Benutzerinteraktion | Zweck | Typischer Einsatz |
|---|---|---|---|
| Datenschnitt | Aktiv — Benutzer wählt Werte | Filtersteuerung | Kanal, Region, Zeitraum filtern |
| Q&A-Visual | Aktiv — Benutzer stellt Fragen | Explorative Analyse | Ad-hoc-Fragen die der Bericht nicht beantwortet |
| Smart Narrative | Passiv — Power BI generiert Text | Automatische Zusammenfassung | Externe Berichte, Erklärungstexte |

---

## Hinweis: Visualheader-Regeln

| Visual | Visualheader |
|---|---|
| Datenschnitt | **Ausblenden** — Symbole wirken störend |
| Q&A-Visual | Behalten — Zahnrad für Synonymverwaltung nützlich |
| Smart Narrative | Behalten — Bearbeitungsmodus-Symbol wird gebraucht |
