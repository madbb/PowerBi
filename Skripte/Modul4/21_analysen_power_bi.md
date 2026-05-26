# Analysen in Power BI durchführen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 21</div>
  <div class="pbi-page-title">Analysen in Power BI durchführen</div>
  <div class="pbi-page-sub">Statistiken, Ausreißer, Gruppierung, Clustering, Zeitreihen, Was-wäre-wenn und KI-Visuals</div>
</div>

Power BI ist nicht nur ein Visualisierungswerkzeug — es bietet eine breite Palette analytischer Funktionen, die weit über einfache Berechnungen hinausgehen. Dieses Skript behandelt die wichtigsten integrierten Analysetechniken: von statistischen Zusammenfassungen über Ausreißererkennung und Datensegmentierung bis hin zu Zeitreihenanalysen, Szenario-Planung und KI-gestützten Erkenntnissen.

---

## Statistische Analysen

### Statistische Funktionen in DAX

Power BI unterstützt viele statistische DAX-Funktionen für schnelle Zusammenfassungen: `AVERAGE`, `MIN`, `MAX`, `STDEV.P`, `STDEV.S`, `VAR.P`, `VAR.S`, `MEDIAN` und weitere.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Tipp</span>
  Statistische Funktionen können über Rechtsklick auf ein Feld im Bereich „Visualisierungen" als Schnellfunktionen angewendet werden. Für bessere Leistung empfiehlt es sich jedoch, die Measures explizit in DAX zu erstellen.
</div>

```dax
Average Qty =
AVERAGE ( Sales[Order Qty] )
```

### Histogramme

Ein Histogramm visualisiert die Verteilung einer numerischen Größe — z. B. wie häufig bestimmte Bestellmengen vorkommen. In Power BI wird ein Histogramm mit einem gruppierten Säulendiagramm und einer **Quantisierungsgruppe** erstellt:

1. Im Bereich **Daten** rechtsklick auf das zu analysierende Feld → **Neue Gruppe**
2. Gruppentyp: *Lagerplatz*, Lagerplatztyp: *Anzahl der Lagerplätze*, Intervallgröße festlegen
3. Die erzeugte Gruppe *(Intervalle)* als X-Achse des Säulendiagramms verwenden, das Originalfeld als Y-Achse

### Top-N-Analyse

Drei Methoden, um die N besten (oder schlechtesten) Elemente zu identifizieren:

**Q&A-Visual** — natürlichsprachliche Frage stellen, z. B. *„Was sind meine zehn meistverkauften Produkte nach Umsatz?"*

**Top-N-Filter** — im Bereich **Filter** das Feld auswählen, Filtertyp auf *Top N* stellen, Anzahl und Wertfeld konfigurieren.

**DAX mit TOPN** — die `TOPN`-Funktion gibt die N besten Zeilen einer Tabelle zurück und ermöglicht flexible Berechnungen:

```dax
Top 10 Products =
SUMX (
    TOPN (
        10,
        'Product',
        'Product'[Total Sales]
    ),
    [Total Sales]
)
```

---

## Ausreißer identifizieren

Ein **Ausreißer** ist ein Datenpunkt, der sich erheblich von anderen unterscheidet. Das Identifizieren von Ausreißern ist wichtig, um unerwartete Ereignisse zu entdecken, Ursachen zu untersuchen und fundierte Entscheidungen zu treffen.

### Mit einem Punktdiagramm

Das **Punktdiagramm** ist das beste Visual für Ausreißeranalyse — es zeigt die Beziehung zwischen zwei numerischen Werten und macht Ausreißer als isolierte Datenpunkte sichtbar.

```
X-Achse: Orders Shipped
Y-Achse: Order Qty
```

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 3-scatter-chart-outlier-ss.png — Punktdiagramm mit mehreren konzentrierten Datenpunkten und einem deutlich abgegrenzten Ausreißer.</span>
</div>

Gefundene Ausreißer können mit Slicern oder Filtern markiert und separat für eine tiefergehende Analyse isoliert werden.

### Mit einem DAX-Measure

Ausreißer können auch dynamisch mit einem Measure identifiziert werden — vorteilhafter als berechnete Spalten, da das Ergebnis bei Filteränderungen aktualisiert wird:

