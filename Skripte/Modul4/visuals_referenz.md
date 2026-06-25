# Power BI Visuals – Referenz und Entscheidungshilfe

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skripte 18 & 19 · Schüler-Skript</div>
  <div class="pbi-page-title">Visuals in Power BI</div>
  <div class="pbi-page-sub">Balkendiagramm · Säulendiagramm · Liniendiagramm · Flächendiagramm · Kreis- und Ringdiagramm · Tabellenvisual · Matrixvisual</div>
</div>

> Dieses Dokument beschreibt die sieben wichtigsten Visuals in Power BI Desktop. Für jedes Visual findest du: Zweck und Einsatzbereich, alle verfügbaren Felder (Wells), die wichtigsten Format-Optionen und typische Fehler. Die Kontrollwerte beziehen sich auf das techtrade-Modell.

---

## Entscheidungsmatrix

Bevor du ein Visual wählst: Was willst du kommunizieren?

| Frage | Visual |
|---|---|
| Welche Kategorie hat den höchsten Wert? | Balkendiagramm (nach Wert sortiert) |
| Wie entwickelt sich ein Wert über Zeit? | Liniendiagramm (keine Lücken) oder Säulendiagramm (mit Lücken) |
| Welchen Anteil hat jede Kategorie? | Ringdiagramm (bis 5 Kategorien) |
| Wie groß ist ein einzelner KPI? | Kartenvisual |
| Welche Details stecken hinter einem Wert? | Tabellenvisual oder Matrixvisual |
| Wie setzt sich ein Gesamtwert zusammen? | Gestapeltes Balken- oder Säulendiagramm |
| Wie ist die Rangfolge in mehreren Gruppen? | Geclustertes Säulendiagramm |

---

# 1. Balkendiagramm

## Zweck

Das Balkendiagramm vergleicht Werte zwischen Kategorien. Die Balken verlaufen **horizontal** — das macht lange Kategoriebeschriftungen gut lesbar.

**Wann verwenden:**
- Mehr als drei Kategorien
- Beschriftungen sind länger als fünf Zeichen
- Rangfolge soll sofort sichtbar sein

**Wann nicht verwenden:**
- Zeitreihen (Zeit gehört auf eine horizontale X-Achse)
- Weniger als drei Kategorien
- Anteile am Ganzen — dafür Ringdiagramm oder 100%-Variante

## Varianten

| Variante | Einsatz |
|---|---|
| Geclustert | Mehrere Balken pro Kategorie nebeneinander — direkter Wertvergleich |
| Gestapelt | Balken zu einem Gesamtbalken summiert — Gesamtwert + Zusammensetzung |
| 100% gestapelt | Alle Balken gleich lang — nur Anteile sichtbar, kein Gesamtwert |

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Y-Achse | Text, Datum | Ja | Jeder eindeutige Wert = eine Zeile. Mehrere Felder = Hierarchie mit Drill-down |
| X-Achse | Measure / Zahl | Ja | Mehrere Measures = geclusterte Balken |
| Legende | Textfeld | Nein | Teilt Balken in Segmente auf → automatisch gestapelt |
| Kleine Vielfache | Textfeld | Nein | Wiederholt das Visual für jede Kategorie (Small Multiples) |
| QuickInfo | Beliebig | Nein | Erscheint beim Hover — für Zusatzinformationen die keinen eigenen Platz haben |

## Wichtige Format-Optionen

**Format → Visual → Balken**
- *Farben:* Standardmäßig einheitlich. Bedingte Formatierung für wertabhängige Farben aktivieren.
- *Abstand zwischen Balken:* Niedrigerer Wert = dickere Balken.

**Format → Visual → Datenbeschriftungen**
- *Ein/Aus:* Werte direkt am Balkenende anzeigen.
- *Anzeigeeinheiten:* Auto / Tausend / Millionen. "Auto" kürzt Nullen ab — kann zu komischen Werten führen (z.B. "168,37 Tsd."). Besser: manuell auf "Keine" oder "Tausend" setzen.
- *Position:* Innen Ende, Außen Ende, Innen Mitte, Innen Basis.

**Format → X-Achse**
- *Bereich Start:* Standardmäßig 0 — nicht verändern. Eine abgeschnittene Achse täuscht Unterschiede vor.
- *Skalierungstyp:* Linear (Standard) oder Logarithmisch.

**Format → Allgemein**
- *Alternativtext:* Für Barrierefreiheit — Screenreader lesen diesen Text vor.
- *Visualheader:* Symbole oben rechts — für Endbenutzerberichte ausblenden.

