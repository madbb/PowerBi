# Aufgaben: Visuelle Berechnungen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 14 · Aufgabenblatt</div>
  <div class="pbi-page-title">Visuelle Berechnungen</div>
  <div class="pbi-page-sub">Laufende Summe · Gleitender Durchschnitt · Prozentanteil · Vergleich Vorwert · Axis · Reset</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis</span>
  Lade die vier Krankenhausdateien in Power BI Desktop:
  <ul>
    <li><strong>Hospital_patients.csv</strong> — Patientendaten mit Aufnahme- und Entlassdatum, Service und Zufriedenheitswert</li>
    <li><strong>Hospital_staff.csv</strong> — Stammdaten des Personals mit Rolle und zugeordnetem Service</li>
    <li><strong>Hospital_staff_schedule.csv</strong> — Wöchentliche Anwesenheit pro Mitarbeiter (52 Wochen)</li>
    <li><strong>Hospital_services_weekly.csv</strong> — Wöchentliche Kennzahlen pro Servicebereich: Betten, Aufnahmen, Ablehnungen, Zufriedenheit, Personalstimmung</li>
  </ul>
  Lege folgende Beziehungen an:
  <ul>
    <li>staff[staff_id] → staff_schedule[staff_id] (1:*)</li>
    <li>Für services_weekly ist keine Beziehung nötig — die Tabelle wird direkt verwendet</li>
  </ul>
  Lege diese Measures an bevor du mit den Aufgaben beginnst:
  <ul>
    <li><code>Aufnahmen = SUM(services_weekly[patients_admitted])</code></li>
    <li><code>Ablehnungen = SUM(services_weekly[patients_refused])</code></li>
    <li><code>Zufriedenheit = AVERAGE(services_weekly[patient_satisfaction])</code></li>
    <li><code>Anwesenheitsrate = AVERAGE(staff_schedule[present])</code></li>
  </ul>
  Speichere die Datei als <code>uebung_14.pbix</code>.
</div>

---

## Aufgabe 1 — Laufende Summe der Patientenaufnahmen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Wie viele Patienten wurden seit Jahresbeginn aufgenommen?</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Krankenhausleitung möchte monatlich sehen wie viele Patienten kumuliert seit Januar aufgenommen wurden. So lässt sich erkennen ob das Jahresbudget auf Kurs liegt.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Tabellenvisual mit <code>services_weekly[month]</code> und <code>[Aufnahmen]</code> an. Öffne das Bearbeitungsfenster für visuelle Berechnungen. Wähle die Vorlage <strong>Laufende Summe</strong>. Was erscheint in der Bearbeitungsleiste? Benenne die Berechnung in <strong>Aufnahmen kumuliert</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe das Ergebnis gegen diese Kontrollwerte:<br><br>
    Jan: 507 · Feb: 1.020 · Mrz: 1.428 · Dez: 5.851<br><br>
    Stimmen die Werte überein? Was zeigt Dezember — und was bedeutet das inhaltlich?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erkläre in eigenen Worten: Warum braucht diese visuelle Berechnung keine Datumstabelle und kein CALCULATE? Wie würde man dasselbe als Measure berechnen?</span>
  </div>
</div>

  <strong>a) Formel in der Bearbeitungsleiste:</strong>
  <br><br>
  <strong>b) Dezemberwert und inhaltliche Bedeutung:</strong>
  <br><br>
  <strong>c) Vergleich mit Measure-Ansatz:</strong>

  </div>
</div>

---

## Aufgabe 2 — Laufende Summe mit Neustart pro Servicebereich

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Kumulierte Aufnahmen pro Servicebereich</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Aufgabe 1 summiert alle Servicebereiche zusammen. Die Leitung will jetzt sehen wie sich die Aufnahmen innerhalb jedes Servicebereichs über das Jahr aufbauen — mit Neustart für jeden Bereich.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Ändere das Tabellenvisual: Füge <code>services_weekly[service]</code> als erste Spalte hinzu, dann <code>services_weekly[month]</code>, dann <code>[Aufnahmen]</code>. Lege eine neue visuelle Berechnung an:<br><br>
    <code>Aufnahmen kumuliert Service = RUNNINGSUM([Aufnahmen])</code><br><br>
    Was passiert — läuft die Summe durch alle Services durch oder startet sie für jeden Service neu?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Korrigiere die Berechnung damit sie für jeden Servicebereich neu startet:<br><br>
    <code>Aufnahmen kumuliert Service = RUNNINGSUM([Aufnahmen], HIGHESTPARENT)</code><br><br>
    Prüfe: ICU-Dezember sollte 648 zeigen (Jahresgesamtwert ICU). Emergency-Dezember: 1.185.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Was ist HIGHESTPARENT in diesem Visual — also welche Hierarchieebene ist gemeint? Was wäre LOWESTPARENT?</span>
  </div>
</div>

  <strong>a) Verhalten ohne HIGHESTPARENT:</strong>
  <br><br>
  <strong>b) Kontrollwerte erreicht (ja/nein):</strong>
  <br><br>
  <strong>c) HIGHESTPARENT und LOWESTPARENT in diesem Visual:</strong>

  </div>
