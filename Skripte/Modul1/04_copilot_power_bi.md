# Copilot für Power BI

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 1 · Skript 04</div>
  <div class="pbi-page-title">Copilot für Power BI</div>
  <div class="pbi-page-sub">Daten vorbereiten, modellieren, Berichte und Zusammenfassungen mit KI erstellen</div>
</div>

Copilot für Power BI nutzt generative KI, um die Berichtsentwicklung zu beschleunigen — von der Datenaufbereitung über das Modelldesign bis zur automatischen Erstellung von Berichtsseiten und Zusammenfassungen. Dabei ersetzt Copilot das Fachwissen der Anwender nicht, sondern unterstützt gezielt bei zeitaufwändigen und wiederholenden Aufgaben.

---

## Was Copilot für Power BI leisten kann

Die typische Berichtsentwicklung in Power BI umfasst drei Phasen, in denen Copilot jeweils unterstützen kann:

| Phase | Manuelle Aufgaben (bleiben beim Entwickler) | Copilot-Unterstützung |
|---|---|---|
| **Daten vorbereiten & modellieren** | Datenprofiling, Bereinigung, Transformation in Power Query | Beziehungen zusammenfassen, Kennzahlen vorschlagen, DAX generieren |
| **Daten visualisieren & analysieren** | Berichtsanforderungen definieren, Daten interpretieren | Berichtsseiten generieren, Inhalte vorschlagen, Fragen beantworten |
| **Berichte sichern & verteilen** | Veröffentlichung, Zugriffssteuerung | Zusammenfassungen & Narrativ-Visuals erstellen |

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Wichtig</span>
  Die anfängliche Datenbereinigung und -transformation bleibt Aufgabe des Entwicklers. Copilot kann nur dann effektiv arbeiten, wenn das semantische Modell qualitativ hochwertig vorbereitet ist. Außerdem ist ein Konto mit Schreibzugriff auf einen Arbeitsbereich der Kapazität <strong>F64 oder Power BI Premium</strong> erforderlich.
</div>

---

## Daten für Copilot vorbereiten

### Datenqualität sicherstellen

Copilot arbeitet auf Basis des semantischen Modells — schlechte Datenqualität führt direkt zu ungenauen oder nutzlosen Ergebnissen. Folgende Qualitätsdimensionen sind zu prüfen:

| Dimension | Problem bei Verletzung |
|---|---|
| **Vollständigkeit** | Fehlende Werte erzeugen Lücken in Visuals |
| **Gültigkeit** | Außerhalb des Bereichs liegende Werte verfälschen Darstellung und Ergebnisse |
| **Konsistenz** | Inkonsistente Daten beeinflussen datumsbezogene Visuals |
| **Eindeutigkeit** | Duplikate beeinträchtigen die Datengenauigkeit |
| **Datenbeziehungen** | Ohne Beziehungen sind tabellenübergreifende Visuals nicht möglich |
| **DAX-Berechnungen** | Fehlende Berechnungen reduzieren die möglichen Erkenntnisse |

### Daten mit Power Query vorbereiten

Power Query ist der erste und unverzichtbare Schritt vor dem Einsatz von Copilot. Die drei Kernaufgaben in Power Query:

1. **Daten profilieren** — Spaltenqualität, -verteilung und -profil bewerten
2. **Daten bereinigen** — Inkonsistenzen, unerwartete Werte und NULL-Werte beheben
3. **Daten transformieren** — benutzerfreundliche Namenskonventionen für Spalten und Abfragen einführen, Datentypen anpassen, Formtransformationen anwenden

---

## Semantisches Modell mit Copilot gestalten

### Beziehungen aufbauen

Beziehungen zwischen Tabellen ermöglichen es, Daten in Berichtsvisuals zu filtern und zusammenzufassen. Als Ausgangspunkt kann die automatische Beziehungserkennung in Power BI verwendet werden. Anschließend lässt sich das initiale Modell mit Copilot zusammenfassen, um zu ermitteln, ob weitere Beziehungen erforderlich sind.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Power BI-Berichte funktionieren am besten mit einem <strong>Stern- oder Schneeflockenschema</strong> — einer zentralen Faktentabelle, die mit Dimensionstabellen über Beziehungen verbunden ist.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 06-example-data-model-1-ss.png — Semantisches Modell im Sternschema mit einer Faktentabelle und mehreren per Beziehung verbundenen Dimensionstabellen.</span>
</div>

### Quickmeasures erstellen

Wenn die vorliegenden Daten die Geschäftsfragen nicht direkt beantworten können, werden Kennzahlen über **DAX (Data Analysis Expressions)** erstellt. DAX ist eine funktionale Sprache — sie konzentriert sich auf Funktionen zur Berechnung von Ergebnissen, was im Vergleich zu mengenbasierten Sprachen zunächst kontraintuitiv wirken kann.

