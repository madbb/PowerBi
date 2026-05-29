# Semantisches Modell konfigurieren

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 08</div>
  <div class="pbi-page-title">Semantisches Modell konfigurieren</div>
  <div class="pbi-page-sub">Beziehungen, Tabellen, Spalten, Hierarchien, Measures und Parameter</div>
</div>

Nachdem Power Query-Abfragen angewendet und Daten geladen wurden, ist das Modell noch nicht fertig. Das Ziel der Modellkonfiguration ist eine **Semantikebene** über den Daten: ein Modell, das Berichtsanforderungen unterstützt, intuitiv zu bedienen ist und korrekte Ergebnisse liefert. Die Arbeit beginnt mit Beziehungen und erweitert sich auf Tabellen‑, Spalten‑, Hierarchie‑, Measure‑ und Parameterkonfigurationen.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Dieses Skript konzentriert sich auf Importmodelle. DirectQuery, zusammengesetzte Modelle, benutzerdefinierte Aggregationen und Sicherheit auf Zeilenebene (RLS) werden gesondert behandelt.
</div>

---

## Beziehungen konfigurieren

Beziehungen sorgen dafür, dass Filter, die auf eine Modelltabelle angewendet werden, sich entlang des Beziehungspfads auf andere Tabellen ausbreiten. Das ermöglicht es Berichtsautoren, ein Visual nach einer Spalte aus einer Dimensionstabelle zu filtern — und automatisch werden nur die relevanten Zeilen der Faktentabelle berücksichtigt.

### Ladeoptionen konfigurieren

Bevor Power Query-Abfragen geladen werden, können in den **Optionen → Daten laden** die Beziehungseinstellungen angepasst werden. Diese steuern, ob Power BI Desktop erkannte Beziehungen beim Import oder bei der Aktualisierung automatisch erstellt, aktualisiert oder löscht. Werden Beziehungen nicht automatisch erkannt, können sie im Fenster **Beziehungen verwalten** oder direkt in der Modellansicht angelegt werden.

<div class="pbi-definition">
  <strong>Unverbundene Tabelle (Disconnected Table)</strong> Eine Tabelle ohne Beziehung zu anderen Modelltabellen. Sinnvoll für Was-wäre-wenn-Szenarien und Feldparameter, die keine direkte Datenverknüpfung benötigen.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 1-1-options-relationships.png — Power BI Desktop-Optionen für Daten laden mit den Beziehungseinstellungen (automatisch erkennen, aktualisieren, löschen).</span>
</div>

### Beziehungsspalten

Jede Beziehung verbindet genau **eine Spalte** aus der einen Tabelle mit **einer Spalte** aus der anderen. Die Datentypen beider Spalten müssen gleich oder gleichwertig sein und übereinstimmende Werte enthalten. Wenn die Quelldaten einen mehrspaltigen Schlüssel verwenden, muss in Power Query ein einspaltiger Schlüssel erzeugt werden.

### Kardinalität

Jede Beziehung hat einen Kardinalitätstyp, der angibt, wie viele Zeilen einer Tabelle wie vielen Zeilen der anderen entsprechen:

| Kardinalität | Bedeutung | Typischer Einsatz |
|---|---|---|
| **Eins-zu-viele (1:\*)** | Eine Zeile auf der „1"-Seite, viele auf der „\*"-Seite | Dimension → Faktentabelle (häufigster Typ) |
| **Viele-zu-eins (\*:1)** | Entspricht 1:\*, nur in entgegengesetzter Richtung | Faktentabelle → Dimension |
| **Eins-zu-eins (1:1)** | Beide Seiten enthalten eindeutige Werte | Selten — besser die Tabellen per Power Query zusammenführen |
| **Viele-zu-viele (\*:\*)** | Keine eindeutige Seite | Wenn keine Spalte mit eindeutigen Werten vorhanden ist (z. B. Kategorie-Fakten) |

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 2-2-relationship-one-to-many.png — Modelldiagramm mit Eins-zu-viele-Beziehung zwischen der Tabelle „Product" (ProductKey) und der Tabelle „Sales" (ProductKey).</span>
</div>

Für **Eins-zu-eins**-Beziehungen gilt: Wenn zwei Tabellen über denselben Schlüssel verfügen, ist es in der Regel besser, sie per Power Query zusammenzuführen und als eine einzige Modelltabelle zu laden — das reduziert die Komplexität und erleichtert Berichtsautoren die Navigation.

### Kreuzfilterrichtung

Die Kreuzfilterrichtung bestimmt, in welche Richtung sich Filter entlang einer Beziehung ausbreiten. Die verfügbaren Optionen hängen von der Kardinalität ab:

| Kardinalität | Mögliche Richtungen |
|---|---|
| Eins-zu-viele / Viele-zu-eins | Einzeln (von „1" zu „\*") **oder** Beide |
| Eins-zu-eins | Beide |
| Viele-zu-viele | Einzeln zu einer der beiden Seiten **oder** Beide |

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Bidirektionale Kreuzfilterung sollte vermieden oder minimiert werden. Sie verschlechtert die Abfrageleistung und kann zu unerwarteten Filterergebnissen führen. Ein triftiger Grund ist die Unterstützung von n:n-Analysen zwischen zwei Dimensionstabellen über eine Brückentabelle.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 2-4-relationship-cross-filter-both.png — Modelldiagramm mit Brückentabelle SalespersonRegion und bidirektionaler Filterausbreitung zwischen Salesperson, Region und Sales.</span>
</div>

### Aktive und inaktive Beziehungen

Zwischen zwei Modelltabellen kann nur **eine aktive** Beziehung existieren. Werden mehrere Beziehungen benötigt (z. B. zwei Datumsspalten in einer Faktentabelle), müssen alle weiteren als **inaktiv** markiert werden. Inaktive Beziehungen lassen sich in DAX-Berechnungen gezielt mit der Funktion `USERELATIONSHIP` aktivieren.

<div class="pbi-definition">
  <strong>Rollenspieldimension (Role-Playing Dimension)</strong> Eine Dimensionstabelle, die mehrere Beziehungen zu einer Faktentabelle hat — z. B. eine Datumstabelle, die sowohl mit dem Bestelldatum als auch dem Versanddatum verknüpft ist. Lösung: zwei separate Datumstabellen mit je einer aktiven Beziehung, oder eine Tabelle mit einer aktiven und einer inaktiven Beziehung plus USERELATIONSHIP in DAX.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 2-5-relationship-role-playing-dimension.png — Vergleich zweier Szenarien: eine Datumstabelle mit aktiver und inaktiver Beziehung vs. zwei Datumstabellen mit je einer aktiven Beziehung.</span>
</div>

### Im Modelldiagramm arbeiten

Im Modelldiagramm (Modellansicht) werden Beziehungen als Linien dargestellt:

- Symbole **1** und **\*** zeigen die Kardinalität
- Pfeile in der Linienmitte zeigen die Kreuzfilterrichtung
- **Durchgezogene Linie** = aktive Beziehung; **gepunktete Linie** = inaktive Beziehung

Neue Beziehungen können per Drag & Drop zwischen Spalten im Diagramm erstellt werden. Durch Doppelklick auf eine Linie öffnen sich die Beziehungseigenschaften.

---

## Tabellen konfigurieren

### Tabelleneigenschaften

Für jede Modelltabelle können folgende Eigenschaften gesetzt werden:

| Eigenschaft | Bedeutung |
|---|---|
| **Name** | Benutzerfreundlicher Anzeigename (wird mit dem Power Query-Abfragenamen synchronisiert) |
| **Beschriftung** | Ausführliche Definition — erscheint als Tooltip im Datenbereich |
| **Synonyme** | Alternative Namen für Q&A und Copilot, um natürlichsprachliche Anfragen besser zu verstehen |
| **Ist ausgeblendet** | Tabelle nicht im Datenbereich anzeigen — für Brückentabellen oder Hilfstabellen sinnvoll |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Mehrere Objekte können in der Modellansicht gleichzeitig ausgewählt und ihre Eigenschaften im Eigenschaftenbereich gemeinsam aktualisiert werden (Massenaktualisierung).
</div>

### Datumstabellen markieren

Power BI Desktop enthält die Funktion **Automatisch Datum/Uhrzeit**, die für jede Datums- oder Datum/Uhrzeit-Spalte automatisch ausgeblendete Datumstabellen erzeugt. Für professionelle Modelle empfiehlt es sich, diese Funktion zu **deaktivieren** und stattdessen eine eigene Datumstabelle zu verwenden — entweder aus einer Quelldatentabelle oder als berechnete DAX-Tabelle.

Eine Datumstabelle muss als solche **markiert** werden, damit DAX-Zeitintelligenzfunktionen korrekte Ergebnisse liefern. Bei der Markierung wird die Datumsspalte ausgewählt. Power BI Desktop prüft automatisch, ob diese Spalte eindeutige Werte enthält, keine Leerwerte aufweist und lückenlos zusammenhängende Datumsangaben umfasst.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 3-1-table-mark-as-date-table.png — Fenster "Als Datumstabelle markieren" mit ausgewählter Datumsspalte.</span>
</div>

---

## Spalten konfigurieren

Spalten teilen viele Eigenschaften mit Tabellen (Name, Beschriftung, Synonyme, Ist ausgeblendet). Zusätzlich gibt es spaltespezifische Einstellungen:

### Formatierung