</div>

---

## Aufgabe 3 — Gleitender Durchschnitt der Patientenzufriedenheit

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Zufriedenheitstrend glätten</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Patientenzufriedenheit im Emergency-Bereich schwankt monatlich stark — von 70,0 im November bis 89,2 im Mai. Ein gleitender 3-Monats-Durchschnitt soll den Trend sichtbar machen ohne die Schwankungen zu verstärken.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Filtere das Visual auf <code>services_weekly[service]</code> = "emergency" (per Slicer oder Visualfilter). Lege ein Tabellenvisual mit <code>services_weekly[month]</code> und <code>[Zufriedenheit]</code> an. Prüfe: Januar sollte 74,5 zeigen, Mai 89,2.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege eine visuelle Berechnung an:<br><br>
    <code>Zufriedenheit 3M = MOVINGAVERAGE([Zufriedenheit], 3)</code><br><br>
    Was zeigt Januar? Was zeigt März (erster Monat mit vollständigem 3-Monats-Fenster)?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Ändere das Fenster auf 5 Monate. Wie verändert sich die Kurve — wird sie glatter oder kantiger? Wann wäre ein kleineres Fenster sinnvoller, wann ein größeres?</span>
  </div>
</div>

  <strong>a) Zufriedenheitswert Januar und Mai (zur Kontrolle):</strong>
  <br><br>
  <strong>b) Wert Januar und März im 3-Monats-Durchschnitt:</strong>
  <br><br>
  <strong>c) Unterschied 3 vs. 5 Monate und Einsatzempfehlung:</strong>

  </div>
</div>

---

## Aufgabe 4 — Prozentanteil pro Servicebereich

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Welcher Servicebereich nimmt die meisten Patienten auf?</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Krankenhausleitung will wissen wie sich die Patientenaufnahmen auf die vier Servicebereiche verteilen — als Prozentanteil am Gesamtaufkommen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Tabellenvisual mit <code>services_weekly[service]</code> und <code>[Aufnahmen]</code> an. Lege eine visuelle Berechnung an:<br><br>
    <code>Anteil Aufnahmen = DIVIDE([Aufnahmen], COLLAPSE([Aufnahmen], HIGHESTPARENT))</code><br><br>
    Formatiere die Spalte als Prozent. Erwartete Werte zur Kontrolle:<br>
    general_medicine: 39,9% · surgery: 28,8% · emergency: 20,3% · ICU: 11,1%</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Was macht COLLAPSE([Aufnahmen], HIGHESTPARENT) konkret in diesem Visual? Welcher Wert steht im Nenner?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Warum kann man diesen Anteil nicht mit <code>DIVIDE([Aufnahmen], [Aufnahmen])</code> berechnen — was würde dabei herauskommen?</span>
  </div>
</div>

  <strong>a) Prozentwerte der vier Servicebereiche:</strong>
  <br><br>
  <strong>b) Was COLLAPSE berechnet:</strong>
  <br><br>
  <strong>c) Ergebnis von DIVIDE([Aufnahmen], [Aufnahmen]):</strong>

  </div>
</div>

---

## Aufgabe 5 — Vergleich mit Vormonat: Ablehnungen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Steigen oder sinken die Ablehnungen?</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Abgelehnte Patienten sind ein kritischer Qualitätsindikator. Die Leitung möchte monatlich sehen ob die Ablehnungszahlen gegenüber dem Vormonat gestiegen oder gesunken sind.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Tabellenvisual mit <code>services_weekly[month]</code> und <code>[Ablehnungen]</code> an. Lege eine visuelle Berechnung an:<br><br>
    <code>Ablehnungen Diff = [Ablehnungen] - PREVIOUS([Ablehnungen])</code><br><br>
    Was zeigt Januar? Was zeigt Februar — und was bedeutet das inhaltlich?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege eine zweite Berechnung an die das prozentuale Wachstum zeigt:<br><br>
    <code>Ablehnungen % Vormonat = DIVIDE([Ablehnungen] - PREVIOUS([Ablehnungen]), PREVIOUS([Ablehnungen]))</code><br><br>
    Formatiere als Prozent. In welchem Monat sinken die Ablehnungen am stärksten gegenüber dem Vormonat?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Dezember zeigt einen starken Anstieg der Ablehnungen (1.463 gegenüber 532 im November). Welche inhaltliche Erklärung könnte es dafür geben? Schau dir die Spalte <code>event</code> in services_weekly an — hilft das?</span>
  </div>
</div>

  <strong>a) Wert Januar und Februar in Ablehnungen Diff:</strong>
  <br><br>
  <strong>b) Monat mit stärkstem Rückgang:</strong>
  <br><br>
  <strong>c) Erklärung für Dezember-Anstieg:</strong>

  </div>
</div>

---

