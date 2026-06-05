# Aufgaben: Daten vorbereiten

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06a · Aufgabenblatt</div>
  <div class="pbi-page-title">Aufgaben: Daten vorbereiten</div>
  <div class="pbi-page-sub">Power Query-Editor · Strukturieren · Bereinigen · Datentypen · Datenprofiling</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Lade für diese Übung vier Dateien in Power BI Desktop: <code>customers.csv</code>, <code>orders.csv</code>, <code>products.csv</code> und <code>suppliers_raw.csv</code>. Wähle bei jeder Datei <strong>Daten transformieren</strong> statt direkt zu laden. Speichere die Datei als <code>uebung_06a.pbix</code>.
</div>

---

## Aufgabe 1 — Customers: Strukturieren und umbenennen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Abfrage benennen, Spalten korrigieren, erste Zeile prüfen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne den Power Query-Editor. Prüfe den Namen der Customers-Abfrage im linken Bereich. Ändere ihn falls nötig auf <strong>Customers</strong> — Rechtsklick → Umbenennen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Die Spalte <strong>Kundenseit</strong> wurde beim CSV-Export abgeschnitten. Benenne sie in <strong>KundeSeit</strong> um. Benenne außerdem <strong>Ansprechpartner</strong> in <strong>Kontaktperson</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Entferne die Spalte <strong>Telefon</strong> — sie wird im Bericht nicht benötigt und hat viele leere Werte. Rechtsklick auf die Spaltenüberschrift → <strong>Entfernen</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Schau in den Bereich <strong>Angewendete Schritte</strong> rechts. Wie viele Schritte hat die Abfrage nach diesen Aktionen? Benenne den Schritt für die Umbenennung in <strong>Spalten umbenannt</strong> um — Rechtsklick auf den Schritt → <strong>Umbenennen</strong>.</span>
  </div>
</div>

  <strong>d) Anzahl angewendeter Schritte:</strong>

  </div>
</div>

---

## Aufgabe 2 — Customers: Datenprofiling aktivieren und lesen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Spaltenqualität, Spaltenverteilung und Spaltenprofil auswerten</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Aktiviere in der Customers-Abfrage alle drei Profilierungsansichten: <strong>Ansicht → Spaltenqualität</strong>, <strong>Spaltenverteilung</strong> und <strong>Spaltenprofil</strong>. Stelle außerdem unten in der Statusleiste auf <strong>Spaltenprofilerstellung basierend auf gesamtem Dataset</strong> um.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Schau auf die Spaltenqualität der Spalte <strong>Email</strong>. Wie viele Zeilen sind leer (grauer Balken)? Was bedeutet das inhaltlich für die Kundendaten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke auf die Spalte <strong>Stadt</strong> und schau auf die Spaltenverteilung. Wie viele unterschiedliche Werte gibt es? Wie viele eindeutige Werte? Was sagt dir der Unterschied?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Klicke auf die Spalte <strong>Segment</strong> und schau auf das Spaltenprofil unten. Welche vier Segmente gibt es und wie verteilen sich die Kunden darauf? Welches Segment hat die meisten Kunden?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Klicke auf die Spalte <strong>KundeSeit</strong>. Was zeigt das Spaltenprofil für Min und Max? Welcher Datentyp wurde automatisch erkannt — ist das korrekt?</span>
  </div>
</div>

  <strong>b) Anzahl leerer Email-Werte und Bedeutung:</strong>
  <br><br>
  <strong>c) Unterschiedliche vs. eindeutige Städte:</strong>
  <br><br>
  <strong>d) Segment mit den meisten Kunden:</strong>
  <br><br>
  <strong>e) Datentyp KundeSeit korrekt?</strong>

  </div>
</div>

---