**Quickmeasures** ermöglichen das Erstellen von Kennzahlen mit minimalem Aufwand: Datenfelder werden zugewiesen, Power BI generiert den DAX-Code. Quickmeasures helfen gleichzeitig dabei, DAX-Schreibweise zu erlernen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: quick-measures.png — Bereich "Quickmeasures" in Power BI Desktop mit vorausgefüllten Optionen wie Durchschnittswerten und Filtern.</span>
</div>

### DAX mit Copilot in der DAX-Abfrageansicht

Power BI Desktop bietet vier Ansichten: **Bericht**, **Tabelle**, **Modell** und **DAX-Abfrage**. In der Ansicht **DAX-Abfrage** kann Copilot über das Menüband aufgerufen werden, um DAX-Abfragen aus natürlichsprachlichen Beschreibungen zu generieren.

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eingabeaufforderung: <em>"total sales for all salespeople individually for all items in the accessories category"</em> — Copilot generiert daraus eine vollständige SUMMARIZECOLUMNS-Abfrage, die den Gesamtumsatz jedes Verkäufers für die Kategorie "Zubehör" berechnet.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-query-output.png — Generierte DAX-Abfrage in der DAX-Abfrageansicht mit Ergebnistabelle (Verkäufer und Gesamtumsatz).</span>
</div>

**Kennzahlen aus DAX-Abfragen erstellen:** Mit der Eingabeaufforderung `suggest measures` schlägt Copilot geeignete neue Kennzahlen vor (z. B. durchschnittlicher Gewinn pro Produkt, Umsatz pro Handelspartner). Über **Modell mit Änderungen aktualisieren** werden die ausgewählten Kennzahlen dauerhaft ins semantische Modell übernommen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-query-suggest-measures.png — Copilot-generierte Kennzahlvorschläge in der DAX-Abfrageansicht mit Tabellenergebnissen.</span>
</div>

---

## Berichte mit Copilot erstellen

### In Power BI Desktop

Der Copilot-Bereich wird über die Schaltfläche **Copilot** im Menüband geöffnet und zeigt vorgeschlagene Eingabeaufforderungen sowie ein Chat-Feld. Typische Eingabeaufforderungen:

- *Eine neue Berichtsseite erstellen*
- *Inhalte für eine neue Berichtsseite vorschlagen*
- *Diese Datenfrage beantworten …* (eigene Frage eintippen)

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Nach Angabe von Name und Beschreibung generiert Copilot eine vollständige Berichtsseite in einheitlichem Design — inklusive Kopfzeile mit Datenschnitten, Kartenvisuals für Umsatz/Kosten/Gewinn, Flächendiagramme im Zeitverlauf, Säulendiagramme nach Produkt und ein Kartenvisual nach Region.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: copilot-pane.png — Copilot-Bereich in Power BI Desktop mit vorgeschlagenen Eingabeaufforderungen und Chat-Feld.</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: copilot-generated-report.png — Von Copilot generierte Berichtsseite mit Datenschnitten, Karten-, Flächen- und Säulendiagrammen sowie Kartenvisual.</span>
</div>

### Im Power BI-Dienst

Beim Veröffentlichen eines Berichts aus Power BI Desktop entstehen im Arbeitsbereich zwei separate Elemente:

- **Semantisches Modell** — die zugrunde liegenden Daten einschließlich Beziehungen und Kennzahlen
- **Bericht** — die visuelle Darstellung aus der Berichtsansicht in Desktop

Für die Berichtserstellung direkt im Dienst: Auslassungspunkte (...) am semantischen Modell → **Bericht erstellen** → Copilot-Schaltfläche öffnet denselben Bereich mit vorgeschlagenen Eingabeaufforderungen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: create-reports-1.png — Power BI-Dienst mit Kontextmenü eines semantischen Modells und hervorgehobener Option "Bericht erstellen".</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: service-copilot-pane.png — Copilot-Bereich im Power BI-Dienst mit vorgeschlagenen Eingabeaufforderungen.</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: service-generated-report.png — Im Power BI-Dienst von Copilot generierte Berichtsseite "Produktkosten und Rentabilität" mit Karten-, Balken- und Flächendiagrammen.</span>
</div>

### Benutzerdefinierte Eingabeaufforderungen

