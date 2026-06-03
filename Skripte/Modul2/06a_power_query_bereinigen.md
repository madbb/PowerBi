# Power Query: Daten bereinigen und analysieren

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06a</div>
  <div class="pbi-page-title">Power Query: Daten bereinigen und analysieren</div>
  <div class="pbi-page-sub">Power Query-Editor: Strukturieren, Bereinigen, Datentypen, Profiling und M-Code</div>
</div>

Importierte Daten sind selten bereit für die Analyse. Spalten tragen technische Namen, Zeilen enthalten NULL-Werte oder Duplikate, Kategorien werden inkonsistent geschrieben, und Datentypen werden falsch erkannt. Der **Power Query-Editor** in Power BI Desktop ist das zentrale Werkzeug, um all diese Probleme zu beheben, ohne die ursprüngliche Datenquelle zu verändern.

---

## Der Power Query-Editor

Der Power Query-Editor wird über **Start → Daten transformieren** geöffnet. Er besteht aus drei Bereichen:

- **Links:** Abfragen-Bereich mit allen geladenen Tabellen
- **Mitte:** Datenvorschau der aktuell gewählten Abfrage
- **Rechts:** Abfrageeinstellungen mit Name und angewendeten Schritten

<div class="pbi-definition">
  <strong>Angewendete Schritte</strong> Jede Transformation im Power Query-Editor wird als benannter Schritt gespeichert. Bei jeder Datenaktualisierung werden diese Schritte automatisch und in der gleichen Reihenfolge wiederholt. Die ursprüngliche Datenquelle bleibt dabei unverändert. Schritte lassen sich umbenennen, umsortieren und löschen.
</div>

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Abhängigkeiten beachten</span>
  Jeder Schritt baut auf dem vorherigen auf. Wer einen Schritt löscht, der von späteren Schritten referenziert wird, bricht die gesamte Kette ab diesem Punkt. Vor dem Löschen prüfen, ob ein Schritt Abhängigkeiten hat.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-shape-data-query-editor-overview-ss.png — Gesamtansicht des Power Query-Editors mit Abfragen-Bereich links, Datenvorschau in der Mitte und Abfrageeinstellungen rechts.</span>
</div>

---

## Ursprungsdaten strukturieren

### Abfrage umbenennen

Tabellennamen aus Quellsystemen enthalten häufig technische Präfixe wie `Fact_`, `v_` oder Systemnamen. Im Power Query-Editor: Rechtsklick auf die Abfrage im linken Bereich → **Umbenennen**. Beschreibende Namen ohne technische Kürzel sind zu bevorzugen.

### Erste Zeile als Überschriften verwenden

Enthält die erste Zeile einer Tabelle keine Spaltennamen, sondern bereits Daten, erkennt Power BI das nicht automatisch. Korrektur: **Start → Erste Zeile als Überschriften verwenden**. Umgekehrt: Wurde eine Spaltenüberschrift fälschlicherweise als erste Datenzeile geladen, lässt sie sich über **Erste Zeile als Überschriften** zurücksetzen.

### Spalten umbenennen

Spaltennamen aus der Quelle sind häufig abgekürzt, technisch oder inkonsistent. Doppelklick auf die Spaltenüberschrift oder Rechtsklick → **Umbenennen** ermöglicht die Anpassung. Die Namen sollten für Berichtsnutzer verständlich sein, keine Unterstriche enthalten und konsistent formuliert sein.

### Spalten entfernen

Nicht benötigte Spalten sollten so früh wie möglich entfernt werden. Jede Spalte, die ins Modell geladen wird, belegt Speicher und kann die Berichtsleistung beeinflussen.

Zwei Varianten im Power Query-Editor:
- **Spalten entfernen** — markierte Spalten werden gelöscht
- **Andere Spalten entfernen** — nur die markierten Spalten werden behalten, alle anderen gelöscht

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Nicht verwendete Spalten belasten das Modell auch dann, wenn sie in keinem Visual eingesetzt werden. Spalten früh zu entfernen ist eine der wirksamsten Maßnahmen zur Modelloptimierung.
</div>

