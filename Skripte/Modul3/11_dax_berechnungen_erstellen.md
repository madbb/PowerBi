# Trainer-Skript 11 - DAX-Berechnungen erstellen

> **Themen:** Datumstabelle · Berechnete Spalten · RELATED · Implizite vs. explizite Measures · Verbundmeasures · Iteratorfunktionen
> **Schüler-Skript:** 11_dax_berechnungen_erstellen.md
> **Voraussetzung:** uebung_08.pbix mit fertigem Sternschema (orders, customers, products, salesreps verbunden)
> **Hinweis:** Dieses Skript ist demo-intensiv. Jeder Block enthält mindestens eine Live-Demo. Klick-Pfade für Measure anlegen, Spalte anlegen und IntelliSense wurden in Skript 09 behandelt und werden hier nicht wiederholt.

---

## Einstieg

**Frage ans Plenum:** Wir haben in Skript 09 und 10 die Syntax und die Bausteine von DAX gelernt. Was fehlt noch bevor wir echte Berichte bauen können?

> **Erwartete Antworten:** Datumstabelle. Konkrete Measures. Berechnungen die auf unsere Daten passen.
> Genau. Heute bauen wir das Modell fertig: Datumstabelle per DAX, Spalten per RELATED, und die ersten vollständigen Measures für Umsatz, Menge und Kundenzählung.

---

## Block 1 - Datumstabelle erstellen und ins Modell einbinden

**Kontext setzen:**
- orders hat zwei Datumsspalten: Bestelldatum und Lieferdatum
- Zeitintelligenzfunktionen (kommen in Skript 13) setzen eine als Datumstabelle markierte Tabelle voraus
- Diese Tabelle gibt es in unseren CSV-Daten nicht - wir bauen sie per DAX

**Frage ans Plenum:** Was müsste eine Datumstabelle für unser Modell mindestens abdecken?

> **Erwartete Antwort:** Den Zeitraum aller Bestellungen - also von der ältesten bis zur neuesten.
> Genau. CALENDARAUTO erledigt das automatisch: Es scannt alle Datumsspalten im Modell und erzeugt eine lückenlose Tabelle vom frühesten bis zum spätesten Datum.

### Demo: Datumstabelle mit CALENDARAUTO anlegen

**Demo:**
- Modellierungsansicht öffnen - Registerkarte "Modellierung" im Menüband
- "Neue Tabelle" klicken [PRÜFEN: Schaltflächenposition]
- In der Bearbeitungsleiste erscheint: `Tabelle =`
- Namen eingeben und Formel eintippen:

```dax
Datum = CALENDARAUTO()
```

- Enter drücken - im Datenbereich erscheint die neue Tabelle "Datum"
- In die Datensicht wechseln, Tabelle Datum anklicken
- Eine Spalte "Date" - lückenlose Datumsangaben vom frühesten bis spätesten Datum im Modell

*CALENDARAUTO ohne Argument: Geschäftsjahr endet im Dezember. CALENDARAUTO(6) würde bedeuten: Geschäftsjahr endet im Juni. Für unsere Übungsdaten nehmen wir die einfache Variante ohne Argument.*

**Frage ans Plenum:** Wir haben Bestelldatum und Lieferdatum in orders. Welches Datum bestimmt den Anfang der Datumstabelle?

> **Erwartete Antwort:** Das früheste Datum aus beiden Spalten zusammen.
> Richtig. CALENDARAUTO nimmt das Minimum aller Datumsspalten im gesamten Modell als Startpunkt.

### Demo: Als Datumstabelle markieren

**Demo:**
- Tabelle "Datum" in der Datensicht anklicken
- Registerkarte "Tabellentools" erscheint oben im Menüband [PRÜFEN: erscheint nur wenn eine Tabelle aktiv ist]
- "Als Datumstabelle markieren" - "Als Datumstabelle markieren"
- Dialogfenster: Datumsspalte auswählen - "Date" wählen - OK
- Power BI prüft: eindeutige Werte, keine Leerwerte, lückenlose Datumsangaben

*Warum markieren? Erst nach der Markierung weiß Power BI: das ist die offizielle Zeitachse des Modells. Zeitintelligenzfunktionen wie TOTALYTD oder SAMEPERIODLASTYEAR funktionieren sonst nicht korrekt.*

