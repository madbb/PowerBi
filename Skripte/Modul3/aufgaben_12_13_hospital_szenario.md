# Aufgaben: CALCULATE, HASONEVALUE und Zeitintelligenz

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skripte 12 + 13 · Aufgabenblatt (Hospital-Datenbank)</div>
  <div class="pbi-page-title">Krankenhausauslastung analysieren</div>
  <div class="pbi-page-sub">CALCULATE · VALUE · HASONEVALUE · TOTALYTD · SAMEPERIODLASTYEAR · DATESBETWEEN</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis und Vorbereitung</span>
  Verwende die vier CSV-Dateien der Hospital-Datenbank: <strong>patients.csv</strong>, <strong>staff.csv</strong>, <strong>staff_schedule.csv</strong> und <strong>services_weekly.csv</strong>. Importiere alle vier Tabellen als Import-Modell. Benenne sie in <strong>patients</strong>, <strong>staff</strong>, <strong>schedule</strong> und <strong>weekly</strong> um.
  <br><br>
  Lege folgende Beziehungen an:
  <ul>
    <li><code>staff[staff_id]</code> → <code>schedule[staff_id]</code> (1 : *)</li>
  </ul>
  Die Tabelle <strong>weekly</strong> ist eine Faktentabelle ohne direkte Beziehung zu den anderen Tabellen. Sie enthält aggregierte Wochendaten pro Abteilung.
  <br><br>
  Lege eine Datumstabelle an und verknüpfe sie mit <code>patients[arrival_date]</code>. Markiere sie als Datumstabelle.
  <br><br>
  Speichere die Datei als <code>uebung_hospital.pbix</code>.
</div>

---

## Szenario

<div class="pbi-szenario">

Du bist Datenanalyst in der Verwaltung eines Krankenhauses. Das Haus betreibt vier Abteilungen: <strong>emergency</strong>, <strong>general_medicine</strong>, <strong>surgery</strong> und <strong>ICU</strong>.

Die Verwaltungsleitung hat drei konkrete Fragen:

1. Wie viele Patienten wurden insgesamt aufgenommen — und wie viele mussten abgewiesen werden, weil keine Kapazität frei war?
2. Wie hat sich die Auslastung im Jahresverlauf entwickelt? Sehen wir Engpässe in bestimmten Monaten?
3. Hat der Streik des Pflegepersonals im Frühjahr die Mitarbeiterzufriedenheit messbar beeinflusst?

Du beantwortest diese Fragen mit DAX-Measures in Power BI Desktop.

</div>

---

## Aufgabe 1 — Basismaßzahlen anlegen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Aufnahmen und abgewiesene Patienten</span>
  </div>
  <div class="pbi-task-body">

Die Tabelle <strong>weekly</strong> enthält pro Woche und Abteilung die Spalten <code>patients_admitted</code> (aufgenommene Patienten) und <code>patients_refused</code> (abgewiesen, weil keine Kapazität frei war).

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Aufnahmen]</strong> an. Es soll die Gesamtzahl aufgenommener Patienten summieren.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Abgewiesen]</strong> an. Es soll die Gesamtzahl abgewiesener Patienten summieren.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Belegungsrate]</strong> an. Die Belegungsrate ist der Anteil aufgenommener Patienten an allen Anfragen. Verwende DIVIDE. Formatiere das Measure als Prozent.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Erstelle eine Tabelle mit <code>weekly[service]</code> in den Zeilen und den drei Measures. Prüfe: Welche Abteilung hat die niedrigste Belegungsrate? Was bedeutet das für das Krankenhaus?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 2 — CALCULATE mit festem Filter

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Aufnahmen in der Notaufnahme isolieren</span>
  </div>
  <div class="pbi-task-body">

Die Verwaltungsleitung möchte im Bericht immer auch den Emergency-Wert sehen — unabhängig davon, ob ein Abteilungsfilter aktiv ist.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Aufnahmen Emergency]</strong> an. Verwende CALCULATE mit einem festen Filter auf <code>weekly[service] = "emergency"</code>. Das Measure soll immer die Emergency-Aufnahmen zeigen, auch wenn die Tabelle auf eine andere Abteilung gefiltert ist.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge <strong>[Aufnahmen Emergency]</strong> zur Tabelle aus Aufgabe 1 hinzu. Prüfe: Zeigt das Measure für alle vier Abteilungszeilen denselben Wert? Erkläre warum.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze einen Datenschnitt auf <code>weekly[service]</code> und wähle "ICU" aus. Was zeigt <strong>[Aufnahmen]</strong>? Was zeigt <strong>[Aufnahmen Emergency]</strong>? Erkläre den Unterschied.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 3 — HASONEVALUE: Kontextabhängiges Measure

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Belegungsrate nur auf Abteilungsebene anzeigen</span>
  </div>
  <div class="pbi-task-body">

