# Aufgaben: Filtern, Interaktivität und Benutzererfahrung

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 19 · Aufgabenblatt</div>
  <div class="pbi-page-title">Krankenhaus-Analyse-Dashboard</div>
  <div class="pbi-page-sub">Small Multiples · QuickInfos · Drillthrough · Lesezeichen · Schaltflächen · Filterebenen</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis und Voraussetzungen</span>
  Öffne <code>uebung_14.pbix</code> aus Skript 14 — alle vier Krankenhausdateien geladen, Beziehung staff → staff_schedule angelegt, Measures vorhanden. Speichere am Ende als <code>uebung_19_krankenhaus.pbix</code>.
</div>

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Du bist Datenanalyst im Krankenhaus-Controlling. Die Pflegedirektorin hat folgenden Auftrag:<br><br>
  <em>„Ich brauche ein Dashboard das mir auf einen Blick zeigt wie die vier Stationen performen — Aufnahmen, Ablehnungen, Patientenzufriedenheit. Ich will selbst in die Details einsteigen können wenn eine Station auffällig ist. Außerdem brauche ich eine schnelle Möglichkeit zwischen Normalzustand und Krisenwochen zu wechseln — wir hatten dieses Jahr Streiks und Grippewellen die alles auf den Kopf gestellt haben."</em><br><br>
  Der Bericht besteht aus drei Seiten: <strong>Stationsübersicht</strong>, <strong>Patientendetail</strong> und <strong>Personaldetail</strong>.
</div>

---

## Aufgabe 1 — Measures für die Stationsanalyse

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Vier Measures anlegen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Measure für die <strong>Ablehnungsrate</strong> an. Ablehnungsrate = abgelehnte Patienten / (aufgenommene + abgelehnte Patienten):<br><br>
    <code>Ablehnungsrate =
DIVIDE(
    SUM(services_weekly[patients_refused]),
    SUM(services_weekly[patients_admitted]) + SUM(services_weekly[patients_refused])
)</code><br><br>
    Formatiere als Prozent mit einer Dezimalstelle. Prüfe mit einem Kartenvisual (kein Filter): der Wert sollte <strong>56,6%</strong> sein.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege ein Measure für die <strong>Bettauslastung</strong> an:<br><br>
    <code>Bettauslastung =
DIVIDE(
    SUM(services_weekly[patients_admitted]),
    SUM(services_weekly[available_beds])
)</code><br><br>
    Formatiere als Prozent. Prüfe für Emergency (Slicer auf "emergency"): der Wert sollte <strong>100,0%</strong> sein. ICU: <strong>83,9%</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege ein Measure für die <strong>durchschnittliche Patientenzufriedenheit</strong> an:<br><br>
    <code>Zufriedenheit Patienten = AVERAGE(services_weekly[patient_satisfaction])</code><br><br>
    Prüfe: Emergency sollte <strong>77,9</strong> zeigen, ICU <strong>81,6</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Lege ein Measure für die <strong>durchschnittliche Personalstimmung</strong> an:<br><br>
    <code>Personalstimmung = AVERAGE(services_weekly[staff_morale])</code><br><br>
    Prüfe: Bei Slicer auf Event = "strike" sollte die Personalstimmung auf <strong>53,7</strong> fallen (vs. 73,1 in Normalwochen).</span>
  </div>
</div>

  <strong>a) Ablehnungsrate gesamt:</strong>
  <br><br>
  <strong>b) Bettauslastung Emergency und ICU:</strong>
  <br><br>
  <strong>c) Zufriedenheit Emergency und ICU:</strong>
  <br><br>
  <strong>d) Personalstimmung Streikwochen vs. Normal:</strong>

  </div>
</div>

---

