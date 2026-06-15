# Aufgaben: DAX Grundlagen – Berechnungstypen, Syntax und Formeln

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 09 · Aufgabenblatt</div>
  <div class="pbi-page-title">DAX Grundlagen</div>
  <div class="pbi-page-sub">Berechnungstypen · Formelsyntax · Objektreferenzen · Formatierung</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Dieses Aufgabenblatt ist überwiegend konzeptuell. Für die praktischen Aufgaben öffne die Datei <code>uebung_08.pbix</code> mit dem fertigen Sternschema aus Skript 08. Die Tabellen <strong>orders</strong>, <strong>customers</strong>, <strong>products</strong> und <strong>salesreps</strong> sind verbunden und bereit.
</div>

---

## Aufgabe 1 — Die drei Berechnungstypen zuordnen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Berechnungstyp identifizieren</span>
  </div>
  <div class="pbi-task-body">

Ordne jede der folgenden Beschreibungen dem richtigen Berechnungstyp zu: **Berechnete Tabelle**, **Berechnete Spalte** oder **Measure**. Schreibe deine Zuordnung in deine Notizen.

<div class="pbi-task-match">

<strong>Beschreibungen</strong>

| Nr. | Beschreibung |
|---|---|
| 1 | Wird zur Abfragezeit ausgewertet, nie gespeichert, Ergebnis hängt vom Filterkontext ab |
| 2 | Gibt für jede Zeile der Tabelle orders einen einzelnen Wert zurück |
| 3 | Erzeugt ein komplett neues Objekt im Datenbereich mit eigenem Namen |
| 4 | Erhöht die Modellgröße, weil das Ergebnis gespeichert wird |
| 5 | Wird bei der Datenaktualisierung neu berechnet — nicht zur Abfragezeit |
| 6 | Erkennbar am Taschenrechnersymbol im Datenbereich |
| 7 | Wird für Datumstabellen und Rollenspieldimensionen eingesetzt |
| 8 | Für zeilenbasierte Attribute die nicht in der Quelldatei vorhanden sind |

<strong>Typen</strong>

- **T** — Berechnete Tabelle
- **S** — Berechnete Spalte
- **M** — Measure

</div>

  <strong>Zuordnung (Nr. → Typ):</strong>

  </div>
</div>

---

## Aufgabe 2 — Explizit vs. implizit

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Implizite und explizite Measures unterscheiden</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne <code>uebung_08.pbix</code>. Wechsle in den Datenbereich rechts. Suche die Tabelle <strong>orders</strong>. Welche Spalten haben das Sigma-Symbol (∑)? Nenne alle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Was bedeutet das Sigma-Symbol? Warum hat die Spalte <strong>OrderID</strong> kein Sigma-Symbol — obwohl sie numerisch ist? Tipp: Prüfe die Standardaggregation dieser Spalte.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege ein explizites Measure an: Rechtsklick auf <strong>orders</strong> im Datenbereich — Neues Measure. Gib ein: <code>Umsatz = SUM(orders[Einzelpreis])</code>. Welches Symbol erscheint jetzt neben dem Measure im Datenbereich?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Ein Kollege sagt: "Ich brauche kein DAX-Measure für den Umsatz — ich ziehe einfach die Spalte Einzelpreis ins Visual und wähle Summe." Was ist der Unterschied zwischen dieser Vorgehensweise und einem expliziten Measure? Nenne einen Vorteil des expliziten Measures.</span>
  </div>
</div>

  <strong>a) Spalten mit Sigma-Symbol in orders:</strong>
  <br><br>
  <strong>b) Bedeutung Sigma und Begründung für OrderID:</strong>
  <br><br>
  <strong>c) Symbol des expliziten Measures:</strong>
  <br><br>
  <strong>d) Unterschied und Vorteil explizites Measure:</strong>

  </div>
</div>

---