**Was wenn die Prüfung fehlschlägt:**
- Fehlermeldung "Datumstabelle enthält Lücken" - typische Ursache: CALENDARAUTO hat nicht alle relevanten Spalten erfasst, oder eine Datumsspalte hat den falschen Datentyp
- Lösung: Datentyp der Datumsspalten in Power Query prüfen, muss "Datum" oder "Datum/Uhrzeit" sein, nicht Text

### Demo: Beziehung zur Datumstabelle anlegen

**Erinnerung aus Skript 08:** Zwischen zwei Tabellen kann nur eine aktive Beziehung bestehen.

**Demo:**
- In die Modellansicht wechseln
- Datumstabelle erscheint neu im Diagramm - noch unverbunden
- Datum[Date] auf orders[Bestelldatum] ziehen
- Beziehungslinie erscheint: 1 bei Datum, * bei orders - Filterrichtung von Datum nach orders

**Problem zeigen:**
- Jetzt orders[Lieferdatum] auch verbinden wollen - Power BI lässt es zu, aber markiert eine als inaktiv (gestrichelte Linie)
- Doppelklick auf die gestrichelte Linie - "Aktiv" ist deaktiviert

**Lösung Rollenspieldimension:**
- Zweite berechnete Tabelle anlegen: `Lieferdatum = 'Datum'`
  *Diese eine Zeile erzeugt eine vollständige Kopie der Datumstabelle. Wenn Datum aktualisiert wird, zieht Lieferdatum automatisch nach.*
- Lieferdatum[Date] auf orders[Lieferdatum] ziehen
- Jetzt: zwei Datumstabellen, jede mit einer eigenen aktiven Beziehung

**Frage ans Plenum:** Muss die Kopie Lieferdatum auch als Datumstabelle markiert werden?

> **Erwartete Antwort:** Ja - sie ist eine eigene Tabelle und muss eigens markiert werden.
> Genau. Markierung überträgt sich nicht automatisch auf Kopien.

---

## Block 2 - Datumstabelle mit berechneten Spalten erweitern

**Überleitung:** Die Datumstabelle hat jetzt eine einzige Spalte: "Date". Das reicht für Beziehungen, aber nicht für Berichte. Wir brauchen Jahr, Monat, Quartal als eigene Spalten.

**Frage ans Plenum:** Warum nicht einfach Jahr und Monat in Power Query hinzufügen?

> **Erwartete Antwort:** Weil die Datumstabelle per DAX erstellt wurde, nicht durch eine Power Query-Abfrage.
> Genau. Berechnete Tabellen können nur per DAX erweitert werden - nicht in Power Query.

### Demo: Berechnete Spalten zur Datumstabelle hinzufügen

**Demo - vier Spalten nacheinander anlegen:**

Wechsel in die Datensicht, Tabelle "Datum" anklicken.

**1. Jahr:**
- Registerkarte "Tabellentools" - "Neue Spalte" [PRÜFEN: Alternativ Rechtsklick auf Tabellenkopf]
- Formel:
```dax
Jahr = YEAR('Datum'[Date])
```
- Ergebnis: Ganzzahlspalte mit Jahreszahlen

**2. Monat (Nummer für Sortierung):**
```dax
MonatNr = MONTH('Datum'[Date])
```
*MonatNr wird nicht angezeigt, aber als Sortiergrundlage verwendet. Ohne diese Spalte würde "Januar" alphabetisch nach "April" sortiert.*

**3. Monatsname:**
```dax
Monat = FORMAT('Datum'[Date], "MMM")
```
- Ergebnis: "Jan", "Feb", "Mrz" usw.
- Jetzt Sortierung setzen: Spalte "Monat" anklicken - Spaltentools - "Nach Spalte sortieren" - "MonatNr" wählen [PRÜFEN: genaue Position der Schaltfläche]

**4. Quartal:**
```dax
Quartal = "Q" & ROUNDUP(MONTH('Datum'[Date]) / 3, 0)
```
*ROUNDUP rundet immer auf. Monat 1-3 ergibt Q1, Monat 4-6 ergibt Q2 usw. Der &-Operator hängt "Q" davor.*

**Ergebnis zeigen:** Datumstabelle hat jetzt fünf Spalten: Date, Jahr, MonatNr, Monat, Quartal.

