# Trainer-Skript 03 - Microsoft Fabric

> **Themen:** Was ist Fabric? · OneLake · Workloads · Datenteams · KI-Funktionen
> **Schüler-Skript:** 03_microsoft_fabric.md

---

## Einstieg

**Frage ans Plenum:** Kennt jemand von euch Microsoft Fabric - oder habt ihr schon mal davon gehört?

- Kurz Handzeichen zählen - Fabric ist noch relativ neu, viele kennen es nur vom Hörensagen
- Überleitung: Fabric ist der Kontext, in dem Power BI heute lebt - wer Power BI versteht aber Fabric nicht kennt, hat nur die Hälfte des Bildes

**Kerngedanke:**
- Unternehmen kämpfen mit fragmentierten Daten - verschiedene Tools, verschiedene Teams, keine gemeinsame Basis
- Fabric löst genau das: eine einzige integrierte Plattform für den gesamten Daten- und KI-Lebenszyklus
- Power BI ist eine der Workloads in Fabric - und damit eingebettet in etwas Größeres

---

## Block 1 - Was ist Microsoft Fabric?

**Frage ans Plenum:** Was glaubt ihr - was war das Problem mit der bisherigen Microsoft-Datenwelt? Warum braucht es Fabric?

> **Erwartete Antwort:** Zu viele Einzeltools, Daten liegen verstreut, Teams arbeiten isoliert
> Genau das adressiert Fabric: eine Plattform statt vieler Insellösungen

**Microsoft Fabric vorstellen:**

- **SaaS-Plattform** - kein On-Premises, keine separaten Azure-Ressourcen nötig
  *SaaS steht für Software as a Service - auf Deutsch: Software als Dienstleistung. Man installiert nichts lokal, sondern nutzt alles über den Browser. Der Anbieter, hier Microsoft, kümmert sich um Server, Updates und Wartung. On-Premises bedeutet das Gegenteil: Software läuft auf eigenen Servern im eigenen Rechenzentrum.*

- Vereint drei bisherige Werkzeuge: **Power BI**, **Azure Synapse Analytics**, **Azure Data Factory**
  *Azure Synapse Analytics war ein Dienst für große Datenanalysen direkt in der Cloud. Azure Data Factory ist ein Werkzeug, um Daten aus verschiedenen Quellen automatisch zu transferieren und umzuformen - vergleichbar mit einem automatischen Förderband für Daten. Fabric ersetzt beide und ergänzt sie um weitere Funktionen.*

- Eine einzige integrierte Umgebung - Datenexperten und Business-Seite arbeiten gemeinsam

- Alle Daten landen in einem zentralen Datensee: **OneLake**
  *OneLake ist der eingebaute Datenspeicher von Fabric. Wie ein zentrales Lager, in das alle Abteilungen ihre Daten stellen und aus dem sie sich bedienen. "One" steht dafür, dass es nur einen gibt - nicht mehrere isolierte Speicher.*

- Unterstützt auch **Data Mesh** (Datengitter-Architektur): dezentraler Datenbesitz bei zentraler Governance
  *Data Mesh ist ein neueres Konzept: Statt alles zentral zu verwalten, ist jede Fachabteilung für ihre eigenen Daten verantwortlich - aber nach gemeinsamen Regeln. Governance bedeutet dabei: einheitliche Qualitätsstandards, Sicherheitsregeln und Zugriffskontrollen. Für den PL-300 reicht es, den Begriff zu kennen.*

**Warum das für uns relevant ist:**
- Als Data Analyst arbeiten wir in Power BI - aber die Daten kommen aus OneLake
- Was Data Engineers und Analytics Engineers in Fabric aufbauen, ist unsere Grundlage
- KI-Funktionen wie Copilot greifen auf dieselben Daten zu, die unsere Berichte speisen - ohne extra Pipelines
  *Pipeline ist der technische Begriff für einen automatisierten Datenfluss: Daten kommen rein, werden verarbeitet, kommen in einer anderen Form wieder raus. Fabric macht viele dieser Pipelines überflüssig, weil alle Werkzeuge denselben Datenspeicher nutzen.*

---

## Block 2 - OneLake

**Frage ans Plenum:** Was wäre der Vorteil davon, alle Daten an einem einzigen Ort zu haben - statt verteilt über mehrere Systeme?

> **Erwartete Antworten:** Kein Datenchaos, kein doppeltes Ablegen, alle arbeiten mit denselben Daten
> Genau das ist das Versprechen von OneLake

