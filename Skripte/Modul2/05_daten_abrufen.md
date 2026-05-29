# Daten in Power BI abrufen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 05</div>
  <div class="pbi-page-title">Daten in Power BI abrufen</div>
  <div class="pbi-page-sub">Verbindungstypen, Speichermodi, Parameter, Leistung & Fehlerbehandlung</div>
</div>

Bevor ein Bericht in Power BI entstehen kann, müssen Daten aus einer oder mehreren Quellen geladen werden. In der Praxis liegen diese Daten selten an einem einzigen Ort — typischerweise sind relationale Datenbanken, Dateien, Cloud-Dienste und spezialisierte Analyseplattformen gleichzeitig involviert. Dieses Skript beschreibt, wie Power BI mit den verschiedenen Quelltypen umgeht und welche Entscheidungen beim Datenabruf zu treffen sind.

---

## Daten aus Dateien abrufen

### Unterstützte Dateiformate

Power BI kann Daten aus einer Vielzahl von Dateitypen laden, darunter Excel-Arbeitsmappen, CSV- und Textdateien sowie XML- und JSON-Dateien. Der Einstiegspunkt ist in Power BI Desktop immer **Start → Daten abrufen**.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 2-file-types-c.png — Symbole der unterstützten Flatfile-Formate (Excel, CSV, XML, JSON u. a.).</span>
</div>

### Speicherorte für Quelldateien

Der Speicherort einer Datei hat direkte Auswirkungen darauf, ob und wie Power BI Änderungen an der Quelle automatisch übernimmt:

| Speicherort | Verhalten |
|---|---|
| **Lokal** | Datei wird einmalig importiert — kein persistenter Link. Änderungen an der Originaldatei werden im Modell nicht reflektiert. Geeignet für statische Daten. |
| **OneDrive for Business** | Power BI stellt periodisch eine Verbindung her und synchronisiert Modell, Berichte und Dashboards automatisch bei Änderungen. |
| **OneDrive – Persönlich** | Ähnlich wie OneDrive for Business, erfordert jedoch persönliche Anmeldung und die Option „Angemeldet bleiben". Organisationsrichtlinien prüfen. |
| **SharePoint – Teamwebsite** | Wie OneDrive for Business; Verbindung über URL zum Stammordner oder direkte URL. |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Cloud-basierte Speicherorte (OneDrive, SharePoint) sind die empfohlene Wahl, wenn sich Daten regelmäßig ändern. Für unveränderliche Daten ist der lokale Import ausreichend.
</div>

### Verbindung herstellen und Daten laden

Nach Auswahl der Datei öffnet sich das **Navigator**-Fenster, in dem alle enthaltenen Tabellen und Blätter als Vorschau angezeigt werden. Von hier gibt es zwei Wege:

- **Laden** — Daten werden im aktuellen Zustand direkt ins Power BI-Modell übernommen
- **Daten transformieren** — öffnet den Power Query-Editor zur Bereinigung und Umformung vor dem Laden

### Quelldateipfad anpassen

Ändert sich der Speicherort einer Quelldatei, muss der Verbindungspfad in Power BI aktualisiert werden. Drei Wege stehen zur Verfügung: über die **Datenquelleneinstellungen**, die **Abfrageeinstellungen** oder den **Erweiterten Editor** in Power Query.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Beim Ändern eines Dateipfads muss die Verbindung zur selben Datei mit identischer Struktur wiederhergestellt werden. Gelöschte oder umbenannte Spalten in der Quelldatei führen zu Fehlern im Berichtsmodell.
</div>

---

## Daten aus relationalen Datenbanken abrufen

Power BI Desktop kann Verbindungen zu einer Vielzahl relationaler Datenbanken herstellen — lokal oder in der Cloud, darunter Microsoft SQL Server, Azure SQL Database, PostgreSQL und viele weitere.

### Verbindungsaufbau zu SQL Server

Nach Auswahl der Datenbankquelle über **Daten abrufen** werden Servername und Datenbankname angegeben. Im Datenkonnektivitätsmodus stehen **Importieren** (Standard und empfohlen) und **DirectQuery** zur Wahl.

Für die Authentifizierung stehen drei Methoden bereit:

| Methode | Einsatzbereich |
|---|---|
| **Windows** | Azure Active Directory-Anmeldeinformationen |
| **Datenbank** | Individuelle SQL Server-Anmeldeinformationen |
| **Microsoft-Konto** | Für Azure-Dienste |

### Daten per SQL-Abfrage importieren

