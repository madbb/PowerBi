# Power BI Visuals – Referenz Teil 2

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skripte 18 & 19 · Schüler-Skript</div>
  <div class="pbi-page-title">Visuals in Power BI – Teil 2</div>
  <div class="pbi-page-sub">Treemap · Trichterdiagramm · Wasserfalldiagramm · Menübanddiagramm</div>
</div>

> Dieser Teil behandelt vier spezialisierte Visuals. Alle vier haben einen klar definierten Einsatzbereich — außerhalb davon sind sie schwer zu lesen. Die Kontrollwerte beziehen sich auf das techtrade-Modell.

---

# 1. Treemap

## Zweck

Die Treemap zeigt Hierarchien und Anteile durch **Rechteckflächen**. Größere Fläche = größerer Wert. Kategorien werden als Hauptrechtecke dargestellt, Unterkategorien als Rechtecke innerhalb der Hauptrechtecke.

**Wann verwenden:**
- Portfolioübersichten mit vielen Kategorien und Unterkategorien
- Wenn sowohl die Kategorie als auch die Unterkategorie sichtbar sein sollen
- Wenn Anteile durch Fläche kommuniziert werden sollen und der Vergleich grob ist

**Wann nicht verwenden:**
- Wenn präzise Wertunterschiede erkennbar sein sollen — Balkenlängen sind für Menschen leichter zu vergleichen als Flächen
- Wenn alle Kategorien ähnliche Größen haben — Flächen unterscheiden sich dann kaum
- Für Zeitreihen

## Varianten

Das Treemap-Visual hat keine Varianten. Es gibt nur das einfache Treemap.

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Kategorie | Textfeld | Ja | Erzeugt die Hauptrechtecke. Jeder eindeutige Wert = ein Rechteck. |
| Details | Textfeld | Nein | Unterteilt jedes Hauptrechteck in Unterrechtecke. Erzeugt die Hierarchie. |
| Werte | Measure | Ja | Bestimmt die Rechteckgröße. Muss positiv sein. |
| QuickInfo | Beliebig | Nein | Hover-Tooltip für zusätzliche Informationen. |

## Wichtige Format-Optionen

**Format → Visual → Datenbeschriftungen**
- *Ein/Aus:* Zeigt Kategoriename und Wert im Rechteck an.
- *Überlauf:* Bei kleinen Rechtecken wird Text automatisch ausgeblendet wenn er nicht passt.
- *Anzeigeeinheiten:* Manuell setzen — "Auto" erzeugt unschöne Dezimalwerte.

**Format → Visual → Kategorien**
- *Beschriftungen:* Kategoriename im Hauptrechteck anzeigen.
- *Schriftart, Größe:* Anpassen damit Beschriftungen lesbar bleiben.

**Format → Visual → Farben**
- *Standardmäßig:* Jede Kategorie bekommt eine eigene Farbe. Im Format einzeln anpassbar.
- *Bedingte Formatierung:* Wertabhängige Farben — z.B. rot für Kategorien unter einem Schwellenwert.

**Format → Allgemein → Alternativtext**
- Für Barrierefreiheit. Screenreader können Flächendiagramme nicht interpretieren — ein erklärender Text ist hier besonders wichtig.

## Häufige Fehler

**Zu ähnliche Größen.** Wenn alle Rechtecke ähnlich groß sind, ist die Treemap kaum lesbar. Beispiel: Privatkunde (890.693), KMU (862.296), Großkunde (769.313), Kleinstunternehmen (764.071) — vier fast gleich große Flächen. Ein Balkendiagramm ist hier präziser.

**Zu viele Kategorien ohne Details-Well.** Ohne Unterkategorien mit vielen Kategorien entsteht eine unstrukturierte Fläche. Ab zehn Kategorien Details-Well verwenden oder Daten vorfiltern.

**Details-Well mit zu vielen Werten.** Wenn die Unterkategorie viele Werte hat (z.B. alle Produktnamen), werden viele Rechtecke so klein, dass sie keine Beschriftung mehr tragen. Auf die wichtigsten Werte filtern.

