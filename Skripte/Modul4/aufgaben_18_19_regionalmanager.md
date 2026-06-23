# Aufgaben: Berichte erstellen – Visuals, Filter und Interaktivität

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skripte 18 & 19 · Aufgabenblatt 1</div>
  <div class="pbi-page-title">Bericht für den Regionalmanager Nord</div>
  <div class="pbi-page-sub">Visuals · Measures · Filterebenen · Schaltflächen · Lesezeichen · Best Practices</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis und Voraussetzungen</span>
  Öffne deine <code>uebung_11.pbix</code> oder <code>uebung_12.pbix</code> mit dem techtrade-Modell. Folgende Measures müssen vorhanden sein:
  <ul>
    <li><code>[Umsatz]</code> — SUMX mit Menge × Einzelpreis × (1 – Rabatt)</li>
    <li><code>[Anzahl Bestellungen]</code> — COUNTROWS oder CALCULATE mit Status-Filter</li>
    <li><code>[Umsatz Vorjahr]</code> — CALCULATE mit SAMEPERIODLASTYEAR</li>
    <li><code>[Umsatz YTD]</code> — TOTALYTD</li>
  </ul>
  Speichere am Ende als <code>uebung_18.pbix</code>.
</div>

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Du bist Datenanalyst bei TechTrade. Der Regionalmanager der Region <strong>Nord</strong> hat folgende Anforderung gestellt:<br><br>
  <em>„Ich brauche einen Bericht der mir auf einen Blick zeigt wie unsere Region läuft — Umsatz, Bestellungen, Kanalverteilung und wie meine Mitarbeiter performen. Ich schaue ihn morgens kurz am Laptop an, keine Zeit für viel Klickerei. Außerdem soll er auch für die anderen Regionen funktionieren, damit meine Kollegen denselben Bericht nutzen können."</em><br><br>
  Der Bericht besteht aus zwei Seiten: einer <strong>Übersichtsseite</strong> und einer <strong>Salesrep-Detailseite</strong>.
</div>

---

## Aufgabe 1 — Measures für den Regionalbericht

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Fehlende Measures anlegen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Measure an das den Umsatz nur für abgeschlossene Bestellungen berechnet — falls dein <code>[Umsatz]</code> das noch nicht tut:<br><br>
    <code>Umsatz Abgeschlossen = CALCULATE([Umsatz], orders[Status] = "Abgeschlossen")</code><br><br>
    Prüfe mit einem Kartenvisual: der Wert sollte <strong>684.413</strong> sein wenn ein Slicer auf Region = Nord gesetzt ist.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege ein Measure für das Umsatzwachstum gegenüber dem Vorjahr in Prozent an:<br><br>
    <code>Umsatz YoY % =
VAR Vorjahr = CALCULATE([Umsatz], SAMEPERIODLASTYEAR('Datum'[Date]))
RETURN DIVIDE([Umsatz] - Vorjahr, Vorjahr)</code><br><br>
    Formatiere das Measure als Prozent mit einer Dezimalstelle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege ein Measure an das den Zielerreichungsgrad berechnet. Angenommener Jahresumsatz-Zielwert: 750.000 Euro.<br><br>
    <code>Zielerreichung % = DIVIDE([Umsatz], 750000)</code><br><br>
    Formatiere als Prozent. Prüfe: Bei Slicer Nord sollte ca. <strong>91,3%</strong> erscheinen.</span>
  </div>
</div>

  <strong>a) Umsatz Abgeschlossen für Region Nord:</strong>
  <br><br>
  <strong>b) Umsatz YoY % für Jahr 2024 (Gesamtmodell):</strong>
  <br><br>
  <strong>c) Zielerreichung % für Region Nord:</strong>

  </div>
</div>

---

