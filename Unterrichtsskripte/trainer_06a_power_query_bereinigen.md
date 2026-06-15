# Trainer-Skript 06a - Power Query: Daten vorbereiten

> **Themen:** Power Query-Editor · Strukturieren · Entpivotieren · Bereinigen · Datentypen · Datenprofiling
> **Schüler-Skript:** 06a_power_query_bereinigen.md
> **Aufgabenblatt:** aufgaben_06a_power_query_bereinigen.md
> **Übungsdaten:** customers.csv, orders.csv, products.csv, salesreps.csv, monthly_sales_wide.csv

---

## Einstieg

**Frage ans Plenum:** Wer hat schon mal Daten bekommen, die nicht sofort verwendbar waren - falsche Schreibweisen, gemischte Datumsformate, fehlende Werte?

- Kurz Erfahrungen sammeln lassen
- Überleitung: Das ist der Normalfall, nicht die Ausnahme. Power Query ist das Werkzeug, das genau dafür gebaut wurde.

**Kerngedanke ansprechen:**
- Importierte Daten sind selten bereit für die Analyse
- Der Power Query-Editor ist das zentrale Vorbereitungswerkzeug
- Alles was hier passiert, wird bei jeder Aktualisierung automatisch wiederholt
- Die Originaldatenquelle wird dabei nie verändert

---

## Block 1 - Der Power Query-Editor

**Demo: Editor öffnen**
- Start - Daten transformieren
- Die drei Bereiche zeigen: links Abfragen, Mitte Vorschau, rechts Abfrageeinstellungen

**Angewendete Schritte erklären:**
- Jede Aktion erzeugt einen benannten Schritt in der rechten Leiste
- Bei jeder Aktualisierung: alle Schritte werden in derselben Reihenfolge wiederholt
- Schritte lassen sich umbenennen, umsortieren, löschen
  *Umbenennen ist wichtig für die Lesbarkeit. "Geänderter Typ1" sagt nichts. "Bestelldatum auf Datum" sagt alles. Das ist vor allem nützlich wenn mehrere Leute am Modell arbeiten.*

**Warnung zu Abhängigkeiten direkt ansprechen:**
- Jeder Schritt verweist auf den vorherigen
- Schritt löschen auf den ein späterer verweist bricht die Kette
- Immer erst im erweiterten Editor prüfen bevor man löscht

**Frage ans Plenum:** Was passiert mit der Originaldatei wenn ich hier Spalten lösche oder Werte ersetze?

> **Erwartete Antwort:** Nichts. Die Originaldatei bleibt unverändert.
> Genau - Power Query arbeitet immer mit einer Arbeitskopie. Das ist ein zentrales Sicherheitsprinzip.

---

## Block 2 - Ursprungsdaten strukturieren

**Frage ans Plenum:** Ihr öffnet eine CSV im Power Query-Editor und seht: alle Spalten heißen Column1, Column2, Column3. Was ist passiert?

> **Erwartete Antwort:** Power BI hat die erste Zeile als Datenzeile geladen statt als Überschriften.
> Genau. Das ist ein häufiger Importfehler bei CSVs ohne klare Kodierung.

**Die vier Strukturierungsschritte durchgehen:**

**Erste Zeile als Überschriften verwenden:**
- Start - Erste Zeile als Überschriften verwenden
- Oder: Dropdown neben Column1
- Wann nötig: wenn Spalten Column1, Column2 heißen

**Abfrage umbenennen:**
- Rechtsklick auf Abfrage links - Umbenennen
- Weg von technischen Präfixen: FactProductTable - Produkte, vOrders - Orders
  *Präfix bedeutet ein vorangestelltes Kürzel das aus dem Quellsystem kommt. "Fact_" steht für Faktentabelle, "v_" für View, "Dim_" für Dimensionstabelle. Das sind Datenbankkonventionen die im Power BI-Bericht nichts zu suchen haben.*

**Spalten umbenennen:**
- Doppelklick auf Spaltenüberschrift
- Demo: "Kundenseit" in "KundeSeit" - abgeschnittener Name aus der CSV
- Keine Unterstriche, keine Abkürzungen, sprechende Namen

**Spalten entfernen:**
- Zwei Varianten zeigen: "Spalten entfernen" vs. "Andere Spalten entfernen"
- Demo: Telefon-Spalte mit 30 leeren Werten entfernen
- Faustregel: So früh wie möglich entfernen was nicht gebraucht wird

**Frage ans Plenum:** Eine Spalte wird im Bericht nie verwendet. Macht es trotzdem einen Unterschied ob sie im Modell ist?

> **Erwartete Antwort:** Ja - sie belegt Speicher.
> Jede nicht benötigte Spalte die ins Modell geladen wird, vergrößert die Datei und verlangsamt Abfragen. Früh entfernen ist eine der wirksamsten Optimierungsmaßnahmen.