## Abgrenzung

**Treemap vs. Balkendiagramm:** Treemap ist besser wenn Unterkategorien relevant sind und ein Überblick ausreicht. Balkendiagramm ist besser wenn präzise Längenvergleiche wichtig sind.

**Treemap vs. Ringdiagramm:** Ringdiagramm für eine flache Aufschlüsselung mit wenigen Kategorien. Treemap für hierarchische Daten mit Unterkategorien.

---

# 2. Trichterdiagramm

## Zweck

Das Trichterdiagramm zeigt **sequenzielle Prozessschritte mit abnehmendem Wert** — von oben nach unten werden Stufen kleiner weil Einheiten den Prozess verlassen. Es eignet sich für Konversionsanalysen, Vertriebstrichter und Prozesse mit definierten Verlustpunkten.

**Wann verwenden:**
- Prozesse mit sequenziellen Stufen und messbaren Verlusten zwischen Stufen
- Vertriebsprozesse (Leads → Qualifiziert → Angebote → Abschlüsse)
- Auftragsabwicklung (Eingang → Bearbeitung → Abschluss)

**Wann nicht verwenden:**
- Wenn die Reihenfolge der Stufen keine inhaltliche Bedeutung hat
- Wenn die Werte nicht abnehmend sind — das Trichterdiagramm suggeriert immer eine Verlustlogik
- Für Zeitreihen oder Kategorienvergleiche

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Kategorie | Textfeld | Ja | Die Stufenbezeichnungen. Reihenfolge bestimmt die Trichterfolge. |
| Werte | Measure | Ja | Bestimmt die Breite jeder Stufe. |
| QuickInfo | Beliebig | Nein | Hover-Tooltip. |

## Wichtige Format-Optionen

**Format → Visual → Balken**
- *Farben:* Standardmäßig absteigende Farbabstufung. Jede Stufe einzeln anpassbar.

**Format → Visual → Datenbeschriftungen**
- *Ein/Aus:* Wert und/oder Prozentwert der vorherigen Stufe anzeigen.
- *Beschriftungsinhalt:* Wert, Prozent der ersten Stufe oder Prozent der vorherigen Stufe.

**Sortierung**
- Standardmäßig nach Wert sortiert — das ergibt einen "echten" Trichter.
- Für eine prozesslogische Reihenfolge (Stufe 1 → 2 → 3): manuell sortieren oder Sortierspalte im Modell anlegen.

> **Hinweis zur Sortierung:** Das Trichterdiagramm sortiert standardmäßig nach Wert absteigend. Wenn die inhaltliche Prozessreihenfolge wichtig ist (z.B. immer zuerst "Abgeschlossen", dann "In Bearbeitung"), eine numerische Sortierspalte im Modell anlegen und das Trichterdiagramm danach sortieren.

## Häufige Fehler

**Falsche Reihenfolge.** Wenn Power BI nach Wert sortiert, steht die größte Stufe oben — das entspricht nicht immer der Prozesslogik. Für prozesslogische Reihenfolge eine Sortierspalte anlegen.

**Nicht-sequenzielle Daten.** Das Trichterdiagramm suggeriert immer einen Prozess mit Verlustlogik. Für Kategorienvergleiche ohne Prozesslogik Balkendiagramm verwenden.

**Zu viele Stufen.** Mehr als sieben Stufen machen das Trichterdiagramm unlesbar. Stufen zusammenfassen oder auf die wichtigsten reduzieren.

## Abgrenzung

**Trichterdiagramm vs. Balkendiagramm:** Trichterdiagramm nur wenn eine Verlustlogik zwischen sequenziellen Stufen vorhanden ist. Für einfache Kategorienvergleiche Balkendiagramm.

---

# 3. Wasserfalldiagramm

## Zweck

Das Wasserfalldiagramm zeigt wie ein **Ausgangswert durch positive und negative Beiträge zu einem Endwert** wird. Grüne Balken = Zunahme, rote Balken = Abnahme, graue Balken = Start- und Endwert. Klassisch für Umsatzanalysen, Gewinn-Brücken und Budgetvarianzanalysen.

