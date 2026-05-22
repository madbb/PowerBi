# Microsoft Fabric – End-to-End-Analytics

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 1 · Skript 03</div>
  <div class="pbi-page-title">Microsoft Fabric</div>
  <div class="pbi-page-sub">End-to-End-Analyseplattform, OneLake, Workloads und KI-Funktionen</div>
</div>

Organisationen müssen Daten im großen Maßstab aufnehmen, vorbereiten, steuern und analysieren — häufig über getrennte Tools und Teams hinweg. Microsoft Fabric begegnet dieser Herausforderung mit einer einzigen integrierten Plattform, die den gesamten Daten- und KI-Lebenszyklus abdeckt.

---

## Was ist Microsoft Fabric?

<div class="pbi-definition">
  <strong>Microsoft Fabric</strong> Eine End-to-End-Analyseplattform auf SaaS-Basis (Software-as-a-Service), die eine einzige integrierte Umgebung bietet, in der Datenexperten und das Unternehmen gemeinsam an Datenprojekten arbeiten. Alle Daten werden in einem einheitlichen Datensee namens <strong>OneLake</strong> in einem einzigen offenen Format gespeichert.
</div>

Fabric integriert Funktionen aus bestehenden Microsoft-Tools — Power BI, Azure Synapse Analytics und Azure Data Factory — in eine einheitliche Plattform. Da alle Daten zentral in OneLake liegen, stehen dieselben Daten, die Berichte und Dashboards speisen, ohne separate Vorbereitungspipelines auch für KI-Funktionen wie Copilot, Daten-Agents und Fabric IQ zur Verfügung.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Fabric unterstützt auch eine <strong>Datengitter-Architektur</strong> (Data Mesh), die dezentralen Datenbesitz unter Beibehaltung zentraler Governance ermöglicht. Dadurch entfällt die Notwendigkeit eines direkten Azure-Ressourcenzugriffs.
</div>

---

## OneLake – die Datenspeicherarchitektur

<div class="pbi-definition">
  <strong>OneLake</strong> Die zentrale Datenspeicherarchitektur von Microsoft Fabric. OneLake vereint Daten aus verschiedenen Regionen und Clouds in einem einzigen logischen See — ohne Daten zu verschieben oder zu duplizieren. Es basiert auf <strong>Azure Data Lake Storage Gen2 (ADLS Gen2)</strong>.
</div>

### Technische Grundlagen

- Unterstützt verschiedene Formate: **Delta**, **Parquet**, **CSV** und **JSON**
- Alle Rechenmodule in Fabric speichern ihre Daten automatisch in OneLake
- Tabellendaten werden im **Delta-Parquet-Format** geschrieben — alle Analyse-Engines interagieren nahtlos damit
- Keine Datenbewegung oder -duplizierung zwischen Systemen erforderlich

<div class="pbi-definition">
  <strong>Shortcuts</strong> Verweise auf Dateien oder Speicherorte in OneLake oder externen Datenquellen (z. B. Azure Data Lake Storage, Amazon S3, Dataverse). Shortcuts ermöglichen den Zugriff auf vorhandene Daten, ohne sie zu kopieren — Fabric synchronisiert sich mit der Quelle.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: onelake-architecture.png — Diagramm der Fabric-Compute-Engines (Data Engineering, Data Warehouse, Data Factory, Power BI, Real-Time Intelligence), die alle auf denselben OneLake-Datenspeicher zugreifen.</span>
</div>

### Arbeitsbereiche in Fabric

In Microsoft Fabric sind **Arbeitsbereiche** logische Container zur Organisation von Daten, Berichten und weiteren Ressourcen. Sie bilden die Grundlage für Zusammenarbeit und Zugriffskontrolle.

Konfigurierbare Einstellungen pro Arbeitsbereich:

- Lizenztyp (bestimmt verfügbare Fabric-Funktionen)
- Zugriff auf OneDrive für den Arbeitsbereich
- Azure Data Lake Gen2 Storage-Verbindung
- **Git-Integration** für Versionskontrolle
- Spark-Auslastungseinstellungen zur Leistungsoptimierung
- **Datenlinienansicht** — visuelle Darstellung des Datenflusses und seiner Abhängigkeiten

Zugriff auf einen Arbeitsbereich wird über **vier Rollen** gesteuert:

| Rolle | Bedeutung |
|---|---|
| **Administrator** | Vollzugriff, inkl. Einstellungen und Rollenverwaltung |
| **Mitglied** | Inhalte erstellen, bearbeiten und veröffentlichen |
| **Mitwirkender** | Inhalte erstellen und bearbeiten |
| **Viewer** | Nur Lesezugriff |

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Wichtig</span>
  Arbeitsbereichsrollen gelten für <em>alle</em> Elemente im Arbeitsbereich. Für feinere Zugriffssteuerung sollten zusätzlich <strong>Berechtigungen auf Elementebene</strong> auf Basis geschäftlicher Anforderungen vergeben werden.
</div>

### Verwaltung und Governance

Die zentrale Verwaltung von Fabric erfolgt im **Verwaltungsportal**. Dort können Administratoren:

- Gruppen und Berechtigungen verwalten
- Datenquellen und Gateways konfigurieren
- Nutzung und Leistung überwachen
- Über Fabric-Administrator-APIs und SDKs allgemeine Aufgaben automatisieren

<div class="pbi-definition">
  <strong>OneLake-Katalog</strong> Ein integriertes Tool in Microsoft Fabric zum Analysieren, Überwachen und Verwalten von Datenverwaltung (Data Governance). Es liefert Anleitungen für Vertraulichkeitsbezeichnungen, Elementmetadaten und Datenaktualisierungsstatus sowie Einblicke in den Governance-Status. Benutzer sehen nur Elemente, die für sie freigegeben wurden.
</div>

Beim Arbeiten mit dem OneLake-Katalog empfiehlt sich:

- Ergebnisse nach **Arbeitsbereichen oder Domänen** eingrenzen (sofern implementiert)
- **Standardkategorien** durchsuchen, um relevante Daten schnell zu finden
- Nach **Schlüsselwort oder Elementtyp** filtern

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: onelake-catalog.png — Ansicht des OneLake-Katalogs in Microsoft Fabric mit Filtermöglichkeiten nach Arbeitsbereich, Domäne und Elementtyp.</span>
</div>

---

## Rollen und Zusammenarbeit in Fabric

### Herausforderungen traditioneller Analyse-Teams

In klassischen Analyseumgebungen entstehen typische Probleme durch die Fragmentierung von Aufgaben und Systemen:

- **Data Engineers** müssen Daten für Analysten aufbereiten — umfangreiche Koordination führt zu Verzögerungen und Fehlinterpretationen
- **Datenanalysten** müssen häufig nachgelagerte Transformationen durchführen, bevor sie Berichte erstellen können — zeitaufwändig und kontextarm
- **Data Scientists** kämpfen mit der Integration systemeigener Techniken in komplexe Bestandssysteme

### Rollen im Fabric-Ökosystem

Fabric löst diese Fragmentierung durch eine gemeinsame Plattform. Jede Rolle arbeitet auf denselben Daten in OneLake:

| Rolle | Hauptaufgaben in Fabric |
|---|---|
| **Datentechniker** (Data Engineer) | Daten per Pipeline in OneLake aufnehmen, transformieren und laden; Daten im Delta-Parquet-Format in Lakehouses speichern; komplexe Transformationen per Notebook |
| **Analyseingenieur** (Analytics Engineer) | Lücke zwischen Engineering und Analyse schließen; Datenqualität sichern; semantische Modelle in Power BI erstellen |
| **Datenanalyst** (Data Analyst) | Daten vorgelagert per Datenfluss transformieren; direkte Verbindung mit OneLake im Direct Lake-Modus; interaktive Berichte in Power BI erstellen |
| **Data Scientist** | Machine Learning-Modelle in Notebooks (Python, Spark) erstellen; Daten in Lakehouses nutzen; Integration mit Azure Machine Learning |
| **Low-/No-Code-Benutzer** | Kuratierte Datensätze über den OneLake-Katalog entdecken; Power BI-Vorlagen nutzen; einfache ETL per Datenfluss; Fragen per Copilot in natürlicher Sprache stellen |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Jede Rolle trägt direkt zur KI-Fähigkeit der Organisation bei: Techniker, die saubere, kontrollierte Daten in OneLake bereitstellen, bilden die Grundlage für Copilot und KI-Agents. Analyseingenieure, die konsistente semantische Modelle erstellen, liefern den Geschäftskontext für KI-Antworten.
</div>

---

## Fabric-Workloads

Nachdem ein für Fabric aktivierter Arbeitsbereich erstellt ist, können Elemente über verschiedene Workloads erstellt werden:

| Workload | Zweck |
|---|---|
| **Data Engineering** | Lakehouses erstellen; Workflows zur Datenaufbereitung und -weitergabe operationalisieren |
| **Data Factory** | Daten aufnehmen, transformieren und koordinieren |
| **Data Warehouse** | Mehrere Quellen in einem klassischen Warehouse für Analysen zusammenführen |
| **Real-Time Intelligence** | Streamingdaten verarbeiten, überwachen und analysieren |
| **Data Science** | Trends erkennen, Ausreißer identifizieren, Werte per Machine Learning vorhersagen |
| **Datenbanken** | Datenbanken erstellen und verwalten (Einfügen, Abfragen, Extrahieren) |
| **Industry Solutions** | Sofort einsatzbereite Branchendatenlösungen verwenden |
| **IQ (Vorschau)** | Daten über OneLake vereinheitlichen und gemäß Unternehmenssprache organisieren |
| **Power BI** | Berichte und Dashboards für datengesteuerte Entscheidungen erstellen |

---

## KI-Funktionen in Microsoft Fabric

### Fabric IQ

<div class="pbi-definition">
  <strong>Fabric IQ (Vorschau)</strong> Eine Fabric-Workload zum Vereinheitlichen von Daten in OneLake und zu deren Organisation gemäß der Unternehmenssprache. Das Kernelement ist die <strong>Ontologie</strong> — sie definiert Geschäftskonzepte, Beziehungen und Regeln, sodass KI-Agents domänenübergreifend mit konsistenter Geschäftssprache statt roher Tabellenschemata arbeiten können.
</div>

Fabric IQ ist Teil eines dreiteiligen IQ-Ökosystems:

| IQ-Workload | Funktion |
|---|---|
| **Fabric IQ** | Modelliert Geschäftsdaten (Ontologien, semantische Modelle, Diagramme) für Agents, die über Analysen in OneLake und Power BI schlussfolgern sollen |
| **Foundry IQ** | Verbindet strukturierte und unstrukturierte Daten über Azure, SharePoint, OneLake und das Web — ermöglicht Agents den Zugriff auf unternehmensweites Wissen |
| **Work IQ** | Erfasst Signale aus Dokumenten, Besprechungen, Chats und Workflows — gibt Agents Einblick in die Funktionsweise der Organisation |

Jede IQ-Workload ist eigenständig nutzbar, kann aber kombiniert werden, um Agents einen umfassenden Organisationskontext bereitzustellen.

### Daten-Agents

<div class="pbi-definition">
  <strong>Fabric-Daten-Agents</strong> Konversationsschnittstellen, über die Benutzer Fragen zu Organisationsdaten in natürlicher Sprache stellen können. Agents übersetzen diese Fragen in strukturierte Abfragen gegen Lakehouses, Warehouses und semantische Modelle. In Verbindung mit Fabric IQ können Agents die hinterlegte Ontologie als Quelle nutzen.
</div>

