# Trainer-Skript 06b - Power Query: Daten transformieren und kombinieren

> **Themen:** Neue Spalten · Transponieren · Gruppieren · JSON expandieren · Append · Merge · Verweis vs. Duplikat
> **Schüler-Skript:** 06b_power_query_transformieren.md
> **Aufgabenblatt:** aufgaben_06b_power_query_transformieren.md
> **Übungsdaten:** orders.csv, orders_2025.csv, customers.csv, products.csv

---

## Einstieg

**Frage ans Plenum:** In 06a haben wir Daten bereinigt - Fehler korrigiert, Typen gesetzt, Nullwerte behandelt. Was könnte noch fehlen bevor wir einen Bericht bauen?

> **Erwartete Antworten:** Berechnete Werte die nicht in der Quelle stehen. Tabellen die zusammengehören aber getrennt sind. Fehlende Spalten die wir selbst erstellen müssen.
> Genau das ist das Thema dieses Skripts: neue Inhalte erzeugen und Tabellen kombinieren.

**Kerngedanke ansprechen:**
- Bereinigte Daten aus 06a sind der Ausgangspunkt
- Jetzt entstehen neue Spalten aus vorhandenen Feldern
- Und Tabellen werden zusammengeführt oder gestapelt
- Das alles passiert noch in Power Query - bevor das Modell gebaut wird

---

## Block 1 - Neue Spalten erstellen

**Drei Methoden vorstellen - wann welche:**

**Benutzerdefinierte Spalte:**
- Spalte hinzufügen - Benutzerdefinierte Spalte
- M-Formel, Spaltennamen in eckigen Klammern
  *Eckige Klammern sind die M-Syntax für Spaltenverweise. [Listenpreis] bedeutet: nimm den Wert aus der Spalte "Listenpreis" der aktuellen Zeile. Groß- und Kleinschreibung muss exakt stimmen.*
- Demo: Nettopreis = [Listenpreis] * (1 - [Rabatt])

**Bedingte Spalte:**
- Spalte hinzufügen - Bedingte Spalte
- Wenn-Dann-Sonst per Dropdown, kein M-Code nötig
- Demo: Preisklasse aus Listenpreis
  *Bedingte Spalte ist der Power Query-Ersatz für WENN-Formeln in Excel. Man konfiguriert die Bedingungen visuell. Die erste zutreffende Bedingung gewinnt - die Reihenfolge der Klauseln ist deshalb wichtig.*
- Mehrere Bedingungen: Klausel hinzufügen
- Reihenfolge ist entscheidend: erste zutreffende Bedingung gewinnt

**Spalte aus Beispielen:**
- Spalte hinzufügen - Spalte aus Beispielen
- Ein bis zwei Beispielwerte eintippen, Power BI erkennt das Muster
- Gut für komplexe Textoperationen die sich schwer formulieren lassen
  *Beispiel: Aus einer Spalte "Müller, Hans" soll "Hans Müller" werden. Statt die Formel zu kennen, gibt man einfach den ersten gewünschten Wert ein und Power BI leitet die Logik ab.*

**Frage ans Plenum:** Ich möchte eine Spalte "Altersklasse" aus einer Spalte "Alter" erstellen: unter 18 ist "Jugendlich", 18-64 ist "Erwachsen", ab 65 ist "Senior". Welche der drei Methoden nehme ich?

> **Erwartete Antwort:** Bedingte Spalte - klassischer Wenn-Dann-Sonst Fall ohne Code.
> Richtig. Benutzerdefinierte Spalte wäre auch möglich, aber aufwendiger. Bedingte Spalte ist für genau diesen Fall gemacht.

---

## Block 2 - Datenstruktur umformen

**Transponieren erklären:**
- Dreht Zeilen und Spalten komplett um
- Transformieren - Transponieren
  *Transponieren ist wie eine Tabelle um 90 Grad drehen: Was vorher eine Zeile war, ist danach eine Spalte. Was vorher eine Spalte war, ist danach eine Zeile.*
- Wann nötig: wenn Spaltenüberschriften in der ersten Spalte stehen statt in der ersten Zeile
- Danach: Erste Zeile als Überschriften verwenden

**Demo-Szenario erklären:**
- Quelldatei hat Feldnamen in Spalte A untereinander, Werte in Spalte B
- Nach Transponieren: Feldnamen in Zeile 1, Werte darunter
- Dann: Erste Zeile als Überschriften

**Frage ans Plenum:** Was ist der Unterschied zwischen Transponieren und Entpivotieren?

> **Erwartete Antwort:** Transponieren dreht alles um - jede Zeile wird zur Spalte. Entpivotieren normalisiert nur bestimmte Spalten in Zeilen.
> Genau. Transponieren ist ein struktureller Umbau der ganzen Tabelle. Entpivotieren ist eine gezielte Normalisierung von Wertspalten.

