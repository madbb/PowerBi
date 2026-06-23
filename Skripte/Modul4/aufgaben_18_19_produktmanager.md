# Aufgaben: Berichte erstellen – Visuals, Filter und Interaktivität

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skripte 18 & 19 · Aufgabenblatt 2</div>
  <div class="pbi-page-title">Produktanalyse-Dashboard</div>
  <div class="pbi-page-sub">Treemap · Scatter · Wasserfall · Menüband · Decomposition Tree · Popup-Hilfe · Lesezeichen</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Voraussetzung</span>
  Öffne <code>uebung_18.pbix</code> aus Aufgabenblatt 1. Die Measures <code>[Umsatz]</code>, <code>[Anzahl Bestellungen]</code>, <code>[Umsatz YoY %]</code> sind bereits vorhanden. Speichere am Ende als <code>uebung_19.pbix</code>.
</div>

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Produktmanagerin von TechTrade möchte eine eigene Analyseseite. Ihr Auftrag:<br><br>
  <em>„Ich brauche einen Überblick über unser Produktportfolio — welche Produkte laufen gut, welche schlecht, wie entwickelt sich der Kategorienmix über Zeit und wo geben wir zu viel Rabatt. Außerdem will ich per Klick tiefer einsteigen können ohne dabei die Übersicht zu verlieren. Eine kurze Erklärung der Visuals wäre auch schön, damit neue Kollegen den Bericht verstehen."</em><br><br>
  Der Bericht besteht aus einer <strong>Produktübersichtsseite</strong> und einer <strong>Produktdetailseite</strong>.
</div>

---

## Aufgabe 1 — Measures für die Produktanalyse

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Drei neue Measures anlegen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Measure für den <strong>Bruttoumsatz</strong> ohne Rabattabzug an:<br><br>
    <code>Bruttoumsatz = SUMX(orders, orders[Menge] * orders[Einzelpreis])</code><br><br>
    Prüfe mit einem Kartenvisual (kein Filter): der Wert sollte <strong>3.423.096</strong> sein. Formatiere als Währung.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege ein Measure für den <strong>Rabattbetrag</strong> an:<br><br>
    <code>Rabattbetrag = [Bruttoumsatz] - [Umsatz]</code><br><br>
    Prüfe: Gesamter Rabattbetrag sollte <strong>136.723</strong> sein (<strong>4,0%</strong> des Bruttoumsatzes).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege ein Measure für den <strong>Anteil am Gesamtumsatz</strong> an:<br><br>
    <code>Umsatz % Gesamt =
DIVIDE(
    [Umsatz],
    CALCULATE([Umsatz], REMOVEFILTERS(products[Kategorie]))
)</code><br><br>
    Formatiere als Prozent. Prüfe in einer Tabelle nach Kategorie: Hardware sollte <strong>61,8%</strong> zeigen.</span>
  </div>
</div>

  <strong>a) Bruttoumsatz gesamt:</strong>
  <br><br>
  <strong>b) Rabattbetrag gesamt und Prozentsatz:</strong>
  <br><br>
  <strong>c) Anteil Hardware am Gesamtumsatz:</strong>

  </div>
</div>

---

## Aufgabe 2 — Treemap: Produktportfolio auf einen Blick

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Produkte nach Umsatz und Kategorie visualisieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Seite an: <strong>Produktübersicht</strong>. Füge ein <strong>Treemap-Visual</strong> links oben ein:<br><br>
    Kategorie: <code>products[Kategorie]</code> · Details: <code>products[Produktname]</code> · Werte: <code>[Umsatz]</code><br><br>
    Das größte Rechteck in der Treemap sollte <strong>Server Pro v2</strong> (Hardware, 260.658) sein. Prüfe ob das stimmt.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge dem Treemap-Visual einen <strong>Visualfilter</strong> hinzu: nur Produkte mit <code>[Umsatz] > 30.000</code> anzeigen. Begründe: Warum ist dieser Schwellenwert sinnvoll für das Management?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge <code>[Umsatz % Gesamt]</code> in den <strong>QuickInfo-Well</strong> des Treemaps hinzu. Hovere im Präsentationsmodus über Server Pro v2 — welcher Prozentwert erscheint in der QuickInfo?</span>
  </div>