## Aufgabe 3 — Einsatzszenarien berechneter Tabellen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Wann braucht man eine berechnete Tabelle?</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Das Skript nennt drei typische Einsatzszenarien für berechnete Tabellen. Nenne alle drei und erkläre jeden in einem Satz.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ein Kollege möchte eine neue Kundenliste aus einer externen Excel-Datei per berechneter DAX-Tabelle laden. Was ist das Problem? Was ist die richtige Lösung?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Warum sollte man berechnete Tabellen sparsam einsetzen? Nenne die zwei konkreten Nachteile gegenüber Power Query.</span>
  </div>
</div>

  <strong>a) Drei Einsatzszenarien:</strong>
  <br><br>
  <strong>b) Problem und richtige Lösung:</strong>
  <br><br>
  <strong>c) Zwei Nachteile gegenüber Power Query:</strong>

  </div>
</div>

---

## Aufgabe 4 — Formelsyntax lesen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Formelbestandteile identifizieren</span>
  </div>
  <div class="pbi-task-body">

Lies die folgende DAX-Formel und beantworte die Fragen dazu. Schreibe deine Antworten in deine Notizen.

```dax
Nettoumsatz =
SUM(orders[Einzelpreis])
    * SUM(orders[Menge])
    * (1 - SUM(orders[Rabatt]))
```

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Um welchen Berechnungstyp handelt es sich? Woran erkennst du das?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Identifiziere in der Formel: eine DAX-Funktion, einen arithmetischen Operator, eine vollqualifizierte Spaltenreferenz und eine Konstante.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Warum stehen Klammern um <code>1 - SUM(orders[Rabatt])</code>? Was würde passieren wenn die Klammern fehlen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Hat die Formel Leerzeichen und Zeilenumbrüche. Was ändert sich an Logik oder Leistung wenn man sie in eine einzige Zeile schreibt?</span>
  </div>
</div>

  <strong>a) Berechnungstyp und Begründung:</strong>
  <br><br>
  <strong>b) Funktion, Operator, Spaltenreferenz, Konstante:</strong>
  <br><br>
  <strong>c) Zweck der Klammern und Konsequenz ohne Klammern:</strong>
  <br><br>
  <strong>d) Auswirkung der Formatierung auf Logik und Leistung:</strong>

  </div>
</div>

---

## Aufgabe 5 — Objektreferenzen anwenden

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Tabellen, Spalten und Measures korrekt referenzieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Nenne die Referenzregel für jeden der drei Objekttypen. Fülle die Tabelle in deinen Notizen aus:<br><br>
    Tabelle → welche Klammer/Zeichen?<br>
    Spalte (vollqualifiziert) → wie sieht die Syntax aus?<br>
    Measure → welche Klammer, mit oder ohne Tabellenname?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe die folgenden Referenzen. Welche ist korrekt, welche ist falsch? Begründe jeweils.<br><br>
    1. <code>orders[Einzelpreis]</code><br>
    2. <code>[orders].[Einzelpreis]</code><br>
    3. <code>orders.[Einzelpreis]</code><br>
    4. <code>[Umsatz]</code> als Measure-Referenz<br>
    5. <code>orders[Umsatz]</code> als Measure-Referenz</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Warum muss eine Tabelle namens <strong>Date</strong> immer in einfache Anführungszeichen gesetzt werden (<code>'Date'</code>), eine Tabelle namens <strong>orders</strong> aber nicht? Was ist der Fachbegriff für den Grund?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Lege in <code>uebung_08.pbix</code> ein zweites Measure an: <code>Anzahl Bestellungen = COUNTROWS(orders)</code>. Referenziere das erste Measure im zweiten: <code>Umsatz je Bestellung = [Umsatz] / [Anzahl Bestellungen]</code>. Haben die Measure-Referenzen einen Tabellennamen? Warum nicht?</span>
  </div>
</div>

  <strong>a) Referenzregeln für alle drei Objekttypen:</strong>
  <br><br>
  <strong>b) Korrekte und falsche Referenzen mit Begründung:</strong>
  <br><br>
  <strong>c) Begründung für Anführungszeichen bei Date und Fachbegriff:</strong>
  <br><br>
  <strong>d) Warum kein Tabellenname bei Measure-Referenzen:</strong>

  </div>
</div>

---