## Häufige Fehler

**Alphabetische Sortierung beibehalten.** Power BI sortiert standardmäßig alphabetisch. Das kommuniziert keine Priorität. Immer nach Wert sortieren: Drei Punkte oben rechts im Visual → Absteigend sortieren → Feldname.

**X-Achse beginnt nicht bei 0.** Visuell werden dann kleine Unterschiede als groß dargestellt.

**Zu viele Legendeneinträge.** Mehr als acht Farben sind kaum zu unterscheiden. Ab fünf Kategorien Small Multiples verwenden.

**Zwei Kategoriefelder in die Y-Achse ziehen statt eines in Y-Achse und eines in Legende.** Die Y-Achse erzeugt Zeilen, die Legende teilt Balken auf.

## Abgrenzung

**Säulendiagramm:** Identische Logik, vertikal. Bei Zeitreihen immer Säulendiagramm. Bei langen Beschriftungen immer Balkendiagramm.

---

# 2. Säulendiagramm

## Zweck

Das Säulendiagramm ist die **vertikale** Version des Balkendiagramms. Kategorien auf der X-Achse, Werte auf der Y-Achse.

**Wann verwenden:**
- Zeitreihen — Zeit verläuft natürlich von links nach rechts
- Wenige Kategorien mit kurzen Beschriftungen (bis ca. fünf Zeichen)

**Wann nicht verwenden:**
- Lange Kategoriebeschriftungen — diese müssen dann schräg gestellt werden, das ist schwer lesbar
- Mehr als acht Kategorien — Säulen werden zu schmal

## Varianten

Identisch mit Balkendiagramm: geclustert, gestapelt, 100% gestapelt.

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| X-Achse | Text, Datum | Ja | Bei Datumsfeldern: automatische Hierarchie Jahr → Quartal → Monat → Tag |
| Y-Achse | Measure / Zahl | Ja | Zweites Measure → sekundäre Y-Achse möglich |
| Sekundäre Y-Achse | Measure | Nein | Eigene Skala rechts — für zwei Measures mit sehr unterschiedlichen Wertebereichen |
| Legende | Textfeld | Nein | Teilt Säulen auf |
| Kleine Vielfache | Textfeld | Nein | Small Multiples |
| QuickInfo | Beliebig | Nein | Hover-Tooltip |

## Wichtige Format-Optionen

**Format → X-Achse → Typ**
- *Kontinuierlich:* Alle Datumspunkte gleichmäßig verteilt — ideal wenn keine Lücken erwartet werden.
- *Kategoriell:* Nur vorhandene Werte — fehlende Perioden erscheinen als sichtbare Lücken. Wichtig bei unsauberen Daten mit fehlenden Monaten.

**Format → Y-Achse → Sekundär**
- Aktivieren wenn zwei Measures auf sehr unterschiedlichen Skalen liegen (z.B. Umsatz in Millionen, Bestellanzahl in Hunderten).

**Analyseoptionen (Lupe-Symbol)**
- *Trendlinie:* Zeigt die Grundrichtung ohne Schwankungen.
- *Prognose:* Verlängert die Zeitreihe in die Zukunft. Konfidenzintervall einstellbar.
- *Konstantenlinie:* Horizontale Referenzlinie bei einem festen Y-Wert (z.B. Monatsziel).
- *Minimun-/Maximumlinie, Durchschnittslinie:* Einstellbar unter Analyseoptionen.

## Häufige Fehler

**`Datum[Date]` statt `Datum[Monat]` auf der X-Achse.** Ergibt eine Säule pro Tag — bei einem Jahr 365 kaum lesbare Säulen.

**Sekundäre Y-Achse nicht aktiviert.** Wenn zwei Measures auf derselben Skala erscheinen und unterschiedliche Größenordnungen haben, wird eines auf nahezu 0 zusammengedrückt.

**Lücken in der Zeitreihe nicht sichtbar gemacht.** X-Achse auf "Kategoriell" stellen wenn Monate ohne Daten möglich sind.

## Abgrenzung

**Säulendiagramm vs. Liniendiagramm:** Säulen betonen diskrete Perioden. Linien betonen Kontinuität und Trend. Bei möglichen Lücken: Säulendiagramm.

---

# 3. Liniendiagramm

## Zweck

Das Liniendiagramm zeigt Werte im **kontinuierlichen Verlauf** — primär für Zeitreihen. Die Linie betont Trends, Bewegungsrichtung und Wendepunkte.

