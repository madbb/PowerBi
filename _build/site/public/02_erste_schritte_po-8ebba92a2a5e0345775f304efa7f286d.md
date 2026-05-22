# Erste Schritte mit Power BI

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 1 · Skript 02</div>
  <div class="pbi-page-title">Erste Schritte mit Power BI</div>
  <div class="pbi-page-sub">Komponenten, Bausteine und der Power BI-Dienst</div>
</div>

Power BI ist eine vollständige Berichtslösung, die Datenaufbereitung, Datenvisualisierung, Verteilung und Verwaltung in einem einheitlichen Ökosystem vereint. Dieses Skript vermittelt die drei Hauptkomponenten, den typischen Arbeitsablauf und die zentralen Konzepte von Power BI.

---

## Die drei Hauptkomponenten

Power BI besteht aus drei aufeinander abgestimmten Komponenten:

| Komponente | Typ | Hauptzweck |
|---|---|---|
| **Power BI Desktop** | Desktopanwendung (Windows) | Daten verbinden, transformieren, modellieren und Berichte erstellen |
| **Power BI-Dienst** | Online-Plattform (app.powerbi.com) | Berichte und Elemente organisieren, verwalten und verteilen |
| **Power BI Mobile** | Mobile App (iOS, Android, Windows) | Berichte auf mobilen Geräten in optimierter Ansicht anzeigen |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Power BI Desktop kann kostenlos über den Windows Store oder als direktes Installationsprogramm heruntergeladen werden. Der Zugriff auf den Power BI-Dienst erfolgt mit einem Schul- oder Geschäftskonto unter <strong>https://app.powerbi.com</strong>. Mobile Ansichten für Power BI Mobile werden in Power BI Desktop erstellt.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-intro_02.png — Die drei Teile von Power BI (Desktop, Dienst, Mobile) als Übersichtsdiagramm.</span>
</div>

---

## Der Flow von Power BI

Die Arbeit mit Power BI folgt einem typischen, sechsstufigen Ablauf:

<div class="pbi-card">
  <span class="pbi-card-num">①</span>
  <span class="pbi-card-title">Daten verbinden</span>
  <span class="pbi-card-body">In Power BI Desktop eine Verbindung zu einer oder mehreren Datenquellen herstellen.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">②</span>
  <span class="pbi-card-title">Daten transformieren</span>
  <span class="pbi-card-body">Im integrierten Power Query-Editor Daten bereinigen, umformen und vorbereiten.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">③</span>
  <span class="pbi-card-title">Daten modellieren</span>
  <span class="pbi-card-body">Beziehungen zwischen Tabellen und Berechnungen erstellen, um ein semantisches Modell aufzubauen.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">④</span>
  <span class="pbi-card-title">Bericht erstellen</span>
  <span class="pbi-card-body">Visualisierungen auf der Canvas platzieren und zu einem interaktiven Bericht zusammenstellen.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">⑤</span>
  <span class="pbi-card-title">Bericht veröffentlichen</span>
  <span class="pbi-card-body">Den fertigen Bericht aus Power BI Desktop in den Power BI-Dienst hochladen.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">⑥</span>
  <span class="pbi-card-title">Verteilen und verwalten</span>
  <span class="pbi-card-body">Berichte im Power BI-Dienst für Benutzer zugänglich machen und laufend aktuell halten.</span>
</div>

---

## Die Bausteine von Power BI

<div class="pbi-definition">
  <strong>Semantisches Modell</strong> Alle miteinander verbundenen Daten, Transformationen, Beziehungen und Berechnungen, die die Grundlage eines Berichts bilden. Es entsteht durch das Verbinden mit Datenquellen, Transformieren im Power Query-Editor sowie das Hinzufügen von Beziehungen und Berechnungen.
</div>

<div class="pbi-definition">
  <strong>Visualisierung (Visual)</strong> Ein einzelnes Diagramm, eine Karte oder ein anderes grafisches Element auf der Berichts-Canvas. Power BI ist eine Low-Code-Lösung: Datenfelder können per Drag & Drop auf die Canvas gezogen werden, und Power BI wählt automatisch ein passendes Visual aus.
</div>

Semantische Modelle und Visualisierungen sind die **zwei grundlegenden Bausteine** von Power BI — alle weiteren Konzepte bauen darauf auf.

### Berichte

Ein **Bericht** besteht aus einer oder mehreren Seiten mit Visualisierungen, die auf demselben semantischen Modell basieren. Jede Seite sollte thematisch zusammenhängende Daten zeigen, damit Verbraucher Erkenntnisse schnell erfassen können.

Eine der leistungsstärksten Eigenschaften von Berichten ist die **Interaktivität zwischen Visuals**: Wenn ein Benutzer einen Datenpunkt in einem Visual auswählt, reagieren die anderen Visuals auf der Seite entsprechend. Zusätzlich können Berichte Drillthrough-Funktionen und verschiedene Filtermöglichkeiten bieten.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-bblocks_03.png — Beispielbericht in Power BI Desktop mit mehreren interaktiven Visuals auf einer Canvas.</span>
</div>

### Dashboards

<div class="pbi-definition">
  <strong>Dashboard</strong> Eine einzelne Seite im Power BI-Dienst, die aus Kacheln besteht. Kacheln werden durch das Anheften von Visuals aus Berichten erstellt. Im Gegensatz zu Berichts-Visuals sind Kacheln <em>nicht interaktiv</em> — ein Klick auf eine Kachel öffnet den zugehörigen Bericht.
</div>

