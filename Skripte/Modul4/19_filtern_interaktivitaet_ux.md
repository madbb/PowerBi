# Filtern, Interaktivität und Benutzererfahrung

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 19</div>
  <div class="pbi-page-title">Filtern, Interaktivität und Benutzererfahrung</div>
  <div class="pbi-page-sub">Filter, Slicer, Drillthrough, Lesezeichen, Navigation, Visualheader und integrierte Hilfe</div>
</div>

Ein gut gestalteter Bericht ist mehr als eine Sammlung von Visuals — er ist eine interaktive Erfahrung. Berichtsnutzer sollten intuitiv filtern, tiefer bohren, zwischen Seiten navigieren und bei Bedarf Hilfe finden können. Dieses Skript behandelt alle Techniken, die das ermöglichen.

---

## Berichtsfilterung verstehen

Filterung kann auf fünf Ebenen eines Berichts erfolgen:

| Ebene | Wer bestimmt es | Wirkungsbereich |
|---|---|---|
| **Semantisches Modell (RLS)** | Modelladministrator | Alle Berichte auf diesem Modell |
| **Bericht** | Berichtsautor | Alle Seiten und Visuals |
| **Seite** | Berichtsautor | Alle Visuals auf dieser Seite |
| **Visual** | Berichtsautor | Nur dieses Visual |
| **Measure (DAX)** | Berichtsautor / Modellenwickler | Gesteuert durch CALCULATE-Logik |

Filter auf Berichts-, Seiten- und Visualebene werden im **Bereich Filter** konfiguriert.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Wenn RLS auf dem semantischen Modell aktiv ist, müssen Berichtsautoren darauf achten, dass Benutzer, die nur einen Teil der Daten sehen dürfen, nicht durch einen weiteren Filter vollständig keine Daten angezeigt bekommen — das ist verwirrend und wirkt wie ein Fehler.
</div>

### Filter im Bereich „Filter" konfigurieren

Der Bereich **Filter** hat drei Abschnitte:

- **Filter für alle Seiten** — gelten für alle Seiten und Visuals im Bericht
- **Filter für diese Seite** — gelten für alle Visuals auf der aktuellen Seite und ergänzen Berichtsfilter
- **Filter für dieses Visual** — gelten nur für das ausgewählte Visual (einzige Ebene, auf der nach Measures gefiltert werden kann)

Jeder Filter bezieht sich auf ein Feld und kann als Standard-, Erweitert-, Top-N- oder Relativdatumsfilter konfiguriert werden. Filter können **gesperrt** werden (Berichtsnutzer können sie nicht ändern) oder **ausgeblendet** (für Berichtsnutzer unsichtbar, z. B. für technische Bereinigungsfilter).

Der gesamte Filterbereich kann ausgeblendet werden, um zu verhindern, dass Berichtsnutzer ihn öffnen.

---

## Filter mit Slicern anwenden

Der Datenschnitt (Slicer) ist ein Visual mit einem einzigen Zweck: **andere Visuals filtern**. Es ist eines der am häufigsten verwendeten Visuals auf Berichtsseiten.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Ein Slicer ist kein Filter auf Seitenebene — er ist ein Visual, das Filter auf andere Visuals auf der gleichen Seite überträgt. Standardmäßig filtert er alle anderen Visuals, aber über Visualinteraktionen kann das eingeschränkt werden.
</div>

### Slicer-Layouts nach Datentyp

| Datentyp | Standard-Layout | Alternativen |
|---|---|---|
| Text | Liste | Dropdownliste |
| Zahl | Bereich „zwischen" | Einzelwert (oben/unten), Dropdownliste |
| Datum | Bereich „zwischen" mit Kalender | Relatives Datum/Uhrzeit, Einzelwert |

Das **Dropdown-Layout** spart Platz auf der Seite und fragt das semantische Modell nur ab, wenn der Slicer aufgeklappt wird — das beschleunigt das initiale Rendern der Seite.

Das **Relative Datum/Uhrzeit-Layout** ermöglicht das Filtern nach dynamischen Zeiträumen (z. B. „die letzten 7 Tage" oder „aktueller Monat") relativ zum heutigen Datum.

### Slicer synchronisieren

Slicer können über **Slicer synchronisieren** mit Seiten in anderen Teilen des Berichts synchronisiert werden — so filtert eine Slicerauswahl auch Visuals auf anderen Seiten. Synchronized Slicer können auf einer Seite als ausgeblendet markiert sein, obwohl sie aktiv filtern.

### Filter vs. Slicer — wann welches?

