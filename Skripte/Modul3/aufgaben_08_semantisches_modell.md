# Aufgaben: Semantisches Modell konfigurieren

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 08 · Aufgabenblatt</div>
  <div class="pbi-page-title">Semantisches Modell konfigurieren</div>
  <div class="pbi-page-sub">Beziehungen · Kardinalität · Kreuzfilterrichtung · Tabellen · Spalten · Hierarchien · Measures · Parameter</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Öffne die Datei <code>uebung_06b.pbix</code>. Die vier Tabellen <strong>orders</strong>, <strong>customers</strong>, <strong>products</strong> und <strong>salesreps</strong> sind geladen. Stelle sicher, dass die automatische Beziehungserkennung deaktiviert ist: <strong>Datei → Optionen → Aktuelle Datei → Daten laden</strong>.
</div>

---

## Aufgabe 1 — Modell analysieren bevor Beziehungen gebaut werden

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Schlüsselspalten identifizieren</span>
  </div>
  <div class="pbi-task-body">

Öffne die Modellansicht. Die vier Tabellen liegen unverbunden im Diagramm.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Welche Tabelle ist die Faktentabelle? Welche drei Tabellen sind Dimensionen? Schreibe deine Antwort in deine Notizen und begründe in einem Satz.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ordne die folgenden Spalten der richtigen Rolle zu: <strong>Primärschlüssel</strong> (eindeutig, kommt in dieser Tabelle nur einmal vor) oder <strong>Fremdschlüssel</strong> (verweist auf eine andere Tabelle). Schreibe die Zuordnung in deine Notizen.<br><br>
    CustomerID in customers · CustomerID in orders · ProductID in products · ProductID in orders · SalesRepID in salesreps · SalesRepID in orders</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wechsle in die Datensicht. Öffne die Tabelle orders. Welche drei Spalten in orders sind Fremdschlüssel die auf andere Tabellen verweisen? Prüfe: Kommen dieselben Werte in orders mehrfach vor? Was bedeutet das für die Kardinalität?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">orders hat zwei Datumsspalten: <strong>Bestelldatum</strong> und <strong>Lieferdatum</strong>. Welches Problem entsteht wenn später eine Datumstabelle mit dem Modell verbunden werden soll? Was ist der Begriff für dieses Szenario?</span>
  </div>
</div>

  <strong>a) Faktentabelle und Begründung:</strong>
  <br><br>
  <strong>b) Primär- und Fremdschlüssel-Zuordnung:</strong>
  <br><br>
  <strong>c) Drei Fremdschlüssel in orders und Bedeutung für die Kardinalität:</strong>
  <br><br>
  <strong>d) Problem mit zwei Datumsspalten und Fachbegriff:</strong>

  </div>
</div>

---

## Aufgabe 2 — Beziehungen aufbauen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Alle Beziehungen manuell anlegen und prüfen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege die Beziehung zwischen <strong>customers</strong> und <strong>orders</strong> an: Ziehe CustomerID aus customers auf CustomerID in orders. Doppelklicke auf die entstandene Linie. Notiere: Welche Kardinalität hat Power BI automatisch erkannt? Welche Kreuzfilterrichtung wurde gesetzt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege die Beziehungen zwischen <strong>products</strong> und <strong>orders</strong> sowie zwischen <strong>salesreps</strong> und <strong>orders</strong> auf dieselbe Weise an. Wie viele Beziehungslinien sind jetzt im Diagramm sichtbar?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Prüfe alle drei Beziehungen im Fenster <strong>Beziehungen verwalten</strong> (Registerkarte Modellierung). Notiere für jede Beziehung: Tabellen, Spalten, Kardinalität, Filterrichtung.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Welches Symbol steht an der 1-Seite einer Beziehungslinie? Welches Symbol steht an der *-Seite? In welche Richtung zeigt der Pfeil — von der Dimension zur Faktentabelle oder umgekehrt? Was bedeutet diese Richtung inhaltlich?</span>
  </div>
</div>

  <strong>a) Kardinalität und Kreuzfilterrichtung der ersten Beziehung:</strong>
  <br><br>
  <strong>b) Anzahl Beziehungslinien nach allen drei Beziehungen:</strong>
  <br><br>
  <strong>c) Tabelle aller drei Beziehungen mit Kardinalität und Filterrichtung:</strong>
  <br><br>
  <strong>d) Symbole an der Linie und Bedeutung der Pfeilrichtung:</strong>

  </div>
</div>

---

