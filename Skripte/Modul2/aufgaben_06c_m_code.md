# Aufgaben: M-Code verstehen und anwenden

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 06c · Aufgabenblatt</div>
  <div class="pbi-page-title">Aufgaben: M-Code verstehen und anwenden</div>
  <div class="pbi-page-sub">Erweiterter Editor · Schritte lesen · Code anpassen · Fehler beheben · each und _</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Öffne die Datei <code>uebung_06b.pbix</code>. Alle Abfragen aus den vorherigen Blättern sind vorhanden. Diese Aufgaben finden ausschließlich im erweiterten Editor statt — <strong>Ansicht → Erweiterter Editor</strong>. Für Aufgaben mit suppliers_raw: Die Abfrage <strong>Lieferanten</strong> ist bereits bereinigt geladen.
</div>

---

## Aufgabe 1 — Struktur lesen: let und in

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">M-Code der Customers-Abfrage vollständig lesen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Customers</strong> im erweiterten Editor. Zähle: Wie viele Schritte stehen zwischen <code>let</code> und <code>in</code>? Schreibe alle Schrittnamen auf.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Welcher Schritt steht nach <code>in</code>? Warum ist das immer der letzte Schritt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Suche den Schritt der die Städte normalisiert hat. Welche M-Funktion steht rechts vom <code>=</code>? Welchen Schrittnamen nimmt er als Eingabe?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Suche den Schritt für den Datentyp von KundeSeit. Welches M-Schlüsselwort steht für den Typ Datum? Schreibe den vollständigen Ausdruck für diesen Schritt ab.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Hat der letzte Schritt ein Komma am Ende? Haben alle anderen Schritte ein Komma? Was würde passieren wenn du das Komma des letzten Schritts hinzufügst?</span>
  </div>
</div>

  <strong>a) Anzahl Schritte und alle Schrittnamen:</strong>
  <br><br>
  <strong>b) Schritt nach "in" und Begründung:</strong>
  <br><br>
  <strong>c) M-Funktion für Städte-Normalisierung:</strong>
  <br><br>
  <strong>d) M-Schlüsselwort für Datum und vollständiger Ausdruck:</strong>
  <br><br>
  <strong>e) Komma-Regel und Konsequenz bei Verstoß:</strong>

  </div>
</div>

---

## Aufgabe 2 — GUI vs. Code: Schritt für Schritt beobachten

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Jeden Klick im erweiterten Editor nachverfolgen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Erstelle eine neue leere Abfrage und führe jeden Schritt zuerst per GUI aus — dann öffne sofort den erweiterten Editor und lies den neu entstandenen Code.
</div>

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Lieferanten</strong> im linken Bereich. Rechtsklick → <strong>Verweis</strong>. Benenne den neu entstandenen Verweis in <strong>Lieferanten_CodeUebung</strong> um. Öffne den erweiterten Editor dieser neuen Abfrage: Welche Schritte hat der Code? Warum sind es mehr als nur einer?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ändere per GUI den Datentyp von <strong>Einkaufspreis</strong> auf Dezimalzahl. Öffne sofort danach den erweiterten Editor. Welcher neue Schritt wurde ergänzt? Schreibe ihn vollständig ab. Welches M-Schlüsselwort steht für Dezimalzahl?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Benenne per GUI die Spalte <strong>LiefNr</strong> in <strong>LieferantID</strong> um. Öffne den erweiterten Editor. Welche Funktion erscheint? Wie sieht die Liste der umbenannten Spalten im Code aus?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Filtere per GUI die Spalte <strong>aktiv_ja_nein</strong> auf nur <em>ja</em>. Öffne den erweiterten Editor. Schreibe den <code>Table.SelectRows</code>-Ausdruck vollständig ab. Was bedeutet <code>each</code> in diesem Kontext?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Entferne per GUI die Spalte <strong>tel</strong>. Öffne den erweiterten Editor. Welche Funktion steht für das Entfernen einer Spalte? Wie viele Schritte hat der Code jetzt insgesamt?</span>
  </div>
