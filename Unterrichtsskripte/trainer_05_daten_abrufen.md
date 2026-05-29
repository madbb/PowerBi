# Trainer-Skript 05 - Daten in Power BI abrufen

> **Themen:** Dateiquellen · Datenbankverbindungen · Parameter · NoSQL · Speichermodi · Query Folding · Fehlerbehandlung
> **Schüler-Skript:** 05_daten_abrufen.md
> **Übungsdaten:** customers.csv, orders.csv, products.csv, salesreps.csv, MariaDB (techtrade)

---

## Einstieg

**Frage ans Plenum:** Wo liegen in einem typischen Unternehmen die Daten, die ihr für einen Bericht braucht?

- Antworten sammeln: Excel auf dem Desktop, Datenbank, SharePoint, Cloud-System, ERP
- Überleitung: Genau das ist die Realität. Daten liegen nie an einem Ort. Power BI kann mit fast allem verbinden.

**Kerngedanke ansprechen:**
- Der erste Schritt jedes Berichts ist die Verbindung zur Datenquelle
- Die Entscheidungen, die man hier trifft, haben direkte Auswirkung auf Leistung, Aktualität und Wartungsaufwand
- Heute lernen wir die wichtigsten Quellentypen und was es dabei zu beachten gibt

---

## Block 1 - Daten aus Dateien abrufen

**Live-Demo: customers.csv laden**
- Start → Daten abrufen → Text/CSV
- customers.csv auswählen, Navigator zeigen
- Unterschied zwischen "Laden" und "Daten transformieren" erklären

**Speicherorte ansprechen:**

- **Lokal**: Datei wird einmalig importiert, kein persistenter Link. Originaldatei ändert sich, Modell merkt es nicht.
- **OneDrive for Business**: Power BI synchronisiert automatisch bei Änderungen
- **OneDrive Persönlich**: Wie Business, aber persönliche Anmeldung nötig, Organisationsrichtlinien prüfen
- **SharePoint Teamwebsite**: Wie OneDrive for Business, Verbindung über URL

**Frage ans Plenum:** Ihr habt eine Excel-Datei lokal gespeichert und als Quelle in Power BI eingebunden. Euer Kollege aktualisiert die Datei. Was passiert im Bericht?

> **Erwartete Antwort:** Nichts. Lokale Dateien haben keinen persistenten Link. Der Bericht zeigt den Stand zum Zeitpunkt des letzten Imports.
> => Deshalb sind Cloud-Speicher die bessere Wahl wenn Daten sich regelmäßig ändern.

**Quelldateipfad ändern kurz ansprechen:**
- Datei verschoben oder umbenannt: Verbindung bricht
- Drei Wege zur Korrektur: Datenquelleneinstellungen, Abfrageeinstellungen, Erweiterter Editor
- Wichtig: Spaltenstruktur der neuen Datei muss identisch sein, sonst Fehler im Modell

---

## Block 2 - Daten aus relationalen Datenbanken abrufen

**Überleitung:** CSVs sind gut für den Einstieg. In der Praxis kommen die meisten Daten aber aus Datenbanken.

**Live-Demo: MariaDB verbinden**
- Start → Daten abrufen → MySQL-Datenbank
- Servername und Datenbankname eingeben
- Authentifizierungsmethoden zeigen: Windows, Datenbank, Microsoft-Konto
- Navigator öffnen, Tabellen zeigen

**SQL-Abfragen beim Import:**
- Erweiterte Optionen beim Verbinden: SQL-Anweisung direkt eingeben
- Demo: SELECT mit expliziten Spalten statt SELECT *

**Frage ans Plenum:** Warum sollte man SELECT * beim Import in Power BI vermeiden?

> **Erwartete Antworten:** Lädt alle Spalten, auch die man nicht braucht. Mehr Daten = größeres Modell, langsamere Abfragen, höherer Wartungsaufwand.
> => Explizite Spaltenauswahl ist immer besser.

**Best Practices für SQL-Abfragen:**
- Immer nur benötigte Spalten angeben
- WHERE-Klausel nutzen um Zeilen zu filtern
- Noch besser: Abfrage in einer Datenbankansicht (View) kapseln
- Demo: v_orders_abgeschlossen aufrufen statt rohe orders-Tabelle

