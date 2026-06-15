# Trainer-Skript 06c - Power Query: M-Code und der erweiterte Editor

> **Themen:** Was ist M · Erweiterter Editor · let/in-Struktur · Häufige Funktionen · each und _ · Direktanpassungen
> **Schüler-Skript:** 06c_m_code_erweiterter_editor.md
> **Aufgabenblatt:** aufgaben_06c_m_code.md
> **Hinweis:** Kein Live-Coding-Schwerpunkt. Lesen, verstehen, gezielt anpassen.

---

## Einstieg

**Frage ans Plenum:** Wir haben jetzt zwei Skripte lang Daten per Klick transformiert. Hat jemand schon mal auf "Erweiterter Editor" geklickt und geschaut was da drin steht?

- Kurze Reaktionen sammeln
- Überleitung: Alles was wir geklickt haben, hat Power BI als Code aufgeschrieben. Dieser Code heißt M.

**Kerngedanke ansprechen:**
- Jede Klick-Aktion im Power Query-Editor erzeugt automatisch M-Code im Hintergrund
- M lesen und verstehen ist PL-300-Prüfungsstoff
- M aktiv von Grund auf schreiben ist nicht gefordert
- Aber: wer M lesen kann, findet Fehler schneller und kann gezielt anpassen ohne alles neu zu klicken

---

## Block 1 - Was ist M?

**M erklären:**
- Funktionale Skriptsprache hinter Power Query
- Wird in Power BI Desktop, Excel und Power Query Online verwendet
- Wird automatisch aus GUI-Aktionen generiert
  *Funktionale Sprache bedeutet: Man beschreibt was berechnet werden soll, nicht wie Schritt für Schritt vorzugehen ist. Jede Transformation ist eine Funktion die eine Tabelle entgegennimmt und eine veränderte Tabelle zurückgibt.*
- Case-sensitive: Table.RemoveColumns ist nicht dasselbe wie table.removecolumns
  *Case-sensitive bedeutet: Groß- und Kleinschreibung ist bedeutungsrelevant. Das ist anders als in Excel-Formeln, die das ignorieren. In M führt ein falsches Großbuchstabe zu einem Fehler.*

**Demo: Erweiterter Editor öffnen**
- Ansicht - Erweiterter Editor
- Ersten Blick auf den Code zeigen - noch nicht erklären, nur zeigen
- "Das ist alles was wir bisher geklickt haben - als Code"

**Frage ans Plenum:** Warum ist es nützlich M lesen zu können, auch wenn man es nicht schreiben muss?

> **Erwartete Antworten:** Fehler finden, verstehen was Power BI macht, Anpassungen ohne neu klicken, Code aus anderen Projekten übernehmen.
> Alle vier Punkte sind real. Der häufigste Anwendungsfall ist: Fehler in einer Abfrage verstehen die sich nicht über die GUI erklären lassen.

---

## Block 2 - Aufbau von M-Code

**Die Grundstruktur zeigen und erklären:**

```
let
    Schritt1 = Ausdruck1,
    Schritt2 = Funktion(Schritt1),
    Schritt3 = Funktion(Schritt2)
in
    Schritt3
```

**let erklären:**
- Leitet den Codeblock ein
- Danach folgen alle Transformationsschritte
  *let ist wie "beginne hier": ab diesem Punkt werden die Schritte definiert.*

**Schrittstruktur erklären:**
- Links vom = : der Schrittname (ist gleichzeitig eine Variable)
- Rechts vom = : die Transformation mit Verweis auf den vorherigen Schritt
  *Variable bedeutet: der Name des Schritts kann von späteren Schritten als Eingabe verwendet werden. "UmbenannteSpalten = Table.RenameColumns(Quelle, ...)" bedeutet: nimm das Ergebnis von Quelle, benenne Spalten um, und speichere das Ergebnis unter dem Namen UmbenannteSpalten.*
- Automatisch vergebene Namen wie "Geänderter Typ" werden in #"..." eingeschlossen
  *Die Raute und die Anführungszeichen sind M-Syntax für Namen die Leerzeichen oder Sonderzeichen enthalten. Power BI vergibt diese Namen automatisch. Man kann sie umbenennen - dann verschwinden auch die Sonderzeichen.*

**in erklären:**
- Steht am Ende des Blocks
- Der Schrittname dahinter ist das Ergebnis der gesamten Abfrage
- Immer der letzte Schritt
  *in ist wie "und das Ergebnis davon ist...". Alles davor ist Vorbereitung. Was nach in steht, ist das was Power BI ins Modell lädt.*

