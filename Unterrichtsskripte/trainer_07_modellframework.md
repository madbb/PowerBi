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
  *Das ist einer der wichtigsten Sätze in diesem Skript. Das Framework muss vor Entwicklungsbeginn feststehen. Nachträglich umzubauen ist so gut wie unmöglich.*

---

## Block 1 - Modellgrundlagen

**Semantisches Modell erklären:**
- Zentrales Konzept: Das Power BI-Datenmodell ist eine für Analysen optimierte, abfragbare Datenressource
  *Abfragbar bedeutet: Power BI-Berichte schicken Anfragen an das Modell und bekommen Ergebnisse zurück. Das Modell beantwortet diese Anfragen - je nach Framework entweder aus dem lokalen Speicher oder direkt aus der Quelldatenbank.*
- Power BI-Berichte fragen es über DAX ab
- Paginierte Berichte und "In Excel analysieren" verwenden MDX
  *MDX ist eine andere Abfragesprache, älter als DAX, ursprünglich für SQL Server Analysis Services entwickelt. Paginierte Berichte sind für den Druck oder PDF-Export optimierte Berichte - denkt an mehrseitige Rechnungen oder Lagerlisten. Für die PL-300 reicht es, den Begriff MDX zu kennen.*
- Im Power BI-Dienst heißt es Dataset (veraltet) oder semantisches Modell

**Kurze Abgrenzung:**
- Nicht alle Datasets entstehen in Power BI Desktop
- Azure Analysis Services (AAS) und SQL Server Analysis Services (SSAS) können als externe Modelle dienen
  *Analysis Services sind Server-Produkte von Microsoft, die speziell für große analytische Modelle gebaut wurden. Unternehmen, die solche Server bereits betreiben, können deren Modelle direkt in Power BI einbinden, ohne alles neu aufzubauen.*
- Dieses Skript behandelt ausschließlich Modelle, die in Power BI Desktop gebaut werden

**Die drei Phasen jeder Analyseabfrage erklären:**

Jedes Mal wenn ein Visual gerendert wird, sendet Power BI intern eine Abfrage. Immer in dieser Reihenfolge:

1. **Filtern**: Schränkt die Datenmenge ein. Filterwerte erscheinen nicht im Ergebnis. Quellen: Datenschnitte, Berichtsfilter, RLS, Measures.
   *RLS steht für Row-Level Security - auf Deutsch: Sicherheit auf Zeilenebene. Damit kann man steuern, dass bestimmte Benutzer nur bestimmte Zeilen sehen. Beispiel: Der Verkäufer für Region Nord sieht nur Daten aus Nord. Das ist ein Filter, der automatisch im Hintergrund läuft.*

2. **Gruppieren**: Teilt das Ergebnis in sichtbare Gruppen. Jede Gruppe ist selbst ein Filter, dessen Wert im Ergebnis erscheint.
   *Gruppieren ist das, was man in der Legende oder Achse eines Diagramms sieht. Wenn ein Balkendiagramm nach Quartal aufgeteilt ist, sind die Quartale die Gruppen.*

3. **Zusammenfassen**: Erzeugt einen Wert je Gruppe. Summe, Anzahl, Minimum, Maximum oder komplexes DAX-Measure.
   *Zusammenfassen ist das Ergebnis: Die Höhe eines Balkens, die Zahl auf einer Karte, der Wert in einer Tabellenzelle.*

**Konkretes Beispiel durchgehen:**
- Säulendiagramm: vierteljährliche Umsätze für 2021
- Datenschnitt Jahr = 2021: filtert
- Säulendiagramm nach Quartal: gruppiert
- Säulenhöhe = Umsatz: zusammengefasst

**Frage ans Plenum:** In welcher Phase steckt ein Datenschnitt? In welcher Phase steckt die Höhe eines Balkens?

> **Erwartete Antwort:** Datenschnitt = Filtern. Balkenhöhe = Zusammenfassen (nach Gruppieren nach Quartal).
> Wer das versteht, versteht auch warum Dimensionstabellen für Filter/Gruppen zuständig sind und Faktentabellen für die Zahlen.

---

## Block 2 - Sternschema und Speichermodus

**Sternschema kurz wiederholen:**
- Bereits in Skript 04 (Copilot) und Skript 05 angesprochen. Hier vertiefen.
- **Dimensionstabellen**: Beschreiben Entitäten. Kunden, Produkte, Datum, Region. Werden gefiltert oder gruppiert.
  *Entität ist ein abstraktes Konzept - gemeint sind Dinge oder Personen, über die man Informationen hat. Ein Kunde ist eine Entität, ein Produkt ist eine Entität.*