### Demo: RELATED in orders verwenden

**Szenario:** Wir wollen in orders eine Spalte "Bestelljahr" die das Jahr der Bestellung enthält - für späteres Filtern und Gruppieren.

**Frage ans Plenum:** Warum nicht einfach YEAR(orders[Bestelldatum]) direkt in orders schreiben?

> **Erwartete Antwort:** Das würde auch funktionieren. RELATED wäre nötig wenn die Spalte in der Datumstabelle liegt, nicht in orders selbst.
> Genau. RELATED holt Werte aus einer verbundenen Tabelle auf der 1-Seite. Hier zeigen wir beide Varianten.

**Demo - Variante 1: direkt aus orders:**
```dax
Bestelljahr = YEAR(orders[Bestelldatum])
```

**Demo - Variante 2: aus der Datumstabelle per RELATED:**
```dax
Bestelljahr RELATED = RELATED('Datum'[Jahr])
```

*Beide ergeben dasselbe Ergebnis. RELATED ist nützlich wenn die Dimension bereits aufbereitete Spalten hat - z.B. Quartal oder Geschäftsjahr. Dann muss die Logik nur einmal in der Datumstabelle gepflegt werden.*

**Weitere RELATED-Demo - Produktkategorie in orders:**
```dax
Kategorie = RELATED(products[Kategorie])
```
- Ergebnis: jede Zeile in orders zeigt die Kategorie des bestellten Produkts
- Das ist nützlich für spätere Berechnungen die Kategorie und Bestellmenge kombinieren

*RELATED funktioniert nur von der Viele-Seite zur 1-Seite. orders ist die Viele-Seite, products die 1-Seite. Umgekehrt - also aus products auf orders - würde man RELATEDTABLE verwenden. Das gibt dann eine ganze Tabelle zurück, keine einzelne Spalte.*

---

## Block 3 - Implizite Measures absichern

**Überleitung:** Das Modell hat Spalten mit numerischen Werten: Einzelpreis, Menge, Rabatt in orders. Power BI zeigt sie alle mit Sigma-Symbol - sie sind implizit aggregierbar.

**Frage ans Plenum:** Was kann ein Berichtsautor mit einem impliziten Measure tun?

> **Erwartete Antwort:** Er kann die Aggregationsart ändern - Summe, Mittelwert, Anzahl usw.
> Richtig. Und genau das ist das Problem.

### Demo: Gefahr impliziter Measures zeigen

**Demo:**
- In die Berichtsansicht wechseln
- Neues Kartenvisual anlegen
- Spalte orders[Einzelpreis] in das Visual ziehen
- Power BI zeigt die Summe aller Einzelpreise - das ist nicht unser Umsatz, das ist eine sinnlose Zahl
- Klick auf das Sigma-Symbol im Visual - Aggregation auf "Mittelwert" ändern
- Die Zahl ändert sich - ein Berichtsautor kann das jederzeit tun

*Das ist der Kern des Problems: Ein implizites Measure ist nicht fixiert. Jeder Berichtsautor in jedem Bericht kann die Aggregation ändern. Ein explizites Measure ist unveränderlich - es berechnet immer dasselbe.*

**Empfehlung zeigen:**
- Spalte orders[Einzelpreis] im Datenbereich rechtsklicken - "Ausblenden"
- Die Spalte verschwindet aus dem Datenbereich - Berichtsautoren sehen sie nicht mehr
- Stattdessen legen wir jetzt explizite Measures an

**Frage ans Plenum:** Wenn wir Einzelpreis ausblenden - können wir die Spalte noch in DAX-Formeln verwenden?

> **Erwartete Antwort:** Ja - Ausblenden betrifft nur die Sichtbarkeit im Datenbereich, nicht die Verfügbarkeit in Formeln.
> Genau. orders[Einzelpreis] bleibt in allen DAX-Formeln verwendbar.

---

## Block 4 - Explizite Measures und Verbundmeasures

**Überleitung:** Jetzt bauen wir die Kernmeasures für unser Modell. Regel: einfache Measures zuerst, dann Verbundmeasures die darauf aufbauen.

### Demo: Kernmeasures anlegen

**Hinweis vorab:** Alle Measures in der Tabelle orders ablegen - das hält das Modell übersichtlich.

