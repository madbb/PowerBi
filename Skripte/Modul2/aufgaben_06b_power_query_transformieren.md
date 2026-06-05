# Aufgaben: Daten erweitern und kombinieren

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06b · Aufgabenblatt</div>
  <div class="pbi-page-title">Aufgaben: Daten erweitern und kombinieren</div>
  <div class="pbi-page-sub">Neue Spalten · Gruppieren · Transponieren · Append · Merge · Verweis und Duplikat</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Öffne die Datei <code>uebung_06a.pbix</code> aus dem vorherigen Aufgabenblatt. Alle Abfragen sind bereits geladen und bereinigt. Öffne den Power Query-Editor über <strong>Start → Daten transformieren</strong>. Lade zusätzlich <code>monthly_sales_wide.csv</code> und <code>orders_2025.csv</code> — wähle jeweils <strong>Daten transformieren</strong>.
</div>

---

## Aufgabe 1 — Orders: Benutzerdefinierte Spalte Umsatz

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Nettoumsatz pro Bestellung berechnen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Orders-Tabelle enthält Menge, Einzelpreis und Rabatt als separate Spalten. Der tatsächliche Umsatz pro Bestellung ist noch nicht berechnet. Er ergibt sich aus: Menge mal Einzelpreis mal (1 minus Rabatt).
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Orders</strong>. Gehe zu <strong>Spalte hinzufügen → Benutzerdefinierte Spalte</strong>. Name: <strong>Umsatz</strong>. Formel: <code>[Menge] * [Einzelpreis] * (1 - [Rabatt])</code>. Setze den Typ der neuen Spalte auf <strong>Dezimalzahl</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe das Spaltenprofil von <strong>Umsatz</strong>: Was sind Min, Max und Durchschnitt? Sind die Werte plausibel?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge eine zweite benutzerdefinierte Spalte <strong>Rabattbetrag</strong> hinzu: <code>[Menge] * [Einzelpreis] * [Rabatt]</code>. Das ist der einbehaltene Rabatt in Euro. Setze Typ auf Dezimalzahl.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Du könntest den Umsatz auch als DAX-Measure berechnen statt als Power Query-Spalte. Welche Variante ist für diesen Fall besser und warum?</span>
  </div>
</div>

  <strong>b) Min, Max, Durchschnitt Umsatz:</strong>
  <br><br>
  <strong>d) Power Query-Spalte vs. DAX-Measure:</strong>

  </div>
</div>

---

## Aufgabe 2 — Orders: Bedingte Spalte Rabattklasse

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Rabattstufen in lesbare Kategorien übersetzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne <strong>Spalte hinzufügen → Bedingte Spalte</strong>. Name: <strong>Rabattklasse</strong>. Konfiguriere folgende Bedingungen:<br>
    — Wenn <em>Rabatt</em> gleich 0 → <em>Kein Rabatt</em><br>
    — Wenn <em>Rabatt</em> kleiner oder gleich 0.1 → <em>Niedrig</em><br>
    — Wenn <em>Rabatt</em> kleiner oder gleich 0.2 → <em>Mittel</em><br>
    — Sonst → <em>Hoch</em></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe die Spaltenverteilung von <strong>Rabattklasse</strong>: Welche Klasse kommt am häufigsten vor? Stimmt das mit der Verteilung der Rabatt-Werte aus Aufgabe 5e des ersten Blatts überein?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Öffne den erweiterten Editor. Suche den Schritt der die Rabattklasse erzeugt. Welche M-Funktion steht rechts vom <code>=</code>? Schreibe sie auf.</span>
  </div>
</div>

  <strong>b) Häufigste Rabattklasse:</strong>
  <br><br>
  <strong>c) M-Funktion für bedingte Spalte:</strong>

  </div>
</div>

---

