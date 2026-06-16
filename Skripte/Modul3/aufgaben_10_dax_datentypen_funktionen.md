# Aufgaben: DAX Datentypen, Funktionen und Operatoren

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 10 · Aufgabenblatt</div>
  <div class="pbi-page-title">DAX Datentypen, Funktionen und Operatoren</div>
  <div class="pbi-page-sub">BLANK · Datentypen · Funktionskategorien · DISTINCTCOUNT · DIVIDE · Operatoren · Variablen</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis für dieses Aufgabenblatt</span>
  Verwende die Dateien <strong>customer_data.csv</strong> und <strong>sales_data.csv</strong>. Bevor du mit DAX arbeitest, führe folgende Transformationen in Power Query durch:
  <ul>
    <li>Spalte <code>invoice_date</code> in sales: Datentyp von Text auf Datum ändern (Format: TT-MM-JJJJ)</li>
    <li>Spalte <code>age</code> in customers: Leere Werte ersetzen (119 Einträge ohne Altersangabe — ersetze durch den Median oder entferne die Zeilen)</li>
    <li>Tabellen umbenennen: <strong>sales</strong> und <strong>customers</strong></li>
    <li>Beziehung anlegen: customers[customer_id] → sales[customer_id] (1:*)</li>
  </ul>
  Speichere die Datei als <code>uebung_10.pbix</code>.
</div>

---

## Aufgabe 1 — Datentypen im Modell ablesen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Datentypen identifizieren und bewerten</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Datensicht und klicke in <strong>sales</strong> nacheinander auf die Spalten <code>price</code>, <code>quantity</code>, <code>invoice_date</code> und <code>invoice_no</code>. Notiere für jede Spalte den angezeigten Datentyp.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Spalte <code>invoice_no</code> ist eine Bestellnummer (z.B. "I138884"). Welche Standardaggregation hat Power BI gesetzt? Warum ist das falsch? Ändere sie auf <strong>Keine</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Spalte <code>age</code> in customers hat numerische Werte. Welche Standardaggregation ist gesetzt? Ist "Summe aller Altersangaben" eine sinnvolle Kennzahl? Was wäre sinnvoller — und wie stellst du das ein?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Warum sollte <code>customer_id</code> in beiden Tabellen denselben Datentyp haben? Prüfe ob das der Fall ist. Was würde passieren wenn einer Text und der andere Ganzzahl wäre?</span>
  </div>
</div>

  <strong>a) Datentypen der vier Spalten:</strong>
  <br><br>
  <strong>b) Falsche Aggregation bei invoice_no und Korrektur:</strong>
  <br><br>
  <strong>c) Aggregation age und sinnvolle Alternative:</strong>
  <br><br>
  <strong>d) Begründung gleicher Datentyp und Konsequenz:</strong>

  </div>
</div>

---

## Aufgabe 2 — BLANK verstehen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">BLANK erkennen und korrekt prüfen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">In customers haben 119 Einträge keine Altersangabe. Lege ein neues Measure an: <code>Kunden ohne Alter = COUNTROWS(FILTER(customers, ISBLANK(customers[age])))</code>. Was gibt das Measure zurück? Stimmt es mit den 119 überein?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Warum würde <code>customers[age] = 0</code> hier nicht funktionieren um fehlende Altersangaben zu finden? Erkläre den Unterschied zwischen BLANK und dem Wert 0.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege ein Measure an: <code>Test = BLANK()</code>. Ziehe es in ein Kartenvisual. Was wird angezeigt? Was ist der Unterschied zu einem Measure das den Wert 0 zurückgibt?</span>
  </div>
</div>

  <strong>a) Ergebnis des Measures und Vergleich mit 119:</strong>
  <br><br>
  <strong>b) Unterschied BLANK vs. 0 bei Vergleichsoperator:</strong>
  <br><br>
  <strong>c) Anzeige von BLANK im Visual:</strong>

  </div>
</div>

---

## Aufgabe 3 — DISTINCTCOUNT und COUNTROWS

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Zählfunktionen gezielt einsetzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege folgende zwei Measures an und vergleiche die Ergebnisse in Kartenvisuals nebeneinander:<br><br>
    <code>Anzahl Transaktionen = COUNTROWS(sales)</code><br>
    <code>Anzahl Kunden = DISTINCTCOUNT(sales[customer_id])</code><br><br>
    Warum ist Anzahl Kunden kleiner als Anzahl Transaktionen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege ein Tabellenvisual an mit <code>sales[category]</code> als Zeilen und beiden Measures. Was zeigt die Spalte "Anzahl Kunden" pro Kategorie? Was bedeutet das inhaltlich?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege ein drittes Measure an: <code>Anzahl Malls = DISTINCTCOUNT(sales[shopping_mall])</code>. Wie viele verschiedene Malls gibt es? Prüfe das Ergebnis gegen die Rohdaten.</span>
  </div>
</div>

  <strong>a) Beide Werte und Begründung für den Unterschied:</strong>
  <br><br>
  <strong>b) Was "Anzahl Kunden pro Kategorie" inhaltlich bedeutet:</strong>
  <br><br>
  <strong>c) Anzahl Malls:</strong>

  </div>
