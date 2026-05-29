# Trainer-Skript 03 — Microsoft Fabric

> **Themen:** Was ist Fabric? · OneLake · Workloads · Datenteams · KI-Funktionen  
> **Schüler-Skript:** 03_microsoft_fabric.md

---

## Einstieg

**Frage ans Plenum:** Kennt jemand von euch Microsoft Fabric — oder habt ihr schon mal davon gehört?

- Kurz Handzeichen zählen — Fabric ist noch relativ neu, viele kennen es nur vom Hörensagen
- Überleitung: Fabric ist der Kontext, in dem Power BI heute lebt — wer Power BI versteht aber Fabric nicht kennt, hat nur die Hälfte des Bildes

**Kerngedanke:**
- Unternehmen kämpfen mit fragmentierten Daten — verschiedene Tools, verschiedene Teams, keine gemeinsame Basis
- Fabric löst genau das: eine einzige integrierte Plattform für den gesamten Daten- und KI-Lebenszyklus
- Power BI ist eine der Workloads in Fabric — und damit eingebettet in etwas Größeres

---

## Block 1 — Was ist Microsoft Fabric?

**Frage ans Plenum:** Was glaubt ihr — was war das Problem mit der bisherigen Microsoft-Datenwelt? Warum braucht es Fabric?

> **Erwartete Antwort:** Zu viele Einzeltools, Daten liegen verstreut, Teams arbeiten isoliert  
> → Genau das adressiert Fabric: eine Plattform statt vieler Insellösungen

**Microsoft Fabric vorstellen:**

- **SaaS-Plattform** — kein On-Premises, keine separaten Azure-Ressourcen nötig
- Vereint drei bisherige Werkzeuge: **Power BI**, **Azure Synapse Analytics**, **Azure Data Factory**
- Eine einzige integrierte Umgebung — Datenexperten und Business-Seite arbeiten gemeinsam
- Alle Daten landen in einem zentralen Datensee: **OneLake**
- Unterstützt auch **Data Mesh** (Datengitter-Architektur): dezentraler Datenbesitz bei zentraler Governance

**Warum das für uns relevant ist:**
- Als Data Analyst arbeiten wir in Power BI — aber die Daten kommen aus OneLake
- Was Data Engineers und Analytics Engineers in Fabric aufbauen, ist unsere Grundlage
- KI-Funktionen wie Copilot greifen auf dieselben Daten zu, die unsere Berichte speisen — ohne extra Pipelines

---

## Block 2 — OneLake

**Frage ans Plenum:** Was wäre der Vorteil davon, alle Daten an einem einzigen Ort zu haben — statt verteilt über mehrere Systeme?

> **Erwartete Antworten:** Keine Duplikate, keine Synchronisierungsprobleme, alle sehen dieselben Daten  
> → Genau das ist das Versprechen von OneLake

**OneLake erklären:**

- Der zentrale Datensee von Fabric — basiert technisch auf **Azure Data Lake Storage Gen2 (ADLS Gen2)**
- Vereint Daten aus verschiedenen Regionen und Clouds in einem logischen See
- **Keine Datenbewegung, keine Duplizierung** — Daten bleiben wo sie sind, Fabric greift darauf zu
- Unterstützte Formate: **Delta**, **Parquet**, **CSV**, **JSON**
- Tabellendaten werden im **Delta-Parquet-Format** gespeichert — alle Fabric-Engines lesen es nahtlos

**Shortcuts kurz erklären:**
- Verweise auf externe Datenquellen (Azure Data Lake Storage, Amazon S3, Dataverse) — ohne Kopieren
- Fabric synchronisiert sich mit der Quelle — Konsistenz bleibt erhalten

**Wichtig betonen:**
- Die Arbeit, die Data Engineers in Fabric leisten, stellt automatisch dieselben Daten für Copilot und KI-Agents bereit
- Keine separaten Vorbereitungspipelines nötig — das ist der entscheidende Unterschied zur alten Welt

**Arbeitsbereiche in Fabric ansprechen:**
- Logische Container für Daten, Berichte und Ressourcen — Basis für Zusammenarbeit und Zugriffskontrolle
- Vier Rollen: **Administrator**, **Mitglied**, **Mitwirkender**, **Viewer**
- Für feinere Kontrolle: Berechtigungen zusätzlich auf Elementebene vergeben

**Frage ans Plenum:** Arbeitsbereichsrollen gelten für alle Elemente im Arbeitsbereich. Was könnte das in der Praxis für ein Problem sein?

> **Erwartete Antwort:** Man kann nicht einzelnen Personen nur Zugriff auf bestimmte Berichte geben  
> → Deshalb gibt es zusätzlich Berechtigungen auf Elementebene — und später im Kurs Row Level Security