</div>

  <strong>a) Zwei automatische Schritte beim Laden:</strong>
  <br><br>
  <strong>b) Neuer Schritt für Datentyp und M-Schlüsselwort für Dezimalzahl:</strong>
  <br><br>
  <strong>c) Funktion für Umbenennen und Code-Ausschnitt:</strong>
  <br><br>
  <strong>d) SelectRows-Ausdruck und Bedeutung von each:</strong>
  <br><br>
  <strong>e) Funktion für Spalte entfernen und Gesamtanzahl Schritte:</strong>

  </div>
</div>

---

## Aufgabe 3 — Direktanpassung: Code gezielt bearbeiten

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Änderungen direkt im erweiterten Editor vornehmen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Lieferanten_CodeUebung</strong> im erweiterten Editor. Suche den Schritt mit <code>Table.RenameColumns</code>. Füge direkt im Code ein zweites Umbenennungspaar hinzu: <code>{"lieferant_name", "Lieferant"}</code>. Klicke Fertig. Hat das geklappt ohne Fehlermeldung?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Öffne den erweiterten Editor der Abfrage <strong>Lieferanten_CodeUebung</strong> erneut. Suche die Zeile mit <code>File.Contents</code>. Ändere den Pfad auf <code>"C:\Test\suppliers_raw.csv"</code>. Klicke Fertig. Was passiert? Ändere den Pfad zurück auf den richtigen Wert.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Öffne den erweiterten Editor. Ändere den Filter-Ausdruck von <code>[aktiv_ja_nein] = "ja"</code> auf <code>[Einkaufspreis] > 100</code>. Klicke Fertig. Wie viele Zeilen zeigt die Tabelle jetzt? Ändere zurück auf den ursprünglichen Filter.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Benenne direkt im Code den Schritt <code>#"Gefilterte Zeilen"</code> in <code>NurAktive</code> um. Das bedeutet: Den Namen an der Definition ändern UND alle Stellen wo er referenziert wird. Klicke Fertig. Hat es funktioniert?</span>
  </div>
</div>

  <strong>a) Zusätzliches Umbenennungspaar erfolgreich eingefügt?</strong>
  <br><br>
  <strong>b) Was passiert bei falschem Pfad:</strong>
  <br><br>
  <strong>c) Zeilenanzahl nach Filteränderung auf Einkaufspreis > 100:</strong>
  <br><br>
  <strong>d) Schritt erfolgreich umbenannt?</strong>

  </div>
</div>

---

## Aufgabe 4 — each und _ lesen und anwenden

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Filterausdrücke mit each interpretieren und anpassen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lies folgende M-Ausdrücke und erkläre in eigenen Worten was jeder macht:<br><br>
    <code>Table.SelectRows(tabelle, each [Region] = "Nord")</code><br><br>
    <code>Table.SelectRows(tabelle, each [Umsatz] > 500 and [Status] = "Abgeschlossen")</code><br><br>
    <code>Table.TransformColumns(tabelle, {{"Stadt", each Text.Upper(_)}})</code></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Bestellungen_Gesamt</strong> im erweiterten Editor. Suche einen Schritt der <code>each</code> verwendet. Schreibe ihn ab und erkläre was er macht.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge im erweiterten Editor von <strong>Bestellungen_Gesamt</strong> direkt vor dem <code>in</code> einen neuen Schritt ein. Schau zuerst auf den Namen des letzten Schritts in der Kette — er steht nach <code>in</code> am Ende des Codes. Füge dann diese Zeile ein (ersetze <em>LETZTER_SCHRITT</em> durch den tatsächlichen Namen):<br>
    <code>NurAbgeschlossen = Table.SelectRows(LETZTER_SCHRITT, each [Status] = "Abgeschlossen"),</code><br>
    Ändere danach auch den <code>in</code>-Verweis auf <code>NurAbgeschlossen</code>. Beachte: Vor <code>NurAbgeschlossen</code> muss ein Komma stehen, nach <code>NurAbgeschlossen</code> nicht. Wie viele Zeilen bleiben?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Mache den neuen Schritt rückgängig — den Schritt <code>NurAbgeschlossen</code> und die Änderung beim <code>in</code>-Verweis zurücksetzen. Beantworte: Was ist der Unterschied zwischen <code>[Spaltenname]</code> und <code>_</code> in einem <code>each</code>-Ausdruck?</span>
  </div>
