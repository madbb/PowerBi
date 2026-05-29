# DAX-Berechnungen erstellen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 11</div>
  <div class="pbi-page-title">DAX-Berechnungen erstellen</div>
  <div class="pbi-page-sub">Berechnete Tabellen & Spalten in der Praxis, implizite und explizite Measures, Iteratorfunktionen</div>
</div>

Die Skripte 09 und 10 haben die Grundlagen von DAX gelegt — Berechnungstypen, Syntax, Datentypen, Funktionen und Operatoren. In diesem Skript geht es um die **praktische Umsetzung**: Wie erstellt man berechnete Tabellen und Spalten konkret, wie funktionieren implizite und explizite Measures im Detail, und was leisten Iteratorfunktionen?

---

## Berechnete Tabellen in der Praxis

### Eine Tabelle duplizieren

Eine typische Herausforderung beim Modellbau ist der Umgang mit mehreren Beziehungen zwischen zwei Tabellen — z. B. wenn eine Faktentabelle mehrere Datumsspalten enthält. Da zwischen zwei Tabellen nur **eine aktive Beziehung** existieren kann, lässt sich das Problem durch das Duplizieren der Dimensionstabelle lösen.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Die Tabelle <em>Sales</em> enthält drei Datumsspalten: Bestelldatum, Versanddatum und Fälligkeitsdatum — alle verknüpft mit der Tabelle <em>Date</em>. Nur eine Beziehung kann aktiv sein. Durch Duplizieren der Datumstabelle lassen sich separate Tabellen <em>Ship Date</em> und <em>Due Date</em> anlegen, die jeweils eine eigene aktive Beziehung zur Faktentabelle haben.
</div>

```dax
Ship Date = 'Date'
```

Diese Formel erzeugt eine neue Tabelle `Ship Date` mit denselben Spalten und Zeilen wie `Date`. Wird die Quelltabelle `Date` aktualisiert, wird `Ship Date` automatisch neu berechnet — die Tabellen bleiben synchron.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-sales-date-relationships.png — Modelldiagramm: Tabelle Sales mit drei Beziehungen zur Tabelle Date — eine aktiv (durchgezogene Linie), zwei inaktiv (gestrichelte Linien).</span>
</div>

**Nach dem Duplizieren:** Alle benutzerdefinierten Konfigurationen müssen auf die neue Tabelle übertragen werden — z. B. Spalten umbenennen, Sortierreihenfolge festlegen, nicht benötigte Spalten ausblenden.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Berechnete Tabellen erhöhen die Modellgröße und können Datenaktualisierungszeiten verlängern, insbesondere wenn sie von anderen Tabellen abhängen. Sparsam einsetzen.
</div>

### Eine Datumstabelle erstellen

Datumstabellen sind für DAX-Zeitintelligenzfunktionen zwingend erforderlich. Wenn die Quelldaten keine Datumstabelle enthalten, lässt sie sich mit DAX als berechnete Tabelle erstellen.

**`CALENDARAUTO()`** scannt automatisch alle Datums- und Datum/Uhrzeit-Spalten im Modell, ermittelt das früheste und späteste Datum und erzeugt einen vollständigen Satz zusammenhängender Datumsangaben. Das optionale Argument gibt den letzten Monat des Geschäftsjahres an:

```dax
Due Date = CALENDARAUTO(6)
```

Das Argument `6` legt Juni als letzten Monat des Geschäftsjahres fest. Die resultierende Tabelle enthält eine einzige Datumsspalte mit lückenlosen Werten vom Beginn bis Ende aller Jahre im Modell.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Alternativ bietet <strong>CALENDAR(Startdatum, Enddatum)</strong> mehr Kontrolle — Start- und Enddatum können als statische Werte oder als Ausdrücke angegeben werden.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-due-date-table-data-view-1.png — Datenansicht der Tabelle "Due Date" mit einer einzigen Datumsspalte, sortiert vom frühesten zum spätesten Datum (Beginn: 1. Juli 2017).</span>
</div>