## Aufgabe 3 — Orders: Bedingte Spalte Lieferstatus

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Lieferdauer berechnen und kategorisieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Logistik möchte wissen ob Bestellungen schnell, normal oder langsam geliefert wurden. Die Lieferdauer ergibt sich aus Lieferdatum minus Bestelldatum.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge eine benutzerdefinierte Spalte <strong>Lieferdauer_Tage</strong> hinzu: <code>Duration.Days([Lieferdatum] - [Bestelldatum])</code>. Setze Typ auf <strong>Ganze Zahl</strong>. Prüfe Min und Max im Spaltenprofil.<br><br><em>Hinweis zur Formel:</em> <code>Duration.Days()</code> ist eine M-Funktion die eine Zeitspanne in Tage umrechnet. Die Subtraktion zweier Datumswerte ergibt in M automatisch eine Zeitspanne. Diese Funktion wird in Skript 06c ausführlich behandelt — hier reicht es, die Formel zu übernehmen und das Ergebnis zu prüfen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Füge eine bedingte Spalte <strong>Liefergeschwindigkeit</strong> hinzu:<br>
    — Wenn <em>Lieferdauer_Tage</em> kleiner oder gleich 3 → <em>Schnell</em><br>
    — Wenn <em>Lieferdauer_Tage</em> kleiner oder gleich 7 → <em>Normal</em><br>
    — Sonst → <em>Langsam</em></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wie verteilen sich die drei Kategorien? Welcher Anteil der Bestellungen wird als Schnell geliefert?</span>
  </div>
</div>

  <strong>a) Min und Max Lieferdauer:</strong>
  <br><br>
  <strong>c) Verteilung Liefergeschwindigkeit:</strong>

  </div>
</div>

---

## Aufgabe 4 — monthly_sales_wide: Entpivotieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Kreuztabelle in normalisierte Struktur umwandeln</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Datei <code>monthly_sales_wide.csv</code> hat 5 Zeilen (Regionen) und 12 Monatsspalten. DAX kann nicht nach Monat filtern weil Monate keine Werte sondern Spaltenüberschriften sind. Die Tabelle muss normalisiert werden.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>monthly_sales_wide</strong>. Benenne sie in <strong>MonatsumsatzLang</strong> um. Beschreibe die aktuelle Struktur: Wie viele Zeilen, wie viele Spalten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Markiere nur die Spalte <strong>Region</strong>. Wähle <strong>Transformieren → Andere Spalten entpivotieren</strong>. Alle 12 Monatsspalten werden entpivotiert.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne die Spalte <strong>Attribut</strong> in <strong>Monat</strong> und <strong>Wert</strong> in <strong>Umsatz</strong> um. Setze den Typ von <strong>Umsatz</strong> auf <strong>Dezimalzahl</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wie viele Zeilen hat die Tabelle jetzt? Rechne nach: Ausgangszeilen × entpivotierte Spalten = Erwartetes Ergebnis. Stimmt die Rechnung?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte: Warum kann ein Datenschnitt auf <strong>Monat</strong> jetzt funktionieren, in der ursprünglichen breiten Struktur aber nicht?</span>
  </div>
</div>

  <strong>a) Ausgangsstruktur Zeilen und Spalten:</strong>
  <br><br>
  <strong>d) Zeilenanzahl nach Entpivotieren und Rechenweg:</strong>
  <br><br>
  <strong>e) Warum Datenschnitt auf Monat jetzt möglich:</strong>

  </div>
</div>

---

## Aufgabe 5 — salesreps: Transponieren und Namen zusammensetzen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Transponieren demonstrieren, Vollständigen Namen als neue Spalte</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lade die Datei <strong>lieferant_transponiert.csv</strong> in Power Query — nur diese Aufgabe, danach wird sie wieder entfernt. Beschreibe die Struktur: Wie viele Spalten, wie viele Zeilen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wende <strong>Transformieren → Transponieren</strong> an. Was passiert mit Zeilen und Spalten? Wende danach <strong>Erste Zeile als Überschriften verwenden</strong> an.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Deaktiviere das Laden dieser Abfrage (Rechtsklick → <strong>Laden aktivieren</strong> deaktivieren). Sie diente nur zur Demonstration.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>Salesreps</strong>. Füge eine benutzerdefinierte Spalte <strong>Name_Voll</strong> hinzu: <code>[Vorname] & " " & [Nachname]</code>. Setze Typ auf <strong>Text</strong>. Prüfe das Ergebnis für die ersten fünf Zeilen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte: In welchem realen Szenario wäre Transponieren notwendig? Nenne einen konkreten Fall aus der Praxis.</span>
  </div>
</div>

  <strong>a) Struktur lieferant_transponiert vor Transponieren:</strong>
  <br><br>
  <strong>b) Struktur nach Transponieren:</strong>
  <br><br>
  <strong>e) Reales Szenario für Transponieren:</strong>

  </div>
</div>

---