Die Belegungsrate ist nur auf Abteilungsebene sinnvoll. In der Gesamtzeile einer Tabelle oder in einem Kartenvisual ohne Abteilungsfilter soll sie nicht angezeigt werden.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Belegungsrate (gefiltert)]</strong> an. Es soll HASONEVALUE verwenden: Wenn genau eine Abteilung im Filterkontext steht, gibt es die Belegungsrate zurück. Sonst gibt es BLANK zurück.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle ein Kartenvisual mit <strong>[Belegungsrate (gefiltert)]</strong>. Was zeigt es ohne aktiven Abteilungsfilter? Setze dann den Datenschnitt auf "ICU". Was zeigt das Kartenvisual jetzt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erkläre in eigenen Worten: Wann gibt HASONEVALUE TRUE zurück? Nenne ein Beispiel aus dem Bericht wo das der Fall ist und eines wo es FALSE ist.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 4 — Streikwochen analysieren mit CALCULATE und VALUE

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Mitarbeiterstimmung in Streikwochen</span>
  </div>
  <div class="pbi-task-body">

Die Tabelle <strong>weekly</strong> enthält eine Spalte <code>event</code> mit den Werten "none", "flu", "donation" und "strike". Die Spalte <code>staff_morale</code> ist ein Wert zwischen 0 und 100.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Ø Moral]</strong> an. Es berechnet den Durchschnitt der Spalte <code>weekly[staff_morale]</code>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Ø Moral Streik]</strong> an. Verwende CALCULATE mit einem festen Filter auf <code>weekly[event] = "strike"</code>. Das Measure soll immer den Durchschnitt der Stimmung in Streikwochen zeigen, unabhängig vom aktiven Filter.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Stelle beide Measures in einem Kartenvisual dar. Der Gesamtdurchschnitt liegt bei ca. 73. Was zeigt <strong>[Ø Moral Streik]</strong>? Was schlussfolgert die Verwaltungsleitung daraus?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Differenz Moral]</strong> an: Gesamtdurchschnitt minus Streikdurchschnitt. Verwende VAR für beide Teilwerte. Erkläre was ein großer positiver Wert bedeutet.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 5 — Kumulierte Aufnahmen (YTD)

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Wie viele Patienten wurden bis Ende eines Monats aufgenommen?</span>
  </div>
  <div class="pbi-task-body">

Die Verwaltungsleitung möchte monatlich sehen, wie viele Patienten seit Jahresbeginn insgesamt aufgenommen wurden. Die Basis ist die Tabelle <strong>patients</strong> mit der Spalte <code>arrival_date</code>.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Patienten Aufnahmen]</strong> an: <code>COUNTROWS(patients)</code>. Dieses Measure zählt Patienten aus der patients-Tabelle anhand des Ankunftsdatums.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Patienten YTD]</strong> an mit TOTALYTD. Verwende die markierte Datumstabelle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erstelle ein Matrixvisual: Jahr in den Zeilen, Monat in den Spalten. Füge <strong>[Patienten Aufnahmen]</strong> und <strong>[Patienten YTD]</strong> hinzu. Prüfe: Steigt <strong>[Patienten YTD]</strong> monoton an? Kann der Wert in einem Monat sinken?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Welchen Wert zeigt <strong>[Patienten YTD]</strong> in der Dezember-Spalte? Was bedeutet dieser Wert?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 6 — Vorjahresvergleich

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Patientenaufnahmen im Vergleich zum Vorjahr</span>
  </div>
  <div class="pbi-task-body">

Die Verwaltungsleitung fragt: "Haben wir dieses Jahr mehr oder weniger Patienten aufgenommen als letztes Jahr?"

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Patienten Vorjahr]</strong> an mit SAMEPERIODLASTYEAR.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge <strong>[Patienten Vorjahr]</strong> zum Matrixvisual aus Aufgabe 5 hinzu. Was zeigt das Measure für das erste Jahr in der Datumstabelle? Ist das ein Fehler?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Patienten YoY %]</strong> an. Es soll die prozentuale Veränderung zum Vorjahr berechnen. Verwende DIVIDE und VAR. Formatiere das Measure als Prozent. Ein positiver Wert bedeutet mehr Patienten als im Vorjahr.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Schreibe in deine Notizen: Die Verwaltung sieht für einen bestimmten Monat im Dezember einen YoY-Anstieg von über 100%. Nenne eine plausible Erklärung aus dem Datensatz.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 7 — Sonderperiode mit DATESBETWEEN

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Patienten in Wochen mit besonderen Ereignissen</span>
  </div>
  <div class="pbi-task-body">

