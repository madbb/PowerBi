# Aufgaben: Das richtige Modellframework wählen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 07 · Aufgabenblatt</div>
  <div class="pbi-page-title">Das richtige Modellframework wählen</div>
  <div class="pbi-page-sub">Analyseabfrage · Importmodell · DirectQuery · Zusammengesetztes Modell · Entscheidungsszenarien</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Dieses Aufgabenblatt ist konzeptuell. Es gibt keine Power BI Desktop-Übungen. Bearbeite alle Fragen und Szenarien schriftlich in deinen Notizen.
</div>

---

## Aufgabe 1 — Die drei Phasen der Analyseabfrage

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Filtern, Gruppieren, Zusammenfassen zuordnen</span>
  </div>
  <div class="pbi-task-body">

Power BI sendet bei jedem Visual intern eine Analyseabfrage. Sie durchläuft immer drei Phasen in fester Reihenfolge: **Filtern**, **Gruppieren**, **Zusammenfassen**.

Ordne die folgenden Elemente eines Berichts der richtigen Phase zu. Schreibe deine Zuordnung in deine Notizen.

<div class="pbi-task-match">

<strong>Berichtselemente</strong>

| Nr. | Element |
|---|---|
| 1 | Ein Datenschnitt der Ergebnisse auf das Jahr 2024 einschränkt |
| 2 | Die Höhe eines Balkens im Säulendiagramm, der den Gesamtumsatz zeigt |
| 3 | Die Achsenbeschriftung eines Säulendiagramms mit den vier Quartalen |
| 4 | Ein Berichtsfilter der nur die Region "Nord" anzeigt |
| 5 | Eine Kartenvisualisierung die "Anzahl Kunden" anzeigt |

<strong>Phasen</strong>

- **F** — Filtern
- **G** — Gruppieren
- **Z** — Zusammenfassen

</div>

  </div>
</div>

---

## Aufgabe 2 — Importmodell verstehen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Vorteile, Limits und Optimierungsmaßnahmen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Nenne drei Vorteile des Importmodells gegenüber DirectQuery. Schreibe sie in deine Notizen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ein Importmodell hat auf freigegebener Kapazität zwei Arten von Limits: eines für die Modellgröße und eines für die Aktualisierungsfrequenz. Nenne beide mit ihren konkreten Grenzwerten. Was gilt jeweils für dedizierte/Premium-Kapazität?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Das Skript nennt sechs Methoden um die Modellgröße zu reduzieren. Nenne alle sechs.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Was ist der Unterschied zwischen einer vollständigen Aktualisierung und einer inkrementellen Aktualisierung? Wann ist die inkrementelle sinnvoll?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 3 — DirectQuery einschätzen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Anwendungsfälle und Einschränkungen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Das Skript nennt vier Situationen in denen DirectQuery dem Import vorzuziehen ist. Nenne alle vier.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ein Kollege möchte alle Berichte auf DirectQuery umstellen damit die Daten immer aktuell sind. Nenne drei konkrete Gegenargumente.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Welche Art von Power Query-Transformationen ist bei DirectQuery nicht verfügbar und warum? Das Skript nennt eine konkrete Kategorie mit Beispiel — nenne sie. Erkläre außerdem in einem Satz warum diese Einschränkung grundsätzlich besteht.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Ein Unternehmen hat ein OLTP-System (Bestellverwaltung) mit 10 Millionen aktiven Transaktionen. Der Vertriebsleiter möchte ein Live-Dashboard darauf. Was rätst du — und warum?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 4 — Zusammengesetztes Modell

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Anwendungsfälle und Dual-Speichermodus</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Das zusammengesetzte Modell hat drei typische Anwendungsfälle. Beschreibe jeden in einem Satz.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Was bedeutet der Speichermodus <strong>Dual</strong>? Was macht Power BI damit automatisch und warum ist das nützlich?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Was ist eine eingeschränkte Beziehung im zusammengesetzten Modell? Wann entsteht sie und was ist das Risiko?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Du hast ein DirectQuery-Modell auf einem Data Warehouse. Abfragen für Jahres- und Quartalsauswertungen dauern 25 Sekunden. Was ist die empfohlene Lösung aus dem Skript? Nenne zwei Maßnahmen die zusammen wirken.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 5 — Framework-Entscheidung

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Vier Szenarien — welches Framework?</span>
  </div>
  <div class="pbi-task-body">

Lies jedes Szenario und entscheide welches Framework du wählen würdest: **Import**, **DirectQuery** oder **Zusammengesetzt**. Begründe deine Entscheidung in einem Satz. Schreibe deine Antworten in deine Notizen.

<div class="pbi-task-match">

<strong>Szenario A</strong>

Ein mittelständisches Handelsunternehmen hat eine SQL-Datenbank mit 800.000 Bestellzeilen. Berichte werden wöchentlich aktualisiert. Das Team hat keine Premium-Lizenz.

<strong>Szenario B</strong>

Eine Fluggesellschaft betreibt ein Data Warehouse mit 4 Milliarden Flugbewegungen. Das Operations-Team braucht ein Dashboard das den aktuellen Tagesstand zeigt. Jahres- und Monatsauswertungen sollen schnell laden.

<strong>Szenario C</strong>

Ein Konzern hat ein bestehendes, gut gepflegtes Power BI-Dataset das vom zentralen BI-Team betreut wird. Eine Fachabteilung möchte eigene Kennzahlen und eine neue Tabelle hinzufügen ohne das zentrale Dataset anzufassen.

<strong>Szenario D</strong>

Ein Startup hat vier CSV-Exporte aus seinem CRM-System. Die Daten ändern sich einmal täglich. Der Gründer möchte einen Bericht mit Umsatz, Kundenentwicklung und Produktperformance.

</div>

  </div>
</div>

---

## Aufgabe 6 — Kritische Entscheidung

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Die wichtigste Regel beim Framework-Wechsel</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Es gibt genau zwei mögliche Framework-Wechsel auf Tabellenebene in Power BI Desktop: DirectQuery nach Import und Import nach DirectQuery. Welcher davon ist möglich, welcher nicht? Begründe die Einschränkung in einem Satz.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ein Projektteam hat ein Importmodell mit 40 Measures, 8 Tabellen und 3 Wochen Entwicklungsarbeit. Mitten im Projekt stellt sich heraus, dass die Datenbank 2 Milliarden Zeilen hat und kein vollständiger Import möglich ist. Was hätte das Team vorher prüfen müssen?</span>
  </div>
</div>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Du startest ein neues Power BI-Projekt. Welche drei Fragen würdest du dem Auftraggeber stellen bevor du dich für ein Framework entscheidest?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Erkläre in eigenen Worten: Warum ist das Sternschema die ideale Grundlage für alle drei Frameworks — und nicht nur für Import?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Fünf Berichtselemente den drei Abfragephasen zugeordnet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Importmodell: Vorteile, beide Limitarten mit Grenzwerten, alle sechs Optimierungsmaßnahmen, inkrementelle Aktualisierung erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Alle vier DirectQuery-Anwendungsfälle, drei Gegenargumente, Einschränkung bei M-Transformationen erklärt, OLTP-Szenario bewertet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Drei Anwendungsfälle, Dual-Modus, eingeschränkte Beziehungen, Aggregationstabellen + Dual als Lösung für langsame DQ-Abfragen</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Vier Szenarien mit Framework-Entscheidung und Begründung</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Wechselrichtung korrekt benannt und begründet, Prüfpunkte vor Projektbeginn formuliert</span>
  </div>
</div>