### Als Datumstabelle markieren

Nach der Erstellung muss die Tabelle in Power BI Desktop als **Datumstabelle markiert** werden. Erst dann funktionieren DAX-Zeitintelligenzfunktionen korrekt. Power BI prüft bei der Markierung automatisch:

- Eindeutige Werte in der Datumsspalte
- Keine Nullwerte
- Lückenlos zusammenhängende Datumsangaben
- Gleicher Zeitstempel bei Datum/Uhrzeit-Werten

Diese Pflicht zur Markierung gilt für alle Datumstabellen — egal ob importiert, in Power Query erstellt oder als berechnete Tabelle.

---

## Berechnete Spalten in der Praxis

Berechnete Spalten werden bevorzugt, wenn:
- Die Formel zusammengefasste Modelldaten benötigt
- Spezielle DAX-Modellierungsfunktionen wie `RELATED`, `RELATEDTABLE` oder Hierarchiefunktionen verwendet werden müssen
- Einer berechneten Tabelle weitere Spalten hinzugefügt werden sollen

In allen anderen Fällen ist eine **benutzerdefinierte Spalte in Power Query** die bessere Wahl — sie wird kompakter ins Modell geladen und belastet die Modellgröße weniger.

### Beispiele: Datumstabelle erweitern

Die folgende Reihe von berechneten Spalten erweitert eine Datumstabelle um praxisrelevante Felder:

**Geschäftsjahr** (Geschäftsjahr beginnt im Juli):

```dax
Due Fiscal Year =
"FY"
    & YEAR('Due Date'[Due Date])
        + IF(
            MONTH('Due Date'[Due Date]) > 6,
            1
        )
```

Diese Formel verkettet "FY" mit dem Kalenderjahr und erhöht das Jahr für Monate Juli–Dezember um 1.

**Geschäftsquartal:**

```dax
Due Fiscal Quarter =
'Due Date'[Due Fiscal Year] & " Q"
    & IF(
        MONTH('Due Date'[Due Date]) <= 3,
        3,
        IF(
            MONTH('Due Date'[Due Date]) <= 6,
            4,
            IF(
                MONTH('Due Date'[Due Date]) <= 9,
                1,
                2
            )
        )
    )
```

**Monatsschlüssel** (numerisch, für korrekte Sortierung von Monatsnamen):

```dax
MonthKey =
(YEAR('Due Date'[Due Date]) * 100) + MONTH('Due Date'[Due Date])
```

**Vollständige Datumsbeschriftung** (lesbares Textformat):

```dax
Due Full Date =
FORMAT('Due Date'[Due Date], "yyyy mmm, dd")
```

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-due-date-table-data-view-2.png — Datenansicht der Tabelle "Due Date" mit sechs Spalten: die originale Datumsspalte plus fünf berechnete Spalten.</span>
</div>

### Zeilenkontext verstehen

Berechnete Spaltenformeln werden für **jede Zeile** der Tabelle einzeln ausgewertet. Dieses Konzept heißt **Zeilenkontext** — die Formel arbeitet immer mit dem Wert der aktuellen Zeile.

Wenn eine Formel Werte aus einer **anderen Tabelle** benötigt, gibt es zwei Wege:

| Situation | Funktion |
|---|---|
| Beziehung zwischen den Tabellen vorhanden | `RELATED()` (von der "Viele"-Seite zur "1"-Seite) oder `RELATEDTABLE()` (von der "1"-Seite zur "Viele"-Seite) |
| Keine Beziehung vorhanden | `LOOKUPVALUE()` |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  <code>RELATED()</code> ist deutlich schneller als <code>LOOKUPVALUE()</code> — Power BI nutzt die vorhandenen Beziehungsindizes. Wenn möglich immer <code>RELATED()</code> bevorzugen.
</div>