**Wann verwenden:**
- Zeitreihen ohne Lücken
- Trend und Richtungsänderungen kommunizieren
- Mehrere Kennzahlen im Zeitverlauf vergleichen

**Wann nicht verwenden:**
- Wenn Lücken im Zeitraum möglich sind — dann Säulendiagramm
- Mehr als vier Linien (Legende mit mehr als vier Kategorien) — dann Small Multiples
- Für reine Kategorienvergleiche ohne Zeitdimension

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| X-Achse | Datum / Zahl | Ja | Typ Kontinuierlich oder Kategoriell wählbar |
| Y-Achse | Measure | Ja | Mehrere Measures = mehrere Linien |
| Sekundäre Y-Achse | Measure | Nein | Zweite Skala rechts für sehr unterschiedliche Wertebereiche |
| Legende | Textfeld | Nein | Eine Linie pro Kategorienwert |
| Kleine Vielfache | Textfeld | Nein | Small Multiples — besser als viele Linien |
| QuickInfo | Beliebig | Nein | Hover-Tooltip |

## Wichtige Format-Optionen

**Format → Visual → Linien**
- *Stärke:* 1–5 Punkte. Dünner bei mehreren Linien.
- *Linienart:* Durchgehend, gepunktet, gestrichelt. Gestrichelt für Ziel- oder Prognosewerte.
- *Kurvenkrümmung:* Linear (Standard), Abgestuft (treppenartig), Korrekt (leicht geschwungen).
- *Markierungen:* Punkte an jedem Datenpunkt — bei vielen Datenpunkten ausschalten.

**Analyseoptionen (Lupe-Symbol)**
- *Trendlinie:* Lineare Regressionsgerade — zeigt Grundtendenz.
- *Prognose:* Zeitreihenprognose für zukünftige Perioden.
- *Konstantenlinie:* Horizontale Referenzlinie (z.B. Monatsdurchschnitt).

## Häufige Fehler

**Zu viele Linien.** Mehr als vier Linien überlappen und sind kaum zu unterscheiden. Lösung: Small Multiples oder Filterung.

**X-Achse als Kategoriell bei lückenlosen Daten.** Funktioniert, ist aber langsamer als Kontinuierlich.

**Prognose bei fehlenden Perioden.** Wenn die Datenbasis Lücken hat, liefert die Prognose unzuverlässige Ergebnisse.

## Abgrenzung

**Liniendiagramm vs. Flächendiagramm:** Linie betont Verlauf und Wendepunkte. Fläche betont das Volumen unter der Kurve — gut für YTD oder kumulierte Werte.

---

# 4. Flächendiagramm

## Zweck

Das Flächendiagramm ist eine Variante des Liniendiagramms bei der der Bereich zwischen Linie und X-Achse ausgefüllt ist. Die **Fläche** betont das Volumen oder das Aufaddieren von Werten.

**Wann verwenden:**
- Kumulierte Werte (YTD, laufende Summen) — die wachsende Fläche visualisiert das Aufaddieren
- Wenn der Bereich unter der Kurve eine inhaltliche Bedeutung hat
- Gestapelte Variante: Gesamtwert UND Zusammensetzung gleichzeitig

**Wann nicht verwenden:**
- Wenn mehrere Kategorien verglichen werden und sich die Flächen überlagern
- Wenn Einzelwerte präzise verglichen werden sollen

## Varianten

| Variante | Einsatz |
|---|---|
| Flächendiagramm | Eine Fläche pro Measure |
| Gestapeltes Flächendiagramm | Flächen übereinander — Gesamthöhe = Gesamtwert |
| 100% gestapeltes Flächendiagramm | Alle Flächen bis 100% — nur Anteile sichtbar |

## Wells

Identisch mit Liniendiagramm.

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| X-Achse | Datum / Zahl | Ja | Kontinuierlich oder Kategoriell |
| Y-Achse | Measure | Ja | Mehrere Measures = mehrere Flächen |
| Sekundäre Y-Achse | Measure | Nein | Zweite Skala rechts |
| Legende | Textfeld | Nein | Gestapeltes Verhalten |
| Kleine Vielfache | Textfeld | Nein | Small Multiples |
| QuickInfo | Beliebig | Nein | Hover-Tooltip |

## Wichtige Format-Optionen

**Format → Visual → Farben → Transparenz**
- Wichtigstes Flächen-spezifisches Setting. Bei mehreren Flächen auf 50–60% setzen, damit tiefer liegende Flächen sichtbar bleiben.

