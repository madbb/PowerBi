# Aufgaben: Filterkontext & CALCULATE

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 12 · Aufgabenblatt</div>
  <div class="pbi-page-title">Filterkontext & CALCULATE</div>
  <div class="pbi-page-sub">Filterkontext · CALCULATE · REMOVEFILTERS · KEEPFILTERS · Kontextübergang · CALCULATETABLE</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis</span>
  Öffne <code>uebung_11.pbix</code> aus Skript 11 — sales und customers verbunden, Datumstabelle vorhanden, Measures [Umsatz] und [Anzahl Transaktionen] angelegt. Speichere am Ende als <code>uebung_12.pbix</code>.
</div>

---

## Aufgabe 1 — Filterkontext beobachten

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Wie der Filterkontext entsteht</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Bevor wir CALCULATE verwenden, beobachten wir wie der Filterkontext entsteht und was er bewirkt. Dafür bauen wir zwei Visuals und vergleichen ihr Verhalten.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein Kartenvisual mit [Umsatz] an. Dann lege eine Tabelle mit <code>sales[category]</code> und [Umsatz] an. Was fällt am Kartenvisual im Vergleich zur Tabelle auf? Warum zeigt die Tabelle acht verschiedene Werte, das Kartenvisual aber nur einen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge einen Datenschnitt mit <code>customers[gender]</code> hinzu. Wähle "Female". Was passiert mit dem Kartenvisual? Was passiert mit der Tabelle? Erkläre: Woher weiß Power BI, dass <code>customers[gender]</code> die Tabelle <code>sales</code> filtert — obwohl der Datenschnitt auf <code>customers</code> liegt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Nenne für die aktive Konfiguration (Tabelle nach Kategorie, Slicer Female, Zeile "Clothing") alle Filter die zum Zeitpunkt der Berechnung aktiv sind. Wie viele Filter sind es insgesamt?</span>
  </div>
</div>

  <strong>a) Unterschied Kartenvisual vs. Tabelle:</strong>
  <br><br>
  <strong>b) Warum customers den sales-Umsatz filtert:</strong>
  <br><br>
  <strong>c) Alle aktiven Filter für Zeile "Clothing" mit Female-Slicer:</strong>

  </div>
</div>

---

## Aufgabe 2 — CALCULATE mit einfachem Filter

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Umsatz eines bestimmten Zahlungswegs fixieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Das Management möchte in jeder Kategorie-Zeile immer auch den Kreditkartenumsatz sehen — unabhängig davon welche Zahlungsmethode gerade per Datenschnitt ausgewählt ist.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege folgendes Measure an:<br><br>
    <code>Umsatz Kreditkarte = CALCULATE([Umsatz], customers[payment_method] = "Credit Card")</code><br><br>
    Lege eine Tabelle mit <code>sales[category]</code>, [Umsatz] und [Umsatz Kreditkarte] an. Notiere den Wert für "Clothing".</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge einen Datenschnitt mit <code>customers[payment_method]</code> hinzu. Wähle "Cash". Was passiert mit [Umsatz]? Was passiert mit [Umsatz Kreditkarte]? Erkläre das Verhalten.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Warum zeigt [Umsatz Kreditkarte] in der Zeile "Technology" denselben Wert wie in jeder anderen Zeile wenn kein Kategoriefilter aktiv ist — aber unterschiedliche Werte wenn die Tabelle nach Kategorie gruppiert? Welcher Filter bleibt aktiv, welcher wird überschrieben?</span>
  </div>
</div>

  <strong>a) Wert Umsatz Kreditkarte für Clothing:</strong>
  <br><br>
  <strong>b) Verhalten bei Slicer "Cash":</strong>
  <br><br>
  <strong>c) Welcher Filter überschrieben wird und welcher bleibt:</strong>

  </div>
</div>

---

## Aufgabe 3 — Mehrere Filter kombinieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Umsatz nach zwei Bedingungen gleichzeitig</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Wie viel Umsatz generieren weibliche Kunden die mit Kreditkarte zahlen? Diese Kombination soll als eigenes Measure vorliegen das vom Filterkontext des Visuals unabhängig ist.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege folgendes Measure an:<br><br>
    <code>Umsatz Female Kreditkarte =
CALCULATE(
    [Umsatz],
    customers[gender] = "Female",
    customers[payment_method] = "Credit Card"
)</code><br><br>
    Zeige es in einem Kartenvisual. Notiere den Wert.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Setze einen Datenschnitt auf <code>customers[gender]</code> = "Male". Ändert sich der Wert des Measures? Erkläre warum oder warum nicht.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Beide Filter in CALCULATE zeigen auf dieselbe Tabelle <code>customers</code>. Werden sie mit AND oder OR verknüpft? Was würde das Measure liefern wenn es OR wäre?</span>
  </div>