Statt im Navigator einzelne Tabellen auszuwählen, können Daten auch direkt über eine SQL-Abfrage in den erweiterten Optionen gefiltert geladen werden. Dies ermöglicht es, nur die benötigten Spalten und Zeilen zu importieren.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Das Platzhalterzeichen <code>SELECT *</code> sollte vermieden werden — es lädt alle Spalten einer Tabelle, was zu redundanten Daten, Leistungsproblemen und zusätzlichem Normalisierungsaufwand führt. Immer nur die benötigten Spalten explizit angeben.
</div>

Eine `WHERE`-Klausel ist Best Practice, um nur relevante Datensätze zu laden. Noch besser: SQL-Abfragen in einer **Datenbankansicht (View)** kapseln, da Power BI dann **Query Folding** nutzen kann — die Transformationen werden direkt auf dem Datenbankserver ausgeführt statt lokal in Power BI.

### Verbindungseinstellungen nachträglich ändern

Datenquellenverbindungen lassen sich jederzeit anpassen — z. B. wenn Passwörter nach Ablauf erneuert werden müssen. Der Weg dazu: **Start → Daten transformieren → Datenquelleneinstellungen**.

---

## Parameter für dynamische Berichte

**Dynamische Berichte** erlauben es, Daten im Bericht zur Laufzeit nach Benutzervorgaben zu filtern, ohne separate Berichte für jeden Fall erstellen zu müssen.

### Parameter für einen einzelnen Wert

<div class="pbi-card">
  <span class="pbi-card-num">①</span>
  <span class="pbi-card-title">SQL-Abfrage mit Platzhalter vorbereiten</span>
  <span class="pbi-card-body">Verbindung zur Datenbank herstellen, SQL-Anweisung in den erweiterten Optionen einfügen, Daten im Power Query-Editor öffnen.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">②</span>
  <span class="pbi-card-title">Parameter anlegen</span>
  <span class="pbi-card-body">Im Power Query-Editor: Start → Parameter verwalten → Neuer Parameter. Name, Typ (z. B. Text) und Vorgeschlagenen Wert festlegen.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">③</span>
  <span class="pbi-card-title">Abfrage mit Parameter verknüpfen</span>
  <span class="pbi-card-body">Im Erweiterten Editor den festen Wert in der SQL-Anweisung durch <code>&ParameterName</code> ersetzen.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">④</span>
  <span class="pbi-card-title">Parameter im Bericht anwenden</span>
  <span class="pbi-card-body">Über Abfragen bearbeiten → Parameter bearbeiten kann der Wert jederzeit geändert werden. Der Bericht filtert die Daten entsprechend.</span>
</div>

### Parameter für mehrere Werte

Sollen mehrere Werte gleichzeitig übergeben werden, wird eine Excel-Tabelle mit einer Wertespalte als zweite Datenquelle geladen. Aus der ursprünglichen parametrisierten Abfrage wird eine **benutzerdefinierte Funktion** erstellt, die dann für jeden Wert in der Wertetabelle aufgerufen wird. Die ursprüngliche Abfrage sollte dabei vom Laden deaktiviert werden, damit sie nicht in der Feldliste des Berichts erscheint.

---

## Daten aus NoSQL-Datenbanken abrufen

NoSQL-Datenbanken (auch nicht-relational) speichern Daten ohne festes Tabellenschema — häufig als JSON-Dokumente. Ein verbreitetes Beispiel in Azure-Umgebungen ist **Azure Cosmos DB**.

### Verbindung zu Cosmos DB

Über **Daten abrufen → Weitere… → Azure → Azure Cosmos DB** werden Endpunkt-URL und Primärschlüssel (aus dem Azure-Portal) angegeben.

### JSON-Daten extrahieren und normalisieren

JSON-Daten liegen im Navigator zunächst als verschachtelte **Record**-Elemente vor — noch keine direkt nutzbare Tabellenstruktur. Im Power Query-Editor wird über die **Erweiterungs-Schaltfläche** (⇔) neben der Spaltenüberschrift ausgewählt, welche Felder extrahiert werden sollen. Nach dem Expandieren und Deaktivieren des Präfix-Kontrollkästchens entsteht eine reguläre Tabelle mit Zeilen und Spalten, die für Berichte genutzt werden kann.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 4-expand-record-ssm.png — Power Query-Editor mit Erweiterungsfunktion für verschachtelte JSON-Record-Spalten.</span>
</div>

---

## Daten aus Online-Diensten abrufen

Viele Organisationen nutzen Cloud-Anwendungen wie SharePoint, OneDrive, Dynamics 365 oder Google Analytics, die eigene Daten erzeugen. Über **Daten abrufen → Onlinedienste** stellt Power BI Konnektoren für diese Dienste bereit.

### Beispiel: SharePoint Online-Liste