**Demo - Measure 1: Umsatz**
- Rechtsklick auf orders - "Neues Measure"
```dax
Umsatz = SUM(orders[Einzelpreis] * orders[Menge])
```
- Sofort formatieren: Registerkarte "Measuretools" - Format: Währung, 2 Dezimalstellen, Euro [PRÜFEN: ob Währungssymbol direkt wählbar oder über benutzerdefiniertes Format]

*Warum Einzelpreis * Menge und nicht nur Einzelpreis? Weil eine Bestellung mehrere Einheiten haben kann. Menge steht in orders, Einzelpreis steht in orders - wir multiplizieren zeilenweise. Das macht SUMX im Hintergrund - mehr dazu in Block 5.*

**Demo - Measure 2: Nettoumsatz (Verbundmeasure)**
```dax
Nettoumsatz = [Umsatz] * (1 - SUM(orders[Rabatt]))
```
- Formatieren: Währung, 2 Dezimalstellen

*Verbundmeasure: Nettoumsatz baut auf [Umsatz] auf. Wenn wir Umsatz später ändern, ändert sich Nettoumsatz automatisch mit. Das ist der Vorteil der Modularität.*

**Demo - Measure 3: Anzahl Bestellungen**
```dax
Anzahl Bestellungen = DISTINCTCOUNT(orders[OrderID])
```
- Formatieren: Ganze Zahl, keine Dezimalstellen

**Demo - Measure 4: Anzahl Kunden**
```dax
Anzahl Kunden = DISTINCTCOUNT(orders[CustomerID])
```

**Demo - Measure 5: Durchschnittlicher Bestellwert (Verbundmeasure)**
```dax
Durchschnittlicher Bestellwert = DIVIDE([Umsatz], [Anzahl Bestellungen])
```
- Formatieren: Währung, 2 Dezimalstellen

*DIVIDE statt /-Operator weil Anzahl Bestellungen 0 werden könnte - z.B. wenn ein Filter keine Bestellungen trifft. DIVIDE gibt dann BLANK zurück statt einen Fehler.*

**Alle fünf Measures im Datenbereich zeigen:**
- Taschenrechnersymbol neben jedem Measure
- Alle unter orders gruppiert
- Formatierung direkt sichtbar

### Demo: Quickmeasure als Lernwerkzeug

**Demo:**
- Rechtsklick auf orders - "Schnellmeasure"
- Berechnung: "Division" wählen
- Zähler: [Umsatz], Nenner: [Anzahl Bestellungen]
- OK - Power BI generiert ein Measure
- Generierten Code anzeigen und mit unserem DIVIDE-Measure vergleichen

*Quickmeasure ist kein Ersatz für DAX-Kenntnisse, aber ein gutes Lernwerkzeug: Man sieht sofort wie Power BI eine bestimmte Berechnung formuliert. Der generierte Code kann als Ausgangspunkt für eigene Anpassungen dienen.*

**Frage ans Plenum:** Unser Verbundmeasure Nettoumsatz referenziert [Umsatz]. Was passiert wenn wir [Umsatz] löschen?

> **Erwartete Antwort:** Nettoumsatz schlägt fehl - die Referenz ist ungültig.
> Genau. Verbundmeasures sind voneinander abhängig. Immer von unten nach oben löschen wenn man aufräumt.

---

## Block 5 - Iteratorfunktionen

**Überleitung:** Unser Umsatz-Measure rechnet Einzelpreis * Menge. Das ist eine zeilenweise Berechnung über zwei Spalten. SUM kann das nicht direkt - SUM aggregiert nur eine Spalte. Das richtige Werkzeug ist SUMX.

**Frage ans Plenum:** Wir schreiben SUM(orders[Einzelpreis] * orders[Menge]). Funktioniert das?

> **Erwartete Antwort:** Nein - SUM erwartet eine Spalte, keinen Ausdruck.
> Korrekt. SUM(orders[Einzelpreis] * orders[Menge]) gibt einen Fehler. Wir brauchen SUMX.

### Demo: SUM vs. SUMX

**Demo - Fehler zeigen:**
- Neues Measure: `Test Fehler = SUM(orders[Einzelpreis] * orders[Menge])`
- Power BI zeigt Fehler in der Bearbeitungsleiste
- Measure abbrechen

