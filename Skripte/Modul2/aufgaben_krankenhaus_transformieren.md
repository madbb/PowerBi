# Aufgaben: Krankenhausdaten transformieren und erweitern

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Zusatzübung · Aufgabenblatt</div>
  <div class="pbi-page-title">Krankenhausdaten transformieren und erweitern</div>
  <div class="pbi-page-sub">Neue Spalten · Bedingte Spalten · Extrahieren · Gruppieren · Anfügen · Joins · Verweis · Indexspalte</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Diese Aufgaben bauen auf der bereinigten Datenbasis aus dem ersten Aufgabenblatt auf. Alle vier Abfragen (<strong>Patients</strong>, <strong>Staff</strong>, <strong>StaffSchedule</strong>, <strong>ServicesWeekly</strong>) sollen bereits geladen, benannt und bereinigt sein. Öffne die Datei <code>uebung_krankenhaus.pbix</code> und wechsle in den Power Query-Editor.
</div>

---

## Aufgabe 8 — Namen extrahieren: Vor- und Nachname trennen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">8</span>
    <span class="pbi-task-title">Spalte "name" in Patients aufteilen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Spalte <strong>name</strong> in Patients enthält Vor- und Nachname als einen kombinierten Text, z. B. "Richard Rodriguez". Für spätere Auswertungen sollen beide Teile in eigenen Spalten stehen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Patients</strong>. Rechtsklick auf die Spalte <strong>name</strong> → <strong>Spalte teilen → Nach Trennzeichen</strong>. Wähle das Leerzeichen als Trennzeichen und die Option <strong>Ganz links</strong>. Bestätige mit OK.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Benenne die zwei entstandenen Spalten um: <strong>name.1</strong> → <strong>Vorname</strong>, <strong>name.2</strong> → <strong>Nachname</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Prüfe mit Spaltenverteilung: Gibt es Patienten, deren Name mehr als ein Leerzeichen enthält (z. B. Doppelnamen)? Was passiert mit diesen beim Teilen nach "ganz links"?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Füge jetzt über <strong>Spalte hinzufügen → Benutzerdefinierte Spalte</strong> eine neue Spalte <strong>Name_Voll</strong> hinzu, die Vor- und Nachname wieder zusammensetzt: <code>[Vorname] & " " & [Nachname]</code>. Vergleiche das Ergebnis mit dem Original.</span>
  </div>
</div>

  <strong>c) Befund zu Doppelnamen:</strong>
  <br><br>
  <strong>d) Stimmt Name_Voll mit dem Original überein?</strong>

  </div>
</div>

---

## Aufgabe 9 — Patienten-ID bereinigen: Präfix extrahieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">9</span>
    <span class="pbi-task-title">Aus patient_id den numerischen Teil extrahieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die <strong>patient_id</strong> hat das Format <em>PAT-xxxxxxxx</em>. Für eine spätere Beziehung zu einem anderen System wird nur der Teil nach dem Bindestrich benötigt.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Markiere die Spalte <strong>patient_id</strong>. Wähle <strong>Transformieren → Extrahieren → Text nach Trennzeichen</strong>. Gib als Trennzeichen <code>-</code> ein. Das Ergebnis ist der Hash-Teil ohne "PAT-".</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Benenne die Spalte in <strong>patient_id_kurz</strong> um. Prüfe: Sind alle Werte noch eindeutig?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Mache den Schritt rückgängig (Schritt löschen in den angewendeten Schritten). Wir behalten die ursprüngliche patient_id. Erkläre schriftlich: Wann wäre es sinnvoll, eine ID so zu kürzen — und wann nicht?</span>
  </div>
</div>

  <strong>c) Begründung wann kürzen sinnvoll ist:</strong>

  </div>
</div>

---

