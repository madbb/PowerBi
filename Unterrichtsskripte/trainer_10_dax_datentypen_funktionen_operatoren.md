# Trainer-Skript 10 - DAX: Datentypen, Funktionen, Operatoren und Variablen

> **Themen:** Datentypen · BLANK · Funktionsbibliothek · DISTINCTCOUNT · DIVIDE · Operatoren · Rangfolge · Variablen
> **Schüler-Skript:** 10_dax_datentypen_funktionen_operatoren.md
> **Hinweis:** Konzeptuelles Skript mit Demo-Einlagen. Kein komplexer Formel-Aufbau - Fokus auf Verständnis der Bausteine.

---

## Einstieg

**Frage ans Plenum:** In Skript 09 haben wir das erste Measure "Umsatz" geschrieben: SUM(orders[Einzelpreis]). Was glaubt ihr - welchen Datentyp hat das Ergebnis?

> **Erwartete Antwort:** Eine Zahl. Vielleicht Dezimalzahl.
> Genau - DAX leitet den Datentyp automatisch aus der Formel ab. SUM auf einer Dezimalzahl ergibt eine Dezimalzahl. Das klingt selbstverständlich, aber es gibt einen Sonderfall der alle irgendwann überrascht: BLANK.

---

## Block 1 - DAX-Datentypen

**Überleitung:** Datentypen kennen wir aus Power Query. In DAX gibt es dieselben Typen - aber zwei wichtige Eigenheiten.

### Demo: Datentypen im Modell nachschlagen

**Demo:**
- Datensicht öffnen (zweites Symbol in der linken Leiste) [PRÜFEN: Symbol-Position]
- Tabelle orders anklicken
- Spalte Einzelpreis anklicken - rechts oder oben in den Spaltentools den Datentyp ablesen
- Spalte Status anklicken - Datentyp Text
- Spalte Bestelldatum - Datentyp Datum/Uhrzeit

*Datentypen werden in Power Query gesetzt. In der Datensicht kann man sie nachschlagen und in der Modellansicht ändern - aber Power Query ist der richtige Ort dafür.*

**Datentypen-Tabelle kurz durchgehen:**

| Modelldatentyp | DAX-Datentyp | Hinweis |
|---|---|---|
| Ganze Zahl | 64-Bit-Ganzzahl | Menge in orders |
| Dezimalzahl | Reelle 64-Bit-Zahl | Einzelpreis, Rabatt in orders |
| Boolescher Wert | Boolescher Wert | Aktiv in products |
| Text | Zeichenfolge | Status, Kanal in orders |
| Datum | Datum/Uhrzeit | Bestelldatum, Lieferdatum in orders |
| Währung | Währung | 4 Dezimalstellen, fixe Genauigkeit |
| Nicht zutreffend | BLANK | Fehlendes Wert - kein Null |

### BLANK erklären - das ist das Wichtigste

**Frage ans Plenum:** Was ist der Unterschied zwischen Null und einem leeren Feld?

> **Erwartete Antwort:** Null ist die Zahl 0. Leer bedeutet kein Wert vorhanden.
> Genau. In DAX heißt "kein Wert vorhanden" BLANK. Das ist kein Null und keine leere Zeichenfolge - es ist das Fehlen eines Werts.

**Demo: BLANK in der Praxis zeigen:**
- Neues Measure in orders anlegen
- Formel: `BLANK Test = BLANK()`
- Ergebnis in einem Kartenvisual zeigen - es erscheint nichts, nicht mal 0

**Die kritische Falle mit Vergleichsoperatoren betonen:**
- `orders[Rabatt] = 0` ist TRUE wenn Rabatt 0 ist - aber auch wenn Rabatt BLANK ist
- `orders[Rabatt] == 0` ist TRUE nur wenn Rabatt exakt 0 ist, nicht bei BLANK

*Das ist eine der häufigsten Fehlerquellen. Ein Bericht zeigt falsche Zahlen, weil eine IF-Bedingung auf 0 prüft aber BLANK-Werte mitzählt. Immer ISBLANK() verwenden wenn man auf "kein Wert" prüfen will.*