</div>

  <strong>a) Erklärung der drei Ausdrücke:</strong>
  <br><br>
  <strong>b) Gefundener each-Schritt und Erklärung:</strong>
  <br><br>
  <strong>c) Zeilenanzahl nach Filter auf Abgeschlossen:</strong>
  <br><br>
  <strong>d) Unterschied [Spaltenname] vs. _:</strong>

  </div>
</div>

---

## Aufgabe 5 — Einen unbekannten Code-Block lesen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Fremden M-Code von unten nach oben interpretieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-szenario">
  <span class="pbi-admonition-title"> Szenario</span>
  Du bekommst den folgenden M-Code aus einem fremden Projekt. Lies ihn und beantworte die Fragen darunter — ohne ihn auszuführen.
</div>

```
let
    Quelle = Csv.Document(
        File.Contents("C:\Daten\orders_export.csv"),
        [Delimiter=";", Encoding=65001]
    ),
    Kopfzeile = Table.PromoteHeaders(Quelle),
    Typen = Table.TransformColumnTypes(Kopfzeile,
        {{"Bestelldatum", type date}, {"Umsatz", type number}, {"Menge", Int64.Type}}
    ),
    NurAbgeschlossen = Table.SelectRows(Typen, each [Status] = "Abgeschlossen"),
    OhneStorno = Table.SelectRows(NurAbgeschlossen, each [Rabatt] < 0.2),
    Umbenannt = Table.RenameColumns(OhneStorno,
        {{"Umsatz", "Nettoumsatz"}, {"Menge", "Bestellmenge"}}
    ),
    OhneSpalten = Table.RemoveColumns(Umbenannt, {"Kanal", "SalesRepID"})
in
    OhneSpalten
```

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Was ist das Ergebnis dieser Abfrage — was enthält die finale Tabelle? Lies von unten nach oben.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Wie viele Filterschritte gibt es? Welche Bedingungen werden gefiltert?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Was bedeutet <code>Int64.Type</code> für die Spalte Menge? Wie würde das in der Power BI-GUI heißen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Was würde passieren wenn du den Schritt <code>NurAbgeschlossen</code> löscht? Welche nachfolgenden Schritte wären betroffen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Welche Spalten sind in der finalen Tabelle <strong>nicht</strong> vorhanden? Nenne alle die entfernt oder nie geladen wurden.</span>
  </div>
</div>

  <strong>a) Inhalt der finalen Tabelle:</strong>
  <br><br>
  <strong>b) Filterschritte und Bedingungen:</strong>
  <br><br>
  <strong>c) Int64.Type in GUI-Begriff:</strong>
  <br><br>
  <strong>d) Konsequenz beim Löschen von NurAbgeschlossen:</strong>
  <br><br>
  <strong>e) Fehlende Spalten in der finalen Tabelle:</strong>

  </div>
</div>

---

## Aufgabe 6 — Fehler absichtlich erzeugen und beheben

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">6</span>
    <span class="pbi-task-title">Abhängigkeitsfehler verstehen und korrigieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Lieferanten_CodeUebung</strong> im erweiterten Editor. Lösche einen mittleren Schritt — zum Beispiel den Schritt für <code>Table.RenameColumns</code> — direkt aus dem Code. Klicke Fertig. Was passiert? Notiere die Fehlermeldung.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Klicke <strong>Abbrechen</strong> ohne die Änderung zu übernehmen. Öffne den Editor erneut: Der ursprüngliche Code ist wieder da. Erkläre warum Abbrechen hier der richtige Weg ist.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Öffne den erweiterten Editor. Ändere den Spaltennamen in einem <code>Table.SelectRows</code>-Schritt absichtlich falsch — schreibe z.B. <code>[aktiv_ja_nein]</code> als <code>[aktiv]</code>. Klicke Fertig. Welche Fehlermeldung erscheint in der Datenvorschau?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Korrigiere den Fehler direkt im erweiterten Editor: Den richtigen Spaltennamen wieder einsetzen. Klicke Fertig. Verschwindet der Fehler?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">e</span>
    <span class="pbi-step-text">Beantworte schriftlich: Du hast zwei Fehlerarten kennengelernt — Abhängigkeitsfehler (Schritt referenziert gelöschten Schritt) und Spaltennamenfehler. Welche Fehlermeldung hilft dir besser bei der Diagnose? Warum?</span>
  </div>