Neben den vorgeschlagenen Eingabeaufforderungen können eigene formuliert werden, z. B.:
- *Eine Seite erstellen, auf der die 10 umsatzstärksten Produkte angezeigt werden*
- *Ein Visual erstellen, das die drei wichtigsten Farben für alle verkauften Produkte zeigt*

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Wichtig</span>
  Copilot-Ergebnisse sind als <strong>erster Entwurf</strong> zu betrachten, der vor der Fertigstellung überprüft werden muss. KI-generierte Antworten können Fehler enthalten. Copilot wird kontinuierlich weiterentwickelt — Screenshots und Vorschläge können von der aktuellen Umgebung abweichen. Wenn Copilot nicht angezeigt wird, wurde es möglicherweise vom Administrator nicht aktiviert oder es ist kein semantisches Modell ausgewählt.
</div>

---

## Zusammenfassungen mit Copilot erstellen

Zusammenfassungen halten die Zielgruppe durch einen klaren, prägnanten Überblick engagiert und sichern die Kernbotschaft des Berichts. Sie sind Teil des Storytelling-Prozesses.

### Narrativ-Visual

Das **narrative Visual** erstellt ein benutzerdefiniertes Visual, das Daten aus Berichtsgrafiken zusammenfasst und referenziert. Es bietet mehr Kontrolle über Formatierung und Text als automatische Zusammenfassungen.

Vorgeschlagene Copilot-Eingabeaufforderungen für das Narrativ-Visual:
- *Eine Zusammenfassung geben*
- *Wahrscheinliche Fragen der Unternehmensleitung beantworten*
- *Eine Aufzählungsliste mit Erkenntnissen erstellen*

Weitere Optionen: eigene Eingabeaufforderung formulieren; Auswahl ob alle Visuals der Seite oder nur bestimmte in die Zusammenfassung einfließen sollen; Wechsel zwischen benutzerdefinierter und Copilot-Zusammenfassung zum Vergleich. Das Narrativ-Visual ist in Power BI Desktop und im Power BI-Dienst verfügbar.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: create-reports-6.png — Dialogfeld "Ein Narrativ mit Copilot erstellen" mit Optionen zur Eingabeaufforderung und Bildauswahl.</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: copilot-summary.png — Von Copilot generiertes Narrativ-Visual mit Highlights zu höchstem/niedrigstem Umsatz, Umsatzanstieg und Gesamtgewinn.</span>
</div>

### Zusammenfassung im Copilot-Bereich

Sowohl Berichtsentwickler als auch Berichtsverbraucher können den Copilot-Bereich nutzen, um Berichte zusammenzufassen:

- **Entwickler** nutzen es, um Ideen zur Datendarstellung zu generieren
- **Verbraucher** nutzen es, um den Berichtsinhalt schneller zu verstehen

Copilot berücksichtigt dabei **alle Daten** — auch solche, die hinter aktuell nicht angewendeten Filtern oder Slicern verborgen sind. Der Umfang (gesamter Bericht oder nur aktuelle Seite) kann in der Eingabeaufforderung spezifiziert werden.

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🧹</div>
    <div class="pbi-summary-title">Daten vorbereiten</div>
    <div class="pbi-summary-body">Power Query bleibt unverzichtbar: profilieren, bereinigen, transformieren. Datenqualität (Vollständigkeit, Gültigkeit, Konsistenz, Eindeutigkeit, Beziehungen, DAX) ist Voraussetzung für effektiven Copilot-Einsatz.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🗂️</div>
    <div class="pbi-summary-title">Modell gestalten</div>
    <div class="pbi-summary-body">Stern-/Schneeflockenschema anstreben. Copilot unterstützt in der DAX-Abfrageansicht: DAX aus natürlicher Sprache generieren, Kennzahlen vorschlagen und ins Modell übernehmen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📊</div>
    <div class="pbi-summary-title">Berichte erstellen</div>
    <div class="pbi-summary-body">Copilot-Bereich in Desktop und Dienst: vollständige Berichtsseiten aus Eingabeaufforderungen generieren, vordefinierte Vorschläge oder eigene Prompts nutzen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📝</div>
    <div class="pbi-summary-title">Zusammenfassen</div>
    <div class="pbi-summary-body">Narrativ-Visual für kontrollierte Textzusammenfassungen mit Datenreferenz. Copilot-Bereich für schnelle Überblicke — berücksichtigt auch gefilterte Daten.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">⚙️</div>
    <div class="pbi-summary-title">Voraussetzungen</div>
    <div class="pbi-summary-body">Arbeitsbereich auf F64- oder Power BI Premium-Kapazität erforderlich. Konto muss Schreibzugriff auf diesen Arbeitsbereich haben. Copilot muss vom Administrator aktiviert sein.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🤝</div>
    <div class="pbi-summary-title">Copilot als Assistent</div>
    <div class="pbi-summary-body">Copilot ersetzt das Fachwissen nicht — es unterstützt. Ergebnisse immer als Entwurf betrachten und prüfen. Das domänenspezifische Verständnis der Daten bleibt beim Entwickler.</div>
  </div>
</div>