**Gruppieren und Aggregieren:**
- Start - Gruppieren nach oder Transformieren - Gruppieren nach
- Entspricht SQL GROUP BY
  *GROUP BY ist ein SQL-Befehl der Zeilen zusammenfasst und aggregiert. Power Query macht dasselbe über die GUI. Statt jede einzelne Bestellung zu sehen, sieht man nur noch eine Zeile pro Tag mit der Summe aller Bestellungen des Tages.*
- Im Dialog: Gruppierungsspalte, Name der Ergebnisspalte, Aggregatfunktion, Quellspalte
- Über "Erweitert": mehrere Aggregationen auf einmal

**Demo: Orders auf Tagesebene aggregieren**
- Gruppieren nach Bestelldatum
- Neue Spalte "Anzahl Bestellungen" - Vorgang: Zeilenanzahl
- Neue Spalte "Tagesumsatz" - Vorgang: Summe - Spalte: berechneter Umsatz

**Wann Groupieren in Power Query sinnvoll ist:**
- Staging-Tabellen mit voraggregierten Daten
- Sehr große Faktentabellen bei denen nur Tagessummen gebraucht werden
- Reduziert Modellgröße erheblich
  *Voraggregation bedeutet: statt 3 Millionen Einzeltransaktionen lädt man nur 1.000 Tagessummen. Das Modell wird kleiner und Abfragen schneller. Die Detailsicht geht verloren, aber die ist oft gar nicht nötig.*

---

## Block 3 - Verschachtelte Daten expandieren

**Überleitung:** Nicht alle Daten kommen als flache Tabelle. JSON und XML aus Webdiensten oder NoSQL-Datenbanken sind verschachtelt.

*Verschachtelt bedeutet: Ein Datensatz enthält weitere Datensätze. Ein Kundendatensatz hat ein Unterobjekt "Adresse" mit Straße, PLZ und Stadt. Power BI lädt das zunächst als eine einzige Spalte vom Typ Record, nicht als drei separate Spalten.*

**Record und List erklären:**
- Record: ein verschachteltes Objekt mit benannten Feldern
  *Record ist wie eine kleine Tabelle innerhalb einer Zelle. Man sieht in der Vorschau das Wort "Record" stehen statt eines Werts. Um die Felder als eigene Spalten zu sehen, muss man expandieren.*
- List: eine Liste von Werten oder Records

**Demo: Record expandieren**
- Erweiterungs-Symbol in der Spaltenüberschrift klicken (zwei gegenläufige Pfeile)
- Gewünschte Felder auswählen
- Kontrollkästchen "Ursprünglichen Spaltennamen als Präfix verwenden" deaktivieren
  *Das Präfix ist der Name der übergeordneten Spalte der automatisch vor jeden neuen Spaltennamen gesetzt wird. Aus "Adresse.Straße" wird "Straße" wenn man das Kontrollkästchen deaktiviert. Sauberere Spaltennamen.*

**Wichtige Warnung:**
- Expandieren bricht Query Folding ab
  *Query Folding bedeutet: Power BI übersetzt Transformationen in SQL und schickt sie an die Datenbank. Nach dem Expandieren ist das nicht mehr möglich, weil SQL keine verschachtelten Strukturen kennt. Alle Schritte danach werden lokal in Power BI verarbeitet.*
- Alle Transformationen danach laufen lokal in Power BI, nicht auf dem Quellserver

---

## Block 4 - Abfragen kombinieren: Append und Merge

**Frage ans Plenum:** Was ist der Unterschied zwischen "mehr Zeilen" und "mehr Spalten"?

> **Erwartete Antwort:** Mehr Zeilen = mehr Datensätze. Mehr Spalten = mehr Informationen pro Datensatz.
> Genau. Append fügt mehr Zeilen hinzu. Merge fügt mehr Spalten hinzu. Das ist der fundamentale Unterschied.

**Append - Abfragen anfügen:**
- Zeilen stapeln - entspricht SQL UNION ALL
  *UNION ALL ist ein SQL-Befehl der zwei Abfragen vertikal verbindet: alle Zeilen der ersten Tabelle, dann alle Zeilen der zweiten. Gleiche Spaltenstruktur Voraussetzung.*
- Start - Abfragen anfügen - Abfragen als neu anfügen
- Demo: orders.csv + orders_2025.csv = 3.500 Zeilen
- Spaltenüberschriften müssen übereinstimmen - sonst NULL in nicht übereinstimmenden Spalten
- Ergebnis ist eine neue Abfrage

