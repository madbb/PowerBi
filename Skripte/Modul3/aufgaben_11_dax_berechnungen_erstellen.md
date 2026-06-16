# Aufgaben: DAX-Berechnungen erstellen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 11 · Aufgabenblatt</div>
  <div class="pbi-page-title">DAX-Berechnungen erstellen</div>
  <div class="pbi-page-sub">Datumstabelle · Berechnete Spalten · RELATED · Implizite Measures absichern · Verbundmeasures · Iteratorfunktionen</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis</span>
  Öffne <code>uebung_10.pbix</code> aus Skript 10 — sales und customers verbunden, Transformationen abgeschlossen. Speichere am Ende als <code>uebung_11.pbix</code>.
</div>

---

## Aufgabe 1 — Datumstabelle erstellen und einbinden

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Datumstabelle per DAX anlegen und markieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue berechnete Tabelle an: <code>Datum = CALENDARAUTO()</code>. Wechsle in die Datensicht und öffne die Tabelle. Welchen Zeitraum deckt sie ab? Stimmt das mit den Bestelldaten in sales überein?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Markiere die Tabelle als Datumstabelle: Tabellentools → Als Datumstabelle markieren. Wähle die Spalte <code>Date</code>. Power BI prüft drei Bedingungen — nenne alle drei.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege in der Modellansicht die Beziehung an: Datum[Date] → sales[invoice_date] (1:*). Prüfe Kardinalität und Filterrichtung in den Beziehungseigenschaften.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Deaktiviere Auto Datum/Uhrzeit für die aktuelle Datei (Datei → Optionen → Aktuelle Datei → Daten laden). Warum ist das wichtig jetzt wo wir eine eigene Datumstabelle haben?</span>
  </div>
</div>

  <strong>a) Zeitraum der Datumstabelle:</strong>
  <br><br>
  <strong>b) Drei Prüfbedingungen bei Markierung:</strong>
  <br><br>
  <strong>c) Kardinalität und Filterrichtung der Beziehung:</strong>
  <br><br>
  <strong>d) Begründung für Deaktivierung Auto Datum/Uhrzeit:</strong>

  </div>
</div>

---

## Aufgabe 2 — Datumstabelle mit berechneten Spalten erweitern

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Jahr, Monat, Quartal als berechnete Spalten anlegen</span>
  </div>
  <div class="pbi-task-body">

Lege folgende berechnete Spalten in der Tabelle <strong>Datum</strong> an:

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Jahr: <code>Jahr = YEAR('Datum'[Date])</code><br>
    MonatNr: <code>MonatNr = MONTH('Datum'[Date])</code><br>
    Monat: <code>Monat = FORMAT('Datum'[Date], "MMM")</code><br><br>
    Setze anschließend die Sortierung der Spalte "Monat" auf "MonatNr". Warum ist das notwendig?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Quartal: <code>Quartal = "Q" & ROUNDUP(MONTH('Datum'[Date]) / 3, 0)</code><br><br>
    Erkläre was ROUNDUP hier macht. Welches Ergebnis gibt die Formel für Monat 7 (Juli)?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erstelle eine Hierarchie in der Datumstabelle: Jahr → Quartal → Monat. Benenne sie "Zeitachse". Wo erscheint die Hierarchie im Datenbereich?</span>
  </div>
</div>

  <strong>a) Warum Monat nach MonatNr sortieren:</strong>
  <br><br>
  <strong>b) Erklärung ROUNDUP und Ergebnis für Juli:</strong>
  <br><br>
  <strong>c) Position der Hierarchie im Datenbereich:</strong>

  </div>
</div>

---

## Aufgabe 3 — RELATED in sales verwenden

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Kundendaten per RELATED in sales einbinden</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine berechnete Spalte in <strong>sales</strong> an: <code>Zahlungsmethode = RELATED(customers[payment_method])</code>. Was erscheint in der neuen Spalte? Wofür ist das nützlich?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege eine weitere berechnete Spalte an: <code>Altersgruppe = RELATED(customers[Altersgruppe])</code> (Altersgruppe wurde in Skript 10 Aufgabe 5c angelegt). Funktioniert das? Warum kann RELATED auf berechnete Spalten in der Dimensionstabelle zugreifen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Warum funktioniert RELATED von sales nach customers, aber nicht umgekehrt von customers nach sales? Was müsste man stattdessen verwenden wenn man von customers aus auf sales zugreifen will?</span>
  </div>
</div>

  <strong>a) Inhalt der neuen Spalte und Nutzen:</strong>
  <br><br>
  <strong>b) Funktioniert der Zugriff auf berechnete Spalten und warum:</strong>
  <br><br>
  <strong>c) Richtung von RELATED und Alternative:</strong>

  </div>
</div>

---

