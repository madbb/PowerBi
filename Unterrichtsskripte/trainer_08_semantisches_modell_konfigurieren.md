# Trainer-Skript 08 - Semantisches Modell konfigurieren

> **Themen:** Beziehungen · Kardinalität · Kreuzfilterrichtung · Tabellen & Spalten · Hierarchien · Measures · Parameter
> **Schüler-Skript:** 08_semantisches_modell_konfigurieren.md

---

## Einstieg

**Frage ans Plenum:** Wir haben in Skript 06 Daten bereinigt und geladen. Was fehlt noch, bevor wir einen sinnvollen Bericht bauen können?

- Antworten sammeln: Beziehungen, Berechnungen, Struktur
- Überleitung: Genau. Power Query liefert saubere Tabellen. Aber die Tabellen wissen noch nichts voneinander. Das semantische Modell schließt diese Lücke.

**Kerngedanke ansprechen:**
- Ziel ist eine Semantikebene über den Daten
  *Semantikebene bedeutet: eine Schicht, die den Daten Bedeutung gibt. Rohdaten wissen nicht, dass KundenID in der Bestelltabelle dieselbe KundenID in der Kundentabelle meint. Das semantische Modell stellt diese Verbindung her und gibt den Daten damit ihren Sinn.*
- Das Modell soll Berichtsanforderungen unterstützen, intuitiv bedienbar sein und korrekte Ergebnisse liefern
- Alles beginnt mit Beziehungen

---

## Block 1 - Beziehungen konfigurieren

**Frage ans Plenum:** Wir haben gerade vier Tabellen aus Power Query geladen: orders, customers, products, salesreps. Was fehlt noch, bevor wir sinnvoll damit arbeiten können?

> **Erwartete Antwort:** Die Tabellen wissen nichts voneinander. Es fehlen die Verbindungen.
> Genau. Power BI hat vier Inseln. Beziehungen bauen die Brücken.

*Filterkontext ist einer der Grundbegriffe in Power BI. Er beschreibt, welche Daten aktuell "aktiv" sind, also durch welche Filter die Datenmenge eingeschränkt wurde. Wenn ich auf eine Kachel "Region Süd" klicke, ist der Filterkontext "Region = Süd". Dieser Kontext muss über Beziehungen von Tabelle zu Tabelle fließen - sonst bleibt jede Tabelle für sich.*

**Wichtiger Hinweis vorab:**
- Die automatische Beziehungserkennung in Power BI Desktop ist deaktiviert worden
  *In den Optionen unter "Daten laden" gibt es die Einstellung "Beziehungen aus Datenquellen beim ersten Laden importieren" und "Beziehungen beim Aktualisieren von Daten aktualisieren oder löschen". In professionellen Modellen werden diese Optionen deaktiviert. Warum: Power BI erkennt Beziehungen anhand gleicher Spaltennamen - das ist fehleranfällig und erzeugt oft falsche oder unvollständige Verbindungen. Wir bauen alles manuell.*

---

### Schritt 1 - Modellansicht öffnen und Überblick verschaffen

**Demo:**
- Modellansicht über das dritte Symbol in der linken Leiste öffnen
- Vier Tabellen liegen unverbunden im Diagramm
- Tabellen per Drag & Drop im Diagramm anordnen: orders in die Mitte, customers, products, salesreps drumherum
  *Das ist kein technischer Schritt, sondern ein visueller. Die Anordnung ändert nichts am Modell. Aber ein Sternschema das auch wie ein Stern aussieht, ist leichter zu lesen und zu prüfen.*

**Frage ans Plenum:** Welche Tabelle ist die Faktentabelle, welche sind Dimensionen?

> **Erwartete Antwort:** orders ist die Faktentabelle. customers, products, salesreps sind Dimensionen.
> orders enthält die Transaktionen - eine Zeile pro Bestellung. Die anderen Tabellen beschreiben die Beteiligten.

---

### Schritt 2 - Schlüsselspalten identifizieren