**Praxistipp:**
- Ursprungsabfragen danach mit "Laden deaktivieren" aus dem Modell nehmen
  *Laden deaktivieren heißt: Die Abfrage bleibt als Grundlage erhalten, wird aber nicht ins Modell geladen. Das vermeidet doppelte Daten: die Einzeltabellen und die kombinierte Tabelle wären sonst alle im Modell.*
- Nur die kombinierte Abfrage lädt ins Modell

**Merge - Abfragen zusammenführen:**
- Spalten aus zweiter Tabelle ergänzen über Schlüssel - entspricht SQL JOIN
  *JOIN verbindet zwei Tabellen horizontal über einen gemeinsamen Schlüssel. Die KundenID in der Bestelltabelle verweist auf die KundenID in der Kundentabelle - Merge fügt die Kundendaten als neue Spalten zur Bestelltabelle hinzu.*
- Start - Abfragen zusammenführen - Als neue Abfrage zusammenführen
- Schlüsselspalte in beiden Tabellen anklicken
- Join-Typ wählen
- Ergebnis enthält neue Spalte vom Typ "Table" - muss expandiert werden

**Die drei prüfungsrelevanten Join-Typen erklären:**

*Join-Typ bestimmt was mit Zeilen passiert, die keinen Partner in der anderen Tabelle haben.*

- **Linker äußerer Join**: Alle Zeilen der ersten Tabelle bleiben, nur passende der zweiten kommen dazu. Keine Übereinstimmung = NULL.
  *Das ist der häufigste Join-Typ. Alle Bestellungen bleiben erhalten, auch die bei denen kein Kundendatensatz vorhanden ist. Der fehlende Kundendatensatz wird als NULL angezeigt.*

- **Innerer Join**: Nur Zeilen die in beiden Tabellen einen passenden Schlüssel haben. Nicht passende Zeilen fallen raus.
  *Innerer Join ist der restriktivste: Nur Bestellungen mit einem gültigen Kunden bleiben. Bestellungen ohne Kundendatensatz verschwinden.*

- **Vollständiger äußerer Join**: Alle Zeilen beider Tabellen. Nicht übereinstimmende Seiten erhalten NULL.
  *Vollständiger Join behält alles von beiden Seiten. Nützlich wenn man wissen will welche Datensätze keinen Match haben.*

**Frage ans Plenum:** Ich merge Orders und Customers über CustomerID mit einem linken äußeren Join. Orders hat 3.000 Zeilen, Customers hat 400. Wie viele Zeilen hat das Ergebnis mindestens?

> **Erwartete Antwort:** 3.000 - weil der linke äußere Join alle Zeilen der linken Tabelle (Orders) behält.
> Richtig. Das Ergebnis hat genau 3.000 Zeilen. Die Kundendaten kommen als neue Spalten dazu.

---

## Block 5 - Verweis und Duplikat

**Überleitung:** Wir haben mehrere Abfragen. Wie entstehen neue Abfragen aus bestehenden ohne Daten doppelt zu laden?

**Verweis (Reference):**
- Rechtsklick auf Abfrage - Verweis
- Neue Abfrage baut auf der bestehenden auf - startet dort wo die Quelle endet
- Änderungen an der Quellabfrage wirken sich automatisch auf den Verweis aus
  *Verweis ist wie eine Verknüpfung. Wenn die Quelldatei neue Zeilen bekommt, bekommt der Verweis sie automatisch auch. Wenn man in der Quellabfrage einen Schritt ändert, ändert sich auch das was der Verweis sieht.*
- Typischer Einsatz: eine Staging-Abfrage bereinigt Rohdaten, mehrere Abfragen bauen darauf auf

**Duplikat (Duplicate):**
- Rechtsklick auf Abfrage - Duplizieren
- Vollständige Kopie aller Schritte, unabhängig von der Quelle
- Änderungen an einer Abfrage wirken sich nicht auf die andere aus
  *Duplikat ist eine echte Kopie - danach sind beide unabhängig. Gut für Experimente: man arbeitet an der Kopie, die Original bleibt unberührt.*
- Typischer Einsatz: Experimentieren ohne das Original zu gefährden

**Praxisbeispiel Staging-Muster erklären:**
- Eine Abfrage lädt und bereinigt die rohe orders.csv
- Darauf basieren zwei Verweise: einer für die tägliche Aggregation, einer für die Detailansicht
- Wenn die Quelldatei sich ändert, aktualisieren sich beide automatisch
  *Staging bedeutet: eine Zwischenstufe einbauen. Die Rohquelle lädt man einmal und bereinigt sie. Alle weiteren Abfragen bauen auf dieser sauberen Grundlage auf, ohne die Rohquelle nochmal zu laden.*