| Aspekt | Filterbereich | Slicer |
|---|---|---|
| **Leistung** | Besser (kein Visual-Rendering) | Schlechter (Visual wird gerendert) |
| **Platzbedarf** | Keiner auf der Seite | Nimmt Platz ein |
| **Sichtbarkeit** | Rechts vom Bericht, kann ausgeblendet werden | Direkt auf der Seite, sofort sichtbar |
| **Filtertypen** | Erweitert, Top N, Measure-Filter | Einfacher (kein Top-N, keine Measures) |
| **Gestaltbarkeit** | Begrenzt | Sehr hoch |
| **Platzierung** | Immer rechts | Frei wählbar |
| **Mehrere Seiten** | Nicht direkt möglich | Über Synchronisierung möglich |

**Faustregel:** Entweder Filter oder Slicer verwenden — nicht beides für denselben Zweck auf einer Seite. Das verursacht Verwirrung.

**Tipps:**
- Slicer, die Berichtsnutzer nicht ändern sollen: als Filter sperren oder ausblenden
- Viele Slicer: eine eigene „Slicer"-Seite erstellen, Slicer synchronisieren und auf anderen Seiten ausblenden; Navigation per Schaltfläche
- Immer eine Schaltfläche **„Slicer zurücksetzen"** mit Lesezeichen-Aktion bereitstellen

---

## Weitere Filtermethoden

Neben Filtern und Slicern gibt es weitere interaktive Filtertechniken:

### Visuelle Interaktionen

Wenn Berichtsnutzer auf ein Element in einem Visual klicken (z. B. eine Säule im Säulendiagramm), werden standardmäßig alle anderen Visuals auf der Seite gefiltert. Visuals verhalten sich dabei wie Slicer — der Berichtsnutzer muss aber wissen, dass das funktioniert.

Berichtsautoren können die Interaktion zwischen zwei Visuals anpassen: Kreuzfiltern aktivieren, deaktivieren oder auf **übergreifendes Hervorheben** umstellen.

### Drillthrough

Drillthrough navigiert den Berichtsnutzer zu einer Detailseite, wenn er mit der rechten Maustaste auf ein Visual-Element klickt und „Drillthrough" auswählt. Die Detailseite erhält automatisch alle Filter des Quellvisuals.

**Typischer Workflow:**
1. Berichtsseite anzeigen und interessante Datenpunkte identifizieren
2. Rechtsklick auf ein Element → Drillthrough zur Detailseite
3. Detailanalyse durchführen
4. Über die Zurück-Schaltfläche zur Ausgangsseite zurückkehren

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Tipp</span>
  Berichtsnutzer wissen oft nicht, ob ein Visual Drillthrough unterstützt. Eine Schaltfläche mit Drillthrough-Aktion macht die Funktion sichtbar und intuitiv nutzbar.
</div>

### QuickInfos

QuickInfos werden angezeigt, wenn der Berichtsnutzer mit dem Mauszeiger über ein Visual-Element fährt. Es gibt zwei Typen:

**Visual-QuickInfos** — über den QuickInfo-Well im Visual werden zusätzliche Felder angezeigt, wenn der Mauszeiger über ein Element bewegt wird.

**Seiten-QuickInfos** — eine vollständige Berichtsseite wird als kleines Overlay über dem Visual angezeigt. Sie empfängt den Filterkontext des Elements, auf das gezeigt wird. Im Gegensatz zu Drillthrough-Seiten sind Seiten-QuickInfos **nicht interaktiv**.

### Abfragereduzierungsoptionen

Über **Datei → Optionen → Abfragereduzierung** können Berichtsautoren die Anzahl der an das semantische Modell gesendeten Abfragen reduzieren:

- Kreuzfilter-Interaktionen standardmäßig deaktivieren
- Für Slicer eine „Anwenden"-Schaltfläche aktivieren (Filter erst beim Klick übertragen)
- Für den Filterbereich eine „Anwenden"-Schaltfläche aktivieren

Das ist besonders für DirectQuery-Modelle wichtig, wo jede Interaktion eine Live-Datenbankabfrage auslöst.

---

## Werte hervorheben

Neben der Filterung gibt es Techniken, um wichtige Werte direkt im Visual hervorzuheben:

### Bedingte Formatierung

In Tabellen und Matrizen können Regeln definiert werden, um bestimmte Zellen hervorzuheben:
- Hintergrundfarbe
- Schriftfarbe
- Datenbalken
- Symbole (empfohlen statt reiner Farbe — barrierefreier)

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: conditional-formatting-icons.png — Matrixvisual „Lagerbestand" mit kreisförmigen Symbolen: ausgefüllter Kreis für höchsten, leerer Kreis für niedrigsten Wert.</span>
</div>