## Aufgabe 10 — Bedingte Spalte: Altersgruppen kategorisieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">10</span>
    <span class="pbi-task-title">Patienten anhand des Alters in Gruppen einteilen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Patients</strong>. Gehe zu <strong>Spalte hinzufügen → Bedingte Spalte</strong>. Nenne die neue Spalte <strong>Altersgruppe</strong> und konfiguriere folgende Bedingungen:<br>
    — Wenn <em>age</em> kleiner als 18 → <em>Kind</em><br>
    — Wenn <em>age</em> kleiner als 40 → <em>Erwachsen</em><br>
    — Wenn <em>age</em> kleiner als 65 → <em>Mittelalter</em><br>
    — Sonst → <em>Senior</em></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe mit der Spaltenverteilung: Wie verteilen sich die vier Gruppen? Welche Gruppe hat die meisten Patienten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Öffne den erweiterten Editor. Suche den Schritt der die bedingte Spalte erzeugt hat. Welche M-Funktion steht rechts vom <code>=</code>?</span>
  </div>
</div>

  <strong>b) Verteilung der Altersgruppen:</strong>
  <br><br>
  <strong>c) M-Funktion für bedingte Spalte:</strong>

  </div>
</div>

---

## Aufgabe 11 — Bedingte Spalte: Zufriedenheitsbewertung

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">11</span>
    <span class="pbi-task-title">Numerischen Zufriedenheitswert in Kategorie übersetzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Spalte <strong>satisfaction</strong> enthält Werte von 60 bis 99. Im Bericht sollen statt Zahlen lesbare Labels erscheinen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge in der Abfrage <strong>Patients</strong> eine bedingte Spalte <strong>Zufriedenheit_Label</strong> hinzu:<br>
    — Wenn <em>satisfaction</em> kleiner als 70 → <em>Unzufrieden</em><br>
    — Wenn <em>satisfaction</em> kleiner als 85 → <em>Neutral</em><br>
    — Sonst → <em>Zufrieden</em></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe die Spaltenverteilung von <strong>Zufriedenheit_Label</strong>: Wie viele Patienten fallen in jede Kategorie?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Beantworte schriftlich: Du könntest diese Kategorisierung auch in DAX als berechnete Spalte erstellen. Was ist der Unterschied zwischen der Power Query-Variante und der DAX-Variante in Bezug auf Speicherort und Verarbeitungszeitpunkt?</span>
  </div>
</div>

  <strong>b) Verteilung der Zufriedenheitslabels:</strong>
  <br><br>
  <strong>c) Power Query vs. DAX berechnete Spalte:</strong>

  </div>
</div>

---

## Aufgabe 12 — Indexspalte erstellen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">12</span>
    <span class="pbi-task-title">Laufende Nummer als Indexspalte hinzufügen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die <strong>ServicesWeekly</strong>-Tabelle hat keinen eindeutigen Primärschlüssel — jede Zeile ist eine Kombination aus Woche, Monat und Abteilung. Für ein späteres Datenmodell soll ein künstlicher Schlüssel als Indexspalte erzeugt werden.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>ServicesWeekly</strong>. Gehe zu <strong>Spalte hinzufügen → Indexspalte → Ab 1</strong>. Eine neue Spalte <strong>Index</strong> erscheint ganz rechts.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Benenne die Spalte in <strong>ServiceWeekID</strong> um. Verschiebe sie an die erste Position: Rechtsklick → <strong>Verschieben → An den Anfang</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Prüfe im Spaltenprofil: Ist der Wert in <strong>ServiceWeekID</strong> eindeutig? Wie viele Zeilen hat die Tabelle insgesamt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Warum bricht eine Indexspalte Query Folding ab? Was bedeutet das für die Ladeperformance bei großen Datenmengen?</span>
  </div>
</div>

  <strong>c) Eindeutigkeit ServiceWeekID und Zeilenanzahl:</strong>
  <br><br>
  <strong>d) Warum Indexspalte Query Folding bricht:</strong>

  </div>
</div>

---