**Zwei BLANK-Funktionen merken:**
- `BLANK()` - erzeugt einen BLANK-Wert
- `ISBLANK(ausdruck)` - prüft ob ein Ausdruck BLANK ergibt, gibt TRUE oder FALSE zurück

**Frage ans Plenum:** In unserer orders-Tabelle haben manche Bestellungen Rabatt = 0, andere haben vielleicht gar keinen Eintrag. Wie würde man prüfen ob wirklich kein Rabatt vorgesehen war?

> **Erwartete Antwort:** Mit ISBLANK(orders[Rabatt]).
> Genau. = 0 würde auch Rabatt-Einträge mit explizitem 0-Wert treffen.

---

## Block 2 - DAX-Funktionen

**Überleitung:** DAX hat hunderte Funktionen. Wichtig ist nicht, alle auswendig zu kennen - sondern zu wissen welche Kategorien es gibt und wo man nachschlägt.

**Kurze Orientierung:**
- Über 80 Funktionen direkt aus Excel übernommen - SUM, COUNT, AVERAGE, MIN, MAX, IF, AND, OR, LEN, LEFT, RIGHT, YEAR, MONTH usw.
- Der einzige Unterschied zu Excel: kein Zellbereich wie A1:A10, sondern Spaltenreferenz wie orders[Einzelpreis]
- DAX-eigene Funktionen für: Beziehungsnavigation, Filterkontext, Iteratoren, Zeitintelligenz, Pfade

**Nachschlagehinweis:**
- Websuche "DAX FUNKTIONSNAME" findet die Microsoft-Dokumentation sofort
- Vollständige Referenz: "DAX-Funktionsreferenz" in der Microsoft-Dokumentation

### Demo: DISTINCTCOUNT mit unseren Daten

**Szenario erklären:**
- Frage: Wie viele verschiedene Kunden haben überhaupt bestellt?
- orders hat 3000 Zeilen - aber nicht 3000 verschiedene Kunden, ein Kunde kauft mehrfach

**Demo:**
- Neues Measure in orders anlegen
- Formel: `Eindeutige Kunden = DISTINCTCOUNT(orders[CustomerID])`
- In einem Kartenvisual platzieren - zeigt die Anzahl unterschiedlicher Kunden

*DISTINCTCOUNT zählt jeden Wert nur einmal, egal wie oft er vorkommt. COUNT würde alle Zeilen zählen. Der Unterschied: COUNT(orders[CustomerID]) gibt 3000, DISTINCTCOUNT gibt die tatsächliche Kundenzahl.*

### Demo: DIVIDE mit unseren Daten

**Szenario erklären:**
- Frage: Wie hoch ist der durchschnittliche Rabatt pro Bestellung?
- Problem: Manche Bestellungen haben Rabatt = 0 oder BLANK - eine Division durch Null ist möglich

**Demo:**
- Neues Measure: `Rabattquote = DIVIDE(SUM(orders[Rabatt]), COUNT(orders[OrderID]))`
- Zum Vergleich dasselbe mit /: `Rabattquote2 = SUM(orders[Rabatt]) / COUNT(orders[OrderID])`
- Beide zeigen hier dasselbe - aber DIVIDE ist sicherer wenn der Nenner 0 werden kann

**Regel klar machen:**
- Nenner ist ein Ausdruck der 0 oder BLANK werden kann: DIVIDE verwenden
- Nenner ist eine Konstante wie / 100: einfacher /-Operator ist schneller

**Frage ans Plenum:** Wir berechnen den Marktanteil: Umsatz einer Region geteilt durch Gesamtumsatz. Welchen Operator nehmt ihr?

> **Erwartete Antwort:** DIVIDE - weil der Gesamtumsatz BLANK sein könnte wenn keine Daten vorhanden.
> Richtig. Immer DIVIDE wenn der Nenner aus dem Modell kommt.

---

## Block 3 - DAX-Operatoren

**Überleitung:** Operatoren kennt ihr aus Mathematik und Excel. In DAX gibt es eine Besonderheit: den Unterschied zwischen = und ==.

### Demo: Operatoren direkt eintippen