**OneLake vorstellen:**

- Ein einziger Datensee für die gesamte Organisation
  *Datensee (englisch: Data Lake) ist ein Speicherort für große Mengen unterschiedlichster Daten - strukturiert wie Tabellen, aber auch unstrukturiert wie E-Mails, Bilder oder Dokumente. Im Gegensatz zu einer Datenbank hat ein Data Lake kein festes Schema.*

- Basiert auf **Azure Data Lake Storage Gen2** im Hintergrund
  *Azure Data Lake Storage Gen2 ist der technische Unterbau - ein hoch skalierbarer Cloudspeicher von Microsoft. Fabric verbirgt diese Komplexität: Man arbeitet mit OneLake, ohne sich um den Unterbau zu kümmern.*

- Unterstützt das **Delta Parquet**-Format
  *Delta Parquet ist ein Dateiformat, das besonders gut für große Analysemengen geeignet ist. Es erlaubt schnelle Abfragen und speichert Daten platzsparend. Schüler müssen das Format nicht im Detail kennen - wichtig ist: Es ist der Standard in modernen Datenplattformen.*

- Jede Fabric-Kapazität hat genau einen OneLake
- Daten werden in **Workspaces** und **Items** organisiert
  *Workspace ist das gleiche wie Arbeitsbereich in Power BI - ein organisatorischer Container. Item ist ein einzelnes Objekt darin, zum Beispiel ein Bericht, ein Dataset oder ein Lakehouse.*

- **Shortcuts** erlauben Zugriff auf externe Datenquellen ohne Datenkopie
  *Shortcut ist wie eine Verknüpfung in Windows: Man sieht die Datei in OneLake, aber sie liegt eigentlich noch beim externen Anbieter, zum Beispiel Amazon S3 oder Azure Storage. Keine Datenkopie nötig, kein doppelter Speicher.*

- **OneLake-Explorer**: Windows-App, die OneLake wie ein lokales Laufwerk erscheinen lässt

**Frage ans Plenum:** Warum ist es ein Vorteil, dass alle Workloads in Fabric denselben OneLake nutzen?

> **Erwartete Antworten:** Keine Datenkopien zwischen Tools, kein Synchronisationsaufwand, immer dieselbe Datengrundlage
> Und: Wenn der Data Engineer die Daten aktualisiert, hat der Data Analyst in Power BI sofort den neuen Stand - ohne Datenpipeline dazwischen

---

## Block 3 - Workloads in Fabric

**Überleitung:** Fabric besteht aus mehreren Werkzeugbereichen - man nennt sie Workloads. Jeder Workload ist für eine andere Aufgabe zuständig.

*Workload bedeutet einfach: eine Kategorie von Aufgaben mit den passenden Werkzeugen. In Fabric gibt es Workloads für Datentechnik, Datenwissenschaft, Echtzeit-Analyse und natürlich Power BI.*

**Die sechs Workloads kurz vorstellen:**

- **Data Factory** - ETL und Datenpipelines. Daten bewegen und transformieren.
  *ETL = Extract, Transform, Load. Daten aus Quelle A holen, umformen, in Ziel B ablegen. Data Factory ist das Werkzeug dafür.*

- **Synapse Data Engineering** - Datentechnik mit Spark und Notebooks.
  *Apache Spark ist eine Technologie für die verteilte Verarbeitung sehr großer Datenmengen - schneller als klassische Datenbanken bei Millionen von Zeilen. Notebooks sind interaktive Dokumente, in denen man Code schreibt und ausführt, ähnlich wie Jupyter-Notebooks in Python.*

- **Synapse Data Warehouse** - SQL-basiertes Data Warehousing.
  *Ein Data Warehouse ist eine Datenbank, die speziell für Analysen optimiert ist. SQL ist die Abfragesprache für relationale Datenbanken. Der Synapse Data Warehouse-Workload erlaubt klassische SQL-Analysen direkt in Fabric.*

- **Synapse Data Science** - Maschinelles Lernen und Experimente.

- **Real-Time Intelligence** - Echtzeit-Datenströme verarbeiten und analysieren.
  *Datenstrom (englisch: Data Stream) bedeutet: Daten kommen kontinuierlich an, zum Beispiel Sensordaten einer Fabrikanlage oder Klicks auf einer Website. Real-Time Intelligence verarbeitet diese Ströme sofort, ohne sie erst zu speichern.*

- **Power BI** - Berichte, Dashboards und semantische Modelle.