- **Faktentabellen**: Speichern Ereignisse und Transaktionen. Orders, Umsätze, Messungen. Werden zusammengefasst.
- Faktentabelle im Zentrum, Dimensionen als Zacken
  *Daher der Name "Sternschema" - wenn man das Diagramm in der Modellansicht betrachtet, sieht es aus wie ein Stern.*

**Unsere Übungsdaten einordnen:**
- Faktentabelle: orders (Transaktionen)
- Dimensionen: customers, products, salesreps

**Speichermodus als Eigenschaft jeder Tabelle:**
- Jede Tabelle im Modell hat eine Speichermoduseigenschaft
- Die Kombination aller Tabellen bestimmt das Framework
  *Man kann in Power BI für jede Tabelle einzeln festlegen, wie sie gespeichert wird. Die Gesamtheit dieser Einstellungen ergibt das Modellframework.*

**Tabelle kurz zeigen:**
- Import: Daten im Modell gespeichert
- DirectQuery: Abfragen live an die Quelle
- Dual: Power BI wählt je nach Kontext automatisch

**Quellgruppe erklären:**
- Import- oder DirectQuery-Modell: genau eine Quellgruppe
  *Quellgruppe ist eine Menge von Tabellen, die alle aus derselben Datenbankquelle kommen. Eine SQL-Datenbank ist eine Quellgruppe. Eine CSV-Datei ist eine eigene Quellgruppe.*
- Zusammengesetztes Modell: mehr als eine Quellgruppe
- Beziehungen zwischen verschiedenen Quellgruppen sind eingeschränkte Beziehungen
  *Eingeschränkte Beziehung bedeutet: Die Verbindung zwischen Tabellen aus verschiedenen Quellgruppen funktioniert nicht mit allen Power BI-Features. Zum Beispiel kann die eine Seite der Beziehung nicht garantiert eindeutig sein, was zu falschen Aggregationen führen kann.*

**Frage ans Plenum:** Wir haben customers aus einer CSV und orders aus der Datenbank. Wie viele Quellgruppen hat unser Modell?

> **Erwartete Antwort:** Zwei. CSV ist eine Quelle, MariaDB ist eine andere. Das macht es automatisch zu einem zusammengesetzten Modell.
> Das passiert in der Praxis ständig ohne dass man es bewusst so plant.

---

## Block 3 - Das Importmodell

**Importmodell vorstellen:**
- Standard. Der häufigste Fall. Bei einem neuen Projekt immer der Ausgangspunkt.
- Alle Tabellen haben Speichermodus Import
- Daten werden lokal im Arbeitsspeicher gehalten, für Analyseabfragen optimiert
  *Arbeitsspeicher ist der schnelle temporäre Speicher des Computers (RAM), nicht die Festplatte. Power BI nutzt eine besondere Speichertechnologie namens VertiPaq, die Daten stark komprimiert und extrem schnelle Abfragen ermöglicht.*

**Vorteile:**
- Beste Abfrageleistung von allen drei Frameworks
- Unterstützt alle Datenquellentypen
- Volle DAX- und M-Unterstützung
- Berechnete Tabellen möglich
  *Berechnete Tabelle ist eine Tabelle, die nicht aus einer externen Quelle stammt, sondern per DAX-Formel aus anderen Tabellen berechnet wird. Nur bei Import möglich.*
- Daten aus verschiedenen Quellen kombinierbar

**Einschränkung 1: Modellgröße**
- Freigegebene Kapazität: 1 GB komprimiert
  *Freigegebene Kapazität ist der kostenlose oder Pro-Plan-Bereich im Power BI-Dienst, bei dem sich viele Nutzer die Serverressourcen teilen. 1 GB klingt wenig, aber durch die starke Komprimierung (oft Faktor 10 oder mehr) passen da erhebliche Datenmengen rein.*
- Premium: über 10 GB mit Large Dataset Storage Format

**Methoden zur Datenreduktion (kurz durchgehen):**
- Unnötige Spalten und Zeilen früh entfernen (Power Query)
- Faktentabellen auf höherem Aggregationsniveau speichern (täglich statt transaktional)
  *Aggregationsniveau bedeutet: Wie fein sind die Daten? Transaktional = jede einzelne Bestellung als eigene Zeile. Täglich aggregiert = alle Bestellungen eines Tages zusammengefasst als eine Zeile. Weniger Zeilen = kleineres Modell.*