</div>

  <strong>a) Größtes Rechteck und Wert:</strong>
  <br><br>
  <strong>b) Begründung Schwellenwert:</strong>
  <br><br>
  <strong>c) QuickInfo-Wert für Server Pro v2:</strong>

  </div>
</div>

---

## Aufgabe 3 — Streudiagramm: Bestellmenge vs. Umsatz

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Zusammenhang zwischen Bestellhäufigkeit und Umsatz je Kategorie</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Produktmanagerin fragt: „Welche Kategorien werden oft bestellt aber bringen wenig Umsatz — und welche bringen viel Umsatz mit wenigen Bestellungen?" Das Streudiagramm macht dieses Muster sichtbar.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge ein <strong>Streudiagramm (Scatter Chart)</strong> rechts neben die Treemap:<br><br>
    X-Achse: <code>[Anzahl Bestellungen]</code> · Y-Achse: <code>[Umsatz]</code> · Legende: <code>products[Kategorie]</code> · Größe: <code>[Bruttoumsatz]</code><br><br>
    Jeder Punkt ist eine Kategorie. Beschreibe das Muster: Welche Kategorie hat viele Bestellungen aber wenig Umsatz?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge in den Analyseoptionen des Scatter-Diagramms eine <strong>Trendlinie</strong> hinzu. Liegt Hardware über oder unter der Trendlinie — was bedeutet das?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Ändere den Detailgrad: Ziehe <code>products[Produktname]</code> in den <strong>Details-Well</strong>. Jetzt ist jeder Punkt ein einzelnes Produkt statt eine Kategorie. Was verändert sich an der Lesbarkeit? Wann ist Kategorie-Ebene besser, wann Produkt-Ebene?</span>
  </div>
</div>

  <strong>a) Kategorie mit vielen Bestellungen, wenig Umsatz:</strong>
  <br><br>
  <strong>b) Hardware über oder unter Trendlinie und Bedeutung:</strong>
  <br><br>
  <strong>c) Lesbarkeit Kategorie vs. Produkt-Ebene:</strong>

  </div>
</div>

---

## Aufgabe 4 — Wasserfalldiagramm: Umsatz-Aufbau nach Kategorie

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Wie setzt sich der Gesamtumsatz zusammen?</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge ein <strong>Wasserfalldiagramm</strong> unter den zwei oberen Visuals ein:<br><br>
    Kategorie: <code>products[Kategorie]</code> · Y-Achse: <code>[Umsatz]</code><br><br>
    Erwartetes Ergebnis: Hardware +2.032.297 → Software +530.524 → Dienstleistung +529.449 → Zubehör +194.103 → Gesamt 3.286.373. Stimmt das überein?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge <code>orders[Kanal]</code> in den <strong>Aufschlüsselung-Well</strong>. Klicke im Visual auf den Hardware-Balken. Was zeigt die Aufschlüsselung? Notiere den Online-Anteil für Hardware.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze einen <strong>Seitenfilter</strong> auf <code>orders[Status]</code> = "Abgeschlossen" für diese Seite. Ändert sich das Wasserfalldiagramm? Warum oder warum nicht — unter Berücksichtigung des <code>[Umsatz]</code>-Measures?</span>
  </div>
</div>

  <strong>a) Stimmen die Werte überein (ja/nein) und Gesamtbetrag:</strong>
  <br><br>
  <strong>b) Online-Anteil für Hardware nach Aufschlüsselung:</strong>
  <br><br>
  <strong>c) Ändert sich das Diagramm nach Seitenfilter und warum:</strong>

  </div>
</div>

---

## Aufgabe 5 — Menübanddiagramm: Kategorie-Rangfolge über Zeit

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Wechselt die Kategorie-Führungsposition über Quartale?</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge ein <strong>Menübanddiagramm</strong> rechts neben dem Wasserfall ein:<br><br>
    X-Achse: <code>Datum[Quartal]</code> (Hierarchie Jahr → Quartal) · Y-Achse: <code>[Umsatz]</code> · Legende: <code>products[Kategorie]</code><br><br>
    Hardware sollte in jedem Quartal das führende Band sein. Prüfe: Wechseln Software und Dienstleistung zwischen Rang 2 und 3?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Drille das Visual auf Quartal-Ebene auf (Pfeil-Symbol oben im Visual). In welchem Quartal ist der Abstand zwischen Hardware und den anderen Kategorien am größten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Vergleiche: Warum wäre hier ein normales gestapeltes Säulendiagramm schlechter als das Menübanddiagramm?</span>
  </div>