## Aufgabe 2 — Stationsübersicht: Filterebenen einrichten

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Seiten- und Berichtsfilter konfigurieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Pflegedirektorin soll immer nur vollständige Wochen sehen — Woche 52 enthält Jahresendausreißer (Emergency: 217 Aufnahmen, dreimal höher als normal). Diese Woche soll auf allen Seiten gefiltert bleiben, aber der Filter soll nicht sichtbar sein.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Seite an: <strong>Stationsübersicht</strong>. Öffne den Filterbereich. Ziehe <code>services_weekly[week]</code> in den Abschnitt <strong>Filter für alle Seiten</strong>. Filtertyp: Erweitert → "ist kleiner als oder gleich" → Wert: 51.<br><br>
    Prüfe: Gesamtaufnahmen sollten jetzt weniger als 5.851 sein (Woche 52 wird herausgefiltert). Blende den Filter aus (Dreipunkte → Ausgeblendet).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege vier <strong>Kartenvisuals</strong> nebeneinander an (gleiche Größe):<br><br>
    Karte 1: <code>[Aufnahmen]</code> · Titel: "Aufnahmen gesamt"<br>
    Karte 2: <code>[Ablehnungsrate]</code> · Titel: "Ablehnungsrate"<br>
    Karte 3: <code>[Bettauslastung]</code> · Titel: "Bettauslastung"<br>
    Karte 4: <code>[Zufriedenheit Patienten]</code> · Titel: "Patientenzufriedenheit"</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege einen <strong>Visualfilter</strong> nur auf Karte 2 (Ablehnungsrate): <code>[Ablehnungsrate]</code> → Filtertyp: Größer als 0. Erkläre: Wann würde die Ablehnungsrate 0 zeigen und warum wäre das ohne Filter irreführend?</span>
  </div>
</div>

  <strong>a) Gesamtaufnahmen nach Filter Woche ≤ 51:</strong>
  <br><br>
  <strong>c) Erklärung Visualfilter auf Ablehnungsrate:</strong>

  </div>
</div>

---

## Aufgabe 3 — Small Multiples: Monatlicher Aufnahmeverlauf aller Stationen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Vier Stationen gleichzeitig vergleichen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Pflegedirektorin fragt: „Zeigen alle Stationen denselben saisonalen Verlauf oder gibt es Ausreißer?" Ein Liniendiagramm mit vier Linien ist unlesbar — Small Multiples zeigen alle vier Stationen separat und vergleichbar.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein <strong>Liniendiagramm</strong> unterhalb der Karten an:<br>
    X-Achse: <code>services_weekly[month]</code> · Y-Achse: <code>[Aufnahmen]</code> · <strong>Kleine Vielfache</strong>: <code>services_weekly[service]</code><br><br>
    Stelle Layout auf <strong>2 Zeilen × 2 Spalten</strong> ein (Format → Kleine Vielfache → Layout).<br><br>
    Prüfe: Emergency sollte im Dezember einen deutlichen Spike zeigen (<strong>217 Aufnahmen</strong> — aber Achtung: der Berichtsfilter Woche ≤ 51 filtert Dezember-Woche-52-Daten weg, deshalb erscheint Dezember reduziert).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Stelle die Achsenskalierung auf <strong>"Gleich für alle"</strong> (Format → Kleine Vielfache → Achse). Beobachte: ICU hat deutlich niedrigere Werte als Emergency. Welche Station hat den gleichmäßigsten Verlauf über das Jahr?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wechsle auf <strong>"Individuell"</strong>. Was verändert sich? Welche Station zeigt jetzt die stärkste relative Schwankung? Begründe warum individuelle Skalierung hier irreführend sein kann, wenn die Pflegedirektorin die absolute Belastung beurteilen will.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Füge in den <strong>QuickInfo-Well</strong> des Liniendiagramms <code>[Ablehnungsrate]</code> und <code>[Bettauslastung]</code> hinzu. Hovere im Präsentationsmodus über einen Datenpunkt von Emergency. Welche Ablehnungsrate erscheint für Emergency im September?</span>
  </div>
</div>

  <strong>b) Station mit gleichmäßigstem Verlauf:</strong>
  <br><br>
  <strong>c) Stärkste relative Schwankung und Begründung Irreführung:</strong>
  <br><br>
  <strong>d) Ablehnungsrate Emergency September:</strong>

  </div>
</div>

---

