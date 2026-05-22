# Filterkontext & CALCULATE

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 12</div>
  <div class="pbi-page-title">Filterkontext & CALCULATE</div>
  <div class="pbi-page-sub">Wie Filter entstehen, wie CALCULATE sie ändert, Filtermodifizierer und Kontextübergänge</div>
</div>

Der Filterkontext ist eines der zentralsten — und anfangs schwierigsten — Konzepte in DAX. Wer verstehen will, warum ein Measure genau diesen Wert liefert, muss verstehen, welche Filter zum Zeitpunkt der Auswertung aktiv sind. Und wer Measures bauen will, die Vergleiche, Anteile oder bedingte Berechnungen liefern, muss wissen, wie man diesen Filterkontext gezielt verändert. Dieses Skript legt dafür das Fundament.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Der Filterkontext ist ein Konzept, das Zeit und Übung braucht, um vollständig zu verinnerlichten. Es lohnt sich, dieses Skript nach dem ersten Durcharbeiten noch einmal zu lesen — die Konzepte erschließen sich mit wachsender Praxiserfahrung immer klarer.
</div>

---

## Was ist der Filterkontext?

<div class="pbi-definition">
  <strong>Filterkontext</strong> Die Gesamtheit aller aktiven Filter, die zum Zeitpunkt der Auswertung eines Measures gelten. Jedes Mal, wenn Power BI ein Measure berechnet — z. B. für eine Zelle in einem Tabellenvisual — ist ein spezifischer Filterkontext aktiv, der bestimmt, welche Daten in die Berechnung einfließen.
</div>

Filter entstehen auf zwei Arten:

**Direkte Filter** werden explizit auf eine Spalte angewendet — z. B. durch einen Datenschnitt, einen Berichtsfilter oder die Gruppierung eines Visuals. Ein Visual, das nach Geschäftsjahr „FY2020" filtert und nach Monat gruppiert, hat sowohl einen Filter auf `Fiscal Year = FY2020` als auch implizite Filter für jeden einzelnen Monat.

**Indirekte Filter** entstehen durch Modellbeziehungen. Wenn auf die Tabelle `Date` ein Filter für FY2020 angewendet wird, wird dieser über die Beziehung an die Tabelle `Sales` weitergegeben — nur die Sales-Zeilen mit einem `OrderDateKey` in FY2020 werden berücksichtigt.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Wichtig</span>
  Berechnete Tabellen und berechnete Spalten werden <strong>nicht</strong> im Filterkontext ausgewertet — sie verwenden den Zeilenkontext. Nur Measures werden im Filterkontext ausgewertet. Der Übergang vom Zeilen- zum Filterkontext ist ein eigenes Konzept (Kontextübergang) und wird am Ende dieses Skripts behandelt.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-filter-group-visual-ss.png — Berichtsseite mit einem Datenschnitt für das Geschäftsjahr und einem Säulendiagramm für Umsatz nach Monat. Der Datenschnittfilter ist unsichtbar im Visual; die Monatsgruppierung ist sichtbar als Spalten.</span>
</div>

### Warum der Filterkontext so wichtig ist

Das Measure `Revenue` berechnet immer die Summe der Umsätze — aber *welche* Umsätze hängt vollständig vom Filterkontext ab. In einem nach Region gruppierten Visual liefert `Revenue` für jede Zeile nur den Umsatz der jeweiligen Region. Um daraus einen **prozentualen Anteil am Gesamtumsatz** zu berechnen, muss der Regionsfilter im Nenner aufgehoben werden:

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-table-region-ratio-over-total-region-ss.png — Tabellenvisual mit den Spalten Region, Revenue und Revenue % Total Region. Jede Zeile zeigt den regionalen Umsatz und seinen prozentualen Anteil am Gesamtumsatz.</span>
</div>

Für Australien wäre das: 10.655.335,96 $ ÷ 109.809.274,20 $ = 9,7 %. Der Zähler verwendet den aktuellen Filterkontext (gefiltert auf Australien), der Nenner muss den Regionsfilter entfernen, um den Gesamtumsatz zu erhalten. Genau das ermöglicht `CALCULATE`.

---

## CALCULATE — Filterkontext ändern

