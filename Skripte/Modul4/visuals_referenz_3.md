# Power BI Visuals – Referenz Teil 3

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skripte 18 & 21 · Schüler-Skript</div>
  <div class="pbi-page-title">Visuals in Power BI – Teil 3</div>
  <div class="pbi-page-sub">Streudiagramm · Blasendiagramm · Decomposition Tree · Key Influencers</div>
</div>

> Dieser Teil behandelt zwei analytische Diagramme und zwei KI-gestützte Visuals. Alle vier stellen höhere Anforderungen an die Daten als einfache Balken- oder Liniendiagramme. Die Kontrollwerte beziehen sich auf das techtrade-Modell.

---

# 1. Streudiagramm (Scatter Chart)

## Zweck

Das Streudiagramm zeigt den **Zusammenhang zwischen zwei numerischen Größen**. Jeder Punkt im Diagramm steht für eine Kategorie oder einen Datensatz — seine Position auf der X-Achse und Y-Achse zeigt die beiden Werte gleichzeitig. Auf einen Blick erkennbar: Gibt es eine Korrelation? Gibt es Ausreißer?

**Wann verwenden:**
- Zusammenhänge zwischen zwei Measures sichtbar machen (Korrelation)
- Ausreißer identifizieren — Punkte die weit vom Muster liegen
- Cluster erkennen — Gruppen von ähnlichen Datenpunkten

**Wann nicht verwenden:**
- Für Zeitreihen — Liniendiagramm
- Wenn nur eine Dimension vorhanden ist
- Wenn der Zusammenhang bereits bekannt und die genauen Werte wichtig sind — Tabelle

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Werte | Textfeld | Nein | Steuert die Granularität. Leer = ein Punkt pro Legendenkategorie. Befüllt = ein Punkt pro eindeutigem Wert dieses Felds. |
| X-Achse | Measure | Ja | Horizontale Position jedes Punkts |
| Y-Achse | Measure | Ja | Vertikale Position jedes Punkts |
| Legende | Textfeld | Nein | Farbe der Punkte nach Kategorie |
| Größe | Measure | Nein | Punktgröße proportional zum Wert → Blasendiagramm |
| Wiedergabeachse | Datum / Zahl | Nein | Animierter Zeitverlauf — Punkte bewegen sich über Zeit. Abspielknopf erscheint unten im Visual. Sinnvoll mit Datum[Jahr] oder Datum[Quartal]. |
| QuickInfo | Beliebig | Nein | Hover-Tooltip |

> **Werte-Well:** Das wichtigste und ungewöhnlichste Well beim Punktdiagramm. Leer gelassen aggregiert Power BI alle Daten pro Legendenkategorie — vier Kategorien = vier Punkte. Wird ein Feld hineingelegt (z.B. `products[Produktname]`), erscheint ein Punkt pro eindeutigem Wert dieses Felds — also ein Punkt pro Produkt. Das steuert die Detailtiefe des Diagramms.

## Wichtige Format-Optionen

**Format → Visual → Datenpunkte**
- *Darstellung:* Kreis, Raute, Dreieck, Quadrat, X. Hilfreich wenn Punkte sich überlagern.
- *Größe:* Standardgröße der Punkte wenn kein Größen-Well gesetzt ist.
- *Pinstrich:* Dünne Linie zum nächsten Punkt beim Hover — zeigt Y-Wert genauer.

**Format → Visual → Formen**
- *Markierungen:* Punkte kleiner machen wenn viele Datenpunkte vorhanden sind.

**Analyseoptionen (Lupe-Symbol)**
- *Trendlinie:* Lineare Regressionsgerade über alle Punkte — zeigt die Grundrichtung des Zusammenhangs.
- *Symmetrieschattierung:* Markiert den Bereich über oder unter der Diagonale.
- *Verhältnislinie:* Linie bei einem festen X/Y-Verhältnis.
- *Clustering:* Power BI gruppiert ähnliche Punkte automatisch und färbt sie ein.

## Wichtige Datenpunkte (techtrade)

