# Trainer-Skript 07 - Das richtige Modellframework wählen

> **Themen:** Analyseabfrage · Sternschema · Importmodell · DirectQuery · Zusammengesetztes Modell · Entscheidungsregel
> **Schüler-Skript:** 07_modellframework.md
> **Hinweis:** Kein Live-Demo-Schwerpunkt. Konzeptuelles Skript mit Diskussion und Entscheidungsszenarien.

---

## Einstieg

**Frage ans Plenum:** Ihr sollt einen Bericht für ein Unternehmen mit 500 Millionen Transaktionen im Data Warehouse bauen. Was würdet ihr machen: alles in Power BI laden oder direkt abfragen?

- Antworten sammeln, Begründungen hören
- Noch keine Lösung nennen. Das ist die Frage, die dieses Skript beantwortet.

**Kerngedanke ansprechen:**
- Die Wahl des Modellframeworks ist eine der grundlegendsten Entwurfsentscheidungen in Power BI
- Sie bestimmt Leistung, Aktualität und was überhaupt möglich ist
- Die meisten Projekte brauchen Import. Aber wer die Alternativen nicht kennt, trifft keine informierte Entscheidung.
- Und: Von Import zu DirectQuery kommt man nicht mehr zurück.

---

## Block 1 - Modellgrundlagen

**Semantisches Modell erklären:**
- Zentrales Konzept: Das Power BI-Datenmodell ist eine für Analysen optimierte, abfragbare Datenressource
- Power BI-Berichte fragen es über DAX ab
- Paginierte Berichte und "In Excel analysieren" verwenden MDX
- Im Power BI-Dienst heißt es Dataset (veraltet) oder semantisches Modell

**Kurze Abgrenzung:**
- Nicht alle Datasets entstehen in Power BI Desktop
- Azure Analysis Services (AAS) und SQL Server Analysis Services (SSAS) können als externe Modelle dienen
- Dieses Skript behandelt ausschließlich Modelle, die in Power BI Desktop gebaut werden

**Die drei Phasen jeder Analyseabfrage erklären:**

Jedes Mal wenn ein Visual gerendert wird, sendet Power BI intern eine Abfrage. Immer in dieser Reihenfolge:

1. **Filtern**: Schränkt die Datenmenge ein. Filterwerte erscheinen nicht im Ergebnis. Quellen: Datenschnitte, Berichtsfilter, RLS, Measures.
2. **Gruppieren**: Teilt das Ergebnis in sichtbare Gruppen. Jede Gruppe ist selbst ein Filter, dessen Wert im Ergebnis erscheint.
3. **Zusammenfassen**: Erzeugt einen Wert je Gruppe. Summe, Anzahl, Minimum, Maximum oder komplexes DAX-Measure.

**Konkretes Beispiel durchgehen:**
- Säulendiagramm: vierteljährliche Umsätze für 2021
- Datenschnitt Jahr = 2021: filtert
- Säulendiagramm nach Quartal: gruppiert
- Säulenhöhe = Umsatz: zusammengefasst

**Frage ans Plenum:** In welcher Phase steckt ein Datenschnitt? In welcher Phase steckt die Höhe eines Balkens?

> **Erwartete Antwort:** Datenschnitt = Filtern. Balkenhöhe = Zusammenfassen (nach Gruppieren nach Quartal).
> => Wer das versteht, versteht auch warum Dimensionstabellen für Filter/Gruppen zuständig sind und Faktentabellen für die Zahlen.

---

## Block 2 - Sternschema und Speichermodus

**Sternschema kurz wiederholen:**
- Bereits in Skript 04 (Copilot) und Skript 05 angesprochen. Hier vertiefen.
- **Dimensionstabellen**: Beschreiben Entitäten. Kunden, Produkte, Datum, Region. Werden gefiltert oder gruppiert.
- **Faktentabellen**: Speichern Ereignisse und Transaktionen. Orders, Umsätze, Messungen. Werden zusammengefasst.
- Faktentabelle im Zentrum, Dimensionen als Zacken

**Unsere Übungsdaten einordnen:**
- Faktentabelle: orders (Transaktionen)
- Dimensionen: customers, products, salesreps

**Speichermodus als Eigenschaft jeder Tabelle:**
- Jede Tabelle im Modell hat eine Speichermoduseigenschaft
- Die Kombination aller Tabellen bestimmt das Framework