**Format → Visual → Farben → Verlauf**
- Farbverlauf von der Linie nach unten (oben intensiv, unten verblassend). Gut für Dashboards.

**Format → Visual → Linien → Linienstärke**
- Auf 0 setzen für einen reinen Flächeneffekt ohne sichtbare Linie.

## Häufige Fehler

**Überlappende Flächen ohne Transparenz.** Bei mehreren Measures ohne gestapeltes Layout überdeckt die obere Fläche alle anderen.

**Flächendiagramm für Kategorienvergleich.** Flächendiagramm funktioniert fast ausschließlich für Zeitreihen.

## Abgrenzung

**Fläche vs. Linie:** Fast identisch. Fläche wenn das Volumen die Aussage trägt (z.B. YTD). Linie wenn Wendepunkte und exakter Verlauf wichtiger sind.

---

# 5. Kreis- und Ringdiagramm

## Zweck

Kreis- und Ringdiagramm zeigen **Anteile am Ganzen**. Nur für Zusammensetzungen — nicht für absolute Wertvergleiche.

**Wann verwenden:**
- Maximal fünf Kategorien
- Klare Dominanz einer Kategorie
- Anteil am Ganzen ist die wichtigste Botschaft

**Wann nicht verwenden:**
- Mehr als fünf Kategorien
- Kleine Unterschiede zwischen Segmenten (Balkendiagramm ist präziser)
- Wenn negative Werte möglich sind
- Wenn absolute Werte verglichen werden sollen

## Varianten

**Kreisdiagramm:** Vollkreis. Hat zusätzlich einen Details-Well für Unterkategorien.

**Ringdiagramm:** Kreisdiagramm mit Loch in der Mitte. Der Mittelpunkt kann für einen Gesamtwert genutzt werden — auf Dashboards fast immer besser als das Kreisdiagramm.

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Legende | Textfeld | Ja | Jeder Wert = ein Segment. Maximal 5–6 für gute Lesbarkeit |
| Werte | Measure | Ja | Muss positiv sein. Prozentwerte werden automatisch berechnet |
| Details | Textfeld | Nein | Nur Kreisdiagramm — Unterkategorien innerhalb der Segmente |
| QuickInfo | Beliebig | Nein | Hover-Tooltip |

## Wichtige Format-Optionen

**Format → Visual → Segmente**
- *Segmentbreite (nur Ring):* Dicke des Rings. Schmaler = mehr Platz für Mittelpunktbeschriftung.
- *Hervorgehobenes Segment:* Ein Segment leicht nach außen versetzt anzeigen.

**Format → Visual → Beschriftungen**
- *Beschriftungstyp:* Kategoriename, Datenwert, Prozent oder alle zusammen.
- *Position:* Innen oder Außen. Bei kleinen Segmenten überlappen Außenbeschriftungen — Schriftgröße reduzieren.

**Format → Visual → Mittelpunkt (nur Ring)**
- *Beschriftung:* Statischer Text oder dynamisches Measure.
- Typisches Muster: Zeile 1 "Gesamt" (statisch), Zeile 2 `[Umsatz]` (dynamisch).

## Häufige Fehler

**Zu viele Segmente.** Sechs und mehr Segmente machen das Kreisdiagramm unleserlich. Ab fünf Kategorien Balkendiagramm bevorzugen.

**Kleine Unterschiede zeigen.** Software (530.524) und Dienstleistung (529.449) liegen fast gleichauf — im Kreisdiagramm kaum zu unterscheiden. Balkendiagramm zeigt die Differenz klar.

**Negative Werte.** Das Kreisdiagramm bricht ab. Immer prüfen ob das Measure ausschließlich positive Werte liefert.

## Abgrenzung

**Kreisdiagramm vs. Ringdiagramm:** Funktional identisch. Ringdiagramm hat den Vorteil des Mittelpunkts — auf Dashboards fast immer die bessere Wahl.

**Ring vs. 100% gestapeltes Balkendiagramm:** Ring für eine einzelne Aufschlüsselung. 100% gestapelt wenn mehrere Gruppen nebeneinander verglichen werden sollen.

---

# 6. Tabellenvisual

## Zweck

Das Tabellenvisual zeigt Daten in tabellarischer Form — jede Zeile ist eine Kombination von Feldwerten, jede Spalte ein Feld oder Measure. Ideal für detaillierte Informationen und exakte Werte.