---

## Block 3 - Datenform korrigieren: Entpivotieren

**Frage ans Plenum:** Ich habe eine Tabelle mit einer Zeile pro Region und 12 Monatsspalten nebeneinander. Was ist das Problem für Power BI?

> **Erwartete Antworten:** DAX kann nicht über die Monatsspalten aggregieren. Kein Datenschnitt nach Monat möglich. Wenn ein 13. Monat dazukommt, ändert sich die Tabellenstruktur.
> Das nennt sich breites Format. Power BI braucht das schmale Format: eine Zeile pro Messwert.

**Demo: monthly_sales_wide.csv entpivotieren**
- Datei laden, Struktur zeigen: Region als Zeile, 12 Monatsspalten nebeneinander
- Alle 12 Monatsspalten markieren (Shift-Klick)
- Transformieren - Entpivotieren
- Ergebnis: zwei neue Spalten "Attribut" und "Wert"
  *Attribut enthält die ehemaligen Spaltenüberschriften - also die Monatsnamen. Wert enthält die ehemaligen Zellwerte - also die Umsatzzahlen. Beide Spalten sollte man danach umbenennen.*
- Umbenennen in "Monat" und "Umsatz"
- Ergebnis: 5 Regionen x 12 Monate = 60 Zeilen

**Variante ansprechen:** "Andere Spalten entpivotieren" - Region markieren, Rest wird entpivotiert. Praktisch wenn viele Spalten transformiert werden sollen.

**Pivotieren kurz ansprechen:**
- Der umgekehrte Vorgang: Zeilenwerte werden zu Spaltenüberschriften
- Transformieren - Spalte pivotieren, Wertespalte und Aggregatfunktion wählen
- Seltener gebraucht, aber prüfungsrelevant

**Frage ans Plenum:** Nach dem Entpivotieren: Warum kann ich jetzt einen Datenschnitt nach Monat bauen?

> **Erwartete Antwort:** Weil Monat jetzt ein Spaltenwert ist, kein Spaltenname. Datenschnitte filtern nach Spaltenwerten.
> Genau - das ist der Kernunterschied zwischen breitem und schmalem Format.

---

## Block 4 - Daten bereinigen

**Überleitung:** Struktur stimmt. Jetzt zum Inhalt - Werte korrigieren.

**Werte ersetzen:**
- Demo: Stadtfeld mit Großbuchstaben (LÜBECK, HANNOVER)
- Transformieren - Format - Erste Buchstaben groß
- Alternativ: Transformieren - Werte ersetzen für einzelne Korrekturen
  *Werte ersetzen funktioniert spaltenweise - man kann keine einzelne Zelle direkt anklicken und ändern. Das ist anders als in Excel. Alle Korrekturen gelten für die gesamte Spalte.*

**NULL-Werte behandeln:**
- Demo: Email-Spalte mit 15 leeren Werten
- Rechtsklick auf Spalte - Werte ersetzen - null durch leeren Text
  *NULL bedeutet kein Wert vorhanden - nicht dasselbe wie 0 oder ein leerer Text. NULL kann Berechnungen und Beziehungen stören. Wie man damit umgeht hängt vom Kontext ab: manchmal durch 0 ersetzen, manchmal durch einen Standardwert, manchmal Zeilen komplett entfernen.*

**Frage ans Plenum:** Ich habe in der Umsatzspalte NULL-Werte. Mein Chef sagt: "Ersetze sie durch 0". Ist das immer richtig?

> **Erwartete Antwort:** Nein - NULL bedeutet unbekannt, 0 bedeutet kein Umsatz. Das verfälscht Durchschnittswerte.
> NULL durch 0 zu ersetzen ist eine inhaltliche Entscheidung, keine technische. Das muss man begründen können.

**Fehler in Zellen behandeln:**
- Fehler entstehen wenn ein Wert nicht in den Typ konvertiert werden kann
- Drei Optionen: Fehler entfernen (Zeile löschen), Fehler ersetzen (Standardwert), Fehler behalten (für spätere Analyse)
- Demo: Spalte mit gemischten Dezimaltrennzeichen - einige Werte werden zu Fehler wenn Typ auf Dezimalzahl gestellt wird
  *Das ist genau das Problem in unserer orders.csv: 225 Zeilen haben Komma statt Punkt als Dezimaltrennzeichen. Power BI interpretiert "751,08" als Text, nicht als Zahl.*

**Duplikate entfernen:**
- Rechtsklick auf Schlüsselspalte - Duplikate entfernen
- Vorher: Abfrage kopieren um Vergleich zu ermöglichen
  *Kopieren der Abfrage ist wichtig bevor man Duplikate entfernt - so kann man prüfen wie viele es waren und ob die richtigen Zeilen entfernt wurden.*