## Aufgabe 4 — Implizite Measures absichern

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Gefährliche Aggregationen erkennen und ersetzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Ziehe die Spalte <code>sales[price]</code> in ein Kartenvisual. Ändere die Aggregation auf "Mittelwert". Dann auf "Anzahl". Was zeigt Power BI jeweils? Warum ist das ein Problem wenn andere Berichtsautoren mit dem Modell arbeiten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Blende die Spalten <code>price</code> und <code>quantity</code> in sales aus (Rechtsklick → Ausblenden). Lege stattdessen folgende explizite Measures an:<br><br>
    <code>Umsatz = SUMX(sales, sales[price] * sales[quantity])</code><br>
    <code>Anzahl Transaktionen = COUNTROWS(sales)</code><br><br>
    Formatiere Umsatz als Währung (2 Dezimalstellen).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Kann ein Berichtsautor jetzt noch die Aggregation von [Umsatz] auf "Mittelwert" ändern? Teste es im Visual. Was ist der Unterschied zum Verhalten der Originalspalte?</span>
  </div>
</div>

  <strong>a) Drei verschiedene Aggregationsergebnisse und Problem:</strong>
  <br><br>
  <strong>b) Measures angelegt und formatiert:</strong>
  <br><br>
  <strong>c) Unterschied Measure vs. Spalte bei Aggregationsänderung:</strong>

  </div>
</div>

---

## Aufgabe 5 — Verbundmeasures aufbauen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Measures auf Basis anderer Measures erstellen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege folgende Measures an — in dieser Reihenfolge:<br><br>
    <code>Anzahl Kunden = DISTINCTCOUNT(sales[customer_id])</code><br>
    <code>Ø Umsatz pro Kunde = DIVIDE([Umsatz], [Anzahl Kunden])</code><br>
    <code>Ø Umsatz pro Transaktion = DIVIDE([Umsatz], [Anzahl Transaktionen])</code><br><br>
    Zeige alle drei in Kartenvisuals. Welcher Wert ist höher — Ø pro Kunde oder Ø pro Transaktion? Warum?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Was passiert mit [Ø Umsatz pro Kunde] wenn du [Umsatz] löschst? Teste es — und mache es danach rückgängig. Was bedeutet das für die Pflege von Verbundmeasures?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege ein Tabellenvisual an mit sales[category] als Zeilen und allen drei Measures. Welche Kategorie hat den höchsten Ø Umsatz pro Transaktion?</span>
  </div>
</div>

  <strong>a) Welcher Durchschnitt ist höher und warum:</strong>
  <br><br>
  <strong>b) Was passiert beim Löschen von [Umsatz]:</strong>
  <br><br>
  <strong>c) Kategorie mit höchstem Ø Umsatz pro Transaktion:</strong>

  </div>
</div>

---

## Aufgabe 6 — Iteratorfunktionen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">SUMX, AVERAGEX und RANKX einsetzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Measure an das den Umsatz pro Besuch in einem Mall berechnet — also nicht den Gesamtumsatz eines Malls, sondern den Durchschnitt der Einzeltransaktionen:<br><br>
    <code>Ø Transaktionswert pro Mall =
AVERAGEX(
    VALUES(sales[shopping_mall]),
    [Umsatz]
)</code><br><br>
    Erkläre was VALUES(sales[shopping_mall]) hier macht.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege ein Ranking-Measure für Kategorien an:<br><br>
    <code>Kategorie Rang =
IF(
    HASONEVALUE(sales[category]),
    RANKX(
        ALL(sales[category]),
        [Umsatz],
        ,
        ,
        DENSE
    )
)</code><br><br>
    Lege ein Tabellenvisual mit sales[category], [Umsatz] und [Kategorie Rang] an. Sortiere nach Rang. Welche Kategorie ist Rang 1?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Entferne HASONEVALUE aus dem Measure — also nur <code>RANKX(ALL(sales[category]), [Umsatz], , , DENSE)</code>. Was erscheint jetzt in der Gesamtzeile der Tabelle? Warum ist das irreführend?</span>
  </div>
</div>

  <strong>a) Was VALUES(sales[shopping_mall]) macht:</strong>
  <br><br>
  <strong>b) Kategorie Rang 1:</strong>
  <br><br>
  <strong>c) Wert in Gesamtzeile ohne HASONEVALUE und warum irreführend:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Du willst den Umsatz pro Kunde berechnen. Kollege A schreibt <code>DIVIDE([Umsatz], [Anzahl Kunden])</code>, Kollege B schreibt <code>AVERAGEX(customers, [Umsatz])</code>. Sind beide Formeln identisch? Wann könnten sie unterschiedliche Ergebnisse liefern?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Ein Berichtsautor beschwert sich: "Das Modell zeigt für Kategorie 'Technology' einen komisch hohen Umsatz." Du schaust hin und siehst dass jemand die ausgeblendete Spalte <code>price</code> direkt im Visual verwendet hat statt des Measures [Umsatz]. Was ist das Problem und wie verhinderst du das dauerhaft?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Datumstabelle per CALENDARAUTO angelegt, markiert, verbunden, Auto Datum/Uhrzeit deaktiviert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Jahr, MonatNr, Monat, Quartal angelegt, Sortierung gesetzt, Hierarchie erstellt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> RELATED für Zahlungsmethode und Altersgruppe verwendet, Richtung von RELATED erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> price und quantity ausgeblendet, Umsatz per SUMX korrekt berechnet, Measure formatiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Drei Verbundmeasures aufgebaut, Abhängigkeit getestet, Kategorienvergleich durchgeführt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> AVERAGEX mit VALUES, RANKX mit HASONEVALUE, Effekt ohne HASONEVALUE beobachtet</span>
  </div>
</div>