**Wann verwenden:**
- Exakte Zahlen die gelesen oder exportiert werden sollen
- Viele Felder nebeneinander
- Kombiniert mit bedingter Formatierung für visuell codierte Details

**Wann nicht verwenden:**
- Wenn Trends oder Muster die Botschaft sind — Linien- oder Balkendiagramm
- Wenn mehr als 15 Spalten nötig sind — in kleinere Tabellen aufteilen
- Für hierarchische Daten — Matrixvisual verwenden

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Spalten | Beliebig | Ja | Reihenfolge per Drag & Drop ändern. Umbenennen per Rechtsklick im Well. |
| QuickInfo | Beliebig | Nein | Hover-Tooltip für Zusatzinfos |

## Wichtige Format-Optionen

**Format → Visual → Spalten**
- *Breite:* Automatisch (passt sich dem Inhalt an) oder manuell.
- *Kopfzeilenformat:* Schriftart, Größe, Farbe, Hintergrundfarbe. Fetter Kopf mit leicht abgehobenem Hintergrund ist Standard.
- *Textzeilenumbruch:* Lange Beschriftungen umbrechen oder abschneiden.

**Format → Visual → Zellen**
- *Alternierung:* Ungerade/gerade Zeilen alternierend einfärben (Zebramuster) — verbessert Lesbarkeit bei vielen Zeilen.
- *Zeilenhöhe:* Kompakt oder großzügiger.

**Format → Visual → Gesamt**
- *Anzeigen:* Gesamtzeile unten ein- oder ausschalten.
- Measures berechnen die Gesamtzeile automatisch korrekt über den Filterkontext.

**Bedingte Formatierung**

Zugänglich über: Spalte im Well anklicken → Dropdown → Bedingte Formatierung.

| Typ | Beschreibung | Einsatz |
|---|---|---|
| Hintergrundfarbe | Farbskala oder Regelbasiert | Wertebereiche farblich codieren |
| Schriftfarbe | Identisch mit Hintergrund | Kombination für starken Kontrast |
| Datenbalken | Wachsender Balken in der Zelle | Schneller visueller Vergleich ohne eigene Spalte |
| Symbole | Pfeile, Ampeln, Sternchen | Status auf einen Blick (grün/gelb/rot) |

**Datenbalken-Einstellungen:**
- Positive Balken: Farbe und Min/Max-Wert
- Negativer Balken: Eigene Farbe
- Achse: Mittellinie für positive und negative Werte

**Symbole-Einstellungen:**
- Layout: Symbol links / rechts vom Wert, oder nur Symbol
- Symbolart: Pfeil, Kreis, Raute, Fahne, Stern, Ausrufezeichen
- Regeln: Welches Symbol bei welchem Wertbereich

## Häufige Fehler

**Fehlende Sortierung.** Tabellen ohne Sortierung wirken wie rohe Datenauszüge. Immer nach dem wichtigsten Feld sortieren.

**Implizite Aggregation nicht angepasst.** Wenn ein numerisches Feld (z.B. `orders[Einzelpreis]`) direkt in die Tabelle gezogen wird, aggregiert Power BI automatisch als Summe. Das kann semantisch falsch sein — Aggregation auf "Keine" oder "Durchschnitt" ändern wo nötig.

**Zu viele Spalten.** Mehr als acht Spalten sind auf einem normalen Monitor ohne horizontales Scrollen schwer lesbar. Nebenwichtige Informationen in den QuickInfo-Well verlagern.

## Abgrenzung

**Tabellenvisual vs. Matrixvisual:** Tabelle: flache Liste, keine Hierarchie. Matrix: Drill-down, Kreuzabfragen, Zwischensummen. Für hierarchische Daten immer Matrixvisual.

---

# 7. Matrixvisual

## Zweck

Das Matrixvisual ist die Power-BI-Version der Excel-Pivot-Tabelle. Es strukturiert Daten in Zeilen und Spalten, unterstützt Drill-down-Hierarchien und berechnet Zwischensummen auf jeder Ebene.

**Wann verwenden:**
- Hierarchische Daten (Region → Salesrep, Jahr → Quartal → Monat)
- Kreuzabfragen (Zeilen × Spalten — z.B. Region × Kategorie)
- Zwischensummen auf mehreren Ebenen
- Benutzer sollen selbst in Hierarchien ein- und ausklappen