## Aufgabe 6 — Orders: Gruppieren nach Kanal und Status

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Aggregierte Übersicht per Gruppieren erstellen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf <strong>Orders</strong> → <strong>Verweis</strong>. Benenne die neue Abfrage <strong>Orders_KanalSummary</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wähle <strong>Start → Gruppieren nach → Erweitert</strong>. Gruppiere nach: <strong>Kanal</strong>. Füge folgende Aggregationen hinzu:<br>
    — <em>Anzahl_Bestellungen</em>: Zeilenanzahl<br>
    — <em>Gesamtumsatz</em>: Summe auf <em>Umsatz</em><br>
    — <em>Durchschnitt_Rabatt</em>: Durchschnitt auf <em>Rabatt</em></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze <strong>Gesamtumsatz</strong> und <strong>Durchschnitt_Rabatt</strong> auf Typ Dezimalzahl. Welcher Kanal hat den höchsten Gesamtumsatz? Welcher hat den niedrigsten Durchschnittsrabatt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Erstelle eine zweite gruppierte Abfrage: Rechtsklick auf <strong>Orders</strong> → <strong>Verweis</strong> → benenne sie <strong>Orders_StatusSummary</strong>. Gruppiere nach <strong>Status</strong>, Aggregation: Zeilenanzahl als <em>Anzahl</em> und Summe auf <em>Umsatz</em> als <em>Gesamtumsatz</em>. Welcher Status hat den höchsten Gesamtumsatz?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte: Warum hast du für diese Aggregationen jeweils einen <strong>Verweis</strong> auf Orders erstellt statt die Originaltabelle zu verändern?</span>
  </div>
</div>

  <strong>c) Kanal mit höchstem Umsatz und niedrigstem Rabatt:</strong>
  <br><br>
  <strong>d) Status mit höchstem Gesamtumsatz:</strong>
  <br><br>
  <strong>e) Warum Verweis statt Original ändern:</strong>

  </div>
</div>

---

## Aufgabe 7 — Append: Alle Bestellungen zusammenführen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">orders.csv und orders_2025.csv anfügen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Prüfe die Abfrage <strong>orders_2025</strong>: Hat sie dieselben Spalten wie <strong>Orders</strong>? Prüfe Spaltenanzahl und Spaltennamen. Was ist die Voraussetzung damit Append korrekt funktioniert?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Setze für <strong>orders_2025</strong> dieselben Datentypen wie in Orders (Bestelldatum/Lieferdatum als Datum, Menge als Ganze Zahl, Einzelpreis/Rabatt als Dezimalzahl). Füge auch die berechneten Spalten <strong>Umsatz</strong>, <strong>Rabattklasse</strong> und <strong>Liefergeschwindigkeit</strong> hinzu — identische Formeln wie in Orders.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text"><strong>Start → Abfragen anfügen → Abfragen als neu anfügen</strong>. Wähle <strong>Orders</strong> und <strong>orders_2025</strong>. Benenne die neue Abfrage <strong>Bestellungen_Gesamt</strong>. Wie viele Zeilen hat sie?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Deaktiviere das Laden für <strong>Orders</strong> und <strong>orders_2025</strong> — nur <strong>Bestellungen_Gesamt</strong> soll ins Modell. Warum ist das sinnvoll?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte: Append entspricht SQL UNION ALL — nicht UNION. Was ist der Unterschied? Was würde UNION in diesem Fall anders machen?</span>
  </div>
</div>

  <strong>a) Voraussetzung für korrekten Append:</strong>
  <br><br>
  <strong>c) Zeilenanzahl Bestellungen_Gesamt:</strong>
  <br><br>
  <strong>e) UNION ALL vs. UNION:</strong>

  </div>
</div>

---