Streudiagramm mit X-Achse: `[Anzahl Bestellungen]`, Y-Achse: `[Umsatz]`, Legende: `products[Kategorie]`:

| Kategorie | Bestellungen | Umsatz | Ø je Bestellung |
|---|---|---|---|
| Hardware | 545 | 2.032.297 | 3.729 |
| Software | 499 | 530.524 | 1.063 |
| Dienstleistung | 466 | 529.449 | 1.136 |
| Zubehör | 597 | 194.103 | 325 |

Hardware ist der klare Ausreißer — hoher Umsatz bei mittlerer Bestellanzahl. Zubehör hat die meisten Bestellungen, aber den niedrigsten Umsatz. Software und Dienstleistung liegen fast übereinander.

## Häufige Fehler

**Werte-Well leer lassen wenn Kategorieebene gewünscht.** Wenn nur vier Punkte (eine Kategorie pro Punkt) gezeigt werden sollen, Werte-Well leer lassen. Wird versehentlich ein Feld hineingezogen, erscheinen plötzlich viele Punkte.

**Zu viele Punkte durch falsches Werte-Well.** Wenn `orders[OrderID]` ins Werte-Well gezogen wird, erscheinen 3.000 Punkte — einer pro Bestellung. Das ist unleserlich. Werte-Well auf sinnvolle Granularität begrenzen (Produkt, Kategorie).

**Korrelation als Kausalität interpretieren.** Ein Streudiagramm zeigt Zusammenhänge, keine Ursachen. Hardware hat hohen Umsatz weil die Produkte teurer sind — nicht weil weniger Bestellungen zu mehr Umsatz führen.

## Abgrenzung

**Streudiagramm vs. Blasendiagramm:** Identisch, aber das Blasendiagramm hat zusätzlich ein Größen-Well das eine dritte Dimension hinzufügt.

---

# 2. Blasendiagramm

## Zweck

Das Blasendiagramm ist ein **Streudiagramm mit einer dritten Dimension** — die Punktgröße kodiert einen zusätzlichen Wert. Damit sind drei Measures gleichzeitig in einem Visual sichtbar.

**Wann verwenden:**
- Wenn drei Measures gleichzeitig verglichen werden sollen
- Wenn die dritte Dimension (Größe) inhaltlich bedeutsam ist — z.B. Umsatz als Größe neben Bestellanzahl und Durchschnittspreis

**Wann nicht verwenden:**
- Wenn die Größenunterschiede gering sind — dann sind Blasen kaum zu unterscheiden
- Wenn mehr als zehn Kategorien vorhanden sind — zu viele Blasen überlagern sich

## Wells

Identisch mit Streudiagramm, aber:

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Größe | Measure | Nein | Wird zum Pflichtfeld für das Blasendiagramm — bestimmt den Kreisdurchmesser |

> **Unterschied Scatter zu Bubble:** Das Visual heißt in Power BI immer "Punktdiagramm (Scatter Chart)". Es wird automatisch zum Blasendiagramm sobald das Größen-Well befüllt ist.

## Wichtige Format-Optionen

**Format → Visual → Blasen**
- *Maximale Blasengröße:* Prozentualer Anteil des verfügbaren Platzes für die größte Blase. Erhöhen wenn kleine Blasen kaum sichtbar sind, verringern wenn Blasen sich überlagern.
- *Skalierung:* Linear oder Quadratwurzel. Quadratwurzel sorgt dafür dass die Blasenfläche proportional zum Wert ist — bei linearer Skalierung wird der Durchmesser proportional, was Flächen überproportional groß erscheinen lässt.

## Wichtige Datenpunkte (techtrade)

Blasendiagramm: X-Achse: `[Anzahl Bestellungen]`, Y-Achse: `[Umsatz]`, Größe: `[Bruttoumsatz]`, Legende: `products[Kategorie]`:

Hardware erscheint als größte Blase (Bruttoumsatz 2.115.661) oben rechts im mittleren Bestellanzahlbereich. Zubehör als kleine Blase rechts unten (viele Bestellungen, niedriger Umsatz, kleine Bruttoumsatz-Blase).