## Aufgabe 2 — Übersichtsseite aufbauen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Drei KPI-Karten und Filterebenen einrichten</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Der Regionalmanager sieht zuerst drei KPI-Karten oben: Gesamtumsatz, Anzahl Bestellungen, Zielerreichung. Alle drei sollen immer nur die abgeschlossenen Bestellungen der gewählten Region zeigen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Berichtsseite an und benenne sie <strong>Übersicht</strong>. Platziere drei Kartenvisuals nebeneinander oben auf der Seite:<br><br>
    Karte 1: <code>[Umsatz Abgeschlossen]</code> — Titel: "Umsatz"<br>
    Karte 2: <code>[Anzahl Bestellungen]</code> — Titel: "Bestellungen"<br>
    Karte 3: <code>[Zielerreichung %]</code> — Titel: "Zielerreichung"<br><br>
    Mache alle drei <strong>gleich groß</strong> (Format → Allgemein → Größe und Stil → exakte Werte eingeben).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Setze einen <strong>Seitenfilter</strong> auf orders[Status] = "Abgeschlossen" — sodass alle Visuals dieser Seite automatisch nur abgeschlossene Bestellungen zeigen. Sperre den Filter danach (Dreipunkte → Gesperrt), damit er nicht versehentlich geändert werden kann.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge einen <strong>Visualfilter</strong> auf Karte 3 hinzu: Karte anklicken → Filterbereich → Filter für dieses Visual → <code>[Umsatz Abgeschlossen]</code> hineinziehen → Filtertyp "Größer als 0". Warum ist dieser Filter sinnvoll wenn noch kein Jahresfilter aktiv ist?</span>
  </div>
</div>

  <strong>b) Screenshot oder Notiz: Seitenfilter gesetzt und gesperrt:</strong>
  <br><br>
  <strong>c) Erklärung warum Visualfilter > 0 sinnvoll ist:</strong>

  </div>
</div>

---

## Aufgabe 3 — Kanalverteilung und Umsatztrend

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Ringdiagramm und Liniendiagramm mit Best Practices</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein <strong>Ringdiagramm</strong> unterhalb der Karten an:<br>
    Legende: <code>orders[Kanal]</code> · Werte: <code>[Umsatz]</code><br><br>
    Konfiguriere den Mittelpunkt: Format → Beschriftungen → Mittelpunkt → <code>[Umsatz Abgeschlossen]</code> als Wert. Der Gesamtumsatz erscheint in der Mitte.<br><br>
    Prüfe mit Slicer Region = Nord: Online sollte <strong>40,6%</strong> des Kuchens ausmachen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege ein <strong>Liniendiagramm</strong> neben dem Ringdiagramm an:<br>
    X-Achse: <code>Datum[Monat]</code> · Y-Achse: <code>[Umsatz]</code> · Sekundäre Y-Achse: <code>[Umsatz YoY %]</code><br><br>
    Aktiviere in den Analyseoptionen eine <strong>Trendlinie</strong>. Benenne die Trendlinie im Format auf "Trendlinie Umsatz".</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Das Liniendiagramm zeigt Monatsumsätze für alle Jahre. Setze einen <strong>Berichtsfilter</strong> auf <code>Datum[Jahr]</code> = 2023, sodass das Liniendiagramm und alle anderen Seiten-Visuals automatisch auf 2023 eingeschränkt sind.<br><br>
    Blende diesen Filter für Benutzer aus (Dreipunkte → Ausgeblendet). Begründe: Wann ist ein ausgeblendeter Filter besser als ein sichtbarer?</span>
  </div>
</div>

  <strong>a) Ringdiagramm-Wert für Online (Region Nord):</strong>
  <br><br>
  <strong>c) Begründung ausgeblendeter Filter:</strong>

  </div>
</div>

---

## Aufgabe 4 — Kategorienvergleich mit bedingter Formatierung

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Tabellenvisual mit Datenbalken und Farbskala</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein <strong>Tabellenvisual</strong> unten auf der Übersichtsseite an:<br>
    Spalten: <code>products[Kategorie]</code>, <code>[Umsatz]</code>, <code>[Anzahl Bestellungen]</code>, <code>[Umsatz YoY %]</code><br><br>
    Sortiere nach <code>[Umsatz]</code> absteigend.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge für die Spalte <code>[Umsatz]</code> <strong>Datenbalken</strong> als bedingte Formatierung hinzu. Farbe: Blau. Hardware sollte den längsten Balken haben (<strong>428.381</strong> bei Slicer Nord).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge für die Spalte <code>[Umsatz YoY %]</code> eine <strong>Symbolsatz-Formatierung</strong> hinzu: grüner Pfeil oben bei positivem Wachstum, roter Pfeil unten bei negativem. Regeln: Grün wenn Wert &gt; 0, Rot wenn Wert &lt; 0.</span>
  </div>
