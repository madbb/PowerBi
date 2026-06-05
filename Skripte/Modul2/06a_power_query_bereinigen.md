# Power Query: Daten vorbereiten

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06a</div>
  <div class="pbi-page-title">Power Query: Daten vorbereiten</div>
  <div class="pbi-page-sub">Power Query-Editor: Strukturieren, Datenform korrigieren, Bereinigen, Datentypen und Profiling</div>
</div>

Importierte Daten sind selten bereit für die Analyse. Spalten tragen technische Namen, die erste Zeile enthält Überschriften die Power BI nicht erkannt hat, Kategorien werden inkonsistent geschrieben, Datentypen stimmen nicht, und Tabellen haben eine Struktur die für DAX unbrauchbar ist. Der **Power Query-Editor** ist das zentrale Werkzeug, um all das zu beheben — ohne die ursprüngliche Datenquelle zu verändern.

---

## Der Power Query-Editor

Der Power Query-Editor wird über **Start → Daten transformieren** geöffnet. Er besteht aus drei Bereichen:

- **Links:** Abfragen-Bereich mit allen geladenen Tabellen
- **Mitte:** Datenvorschau der aktuell gewählten Abfrage
- **Rechts:** Abfrageeinstellungen mit Name und angewendeten Schritten

<div class="pbi-definition">
  <strong>Angewendete Schritte</strong> Jede Transformation im Power Query-Editor wird als benannter Schritt gespeichert. Bei jeder Datenaktualisierung werden diese Schritte automatisch in derselben Reihenfolge wiederholt. Die ursprüngliche Datenquelle bleibt unverändert. Schritte lassen sich umbenennen, umsortieren und löschen — sofern keine Abhängigkeiten gebrochen werden.
</div>

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Abhängigkeiten beachten</span>
  Jeder Schritt referenziert den vorherigen. Wer einen Schritt löscht, auf den spätere Schritte verweisen, bricht die gesamte Kette ab diesem Punkt. Vor dem Löschen prüfen, ob ein Schritt Abhängigkeiten hat.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-shape-data-query-editor-overview-ss.png — Gesamtansicht des Power Query-Editors mit Abfragen-Bereich links, Datenvorschau in der Mitte und Abfrageeinstellungen rechts.</span>
</div>

---

## Ursprungsdaten strukturieren

### Spaltenüberschriften identifizieren

Der erste Schritt beim Strukturieren ist zu prüfen, ob Power BI die Spaltenüberschriften korrekt erkannt hat. Beim Import geht Power Query davon aus, dass alle Zeilen Daten enthalten. Wenn die Quelldatei in der ersten Zeile Spaltennamen enthält, werden diese als Datenwerte eingelesen — die Spalten heißen dann `Column1`, `Column2` usw.

Auf der anderen Seite kann es vorkommen, dass Metadatenzeilen über den eigentlichen Überschriften stehen. In diesem Fall müssen erst die oberen Zeilen entfernt und dann die Überschriften hochgestuft werden.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-identify-headers-names-ssm.png — Importierte Tabelle mit falsch erkannten Überschriften: Spalten heißen Column1, Column2 usw., die echten Überschriften stehen in der ersten Datenzeile.</span>
</div>

### Erste Zeile als Überschriften verwenden

Wenn die erste Zeile die Spaltenüberschriften enthält, diese aber als Datenzeile geladen wurden: **Start → Erste Zeile als Überschriften verwenden**. Alternativ: Dropdown-Schaltfläche neben `Column1` → **Erste Zeile als Überschriften verwenden**.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-use-first-row-headers-ssm.png — Menüoptionen zum Hochstufen der ersten Zeile als Spaltenüberschriften: Registerkarte Start und Dropdown-Schaltfläche neben Column1.</span>
</div>

### Abfrage umbenennen

Tabellennamen aus Quellsystemen enthalten häufig technische Präfixe wie `Fact_`, `Dim_`, `v_` oder lange Systemnamen. Rechtsklick auf die Abfrage im linken Bereich → **Umbenennen**. Beschreibende Namen ohne technische Präfixe sind zu bevorzugen.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Tabelle heißt <em>FactProductTable</em> oder <em>vProduct</em>. Beide Namen sind für Berichtsnutzer wenig aussagekräftig. Nach dem Umbenennen heißt sie <em>Produkte</em>.
</div>

### Spalten umbenennen

Doppelklick auf die Spaltenüberschrift oder Rechtsklick → **Umbenennen**. Spaltennamen aus der Quelle sind häufig abgekürzt, technisch oder inkonsistent. Die Namen sollten für Berichtsnutzer verständlich sein und keine Unterstriche enthalten.