## Aufgabe 13 — Ausfüllen: Wochendaten vervollständigen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">13</span>
    <span class="pbi-task-title">NULL-Werte in der Ereignisspalte durch Ausfüllen beheben</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Stell dir vor, die Spalte <strong>event</strong> in ServicesWeekly wäre so exportiert worden: Nur die erste Zeile je Ereignis enthält den Wert, alle folgenden sind NULL. Das ist ein typisches Excel-Export-Muster. Wir simulieren das und beheben es.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Schau auf die Spalte <strong>event</strong> in ServicesWeekly. Welche vier Werte kommen vor? Wie viele Zeilen haben den Wert <em>none</em>?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ersetze alle Vorkommen von <em>none</em> in der Spalte <strong>event</strong> durch NULL: <strong>Transformieren → Werte ersetzen</strong>. Gib im Feld "Zu suchender Wert" <em>none</em> ein und lasse "Ersetzen durch" leer.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wende jetzt <strong>Ausfüllen → Nach unten</strong> auf die Spalte <strong>event</strong> an: Rechtsklick auf die Spaltenüberschrift → <strong>Ausfüllen → Nach unten</strong>. Was passiert mit den NULL-Werten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Mache beide Schritte rückgängig (Werte ersetzen und Ausfüllen). Wir wollen die ursprüngliche <em>none</em>-Schreibweise behalten. Beantworte schriftlich: In welchem realen Szenario wäre Ausfüllen nach unten sinnvoll — und was muss dabei an den Quelldaten zutreffen damit es funktioniert?</span>
  </div>
</div>

  <strong>a) Vier Ereigniswerte und Anzahl "none":</strong>
  <br><br>
  <strong>d) Wann ist Ausfüllen nach unten sinnvoll:</strong>

  </div>
</div>

---

## Aufgabe 14 — Gruppieren: Auslastung pro Abteilung berechnen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">14</span>
    <span class="pbi-task-title">ServicesWeekly nach Abteilung aggregieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Geschäftsführung möchte eine Übersicht: Wie viele Patienten wurden je Abteilung insgesamt aufgenommen, wie viele abgewiesen, und wie hoch war die durchschnittliche Zufriedenheit — über alle Wochen summiert?
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf <strong>ServicesWeekly</strong> → <strong>Verweis</strong>. Eine neue Abfrage entsteht. Benenne sie in <strong>AbteilungsSummary</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">In der Abfrage <strong>AbteilungsSummary</strong>: <strong>Start → Gruppieren nach</strong>. Wähle <strong>Erweitert</strong>. Gruppiere nach: <strong>service</strong>. Füge folgende Aggregationen hinzu:<br>
    — <em>Gesamt_Aufnahmen</em>: Vorgang Summe, Spalte <em>patients_admitted</em><br>
    — <em>Gesamt_Abweisungen</em>: Vorgang Summe, Spalte <em>patients_refused</em><br>
    — <em>Gesamt_Anfragen</em>: Vorgang Summe, Spalte <em>patients_request</em><br>
    — <em>Durchschnitt_Zufriedenheit</em>: Vorgang Durchschnitt, Spalte <em>patient_satisfaction</em></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze den Datentyp von <strong>Durchschnitt_Zufriedenheit</strong> auf <strong>Dezimalzahl</strong>. Runde auf zwei Stellen: <strong>Transformieren → Runden → Runden</strong>, Dezimalstellen: 2.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Füge eine benutzerdefinierte Spalte <strong>Aufnahmequote_Prozent</strong> hinzu: <code>Number.Round([Gesamt_Aufnahmen] / [Gesamt_Anfragen] * 100, 1)</code>. Welche Abteilung hat die niedrigste Aufnahmequote?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Warum haben wir für diese Aggregation einen <strong>Verweis</strong> auf ServicesWeekly erstellt statt die Originaltabelle zu verändern?</span>
  </div>
</div>

  <strong>d) Abteilung mit niedrigster Aufnahmequote und Wert:</strong>
  <br><br>
  <strong>e) Warum Verweis statt Original verändern:</strong>

  </div>
</div>

---