**Tabellen und ihre Schlüssel kurz zeigen:**

| Tabelle | Primärschlüssel | Eindeutig? |
|---|---|---|
| customers | CustomerID (K0001, K0002, ...) | Ja - jeder Kunde genau einmal |
| products | ProductID (P0001, P0002, ...) | Ja - jedes Produkt genau einmal |
| salesreps | SalesRepID (SR001, SR002, ...) | Ja - jeder Vertreter genau einmal |
| orders | OrderID (O00001, O00002, ...) | Ja - jede Bestellung genau einmal |
| orders | CustomerID | Nein - derselbe Kunde kauft mehrfach |
| orders | ProductID | Nein - dasselbe Produkt wird mehrfach bestellt |
| orders | SalesRepID | Nein - derselbe Vertreter hat mehrere Bestellungen |

*Die Spalten CustomerID, ProductID und SalesRepID kommen in orders als Fremdschlüssel vor. Sie zeigen auf die Primärschlüssel der Dimensionstabellen. Das ist die Grundlage jeder Beziehung.*

**Beziehungsgrundlage ansprechen:**
- Jede Beziehung verbindet genau eine Spalte aus Tabelle A mit einer Spalte aus Tabelle B
- Datentypen beider Spalten müssen übereinstimmen - das haben wir in Power Query sichergestellt
  *Wenn CustomerID in orders ein Text ist und in customers eine Zahl, kann Power BI keine Beziehung anlegen. Das ist eine der häufigsten Fehlerquellen. Immer in Power Query prüfen.*

---

### Schritt 3 - Erste Beziehung anlegen: customers zu orders

**Demo:**
- In der Modellansicht: Spalte CustomerID in customers anklicken, gedrückt halten, auf CustomerID in orders ziehen und loslassen
- Power BI legt die Beziehung an und zeigt eine Linie zwischen den Tabellen
- Doppelklick auf die Linie: Beziehungseigenschaften öffnen sich

**Was in den Eigenschaften zu sehen ist - erklären:**
- Kardinalität: Eins-zu-viele (1:*) - customers ist die 1-Seite, orders die *-Seite
  *Power BI erkennt das automatisch: CustomerID in customers ist eindeutig (kein Wert doppelt), CustomerID in orders kommt mehrfach vor. Daraus folgt: 1 zu viele.*
- Kreuzfilterrichtung: Einzeln, von customers zu orders
  *Der Pfeil zeigt in die Richtung, in die Filter fließen. Ein Filter auf customers (z.B. Segment = "Großkunde") filtert automatisch die Bestellungen dieses Segments in orders. Andersherum passiert das nicht.*

**Fenster schließen. Zurück im Diagramm:**
- Das 1-Symbol steht bei customers (eindeutige Seite)
- Das *-Symbol steht bei orders (mehrfach-Seite)
- Der Pfeil zeigt von customers nach orders

---

### Schritt 4 - Restliche Beziehungen anlegen

**Demo, alle drei in Folge:**
- ProductID aus products auf ProductID in orders ziehen
- SalesRepID aus salesreps auf SalesRepID in orders ziehen

**Ergebnis zeigen und kommentieren:**
- orders hat jetzt drei Beziehungslinien, eine zu jeder Dimensionstabelle
- Alle drei sind 1:* mit Filterrichtung von der Dimension zur Faktentabelle
- Das ist das Sternschema - orders in der Mitte, Dimensionen als Zacken

**Frage ans Plenum:** Warum zeigt der Pfeil immer von der Dimensionstabelle zur Faktentabelle und nicht umgekehrt?

> **Erwartete Antwort:** Weil die Dimensionen filtern und die Faktentabelle gefiltert wird.
> Genau. Ich wähle eine Region in customers aus - und orders zeigt nur noch die Bestellungen dieser Region. Das ist die natürliche Richtung. Andersherum würde bedeuten: Eine Bestellung filtert zurück, welche Kunden angezeigt werden. Das ergibt in den meisten Fällen keinen Sinn.