```dax
Outliers =
CALCULATE (
    [Order Qty],
    FILTER (
        VALUES ( 'Product'[Product Name] ),
        COUNTROWS (
            FILTER (
                Sales,
                [Order Qty] >= [Min Qty]
            )
        ) > 0
    )
)
```

---

## Daten gruppieren und quantisieren

### Gruppen erstellen

Zwei oder mehr Datenpunkte können direkt in einem Visual manuell zu einer Gruppe zusammengefasst werden:

1. **Strg+Klick** auf mehrere Datenpunkte im Visual
2. Rechtsklick → **Gruppendaten**

Die neue Gruppe erscheint automatisch in der Legende und im Bereich **Daten** und kann in allen anderen Visuals verwendet werden.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 4-updated-visual-group-ssm.png — Balkendiagramm nach Gruppierung: Bundesstaaten mit Umsatz > 500.000 $ sind in einem Farbton, die übrigen in einem anderen.</span>
</div>

Gruppen können nachträglich bearbeitet werden: Rechtsklick auf das Gruppenfeld → **Gruppen bearbeiten** — hier lassen sich Gruppen umbenennen, Werte verschieben oder neue Gruppen erstellen.

### Quantisierungsgruppen (Bins)

Quantisierung unterteilt kontinuierliche Felder (Zahlen, Datum) in gleich große **Intervalle**. Das ermöglicht Trendanalysen auf aussagekräftigeren Aggregationsstufen.

Im Bereich **Daten** rechtsklick auf das Feld → **Neue Gruppe** → Gruppentyp *Lagerplatz* → Intervallgröße festlegen. Das erzeugte Feld *(Intervalle)* kann dann als Achse oder Legende in beliebigen Visuals verwendet werden.

<div class="pbi-definition">
  <strong>Unterschied: Gruppe vs. Quantisierung</strong> Gruppen fassen diskrete Werte manuell zusammen. Quantisierung teilt kontinuierliche Werte automatisch in gleich große numerische Intervalle auf.
</div>

---

## Clusteringtechniken anwenden

**Clustering** findet automatisch ähnliche Datenpunkte im Datensatz — ohne manuelle Vorgabe. Der Unterschied zur manuellen Gruppierung: Power BI analysiert das semantische Modell selbst und identifiziert Gemeinsamkeiten und Unterschiede.

### Clustering auf einem Punktdiagramm

1. Punktdiagramm mit zwei Measures konfigurieren (z. B. `Order Qty` auf X, `Sales` auf Y)
2. Visualheader → **Weitere Optionen (...)** → **Cluster automatisch finden**
3. Im Fenster **Cluster** optional die Anzahl der Cluster festlegen (leer = Power BI wählt automatisch)

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-clustering-applied-scatter-chart-ss.png — Punktdiagramm nach Anwendung von 3 Clustern: Datenpunkte sind in drei farblich unterschiedlichen Gruppen sichtbar.</span>
</div>

Das neue Clusterfeld wird der Legende des Punktdiagramms hinzugefügt, dem Datenmodell hinzugefügt und ist für alle anderen Visuals verfügbar.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Für Clustering mit mehr als zwei Measures ein Tabellenvisual verwenden, alle benötigten Felder hinzufügen und dann den Clustering-Algorithmus darauf anwenden.
</div>

---

## Zeitreihenanalyse durchführen

Die Zeitreihenanalyse untersucht Daten über einen Zeitraum, um Trends, Muster und mögliche zukünftige Entwicklungen zu identifizieren.

### Geeignete Visualtypen

Linien-, Flächen- und Punktdiagramme eignen sich am besten für Zeitreihendaten. Für die Zeitreisenanalyse eignen sich zusätzliche Analyseoptionen:

- **Trendlinien** — zeigen den langfristigen Verlauf über Schwankungen hinweg
- **Prognosen** — projizieren historische Trends in die Zukunft
- **Anomalieerkennung** — hebt ungewöhnliche Ausschläge mit KI hervor (im Liniendiagramm, wenn die X-Achse ein Datumsfeld ist)

### Animierte Zeitreihen mit Play Axis

