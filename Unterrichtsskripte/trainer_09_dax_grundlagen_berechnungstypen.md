# Trainer-Skript 09 - DAX Grundlagen: Berechnungstypen, Syntax und Formeln

> **Themen:** Berechnete Tabelle · Berechnete Spalte · Measure · Formelsyntax · Objektreferenzen · Formatierung
> **Schüler-Skript:** 09_dax_grundlagen_berechnungstypen.md
> **Hinweis:** Kein Live-Demo-Schwerpunkt in diesem Skript. Konzeptuell mit kleinen Formelbeispielen in der Bearbeitungsleiste.

---

## Einstieg

**Frage ans Plenum:** Wer hat schon mal in Excel eine Formel geschrieben - SUMME, WENN, SVERWEIS?

- Kurz Handzeichen zählen
- Überleitung: DAX ist die Formelsprache von Power BI. Wer Excel-Formeln kennt, hat eine gute Ausgangsbasis. Aber DAX kann mehr - und funktioniert anders.

**Kerngedanke ansprechen:**
- DAX steht für Data Analysis Expressions - die Formelsprache von Power BI
- Mit DAX lassen sich Berechnungen erstellen, die weit über einfache Summen hinausgehen
- Beispiele: Umsatzwachstum im Jahresvergleich, Anzahl eindeutiger Kunden trotz lückenhafter Daten
- Skript 09 legt das Fundament: Welche Berechnungsarten gibt es, wie ist eine Formel aufgebaut, wie verweist man auf Tabellen und Spalten?

*DAX ist eine funktionale Sprache - das bedeutet: Berechnungen werden über Funktionen ausgedrückt, nicht über direkte Zellbezüge wie in Excel. Statt "A1:A10" schreibt man "Sales[Amount]". Das klingt zuerst fremd, macht aber Formeln leichter lesbar und stabiler.*

---

## Block 1 - Die drei DAX-Berechnungstypen

**Frage ans Plenum:** In Excel kann man in eine Zelle einen festen Wert tippen oder eine Formel. Was ist der Unterschied - wann rechnet Excel?

> **Erwartete Antwort:** Ein fester Wert bleibt unverändert. Eine Formel rechnet neu wenn sich die Quelldaten ändern.
> In DAX gibt es das auch - aber mit drei verschiedenen Varianten, je nachdem wann und wie die Berechnung ausgewertet wird.

### Demo: Wo legt man DAX-Berechnungen an?

**Drei Einstiegspunkte zeigen - einmal kurz durchklicken:**

**Berechnete Tabelle anlegen:**
- Modellierungsansicht öffnen (viertes Symbol in der linken Leiste) [PRÜFEN: Symbol-Position kann je nach Power BI Version variieren]
- Oben im Menüband: Registerkarte "Modellierung" - "Neue Tabelle"
- In der Bearbeitungsleiste erscheint: `Tabelle =`
- Das ist der Einstiegspunkt für berechnete Tabellen

**Berechnete Spalte anlegen:**
- In der Datensicht: eine Tabelle im Datenbereich rechts anklicken, z.B. orders
- Registerkarte "Tabellentools" erscheint oben - "Neue Spalte" [PRÜFEN: Alternativ Rechtsklick auf Tabellenkopf in der Datensicht]
- In der Bearbeitungsleiste erscheint: `Spalte =`

**Measure anlegen:**
- Rechtsklick auf eine Tabelle im Datenbereich rechts - "Neues Measure"
- Oder: Registerkarte "Modellierung" - "Neues Measure" [PRÜFEN: Menüband-Position]
- In der Bearbeitungsleiste erscheint: `Measure =`

*Alle drei Typen werden in derselben Bearbeitungsleiste oben geschrieben. Der Unterschied liegt im Einstiegspunkt und darin was die Formel zurückgeben muss.*

**Die drei Berechnungstypen vorstellen:**

**Berechnete Tabelle:**
- Eine komplett neue Tabelle, die per DAX-Formel erzeugt wird
- Erzeugt oder dupliziert Daten aus anderen Modelltabellen
- Wird ins Modell importiert - belegt also Speicher
- Wird bei der Datenaktualisierung neu berechnet
  *Typische Einsatzfälle: Datumstabellen anlegen, wenn keine in der Quelle vorhanden ist. Oder eine Dimensionstabelle duplizieren wenn man zwei aktive Beziehungen zur selben Tabelle braucht (Rollenspieldimension aus Skript 08).*