---

### Kardinalitätstypen im Überblick

*Bevor wir zu den weiteren Szenarien kommen - kurzer Überblick über alle vier Typen, damit der Kontext klar ist.*

| Kardinalität | Bedeutung | Unser Beispiel | Typischer Einsatz |
|---|---|---|---|
| 1:* (Eins-zu-viele) | 1-Seite hat eindeutige Werte, *-Seite mehrfache | customers zu orders | Standard: Dimension zu Faktentabelle |
| *:1 (Viele-zu-eins) | Dasselbe, andere Blickrichtung | orders zu customers | Identisch, nur anders beschrieben |
| 1:1 (Eins-zu-eins) | Beide Seiten eindeutig | - | Selten - besser in Power Query zusammenführen |
| *:* (Viele-zu-viele) | Keine eindeutige Seite | - | Komplex - nur mit gutem Grund |

---

### Kreuzfilterrichtung - was passiert bei "Beide"

**Szenario zeigen - konkret mit unseren Daten:**

Standardfall (Einzeln): Ein Datenschnitt auf customers.Segment = "Großkunde" filtert orders - es erscheinen nur Bestellungen von Großkunden. Die Tabelle salesreps wird davon nicht berührt.

Was passiert bei bidirektionaler Filterung: Der Filter fließt auch in die andere Richtung. Jetzt filtert orders auch zurück nach customers. Das klingt harmlos, kann aber dazu führen, dass ein Visual "Anzahl Kunden pro Vertreter" plötzlich falsche Werte zeigt - weil ein Filter aus einer Bestellaggregation zurück in die Kundentabelle läuft und Kunden ohne Bestellungen im aktuellen Kontext ausblendet.

**Klare Regel:**
- Kreuzfilterrichtung bleibt auf Einzeln - das ist der Standard und in 90% der Fälle richtig
- Bidirektional nur wenn es einen konkreten fachlichen Grund gibt

  *Der einzige häufige Grund: eine Brückentabelle, die eine Viele-zu-viele-Beziehung zwischen zwei Dimensionstabellen auflöst. Beispiel: ein Vertreter betreut mehrere Regionen, eine Region hat mehrere Vertreter. Dann gibt es eine Zwischentabelle mit SalesRepID und RegionID. Bidirektionale Filterung erlaubt dann Analysen in beide Richtungen über diese Brücke.*

---

### Aktive und inaktive Beziehungen - das Bestelldatum-Szenario

**Auf unsere Daten zeigen:**
- orders hat zwei Datumsspalten: Bestelldatum und Lieferdatum
- Wenn wir später eine Datumstabelle einbinden wollen, entsteht ein Problem

**Problem erklären:**
- Eine Datumstabelle kann nur eine aktive Beziehung zu orders haben
- Zweite Verbindung wird automatisch inaktiv gesetzt und als gestrichelte Linie angezeigt
  *Inaktiv bedeutet: Die Beziehung ist im Modell sichtbar, wird aber für Filter und Berechnungen nicht verwendet. Power BI ignoriert sie standardmäßig.*

**Lösungen:**
- Lösung 1: eine aktive Beziehung (Bestelldatum), eine inaktive (Lieferdatum) - inaktive per USERELATIONSHIP in einem DAX-Measure gezielt aktivieren
  *USERELATIONSHIP ist eine DAX-Funktion. Man sagt damit: "Für diese Berechnung verwende nicht die aktive Beziehung, sondern diese hier." So kann ein Measure "Umsatz nach Lieferdatum" die inaktive Beziehung nutzen, während alle anderen Visuals mit dem Bestelldatum arbeiten.*
- Lösung 2: zwei separate Datumstabellen mit je einer aktiven Beziehung

*Das nennt sich Rollenspieldimension - dieselbe Dimension (Datum) spielt mehrere Rollen im Modell. Das Datum-Szenario ist das klassische Beispiel.*

**Frage ans Plenum:** Wann würdet ihr Lösung 1 wählen, wann Lösung 2?

