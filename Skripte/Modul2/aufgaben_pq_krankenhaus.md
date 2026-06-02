# Aufgaben: Krankenhausdaten bereinigen und transformieren

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Zusatzübung · Aufgabenblatt</div>
  <div class="pbi-page-title">Krankenhausdaten bereinigen und transformieren</div>
  <div class="pbi-page-sub">Datenprofiling · Merge · Fremdschlüssel korrigieren · Datenfehler identifizieren · Datentypen</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Diese Übung basiert auf vier CSV-Dateien eines fiktiven Krankenhauses: <strong>patients.csv</strong>, <strong>staff.csv</strong>, <strong>staff_schedule.csv</strong> und <strong>services_weekly.csv</strong>. Lege eine neue Power BI Desktop-Datei an und speichere sie als <code>uebung_krankenhaus.pbix</code>.
</div>

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Achtung</span>
  Die Daten enthalten absichtlich eingebaute Fehler. Ein Teil dieser Übung besteht darin, diese Fehler eigenständig zu entdecken — lies die Aufgaben sorgfältig, bevor du mit der Bereinigung beginnst.
</div>

---

## Aufgabe 1 — Vier Dateien laden und strukturieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Dateiquellen verbinden und Abfragen benennen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lade alle vier CSV-Dateien über <strong>Start → Daten abrufen → Text/CSV</strong>. Wähle für jede Datei im Navigator <strong>Daten transformieren</strong> — noch nicht laden. Alle vier Abfragen sollen im linken Bereich des Power Query-Editors sichtbar sein.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Benenne alle vier Abfragen sauber um: <strong>Patients</strong>, <strong>Staff</strong>, <strong>StaffSchedule</strong>, <strong>ServicesWeekly</strong>. Rechtsklick auf die Abfrage → <strong>Umbenennen</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Prüfe für jede Abfrage ob die Spaltenüberschriften korrekt erkannt wurden und in der ersten Zeile stehen. Falls nicht: <strong>Start → Erste Zeile als Überschriften verwenden</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Notiere die Zeilenanzahl jeder Tabelle. Öffne dazu den <strong>Erweiterten Editor</strong> oder lies die Zeilenanzahl aus der Statusleiste unten ab.</span>
  </div>
</div>

  <strong>d) Zeilenanzahl der vier Tabellen:</strong>
  <br>Patients: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Staff: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; StaffSchedule: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ServicesWeekly:

  </div>
</div>

---

## Aufgabe 2 — Datenprofiling: Qualität prüfen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Spaltenqualität und Verteilung analysieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">📋 Szenario</span>
  Bevor du irgendetwas bereinigst, schaust du dir die Daten systematisch an. Datenprofiling zeigt auf einen Blick wo Probleme liegen — bevor sie in falschen Berechnungen auftauchen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Aktiviere für die Abfrage <strong>Patients</strong> alle drei Profilierungsansichten: <strong>Ansicht → Spaltenqualität</strong>, <strong>Ansicht → Spaltenverteilung</strong>, <strong>Ansicht → Spaltenprofil</strong>. Stelle in der Statusleiste auf <strong>Spaltenprofilerstellung basierend auf gesamtem Dataset</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe die Spalte <strong>patient_id</strong>: Sind alle Werte eindeutig? Gibt es Duplikate oder leere Werte? Notiere dein Ergebnis.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Schau auf die Spaltenverteilung der Spalte <strong>service</strong>. Welche vier Abteilungen gibt es, und wie sind die Patienten ungefähr verteilt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>StaffSchedule</strong>. Prüfe die Spalte <strong>staff_id</strong> auf Qualität und Verteilung. Schau dann die Spalte <strong>staff_name</strong> an: Wie viele eindeutige Namen gibt es in StaffSchedule? Wie viele Mitarbeiter stehen in der Tabelle <strong>Staff</strong>? Notiere den Unterschied.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Du hast in Teilaufgabe d einen Unterschied festgestellt. Was könnte das bedeuten? Nenne zwei mögliche Erklärungen.</span>
  </div>
</div>

  <strong>b) Eindeutigkeit patient_id:</strong>
  <br><br>
  <strong>c) Abteilungen und Verteilung:</strong>
  <br><br>
  <strong>d) Eindeutige Namen StaffSchedule vs. Zeilen in Staff:</strong>
  <br><br>
  <strong>e) Zwei mögliche Erklärungen für den Unterschied:</strong>

  </div>
</div>

---

