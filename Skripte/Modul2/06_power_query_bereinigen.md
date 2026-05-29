# Daten bereinigen, transformieren und laden

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06</div>
  <div class="pbi-page-title">Daten bereinigen, transformieren und laden</div>
  <div class="pbi-page-sub">Power Query-Editor: Strukturieren, Datentypen, Profiling, Abfragen kombinieren und M-Code</div>
</div>

Importierte Daten sind selten sofort bereit für die Analyse. Spalten haben falsche Namen oder Typen, Zeilen enthalten Nullwerte oder Duplikate, und Tabellen sind unübersichtlich strukturiert. Der **Power Query-Editor** in Power BI Desktop ist das zentrale Werkzeug, um all diese Probleme zu beheben — ohne die ursprüngliche Datenquelle zu verändern.

---

## Der Power Query-Editor

Der Power Query-Editor wird über **Start → Daten transformieren** geöffnet. Er zeigt die Daten der ausgewählten Abfrage in der Mitte, links den **Abfragen**-Bereich mit allen Tabellen, und rechts den Bereich **Abfrageeinstellungen** mit den Schritten.

<div class="pbi-definition">
  <strong>Angewendete Schritte</strong> Jede Transformation im Power Query-Editor wird als nummerierter Schritt gespeichert. Diese Schritte werden bei jeder Datenaktualisierung automatisch wiederholt — die ursprüngliche Datenquelle bleibt unverändert. Schritte lassen sich jederzeit umbenennen, umsortieren oder löschen.
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Viele Operationen sind sowohl über das Menüband (Registerkarte <strong>Transformieren</strong>) als auch über Rechtsklick auf Spalten oder Zellen erreichbar.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-shape-data-query-editor-overview-ss.png — Gesamtansicht des Power Query-Editors mit Abfragen-Bereich links, Datenvorschau in der Mitte und Abfrageeinstellungen rechts.</span>
</div>

---

## Ursprungsdaten strukturieren

### Kopfzeilen höher stufen

Beim Import nimmt Power Query an, dass alle Zeilen Daten enthalten. Enthält die erste Zeile jedoch Spaltenüberschriften, muss sie explizit als Kopfzeile markiert werden: **Start → Erste Zeile als Überschriften verwenden**, oder über das Dropdown-Menü neben der ersten Spaltenüberschrift.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-use-first-row-headers-ssm.png — Menüoptionen zum Höherstufen der ersten Zeile als Spaltenüberschriften.</span>
</div>

### Spalten umbenennen

Spaltenüberschriften können per Doppelklick oder über Rechtsklick → **Umbenennen** angepasst werden. Dies ist wichtig, wenn Namen aus der Quelle technisch, unverständlich oder inkonsistent sind.

### Erste Zeilen entfernen

Leere oder irrelevante Zeilen am Anfang einer Tabelle werden über **Start → Zeilen entfernen → Erste Zeilen entfernen** entfernt.

### Spalten entfernen

Unnötige Spalten sollten so früh wie möglich entfernt werden — idealerweise bereits beim Datenabruf per SQL-SELECT. Im Power Query-Editor gibt es zwei Varianten:

- Spalten auswählen → **Start → Spalten entfernen** (gewählte Spalten löschen)
- Spalten auswählen → **Start → Spalten entfernen → Andere Spalten entfernen** (nur die ausgewählten behalten)

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Nicht benötigte Spalten belasten das semantische Modell und verlangsamen Berichte. Spalten früh zu entfernen verbessert die Leistung und reduziert die Modellgröße.
</div>

### Spalten entpivotieren

Wenn Jahres- oder Kategoriewerte als separate Spalten nebeneinander stehen (breites Format), werden sie per **Entpivotieren** in eine normalisierte Zeilen-Struktur umgewandelt — z. B. aus `Jahr 2018 | Jahr 2019` wird eine Spalte `Year` mit den Werten `2018` und `2019`.

