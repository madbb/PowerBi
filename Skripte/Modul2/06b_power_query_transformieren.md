# Power Query: Daten transformieren und kombinieren

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06b</div>
  <div class="pbi-page-title">Power Query: Daten transformieren und kombinieren</div>
  <div class="pbi-page-sub">Spalten erstellen, Struktur umformen, Abfragen kombinieren und Abfragetypen verstehen</div>
</div>

Bereinigte und strukturierte Daten aus Skript 06a sind der Ausgangspunkt. In diesem Skript entstehen neue Inhalte die nicht in der Quelle stehen: neue Spalten aus vorhandenen Feldern, aggregierte Sichten, kombinierte Tabellen. Dazu kommen die Abfragetypen Verweis und Duplikat als Grundlage für sauber aufgebaute Modelle.

---

## Neue Spalten erstellen

### Benutzerdefinierte Spalte

Mit einer benutzerdefinierten Spalte lässt sich eine neue Spalte auf Basis einer M-Formel erstellen. Aufruf: **Spalte hinzufügen → Benutzerdefinierte Spalte**. Im Dialog wird ein Spaltenname vergeben und die Formel eingegeben.

Typische Anwendungsfälle sind Berechnungen aus bestehenden Spalten, Textverkettungen oder Wertetransformationen.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Tabelle hat die Spalten <em>Listenpreis</em> und <em>Rabatt</em>. Eine benutzerdefinierte Spalte <em>Nettopreis</em> mit der Formel <code>[Listenpreis] * (1 - [Rabatt])</code> berechnet den tatsächlichen Verkaufspreis für jede Zeile.
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Spaltennamen in M-Formeln werden immer in eckigen Klammern geschrieben: <code>[Spaltenname]</code>. Groß- und Kleinschreibung muss exakt übereinstimmen.
</div>

### Bedingte Spalte

Eine bedingte Spalte erstellt Werte auf Basis von Wenn-Dann-Sonst-Bedingungen — ohne M-Code schreiben zu müssen. Aufruf: **Spalte hinzufügen → Bedingte Spalte**. Im Dialog werden Bedingungen per Dropdown konfiguriert: Spalte, Operator, Vergleichswert, Ausgabewert.

Mehrere Bedingungen lassen sich über **Klausel hinzufügen** stapeln. Die erste zutreffende Bedingung gewinnt.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Spalte <em>Listenpreis</em> soll in drei Kategorien eingeteilt werden. Bedingte Spalte <em>Preisklasse</em>: Wenn Listenpreis kleiner als 200 dann "Niedrig", wenn Listenpreis kleiner als 1000 dann "Mittel", sonst "Hoch".
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 07-conditional-column-ss.png — Dialog "Bedingte Spalte" im Power Query-Editor mit mehreren konfigurierten Wenn-Dann-Bedingungen und einem Sonst-Wert.</span>
</div>

### Spalten aus Beispielen

Über **Spalte hinzufügen → Spalte aus Beispielen** kann Power Query das Transformationsmuster automatisch ableiten. Man gibt in einer neuen Spalte manuell ein oder zwei Beispielwerte ein — Power BI versucht, die Logik dahinter zu erkennen und auf alle Zeilen anzuwenden.

Nützlich bei komplexen Textoperationen, die sich schwer in eine Formel fassen lassen, zum Beispiel das Extrahieren von Teilstrings aus uneinheitlich formatierten Feldern.

---

## Datenstruktur umformen

### Transponieren

Transponieren dreht Zeilen und Spalten komplett um: Was vorher eine Zeile war, wird zur Spalte — und umgekehrt. Aufruf: **Transformieren → Transponieren**.

Das ist sinnvoll, wenn eine Quelldatei kopfüber geliefert wird — also Spaltenüberschriften in der ersten Spalte stehen statt in der ersten Zeile. Nach dem Transponieren steht die Struktur richtig, und die erste Zeile kann als Überschriften hochgestuft werden.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine CSV-Datei hat Feldnamen in Spalte A (Zeilen untereinander) und die Werte in Spalte B. Nach dem Transponieren stehen die Feldnamen in der ersten Zeile, die Werte darunter. Anschließend: Erste Zeile als Überschriften verwenden.
</div>

### Gruppieren und Aggregieren

Mit **Gruppieren nach** werden Zeilen anhand einer oder mehrerer Spalten zusammengefasst, und numerische Werte werden aggregiert. Das entspricht einem SQL `GROUP BY`.

Aufruf: **Start → Gruppieren nach** oder **Transformieren → Gruppieren nach**. Im Dialog:
- **Gruppieren nach:** Spalte(n) auswählen, nach denen aggregiert wird
- **Neue Spalte:** Name der Ergebnisspalte
- **Vorgang:** Aggregatfunktion (Summe, Anzahl, Durchschnitt, Min, Max)
- **Spalte:** Quellspalte für die Aggregation

