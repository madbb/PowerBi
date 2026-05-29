# Aufgaben: Daten bereinigen, transformieren und laden

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06 · Aufgabenblatt</div>
  <div class="pbi-page-title">Daten bereinigen, transformieren und laden</div>
  <div class="pbi-page-sub">Power Query-Editor · Bereinigen · Entpivotieren · Datentypen · Append · Datenprofiling</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Arbeite weiter in der Datei <code>uebung_05.pbix</code> aus Aufgabenblatt 05. Alle vier Tabellen sind bereits geladen. Öffne den Power Query-Editor über <strong>Start → Daten transformieren</strong>.
</div>

---

## Aufgabe 1 — Customers bereinigen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Spalten umbenennen, Städte normalisieren, NULL-Werte behandeln</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Customers</strong>. Benenne die Spalte <strong>Kundenseit</strong> in <strong>KundeSeit</strong> um — der Spaltenname wurde beim CSV-Export abgeschnitten. Doppelklick auf die Spaltenüberschrift.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Normalisiere die Spalte <strong>Stadt</strong>: Einige Städte sind vollständig in Großbuchstaben geschrieben (z.B. LÜBECK, HANNOVER). Markiere die Spalte und wähle <strong>Transformieren → Format → Erste Buchstaben groß</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Behandle die NULL-Werte in der Spalte <strong>Email</strong>: Rechtsklick auf die Spalte → <strong>Werte ersetzen</strong>. Ersetze <code>null</code> durch einen leeren Text <code></code> (leeres Feld lassen).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Entferne die Spalte <strong>Telefon</strong> — sie hat 30 leere Werte und wird im Bericht nicht benötigt. Rechtsklick auf die Spaltenüberschrift → <strong>Entfernen</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Prüfe im Bereich <strong>Angewendete Schritte</strong> rechts: Wie viele Schritte hat die Abfrage jetzt? Benenne den Schritt für die Stadtbereinigung in <strong>Städte normalisiert</strong> um — Rechtsklick auf den Schritt → <strong>Umbenennen</strong>.</span>
  </div>
</div>
</div>

  </div>
</div>

---

## Aufgabe 2 — Datentypen korrigieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Falsche Datentypen in Orders identifizieren und beheben</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">📋 Szenario</span>
  Power BI hat beim Import die Datentypen automatisch erkannt — aber nicht immer korrekt. Falsche Typen blockieren später Datumshierarchien, Berechnungen und Beziehungen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>Orders</strong>. Prüfe die Datentypen aller Spalten — klicke auf das Typ-Symbol links der jeweiligen Spaltenüberschrift. Notiere welche Spalten einen falschen Typ haben.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Korrigiere <strong>Bestelldatum</strong> und <strong>Lieferdatum</strong> auf den Typ <strong>Datum</strong>. Wähle die Spalte, klicke auf das Typ-Symbol und wähle <strong>Datum</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Korrigiere <strong>Menge</strong> auf den Typ <strong>Ganzzahl</strong> und <strong>Einzelpreis</strong> sowie <strong>Rabatt</strong> auf den Typ <strong>Dezimalzahl</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was würde passieren wenn <strong>Bestelldatum</strong> als Text im Modell bleibt? Nenne zwei konkrete Auswirkungen.</span>
  </div>
</div>
  <strong>d) Zwei Auswirkungen von Bestelldatum als Text:</strong>
  
</div>

  </div>
</div>

---

## Aufgabe 3 — Datenprofiling

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Spaltenqualität und Verteilung analysieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Aktiviere alle drei Profilierungsansichten für die Abfrage <strong>Customers</strong>: <strong>Ansicht → Spaltenqualität</strong>, <strong>Ansicht → Spaltenverteilung</strong>, <strong>Ansicht → Spaltenprofil</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Power Query profiliert standardmäßig nur die ersten 1.000 Zeilen. Stelle auf das gesamte Dataset um: Klicke in der Statusleiste unten auf den Profilierungsstatus → <strong>Spaltenprofilerstellung basierend auf gesamtem Dataset</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke auf die Spalte <strong>CustomerID</strong> und schau auf das Spaltenprofil unten. Notiere: Wie viele unterschiedliche Werte gibt es? Wie viele eindeutige? Was sagt dir das über Duplikate?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wechsle zur Spalte <strong>Segment</strong>. Schau auf die Spaltenverteilung. Notiere die vier Segmentwerte und ihre ungefähre Häufigkeit.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>Orders</strong>. Prüfe die Spaltenqualität für <strong>Lieferdatum</strong>. Wie viele leere Werte gibt es? Ist das ein Fehler oder erwartet — und warum?</span>
  </div>
</div>
  <strong>d) Segmente und Häufigkeit:</strong>
  
  <strong>e) Leere Werte Lieferdatum — Fehler oder erwartet?</strong>
  
</div>

  </div>