- **Datentyp** — bestimmt, wie Werte *gespeichert* werden. Änderungen in Power BI Desktop fügen einen neuen Schritt in der Power Query-Abfrage an.
- **Format** — bestimmt, wie Werte in Visuals *dargestellt* werden. Beispiel: ein Dezimalzahlwert kann als Währung formatiert werden.

### Anzeigeordner

Spalten können in **Anzeigeordner** gruppiert werden, um den Datenbereich bei Tabellen mit vielen Feldern übersichtlicher zu gestalten.

### Sortierreihenfolge

Standardmäßig werden Textwerte alphabetisch und Zahlen/Datumsangaben numerisch sortiert. Wenn eine andere Reihenfolge gewünscht ist, kann mit **Nach Spalte sortieren** eine andere Spalte als Sortiergrundlage festgelegt werden.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Die Spalte <em>Month</em> enthält Monatsnamen wie "2017 Aug" und würde alphabetisch sortiert. Die Spalte <em>MonthKey</em> enthält numerische Werte (z. B. 201708). Durch "Nach Spalte sortieren: MonthKey" werden die Monate chronologisch angezeigt. MonthKey selbst wird ausgeblendet.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 4-1-column-sort-order.png — Zwei Datenschnitte im Vergleich: einer mit falscher alphabetischer Monatsreihenfolge, einer mit korrekter chronologischer Reihenfolge nach "Nach Spalte sortieren".</span>
</div>

### Datenkategorie

Mit **Datenkategorie** wird der Inhalt einer Spalte semantisch beschrieben. Besonders relevant für:

- **Räumliche Werte** (Längengrad, Breitengrad, Adresse, Land, Ort etc.) — Power BI geokodiert diese Spalten präziser und visualisiert sie korrekt in Kartenvisuals
- **Web-URL** — der Link kann in Tabellen‑ und Matrixvisuals als kompaktes Linksymbol dargestellt werden
- **Bild-URL** — das verlinkte Bild kann direkt in Tabellen‑, Matrix‑, Datenschnitt‑ und Kartenvisuals angezeigt werden

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 4-2-column-data-categorize-spatial.png — Tabelle "Reseller" im Datenbereich mit drei Feldern, die mit dem räumlichen Symbol markiert sind.</span>
</div>

### Zusammenfassung

Mit **Zusammenfassen nach** wird die Standardaggregation einer numerischen Spalte festgelegt (Summe, Min, Max, Durchschnitt, Anzahl, Rabattanzahl oder Keine). Numerische Spalten erhalten im Datenbereich ein Sigma-Symbol (Ʃ).

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Wenn die Aggregation einer numerischen Spalte kontrolliert werden soll, empfiehlt es sich, ein Measure zu erstellen und die Spalte auszublenden. Dadurch wird verhindert, dass Berichtsautoren die Spalte versehentlich falsch aggregieren.
</div>

---

## Hierarchien konfigurieren

Hierarchien sind optional, aber sie geben Berichtsautoren Hinweise auf natürliche Navigationspfade zwischen Spalten innerhalb einer Tabelle. Ohne Hierarchie können Berichtsautoren dasselbe Ergebnis erzielen, indem sie mehrere Spalten einem Visual hinzufügen — das erfordert jedoch mehr Wissen.

Hierarchien werden einer Tabelle hinzugefügt und bestehen aus Ebenen, die auf Spalten **derselben Tabelle** basieren.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Hierarchie <em>Fiscal</em> in der Tabelle <em>Date</em> mit den Ebenen <em>Year → Quarter → Month</em>. Berichtsautoren können in einem Matrixvisual durch die Hierarchie auf‑ und abwärts navigieren (Drill-up/Drill-down).
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-1-hierarchy-date-table.png — Fiskalhierarchie im Datenbereich mit den Ebenen Year, Quarter und Month.</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-2-hierarchy-matrix.png — Matrixvisual mit der Fiskalhierarchie in den Zeilen: Geschäftsjahr 2018 aufgeklappt bis auf Quartal 1 mit drei sichtbaren Monaten.</span>
</div>

Wie Spalten können auch Hierarchien mit Beschreibung, Synonym, Anzeigeordner und der Eigenschaft „Ist ausgeblendet" versehen werden.

---

## Measures konfigurieren

Ein **Measure** ist eine benannte DAX-Formel, die einer Modelltabelle hinzugefügt wird und eine Zusammenfassung berechnet. Im Datenbereich wird es durch ein Taschenrechnersymbol (⊞) gekennzeichnet. Measure-Namen müssen im gesamten Modell eindeutig sein.

Measures sind notwendig, wenn Berichtsautoren komplexe Berechnungen benötigen, die über einfache Spaltenaggregation hinausgehen — z. B. Umsatz abzüglich Kosten für den Gewinn, oder Berechnungen für das laufende Jahr (YTD). Measures werden auch bei der MDX-Abfrage (In Excel analysieren) benötigt.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 6-1-measure.png — Tabelle "Sales" im Datenbereich mit dem Feld "Gewinn", das mit einem Taschenrechnersymbol versehen ist.</span>
</div>