## Aufgabe 3 — Kreuzfilterrichtung verstehen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Filterausbreitung nachvollziehen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Ein Berichtsnutzer setzt einen Filter auf <strong>customers[Segment] = "Großkunde"</strong>. Welche Tabellen werden durch diesen Filter beeinflusst — bei Kreuzfilterrichtung "Einzeln"? Welche Tabellen werden <strong>nicht</strong> beeinflusst?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Öffne die Beziehungseigenschaften zwischen customers und orders (Doppelklick auf die Linie). Ändere die Kreuzfilterrichtung auf <strong>Beide</strong>. Was würde sich jetzt ändern wenn ein Filter auf orders[Status] = "Abgeschlossen" gesetzt wird? Welches Risiko entsteht dadurch?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze die Kreuzfilterrichtung wieder auf <strong>Einzeln</strong> zurück. Begründe in einem Satz warum "Einzeln" die richtige Einstellung für diese Beziehung ist.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Nenne einen konkreten Fall in dem bidirektionale Filterung sinnvoll ist. Was ist der Fachbegriff für die Hilfstabelle die in diesem Fall verwendet wird?</span>
  </div>
</div>

  <strong>a) Beeinflusste Tabellen bei Segment-Filter (Einzeln):</strong>
  <br><br>
  <strong>b) Änderung bei bidirektionaler Filterung und Risiko:</strong>
  <br><br>
  <strong>c) Begründung für Einzeln bei dieser Beziehung:</strong>
  <br><br>
  <strong>d) Sinnvoller Fall für bidirektionale Filterung und Fachbegriff:</strong>

  </div>
</div>

---

## Aufgabe 4 — Tabellen und Spalten konfigurieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Eigenschaften und Standardaggregation anpassen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne in der Modellansicht die Eigenschaften der Tabelle <strong>orders</strong> (Klick auf den Tabellenkopf, Eigenschaftenbereich rechts). Trage als Beschreibung ein: "Transaktionsdaten aller Bestellungen 2022–2025. Faktentabelle des Modells." Speichere. Wo erscheint diese Beschreibung für Berichtsautoren?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wechsle in die Datensicht. Klicke in der Tabelle <strong>customers</strong> auf die Spalte <strong>PLZ</strong>. Welche Standardaggregation ist gesetzt? Warum ist das falsch? Ändere sie auf <strong>Keine</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke in <strong>orders</strong> auf die Spalte <strong>OrderID</strong>. Welche Standardaggregation ist gesetzt? Ändere sie auf <strong>Keine</strong>. Erkläre: Warum sollte eine ID-Spalte niemals summiert oder durchschnittlich berechnet werden?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Deaktiviere die Funktion <strong>Auto Datum/Uhrzeit</strong> für die aktuelle Datei. Nenne den vollständigen Pfad im Menü. Erkläre in einem Satz warum diese Einstellung für professionelle Modelle deaktiviert werden sollte.</span>
  </div>
</div>

  <strong>a) Wo erscheint die Tabellenbeschreibung für Berichtsautoren:</strong>
  <br><br>
  <strong>b) Falsche Standardaggregation bei PLZ und Begründung:</strong>
  <br><br>
  <strong>c) Begründung warum ID-Spalten nicht aggregiert werden sollen:</strong>
  <br><br>
  <strong>d) Menüpfad für Auto Datum/Uhrzeit und Begründung für Deaktivierung:</strong>

  </div>
</div>

---

## Aufgabe 5 — Hierarchie anlegen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Geographiehierarchie in customers erstellen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Modellansicht. Rechtsklicke auf die Spalte <strong>Region</strong> in der Tabelle <strong>customers</strong> und wähle <strong>Hierarchie erstellen</strong>. Welchen Standardnamen gibt Power BI der neuen Hierarchie?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ziehe die Spalte <strong>Stadt</strong> aus customers auf die neue Hierarchie. In welcher Reihenfolge stehen die Ebenen? Ist das die richtige Reihenfolge für eine Geographiehierarchie (grob nach fein)?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne die Hierarchie in <strong>Geographie</strong> um (Doppelklick auf den Hierarchienamen). Wechsle in die Berichtsansicht. Wo erscheint die Hierarchie "Geographie" im Datenbereich — unter welcher Tabelle?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Warum können Hierarchieebenen nur aus Spalten <strong>derselben Tabelle</strong> bestehen? Was wäre nötig wenn man eine tabellenübergreifende Navigationsmöglichkeit schaffen wollte?</span>
  </div>
</div>

  <strong>a) Standardname der neuen Hierarchie:</strong>
  <br><br>
  <strong>b) Ebenreihenfolge und ob sie korrekt ist:</strong>
  <br><br>
  <strong>c) Position der Hierarchie im Datenbereich:</strong>
  <br><br>
  <strong>d) Begründung für die Einschränkung auf eine Tabelle:</strong>

  </div>
</div>

---