**Konkretes Beispiel gemeinsam lesen:**

```
let
    Quelle = Csv.Document(File.Contents("C:\Daten\customers.csv"), [Delimiter=";"]),
    HochgestufteSpalten = Table.PromoteHeaders(Quelle),
    UmbenannteSpalten = Table.RenameColumns(HochgestufteSpalten, {{"Kundenseit", "KundeSeit"}}),
    EntfernteSpalten = Table.RemoveColumns(UmbenannteSpalten, {"Telefon"})
in
    EntfernteSpalten
```

Gemeinsam von unten nach oben lesen:
- Ergebnis ist EntfernteSpalten
- Das ist RemoveColumns auf UmbenannteSpalten - Telefon-Spalte entfernt
- UmbenannteSpalten kommt aus RenameColumns auf HochgestufteSpalten - Spalte umbenannt
- HochgestufteSpalten kommt aus PromoteHeaders auf Quelle - erste Zeile als Überschriften
- Quelle lädt die CSV-Datei

**Frage ans Plenum:** Ich lösche den Schritt HochgestufteSpalten. Was passiert mit UmbenannteSpalten?

> **Erwartete Antwort:** UmbenannteSpalten bricht, weil es HochgestufteSpalten als Eingabe verwendet die jetzt nicht mehr existiert.
> Genau. M-Code ist eine lineare Kette. Jeden Schritt löschen der als Eingabe in einem späteren Schritt steht bricht alle nachfolgenden.

---

## Block 3 - Häufige M-Funktionen erkennen

**Vorgehen erklären:**
- Diese Funktionen erzeugt Power BI automatisch aus Klick-Aktionen
- Für PL-300: im Code erkennen und einordnen können
- Nicht auswendig lernen - im erweiterten Editor sieht man sie live

**Tabellen laden:**
- `Csv.Document(...)` - lädt eine CSV-Datei
- `Excel.Workbook(...)` - lädt eine Excel-Datei
- `Table.PromoteHeaders(tabelle)` - erste Zeile wird zu Überschriften

**Tabellen strukturieren:**
- `Table.RenameColumns(tabelle, liste)` - Spalten umbenennen
  *Die Liste hat die Form: zweier-Listen mit altem und neuem Namen. {{"AlterName", "NeuerName"}, {"Noch_einer", "NochEiner"}}.*
- `Table.RemoveColumns(tabelle, liste)` - Spalten entfernen
- `Table.SelectColumns(tabelle, liste)` - nur bestimmte Spalten behalten
- `Table.TransformColumnTypes(tabelle, liste)` - Datentypen ändern

**Zeilen filtern:**
- `Table.SelectRows(tabelle, bedingung)` - Zeilen nach Bedingung filtern
- `Table.Distinct(tabelle)` - Duplikate entfernen
- `Table.ReplaceValue(tabelle, alt, neu, ...)` - Werte ersetzen

**Struktur umformen:**
- `Table.UnpivotOtherColumns(tabelle, spalten, ...)` - entpivotieren
- `Table.Group(tabelle, schlüssel, aggregationen)` - gruppieren
- `Table.NestedJoin(...)` - Merge
- `Table.Combine(liste)` - Append

**Demo:** Eine fertige Customers-Abfrage im erweiterten Editor zeigen und gemeinsam identifizieren welche Funktion welchen Klick-Schritt aus 06a darstellt.

---

## Block 4 - each und _ verstehen

**Überleitung:** In Filterbedingungen taucht immer wieder diese Kombination auf: each und _. Das ist für viele zunächst irritierend.

**each erklären:**
- Kurzform für eine anonyme Funktion die auf jede Zeile angewendet wird
  *Anonym bedeutet: die Funktion hat keinen Namen. Sie existiert nur in diesem einen Moment für diesen einen Schritt.*
- Equivalent zu (x) => ausdruck wobei _ für das Argument steht

**Demo: Filterbeispiel zeigen:**

```
Table.SelectRows(tabelle, each [Kategorie] = "Hardware")
```