### Erste Zeilen entfernen

Leere Zeilen oder Metadatenzeilen am Anfang einer Tabelle werden über **Start → Zeilen entfernen → Erste Zeilen entfernen** beseitigt.

---

## Daten bereinigen

### Werte ersetzen

Mit **Transformieren → Werte ersetzen** lassen sich einzelne Werte in einer Spalte durch korrekte Werte ersetzen. Typische Anwendungsfälle: inkonsistente Schreibweisen, Rechtschreibfehler, Abkürzungen die vereinheitlicht werden sollen.

In Power Query können keine einzelnen Zellen direkt bearbeitet werden. Alle Korrekturen wirken immer auf die gesamte Spalte.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Kategorie-Spalte enthält die Werte <em>hardware</em>, <em>Hardware</em> und <em>HARDWARE</em>. Für Power BI sind das drei verschiedene Kategorien. Mit Werte ersetzen und anschließend Transformieren → Format → Erste Buchstaben groß werden alle drei auf <em>Hardware</em> normalisiert.
</div>

### NULL-Werte behandeln

NULL bedeutet in einer Datenbank: kein Wert vorhanden. Das ist etwas anderes als 0 oder ein leerer Text. NULL-Werte können Berechnungen beeinflussen und Beziehungen im Modell stören.

Optionen im Umgang mit NULL-Werten:
- **Ersetzen** durch einen Standardwert (z. B. 0 für numerische Spalten, leerer Text für Textspalten) — nur wenn inhaltlich begründbar
- **Herausfiltern** — Zeilen mit NULL in einer bestimmten Spalte entfernen
- **Unverändert lassen** — wenn NULL eine valide Aussage trägt (z. B. kein Ansprechpartner bekannt)

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  NULL durch 0 zu ersetzen klingt harmlos, verfälscht aber Durchschnittswerte. NULL bedeutet <em>unbekannt</em>, 0 bedeutet <em>kein Wert</em>. Das ist inhaltlich unterschiedlich und muss fachlich begründet werden.
</div>

### Duplikate entfernen

Über Rechtsklick auf eine Spaltenüberschrift → **Duplikate entfernen** werden Zeilen entfernt, bei denen der Wert in der gewählten Spalte mehrfach vorkommt. Nur die erste Zeile je Wert bleibt erhalten.

Vor dem Entfernen empfiehlt es sich, die Anzahl der Duplikate über das Datenprofiling zu ermitteln und zu prüfen, ob das Entfernen inhaltlich korrekt ist.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Duplikate über eine einzelne Spalte zu entfernen ist nicht dasselbe wie doppelte Zeilen zu entfernen. Wenn zwei Zeilen denselben Kundennamen aber unterschiedliche IDs haben, entfernt <em>Duplikate entfernen</em> auf der Namensspalte trotzdem eine der Zeilen.
</div>

### Fehlerhafte Zellen behandeln

Neben NULL-Werten können Zellen auch echte Fehler enthalten. Das passiert, wenn Power BI beim Import einen Wert nicht verarbeiten kann — zum Beispiel einen Text in einer Spalte, die als Ganzzahl erkannt wurde, oder einen ungültigen Datumswert.

Fehlerhafte Zellen erscheinen in der Datenvorschau mit dem Hinweis **Fehler** in rot. In der Spaltenqualität werden sie als gelber Balkenanteil angezeigt.

Zwei Wege im Umgang mit Fehlern:

- **Fehler entfernen** — Zeilen mit fehlerhaften Zellen werden aus der Tabelle gelöscht. Rechtsklick auf die Spaltenüberschrift → **Fehler entfernen**.
- **Fehler ersetzen** — Fehlerhafte Zellen werden durch einen Standardwert ersetzt. Rechtsklick auf die Spaltenüberschrift → **Fehler ersetzen**.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Fehler und NULL-Werte sind technisch unterschiedlich. NULL bedeutet kein Wert vorhanden. Ein Fehler bedeutet, dass ein Wert vorhanden war, aber nicht verarbeitet werden konnte. Spaltenqualität zeigt beides getrennt: Gelb für Fehler, Grau für NULL.
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

Das Kürzen ist besonders wichtig bei Daten aus externen Systemen: Ein Leerzeichen nach "Berlin" macht es für Power BI zu einer anderen Kategorie als "Berlin" ohne Leerzeichen.

---

## Datentypen auswerten und korrigieren

Beim Import scannt Power BI Desktop automatisch die ersten 1.000 Zeilen einer Tabelle und leitet den Datentyp jeder Spalte ab. Bei Flatfiles (CSV, Excel) ist die Fehlerquote höher als bei Datenbankquellen, weil dort keine Typdefinitionen vorhanden sind.

### Auswirkungen falscher Datentypen

Falsche Datentypen verhindern:

- Zeitbasierte Berechnungen (TOTALYTD, DATESYTD) — setzen den Datentyp Datum voraus
- Automatische Datumshierarchien (Jahr, Quartal, Monat) — nur bei Typ Datum möglich
- Arithmetische Berechnungen auf Zahlen, die als Text erkannt wurden
- Beziehungen zwischen Tabellen, wenn Schlüsselspalten unterschiedliche Typen haben

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Datentypen immer im Power Query-Editor korrigieren, bevor die Daten geladen werden. Nachträgliche Korrekturen in der Berichtsansicht sind aufwendiger und erzeugen häufig Folgefehler.
</div>

### Datentyp ändern

Zwei Wege im Power Query-Editor:

- Klick auf das Typsymbol links neben der Spaltenüberschrift (z. B. **123** für Ganzzahl, **ABC** für Text, **Datum/Uhrzeit**)
- Rechtsklick auf die Spaltenüberschrift → **Typ ändern**

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Spalte <em>Aufgenommen am</em> enthält Datumswerte im Format <em>2021-03-15</em>, wurde aber als Text erkannt. Nach dem Ändern des Typs auf <em>Datum</em> stehen Datumshierarchien und Zeitintelligenzfunktionen in DAX zur Verfügung.
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
| **Spaltenprofil** | Vollständige Statistik: Zeilenanzahl, Min, Max, Durchschnitt, Standardabweichung, Nullwert-Anzahl, Wertverteilung |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Power Query profiliert standardmäßig nur die ersten 1.000 Zeilen. Für eine vollständige Analyse: Statusleiste unten → <strong>Spaltenprofilerstellung basierend auf gesamtem Dataset</strong> aktivieren. Bei kleinen Datensätzen (unter 1.000 Zeilen) macht das keinen Unterschied.
</div>

### Spaltenqualität lesen

Über jeder Spalte erscheinen farbige Balken:
- **Grün:** gültige Werte
- **Gelb:** fehlerhafte Werte (z. B. Typ passt nicht)
- **Grau:** leere Werte (NULL)

Eine Spalte mit 20 Prozent grauem Balken hat in einem von fünf Datensätzen keinen Wert. Das ist sofort sichtbar, ohne die Daten manuell zu durchsuchen.

### Unterschiedliche vs. eindeutige Werte

Die Spaltenverteilung zeigt zwei Kennzahlen, die häufig verwechselt werden:

<div class="pbi-definition">
  <strong>Unterschiedliche Werte</strong> Alle verschiedenen Werte der Spalte, inklusive solcher die mehrfach vorkommen. Entspricht einem SQL <code>COUNT(DISTINCT)</code>.
</div>

<div class="pbi-definition">
  <strong>Eindeutige Werte</strong> Nur Werte, die genau einmal in der Spalte vorkommen. Ein Wert der doppelt vorkommt, zählt nicht als eindeutig.