</div>

---

## Aufgabe 4 — Entpivotieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Breite Tabelle in normalisierte Struktur umwandeln</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Ziel</span>
  Die Datei <code>monthly_sales_wide.csv</code> hat 12 Monatsspalten nebeneinander. Power BI und DAX können damit nicht richtig arbeiten. Das Ziel ist eine normalisierte Tabelle mit drei Spalten: <strong>Region</strong>, <strong>Monat</strong> und <strong>Umsatz</strong>.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lade <code>monthly_sales_wide.csv</code> in den Power Query-Editor. Benenne die Abfrage in <strong>MonatsumsatzBreit</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Markiere alle zwölf Monatsspalten (Jan bis Dez) — Klick auf <strong>Jan</strong>, dann Shift+Klick auf <strong>Dez</strong>. Wähle <strong>Transformieren → Entpivotieren</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne die entstandene Spalte <strong>Attribut</strong> in <strong>Monat</strong> um und die Spalte <strong>Wert</strong> in <strong>Umsatz</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Prüfe das Ergebnis: Wie viele Zeilen hat die Tabelle jetzt? Warum ist das die erwartete Anzahl? (Tipp: 5 Regionen × 12 Monate)</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Warum ist die schmale Tabellenstruktur für Power BI besser als die breite? Nenne zwei Gründe.</span>
  </div>
</div>
  <strong>e) Zwei Gründe für normalisierte Struktur:</strong>
  
</div>

  </div>
</div>

---

## Aufgabe 5 — Abfragen anfügen (Append)

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">orders.csv und orders_2025.csv zusammenführen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">📋 Szenario</span>
  Die Bestelldaten für 2025 liegen in einer separaten Datei. Du möchtest beide Dateien zu einer einzigen Orders-Tabelle zusammenführen — ohne die Originaldateien zu verändern.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lade <code>orders_2025.csv</code> in den Power Query-Editor. Benenne die Abfrage in <strong>Orders2025</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wähle die Abfrage <strong>Orders</strong>. Gehe zu <strong>Start → Abfragen anfügen → Abfragen als neu anfügen</strong>. Wähle <strong>Orders</strong> als erste und <strong>Orders2025</strong> als zweite Tabelle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne die neue kombinierte Abfrage in <strong>OrdersGesamt</strong> um. Prüfe die Zeilenanzahl — sie sollte 3.500 betragen (3.000 + 500).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Deaktiviere das Laden für die beiden Ursprungsabfragen <strong>Orders</strong> und <strong>Orders2025</strong>: Rechtsklick auf die Abfrage → <strong>Laden aktivieren</strong> deaktivieren. Nur <strong>OrdersGesamt</strong> soll ins Modell geladen werden.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was ist der Unterschied zwischen "Abfragen anfügen" und "Abfragen zusammenführen"? Wann nutzt du welche Operation?</span>
  </div>
</div>
</div>

  </div>
</div>

---

## Aufgabe 6 — M-Code lesen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Erweiterten Editor öffnen und M-Code verstehen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Customers</strong>. Gehe zu <strong>Ansicht → Erweiterter Editor</strong>. Schau dir den M-Code an ohne etwas zu verändern.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Identifiziere den Schritt für die Stadtbereinigung den du in Aufgabe 1b erstellt hast. Wie heißt der Variablenname links vom <code>=</code>?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Schau auf die letzte Zeile nach <code>in</code>. Welcher Schrittname steht dort? Was bedeutet das?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Schließe den Editor mit <strong>Fertig</strong> ohne Änderungen. Beantworte schriftlich: Was passiert wenn du in der Mitte der Schrittkette einen Schritt löschst auf den ein späterer Schritt verweist?</span>
  </div>
</div>
  <strong>c) Letzter Schritt nach "in" und seine Bedeutung:</strong>
  
  <strong>d) Konsequenz beim Löschen eines abhängigen Schritts:</strong>
  
</div>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Dein Kollege sagt: "Ich bereinige die Daten lieber direkt in Excel bevor ich sie in Power BI lade — dann muss ich das in Power Query nicht machen." Was spricht dagegen?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Du hast NULL-Werte in der Umsatzspalte. Dein Chef sagt: "Ersetze sie einfach durch 0." Ist das immer richtig? Wann könnte das problematisch sein?</span>
</div>
  <strong>R2)</strong>
  
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Customers bereinigt: Spalte umbenannt, Städte normalisiert, NULL behandelt, Spalte entfernt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Datentypen in Orders korrigiert und Auswirkungen begründet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Datenprofiling aktiviert und Befunde dokumentiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> monthly_sales_wide.csv entpivotiert, 60 Zeilen, korrekt benannt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Orders + Orders2025 per Append zusammengeführt, 3.500 Zeilen, Laden deaktiviert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> M-Code gelesen und Struktur verstanden</span>
  </div>
</div>