## Aufgabe 6 — Anwesenheitsrate nach Service und Rolle

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Anteil der Rolle an der Anwesenheit des Servicebereichs</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Personalabteilung will wissen wie hoch der Anwesenheitsanteil jeder Berufsgruppe innerhalb ihres Servicebereichs ist. Ein Matrixvisual mit Service und Rolle als Hierarchie soll das zeigen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Matrixvisual an: Zeilen = <code>staff_schedule[service]</code>, darunter <code>staff_schedule[role]</code>. Werte = <code>[Anwesenheitsrate]</code>. Drille das Visual auf und prüfe: Emergency gesamt sollte ca. 60,4% zeigen, Doctor in Emergency ca. 58,9%.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege eine visuelle Berechnung an die den Anteil jeder Rolle an der Anwesenheitsrate des übergeordneten Servicebereichs zeigt:<br><br>
    <code>Anteil Rolle = DIVIDE([Anwesenheitsrate], COLLAPSE([Anwesenheitsrate], HIGHESTPARENT))</code><br><br>
    Was zeigt die Zeile "doctor" unter "emergency"? Macht der Prozentwert inhaltlich Sinn?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Die drei Rollen haben sehr ähnliche Anwesenheitsraten (58–61%). Was bedeutet das für die Anteilswerte — warum liegen alle drei nahe bei 33%? Wäre PERCENTOFPARENT hier eine sinnvolle Kennzahl oder eher nicht?</span>
  </div>
</div>

  <strong>a) Anwesenheitsrate Emergency gesamt und Doctor Emergency:</strong>
  <br><br>
  <strong>b) Anteil Doctor in Emergency und Bewertung:</strong>
  <br><br>
  <strong>c) Warum alle nahe 33% und Sinnhaftigkeit der Kennzahl:</strong>

  </div>
</div>

---

## Aufgabe 7 — Visuelle Berechnung vs. Measure

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Entscheidung: Wann welche Berechnungsart?</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Du möchtest die Bettauslastung (patients_admitted / available_beds) pro Servicebereich berechnen. Lege die Berechnung als visuelle Berechnung an:<br><br>
    <code>Auslastung = DIVIDE(SUM(services_weekly[patients_admitted]), SUM(services_weekly[available_beds]))</code><br><br>
    Tipp: In visuellen Berechnungen sind die Daten bereits aggregiert — SUM hier ist nicht nötig, die Formel vereinfacht sich zu:<br><br>
    <code>Auslastung = DIVIDE([Aufnahmen], SUM(services_weekly[available_beds]))</code><br><br>
    Kontrollwerte: ICU 83,9% · Emergency 100,0% · general_medicine 97,0% · surgery 86,4%</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Nun möchtest du dieselbe Auslastung in einem komplett anderen Visual verwenden — einem Balkendiagramm auf einem anderen Berichtsblatt. Kannst du die visuelle Berechnung aus Aufgabe 7a dort wiederverwenden? Was musst du stattdessen tun?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Entscheide für folgende drei Anforderungen ob eine visuelle Berechnung oder ein Measure besser geeignet ist — und begründe:<br><br>
    1. Kumulierte Aufnahmen seit Jahresbeginn in einer Monatstabelle<br>
    2. Bettauslastung die in einem Slicer-gefilterten Dashboard-Bericht auf mehreren Seiten erscheinen soll<br>
    3. Anteil jedes Servicebereichs am Krankenhausgesamtumsatz (Umsatzdaten sind in einer separaten Tabelle)</span>
  </div>
</div>

  <strong>a) Auslastungswerte zur Kontrolle notiert:</strong>
  <br><br>
  <strong>b) Wiederverwendbarkeit und Alternative:</strong>
  <br><br>
  <strong>c) Entscheidung für alle drei Anforderungen mit Begründung:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">RUNNINGSUM([Aufnahmen]) ohne HIGHESTPARENT läuft durch alle Servicebereiche durch. Ein Kollege behauptet das sei dasselbe wie TOTALYTD in DAX. Stimmt das? Was ist der wesentliche Unterschied?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Du baust eine laufende Summe der Patientenaufnahmen in einem Matrixvisual mit Service → Monat als Hierarchie. RUNNINGSUM ohne Parameter zeigt falsche Werte. Welchen Reset-Parameter setzt du — und warum?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Vorbereitung</strong> Vier Tabellen geladen, Beziehung staff → staff_schedule angelegt, vier Measures erstellt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Laufende Summe per Vorlage, Kontrollwerte geprüft, Vergleich mit Measure-Ansatz erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> RUNNINGSUM mit HIGHESTPARENT, Unterschied ohne Parameter beobachtet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> MOVINGAVERAGE mit 3 und 5 Monaten verglichen</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> COLLAPSE für Prozentanteil verwendet, Kontrollwerte geprüft</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> PREVIOUS für Vormonatsvergleich, prozentuales Wachstum berechnet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Matrixvisual mit Hierarchie, COLLAPSE für Rollenanteil</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Auslastung als visuelle Berechnung, Grenzen der Wiederverwendbarkeit erklärt</span>
  </div>
</div>