## Aufgabe 3 — Customers: Daten bereinigen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Städte normalisieren, NULL-Werte behandeln, Duplikate prüfen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Die Spalte <strong>Stadt</strong> enthält Städtenamen in Großbuchstaben (z.B. LÜBECK, DORTMUND). Normalisiere sie: Markiere die Spalte → <strong>Transformieren → Format → Erste Buchstaben groß</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe die Spalte <strong>Stadt</strong> nach der Normalisierung mit Spaltenverteilung. Hat sich die Anzahl unterschiedlicher Werte verändert gegenüber Aufgabe 2c? Was schließt du daraus?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Behandle die NULL-Werte in der Spalte <strong>Email</strong>: Rechtsklick auf die Spalte → <strong>Werte ersetzen</strong>. Ersetze <code>null</code> durch einen leeren Text (Feld leer lassen). Warum ist diese Variante besser als das Entfernen der Zeilen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wende auf die Spalte <strong>Stadt</strong> zusätzlich <strong>Transformieren → Format → Kürzen</strong> an. Warum ist das auch nach dem Normalisieren noch sinnvoll?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Prüfe die Spalte <strong>CustomerID</strong> mit Spaltenverteilung. Sind alle Werte eindeutig? Was würde es bedeuten wenn sie es nicht wären?</span>
  </div>
</div>

  <strong>b) Veränderung der unterschiedlichen Stadtanzahl und Schluss:</strong>
  <br><br>
  <strong>c) Warum NULL durch leer statt Zeile entfernen:</strong>
  <br><br>
  <strong>d) Warum Kürzen nach Normalisieren sinnvoll:</strong>
  <br><br>
  <strong>e) CustomerID eindeutig?</strong>

  </div>
</div>

---

## Aufgabe 4 — Customers: Datentypen korrigieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Datentypen prüfen und gezielt korrigieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Schau auf die Typsymbole aller Spalten in der Customers-Abfrage. Notiere welche Spalten als Text erkannt wurden, die eigentlich einen anderen Typ haben sollten.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ändere den Datentyp der Spalte <strong>KundeSeit</strong> auf <strong>Datum</strong>: Klick auf das Typsymbol links neben der Spaltenüberschrift → <strong>Datum</strong>. Welcher neue Schritt erscheint in den angewendeten Schritten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Ändere den Typ der Spalte <strong>PLZ</strong> auf <strong>Text</strong> falls sie als Zahl erkannt wurde. Begründe warum PLZ als Text behandelt werden sollte und nicht als Zahl.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Beantworte: Welche Auswirkungen hätte es wenn <strong>KundeSeit</strong> als Text im Modell bliebe? Nenne zwei konkrete Konsequenzen.</span>
  </div>
</div>

  <strong>a) Spalten mit falschem Typ:</strong>
  <br><br>
  <strong>b) Name des neuen Schritts:</strong>
  <br><br>
  <strong>c) Warum PLZ als Text:</strong>
  <br><br>
  <strong>d) Zwei Konsequenzen bei KundeSeit als Text:</strong>

  </div>
</div>

---

## Aufgabe 5 — Orders: Strukturieren und Datentypen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Orders-Abfrage prüfen, Datentypen setzen, Profiling auswerten</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>Orders</strong>. Aktiviere die Profilierungsansichten falls sie nicht noch aktiv sind. Wie viele Zeilen hat die Tabelle? Wie viele Spalten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Prüfe die Spaltenqualität aller Spalten. Gibt es Fehler (gelber Balken) oder leere Werte (grauer Balken) in irgendeiner Spalte? Notiere die betroffenen Spalten.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze den Datentyp von <strong>Bestelldatum</strong> und <strong>Lieferdatum</strong> auf <strong>Datum</strong>. Setze den Typ von <strong>Menge</strong> auf <strong>Ganze Zahl</strong>, <strong>Einzelpreis</strong> und <strong>Rabatt</strong> auf <strong>Dezimalzahl</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Schau auf die Spaltenverteilung von <strong>Status</strong>. Welche vier Statuswerte gibt es? Schau auf <strong>Kanal</strong>: Welche Vertriebskanäle sind vorhanden?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Schau auf die Spaltenverteilung von <strong>Rabatt</strong>. Wie viele verschiedene Rabattstufen gibt es? Welche Stufen sind das? Sind alle Werte plausibel?</span>
  </div>