**Demo - SUMX korrekt:**
```dax
Umsatz SUMX =
SUMX(
    orders,
    orders[Einzelpreis] * orders[Menge]
)
```
- Ergebnis mit [Umsatz] in einem Kartenvisual vergleichen - identisch

*SUMX: erstes Argument ist die Tabelle die durchlaufen wird, zweites Argument ist der Ausdruck der für jede Zeile berechnet wird. Jede Zeile ergibt Einzelpreis * Menge dieser Zeile. Am Ende werden alle Zeilenwerte summiert.*

*Unser erstes Umsatz-Measure (SUM(orders[Einzelpreis] * orders[Menge])) hat Power BI intern automatisch als SUMX interpretiert - das ist der Grund warum es funktioniert hat. SUM mit einem Ausdruck über eine Spalte ist ein Spezialfall der intern zu SUMX konvertiert wird.*

### Demo: SUMX mit RELATED

**Szenario:** Wir wollen den Umsatz nicht mit dem Einzelpreis aus orders berechnen, sondern mit dem Listenpreis aus products. Das misst die Abweichung zwischen Listenpreis und tatsächlichem Einzelpreis.

```dax
Listenpreis Umsatz =
SUMX(
    orders,
    orders[Menge] * RELATED(products[Listenpreis])
)
```

- In Kartenvisuals nebeneinander: [Umsatz] und [Listenpreis Umsatz]
- Der Listenpreisumsatz ist höher - weil Einzelpreise oft unter dem Listenpreis liegen (Rabatte)

*RELATED innerhalb von SUMX: In jedem Iterationsschritt steht SUMX in einer bestimmten Zeile von orders. RELATED greift von dort auf die verbundene Zeile in products zu - also das Produkt dieser Bestellung. Das funktioniert weil die Beziehung orders → products besteht.*

### Demo: AVERAGEX für durchschnittlichen Bestellwert pro Kunde

**Szenario:** Wie hoch ist der durchschnittliche Gesamtbestellwert pro Kunde - also nicht der Durchschnitt aller Bestellzeilen, sondern der Durchschnitt der Kundensummen?

```dax
Umsatz Ø pro Kunde =
AVERAGEX(
    VALUES(orders[CustomerID]),
    [Umsatz]
)
```

- VALUES(orders[CustomerID]) gibt die Liste aller eindeutigen Kunden im aktuellen Filterkontext zurück
- Für jeden Kunden berechnet AVERAGEX das Measure [Umsatz] - also den Umsatz dieses einen Kunden
- Am Ende: Durchschnitt aller Kundenumsätze

*Der Unterschied zu AVERAGE([Umsatz]): AVERAGE würde den Durchschnitt aller Einzelbestellungen nehmen. AVERAGEX mit VALUES nimmt den Durchschnitt der Kundensummen - eine höhere Aggregationsebene.*

### Demo: RANKX für Salesrep-Ranking

*Hinweis für den Trainer: Dieser Block ist länger als die übrigen Demos. RANKX ist konzeptionell schwerer als SUMX oder AVERAGEX, weil zwei unabhängige Filterkontexte gleichzeitig im Spiel sind. Die Demo ist deshalb in vier Stufen aufgebaut: erst ein kaputtes Measure das einen häufigen Fehler zeigt, dann schrittweise die korrekte Lösung. Nicht überspringen.*

**Szenario:** Wir wollen wissen welcher Verkaufsberater den höchsten Umsatz erzielt hat. Das Ergebnis soll als Rangnummer in einer Tabelle erscheinen: Rang 1 für den Besten, Rang 2 für den Zweiten usw.

**Voraussetzung sicherstellen:**
- Das Measure `[Umsatz]` aus Block 4 muss vorhanden sein
- Tabellenvisual in der Berichtsansicht anlegen: salesreps[Nachname], salesreps[Vorname], [Umsatz]
- Tabelle kurz zeigen - die Teilnehmer sehen die Umsätze pro Person, aber noch keine Rangnummern

---

**Stufe 1: Naiver Versuch - zeigen warum er scheitert**

Neues Measure anlegen:

```dax
Rep Rang Falsch = RANKX(salesreps, [Umsatz])
```

Measure in die Tabelle ziehen. Ergebnis: alle Verkaufsberater haben Rang 1.

**Frage ans Plenum:** Was ist hier falsch?