**Warum Views besser sind:**
- Power BI kann Query Folding nutzen (dazu gleich mehr)
- Logik liegt in der Datenbank, nicht in Power Query
- Einfacher zu warten und zu testen

**Verbindungseinstellungen nachträglich ändern:**
- Start → Daten transformieren → Datenquelleneinstellungen
- Beispiel: Passwort abgelaufen, neues Passwort hinterlegen

---

## Block 3 - Parameter für dynamische Berichte

**Überleitung:** Was wenn verschiedene Nutzer denselben Bericht mit unterschiedlichen Filtern brauchen? Parameter sind die Antwort.

**Konzept erklären:**
- Parameter erlauben es, Werte zur Laufzeit zu ändern ohne den Bericht neu zu bauen
- Typischer Fall: Region, Zeitraum, Kundensegment als Parameter

**Einzelwert-Parameter - Schritt für Schritt:**
1. Verbindung zur DB, SQL-Abfrage mit festem Wert (z.B. Region = 'Nord')
2. Power Query-Editor: Start → Parameter verwalten → Neuer Parameter
3. Name, Typ (Text), Vorgeschlagenen Wert festlegen
4. Erweiterter Editor: festen Wert durch `& ParameterName` ersetzen
5. Parameter bearbeiten: Wert ändern, Bericht filtert entsprechend

**Frage ans Plenum:** Wann macht ein Parameter mehr Sinn als ein normaler Datenschnitt im Bericht?

> **Erwartete Antwort:** Wenn man die Datenmenge beim Laden begrenzen will, nicht nur die Anzeige. Ein Datenschnitt filtert nur die Darstellung, ein Parameter filtert was tatsächlich geladen wird.
> => Bei großen Datenmengen ist das ein erheblicher Leistungsunterschied.

**Mehrwert-Parameter kurz ansprechen:**
- Excel-Tabelle mit Wertespalte als zweite Quelle laden
- Aus parametrisierter Abfrage eine benutzerdefinierte Funktion erstellen
- Funktion für jeden Wert in der Werteliste aufrufen
- Ursprungsabfrage vom Laden deaktivieren

---

## Block 4 - NoSQL und Online-Dienste

**Überleitung:** Nicht alle Daten liegen in relationalen Datenbanken. Kurzer Überblick über weitere Quellentypen.

**NoSQL - Azure Cosmos DB:**
- Speichert Daten als JSON-Dokumente, kein festes Schema
- Verbindung über Daten abrufen → Weitere → Azure → Azure Cosmos DB
- Endpunkt-URL und Primärschlüssel aus dem Azure-Portal
- Daten kommen als verschachtelte Record-Elemente an
- Erweiterungs-Schaltfläche nutzen um Felder zu extrahieren
- Präfix-Kontrollkästchen deaktivieren für saubere Spaltennamen

**Online-Dienste kurz zeigen:**
- Daten abrufen → Onlinedienste
- SharePoint Online-Liste als Beispiel: URL der Website eingeben, nicht der Datei
- Microsoft-Konto zur Authentifizierung

**Frage ans Plenum:** Was ist der Unterschied zwischen JSON-Daten aus Cosmos DB und einer CSV-Datei in Power BI?

> **Erwartete Antwort:** CSV ist flach und direkt als Tabelle lesbar. JSON ist verschachtelt und muss erst expandiert werden bevor es als Tabelle nutzbar ist.
> => Das Expandieren in Power Query ist der entscheidende Schritt bei JSON-Quellen.

---

## Block 5 - Speichermodi

**Überleitung:** Wir haben jetzt Daten aus verschiedenen Quellen geladen. Bevor wir das Modell bauen, eine wichtige Entscheidung: Wie soll Power BI auf die Daten zugreifen?

**Drei Modi erklären:**

