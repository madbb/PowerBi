# Berichtsleistung und Mobile Design

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 20</div>
  <div class="pbi-page-title">Berichtsleistung und Mobile Design</div>
  <div class="pbi-page-sub">Leistungsengpässe analysieren und beheben, Berichte für Smartphones optimieren</div>
</div>

Ein Bericht, der zu langsam lädt oder auf dem Smartphone nicht nutzbar ist, verfehlt sein Ziel — unabhängig davon, wie gut die Inhalte sind. Dieses Skript zeigt, wie Leistungsprobleme systematisch gefunden und behoben werden und wie eine mobile Ansicht erstellt wird, die auf kleinen Bildschirmen wirklich funktioniert.

---

## Berichtsleistung analysieren

### Der Leistungsanalysator

Das erste Werkzeug für jede Leistungsuntersuchung ist der **Leistungsanalysator** in Power BI Desktop (**Ansicht → Leistungsanalyse**).

**Vorbereitung vor der Messung:**

Beide Caches müssen vor dem Start geleert werden, sonst sind die Messwerte nicht aussagekräftig:

1. **Visueller Cache leeren**: Power BI Desktop schließen → eine leere Berichtsseite hinzufügen → speichern → die leere Seite öffnen
2. **Daten-Engine-Cache leeren**: Power BI Desktop neu starten oder DAX Studio → Cache löschen

**Aufzeichnung starten:** Im Bereich **Leistungsanalyse** auf **Aufzeichnung beginnen** klicken, dann mit dem Bericht interagieren wie ein normaler Benutzer. Anschließend **Beenden** wählen.

**Ergebnisse interpretieren:**

Die Ergebnisse zeigen für jedes Berichtselement die Dauer in Millisekunden, aufgeteilt in drei Kategorien:

| Kategorie | Was wird gemessen |
|---|---|
| **DAX-Abfrage** | Zeit für die Abfrage und die Antwort aus der Engine |
| **Visualanzeige** | Zeit für das Rendering des Visuals (inkl. Geocodierung, externe Bilder) |
| **Andere** | Wartezeiten, Abfragevorbereitung, Hintergrundprozesse |

Ergebnisse nach Gesamtdauer (absteigend) sortieren. **DAX-Abfragen über 120 Millisekunden** sind ein guter Ausgangspunkt für genauere Untersuchungen.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 11-performance-analyzer-results-ss.png — Leistungsanalysator-Ergebnisse mit expandierten Elementen und den drei Kategorien pro Visual.</span>
</div>

Mit **Abfrage kopieren** lässt sich der DAX-Ausdruck in die Zwischenablage kopieren und in **DAX Studio** einfügen, um die Abfrageausführung detailliert zu untersuchen.

---

## Leistung verbessern

### Zu viele Visuals

Der häufigste Grund für schlechte Leistung: zu viele Visuals auf einer Seite. Jedes Visual sendet eine oder mehrere Abfragen an das semantische Modell.

**Maßnahmen:**
- Nicht benötigte Visuals entfernen
- Visuals mit mehr als **100 Feldern** laden deutlich langsamer — Felder reduzieren
- Drillthrough-Seiten und QuickInfos statt zusätzlicher Visuals auf der Hauptseite verwenden

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 11-too-many-visuals-report-page-ss.png — Berichtsseite, die durch zu viele Visuals überladen wirkt.</span>
</div>

### Langsame DAX-Abfragen

Wenn die Ursache nicht bei den Visuals liegt, die DAX-Logik oder das Modelldesign untersuchen:

- Measures mit ineffizienter DAX-Logik neu schreiben (insbesondere: Variablen verwenden statt wiederholter Ausdrücke)
- Filtertechniken prüfen: `FILTER` durch `KEEPFILTERS` ersetzen kann die Abfragedauer in vielen Fällen erheblich reduzieren
- Modelldesign prüfen: falsch konfigurierte Beziehungskardinalität, nicht benötigte Spalten, aktiviertes Auto Datum/Uhrzeit

### Externe Faktoren

Wenn der Bericht in Power BI Desktop gut läuft, aber einige Benutzer von schlechter Leistung berichten: externe Faktoren untersuchen. Netzwerkbandbreite, Server-Auslastung, Firewalls und andere IT-Infrastrukturelemente können die Leistung beeinflussen — die IT-Abteilung einbeziehen.

---

## Berichte für Mobile optimieren

### Warum eine separate mobile Ansicht?

Alle Power BI-Berichte können auf dem Smartphone im Querformat angezeigt werden. Für Benutzer, die hauptsächlich auf Smartphones zugreifen, ist eine optimierte **Hochformat-Ansicht** deutlich benutzerfreundlicher. Power BI ermöglicht das Erstellen einer eigenen mobilen Layout-Ansicht pro Seite.