</div>

  <strong>a) Wert des Measures im Kartenvisual:</strong>
  <br><br>
  <strong>b) Änderung bei Male-Slicer:</strong>
  <br><br>
  <strong>c) AND vs. OR und Konsequenz:</strong>

  </div>
</div>

---

## Aufgabe 4 — REMOVEFILTERS: Anteil am Gesamtumsatz

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Prozentualen Kategorienanteil berechnen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Clothing macht allein 45,3% des Gesamtumsatzes aus. Diesen Anteil wollen wir für jede Kategorie als eigene Spalte in einer Tabelle sehen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Versuche zuerst die falsche Variante — lege an:<br><br>
    <code>Anteil Falsch = DIVIDE([Umsatz], [Umsatz])</code><br><br>
    Was zeigt die Tabelle in jeder Zeile? Erkläre warum.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege das korrekte Measure an:<br><br>
    <code>Umsatz % Gesamt =
DIVIDE(
    [Umsatz],
    CALCULATE([Umsatz], REMOVEFILTERS(sales[category]))
)</code><br><br>
    Zeige es in einer Tabelle mit <code>sales[category]</code> und [Umsatz]. Prüfe: Clothing sollte 45,3% zeigen. Stimmt das Ergebnis?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze einen Datenschnitt auf <code>customers[gender]</code> = "Female". Ändert sich [Umsatz % Gesamt]? Was zeigt Clothing jetzt — und warum ist das korrekt? Welcher Filter wurde entfernt, welcher blieb aktiv?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Was zeigt die Gesamtzeile der Tabelle? Erkläre warum sie 100% anzeigt.</span>
  </div>
</div>

  <strong>a) Ergebnis Anteil Falsch und Erklärung:</strong>
  <br><br>
  <strong>b) Clothing-Anteil im Ergebnis:</strong>
  <br><br>
  <strong>c) Verhalten bei Female-Slicer:</strong>
  <br><br>
  <strong>d) Erklärung Gesamtzeile 100%:</strong>

  </div>
</div>

---

## Aufgabe 5 — REMOVEFILTERS gezielt einsetzen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Anteil am Mall-Umsatz innerhalb einer Kategorie</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Wir wollen wissen wie viel Prozent des Umsatzes jedes Malls auf Clothing entfällt. Der Nenner soll den Mallfilter entfernen, aber den Kategoriefilter beibehalten.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege folgendes Measure an:<br><br>
    <code>Umsatz % Mall in Kategorie =
DIVIDE(
    [Umsatz],
    CALCULATE([Umsatz], REMOVEFILTERS(sales[shopping_mall]))
)</code><br><br>
    Lege eine Tabelle mit <code>sales[category]</code>, <code>sales[shopping_mall]</code> und dem Measure an. Was zeigt die Spalte für Clothing / Mall of Istanbul?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Was ist der Unterschied zu Aufgabe 4b wo <code>REMOVEFILTERS(sales[category])</code> verwendet wurde? Erkläre welcher Filter in diesem Measure entfernt wird und welcher aktiv bleibt.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Würde <code>REMOVEFILTERS(sales)</code> hier dasselbe Ergebnis liefern wie <code>REMOVEFILTERS(sales[shopping_mall])</code>? Erkläre den Unterschied.</span>
  </div>
</div>

  <strong>a) Wert für Clothing / Mall of Istanbul:</strong>
  <br><br>
  <strong>b) Unterschied zu Aufgabe 4b:</strong>
  <br><br>
  <strong>c) Unterschied REMOVEFILTERS(sales) vs. REMOVEFILTERS(sales[shopping_mall]):</strong>

  </div>
</div>

---

## Aufgabe 6 — KEEPFILTERS

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Kategorie hervorheben ohne andere Zeilen zu überschreiben</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Wir wollen in einer Tabelle nach Kategorie eine Spalte, die nur für "Clothing" einen Umsatz zeigt und für alle anderen Kategorien leer bleibt. CALCULATE allein überschreibt den Kategoriefilter — KEEPFILTERS verhindert das.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege zuerst dieses Measure an und beobachte das Ergebnis in einer Tabelle nach <code>sales[category]</code>:<br><br>
    <code>Umsatz Clothing Fix = CALCULATE([Umsatz], sales[category] = "Clothing")</code><br><br>
    Was steht in jeder Zeile? Erkläre das Verhalten.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege jetzt dieses Measure an:<br><br>
    <code>Umsatz Clothing Keep = CALCULATE([Umsatz], KEEPFILTERS(sales[category] = "Clothing"))</code><br><br>
    Füge es zur Tabelle hinzu. Was zeigt diese Spalte jetzt? Welche Zeile hat einen Wert, welche sind leer?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Erkläre in eigenen Worten: Was ist der Unterschied zwischen CALCULATE ohne und mit KEEPFILTERS wenn der Filter eine Spalte betrifft, die bereits im Filterkontext vorhanden ist?</span>
  </div>