Über **Erweitert** lassen sich mehrere Aggregationen in einem Schritt erstellen.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Bestelltabelle mit 3.500 Zeilen soll auf Tagesebene zusammengefasst werden. Gruppieren nach <em>Bestelldatum</em>, neue Spalte <em>Anzahl Bestellungen</em> mit Vorgang Zeilenanzahl, neue Spalte <em>Gesamtumsatz</em> mit Vorgang Summe auf <em>Umsatz</em>. Ergebnis: eine kompakte Tabelle mit einer Zeile je Tag.
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Gruppieren und Aggregieren in Power Query eignet sich besonders für Staging-Tabellen, die bereits voraggregierte Daten ins Modell laden — zum Beispiel wenn die Originaltabelle Millionen von Transaktionen enthält und nur Tagessummen benötigt werden.
</div>

---

## Verschachtelte Daten expandieren

### JSON und XML

Daten aus NoSQL-Datenbanken (z. B. Azure Cosmos DB) oder Web-APIs kommen häufig als JSON oder XML. Diese Formate sind verschachtelt: Ein Datensatz enthält Unterobjekte mit eigenen Feldern. Power Query lädt sie zunächst als Spalten vom Typ `Record` oder `List`.

Um die enthaltenen Felder als eigene Spalten zu extrahieren: Klick auf das Erweiterungs-Symbol in der Spaltenüberschrift (zwei gegenläufige Pfeile). Im Dialog die gewünschten Felder auswählen. Das Kontrollkästchen **Ursprünglichen Spaltennamen als Präfix verwenden** deaktivieren, um saubere Spaltennamen zu erhalten.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Cosmos-DB-Tabelle liefert eine Spalte <em>Adresse</em> vom Typ Record, die die Felder <em>Straße</em>, <em>PLZ</em> und <em>Stadt</em> enthält. Nach dem Expandieren entstehen drei eigene Spalten mit diesen Werten — ohne Präfix-Kürzel.
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Das Expandieren bricht Query Folding ab. Alle nachfolgenden Transformationen werden lokal in Power BI verarbeitet, nicht auf dem Quellserver.
</div>

---

## Abfragen kombinieren

### Abfragen anfügen (Append)

Beim Anfügen werden Zeilen mehrerer Tabellen untereinander gestapelt. Das entspricht `UNION ALL` in SQL. Die Tabellen müssen nicht identisch sein, aber gleiche Spaltenüberschriften sind Voraussetzung für korrekte Zuordnung. Nicht übereinstimmende Spalten werden mit NULL aufgefüllt.

Aufruf: **Start → Abfragen anfügen → Abfragen als neu anfügen**. Im Dialog Tabellen von der verfügbaren Liste zur anzufügenden Liste verschieben. Ergebnis ist eine neue Abfrage.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Bestellungen des laufenden Jahres liegen in <em>orders.csv</em>, Bestellungen des Vorjahres in <em>orders_2025.csv</em>. Beide haben identische Spalten. Nach dem Anfügen entsteht eine Tabelle mit allen Bestellungen beider Jahre.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 05-append-new-window-ss.png — Fenster "Abfragen als neu anfügen" mit verfügbaren und anzufügenden Tabellen.</span>
</div>

### Abfragen zusammenführen (Merge)

Beim Zusammenführen werden Spalten aus einer zweiten Tabelle zu einer ersten hinzugefügt — basierend auf einer gemeinsamen Schlüsselspalte. Das entspricht einem SQL JOIN.

Aufruf: **Start → Abfragen zusammenführen → Als neue Abfrage zusammenführen**. Im Dialog: beide Tabellen auswählen, die Schlüsselspalten in beiden Tabellen anklicken, Join-Typ wählen. Das Ergebnis enthält eine neue Spalte vom Typ `Table`, die expandiert werden muss, um die Felder der zweiten Tabelle sichtbar zu machen.

**Verfügbare Join-Typen:**