Das benutzerdefinierte Visual **Play Axis** (aus Microsoft AppSource) fungiert als animierter Datenschnitt — es durchläuft automatisch alle Zeitperioden und zeigt, wie sich die Daten verändern. Mit einem Datumsfeld (z. B. `Quarter`) wird das Visual verbunden; Wiedergabe, Pause und Neustart werden über Steuerungsschaltflächen gesteuert.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Vor dem Import benutzerdefinierter Visuals prüfen, ob die Organisation deren Verwendung erlaubt. Als Alternative steht die native <strong>Abspielachse</strong> des Punktdiagrammvisuals zur Verfügung.
</div>

---

## Die Funktion „Analysieren" verwenden

Die Funktion **Analysieren** generiert automatisch zusätzliche Analysen für einen ausgewählten Datenpunkt in einem Visual. Sie hilft zu verstehen, warum ein Wert so ist, wie er ist.

**Verwendung:** Rechtsklick auf einen Datenpunkt → **Analysieren** → zwei Optionen:

- **Anstieg erklären** — erklärt, welche Faktoren zu einem Anstieg beigetragen haben
- **Unterschiede in dieser Verteilung ermitteln** — zeigt, wie sich die Verteilung des ausgewählten Punkts von der Gesamtverteilung unterscheidet

Ein neues Fenster öffnet sich mit einem automatisch generierten Visual. Mit dem **+**-Symbol in der oberen rechten Ecke lässt sich dieses Visual direkt dem Bericht hinzufügen.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Hinweis</span>
  Die Funktion „Analysieren" funktioniert nicht, wenn nicht-numerische Filter oder Measurefilter auf das Visual angewendet wurden.
</div>

---

## Was-wäre-wenn-Parameter erstellen

Was-wäre-wenn-Parameter ermöglichen Szenarioanalysen: Berichtsnutzer stellen einen Schieberegler ein, und Measures reagieren dynamisch auf den gewählten Wert.

### Parameter konfigurieren

**Modellierung → Neuer Parameter** öffnet das Konfigurationsfenster:

- **Name** — z. B. *Sales Forecast Percentage*
- **Datentyp** — z. B. Feste Dezimalzahl
- **Minimum, Maximum, Inkrement** — z. B. 1, 1,50, 0,05
- **Standardwert** — z. B. 1,00
- **„Dieser Seite Datenschnitt hinzufügen"** — aktiviert einen Slicer automatisch auf der Seite

Power BI erstellt im Hintergrund automatisch eine **berechnete Tabelle** und ein **Measure**, das den aktuell gewählten Schiebereglerwert zurückgibt.

### Parameter in einem Measure verwenden

```dax
Gross Sales Forecast =
[Gross Sales] * [Sales Forecast Percentage Value]
```

Das Measure `Sales Forecast Percentage Value` liefert den aktuellen Schiebereglerwert. Wenn der Berichtsnutzer den Schieberegler bewegt, aktualisiert sich die Säulendiagrammspalte `Gross Sales Forecast` in Echtzeit.

### Bezugslinie ergänzen

Eine konstante Bezugslinie (z. B. Umsatzziel von 2 Mio. $) kann dem Visual über den Analysebereich hinzugefügt werden. So sehen Berichtsnutzer sofort, bei welchem Parameterwert das Ziel erreicht wird.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 3-add-constant-line-ss.png — Säulendiagramm mit Ist- und Prognosesäule plus Bezugslinie bei 2 Mio. $; der Schieberegler zeigt 1,40 % erforderliches Wachstum.</span>
</div>

---

## Spezielle KI-Visuals verwenden

Power BI enthält drei KI-Visuals, die maschinelles Lernen nutzen, um tiefe Erkenntnisse interaktiv bereitzustellen.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Tipp</span>
  KI-Visuals sollten so groß wie möglich angelegt werden, damit Berichtsnutzer vollständig mit den Daten interagieren können.
</div>

### Wichtigste Einflussfaktoren