`CALCULATE` ist die leistungsstärkste DAX-Funktion überhaupt. Sie wertet einen Ausdruck in einem **modifizierten Filterkontext** aus.

```dax
CALCULATE(<Ausdruck>, [[<Filter1>], <Filter2>]…)
```

- **Ausdruck** — ein Measure oder ein beliebiger Ausdruck, der einen Skalarwert zurückgibt
- **Filter** — ein oder mehrere Filterausdrücke oder Filtermodifizierer (optional)
- Mehrere Filter werden mit **AND** verknüpft — alle müssen gleichzeitig TRUE sein

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  <code>CALCULATETABLE</code> funktioniert identisch wie <code>CALCULATE</code>, gibt aber ein Tabellenobjekt statt eines Skalars zurück.
</div>

### Boolesche Filterausdrücke

Ein boolescher Filter ist ein TRUE/FALSE-Ausdruck, der einen einfachen Filterbedingung definiert. Er muss folgende Regeln einhalten:

- Darf nur auf **eine einzelne Spalte** verweisen
- Darf **nicht auf Measures** verweisen
- Darf **keine Funktionen verwenden**, die eine Tabelle scannen oder aggregieren (z. B. kein `SUM`)

```dax
-- Umsatz nur für rote Produkte:
Revenue Red =
CALCULATE(
    [Revenue],
    'Product'[Color] = "Red"
)

-- Umsatz für rote oder blaue Produkte (IN-Operator):
Revenue Red or Blue =
CALCULATE(
    [Revenue],
    'Product'[Color] IN {"Red", "Blue"}
)

-- Umsatz für teure Produkte (Listenpreis > 1.000 $):
Revenue Expensive Products =
CALCULATE(
    [Revenue],
    'Product'[List Price] > 1000
)
```

### Tabellenausdrucksfilter mit FILTER

Wenn eine Filterbedingung zu komplex für einen booleschen Ausdruck ist — z. B. wenn zwei Spalten verglichen werden — kommt die `FILTER`-Funktion zum Einsatz. Sie ist eine Iteratorfunktion: sie durchläuft jede Zeile der übergebenen Tabelle und gibt die Zeilen zurück, für die der Ausdruck TRUE ergibt.

```dax
-- Umsatz für Produkte mit hoher Marge (Listenpreis > 2 × Standardkosten):
Revenue High Margin Products =
CALCULATE(
    [Revenue],
    FILTER(
        'Product',
        'Product'[List Price] > 'Product'[Standard Cost] * 2
    )
)
```

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Boolesche Filterausdrücke sind eine Kurzschreibweise — Power BI übersetzt sie intern in Tabellenfilterausdrücke. <code>'Product'[Color] = "Red"</code> wird intern zu <code>FILTER('Product', 'Product'[Color] = "Red")</code>.
</div>

### Filterverhalten: Hinzufügen vs. Überschreiben

Wenn `CALCULATE` einen Filterausdruck erhält, gibt es zwei mögliche Ergebnisse:

| Situation | Verhalten |
|---|---|
| Die gefilterte Spalte ist **nicht** im aktuellen Filterkontext | Der neue Filter wird **hinzugefügt** |
| Die gefilterte Spalte ist **bereits** im aktuellen Filterkontext | Der bestehende Filter wird **überschrieben** |

<div class="pbi-example">
  <span class="pbi-badge">Beispiel — Überschreiben</span>
  Das Measure <code>Revenue Red</code> filtert auf Farbe = Rot. In einem nach Farbe gruppierten Visual ist die Spalte Color bereits im Filterkontext (z. B. "Black"). CALCULATE überschreibt diesen Filter mit "Red" — für jede Farbe wird daher derselbe Wert angezeigt: der Umsatz roter Produkte, unabhängig von der Zeilenfarbe.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-table-color-revenue-red-ss.png — Tabellenvisual mit Spalten Color, Revenue und Revenue Red. Revenue Red ist für jede Farbzeile identisch, weil CALCULATE den Farbfilter überschreibt.</span>
</div>

---

## Filtermodifiziererfunktionen

Filtermodifizierer werden statt oder zusätzlich zu Filterausdrücken an `CALCULATE` übergeben und ermöglichen gezieltere Eingriffe in den Filterkontext.