| Join-Typ | Verhalten | SQL-Entsprechung | PL-300 |
|---|---|---|---|
| **Linker äußerer Join** | Alle Zeilen der ersten Tabelle, nur übereinstimmende der zweiten. Keine Übereinstimmung ergibt NULL. | `LEFT OUTER JOIN` | Prüfungsstoff |
| **Vollständiger äußerer Join** | Alle Zeilen beider Tabellen, nicht übereinstimmende Seiten erhalten NULL. | `FULL OUTER JOIN` | Prüfungsstoff |
| **Innerer Join** | Nur Zeilen, die in beiden Tabellen einen passenden Schlüssel haben. | `INNER JOIN` | Prüfungsstoff |
| **Rechter äußerer Join** | Alle Zeilen der zweiten Tabelle, nur übereinstimmende der ersten. | `RIGHT OUTER JOIN` | |
| **Linker Anti-Join** | Nur Zeilen der ersten Tabelle, für die es keinen Treffer in der zweiten gibt. | `LEFT ANTI JOIN` | |
| **Rechter Anti-Join** | Nur Zeilen der zweiten Tabelle, für die es keinen Treffer in der ersten gibt. | `RIGHT ANTI JOIN` | |

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Die Bestelltabelle hat eine Spalte <em>CustomerID</em>. Die Kundentabelle hat ebenfalls <em>CustomerID</em> plus Adresse und Segment. Nach einem linken äußeren Join auf <em>CustomerID</em> enthält die Bestelltabelle zusätzlich die Kundendaten. Bestellungen ohne passenden Kunden bleiben erhalten, deren Kundenspalten zeigen NULL.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 05-merge-queries-new-ss.png — Fenster "Abfragen zusammenführen" mit Tabellenauswahl, markierten Schlüsselspalten und Auswahl des Join-Typs.</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 05-merge-queries-final-view-ss.png — Ergebnis nach dem Zusammenführen: neue Spalte vom Typ Table in der zusammengeführten Abfrage, bereit zum Expandieren.</span>
</div>

---

## Abfragetypen: Verweis und Duplikat

Beim Arbeiten mit mehreren Abfragen ist es wichtig zu verstehen, wie neue Abfragen aus bestehenden entstehen — und was das für Aktualisierungen bedeutet.

### Verweis (Reference)

Ein Verweis erstellt eine neue Abfrage, die auf einer bestehenden aufbaut. Rechtsklick auf eine Abfrage → **Verweis**. Die neue Abfrage startet dort, wo die Quellabfrage endet, und fügt eigene Schritte hinzu.

Ändert sich die Quellabfrage, ändert sich automatisch auch der Verweis. Beide sind verbunden.

Typischer Einsatz: Eine Staging-Abfrage lädt und bereinigt Rohdaten. Darauf basieren dann mehrere Abfragen, die für unterschiedliche Tabellen im Modell weiter transformieren — ohne die Rohdaten mehrfach zu laden.

### Duplikat (Duplicate)

Ein Duplikat erstellt eine vollständige Kopie der Abfrage inklusive aller Schritte. Rechtsklick auf eine Abfrage → **Duplizieren**. Die Kopie ist unabhängig von der Quelle — Änderungen an der einen Abfrage wirken sich nicht auf die andere aus.

Typischer Einsatz: Man möchte eine bestehende Abfrage als Ausgangspunkt für Experimente nutzen, ohne die Originalabfrage zu gefährden.

<div class="pbi-definition">
  <strong>Verweis vs. Duplikat</strong> Verweis: verbunden, aktualisiert sich mit der Quelle, geeignet für Staging-Muster. Duplikat: unabhängige Kopie, geeignet für Experimente oder parallele Varianten.
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Verweise sind ein zentrales Muster in gut strukturierten Power Query-Modellen. Eine saubere Staging-Abfrage, auf die mehrere Abfragen verweisen, verhindert redundante Ladeoperationen und macht Änderungen an der Quelle einfach verwaltbar.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Spalten erstellen</div>
    <div class="pbi-summary-body">Benutzerdefinierte Spalte für Formeln und Berechnungen. Bedingte Spalte für Wenn-Dann-Logik ohne M-Code. Spalte aus Beispielen wenn das Muster schwer zu formulieren ist.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">↔️</div>
    <div class="pbi-summary-title">Transponieren und Gruppieren</div>
    <div class="pbi-summary-body">Transponieren dreht Zeilen und Spalten komplett um — nützlich wenn die Quelle kopfüber geliefert wird. Gruppieren und Aggregieren fasst Zeilen zusammen (SQL GROUP BY), geeignet für Voraggregation großer Tabellen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Gruppieren und Aggregieren</div>
    <div class="pbi-summary-body">Zeilen nach einer oder mehreren Spalten zusammenfassen, numerische Felder aggregieren. Entspricht SQL GROUP BY. Nützlich für Voraggregation großer Tabellen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">JSON und XML expandieren</div>
    <div class="pbi-summary-body">Verschachtelte Record- und List-Spalten aus NoSQL-Quellen über das Erweiterungs-Symbol aufklappen. Präfix-Option deaktivieren für saubere Spaltennamen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Anfügen und Zusammenführen</div>
    <div class="pbi-summary-body">Anfügen stapelt Zeilen (UNION ALL). Zusammenführen verbindet Tabellen über einen Schlüssel (JOIN). Sechs Join-Typen stehen zur Verfügung: äußere, innere und Anti-Joins.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Verweis und Duplikat</div>
    <div class="pbi-summary-body">Verweis baut auf einer bestehenden Abfrage auf und bleibt mit ihr verbunden. Duplikat ist eine unabhängige Kopie. Verweise sind das Fundament des Staging-Musters.</div>
  </div>
</div>