</div>

  <strong>a) Wechseln Software und Dienstleistung die Rangfolge (ja/nein):</strong>
  <br><br>
  <strong>b) Quartal mit größtem Hardware-Abstand:</strong>
  <br><br>
  <strong>c) Vorteil Menüband gegenüber gestapeltem Säulendiagramm:</strong>

  </div>
</div>

---

## Aufgabe 6 — Decomposition Tree: Umsatz aufschlüsseln

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Interaktiver Drill-down ohne feste Hierarchie</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Produktmanagerin will selbst entscheiden wie tief sie einsteigt und in welche Richtung — ohne eine vorgefertigte Drillthrough-Seite zu brauchen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Seite an: <strong>Produktdetail</strong>. Füge ein <strong>Decomposition Tree</strong> ein:<br><br>
    Analysieren: <code>[Umsatz]</code><br>
    Erläutern nach: <code>products[Kategorie]</code>, <code>orders[Kanal]</code>, <code>salesreps[Region]</code>, <code>customers[Segment]</code>, <code>products[Produktname]</code><br><br>
    Startpunkt: Gesamtumsatz <strong>3.286.373</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Klicke auf das <strong>+</strong> rechts neben dem Gesamtumsatz. Wähle <strong>Kanal</strong>. Welcher Kanal hat den höchsten Umsatz? Klicke dann auf <strong>Online</strong> → wähle <strong>Kategorie</strong>. Welche Kategorie ist innerhalb von Online führend?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke auf das <strong>+</strong> erneut → wähle <strong>Hoher Wert</strong> (KI-Aufschlüsselung). Power BI findet automatisch die Dimension mit dem stärksten Einfluss. Welche Dimension wählt Power BI — und warum könnte das überraschend oder erwartbar sein?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Füge auf der Produktdetailseite eine <strong>Zurück-Schaltfläche</strong> ein (Einfügen → Schaltflächen → Zurück). Teste: Funktioniert die Schaltfläche nur wenn über Drillthrough navigiert wurde?</span>
  </div>
</div>

  <strong>b) Bester Kanal und führende Kategorie innerhalb Online:</strong>
  <br><br>
  <strong>c) Dimension die Power BI per KI wählt:</strong>
  <br><br>
  <strong>d) Verhält sich die Zurück-Schaltfläche wie erwartet:</strong>

  </div>
</div>

---

## Aufgabe 7 — Popup-Hilfe mit Lesezeichen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Erklärungsoverlay für neue Kollegen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Produktmanagerin hat gesagt: „Eine kurze Erklärung der Visuals wäre schön." Statt einer separaten Dokumentationsseite bauen wir ein Overlay das per Klick erscheint und wieder verschwindet.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge auf der Produktübersichtsseite ein <strong>Rechteck</strong> ein (Einfügen → Formen → Rechteck). Mache es so groß, dass es alle vier Visuals überdeckt. Hintergrundfarbe: dunkelblau, Transparenz 15%.<br><br>
    Füge auf dem Rechteck vier <strong>Textfelder</strong> ein die die Visuals kurz beschreiben:<br>
    "Treemap: Produktumsatz nach Größe" · "Scatter: Bestellhäufigkeit vs. Umsatz" · "Wasserfall: Umsatzaufbau nach Kategorie" · "Menüband: Kategorie-Rangfolge über Zeit"</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Blende Rechteck und Textfelder aus (Rechteck anklicken → Format → Allgemein → Sichtbarkeit → Aus; für jedes Textfeld wiederholen).<br><br>
    Erstelle ein Lesezeichen <strong>"Hilfe zeigen"</strong>: Rechteck und alle vier Textfelder sichtbar machen → Lesezeichen erstellen. Nur Status <strong>Anzeige</strong>, Bereich: <strong>Ausgewählte Visuals</strong> (Rechteck + Textfelder).<br><br>
    Erstelle ein Lesezeichen <strong>"Hilfe verstecken"</strong>: Alles ausblenden → Lesezeichen erstellen. Gleiche Einstellungen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge eine <strong>?-Schaltfläche</strong> oben rechts auf der Seite ein. Aktion: Lesezeichen → "Hilfe zeigen".<br><br>
    Lege auf das Rechteck selbst ebenfalls eine Aktion: Das Rechteck als Schaltfläche konfigurieren → Aktion: Lesezeichen → "Hilfe verstecken".<br><br>
    Teste im Präsentationsmodus: ? klicken → Overlay erscheint. Overlay klicken → verschwindet.</span>
  </div>
