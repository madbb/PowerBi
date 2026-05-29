# DAX-Zeitintelligenz

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 13</div>
  <div class="pbi-page-title">DAX-Zeitintelligenz</div>
  <div class="pbi-page-sub">Datumsfilterkontexte ändern — YTD, Vorjahresvergleich, neue Kunden, Momentaufnahmen</div>
</div>

**Zeitintelligenz** bezeichnet in DAX die Fähigkeit, Datumsfilter gezielt zu verschieben oder aufzuweiten — um z. B. den kumulierten Umsatz seit Jahresbeginn zu berechnen, den Vorjahreswert gegenüberzustellen oder den Lagerbestand zum letzten Stichtag zu ermitteln. Im Kern geht es immer darum, den **Datumsfilterkontex zu ändern**, um zeitbezogene Fragen zu beantworten.

---

## Voraussetzung: Markierte Datumstabelle

DAX-Zeitintelligenzfunktionen setzen zwingend voraus, dass das Modell mindestens eine als **Datumstabelle markierte** Tabelle enthält. Diese Tabelle muss eine Datumsspalte haben, die:

- **Eindeutige Werte** enthält
- **Volle Jahre** abdeckt (kein Jahresanfang oder -ende in der Mitte)
- **Keine BLANKs** enthält
- **Keine fehlenden Datumsangaben** aufweist (lückenlos)

Wie eine solche Datumstabelle per DAX oder Power Query erstellt und markiert wird, wurde in Skript 11 beschrieben.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Die integrierten Zeitintelligenzfunktionen arbeiten mit Standardperioden: Jahren, Quartalen, Monaten. Für unregelmäßige Geschäftsperioden (z. B. 4-4-5-Kalender) oder Wochen-/Tagesanalysen müssen stattdessen <code>CALCULATE</code> mit eigenen Datumsfiltern verwendet werden.
</div>

---

## Funktionsgruppe 1: Zusammenfassungen über einen Zeitraum (YTD, QTD, MTD)

Diese Funktionen verschieben den Filterkontext so, dass er einen kumulierten Zeitraum abdeckt — vom Beginn des Jahres/Quartals/Monats bis zum letzten Datum im aktuellen Filterkontext.

### DATESYTD, DATESQTD, DATESMTD

Diese Funktionen geben eine einspaltige Tabelle mit Datumsangaben zurück und werden als Filterausdruck an `CALCULATE` übergeben:

| Funktion | Liefert Datumsangaben von… bis… |
|---|---|
| `DATESYTD` | Jahresbeginn bis letztes Datum im Filterkontext |
| `DATESQTD` | Quartalsbeginn bis letztes Datum im Filterkontext |
| `DATESMTD` | Monatsbeginn bis letztes Datum im Filterkontext |

### TOTALYTD, TOTALQTD, TOTALMTD

Diese Funktionen kombinieren `CALCULATE` und `DATESYTD`/`DATESQTD`/`DATESMTD` in einem Schritt:

```dax
TOTALYTD(<Ausdruck>, <Datumsspalte>[, <Filter>][, <Jahresende>])
```

Das optionale `<Jahresende>`-Argument ist als Datum im Format `"MM-DD"` anzugeben — nur notwendig, wenn das Geschäftsjahr nicht am 31. Dezember endet.

```dax
-- Kumulierter Umsatz seit Geschäftsjahresbeginn (GJ endet am 30. Juni):
Revenue YTD =
TOTALYTD(
    [Revenue],
    'Date'[Date],
    "6-30"
)
```

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-matrix-revenue-ytd-activity-ssm.png — Matrixvisual mit Year und Month in den Zeilen sowie Revenue und Revenue YTD als Spalten. Die YTD-Werte steigen innerhalb jedes Jahres kumuliert an.</span>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  <code>TOTALYTD</code> akzeptiert nur einen einzigen optionalen Filterausdruck. Sind mehrere Filter notwendig, <code>CALCULATE</code> mit <code>DATESYTD</code> als Filterargument verwenden.
</div>

### DATESBETWEEN und DATESINPERIOD

Für frei definierte Zeiträume:

```dax
DATESBETWEEN(<Datumsspalte>, <Startdatum>, <Enddatum>)
DATESINPERIOD(<Datumsspalte>, <Startdatum>, <Anzahl>, <Intervall>)
```

`DATESBETWEEN` gibt alle Datumsangaben zwischen zwei festen Datumswerten zurück. Übergibt man BLANK als Startdatum, beginnt der Zeitraum beim ersten Datum in der Datumstabelle.

`DATESINPERIOD` gibt einen Zeitraum zurück, der an einem bestimmten Datum beginnt und sich über eine angegebene Anzahl von Intervallen erstreckt (z. B. 3 Monate, -1 Jahr).

---

## Funktionsgruppe 2: Vergleiche über den Zeitverlauf