Die Tabelle <strong>weekly</strong> zeigt in der Spalte <code>event</code>, ob in einer Woche ein besonderes Ereignis stattfand. Grippe-Wellen ("flu") treten typischerweise in den Wintermonaten auf. Die Verwaltung möchte wissen, wie sich die Auslastung in diesen Wochen verhält.

Diese Aufgabe verwendet <strong>patients</strong> und die Datumstabelle, nicht weekly.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege das Measure <strong>[Patienten H2]</strong> an: Patientenaufnahmen im zweiten Halbjahr (Juli bis Dezember). Verwende CALCULATE mit DATESBETWEEN. Nutze die Datumstabelle als Referenz. Setze das Startdatum auf den 1. Juli des jeweils gefilterten Jahres und das Enddatum auf den 31. Dezember.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle ein Tabellenvisual mit Jahr, <strong>[Patienten Aufnahmen]</strong> und <strong>[Patienten H2]</strong>. Berechne in deinen Notizen: Wie hoch ist der Anteil der H2-Aufnahmen am Jahresgesamt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erkläre in einem Satz den Unterschied zwischen TOTALYTD und DATESBETWEEN. Wann nimmst du welches?</span>
  </div>
</div>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">In Aufgabe 2 überschreibt CALCULATE den aktiven Abteilungsfilter. In Aufgabe 3 reagiert das Measure auf den Filterkontext und gibt BLANK zurück. Was ist der konzeptuelle Unterschied zwischen diesen beiden Verhaltensweisen?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Die Belegungsrate der Notaufnahme liegt bei unter 20%. Was bedeutet das konkret: Werden 80% der Patienten abgewiesen? Welche Konsequenz hätte das für die Krankenhausplanung?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R3</span>
  <span class="pbi-reflect-text">Ein Kollege schlägt vor, das Measure [Patienten YTD] in einem Kartenvisual ohne Datumsslicer anzuzeigen. Warum ist das wenig aussagekräftig?</span>
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
Aufnahmen = SUM(weekly[patients_admitted])

Abgewiesen = SUM(weekly[patients_refused])

Belegungsrate =
DIVIDE(
    [Aufnahmen],
    [Aufnahmen] + [Abgewiesen]
)
```

Erwartete Ergebnisse pro Abteilung:

| Abteilung | Aufnahmen | Abgewiesen | Belegungsrate |
|---|---|---|---|
| emergency | 1.185 | 5.008 | 19,1% |
| general_medicine | 2.332 | 1.938 | 54,6% |
| surgery | 1.686 | 555 | 75,2% |
| ICU | 648 | 141 | 82,1% |

Die Notaufnahme hat mit 19,1% die niedrigste Belegungsrate. Das bedeutet: Von 100 Patienten die kommen, werden nur 19 aufgenommen. 81 werden abgewiesen. Das ist kein Qualitätsproblem, sondern ein Kapazitätsproblem -- die Nachfrage übersteigt die verfügbaren Betten systematisch.

---

### Aufgabe 2 — Musterlösung

```dax
Aufnahmen Emergency =
CALCULATE(
    [Aufnahmen],
    weekly[service] = "emergency"
)
```

In der Abteilungstabelle zeigt [Aufnahmen Emergency] in jeder Zeile denselben Wert: 1.185. CALCULATE überschreibt den Abteilungsfilter des Visuals durch den festen Filter `service = "emergency"`. Der Filterkontext des Visuals (z.B. "ICU") wird auf dieser Spalte ersetzt.

Wenn der Datenschnitt auf "ICU" steht: [Aufnahmen] zeigt 648 (nur ICU). [Aufnahmen Emergency] zeigt weiterhin 1.185, weil CALCULATE den Slicer-Filter auf `weekly[service]` überschreibt.

---

### Aufgabe 3 — Musterlösung

```dax
Belegungsrate (gefiltert) =
IF(
    HASONEVALUE(weekly[service]),
    [Belegungsrate],
    BLANK()
)
```

Ohne Abteilungsfilter (Kartenvisual, kein Slicer aktiv): BLANK -- mehrere Abteilungen stehen im Filterkontext, HASONEVALUE gibt FALSE zurück.

Mit Datenschnitt "ICU": 82,1% -- genau eine Abteilung ist gefiltert, HASONEVALUE gibt TRUE zurück.

HASONEVALUE gibt TRUE zurück wenn die angegebene Spalte im aktuellen Filterkontext auf genau einen Wert eingeschränkt ist. Das kann durch einen Datenschnitt, eine Tabellenzeile im Visual oder einen CALCULATE-Filter passieren.

---

### Aufgabe 4 — Musterlösung

```dax
Ø Moral = AVERAGE(weekly[staff_morale])