**Demo - arithmetisch:**
- Neues Measure: `Zeilenumsatz Gesamt = SUMX(orders, orders[Einzelpreis] * orders[Menge])`
  *SUMX ist eine Iteratorfunktion - sie rechnet Einzelpreis * Menge für jede Zeile und summiert dann. Der *-Operator arbeitet hier zeilenweise. Das kommt in Skript 11 ausführlicher.*

**Demo - Textverkettung:**
- Neue berechnete Spalte in salesreps: `Vollname = salesreps[Vorname] & " " & salesreps[Nachname]`
- Ergebnis direkt in der Datensicht sichtbar - eine neue Spalte mit "Vorname Nachname"

**Demo - IN-Operator:**
- Neues Measure: `Umsatz West und Süd = CALCULATE([Umsatz], customers[Region] IN {"West", "Süd"})`
  *IN prüft ob ein Wert in einer Liste vorkommt. Die Liste steht in geschweiften Klammern. Das ist kürzer als zwei OR-Bedingungen hintereinander.*
  *Hinweis: [Umsatz] muss vorher als Measure existieren - falls noch nicht angelegt, erst das erstellen.*

### Rangfolge-Falle zeigen

**Demo - bewusst falsches Ergebnis erzeugen:**
- Neues Measure: `Nettoumsatz Falsch = SUM(orders[Menge]) * SUM(orders[Einzelpreis]) * 1 - SUM(orders[Rabatt])`
- Dann korrektes Measure: `Nettoumsatz = SUM(orders[Menge]) * SUM(orders[Einzelpreis]) * (1 - SUM(orders[Rabatt]))`
- Beide Werte in Kartenvisuals nebeneinander zeigen - unterschiedliche Ergebnisse

*Die Multiplikation wird vor der Subtraktion ausgeführt. Im ersten Measure wird 1 multipliziert und dann Rabatt abgezogen - falsch. Im zweiten stehen Klammern - die Subtraktion passiert zuerst. Das ist dieselbe Falle wie in Excel.*

**Frage ans Plenum:** Was ist der Unterschied zwischen = und == in DAX?

> **Erwartete Antwort:** = behandelt BLANK wie 0, == unterscheidet zwischen 0 und BLANK.
> Genau. Im Alltag fast immer = verwenden. == nur wenn es wirklich wichtig ist ob ein Wert fehlt oder exakt 0 ist.

---

## Block 4 - DAX-Variablen

**Überleitung:** Variablen sind optional - aber wer sie einmal benutzt hat, schreibt keine komplexen Formeln mehr ohne sie.

**Kernpunkte vorab:**
- VAR deklariert eine Variable, RETURN gibt das Ergebnis zurück
- Eine Variable wird nur einmal berechnet, egal wie oft sie in RETURN vorkommt
- Variablenname frei wählbar - sprechende Namen verwenden

### Demo: Measure ohne und mit Variable schreiben

**Szenario:** Wir wollen den Anteil der abgeschlossenen Bestellungen am Gesamtumsatz berechnen.

**Ohne Variable - Gesamtumsatz wird zweimal berechnet:**
```
Anteil Abgeschlossen =
DIVIDE(
    CALCULATE([Umsatz], orders[Status] = "Abgeschlossen"),
    CALCULATE([Umsatz])
)
```

**Demo - eintippen und zeigen:**
- Measure anlegen, Formel eintippen, Ergebnis in Kartenvisual zeigen

**Mit Variable - Gesamtumsatz einmal berechnet:**
```
Anteil Abgeschlossen V2 =
VAR GesamtUmsatz = CALCULATE([Umsatz])
VAR AbgeschlossenUmsatz = CALCULATE([Umsatz], orders[Status] = "Abgeschlossen")
RETURN
    DIVIDE(AbgeschlossenUmsatz, GesamtUmsatz)
```

**Demo - zweites Measure anlegen, beide Werte vergleichen - müssen identisch sein**

**Debugging-Trick zeigen:**
- RETURN-Klausel temporär auf eine Variable setzen: `RETURN GesamtUmsatz`
- Jetzt zeigt das Measure den Gesamtumsatz - man sieht ob die Variable den richtigen Wert hat
- Danach zurück auf das eigentliche RETURN

*Das ist der wichtigste Debugging-Trick für DAX-Variablen. Statt die ganze Formel zu analysieren, ersetzt man RETURN kurz durch eine einzelne Variable und sieht sofort ob die stimmt.*