## Aufgabe 4 — Seiten-QuickInfo: Personaldetails beim Hover

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Personalstimmung als Kontext-Overlay</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Wenn die Pflegedirektorin über eine Station im Balkendiagramm hovert, soll sie sofort die Personalstimmung und Anwesenheitsrate dieser Station sehen — ohne die Übersichtsseite zu verlassen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Seite an: <strong>QuickInfo Personal</strong>. Konfiguriere sie als QuickInfo-Seite: Format → Seite formatieren → Seiteninformationen → <strong>Verwendung als QuickInfo zulassen</strong> → Ein. Seitengröße: Format → Canvas-Einstellungen → Typ: <strong>QuickInfo</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege auf der QuickInfo-Seite zwei kompakte Visuals an:<br><br>
    <strong>Kartenvisual</strong>: <code>[Personalstimmung]</code> · Titel: "Personalstimmung"<br>
    <strong>Balkendiagramm</strong>: Y-Achse: <code>staff_schedule[role]</code>, X-Achse: <code>[Anwesenheitsrate]</code> · Titel: "Anwesenheit nach Rolle"<br><br>
    Prüfe Anwesenheitswerte: Doctor ~59,3%, Nurse ~60,4%, Nursing_assistant ~60,0% für ICU.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Gehe zur Stationsübersichtsseite. Lege ein <strong>Balkendiagramm</strong> an: Y-Achse: <code>services_weekly[service]</code>, X-Achse: <code>[Aufnahmen]</code>.<br><br>
    Verknüpfe die QuickInfo: Visual anklicken → Format → Allgemein → QuickInfo → Seite → <strong>QuickInfo Personal</strong> auswählen.<br><br>
    Teste im Präsentationsmodus: Hover über "emergency" — erscheint die Personalstimmung und Anwesenheitsrate für Emergency?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wichtiger Hinweis für die Pflegedirektorin: Die QuickInfo funktioniert nur auf dem Desktop-Browser, nicht auf dem Smartphone. Welche Alternative könntest du für mobile Nutzer einbauen?</span>
  </div>
</div>

  <strong>b) Anwesenheitsrate Doctor, Nurse, Nursing_assistant für ICU:</strong>
  <br><br>
  <strong>c) Erscheint die QuickInfo korrekt (ja/nein) und Personalstimmung Emergency:</strong>
  <br><br>
  <strong>d) Mobile Alternative zur QuickInfo:</strong>

  </div>
</div>

---

## Aufgabe 5 — Drillthrough: Patientendetail je Station

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Von der Stationsübersicht zu Patientendetails navigieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  ICU hat mit 17,9% die niedrigste Ablehnungsrate. Die Pflegedirektorin will genauer wissen wer in der ICU behandelt wird — Altersverteilung, Verweildauer, Zufriedenheit einzelner Patienten. Per Rechtsklick auf "ICU" soll eine Detailseite öffnen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Seite an: <strong>Patientendetail</strong>. Konfiguriere sie als Drillthrough-Seite: Im Visualisierungsbereich (Felder-Symbol) → Drillthrough-Well → <code>patients[service]</code> hineinziehen.<br><br>
    Die automatisch eingefügte Zurück-Schaltfläche an die <strong>obere linke Ecke</strong> der Seite verschieben.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege auf der Patientendetailseite folgende Visuals an:<br><br>
    <strong>Mehrzeilige Karte</strong>: <code>patients[service]</code>, Anzahl Patienten (COUNTROWS), <code>[Zufriedenheit Patienten]</code><br><br>
    <strong>Säulendiagramm</strong>: X-Achse: Altersgruppen (berechne eine berechnete Spalte in patients: <code>Altersgruppe = IF(patients[age] < 30, "Unter 30", IF(patients[age] < 60, "30-59", "60+"))</code>), Y-Achse: COUNTROWS<br><br>
    <strong>Tabellenvisual</strong>: <code>patients[name]</code>, <code>patients[age]</code>, <code>patients[arrival_date]</code>, <code>patients[departure_date]</code>, <code>patients[satisfaction]</code></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge ein Measure für die <strong>Verweildauer in Tagen</strong> an:<br><br>
    <code>Verweildauer Tage =
AVERAGEX(
    patients,
    DATEDIFF(patients[arrival_date], patients[departure_date], DAY)
)</code><br><br>
    Füge es als fünfte Kartenvisual auf der Detailseite hinzu. Prüfe: ICU sollte <strong>7,6 Tage</strong> zeigen, Surgery <strong>7,9 Tage</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Gehe zur Stationsübersichtsseite. <strong>Rechtsklick</strong> auf "ICU" im Balkendiagramm → Drillthrough → Patientendetail.<br><br>
    Prüfe: Die Detailseite zeigt 241 Patienten, Durchschnittsalter 44,2 Jahre, Durchschnittszufriedenheit 79,9. Stimmen diese Werte überein?</span>
  </div>
</div>

  <strong>b) Berechnete Spalte Altersgruppe — angelegt (ja/nein):</strong>
  <br><br>
  <strong>c) Verweildauer ICU und Surgery:</strong>
  <br><br>
  <strong>d) Werte für ICU-Drillthrough stimmen überein (ja/nein) + Patientenanzahl:</strong>

  </div>
</div>

---