### Spalten entfernen

Nicht benötigte Spalten so früh wie möglich entfernen. Jede Spalte die ins Modell geladen wird, belegt Speicher — auch wenn sie in keinem Visual verwendet wird.

Zwei Varianten:
- **Spalten entfernen** — markierte Spalten werden gelöscht
- **Andere Spalten entfernen** — nur die markierten Spalten werden behalten, alle anderen gelöscht

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Spalten früh zu entfernen ist eine der wirksamsten Maßnahmen zur Modelloptimierung. Wenn SQL-Zugriff auf die Quelle möglich ist, Spalten bereits in der SELECT-Anweisung begrenzen — das ist effizienter als das Entfernen in Power Query.
</div>

### Erste Zeilen entfernen

Leere Zeilen oder Metadatenzeilen am Anfang einer Tabelle werden über **Start → Zeilen entfernen → Erste Zeilen entfernen** beseitigt.

---

## Datenform korrigieren

### Spalten entpivotieren

Wenn Kategoriewerte als separate Spalten nebeneinander stehen — sogenanntes breites Format — müssen sie in eine normalisierte Zeilenstruktur umgewandelt werden. DAX kann mit breiten Tabellen nicht sinnvoll rechnen, und Datenschnitte auf Spaltenebene sind nicht möglich.

Vorgehen: Die betroffenen Spalten markieren → **Transformieren → Entpivotieren**. Die entstehenden Spalten heißen standardmäßig `Attribut` (enthält die ehemaligen Spaltenüberschriften) und `Wert` (enthält die ehemaligen Zellwerte). Beide sollten anschließend sinnvoll umbenannt werden.

Variante: **Andere Spalten entpivotieren** — alle Spalten außer den markierten werden entpivotiert. Praktisch wenn viele Spalten transformiert werden sollen.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Tabelle hat die Spalten <em>Monat</em>, <em>2018</em> und <em>2019</em>. Nach dem Entpivotieren der zwei Jahresspalten entstehen drei Spalten: <em>Monat</em>, <em>Jahr</em> und <em>Umsatz</em>. DAX-Measures können nun über die Wertspalte aggregieren, ein Datenschnitt kann nach Jahr filtern.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-unpivot-ss.png — Power Query mit dem Ergebnis des Entpivotierens: aus zwei Jahresspalten wurden die Spalten Jahr und Umsatz.</span>
</div>

### Spalten pivotieren

Pivotieren ist der umgekehrte Vorgang: Eindeutige Zeilenwerte einer Spalte werden zu neuen Spaltenüberschriften, die dazugehörigen Werte werden aggregiert. Aufruf: **Transformieren → Spalte pivotieren**. Im Dialog wird die Wertespalte und eine Aggregatfunktion gewählt: Anzahl, Summe, Minimum, Maximum, Durchschnitt oder Median.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Pivotieren wird seltener benötigt als Entpivotieren. Typischer Einsatz: Kreuztabellen oder Exporte die eine breite Struktur erfordern.
</div>

---

## Daten bereinigen

### Werte ersetzen

Mit **Transformieren → Werte ersetzen** lassen sich einzelne Werte in einer Spalte durch korrekte Werte ersetzen. Typische Anwendungsfälle: Rechtschreibfehler, inkonsistente Schreibweisen, Abkürzungen die vereinheitlicht werden sollen.

In Power Query können keine einzelnen Zellen direkt bearbeitet werden. Alle Korrekturen wirken immer auf die gesamte Spalte.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 03-replace-value-ssm.png — Dialog "Werte ersetzen" mit den Feldern für den zu suchenden und den neuen Wert.</span>
</div>

### NULL-Werte behandeln

NULL bedeutet: kein Wert vorhanden. Das ist etwas anderes als 0 oder ein leerer Text. NULL-Werte können Berechnungen beeinflussen und Beziehungen im Modell stören.

Optionen im Umgang mit NULL-Werten:
- **Ersetzen** durch einen Standardwert — nur wenn inhaltlich begründbar
- **Herausfiltern** — Zeilen mit NULL in einer bestimmten Spalte entfernen
- **Unverändert lassen** — wenn NULL eine valide Aussage trägt (z. B. kein Ansprechpartner bekannt)

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  NULL durch 0 zu ersetzen klingt harmlos, verfälscht aber Durchschnittswerte. NULL bedeutet <em>unbekannt</em>, 0 bedeutet <em>kein Wert</em>. Das ist inhaltlich unterschiedlich und muss fachlich begründet werden.
</div>