Vorgehen: Die betreffenden Spalten auswählen → Registerkarte **Transformieren → Entpivotieren**. Die entstandenen Spalten `Attribut` und `Wert` können anschließend umbenannt werden (z. B. in `Year` und `SalesAmount`).

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Verkaufsdaten liegen mit den Spalten <em>Month</em>, <em>2018</em> und <em>2019</em> vor. Nach dem Entpivotieren der Jahresspalten entstehen drei Spalten: <em>Month</em>, <em>Year</em> und <em>SalesAmount</em> — eine für DAX-Measures und Slicers deutlich besser geeignete Struktur.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-unpivot-ss.png — Power Query mit dem Ergebnis des Entpivotierens: aus zwei Jahresspalten wurden die Spalten Year und SalesAmount.</span>
</div>

### Spalten pivotieren

Das Pivotieren ist der umgekehrte Vorgang: Flache Zeilen werden zu einer strukturierten Tabelle aggregiert, bei der eindeutige Werte einer Spalte zu neuen Spaltenüberschriften werden. Aufruf über **Transformieren → Spalte pivotieren**; dort wird die Wertespalte und eine Aggregatfunktion (Anzahl, Summe, Minimum, Maximum, Durchschnitt, Median) ausgewählt.

---

## Datenstruktur vereinfachen

### Abfragen (Tabellen) umbenennen

Tabellennamen aus Datenquellen enthalten häufig technische Präfixe wie `Fact`, `v` oder lange Systemnamen. Im Power Query-Editor: Rechtsklick auf die Abfrage im linken Bereich → **Umbenennen**. Beschreibende, prägnante Namen ohne technische Präfixe sind zu bevorzugen.

### Werte ersetzen

Mit **Transformieren → Werte ersetzen** lassen sich einzelne Werte in einer Spalte durch korrekte Werte ersetzen — z. B. Rechtschreibfehler oder inkonsistente Schreibweisen. In Power Query können keine einzelnen Zellen direkt bearbeitet werden, wie es in Excel möglich ist.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 03-replace-value-ssm.png — Dialog "Werte ersetzen" im Power Query-Editor mit Feldern für alten und neuen Wert.</span>
</div>

### NULL-Werte ersetzen

NULL-Werte können Berechnungen verfälschen. Beispiel: Ein Versandwert von NULL anstelle von 0 verzerrt Durchschnittswerte. Die Lösung ist dieselbe wie beim Werteersetzen — in der entsprechenden Spalte NULL durch den gewünschten Wert ersetzen.

### Duplikate entfernen

Über Rechtsklick auf eine Spaltenüberschrift → **Duplikate entfernen** werden nur eindeutige Werte in der Spalte behalten. Vor dem Entfernen empfiehlt es sich, die Tabelle zu kopieren (Rechtsklick auf die Abfrage → **Kopieren**), um beide Versionen vergleichen zu können.

### Bewährte Namenskonventionen

Es gibt keine starren Regeln, aber folgende Empfehlungen gelten als Best Practice:

- Beschreibende, geschäftliche Namen — keine technischen Abkürzungen, die außerhalb der IT unbekannt sind
- Unterstriche durch Leerzeichen ersetzen
- Konsistente Schreibweise für Abkürzungen, Präfixe und Begriffe wie „ID" oder „Nummer"
- Präfixe wie `Fact`, `Dim`, `v` aus Tabellennamen entfernen
- Werte so formulieren, dass sie im Visual gut lesbar sind — nicht zu lang, nicht zu kryptisch

---

## Spaltendatentypen auswerten und ändern

Beim Import scannt Power BI Desktop automatisch die ersten 1.000 Zeilen einer Tabelle und leitet den Datentyp jeder Spalte ab. Bei Flatfiles (CSV, Excel) ist die Fehlerquote höher als bei Datenbankquellen, da dort Typen vorab definiert sind.

### Auswirkungen falscher Datentypen

Falsche Datentypen verhindern:

- Zeitbasierte Berechnungen (z. B. TOTALYTD setzt einen Datumsdatentyp voraus)
- Datumshierarchien (Jahr, Quartal, Monat) — nur bei Datentyp Datum möglich
- Korrekte Beziehungen zwischen Tabellen

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Datentypen sollten immer im Power Query-Editor korrigiert werden, <em>bevor</em> die Daten ins semantische Modell geladen werden — nicht nachträglich in der Berichtsansicht.
</div>