- **Import** (Standard): Lokale Kopie der Daten wird in der Power BI-Datei gespeichert. Alle Features verfügbar. Aktualisierung geplant oder manuell. Beste Abfrageleistung.
- **DirectQuery**: Keine lokale Kopie. Jede Visualisierung sendet eine Live-Abfrage an die Quelle. Daten immer aktuell. Eingeschränkte Features.
- **Dual**: Tabelle kann je nach Kontext importiert oder per DirectQuery abgerufen werden. Power BI wählt automatisch. Teil zusammengesetzter Modelle.

**Frage ans Plenum:** Ein Unternehmen hat ein Data Warehouse mit 500 Millionen Zeilen Transaktionsdaten. Import oder DirectQuery?

> **Erwartete Antwort:** DirectQuery. Die Datenmenge macht einen vollständigen Import unpraktisch, sowohl zeitlich als auch von der Modellgröße her.
> => Import ist der Standard. DirectQuery ist die Ausnahme bei sehr großen Datenmengen, Echtzeit-Anforderungen oder Datenhoheitspflichten.

**Wann welchen Modus:**
- Import: Standardfall, beste Leistung, volle Feature-Unterstützung
- DirectQuery: Sehr große Daten, Quasi-Echtzeit, Sicherheitsrichtlinien gegen lokale Kopien
- Dual: Nur im Kontext zusammengesetzter Modelle (mehr dazu in Skript 07)

---

## Block 6 - Query Folding und Leistung

**Überleitung:** Eine der wichtigsten Optimierungen beim Datenabruf, die kaum jemand kennt: Query Folding.

**Query Folding erklären:**
- Power Query-Transformationen werden normalerweise lokal in Power BI ausgeführt
- Query Folding bedeutet: Power BI übersetzt die Transformationen in eine native SQL-Abfrage und schickt sie an die Datenbank
- Die Datenbank führt die Arbeit aus, nicht der lokale Rechner

**Warum das wichtig ist:**
- Datenbankserver sind dafür optimiert, große Mengen zu verarbeiten
- Power BI muss weniger Daten lokal verarbeiten
- Schnellere Aktualisierungen, bessere Leistung

**Demo: Query Folding prüfen**
- Im Power Query-Editor: Rechtsklick auf den letzten angewendeten Schritt
- "Native Abfrage anzeigen" ist fett und auswählbar: Query Folding aktiv
- Option ausgegraut: kein Folding, Verarbeitung lokal

**Was Query Folding verhindert:**
- Indexspalten hinzufügen
- Tabellen aus unterschiedlichen Quellen zusammenführen
- Datentyp einer Spalte ändern

**Faustregel:**
- Lässt sich die Transformation als SQL mit GROUP BY, WHERE, JOIN, UNION ALL oder SORT BY schreiben, ist Folding möglich

**Weitere Optimierungen kurz ansprechen:**
- Transformationen so weit wie möglich in der Datenbank erledigen
- Bei DirectQuery keine gespeicherten Prozeduren oder CTEs
- Datetime-Spalten vor dem Import in Datum und Uhrzeit aufteilen

---

## Block 7 - Datenimportfehler lösen

**Überleitung:** Verbindungen brechen manchmal. Die häufigsten Fehler und ihre Lösungen kennen.

**Die fünf häufigsten Fehler durchgehen:**

- **Abfragetimeout abgelaufen**: Zu viele Daten auf einmal. Lösung: weniger Spalten/Zeilen, Abfrage aufteilen.
- **Timeout abgelaufen (Power BI)**: Organisationsrichtlinie überschritten. Lösung: Abfrage vereinfachen, aggregieren, aufteilen.
- **Keine als Tabelle formatierten Daten gefunden**: Excel-Daten nicht als formale Tabelle definiert. Lösung: In Excel markieren, Strg+T, als Tabelle formatieren.
- **Datei wurde nicht gefunden**: Pfad geändert oder Berechtigung entzogen. Lösung: Abfrageeinstellungen, Zahnrad bei "Quelle", neuen Pfad angeben.
- **Datentypfehler / leere Spalten**: Power BI interpretiert Datentyp falsch. Lösung: Expliziten Cast in der SQL-Abfrage, z.B. `CAST(Spalte AS varchar(10))`.

**Frage ans Plenum:** Ihr bekommt den Fehler "Datei wurde nicht gefunden". Was sind die zwei wahrscheinlichsten Ursachen?