Nach Auswahl von **SharePoint Online-Liste** wird die URL der SharePoint-Website eingegeben (nicht der vollständige Dateipfad, nur die Website-URL). Nach der Authentifizierung mit dem Microsoft-Konto öffnet sich das Navigator-Fenster mit allen verfügbaren Listen und Tabellen der Website.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-navigator-window-view-tables-ss.png — Navigator-Fenster nach Verbindung mit SharePoint mit verfügbaren Listen.</span>
</div>

---

## Speichermodus wählen

Beim Aufbau eines semantischen Modells muss für jede Tabelle festgelegt werden, wie Power BI auf die Daten zugreift. Der Speichermodus wird in der **Modell**-Ansicht über den Eigenschaftenbereich der Tabelle konfiguriert.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 6-storage-mode-ssm.png — Dropdown „Speichermodus" im Eigenschaftenbereich einer Tabelle in der Modell-Ansicht.</span>
</div>

| Speichermodus | Funktionsweise | Geeignet für |
|---|---|---|
| **Import** (Standard) | Lokale Kopie der Daten wird in der Power BI-Datei gespeichert. Alle Power BI-Features verfügbar (Q&A, Quick Insights). Aktualisierung geplant oder manuell. | Die meisten Szenarien; schnelle Abfrageleistung |
| **DirectQuery** | Keine lokale Datenkopie — jede Visualisierung sendet eine Live-Abfrage direkt an die Quelle. Daten immer aktuell. | Sicherheitsanforderungen gegen lokale Kopien; sehr große Datenmengen; Echtzeitbedarf |
| **Dual** (Komposit) | Tabelle kann je nach Kontext sowohl importiert als auch per DirectQuery abgerufen werden. Power BI wählt automatisch die effizientere Methode. | Zusammengesetzte Modelle mit gemischten Quellen |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Import ist die Standardeinstellung für neue Berichte und in den meisten Fällen die richtige Wahl. DirectQuery eignet sich besonders, wenn Sicherheitsrichtlinien keine lokalen Datenkopien erlauben oder wenn Datenmengen für einen Import zu groß sind.
</div>

---

## Daten aus Azure Analysis Services abrufen

**Azure Analysis Services** ist ein vollständig verwalteter PaaS-Dienst, der für Unternehmen geeignete, tabellarische semantische Modelle in der Cloud bereitstellt. Er ermöglicht das Kombinieren von Daten aus verschiedenen Quellen, das Definieren von Metriken und die sichere Bereitstellung eines einheitlichen Modells.

### Unterschied zu SQL Server

| Aspekt | SQL Server | Azure Analysis Services |
|---|---|---|
| Abfragesprache | T-SQL | DAX oder MDX |
| Berechnungen | In Power BI erstellt | Im Modell bereits vorhanden |
| Verbindungstyp | Import oder DirectQuery | Import oder **Live verbinden** |

### Live-Verbindung

Die Option **Live verbinden** ist bei Analysis Services besonders wertvoll: Daten und DAX-Berechnungen verbleiben im Analysis Services-Modell, ohne in Power BI importiert zu werden. Da Analysis Services eigene, schnelle Aktualisierungszyklen haben kann, werden Power BI-Berichte nahezu in Echtzeit aktualisiert — ohne einen separaten Power BI-Aktualisierungszeitplan.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Organisation speichert Finanzprognosen in Azure Analysis Services und Vertriebsdaten in SQL Server. Statt beide Quellen separat in Power BI zu laden, können alle Daten in Analysis Services konsolidiert und von Power BI per Live-Verbindung genutzt werden — die gesamte semantische Modellierung und alle DAX-Measures bleiben an einem Ort.
</div>

---

## Leistungsprobleme beim Datenabruf beheben

### Query Folding

<div class="pbi-definition">
  <strong>Query Folding</strong> Ein Mechanismus, bei dem Power Query die im Editor vorgenommenen Transformationsschritte als native Abfragen (z. B. SQL-SELECT-Anweisungen) an die Datenquelle zurückgibt, statt sie lokal in Power BI auszuführen. Die Verarbeitung erfolgt damit auf dem leistungsfähigen Datenbankserver, nicht auf dem Client.
</div>

Vorteile von Query Folding:

- **Schnellere Aktualisierungen** — Power BI muss Transformationen nicht lokal ausführen
- **Automatische Kompatibilität** — DirectQuery und Dual setzen Query Folding voraus

Im Power Query-Editor lässt sich prüfen, ob Query Folding für einen Schritt aktiv ist: Im Bereich **Angewendete Schritte** → Rechtsklick auf den letzten Schritt. Ist **Native Abfrage anzeigen** fett und auswählbar, ist Query Folding aktiv. Ist die Option ausgegraut, findet kein Folding statt.

Folgende Transformationen sind grundsätzlich nicht foldingfähig:

- Indexspalten hinzufügen
- Tabellen aus unterschiedlichen Quellen zusammenführen oder anfügen
- Datentyp einer Spalte ändern

Als Faustregel gilt: Lässt sich eine Transformation in eine SQL-SELECT-Anweisung mit `GROUP BY`, `WHERE`, `JOIN`, `UNION ALL` oder `SORT BY` übersetzen, ist Query Folding möglich.

### Abfragediagnose

Mit der **Abfragediagnose** lässt sich messen, wie lange einzelne Transformationsschritte dauern. Aufruf im Power Query-Editor über **Start → Extras → Diagnose starten**. Nach den Schritten auf **Diagnose beenden** und **Schrittdiagnose** klicken, um die Laufzeiten je Schritt zu sehen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 8-navigating-query-diagnostics-ss.png — Registerkarte „Tools" im Power Query-Editor mit den Optionen der Sitzungsdiagnose.</span>
</div>

### Weitere Optimierungsmaßnahmen

- **Verarbeitung in der Datenquelle** — So viele Transformationen wie möglich direkt in der Quelldatenbank durchführen, nicht in Power Query
- **Native SQL-Abfragen verwenden** — Bei DirectQuery auf SQL-Datenbanken keine gespeicherten Prozeduren oder Common Table Expressions (CTEs) verwenden
- **Datums- und Uhrzeitangaben trennen** — Kombinierte Datetime-Spalten vor dem Import in separate Datums- und Uhrzeitspalten aufteilen, um bessere Komprimierung zu ermöglichen

---

## Datenimportfehler lösen

Importfehler entstehen aus vielen Quellen — Netzwerkprobleme, Berechtigungen, Schemaänderungen oder Datentypkonflikte. Die häufigsten Fehlertypen und ihre Lösungen:

| Fehler | Ursache | Lösung |
|---|---|---|
| **Abfragetimeout abgelaufen** | Zu viele Daten auf einmal abgerufen; Serverrichtlinie | Weniger Spalten/Zeilen abrufen; Abfrage in kleinere Teile aufteilen und per Power Query zusammenführen |
| **Timeout abgelaufen (Power BI)** | Organisationsrichtlinie zum Schutz geteilter Ressourcen überschritten | Abfrage vereinfachen; Gruppierungen und Aggregationen nutzen; Daten in Teilabfragen aufteilen |
| **Keine als Tabelle formatierten Daten gefunden** | Excel-Daten sind nicht als formale Tabelle definiert | In Excel: Daten markieren → Strg+T → Als Tabelle formatieren, Spaltenüberschriften prüfen |
| **Datei wurde nicht gefunden** | Dateipfad geändert oder Berechtigungen entzogen | In Power Query: Abfrage auswählen → Abfrageeinstellungen → Zahnrad bei „Quelle" → Neuen Pfad angeben |
| **Datentypfehler / leere Spalten** | Power BI interpretiert den Datentyp falsch | In der SQL-Abfrage expliziten Cast durchführen, z. B. `CAST(Spalte AS varchar(10))` |

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 9-data-import-query-timeout-ss.png — Fehlermeldung bei abgelaufenem Abfragetimeout beim Datenabruf aus SQL Server.</span>
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Dateiquellen</div>
    <div class="pbi-summary-body">Excel, CSV, XML, JSON — lokal oder Cloud (OneDrive, SharePoint). Cloud-Speicher ermöglicht automatische Synchronisation bei Datenänderungen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Relationale Datenbanken</div>
    <div class="pbi-summary-body">Verbindung per Servername + Datenbank; Import oder DirectQuery wählen. SQL-Abfragen gezielt formulieren — kein SELECT *, WHERE-Klauseln nutzen, Views bevorzugen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Parameter</div>
    <div class="pbi-summary-body">Dynamische Berichte durch Parameter in SQL-Abfragen. Einzelwert-Parameter über Power Query anlegen; Mehrfachwerte über benutzerdefinierte Funktionen aus einer Werteliste.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Speichermodi</div>
    <div class="pbi-summary-body">Import (Standard): lokale Kopie, volle Feature-Unterstützung. DirectQuery: Live-Abfrage, immer aktuell, keine lokale Kopie. Dual: gemischter Modus für zusammengesetzte Modelle.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Query Folding</div>
    <div class="pbi-summary-body">Transformationen werden als native Abfragen an die Quelle zurückgegeben statt lokal ausgeführt. Bessere Leistung, Voraussetzung für DirectQuery und Dual.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Fehlerbehandlung</div>
    <div class="pbi-summary-body">Timeout → Abfrage reduzieren. Datei nicht gefunden → Pfad in Abfrageeinstellungen korrigieren. Datentypfehler → expliziten Cast in der SQL-Abfrage verwenden.</div>
  </div>
</div>
