# Aufgaben: Daten in Power BI abrufen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 05 · Aufgabenblatt</div>
  <div class="pbi-page-title">Daten in Power BI abrufen</div>
  <div class="pbi-page-sub">Dateiquellen verbinden · Navigator · Speichermodi · Parameter · Fehlerdiagnose</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Alle Aufgaben basieren auf den bereitgestellten CSV-Dateien: <strong>customers.csv</strong>, <strong>orders.csv</strong>, <strong>products.csv</strong> und <strong>salesreps.csv</strong>. Lege für diese Übung eine neue Power BI Desktop-Datei an und speichere sie als <code>uebung_05.pbix</code>.
</div>

---

## Aufgabe 1 — Vier CSV-Dateien laden

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Dateiquellen verbinden und Abfragen benennen</span>
  </div>
  <div class="pbi-task-body">

Lade alle vier CSV-Dateien in eine neue Power BI Desktop-Datei. Wähle dabei für jede Datei den richtigen Einstiegspunkt und öffne den Power Query-Editor — noch nicht laden.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne Power BI Desktop. Navigiere zu <strong>Start → Daten abrufen → Text/CSV</strong>. Wähle <code>customers.csv</code>. Klicke im Navigator auf <strong>Daten transformieren</strong> — nicht auf Laden.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wiederhole den Vorgang für <code>orders.csv</code>, <code>products.csv</code> und <code>salesreps.csv</code>. Alle vier Abfragen sollen im linken Bereich des Power Query-Editors sichtbar sein.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne alle vier Abfragen um: Rechtsklick auf die Abfrage → <strong>Umbenennen</strong>. Verwende die Namen <strong>Customers</strong>, <strong>Orders</strong>, <strong>Products</strong>, <strong>SalesReps</strong> — keine Dateiendungen, keine Sonderzeichen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Schließe den Power Query-Editor mit <strong>Schließen &amp; Anwenden</strong>. Prüfe in der Modellansicht ob alle vier Tabellen korrekt geladen wurden.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 2 — Speichermodus verstehen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Speichermodus prüfen und begründen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die <strong>Modellansicht</strong>. Klicke auf die Tabelle <strong>Orders</strong> und prüfe im rechten Eigenschaftenbereich welcher Speichermodus eingestellt ist.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Beantworte schriftlich: Warum ist der Import-Modus für unsere vier CSV-Dateien die richtige Wahl? Nenne zwei konkrete Gründe.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Beschreibe in zwei bis drei Sätzen ein realistisches Unternehmensszenario, in dem DirectQuery die bessere Wahl wäre als Import.</span>
  </div>
</div>

<div class="pbi-task-answer">
  <strong>b) Zwei Gründe für Import:</strong>
  <div class="pbi-answer-field"></div>
  <strong>c) Szenario für DirectQuery:</strong>
  <div class="pbi-answer-field"></div>
</div>

  </div>
</div>

---