> **Erwartete Antworten:** Lösung 1 wenn das Lieferdatum selten gebraucht wird. Lösung 2 wenn beide Daten gleichwertig für Berichte genutzt werden.
> Beides ist korrekt. Lösung 2 ist einfacher zu verstehen und zu warten. Lösung 1 spart eine Tabelle im Modell.

---

## Block 2 - Tabellen konfigurieren

**Überleitung:** Beziehungen stehen. Jetzt verfeinern wir das Modell. Tabelleneigenschaften sind der erste Schritt.

### Demo: Tabelleneigenschaften aufrufen

**Demo:**
- In der Modellansicht: auf den Tabellenkopf von customers klicken (nicht auf eine Spalte, sondern auf den Namen oben)
- Rechts im Bereich "Eigenschaften" erscheinen die Einstellungen zur Tabelle
- Alternativ: Rechtsklick auf den Tabellenkopf - Eigenschaften

**Eigenschaften kurz durchgehen:**

- Name: benutzerfreundlich, wird mit Power Query-Abfragename synchronisiert
  *Wenn man die Tabelle in Power Query umbenennt, ändert sich der Name hier automatisch mit. Umgekehrt gilt das nicht - Umbenennung hier hat keinen Einfluss auf Power Query.*
- Beschreibung: erscheint als Tooltip im Datenbereich
  *Tooltip ist der kleine Hilfetext, der erscheint wenn man mit der Maus über ein Element fährt ohne zu klicken. Eine gute Beschreibung hilft Berichtsautoren zu verstehen, was diese Tabelle enthält.*
- Synonyme: alternative Namen für Q&A und Copilot
  *Q&A ist eine Power BI-Funktion, bei der man eine Frage in natürlicher Sprache stellt und Power BI ein Visual generiert. Synonyme helfen dabei: Wenn die Tabelle "customers" heißt, aber jemand "Kunden" tippt, wird das durch ein Synonym erkannt.*
- Ist ausgeblendet: Tabelle wird im Datenbereich nicht angezeigt
  *Sinnvoll für Brückentabellen und reine Hilfstabellen, die Berichtsautoren nicht direkt nutzen sollen.*

### Demo: Auto Datum/Uhrzeit deaktivieren

**Demo:**
- Datei - Optionen und Einstellungen - Optionen
- Abschnitt "Aktuelle Datei" - "Daten laden"
- Haken bei "Auto Datum/Uhrzeit" entfernen - OK

  *Auto Datum/Uhrzeit ist eine Power BI-Standardeinstellung, die für jede Datumsspalte automatisch eine versteckte Hilfstabelle im Hintergrund erstellt. Das klingt hilfreich, bläht aber das Modell auf - vor allem wenn es viele Datumsspalten gibt. Wir deaktivieren das und verwenden später eine eigene Datumstabelle.*

**Hinweis für Schüler:** Diese Einstellung gilt nur für die aktuelle Datei. Bei einer neuen .pbix-Datei muss sie neu gesetzt werden - oder man deaktiviert sie einmalig unter "Globale Einstellungen".

### Demo: Als Datumstabelle markieren (Vorschau)

*Das ist noch kein Schritt den wir jetzt durchführen - wir haben noch keine Datumstabelle. Aber der Pfad ist wichtig zu kennen:*
- Tabelle in der Modellansicht anklicken
- Oben in der Menüleiste erscheinen "Tabellentools"
- Tabellentools - Als Datumstabelle markieren - Als Datumstabelle markieren
- Power BI prüft automatisch: eindeutige Werte, keine Leerwerte, lückenlose Datumsangaben

**Frage ans Plenum:** Warum sollte Auto Datum/Uhrzeit deaktiviert werden?

> **Erwartete Antwort:** Power BI erstellt für jede Datumsspalte automatisch versteckte Tabellen. Das bläht das Modell auf und kann Zeitintelligenz-Berechnungen beeinflussen wenn man später eigene Datumstabellen hinzufügt.
> Für professionelle Modelle immer deaktivieren und eigene Datumstabelle verwenden.