### Copilot in Fabric

Microsoft Copilot ist ein generativer KI-Assistent, der für alle Fabric-Workloads verfügbar ist. Die wichtigsten Einsatzbereiche:

- **Code-Abschluss und -Generierung** — intelligente Codevorschläge in Notebooks; SQL-Abfragen aus natürlichsprachlichen Beschreibungen; KQL-Übersetzungen für Echtzeitanalysen
- **Datentransformationsleitfaden** — in Data Factory unterstützt Copilot mit Codegenerierung und verständlichen Spracherklärungen komplexer Transformationslogik
- **Bericht- und Insight-Generierung** — in Power BI generiert Copilot automatisch Berichte, erstellt Seitenzusammenfassungen und ermöglicht Fragen an Daten in natürlicher Sprache

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Copilot in Microsoft Fabric ist standardmäßig aktiviert. Administratoren können es im <strong>Admin-Portal → Mandanteneinstellungen</strong> deaktivieren oder den Zugriff für bestimmte Sicherheitsgruppen oder auf Kapazitätsebene steuern.
</div>

---

## Fabric aktivieren

Bevor Fabric genutzt werden kann, muss es für die Organisation aktiviert sein. Dafür zuständige Rollen:

- **Fabric-Administrator** — verwaltet Fabric-Einstellungen und -Konfigurationen
- **Power Platform-Administrator** — überwacht Power Platform-Dienste einschließlich Fabric
- **Globaler Administrator** — verfügt über implizite Fabric-Administratorrechte über organisationsweite Berechtigungen

Die Aktivierung erfolgt im **Admin-Portal → Mandanteneinstellungen** im Power BI-Dienst. Fabric kann für die gesamte Organisation oder für bestimmte Microsoft 365 / Microsoft Entra-Sicherheitsgruppen aktiviert werden. Administratoren können diese Berechtigung auch auf Kapazitätsebene delegieren.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Wenn die Organisation Fabric noch nicht nutzt, steht eine kostenlose Testversion unter <strong>Microsoft Fabric Trial</strong> zur Verfügung, um die Plattform zunächst zu erkunden.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🏗️</div>
    <div class="pbi-summary-title">Was ist Fabric?</div>
    <div class="pbi-summary-body">End-to-End-SaaS-Analyseplattform. Vereint Power BI, Azure Synapse Analytics und Azure Data Factory in einer integrierten Umgebung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🌊</div>
    <div class="pbi-summary-title">OneLake</div>
    <div class="pbi-summary-body">Zentraler Datensee auf Basis von ADLS Gen2. Alle Fabric-Workloads schreiben Daten im Delta-Parquet-Format — keine Duplizierung, keine Bewegung nötig.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔗</div>
    <div class="pbi-summary-title">Shortcuts</div>
    <div class="pbi-summary-body">Verweise auf externe Daten (ADLS, S3, Dataverse) ohne Kopieren. Fabric synchronisiert sich mit der Quelle und wahrt Datenkonsistenz.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">👥</div>
    <div class="pbi-summary-title">Rollen & Zusammenarbeit</div>
    <div class="pbi-summary-body">Data Engineer, Analytics Engineer, Analyst, Data Scientist und Low-Code-Benutzer arbeiten auf denselben OneLake-Daten — ohne Silos und Duplizierungen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">⚙️</div>
    <div class="pbi-summary-title">Workloads</div>
    <div class="pbi-summary-body">9 spezialisierte Workloads: Data Engineering, Data Factory, Warehouse, Real-Time Intelligence, Data Science, Databases, Industry Solutions, IQ und Power BI.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🤖</div>
    <div class="pbi-summary-title">KI-Integration</div>
    <div class="pbi-summary-body">Copilot (workloadübergreifend), Daten-Agents (natürlichsprachliche Abfragen) und Fabric IQ (Ontologien für KI-Reasoning) bauen auf denselben geregelten OneLake-Daten auf.</div>
  </div>
</div>
