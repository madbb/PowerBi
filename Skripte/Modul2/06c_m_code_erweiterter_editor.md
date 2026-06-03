# Power Query: M-Code und der erweiterte Editor

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06c</div>
  <div class="pbi-page-title">Power Query: M-Code und der erweiterte Editor</div>
  <div class="pbi-page-sub">Sprache M: Struktur, Syntax, häufige Funktionen und praktische Anpassungen im erweiterten Editor</div>
</div>

Jede Transformation, die im Power Query-Editor per Klick ausgeführt wird, erzeugt im Hintergrund automatisch Code. Diese Sprache heißt **M**. Wer M lesen kann, versteht was Power Query intern macht, kann Fehler in Abfragen schneller finden und Anpassungen direkt im Code vornehmen, ohne jeden Schritt neu zu klicken.

M aktiv von Grund auf schreiben zu können ist für die PL-300 nicht gefordert. M lesen, verstehen und gezielt anpassen gehört zum Prüfungsstoff.

---

## Was ist M?

M ist die Skriptsprache hinter Power Query. Sie ist funktional aufgebaut, das heißt: Ein Ausdruck beschreibt was berechnet werden soll, nicht wie Schritt für Schritt vorzugehen ist. Jede Operation ist eine Funktion, die eine Tabelle entgegennimmt und eine veränderte Tabelle zurückgibt.

M wird in Power BI Desktop, Excel und Power Query Online verwendet. Die Sprache ist case-sensitive: `Table.RemoveColumns` und `table.removecolumns` sind unterschiedlich.

<div class="pbi-definition">
  <strong>M (Power Query Formula Language)</strong> Funktionale Skriptsprache hinter Power Query. Wird automatisch aus GUI-Aktionen generiert, kann aber direkt im erweiterten Editor gelesen und bearbeitet werden. Groß- und Kleinschreibung ist relevant.
</div>

---

## Der erweiterte Editor

Der erweiterte Editor zeigt den vollständigen M-Code einer Abfrage. Aufruf: **Ansicht → Erweiterter Editor**.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 08-view-ribbon-advanced-button-ssm.png — Menüband Ansicht im Power Query-Editor mit der Schaltfläche Erweiterter Editor.</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 08-m-code.png — Erweiterter Editor mit dem vollständigen M-Code einer Abfrage. Jede Zeile entspricht einem Transformationsschritt.</span>
</div>

Im erweiterten Editor lässt sich der Code direkt bearbeiten. Klick auf **Fertig** übernimmt die Änderungen. Syntaxfehler werden rot markiert und müssen vor dem Schließen behoben werden.

---

## Aufbau von M-Code

Jede M-Abfrage hat dieselbe Grundstruktur:

```
let
    Schritt1 = Ausdruck1,
    Schritt2 = Funktion(Schritt1, ...),
    Schritt3 = Funktion(Schritt2, ...)
in
    Schritt3
```

**`let`** leitet den Codeblock ein. Danach folgen die einzelnen Schritte.

Jeder Schritt hat die Form:

```
Schrittname = Transformation(VorherigerSchritt, Parameter)
```

Links vom `=` steht der Name des Schritts. Dieser Name ist gleichzeitig eine Variable, auf die spätere Schritte zugreifen können. Power BI vergibt automatisch Namen wie `#"Geänderter Typ"` oder `#"Entfernte Spalten"`. Namen mit Leerzeichen oder Sonderzeichen werden in `#"..."` eingeschlossen.

**`in`** am Ende gibt an, welcher Schritt das Ergebnis der Abfrage ist. Das ist immer der letzte Schritt.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Abfrage lädt eine CSV, benennt Spalten um und entfernt eine Spalte. Im erweiterten Editor sieht das so aus:

```
let
    Quelle = Csv.Document(
        File.Contents("C:\Daten\suppliers_raw.csv"),
        [Delimiter=";", Encoding=65001]
    ),
    HochgestufteSpalten = Table.PromoteHeaders(Quelle),
    UmbenannteSpalten = Table.RenameColumns(HochgestufteSpalten,
        {{"LiefNr", "LieferantID"}, {"lieferant_name", "Lieferant"}}
    ),
    EntfernteSpalten = Table.RemoveColumns(UmbenannteSpalten, {"tel"})
in
    EntfernteSpalten
```

Jeder Schritt referenziert den vorherigen: `UmbenannteSpalten` nimmt `HochgestufteSpalten` als Eingabe. `EntfernteSpalten` nimmt `UmbenannteSpalten`. Die Kette ist linear.
</div>

---