> **Erwartete Antwort:** Alle haben denselben Rang - das kann nicht stimmen.
> Genau. Warum passiert das?

**Erklärung:**

RANKX arbeitet in zwei Phasen.

Phase 1 - Scan: RANKX läuft durch die angegebene Tabelle (hier: salesreps) und berechnet für jede Zeile den Ausdruck [Umsatz]. Es entsteht intern eine Liste mit allen Umsatzwerten.

Phase 2 - Vergleich: Für die aktuelle Tabellenzeile - z.B. Zeile "Heintze" - berechnet RANKX [Umsatz] nochmal und sucht die Position dieses Werts in der Liste aus Phase 1.

Das Problem: Die Tabelle in Phase 1 ist ungefiltert, aber das Measure [Umsatz] reagiert auf den Filterkontext. Wenn die Tabelle in Phase 1 alle Verkaufsberater enthält, berechnet Power BI für jede Zeile dieser Tabelle [Umsatz] im Kontext dieser Zeile - also den Umsatz genau dieses einen Verkaufsberaters. Soweit korrekt. Aber in Phase 2 berechnet RANKX [Umsatz] im aktuellen Filterkontext der Tabellenzeile - der ist ebenfalls auf genau diesen Verkaufsberater eingeschränkt. Der Wert aus Phase 2 taucht in der Liste aus Phase 1 immer an Position 1 auf, weil er identisch mit dem Eintrag für diesen Verkaufsberater ist. Ergebnis: jeder rankt sich selbst als Besten.

*Das ist der häufigste RANKX-Fehler. Das Measure sieht syntaktisch richtig aus, aber die Logik ist falsch. Kurz stehen lassen damit die Teilnehmer das Problem verinnerlichen.*

---

**Stufe 2: ALL hinzufügen**

Measure korrigieren:

```dax
Rep Rang V2 =
RANKX(
    ALL(salesreps[Nachname]),
    [Umsatz]
)
```

Measure in die Tabelle ziehen, altes Measure entfernen.

Jetzt erscheinen echte Ränge: Rang 1 für Heintze (256.626 EUR), Rang 2 für Henschel (217.781 EUR) usw.

**Erklärung ALL:**

`ALL(salesreps[Nachname])` hebt alle Filter auf der Spalte Nachname auf. Die Tabelle für Phase 1 enthält jetzt alle Nachnamen - unabhängig davon was gerade im Filterkontext aktiv ist. RANKX berechnet [Umsatz] für jeden Nachnamen in dieser vollständigen Liste und baut eine korrekte Rangliste aller Verkaufsberater.

In Phase 2 berechnet RANKX [Umsatz] für den aktuellen Verkaufsberater und sucht dessen Position in der Gesamtliste. Das ergibt den korrekten Rang.

**Frage ans Plenum:** Was würde passieren wenn wir einen Slicer auf die Region setzen - z.B. nur "Nord"?

> **Erwartete Antwort:** Nur die Nordverkäufer werden angezeigt, aber der Rang bezieht sich weiterhin auf alle.
> Genau. ALL hebt den Filter auf - auch wenn der Benutzer filtert. Rang 1 ist immer der beste Verkaufsberater aller Regionen, nicht nur der besten der sichtbaren. Das ist meist das gewünschte Verhalten: ein absoluter Rang, kein relativer.

---

**Stufe 3: Gesamtzeile reparieren**

Im aktuellen Visual: die Gesamtzeile zeigt Rang 1.

**Warum?** In der Gesamtzeile ist kein einzelner Verkaufsberater gefiltert. [Umsatz] gibt die Summe aller Verkaufsberater zurück - das ist der größte Einzelwert in der Rangliste, also Rang 1. Das ist inhaltlich Unsinn.

Measure korrigieren:

```dax
Rep Rang V3 =
IF(
    HASONEVALUE(salesreps[Nachname]),
    RANKX(
        ALL(salesreps[Nachname]),
        [Umsatz]
    )
)
```

Gesamtzeile ist jetzt leer.

**Erklärung HASONEVALUE:**