**Wann verwenden:**
- Aufbau eines Gesamtwerts aus Teilwerten (z.B. Umsatz je Kategorie → Gesamtumsatz)
- Veränderungen zwischen zwei Zeitpunkten (z.B. Umsatz 2022 → Delta 2023 → Umsatz 2023)
- Positive und negative Abweichungen gleichzeitig zeigen

**Wann nicht verwenden:**
- Für reine Kategorienvergleiche ohne Aufbaulogik — Balkendiagramm ist klarer
- Wenn alle Werte dasselbe Vorzeichen haben — gestapeltes Säulendiagramm ist einfacher

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Kategorie | Textfeld | Ja | Jeder Wert = ein Balken. Reihenfolge von links nach rechts. |
| Y-Achse | Measure | Ja | Bestimmt Höhe und Richtung (positiv = grün, negativ = rot). |
| Aufschlüsselung | Textfeld | Nein | Zweites Kategoriefeld — Klick auf einen Balken zeigt Unterkategorien. |
| QuickInfo | Beliebig | Nein | Hover-Tooltip. |

## Wichtige Format-Optionen

**Format → Visual → Farben**
- *Zunahme:* Farbe für positive Balken (Standard: Grün).
- *Abnahme:* Farbe für negative Balken (Standard: Rot).
- *Gesamt:* Farbe für Start- und Endbalken (Standard: Grau).

**Format → Visual → Datenbeschriftungen**
- *Ein/Aus:* Wert auf jedem Balken anzeigen.
- *Anzeigeeinheiten:* Manuell setzen.

**Aufschlüsselung (Drill-down)**
- Wenn ein Feld im Aufschlüsselung-Well liegt, kann per Klick auf einen Balken in die Unterkategorien eingetaucht werden.
- Nützlich z.B. um auf den Hardware-Balken zu klicken und zu sehen wie sich Hardware auf die vier Kanäle aufteilt.

## Häufige Fehler

**Falsche Kategoriereihenfolge.** Das Wasserfalldiagramm liest von links nach rechts. Der Aufbau-Charakter geht verloren wenn die Reihenfolge nicht sinnvoll ist.

**Startwert fehlt.** Ohne einen Startbalken sieht der Betrachter nur Deltas ohne Kontext. Das erste Element sollte immer der Ausgangswert sein (z.B. Vorjahresumsatz oder 0).

**Mischung aus Aufbaulogik und Vergleichslogik.** Entweder Aufbau (mehrere Teilwerte summieren sich zu einem Gesamtwert) oder Veränderung (Startwert + Deltas = Endwert) — nicht beides auf einmal.

## Abgrenzung

**Wasserfalldiagramm vs. gestapeltes Säulendiagramm:** Gestapeltes Säulendiagramm zeigt Zusammensetzung ohne Startpunkt. Wasserfalldiagramm zeigt einen Aufbauprozess oder Veränderung mit Start- und Endwert.

**Wasserfalldiagramm vs. Balkendiagramm:** Für einfache Kategorienvergleiche ohne Aufbaulogik ist das Balkendiagramm klarer und weniger erklärungsbedürftig.

---

# 4. Menübanddiagramm (Ribbon Chart)

## Zweck

Das Menübanddiagramm ist eine Variante des gestapelten Säulendiagramms. Es zeigt zusätzlich wie sich die **Rangfolge von Kategorien über Zeit verändert** — durch farbige "Bänder" die Kategorien von Periode zu Periode verbinden. Auf einen Blick erkennbar: Hat eine Kategorie über Zeit die Führungsposition gewechselt?

**Wann verwenden:**
- Zeitreihen bei denen die Rangfolge von Kategorien interessant ist
- Wenn die Frage lautet: "War Hardware immer führend oder hat sich das verändert?"
- Bei vier bis acht Kategorien