Schritt für Schritt erklären:
- `each` läuft über jede Zeile der Tabelle
- `[Kategorie]` greift auf den Wert in der Spalte "Kategorie" der aktuellen Zeile zu
- `= "Hardware"` prüft ob der Wert gleich "Hardware" ist
- Nur Zeilen wo die Bedingung TRUE ist, kommen ins Ergebnis
  *Das ist exakt das was passiert wenn man in Power Query über das Dropdown-Filter auf "Hardware" filtert. Power BI schreibt exactly das in den M-Code.*

**Demo: Transformation mit _:**

```
Table.TransformColumns(tabelle, {{"Lieferant", each Text.Upper(_)}})
```

- `each` läuft über jeden Wert in der Spalte Lieferant
- `_` steht für den aktuellen Wert
- `Text.Upper(_)` wandelt den aktuellen Wert in Großbuchstaben um
  *_ ist der Platzhalter für den aktuellen Wert innerhalb von each. Man kann sich _ vorstellen als "dieser Wert hier gerade".*

**Frage ans Plenum:** Was macht dieser Code?

```
Table.SelectRows(tabelle, each [Einzelpreis] > 500)
```

> **Erwartete Antwort:** Filtert alle Zeilen bei denen Einzelpreis größer als 500 ist. Alle anderen Zeilen werden entfernt.
> Richtig. Das entspricht dem Klick auf das Filtermenü der Einzelpreis-Spalte und der Auswahl "größer als 500".

---

## Block 5 - Direktanpassungen im erweiterten Editor

**Überleitung:** Manche Anpassungen macht man schneller direkt im Code als über die GUI. Die drei häufigsten Fälle.

**Fall 1: Dateipfad ändern**
- Quelldatei wurde verschoben
- Im Code: die Zeichenkette im File.Contents-Aufruf direkt ändern
- Fertig klicken - Power BI aktualisiert sofort
  *Das ist schneller als über Datenquelleneinstellungen zu gehen, wenn man weiß wo man suchen muss.*

```
-- vorher:
Quelle = Csv.Document(File.Contents("C:\Alt\customers.csv"), ...)
-- nachher:
Quelle = Csv.Document(File.Contents("C:\Neu\kunden\customers.csv"), ...)
```

**Fall 2: Servername oder Datenbankname ändern**
- Datenbankserver wurde umgezogen oder umbenannt
- Im Code: den Servernamen in der Sql.Database-Funktion ändern

```
-- vorher:
Quelle = Sql.Database("alter-server.intern.de", "techtrade")
-- nachher:
Quelle = Sql.Database("neuer-server.intern.de", "techtrade")
```

**Fall 3: Umbenennung ergänzen**
- Eine neue Spalte braucht einen anderen Namen als automatisch vergeben
- Im Code: ein weiteres Paar in die Umbenennungsliste einfügen

```
Table.RenameColumns(Quelle, {
    {"LiefNr", "LieferantID"},
    {"lieferant_name", "Lieferant"},
    {"neu_hinzugekommen", "NeuerName"}  -- direkt ergänzt
})
```

**Code aus anderen Projekten übernehmen:**
- Bewährte Transformationslogik aus einem anderen Power BI-Projekt
- Einfach in den erweiterten Editor kopieren
- Schrittname anpassen wenn er in Konflikt mit bestehenden Namen gerät
  *Das ist ein echter Zeitsparer in der Praxis. Wenn man eine bewährte Bereinigungsroutine hat, muss man sie nicht neu klicken - einfach den M-Code kopieren.*

**Code lesen: Von unten nach oben:**
- Unbekannten M-Code zuerst bei `in` lesen
- Den finalen Schritt finden und seine Funktion identifizieren
- Dann rückwärts durch die Kette arbeiten bis zur Quelle

**Demo: Eine unbekannte Abfrage gemeinsam rückwärts lesen**

```
let
    Quelle = Csv.Document(...),
    Typen = Table.TransformColumnTypes(Quelle, {{"Datum", type date}}),
    Gefiltert = Table.SelectRows(Typen, each [Status] = "Abgeschlossen"),
    Bereinigt = Table.ReplaceValue(Gefiltert, null, 0, Replacer.ReplaceValue, {"Rabatt"})
in
    Bereinigt
```