---

## Block 3 — Datenteams und Fabric

**Überleitung:** Fabric ist nicht nur eine Technik-Plattform — sie ist auch dafür designed, dass verschiedene Rollen ohne Silos zusammenarbeiten können.

**Wie die Rollen in Fabric zusammenspielen:**

- **Data Engineers** — bauen Lakehouses, ETL-Pipelines, schreiben Daten in OneLake
- **Analytics Engineers** — kuratieren Daten, bauen semantische Modelle, sichern Datenqualität
- **Data Analysts (= wir)** — nutzen Power BI auf Basis der semantischen Modelle in Fabric
- **Data Scientists** — greifen auf OneLake-Daten für ML-Experimente zu, kommen zu uns für Visualisierung
- **Low-Code-Benutzer** — erstellen eigene Berichte mit Self-Service-Funktionen

**Kernbotschaft betonen:**
- Alle arbeiten auf denselben Daten in OneLake — keine Datensilos, keine Duplizierung
- Jede Rolle, die saubere und gut kontrollierte Daten liefert, stärkt gleichzeitig die KI-Funktionen
- Analytics Engineers, die konsistente semantische Modelle bauen, liefern den Kontext für Copilot-Antworten

**Frage ans Plenum:** Wer in einem Unternehmen profitiert davon, dass alle auf denselben Daten arbeiten — und wer könnte es als Bedrohung empfinden?

> **Erwartete Antworten:** Alle profitieren von Konsistenz. Manche Abteilungen wollen ihre Daten aber lieber selbst kontrollieren — Data Mesh adressiert genau das durch dezentralen Besitz bei zentraler Governance  
> → Guter Aufhänger: Governance ist ein Thema, das im Kurs noch intensiver behandelt wird

---

## Block 4 — Fabric-Workloads

**Überleitung:** Fabric ist modular aufgebaut — für jede Aufgabe gibt es eine passende Workload.

**Die 9 Workloads kurz vorstellen:**

- **Data Engineering** — Lakehouses erstellen, Datenaufbereitung operationalisieren
- **Data Factory** — Daten aufnehmen, transformieren, koordinieren (ETL/ELT)
- **Data Warehouse** — klassisches Warehouse für mehrere Quellen
- **Real-Time Intelligence** — Streaming-Daten verarbeiten und analysieren
- **Data Science** — Machine Learning, Trends erkennen, Vorhersagen
- **Datenbanken** — Datenbanken erstellen und verwalten
- **Industry Solutions** — vorgefertigte Branchenlösungen
- **IQ (Vorschau)** — Daten per Ontologien für KI-Reasoning strukturieren
- **Power BI** — Berichte und Dashboards für Entscheidungen

**Prüfungsrelevanz hervorheben:**
- Für die PL-300 ist vor allem Power BI als Workload relevant — aber der Kontext der anderen Workloads ist Prüfungsthema
- Wissen: Was ist ein Lakehouse? Was macht Data Factory? Was ist Real-Time Intelligence?

**Fabric aktivieren — kurz ansprechen:**
- Fabric wird im **Admin-Portal → Mandanteneinstellungen** aktiviert
- Kann für die gesamte Organisation oder bestimmte Sicherheitsgruppen freigeschaltet werden
- Kostenlose Testversion verfügbar unter fabric.microsoft.com

---

## Block 5 — KI-Funktionen in Microsoft Fabric

**Frage ans Plenum:** Wenn alle Daten eines Unternehmens in OneLake liegen — was wäre dann möglich, was vorher nicht möglich war?

> **Erwartete Antworten:** KI kann auf alles zugreifen, keine Daten-Inseln mehr, KI-Assistent kennt alle Daten  
> → Genau das nutzen die Fabric KI-Funktionen aus

**Drei KI-Ebenen erklären:**

**Copilot** — generativer KI-Assistent, für alle Fabric-Workloads verfügbar:
- Code-Abschluss und -Generierung in Notebooks
- SQL-Abfragen aus natürlicher Sprache generieren
- In Power BI: Berichtsseiten generieren, Zusammenfassungen erstellen, Fragen beantworten
- Standardmäßig aktiviert, Admins können es im Admin-Portal steuern

**Daten-Agents** — Konversationsschnittstellen auf Organisationsdaten:
- Benutzer stellen Fragen in natürlicher Sprache
- Agents übersetzen in strukturierte Abfragen gegen Lakehouses, Warehouses, semantische Modelle