**Fabric-Erfahrung wechseln:**
- Oben links im Fabric-Portal: Umschalter zwischen den Workloads
- Jeder Workload hat seine eigene Startseite und Werkzeuge
- Lizenz bestimmt welche Workloads verfügbar sind

**Frage ans Plenum:** Welcher Workload ist für uns als Data Analyst der wichtigste?

> **Erwartete Antwort:** Power BI
> Richtig. Aber wir profitieren auch von dem, was Data Engineers in Data Engineering und Data Warehouse aufbauen - das sind unsere Datenquellen.

---

## Block 4 - Datenteams und Zusammenarbeit in Fabric

**Überleitung:** Fabric ist nicht nur ein technisches Konzept - es verändert auch die Zusammenarbeit zwischen Teams.

**Drei Rollen und was Fabric für sie bedeutet:**

**Data Engineer mit Fabric:**
- Erstellt Datenpipelines und Transformationen mit Spark oder Data Factory
- Baut Lakehouses und Data Warehouses auf
- Stellt aufbereitete Daten für Analytics Engineers und Analysten bereit
  *Lakehouse ist eine Kombination aus Data Lake und Data Warehouse: Es speichert Rohdaten wie ein Lake, unterstützt aber strukturierte SQL-Abfragen wie ein Warehouse. Der Data Engineer baut diese Strukturen, der Data Analyst nutzt sie.*

**Analytics Engineer mit Fabric:**
- Transformiert Rohdaten in strukturierte, analysierbare Daten
- Erstellt semantische Modelle direkt in Fabric
- Dokumentiert und zertifiziert Daten für Self-Service-Analysen
  *Self-Service-Analyse bedeutet: Endanwender in der Fachabteilung können selbst Berichte erstellen, ohne jedes Mal die IT-Abteilung zu fragen. Das funktioniert nur wenn die Daten gut aufbereitet und dokumentiert sind - das ist die Aufgabe des Analytics Engineers.*

**Data Analyst mit Fabric:**
- Erstellt Power BI-Berichte auf Basis der vorbereiteten Daten
- Nutzt DirectLake-Verbindungen für maximale Performance
- Teilt Erkenntnisse über Apps und eingebettete Berichte
  *DirectLake ist eine spezielle Verbindungsart in Fabric: Power BI liest die Daten direkt aus OneLake, ohne sie erst zu kopieren. Das ist schneller als Import und aktueller als DirectQuery. Dieses Feature gibt es nur in Fabric - nicht im klassischen Power BI-Dienst.*

**Frage ans Plenum:** Wir bauen einen Bericht zu Verkaufszahlen. Wer liefert uns die aufbereiteten Daten, auf denen wir aufbauen?

> **Erwartete Antwort:** Data Engineer oder Analytics Engineer
> Genau. Als Data Analyst bekommen wir idealerweise bereits aufbereitete, zertifizierte Daten. Wir müssen nicht selbst an die Rohdaten.

---

## Block 5 - KI-Funktionen in Fabric

**Überleitung:** Fabric ist von Beginn an mit KI-Funktionen gebaut worden - nicht nachträglich angebaut.

**Copilot in Fabric:**
- Verfügbar in mehreren Workloads: Power BI, Data Factory, Data Science, Data Warehouse
- Unterstützt bei: DAX-Generierung, Pipeline-Erstellung, Code schreiben, Berichte zusammenfassen
- Benötigt: F64-Kapazität oder Power BI Premium P1 und höher, Copilot muss vom Admin aktiviert sein

*F64 und P1 sind Lizenzstufen für Fabric bzw. Power BI Premium. Die Buchstaben und Zahlen beschreiben die verfügbare Rechenkapazität. Je höher die Zahl, desto leistungsfähiger. Für den PL-300 reicht es zu wissen: Copilot braucht eine Premium-Lizenz.*

**AI Skills in Fabric (Preview):**
- Natürlichsprachliche Abfragen auf eigene Unternehmensdaten
- Keine Kenntnisse in DAX oder SQL nötig
- Ergebnis: Tabellen, Diagramme oder Text
  *Preview bedeutet: Das Feature ist noch nicht final, kann sich ändern und ist nicht in allen Regionen verfügbar. Microsoft kennzeichnet neue Funktionen oft als Preview, bevor sie offiziell freigegeben werden.*