**Ausfüllen (Fill Up/Down):**
- Bei gruppierten Exporten steht der Kategoriename nur in der ersten Zeile einer Gruppe
- Transformieren - Ausfüllen - Nach unten: kopiert den Wert in alle leeren Zellen darunter
  *Fill Down ist ein klassischer Fall bei Excel-Exporten: Statt jede Zeile zu beschriften, schreibt man die Kategorie nur einmal oben und lässt die restlichen Zeilen leer. Power BI kann damit nicht umgehen - jede Zeile braucht ihren Wert.*

**Namenskonventionen kurz betonen:**
- Beschreibende Geschäftsnamen, keine Unterstriche, keine Präfixe
- Konsistenz über alle Tabellen hinweg
- Was im Datenbereich steht, sehen die Berichtsnutzer

---

## Block 5 - Datentypen

**Frage ans Plenum:** Ich habe Bestelldatum als Text im Modell. Welche zwei konkreten Probleme entstehen?

> **Erwartete Antworten:** Keine Datumshierarchie (kein Drill-down nach Jahr/Quartal/Monat). Zeitintelligenzfunktionen in DAX funktionieren nicht (TOTALYTD, SAMEPERIODLASTYEAR etc.).
> Das sind die beiden häufigsten Folgefehler. Deshalb: Datentypen immer in Power Query korrigieren, nicht nachträglich.

**Zwei Wege zum Typ ändern zeigen:**
- Klick auf das Typsymbol links der Spaltenüberschrift (123, ABC, Kalender)
  *Das Symbol zeigt auf einen Blick welchen Typ Power BI erkannt hat. 123 = Ganzzahl, 1,2 = Dezimalzahl, ABC = Text, Kalender = Datum. Ein Klick darauf öffnet das Menü zur Typauswahl.*
- Transformieren - Datentyp - Typ wählen

**Typen der Übungsdaten durchgehen:**
- Bestelldatum, Lieferdatum: auf Datum
- Menge: auf Ganzzahl
- Einzelpreis, Rabatt: auf Dezimalzahl

**Warum in Power Query und nicht nachträglich:**
- Beim Laden ins Modell werden Typen fixiert
- Nachträgliche Korrekturen in der Berichtsansicht erzeugen Folgefehler in bestehenden Measures
- Sauberer Workflow: erst bereinigen, dann laden

---

## Block 6 - Datenprofiling

**Überleitung:** Bevor man etwas bereinigt, muss man wissen was kaputt ist. Datenprofiling macht das sichtbar - vor dem Laden.

**Demo: Alle drei Ansichten aktivieren**
- Ansicht - Spaltenqualität
- Ansicht - Spaltenverteilung
- Ansicht - Spaltenprofil

**Die drei Ansichten erklären:**

**Spaltenqualität** - farbige Balken über jeder Spalte:
- Grün = gültige Werte
- Gelb = fehlerhafte Werte
- Grau = leere Werte (NULL)
  *20 Prozent grauer Balken bedeutet: jede fünfte Zeile hat keinen Wert. Das sieht man auf einen Blick, ohne die Daten manuell zu durchsuchen.*

**Spaltenverteilung** - Häufigkeitsdiagramm:
- Zeigt wie oft jeder Wert vorkommt
- Gut für Ausreißer und Kategorien
  *Ausreißer sind Werte die weit außerhalb des normalen Bereichs liegen. Zum Beispiel eine Bestellmenge von 99.999 während alle anderen zwischen 1 und 10 liegen. Das sieht man sofort im Diagramm.*

**Spaltenprofil** - Detailstatistik unten:
- Min, Max, Durchschnitt, Standardabweichung, Nullwert-Anzahl
- Wertverteilung als detailliertes Balkendiagramm

**Unterschied: unterschiedliche vs. eindeutige Werte erklären:**
- Unterschiedliche Werte: alle verschiedenen Werte inklusive Duplikate
- Eindeutige Werte: nur Werte die exakt einmal vorkommen
  *Beispiel: Spalte hat die Werte Berlin, Hamburg, Berlin, München. Unterschiedlich = 3 (Berlin, Hamburg, München). Eindeutig = 2 (nur Hamburg und München kommen einmal vor, Berlin ist doppelt). Wenn bei CustomerID unterschiedlich = eindeutig = 400: perfekt, keine Duplikate.*

**Wichtiger Hinweis zu den 1000 Zeilen:**
- Standard: nur erste 1000 Zeilen werden profiliert
- Statusleiste unten - "Spaltenprofilerstellung basierend auf gesamtem Dataset"
- Bei kleinen Datensätzen kein Unterschied, bei großen entscheidend