### Fehlerhafte Zellen behandeln

Neben NULL-Werten können Zellen auch echte Fehler enthalten. Das passiert wenn Power BI einen Wert nicht verarbeiten kann — zum Beispiel einen Text in einer Spalte die als Ganzzahl erkannt wurde, oder einen ungültigen Datumswert. Fehlerhafte Zellen erscheinen mit dem Hinweis **Fehler** in rot. In der Spaltenqualität werden sie als gelber Balkenanteil angezeigt.

Zwei Wege:
- **Fehler entfernen** — Zeilen mit fehlerhaften Zellen werden gelöscht. Rechtsklick auf die Spaltenüberschrift → **Fehler entfernen**.
- **Fehler ersetzen** — Fehlerhafte Zellen werden durch einen Standardwert ersetzt. Rechtsklick → **Fehler ersetzen**.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Fehler und NULL-Werte sind technisch unterschiedlich. NULL bedeutet kein Wert vorhanden. Ein Fehler bedeutet ein Wert war vorhanden, konnte aber nicht verarbeitet werden. Spaltenqualität zeigt beides getrennt: Gelb für Fehler, Grau für NULL.
</div>

### Duplikate entfernen

Über Rechtsklick auf eine Spaltenüberschrift → **Duplikate entfernen** werden Zeilen entfernt, bei denen der Wert in der gewählten Spalte mehrfach vorkommt. Nur die erste Zeile je Wert bleibt erhalten.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Vor dem Entfernen empfiehlt es sich, die Abfrage zu kopieren (Rechtsklick auf die Abfrage → <strong>Kopieren</strong>), um beide Versionen vergleichen zu können. Außerdem: Duplikate über eine einzelne Spalte entfernen ist nicht dasselbe wie doppelte Zeilen entfernen. Zwei Zeilen mit demselben Kundennamen aber unterschiedlichen IDs — Duplikate entfernen auf der Namensspalte entfernt trotzdem eine davon.
</div>

### Ausfüllen

**Ausfüllen** füllt NULL-Werte in einer Spalte mit dem nächsten nicht-leeren Wert darüber oder darunter auf. Rechtsklick auf die Spaltenüberschrift → **Ausfüllen → Nach unten** oder **Nach oben**.

Typisches Szenario: Ein Excel-Export enthält einen Kategorienamen nur in der ersten Zeile einer Gruppe, alle Folgezeilen sind leer. Nach dem Ausfüllen nach unten trägt jede Zeile die richtige Kategorie.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Ausfüllen funktioniert nur korrekt wenn die Werte in der Spalte bereits in der richtigen Reihenfolge stehen. Wenn die Sortierung der Quelldaten nicht garantiert ist, zuerst sortieren, dann ausfüllen.
</div>

### Text normalisieren

Für Textspalten bietet die Registerkarte **Transformieren → Format** mehrere Optionen:

| Option | Ergebnis |
|---|---|
| **Kleinbuchstaben** | Alle Zeichen in Kleinbuchstaben |
| **Großbuchstaben** | Alle Zeichen in Großbuchstaben |
| **Erste Buchstaben groß** | Erster Buchstabe jedes Worts als Großbuchstabe |
| **Kürzen** | Führende und nachgestellte Leerzeichen entfernen |
| **Bereinigen** | Nicht druckbare Sonderzeichen entfernen |

Das Kürzen ist besonders wichtig bei Daten aus externen Systemen. Ein Leerzeichen nach "Berlin" macht es für Power BI zu einer anderen Kategorie als "Berlin" ohne Leerzeichen — unsichtbar, aber folgenreich.

---

## Namenskonventionen

Für Tabellen, Spalten und Werte gibt es keine starren Regeln, aber folgende Empfehlungen gelten als bewährte Praxis:

- Beschreibende, geschäftliche Namen verwenden — keine technischen Abkürzungen die außerhalb der IT unbekannt sind
- Unterstriche durch Leerzeichen ersetzen
- Konsistente Schreibweise für Abkürzungen und Begriffe wie "ID" oder "Nummer"
- Präfixe wie `Fact`, `Dim`, `v_` aus Tabellennamen entfernen
- Werte so formulieren, dass sie im Visual gut lesbar sind — nicht zu lang, nicht zu kryptisch, keine Abkürzungen wenn der Text ins Visual passt

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Tabelle heißt <em>FactSalesTable</em>, eine Spalte heißt <em>cust_id</em>, ein Wert heißt <em>Nrd</em> statt <em>Nord</em>. Alle drei sollten vor dem Laden korrigiert werden: <em>Verkäufe</em>, <em>Kunden-ID</em>, <em>Nord</em>.
</div>