</div>

  <strong>a) Zeilenanzahl und Spaltenanzahl Orders:</strong>
  <br><br>
  <strong>b) Spalten mit Fehlern oder leeren Werten:</strong>
  <br><br>
  <strong>d) Status- und Kanalwerte:</strong>
  <br><br>
  <strong>e) Rabattstufen:</strong>

  </div>
</div>

---

## Aufgabe 6 — suppliers_raw: Vollständige Bereinigung

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">suppliers_raw von Grund auf bereinigen: Struktur, Fehler, Typen, Duplikate</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Die Datei <code>suppliers_raw.csv</code> wurde direkt aus einem Altsystem exportiert. Sie enthält inkonsistente Schreibweisen, technische Spaltennamen, einen Textwert in einer Zahlenspalte und mögliche Duplikate. Ziel ist eine saubere <strong>Lieferanten</strong>-Tabelle.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Benenne die Abfrage in <strong>Lieferanten</strong> um. Aktiviere alle Profilierungsansichten. Notiere was dir sofort auffällt: Welche Spalten haben Qualitätsprobleme?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Benenne alle Spalten mit beschreibenden deutschen Namen um: <em>LiefNr → LieferantID</em>, <em>lieferant_name → Lieferant</em>, <em>KATEGORIE → Kategorie</em>, <em>email_adresse → Email</em>, <em>tel → Telefon</em>, <em>aktiv_ja_nein → Aktiv</em>, <em>aufgenommen_am → Aufgenommen am</em>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Setze den Datentyp der Spalte <strong>Einkaufspreis</strong> auf <strong>Dezimalzahl</strong>. Was passiert mit der Zeile L008 die den Text "NULL" enthält? Behandle den entstandenen Fehler: Rechtsklick auf die Spalte → <strong>Fehler ersetzen</strong> → Wert 0 eingeben. Begründe diese Entscheidung.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Normalisiere die Spalte <strong>Kategorie</strong>: <strong>Transformieren → Format → Erste Buchstaben groß</strong>. Prüfe danach die Spaltenverteilung: Wie viele verschiedene Kategorien gibt es jetzt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Schau auf die Spaltenverteilung von <strong>Lieferant</strong>: unterschiedlich vs. eindeutig. Was fällt auf? Rechtsklick auf die Abfrage im linken Bereich → <strong>Kopieren</strong>. Benenne die Kopie <strong>Lieferanten_Backup</strong>. Entferne jetzt in der Original-Abfrage Duplikate über die Spalte <strong>Lieferant</strong>: Rechtsklick → <strong>Duplikate entfernen</strong>. Wie viele Zeilen bleiben?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">f</span>
    <span class="pbi-step-text">Setze den Datentyp von <strong>Aufgenommen am</strong> auf <strong>Datum</strong>. Entferne die Spalte <strong>Telefon</strong> — inkonsistente Formate, nicht benötigt. Ändere außerdem den Typ der Spalte <strong>Einkaufspreis</strong> auf Dezimalzahl falls noch nicht geschehen.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">g</span>
    <span class="pbi-step-text">Beantworte schriftlich: Du hast in Teilaufgabe e L006 und L014 (Netzwerk Profis KG mit unterschiedlichen Preisen) als Duplikat behandelt. War das inhaltlich korrekt? Was hätte man vorher klären müssen?</span>
  </div>
</div>

  <strong>a) Auffällige Qualitätsprobleme:</strong>
  <br><br>
  <strong>c) Was passiert mit L008 und Begründung für 0:</strong>
  <br><br>
  <strong>d) Anzahl Kategorien nach Normalisierung:</strong>
  <br><br>
  <strong>e) Zeilenanzahl nach Duplikate entfernen:</strong>
  <br><br>
  <strong>g) War Duplikatentfernung inhaltlich korrekt?</strong>

  </div>