**Frage ans Plenum:** Eine Variable in einer DAX-Formel wird dreimal in der RETURN-Klausel verwendet. Wie oft wird der Ausdruck der Variable ausgewertet?

> **Erwartete Antwort:** Einmal - der Wert wird gespeichert und wiederverwendet.
> Genau. Das ist der Leistungsvorteil. Drei Berechnungen werden zu einer.

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- 7 Datentypen - BLANK ist kein Null, sondern "kein Wert". ISBLANK() zum Prüfen, = vs. == beim Vergleichen
- Funktionsbibliothek: 80+ Excel-kompatibel, DAX-eigene für Filter, Beziehungen, Zeitintelligenz. DISTINCTCOUNT für eindeutige Kunden, DIVIDE für sichere Division
- Operatoren: Rangfolge wie Excel - Klammern setzen wenn unsicher. IN für Listen statt mehrfachem ODER
- Variablen: VAR deklariert, RETURN gibt zurück, einmal berechnet - Lesbarkeit, Wartbarkeit, Leistung

**Übergang zu Skript 11:**
"Wir haben jetzt alle Bausteine. In Skript 11 schreiben wir die ersten echten Berechnungen: Measures für Umsatz, Menge, Kundenzählung - und die Datumstabelle per DAX."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren. Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** In orders hat eine Bestellung keinen Rabatt-Eintrag. Was gibt `orders[Rabatt] = 0` zurück?

- a) FALSE - weil kein Eintrag vorhanden ist
- b) TRUE - weil BLANK wie 0 behandelt wird (richtig)
- c) BLANK - weil kein Vergleich möglich ist
- d) Fehler

> **Antwort:** b) Der =-Operator behandelt BLANK wie 0. Wer wirklich auf "kein Wert" prüfen will, braucht ISBLANK().

---

**Frage 2:** Wir wollen den Umsatz durch die Anzahl aktiver Produkte teilen. Aktive Produkte können 0 sein. Welche Formel ist korrekt?

- a) [Umsatz] / [Aktive Produkte]
- b) DIVIDE([Umsatz], [Aktive Produkte]) (richtig)
- c) [Umsatz] / IFERROR([Aktive Produkte], 1)
- d) Beide a und c sind gleich gut

> **Antwort:** b) DIVIDE behandelt Division durch Null automatisch und gibt BLANK zurück statt einen Fehler.

---

**Frage 3:** Was gibt DISTINCTCOUNT(orders[CustomerID]) zurück?

- a) Die Gesamtzahl aller Zeilen in orders
- b) Die Anzahl unterschiedlicher Kundennummern in orders (richtig)
- c) Die Anzahl der Kunden in der customers-Tabelle
- d) Den häufigsten CustomerID-Wert

> **Antwort:** b) DISTINCTCOUNT zählt jeden Wert nur einmal. COUNT würde jede Zeile zählen - auch wenn derselbe Kunde mehrfach bestellt hat.

---

**Frage 4:** Was gibt folgendes Measure zurück: `Test = SUM(orders[Menge]) * 2 + 3`?

- a) SUM(Menge) + 3, dann mal 2 - wegen Rangfolge
- b) SUM(Menge) mal 2, dann plus 3 - weil Multiplikation vor Addition (richtig)
- c) Fehler - Mischung aus Aggregation und Konstante nicht erlaubt
- d) SUM(Menge) * 5 - weil 2+3 zuerst ausgewertet wird

> **Antwort:** b) Multiplikation hat höhere Priorität als Addition. Ergebnis: (SUM * 2) + 3.

---

**Frage 5:** Eine DAX-Variable wird deklariert, aber in der RETURN-Klausel nie verwendet. Was passiert?

- a) Fehler beim Speichern der Formel
- b) Die Variable wird trotzdem berechnet und belegt Speicher
- c) DAX ignoriert die Variable - keine Berechnung, kein Fehler (richtig)
- d) Power BI zeigt eine Warnung

> **Antwort:** c) DAX wertet Variablen nur aus wenn sie in RETURN tatsächlich gebraucht werden. Eine ungenutzte Variable verursacht keinen Fehler und belastet die Leistung nicht.
