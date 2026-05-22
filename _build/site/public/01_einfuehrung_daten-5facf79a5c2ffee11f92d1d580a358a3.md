# Einführung in die Datenanalyse

<div class="pbi-page-header">
  <div class="pbi-page-meta">PL-300 Power BI Data Analyst &nbsp;·&nbsp; Modul 1 &nbsp;·&nbsp; Skript 1</div>
  <div class="pbi-page-title">Einführung in die Datenanalyse</div>
  <div class="pbi-page-sub">Datenanalyse · Analysekategorien · Datenrollen · Aufgaben eines Data Analysts</div>
</div>

Daten sind heute eine der wertvollsten Ressourcen eines Unternehmens — aber nur wenn sie richtig genutzt werden. Viele Unternehmen sitzen auf immensen Datenmengen und schöpfen deren Potenzial kaum aus. Datenanalyse ist der Prozess, der Rohdaten in handlungsrelevante Erkenntnisse verwandelt: durch Identifizieren, Bereinigen, Transformieren und Modellieren von Daten — mit dem Ziel, eine Datengeschichte zu erzählen, die den Entscheidungsprozess unterstützt.

---

## Die fünf Kategorien der Datenanalyse

<div class="pbi-subsection"><span>Überblick</span></div>

| Kategorie | Kernfrage | Beschreibung |
|---|---|---|
| **Beschreibend** | Was ist geschehen? | Fasst historische Daten zusammen. Basis für KPIs und ROI-Berichte. |
| **Diagnostisch** | Warum ist es geschehen? | Identifiziert Anomalien, korreliert Daten, erklärt Ursachen von Ereignissen. |
| **Prädiktiv** | Was wird passieren? | Nutzt historische Muster zur Wahrscheinlichkeitsabschätzung künftiger Entwicklungen. Methoden: neuronale Netze, Entscheidungsstrukturen, Regressionen. |
| **Präskriptiv** | Was sollte getan werden? | Empfiehlt Aktionen zur Zielerreichung auf Basis aller vorgelagerten Erkenntnisse. Stützt sich auf maschinelles Lernen. |
| **KI-gestützt** | Welche Muster stecken in den Daten? | Verarbeitet riesige Datenmengen mit minimalem menschlichem Eingriff. Umfasst Sprachverarbeitung, Bilderkennung und Codegenerierung. |

<div class="pbi-example">
<span class="pbi-badge">Beispiel: Alle fünf Kategorien kombiniert</span>
Ein Einzelhandelsunternehmen nutzt beschreibende Analysen um Konsummuster der vergangenen Jahre zu untersuchen. Diagnostische Analysen klären ob Umsatzanstiege auf Marketingkampagnen oder Social-Media-Aktivitäten zurückzuführen sind. Prädiktive Modelle schätzen welche Produkte weiterhin gefragt sein werden. Präskriptive Analysen empfehlen ob Produkte weiter bevorratet werden sollen. KI-Funktionen analysieren laufend Kundenbewertungen in Echtzeit.
</div>

<div class="pbi-subsection"><span>Datenanalyse und Vertrauen in Daten</span></div>

Eine Grundvoraussetzung für wirksame Datenanalyse ist das **Vertrauen eines Unternehmens in seine eigenen Daten**. Daten müssen aus vertrauenswürdigen Quellen bezogen, in eine verständliche Form gebracht und als Grundlage für Entscheidungen genutzt werden. Datenanalyse ist und sollte ein wichtiger Aspekt in allen Unternehmen sein — für Kundenstimmungsbewertung, Markt- und Produktforschung sowie die Ermittlung von Trends.

---

## Datenrollen

Moderne Datenarbeit erfordert spezialisierte Rollen. Die folgende Tabelle gibt einen vollständigen Überblick — inklusive Überschneidungen und Abgrenzungen:

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Abbildung: Übersicht der fünf Datenrollen (roles-data-ss.png) — grafische Gegenüberstellung von Business Analyst, Data Analyst, Data Engineer, Analytics Engineer und Data Scientist.</span>
</div>