## Abhängigkeiten und Reihenfolge

M-Code ist eine geordnete Kette. Jeder Schritt baut auf dem Ergebnis des vorherigen auf. Das hat direkte Konsequenzen:

- Einen Schritt löschen, auf den spätere Schritte verweisen, bricht alle nachfolgenden Schritte
- Schritte umsortieren kann Abhängigkeiten zerstören
- Im erweiterten Editor sieht man sofort, welcher Schritt von welchem abhängt

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Vor dem Löschen eines Schritts immer prüfen, ob spätere Schritte diesen Schrittnamen als Eingabe verwenden. Im erweiterten Editor ist das direkt lesbar.
</div>

---

## Häufige M-Funktionen

Die folgenden Funktionen erzeugt Power BI automatisch aus GUI-Aktionen. Für die PL-300 ist es wichtig, sie in einem Code-Block erkennen und einordnen zu können.

### Tabellen laden und strukturieren

| Funktion | Was sie macht |
|---|---|
| `Csv.Document(...)` | Lädt eine CSV-Datei als Tabelle |
| `Excel.Workbook(...)` | Lädt eine Excel-Datei |
| `Table.PromoteHeaders(tabelle)` | Erste Zeile wird zu Spaltenüberschriften |
| `Table.RenameColumns(tabelle, liste)` | Spalten umbenennen |
| `Table.RemoveColumns(tabelle, liste)` | Spalten entfernen |
| `Table.SelectColumns(tabelle, liste)` | Nur bestimmte Spalten behalten |
| `Table.TransformColumnTypes(tabelle, liste)` | Datentypen einer oder mehrerer Spalten ändern |

### Zeilen filtern und bereinigen

| Funktion | Was sie macht |
|---|---|
| `Table.SelectRows(tabelle, bedingung)` | Zeilen nach Bedingung filtern |
| `Table.RemoveRows(tabelle, anzahl)` | Erste N Zeilen entfernen |
| `Table.Distinct(tabelle)` | Doppelte Zeilen entfernen |
| `Table.ReplaceValue(tabelle, alt, neu, ...)` | Werte in einer Spalte ersetzen |

### Struktur umformen

| Funktion | Was sie macht |
|---|---|
| `Table.UnpivotOtherColumns(tabelle, spalten, ...)` | Alle Spalten außer den genannten entpivotieren |
| `Table.Pivot(tabelle, ...)` | Tabelle pivotieren |
| `Table.Transpose(tabelle)` | Zeilen und Spalten tauschen |
| `Table.Group(tabelle, schlüssel, aggregationen)` | Gruppieren und aggregieren |
| `Table.NestedJoin(tabelle1, schlüssel1, tabelle2, schlüssel2, ...)` | Tabellen zusammenführen (Merge) |
| `Table.Combine(liste)` | Tabellen anfügen (Append) |

---

## `each` und `_` verstehen

In Filterbedingungen und Transformationen taucht regelmäßig die Kombination `each` und `_` auf. Sie ist für das Lesen von Power Query-Code wichtig.

`each` ist eine Kurzform für eine anonyme Funktion, die auf jede Zeile einer Tabelle angewendet wird. `_` steht dabei für die aktuelle Zeile oder den aktuellen Wert.

```
Table.SelectRows(tabelle, each [Kategorie] = "Hardware")
```

Das bedeutet: Filtere alle Zeilen, bei denen der Wert in der Spalte `Kategorie` gleich `"Hardware"` ist. `each` wendet die Bedingung auf jede Zeile an. `[Kategorie]` greift auf den Spaltenwert der aktuellen Zeile zu.

```
Table.SelectRows(tabelle, each [Einkaufspreis] > 100)
```

Behalte alle Zeilen, bei denen `Einkaufspreis` größer als 100 ist.

```
Table.TransformColumns(tabelle, {{"Lieferant", each Text.Upper(_)}})
```

Wandle jeden Wert in der Spalte `Lieferant` in Großbuchstaben um. `_` steht hier für den aktuellen Zellwert.

<div class="pbi-definition">
  <strong>each</strong> Kurzform für eine anonyme Funktion die auf jede Zeile oder jeden Wert angewendet wird. Equivalent zu <code>(x) =&gt; ausdruck</code>, wobei <code>_</code> für das Argument steht.
</div>

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Im erweiterten Editor steht:

```
GefilterteZeilen = Table.SelectRows(
    EntfernteSpalten,
    each [aktiv_ja_nein] = "ja"
)
```