</div>

  <strong>b) Umsatz Hardware Region Nord:</strong>
  <br><br>
  <strong>c) Welche Kategorien zeigen grüne Pfeile wenn Slicer auf Nord und Jahr 2023 gesetzt ist?</strong>

  </div>
</div>

---

## Aufgabe 5 — Navigation ohne Slicer: Schaltflächen mit Regionsauswahl

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Regionsauswahl über Schaltflächen statt Slicer</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Der Regionalmanager hat gesagt er will „keine Zeit für Klickerei". Ein klassischer Slicer mit fünf Regionen macht die Seite unruhig. Stattdessen sollen fünf Schaltflächen die Regionen auswählen — sauberer, schneller, App-ähnlicher.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege <strong>fünf Schaltflächen</strong> nebeneinander oben auf der Seite an (Einfügen → Schaltflächen → Leer). Beschrifte sie: <strong>Nord · Mitte · Ost · Süd · West</strong>.<br><br>
    Stelle für alle fünf dieselbe Größe ein und richte sie horizontal aus (Format → Ausrichten → Gleiche Breite + Oben ausrichten).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle fünf <strong>Lesezeichen</strong> — eines pro Region (Ansicht → Lesezeichen → Lesezeichen hinzufügen):<br><br>
    Vorher: Einen normalen Dropdown-Slicer auf <code>salesreps[Region]</code> auf der Seite platzieren, aber ausblenden (Slicer-Visual anklicken → Format → Allgemein → Sichtbarkeit → Aus).<br><br>
    Für Lesezeichen "Region Nord": Slicer auf Nord setzen, dann Lesezeichen erstellen. Nur Status <strong>Daten</strong> aktiv, <strong>Anzeige</strong> deaktiviert, Bereich: <strong>Ausgewählte Visuals</strong> — nur den Slicer auswählen.<br><br>
    Wiederhole für alle fünf Regionen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Verknüpfe jede Schaltfläche mit dem entsprechenden Lesezeichen: Schaltfläche anklicken → Format → Schaltfläche → Aktion → Typ: Lesezeichen → jeweiliges Lesezeichen auswählen.<br><br>
    Teste im Präsentationsmodus (Strg+F5): Schaltfläche "Nord" → alle Visuals filtern auf Nord. Schaltfläche "West" → alle Visuals filtern auf West.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Hebe die aktive Schaltfläche hervor: Für Schaltfläche "Nord" — Format → Beim Drücken → Hintergrundfarbe dunkelblau, Schriftfarbe weiß. Alle anderen Schaltflächen: hellgrauer Hintergrund, dunkle Schrift.<br><br>
    Warum ist diese visuelle Rückmeldung aus UX-Sicht wichtig?</span>
  </div>
</div>

  <strong>b) Welche Lesezeichen-Einstellungen wurden gesetzt und warum?</strong>
  <br><br>
  <strong>d) UX-Begründung für aktive Schaltflächenhervorhebung:</strong>

  </div>
</div>

---

## Aufgabe 6 — Salesrep-Detailseite mit Drillthrough

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Zweite Seite: Detailansicht je Verkaufsberater</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine zweite Seite an: <strong>Salesrep Detail</strong>. Konfiguriere sie als <strong>Drillthrough-Seite</strong>: Visualisierungsbereich → Drillthrough-Well → <code>salesreps[Nachname]</code> hineinziehen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege auf der Detailseite folgende Visuals an:<br><br>
    <strong>Mehrzeilige Karte</strong>: Felder: <code>salesreps[Vorname]</code>, <code>salesreps[Nachname]</code>, <code>salesreps[Region]</code>, <code>[Umsatz]</code>, <code>[Anzahl Bestellungen]</code><br><br>
    <strong>Balkendiagramm</strong>: Y-Achse: <code>products[Kategorie]</code>, X-Achse: <code>[Umsatz]</code> — absteigend sortiert<br><br>
    <strong>Liniendiagramm</strong>: X-Achse: <code>Datum[Monat]</code>, Y-Achse: <code>[Umsatz]</code></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge auf der Übersichtsseite ein <strong>Balkendiagramm</strong> hinzu: Y-Achse: <code>salesreps[Nachname]</code>, X-Achse: <code>[Umsatz]</code>.<br><br>
    Teste Drillthrough: Rechtsklick auf "Heintze" → Drillthrough → Salesrep Detail. Die Detailseite sollte nur Heintzes Daten zeigen (<strong>256.626</strong> Euro).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Die automatisch eingefügte Zurück-Schaltfläche auf der Detailseite an die <strong>obere linke Ecke</strong> verschieben. Warum gehört die Zurück-Schaltfläche immer an dieselbe Position?</span>
  </div>