---

## Block 3 - Spalten konfigurieren

**Frage ans Plenum:** Ihr habt eine Spalte "Monat" mit Werten wie "2024 Jan", "2024 Feb" und so weiter. Power BI sortiert sie alphabetisch. Was ist das Problem?

> **Erwartete Antwort:** Alphabetisch ergibt keine chronologische Reihenfolge. "2024 Apr" kommt vor "2024 Jan".
> Nach Spalte sortieren löst das: MonthKey als Sortiergrundlage.

*MonthKey ist eine Hilfsspalte mit einer Zahl für den Monat: Januar = 1, Februar = 2 usw. Man sortiert dann die lesbare "2024 Jan"-Spalte nach der numerischen MonthKey-Spalte. Power BI zeigt "Jan" an, sortiert aber nach der Zahl.*

### Demo: Spalteneigenschaften aufrufen

**Demo:**
- In der Modellansicht: auf eine Spalte in einer Tabelle klicken, z.B. Einzelpreis in orders
- Rechts im Bereich "Eigenschaften" erscheinen die Spalteneinstellungen
- Alternativ: In der Datensicht dieselbe Spalte anklicken - Spaltentools erscheinen oben in der Menüleiste

**Eigenschaften kurz erklären:**

- Datentyp: bestimmt wie Werte gespeichert werden
  *Beispiel: Dezimalzahl, Ganzzahl, Text, Datum, Wahr/Falsch. Der Datentyp sollte in Power Query bereits korrekt gesetzt worden sein. Hier kann er nachträglich angepasst werden - aber Power Query ist der bessere Ort dafür.*
- Format: bestimmt wie Werte in Visuals dargestellt werden
  *Beispiel: Eine Zahl wie 1234567 kann als "1.234.567 EUR" formatiert werden. Der Datentyp bleibt Dezimalzahl, die Darstellung ändert sich durch das Format.*
- Nach Spalte sortieren: andere Spalte als Sortiergrundlage festlegen
  *Wichtig für Monatsnamen, Wochentage, jede Spalte wo alphabetische Sortierung falsch wäre.*
- Datenkategorie: semantische Beschreibung für räumliche Werte, Web-URLs, Bild-URLs
  *Datenkategorie teilt Power BI mit, was die Werte in dieser Spalte bedeuten. Wenn eine Spalte Städtenamen enthält und die Datenkategorie "Stadt" gesetzt ist, kann Power BI die Daten automatisch auf einer Landkarte darstellen.*
- Zusammenfassen nach: Standardaggregation für numerische Spalten
  *Wenn man eine numerische Spalte aus dem Datenbereich in ein Visual zieht, aggregiert Power BI sie automatisch. Standardmäßig ist das "Summe". PLZ oder OrderID sollen nicht summiert werden - Zusammenfassen nach = Keine.*

### Demo: Zusammenfassen nach korrigieren

**Konkretes Beispiel mit unseren Daten:**
- Spalte PLZ in customers anklicken
- Rechts: Zusammenfassen nach steht vermutlich auf "Summe"
- Das ergibt keinen Sinn - PLZ ist keine messbare Größe
- Zusammenfassen nach auf "Keine" setzen

*Das ist eine der häufigsten Fehlerquellen in Power BI-Berichten: Numerische Spalten die eigentlich Kennungen sind (PLZ, OrderID, Artikelnummer) werden automatisch summiert. Das Ergebnis sieht wie eine echte Zahl aus, ist aber Unsinn.*

### Demo: Anzeigeordner erstellen

**Demo:**
- Spalte Einzelpreis in orders anklicken
- Rechts unter "Anzeigeordner" einen Namen eingeben, z.B. "Kennzahlen"
- Dasselbe für Menge und Rabatt
- Im Datenbereich (rechte Seite in der Berichtsansicht) sind die drei Spalten jetzt im Ordner "Kennzahlen" gruppiert

  *Anzeigeordner ist ein logischer Ordner im Datenbereich - er sortiert nichts in der Datenbank, nur die Darstellung für den Berichtsautor. Sinnvoll ab 8-10 Feldern in einer Tabelle.*