## Aufgabe 8 — Merge: Kundendaten an Bestellungen anfügen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">8</span>
    <span class="pbi-task-title">Bestellungen mit Kundendaten per linkem äußerem Join verknüpfen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf <strong>Bestellungen_Gesamt</strong> → <strong>Verweis</strong>. Benenne die neue Abfrage <strong>Bestellungen_Mit_Kunden</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text"><strong>Start → Abfragen zusammenführen → Als neue Abfrage zusammenführen</strong>. Linke Tabelle: <strong>Bestellungen_Mit_Kunden</strong>, Schlüssel: <strong>CustomerID</strong>. Rechte Tabelle: <strong>Customers</strong>, Schlüssel: <strong>CustomerID</strong>. Join-Typ: <strong>Linker äußerer Join</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Expandiere die neue Table-Spalte. Wähle nur <strong>Firma</strong>, <strong>Segment</strong> und <strong>Region</strong> aus Customers. Deaktiviere das Präfix-Kontrollkästchen. Benenne die Abfrage <strong>Bestellungen_Detail</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Prüfe die Spaltenqualität von <strong>Firma</strong> nach dem Expandieren. Gibt es NULL-Werte? Was würde das bedeuten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte: Du hast einen linken äußeren Join gewählt. Was wäre das Ergebnis gewesen wenn du stattdessen einen <strong>inneren Join</strong> verwendet hättest? Wann wäre der innere Join die bessere Wahl?</span>
  </div>
</div>

  <strong>d) NULL-Werte in Firma und Bedeutung:</strong>
  <br><br>
  <strong>e) Unterschied innerer Join vs. linker äußerer Join hier:</strong>

  </div>
</div>

---

## Aufgabe 9 — Verweis vs. Duplikat: Unterschied erleben

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">9</span>
    <span class="pbi-task-title">Verhalten von Verweis und Duplikat bei Änderungen vergleichen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf <strong>Customers</strong> → <strong>Verweis</strong>. Benenne ihn <strong>Customers_Verweis</strong>. Rechtsklick auf <strong>Customers</strong> → <strong>Duplizieren</strong>. Benenne die Kopie <strong>Customers_Duplikat</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Gehe zur Abfrage <strong>Customers</strong>. Filtere die Spalte <strong>Region</strong> auf nur <em>Nord</em>. Wechsle zu <strong>Customers_Verweis</strong>: Wie viele Zeilen hat er? Wechsle zu <strong>Customers_Duplikat</strong>: Wie viele Zeilen hat er?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lösche den Filter in <strong>Customers</strong> wieder — den Schritt aus den angewendeten Schritten entfernen. Prüfe erneut Verweis und Duplikat.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was hast du beobachtet? Erkläre den Unterschied in eigenen Worten und nenne je einen konkreten Einsatzfall für Verweis und Duplikat.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Deaktiviere das Laden für <strong>Customers_Verweis</strong>, <strong>Customers_Duplikat</strong>, <strong>Orders_KanalSummary</strong> und <strong>Orders_StatusSummary</strong> — diese Abfragen bleiben als Zwischenschritte vorhanden aber landen nicht im Modell.</span>
  </div>
</div>

  <strong>b) Zeilen Customers_Verweis nach Filter:</strong>
  <br><br>
  <strong>b) Zeilen Customers_Duplikat nach Filter:</strong>
  <br><br>
  <strong>d) Unterschied und Einsatzfälle:</strong>

  </div>
</div>

---

## Aufgabe 10 — Abschluss: Laden konfigurieren und speichern

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">10</span>
    <span class="pbi-task-title">Alle Abfragen prüfen und das Modell laden</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Liste alle Abfragen auf die aktuell im Power Query-Editor vorhanden sind. Trenne sie in zwei Gruppen: <em>Soll geladen werden</em> und <em>Zwischenabfrage / deaktiviert</em>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Klicke <strong>Schließen und übernehmen</strong>. Prüfe die Feldliste: Welche Tabellen sind sichtbar? Stimmt das mit deiner Liste aus a überein?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Speichere als <code>uebung_06b.pbix</code>.</span>
  </div>
</div>

  <strong>a) Abfragen zum Laden und Zwischenabfragen:</strong>

  </div>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Umsatz und Rabattbetrag als benutzerdefinierte Spalten berechnet</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Rabattklasse als bedingte Spalte erstellt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Lieferdauer berechnet und Liefergeschwindigkeit kategorisiert</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 4</strong> monthly_sales_wide entpivotiert zu MonatsumsatzLang</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Transponieren demonstriert, Name_Voll in Salesreps erstellt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Orders nach Kanal und Status gruppiert und aggregiert</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 7</strong> orders und orders_2025 per Append zu Bestellungen_Gesamt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 8</strong> Merge Bestellungen mit Customers, Kundendaten expandiert</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 9</strong> Verweis vs. Duplikat live erlebt und erklärt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 10</strong> Laden konfiguriert, Modell gespeichert als uebung_06b.pbix</span></div>
</div>