### Überlagerte Analysen

In Liniendiagrammen und anderen Visuals können über den **Analysebereich** Hilfslinien ergänzt werden: Trendlinien, Bezugslinien, Min/Max-Linien. Sie helfen, Aussagen aus den Daten direkt im Visual sichtbar zu machen.

### Anomalieerkennung

Wenn die X-Achse ein Datumsfeld enthält, kann Power BI mit KI automatisch ungewöhnliche Ausschläge im Zeitverlauf erkennen und markieren. Ein Klick auf die Anomalie-Markierung öffnet einen Bereich mit möglichen Erklärungen.

---

## Mit Lesezeichen arbeiten

Lesezeichen erfassen eine bestimmte Ansicht des Berichts — inklusive Filter, Slicer, Seite und Visual-Sichtbarkeit. Sie sind der Schlüssel zu vielen fortgeschrittenen UX-Mustern.

### Was ein Lesezeichen erfasst

| Status | Was wird gespeichert |
|---|---|
| **Daten** | Slicerauswahl, Sortierung, Drilltiefe — alles, was die Abfragen beeinflusst |
| **Anzeige** | Sichtbarkeit von Berichtsobjekten (eingeblendet/ausgeblendet) |
| **Aktuelle Seite** | Die Seite, die beim Erstellen des Lesezeichens aktiv war |

Standardmäßig erfasst ein Lesezeichen alle drei Status-Typen. Welche davon berücksichtigt werden, kann einzeln deaktiviert werden.

### Lesezeichen-Bereich

Ein Lesezeichen kann auf **alle Visuals** oder nur auf **ausgewählte Visuals** angewendet werden. Der Bereich **Ausgewählte Visuals** ist wichtig, wenn das Lesezeichen nur bestimmte Elemente beeinflusst, ohne andere zu verändern.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Tipp</span>
  Lesezeichen am besten erst am Ende der Entwicklung erstellen — nachdem alle Berichtselemente vorhanden sind. So wird das aufwendige Aktualisieren von Lesezeichen beim Hinzufügen neuer Elemente vermieden.
</div>

### Typische Lesezeichen-Anwendungsfälle

**Slicer zurücksetzen:**
1. Slicer auf Standardwerte setzen
2. Lesezeichen mit Status „Daten" und Bereich „Ausgewählte Visuals" (nur die betroffenen Slicer) erstellen
3. Schaltfläche mit Lesezeichen-Aktion verknüpfen

**Visuals austauschen:**
Zwei Lesezeichen mit Status „Anzeige" und Bereich „Ausgewählte Visuals" — je eines für jede Darstellungsvariante. Ein Visual sichtbar, das andere ausgeblendet. Zwei Schaltflächen, je eine für jedes Lesezeichen.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Ausgeblendete Visuals belasten die Leistung nicht — sie senden keine Abfragen. Das Austauschen von Visuals ist deshalb eine leistungsfreundliche Methode, um Berichtsnutzern Wahlmöglichkeiten zu bieten.
</div>

**Direkte Drilltiefennavigation:**
Lesezeichen mit Status „Daten" und Bereich „Ausgewählte Visuals" für jede gewünschte Hierarchieebene erstellen. Schaltflächen ermöglichen direkten Sprung zu Jahr-, Quartals- oder Monatsebene.

**Popup-Overlays:**
Zwei Lesezeichen mit Status „Anzeige": eines mit sichtbarem Overlay, eines mit ausgeblendetem. Hilfe-Schaltfläche zeigt das Overlay, ein Klick auf das Overlay blendet es wieder aus.

---

## Berichte für Navigation gestalten

Gute Navigation ermöglicht es Berichtsnutzern, schnell und intuitiv zwischen Seiten und Ebenen zu wechseln.

### Navigationsschaltflächen gestalten

Schaltflächen mit Seitennavigations- oder Lesezeichen-Aktionen können für eine konsistente Benutzerführung auf allen Seiten platziert werden.

**Hover-Formatierung**: Schaltflächen sollten visuell reagieren, wenn der Mauszeiger darüber fährt — z. B. durch Farbwechsel oder Textveränderung. Das zeigt Berichtsnutzern, dass das Element klickbar ist.

**Beschreibende QuickInfos**: Eine QuickInfo auf einer Schaltfläche erklärt ihre Funktion in einem Satz — z. B. „Tabellarische Ansicht". Im Abschnitt **Aktion** der Schaltflächenformatierung kann der QuickInfo-Text eingegeben werden.

---

## Mit Visualheadern arbeiten