```dax
Discount Amount =
(
    Sales[Order Quantity]
        * RELATED('Product'[List Price])
) - Sales[Sales Amount]
```

Der Zeilenkontext gilt auch in Iteratorfunktionen — dazu mehr im letzten Abschnitt dieses Skripts.

---

## Implizite Measures

**Implizite Measures** sind automatische Aggregationsverhalten, die Power BI für numerische Spalten bereitstellt. Berichtsautoren können eine Spalte in ein Visual ziehen und Power BI aggregiert sie automatisch — ohne dass ein explizites Measure geschrieben werden muss.

Das **Sigma-Symbol (∑)** im Datenbereich zeigt an, dass eine Spalte numerisch ist und beim Hinzufügen zu einem Visual zusammengefasst wird.

### Aggregationsfunktionen

Numerische Spalten unterstützen folgende Aggregationsfunktionen:

Sum, Average, Minimum, Maximum, Count (Distinct), Count, Standard deviation, Variance, Median

Nicht numerische Spalten (Text, Datum, Boolean) können ebenfalls aggregiert werden — allerdings mit eingeschränkten Optionen:

| Spaltentyp | Mögliche Aggregationen |
|---|---|
| Text | First, Last, Count, Count (Distinct) |
| Datum | Earliest, Latest, Count, Count (Distinct) |
| Boolean | Count, Count (Distinct) |

### Einschränkungen impliziter Measures

Implizite Measures funktionieren nur für **einfache Aggregationen** — einen Spaltenwert mit einer einzigen Funktion zusammenfassen. Sobald eine Berechnung mehrere Spalten kombiniert, einen Quotienten berechnet oder zeitbasierte Logik benötigt, muss ein **explizites Measure** geschrieben werden.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Implizite Measures lassen sich von Berichtsautoren umprogrammieren — z. B. kann ein Berichtsautor <em>Unit Price</em> auf Sum setzen, was zu irreführend hohen Werten führt (Summe aller Einzelpreise statt eines Durchschnittspreises). Empfehlung: Numerische Spalten mit expliziten Measures absichern und die Originalspalte ausblenden.
</div>

---

## Explizite Measures erstellen

Explizite Measures werden über **Tabellentools → Neues Measure** angelegt und im Datenbereich mit dem Taschenrechnersymbol (⊞) angezeigt.

### Einfache Measures

Ein einfaches Measure aggregiert die Werte einer einzelnen Spalte — verhält sich wie ein implizites Measure, ist aber im Modell fixiert:

```dax
Revenue =
SUM(Sales[Sales Amount])

Order Line Count =
COUNT(Sales[SalesOrderLineKey])

Order Count =
DISTINCTCOUNT('Sales Order'[Sales Order])
```

`COUNTROWS()` ist eine Alternative zu `COUNT()` und zählt direkt die Zeilen einer Tabelle:

```dax
Order Line Count =
COUNTROWS(Sales)
```

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Sofort nach dem Erstellen eines Measures die Formatierungsoptionen im Menüband <strong>Measure-Tools</strong> festlegen (Dezimalstellen, Währungssymbol, Prozent). Das stellt sicher, dass Werte in allen Visuals konsistent aussehen.
</div>

### Verbundmeasures

Ein Verbundmeasure verweist auf ein oder mehrere andere Measures. Dadurch lassen sich komplexe Berechnungen aus einfacheren Bausteinen zusammensetzen:

```dax
Profit =
[Revenue] - [Cost]

Profit Margin =
DIVIDE([Profit], [Revenue])
```

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Änderungen an einem Measure wirken sich auf alle abhängigen Measures aus. Verbundmeasures immer sorgfältig testen, bevor Änderungen eingecheckt werden.
</div>

### Quickmeasures