**Wichtige Empfehlung betonen:**
- Numerische Spalten die nicht aggregiert werden sollen: Zusammenfassen nach = Keine
- Oder Spalte ausblenden und stattdessen ein explizites Measure erstellen
  *Das ist oft die sauberere Lösung: Die rohe numerische Spalte ausblenden, damit Berichtsautoren sie nicht versehentlich falsch nutzen. Stattdessen ein Measure erstellen, das die gewünschte Berechnung klar definiert. Das kommt in Skript 09 und 11.*

---

## Block 4 - Hierarchien konfigurieren

**Überleitung:** Datumshierarchien kennen die meisten aus Excel. In Power BI lassen sie sich für beliebige Spalten erstellen.

**Frage ans Plenum:** Welche Navigationspfade würden in unseren Daten Sinn machen?

> **Erwartete Antworten:** Datum: Jahr - Quartal - Monat. Geographie: Region - Stadt. Produkt: Kategorie - Produktname.
> Genau. Eine Hierarchie definiert diesen Weg vom Groben zum Feinen und macht ihn in Visuals klickbar.

*Drill-down bedeutet: Vom groben Level in ein feineres Level wechseln. Ich sehe Jahreszahlen, klicke auf 2024, und sehe dann die Monate von 2024. Drill-up ist die Rückrichtung.*

### Demo: Hierarchie in customers anlegen

**Demo:**
- Modellansicht - Tabelle customers
- Rechtsklick auf die Spalte Region - "Hierarchie erstellen"
- Eine neue Hierarchie "Region Hierarchie" erscheint unter der Tabelle
- Spalte Stadt per Drag & Drop auf die neue Hierarchie ziehen - als zweite Ebene hinzugefügt
- Reihenfolge prüfen: Region oben (grob), Stadt unten (fein)
- Hierarchiename anpassen: Doppelklick - z.B. "Geographie"

**Ergebnis zeigen:**
- Im Datenbereich (Berichtsansicht) erscheint customers.Geographie als aufklappbare Hierarchie
- Berichtsautor zieht die Hierarchie ins Visual - Drill-up/down ist automatisch aktiviert

**Einschränkung betonen:**
- Hierarchieebenen müssen aus Spalten derselben Tabelle stammen
- Keine tabellenübergreifenden Hierarchien möglich
  *Wer z.B. eine Hierarchie "Kategorie - Produktname - Kunde" über mehrere Tabellen will, muss die Spalten vorher in Power Query in einer gemeinsamen Tabelle zusammenführen.*

**Frage ans Plenum:** Braucht ein Berichtsautor eine Hierarchie um Drill-down zu nutzen?

> **Erwartete Antwort:** Nein. Er kann auch mehrere Spalten manuell zum Visual hinzufügen. Aber eine Hierarchie macht das einfacher und gibt den Navigationspfad vor.
> Hierarchien sind eine Komfortfunktion für Berichtsautoren.

---

## Block 5 - Measures und Parameter konfigurieren

**Frage ans Plenum:** Was ist der Unterschied zwischen einer berechneten Spalte und einem Measure?

> **Erwartete Antwort:** Berechnete Spalte: wird für jede Zeile berechnet und im Modell gespeichert. Measure: wird zur Abfragezeit berechnet, kein Speicherverbrauch.
> Measures sind flexibler und performanter. Für fast alle Berechnungen die erste Wahl.

*Abfragezeit bedeutet: der Moment, in dem ein Visual gerendert wird. Das Measure wird nicht vorab berechnet, sondern immer neu - und dabei automatisch im aktuellen Filterkontext. Das macht Measures so flexibel: Derselbe "Umsatz"-Measure zeigt den richtigen Wert, egal ob er in einem Jahreschart, einem Regionenfilter oder einer Kundentabelle steht.*