## Aufgabe 3 — Den Datenfehler aufdecken

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Patientennamen in der Mitarbeiterliste identifizieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">📋 Szenario</span>
  Du hast festgestellt, dass StaffSchedule mehr eindeutige Namen enthält als Staff Mitarbeiter hat. Jetzt gehst du dem auf den Grund: Stimmen die Namen überein, oder gibt es Namen die gar keine Mitarbeiter sind?
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Führe einen <strong>Merge</strong> zwischen StaffSchedule und Staff durch: <strong>Start → Abfragen zusammenführen → Als neue Abfrage zusammenführen</strong>. Verknüpfe über die Spalte <strong>staff_name</strong> (in beiden Tabellen vorhanden). Wähle als Join-Typ <strong>Linker äußerer Join</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Expandiere in der neuen Abfrage die zusammengeführte Staff-Spalte. Wähle nur die Spalte <strong>staff_id</strong> aus Staff. Benenne die neue Spalte in <strong>staff_id_korrekt</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Filtere die Abfrage auf Zeilen wo <strong>staff_id_korrekt</strong> leer ist — das sind die Namen ohne Match in Staff. Wie viele eindeutige Namen betrifft das? Notiere sie.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Vergleiche diese Namen manuell mit der Tabelle <strong>Patients</strong>: Öffne die Abfrage Patients und prüfe die Spalte <strong>name</strong>. Was fällt dir auf?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was ist hier passiert? Welche Auswirkung hätte dieser Fehler auf spätere Auswertungen — zum Beispiel auf die Berechnung der durchschnittlichen Anwesenheitsquote pro Mitarbeiter?</span>
  </div>
</div>

  <strong>c) Anzahl und Namen ohne Match:</strong>
  <br><br>
  <strong>d) Befund beim Vergleich mit Patients:</strong>
  <br><br>
  <strong>e) Auswirkung auf Auswertungen:</strong>

  </div>
</div>

---

## Aufgabe 4 — StaffSchedule bereinigen und IDs korrigieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Falsche Einträge entfernen und korrekte IDs einsetzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Ziel</span>
  StaffSchedule hat zwei Probleme: 16 Namen sind Patienten, keine Mitarbeiter. Und alle echten Mitarbeiter haben falsche IDs — die IDs in StaffSchedule stimmen nicht mit denen in Staff überein. Beide Probleme werden jetzt behoben.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Gehe zurück zur ursprünglichen Abfrage <strong>StaffSchedule</strong> (nicht die Merge-Abfrage aus Aufgabe 3). Filtere die Spalte <strong>staff_name</strong> so, dass nur Namen verbleiben die auch in Staff vorkommen. Der einfachste Weg: Filtere über <strong>Zeilen filtern</strong> → wähle alle 16 Patienten-Namen ab. Wie viele Zeilen bleiben übrig?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Führe jetzt einen <strong>Merge</strong> zwischen der bereinigten StaffSchedule und Staff durch — wieder über <strong>staff_name</strong>, Linker äußerer Join. Expandiere aus Staff nur die Spalte <strong>staff_id</strong>. Benenne sie in <strong>staff_id_korrekt</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Prüfe die Spalte <strong>staff_id_korrekt</strong>: Gibt es noch leere Werte? Es sollten keine mehr vorhanden sein, da alle verbleibenden Namen einen Match in Staff haben.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Entferne die alte Spalte <strong>staff_id</strong> (die falschen IDs) und benenne <strong>staff_id_korrekt</strong> in <strong>staff_id</strong> um. Verschiebe die Spalte an die erste Position: Rechtsklick auf die Spaltenüberschrift → <strong>Verschieben → An den Anfang</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Warum ist ein Merge über den Mitarbeiternamen als Schlüssel keine dauerhaft gute Lösung — auch wenn es hier funktioniert hat? Was wäre der robustere Ansatz?</span>
  </div>
</div>

  <strong>a) Zeilenanzahl nach Bereinigung:</strong>
  <br><br>
  <strong>c) Leere Werte in staff_id_korrekt nach dem Merge:</strong>
  <br><br>
  <strong>e) Warum Name kein guter Schlüssel ist:</strong>

  </div>
</div>

---

## Aufgabe 5 — Datentypen korrigieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Alle Tabellen auf korrekte Datentypen prüfen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>Patients</strong>. Prüfe die Datentypen der Spalten <strong>arrival_date</strong> und <strong>departure_date</strong>. Sind sie als Datum erkannt? Korrigiere sie falls nötig auf den Typ <strong>Datum</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe die Spalte <strong>age</strong>: Welchen Typ hat sie? Korrigiere auf <strong>Ganzzahl</strong>. Prüfe danach die Spalte <strong>satisfaction</strong> und setze sie ebenfalls auf <strong>Ganzzahl</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>ServicesWeekly</strong>. Welchen Typ haben die numerischen Spalten <strong>available_beds</strong>, <strong>patients_admitted</strong>, <strong>patients_refused</strong>? Korrigiere alle auf <strong>Ganzzahl</strong>. Die Spalten <strong>patient_satisfaction</strong> und <strong>staff_morale</strong> ebenfalls.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>StaffSchedule</strong>. Die Spalte <strong>present</strong> enthält die Werte 0 und 1. Welcher Datentyp wäre hier inhaltlich am sinnvollsten — Ganzzahl oder Boolescher Wert (Ja/Nein)? Ändere den Typ entsprechend und begründe deine Wahl schriftlich.</span>
  </div>