| Rolle | Kernaufgaben | Abgrenzung |
|---|---|---|
| **Business Analyst** | Wirtschaftliche Abläufe analysieren, visualisierte Daten interpretieren, Geschäftsentscheidungen unterstützen | Fokus liegt auf der Interpretation — nicht auf der technischen Datenaufbereitung. Kann von derselben Person wie ein Data Analyst ausgeübt werden. |
| **Data Analyst** | Daten profilieren, bereinigen, transformieren; Datenmodelle aufbauen; Berichte und Dashboards erstellen; Power BI-Ressourcen verwalten | Schnittstelle zwischen Rohdaten und Entscheidungsträgern. Verantwortlich für Schutzmaßnahmen und Sicherheit der Power BI-Anlagen. |
| **Data Engineer** | Datenplattformtechnologien bereitstellen und einrichten; Datenfluss strukturierter und unstrukturierter Daten verwalten; ETL-Prozesse aufbauen; Datendienste sicher integrieren | Reicht über Datenbankadministration hinaus. Schafft die Dateninfrastruktur auf der Data Analysts aufbauen. Data Wrangling beschleunigt Data-Science-Projekte. |
| **Analytics Engineer** | Datenvermögenswerte in Data Lakes/Lakehouses kuratieren; Datenqualität sicherstellen; semantische Modelle in Power BI erstellen; Self-Service-Analysen ermöglichen | Schließt die Lücke zwischen Data Engineer und Data Analyst. Näher am Unternehmen als ein Data Engineer, stärker technisch als ein Data Analyst. |
| **Data Scientist** | Erweiterte Analysen durchführen (EDA, Predictive Analytics); Machine-Learning-Modelle entwickeln; Anomalien und Muster erkennen; Deep-Learning-Experimente | Wendet sich für Visualisierung und Berichterstellung an einen Data Analyst. Kann Experimentiervorgang beschleunigen wenn Data Engineers das Data Wrangling übernehmen. |

<div class="pbi-example">
<span class="pbi-badge">Zusammenarbeit in der Praxis</span>
Als Data Analyst arbeiten Sie eng mit dem Data Engineer zusammen, um Zugriff auf strukturierte und unstrukturierte Datenquellen zu erhalten — üblicherweise aus einem modernen Data Warehouse oder Data Lake. Data Scientists wenden sich für Visualisierung und Berichterstellung an Sie, nachdem sie ihre Hypothesen entwickelt haben.
</div>

---

## Aufgaben eines Data Analysts

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Abbildung: Die fünf Aufgabenbereiche eines Data Analysts (tasks-data-analyst-ss.png) — kreisförmige Darstellung der Bereiche Vorbereiten, Modellieren, Visualisieren, Analysieren und Verwalten.</span>
</div>

### Vorbereiten

Profilerstellung, Bereinigung und Transformation von Rohdaten — bevor ein Bericht erstellt werden kann. Konkret bedeutet das:

- Datenintegrität sicherstellen, fehlerhafte und ungenaue Daten korrigieren
- Fehlende Daten identifizieren und behandeln
- Daten zwischen Strukturen und Typen konvertieren
- Die richtige **Art der Verbindung** zur Datenquelle wählen und deren Auswirkungen auf die Leistung bewerten
- **Datenschutz und Sicherheit** gewährleisten: Daten anonymisieren oder entfernen wo nötig, um personenbezogene Informationen zu schützen

<div class="pbi-admonition pbi-warning">
<span class="pbi-admonition-title">⚠️ Wichtig</span>
Fehlerhafte oder falsche Daten führen zu ungültigen Berichten, Vertrauensverlust und negativen Geschäftsentscheidungen. Die Datenaufbereitung ist der zeitaufwändigste Schritt — ein iterativer Prozess der sich durch das gesamte Projekt zieht.
</div>