- Numerische Datentypen bevorzugen
- Berechnungen in Power Query statt als berechnete Spalten im Modell
  *Berechnete Spalte ist eine Spalte, die per DAX-Formel im Modell berechnet wird, nicht aus der Quelle stammt. Sie belegt Speicher für jede Zeile. Eine Power-Query-Spalte wird vor dem Laden berechnet und nur das Ergebnis gespeichert - effizienter.*
- Laden für Staging-Abfragen deaktivieren
  *Staging-Abfrage ist eine Zwischenabfrage, die man nur als Grundlage für eine andere Abfrage nutzt, nicht selbst ins Modell laden will. Zum Beispiel eine bereinigte Rohtabelle, aus der man dann zwei weitere Tabellen erstellt. Diese Zwischenabfrage kann man "nicht laden" markieren - spart Speicher.*
- Automatische Datum-/Uhrzeiteinstellung deaktivieren
  *Power BI erstellt für jede Datumsspalte automatisch eine versteckte Hilfstabelle. Das passiert oft mehrfach und belegt unnötig Speicher. Empfehlung: Eigene Datumstabelle erstellen und die automatische Einstellung deaktivieren.*

**Einschränkung 2: Datenaktualisierung**
- Importierte Daten sind nur so aktuell wie die letzte Aktualisierung
- Freigegebene Kapazität: max. 8x täglich
- Premium: max. 48x täglich
- Standard: bei jeder Aktualisierung alles löschen und neu laden

**Inkrementelle Aktualisierung kurz ansprechen:**
- Legt Tabellenpartitionen nach Zeitraum an
  *Partition ist ein Teilbereich einer Tabelle, hier nach Zeit aufgeteilt. Zum Beispiel: Jeder Monat ist eine eigene Partition. Bei der Aktualisierung wird dann nur der aktuelle Monat neu geladen, nicht die letzten 5 Jahre.*
- Nur geänderte Partitionen werden aktualisiert
- Löst das Problem bei großen Faktentabellen

**Frage ans Plenum:** Ein Unternehmen braucht Berichte die immer den aktuellen Stundenstand zeigen. Import oder was anderes?

> **Erwartete Antwort:** Bei 8 Aktualisierungen pro Tag im freien Plan ist das nicht machbar. Entweder Premium mit 48x täglich, oder DirectQuery, oder Hybridtabelle.
> Das sind echte Architekturentscheidungen die im Projektalltag anfallen.

---

## Block 4 - Das DirectQuery-Modell

**DirectQuery vorstellen:**
- Keine lokale Datenkopie. Jedes Visual sendet eine Live-Abfrage an die Quelle.
- Alle Tabellen haben Speichermodus DirectQuery, alle aus derselben Quellgruppe

**Wann DirectQuery sinnvoll ist:**
- Sehr große Datenmengen (Data Warehouse mit Milliarden Zeilen)
- Quasi-Echtzeit-Anforderungen ohne Aktualisierungsaufwand
  *Quasi-Echtzeit bedeutet: nicht absolut live auf die Millisekunde, aber so aktuell wie die Datenbankabfrage dauert - typisch einige Sekunden. Das reicht für die meisten Unternehmensberichte.*
- Sicherheitsrichtlinien verbieten lokale Datenkopien
- Bestehende Power BI-Datasets oder AAS-Modelle erweitern
  *AAS = Azure Analysis Services. Wenn ein Unternehmen dort bereits ein Modell betreibt, kann man es per DirectQuery in Power BI einbinden und um neue Tabellen erweitern.*

**Einschränkungen klar benennen:**
- Nicht alle Datenquellen unterstützt, hauptsächlich große relationale Datenbanken
- Nicht alle M-Transformationen möglich: Pivot, Unpivot und viele andere nicht verfügbar
  *Bei DirectQuery wird die Transformation im Idealfall als SQL direkt an die Datenbank geschickt (Query Folding). Was nicht in SQL übersetzbar ist, funktioniert nicht. Pivot und Unpivot gehören dazu.*
- Abfrageleistung abhängig von der Quelldatenbank, kann langsam sein
- Jede Visualisierung belastet das Quellsystem. Auch OLTP-Vorgänge können verlangsamt werden.
  *OLTP steht für Online Transaction Processing - das sind die normalen operativen Datenbanken eines Unternehmens: die Bestelldatenbank, das Warenwirtschaftssystem, das ERP. Diese sind für viele kleine, schnelle Transaktionen optimiert - nicht für große Analyseabfragen. Wenn Power BI ständig große Analyseabfragen auf eine OLTP-Datenbank schickt, kann das den Betrieb verlangsamen.*