**Tabelle kurz zeigen:**
- Import: Daten im Modell gespeichert
- DirectQuery: Abfragen live an die Quelle
- Dual: Power BI wählt je nach Kontext automatisch

**Quellgruppe erklären:**
- Import- oder DirectQuery-Modell: genau eine Quellgruppe
- Zusammengesetztes Modell: mehr als eine Quellgruppe
- Beziehungen zwischen verschiedenen Quellgruppen sind eingeschränkte Beziehungen

**Frage ans Plenum:** Wir haben customers aus einer CSV und orders aus der Datenbank. Wie viele Quellgruppen hat unser Modell?

> **Erwartete Antwort:** Zwei. CSV ist eine Quelle, MariaDB ist eine andere. Das macht es automatisch zu einem zusammengesetzten Modell.
> => Das passiert in der Praxis ständig ohne dass man es bewusst so plant.

---

## Block 3 - Das Importmodell

**Importmodell vorstellen:**
- Standard. Der häufigste Fall. Bei einem neuen Projekt immer der Ausgangspunkt.
- Alle Tabellen haben Speichermodus Import
- Daten werden lokal im Arbeitsspeicher gehalten, für Analyseabfragen optimiert

**Vorteile:**
- Beste Abfrageleistung von allen drei Frameworks
- Unterstützt alle Datenquellentypen
- Volle DAX- und M-Unterstützung
- Berechnete Tabellen möglich
- Daten aus verschiedenen Quellen kombinierbar

**Einschränkung 1: Modellgröße**
- Freigegebene Kapazität: 1 GB komprimiert
- Premium: über 10 GB mit Large Dataset Storage Format

**Methoden zur Datenreduktion (kurz durchgehen):**
- Unnötige Spalten und Zeilen früh entfernen (Power Query)
- Faktentabellen auf höherem Aggregationsniveau speichern (täglich statt transaktional)
- Numerische Datentypen bevorzugen
- Berechnungen in Power Query statt als berechnete Spalten im Modell
- Laden für Staging-Abfragen deaktivieren
- Automatische Datum-/Uhrzeiteinstellung deaktivieren

**Einschränkung 2: Datenaktualisierung**
- Importierte Daten sind nur so aktuell wie die letzte Aktualisierung
- Freigegebene Kapazität: max. 8x täglich
- Premium: max. 48x täglich
- Standard: bei jeder Aktualisierung alles löschen und neu laden

**Inkrementelle Aktualisierung kurz ansprechen:**
- Legt Tabellenpartitionen nach Zeitraum an
- Nur geänderte Partitionen werden aktualisiert
- Löst das Problem bei großen Faktentabellen

**Frage ans Plenum:** Ein Unternehmen braucht Berichte die immer den aktuellen Stundenstand zeigen. Import oder was anderes?

> **Erwartete Antwort:** Bei 8 Aktualisierungen pro Tag im freien Plan ist das nicht machbar. Entweder Premium mit 48x täglich, oder DirectQuery, oder Hybridtabelle.
> => Das sind echte Architekturentscheidungen die im Projektalltag anfallen.

---

## Block 4 - Das DirectQuery-Modell

**DirectQuery vorstellen:**
- Keine lokale Datenkopie. Jedes Visual sendet eine Live-Abfrage an die Quelle.
- Alle Tabellen haben Speichermodus DirectQuery, alle aus derselben Quellgruppe

**Wann DirectQuery sinnvoll ist:**
- Sehr große Datenmengen (Data Warehouse mit Milliarden Zeilen)
- Quasi-Echtzeit-Anforderungen ohne Aktualisierungsaufwand
- Sicherheitsrichtlinien verbieten lokale Datenkopien
- Bestehende Power BI-Datasets oder AAS-Modelle erweitern

**Einschränkungen klar benennen:**
- Nicht alle Datenquellen unterstützt, hauptsächlich große relationale Datenbanken
- Nicht alle M-Transformationen möglich: Pivot, Unpivot und viele andere nicht verfügbar
- Abfrageleistung abhängig von der Quelldatenbank, kann langsam sein
- Jede Visualisierung belastet das Quellsystem. Auch OLTP-Vorgänge können verlangsamt werden.

**Leistung verbessern:**
- Indizes und materialisierte Views in der Quelldatenbank anlegen
- Ressourcen für Analyse-Workload einplanen
- Immer mit dem Datenbankbesitzer abstimmen