</div>

  <strong>d) Begründung Datentyp für "present":</strong>

  </div>
</div>

---

## Aufgabe 6 — Berechnete Spalte: Liegedauer

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Liegedauer als neue Spalte berechnen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Ziel</span>
  Die Tabelle Patients enthält Aufnahme- und Entlassdatum, aber nicht die Liegedauer in Tagen. Diese soll als neue Spalte berechnet werden — direkt in Power Query, nicht als DAX-Maßnahme.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Patients</strong>. Gehe zu <strong>Spalte hinzufügen → Benutzerdefinierte Spalte</strong>. Nenne die neue Spalte <strong>Liegedauer_Tage</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Gib folgende Formel ein um die Differenz in Tagen zu berechnen:<br><code>Duration.Days([departure_date] - [arrival_date])</code><br>Bestätige mit OK.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze den Datentyp der neuen Spalte auf <strong>Ganzzahl</strong>. Prüfe im Spaltenprofil: Was ist der minimale und maximale Wert? Gibt es Patienten mit einer Liegedauer von 0 Tagen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Warum ist es besser, die Liegedauer bereits in Power Query zu berechnen statt später in DAX als berechnete Spalte? Nenne einen konkreten Vorteil.</span>
  </div>
</div>

  <strong>c) Minimale und maximale Liegedauer:</strong>
  <br><br>
  <strong>d) Vorteil Power Query gegenüber DAX-berechneter Spalte:</strong>

  </div>
</div>

---

## Aufgabe 7 — M-Code: Schritte nachvollziehen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Den erweiterten Editor lesen und verstehen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>StaffSchedule</strong> und wechsle zu <strong>Ansicht → Erweiterter Editor</strong>. Zähle die Schritte zwischen <code>let</code> und <code>in</code>. Wie viele sind es?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Identifiziere den Schritt in dem der Filter für die Patienten-Namen angewendet wurde. Welcher Funktionsname steht rechts vom <code>=</code>?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Schau auf die letzte Zeile nach <code>in</code>. Welcher Schrittname steht dort? Was bedeutet das für die Ausführung der Abfrage?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Schließe den Editor ohne Änderungen. Beantworte schriftlich: Du möchtest den Filter-Schritt aus Teilaufgabe b rückgängig machen. Was passiert mit den Schritten die danach kommen — zum Beispiel dem Merge-Schritt?</span>
  </div>
</div>

  <strong>a) Anzahl Schritte:</strong>
  <br><br>
  <strong>b) Funktionsname des Filter-Schritts:</strong>
  <br><br>
  <strong>c) Letzter Schritt nach "in" und Bedeutung:</strong>
  <br><br>
  <strong>d) Konsequenz beim Löschen des Filter-Schritts:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Du hast in dieser Übung Mitarbeiter-IDs über den Namen als Schlüssel korrigiert. In welchen realen Situationen könnte das scheitern? Nenne zwei konkrete Fälle.</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Die Tabelle <strong>services_weekly</strong> enthält wöchentliche Kapazitätsdaten — verfügbare Betten, Aufnahmen, Abweisungen. Wenn du daraus einen Bericht bauen willst: Welche der vier Tabellen wäre die Faktentabelle und welche wären Dimensionen? Begründe.</span>
</div>

  <strong>R1) Zwei Fälle wo Name als Schlüssel scheitert:</strong>
  <br><br>
  <strong>R2) Faktentabelle und Dimensionen:</strong>

</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Vier Dateien geladen, Abfragen benannt, Zeilenanzahl notiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Datenprofiling aktiviert, Unterschied in Mitarbeiterzahlen entdeckt und dokumentiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Merge durchgeführt, 16 Patienten-in-Mitarbeitern identifiziert und Auswirkung erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Falsche Einträge entfernt, IDs per Merge korrigiert, 5.720 Zeilen verbleiben</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Datentypen in allen vier Tabellen geprüft und korrigiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Liegedauer_Tage als neue Spalte berechnet, Typ Ganzzahl, Min/Max geprüft</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> M-Code gelesen, Filter-Schritt identifiziert, Abhängigkeiten verstanden</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Reflexion</strong> Beide Fragen schriftlich beantwortet</span>
  </div>
</div>
