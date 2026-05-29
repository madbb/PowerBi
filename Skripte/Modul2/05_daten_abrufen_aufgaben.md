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

## Aufgabe 1 — Dateiquellen verbinden

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Vier CSV-Dateien laden</span>
  </div>
  <div class="pbi-task-body">

Lade alle vier CSV-Dateien in eine neue Power BI Desktop-Datei. Wähle dabei für jede Datei den richtigen Einstiegspunkt.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne Power BI Desktop und navigiere zu <strong>Start → Daten abrufen → Text/CSV</strong>. Lade <code>customers.csv</code>. Wähle im Navigator <strong>Daten transformieren</strong> — noch nicht laden.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wiederhole den Vorgang für <code>orders.csv</code>, <code>products.csv</code> und <code>salesreps.csv</code>. Alle vier Abfragen sollen im Power Query-Editor sichtbar sein.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne alle vier Abfragen im linken Bereich um: entferne Dateiendungen und Sonderzeichen. Verwende die Namen <strong>Customers</strong>, <strong>Orders</strong>, <strong>Products</strong>, <strong>SalesReps</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Schließe den Power Query-Editor mit <strong>Schließen & Anwenden</strong>. Prüfe in der Modellansicht ob alle vier Tabellen geladen wurden.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 2 — Navigator und Speichermodus

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Speichermodus prüfen und verstehen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die <strong>Modellansicht</strong> in Power BI Desktop. Klicke auf die Tabelle <strong>Orders</strong> und prüfe im rechten Eigenschaftenbereich welcher Speichermodus eingestellt ist.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Beantworte die Frage schriftlich: Warum ist der Import-Modus für unsere vier CSV-Dateien die richtige Wahl? Nenne zwei konkrete Gründe.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Beschreibe in zwei bis drei Sätzen: In welchem Szenario wäre DirectQuery die bessere Wahl als Import? Beziehe dich auf ein realistisches Unternehmensbeispiel.</span>
  </div>
</div>

<div class="pbi-task-answer">
  <strong>b)</strong> Antwort hier eintragen:
  <div class="pbi-answer-field"></div>
  <strong>c)</strong> Antwort hier eintragen:
  <div class="pbi-answer-field"></div>
</div>

  </div>
</div>

---

## Aufgabe 3 — Quelldateipfad ändern

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Verbindungspfad simuliert aktualisieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Szenario</span>
  Die Datei <code>customers.csv</code> wurde von deinem Desktop in einen neuen Ordner <code>C:\PBI_Kurs\Daten\</code> verschoben. Der Bericht zeigt jetzt einen Verbindungsfehler.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Verschiebe <code>customers.csv</code> tatsächlich in einen neuen Unterordner. Öffne die <code>uebung_05.pbix</code> erneut und bestätige den Fehler.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Korrigiere den Pfad über <strong>Start → Daten transformieren → Datenquelleneinstellungen</strong>. Wähle die Customers-Quelle, klicke auf <strong>Quelle ändern</strong> und gib den neuen Pfad an.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Aktualisiere die Daten. Prüfe ob der Fehler behoben ist und alle 400 Kundenzeilen korrekt geladen werden.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 4 — Parameter erstellen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Einen Filterparameter für Kundensegment anlegen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Ziel</span>
  Du möchtest die Customers-Tabelle so konfigurieren, dass beim Laden nur ein bestimmtes Kundensegment geladen wird. Das Segment soll als Parameter steuerbar sein — ohne die Abfrage neu zu schreiben.
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
    <span class="pbi-step-text">Beantworte schriftlich: Was ist der Unterschied zwischen einem Parameter und einem normalen Datenschnitt im Bericht? Wann macht ein Parameter mehr Sinn?</span>
  </div>
</div>

<div class="pbi-task-answer">
  <strong>d)</strong> Antwort hier eintragen:
  <div class="pbi-answer-field"></div>