## Häufige Fehler

**Lineare statt Quadratwurzel-Skalierung.** Bei linearer Skalierung erscheinen große Blasen unverhältnismäßig dominant — Quadratwurzel-Skalierung gibt eine korrektere visuelle Proportion.

**Größe als unwichtiges Feld.** Das Größen-Well sollte einen inhaltlich relevanten dritten Wert zeigen. Eine dritte Dimension die denselben Trend zeigt wie X oder Y fügt keine Information hinzu.

## Abgrenzung

**Blasendiagramm vs. Streudiagramm:** Blasendiagramm wenn drei Measures gleichzeitig verglichen werden sollen. Streudiagramm für zwei Measures.

---

# 3. Decomposition Tree (Analysebaum)

## Zweck

Der Decomposition Tree ermöglicht **interaktives Aufschlüsseln eines Gesamtwerts** entlang beliebiger Dimensionen — ohne eine feste Hierarchie vorzugeben. Der Benutzer wählt bei jedem Schritt selbst welche Dimension als nächstes aufgeschlüsselt werden soll. Power BI kann die nächste Dimension auch automatisch vorschlagen (KI-Aufschlüsselung).

**Wann verwenden:**
- Explorative Analyse ohne feste Drilldown-Hierarchie
- "Warum ist dieser Wert so hoch oder niedrig?" — Ursachenforschung
- Wenn der Benutzer selbst entscheiden soll welche Dimension er betrachtet

**Wann nicht verwenden:**
- Wenn eine feste Drilldown-Reihenfolge vorgeschrieben ist — Matrixvisual mit Hierarchie
- Für Zeitreihenanalyse
- Wenn das Ergebnis reproduzierbar und konsistent sein muss — der Benutzer kann jeden Pfad nehmen

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Analysieren | Measure | Ja | Der Wert der aufgeschlüsselt wird. Erscheint als Ausgangspunkt links. |
| Erläutern nach | Textfelder | Ja | Alle Dimensionen die der Benutzer zur Aufschlüsselung auswählen kann. Mehrere Felder möglich. |

## Bedienung

Der Decomposition Tree startet mit dem Gesamtwert im Analysieren-Well. Rechts davon erscheint ein **+**-Symbol.

Klick auf **+** → Auswahlliste aller Felder aus dem Erläutern-nach-Well → Dimension wählen → Aufschlüsselung erscheint.

Jede aufgeschlüsselte Ebene hat wieder ein **+** für den nächsten Schritt.

**KI-Aufschlüsselung:**
Statt manuell eine Dimension zu wählen auf **Hoher Wert** oder **Niedriger Wert** klicken → Power BI sucht automatisch die Dimension mit dem stärksten statistischen Einfluss.

> **Wichtig:** Die KI-Aufschlüsselung analysiert den Datensatz statistisch und schlägt die erklärungsstärkste Dimension vor. Das Ergebnis kann überraschend sein — Power BI findet möglicherweise Zusammenhänge die nicht offensichtlich sind.

## Wichtige Format-Optionen

**Format → Visual → Baumstruktur**
- *Balken:* Zeigt kleine Balkendiagramme neben den Werten für schnelle visuelle Einschätzung.
- *Relative Balken:* Balken relativ zum Maximalwert der jeweiligen Ebene.

**Format → Visual → Kopfzeile**
- *Stil:* Einfach oder mit Kategoriename in der Kopfzeile.

## Wichtige Datenpunkte (techtrade)

Analysieren: `[Umsatz]`, Erläutern nach: `orders[Kanal]`, `salesreps[Region]`, `products[Kategorie]`, `customers[Segment]`:

Startpunkt: Gesamtumsatz **3.286.373**

Aufschlüsselung nach Kanal → Online führt mit **1.334.622**

Online → Region → Ost führt mit **311.660**

Online → Ost → Kategorie → Hardware mit **207.457**

Bei KI-Aufschlüsselung (Hoher Wert) nach dem ersten Schritt wählt Power BI wahrscheinlich Kategorie als stärksten Einflussfaktor — Hardware erklärt den größten Anteil des Online-Umsatzes.