**Wichtig betonen:** Eine berechnete Tabelle kann NICHT auf externe Datenquellen zugreifen. Dafür ist Power Query zuständig. DAX sieht nur, was bereits im Modell ist.

**Berechnete Spalte:**
- Eine neue Spalte, die einer vorhandenen Tabelle hinzugefügt wird
- Die Formel wird für jede einzelne Zeile ausgewertet und gibt einen Wert zurück
- Ergebnis wird gespeichert - erhöht die Modellgröße
- Bei Importspeichermodus: Auswertung bei Datenaktualisierung
  *Berechnete Spalte verhält sich wie eine zusätzliche Spalte, die man in Power Query hinzugefügt hätte - mit dem Unterschied, dass sie DAX-Formeln nutzen kann. Typisches Beispiel: Eine Altersgruppe aus einem Geburtsdatum berechnen.*

**Measure (explizites Measure):**
- Eine benannte DAX-Formel, die einer Tabelle zugeordnet wird
- Wird NICHT vorab berechnet und NICHT gespeichert
- Wird zur Abfragezeit ausgewertet - jedes Mal neu, wenn ein Visual das Measure braucht
- Ergebnis hängt immer vom aktuellen Filterkontext ab
  *Filterkontext ist der aktuelle Satz aktiver Filter - zum Beispiel "Region = Süd" und "Jahr = 2024". Das Measure rechnet dann genau für diese Kombination. Derselbe Measure zeigt in jedem Visual automatisch den richtigen Wert.*

**Frage ans Plenum:** Ich habe eine Spalte "Umsatz" in der Bestelltabelle. Power BI summiert sie automatisch wenn ich sie in ein Visual ziehe. Ist das ein Measure?

> **Erwartete Antwort:** Vermutlich ja - aber eigentlich ist es ein implizites Measure.
> Genau hier liegt eine wichtige Unterscheidung:

**Explizite vs. implizite Measures kurz abgrenzen:**
- **Implizites Measure**: Eine normale Zahlenspalte, die Power BI automatisch aggregieren kann. Erkennbar am Sigma-Symbol (Summenzeichen) im Datenbereich.
  *Sigma ist der griechische Buchstabe, der in der Mathematik für Summe steht. Power BI markiert damit Spalten, die automatisch summiert werden können.*
- **Explizites Measure**: In DAX geschriebene Formel, erkennbar am Taschenrechnersymbol. Das ist das, was man mit DAX erstellt.
- "Berechnetes Measure" gibt es als Begriff in DAX nicht. "Berechnet" gilt nur für berechnete Tabellen und berechnete Spalten.

**Vergleichstabelle kurz zeigen und besprechen:**

| | Berechnete Tabelle | Berechnete Spalte | Measure |
|---|---|---|---|
| Ergebnis | Ganze Tabelle | Wert pro Zeile | Aggregierter Einzelwert |
| Wann ausgewertet | Modellladezeit | Datenaktualisierung | Zur Abfragezeit |
| Gespeichert | Ja | Ja | Nein |
| Typisch für | Datumstabellen, Rollenspiel | Neue Attribute (Altersgruppe) | KPIs (Umsatz, Gewinn) |

---

## Block 2 - Einsatzszenarien berechneter Tabellen

**Überleitung:** Wann braucht man überhaupt eine berechnete Tabelle? Drei konkrete Szenarien.

**Szenario 1: Datumstabelle anlegen**
- DAX-Zeitintelligenzfunktionen brauchen zwingend eine als Datumstabelle markierte Tabelle
- Wenn die Quelldaten keine haben, kann man sie per DAX anlegen
- Funktionen dafür: CALENDAR() oder CALENDARAUTO()
  *CALENDAR() lässt einen Datums-Start und -Ende angeben. CALENDARAUTO() scannt das Modell selbst und erzeugt automatisch eine Tabelle die alle Datumsangaben im Modell abdeckt. Mehr dazu in Skript 11.*