## Aufgabe 3 — Quelldateipfad aktualisieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Verbindungspfad nach Dateiverschiebung korrigieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">📋 Szenario</span>
  Die Datei <code>customers.csv</code> wurde in einen neuen Unterordner verschoben. Der Bericht zeigt jetzt einen Verbindungsfehler. Deine Aufgabe ist es, den Pfad zu korrigieren ohne die Abfrage neu aufzubauen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Verschiebe <code>customers.csv</code> in einen neuen Unterordner auf deinem Rechner. Öffne <code>uebung_05.pbix</code> erneut und bestätige den Verbindungsfehler.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Korrigiere den Pfad über <strong>Start → Daten transformieren → Datenquelleneinstellungen</strong>. Wähle die Customers-Quelle, klicke auf <strong>Quelle ändern</strong> und gib den neuen Pfad an.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wende die Änderung an und aktualisiere die Daten. Prüfe ob alle 400 Kundenzeilen wieder korrekt geladen werden.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 4 — Parameter erstellen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Filterparameter für Kundensegment anlegen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Ziel</span>
  Du möchtest die Customers-Tabelle so konfigurieren, dass beim Laden nur ein bestimmtes Kundensegment geladen wird. Das Segment soll als Parameter steuerbar sein — ohne die Abfrage jedes Mal neu zu schreiben.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne den Power Query-Editor. Gehe zu <strong>Start → Parameter verwalten → Neuer Parameter</strong>. Erstelle einen Parameter mit dem Namen <strong>Kundensegment</strong>, Typ <strong>Text</strong>, Standardwert <strong>KMU</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Filtere in der Customers-Abfrage die Spalte <strong>Segment</strong> auf den Wert <strong>KMU</strong>. Öffne danach den <strong>Erweiterten Editor</strong> und ersetze den festen Text <code>"KMU"</code> durch den Parameternamen <code>Kundensegment</code>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Ändere den Parameterwert auf <strong>Großkunde</strong> und wende die Abfrage an. Prüfe in der Tabellenansicht ob nur noch Großkunden geladen werden.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was ist der Unterschied zwischen einem Parameter und einem Datenschnitt im Bericht? Wann macht ein Parameter mehr Sinn?</span>
  </div>
</div>

<div class="pbi-task-answer">
  <strong>d) Parameter vs. Datenschnitt:</strong>
  <div class="pbi-answer-field"></div>
</div>

  </div>
</div>

---

## Aufgabe 5 — Fehlermeldungen zuordnen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Fehlermeldungen Ursachen und Lösungen zuordnen</span>
  </div>
  <div class="pbi-task-body">

Ordne jede Fehlermeldung der richtigen Ursache und Lösung zu. Trage die Buchstaben in die Tabelle unten ein.

<div class="pbi-task-match">

<strong>Fehlermeldungen</strong>

| Nr. | Fehlermeldung |
|---|---|
| 1 | `DataSource.Error: Datei wurde nicht gefunden` |
| 2 | `Expression.Error: Keine als Tabelle formatierten Daten gefunden` |
| 3 | `Microsoft.Data.Mashup: Abfragetimeout abgelaufen` |

<strong>Ursachen</strong>

- **A** — Die Excel-Quelldatei enthält keine formale Tabelle, nur einen einfachen Zellbereich
- **B** — Die Quelldatei wurde verschoben oder umbenannt, der gespeicherte Pfad ist ungültig
- **C** — Die Abfrage lädt zu viele Daten, die Serverrichtlinie hat das Limit überschritten

<strong>Lösungen</strong>

- **I** — Abfrageeinstellungen öffnen, Zahnrad bei "Quelle", neuen Pfad angeben
- **II** — In Excel: Daten markieren, Strg+T, als Tabelle formatieren
- **III** — Weniger Spalten oder Zeilen abrufen, Abfrage aufteilen

</div>

<div class="pbi-task-answer">

| Nr. | Ursache (A / B / C) | Lösung (I / II / III) |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

</div>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Du bekommst monatlich eine aktualisierte Excel-Datei vom Controlling. Wo sollte diese gespeichert sein damit Power BI automatisch die neuesten Daten zieht? Was musst du einmalig einrichten?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Ein Kollege fragt: "Warum sollte ich im Navigator 'Daten transformieren' wählen statt direkt auf 'Laden' zu klicken?" Was antwortest du?</span>
</div>

<div class="pbi-task-answer">
  <strong>R1)</strong>
  <div class="pbi-answer-field"></div>
  <strong>R2)</strong>
  <div class="pbi-answer-field"></div>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Vier CSVs geladen und korrekt benannt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Speichermodus geprüft, Import vs. DirectQuery begründet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Verbindungspfad erfolgreich korrigiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Parameter Kundensegment erstellt und getestet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Fehlermeldungen korrekt zugeordnet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Reflexion</strong> Beide Fragen schriftlich beantwortet</span>
  </div>
</div>