## Häufige Fehler

**Zu viele Felder im Erläutern-nach-Well.** Mehr als fünf bis sechs Dimensionen machen die Auswahlliste unübersichtlich. Nur die analytisch relevanten Felder einbinden.

**KI-Aufschlüsselung unkritisch übernehmen.** Power BI findet statistische Zusammenhänge — ob diese inhaltlich sinnvoll sind, muss der Benutzer beurteilen. Scheinkorrelationen sind möglich.

**Ergebnis nicht reproduzierbar.** Zwei Benutzer die unterschiedliche Dimensionen wählen, sehen unterschiedliche Ergebnisse. Wenn ein konsistentes Ergebnis benötigt wird, lieber Matrixvisual oder Drillthrough.

## Abgrenzung

**Decomposition Tree vs. Matrixvisual:** Matrix: feste Hierarchie, reproduzierbares Ergebnis, Zwischensummen. Decomposition Tree: flexible Exploration, kein festes Ergebnis, gut für Ursachenforschung.

**Decomposition Tree vs. Drillthrough:** Drillthrough führt zu einer vorbereiteten Detailseite. Decomposition Tree ist offen — der Benutzer navigiert selbst.

---

# 4. Key Influencers (Haupteinflussfaktoren)

## Zweck

Das Key-Influencers-Visual führt eine **statistische Analyse** durch: Es untersucht welche Faktoren (Dimensionen) einen gemessenen Wert am stärksten beeinflussen. Power BI berechnet automatisch den statistischen Zusammenhang und präsentiert die wichtigsten Einflussfaktoren gerankt.

**Wann verwenden:**
- "Was treibt hohe Einzelpreise?" / "Was beeinflusst die Kundenzufriedenheit?"
- Einflussfaktoren ohne eigene statistische Kenntnisse identifizieren
- Hypothesen überprüfen: "Stimmt es dass Hardware teurer ist?"

**Wann nicht verwenden:**
- Wenn weniger als 100–200 Datenpunkte vorhanden sind — die statistische Analyse ist dann nicht belastbar
- Für exakte Ursache-Wirkungs-Analysen — Key Influencers zeigt Korrelationen, keine Kausalität
- Wenn die Einflussfaktoren bereits bekannt sind — einfacheres Visual verwenden

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Analysieren | Measure oder Textfeld | Ja | Der zu erklärende Wert. Bei Textfeldern: Analyse ob ein Zustand häufiger oder seltener auftritt. |
| Erläutern nach | Textfelder | Ja | Die potenziellen Einflussfaktoren. Mehrere Felder möglich. |
| Nach erweitern | Textfelder | Nein | Zusätzliche Segmentierungsfelder für tiefere Analyse. |

> **Analysieren — Measure vs. Textfeld:**
> - **Measure:** Power BI analysiert wann der Wert höher oder niedriger als der Durchschnitt ist. Beispiel: `orders[Einzelpreis]` — wann ist er überdurchschnittlich hoch?
> - **Textfeld:** Power BI analysiert wann ein bestimmter Kategorienwert häufiger oder seltener vorkommt. Beispiel: `orders[Status]` — wann tritt "Storniert" häufiger auf?

## Reiter im Visual

**Haupteinflussfaktoren:** Zeigt die wichtigsten Faktoren gerankt. Jeder Faktor wird mit einem Diagramm erklärt das zeigt wie stark der Unterschied ist.

**Top-Segmente:** Zeigt Kombinationen von Faktoren die gemeinsam den stärksten Einfluss haben. "Wenn Kategorie = Hardware UND Kanal = Online, ist der Einzelpreis um X% höher als im Durchschnitt."

## Wichtige Format-Optionen

**Format → Visual → Analyse**
- *Typ:* Absolut oder Relativ. Absolut zeigt die tatsächliche Wertdifferenz, Relativ den prozentualen Unterschied.

**Format → Visual → Anzahl der Einflussfaktoren**
- Wie viele Faktoren im Visual angezeigt werden — Standard: 10.