### Die mobile Ansicht erstellen

1. In Power BI Desktop die betreffende Berichtsseite öffnen
2. **Ansicht → Layout für Mobilgeräte** wählen
3. Im Bereich **Visualisierungen** erscheinen alle Visuals der Seite mit ihren Namen und Sichtbarkeitsstatus
4. Gewünschte Visuals per Drag & Drop in den Telefonemulator-Canvas ziehen (oder doppelklicken)
5. Größe und Position der Visuals auf dem Canvas anpassen

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 12-open-mobile-layout-ss.png — Mobile Layout-Ansicht mit Telefon-Canvas links und Bereich „Visualisierungen" rechts.</span>
</div>

Für die mobile Ansicht sollten typischerweise **weniger und einfachere Visuals** gewählt werden als in der Desktop-Ansicht. Visuals, die für kleine Bildschirme ungeeignet sind, werden einfach nicht in den Canvas gezogen.

### Responsive Visuals

Standardmäßig sind viele Power BI-Visuals **responsiv** — sie passen sich dynamisch an die verfügbare Größe an. Bei kleiner Darstellung werden z. B. Legenden verschoben oder Achsenbeschriftungen reduziert, um die Daten sichtbar zu halten. Die Reaktionsfähigkeit kann in den Formateinstellungen unter **Allgemein → Reaktionsfähig** deaktiviert werden.

### Slicer für Mobile konfigurieren

Für Slicer in der mobilen Ansicht gibt es besondere Konfigurationsoptionen (im normalen Bearbeitungsmodus, nicht im mobilen Layout):

- **Einzelauswahl** oder Mehrfachauswahl festlegen
- **Ausrichtung**: vertikal, horizontal oder **responsiv** (responsiv = skaliert mit der Slicer-Größe; wird bei sehr kleiner Darstellung zu einem Filtersymbol)

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 12-configure-slicers-mobile-layout-ss.png — Slicer-Konfiguration für mobile Ansicht mit responsiver Ausrichtungsoption.</span>
</div>

### Veröffentlichung

Wenn ein Bericht mit einer mobilen Ansicht veröffentlicht wird, werden Desktop- und mobile Ansicht gleichzeitig veröffentlicht. Power BI erkennt automatisch, ob ein Benutzer auf einem Mobilgerät zugreift, und zeigt die optimierte Ansicht an.

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔬</div>
    <div class="pbi-summary-title">Leistungsanalysator</div>
    <div class="pbi-summary-body">Caches leeren, dann Aufzeichnung starten. Drei Kategorien pro Visual: DAX-Abfrage, Visualanzeige, Andere. DAX > 120 ms genauer untersuchen. Abfrage in DAX Studio exportieren für tiefere Analyse.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">⚡</div>
    <div class="pbi-summary-title">Leistung verbessern</div>
    <div class="pbi-summary-body">Visuals reduzieren und Felder je Visual begrenzen (< 100). Drillthrough statt zusätzlicher Hauptseiten-Visuals. DAX-Logik optimieren (Variablen, KEEPFILTERS statt FILTER). Auto Datum/Uhrzeit deaktivieren.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📱</div>
    <div class="pbi-summary-title">Mobile Layout</div>
    <div class="pbi-summary-body">Über Ansicht → Layout für Mobilgeräte. Visuals per Drag & Drop in den Telefon-Canvas. Nur relevante, mobilgeeignete Visuals verwenden. Desktop- und mobile Version werden gleichzeitig veröffentlicht.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📐</div>
    <div class="pbi-summary-title">Responsive Visuals</div>
    <div class="pbi-summary-body">Power BI-Visuals passen sich dynamisch an die verfügbare Größe an. Reaktionsfähigkeit kann deaktiviert werden. Bei Bedarf Sichtbarkeitsindikator im Visualisierungsbereich beachten (Lesezeichen-Status).</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🎚️</div>
    <div class="pbi-summary-title">Mobile Slicer</div>
    <div class="pbi-summary-body">Ausrichtung „Responsiv" für mobile Slicer: skaliert mit der Größe, wird bei sehr kleiner Darstellung zum Filtersymbol. Einzel- vs. Mehrfachauswahl im normalen Bearbeitungsmodus konfigurieren.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🌐</div>
    <div class="pbi-summary-title">Externe Faktoren</div>
    <div class="pbi-summary-body">Wenn Power BI Desktop gut läuft, aber Benutzer schlechte Leistung melden: Netzwerk, Server, Firewall und IT-Infrastruktur untersuchen. Leistungsprobleme haben nicht immer eine Ursache im Bericht selbst.</div>
  </div>
</div>