## Aufgabe 15 — Anfügen: Zwei Schichtpläne kombinieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">15</span>
    <span class="pbi-task-title">StaffSchedule nach Halbjahr aufteilen und wieder zusammenführen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Du willst zeigen wie Append funktioniert, indem du StaffSchedule in zwei Hälften teilst und sie dann wieder zusammenfügst. Gleichzeitig übst du das Filtern nach Zahlenbereichen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf <strong>StaffSchedule</strong> → <strong>Duplizieren</strong>. Benenne die Kopie in <strong>Schedule_H1</strong> um. Filtere die Spalte <strong>week</strong> auf Werte kleiner oder gleich 26: Rechtsklick auf Spaltenüberschrift → <strong>Zahlenfilter → Kleiner oder gleich</strong> → 26.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Dupliziere <strong>StaffSchedule</strong> erneut. Benenne diese Kopie in <strong>Schedule_H2</strong> um. Filtere auf Werte größer als 26: <strong>Zahlenfilter → Größer als</strong> → 26. Wie viele Zeilen hat Schedule_H1, wie viele Schedule_H2?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text"><strong>Start → Abfragen anfügen → Abfragen als neu anfügen</strong>. Wähle <strong>Schedule_H1</strong> und <strong>Schedule_H2</strong>. Benenne die neue Abfrage in <strong>Schedule_Gesamt</strong> um. Wie viele Zeilen hat das Ergebnis?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Prüfe die Spalten von Schedule_Gesamt: Sind alle Spalten aus beiden Quelltabellen vorhanden? Gibt es NULL-Werte in bestimmten Spalten? Erkläre warum oder warum nicht.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Deaktiviere das Laden für <strong>Schedule_H1</strong> und <strong>Schedule_H2</strong>: Rechtsklick auf die Abfrage → <strong>Laden aktivieren</strong> (Häkchen entfernen). Nur <strong>Schedule_Gesamt</strong> soll ins Modell geladen werden. Warum ist das sinnvoll?</span>
  </div>
</div>

  <strong>b) Zeilenanzahl H1 und H2:</strong>
  <br><br>
  <strong>c) Zeilenanzahl Schedule_Gesamt:</strong>
  <br><br>
  <strong>d) NULL-Werte vorhanden?</strong>
  <br><br>
  <strong>e) Warum Laden für Zwischenabfragen deaktivieren:</strong>

  </div>
</div>

---

## Aufgabe 16 — Innerer Join: Nur anwesende Mitarbeiter mit Stammdaten

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">16</span>
    <span class="pbi-task-title">Schichtplan mit Stammdaten verknüpfen — nur Anwesende</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Personalabteilung möchte eine Tabelle aller Schichten, bei denen ein Mitarbeiter tatsächlich anwesend war (present = true), angereichert mit den Stammdaten aus Staff. Fehlende oder unbekannte Mitarbeiter sollen nicht erscheinen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf <strong>StaffSchedule</strong> → <strong>Verweis</strong>. Benenne die neue Abfrage in <strong>Anwesenheit_Mit_Stammdaten</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Filtere in der Abfrage auf <strong>present</strong> = true (oder 1, je nach Datentyp). Wie viele Zeilen bleiben?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text"><strong>Start → Abfragen zusammenführen → Als neue Abfrage zusammenführen</strong>. Linke Tabelle: <strong>Anwesenheit_Mit_Stammdaten</strong>, Schlüssel: <strong>staff_id</strong>. Rechte Tabelle: <strong>Staff</strong>, Schlüssel: <strong>staff_id</strong>. Join-Typ: <strong>Innerer Join</strong>. Wie viele Zeilen hat das Ergebnis?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Expandiere die zusammengeführte Staff-Spalte. Wähle nur <strong>role</strong> und <strong>service</strong> aus Staff. Deaktiviere das Präfix-Kontrollkästchen. Benenne die neue Abfrage in <strong>Anwesenheit_Detail</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Du hast hier einen <strong>inneren Join</strong> gewählt. Was wäre passiert, wenn du stattdessen einen <strong>linken äußeren Join</strong> verwendet hättest — und wann wäre das die richtigere Wahl gewesen?</span>
  </div>
</div>

  <strong>b) Zeilenanzahl nach Filter auf present = true:</strong>
  <br><br>
  <strong>c) Zeilenanzahl nach innerem Join:</strong>
  <br><br>
  <strong>e) Unterschied innerer vs. linker äußerer Join in diesem Fall:</strong>

  </div>