### Demo: Einfaches Measure erstellen

**Demo:**
- Modellansicht oder Datensicht - Tabelle orders anklicken
- Startseite - Neues Measure (oder Rechtsklick auf Tabelle - Neues Measure)
- In der Bearbeitungsleiste erscheint: `Measure =`
- Formel eingeben: `Umsatz = SUM(orders[Einzelpreis] * orders[Menge])`
- Enter - das Measure erscheint in der Tabelle orders mit Taschenrechnersymbol

  *Das Taschenrechnersymbol unterscheidet Measures von normalen Spalten. So erkennt man im Datenbereich auf einen Blick, was eine Berechnung und was eine Rohdatenspalte ist. Der Name muss im gesamten Modell eindeutig sein - zwei Measures mit demselben Namen sind nicht möglich.*

**Hinweis:** Ein Measure kann jeder Tabelle zugeordnet werden - nicht nur orders. Manche Modellbauer legen eine leere Tabelle "Measures" an und sammeln dort alle Measures zentral. Das ist Geschmackssache, aber ordentlich.

### Demo: Quickmeasure als Einstieg zeigen

**Demo:**
- Rechtsklick auf Tabelle orders - Schnellmeasure
- Berechnungsfenster öffnet sich: verschiedene Vorlagen wählbar
- Vorlage "Prozentualer Anteil am Gesamtergebnis" wählen
- Feld zuweisen - OK
- Power BI generiert den DAX-Code - im Measure anzeigen und lesen

  *Quickmeasures sind fertige Vorlagen für häufige Berechnungen: prozentualer Anteil, laufende Summe, Vergleich zu Vorperiode. Wer DAX lernen will, liest den generierten Code und versteht das Muster. Das ist ein guter Einstieg.*

### Numerischer Bereichsparameter - Konzept erklären

**Szenario erklären:**
- Aufgabe: Berichtsnutzer soll einen Rabattsatz zwischen 0% und 20% einstellen können
- Ein Datenschnitt soll diesen Wert steuern
- Das Ergebnis: Umsatz nach Rabatt ändert sich in Echtzeit

**Demo:**
- Modellierung - Neuer Parameter - Numerischer Bereich
- Name: "Rabattsatz", Minimum: 0, Maximum: 0.2, Inkrement: 0.01
- OK - Power BI erstellt automatisch eine neue Tabelle und ein Measure
- Im Bericht erscheint automatisch ein Datenschnitt für den Parameter

  *Unverbundene Tabelle bedeutet: Diese Tabelle hat keine Beziehung zu anderen Tabellen im Modell. Sie enthält nur die Werte für den Datenschnitt. Das Measure liest den ausgewählten Wert aus dieser Tabelle. Das Measure in einem Bericht-Visual nutzen: Umsatz * (1 - [Rabattsatz]).*

**Feldparameter kurz ansprechen:**
- Gruppe verschiedener Modellfelder - Berichtsnutzer wählt dynamisch welches Feld ein Visual verwendet
  *Feldparameter ist eine Sammlung von Feldern (Spalten oder Measures), aus denen der Berichtsnutzer eines auswählen kann. Das ausgewählte Feld wird dann dynamisch in einem Visual verwendet.*
- Beispiel: Berichtsnutzer wählt ob er Umsatz nach Kategorie, Region oder Kanal sehen will - ein Visual, drei mögliche Ansichten

**Frage ans Plenum:** Wann würdet ihr einen Feldparameter einsetzen statt einfach mehrere Visuals nebeneinander?