### Quickmeasures

Wer noch keine DAX-Kenntnisse hat, kann mit **Quickmeasures** arbeiten: Eine Berechnungsvorlage wird ausgewählt (z. B. Durchschnitt pro Kategorie, Differenz zum Vorjahr), Felder werden per Drag & Drop zugewiesen, und Power BI Desktop generiert automatisch den DAX-Code.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 6-2-quick-measure.png — Quickmeasure-Bereich mit einer Liste von Berechnungsvorlagen.</span>
</div>

Für Measures können dieselben Eigenschaften wie für Spalten gesetzt werden: Beschreibung, Synonym, Anzeigeordner, Ist ausgeblendet sowie Formatierungseigenschaften. Mit der Eigenschaft **Startseite** kann ein Measure einer beliebigen Modelltabelle zugewiesen werden — unabhängig davon, in welcher Tabelle es ursprünglich erstellt wurde.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Copilot für Power BI kann verwendet werden, um automatisch eine Beschreibung für ein Measure zu generieren, indem die DAX-Formel analysiert wird.
</div>

---

## Parameter konfigurieren

Parameter ermöglichen es Berichtsnutzern, Einstellungen wie Filter oder Berechnungen interaktiv anzupassen — ohne die Originaldaten zu ändern. Es gibt zwei Typen:

### Numerischer Bereichsparameter

Definiert durch einen numerischen Datentyp, Mindest‑ und Maximalwerte, einen Erhöhungsschritt und einen Standardwert. Power BI Desktop erzeugt automatisch eine **berechnete Tabelle** (unverbundene Tabelle) und ein **Measure**, das den aktuell vom Berichtsnutzer gewählten Wert zurückgibt. Diese Tabelle hat keine Beziehung zu anderen Modelltabellen.

Typischer Einsatz: **Was-wäre-wenn-Szenarien** — z. B. ein Datenschnitt für einen hypothetischen Wechselkurs, den Berichtsnutzer einstellen können. Ein Measure verwendet dann diesen Wert für Berechnungen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 7-1-parameter.png — Datenbereich mit der berechneten Tabelle "Exchange Rate", deren Feld mit einem Fragezeichen-Symbol für Parameter markiert ist.</span>
</div>

### Feldparameter

Ein Feldparameter fasst eine Gruppe verschiedener Modellfelder zusammen. Berichtsautoren können dann über einen Datenschnitt dynamisch auswählen, welches Feld in einem Visual visualisiert werden soll.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Feldparameter <em>Product Grouping</em> aus den Spalten Category, Subcategory, Product und Color der Tabelle Product. Über einen Datenschnitt wählt der Nutzer "Color" — das Balkendiagramm auf der Seite segmentiert automatisch nach Farbe.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 7-2-parameter-fields.png — Bericht mit dem Feldparameter "Product Grouping" als Datenschnitt; das Balkendiagramm zeigt Umsätze nach der ausgewählten Spalte "Color".</span>
</div>

Parameter werden im Datenbereich mit einem Fragezeichensymbol (?) angezeigt.

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Beziehungen</div>
    <div class="pbi-summary-body">Kardinalität (1:*, 1:1, *:*) und Kreuzfilterrichtung (einzeln vs. beide) konfigurieren. Bidirektionale Filter vermeiden. Aktive vs. inaktive Beziehungen für Rollenspieldimensionen nutzen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Tabellen</div>
    <div class="pbi-summary-body">Name, Beschreibung, Synonyme und Ausblenden konfigurieren. Datumstabellen markieren und Auto Datum/Uhrzeit deaktivieren für korrekte Zeitintelligenz.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Spalten</div>
    <div class="pbi-summary-body">Datentyp, Format, Sortierreihenfolge, Datenkategorie (räumlich, URL, Bild) und Standardaggregation festlegen. Anzeigeordner für Übersichtlichkeit nutzen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Hierarchien</div>
    <div class="pbi-summary-body">Navigationspfade zwischen Spalten einer Tabelle definieren (z. B. Year → Quarter → Month). Ermöglichen Drill-up/down in Visuals ohne manuelle Konfiguration.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">⊞</div>
    <div class="pbi-summary-title">Measures</div>
    <div class="pbi-summary-body">Benannte DAX-Formeln für komplexe Zusammenfassungen. Quickmeasures für Einstieg ohne DAX-Kenntnisse. Name, Format, Startseite und Anzeigeordner konfigurieren.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Parameter</div>
    <div class="pbi-summary-body">Numerischer Bereich: Was-wäre-wenn mit unverbundener Tabelle und Datenschnitt. Feldparameter: Berichtsnutzer wählt dynamisch, welches Feld ein Visual verwendet.</div>
  </div>
</div>