Dashboards dienen als schneller Überblick über die wichtigsten Kennzahlen — vergleichbar mit dem Armaturenbrett eines Fahrzeugs. Für tiefergehende Analysen navigieren Benutzer von dort in den eigentlichen Bericht.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-bblocks_01.png — Beispiel-Dashboard im Power BI-Dienst mit mehreren angehefteten Kacheln aus verschiedenen Berichten.</span>
</div>

---

## Der Power BI-Dienst im Detail

### Arbeitsbereiche

<div class="pbi-definition">
  <strong>Arbeitsbereich</strong> Der organisatorische Grundbaustein des Power BI-Diensts. Veröffentlichte Berichte, semantische Modelle, Dashboards und Apps werden in Arbeitsbereichen gespeichert.
</div>

Jeder Benutzer hat automatisch Zugriff auf **Mein Arbeitsbereich** — dieser eignet sich ausschließlich für Tests und private Arbeit. Für alle Inhalte, die mit anderen geteilt werden sollen, ist immer ein **freigegebener Arbeitsbereich** zu verwenden.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-touring-00.png — Power BI-Dienst mit der Navigation zu Arbeitsbereichen und der Option, einen neuen Arbeitsbereich zu erstellen.</span>
</div>

### Apps und Inhaltsverteilung

<div class="pbi-definition">
  <strong>App</strong> Eine gebündelte Sammlung von Berichten und Dashboards aus einem Arbeitsbereich, die Verbrauchern über eine vereinfachte Benutzeroberfläche bereitgestellt wird.
</div>

Apps sind die empfohlene Methode zur Inhaltsverteilung innerhalb einer Organisation. Der Vergleich der Verteilungsmethoden:

| Methode | Kontrolle | Risiko |
|---|---|---|
| **App** | Volle Kontrolle — Inhalt wird erst nach explizitem Update aktualisiert | Gering — Benutzer sehen nur freigegebene Version |
| **Arbeitsbereichszugriff** | Eingeschränkt — Benutzer sehen ggf. mehr als gewünscht | Mittel |
| **Einzelnes Element teilen** | Begrenzt — Änderungen sind sofort sichtbar | Höher bei unfertigem Stand |

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Wichtig</span>
  Nach jeder Änderung an Elementen im Arbeitsbereich muss die App explizit aktualisiert werden. Dies ermöglicht es, den Zeitpunkt zu kontrollieren, zu dem Änderungen für Verbraucher sichtbar werden.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-touring_02.png — App-Konfigurationsansicht in einem Power BI-Arbeitsbereich mit Auswahl von Inhalten und Zielgruppen.</span>
</div>

### Vorlagen-Apps

**Vorlagen-Apps** sind vorgefertigte Apps aus dem Power BI-App-Marketplace, die auf eigene Daten angewendet werden können. Sie ermöglichen es, Erkenntnisse schnell mit minimalem Aufwand zu gewinnen — z. B. eine fertige GitHub-Analyse-App, die mit dem eigenen GitHub-Repository verbunden wird.

Vorlagen-Apps sind über den Navigationspunkt **Apps** → **Apps abrufen** im Power BI-Dienst zugänglich.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-touring_03.png — Übersicht verfügbarer Vorlagen-Apps im Power BI App-Marketplace.</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-touring_04.png — Installierte GitHub-Vorlagen-App mit Berichtsseiten "Top 100-Mitwirkende" und "Pull Requests".</span>
</div>

### Beispielberichte

Für den Einstieg ohne eigene Daten stellt Power BI vorgefertigte **Beispielberichte** bereit. Diese werden in Mein Arbeitsbereich geladen und sind über den Navigationspunkt **Learn** im Power BI-Dienst erreichbar.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-touring_01.png — Learning Center im Power BI-Dienst mit integrierten Beispielberichten.</span>
</div>

### Semantisches Modell aktualisieren

Damit Berichte stets aktuelle Daten zeigen, können im Power BI-Dienst **geplante Aktualisierungen** für semantische Modelle konfiguriert werden. Zusätzlich sind **bedarfsgesteuerte Aktualisierungen** jederzeit möglich.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: pbi-touring_05.png — Einstellungen eines semantischen Modells im Power BI-Dienst mit Konfigurationsoptionen für geplante Aktualisierungen (Häufigkeit und Uhrzeit).</span>
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🖥️</div>
    <div class="pbi-summary-title">Power BI Desktop</div>
    <div class="pbi-summary-body">Entwicklungswerkzeug für Datenverbindung, Transformation, Modellierung und Berichtserstellung. Kostenlos verfügbar.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">☁️</div>
    <div class="pbi-summary-title">Power BI-Dienst</div>
    <div class="pbi-summary-body">Online-Plattform für Veröffentlichung, Verteilung (Apps), Dashboards und geplante Aktualisierungen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📱</div>
    <div class="pbi-summary-title">Power BI Mobile</div>
    <div class="pbi-summary-body">Mobile App für den Zugriff auf Dienst-Inhalte in optimierter Darstellung. Ansichten werden in Desktop erstellt.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🧱</div>
    <div class="pbi-summary-title">Bausteine</div>
    <div class="pbi-summary-body">Semantische Modelle (Daten + Beziehungen + Berechnungen) und Visualisierungen sind die zwei Grundbausteine von Power BI.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📊</div>
    <div class="pbi-summary-title">Bericht vs. Dashboard</div>
    <div class="pbi-summary-body">Berichte: mehrere interaktive Seiten in Desktop erstellt. Dashboards: eine Seite mit angehefteten, nicht-interaktiven Kacheln im Dienst.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📦</div>
    <div class="pbi-summary-title">Apps</div>
    <div class="pbi-summary-body">Empfohlene Verteilungsmethode. Bündeln Berichte und Dashboards für Verbraucher — Aktualisierung liegt in Entwicklerhand.</div>
  </div>
</div>
