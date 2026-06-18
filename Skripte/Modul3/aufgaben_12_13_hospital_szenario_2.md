# Aufgaben: CALCULATE, REMOVEFILTERS und Zeitintelligenz (II)

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skripte 12 + 13 · Aufgabenblatt 2 (Hospital-Datenbank)</div>
  <div class="pbi-page-title">Personal und Patientenzufriedenheit auswerten</div>
  <div class="pbi-page-sub">REMOVEFILTERS · VALUE · ISINSCOPE · DATEADD · TOTALMTD · Anteilsberechnung</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Voraussetzung</span>
  Dieses Aufgabenblatt setzt das Modell aus Aufgabenblatt 1 voraus. Öffne <code>uebung_hospital.pbix</code>. Die Tabellen <strong>patients</strong>, <strong>staff</strong>, <strong>schedule</strong> und <strong>weekly</strong> sind geladen. Die Datumstabelle ist mit <code>patients[arrival_date]</code> verbunden und als Datumstabelle markiert. Die Measures [Aufnahmen], [Abgewiesen] und [Belegungsrate] aus Aufgabenblatt 1 sind vorhanden.
</div>

---

## Szenario

<div class="pbi-szenario">

Die Pflegedienstleitung hat das Dashboard aus Aufgabenblatt 1 gesehen und kommt mit neuen Fragen auf dich zu.

Sie interessiert sich nicht nur für die Bettenbelegung -- sie will wissen wie es dem Personal geht und wie zufrieden die Patienten mit den einzelnen Abteilungen sind. Konkret fragt sie:

1. Welchen Anteil hat jede Abteilung an den gesamten Patientenaufnahmen des Hauses?
2. Wie hat sich die Patientenzufriedenheit in den letzten Monaten entwickelt -- und gab es Ausreißer nach unten?
3. Wie hoch ist die Anwesenheitsrate des Pflegepersonals, und unterscheidet sie sich nach Rolle?

Du erweiterst das bestehende Modell um neue Measures und einen zweiten Berichtsbereich.

</div>

---

## Aufgabe 1 — Anteil einer Abteilung am Gesamthaus

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Prozentanteil mit REMOVEFILTERS berechnen</span>
  </div>
  <div class="pbi-task-body">

Die Pflegedienstleitung möchte in der Abteilungstabelle nicht nur die absoluten Aufnahmezahlen sehen, sondern auch den prozentualen Anteil jeder Abteilung an den gesamten Hausaufnahmen.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Aufnahmen Gesamt]</strong> an. Es soll die Gesamtaufnahmen des Hauses zurückgeben -- unabhängig davon welche Abteilung im Filterkontext steht. Verwende CALCULATE mit REMOVEFILTERS auf <code>weekly[service]</code>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Aufnahmen Anteil %]</strong> an. Es teilt [Aufnahmen] durch [Aufnahmen Gesamt]. Formatiere als Prozent.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erstelle eine Tabelle mit <code>weekly[service]</code>, [Aufnahmen], [Aufnahmen Gesamt] und [Aufnahmen Anteil %]. Prüfe: Was zeigt [Aufnahmen Gesamt] in jeder Zeile? Warum ist das so?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Was würde passieren wenn du statt REMOVEFILTERS(weekly[service]) einfach REMOVEFILTERS(weekly) schreibst? Wann wäre das ein Problem?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 2 — Anteil mit VALUE absichern

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Abteilungsname aus dem Filterkontext lesen</span>
  </div>
  <div class="pbi-task-body">

Das Measure [Aufnahmen Anteil %] soll in der Gesamtzeile der Tabelle nicht 100% anzeigen, sondern BLANK. Die Gesamtzeile hat keinen eindeutigen Abteilungsfilter -- der Anteil ergibt dort keinen Sinn.