**Azure KI-Dienste in Fabric:**
- Verbindung zu Azure OpenAI, Azure KI Services und Azure KI-Suche
- Kann in Datenpipelines und Notebooks eingebunden werden
  *Azure OpenAI ist der Zugang zu Modellen wie GPT über die Microsoft-Cloud. Azure KI Services umfasst vorgefertigte KI-Dienste wie Texterkennung, Übersetzung oder Bildbeschreibung. Man muss diese Dienste nicht selbst entwickeln - man bindet sie ein.*

**Frage ans Plenum:** Welche Voraussetzung muss erfüllt sein, damit Copilot in Power BI überhaupt sichtbar ist?

> **Erwartete Antwort:** F64-Kapazität oder Power BI Premium, Copilot muss vom Admin aktiviert sein
> Wichtig: Wer keine Premium-Lizenz hat, sieht den Copilot-Button einfach nicht. Das ist keine Fehlfunktion.

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Fabric ist eine SaaS-Plattform, die Power BI, Synapse Analytics und Data Factory vereint
- OneLake ist der zentrale Datenspeicher - alle Workloads nutzen denselben See
- Sechs Workloads: Data Factory, Data Engineering, Data Warehouse, Data Science, Real-Time Intelligence, Power BI
- DirectLake ermöglicht schnellen Zugriff ohne Datenkopie
- Copilot und KI-Dienste sind in Fabric integriert - benötigen Premium-Lizenz

**Übergang zu Skript 04:**
"Wir wissen jetzt, in welchem Kontext Power BI lebt. Im nächsten Skript schauen wir uns Copilot konkret an: Was kann er, was kann er nicht, und wie bereitet man Daten richtig vor, damit er gute Ergebnisse liefert."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren. Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Welche drei bisherigen Microsoft-Dienste vereint Microsoft Fabric?

- a) Excel, Teams, SharePoint
- b) Power BI, Azure Synapse Analytics, Azure Data Factory (richtig)
- c) Power BI, SQL Server, Access
- d) OneDrive, Power Apps, Power Automate

> **Antwort:** b) Fabric integriert Power BI für Berichte, Azure Synapse Analytics für Datenanalyse und Azure Data Factory für Datenpipelines.

---

**Frage 2:** Was ist OneLake in Microsoft Fabric?

- a) Eine App für mobile Geräte
- b) Ein Lizenzmodell für Power BI
- c) Ein zentraler Datensee für die gesamte Organisation - alle Fabric-Workloads nutzen ihn gemeinsam (richtig)
- d) Ein Werkzeug zum Erstellen von Dashboards

> **Antwort:** c) OneLake ist der einheitliche Datenspeicher in Fabric. Kein Datenchaos mehr durch verstreute Einzelspeicher.

---

**Frage 3:** Was bedeutet DirectLake in Fabric?

- a) Eine direkte Internetverbindung für Power BI-Berichte
- b) Power BI liest Daten direkt aus OneLake ohne sie zu kopieren - schneller als Import, aktueller als DirectQuery (richtig)
- c) Eine Methode zum Exportieren von Daten aus Power BI
- d) Ein Synonym für DirectQuery

> **Antwort:** b) DirectLake ist eine Fabric-exklusive Verbindungsart. Sie kombiniert die Geschwindigkeit von Import mit der Aktualität von DirectQuery.

---

**Frage 4:** Welche Lizenz wird für Copilot in Fabric und Power BI benötigt?

- a) Kostenlose Power BI-Lizenz reicht aus
- b) Power BI Pro
- c) F64-Kapazität oder Power BI Premium P1 (oder höher) mit Copilot-Aktivierung durch den Admin (richtig)
- d) Microsoft 365 Business Standard

> **Antwort:** c) Copilot benötigt eine Premium-Kapazität. Ohne diese ist der Copilot-Button nicht sichtbar.

---

**Frage 5:** Welche Aussage zur Data Mesh-Architektur in Fabric ist korrekt?

- a) Data Mesh bedeutet, dass alle Daten zentral von einer IT-Abteilung verwaltet werden
- b) Data Mesh bedeutet dezentraler Datenbesitz durch Fachabteilungen bei zentraler Governance und gemeinsamen Standards (richtig)
- c) Data Mesh ist nur für sehr kleine Unternehmen geeignet
- d) Data Mesh ist ein anderes Wort für OneLake

> **Antwort:** b) Bei Data Mesh ist jede Abteilung für ihre eigenen Daten verantwortlich - aber nach einheitlichen Regeln. Fabric unterstützt dieses Konzept durch gemeinsame Governance-Funktionen.