**Wann nicht verwenden:**
- Nur eine Dimension vorhanden — dann Tabellenvisual
- Keine sinnvolle Kreuzabfrage möglich

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Zeilen | Textfeld | Ja | Mehrere Felder = verschachtelte Hierarchie. Erstes Feld = oberste Ebene. |
| Spalten | Textfeld | Nein | Jeder Wert wird zur eigenen Spalte. Nur Felder mit wenigen Werten (< 10) verwenden. |
| Werte | Measure | Ja | Mehrere Measures = mehrere Wertspalten nebeneinander. |

## Wichtige Format-Optionen

**Format → Visual → Zeilenkopfzeilen**
- *+/- Schaltfläche:* Auf/Zuklappen-Symbole. Für Präsentationen ausblenden.
- *Einzug pro Ebene:* Tiefere Hierarchieebenen werden eingerückt — Einzug in Pixeln einstellbar.

**Format → Visual → Teilergebnisse**
- *Zeilenteilsummen:* Zwischensummen am Ende jeder Gruppe (z.B. "Nord gesamt" nach allen Nord-Salesreps).
- *Position:* Oben oder unten.
- *Bezeichnung:* Eigener Text für die Zwischensummenzeile.

**Format → Visual → Gesamtergebnisse**
- Zeilensumme unten und Spaltensumme rechts — unabhängig ein- und ausschaltbar.

## Drill-down-Modi

Vier Modi — zugänglich über die Pfeil-Symbole im Visualheader:

| Symbol | Aktion |
|---|---|
| Pfeil nach unten (einzeln) | Nur diese Gruppe aufklappen — alle anderen bleiben zugeklappt |
| Doppelpfeil nach unten | Alle Gruppen eine Ebene tiefer aufklappen |
| Pfeil rechts | Gesamte Hierarchieebene wechseln — vorherige Ebene verschwindet |
| +/- | Alles auf einmal auf- oder zuklappen |

## Häufige Fehler

**Zu viele Hierarchieebenen.** Drei oder mehr Zeilenebenen sind für Endbenutzer kaum navigierbar. Maximal zwei Ebenen für Endbenutzerberichte.

**Spaltenfeld mit zu vielen Werten.** `products[Produktname]` als Spalte erzeugt eine Spalte pro Produkt — bei 100 Produkten eine 100-Spalten-Matrix. Nur Felder mit wenigen Werten (< 10) als Spalten verwenden.

**Gesamtergebnis bei Measures mit REMOVEFILTERS.** Measures wie `[Umsatz % Gesamt]` zeigen in der Gesamtzeile 100% — weil Zähler und Nenner identisch sind. Gesamtzeile für solche Measures ausblenden oder mit `IF(ISINSCOPE(...), ..., BLANK())` schützen.

**Zwischensummen bei nicht-additiven Measures.** `[Umsatz YoY %]` ist nicht additiv — der Prozentsatz der Summe ist nicht die Summe der Prozentsätze. Teilergebnisse für solche Measures ausschalten.

## Abgrenzung

**Matrixvisual vs. Tabellenvisual:** Matrix: Hierarchie, Drill-down, Kreuzabfragen. Tabelle: flache Liste ohne Hierarchie. Sobald hierarchische Daten vorhanden sind → Matrix.

**Matrixvisual vs. Excel-Pivot:** Matrixvisual reagiert automatisch auf Filterkontext und Slicer. Zwischensummen werden korrekt aus Measures berechnet — keine manuellen Aggregate nötig.

---

## Gemeinsame Regeln für alle Visuals

**Sortierung:** Balken und Säulen immer nach Wert sortieren, nicht alphabetisch.

**Achsenskalierung:** X-Achse und Y-Achse beginnen immer bei 0. Ausnahmen nur mit inhaltlicher Begründung.

**Datenbeschriftungen:** Anzeigeeinheiten immer manuell festlegen — "Auto" kann zu unschönen Dezimalwerten führen (z.B. "168,37 Tsd.").

**Gesamtzeile bei Tabelle und Matrix:** Nicht-additive Measures (Durchschnitte, Prozentwerte) liefern in der Gesamtzeile oft falsche Werte. Gesamtzeile für solche Felder ausblenden.

**Barrierefreiheit:** Für jedes Visual einen Alternativtext hinterlegen (Format → Allgemein → Alternativtext). Farbe nie als einziges Unterscheidungsmerkmal verwenden — immer mit Beschriftung oder Symbol kombinieren.

**Visualheader:** In Endbenutzerberichten den Visualheader für Slicer und dekorative Elemente ausblenden (Format → Allgemein → Visualheader → Aus). Bei Slicern wirken die Symbole störend.