**Fabric IQ** (Vorschau) — KI-Reasoning mit Unternehmenskontext:
- Kernelement: **Ontologie** — definiert Geschäftskonzepte, Beziehungen und Regeln
- Damit argumentieren Agents mit Geschäftssprache statt roher Tabellenschemata
- Teil eines dreiteiligen IQ-Ökosystems: Fabric IQ (Daten) · Foundry IQ (Wissen) · Work IQ (Kollaboration)

**Wichtig betonen:**
- Copilot funktioniert nur so gut wie die zugrundeliegenden Daten — schlechte Datenqualität = schlechte KI-Ergebnisse
- Unsere Arbeit als Data Analysts (saubere Modelle, korrekte Semantik) ist gleichzeitig die Grundlage für KI
- Das macht die Rolle des Data Analysts nicht überflüssig — sondern wichtiger

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Fabric = End-to-End-SaaS-Analyseplattform, die Power BI, Azure Synapse und Azure Data Factory vereint
- OneLake = zentraler Datensee (ADLS Gen2), Delta-Parquet-Format, keine Duplizierung
- Shortcuts = Zugriff auf externe Quellen ohne Kopieren
- 9 Workloads für alle Datenaufgaben — Power BI ist eine davon
- Alle Rollen arbeiten auf denselben Daten — keine Silos
- Copilot, Daten-Agents und Fabric IQ bauen auf denselben OneLake-Daten auf

**Übergang zu Skript 04:**
> "Wir haben gerade gesehen, dass Copilot in Fabric überall verfügbar ist. Im nächsten Skript gehen wir gezielt auf Copilot für Power BI ein — was er konkret kann, wo er hilft und wo der Mensch weiterhin gebraucht wird."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren — Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Welche drei bestehenden Microsoft-Werkzeuge hat Fabric in einer Plattform vereint?

- a) Power BI, Excel, SharePoint
- b) Power BI, Azure Synapse Analytics, Azure Data Factory ✅
- c) Power BI, Azure DevOps, Microsoft Teams
- d) Power BI, SQL Server, Azure Blob Storage

> **Antwort:** b) — Fabric integriert genau diese drei Werkzeuge in eine einheitliche SaaS-Plattform.

---

**Frage 2:** Was ist OneLake und worauf basiert es technisch?

- a) Ein Power BI-Dashboard-Template, basiert auf SharePoint
- b) Ein KI-Assistent für Datenabfragen, basiert auf Azure OpenAI
- c) Der zentrale Datensee von Fabric, basiert auf Azure Data Lake Storage Gen2 ✅
- d) Ein Datenbankdienst für relationale Daten, basiert auf Azure SQL

> **Antwort:** c) — OneLake ist die zentrale Speicherarchitektur von Fabric und basiert auf ADLS Gen2.

---

**Frage 3:** Was ist ein Shortcut in Microsoft Fabric?

- a) Eine Tastenkombination zum schnellen Wechsel zwischen Workloads
- b) Ein Verweis auf externe Datenquellen, ohne Daten zu kopieren ✅
- c) Eine vorgefertigte Berichtsvorlage für Power BI
- d) Ein komprimiertes Dateiformat für schnellere Abfragen

> **Antwort:** b) — Shortcuts ermöglichen Zugriff auf Daten in externen Quellen (z. B. S3, ADLS, Dataverse) ohne Kopieren oder Duplizieren.

---

**Frage 4:** Welche Aussage zur Fabric-Workload Power BI ist korrekt?

- a) Power BI ist eine separate Anwendung und nicht Teil von Fabric
- b) Power BI ist die einzige Workload, die Daten in OneLake lesen kann
- c) Power BI ist eine der neun Workloads in Fabric und dient der Berichts- und Dashboard-Erstellung ✅
- d) Power BI in Fabric ersetzt Power BI Desktop vollständig

> **Antwort:** c) — Power BI ist als Workload in Fabric integriert; Power BI Desktop bleibt das Entwicklungswerkzeug.

---

**Frage 5:** Warum ist die Datenqualität im semantischen Modell entscheidend für die Nutzung von Copilot?

- a) Copilot greift auf externe Internetquellen zu und braucht keine lokalen Daten
- b) Copilot generiert Daten selbst und ist unabhängig vom Modell
- c) Copilot arbeitet auf Basis des semantischen Modells — schlechte Qualität führt direkt zu ungenauen Ergebnissen ✅
- d) Copilot funktioniert nur mit Daten aus OneLake, nicht aus Power BI Desktop

> **Antwort:** c) — Copilot ist so gut wie die zugrundeliegenden Daten. Saubere, gut strukturierte semantische Modelle sind die Voraussetzung für verlässliche KI-Ergebnisse.