## Aufgabe 6 — Drillthrough: Personaldetail je Station

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Zweite Drillthrough-Seite für Personalanalyse</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine dritte Seite an: <strong>Personaldetail</strong>. Drillthrough-Well: <code>staff_schedule[service]</code>.<br><br>
    Zurück-Schaltfläche oben links positionieren.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege auf der Personaldetailseite folgende Visuals an:<br><br>
    <strong>Matrixvisual</strong>: Zeilen: <code>staff_schedule[role]</code>, Spalten: (kein Spaltenfeld), Werte: <code>[Anwesenheitsrate]</code>, <code>[Personalstimmung]</code><br><br>
    <strong>Liniendiagramm</strong>: X-Achse: <code>staff_schedule[week]</code>, Y-Achse: <code>[Anwesenheitsrate]</code>, Legende: <code>staff_schedule[role]</code> — zeigt Anwesenheitsverlauf über 52 Wochen<br><br>
    <strong>Tabellenvisual</strong>: <code>staff[staff_name]</code>, <code>staff[role]</code>, <code>[Anwesenheitsrate]</code> — für jeden Mitarbeiter der Station</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Gehe zur Stationsübersichtsseite. Rechtsklick auf "surgery" im Balkendiagramm → Drillthrough → Personaldetail.<br><br>
    Prüfe im Liniendiagramm: In welchen Wochen bricht die Anwesenheitsrate stark ein? Die Streikwochen (Woche 16 und 24 hatten Personalstimmung von 31 und 39 in Surgery) sollten sichtbar sein.</span>
  </div>
</div>

  <strong>b) Anwesenheitsrate Surgery gesamt:</strong>
  <br><br>
  <strong>c) Wochen mit stärkstem Einbruch und Vermutung warum:</strong>

  </div>
</div>

---

## Aufgabe 7 — Lesezeichen: Ereignisvergleich

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Normalzustand vs. Krisenwochen per Schaltfläche wechseln</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Pflegedirektorin will mit einem Klick zwischen drei Ansichten wechseln: <strong>Alle Wochen</strong>, <strong>Nur Streikwochen</strong> (Personalstimmung fällt auf 53,7), <strong>Nur Grippewochen</strong> (Ablehnungen steigen stark). Das soll ohne Slicer funktionieren — über Schaltflächen und Lesezeichen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege auf der Stationsübersichtsseite einen <strong>ausgeblendeten Dropdown-Slicer</strong> auf <code>services_weekly[event]</code> an. Positioniere ihn außerhalb des sichtbaren Bereichs oder blende ihn über Format → Allgemein → Sichtbarkeit → Aus.<br><br>
    <strong>Wichtig:</strong> Der Slicer muss unsichtbar sein, aber auf der Seite vorhanden bleiben — die Lesezeichen steuern ihn.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle drei Lesezeichen (Ansicht → Lesezeichen → Lesezeichen hinzufügen):<br><br>
    <strong>Lesezeichen "Alle Wochen":</strong> Slicer auf keine Auswahl → Lesezeichen erstellen. Nur Status <strong>Daten</strong>, Bereich: <strong>Ausgewählte Visuals</strong> (nur der Slicer).<br><br>
    <strong>Lesezeichen "Streikwochen":</strong> Slicer auf "strike" setzen → Lesezeichen erstellen. Gleiche Einstellungen.<br><br>
    <strong>Lesezeichen "Grippewochen":</strong> Slicer auf "flu" setzen → Lesezeichen erstellen. Gleiche Einstellungen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge drei <strong>Schaltflächen</strong> nebeneinander oben auf der Seite ein:<br>
    "Alle Wochen" · "Streikwochen" · "Grippewochen"<br><br>
    Verknüpfe jede Schaltfläche mit dem entsprechenden Lesezeichen (Format → Schaltfläche → Aktion → Typ: Lesezeichen).<br><br>
    Formatiere: alle drei gleiche Größe und Stil. Teste im Präsentationsmodus:</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Prüfe die Kontrollwerte nach dem Klicken:<br><br>
    <strong>Schaltfläche "Streikwochen":</strong> [Personalstimmung] sollte auf <strong>53,7</strong> fallen.<br>
    <strong>Schaltfläche "Grippewochen":</strong> [Ablehnungsrate] sollte steigen (Ø 126 Ablehnungen pro Woche vs. 28 in Normalwochen).<br>
    <strong>Schaltfläche "Alle Wochen":</strong> [Ablehnungsrate] zurück auf <strong>56,6%</strong>.<br><br>
    Notiere die Werte die du beim Testen siehst.</span>
  </div>