`HASONEVALUE(salesreps[Nachname])` gibt TRUE zurück wenn der aktuelle Filterkontext genau einen Nachnamen enthält. In jeder normalen Tabellenzeile ist das der Fall. In der Gesamtzeile enthält der Filterkontext alle Nachnamen - HASONEVALUE gibt FALSE zurück. IF ohne Else-Zweig gibt dann BLANK zurück. Die Gesamtzeile bleibt leer.

**Frage ans Plenum:** Warum gibt IF ohne zweiten Zweig BLANK zurück und nicht 0?

> **Erwartete Antwort:** BLANK ist der Standardrückgabewert wenn kein Else definiert ist.
> Richtig. BLANK und 0 sind in DAX nicht dasselbe. BLANK in einer Zahlenspalte erscheint als leer, 0 als Zahl. Für Rangspalten ist BLANK die richtige Wahl - eine leere Gesamtzeile ist besser als eine Null.

---

**Stufe 4: Gleichstände mit DENSE behandeln**

Das aktuelle Measure überspringt Ränge bei Gleichstand. Wenn zwei Verkaufsberater denselben Umsatz hätten - beide Rang 3 - würde der nächste Rang 5 bekommen, Rang 4 wird übersprungen.

Finalversion des Measures:

```dax
Rep Rang =
IF(
    HASONEVALUE(salesreps[Nachname]),
    RANKX(
        ALL(salesreps[Nachname]),
        [Umsatz],
        ,
        ,
        DENSE
    )
)
```

*Die zwei leeren Kommas vor DENSE: RANKX hat fünf Argumente. Argument 3 ist ein alternativer Wert für die Vergleichsphase (fast nie benötigt), Argument 4 ist die Sortierreihenfolge (Standard: absteigend, passt für Umsatz). Beide leer lassen, Argument 5 auf DENSE setzen.*

**Erklärung DENSE:**

Ohne DENSE: Rang 1, 2, 2, 4 - Rang 3 wird übersprungen weil zwei Personen auf Platz 2 stehen.
Mit DENSE: Rang 1, 2, 2, 3 - nach dem Gleichstand geht es lückenlos weiter.

In fast allen Geschäftsberichten ist DENSE die bessere Wahl. Eine Rangliste die von 2 auf 4 springt wirkt wie ein Fehler, auch wenn sie technisch korrekt ist.

**Altes falsche Measure löschen:** Rep Rang Falsch und Rep Rang V2 und Rep Rang V3 im Datenbereich rechtsklicken - Löschen.

---

**Zweites Beispiel: Kategorie-Ranking**

Dieses Beispiel zeigt RANKX mit einer anderen Tabelle und verdeutlicht noch einmal den DENSE-Effekt an einem konkreten Zahlenpaar.

```dax
Kategorie Rang =
IF(
    HASONEVALUE(products[Kategorie]),
    RANKX(
        ALL(products[Kategorie]),
        [Umsatz],
        ,
        ,
        DENSE
    )
)
```

Tabellenvisual: products[Kategorie], [Umsatz], [Kategorie Rang].

Erwartetes Ergebnis mit unseren Daten:

| Kategorie | Umsatz | Rang |
|---|---|---|
| Hardware | 2.032.297 | 1 |
| Software | 530.524 | 2 |
| Dienstleistung | 529.449 | 3 |
| Zubehör | 194.103 | 4 |

**Hinweis für den Trainer:** Software (530k) und Dienstleistung (529k) liegen in unseren Daten knapp beieinander, aber nicht gleich. Trotzdem ist das ein guter Moment um zu erklären: Wären beide Werte identisch, würden beide Rang 2 bekommen und Zubehör Rang 3 (DENSE) statt Rang 4 (ohne DENSE). Kurz verbal durchspielen ohne das Measure zu ändern.

**Frage ans Plenum:** Wozu ist HASONEVALUE hier nötig - wir haben doch keine Gesamtzeile die einen Rang bekommen würde?

> **Erwartete Antwort:** Tabellenvisuals zeigen immer eine Gesamtzeile - auch wenn sie nicht sichtbar ist. Und wenn ein Benutzer Kategorien in einem anderen Kontext verwendet, z.B. in einem Matrixvisual, kann der Fall eintreten.
> Genau. HASONEVALUE kostet nichts und verhindert unerwartete Werte in Kontexten die wir beim Erstellen des Measures nicht kennen. Es gehört zum Standardmuster.

---

**Zusammenfassung RANKX - Merksätze für die Klasse:**