</div>

  <strong>a) Fehlermeldung nach Löschen des Schritts:</strong>
  <br><br>
  <strong>c) Fehlermeldung bei falschem Spaltennamen:</strong>
  <br><br>
  <strong>e) Welche Fehlermeldung ist hilfreicher und warum:</strong>

  </div>
</div>

---

## Aufgabe 7 — Text-Funktionen im Code

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">7</span>
    <span class="pbi-task-title">Text-Funktionen in benutzerdefinierten Spalten einsetzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Customers</strong>. Füge über <strong>Spalte hinzufügen → Benutzerdefinierte Spalte</strong> eine Spalte <strong>Email_Bereinigt</strong> hinzu: <code>Text.Lower(Text.Trim([Email]))</code>. Was machen die zwei verschachtelten Funktionen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Öffne jetzt den erweiterten Editor. Suche den Schritt der Email_Bereinigt erzeugt hat. Welche M-Funktion steht für das Hinzufügen einer benutzerdefinierten Spalte?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Lies folgende Ausdrücke und erkläre was sie zurückgeben:<br><br>
    <code>Text.Length("Power BI")</code><br><br>
    <code>Text.Contains("power bi desktop", "desktop")</code><br><br>
    <code>Text.AfterDelimiter("K0042", "-")</code></span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Mache den Schritt Email_Bereinigt rückgängig. Beantworte schriftlich: Wann würdest du eine Text-Funktion in Power Query einsetzen statt sie als DAX-Measure zu schreiben?</span>
  </div>
</div>

  <strong>a) Was machen Text.Lower und Text.Trim gemeinsam:</strong>
  <br><br>
  <strong>b) M-Funktion für benutzerdefinierte Spalte:</strong>
  <br><br>
  <strong>c) Ergebnisse der drei Ausdrücke:</strong>
  <br><br>
  <strong>d) Wann Text-Funktion in Power Query statt DAX:</strong>

  </div>
</div>

---

## Aufgabe 8 — Abschluss: Code kopieren und wiederverwenden

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">8</span>
    <span class="pbi-task-title">Abfrage in neues Projekt übertragen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Abfrage <strong>Lieferanten_CodeUebung</strong> im erweiterten Editor. Markiere den gesamten Code mit Strg+A und kopiere ihn mit Strg+C.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Erstelle eine neue leere Abfrage: <strong>Start → Neue Quelle → Leere Abfrage</strong>. Öffne den erweiterten Editor dieser neuen Abfrage. Lösche den vorhandenen Inhalt und füge den kopierten Code ein (Strg+V). Klicke Fertig. Was passiert?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Beantworte: Was müsstest du im eingefügten Code ändern wenn die suppliers_raw.csv auf einem anderen Rechner unter einem anderen Pfad liegt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Deaktiviere das Laden der neuen Abfrage und der <strong>Lieferanten_CodeUebung</strong>. Speichere die Datei als <code>uebung_06c.pbix</code>.</span>
  </div>
</div>

  <strong>b) Was passiert nach dem Einfügen des Codes:</strong>
  <br><br>
  <strong>c) Was müsste im Code geändert werden:</strong>

  </div>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 1</strong> let/in-Struktur in Customers vollständig gelesen und analysiert</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Jeden GUI-Klick im erweiterten Editor nachverfolgt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Pfad, Filter und Umbenennung direkt im Code angepasst</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 4</strong> each und _ in Ausdrücken gelesen und selbst angewendet</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Unbekannten Code-Block von unten nach oben interpretiert</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 6</strong> Abhängigkeitsfehler und Spaltennamenfehler erzeugt und behoben</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 7</strong> Text-Funktionen in benutzerdefinierter Spalte eingesetzt</span></div>
  <div class="pbi-checklist-item"><span class="pbi-checklist-icon">☐</span><span class="pbi-checklist-label"><strong>Aufgabe 8</strong> Code kopiert, in neue Abfrage eingefügt und angepasst</span></div>
</div>