**Szenario 2: Rollenspieldimension duplizieren**
- Faktentabelle hat Bestelldatum UND Versanddatum
- Zur Datumstabelle kann nur eine aktive Beziehung bestehen
- Lösung: Datumstabelle per DAX duplizieren - zum Beispiel "Ship Date = 'Date'"
- Jetzt gibt es zwei Datumstabellen, jede mit einer eigenen aktiven Beziehung
  *Diese eine Zeile "Ship Date = 'Date'" erzeugt eine vollständige Kopie der Date-Tabelle. Wenn die Original-Date-Tabelle aktualisiert wird, aktualisiert sich Ship Date automatisch mit.*

**Szenario 3: Was-wäre-wenn-Parameter**
- Wenn man in Skript 08 einen numerischen Bereichsparameter erstellt hat, erzeugt Power BI im Hintergrund automatisch eine berechnete Tabelle
- Diese ist eine sogenannte getrennte Tabelle ohne Beziehung zu anderen Tabellen
  *Getrennte Tabelle bedeutet: keine Beziehung zu anderen Tabellen im Modell. Sie enthält nur die Werte für den Parameter-Datenschnitt - zum Beispiel Rabattsätze von 0 % bis 30 %.*

**Frage ans Plenum:** Warum sollte man berechnete Tabellen sparsam einsetzen?

> **Erwartete Antwort:** Sie erhöhen die Modellgröße und verlängern die Aktualisierungszeit, weil die Daten gespeichert werden.
> Wenn dieselbe Aufgabe in Power Query möglich ist, ist Power Query die bessere Wahl.

---

## Block 3 - DAX-Formelsyntax

**Überleitung:** Jetzt schauen wir uns an, wie eine DAX-Formel aufgebaut ist - unabhängig vom Typ.

### Demo: Erstes Measure in der Bearbeitungsleiste schreiben

**Demo - Schritt für Schritt:**
- Rechtsklick auf Tabelle orders im Datenbereich rechts - "Neues Measure"
- Bearbeitungsleiste ist jetzt aktiv, Cursor steht hinter `Measure =`
- Alten Namen "Measure" löschen, "Umsatz" eintippen
- Gleichheitszeichen steht bereits da
- "SUM" eintippen - IntelliSense zeigt Vorschläge
  *IntelliSense: die automatische Vervollständigung. Beim Tippen erscheinen passende Funktionen, Tabellen und Spalten als Liste. Pfeil nach unten + Tab oder Enter übernimmt den markierten Vorschlag.*
- SUM aus der Liste wählen oder austippen - öffnende Klammer setzen
- "orders" eintippen - IntelliSense zeigt die Tabelle
- Eckige Klammer öffnen - IntelliSense zeigt alle Spalten aus orders
- "Einzelpreis" wählen - schließende Klammer setzen
- Ergebnis: `Umsatz = SUM(orders[Einzelpreis])`
- Enter drücken - Measure erscheint in orders mit Taschenrechnersymbol

**Bewusst einen Fehler einbauen und zeigen:**
- Neues Measure - diesmal nur `[Einzelpreis]` ohne Tabellenname eintippen
- Power BI zeigt eine Fehlermeldung oder löst es mehrdeutig auf
- Zeigt warum vollqualifiziert besser ist: `orders[Einzelpreis]` statt `[Einzelpreis]`

**Das Grundmuster zeigen:**

```
Berechnungsname = DAX-Formel
```

- Links vom Gleichheitszeichen: der Name
- Rechts: die Formel
- Berechnete Tabellenformeln müssen eine ganze Tabelle zurückgeben
- Berechnete Spalten und Measures müssen einen einzelnen Wert zurückgeben
  *Einzelwert nennt man in der Programmierung skalar. Das bedeutet: eine einzige Zahl, ein Text, ein Datum - kein ganzes Set von Daten.*

**Die sechs Bausteine einer DAX-Formel erklären:**

- **DAX-Funktionen** - die eigentlichen Berechnungsbausteine, zum Beispiel SUM, CALCULATE, IF
  *Funktionen haben immer Klammern dahinter und nehmen Argumente entgegen: SUM(Sales[Amount]) bedeutet "summiere die Spalte Amount aus der Tabelle Sales".*