Diese Funktionen verschieben den Filterkontext um eine Zeitperiode — typisch für Vorjahresvergleiche und Wachstumsberechnungen.

### SAMEPERIODLASTYEAR

Gibt dieselben Datumsangaben des Vorjahres zurück:

```dax
-- Umsatz des Vorjahres (gleicher Zeitraum, ein Jahr früher):
Revenue PY =
VAR RevenuePriorYear =
    CALCULATE(
        [Revenue],
        SAMEPERIODLASTYEAR('Date'[Date])
    )
RETURN
    RevenuePriorYear
```

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-matrix-revenue-py-ssm.png — Matrixvisual: Revenue PY für GJ2019 entspricht den Revenue-Werten von GJ2018 im gleichen Monat.</span>
</div>

### Jahreswachstum (YoY %)

Aufbauend auf dem Vorjahreswert lässt sich das prozentuale Wachstum berechnen — mit Variablen für Lesbarkeit und Leistung:

```dax
Revenue YoY % =
VAR RevenuePriorYear =
    CALCULATE(
        [Revenue],
        SAMEPERIODLASTYEAR('Date'[Date])
    )
RETURN
    DIVIDE(
        [Revenue] - RevenuePriorYear,
        RevenuePriorYear
    )
```

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-matrix-revenue-yoy-ssm.png — Matrixvisual mit Revenue YoY % als prozentuale Veränderung gegenüber dem Vorjahresmonat.</span>
</div>

### DATEADD und PARALLELPERIOD

Für flexiblere Zeitverschiebungen:

```dax
DATEADD(<Datumsspalte>, <Anzahl>, <Intervall>)
```

`DATEADD` verschiebt die Datumsangaben um eine beliebige Anzahl von Intervallen (DAY, MONTH, QUARTER, YEAR) vor oder zurück. Negative Werte gehen zurück, positive vorwärts.

`PARALLELPERIOD` ähnelt `DATEADD`, gibt aber immer den vollständigen Zeitraum (ganzes Jahr/Quartal/Monat) zurück, statt denselben relativen Offset anzuwenden.

### Navigationsfunktionen

Für einfache Vor-/Rückwärtsnavigation:

| Funktion | Liefert |
|---|---|
| `PREVIOUSDAY` / `NEXTDAY` | Den vorherigen / nächsten Tag |
| `PREVIOUSMONTH` / `NEXTMONTH` | Den vorherigen / nächsten Monat (vollständig) |
| `PREVIOUSQUARTER` / `NEXTQUARTER` | Das vorherige / nächste Quartal |
| `PREVIOUSYEAR` / `NEXTYEAR` | Das vorherige / nächste Jahr |

---

## Weitere Zeitintelligenzberechnungen

### Neue Vorkommen zählen (z. B. neue Kunden)

Ein häufiger Anwendungsfall: Zählen, wie viele Kunden in einem Zeitraum zum ersten Mal aktiv waren. Die Logik: **Kunden bis heute** minus **Kunden bis zum Vortag des Zeitraums**.

**Schritt 1 — Kunden kumuliert bis Periodenende (LTD = Lifetime to Date):**

```dax
Customers LTD =
VAR CustomersLTD =
    CALCULATE(
        DISTINCTCOUNT(Sales[CustomerKey]),
        DATESBETWEEN(
            'Date'[Date],
            BLANK(),
            MAX('Date'[Date])
        ),
        'Sales Order'[Channel] = "Internet"
    )
RETURN
    CustomersLTD
```

`DATESBETWEEN` mit BLANK als Startdatum beginnt beim allerersten Datum in der Datumstabelle. `MAX('Date'[Date])` gibt das letzte Datum im aktuellen Filterkontext zurück — also das Periodenende.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-matrix-customers-ltd-ssm.png — Matrixvisual mit Customers LTD: kumulierte Anzahl eindeutiger Kunden, die von Beginn bis zum jeweiligen Monatsende aktiv waren.</span>
</div>

**Schritt 2 — Neue Kunden im Zeitraum:**

```dax
New Customers =
VAR CustomersLTD =
    CALCULATE(
        DISTINCTCOUNT(Sales[CustomerKey]),
        DATESBETWEEN(
            'Date'[Date],
            BLANK(),
            MAX('Date'[Date])
        ),
        'Sales Order'[Channel] = "Internet"
    )
VAR CustomersPrior =
    CALCULATE(
        DISTINCTCOUNT(Sales[CustomerKey]),
        DATESBETWEEN(
            'Date'[Date],
            BLANK(),
            MIN('Date'[Date]) - 1
        ),
        'Sales Order'[Channel] = "Internet"
    )
RETURN
    CustomersLTD - CustomersPrior
```

`MIN('Date'[Date]) - 1` gibt den Tag vor dem ersten Datum im Filterkontext zurück — da Power BI Datumsangaben intern als Zahlen speichert, lässt sich durch Subtraktion von 1 ein Tag zurückgehen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-matrix-new-customers-ssm.png — Matrixvisual mit New Customers: Anzahl der Kunden, die in dem jeweiligen Monat erstmals aktiv waren.</span>
</div>