- RANKX braucht immer ALL() - sonst rankt jeder sich selbst als Besten
- RANKX braucht immer HASONEVALUE - sonst zeigt die Gesamtzeile Rang 1
- RANKX bekommt fast immer DENSE - sonst wirken Lücken wie Fehler
- Der Ausdruck in RANKX muss ein Measure sein, keine Spalte - Measures reagieren auf den Filterkontext, Spalten nicht

---

## Abschluss und Übergang

**Kurze Zusammenfassung - Frage ans Plenum:**

"Wann nehmt ihr eine berechnete Spalte, wann ein Measure?"

> **Erwartete Antwort:** Berechnete Spalte wenn die Berechnung zeilenbasiert ist und als Attribut gespeichert werden soll - z.B. Kategorie per RELATED. Measure wenn die Berechnung aggregiert und vom Filterkontext abhängt - z.B. Umsatz, Anzahl Kunden.
> Merksatz: Spalte filtert und gruppiert. Measure fasst zusammen.

**Übergang zu Skript 12:**
"Die Measures die wir gebaut haben reagieren auf Filter - aber wie genau? Warum zeigt [Umsatz] in einer Tabelle nach Region andere Werte als in einem Kartenvisual ohne Filter? Das erklärt Skript 12: Filterkontext und CALCULATE."

---

## Mini-Quiz

---

**Frage 1:** Welche Funktion erstellt automatisch eine lückenlose Datumstabelle basierend auf den Datumsspalten im Modell?

- a) CALENDAR()
- b) CALENDARAUTO() (richtig)
- c) DATEAUTO()
- d) GENERATEDATE()

> **Antwort:** b) CALENDARAUTO() scannt alle Datums- und Datum/Uhrzeit-Spalten im Modell und erzeugt eine vollständige Tabelle vom frühesten bis zum spätesten Datum.

---

**Frage 2:** orders ist auf der Viele-Seite der Beziehung zu products. Welche Funktion holt den Listenpreis aus products für jede Zeile in orders?

- a) RELATEDTABLE(products[Listenpreis])
- b) LOOKUPVALUE(products[Listenpreis])
- c) RELATED(products[Listenpreis]) (richtig)
- d) VLOOKUP(products[Listenpreis])

> **Antwort:** c) RELATED() navigiert von der Viele-Seite (orders) zur 1-Seite (products) und gibt den Wert der angegebenen Spalte zurück.

---

**Frage 3:** Ein Berichtsautor ändert die Aggregation der Spalte orders[Einzelpreis] von Summe auf Mittelwert. Was hätte das verhindert?

- a) Die Spalte mit DISTINCTCOUNT schützen
- b) Die Spalte ausblenden und ein explizites Measure anlegen (richtig)
- c) Die Spalte als Primärschlüssel markieren
- d) Den Datentyp auf Text ändern

> **Antwort:** b) Ausgeblendete Spalten sind im Datenbereich nicht verfügbar. Ein explizites Measure ist unveränderlich - die Aggregationslogik ist fest in der DAX-Formel.

---

**Frage 4:** Was gibt SUMX(orders, orders[Einzelpreis] * orders[Menge]) zurück?

- a) Die Summe aller Einzelpreise multipliziert mit der Summe aller Mengen
- b) Den Durchschnitt von Einzelpreis * Menge
- c) Die Summe der zeilenweisen Produkte von Einzelpreis und Menge (richtig)
- d) Einen Fehler - SUMX akzeptiert keinen Ausdruck als zweites Argument

> **Antwort:** c) SUMX berechnet für jede Zeile Einzelpreis * Menge und summiert dann alle Zeilenergebnisse. Das ist der korrekte Umsatz pro Bestellzeile aufaddiert.

---

**Frage 5:** Wofür steht DENSE im RANKX-Aufruf?

- a) Die Tabelle wird komprimiert bevor gerankt wird
- b) Bei Gleichstand werden keine Ränge übersprungen (richtig)
- c) Absteigende Sortierung wird erzwungen
- d) Alle Filter werden ignoriert

> **Antwort:** b) Ohne DENSE: Rang 1, 2, 2, 4 (Rang 3 wird übersprungen). Mit DENSE: Rang 1, 2, 2, 3. In Berichten ist DENSE meist die sinnvollere Option.