Alle Berichtsobjekte haben einen **Visualheader** — eine Leiste, die beim Darüberfahren mit dem Mauszeiger erscheint. Sie enthält Aktionssymbole wie Fokusmodus, Drill-up/Drill-down und das Menü **Weitere Optionen** (Sortieren, Exportieren, Spotlight und mehr).

Power BI platziert den Visualheader bevorzugt oben rechts am Objekt. Nur wenn dort kein Platz ist, wechselt er nach unten rechts oder in das Visual hinein.

**Konfigurationsmöglichkeiten:**

- Visualheader für alle Objekte global deaktivieren (für Präsentationsberichte ohne Interaktion)
- Visualheader für einzelne Objekte deaktivieren (empfohlen für Slicer, Schaltflächen und rein dekorative Elemente)
- Einzelne Symbole im Visualheader deaktivieren (z. B. das Menü „Weitere Optionen" ausblenden)
- QuickInfo-Symbol aktivieren: fügt ein **?**-Symbol hinzu, das beim Zeigen eine Erklärung oder eine Seiten-QuickInfo anzeigt

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Tipp</span>
  Genügend Abstand zwischen Visuals lassen, damit Visualheader oben rechts sichtbar bleiben. Überlappende Visualheader machen die Symbole schwer erreichbar.
</div>

---

## Berichte mit integrierter Hilfe entwerfen

Nicht alle Berichtsnutzer sind mit Power BI vertraut. Integrierte Hilfe reduziert Supportaufwand und verbessert die Benutzererfahrung erheblich.

### Informationsseite

Die einfachste Methode: Eine ganze Berichtsseite mit Anweisungen, Definitionen und Hinweisen zur Bedienung. Eine Schaltfläche auf jeder Seite (immer an derselben Position, mit Information- oder Hilfe-Symbol) navigiert zu dieser Seite. Eine Zurück-Schaltfläche auf der Informationsseite leitet zurück.

### QuickInfo-Symbol im Visualheader

Das QuickInfo-Symbol (?) im Visualheader zeigt beim Hover eine kompakte Erklärung an — ideal für visualspezifische Informationen: Berechnungslogik, Datenquelle, Einheit oder Definition.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: visual-header-help-icon.png — KPI-Visual mit Hilfe-Symbol; QuickInfo zeigt: „Turnover ratio = COGS divided by Avg inventory".</span>
</div>

### Popup-Überlagerung (Coach Marks)

Eine Schaltfläche mit **Hilfe**-Aktion zeigt beim Klick ein vollseitiges Bild mit Beschriftungen (Coach Marks) ein, das über den Bericht gelegt wird und auf die wichtigsten Elemente hinweist. Transparenz lässt den Berichtshintergrund durchscheinen. Ein Klick auf das Overlay blendet es wieder aus (Lesezeichen-Mechanismus).

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Filterebenen</div>
    <div class="pbi-summary-body">RLS (Modell) → Bericht → Seite → Visual → Measure. Filterbereich für konfigurierbare, optisch zurückhaltende Filter. Filter sperren oder ausblenden, um sie vor Änderungen zu schützen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Slicer</div>
    <div class="pbi-summary-body">Visueller Filter mit freier Platzierung und hoher Gestaltbarkeit. Dropdown-Layout spart Platz und beschleunigt das Laden. Synchronisierung ermöglicht seitenübergreifendes Filtern. Immer Reset-Schaltfläche bereitstellen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Interaktive Techniken</div>
    <div class="pbi-summary-body">Visuelle Interaktionen (Kreuzfiltern), Drillthrough (Detailseite mit Filterkontext), Seiten-QuickInfos (Overlay ohne Interaktivität), Abfragereduzierung für DirectQuery-Leistung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Lesezeichen</div>
    <div class="pbi-summary-body">Erfassen Daten-, Anzeige- und Seitenstatus. Ermöglichen: Slicer zurücksetzen, Visuals austauschen, direkte Drilltiefennavigation, Popup-Overlays. Bereich „Ausgewählte Visuals" für gezielte Wirkung nutzen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Navigation & Visualheader</div>
    <div class="pbi-summary-body">Navigationsschaltflächen mit Hover-Formatierung und QuickInfo-Beschreibungen. Visualheader für dekorative Elemente deaktivieren. QuickInfo-Symbol für visualspezifische Kontextinformationen nutzen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Integrierte Hilfe</div>
    <div class="pbi-summary-body">Informationsseite für Überblick und Definitionen. QuickInfo-Symbol im Visualheader für visualspezifische Erklärungen. Popup-Überlagerung mit Coach Marks für geführte Einführung.</div>
  </div>
</div>