---

## Spaltendatentypen auswerten und korrigieren

Beim Import scannt Power BI Desktop automatisch die ersten 1.000 Zeilen und leitet den Datentyp jeder Spalte ab. Bei Flatfiles wie CSV oder Excel ist die Fehlerquote höher als bei Datenbankquellen, weil dort keine Typdefinitionen vorhanden sind und Daten manuell eingegeben wurden.

### Auswirkungen falscher Datentypen

Falsche Datentypen verhindern:

- Zeitbasierte Berechnungen — `TOTALYTD` setzt den Datentyp Datum voraus
- Automatische Datumshierarchien (Jahr, Quartal, Monat) — nur bei Typ Datum möglich
- Arithmetische Berechnungen auf Zahlen die als Text erkannt wurden
- Korrekte Beziehungen zwischen Tabellen wenn Schlüsselspalten unterschiedliche Typen haben

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Datentypen immer im Power Query-Editor korrigieren, bevor die Daten geladen werden. Nachträgliche Korrekturen in der Berichtsansicht sind zwar möglich (Spaltentools), aber aufwendiger und erzeugen häufig Folgefehler in bestehenden Measures.
</div>

### Datentyp ändern

Zwei Wege im Power Query-Editor:

- Klick auf das Typsymbol links neben der Spaltenüberschrift (z. B. **123** für Ganzzahl, **ABC** für Text)
- Registerkarte **Transformieren → Datentyp** → Typ aus der Liste wählen

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Spalte <em>Bestelldatum</em> enthält Datumswerte im Format <em>2024-03-15</em>, wurde aber als Text erkannt. Power BI zeigt beim Versuch einer Zeitberechnung: <em>Datentyp ist nicht „Datum"</em>. Nach dem Ändern des Typs auf <em>Datum</em> stehen Datumshierarchien und Zeitintelligenzfunktionen in DAX zur Verfügung.
</div>

### Gängige Datentypen in Power BI

| Typ | Symbol | Einsatz |
|---|---|---|
| Ganze Zahl | 1 2 3 | IDs, Mengen, Anzahlen ohne Dezimalstellen |
| Dezimalzahl | 1,2 | Preise, Umsätze, Messwerte |
| Datum | Kalender | Bestelldatum, Rechnungsdatum |
| Datum/Uhrzeit | Kalender + Uhr | Zeitstempel mit Uhrzeit |
| Text | ABC | Namen, Kategorien, Codes |
| Wahrheitswert | 0/1 | Ja/Nein, Aktiv/Inaktiv |

---

## Datenprofiling

Datenprofiling dient dazu, vor der eigentlichen Berichtsarbeit die Qualität und Verteilung der Daten zu verstehen. Anomalien, Lücken und Ausreißer werden sichtbar, bevor sie Berechnungen oder Berichte beeinflussen.

### Profilierungsansichten aktivieren

Im Power Query-Editor unter **Ansicht → Datenvorschau** stehen drei Ansichten zur Verfügung, die gleichzeitig aktiviert werden können:

| Ansicht | Zeigt |
|---|---|
| **Spaltenqualität** | Prozentualer Anteil gültiger, fehlerhafter und leerer Werte je Spalte |
| **Spaltenverteilung** | Anzahl unterschiedlicher und eindeutiger Werte, Häufigkeitsdiagramm |
| **Spaltenprofil** | Vollständige Statistik: Zeilenanzahl, Min, Max, Durchschnitt, Standardabweichung, Nullwert-Anzahl, Anzahl gerader und ungerader Werte, Wertverteilung |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Power Query profiliert standardmäßig nur die ersten 1.000 Zeilen. Für eine vollständige Analyse: Statusleiste unten → <strong>Spaltenprofilerstellung basierend auf gesamtem Dataset</strong> aktivieren. Bei kleinen Datensätzen unter 1.000 Zeilen macht das keinen Unterschied.
</div>

### Spaltenqualität lesen

Über jeder Spalte erscheinen farbige Balken:
- **Grün:** gültige Werte
- **Gelb:** fehlerhafte Werte (Typ passt nicht oder Konvertierungsfehler)
- **Grau:** leere Werte (NULL)

Eine Spalte mit 20 Prozent grauem Balken hat in einem von fünf Datensätzen keinen Wert. Das ist sofort sichtbar, ohne die Daten manuell zu durchsuchen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 06-column-statistics-ssm.png — Power Query-Editor mit aktivierten Profilierungsansichten: Spaltenqualität oben, Spaltenverteilung als Balkendiagramm und Spaltenprofil mit Statistiken unten.</span>
</div>