### Modellieren

Sobald die Daten aufbereitet sind, beginnt die Modellierung — die Definition wie Tabellen miteinander verknüpft werden:

- **Beziehungen** zwischen Tabellen definieren und erstellen
- **Metriken** definieren und **benutzerdefinierte Berechnungen** hinzufügen
- Modell auf Genauigkeit und Leistung optimieren

Ein effektives semantisches Modell macht Berichte genauer, ermöglicht schnellere Datenuntersuchung, verkürzt die Berichtserstellungszeit und vereinfacht zukünftige Wartung. Ein unzureichend konzipiertes Modell hat drastische Auswirkungen auf Genauigkeit und Leistung.

<div class="pbi-admonition pbi-info">
<span class="pbi-admonition-title">💡 Hinweis</span>
Wenn ein Bericht in Power BI langsam ausgeführt wird oder Aktualisierungen lange dauern, liegt die Ursache meist in der Datenvorbereitung oder Modellierung — nicht in der Visualisierung.
</div>

### Visualisieren

Daten zum Leben erwecken: ein effektiver Bericht erzählt eine **ansprechende Geschichte** und führt Entscheidungsträger zielgerichtet durch den Inhalt. Zentrale Aspekte:

- Geeignete **Visualisierungen** und **Interaktionen** wählen
- Berichte auf **Barrierefreiheit** auslegen: Farbschemas, Schriftgrößen, geeignete Visuals für alle Nutzergruppen
- **KI-Funktionen** nutzen: integrierte KI-Visuals, Quick Insights, Copilot — ohne Code schreiben zu müssen
- Kurze, präzise Datengeschichten bevorzugen — mehr Datenpunkte bedeuten nicht automatisch bessere Erkenntnisse

### Analysieren

Informationen im Bericht verstehen, interpretieren und kommunizieren:

- **Erkenntnisse gewinnen**, Muster und Trends identifizieren
- Zukünftige Entwicklungen **vorhersagen**
- Erkenntnisse so kommunizieren, dass alle Beteiligten sie verstehen können
- Erweiterte Analysefunktionen von Power BI nutzen — Integrationen mit Azure Machine Learning, Cognitive Services und Copilot

### Verwalten

Verantwortung für alle Power BI-Ressourcen einer Organisation:

- **Berichte, Dashboards, Arbeitsbereiche und semantische Modelle** pflegen und überwachen
- **Freigabe und Verteilung** von Inhalten steuern — über Apps für große Zielgruppen
- **Sicherheit** gewährleisten: die richtigen Personen haben Zugriff auf die richtigen Daten
- **Datensilos reduzieren** durch gemeinsam genutzte semantische Modelle und Wiederverwendung aufbereiteter Daten
- Wichtige Geschäftsdaten als **zertifiziert** kennzeichnen, um Vertrauen in diese Daten zu stärken

---

## Zusammenfassung

<div class="pbi-summary-grid">
<div class="pbi-summary-card">
  <div class="pbi-summary-icon">📊</div>
  <div class="pbi-summary-title">5 Analysekategorien</div>
  <div class="pbi-summary-body">Beschreibend · Diagnostisch · Prädiktiv · Präskriptiv · KI-gestützt</div>
</div>
<div class="pbi-summary-card">
  <div class="pbi-summary-icon">👥</div>
  <div class="pbi-summary-title">5 Datenrollen</div>
  <div class="pbi-summary-body">Business Analyst · Data Analyst · Data Engineer · Analytics Engineer · Data Scientist</div>
</div>
<div class="pbi-summary-card">
  <div class="pbi-summary-icon">✅</div>
  <div class="pbi-summary-title">5 Analyst-Aufgaben</div>
  <div class="pbi-summary-body">Vorbereiten · Modellieren · Visualisieren · Analysieren · Verwalten</div>
</div>
</div>
