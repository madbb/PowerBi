# Aufgaben: Daten bereinigen, transformieren und laden

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06 · Aufgabenblatt</div>
  <div class="pbi-page-title">Daten bereinigen, transformieren und laden</div>
  <div class="pbi-page-sub">Power Query-Editor · Bereinigen · Entpivotieren · Datentypen · Append · Datenprofiling</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Arbeite weiter in der Datei <code>uebung_05.pbix</code> aus Aufgabenblatt 05. Alle vier Tabellen sind bereits geladen. Öffne den Power Query-Editor über <strong>Start → Daten transformieren</strong>. Power BI hat beim Import weder automatische Überschriften gesetzt noch Datentypen erkannt — alle Spalten haben den Typ <strong>Beliebig</strong>.
</div>

---

## Aufgabe 1 — Erste Zeile als Überschriften und Abfragen umbenennen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Header setzen und Abfragenamen bereinigen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hintergrund</span>
  Power BI hat die erste Zeile nicht als Überschrift erkannt. Die Spalten heißen daher <strong>Column1</strong>, <strong>Column2</strong> usw. Dieser Schritt muss als erstes durchgeführt werden — alle folgenden Transformationen bauen auf den richtigen Spaltennamen auf.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Customers</strong>. Wähle <strong>Start → Erste Zeile als Überschriften verwenden</strong>. Die Spalten haben jetzt ihre richtigen Namen: CustomerID, Firma, Ansprechpartner, Segment, Stadt, Region, PLZ, Telefon, Email, Kundenseit.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wiederhole Schritt a für alle anderen Abfragen: <strong>Orders</strong>, <strong>Products</strong>, <strong>SalesReps</strong>. Prüfe anschließend bei jeder Abfrage ob die Spaltenüberschriften korrekt gesetzt wurden.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wechsle zurück zur Abfrage <strong>Customers</strong>. Benenne die Spalte <strong>Kundenseit</strong> in <strong>KundeSeit</strong> um — der Spaltenname wurde beim CSV-Export abgeschnitten. Doppelklick auf die Spaltenüberschrift.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Prüfe im Bereich <strong>Angewendete Schritte</strong>: Welche zwei Schritte hat Power Query automatisch angelegt, nachdem du "Erste Zeile als Überschriften" gewählt hast? Benenne den Schritt für die Umbenennung in Schritt c um in <strong>Kundenseit korrigiert</strong>.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 2 — Customers bereinigen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Städte normalisieren, Leerzeichen kürzen, leere Werte behandeln, Spalte entfernen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Normalisiere die Spalte <strong>Stadt</strong>: 33 Städte sind vollständig in Großbuchstaben geschrieben (z.B. LÜBECK, HANNOVER, KÖLN). Markiere die Spalte und wähle <strong>Transformieren → Format → Erste Buchstaben groß</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Bereinige die Spalte <strong>Firma</strong>: Drei Firmennamen enthalten doppelte Leerzeichen (z.B. "Kallert  GbR"). Markiere die Spalte, wähle <strong>Transformieren → Format → Kürzen</strong>. Prüfe ob das reicht oder ob <strong>Bereinigen</strong> zusätzlich nötig ist.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Behandle die leeren Werte in der Spalte <strong>Email</strong>: Die Spalte hat 15 leere Einträge. Rechtsklick auf die Spalte → <strong>Werte ersetzen</strong>. Ersetze <code>null</code> durch einen leeren Text (leeres Feld lassen).</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Entferne die Spalte <strong>Telefon</strong>: 30 von 400 Einträgen sind leer und die Spalte wird im Bericht nicht benötigt. Rechtsklick auf die Spaltenüberschrift → <strong>Entfernen</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Prüfe im Bereich <strong>Angewendete Schritte</strong>: Wie viele Schritte hat die Customers-Abfrage insgesamt jetzt? Benenne den Schritt für die Stadtbereinigung um in <strong>Städte normalisiert</strong>.</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 3 — Datentypen korrigieren und Bestelldatum bereinigen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Gemischte Datumsformate erkennen, Einzelpreis bereinigen, alle Typen setzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Da Power BI keine automatische Typerkennung durchgeführt hat, sind alle Spalten als Typ <strong>Beliebig</strong> gesetzt. Falsche oder fehlende Typen blockieren Datumshierarchien, Berechnungen und Beziehungen.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>Orders</strong>. Aktiviere <strong>Ansicht → Spaltenprofil</strong> und klicke auf die Spalte <strong>Bestelldatum</strong>. Sieh dir die Werte im Spaltenprofil unten an. Notiere die drei verschiedenen Datumsformate die du erkennst — schreibe je ein konkretes Beispiel auf.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Versuche <strong>Bestelldatum</strong> direkt auf den Typ <strong>Datum</strong> zu setzen: Klick auf das Typ-Symbol → <strong>Datum</strong>. Beobachte die roten Fehlermarkierungen. Wie viele Fehler entstehen und warum reicht eine direkte Typ-Konvertierung hier nicht? Lösche den Schritt danach wieder im Bereich <strong>Angewendete Schritte</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Die zwei Formate <strong>YYYY-MM-DD</strong> (2.115 Werte) und <strong>DD.MM.YYYY</strong> (454 Werte) lassen sich eindeutig erkennen und umwandeln. Das Slash-Format (431 Werte) enthält beide Schreibweisen DD/MM und MM/DD gemischt und ist nicht automatisch auflösbar — diese Werte werden als <code>null</code> markiert. Füge eine <strong>Benutzerdefinierte Spalte</strong> hinzu: <strong>Spalte hinzufügen → Benutzerdefinierte Spalte</strong>. Benenne sie <strong>BestelldatumBereinigt</strong> und trage folgenden Ausdruck ein:</span>
  </div>