</div>

  </div>
</div>

---

## Aufgabe 5 — Fehlerdiagnose

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Fehlermeldungen zuordnen und lösen</span>
  </div>
  <div class="pbi-task-body">

Ordne die folgenden Fehlermeldungen der richtigen Ursache und Lösung zu. Trage die Buchstaben in die Tabelle ein.

<div class="pbi-task-match">

**Fehlermeldungen:**

| Nr. | Fehlermeldung |
|---|---|
| 1 | `DataSource.Error: Datei wurde nicht gefunden` |
| 2 | `Expression.Error: Keine als Tabelle formatierten Daten gefunden` |
| 3 | `Microsoft.Data.Mashup.MashupException: Abfragetimeout abgelaufen` |

**Ursachen (A–C):**

- **A** — Die Excel-Quelldatei enthält keine formale Tabelle, nur einen einfachen Zellbereich
- **B** — Die Quelldatei wurde verschoben oder umbenannt, der gespeicherte Pfad ist nicht mehr gültig
- **C** — Die Abfrage lädt zu viele Daten auf einmal, die Serverrichtlinie hat das Limit überschritten

**Lösungen (I–III):**

- **I** — Abfrageeinstellungen öffnen, Zahnrad bei "Quelle", neuen Pfad angeben
- **II** — In Excel: Daten markieren, Strg+T, als Tabelle formatieren, Spaltenüberschriften prüfen
- **III** — Weniger Spalten oder Zeilen abrufen, Abfrage in kleinere Teile aufteilen

</div>

<div class="pbi-task-answer">

| Nr. | Ursache (A/B/C) | Lösung (I/II/III) |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

</div>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">R</span>
    <span class="pbi-task-title">Zum Nachdenken</span>
  </div>
  <div class="pbi-task-body">

Beantworte die folgenden Fragen in eigenen Worten. Es gibt keine eindeutig richtige Antwort — es geht um dein Verständnis.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">R1</span>
    <span class="pbi-step-text">Du arbeitest in einem Unternehmen und bekommst monatlich eine aktualisierte Excel-Datei vom Controlling. Wo sollte diese Datei gespeichert sein damit Power BI automatisch die neuesten Daten zieht? Was musst du einmalig einrichten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">R2</span>
    <span class="pbi-step-text">Ein Kollege fragt dich: "Warum sollte ich im Navigator 'Daten transformieren' wählen statt einfach auf 'Laden' zu klicken?" Was antwortest du?</span>
  </div>
</div>

<div class="pbi-task-answer">
  <strong>R1)</strong>
  <div class="pbi-answer-field"></div>
  <strong>R2)</strong>
  <div class="pbi-answer-field"></div>
</div>

  </div>
</div>

---

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">✅</div>
    <div class="pbi-summary-title">Aufgabe 1</div>
    <div class="pbi-summary-body">Vier CSV-Dateien geladen und korrekt benannt.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">✅</div>
    <div class="pbi-summary-title">Aufgabe 2</div>
    <div class="pbi-summary-body">Speichermodus geprüft, Import vs. DirectQuery begründet.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">✅</div>
    <div class="pbi-summary-title">Aufgabe 3</div>
    <div class="pbi-summary-body">Verbindungspfad nach Dateiverschiebung erfolgreich aktualisiert.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">✅</div>
    <div class="pbi-summary-title">Aufgabe 4</div>
    <div class="pbi-summary-body">Parameter Kundensegment erstellt und in Abfrage eingebunden.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">✅</div>
    <div class="pbi-summary-title">Aufgabe 5</div>
    <div class="pbi-summary-body">Fehlermeldungen Ursachen und Lösungen korrekt zugeordnet.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">💬</div>
    <div class="pbi-summary-title">Reflexion</div>
    <div class="pbi-summary-body">Praxisfragen zum Verständnis von Speicherorten und Ladeoptionen beantwortet.</div>
  </div>
</div>