Das bedeutet: Aus der Tabelle `EntfernteSpalten` werden nur die Zeilen behalten, bei denen die Spalte `aktiv_ja_nein` den Wert `"ja"` enthält. `each` läuft über alle Zeilen, `[aktiv_ja_nein]` liest den Spaltenwert der jeweiligen Zeile.
</div>

---

## Direktanpassungen im erweiterten Editor

Bestimmte Änderungen lassen sich schneller direkt im M-Code vornehmen als über die GUI:

**Dateipfad ändern:**

```
Quelle = Csv.Document(
    File.Contents("C:\Daten\suppliers_raw.csv"), ...
)
```

Den Pfad direkt im Code ändern und auf **Fertig** klicken. Power BI aktualisiert die Verbindung sofort.

**Servername oder Datenbankname ändern:**

```
Quelle = Sql.Database("alter-server.datenbank.de", "Northwind")
```

Einfach den Servernamen oder Datenbanknamen im Text ersetzen.

**Spaltennamen in einer Umbenennung korrigieren:**

```
UmbenannteSpalten = Table.RenameColumns(Quelle,
    {{"LiefNr", "LieferantID"}, {"lieferant_name", "Lieferant"}}
)
```

Ein neues Paar `{"alter_name", "neuer_name"}` ergänzen oder einen vorhandenen Namen korrigieren, ohne den Schritt neu anzulegen.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Abfragen aus anderen Power BI-Projekten oder aus dem Internet lassen sich in den erweiterten Editor kopieren und sofort verwenden. Das ist ein schneller Weg, bewährte Transformationslogik wiederzuverwenden.
</div>

---

## Einen M-Code-Block lesen: Schritt für Schritt

Wenn man einen unbekannten M-Code-Block vor sich hat, hilft folgende Vorgehensweise:

1. `in` am Ende lesen — das ist der finale Schritt, das Ergebnis der Abfrage
2. Diesen Schritt suchen und seine Funktion identifizieren
3. Die Eingabe dieses Schritts (der referenzierte Schrittname) suchen und dessen Funktion lesen
4. So rückwärts durch die Kette arbeiten bis zur `Quelle`

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>

```
let
    Quelle = Csv.Document(...),
    Typen = Table.TransformColumnTypes(Quelle, {{"aufgenommen_am", type date}}),
    Gefiltert = Table.SelectRows(Typen, each [aktiv_ja_nein] = "ja"),
    Bereinigt = Table.ReplaceValue(Gefiltert, null, 0, Replacer.ReplaceValue, {"Einkaufspreis"})
in
    Bereinigt
```

Lesen von unten nach oben: Das Ergebnis ist `Bereinigt`. Das ist `Table.ReplaceValue` auf `Gefiltert` — ersetzt NULL in `Einkaufspreis` durch 0. `Gefiltert` kommt aus `Table.SelectRows` auf `Typen` — filtert nur aktive Lieferanten. `Typen` kommt aus `Table.TransformColumnTypes` auf `Quelle` — ändert den Typ der Datumsspalte. `Quelle` lädt die CSV.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Was ist M</div>
    <div class="pbi-summary-body">Funktionale Skriptsprache hinter Power Query. Wird automatisch aus GUI-Aktionen generiert. Case-sensitive. Aktives Schreiben nicht gefordert, Lesen und Verstehen schon.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Struktur: let / in</div>
    <div class="pbi-summary-body">let leitet den Block ein. Jeder Schritt hat die Form Name = Funktion(VorherigerSchritt). in am Ende gibt den finalen Schritt als Ergebnis aus. Die Kette ist linear und geordnet.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Abhängigkeiten</div>
    <div class="pbi-summary-body">Jeder Schritt referenziert seinen Vorgänger. Löschen eines referenzierten Schritts bricht alle nachfolgenden. Reihenfolge nicht beliebig ändern.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Häufige Funktionen</div>
    <div class="pbi-summary-body">Table.RemoveColumns, Table.RenameColumns, Table.SelectRows, Table.TransformColumnTypes, Table.Group, Table.NestedJoin. Entstehen automatisch aus GUI-Aktionen — im Code lesbar und anpassbar.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">each und _</div>
    <div class="pbi-summary-body">each ist eine anonyme Funktion die auf jede Zeile oder jeden Wert angewendet wird. _ steht für den aktuellen Wert. Taucht in Filtern und Transformationen auf.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Direktanpassungen</div>
    <div class="pbi-summary-body">Dateipfade, Servernamen, Spaltennamen direkt im erweiterten Editor ändern. Abfragen aus anderen Projekten kopieren und einfügen. Schneller als neu klicken.</div>
  </div>
</div>