### Datentyp ändern

Zwei Wege im Power Query-Editor:

- Spalte auswählen → Registerkarte **Transformieren → Datentyp** → richtigen Typ auswählen
- Auf das Datentypsymbol links neben der Spaltenüberschrift klicken → Typ aus Liste wählen

Die Änderung wird als Schritt **Geänderter Typ** gespeichert und bei jeder Aktualisierung automatisch angewendet.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 04-select-data-type-ssm.png — Auswahl eines Datentyps über die Registerkarte Transformieren im Power Query-Editor.</span>
</div>

---

## Abfragen kombinieren: Anfügen und Zusammenführen

Tabellen werden kombiniert, wenn zu viele separate Tabellen die Navigation erschweren, mehrere Tabellen ähnliche Inhalte haben, oder Spalten aus verschiedenen Quellen zusammengeführt werden sollen.

### Abfragen anfügen (Append)

Beim Anfügen werden Zeilen einer Tabelle an eine andere gehängt — vergleichbar mit `UNION ALL` in SQL. Die Tabellen müssen nicht identisch sein, aber gleiche Spaltenüberschriften sind notwendig, damit Daten in die richtigen Spalten fließen.

Aufruf: **Start → Abfragen anfügen → Abfragen als neu anfügen** (erzeugt eine neue Tabelle aus mehreren Quellen).

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Drei Tabellen mit Kontaktdaten (Mitarbeiter, Lieferanten, Kunden) werden zu einer einzigen Mastertabelle zusammengefügt. Voraussetzung: alle drei Tabellen enthalten die gleichen Spaltenüberschriften <em>ID, Unternehmen, Name, Telefon</em>.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 05-append-new-window-ss.png — Fenster "Abfragen als neu anfügen" mit verfügbaren und anzufügenden Tabellen.</span>
</div>

### Abfragen zusammenführen (Merge)

Beim Zusammenführen werden Spalten aus einer zweiten Tabelle zu einer ersten hinzugefügt — basierend auf einer gemeinsamen Schlüsselspalte. Entspricht einem SQL JOIN.

Aufruf: **Start → Abfragen zusammenführen → Abfragen als neu zusammenführen**. Im Dialog werden beide Tabellen und die übereinstimmende Schlüsselspalte ausgewählt.

Verfügbare Join-Typen:

| Join-Typ | Verhalten |
|---|---|
| **Linker äußerer Join** | Alle Zeilen der ersten Tabelle + übereinstimmende Zeilen der zweiten |
| **Vollständiger äußerer Join** | Alle Datensätze beider Tabellen |
| **Innerer Join** | Nur Zeilen, die in beiden Tabellen übereinstimmen |

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 05-merge-queries-new-ss.png — Fenster "Abfragen zusammenführen" mit Tabellenauswahl, Schlüsselspalte und Join-Typ.</span>
</div>

---

## Datenprofiling

Profiling dient dazu, vor der eigentlichen Berichtsarbeit die Qualität und Verteilung der Daten zu verstehen — Anomalien, Ausreißer und Statistiken werden sichtbar gemacht.

### Datenstruktur in der Modell-Ansicht prüfen

Bevor der Power Query-Editor geöffnet wird, lohnt ein Blick auf die Registerkarte **Modell** in Power BI Desktop. Dort sind Tabellen, Beziehungen und Spalten sichtbar. Über **Beziehungen verwalten** können Beziehungen erstellt, bearbeitet oder gelöscht werden.

### Profilierungsoptionen aktivieren

Im Power Query-Editor unter **Ansicht → Datenvorschau** stehen drei Profilierungsansichten zur Verfügung, die gleichzeitig aktiviert werden können:

| Ansicht | Zeigt |
|---|---|
| **Spaltenqualität** | Prozentualer Anteil gültiger, fehlerhafter und leerer Werte je Spalte |
| **Spaltenverteilung** | Anzahl unterschiedlicher (inkl. Duplikate) und eindeutiger Werte |
| **Spaltenprofil** | Vollständige Statistik: Zeilenanzahl, Min, Max, Durchschnitt, Standardabweichung, Nullwerte, Wertverteilung |