- **DAX-Operatoren** - für Arithmetik, Vergleiche, Textverkettung. Plus, Minus, Gleich, Größer-als usw.

- **Verweise auf Modellobjekte** - Tabellen, Spalten und Measures. Dazu gleich mehr.

- **Konstante Werte** - feste Zahlen oder Texte in der Formel, zum Beispiel die Zahl 100 oder der Text "GJ"
  *GJ steht für Geschäftsjahr - solche Textkonstanten können in Formeln eingebaut werden.*

- **DAX-Variablen** - zwischengespeicherte Ergebnisse mit dem Schlüsselwort VAR. Mehr dazu in Skript 10.

- **Leerzeichen** - Leerzeichen, Einrückungen, Zeilenumbrüche. Haben keinerlei Auswirkung auf Logik oder Leistung. Nur für die Lesbarkeit.

**IntelliSense ansprechen:**
- Power BI Desktop bietet beim Schreiben von DAX-Formeln automatische Vervollständigung
- Beim Tippen erscheinen Vorschläge für Funktionen, Tabellen und Spalten
- Funktion auswählen zeigt eine kurze Beschreibung mit Argumenten
  *IntelliSense kennt man eventuell aus anderen Programmierumgebungen. In der DAX-Bearbeitungsleiste funktioniert es genauso: Anfangen zu tippen, Vorschlag mit Tab oder Enter übernehmen.*

---

## Block 4 - Verweise auf Modellobjekte

**Frage ans Plenum:** In Excel schreibt man A1 oder A1:A10 um auf Zellen zu verweisen. Wie macht man das in DAX?

> **Erwartete Antwort:** Keine Ahnung - mal sehen.
> In DAX gibt es klare Regeln je nach Objekttyp:

### Demo: Alle drei Referenztypen live eintippen

**Demo - ein Measure das alle drei Typen zeigt:**
- Neues Measure in orders anlegen
- Folgende Formel schrittweise eintippen und dabei erklären:

```
Test = COUNTROWS('orders')
```

- `'orders'` in einfachen Anführungszeichen: das ist eine Tabellenreferenz
- Jetzt zeigen dass orders ohne Anführungszeichen auch funktioniert - weil kein Leerzeichen und kein reserviertes Wort
- Dann `'Date'` als Gegenbeispiel: Date IST ein reserviertes Wort in DAX, deshalb immer Anführungszeichen [PRÜFEN: Gilt sobald eine Tabelle "Date" im Modell existiert]

**Zweites Beispiel - Spaltenreferenz:**
```
Umsatz = SUM(orders[Einzelpreis])
```
- `orders[Einzelpreis]`: Tabellenname direkt, Spaltenname in eckigen Klammern, kein Punkt dazwischen

**Drittes Beispiel - Measure referenziert anderes Measure:**
```
Umsatz mit Menge = [Umsatz] * SUM(orders[Menge])
```
- `[Umsatz]` in eckigen Klammern ohne Tabellenname: das ist eine Measure-Referenz
- Bewusst `orders[Umsatz]` versuchen - Power BI gibt Fehler, weil Measures nicht tabellenqualifiziert werden

**Tabellenreferenzen:**
- Tabellennamen in einfache Anführungszeichen setzen

```
Ship Date = 'Date'
```

- Anführungszeichen können weggelassen werden wenn: kein Leerzeichen im Namen UND kein reserviertes DAX-Wort
  *Reserviertes Wort bedeutet: ein Begriff, den DAX selbst als Funktionsname kennt. Date zum Beispiel ist sowohl ein Tabellenname als auch eine DAX-Funktion. Deshalb muss man 'Date' immer in Anführungszeichen setzen, damit DAX weiß: das ist eine Tabelle, keine Funktion.*

**Spaltenreferenzen:**
- Spaltennamen in eckige Klammern setzen

```
Revenue = SUM([Sales Amount])
```

- Besser: Tabellenname voranstellen - das nennt sich vollqualifizierte Spalte

```
Revenue = SUM(Sales[Sales Amount])
```

*Vollqualifiziert bedeutet: vollständig angegeben, ohne Mehrdeutigkeiten. Wenn zwei Tabellen beide eine Spalte "Amount" haben, muss Power BI wissen welche gemeint ist. Sales[Amount] ist eindeutig, [Amount] alleine nicht.*