**Frage ans Plenum:** Ich möchte eine Abfrage ausprobieren aber das Original behalten. Verweis oder Duplikat?

> **Erwartete Antwort:** Duplikat - weil ich eine unabhängige Kopie will.
> Richtig. Verweis wäre falsch: Wenn man am Verweis Schritte hinzufügt, bleibt das Original zwar unverändert, aber eine Änderung am Original würde den Verweis beeinflussen.

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Neue Spalten: Benutzerdefiniert (Formel), Bedingt (Wenn-Dann ohne Code), Aus Beispielen (Mustererkennung)
- Transponieren: gesamte Tabelle drehen wenn Struktur kopfüber ist
- Gruppieren: Zeilen zusammenfassen wie SQL GROUP BY
- JSON/XML expandieren: Record und List aufklappen, Präfix deaktivieren
- Append: Zeilen stapeln (UNION ALL), gleiche Spaltenstruktur nötig
- Merge: Spalten ergänzen über Schlüssel (JOIN), linker äußerer/innerer/vollständiger Join
- Verweis: verbundene neue Abfrage, aktualisiert sich mit der Quelle
- Duplikat: unabhängige Kopie für Experimente

**Übergang zu Skript 06c:**
"Wir haben jetzt alle Transformationen per Klick durchgeführt. Im nächsten Skript schauen wir hinter die Kulissen: Was ist eigentlich M-Code, wie liest man ihn, und wo kann man direkt im Code Anpassungen vornehmen die über die GUI nicht möglich sind?"

---

## Mini-Quiz

---

**Frage 1:** Ich möchte Bestellungen nach Monat zusammenfassen und den Gesamtumsatz pro Monat berechnen. Welche Operation verwende ich in Power Query?

- a) Entpivotieren
- b) Merge
- c) Gruppieren nach (richtig)
- d) Benutzerdefinierte Spalte

> **Antwort:** c) Gruppieren nach fasst Zeilen nach einer oder mehreren Spalten zusammen und aggregiert numerische Werte. Das entspricht SQL GROUP BY.

---

**Frage 2:** Was ist der Unterschied zwischen Append und Merge?

- a) Append fügt Spalten hinzu, Merge fügt Zeilen hinzu
- b) Append stapelt Zeilen (UNION ALL), Merge ergänzt Spalten über einen Schlüssel (JOIN) (richtig)
- c) Append funktioniert nur bei identischen Tabellen, Merge bei beliebigen
- d) Es gibt keinen inhaltlichen Unterschied, nur unterschiedliche Dialoge

> **Antwort:** b) Der häufigste Irrtum bei Einsteigern. Append = mehr Zeilen. Merge = mehr Spalten.

---

**Frage 3:** Ich merge Orders (3.000 Zeilen) und Customers (400 Zeilen) mit einem inneren Join über CustomerID. Wie viele Zeilen hat das Ergebnis höchstens?

- a) 3.400 (beide Tabellen summiert)
- b) 400 (kleinere Tabelle)
- c) 3.000 (größere Tabelle)
- d) Maximal 3.000, aber möglicherweise weniger - nur Zeilen mit Match in beiden Tabellen (richtig)

> **Antwort:** d) Innerer Join gibt nur Zeilen zurück die in beiden Tabellen einen passenden Schlüssel haben. Bestellungen ohne gültigen Kunden fallen raus. Das Ergebnis hat maximal 3.000 Zeilen, könnte aber weniger sein.

---

**Frage 4:** Was ist der Unterschied zwischen Verweis und Duplikat?

- a) Verweis ist schneller, Duplikat ist genauer
- b) Verweis ist verbunden mit der Quellabfrage und aktualisiert sich mit ihr. Duplikat ist eine unabhängige Kopie. (richtig)
- c) Verweis kann nur gelesen werden, Duplikat kann bearbeitet werden
- d) Es gibt keinen technischen Unterschied, nur einen optischen

> **Antwort:** b) Verweis für Staging-Muster: Änderungen an der Quelle propagieren automatisch. Duplikat für Experimente: Änderungen bleiben isoliert.

---

**Frage 5:** Eine bedingte Spalte hat drei Klauseln: unter 200 = "Niedrig", unter 500 = "Mittel", sonst = "Hoch". Ein Produkt hat den Preis 150. Welcher Wert wird zugewiesen?

- a) "Niedrig" (richtig)
- b) "Mittel", weil 150 auch kleiner als 500 ist
- c) "Hoch", weil Power BI die restriktivste Bedingung wählt
- d) Fehler, weil mehrere Bedingungen zutreffen

> **Antwort:** a) Die erste zutreffende Bedingung gewinnt. 150 < 200 trifft als erstes zu, also "Niedrig". Die zweite Bedingung wird nicht mehr geprüft.