**Frage ans Plenum:** Spaltenverteilung zeigt bei "Verkäufer" einen Namen der dreimal so häufig vorkommt wie alle anderen. Was könnte das bedeuten?

> **Erwartete Antworten:** Duplikate, Importfehler, ein Standardwert der falsch gesetzt wurde, oder tatsächlich mehr Verkäufe.
> Genau - ohne Datenprofiling fällt das erst beim Auswerten auf. Mit Profiling sieht man es vor dem Laden.

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Power Query-Editor: Schritte werden gespeichert und wiederholt, Original bleibt unverändert, Abhängigkeiten beachten
- Strukturieren: Überschriften hochstufen, umbenennen, unnötige Spalten entfernen
- Datenform: Entpivotieren für breite Tabellen, Pivotieren als Gegenoperation
- Bereinigen: Werte ersetzen, NULL behandeln, Fehler korrigieren, Duplikate entfernen
- Datentypen: immer in Power Query, nicht nachträglich
- Datenprofiling: Qualität, Verteilung, Profil - vor dem Laden aktivieren

**Übergang zu Skript 06b:**
"Wir haben jetzt saubere, korrekt strukturierte Daten. Im nächsten Schritt bauen wir neue Inhalte daraus: berechnete Spalten in Power Query, Tabellen zusammenführen, und Abfragetypen die ein sauberes Modell ermöglichen."

---

## Mini-Quiz

---

**Frage 1:** Eine CSV wurde geladen, alle Spalten heißen Column1, Column2. Was ist passiert und wie behebt man es?

- a) Die Datei ist beschädigt - neu laden
- b) Power BI hat die erste Zeile als Datenzeile geladen. Lösung: Start - Erste Zeile als Überschriften verwenden (richtig)
- c) Der Dateityp wird nicht unterstützt
- d) Der Zeichensatz ist falsch - UTF-8 einstellen

> **Antwort:** b) Das ist ein häufiger Importfehler. Die erste Zeile wird standardmäßig als Datenzeile behandelt wenn Power BI das Format nicht eindeutig erkennt.

---

**Frage 2:** Eine Tabelle hat 12 Monatsspalten nebeneinander. Welche Operation bringt sie in die richtige Form für DAX?

- a) Pivotieren
- b) Transponieren
- c) Entpivotieren (richtig)
- d) Gruppieren

> **Antwort:** c) Entpivotieren wandelt die 12 Spalten in zwei Spalten um: Monat und Umsatz. Das ist die normalisierte Struktur, die DAX und Datenschnitte benötigen.

---

**Frage 3:** Datenprofiling zeigt für die Spalte CustomerID: unterschiedliche Werte = 400, eindeutige Werte = 387. Was bedeutet das?

- a) Es gibt 387 Kunden mit mehreren Bestellungen - alles normal
- b) 13 CustomerIDs kommen mehr als einmal vor - Hinweis auf mögliche Duplikate (richtig)
- c) 387 Kunden haben eine gültige ID, 13 haben NULL-Werte
- d) Die Profilerstellung ist fehlerhaft, beide Werte müssten identisch sein

> **Antwort:** b) Eindeutige Werte bedeutet: exakt einmal vorhanden. Wenn unterschiedlich > eindeutig, gibt es Werte die mehrfach vorkommen - bei einer ID-Spalte ein klares Warnsignal.

---

**Frage 4:** Warum sollten Datentypen in Power Query korrigiert werden und nicht nachträglich in der Berichtsansicht?

- a) In der Berichtsansicht ist eine Typänderung gar nicht möglich
- b) Power Query-Korrekturen sind schneller, weil die Ansicht weniger Funktionen hat
- c) Beim Laden ins Modell werden Typen fixiert. Nachträgliche Korrekturen erzeugen Folgefehler in bestehenden Measures. (richtig)
- d) Es gibt keinen Unterschied, wann der Typ korrigiert wird

> **Antwort:** c) Sauber korrigierte Typen vor dem Laden verhindern Folgefehler. Nachträgliche Korrekturen müssen in jedem betroffenen Measure einzeln nachgezogen werden.

---

**Frage 5:** Standardmäßig profiliert Power Query nur die ersten 1.000 Zeilen. Eine Tabelle hat 80.000 Zeilen. Ein seltener Fehlertyp taucht erst ab Zeile 5.000 auf. Was muss man tun?

- a) Die ersten 5.000 Zeilen manuell prüfen
- b) Nichts - Power Query erkennt alle Fehler automatisch
- c) In der Statusleiste auf "Spaltenprofilerstellung basierend auf gesamtem Dataset" umstellen (richtig)
- d) Die Datei in kleinere Teile aufteilen

> **Antwort:** c) Für vollständiges Profiling muss die Einstellung explizit umgestellt werden. Danach analysiert Power Query alle Zeilen.