## Aufgabe 6 — IntelliSense und Bearbeitungsleiste

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Formeln gezielt schreiben und korrigieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege ein neues Measure in orders an. Tippe nur <code>SU</code> — was zeigt IntelliSense? Wähle <code>SUM</code> aus der Liste. Wie übernimmst du den Vorschlag ohne ausschreiben zu müssen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Tippe nach SUM eine öffnende Klammer, dann eine eckige Klammer. Was erscheint in der IntelliSense-Liste? Wähle <strong>Einzelpreis</strong> aus. Schließe Klammern und drücke Umschalt+Enter. Was ist der Unterschied zu Enter ohne Umschalttaste?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Schreibe absichtlich eine falsche Referenz: <code>Test = SUM(orders[EinzelPreis])</code> (falscher Großbuchstabe). Was passiert? Ist DAX case-sensitive bei Spaltennamen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Brich das fehlerhafte Measure ab ohne zu speichern. Erkläre: Wann hilft daxformatter.com und wann nicht? Was kann das Tool und was kann es nicht?</span>
  </div>
</div>

  <strong>a) IntelliSense-Auslöser und Übernahme per Tastatur:</strong>
  <br><br>
  <strong>b) IntelliSense nach eckiger Klammer und Unterschied Umschalt+Enter vs. Enter:</strong>
  <br><br>
  <strong>c) Verhalten bei falschem Spaltennamen und Case-Sensitivity:</strong>
  <br><br>
  <strong>d) Was daxformatter.com kann und was nicht:</strong>

  </div>
</div>

---

## Aufgabe 7 — Formel formatieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Eine unformatierte Formel lesbar machen</span>
  </div>
  <div class="pbi-task-body">

Die folgende Formel ist korrekt, aber schwer lesbar. Formatiere sie in deine Notizen so, dass Struktur und Argumente klar erkennbar sind. Verwende Einrückungen und Zeilenumbrüche.

```dax
Umsatz Großkunden = CALCULATE(SUM(orders[Einzelpreis]),customers[Segment]="Großkunde")
```

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Schreibe die formatierte Version in deine Notizen. Wie viele Argumente hat CALCULATE? Was ist das erste Argument, was das zweite?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ändert sich das Ergebnis dieser Formel durch die Formatierung? Begründe in einem Satz.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Gib die unformatierte Formel bei <strong>daxformatter.com</strong> ein und lass sie formatieren. Entspricht das Ergebnis deiner eigenen Formatierung? Was macht das Tool anders oder besser?</span>
  </div>
</div>

  <strong>a) Formatierte Version und Argumente von CALCULATE:</strong>
  <br><br>
  <strong>b) Auswirkung der Formatierung auf das Ergebnis:</strong>
  <br><br>
  <strong>c) Vergleich mit daxformatter.com:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Du hast eine Spalte "Gewinnmarge" die für jede Bestellung Einzelpreis minus Einkaufspreis berechnet. Dein Kollege sagt: "Das hätten wir auch in Power Query als berechnete Spalte machen können." Hat er recht? Wann würdest du Power Query vorziehen, wann DAX?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Ein Berichtsautor zieht die Spalte <strong>Einzelpreis</strong> aus orders in ein Kartenvisual und sieht den Gesamtumsatz. Dann zieht er das Measure <strong>Umsatz</strong> (SUM(orders[Einzelpreis])) daneben. Beide zeigen dieselbe Zahl. Was ist dann der Unterschied — und warum sollte man trotzdem das Measure bevorzugen?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Alle acht Beschreibungen den drei Berechnungstypen korrekt zugeordnet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Sigma-Spalten in orders identifiziert, explizites Measure Umsatz angelegt, Unterschied zu implizitem Measure erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Drei Einsatzszenarien für berechnete Tabellen benannt, externe Datenquelle als Fehlerquelle erkannt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Formelbestandteile identifiziert, Klammernregel erklärt, Formatierungseinfluss bewertet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Referenzregeln für alle drei Objekttypen notiert, fünf Referenzen bewertet, Measures Umsatz je Bestellung angelegt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> IntelliSense aktiv genutzt, Umschalt+Enter vs. Enter erprobt, Case-Sensitivity geprüft</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Formel manuell formatiert, mit daxformatter.com verglichen</span>
  </div>
</div>