</div>

```
if Text.Contains([Bestelldatum], ".") then
    Date.FromText([Bestelldatum], [Format="DD.MM.YYYY"])
else if Text.Length([Bestelldatum]) = 10
    and Text.Middle([Bestelldatum], 4, 1) = "-" then
    Date.FromText([Bestelldatum], [Format="YYYY-MM-DD"])
else
    null
```

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Prüfe die neue Spalte <strong>BestelldatumBereinigt</strong> im Spaltenprofil: Wie viele Nullwerte entstehen? Das sind die 431 Werte im Slash-Format, die sich nicht eindeutig zuordnen lassen. Setze den Typ der neuen Spalte auf <strong>Datum</strong>. Entferne danach die originale Spalte <strong>Bestelldatum</strong> und benenne <strong>BestelldatumBereinigt</strong> in <strong>Bestelldatum</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Korrigiere <strong>Lieferdatum</strong> direkt auf den Typ <strong>Datum</strong>. Diese Spalte ist durchgängig im Format YYYY-MM-DD. Entstehen Fehler oder nur leere Werte? Was ist der Unterschied zwischen einem Fehler und einem Nullwert in Power Query?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">f</span>
    <span class="pbi-step-text">Wechsle zur Spalte <strong>Einzelpreis</strong>. Versuche den Typ auf <strong>Dezimalzahl</strong> zu setzen. Wie viele Fehler entstehen (225)? Klicke auf einen Fehlerwert und schau dir den Originalwert an. Lösche den Schritt. Bereinige danach mit <strong>Transformieren → Werte ersetzen</strong>: Ersetze <code>,</code> durch <code>.</code>. Setze dann den Typ — wie viele Fehler bleiben?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">g</span>
    <span class="pbi-step-text">Korrigiere die restlichen Spalten: <strong>Menge</strong> auf <strong>Ganzzahl</strong>, <strong>Rabatt</strong> auf <strong>Dezimalzahl</strong>. Setze für <strong>OrderID</strong>, <strong>CustomerID</strong>, <strong>ProductID</strong>, <strong>SalesRepID</strong> den Typ <strong>Text</strong> — IDs werden nie berechnet, sie dienen nur als Schlüssel.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">h</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was würde passieren, wenn <strong>Bestelldatum</strong> als Text im Modell bleibt? Nenne zwei konkrete Auswirkungen auf Berichte und DAX-Berechnungen.</span>
  </div>