## Wichtige Datenpunkte (techtrade)

Analysieren: `orders[Einzelpreis]` (Wann ist er hoch?), Erläutern nach: `products[Kategorie]`, `orders[Kanal]`, `customers[Segment]`:

Anteil der Bestellungen mit Einzelpreis > 1.000 Euro nach Kategorie:

| Kategorie | Anteil EP > 1.000 |
|---|---|
| Hardware | 82,8% |
| Software | 4,2% |
| Dienstleistung | 1,7% |
| Zubehör | 0,0% |

Power BI wird **Kategorie = Hardware** als stärksten Einflussfaktor identifizieren — Hardware erklärt den Großteil der hohen Einzelpreise. Kanal und Segment haben kaum Einfluss (alle Kanäle liegen zwischen 20,8% und 24,5%).

## Häufige Fehler

**Zu wenige Datenpunkte.** Bei wenigen Hundert Zeilen sind die statistischen Ergebnisse instabil — Power BI zeigt dann Warnhinweise. Mit dem techtrade-Modell (3.000 Bestellungen) funktioniert es ausreichend.

**Einflussfaktoren unkritisch übernehmen.** Wie beim Decomposition Tree: Power BI findet statistische Zusammenhänge. Ob diese inhaltlich kausal sind, muss der Analyst beurteilen.

**Falscher Analysieren-Typ.** Measure für numerische Werte (Preis, Umsatz), Textfeld für kategorische Werte (Status, Kanal). Einen Kanal ins Analysieren-Well zu ziehen statt ins Erläutern-nach-Well ergibt eine andere Fragestellung.

**Zu viele Erläutern-nach-Felder.** Power BI testet alle Felder gegen das Analysieren-Feld. Zu viele Felder verlangsamen das Visual und erhöhen die Wahrscheinlichkeit von Scheinkorrelationen.

## Abgrenzung

**Key Influencers vs. Decomposition Tree:** Decomposition Tree: manuelles Aufschlüsseln entlang selbst gewählter Dimensionen. Key Influencers: automatische statistische Analyse welche Dimension den stärksten Einfluss hat.

**Key Influencers vs. Streudiagramm:** Streudiagramm: visueller Zusammenhang zwischen zwei Measures. Key Influencers: statistisch berechneter Einfluss mehrerer Dimensionen auf einen Wert.

---

## Vergleich der vier Visuals

| Visual | Stärke | Schwäche | Typische Frage |
|---|---|---|---|
| Streudiagramm | Zusammenhänge und Ausreißer sichtbar | Aggregationsfalle — Details-Well nötig für Einzelwerte | "Hängen Bestellanzahl und Umsatz zusammen?" |
| Blasendiagramm | Drei Dimensions gleichzeitig | Größenunterschiede bei ähnlichen Werten kaum erkennbar | "Welche Kategorie hat hohen Umsatz, viele Bestellungen und hohen Bruttowert?" |
| Decomposition Tree | Flexible Ursachenforschung ohne feste Hierarchie | Ergebnis nicht reproduzierbar — jeder Nutzer sieht anderen Pfad | "Warum ist der Umsatz in dieser Region so hoch?" |
| Key Influencers | Automatische statistische Analyse | Braucht viele Datenpunkte, zeigt Korrelation nicht Kausalität | "Was treibt hohe Einzelpreise?" |

---

## Gemeinsame Hinweise

**Korrelation ist keine Kausalität.** Alle vier Visuals zeigen statistische Zusammenhänge oder Muster — keine Ursachen. Die inhaltliche Interpretation liegt beim Analysten.

**Datenmenge.** Streudiagramm und Blasendiagramm funktionieren gut bei wenigen Kategorien (4–20 Punkte). Key Influencers und Decomposition Tree benötigen mindestens 100–200 Datenpunkte für sinnvolle Ergebnisse.

**Performance.** Key Influencers ist rechenintensiv — bei großen Modellen kann das Visual langsam laden. Im Performance Analyzer auf lange DAX-Abfragezeiten achten.