### REMOVEFILTERS — Filter entfernen

`REMOVEFILTERS` entfernt alle oder bestimmte Filter aus dem Filterkontext:

```dax
-- Gesamtumsatz aller Regionen (entfernt alle Filter aus der Tabelle):
Revenue Total Region = CALCULATE([Revenue], REMOVEFILTERS('Sales Territory'))

-- Anteil am Gesamtumsatz aller Regionen:
Revenue % Total Region =
VAR CurrentRegionRevenue = [Revenue]
VAR TotalRegionRevenue =
    CALCULATE(
        [Revenue],
        REMOVEFILTERS('Sales Territory')
    )
RETURN
    DIVIDE(
        CurrentRegionRevenue,
        TotalRegionRevenue
    )
```

`REMOVEFILTERS` kann auch gezielt auf einzelne Spalten angewendet werden — so lässt sich der Filter für eine Hierarchieebene entfernen, während übergeordnete Ebenen aktiv bleiben:

```dax
-- Anteil am Umsatz des übergeordneten Landes (entfernt nur den Regionsfilter):
Revenue % Total Country =
VAR CurrentRegionRevenue = [Revenue]
VAR TotalCountryRevenue =
    CALCULATE(
        [Revenue],
        REMOVEFILTERS('Sales Territory'[Region])
    )
RETURN
    DIVIDE(
        CurrentRegionRevenue,
        TotalCountryRevenue
    )

-- Anteil am Umsatz der Gruppe (entfernt Region- und Länderfilter):
Revenue % Total Group =
VAR CurrentRegionRevenue = [Revenue]
VAR TotalGroupRevenue =
    CALCULATE(
        [Revenue],
        REMOVEFILTERS(
            'Sales Territory'[Region],
            'Sales Territory'[Country]
        )
    )
RETURN
    DIVIDE(
        CurrentRegionRevenue,
        TotalGroupRevenue
    )
```

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-matrix-sales-territory-revenue-4-ss.png — Matrixvisual mit den Spalten Revenue % Total Region, Revenue % Total Country und Revenue % Total Group, gruppiert nach Group, Country und Region.</span>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  In älteren DAX-Formeln findet man anstelle von <code>REMOVEFILTERS</code> häufig <code>ALL()</code>, <code>ALLEXCEPT()</code> oder <code>ALLNOBLANKROW()</code> als Filtermodifizierer in CALCULATE. Diese Funktionen funktionieren auch als Filtermodifizierer, haben aber primär eine andere Bedeutung als Tabellenfunktionen. <code>REMOVEFILTERS</code> ist die modernere, klarere Schreibweise für das Entfernen von Filtern in CALCULATE.
</div>

### KEEPFILTERS — Filter beibehalten statt überschreiben

`KEEPFILTERS` verhindert, dass `CALCULATE` bestehende Filter überschreibt. Statt Ersetzen wird der neue Filter mit dem bestehenden kombiniert (AND-Logik):

```dax
Revenue Red =
CALCULATE(
    [Revenue],
    KEEPFILTERS('Product'[Color] = "Red")
)
```

In einem nach Farbe gruppierten Visual: Ohne `KEEPFILTERS` überschreibt CALCULATE den Farbfilter — jede Zeile zeigt denselben Wert. Mit `KEEPFILTERS` wird der bestehende Farbfilter beibehalten und mit "Red" kombiniert. Nur die Zeile "Red" liefert einen Wert; alle anderen Farben ergeben BLANK, da keine Zeile gleichzeitig beide Farben erfüllen kann.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-table-color-revenue-red-keep-filters-ss.png — Tabellenvisual: Revenue Red zeigt nur für die Zeile "Red" einen Wert; alle anderen Farben sind BLANK.</span>
</div>

### USERELATIONSHIP — inaktive Beziehungen aktivieren

Eine inaktive Modellbeziehung kann in einem CALCULATE-Ausdruck gezielt aktiviert werden. Die bisher aktive Beziehung wird dabei automatisch deaktiviert:

```dax
-- Umsatz nach Versanddatum statt Bestelldatum:
Revenue Shipped =
CALCULATE(
    [Revenue],
    USERELATIONSHIP('Date'[DateKey], Sales[ShipDateKey])
)
```

### CROSSFILTER — Beziehungsverhalten ändern

`CROSSFILTER` ist eine fortgeschrittene Funktion, die die Filterrichtung einer Beziehung für den Ausdruck ändert — von einzeln zu beide, von beide zu einzeln, oder die Beziehung vollständig deaktiviert.

---

## Den Filterkontext untersuchen

### VALUES und SELECTEDVALUE

Mit `VALUES(<SpalteOderTabelle>)` lässt sich ermitteln, welche Werte sich aktuell im Filterkontext befinden. Sie gibt eine einspaltige Tabelle mit den eindeutigen Werten zurück, die durch den Filterkontext noch sichtbar sind.

Da `VALUES` immer eine Tabelle zurückgibt, braucht man oft zusätzliche Prüffunktionen:

- **`HASONEVALUE(<Spalte>)`** — gibt TRUE zurück, wenn die Spalte im Filterkontext auf genau einen Wert gefiltert ist
- **`SELECTEDVALUE(<Spalte>[, <Alternativwert>])`** — gibt den einzelnen Wert zurück, wenn genau einer im Kontext ist; sonst BLANK (oder den Alternativwert)

```dax
-- Verkaufsprovision: 15 % für USA, 10 % für alle anderen Länder:
Sales Commission =
[Revenue]
    * IF(
        HASONEVALUE('Sales Territory'[Country]),
        IF(
            VALUES('Sales Territory'[Country]) = "United States",
            0.15,
            0.1
        )
    )
```

Dieses Measure gibt in der Gesamtzeile BLANK zurück, weil dort mehrere Länder im Filterkontext sind und `HASONEVALUE` FALSE liefert.

### Filterzustandsfunktionen

| Funktion | Gibt TRUE zurück wenn… |
|---|---|
| `ISFILTERED(<Spalte>)` | Die Spalte **direkt** gefiltert wird |
| `ISCROSSFILTERED(<Spalte>)` | Die Spalte **indirekt** gefiltert wird (über eine Beziehung) |
| `ISINSCOPE(<Spalte>)` | Die Spalte die aktuelle Hierarchieebene im Visual darstellt |

`ISINSCOPE` ist besonders nützlich, um Measures auf bestimmten Hierarchieebenen zu unterdrücken:

```dax
Revenue % Total Country =
VAR CurrentRegionRevenue = [Revenue]
VAR TotalCountryRevenue =
    CALCULATE(
        [Revenue],
        REMOVEFILTERS('Sales Territory'[Region])
    )
RETURN
    IF(
        ISINSCOPE('Sales Territory'[Region]),
        DIVIDE(
            CurrentRegionRevenue,
            TotalCountryRevenue
        )
    )
```

Das Measure zeigt nur Werte, wenn eine Region angezeigt wird — auf Länder- oder Gruppenebene bleibt es BLANK.

---

## Kontextübergang

Der **Kontextübergang** ist das Konzept, das beschreibt, was passiert, wenn `CALCULATE` (oder eine Measure-Referenz) in einem Zeilenkontext ausgewertet wird.

### Das Problem ohne Kontextübergang

Eine berechnete Spalte arbeitet im Zeilenkontext — die Formel kennt nur die aktuelle Zeile. Wenn diese Formel eine Aggregationsfunktion wie `SUM` aufruft, aggregiert `SUM` **alle** Zeilen der Tabelle, nicht nur die aktuelle:

```dax
-- Falsch: SUM ignoriert den Zeilenkontext, summiert alle Sales-Zeilen:
Customer Segment =
VAR CustomerRevenue = SUM(Sales[Sales Amount])
RETURN
    IF(CustomerRevenue < 2500, "Low", "High")
```

Ergebnis: Alle Kunden werden als "High" eingestuft, weil der Gesamtumsatz immer über 2.500 $ liegt.

### Kontextübergang mit CALCULATE

`CALCULATE` ohne Filterargumente löst den Kontextübergang aus: Es überführt alle Zeilenkontextwerte der aktuellen Zeile in den Filterkontext. Die Aggregation bezieht sich dann nur auf die Daten, die zum aktuellen Kunden gehören:

```dax
-- Richtig: CALCULATE erzwingt den Kontextübergang:
Customer Segment =
VAR CustomerRevenue = CALCULATE(SUM(Sales[Sales Amount]))
RETURN
    IF(CustomerRevenue < 2500, "Low", "High")
```

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-pie-customer-segment-2-ss.png — Kreisdiagramm mit zwei Segmenten "High" und "Low" nach Kundensegmentierung auf Basis des korrekten Kontextübergangs.</span>
</div>

### Kontextübergang bei Measure-Referenzen

Wenn innerhalb eines Zeilenkontexts auf ein Measure verwiesen wird, erfolgt der Kontextübergang **automatisch** — `CALCULATE` ist in diesem Fall nicht explizit notwendig:

```dax
-- Funktioniert korrekt, weil [Revenue] ein Measure ist:
Customer Segment =
VAR CustomerRevenue = [Revenue]
RETURN
    IF(CustomerRevenue < 2500, "Low", "High")
```

### Kontextübergang in Iteratorfunktionen

Das gleiche Prinzip gilt in Iteratorfunktionen. Um in `SUMX` pro Region den länderspezifischen Provisionssatz korrekt anzuwenden, muss `CALCULATE` den Zeilenkontext der Region in einen Filterkontext überführen:

```dax
Sales Commission =
SUMX(
    VALUES('Sales Territory'[Region]),
    CALCULATE(
        [Revenue]
        * IF(
            VALUES('Sales Territory'[Country]) = "United States",
            0.15,
            0.1
        )
    )
)
```

`SUMX` iteriert über jede Region. Innerhalb der Iteration überführt `CALCULATE` den Zeilenkontext der aktuellen Region in den Filterkontext — so kennt das Measure das zugehörige Land und kann den richtigen Provisionssatz anwenden.

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔍</div>
    <div class="pbi-summary-title">Filterkontext</div>
    <div class="pbi-summary-body">Alle aktiven Filter bei der Measure-Auswertung. Entsteht durch direkte Filterung (Datenschnitte, Groupings) und indirekte Weitergabe über Beziehungen. Berechnete Spalten haben keinen Filterkontext — sie haben Zeilenkontext.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">⚙️</div>
    <div class="pbi-summary-title">CALCULATE</div>
    <div class="pbi-summary-body">Wertet einen Ausdruck in einem modifizierten Filterkontext aus. Filter können als boolesche Ausdrücke (einfache Bedingungen) oder Tabellenausdrücke (FILTER-Funktion für komplexe Bedingungen) übergeben werden.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔄</div>
    <div class="pbi-summary-title">Filterverhalten</div>
    <div class="pbi-summary-body">Neue Filter auf Spalten, die noch nicht im Kontext sind, werden hinzugefügt. Neue Filter auf Spalten, die bereits im Kontext sind, überschreiben den bestehenden Filter. KEEPFILTERS verhindert das Überschreiben.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🧹</div>
    <div class="pbi-summary-title">Filtermodifizierer</div>
    <div class="pbi-summary-body">REMOVEFILTERS: Filter entfernen (ganze Tabelle oder einzelne Spalten). KEEPFILTERS: Filter beibehalten statt überschreiben. USERELATIONSHIP: inaktive Beziehung aktivieren. CROSSFILTER: Beziehungsrichtung ändern.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔎</div>
    <div class="pbi-summary-title">Filterkontext untersuchen</div>
    <div class="pbi-summary-body">VALUES gibt eindeutige Werte im Kontext zurück. HASONEVALUE prüft ob genau ein Wert gefiltert ist. SELECTEDVALUE gibt diesen Wert zurück. ISFILTERED, ISCROSSFILTERED, ISINSCOPE testen den Filterzustand.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔀</div>
    <div class="pbi-summary-title">Kontextübergang</div>
    <div class="pbi-summary-body">CALCULATE ohne Filter überführt Zeilenkontextwerte in den Filterkontext. Unverzichtbar in berechneten Spalten, die aggregieren, und in Iteratorfunktionen. Measure-Referenzen lösen den Übergang automatisch aus.</div>
  </div>
</div>