**Leistung verbessern:**
- Indizes und materialisierte Views in der Quelldatenbank anlegen
  *Index in einer Datenbank ist wie ein Inhaltsverzeichnis in einem Buch: Er beschleunigt das Finden bestimmter Werte erheblich. Materialisierte Views sind vorberechnete Abfrageergebnisse, die auf dem Datenbankserver gespeichert bleiben - schneller als jedes Mal neu zu berechnen.*
- Ressourcen für Analyse-Workload einplanen
- Immer mit dem Datenbankbesitzer abstimmen

**Frage ans Plenum:** Ein Kollege schlägt vor, alle Power BI-Berichte auf DirectQuery umzustellen damit die Daten immer aktuell sind. Was spricht dagegen?

> **Erwartete Antworten:** Jede Visualisierung ist eine Live-Abfrage, das belastet den Server. M-Transformationen sind eingeschränkt. Nicht alle Quellen werden unterstützt. Leistung kann schlecht sein wenn die DB nicht optimiert ist.
> DirectQuery ist keine universelle Lösung. Import ist schneller und flexibler. DirectQuery für spezifische Anforderungen.

---

## Block 5 - Das zusammengesetzte Modell

**Zusammengesetztes Modell vorstellen:**
- Mehr als eine Quellgruppe: Import und DirectQuery kombiniert
- Entsteht automatisch wenn Tabellen aus verschiedenen Quellen gemischt werden

**Drei Anwendungsfälle:**

**1. DirectQuery-Leistung steigern:**
- Große Faktentabelle per DirectQuery
- Importierte Aggregationstabelle beantwortet häufige High-Level-Abfragen aus dem Cache
  *Cache ist ein Zwischenspeicher für häufig benötigte Ergebnisse. Wie ein Notizzettel: statt jeden Morgen neu zu rechnen, schaut man auf die Notiz. Hier: Power BI speichert häufig angefragte Summenwerte lokal, statt jedes Mal die riesige DirectQuery-Tabelle zu befragen.*
- Dimensionstabellen auf Dual setzen: Power BI wählt automatisch den schnelleren Weg

**2. Importmodell mit Echtzeitdaten (Hybridtabelle):**
- Ältere Daten als Importpartitionen im Cache
- Aktueller Zeitraum per DirectQuery aus der Quelle
- Erfordert Premium-Lizenz
  *Hybridtabelle bedeutet: Eine Tabelle die teils aus dem lokalen Import-Cache kommt (historische Daten) und teils live aus der Datenbank abfragt (aktuelle Daten). Das Beste aus beiden Welten.*

**3. Bestehendes Dataset erweitern:**
- Bestehendes Power BI-Dataset als Basis verwenden
- Neue Tabellen, Spalten oder Measures hinzufügen
- Bis zu drei Modelle verkettbar
  *Modellverkettung bedeutet: Modell A ist Basis für Modell B, das wiederum Basis für Modell C ist. So kann man ein zentrales Unternehmensmodell haben, auf dem verschiedene Teams aufbauen, ohne es selbst verändern zu müssen.*

**Einschränkungen:**
- Importierte Tabellen müssen weiterhin aktualisiert werden
- Abfragen die Import und DirectQuery kombinieren können langsam sein
- Eingeschränkte Beziehungen zwischen verschiedenen Quellgruppen: keine garantierte 1-Seite, abweichende Berechnungsergebnisse möglich
- Modellverkettung: Änderungen am Upstream-Modell können Downstream-Modelle beschädigen. Immer Dataset-Auswirkungsanalyse durchführen.
  *Upstream = das Modell weiter vorne in der Kette. Downstream = das Modell, das davon abhängt. Wenn das Upstream-Modell eine Spalte umbenennt oder löscht, bricht das Downstream-Modell an allen Stellen, die diese Spalte nutzen. Die Auswirkungsanalyse im Power BI-Dienst zeigt an, welche Berichte und Modelle betroffen wären.*

**Dual-Speichermodus erklären:**
- Tabelle kann je nach Kontext aus Cache oder per DirectQuery bedient werden
- Power BI wählt automatisch
- Datenschnitte auf Dual-Dimensionstabellen werden deutlich schneller gerendert

**Frage ans Plenum:** Wir haben ein DirectQuery-Modell auf einem Data Warehouse. Abfragen für Jahres- und Quartalsumsätze sind langsam. Was könnten wir tun ohne auf DirectQuery zu verzichten?