</div>

  <strong>c) Umsatz Heintze auf der Detailseite:</strong>
  <br><br>
  <strong>d) Begründung für feste Position der Zurück-Schaltfläche:</strong>

  </div>
</div>

---

## Aufgabe 7 — Slicer zurücksetzen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Reset-Schaltfläche für alle Regionen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Auf der Übersichtsseite: Setze den ausgeblendeten Slicer auf <strong>keine Auswahl</strong> (alle Regionen). Erstelle ein Lesezeichen "Alle Regionen" — nur Status <strong>Daten</strong>, nur Ausgewählte Visuals (der Slicer).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge neben den fünf Regionsschaltflächen eine sechste Schaltfläche hinzu: <strong>"Alle"</strong>. Verknüpfe sie mit dem Lesezeichen "Alle Regionen".<br><br>
    Teste: Schaltfläche "Nord" → dann "Alle" → alle Regionen werden wieder angezeigt.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erkläre in eigenen Worten: Warum wurden <strong>Ausgewählte Visuals</strong> statt <strong>Alle Visuals</strong> beim Lesezeichen verwendet?</span>
  </div>
</div>

  <strong>c) Erklärung Ausgewählte Visuals vs. Alle Visuals:</strong>

  </div>
</div>

---

## Aufgabe 8 — Small Multiples für den Regionsvergleich

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">8</span>
    <span class="pbi-task-title">Umsatzverlauf aller Regionen vergleichen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Der Regionalmanager fragt: „Wie laufen die anderen Regionen im Vergleich?" — Ein Liniendiagramm mit fünf Linien ist unleserlich. Small Multiples zeigen alle fünf Regionen übersichtlich.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge auf der Übersichtsseite ein <strong>Liniendiagramm</strong> hinzu:<br>
    X-Achse: <code>Datum[Monat]</code> · Y-Achse: <code>[Umsatz]</code> · <strong>Kleine Vielfache</strong>: <code>salesreps[Region]</code><br><br>
    Stelle im Format → Kleine Vielfache → Layout auf <strong>1 Zeile × 5 Spalten</strong> ein.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Stelle die Achsenskalierung auf <strong>"Gleich für alle"</strong> (Format → Kleine Vielfache → Achsen). Vergleiche: Welche Region hat den ausgeglichensten Monatsverlauf, welche den unregelmäßigsten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Ändere die Achsenskalierung auf <strong>"Individuell"</strong>. Was verändert sich in der Darstellung? Wann ist individuelle Skalierung irreführend?</span>
  </div>
</div>

  <strong>b) Region mit ausgeglichenstem Verlauf und Begründung:</strong>
  <br><br>
  <strong>c) Unterschied und wann individuelle Skalierung irreführend ist:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Du hast einen Seitenfilter auf orders[Status] = "Abgeschlossen" gesetzt. Ein Kollege fragt: "Warum nicht einfach im Measure per CALCULATE filtern?" Nenne einen Vorteil des Seitenfilters und einen Vorteil des Measure-Ansatzes.</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Der Regionalmanager möchte den Bericht auf seinem Smartphone öffnen. Welche drei Elemente des aktuellen Berichts würden auf einem Smartphone schlecht funktionieren — und warum?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Drei Measures angelegt und mit Kontrollwerten geprüft</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Drei KPI-Karten gleicher Größe, Seitenfilter gesperrt, Visualfilter gesetzt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Ringdiagramm mit Mittelpunkt, Liniendiagramm mit Trendlinie, ausgeblendeter Berichtsfilter</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Tabellenvisual mit Datenbalken und Symbolsatz-Formatierung</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Fünf Regionsschaltflächen mit Lesezeichen verknüpft, im Präsentationsmodus getestet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Drillthrough-Seite angelegt, Heintze-Drillthrough getestet, Zurück-Schaltfläche positioniert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Reset-Schaltfläche "Alle" funktioniert korrekt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 8</strong> Small Multiples mit gemeinsamer und individueller Skalierung verglichen</span>
  </div>
</div>