Ø Moral Streik =
CALCULATE(
    AVERAGE(weekly[staff_morale]),
    weekly[event] = "strike"
)

Differenz Moral =
VAR GesamtMoral = [Ø Moral]
VAR StreikMoral = [Ø Moral Streik]
RETURN
    GesamtMoral - StreikMoral
```

Erwartete Werte: Gesamtdurchschnitt ca. 73. Streikwochen ca. 54. Differenz ca. 19 Punkte.

Ein Wert von 19 bedeutet: In Streikwochen liegt die Stimmung 19 Punkte unter dem Jahresschnitt. Das ist ein deutlicher Einbruch. Die Verwaltungsleitung kann daraus schließen, dass Streiks die Arbeitsmoral erheblich belasten -- unabhängig von der Abteilung.

---

### Aufgabe 5 — Musterlösung

```dax
Patienten Aufnahmen = COUNTROWS(patients)

Patienten YTD =
TOTALYTD(
    [Patienten Aufnahmen],
    'Datum'[Date]
)
```

[Patienten YTD] steigt immer monoton an. Ein sinkender YTD-Wert wäre ein Datenfehler, da YTD eine kumulative Summe ist. Der Dezemberwert entspricht der Gesamtzahl aller Patientenaufnahmen des Jahres.

---

### Aufgabe 6 — Musterlösung

```dax
Patienten Vorjahr =
CALCULATE(
    [Patienten Aufnahmen],
    SAMEPERIODLASTYEAR('Datum'[Date])
)

Patienten YoY % =
VAR AktuellerWert = [Patienten Aufnahmen]
VAR VorjahrWert = [Patienten Vorjahr]
RETURN
    DIVIDE(
        AktuellerWert - VorjahrWert,
        VorjahrWert
    )
```

Für das erste Jahr in der Datumstabelle zeigt [Patienten Vorjahr] BLANK -- es gibt keine Vorjahresdaten. Das ist kein Fehler.

Der starke Dezember-Anstieg erklärt sich aus dem event-Feld in weekly: Im Dezember gibt es Grippe-Wochen ("flu") mit deutlich erhöhter Patientenanzahl. Außerdem zeigen die weekly-Daten für Monat 12 insgesamt 1.107 Aufnahmen gegenüber 340--508 in den Sommermonaten.

---

### Aufgabe 7 — Musterlösung

```dax
Patienten H2 =
CALCULATE(
    [Patienten Aufnahmen],
    DATESBETWEEN(
        'Datum'[Date],
        DATE(YEAR(MAX('Datum'[Date])), 7, 1),
        DATE(YEAR(MAX('Datum'[Date])), 12, 31)
    )
)
```

Der Unterschied: TOTALYTD summiert vom Jahresbeginn bis zum letzten Datum im Filterkontext -- der Bereich wächst mit jedem Monat. DATESBETWEEN definiert einen festen Bereich. Nimm TOTALYTD für Kumulation über das laufende Jahr. Nimm DATESBETWEEN wenn du einen fest definierten Zeitraum brauchst (z.B. immer das zweite Halbjahr, eine Kampagnenperiode, eine Sonderauswertung).

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Drei Basismaßzahlen (Aufnahmen, Abgewiesen, Belegungsrate) angelegt und verglichen</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> CALCULATE mit festem Filter auf Emergency -- Verhalten mit Datenschnitt erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> HASONEVALUE eingesetzt -- Measure gibt BLANK zurück wenn kein eindeutiger Kontext</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Streikwochen mit CALCULATE isoliert -- Differenz mit VAR berechnet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> TOTALYTD angelegt und im Matrixvisual geprüft</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> SAMEPERIODLASTYEAR und YoY-Wachstum berechnet -- BLANK für erstes Jahr erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> DATESBETWEEN für H2-Periode eingesetzt -- Unterschied zu TOTALYTD erklärt</span>
  </div>
</div>