> **Erwartete Antwort:** Importierte Aggregationstabelle hinzufügen. Sie beantwortet High-Level-Abfragen aus dem Cache, die Detail-Abfragen gehen weiter per DirectQuery an die Quelle.
> Das ist das zusammengesetzte Modell in der Praxis.

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
Drei kurze Szenarien nennen, Teilnehmer sagen welches Framework passt:

- "Kleines Unternehmen, 50.000 Zeilen Umsatzdaten, monatliche Reports" - Import
- "Logistikkonzern, 2 Milliarden Sendungen im DWH, Dashboards müssen Tagesstand zeigen" - DirectQuery
- "Bestehendes DWH per DirectQuery verbunden, aber Jahresauswertungen dauern 30 Sekunden" - Zusammengesetzt mit Aggregationstabelle

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
"Wir wissen jetzt wie wir Daten laden, bereinigen und welches Framework wir wählen. Im nächsten Skript bauen wir das Modell konkret aus: Beziehungen anlegen, Kardinalitäten verstehen, Kreuzfilterrichtungen festlegen."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren. Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** In welcher Reihenfolge durchläuft jede Analyseabfrage in Power BI die drei Phasen?

- a) Zusammenfassen - Gruppieren - Filtern
- b) Gruppieren - Filtern - Zusammenfassen
- c) Filtern - Gruppieren - Zusammenfassen (richtig)
- d) Filtern - Zusammenfassen - Gruppieren

> **Antwort:** c) Erst wird die Datenmenge eingeschränkt (Filtern), dann in Gruppen unterteilt (Gruppieren), dann je Gruppe ein Wert berechnet (Zusammenfassen).

---

**Frage 2:** Welche Aussage zum Importmodell ist korrekt?

- a) Import unterstützt keine Datenbankquellen
- b) Import liefert die beste Abfrageleistung, hat aber Limits bei Modellgröße und Aktualisierungsfrequenz (richtig)
- c) Beim Import werden Daten live aus der Quelle abgefragt
- d) Import ist nur für Dateiquellen wie CSV und Excel geeignet

> **Antwort:** b) Import ist der Standard und liefert die beste Leistung. Die Hauptlimits sind 1 GB Modellgröße (freigegebene Kapazität) und 8 Aktualisierungen täglich.

---

**Frage 3:** Wann ist DirectQuery dem Import vorzuziehen?

- a) Immer, weil keine Datenkopie gespeichert wird
- b) Wenn sehr große Datenmengen einen vollständigen Import unpraktisch machen, oder wenn Sicherheitsrichtlinien lokale Kopien verbieten (richtig)
- c) Nur bei Excel-Dateien als Quelle
- d) Wenn man mehr als 4 Tabellen im Modell hat

> **Antwort:** b) Import ist der Standard und schneller. DirectQuery ist die Ausnahme für spezifische Anforderungen: sehr große Daten, Quasi-Echtzeit, Datenhoheit.

---

**Frage 4:** Was ist eine eingeschränkte Beziehung im zusammengesetzten Modell?

- a) Eine Beziehung die nur Lesezugriff hat
- b) Eine Beziehung zwischen Tabellen aus verschiedenen Quellgruppen, die keine garantierte 1-Seite hat und zu abweichenden Berechnungsergebnissen führen kann (richtig)
- c) Eine Beziehung die nur mit dem Dual-Speichermodus funktioniert
- d) Eine deaktivierte Beziehung im Modell

> **Antwort:** b) Eingeschränkte Beziehungen entstehen wenn Import- und DirectQuery-Tabellen verbunden werden. Sie können zu unerwarteten Berechnungsergebnissen führen und müssen sorgfältig geprüft werden.

---

**Frage 5:** Ein Entwickler hat ein Modell mit Import-Tabellen gebaut. Er möchte eine Tabelle auf DirectQuery umstellen. Was ist zu beachten?

- a) Das ist jederzeit problemlos möglich in beide Richtungen
- b) DirectQuery zu Import ist möglich, Import zu DirectQuery jedoch nicht. Das Framework muss vor der Entwicklung festgelegt werden. (richtig)
- c) Tabellen können grundsätzlich nicht zwischen Modi gewechselt werden
- d) Der Wechsel ist möglich, erfordert aber eine Premium-Lizenz

> **Antwort:** b) Von Import zu DirectQuery gibt es keinen Weg zurück. Das ist einer der wichtigsten Hinweise zu Beginn eines Projekts.
