# Trainer-Skript 06 - Daten bereinigen, transformieren und laden

> **Themen:** Power Query-Editor · Strukturieren · Entpivotieren · Datentypen · Append & Merge · Datenprofiling · M-Code
> **Schüler-Skript:** 06_power_query_bereinigen.md
> **Übungsdaten:** customers.csv, orders.csv, orders_2025.csv, monthly_sales_wide.csv

---

## Einstieg

**Frage ans Plenum:** Wer hat schon mal eine Excel-Datei bekommen, bei der Städte mal groß, mal klein, mal in Großbuchstaben geschrieben waren, Spalten fehlende Werte hatten und die erste Zeile keine Überschriften enthielt?

- Überleitung: Genau das ist die Realität in fast jedem Unternehmen. Daten kommen selten sauber an.

**Kerngedanke ansprechen:**
- Der Power Query-Editor ist das zentrale Bereinigungswerkzeug in Power BI
- Jede Transformation wird als wiederholbarer Schritt gespeichert
- Die Originaldatenquelle wird nie verändert
- Was wir hier machen, läuft bei jeder Aktualisierung automatisch wieder ab

---

## Block 1 - Der Power Query-Editor

> Daten sind bereits aus Skript 05 geladen. Start → Daten transformieren, um den Editor zu öffnen.

**Die drei Bereiche zeigen:**
- Links: alle geladenen Abfragen (Tabellen)
- Mitte: Vorschau der aktuell ausgewählten Abfrage
- Rechts: Name der Abfrage und die angewendeten Schritte

**Angewendete Schritte betonen:**
- Jede Aktion erzeugt einen neuen Schritt in der rechten Leiste
- Schritte lassen sich umbenennen, umsortieren und löschen
- Bei jeder Aktualisierung werden alle Schritte automatisch wiederholt
- Die Originaldatenquelle wird nie verändert

**Frage ans Plenum:** Was passiert, wenn ich in Power Query einen Schritt lösche, der von einem späteren Schritt abhängt?

> **Erwartete Antwort:** Der spätere Schritt bricht, weil er sich auf eine Spalte oder Tabelle bezieht, die durch den gelöschten Schritt erst erstellt wurde.
> => Reihenfolge der Schritte ist wichtig. Abhängigkeiten im Blick behalten.

---

## Block 2 - Ursprungsdaten strukturieren

**Live-Demo: customers.csv strukturieren**

**Schritt 1: Abfrage umbenennen**
- Rechtsklick auf Abfrage links → Umbenennen
- "customers" statt "customers (2)" oder technische Namen
- Präfixe wie `v_`, `Fact`, `Dim` entfernen

**Schritt 2: Spalten umbenennen**
- Doppelklick auf Spaltenüberschrift
- Demo: "Kundenseit" in "KundeSeit" umbenennen (abgeschnittener Name aus CSV)
- Faustregel: Sprechende Namen, keine Unterstriche, konsistent

**Schritt 3: Erste Zeile als Überschriften**
- Nur zeigen wenn CSV keine Überschriften hat
- Start → Erste Zeile als Überschriften verwenden

**Schritt 4: Irrelevante Spalten entfernen**
- Demo: Telefon-Spalte entfernen (hat 30 leere Werte, für Berichtsanalyse irrelevant)
- Zwei Varianten: "Spalten entfernen" vs. "Andere Spalten entfernen"
- Faustregel: So früh wie möglich entfernen was nicht gebraucht wird

**Frage ans Plenum:** Warum ist es besser, unnötige Spalten im Power Query-Editor zu entfernen statt sie einfach im Bericht nicht zu verwenden?

> **Erwartete Antwort:** Nicht verwendete Spalten werden trotzdem ins Modell geladen und belegen Speicher. Früh entfernen = kleineres Modell, bessere Leistung.
> => Gilt auch für Zeilen. Was nicht gebraucht wird, raus so früh wie möglich.

---

## Block 3 - Werte bereinigen und NULL-Werte behandeln

**Live-Demo: Stadtfeld bereinigen**

**Werte ersetzen:**
- Demo: Städte in Großbuchstaben (LÜBECK, HANNOVER etc.) normalisieren
- Transformieren → Werte ersetzen
- Alternativ: Transformieren → Format → Erste Buchstaben groß

**Hinweis zum Unterschied zu Excel:**
- In Power Query können keine einzelnen Zellen direkt bearbeitet werden
- Immer spaltenweise oder über Transformationen