**Frage ans Plenum:** Ein Kollege schlägt vor, alle Power BI-Berichte auf DirectQuery umzustellen damit die Daten immer aktuell sind. Was spricht dagegen?

> **Erwartete Antworten:** Jede Visualisierung ist eine Live-Abfrage, das belastet den Server. M-Transformationen sind eingeschränkt. Nicht alle Quellen werden unterstützt. Leistung kann schlecht sein wenn die DB nicht optimiert ist.
> => DirectQuery ist keine universelle Lösung. Import ist schneller und flexibler. DirectQuery für spezifische Anforderungen.

---

## Block 5 - Das zusammengesetzte Modell

**Zusammengesetztes Modell vorstellen:**
- Mehr als eine Quellgruppe: Import und DirectQuery kombiniert
- Entsteht automatisch wenn Tabellen aus verschiedenen Quellen gemischt werden

**Drei Anwendungsfälle:**

**1. DirectQuery-Leistung steigern:**
- Große Faktentabelle per DirectQuery
- Importierte Aggregationstabelle beantwortet häufige High-Level-Abfragen aus dem Cache
- Dimensionstabellen auf Dual setzen: Power BI wählt automatisch den schnelleren Weg

**2. Importmodell mit Echtzeitdaten (Hybridtabelle):**
- Ältere Daten als Importpartitionen im Cache
- Aktueller Zeitraum per DirectQuery aus der Quelle
- Erfordert Premium-Lizenz

**3. Bestehendes Dataset erweitern:**
- Bestehendes Power BI-Dataset als Basis verwenden
- Neue Tabellen, Spalten oder Measures hinzufügen
- Bis zu drei Modelle verkettbar

**Einschränkungen:**
- Importierte Tabellen müssen weiterhin aktualisiert werden
- Abfragen die Import und DirectQuery kombinieren können langsam sein
- Eingeschränkte Beziehungen zwischen verschiedenen Quellgruppen: keine garantierte 1-Seite, abweichende Berechnungsergebnisse möglich
- Modellverkettung: Änderungen am Upstream-Modell können Downstream-Modelle beschädigen. Immer Dataset-Auswirkungsanalyse durchführen.

**Dual-Speichermodus erklären:**
- Tabelle kann je nach Kontext aus Cache oder per DirectQuery bedient werden
- Power BI wählt automatisch
- Datenschnitte auf Dual-Dimensionstabellen werden deutlich schneller gerendert

**Frage ans Plenum:** Wir haben ein DirectQuery-Modell auf einem Data Warehouse. Abfragen für Jahres- und Quartalsumsätze sind langsam. Was könnten wir tun ohne auf DirectQuery zu verzichten?

> **Erwartete Antwort:** Importierte Aggregationstabelle hinzufügen. Sie beantwortet High-Level-Abfragen aus dem Cache, die Detail-Abfragen gehen weiter per DirectQuery an die Quelle.
> => Das ist das zusammengesetzte Modell in der Praxis.

---

## Block 6 - Framework wählen

**Entscheidungstabelle gemeinsam durchgehen:**

- Standardfall, beste Leistung, volle DAX/M-Unterstützung: **Import**
- Sehr große Datenmengen oder Quasi-Echtzeit: **DirectQuery**
- DirectQuery-Leistung erhöhen mit Aggregationstabellen: **Zusammengesetzt**
- Importmodell mit Echtzeitdaten für aktuelle Periode: **Zusammengesetzt (Hybridtabelle)**
- Bestehendes Power BI-Dataset erweitern: **Zusammengesetzt**

**Wichtige Warnung betonen:**
- DirectQuery zu Import: jederzeit möglich
- Import zu DirectQuery: nicht möglich
- Framework-Entscheidung vor Entwicklungsbeginn treffen, nicht nachträglich

**Kurzes Szenario-Spiel:**
Drei kurze Szenarien nennen, Teilnehmer tippen welches Framework:

- "Kleines Unternehmen, 50.000 Zeilen Umsatzdaten, monatliche Reports" => Import
- "Logistikkonzern, 2 Milliarden Sendungen im DWH, Dashboards müssen Tagestand zeigen" => DirectQuery
- "Bestehendes DWH per DirectQuery verbunden, aber Jahresauswertungen dauern 30 Sekunden" => Zusammengesetzt mit Aggregationstabelle

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Jedes Visual sendet eine Analyseabfrage in drei Phasen: Filtern, Gruppieren, Zusammenfassen
- Dimensionstabellen werden gefiltert und gruppiert, Faktentabellen werden zusammengefasst
- Import: Standard, beste Leistung, volle Feature-Unterstützung. Limits: Größe und Aktualisierungsfrequenz.
- DirectQuery: Live-Abfragen, keine Datenkopie. Für große Daten und Echtzeitanforderungen. Eingeschränkte M-Transformationen.
- Zusammengesetzt: Import und DirectQuery kombiniert. Für Flexibilität, Leistungssteigerung, Modell-Erweiterung.
- Entscheidung vor Entwicklungsbeginn: Von Import zu DirectQuery gibt es keinen Weg zurück.

**Übergang zu Skript 08:**
> "Wir wissen jetzt wie wir Daten laden, bereinigen und welches Framework wir wählen. Im nächsten Skript bauen wir das Modell konkret aus: Beziehungen anlegen, Kardinalitäten verstehen, Kreuzfilterrichtungen festlegen."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren. Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** In welcher Reihenfolge durchläuft jede Analyseabfrage in Power BI die drei Phasen?

- a) Zusammenfassen → Gruppieren → Filtern
- b) Gruppieren → Filtern → Zusammenfassen
- c) Filtern → Gruppieren → Zusammenfassen ✅
- d) Filtern → Zusammenfassen → Gruppieren

> **Antwort:** c) Erst wird die Datenmenge eingeschränkt (Filtern), dann in Gruppen unterteilt (Gruppieren), dann je Gruppe ein Wert berechnet (Zusammenfassen).

---

**Frage 2:** Welche Aussage zum Importmodell ist korrekt?

- a) Import unterstützt keine Datenbankquellen
- b) Import liefert die beste Abfrageleistung, hat aber Limits bei Modellgröße und Aktualisierungsfrequenz ✅
- c) Beim Import werden Daten live aus der Quelle abgefragt
- d) Import ist nur für Dateiquellen wie CSV und Excel geeignet

> **Antwort:** b) Import ist der Standard und liefert die beste Leistung. Die Hauptlimits sind 1 GB Modellgröße (freigegebene Kapazität) und 8 Aktualisierungen täglich.

---

**Frage 3:** Wann ist DirectQuery dem Import vorzuziehen?

- a) Immer, weil keine Datenkopie gespeichert wird
- b) Wenn sehr große Datenmengen einen vollständigen Import unpraktisch machen, oder wenn Sicherheitsrichtlinien lokale Kopien verbieten ✅
- c) Nur bei Excel-Dateien als Quelle
- d) Wenn man mehr als 4 Tabellen im Modell hat

> **Antwort:** b) Import ist der Standard und schneller. DirectQuery ist die Ausnahme für spezifische Anforderungen: sehr große Daten, Quasi-Echtzeit, Datenhoheit.

---

**Frage 4:** Was ist eine eingeschränkte Beziehung im zusammengesetzten Modell?

- a) Eine Beziehung die nur Lesezugriff hat
- b) Eine Beziehung zwischen Tabellen aus verschiedenen Quellgruppen, die keine garantierte 1-Seite hat und zu abweichenden Berechnungsergebnissen führen kann ✅
- c) Eine Beziehung die nur mit dem Dual-Speichermodus funktioniert
- d) Eine deaktivierte Beziehung im Modell

> **Antwort:** b) Eingeschränkte Beziehungen entstehen wenn Import- und DirectQuery-Tabellen verbunden werden. Sie können zu unerwarteten Berechnungsergebnissen führen und müssen sorgfältig geprüft werden.

---

**Frage 5:** Ein Entwickler hat ein Modell mit Import-Tabellen gebaut. Er möchte eine Tabelle auf DirectQuery umstellen. Was ist zu beachten?

- a) Das ist jederzeit problemlos möglich in beide Richtungen
- b) DirectQuery zu Import ist möglich, Import zu DirectQuery jedoch nicht. Das Framework muss vor der Entwicklung festgelegt werden. ✅
- c) Tabellen können grundsätzlich nicht zwischen Modi gewechselt werden
- d) Der Wechsel ist möglich, erfordert aber eine Premium-Lizenz

> **Antwort:** b) Von Import zu DirectQuery gibt es keinen Weg zurück. Das ist einer der wichtigsten Hinweise zu Beginn eines Projekts.