</div>

  <strong>b) Lesezeichen-Einstellungen (Status + Bereich) — warum "Ausgewählte Visuals"?</strong>
  <br><br>
  <strong>d) Kontrollwerte Streikwochen, Grippewochen, Alle Wochen:</strong>

  </div>
</div>

---

## Aufgabe 8 — Popup-Hilfe für die Detailseiten

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">8</span>
    <span class="pbi-task-title">Erklärungsoverlay für neue Benutzer</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge auf der <strong>Stationsübersichtsseite</strong> ein <strong>Rechteck</strong> ein das alle vier Karten und das Small-Multiples-Diagramm überdeckt. Hintergrundfarbe: dunkelgrau, Transparenz 10%.<br><br>
    Füge drei <strong>Textfelder</strong> auf dem Rechteck ein:<br>
    "Vier Karten: Aufnahmen, Ablehnungsrate, Bettauslastung und Zufriedenheit — gefiltert auf Wochen 1–51."<br>
    "Liniendiagramm: Monatlicher Aufnahmeverlauf aller vier Stationen. Hover für Ablehnungsrate und Bettauslastung."<br>
    "Balkendiagramm: Rechtsklick auf eine Station für Patienten- oder Personaldetails."</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Blende Rechteck und alle Textfelder aus. Erstelle zwei Lesezeichen:<br><br>
    <strong>"Hilfe zeigen":</strong> Rechteck und Textfelder sichtbar. Nur Status <strong>Anzeige</strong>, Ausgewählte Visuals (Rechteck + alle Textfelder).<br>
    <strong>"Hilfe verstecken":</strong> Alles ausgeblendet. Gleiche Einstellungen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge eine <strong>?-Schaltfläche</strong> oben rechts auf der Seite ein. Aktion: Lesezeichen → "Hilfe zeigen".<br><br>
    Konfiguriere das Rechteck selbst als Schaltfläche: Format → Schaltfläche → Aktion → Typ: Lesezeichen → "Hilfe verstecken". Verbinde die Aktion mit dem Rechteck.<br><br>
    Teste: ? klicken → Overlay erscheint. Overlay klicken → verschwindet.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Warum wurden für das Hilfe-Overlay <strong>"Anzeige"</strong> als Lesezeichen-Status gewählt und <strong>nicht</strong> "Daten"? Was würde passieren wenn "Daten" aktiv wäre?</span>
  </div>
</div>

  <strong>c) Funktioniert das Popup-Overlay (ja/nein):</strong>
  <br><br>
  <strong>d) Erklärung "Anzeige" vs. "Daten" bei Lesezeichen:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Emergency hat eine Ablehnungsrate von 80,9% — mehr als vier von fünf Patientenanfragen werden abgelehnt. Das ist auch gleichzeitig die Station mit 100% Bettauslastung. Erkläre den Zusammenhang zwischen diesen beiden Kennzahlen. Was würde eine sinkende Bettauslastung mit der Ablehnungsrate machen?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Du hast in Aufgabe 7 Lesezeichen mit "Ausgewählte Visuals" (nur der Slicer) erstellt statt "Alle Visuals". Beschreibe konkret was passieren würde wenn die Pflegedirektorin zuerst die Stationsübersicht auf "emergency" filtert (über einen zweiten Slicer) und dann auf "Streikwochen" klickt — bei "Alle Visuals" vs. bei "Ausgewählte Visuals".</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Vier Measures angelegt: Ablehnungsrate 56,6%, Bettauslastung Emergency 100,0% / ICU 83,9%, Zufriedenheit, Personalstimmung</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Berichtsfilter Woche ≤ 51 ausgeblendet, vier KPI-Karten gleicher Größe, Visualfilter auf Ablehnungsrate</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Small Multiples Liniendiagramm 2×2, gemeinsame und individuelle Skalierung verglichen, QuickInfo-Well befüllt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> QuickInfo-Seite angelegt, Personalstimmung und Anwesenheitsrate erscheinen beim Hover</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Drillthrough Patientendetail: ICU-Drill zeigt 241 Patienten, Verweildauer 7,6 Tage, Zurück-Schaltfläche oben links</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Drillthrough Personaldetail: Streikwochen-Einbrüche im Liniendiagramm sichtbar</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Drei Schaltflächen mit Lesezeichen: Personalstimmung Streik 53,7%, Alle Wochen 56,6% Ablehnungsrate</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 8</strong> Popup-Overlay funktioniert: ? öffnet, Klick auf Overlay schließt</span>
  </div>
</div>