**Warum immer vollqualifizieren:** Einige DAX-Funktionen setzen es voraus. Deshalb von Anfang an zur Gewohnheit machen.

**Measurereferenzen:**
- Measure-Namen ebenfalls in eckige Klammern - sieht aus wie eine Spalte

```
Profit = [Revenue] - [Cost]
```

- Aber: Measures NIEMALS mit Tabellenname qualifizieren
  *Warum? Ein Measure gehört nicht wirklich zu einer Tabelle. Die Zuweisung zu einer Tabelle ist rein kosmetisch - damit es im Datenbereich übersichtlich liegt. Technisch ist es ein Objekt des gesamten Modells. Den Tabellennamen davor zu schreiben ist zwar technisch möglich, aber irreführend und wird von allen Experten abgelehnt.*

**Die Regel nochmal zusammenfassen:**
- Tabellen: einfache Anführungszeichen - 'Date'
- Spalten: eckige Klammern mit Tabellenname - Sales[Amount]
- Measures: eckige Klammern ohne Tabellenname - [Revenue]

**Frage ans Plenum:** Ich schreibe SUM(Sales[Amount]) - ist das eine Spaltenreferenz oder eine Measure-Referenz?

> **Erwartete Antwort:** Spalte - weil der Tabellenname Sales davor steht.
> Genau. SUM braucht eine Spalte als Argument, kein Measure. Deshalb hier immer mit Tabellenname.

---

## Block 5 - Formelformatierung

**Überleitung:** DAX verzeiht schlechte Formatierung vollständig - Leerzeichen, Einrückungen und Zeilenumbrüche ändern nichts an der Logik. Aber lesbare Formeln spart beim nächsten Mal viel Zeit.

### Demo: Zeilenumbruch in der Bearbeitungsleiste

**Demo:**
- Bestehendes Measure "Umsatz" anklicken - Formel erscheint in der Bearbeitungsleiste
- Bearbeitungsleiste durch Ziehen am unteren Rand vergrößern [PRÜFEN: Ob das in aktueller Version so funktioniert - alternativ gibt es einen Pfeil zum Aufklappen rechts in der Leiste]
- Cursor nach SUM( setzen
- Umschalt+Enter: Zeilenumbruch ohne die Formel zu schreiben
- Einrückung mit Leertaste oder Tab hinzufügen
- Enter alleine würde die Formel abschließen - das ist der häufige Anfängerfehler

**Die zwei Versionen derselben Formel zeigen:**

Unformatiert - eine Zeile, kaum lesbar:
```
Revenue YoY % = DIVIDE([Revenue] - CALCULATE([Revenue], SAMEPERIODLASTYEAR('Date'[Date])), CALCULATE([Revenue], SAMEPERIODLASTYEAR('Date'[Date])))
```

Formatiert - sofort erkennbare Struktur:
```
Revenue YoY % =
DIVIDE(
    [Revenue]
        - CALCULATE(
            [Revenue],
            SAMEPERIODLASTYEAR('Date'[Date])
    ),
    CALCULATE(
        [Revenue],
        SAMEPERIODLASTYEAR('Date'[Date])
    )
)
```

*Beide Formeln machen exakt dasselbe. Die formatierte Version zeigt auf einen Blick: DIVIDE hat zwei Argumente, das erste ist eine Subtraktion, das zweite ein CALCULATE. Das erkennt man in der einzeiligen Version nicht.*

**Praktische Hinweise:**
- Umschalt+Enter in der Bearbeitungsleiste = Zeilenumbruch (nicht Enter - das schreibt die Formel fest)
- Externes Tool: daxformatter.com - Formel einfügen, automatisch formatieren lassen, zurückkopieren

**Bewährte Formatierungsregeln:**
- Leerzeichen zwischen Operatoren
- Geschachtelte Funktionen einrücken
- Argumente bei langen Formeln auf eigene Zeilen
- Im Zweifel mehr Leerzeichen als zu wenig

*Geschachtelt bedeutet: eine Funktion als Argument einer anderen Funktion. CALCULATE enthält hier SAMEPERIODLASTYEAR als Argument - das ist eine geschachtelte Funktion.*

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Drei Berechnungstypen: Berechnete Tabelle (ganze Tabelle, gespeichert), Berechnete Spalte (Wert pro Zeile, gespeichert), Measure (aggregierter Wert, nicht gespeichert, zur Abfragezeit)
- Implizites Measure (Sigma) vs. explizites Measure (Taschenrechner) - "Measure" in DAX meint immer das explizite
- Formelsyntax: Name = Formel. Bausteine: Funktionen, Operatoren, Objektreferenzen, Konstanten, Variablen, Leerzeichen
- Tabellenname in einfachen Anführungszeichen, Spalte mit Tabellenname in eckigen Klammern, Measure in eckigen Klammern ohne Tabellenname
- Formatierung hat keine Auswirkung auf Logik - aber auf Lesbarkeit und Wartbarkeit

**Übergang zu Skript 10:**
"Wir wissen jetzt was DAX-Berechnungen sind und wie eine Formel aufgebaut ist. Im nächsten Skript schauen wir uns die Bausteine im Detail an: Welche Datentypen kennt DAX, welche Funktionen gibt es, wie funktionieren Operatoren und was bringen Variablen?"

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren. Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Welcher DAX-Berechnungstyp speichert sein Ergebnis NICHT im Modell?

- a) Berechnete Tabelle
- b) Berechnete Spalte
- c) Measure (richtig)
- d) Alle drei speichern ihr Ergebnis