**NULL-Werte behandeln:**
- Demo: Email-Spalte, 15 leere Werte
- Rechtsklick auf Spalte → Werte ersetzen → "null" durch "" ersetzen
- Oder: Zeilen mit null herausfiltern wenn gewünscht

**Duplikate entfernen:**
- Rechtsklick auf Schlüsselspalte (CustomerID) → Duplikate entfernen
- Vorher Tabelle kopieren um Vergleich zu ermöglichen
- Tipp: Erst prüfen wie viele Duplikate es gibt (Datenprofiling gleich)

**Frage ans Plenum:** Ich habe eine Umsatzspalte mit einigen NULL-Werten. Ich ersetze NULL durch 0. Was ist das Problem dabei?

> **Erwartete Antwort:** Durchschnittswerte werden verfälscht, weil 0 die Berechnung beeinflusst anders als ein fehlender Wert. NULL bedeutet "unbekannt", 0 bedeutet "kein Umsatz".
> => NULL durch 0 ersetzen klingt harmlos, ist aber inhaltlich eine Entscheidung die man begründen muss.

---

## Block 4 - Entpivotieren und Pivotieren

**Überleitung:** Manchmal ist das Problem nicht der Inhalt der Daten, sondern ihre Form. Das klassischste Beispiel ist die breite Tabelle.

**Live-Demo: monthly_sales_wide.csv laden**
- Struktur zeigen: Region in Zeile, 12 Monatsspalten nebeneinander
- Problem erklären: DAX kann damit nicht rechnen, kein Zeitfilter möglich

**Entpivotieren:**
- Alle Monatsspalten markieren (Shift-Klick von Jan bis Dez)
- Transformieren → Entpivotieren
- Ergebnis: zwei neue Spalten "Attribut" (Monat) und "Wert" (Umsatz)
- Umbenennen in "Monat" und "Umsatz"
- Jetzt: 5 Regionen x 12 Monate = 60 Zeilen. Perfekt für DAX und Zeitfilter.

**Frage ans Plenum:** Warum ist die schmale (normalisierte) Tabellenstruktur für Power BI besser als die breite?

> **Erwartete Antworten:** DAX-Measures können über eine Wertspalte aggregieren. Ein Datenschnitt kann die Monatsspalte filtern. Neue Monate kommen einfach als neue Zeilen dazu, kein Schema-Änderung nötig.
> => Breite Tabellen kommen oft aus Excel. Entpivotieren ist eine der häufigsten Operationen in der Praxis.

**Pivotieren kurz ansprechen:**
- Der umgekehrte Vorgang: Zeilenwerte werden zu Spaltenüberschriften
- Transformieren → Spalte pivotieren, Wertespalte und Aggregatfunktion wählen
- Seltener gebraucht, aber manchmal nötig für Berichtsausgaben

---

## Block 5 - Datentypen

**Überleitung:** Falsche Datentypen sind einer der häufigsten Fehler in Power BI. Sie verhindern Berechnungen, Datumshierarchien und Beziehungen.

**Demo: orders.csv laden, Typen prüfen**
- Bestelldatum und Lieferdatum: als Text geladen? → auf Datum umstellen
- Menge: als Dezimalzahl geladen? → auf Ganzzahl umstellen
- Rabatt: als Text geladen? → auf Dezimalzahl

**Zwei Wege zum Typ ändern:**
- Spalte auswählen → Transformieren → Datentyp
- Auf das Typ-Symbol links der Spaltenüberschrift klicken

**Was falsche Typen verhindern:**
- Bestelldatum als Text: keine Datumshierarchie, kein TOTALYTD, kein Zeitfilter
- Menge als Text: keine Summe, kein Durchschnitt
- Rabatt als Text: keine Berechnung des Nettoumsatzes

**Wann korrigieren:**
- Immer im Power Query-Editor vor dem Laden ins Modell
- Nicht nachträglich in der Berichtsansicht

**Frage ans Plenum:** Power BI hat Bestelldatum als Text erkannt statt als Datum. Wann kann das passieren?

> **Erwartete Antworten:** Wenn das Datumsformat nicht eindeutig ist (z.B. "01.02.2024" kann Tag-Monat oder Monat-Tag sein). Oder wenn die ersten 1000 Zeilen gemischte Formate enthalten.
> => Power BI scannt nur die ersten 1000 Zeilen für die Typerkennung. Seltene Formate weiter unten werden übersehen.

---

## Block 6 - Abfragen anfügen und zusammenführen

**Überleitung:** Manchmal sind Daten auf mehrere Tabellen oder Dateien verteilt. Power Query kann sie kombinieren.