</div>

---

## Aufgabe 7 — Products: Ausfüllen und Namenskonventionen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Produkttabelle prüfen, Ausfüllen demonstrieren, Namenskonventionen anwenden</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Wechsle zur Abfrage <strong>Products</strong>. Prüfe mit Profiling: Gibt es leere Werte, Fehler oder Duplikate in irgendeiner Spalte? Notiere den Befund.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Die Spalte <strong>Aktiv</strong> enthält die Werte <em>Ja</em> und <em>Nein</em>. Ersetze <em>Nein</em> durch <em>Inaktiv</em> und <em>Ja</em> durch <em>Aktiv</em> — <strong>Transformieren → Werte ersetzen</strong>. Warum sind die Bezeichnungen <em>Aktiv</em> und <em>Inaktiv</em> im Bericht besser als <em>Ja</em> und <em>Nein</em>?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Simuliere das Ausfüllen-Szenario: Ersetze in der Spalte <strong>Kategorie</strong> den Wert <em>Hardware</em> durch NULL (<strong>Werte ersetzen</strong>, Ersatzwert leer lassen). Wende dann <strong>Ausfüllen → Nach unten</strong> an. Was passiert? Mache beide Schritte danach rückgängig.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Setze den Datentyp von <strong>Listenpreis</strong> auf <strong>Dezimalzahl</strong>. Prüfe das Spaltenprofil: Was sind Min und Max des Listenpreises?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Wende die Namenskonventionen an: Überprüfe alle vier Abfragen (Customers, Orders, Products, Lieferanten) auf technische Präfixe, Unterstriche und abgekürzte Namen. Gibt es noch Spalten die gegen die Konventionen verstoßen? Liste sie auf.</span>
  </div>
</div>

  <strong>a) Befund Products Profiling:</strong>
  <br><br>
  <strong>b) Warum Aktiv/Inaktiv besser als Ja/Nein:</strong>
  <br><br>
  <strong>c) Was passiert beim Ausfüllen nach unten:</strong>
  <br><br>
  <strong>d) Min und Max Listenpreis:</strong>
  <br><br>
  <strong>e) Verstöße gegen Namenskonventionen:</strong>

  </div>
</div>

---

## Aufgabe 8 — Abschluss: Laden konfigurieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">8</span>
    <span class="pbi-task-title">Backup-Abfrage deaktivieren und alles laden</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Rechtsklick auf die Abfrage <strong>Lieferanten_Backup</strong> → <strong>Laden aktivieren</strong> deaktivieren. Die Abfrage erscheint kursiv. Warum soll sie im Modell nicht sichtbar sein?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Klicke <strong>Start → Schließen und übernehmen</strong>. Prüfe in der Feldliste rechts: Welche Tabellen sind geladen? Ist Lieferanten_Backup sichtbar?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Beantworte schriftlich: Was ist der Unterschied zwischen einer Abfrage die nicht geladen wird und einer Abfrage die gelöscht wird?</span>
  </div>
</div>

  <strong>a) Warum Backup nicht ins Modell laden:</strong>
  <br><br>
  <strong>b) Geladene Tabellen in der Feldliste:</strong>
  <br><br>
  <strong>c) Nicht laden vs. löschen:</strong>

  </div>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Customers umbenannt, Telefon entfernt, Schritte benannt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Alle drei Profilierungsansichten aktiviert und ausgewertet</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Städte normalisiert, NULL-Email ersetzt, Kürzen angewendet</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 4</strong> KundeSeit auf Datum, PLZ auf Text gesetzt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Orders profiliert, alle Datentypen korrekt gesetzt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 6</strong> suppliers_raw vollständig bereinigt, Duplikate behandelt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Products bereinigt, Ausfüllen demonstriert, Namenskonventionen geprüft</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 8</strong> Backup deaktiviert, alle Tabellen geladen</span></div>
</div>