</div>

  <strong>a) Ergebnis Umsatz Clothing Fix und Erklärung:</strong>
  <br><br>
  <strong>b) Ergebnis Umsatz Clothing Keep:</strong>
  <br><br>
  <strong>c) Unterschied mit und ohne KEEPFILTERS:</strong>

  </div>
</div>

---

## Aufgabe 7 — Kontextübergang in berechneter Spalte

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Kundenwert pro Zeile berechnen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Wir wollen jeden Kunden nach seinem Gesamtumsatz einteilen: Kunden mit mehr als 3.000 Euro Umsatz gelten als "Stammkunde", alle anderen als "Gelegenheitskunde". Dafür brauchen wir eine berechnete Spalte in customers.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege zuerst diese berechnete Spalte in <strong>customers</strong> an und wechsle in die Datensicht:<br><br>
    <code>Segment Falsch = IF(SUMX(sales, sales[price] * sales[quantity]) >= 3000, "Stammkunde", "Gelegenheitskunde")</code><br><br>
    Was steht in jeder Zeile? Warum ist das Ergebnis falsch?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege die korrigierte Spalte an:<br><br>
    <code>Kundensegment = IF(CALCULATE(SUMX(sales, sales[price] * sales[quantity])) >= 3000, "Stammkunde", "Gelegenheitskunde")</code><br><br>
    Was hat sich durch CALCULATE geändert? Welche Zeilen zeigen jetzt "Stammkunde"?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege ein Tabellenvisual mit <code>customers[Kundensegment]</code> und <code>COUNTROWS</code>-Measure an. Wie viele Stammkunden und wie viele Gelegenheitskunden gibt es?</span>
  </div>
</div>

  <strong>a) Ergebnis Segment Falsch und Erklärung:</strong>
  <br><br>
  <strong>b) Was CALCULATE ändert:</strong>
  <br><br>
  <strong>c) Anzahl Stammkunden und Gelegenheitskunden:</strong>

  </div>
</div>

---

## Aufgabe 8 — CALCULATETABLE

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">8</span>
    <span class="pbi-task-title">Gefilterte Tabelle als berechnete Tabelle anlegen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue berechnete Tabelle an:<br><br>
    <code>Top Kategorien =
CALCULATETABLE(
    sales,
    sales[category] IN {"Clothing", "Shoes", "Technology"}
)</code><br><br>
    Wie viele Zeilen hat die Tabelle? Prüfe es in der Datensicht.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wechsle in die Modellansicht. Hat "Top Kategorien" automatisch Beziehungen zu anderen Tabellen? Was bedeutet das für ihre Verwendung im Bericht?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Nenne einen konkreten Nachteil dieser Lösung gegenüber einem CALCULATE-Filter im Measure. Wann wäre CALCULATETABLE trotzdem sinnvoll?</span>
  </div>
</div>

  <strong>a) Anzahl Zeilen in Top Kategorien:</strong>
  <br><br>
  <strong>b) Beziehungen in der Modellansicht:</strong>
  <br><br>
  <strong>c) Nachteil und sinnvoller Einsatz:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Ein Kollege schreibt: <code>Anteil = DIVIDE([Umsatz], [Umsatz])</code> und behauptet das sei der prozentuale Anteil am Gesamtumsatz. Was ist daran falsch? Schreibe die korrekte Formel und erkläre was REMOVEFILTERS bewirkt.</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Eine berechnete Spalte in customers soll den Gesamtumsatz jedes Kunden speichern. Ein Kollege schreibt <code>KundenUmsatz = SUM(sales[price])</code> und wundert sich warum alle Kunden denselben Wert haben. Erkläre das Problem und die korrekte Lösung.</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Filterkontext beobachtet, direkten und indirekten Filter unterschieden</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> CALCULATE mit Zahlungsmethoden-Filter angelegt, Überschreibe-Verhalten erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Zwei Filter kombiniert, AND-Verknüpfung verstanden</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> REMOVEFILTERS für Gesamtanteil verwendet, Verhalten mit Slicer beobachtet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Gezieltes REMOVEFILTERS auf einzelne Spalte angewendet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> KEEPFILTERS vs. normalen CALCULATE-Filter verglichen</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Kontextübergang mit CALCULATE in berechneter Spalte angewendet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 8</strong> CALCULATETABLE angelegt, Einschränkungen erkannt</span>
  </div>
</div>