> **Antwort:** c) Ein Measure wird zur Abfragezeit ausgewertet und nie gespeichert. Berechnete Tabellen und Spalten werden gespeichert und erhöhen die Modellgröße.

---

**Frage 2:** Welche Syntax ist korrekt für eine vollqualifizierte Spaltenreferenz in DAX?

- a) Sales.Amount
- b) [Sales Amount]
- c) Sales[Sales Amount] (richtig)
- d) 'Sales'.'Sales Amount'

> **Antwort:** c) Tabellenname direkt, dann Spaltenname in eckigen Klammern. Kein Punkt, keine Anführungszeichen um die Spalte.

---

**Frage 3:** Eine berechnete Tabelle soll Daten aus einer externen CSV-Datei laden, die noch nicht im Modell ist. Was ist das Problem?

- a) Das geht, aber nur mit einer Premium-Lizenz
- b) Berechnete Tabellen können nicht auf externe Datenquellen zugreifen - das ist Aufgabe von Power Query (richtig)
- c) Das geht, aber nur wenn die CSV im OneDrive liegt
- d) Es gibt kein Problem, das ist ein normaler Anwendungsfall

> **Antwort:** b) DAX sieht nur was bereits im semantischen Modell ist. Für den Zugriff auf externe Quellen ist Power Query zuständig.

---

**Frage 4:** Was ist der Unterschied zwischen einem expliziten und einem impliziten Measure?

- a) Implizite Measures sind schneller, explizite Measures sind genauer
- b) Implizite Measures sind normale Zahlenspalten die automatisch aggregiert werden (Sigma-Symbol). Explizite Measures sind in DAX geschriebene Formeln (Taschenrechnersymbol). (richtig)
- c) Explizite Measures werden im Modell gespeichert, implizite nicht
- d) Es gibt keinen praktischen Unterschied

> **Antwort:** b) "Measure" in DAX meint immer das explizite. Implizite Measures sind eigentlich keine Measures im DAX-Sinne, sondern aggregierbare Spalten.

---

**Frage 5:** Eine DAX-Formel ist lang und unformatiert. Man fügt Leerzeichen und Zeilenumbrüche ein um sie lesbarer zu machen. Was passiert mit der Berechnungslogik und der Leistung?

- a) Die Formel wird langsamer weil mehr Zeichen verarbeitet werden
- b) Die Logik bleibt identisch, die Leistung bleibt identisch - nur die Lesbarkeit verbessert sich (richtig)
- c) Zeilenumbrüche verändern die Auswertungsreihenfolge
- d) Power BI optimiert formatierte Formeln automatisch besser

> **Antwort:** b) DAX ignoriert Leerzeichen, Tabstopps und Zeilenumbrüche vollständig. Sie haben keinen Einfluss auf Logik oder Leistung.