### Momentaufnahmeberechnungen (Lagerbestand, Kontostände)

Momentaufnahmedaten (z. B. tägliche Lagerbestände) haben eine besondere Eigenschaft: Sie dürfen **nicht über Zeit summiert** werden — die Summe der täglichen Lagerbestände ist keine sinnvolle Kennzahl. Korrekt ist es, den Bestand zum **letzten relevanten Datum** im Filterkontext zu ermitteln.

**Lagerbestand am Monatsende mit LASTDATE:**

```dax
Stock on Hand =
CALCULATE(
    SUM(Inventory[UnitsBalance]),
    LASTDATE('Date'[Date])
)
```

`LASTDATE` filtert auf das letzte Datum im Filterkontext. `SUM` ist notwendig, weil Measures nicht direkt auf Spalten verweisen können — da aber pro Produkt und Datum nur eine Zeile existiert, summiert `SUM` effektiv nur einen Wert.

**Problem:** Wenn für das letzte Datum kein Datensatz existiert (Wochenende, Feiertag, zukünftiges Datum), gibt das Measure BLANK zurück.

**Lösung mit LASTNONBLANK:**

```dax
Stock on Hand =
CALCULATE(
    SUM(Inventory[UnitsBalance]),
    LASTNONBLANK(
        'Date'[Date],
        CALCULATE(SUM(Inventory[UnitsBalance]))
    )
)
```

`LASTNONBLANK` ist eine Iteratorfunktion: Sie durchläuft alle Datumsangaben im Filterkontext in **absteigender** chronologischer Reihenfolge und gibt das erste Datum zurück, für das der übergebene Ausdruck nicht BLANK ergibt. Das innere `CALCULATE` ist notwendig, um den Zeilenkontext der Iteration in einen Filterkontext zu überführen (Kontextübergang).

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Das Gegenstück zu <code>LASTNONBLANK</code> ist <code>FIRSTNONBLANK</code> — sie iteriert in aufsteigender chronologischer Reihenfolge. Beide Funktionen erfordern den Kontextübergang über <code>CALCULATE</code> im Ausdrucksargument.
</div>

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Momentaufnahme-Spalten wie <code>UnitsBalance</code> sollten im Modell <strong>ausgeblendet</strong> werden, damit Berichtsautoren sie nicht versehentlich mit einer einfachen Summe in Visuals verwenden. Das Measure <code>Stock on Hand</code> ist die einzige korrekte Aggregation.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-matrix-mountain-200-bike-stock-2020-june-ssm.png — Matrixvisual mit Stock on Hand per LASTNONBLANK: Nun werden auch Werte für Juni 2020 und die Jahresgesamtsumme korrekt angezeigt.</span>
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Voraussetzung</div>
    <div class="pbi-summary-body">Markierte Datumstabelle mit eindeutigen, lückenlosen Datumsangaben über volle Jahre. Ohne sie funktionieren keine Zeitintelligenzfunktionen. Für unregelmäßige Perioden CALCULATE mit eigenen Datumsfiltern nutzen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">YTD / QTD / MTD</div>
    <div class="pbi-summary-body">TOTALYTD / TOTALQTD / TOTALMTD für kumulierte Werte. Jahresende bei abweichendem Geschäftsjahr als "MM-DD" angeben. DATESYTD usw. für die Verwendung in CALCULATE mit mehreren Filtern.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Vorjahresvergleich</div>
    <div class="pbi-summary-body">SAMEPERIODLASTYEAR für Revenue PY und YoY %-Wachstum. DATEADD für beliebige Zeitverschiebungen. PARALLELPERIOD für vollständige Periodenvergleiche. Variablen für Lesbarkeit und Leistung nutzen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Neue Vorkommen</div>
    <div class="pbi-summary-body">DATESBETWEEN mit BLANK-Startdatum für LTD-Zählung. Neue Kunden = LTD − Kunden vor Periodenbeginn. MIN('Date'[Date]) - 1 für den Tag vor dem Periodenstart.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Momentaufnahmen</div>
    <div class="pbi-summary-body">Lagerbestand und Kontostände nie über Zeit summieren. LASTDATE für den letzten Periodenstand. LASTNONBLANK wenn Lücken in den Daten möglich sind — iteriert rückwärts bis zum ersten Nicht-BLANK-Ergebnis.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Wichtige Funktionen im Überblick</div>
    <div class="pbi-summary-body">TOTALYTD / DATESYTD · SAMEPERIODLASTYEAR · DATEADD · DATESBETWEEN · DATESINPERIOD · FIRSTDATE / LASTDATE · FIRSTNONBLANK / LASTNONBLANK · PREVIOUSYEAR / NEXTYEAR</div>
  </div>
</div>