Gemeinsam von unten lesen:
- Ergebnis ist Bereinigt = ReplaceValue: null in Rabatt durch 0 ersetzen
- Gefiltert = SelectRows: nur Status = Abgeschlossen
- Typen = TransformColumnTypes: Datum auf Datum-Typ
- Quelle lädt die CSV

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- M ist die Sprache hinter Power Query, automatisch generiert, case-sensitive
- Struktur: let leitet ein, Schritte als Name = Funktion(VorherigerSchritt), in am Ende gibt das Ergebnis aus
- Kette ist linear: Schritt löschen bricht alle nachfolgenden die darauf verweisen
- Häufige Funktionen: Table.RemoveColumns, Table.RenameColumns, Table.SelectRows, Table.Group, Table.NestedJoin
- each und _: anonyme Funktion die auf jede Zeile/jeden Wert angewendet wird, _ ist der aktuelle Wert
- Direktanpassungen: Pfade, Servernamen, Umbenennungen direkt im Code ändern
- Code lesen: von in rückwärts durch die Kette

**Übergang zu Skript 07:**
"Wir haben jetzt vollständige Kenntnisse über Power Query. Im nächsten Skript entscheiden wir wie das Modell aufgebaut wird: Import, DirectQuery oder zusammengesetzt - und warum die Entscheidung vor dem Entwicklungsbeginn fallen muss."

---

## Mini-Quiz

---

**Frage 1:** Was bedeutet es, dass M case-sensitive ist?

- a) M kann keine Sonderzeichen verarbeiten
- b) Groß- und Kleinschreibung ist bedeutungsrelevant. Table.RemoveColumns und table.removecolumns sind unterschiedlich. (richtig)
- c) M unterscheidet zwischen Textwerten in einfachen und doppelten Anführungszeichen
- d) M-Funktionen dürfen nur in Großbuchstaben geschrieben werden

> **Antwort:** b) Ein falsches Großbuchstabe in einem Funktionsnamen führt zu einem Fehler. Das ist anders als in Excel-Formeln, die Groß-/Kleinschreibung ignorieren.

---

**Frage 2:** Was steht nach dem Schlüsselwort `in` am Ende eines M-Code-Blocks?

- a) Die Datenquelle der Abfrage
- b) Eine Liste aller Schritte
- c) Der Name des letzten Schritts, dessen Ergebnis die Abfrage zurückgibt (richtig)
- d) Die Verbindungsparameter für die Datenquelle

> **Antwort:** c) `in` gibt das Ergebnis der gesamten Abfrage aus. Was danach steht, ist das was Power BI ins Modell lädt. Es ist immer der letzte Schritt.

---

**Frage 3:** Was bedeutet `each` in einer Power Query-Bedingung?

- a) Eine Schleife die genau dreimal ausgeführt wird
- b) Eine anonyme Funktion die auf jede Zeile oder jeden Wert angewendet wird (richtig)
- c) Ein Schlüsselwort das mehrere Filterbedingungen verbindet
- d) Eine Abkürzung für "excel" - kommt aus der Excel-Kompatibilität

> **Antwort:** b) `each` ist die Kurzform für eine anonyme Funktion. In `Table.SelectRows(tabelle, each [Preis] > 100)` läuft `each` über jede Zeile und prüft die Bedingung.

---

**Frage 4:** Ein M-Code-Block hat 8 Schritte. Schritt 4 wird gelöscht. Schritt 5 verwendet Schritt 4 als Eingabe. Was passiert?

- a) Power BI sucht automatisch nach dem nächsten gültigen Schritt
- b) Alle Schritte ab Schritt 5 brechen, weil ihre Eingabe nicht mehr existiert (richtig)
- c) Schritt 5 verwendet automatisch Schritt 3 als Eingabe
- d) Nur Schritt 5 bricht, die Schritte 6-8 bleiben intakt

> **Antwort:** b) M-Code ist eine lineare Kette. Jeder Schritt referenziert seinen Vorgänger. Fällt ein Schritt aus, brechen alle nachfolgenden die darauf aufbauen.

---

**Frage 5:** Die Quelldatei einer Abfrage wurde umbenannt von "kunden.csv" in "customers.csv". Wo macht man die Korrektur am schnellsten?

- a) Die gesamte Abfrage löschen und neu aufbauen
- b) Über Start - Datenquelleneinstellungen - Quelle ändern
- c) Direkt im erweiterten Editor: den Dateinamen in der Csv.Document-Funktion ändern und auf Fertig klicken (richtig)
- d) Den Dateinamen im Windows-Explorer zurück auf "kunden.csv" ändern

> **Antwort:** c) Die direkte Änderung im erweiterten Editor ist der schnellste Weg. Eine Textänderung, Fertig klicken, fertig. Datenquelleneinstellungen funktionieren auch, sind aber mehr Klicks.