</div>

---

## Aufgabe 17 — Vollständiger äußerer Join: Abteilungsabgleich

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">17</span>
    <span class="pbi-task-title">Patienten-Abteilungen gegen Wochen-Abteilungen abgleichen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Tabelle Patients und ServicesWeekly verwenden beide eine Spalte <em>service</em> mit Abteilungsbezeichnungen. Stimmen die Werte überein — oder gibt es in einer Tabelle Abteilungen, die in der anderen fehlen?
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Erstelle aus <strong>Patients</strong> einen <strong>Verweis</strong>. Benenne ihn <strong>Patients_Services_Distinct</strong>. Wähle nur die Spalte <strong>service</strong>: Rechtsklick auf service → <strong>Andere Spalten entfernen</strong>. Dann Rechtsklick auf service → <strong>Duplikate entfernen</strong>. Wie viele eindeutige Abteilungen gibt es?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle ebenso aus <strong>ServicesWeekly</strong> einen Verweis <strong>Services_Weekly_Distinct</strong>. Nur Spalte <strong>service</strong> behalten, Duplikate entfernen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text"><strong>Start → Abfragen zusammenführen → Als neue Abfrage</strong>. Linke Tabelle: <strong>Patients_Services_Distinct</strong>, rechte Tabelle: <strong>Services_Weekly_Distinct</strong>, Schlüssel jeweils <strong>service</strong>. Join-Typ: <strong>Vollständiger äußerer Join</strong>. Expandiere die rechte Spalte. Benenne die Abfrage <strong>Services_Abgleich</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Prüfe das Ergebnis: Gibt es Zeilen mit NULL auf einer Seite? Was würde das bedeuten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Wozu ist der vollständige äußere Join in der Praxis nützlich? Nenne ein Beispiel aus dem Krankenhauskontext.</span>
  </div>
</div>

  <strong>a) Eindeutige Abteilungen in Patients:</strong>
  <br><br>
  <strong>d) NULL-Werte vorhanden und Bedeutung:</strong>
  <br><br>
  <strong>e) Praxisbeispiel für vollständigen äußeren Join:</strong>

  </div>
</div>

---

## Aufgabe 18 — Verweis vs. Duplikat: Unterschied erleben

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">18</span>
    <span class="pbi-task-title">Änderung in der Quellabfrage — was passiert wo?</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf <strong>Patients</strong> → <strong>Verweis</strong>. Benenne ihn <strong>Patients_Verweis</strong>. Rechtsklick auf <strong>Patients</strong> → <strong>Duplizieren</strong>. Benenne die Kopie <strong>Patients_Duplikat</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Gehe zur Originalabfrage <strong>Patients</strong>. Filtere die Spalte <strong>service</strong> auf nur <em>ICU</em>: Klick auf den Filterpfeil → nur ICU anhaken. Wechsle zu <strong>Patients_Verweis</strong>: Wie viele Zeilen hat er jetzt? Wechsle zu <strong>Patients_Duplikat</strong>: Wie viele Zeilen hat er?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lösche den Filter in der Originalabfrage <strong>Patients</strong> wieder (Schritt aus den angewendeten Schritten entfernen). Prüfe erneut Patients_Verweis und Patients_Duplikat.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was hast du beobachtet? Erkläre den Unterschied zwischen Verweis und Duplikat in eigenen Worten — und nenne je einen konkreten Einsatzfall für jeden Typ.</span>
  </div>
</div>

  <strong>b) Zeilen in Patients_Verweis nach Filter:</strong>
  <br><br>
  <strong>b) Zeilen in Patients_Duplikat nach Filter:</strong>
  <br><br>
  <strong>d) Unterschied in eigenen Worten:</strong>

  </div>
</div>

---