> **Erwartete Antworten:** Datei wurde verschoben oder umbenannt. Oder: Zugriffsrechte wurden entzogen.
> => Beides lässt sich in den Abfrageeinstellungen lösen ohne die Abfrage neu aufzubauen.

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Dateiquellen: Excel, CSV, XML, JSON. Cloud-Speicher für automatische Synchronisation bevorzugen.
- Datenbankverbindung: Servername, Datenbankname, Authentifizierung. Immer explizite Spalten, WHERE-Klauseln, Views nutzen.
- Parameter: Werte zur Laufzeit ändern ohne neuen Bericht. Einzelwert einfach, Mehrwert über benutzerdefinierte Funktion.
- Speichermodi: Import ist der Standard. DirectQuery für große Daten und Echtzeit.
- Query Folding: Transformationen werden als SQL an die DB zurückgegeben. Prüfen per Rechtsklick auf Schritt.
- Fehler: Timeout, Datei nicht gefunden, Datentypfehler. Alle behebbar ohne die Abfrage neu aufzubauen.

**Übergang zu Skript 06:**
> "Wir haben jetzt Daten in Power BI geladen. Im nächsten Skript schauen wir uns an, was passiert wenn die Daten nicht sauber sind, und wie wir sie mit dem Power Query-Editor bereinigen und in die richtige Form bringen."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren. Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Welcher Speicherort ermöglicht automatische Synchronisation wenn sich die Quelldatei ändert?

- a) Lokaler Dateipfad (C:\...)
- b) OneDrive for Business ✅
- c) USB-Stick
- d) Netzlaufwerk (\\server\...)

> **Antwort:** b) OneDrive for Business synchronisiert Modell, Berichte und Dashboards automatisch bei Änderungen an der Quelldatei.

---

**Frage 2:** Warum sollte SELECT * beim Import aus einer Datenbank vermieden werden?

- a) Power BI unterstützt SELECT * nicht
- b) Es lädt alle Spalten, auch nicht benötigte, was das Modell aufbläht und die Leistung verschlechtert ✅
- c) SELECT * funktioniert nur mit DirectQuery
- d) Es gibt keine Nachteile, SELECT * ist schneller

> **Antwort:** b) Unnötige Spalten vergrößern das Modell, verlangsamen Abfragen und erhöhen den Wartungsaufwand.

---

**Frage 3:** Wie prüft man im Power Query-Editor ob Query Folding für einen Schritt aktiv ist?

- a) Über Start → Query Folding aktivieren
- b) In den Modelleinstellungen unter Leistung
- c) Rechtsklick auf den Schritt in den angewendeten Schritten. Ist "Native Abfrage anzeigen" fett und auswählbar, ist Folding aktiv. ✅
- d) Query Folding ist immer automatisch aktiv

> **Antwort:** c) Ist die Option ausgegraut, findet kein Folding statt und die Transformation wird lokal in Power BI ausgeführt.

---

**Frage 4:** Wann ist DirectQuery dem Import-Modus vorzuziehen?

- a) Immer, weil DirectQuery schneller ist
- b) Bei sehr großen Datenmengen, Quasi-Echtzeit-Anforderungen oder Sicherheitsrichtlinien gegen lokale Datenkopien ✅
- c) Nur bei Excel-Dateien
- d) DirectQuery sollte nie verwendet werden

> **Antwort:** b) Import ist der Standard und liefert bessere Abfrageleistung. DirectQuery ist die Ausnahme für spezifische Anforderungen.

---

**Frage 5:** Welche Lösung ist korrekt wenn Power BI den Fehler "Datei wurde nicht gefunden" meldet?

- a) Die gesamte Verbindung löschen und neu aufbauen
- b) Power BI Desktop neu installieren
- c) In den Abfrageeinstellungen auf das Zahnrad bei "Quelle" klicken und den neuen Pfad angeben ✅
- d) Die Datei zurück an den ursprünglichen Speicherort kopieren ist die einzige Möglichkeit

> **Antwort:** c) Der Pfad lässt sich direkt in den Abfrageeinstellungen korrigieren, ohne die Abfrage neu aufzubauen.
