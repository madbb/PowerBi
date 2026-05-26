# Berichtsobjekte und Visual-Auswahl

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 18</div>
  <div class="pbi-page-title">Berichtsobjekte und Visual-Auswahl</div>
  <div class="pbi-page-sub">Visuals und Elemente konfigurieren, den richtigen Visualtyp für jeden Anwendungsfall wählen</div>
</div>

Jede Berichtsseite besteht aus **Berichtsobjekten** — entweder Visuals, die Daten aus dem semantischen Modell darstellen, oder Elemente, die ohne Modellanbindung die visuelle Gestaltung bereichern. Dieses Skript erklärt, wie Berichtsobjekte konfiguriert werden und wie der richtige Visualtyp für eine gegebene Analyseaufgabe gefunden wird.

---

## Berichtsobjekte verstehen

Es gibt zwei Kategorien:

<div class="pbi-definition">
  <strong>Visuals</strong> Visualisierungen von semantischen Modelldaten. Power BI enthält über 30 integrierte Kernvisuals sowie die Möglichkeit, benutzerdefinierte Visuals aus Microsoft AppSource oder als PBIVIZ-Datei hinzuzuladen.
</div>

<div class="pbi-definition">
  <strong>Elemente</strong> Objekte ohne direkte Modellanbindung: Textfelder, Schaltflächen, Formen und Bilder. Sie dienen der Gestaltung, Navigation und Benutzerführung.
</div>

Alle Berichtsobjekte teilen einige gemeinsame Eigenschaften in den **Formatoptionen**: Position, Größe, Alternativtext, Titel sowie Effekte wie Hintergrund, Rahmen und Schatten.

---

## Visuals konfigurieren

### Allgemeine Vorgehensweise

1. Visualtyp im Bereich **Visualisierungen** auswählen, auf der Seite platzieren und Größe anpassen
2. Semantische Modellfelder den **Wells** zuordnen (jedes Visual hat unterschiedliche Wells)
3. Optional: Filter auf Visualebene anwenden
4. Feldzuordnungen anpassen: Felder umbenennen, Zusammenfassungsverhalten ändern, *Elemente ohne Daten anzeigen* aktivieren
5. Optional: Sortierfeld und -richtung festlegen
6. Formatoptionen anwenden für Stil und Erscheinungsbild
7. Optional: **Analyseoptionen** nutzen (Trendlinien, Prognosen, Anomalieerkennung)

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Tipp</span>
  Die Formatoptionen enthalten ein Suchfeld — damit lassen sich spezifische Einstellungen schnell finden statt durch alle Abschnitte zu scrollen. Änderung testen, dann bei Bedarf mit <strong>Strg+Z</strong> rückgängig machen.
</div>

### Kernvisuals und benutzerdefinierte Visuals

Die integrierten **Kernvisuals** sind im oberen Abschnitt des Bereichs **Visualisierungen** verfügbar. Über den Mauszeiger auf ein Symbol erscheint eine QuickInfo mit dem Visualnamen.

**Benutzerdefinierte Visuals** werden über Microsoft AppSource (ein App Store für Geschäftsanwendungen) oder als PBIVIZ-Datei hinzugefügt. Sie erweitern den Funktionsumfang über die Kernvisuals hinaus.

---

## Elemente einsetzen

### Textfeld

Fügt formatierten Text zur Berichtsseite hinzu — für Seitentitel, Erklärungen oder Beschriftungen. Schriftart, Schriftgröße, Farbe, Fettschrift, Kursiv, Unterstrich und Ausrichtung sind frei konfigurierbar.

**Besonders:** Textfelder können **dynamische Werte** einbetten, die aus dem semantischen Modell stammen. Wenn die Seite gefiltert wird, passen sich diese Werte an. Das Textfeld verhält sich in diesem Fall wie ein Visual.

Das Visual **Smart Narrative** ist eine Erweiterung davon: Es fasst Daten automatisch mit Textbeschreibungen zusammen und kann ebenfalls dynamische Werte enthalten.

### Schaltflächen

Schaltflächen ermöglichen App-ähnliche Interaktionen. Sie können sechs verschiedene Aktionen auslösen:

| Aktion | Funktion |
|---|---|
| Zurück | Zur vorherigen Seite navigieren |
| Seitennavigation | Zu einer bestimmten Seite wechseln |
| Drillthrough | Drillthrough zu einer Detailseite ausführen |
| Lesezeichen | Ein Lesezeichen anwenden (Filterstatus, Visual-Sichtbarkeit) |
| Q&A | Das Q&A-Visual öffnen |
| Web-URL | Eine URL im Standardbrowser öffnen |

Beim Einfügen stehen vorkonfigurierte Schaltflächen mit Symbolen und vordefinierten Aktionen zur Auswahl — z. B. die Schaltflächen „Zurück", „Q&A" oder „Lesezeichen".

### Formen

Formen sind dekorative Elemente oder können wie Schaltflächen Aktionen auslösen. Fast jede denkbare Form ist möglich. Formen können Text enthalten und auf vielfältige Weise formatiert werden.

### Bilder

Bilder werden direkt auf die Berichtsseite geladen (BMP, JPEG, GIF, TIFF, PNG) — z. B. das Unternehmenslogo. Bilder können ebenfalls als Schaltflächen für Aktionen konfiguriert werden.

---

## Den richtigen Visualtyp wählen

Die Wahl des richtigen Visualtyps hängt davon ab, welche Frage beantwortet werden soll. Sechs Anforderungskategorien decken die meisten Fälle ab:

### Kategorische Visuals — Vergleiche zwischen Kategorien

Balken- und Säulendiagramme eignen sich am besten für den Vergleich von Werten zwischen Kategorien. Nach dem Wert sortieren (absteigend), nicht alphabetisch — außer wenn eine festgelegte Reihenfolge existiert (z. B. Prozessschritte).

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-2-select-visual-categorical.png — Balkendiagramm für sechs Produkte in absteigender Umsatzreihenfolge.</span>
</div>

Weitere Kernvisuals für kategorische Analysen: Treemap, Trichterdiagramm

### Zeitreihen-Visuals — Werte im Zeitverlauf

Für Daten im Zeitverlauf immer Linien- oder Säulendiagramm verwenden. Die X-Achse zeigt die Zeit von links nach rechts (frühestes Datum links).

Liniendiagramme eignen sich für **konsistente Datenflüsse** — wenn für jeden Zeitraum Werte vorliegen. Wenn Lücken möglich sind (fehlende Perioden), ist ein Säulendiagramm besser: Es zeigt die Lücken explizit als fehlende Säulen, statt sie mit einer Linie zu überbrücken.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-5-select-visual-time-series-missing-periods.png — Vergleich Liniendiagramm vs. Säulendiagramm: Das Säulendiagramm zeigt fehlende Perioden als leere Stellen, das Liniendiagramm verbindet sie mit einer Linie.</span>
</div>

Liniendiagramme können durch Analyseoptionen ergänzt werden — z. B. durch **Prognosen** oder **Anomalieerkennung**.

Weitere Kernvisuals: Gestapeltes Säulendiagramm, Flächendiagramm, Menübanddiagramm (zeigt zusätzlich Rangfolgenveränderungen im Zeitverlauf)

### Proportionale Visuals — Anteile am Ganzen

Proportionale Visuals zeigen, wie sich ein Wert auf eine Dimension verteilt. Wichtig: Proportionale Visuals können **keine positiven und negativen Werte gleichzeitig** darstellen — nur dann verwenden, wenn alle Werte das gleiche Vorzeichen haben.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-6-select-visual-proportional-stacked-bar.png — Gestapeltes 100%-Balkendiagramm: Produktumsatzanteile nach Filiale.</span>
</div>

Weitere Kernvisuals: 100% gestapeltes Säulendiagramm, Kreisdiagramm, Ringdiagramm, Treemap, Trichterdiagramm

### Numerische Visuals — Einzelwerte hervorheben

Kartenvisuals zeigen einen einzelnen, sofort erkennbaren Wert. Ideal für Dashboards und Analyseberichte, um wichtige KPIs auf einen Blick zu kommunizieren. Mehrzeilige Karten zeigen mehrere Werte in einem Visual.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-8-select-visual-card.png — Kartenvisual mit einem einzelnen Umsatzwert.</span>
</div>

### Rastervisuals — Detaillierte Informationen

Tabellen haben feste Spalten mit gruppierten oder zusammengefassten Daten. Matrizen ermöglichen Gruppierungen für Zeilen und Spalten mit hierarchischer Navigation (Drill-up/Drill-down).