Außerdem soll ein zweites Measure den Namen der aktuell gefilterten Abteilung als Text zurückgeben -- zum Einsatz in einer Kartenüberschrift.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Passe das Measure <strong>[Aufnahmen Anteil %]</strong> an: Wenn HASONEVALUE(weekly[service]) TRUE ist, berechne den Anteil. Sonst BLANK. Prüfe in der Tabelle: Was zeigt jetzt die Gesamtzeile?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Aktuelle Abteilung]</strong> an. Es soll den Namen der gefilterten Abteilung als Text zurückgeben. Verwende IF mit HASONEVALUE und VALUE(weekly[service]) für den positiven Fall. Wenn keine eindeutige Abteilung aktiv ist, soll "Alle Abteilungen" zurückgegeben werden.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Zeige [Aktuelle Abteilung] in einem Kartenvisual. Setze den Datenschnitt auf "surgery". Was zeigt die Karte? Deaktiviere den Datenschnitt. Was zeigt sie jetzt?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 3 — Patientenzufriedenheit analysieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Zufriedenheit im Zeitverlauf und nach Abteilung</span>
  </div>
  <div class="pbi-task-body">

Die Tabelle <strong>weekly</strong> enthält die Spalte <code>patient_satisfaction</code> (Wert 0-100). Die Pflegedienstleitung möchte wissen, in welchen Wochen die Zufriedenheit deutlich unter den Durchschnitt gefallen ist.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Ø Zufriedenheit]</strong> an: Durchschnitt von <code>weekly[patient_satisfaction]</code>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Ø Zufriedenheit Gesamt]</strong> an. Es soll den Gesamtdurchschnitt über alle Abteilungen und alle Wochen zurückgeben -- unabhängig vom aktiven Filter. Verwende CALCULATE mit REMOVEFILTERS(weekly).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Zufriedenheit Delta]</strong> an: [Ø Zufriedenheit] minus [Ø Zufriedenheit Gesamt]. Ein negativer Wert bedeutet: Diese Abteilung liegt unter dem Hausschnitt. Formatiere als Dezimalzahl mit einer Nachkommastelle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Erstelle eine Tabelle mit <code>weekly[service]</code>, [Ø Zufriedenheit], [Ø Zufriedenheit Gesamt] und [Zufriedenheit Delta]. Welche Abteilung liegt am weitesten unter dem Hausschnitt? Was zeigt [Ø Zufriedenheit Gesamt] in allen Zeilen?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 4 — Vormonatswert mit DATEADD

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Patientenaufnahmen im Vergleich zum Vormonat</span>
  </div>
  <div class="pbi-task-body">

Die Pflegedienstleitung fragt: "Hat sich die Aufnahmeanzahl gegenüber dem Vormonat verändert?" SAMEPERIODLASTYEAR hat in Aufgabenblatt 1 einen Jahresvergleich geliefert. Für den Monatsvergleich braucht es DATEADD.

Diese Aufgabe arbeitet mit der Tabelle <strong>patients</strong> und der Datumstabelle.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Patienten Vormonat]</strong> an. Verwende CALCULATE mit DATEADD und verschiebe den Datumsfilter um -1 Monat.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Patienten MoM %]</strong> an (Month over Month). Es berechnet die prozentuale Veränderung zum Vormonat. Verwende DIVIDE und VAR. Formatiere als Prozent.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erstelle ein Matrixvisual mit Monat in den Zeilen und den Measures [Patienten Aufnahmen], [Patienten Vormonat] und [Patienten MoM %]. Was zeigt Januar in der Spalte [Patienten Vormonat]? Ist das ein Fehler?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Erkläre in einem Satz: Was ist der Unterschied zwischen DATEADD und SAMEPERIODLASTYEAR? Wann nimmst du welche Funktion?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 5 — Monatskumulierung mit TOTALMTD

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Kumulierte Aufnahmen innerhalb eines Monats</span>
  </div>
  <div class="pbi-task-body">

Die Pflegedienstleitung möchte auf Tagesebene sehen, wie viele Patienten im laufenden Monat bisher aufgenommen wurden. Das ist nützlich wenn sie Kapazitäten für den Rest des Monats planen will.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Patienten MTD]</strong> an mit TOTALMTD. Verwende [Patienten Aufnahmen] und die Datumstabelle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle ein Tabellenvisual mit <code>Datum[Date]</code> und den Measures [Patienten Aufnahmen] und [Patienten MTD]. Filtere das Visual auf den Monat März. Prüfe: Steigt [Patienten MTD] täglich? Was passiert an Tagen ohne Aufnahmen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erkläre den Unterschied zwischen TOTALMTD und TOTALYTD anhand eines konkreten Datums: Was zeigt [Patienten MTD] am 15. März? Was zeigt [Patienten YTD] am selben Tag?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 6 — Personalanwesenheit aus der schedule-Tabelle

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Anwesenheitsrate nach Rolle und Abteilung</span>
  </div>
  <div class="pbi-task-body">