Quickmeasures erlauben das Erstellen von Measures ohne DAX-Kenntnisse: Eine Berechnungsvorlage auswählen, Felder zuweisen — Power BI generiert die DAX-Formel automatisch. Die generierte Formel ist anschließend im Bereich **Daten** sichtbar und kann als Lerngrundlage dienen.

```dax
-- Von Quickmeasure generiertes Measure "Profit Margin":
Profit Margin =
DIVIDE([Profit], [Revenue])
```

### Berechnete Spalten vs. Measures — der wichtigste Unterschied

| | Berechnete Spalte | Measure |
|---|---|---|
| **Zweck** | Neues Attribut pro Zeile | Dynamische Aggregation über Modelldaten |
| **Auswertung** | Zeilenkontext bei Datenaktualisierung | Filterkontext zur Abfragezeit |
| **Gespeichert** | Ja — belastet Modellgröße | Nein — immer frisch berechnet |
| **Visual-Nutzung** | Filtern, Gruppieren, implizit aggregieren | Gezielt für Zusammenfassung |
| **Leistung** | Erhöht Speicher- und Aktualisierungslast | Effizienter bei großen Modellen |
| **Ideal für** | Statische Attribute, Beziehungsschlüssel | KPIs, Kennzahlen, dynamische Berechnungen |

---

## Iteratorfunktionen

Iteratorfunktionen werten einen Ausdruck für **jede Zeile einer Tabelle** aus und aggregieren die Ergebnisse. Sie sind erkennbar am **„X"-Suffix**: `SUMX`, `AVERAGEX`, `COUNTX`, `MINX`, `MAXX`.

Jede Iteratorfunktion benötigt zwei Argumente:
1. Eine **Tabelle** (Modelltabelle oder tabellenrückgebender Ausdruck)
2. Einen **Ausdruck**, der für jede Zeile einen Einzelwert zurückgibt

### Einfacher Vergleich: SUM vs. SUMX

`SUM` ist eine Abkürzung für `SUMX` — Power BI konvertiert es intern:

```dax
-- Identische Ergebnisse und identische Leistung:
Revenue = SUM(Sales[Sales Amount])

Revenue =
SUMX(
    Sales,
    Sales[Sales Amount]
)
```

### Komplexe Zusammenfassung über mehrere Spalten

Der eigentliche Mehrwert von Iteratorfunktionen liegt in der Möglichkeit, pro Zeile einen Ausdruck aus mehreren Spalten zu berechnen und dann zu aggregieren:

```dax
Revenue =
SUMX(
    Sales,
    Sales[Order Quantity] * Sales[Unit Price] * (1 - Sales[Unit Price Discount Pct])
)
```

Mit `RELATED` kann in der Iterationsformel auch auf Spalten aus einer verwandten Tabelle zugegriffen werden:

```dax
Discount =
SUMX(
    Sales,
    Sales[Order Quantity]
    * (
        RELATED('Product'[List Price]) - Sales[Unit Price]
    )
)
```

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-table-month-revenue-2.png — Tabellenvisual mit den Spalten Month, Revenue und Discount auf Basis der SUMX-Measures.</span>
</div>

### Granularität steuern mit AVERAGEX

Iteratorfunktionen können auch auf verschiedenen Granularitätsebenen aggregieren. Mit `VALUES()` lässt sich die Iteration auf eindeutige Werte einer Spalte beschränken:

```dax
-- Durchschnittsumsatz pro Auftragsposition:
Revenue Avg Order Line =
AVERAGEX(
    Sales,
    Sales[Order Quantity] * Sales[Unit Price] * (1 - Sales[Unit Price Discount Pct])
)

-- Durchschnittsumsatz pro Verkaufsauftrag (höheres Aggregationsniveau):
Revenue Avg Order =
AVERAGEX(
    VALUES('Sales Order'[Sales Order]),
    [Revenue]
)
```