</div>

---

## Aufgabe 4 — DIVIDE sicher rechnen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Division mit und ohne DIVIDE vergleichen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege folgende zwei Measures an:<br><br>
    <code>Ø Preis V1 = SUM(sales[price]) / COUNTROWS(sales)</code><br>
    <code>Ø Preis V2 = DIVIDE(SUM(sales[price]), COUNTROWS(sales))</code><br><br>
    Beide zeigen denselben Wert. Was ist trotzdem der Vorteil von V2?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">DIVIDE hat ein optionales drittes Argument: den Alternativwert bei Division durch Null. Schreibe das Measure aus a) so um dass es 0 zurückgibt statt BLANK wenn der Nenner 0 ist.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wann würde der Nenner in diesem Measure tatsächlich 0 werden? Beschreibe ein konkretes Filterszenario.</span>
  </div>
</div>

  <strong>a) Vorteil von DIVIDE gegenüber /-Operator:</strong>
  <br><br>
  <strong>b) Measure mit Alternativwert 0:</strong>
  <br><br>
  <strong>c) Szenario wo Nenner 0 wird:</strong>

  </div>
</div>

---

## Aufgabe 5 — Operatoren und Rangfolge

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Operatoren korrekt einsetzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege folgende zwei Measures an und vergleiche die Ergebnisse:<br><br>
    <code>Umsatz Falsch = SUMX(sales, sales[price] * sales[quantity] - 10)</code><br>
    <code>Umsatz Rabatt = SUMX(sales, sales[price] * (sales[quantity] - 10))</code> (sinnlos inhaltlich, aber gut für die Rangfolge-Demo)<br><br>
    Warum sind die Werte verschieden? Welche Rechenoperation wird zuerst ausgeführt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Der IN-Operator prüft ob ein Wert in einer Liste vorkommt. Schreibe ein Measure das den Umsatz (SUM von price) nur für die Kategorien "Clothing" und "Shoes" berechnet — mit dem IN-Operator in CALCULATE.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege eine berechnete Spalte in customers an: <code>Altersgruppe = IF(customers[age] < 30, "Unter 30", IF(customers[age] < 50, "30 bis 49", "50 und älter"))</code>. Wie viele Zeilen hat jede Altersgruppe? Nutze ein Tabellenvisual mit customers[Altersgruppe] und COUNTROWS.</span>
  </div>
</div>

  <strong>a) Unterschied der beiden Measures und Begründung:</strong>
  <br><br>
  <strong>b) Measure mit IN-Operator:</strong>
  <br><br>
  <strong>c) Anzahl Zeilen pro Altersgruppe:</strong>

  </div>
</div>

---

## Aufgabe 6 — Variablen einsetzen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Ein Measure mit VAR/RETURN schreiben</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Schreibe folgendes Measure ohne Variablen:<br><br>
    Anteil Kleidung = Umsatz der Kategorie Clothing / Gesamtumsatz<br><br>
    Verwende DIVIDE und CALCULATE. Gesamtumsatz ist SUM(sales[price]), Clothing-Umsatz ist CALCULATE(SUM(sales[price]), sales[category] = "Clothing").</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Schreibe dasselbe Measure jetzt mit VAR/RETURN. Deklariere GesamtUmsatz und ClothingUmsatz als Variablen. Was ändert sich an der Lesbarkeit?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Verwende den Debugging-Trick: Ändere RETURN temporär auf <code>RETURN GesamtUmsatz</code>. Was zeigt das Measure jetzt? Ändere es dann auf <code>RETURN ClothingUmsatz</code>. Stimmen beide Zwischenwerte?</span>
  </div>
</div>

  <strong>a) Measure ohne Variablen:</strong>
  <br><br>
  <strong>b) Measure mit VAR/RETURN:</strong>
  <br><br>
  <strong>c) Zwischenwerte aus dem Debugging:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Spalte <code>price</code> in sales enthält den Einzelpreis pro Artikel. Ein Kollege zieht sie direkt in ein Kartenvisual und nennt das Ergebnis "Gesamtumsatz". Was ist das Problem — und wie löst du es korrekt?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Du willst wissen wie viele Kunden mehr als einmal eingekauft haben. Welche Funktion würdest du verwenden und wie würde die Formel aussehen?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Vorbereitung</strong> Daten transformiert, Beziehung angelegt, als uebung_10.pbix gespeichert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Datentypen abgelesen, invoice_no und age korrekt eingestellt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> ISBLANK verwendet, Unterschied BLANK vs. 0 erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> COUNTROWS und DISTINCTCOUNT verglichen, Tabellenvisual nach Kategorie erstellt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> DIVIDE mit Alternativwert geschrieben, Szenario für Division durch Null beschrieben</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Rangfolge-Falle erkannt, IN-Operator verwendet, Altersgruppen-Spalte angelegt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Measure mit und ohne VAR/RETURN geschrieben, Debugging-Trick angewendet</span>
  </div>
</div>