Die Tabelle <strong>schedule</strong> enthält pro Mitarbeiter und Woche das Feld <code>present</code> (1 = anwesend, 0 = abwesend). Die Pflegedienstleitung möchte wissen, wie hoch die Anwesenheitsrate nach Rolle und nach Abteilung ist.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Anwesenheitsrate]</strong> an. Es soll den Anteil anwesender Mitarbeiter an allen Einträgen berechnen: Summe von <code>schedule[present]</code> geteilt durch COUNTROWS(schedule). Formatiere als Prozent.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle eine Tabelle mit <code>schedule[role]</code> in den Zeilen und [Anwesenheitsrate]. Welche Rolle hat die niedrigste Anwesenheitsrate?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erstelle eine zweite Tabelle mit <code>schedule[service]</code> in den Zeilen und [Anwesenheitsrate]. Liegt eine Abteilung deutlich unter dem Hausschnitt von ca. 60%?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Anwesenheitsrate Ärzte]</strong> an. Es soll immer die Anwesenheitsrate nur der Ärzte zeigen -- unabhängig davon ob ein Rollenfilter aktiv ist. Verwende CALCULATE mit festem Filter auf <code>schedule[role] = "doctor"</code>.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 7 — Verweildauer als berechnete Spalte

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Liegezeit berechnen und Langlieger identifizieren</span>
  </div>
  <div class="pbi-task-body">

Die Tabelle <strong>patients</strong> enthält <code>arrival_date</code> und <code>departure_date</code>. Die Pflegedienstleitung möchte wissen, wie viele Patienten länger als 10 Tage im Haus waren -- das sind sogenannte Langlieger, die überproportional viele Pflegekapazitäten binden.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege in der Tabelle <strong>patients</strong> eine berechnete Spalte <strong>Verweildauer</strong> an. Sie soll die Anzahl Tage zwischen Ankunft und Entlassung berechnen. Verwende DATEDIFF mit "DAY" als Intervall.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Ø Verweildauer]</strong> an: Durchschnitt der berechneten Spalte. Formatiere als Dezimalzahl mit einer Nachkommastelle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Langlieger]</strong> an: Anzahl Patienten mit Verweildauer > 10 Tage. Verwende CALCULATE mit FILTER auf die patients-Tabelle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Erstelle eine Tabelle mit <code>patients[service]</code>, [Ø Verweildauer] und [Langlieger]. Welche Abteilung hat die meisten Langlieger? Welche hat die höchste durchschnittliche Verweildauer?</span>
  </div>
</div>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">In Aufgabe 1 verwendest du REMOVEFILTERS(weekly[service]) für den Nenner. Was würde passieren wenn du stattdessen ALL(weekly[service]) schreibst? Gibt es einen Unterschied?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">DATEADD verschiebt den gesamten Filterkontext um einen Zeitraum. SAMEPERIODLASTYEAR macht dasselbe -- aber nur um genau ein Jahr. Warum gibt es für den Jahresvergleich eine eigene Funktion, obwohl DATEADD mit -1 und "YEAR" dasselbe Ergebnis liefert?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R3</span>
  <span class="pbi-reflect-text">In Aufgabe 7 verwendest du FILTER innerhalb von CALCULATE. In Aufgabe 1 verwendest du einen booleschen Ausdruck direkt. Wann muss FILTER verwendet werden und wann reicht der boolesche Ausdruck?</span>
</div>

---

## Musterlösungen

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">Erst selbst versuchen</span>
  Lies die Musterlösungen erst nachdem du alle Aufgaben bearbeitet hast.
</div>

---

### Aufgabe 1 — Musterlösung

```dax
Aufnahmen Gesamt =
CALCULATE(
    [Aufnahmen],
    REMOVEFILTERS(weekly[service])
)

Aufnahmen Anteil % =
DIVIDE(
    [Aufnahmen],
    [Aufnahmen Gesamt]
)
```

Erwartete Ergebnisse:

| Abteilung | Aufnahmen | Aufnahmen Gesamt | Anteil |
|---|---|---|---|
| emergency | 1.185 | 5.851 | 20,3% |
| general_medicine | 2.332 | 5.851 | 39,9% |
| surgery | 1.686 | 5.851 | 28,8% |
| ICU | 648 | 5.851 | 11,1% |

[Aufnahmen Gesamt] zeigt in jeder Zeile denselben Wert: 5.851. REMOVEFILTERS entfernt den Abteilungsfilter -- das Measure sieht immer alle Abteilungen. Der Zähler [Aufnahmen] wird dagegen durch den Zeilenfilter des Visuals eingeschränkt.

Wenn statt REMOVEFILTERS(weekly[service]) der Ausdruck REMOVEFILTERS(weekly) verwendet wird, werden alle Filter auf der gesamten Tabelle entfernt -- also auch ein aktiver Wochenfilter oder Monatsfilter. Das kann zu falschen Ergebnissen führen wenn andere Datenschnitte aktiv sind. Präzise Angabe schützt vor unerwünschten Seiteneffekten.

---

### Aufgabe 2 — Musterlösung

```dax
Aufnahmen Anteil % =
IF(
    HASONEVALUE(weekly[service]),
    DIVIDE([Aufnahmen], [Aufnahmen Gesamt]),
    BLANK()
)

Aktuelle Abteilung =
IF(
    HASONEVALUE(weekly[service]),
    VALUE(weekly[service]),
    "Alle Abteilungen"
)
```

Mit Datenschnitt "surgery": Karte zeigt "surgery". Ohne Datenschnitt: Karte zeigt "Alle Abteilungen".

VALUE(weekly[service]) liest den aktuellen Wert der Spalte aus dem Filterkontext. Es gibt genau dann einen sinnvollen Rückgabewert wenn HASONEVALUE TRUE ist -- deshalb wird VALUE hier immer mit HASONEVALUE kombiniert. Ohne die Prüfung würde VALUE einen Fehler werfen wenn mehrere Abteilungen im Kontext stehen.

---

### Aufgabe 3 — Musterlösung

```dax
Ø Zufriedenheit = AVERAGE(weekly[patient_satisfaction])

Ø Zufriedenheit Gesamt =
CALCULATE(
    AVERAGE(weekly[patient_satisfaction]),
    REMOVEFILTERS(weekly)
)

Zufriedenheit Delta =
[Ø Zufriedenheit] - [Ø Zufriedenheit Gesamt]
```

Erwartete Ergebnisse:

| Abteilung | Ø Zufriedenheit | Ø Gesamt | Delta |
|---|---|---|---|
| emergency | 77,9 | 80,3 | -2,4 |
| general_medicine | 81,2 | 80,3 | +0,9 |
| surgery | 79,3 | 80,3 | -1,0 |
| ICU | 81,6 | 80,3 | +1,3 |

Die Notaufnahme liegt am weitesten unter dem Hausschnitt (-2,4 Punkte). [Ø Zufriedenheit Gesamt] zeigt in allen Zeilen denselben Wert: 80,3 -- weil REMOVEFILTERS(weekly) alle Filter auf der Tabelle entfernt.

---

### Aufgabe 4 — Musterlösung

```dax
Patienten Vormonat =
CALCULATE(
    [Patienten Aufnahmen],
    DATEADD('Datum'[Date], -1, MONTH)
)

Patienten MoM % =
VAR AktuellerWert = [Patienten Aufnahmen]
VAR VormonatWert = [Patienten Vormonat]
RETURN
    DIVIDE(
        AktuellerWert - VormonatWert,
        VormonatWert
    )
```

Erwartete Werte (Auswahl):

| Monat | Aufnahmen | Vormonat | MoM % |
|---|---|---|---|
| Jan | 85 | BLANK | BLANK |
| Feb | 80 | 85 | -5,9% |
| Sep | 94 | 88 | +6,8% |
| Dez | 74 | 83 | -10,8% |

Januar zeigt BLANK in [Patienten Vormonat] -- kein Dezember des Vorjahres in der Datumstabelle vorhanden. Das ist kein Fehler.