</div>

  <strong>b) Welche Lesezeichen-Einstellungen wurden gewählt und warum "Ausgewählte Visuals"?</strong>
  <br><br>
  <strong>c) Funktioniert das Popup-Overlay wie beschrieben (ja/nein):</strong>

  </div>
</div>

---

## Aufgabe 8 — Visual-Umschalter: Treemap vs. Balkendiagramm

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">8</span>
    <span class="pbi-task-title">Zwei Ansichten desselben Inhalts umschalten</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein <strong>Balkendiagramm</strong> exakt an derselben Position wie das Treemap an (gleiche Größe, gleiche Koordinaten). Konfiguriere es:<br>
    Y-Achse: <code>products[Produktname]</code> · X-Achse: <code>[Umsatz]</code> · Visualfilter: <code>[Umsatz] > 30.000</code> · Sortierung: absteigend<br><br>
    Blende das Balkendiagramm aus (Format → Allgemein → Sichtbarkeit → Aus).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle zwei Lesezeichen für den Visual-Umschalter:<br><br>
    Lesezeichen <strong>"Ansicht Treemap"</strong>: Treemap sichtbar, Balken ausgeblendet. Nur Status <strong>Anzeige</strong>, Ausgewählte Visuals (beide).<br>
    Lesezeichen <strong>"Ansicht Balken"</strong>: Balken sichtbar, Treemap ausgeblendet. Gleiche Einstellungen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge zwei kleine Schaltflächen oben links neben dem Visual ein: <strong>"Fläche"</strong> und <strong>"Balken"</strong>. Verknüpfe sie mit den entsprechenden Lesezeichen.<br><br>
    Teste: "Balken" klicken zeigt eine sortierte Liste der Produkte. "Fläche" klicken zeigt wieder die Treemap.<br><br>
    Erkläre: Warum senden ausgeblendete Visuals keine Abfragen und sind damit kein Leistungsproblem?</span>
  </div>
</div>

  <strong>b) Lesezeichen-Einstellungen (Status + Bereich):</strong>
  <br><br>
  <strong>c) Begründung warum ausgeblendete Visuals kein Leistungsproblem sind:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Das Streudiagramm in Aufgabe 3 zeigt vier Punkte (eine Kategorie je Punkt). Die Produktmanagerin sagt: „Ich will alle einzelnen Produkte sehen." Du wechselst auf Produktebene — was sind die Konsequenzen für Lesbarkeit und Leistung wenn das Modell 100 Produkte hat?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Aufgabe 7 und 8 verwenden beide Lesezeichen mit "Ausgewählte Visuals" statt "Alle Visuals". Was würde konkret passieren wenn stattdessen "Alle Visuals" gewählt würde — beschreibe einen Fehlerfall der dann auftreten könnte.</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Drei Measures mit Kontrollwerten angelegt: Bruttoumsatz 3.423.096, Rabattbetrag 136.723, Hardware-Anteil 61,8%</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Treemap mit Visualfilter und QuickInfo-Well konfiguriert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Streudiagramm auf Kategorie- und Produktebene verglichen, Trendlinie hinzugefügt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Wasserfalldiagramm mit Aufschlüsselung nach Kanal, Seitenfilter-Verhalten erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Menübanddiagramm auf Quartalebene, Rangfolge-Wechsel identifiziert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Decomposition Tree mit KI-Aufschlüsselung getestet, Zurück-Schaltfläche funktioniert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Popup-Overlay mit zwei Lesezeichen, ? und Overlay-Klick funktionieren</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 8</strong> Visual-Umschalter Treemap/Balken mit Lesezeichen, kein Leistungsproblem erklärt</span>
  </div>
</div>