<div class="pbi-definition">
  <strong>Unterschiedliche Werte vs. Eindeutige Werte</strong> Unterschiedliche Werte umfassen alle Werte einer Spalte inklusive Duplikate und Nullwerte. Eindeutige Werte sind nur jene, die genau einmal vorkommen. Die Differenz beider Zahlen zeigt, wie viele Werte mehrfach vorkommen.
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Power Query profiliert standardmäßig nur die ersten 1.000 Zeilen. Für eine vollständige Analyse: Statusleiste unten → Profilerstellungsstatus → <strong>Spaltenprofilerstellung basierend auf gesamtem Dataset</strong> auswählen.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 06-column-statistics-ssm.png — Power Query-Editor mit aktivierten Profilierungsansichten: Spaltenqualität, Spaltenverteilung und Spaltenprofil über den Datenspalten.</span>
</div>

Das Diagramm **Wertverteilung** zeigt, welche Werte besonders häufig oder selten vorkommen — ein Ausgangspunkt für Fehlersuche und Ausreißeranalyse. Für numerische Spalten ergänzt die Spaltenstatistik Durchschnitt, Standardabweichung sowie die Anzahl von Nullen und NULL-Werten.

---

## M-Code im erweiterten Editor

Jede im Power Query-Editor ausgeführte Transformation wird intern als **M-Code** gespeichert. M ist eine funktionale Skriptsprache, die alle Schritte in einer strukturierten Abfolge abbildet.

Der erweiterte Editor wird über **Ansicht → Erweiterter Editor** geöffnet.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 08-m-code.png — Erweiterter Editor im Power Query mit dem M-Code der aktuellen Abfrage.</span>
</div>

Wichtige Eigenschaften von M-Code:

- Jeder Schritt entspricht ungefähr einer Zeile M-Code
- Spätere Schritte referenzieren frühere über deren Variablennamen (links neben dem `=`)
- Die Reihenfolge der Schritte darf nicht beliebig verändert werden — Abhängigkeiten können brechen
- Der letzte Schritt steht in der `in`-Anweisung und definiert das finale Ergebnis der Abfrage

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  M-Code muss nicht aktiv geschrieben werden — die grafische Oberfläche erledigt das. Kenntnisse im Lesen von M-Code sind jedoch nützlich, um z. B. Datenbankverbindungsdetails direkt im Code zu ändern oder Schritte gezielt anzupassen.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Power Query-Editor</div>
    <div class="pbi-summary-body">Zentrales Bereinigungswerkzeug. Alle Schritte werden als wiederholbare Sequenz gespeichert. Änderungen berühren nie die Originaldatenquelle.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Strukturieren</div>
    <div class="pbi-summary-body">Kopfzeilen höher stufen, Spalten umbenennen, unnötige Zeilen und Spalten entfernen, Tabellen und Abfragen mit beschreibenden Namen versehen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">↔️</div>
    <div class="pbi-summary-title">Pivotieren & Entpivotieren</div>
    <div class="pbi-summary-body">Entpivotieren normalisiert breite Spaltenstrukturen in Zeilen (für DAX und Slicers). Pivotieren aggregiert flache Zeilen zu strukturierten Spalten.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Datentypen</div>
    <div class="pbi-summary-body">Immer im Power Query-Editor korrigieren, bevor die Daten geladen werden. Falsche Typen blockieren Berechnungen, Hierarchien und Beziehungen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Anfügen & Zusammenführen</div>
    <div class="pbi-summary-body">Anfügen: Zeilen stapeln (UNION). Zusammenführen: Spalten verknüpfen (JOIN) über eine Schlüsselspalte. Drei Join-Typen: links äußerer, vollständiger äußerer, innerer.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Profiling & M-Code</div>
    <div class="pbi-summary-body">Spaltenqualität, -verteilung und -profil aufdecken Anomalien und Ausreißer. M-Code im erweiterten Editor macht alle Schritte transparent und direkt bearbeitbar.</div>
  </div>
</div>