**Append - Abfragen anfügen:**
- Konzept: Zeilen stapeln. Entspricht UNION ALL in SQL.
- Demo: orders.csv und orders_2025.csv zusammenführen
- Beide Dateien laden
- Start → Abfragen anfügen → Abfragen als neu anfügen
- Beide Tabellen auswählen
- Ergebnis: eine Tabelle mit 3500 Zeilen (3000 + 500)
- Voraussetzung: gleiche Spaltenüberschriften. Sonst NULL in nicht übereinstimmenden Spalten.

**Frage ans Plenum:** Was ist der Unterschied zwischen "Abfragen anfügen" und "Abfragen zusammenführen"?

> **Erwartete Antwort:** Anfügen stapelt Zeilen (mehr Zeilen, gleiche Spalten). Zusammenführen ergänzt Spalten (gleiche Zeilen, mehr Spalten). Anfügen = UNION, Zusammenführen = JOIN.
> => Der häufigste Irrtum bei Einsteigern.

**Merge - Abfragen zusammenführen:**
- Konzept: Spalten aus zweiter Tabelle ergänzen über Schlüssel. Entspricht SQL JOIN.
- Demo: orders mit customers zusammenführen über CustomerID
- Start → Abfragen zusammenführen → Als neue Abfrage zusammenführen
- Schlüsselspalte CustomerID in beiden Tabellen auswählen
- Join-Typ erklären: Linker äußerer (alle Orders, nur passende Kunden)

**Die drei Join-Typen kurz erklären:**
- Linker äußerer: Alle Zeilen links, nur passende rechts. Nicht passende = NULL.
- Innerer: Nur Zeilen die in beiden Tabellen vorkommen.
- Vollständiger äußerer: Alle Zeilen beider Tabellen, nicht passende = NULL.

---

## Block 7 - Datenprofiling

**Überleitung:** Bevor man bereinigt, muss man wissen was falsch ist. Datenprofiling macht Probleme sichtbar.

**Profilierungsansichten aktivieren:**
- Ansicht → Spaltenqualität aktivieren
- Ansicht → Spaltenverteilung aktivieren
- Ansicht → Spaltenprofil aktivieren

**Drei Ansichten erklären:**
- **Spaltenqualität**: Balken oben über jeder Spalte. Grün = gültig, Gelb = Fehler, Grau = leer.
- **Spaltenverteilung**: Balkendiagramm mit Häufigkeit der Werte. Gut für Ausreißer und Kategorien.
- **Spaltenprofil**: Detailstatistik unten. Min, Max, Durchschnitt, Standardabweichung, Nullwerte.

**Demo: customers.csv profilieren**
- Spaltenqualität: Email hat 15 leere, Telefon hat 30 leere
- Spaltenverteilung: Region zeigt 5 Werte, gut verteilt
- Spaltenprofil: Stadt zeigt wie viele Großbuchstaben-Einträge es gibt

**Wichtiger Hinweis:**
- Standard: nur erste 1000 Zeilen werden profiliert
- Statusleiste unten → "Profilerstellungsstatus" → "Spaltenprofilerstellung basierend auf gesamtem Dataset"
- Bei 400 Kunden-Zeilen macht das keinen Unterschied, bei 3 Millionen schon

**Unterschied: unterschiedliche vs. eindeutige Werte:**
- Unterschiedlich: alle Werte inklusive Duplikate
- Eindeutig: nur Werte die genau einmal vorkommen
- CustomerID: unterschiedlich = 400, eindeutig = 400. Gut, keine Duplikate.
- Stadt: unterschiedlich = 50, eindeutig = 20. 30 Städte kommen mehrfach vor. Normal.

---

## Block 8 - M-Code im erweiterten Editor

**Überleitung:** Alles was wir geklickt haben, steckt dahinter als Code. Das ist M.

**Demo: Erweiterter Editor öffnen**
- Ansicht → Erweiterter Editor
- Code zeigen, nicht erschrecken

**Struktur von M-Code erklären:**
- `let` leitet den Block ein
- Jede Zeile: `Schrittname = Transformation(VorherigerSchritt),`
- `in` am Ende: gibt an welcher Schritt das Ergebnis ist (immer der letzte)
- Jeder Schritt referenziert den vorherigen

**Was man damit machen kann:**
- Verbindungsdetails direkt ändern (Servername, Pfad)
- Schritte gezielt anpassen ohne die GUI zu nutzen
- Abfragen aus anderen Projekten kopieren und einfügen