## Aufgabe 19 — Entpivotieren: Wochendaten normalisieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">19</span>
    <span class="pbi-task-title">Breite Kennzahlentabelle in normalisierte Struktur umwandeln</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  ServicesWeekly hat mehrere numerische Kennzahlen nebeneinander in separaten Spalten: available_beds, patients_admitted, patients_refused usw. Für ein Liniendiagramm das alle Kennzahlen im Zeitverlauf zeigt, muss die Tabelle normalisiert werden — alle Kennzahlen in eine Spalte, der Kennzahlenname in eine zweite.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf <strong>ServicesWeekly</strong> → <strong>Verweis</strong>. Benenne ihn <strong>ServicesWeekly_Lang</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Markiere die Spalten <strong>week</strong>, <strong>month</strong>, <strong>service</strong> und <strong>event</strong> (Strg-Klick). Wähle <strong>Transformieren → Andere Spalten entpivotieren</strong>. Die vier markierten Spalten bleiben, alle anderen werden entpivotiert.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne <strong>Attribut</strong> in <strong>Kennzahl</strong> und <strong>Wert</strong> in <strong>Kennzahl_Wert</strong> um. Setze den Typ von Kennzahl_Wert auf <strong>Dezimalzahl</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wie viele Zeilen hat ServicesWeekly_Lang? Rechne nach: Ausgangszeilen × Anzahl entpivotierter Spalten = ?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Warum ist die normalisierte (lange) Struktur für Power BI-Visuals besser geeignet als die breite Struktur?</span>
  </div>
</div>

  <strong>d) Zeilenanzahl ServicesWeekly_Lang und Rechenweg:</strong>
  <br><br>
  <strong>e) Warum normalisierte Struktur besser:</strong>

  </div>
</div>

---

## Aufgabe 20 — Abschluss: Staging-Muster aufbauen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">20</span>
    <span class="pbi-task-title">Zwischenabfragen vom Laden ausschließen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Im Laufe dieser Übungen sind viele Abfragen entstanden — darunter Zwischenabfragen, Verweise und Duplikate die nur als Arbeitsschritt dienten. Im fertigen Modell sollen nur die Tabellen geladen werden, die wirklich im Bericht verwendet werden.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Liste alle Abfragen auf, die du bisher erstellt hast. Trenne sie in zwei Gruppen: <em>Soll geladen werden</em> und <em>Nur Zwischenabfrage</em>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Deaktiviere das Laden für alle Zwischenabfragen: Rechtsklick → <strong>Laden aktivieren</strong> deaktivieren. Zwischenabfragen erscheinen im linken Bereich kursiv.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke <strong>Schließen und übernehmen</strong>. Prüfe in der Feldliste von Power BI Desktop: Nur die aktivierten Tabellen sind sichtbar.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was ist der Unterschied zwischen einer Abfrage die nicht geladen wird und einer Abfrage die gelöscht wird? Wann würde man eine Abfrage lieber deaktivieren als löschen?</span>
  </div>
</div>

  <strong>a) Abfragen zum Laden und Zwischenabfragen:</strong>
  <br><br>
  <strong>d) Deaktivieren vs. Löschen:</strong>

  </div>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 8</strong> Vor- und Nachname extrahiert, Name_Voll zusammengesetzt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 9</strong> patient_id nach Trennzeichen extrahiert, Schritt rückgängig gemacht</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 10</strong> Altersgruppe als bedingte Spalte erstellt, M-Funktion identifiziert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 11</strong> Zufriedenheit_Label als bedingte Spalte erstellt, Verteilung geprüft</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 12</strong> ServiceWeekID als Indexspalte an erste Position</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 13</strong> Ausfüllen nach unten erprobt und wieder rückgängig gemacht</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 14</strong> AbteilungsSummary per Verweis und Gruppieren nach aggregiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 15</strong> Schedule in H1/H2 geteilt, per Append wieder zusammengeführt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 16</strong> Innerer Join Anwesenheit mit Staff, Stammdaten expandiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 17</strong> Vollständiger äußerer Join Abteilungsabgleich</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 18</strong> Verweis vs. Duplikat erlebt und erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 19</strong> ServicesWeekly_Lang durch Entpivotieren erstellt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 20</strong> Laden für Zwischenabfragen deaktiviert, Schließen und übernehmen</span>
  </div>
</div>