</div>

  <strong>b) Beobachtung bei direkter Typ-Änderung Bestelldatum:</strong>
  
  <strong>e) Unterschied Fehler vs. Nullwert:</strong>
  
  <strong>h) Zwei Auswirkungen von Bestelldatum als Text:</strong>
  
  </div>
</div>

---

## Aufgabe 4 — Datenprofiling

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
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
    <span class="pbi-step-text">Power Query profiliert standardmäßig nur die ersten 1.000 Zeilen. Stelle auf das gesamte Dataset um: Klicke in der Statusleiste unten auf den Profilierungsstatus → <strong>Spaltenprofilerstellung basierend auf gesamtem Dataset</strong>. Customers hat 400 Zeilen, der Unterschied ist hier gering — aber bei großen Tabellen entscheidend.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke auf die Spalte <strong>CustomerID</strong> und schau auf das Spaltenprofil unten. Notiere: Wie viele unterschiedliche Werte gibt es? Wie viele eindeutige? Was sagt dir das über Duplikate in dieser Spalte?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wechsle zur Spalte <strong>Segment</strong>. Schau auf die Spaltenverteilung. Notiere die vier Segmentwerte und ihre ungefähre Häufigkeit. (Erwartete Werte: Privatkunde ca. 109, Großkunde ca. 100, KMU ca. 99, Kleinstunternehmen ca. 92)</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>Orders</strong>. Prüfe die Spaltenqualität für <strong>Lieferdatum</strong>. Wie viele leere Werte gibt es (169)? Schau nun gleichzeitig auf die Spalte <strong>Status</strong>. Ist es ein Fehler, dass Lieferdatum leer ist — oder erwartet? Formuliere eine Begründung.</span>
  </div>
</div>
  <strong>d) Segmentwerte und Häufigkeit:</strong>
  
  <strong>e) Leere Werte Lieferdatum — Fehler oder erwartet?</strong>
  
  </div>
</div>

---

## Aufgabe 5 — Entpivotieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Breite Tabelle in normalisierte Struktur umwandeln</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Ziel</span>
  Die Datei <code>monthly_sales_wide.csv</code> hat 12 Monatsspalten nebeneinander (Jan, Feb, Mrz, Apr, Mai, Jun, Jul, Aug, Sep, Okt, Nov, Dez). Power BI und DAX können damit nicht richtig arbeiten. Das Ziel ist eine normalisierte Tabelle mit drei Spalten: <strong>Region</strong>, <strong>Monat</strong> und <strong>Umsatz</strong>.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lade <code>monthly_sales_wide.csv</code> in den Power Query-Editor. Auch hier muss zuerst <strong>Erste Zeile als Überschriften verwenden</strong> ausgeführt werden. Benenne die Abfrage anschließend in <strong>MonatsumsatzBreit</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Markiere die Spalte <strong>Region</strong>. Wähle danach <strong>Transformieren → Andere Spalten entpivotieren</strong>. Power Query pivotiert alle Spalten außer Region um. Das ist einfacher als alle zwölf Monatsspalten manuell zu markieren.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne die entstandene Spalte <strong>Attribut</strong> in <strong>Monat</strong> um und die Spalte <strong>Wert</strong> in <strong>Umsatz</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Setze den Datentyp der Spalte <strong>Umsatz</strong> auf <strong>Dezimalzahl</strong>. Prüfe das Ergebnis: Wie viele Zeilen hat die Tabelle jetzt? Warum ist das die erwartete Anzahl? (5 Regionen × 12 Monate)</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Warum ist die schmale Tabellenstruktur für Power BI besser als die breite? Nenne zwei Gründe.</span>
  </div>