**Was man nicht muss:**
- M aktiv schreiben lernen ist für den PL-300 nicht gefordert
- Lesen und Verstehen ist aber nützlich

**Frage ans Plenum:** Ihr habt eine Abfrage mit 15 Schritten. Ihr löscht Schritt 7. Was riskiert ihr?

> **Erwartete Antwort:** Alle Schritte ab 8, die sich auf das Ergebnis von Schritt 7 beziehen, brechen. M-Code ist eine Kette, jeder Schritt baut auf dem vorherigen auf.
> => Deshalb immer erst prüfen ob ein Schritt von späteren Schritten abhängt, bevor man löscht.

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Power Query-Editor: Schritte werden gespeichert und bei Aktualisierung wiederholt. Originaldaten bleiben unberührt.
- Strukturieren: Umbenennen, Spalten entfernen, erste Zeile als Überschriften
- Bereinigen: Werte ersetzen, NULL behandeln, Duplikate entfernen
- Entpivotieren: Breite Tabellen in normalisierte Zeilenstruktur umwandeln
- Datentypen: Immer vor dem Laden korrigieren
- Append: Zeilen stapeln (UNION). Merge: Spalten ergänzen (JOIN).
- Profiling: Spaltenqualität, -verteilung, -profil aufdecken Anomalien
- M-Code: Alle Schritte als Code im erweiterten Editor sichtbar

**Übergang zu Skript 07:**
> "Wir haben jetzt saubere, korrekt typisierte Daten. Im nächsten Skript bauen wir daraus ein semantisches Modell: Tabellen verbinden, Beziehungen definieren, das Sternschema umsetzen."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren. Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Was passiert mit der Originaldatenquelle wenn man im Power Query-Editor Transformationen anwendet?

- a) Sie wird direkt verändert
- b) Eine Kopie wird erstellt und die Kopie wird verändert
- c) Die Originaldatenquelle bleibt unverändert. Alle Schritte werden nur auf die Vorschau angewendet und bei Aktualisierung wiederholt. ✅
- d) Die Originaldatenquelle wird gelöscht

> **Antwort:** c) Das ist das zentrale Prinzip von Power Query. Die Quelle wird nie angefasst.

---

**Frage 2:** Was ist der Unterschied zwischen "Abfragen anfügen" und "Abfragen zusammenführen"?

- a) Kein Unterschied, beide Operationen tun dasselbe
- b) Anfügen stapelt Zeilen (UNION), Zusammenführen ergänzt Spalten über einen Schlüssel (JOIN) ✅
- c) Anfügen ergänzt Spalten, Zusammenführen stapelt Zeilen
- d) Anfügen funktioniert nur bei Datenbankquellen

> **Antwort:** b) Der häufigste Irrtum bei Einsteigern. Anfügen = mehr Zeilen. Zusammenführen = mehr Spalten.

---

**Frage 3:** Warum sollten Datentypen im Power Query-Editor korrigiert werden und nicht nachträglich in der Berichtsansicht?

- a) In der Berichtsansicht ist eine Typänderung gar nicht möglich
- b) Weil falsche Typen beim Laden bereits Berechnungen, Datumshierarchien und Beziehungen blockieren. Im Nachhinein entstehen Folgefehler. ✅
- c) Es gibt keinen Unterschied, wann der Typ korrigiert wird
- d) Die Berichtsansicht korrigiert Typen automatisch

> **Antwort:** b) Beim Laden ins Modell werden Typen fixiert. Falsche Typen später zu korrigieren ist aufwendiger und fehleranfälliger.

---

**Frage 4:** Eine Tabelle hat 5 Regionen als Zeilen und 12 Monate als Spalten. Welche Operation bringt sie in die richtige Form für Power BI?

- a) Pivotieren
- b) Entpivotieren ✅
- c) Anfügen
- d) Zusammenführen

> **Antwort:** b) Entpivotieren wandelt die 12 Monatsspalten in zwei Spalten um: "Monat" und "Umsatz". Das ist die normalisierte Struktur, die DAX und Datenschnitte benötigen.

---

**Frage 5:** Datenprofiling in Power Query basiert standardmäßig auf wie vielen Zeilen?

- a) 100 Zeilen
- b) 500 Zeilen
- c) 1.000 Zeilen ✅
- d) Allen Zeilen der Tabelle

> **Antwort:** c) Standardmäßig werden nur die ersten 1.000 Zeilen profiliert. Für vollständiges Profiling muss in der Statusleiste "Spaltenprofilerstellung basierend auf gesamtem Dataset" aktiviert werden.