### Unterschiedliche vs. eindeutige Werte

Die Spaltenverteilung zeigt zwei Kennzahlen die häufig verwechselt werden:

<div class="pbi-definition">
  <strong>Unterschiedliche Werte</strong> Alle verschiedenen Werte der Spalte, inklusive solcher die mehrfach vorkommen. Entspricht einem SQL <code>COUNT(DISTINCT)</code>.
</div>

<div class="pbi-definition">
  <strong>Eindeutige Werte</strong> Nur Werte, die genau einmal in der Spalte vorkommen. Ein Wert der doppelt vorkommt, zählt nicht als eindeutig.
</div>

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Lieferantentabelle hat 15 Zeilen. Die Spalte <em>Lieferant</em> zeigt: unterschiedlich = 11, eindeutig = 7. Das bedeutet: 4 Namen kommen mehr als einmal vor — Hinweis auf Duplikate oder inkonsistente Schreibweisen.
</div>

### Wertverteilung als Ausreißer-Tool

Das Diagramm **Wertverteilung** im Spaltenprofil zeigt wie oft jeder einzelne Wert in der Spalte vorkommt. Ein Wert der deutlich öfter als alle anderen auftaucht ist ein Signal für eine Untersuchung — er kann ein Standardwert sein der falsch gesetzt wurde, ein Importfehler oder ein echter Ausreißer.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Die Spalte <em>Verkäufer</em> zeigt in der Wertverteilung, dass ein Name dreimal so häufig vorkommt wie alle anderen. Ohne Profiling würde das erst beim Auswerten der Berichte auffallen. Mit Profiling ist es vor dem Laden sichtbar.
</div>

---

## M-Code

Jede Transformation im Power Query-Editor erzeugt im Hintergrund automatisch **M-Code**. M ist die Skriptsprache hinter Power Query. Der erweiterte Editor (**Ansicht → Erweiterter Editor**) macht alle Schritte als Code sichtbar und ermöglicht direkte Anpassungen.

Für den PL-300 ist M lesen und verstehen prüfungsrelevant — aktives Schreiben von Grund auf nicht. Der vollständige M-Code-Abschnitt ist in **Skript 06c** behandelt.

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Power Query-Editor</div>
    <div class="pbi-summary-body">Zentrales Vorbereitungswerkzeug. Alle Schritte werden als wiederholbare Sequenz gespeichert. Die Originaldatenquelle wird nie verändert. Schritte können umbenannt, umsortiert und gelöscht werden — Abhängigkeiten beachten.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Strukturieren</div>
    <div class="pbi-summary-body">Überschriften identifizieren und hochstufen, Abfrage und Spalten umbenennen, unnötige Spalten und erste Zeilen entfernen. Beschreibende Namen ohne technische Präfixe verwenden.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">↔️</div>
    <div class="pbi-summary-title">Datenform korrigieren</div>
    <div class="pbi-summary-body">Entpivotieren normalisiert breite Spaltenstrukturen in Zeilen — Voraussetzung für DAX-Measures und Datenschnitte. Pivotieren aggregiert Zeilen zu Spalten. Beides korrigiert die Struktur der Quelldaten.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Bereinigen</div>
    <div class="pbi-summary-body">Werte ersetzen, NULL behandeln, Fehler in Zellen entfernen oder ersetzen, Duplikate entfernen, Ausfüllen, Text normalisieren. Alle Operationen wirken spaltenweise. Vor dem Entfernen von Duplikaten die Abfrage kopieren.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Namenskonventionen</div>
    <div class="pbi-summary-body">Beschreibende Geschäftsnamen, keine Unterstriche, keine technischen Präfixe. Werte so formulieren dass sie im Visual lesbar sind. Konsistenz über alle Tabellen hinweg.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Datentypen</div>
    <div class="pbi-summary-body">Immer vor dem Laden in Power Query korrigieren — nicht nachträglich in der Berichtsansicht. Falsche Typen blockieren Datumshierarchien, Zeitberechnungen und Beziehungen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Datenprofiling</div>
    <div class="pbi-summary-body">Spaltenqualität, Spaltenverteilung und Spaltenprofil zeigen Anomalien und Ausreißer vor dem Laden. Standardmäßig auf Basis der ersten 1.000 Zeilen — bei Bedarf auf gesamtes Dataset umstellen.</div>
  </div>
</div>