</div>

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Lieferantentabelle hat 15 Zeilen. Die Spalte <em>Lieferant Name</em> zeigt: unterschiedlich = 11, eindeutig = 7. Das bedeutet: 4 Namen kommen mehr als einmal vor. Das ist ein Hinweis auf Duplikate oder inkonsistente Schreibweisen, die bereinigt werden müssen.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 06-column-statistics-ssm.png — Power Query-Editor mit aktivierten Profilierungsansichten: Spaltenqualität oben, Spaltenverteilung als Balkendiagramm und Spaltenprofil mit Statistiken unten.</span>
</div>

---

## M-Code im erweiterten Editor

Jede Transformation, die im Power Query-Editor per Klick ausgeführt wird, wird intern als **M-Code** gespeichert. M ist eine funktionale Skriptsprache, deren Code alle Schritte als Kette von Transformationen abbildet.

Der erweiterte Editor wird über **Ansicht → Erweiterter Editor** geöffnet.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 08-m-code.png — Erweiterter Editor im Power Query mit dem automatisch generierten M-Code der aktuellen Abfrage. Jeder Transformationsschritt entspricht einer Zeile.</span>
</div>

### Aufbau von M-Code

```
let
    Quelle = Csv.Document(...),
    GeaenderterTyp = Table.TransformColumnTypes(Quelle, ...),
    EntfernteSpaltename = Table.RemoveColumns(GeaenderterTyp, ...)
in
    EntfernteSpaltename
```

- `let` leitet den Block ein
- Jede Zeile hat die Form: `Schrittname = Transformation(VorherigerSchritt)`
- `in` am Ende gibt an, welcher Schritt das finale Ergebnis der Abfrage ist — immer der letzte Schritt

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  M-Code muss nicht aktiv geschrieben werden — die grafische Oberfläche erledigt das. Kenntnisse im Lesen von M-Code sind aber nützlich: Verbindungsdetails wie Servername oder Dateipfad lassen sich direkt im Code ändern, und Abfragen aus anderen Projekten können kopiert und eingefügt werden. Für den PL-300 ist aktives M-Schreiben nicht gefordert.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Power Query-Editor</div>
    <div class="pbi-summary-body">Zentrales Bereinigungswerkzeug. Alle Transformationen werden als Schrittsequenz gespeichert und bei jeder Aktualisierung wiederholt. Die Originaldatenquelle wird nie verändert.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Strukturieren</div>
    <div class="pbi-summary-body">Abfrage umbenennen, erste Zeile als Überschrift, Spalten umbenennen, unnötige Spalten und Zeilen früh entfernen. Weniger Spalten im Modell bedeutet bessere Leistung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Bereinigen</div>
    <div class="pbi-summary-body">Werte ersetzen, NULL behandeln, Fehler in Zellen entfernen oder ersetzen, Duplikate entfernen, Text normalisieren. Alle Operationen wirken spaltenweise, nicht auf einzelne Zellen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Datentypen</div>
    <div class="pbi-summary-body">Immer vor dem Laden korrigieren. Falsche Typen blockieren Datumshierarchien, Zeitberechnungen und Beziehungen. Nachträgliche Korrekturen erzeugen Folgefehler.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Datenprofiling</div>
    <div class="pbi-summary-body">Spaltenqualität, Spaltenverteilung und Spaltenprofil zeigen Anomalien auf einen Blick. Standardmäßig auf Basis der ersten 1.000 Zeilen — bei Bedarf auf gesamtes Dataset umstellen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">M-Code</div>
    <div class="pbi-summary-body">Jeder Klick erzeugt M-Code im Hintergrund. Der erweiterte Editor macht alle Schritte sichtbar und ermöglicht direkte Anpassungen. Aktives Schreiben ist für den PL-300 nicht erforderlich.</div>
  </div>
</div>