</div>
  <strong>e) Zwei Gründe für normalisierte Struktur:</strong>
  
  </div>
</div>

---

## Aufgabe 6 — Abfragen anfügen (Append)

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">orders.csv und orders_2025.csv zusammenführen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title">Szenario</span>
  Die Bestelldaten für 2025 liegen in einer separaten Datei. Du möchtest beide Dateien zu einer einzigen Orders-Tabelle zusammenführen — ohne die Originaldateien zu verändern.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lade <code>orders_2025.csv</code> in den Power Query-Editor. Führe auch hier zuerst <strong>Erste Zeile als Überschriften verwenden</strong> aus. Benenne die Abfrage in <strong>Orders2025</strong> um. Prüfe die Zeilenzahl: Die Datei enthält 500 Bestellzeilen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wähle die Abfrage <strong>Orders</strong>. Gehe zu <strong>Start → Abfragen anfügen → Abfragen als neu anfügen</strong>. Wähle <strong>Orders</strong> als erste und <strong>Orders2025</strong> als zweite Tabelle.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne die neue kombinierte Abfrage in <strong>OrdersGesamt</strong> um. Prüfe die Zeilenanzahl — sie sollte 3.500 betragen (3.000 + 500). Führe auch hier alle Typ-Korrekturen aus Aufgabe 3 durch: Einzelpreis bereinigen, Typen setzen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Deaktiviere das Laden für die beiden Ursprungsabfragen <strong>Orders</strong> und <strong>Orders2025</strong>: Rechtsklick auf die Abfrage → <strong>Laden aktivieren</strong> deaktivieren. Nur <strong>OrdersGesamt</strong> soll ins Modell geladen werden. Wie viele Zeilen mit leerem Lieferdatum hat OrdersGesamt insgesamt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was ist der Unterschied zwischen "Abfragen anfügen" und "Abfragen zusammenführen"? Wann nutzt du welche Operation?</span>
  </div>
</div>

  </div>
</div>

---

## Aufgabe 7 — M-Code lesen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
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
    <span class="pbi-step-text">Identifiziere den Schritt für die Stadtbereinigung den du in Aufgabe 2a erstellt hast. Wie heißt der Variablenname links vom <code>=</code>? Welche M-Funktion wird verwendet?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Schau auf die letzte Zeile nach <code>in</code>. Welcher Schrittname steht dort? Was bedeutet das für die Auswertung der gesamten Abfrage?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Schließe den Editor mit <strong>Fertig</strong> ohne Änderungen. Beantworte schriftlich: Was passiert, wenn du in der Mitte der Schrittkette einen Schritt löschst, auf den ein späterer Schritt verweist?</span>
  </div>
</div>
  <strong>c) Letzter Schritt nach "in" und seine Bedeutung:</strong>
  
  <strong>d) Konsequenz beim Löschen eines abhängigen Schritts:</strong>
  
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
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Erste Zeile als Überschriften in allen Abfragen gesetzt, Kundenseit umbenannt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Customers bereinigt: Städte normalisiert (33), Firmennamen gekürzt (3), Email-Nulls (15) behandelt, Telefon entfernt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Datentypen in Orders: Bestelldatum per benutzerdefinierter Spalte bereinigt (2.569 konvertiert, 431 null), Einzelpreis-Komma bereinigt (225 Werte), alle Typen gesetzt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Datenprofiling aktiviert, CustomerID geprüft, Segmente dokumentiert, Lieferdatum-Leerstellen begründet</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> monthly_sales_wide.csv entpivotiert (Andere Spalten entpivotieren), 60 Zeilen, korrekt benannt und typisiert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Orders + Orders2025 per Append zusammengeführt, 3.500 Zeilen, Typen gesetzt, Laden der Ursprungsabfragen deaktiviert</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 7</strong> M-Code gelesen und Struktur verstanden</span>
  </div>
</div>