DATEADD verschiebt den gesamten Datumsfilterkontext um einen beliebigen Zeitraum (Tage, Monate, Quartale, Jahre). SAMEPERIODLASTYEAR ist eine Kurzform für DATEADD mit -1 Jahr -- sie ist besser lesbar und macht die Absicht klarer. Für alle anderen Zeitverschiebungen braucht man DATEADD.

---

### Aufgabe 5 — Musterlösung

```dax
Patienten MTD =
TOTALMTD(
    [Patienten Aufnahmen],
    'Datum'[Date]
)
```

Am 15. März zeigt [Patienten MTD] die Summe aller Aufnahmen vom 1. bis 15. März. [Patienten YTD] zeigt am selben Tag die Summe vom 1. Januar bis 15. März. MTD beginnt mit jedem Monatsersten neu -- YTD beginnt immer am 1. Januar.

An Tagen ohne Aufnahmen bleibt [Patienten MTD] auf dem Wert des letzten Tages mit Aufnahmen stehen. Der kumulative Wert sinkt nie.

---

### Aufgabe 6 — Musterlösung

```dax
Anwesenheitsrate =
DIVIDE(
    SUM(schedule[present]),
    COUNTROWS(schedule)
)

Anwesenheitsrate Ärzte =
CALCULATE(
    [Anwesenheitsrate],
    schedule[role] = "doctor"
)
```

Erwartete Ergebnisse nach Rolle:

| Rolle | Anwesenheitsrate |
|---|---|
| doctor | 59,2% |
| nurse | 60,1% |
| nursing_assistant | 60,2% |

Erwartete Ergebnisse nach Service:

| Abteilung | Anwesenheitsrate |
|---|---|
| emergency | 60,4% |
| general_medicine | 59,0% |
| ICU | 60,1% |
| surgery | 60,2% |

Keine Abteilung weicht deutlich vom Hausschnitt (60,0%) ab. Die Unterschiede sind marginal. [Anwesenheitsrate Ärzte] zeigt in jeder Zeile 59,2% -- unabhängig vom aktiven Service- oder Rollenfilter.

---

### Aufgabe 7 — Musterlösung

```dax
-- Berechnete Spalte in patients:
Verweildauer = DATEDIFF(patients[arrival_date], patients[departure_date], DAY)

-- Measures:
Ø Verweildauer = AVERAGE(patients[Verweildauer])

Langlieger =
CALCULATE(
    COUNTROWS(patients),
    FILTER(
        patients,
        patients[Verweildauer] > 10
    )
)
```

Erwartete Ergebnisse:

| Abteilung | Ø Verweildauer | Langlieger |
|---|---|---|
| emergency | 7,2 Tage | 59 |
| general_medicine | 7,0 Tage | 59 |
| surgery | 7,9 Tage | 74 |
| ICU | 7,6 Tage | 70 |

Surgery hat die meisten Langlieger (74) und die höchste durchschnittliche Verweildauer (7,9 Tage). Das ist aus medizinischer Sicht plausibel: operative Eingriffe erfordern längere Nachbeobachtung.

FILTER ist hier notwendig weil die Bedingung (Verweildauer > 10) einen Zeilenwert aus der Tabelle prüft -- das ist kein einfacher Spaltenvergleich wie `service = "surgery"`, sondern eine berechnete Bedingung. Boolesche Direktfilter in CALCULATE dürfen keine Spaltenberechnungen enthalten, nur einfache Gleichheitsvergleiche auf echten Spaltenwerten.

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> REMOVEFILTERS für Anteilsberechnung eingesetzt -- Unterschied zu REMOVEFILTERS(Tabelle) erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> VALUE und HASONEVALUE kombiniert -- Abteilungsname kontextabhängig ausgegeben</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Zufriedenheitsdelta mit REMOVEFILTERS(weekly) berechnet -- Hausschnitt als Referenz</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> DATEADD für Vormonatsvergleich eingesetzt -- Unterschied zu SAMEPERIODLASTYEAR erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> TOTALMTD angelegt -- Unterschied zu TOTALYTD an konkretem Datum erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Anwesenheitsrate aus schedule berechnet -- nach Rolle und Abteilung verglichen</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> DATEDIFF als berechnete Spalte -- Langlieger mit CALCULATE und FILTER gezählt</span>
  </div>
</div>