> **Erwartete Antworten:** Wenn der Bericht nicht zu voll werden soll, wenn der Nutzer selbst entscheiden soll welche Dimension er sieht, wenn der Platz begrenzt ist.
> Feldparameter geben dem Berichtsnutzer Kontrolle ohne den Bericht zu überladen.

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- Beziehungen: Kardinalität, Kreuzfilterrichtung, aktiv/inaktiv, Rollenspieldimension
- Tabellen: Name, Beschreibung, Synonyme, Datumstabelle markieren, Auto Datum/Uhrzeit deaktivieren
- Spalten: Datentyp, Format, Nach Spalte sortieren, Datenkategorie, Zusammenfassen nach
- Hierarchien: Navigationspfade innerhalb einer Tabelle, Drill-up/down
- Measures: benannte DAX-Formel, Taschenrechnersymbol, Quickmeasures als Einstieg
- Parameter: numerischer Bereich für Was-wäre-wenn, Feldparameter für dynamische Visual-Auswahl

**Übergang zu Skript 09:**
"Das Modell steht und die Struktur ist klar. Im nächsten Skript steigen wir in DAX ein: was DAX ist, wie es funktioniert und welche Berechnungstypen es gibt."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren - Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Welcher Kardinalitätstyp ist der häufigste in einem Sternschema?

- a) Viele-zu-viele
- b) Eins-zu-eins
- c) Eins-zu-viele (richtig)
- d) Viele-zu-eins

> **Antwort:** c) Eins-zu-viele. Dimensionstabelle (eindeutige Werte, 1-Seite) zur Faktentabelle (mehrere Zeilen je Dimensionswert, *-Seite).

---

**Frage 2:** Was ist eine Rollenspieldimension?

- a) Eine Tabelle die nur für Testdaten verwendet wird
- b) Eine Dimensionstabelle mit mehreren Beziehungen zur Faktentabelle, z.B. Datumstabelle mit Bestelldatum und Versanddatum (richtig)
- c) Eine Tabelle die ausgeblendet ist und nur für DAX-Berechnungen genutzt wird
- d) Eine berechnete Tabelle ohne Beziehung zum Rest des Modells

> **Antwort:** b) Klassisches Beispiel ist die Datumstabelle. Lösung: aktive und inaktive Beziehung, inaktive per USERELATIONSHIP in DAX aktivieren.

---

**Frage 3:** Warum sollte bidirektionale Kreuzfilterung vermieden werden?

- a) Sie funktioniert nur bei DirectQuery-Modellen
- b) Sie verschlechtert die Abfrageleistung und kann zu unerwarteten Filterergebnissen führen (richtig)
- c) Sie ist nur für Viele-zu-viele-Beziehungen verfügbar
- d) Sie verhindert die Nutzung von Hierarchien

> **Antwort:** b) Bidirektionale Filter verdoppeln den Filteraufwand und können zirkuläre Abhängigkeiten erzeugen. Nur einsetzen wenn es einen klaren fachlichen Grund gibt.

---

**Frage 4:** Was ist der Unterschied zwischen Datentyp und Format einer Spalte?

- a) Es gibt keinen Unterschied, beide Begriffe meinen dasselbe
- b) Datentyp bestimmt wie Werte gespeichert werden, Format bestimmt wie sie in Visuals dargestellt werden (richtig)
- c) Datentyp gilt nur für Textspalten, Format nur für Zahlenspalten
- d) Format wird in Power Query festgelegt, Datentyp in der Modellansicht

> **Antwort:** b) Beispiel: ein Dezimalzahlwert kann als Währung formatiert werden. Der Datentyp bleibt Dezimalzahl, das Format ändert die Darstellung.

---

**Frage 5:** Wofür wird ein numerischer Bereichsparameter typischerweise eingesetzt?

- a) Um Tabellen nach einer numerischen Spalte zu sortieren
- b) Um die Anzahl der Zeilen im Modell zu begrenzen
- c) Für Was-wäre-wenn-Szenarien, bei denen Berichtsnutzer einen Wert über einen Datenschnitt einstellen (richtig)
- d) Um Beziehungen zwischen numerischen Spalten herzustellen

> **Antwort:** c) Typisches Beispiel: Wechselkurs oder Rabattsatz als Parameter. Der Berichtsnutzer stellt den Wert ein, ein Measure verwendet ihn für Berechnungen.