**Wann nicht verwenden:**
- Wenn die Rangfolge stabil ist — dann ist ein normales gestapeltes Säulendiagramm klarer
- Wenn mehr als acht Kategorien vorhanden sind — zu viele Bänder überlappen
- Für Kategorienvergleiche ohne Zeitdimension

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| X-Achse | Datum / Textfeld | Ja | Zeitdimension. Die Perioden von links nach rechts. |
| Y-Achse | Measure | Ja | Wert der Säulen. |
| Legende | Textfeld | Ja | Die Kategorien die als Bänder dargestellt werden. |
| QuickInfo | Beliebig | Nein | Hover-Tooltip. |

## Wichtige Format-Optionen

**Format → Visual → Bänder**
- *Transparenz:* Transparenz der Verbindungsbänder zwischen Perioden. Höherer Wert = weniger auffällige Bänder, Fokus liegt auf den Säulen.
- *Abrundung:* Ecken der Bänder abrunden für einen weicheren Look.

**Format → Visual → Säulen**
- *Farben:* Jede Legendenkategorie hat eine eigene Farbe. Die Bänder übernehmen automatisch dieselbe Farbe.

**Format → Visual → Datenbeschriftungen**
- *Ein/Aus:* Werte auf den Säulen anzeigen.

**Drill-down**
- Wenn die X-Achse ein Datumsfeld mit Hierarchie ist (Jahr → Quartal → Monat), kann per Drill-down in tiefere Zeitebenen navigiert werden.
- Pfeil-Symbole oben im Visual — identisch mit Säulendiagramm.

## Häufige Fehler

**Stabile Rangfolge.** Wenn Hardware in jedem Quartal an erster Stelle steht und sich die Reihenfolge nie ändert, bringt das Menübanddiagramm keinen Mehrwert gegenüber einem normalen gestapelten Säulendiagramm.

**Zu viele Kategorien.** Ab acht Kategorien überlappen die Bänder und werden unlesbar. Auf die wichtigsten Kategorien filtern oder ein normales Säulendiagramm verwenden.

**Legende vergessen.** Ohne Legendenfeld im Well verhält sich das Menübanddiagramm wie ein normales Säulendiagramm ohne Bänder.

## Abgrenzung

**Menübanddiagramm vs. gestapeltes Säulendiagramm:** Identischer Aufbau, aber das Menübanddiagramm zeigt zusätzlich die Rangfolgenveränderung durch farbige Verbindungsbänder. Verwende das Menübanddiagramm nur wenn die Rangfolge eine relevante Information ist.

**Menübanddiagramm vs. Liniendiagramm:** Liniendiagramm zeigt absolute Werte über Zeit. Menübanddiagramm zeigt Zusammensetzung und Rangfolge gleichzeitig.

---

## Vergleich der vier Visuals

| Visual | Stärke | Schwäche | Typische Frage |
|---|---|---|---|
| Treemap | Hierarchie und Anteile gleichzeitig | Präzise Vergleiche schwierig | "Welches Produkt trägt wie viel bei?" |
| Trichterdiagramm | Verlustlogik in Prozessen | Nur für sequenzielle Abnahme | "Wo verlieren wir Kunden im Prozess?" |
| Wasserfalldiagramm | Aufbau und Deltas sichtbar | Erklärungsbedürftig | "Wie setzt sich unser Umsatz zusammen?" |
| Menübanddiagramm | Rangfolgenveränderung über Zeit | Nur bei instabiler Rangfolge sinnvoll | "Hat sich die Kategorie-Führung verändert?" |

---

## Gemeinsame Hinweise

**Alle vier Visuals sind spezialisiert.** Sie ersetzen kein Balken- oder Liniendiagramm — sie ergänzen es für spezifische Fragestellungen. Im Zweifel ist ein einfaches Balkendiagramm klarer.

**Barrierefreiheit.** Treemap und Menübanddiagramm sind für Screenreader besonders schwer zu interpretieren. Alternativtext (Format → Allgemein → Alternativtext) immer ausfüllen.

**Datenbeschriftungen.** Bei allen vier Visuals Anzeigeeinheiten manuell setzen — "Auto" erzeugt unschöne Dezimalwerte wie "168,37 Tsd.".