Analysiert automatisch, welche Faktoren eine bestimmte Metrik beeinflussen. Das Visual ordnet die Einflussfaktoren nach Stärke und zeigt für jeden Faktor ein Vergleichsvisual.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Das Visual erkennt: „Wenn der Rabattsatz um 2 % steigt, erhöht sich die Wahrscheinlichkeit einer gewonnenen Verkaufschance um den Faktor 2,76." Eine Ansicht <em>Wichtigste Segmente</em> zeigt die Datensegmente mit dem höchsten Beitrag zur Zielmetrik.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: ai-visual-key-influencers.png — Wichtigste Einflussfaktoren Visual: Links Einflussfaktorenliste, rechts Vergleichsvisualisierung für den ausgewählten Faktor.</span>
</div>

### Analysebaum

Visualisiert Daten über mehrere Dimensionen hinweg mit beliebig tiefem Drill-down. Berichtsnutzer wählen selbst, nach welchen Dimensionen sie analysieren möchten — die KI schlägt die optimale nächste Dimension vor (Symbol: Glühbirne).

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Erlöse aus Verkaufschancen: Der Berichtsautor hat die Dimension <em>Produktkategorie</em> fixiert (Schloss-Symbol). Der Berichtsnutzer wählt per KI-Vorschlag <em>Region</em> als nächste Ebene.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: ai-visual-decomposition-tree.png — Analysebaumvisual mit zwei Aufgliederungsebenen: Produktkategorie (fixiert) und Region (KI-Vorschlag).</span>
</div>

### Q&A

Berichtsnutzer stellen Fragen in natürlicher Sprache (auf Englisch) und erhalten automatisch ein passendes Visual als Antwort.

```
"Was sind meine zehn meistverkauften Produkte nach Umsatz?"
```

Power BI analysiert die Frage und generiert automatisch das passende Diagramm oder Ergebnis.

**Optimierungsmöglichkeiten:**
- Feldnamen benutzerfreundlich benennen
- Synonyme im semantischen Modell hinzufügen
- Felder für Modellbeziehungen ausblenden (verhindert irreführende Q&A-Ergebnisse)
- Vorgeschlagene Fragen im Visual hinterlegen

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: ai-visual-qna.png — Q&A-Visual mit der Frage „Revenue won by sales owner" und einem automatisch generierten Balkendiagramm als Antwort.</span>
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📊</div>
    <div class="pbi-summary-title">Statistiken & Top-N</div>
    <div class="pbi-summary-body">DAX-Statistikfunktionen (AVERAGE, STDEV, MEDIAN usw.) für eigene Measures. Histogramme mit Quantisierungsgruppen. Top-N über Q&A, Filter-Typ oder DAX TOPN-Funktion.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🎯</div>
    <div class="pbi-summary-title">Ausreißer</div>
    <div class="pbi-summary-body">Punktdiagramm für visuelle Ausreißererkennung. DAX-Measures für dynamische Ausreißeridentifikation (besser als berechnete Spalten). Gefundene Ausreißer mit Slicern isolieren und tiefer analysieren.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🗂️</div>
    <div class="pbi-summary-title">Gruppierung & Clustering</div>
    <div class="pbi-summary-body">Manuelle Gruppen: Strg+Klick im Visual → Gruppendaten. Quantisierung: kontinuierliche Werte in gleich große Intervalle aufteilen. Automatisches Clustering: Power BI findet ähnliche Datenpunkte per KI.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📈</div>
    <div class="pbi-summary-title">Zeitreihen</div>
    <div class="pbi-summary-body">Linien-/Punktdiagramm mit Trendlinien, Prognosen und Anomalieerkennung. Play-Axis-Visual für animierte Zeitreihen. Grundregel: Zeitachse von links nach rechts, fehlende Perioden → Säulendiagramm bevorzugen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔮</div>
    <div class="pbi-summary-title">Was-wäre-wenn</div>
    <div class="pbi-summary-body">Parameter über Modellierung → Neuer Parameter erstellen. Power BI legt berechnete Tabelle und Measure automatisch an. Measures referenzieren den Parameter-Wert. Bezugslinie zeigt Schwellenwert im Visual.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🤖</div>
    <div class="pbi-summary-title">KI-Visuals</div>
    <div class="pbi-summary-body">Wichtigste Einflussfaktoren: welche Faktoren beeinflussen eine Metrik. Analysebaum: mehrdimensionaler Drill-down mit KI-Vorschlägen. Q&A: natürlichsprachliche Fragen auf Englisch beantworten.</div>
  </div>
</div>