## Aufgabe 6 — Measure und Parameter anlegen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Erstes Measure und Was-wäre-wenn-Parameter erstellen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklicke auf die Tabelle <strong>orders</strong> im Datenbereich und wähle <strong>Neues Measure</strong>. Gib folgende Formel ein: <code>Umsatz = SUM(orders[Einzelpreis])</code>. Drücke Enter. An welchem Symbol erkennst du das Measure im Datenbereich? Zu welcher Tabelle ist es zugeordnet?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Formatiere das Measure <strong>Umsatz</strong>: Wähle als Kategorie <strong>Währung</strong> und setze das Format auf Euro mit zwei Dezimalstellen. Wo in Power BI Desktop nimmst du diese Einstellung vor?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lege einen numerischen Bereichsparameter an: <strong>Modellierung → Neuer Parameter → Numerischer Bereich</strong>. Name: <em>Rabattsatz</em>, Minimum: 0, Maximum: 0,20, Inkrement: 0,01. Was erzeugt Power BI automatisch im Modell? Nenne beide Elemente.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Hat die vom Parameter erzeugte Tabelle eine Beziehung zu orders, customers oder einer anderen Tabelle? Wie nennt man eine Tabelle ohne Beziehungen im Modell? Wofür ist das in diesem Fall sinnvoll?</span>
  </div>
</div>

  <strong>a) Symbol des Measures und zugeordnete Tabelle:</strong>
  <br><br>
  <strong>b) Wo wird das Measure-Format eingestellt:</strong>
  <br><br>
  <strong>c) Was Power BI automatisch erzeugt (zwei Elemente):</strong>
  <br><br>
  <strong>d) Beziehung der Parametertabelle und Fachbegriff:</strong>

  </div>
</div>

---

## Aufgabe 7 — Aktive und inaktive Beziehungen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Rollenspieldimension — zwei Beziehungen zur selben Tabelle</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Diese Aufgabe ist konzeptuell. Eine eigene Datumstabelle steht in diesem Skript noch nicht zur Verfügung. Beantworte die Fragen schriftlich in deinen Notizen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">orders hat zwei Datumsspalten: <strong>Bestelldatum</strong> und <strong>Lieferdatum</strong>. Angenommen es gibt eine Datumstabelle mit einer Spalte <strong>Datum</strong>. Wie viele aktive Beziehungen kann es zwischen der Datumstabelle und orders gleichzeitig geben?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wie wird eine inaktive Beziehung im Modelldiagramm dargestellt — mit welcher Linienart? Was bedeutet "inaktiv" für Filterberechnungen im Bericht?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Nenne die zwei Lösungsansätze für das Bestelldatum/Lieferdatum-Problem. Welche DAX-Funktion ermöglicht es, in einem Measure gezielt eine inaktive Beziehung zu verwenden?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wann würdest du Lösung 1 (eine aktive, eine inaktive Beziehung) wählen, wann Lösung 2 (zwei separate Datumstabellen)? Nenne je einen Grund.</span>
  </div>
</div>

  <strong>a) Maximale Anzahl aktiver Beziehungen zwischen Datumstabelle und orders:</strong>
  <br><br>
  <strong>b) Darstellung inaktiver Beziehungen und Bedeutung:</strong>
  <br><br>
  <strong>c) Zwei Lösungsansätze und DAX-Funktion:</strong>
  <br><br>
  <strong>d) Wann welche Lösung:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Du übernimmst ein bestehendes Power BI-Modell von einem Kollegen. Im Modelldiagramm siehst du drei bidirektionale Beziehungen und eine gestrichelte Linie. Was prüfst du als erstes und warum?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Ein Berichtsautor beschwert sich: "Das Visual zeigt immer dieselbe Zahl, egal welchen Filter ich setze." Das Modell hat keine Beziehungsfehler. Was könnte die Ursache sein — bezogen auf die Kreuzfilterrichtung?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Faktentabelle und Dimensionen identifiziert, Primär- und Fremdschlüssel zugeordnet, Rollenspieldimension-Problem erkannt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Alle drei Beziehungen manuell angelegt, Kardinalität und Filterrichtung geprüft und notiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Filterausbreitung bei Einzeln und Beide verglichen, Risiko bidirektionaler Filterung erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Tabellenbeschreibung eingetragen, PLZ und OrderID auf Keine gesetzt, Auto Datum/Uhrzeit deaktiviert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Geographiehierarchie mit Region und Stadt angelegt und umbenannt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Measure Umsatz angelegt und formatiert, Rabattsatz-Parameter mit Tabelle und Measure erstellt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Aktive und inaktive Beziehungen konzeptuell verstanden, beide Lösungsansätze und USERELATIONSHIP benannt</span>
  </div>
</div>