`VALUES()` gibt die eindeutigen Verkaufsauftragsnummern im aktuellen Filterkontext zurück. `AVERAGEX` durchläuft dann jeden Auftrag und berechnet den Durchschnitt des Gesamtumsatzes.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-table-month-revenue-4.png — Tabellenvisual mit fünf Spalten: Month, Revenue, Discount, Revenue Avg Order Line, Revenue Avg Order.</span>
</div>

### Rangfolge mit RANKX

`RANKX` berechnet einen Rang, indem es eine Tabelle durchläuft und für jede Zeile einen Ausdruck auswertet. Standardmäßig absteigende Reihenfolge (höchster Wert = Rang 1):

```dax
Product Quantity Rank =
RANKX(
    ALL('Product'[Product]),
    [Quantity]
)
```

`ALL()` entfernt alle Filter, sodass alle Produkte gemeinsam gerankt werden — unabhängig vom aktuellen Filterkontext des Visuals.

**Dense-Rangfolge** (keine Ränge überspringen bei Gleichstand):

```dax
Product Quantity Rank =
RANKX(
    ALL('Product'[Product]),
    [Quantity],
    ,
    ,
    DENSE
)
```

**Gesamtzeile unterdrücken** mit `HASONEVALUE`:

```dax
Product Quantity Rank =
IF(
    HASONEVALUE('Product'[Product]),
    RANKX(
        ALL('Product'[Product]),
        [Quantity],
        ,
        ,
        DENSE
    )
)
```

`HASONEVALUE()` prüft, ob die Produktspalte im aktuellen Filterkontext genau einen Wert enthält. Für die Gesamtzeile, die alle Produkte repräsentiert, ist das nicht der Fall — das Measure gibt dann BLANK zurück.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Iteratorfunktionen mit großen Tabellen und komplexen Ausdrücken können die Abfrageleistung erheblich beeinflussen. Funktionen wie <code>SEARCH()</code> und <code>LOOKUPVALUE()</code> im Iterationsausdruck sind kostspielig — wenn möglich <code>RELATED()</code> bevorzugen.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Datumstabellen</div>
    <div class="pbi-summary-body">Mit CALENDARAUTO() oder CALENDAR() als berechnete Tabelle erzeugen. Anschließend als Datumstabelle markieren — zwingend für Zeitintelligenz. Muss eindeutige, lückenlose Datumsangaben enthalten.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Berechnete Spalten</div>
    <div class="pbi-summary-body">Für Attribute, die zusammengefasste Daten oder DAX-Modellierungsfunktionen (RELATED, RELATEDTABLE) benötigen. Zeilenkontext gilt immer. In Power Query-Spalten bevorzugen wenn möglich — geringere Modellgröße.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">∑</div>
    <div class="pbi-summary-title">Implizite Measures</div>
    <div class="pbi-summary-body">Automatische Aggregation numerischer Spalten. Flexibel, aber riskant — Berichtsautoren können die Aggregationsmethode ändern. Numerische Schlüsselspalten mit expliziten Measures absichern.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">⊞</div>
    <div class="pbi-summary-title">Explizite Measures</div>
    <div class="pbi-summary-body">Einfach (eine Spalte aggregieren), Verbund (andere Measures referenzieren) oder über Quickmeasures erstellen. Format sofort nach Erstellung festlegen. Measures niemals mit Tabellenpräfix referenzieren.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Iteratorfunktionen</div>
    <div class="pbi-summary-body">SUMX, AVERAGEX, COUNTX, MINX, MAXX — werten einen Ausdruck zeilenweise aus. Ermöglichen mehrspaltige Berechnungen und Granularitätskontrolle. RANKX für Rangfolgen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Spalte oder Measure?</div>
    <div class="pbi-summary-body">Berechnete Spalte: statisches Attribut, das für Slicing oder Beziehungen benötigt wird. Measure: dynamische Berechnung, die vom Filterkontext abhängt. Im Zweifelsfall Measure bevorzugen — geringere Modellgröße.</div>
  </div>
</div>