**Bedingte Formatierung** (Hintergrundfarben, Schriftfarben, Datenbalken, Symbole) macht Rastervisuals besonders aussagekräftig — Werte werden mit kontextuellen Indikatoren versehen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-9-select-visual-grid-table.png — Tabellenvisual mit Umsatz und Einheiten nach Produkt, sortiert nach Umsatz mit Datenbalken für bedingte Formatierung.</span>
</div>

### Leistungsvisuals — Wert vs. Ziel

Leistungsvisuals vergleichen einen Istwert mit einem Zielwert und zeigen Abweichungen an. Farbe oder Symbole kommunizieren den Status (z. B. Rot für unerwünschte Abweichung).

Das **KPI-Visual** braucht drei Eingaben: die zu verfolgende Metrik, ein Messziel und eine Zeitreihe.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 5-11-select-visual-performance.png — KPI-Visual mit Gesamtumsatz, Zielwert und Abweichung.</span>
</div>

Weitere Kernvisuals: Messgerät, Tabelle/Matrix mit bedingter Formatierung

### Geografische Visuals — Räumliche Verteilung

Wenn das semantische Modell räumliche Daten enthält, können Kartenvisuals eingesetzt werden. Die Wahl des richtigen Kartentyps hängt von der Datengranularität ab:

- **Kartenvisual** (Blasen): gut für Stadtebene — zeigt jeden Standort als Blase
- **Flächenkartogramm**: gut für Länder- oder Bundesstaatsebene — zeigt relative Werte durch Farbabstufungen

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Kartenvisuals nehmen viel Platz ein. Wenn die geografische Lage keine besondere Rolle spielt, reicht oft auch ein kategorisches Visual (z. B. Balkendiagramm nach Region).
</div>

### Das Visual dem verfügbaren Platz anpassen

Wenn mehrere Visualtypen geeignet wären, kann auch der verfügbare Platz die Wahl entscheiden:

- **Breiter, niedriger Bereich**: Gestapeltes Balkendiagramm (100%) ist einfacher zu lesen als ein gestapeltes Säulendiagramm — lange Balken sind leichter zu interpretieren als kurze Säulen.
- **Schmaler, hoher Bereich**: Gestapeltes Säulendiagramm ist besser — hohe Säulen sind leichter zu interpretieren als kurze Balken.

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📊</div>
    <div class="pbi-summary-title">Visuals</div>
    <div class="pbi-summary-body">Über 30 Kernvisuals + benutzerdefinierte Visuals aus AppSource. Wells mit Modellfeldern befüllen, Filteroptionen, Sortierung und Formatierung konfigurieren. Analyseoptionen ergänzen Visuals mit Trendlinien, Prognosen und Anomalieerkennung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔲</div>
    <div class="pbi-summary-title">Elemente</div>
    <div class="pbi-summary-body">Textfelder (inkl. dynamischer Werte), Schaltflächen (6 Aktionen), Formen und Bilder. Ermöglichen Navigation, integrierte Hilfe und App-ähnliche Interaktionen ohne Modellanbindung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📈</div>
    <div class="pbi-summary-title">Kategorisch & Zeitreihen</div>
    <div class="pbi-summary-body">Balken/Säulen für Kategorienvergleiche (immer nach Wert sortieren). Liniendiagramm für konsistente Zeitreihen, Säulendiagramm wenn Lücken möglich. Zeitachse immer links nach rechts.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🥧</div>
    <div class="pbi-summary-title">Proportional & Numerisch</div>
    <div class="pbi-summary-body">Gestapelte Diagramme, Kreis- und Ringdiagramme für Anteile (nur bei gleichem Vorzeichen). Kartenvisuals für einzelne Schlüsselwerte. Kein Mischen von positiven und negativen Werten in proportionalen Visuals.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📋</div>
    <div class="pbi-summary-title">Raster & Leistung</div>
    <div class="pbi-summary-body">Tabellen und Matrizen mit bedingter Formatierung für detaillierte Informationen und hierarchische Navigation. KPI-Visual für Zielvergleiche (Metrik + Ziel + Zeitreihe).</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🗺️</div>
    <div class="pbi-summary-title">Geografisch & Platz</div>
    <div class="pbi-summary-body">Blasenkarte für Stadtebene, Flächenkartogramm für Länder/Bundesstaaten. Bei gleichwertigen Optionen: Breiter Bereich → horizontales Diagramm, hoher Bereich → vertikales Diagramm.</div>
  </div>
</div>
