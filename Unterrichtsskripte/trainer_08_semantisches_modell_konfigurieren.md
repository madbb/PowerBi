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

**Frage ans Plenum:** Was passiert, wenn ihr in einem Bericht nach Produktkategorie filtert, aber Kategorie und Umsatz in verschiedenen Tabellen liegen?

> **Erwartete Antwort:** Ohne Beziehung passiert nichts. Der Filter greift nicht über Tabellengrenzen hinaus.
> Beziehungen sind der Mechanismus, der Filterkontext von einer Tabelle in eine andere überträgt.

*Filterkontext ist einer der Grundbegriffe in Power BI. Er beschreibt, welche Daten aktuell "aktiv" sind, also durch welche Filter die Datenmenge eingeschränkt wurde. Wenn ich auf eine Kachel "Region Süd" klicke, ist der Filterkontext "Region = Süd". Dieser Kontext muss über Beziehungen von Tabelle zu Tabelle fließen.*

**Beziehungsgrundlagen durchgehen:**

- Jede Beziehung verbindet genau eine Spalte aus Tabelle A mit einer Spalte aus Tabelle B
- Datentypen müssen übereinstimmen
  *Wenn in der Bestelltabelle KundenID eine Ganzzahl ist und in der Kundentabelle KundenID ein Text, kann Power BI keine Beziehung anlegen. Die Typen müssen vor der Modellierung übereinstimmen - das ist eine Aufgabe für Power Query.*
- Bei mehrspaltigen Schlüsseln in der Quelle: in Power Query zu einer einspaltigen Schlüsselspalte zusammenführen
  *Mehrspaltiger Schlüssel bedeutet: In der Quelldatenbank wird eine Zeile erst durch die Kombination mehrerer Spalten eindeutig, zum Beispiel Auftragsnummer + Positionsnummer. Power BI kann nur über eine einzige Spalte verknüpfen. Lösung: die Spalten in Power Query zusammenkleben, z.B. "1042-5".*

**Kardinalitätstypen als Tabelle zeigen:**

*Kardinalität beschreibt das Verhältnis zwischen den Zeilen auf beiden Seiten einer Beziehung. Wie viele Zeilen in Tabelle B passen zu einer Zeile in Tabelle A?*

- **1:*** (Eins-zu-viele): häufigster Typ, Dimensionstabelle zur Faktentabelle
  *Beispiel: Ein Kunde (1) hat viele Bestellungen (*). Die Kundentabelle hat eindeutige KundenIDs (jeder Kunde genau einmal). Die Bestelltabelle hat dieselbe KundenID mehrfach (für jede Bestellung dieses Kunden).*

- ***:1** (Viele-zu-eins): dasselbe, andere Richtung
  *Dasselbe Verhältnis, nur von der Faktentabelle aus gesehen. Viele Bestellungen gehören zu einem Kunden.*

- **1:1** (Eins-zu-eins): selten, besser in Power Query zusammenführen
  *Eins-zu-eins bedeutet: Jede Zeile in Tabelle A hat genau eine passende Zeile in Tabelle B. Wenn das so ist, können beide Tabellen in der Regel in Power Query zu einer einzigen zusammengeführt werden. Zwei getrennte Tabellen bei 1:1 sind meist unnötig.*

- ***:** (Viele-zu-viele): wenn keine eindeutige Seite vorhanden ist
  *Viele-zu-viele bedeutet: Eine Zeile in Tabelle A kann zu mehreren Zeilen in Tabelle B passen, und umgekehrt. Zum Beispiel: Studenten und Kurse. Ein Student besucht mehrere Kurse, ein Kurs hat mehrere Studenten. Das ist der komplexeste Typ und erfordert besondere Sorgfalt.*

**Kreuzfilterrichtung erklären:**
- Einzeln (Standard bei 1:*): Filter fließt von der 1-Seite zur *-Seite
  *Standard und richtig: Ein Filter auf der Kundentabelle (1-Seite) filtert die Bestelltabelle (*-Seite) automatisch mit. Andersherum passiert das nicht.*
- Beide: Filter fließt in beide Richtungen

**Warnung zu bidirektionaler Filterung betonen:**
- Verschlechtert Abfrageleistung
- Kann zu unerwarteten Ergebnissen führen
  *Unerwartetes Ergebnis bedeutet oft: Ein Visual zeigt plötzlich andere Zahlen als erwartet, weil ein Filter von einer unerwarteten Seite reinkommt. Das ist schwer zu debuggen.*
- Nur nutzen wenn es einen triftigen Grund gibt, z.B. n:n-Analyse über Brückentabelle
  *Brückentabelle (auch: Zwischentabelle oder Junction Table) ist eine Hilfstabelle, die eine Viele-zu-viele-Beziehung auflöst. Beispiel: Studenten-Kurse-Tabelle mit einer Zeile pro Kombination aus StudentID und KursID. Für Analysen quer über diese Brückentabelle kann bidirektionale Filterung sinnvoll sein.*

**Aktive vs. inaktive Beziehungen ansprechen:**
- Nur eine aktive Beziehung zwischen zwei Tabellen möglich
- Zweite Beziehung wird inaktiv gesetzt
  *Inaktiv bedeutet: Die Beziehung ist im Modell vorhanden und sichtbar, wird aber standardmäßig nicht für Filter und Berechnungen verwendet. Sie erscheint im Diagramm als gestrichelte Linie.*
- Inaktive Beziehung gezielt per USERELATIONSHIP in DAX aktivieren
  *USERELATIONSHIP ist eine DAX-Funktion, mit der man in einem bestimmten Measure explizit sagt: "Für diese Berechnung nutze diese inaktive Beziehung statt der aktiven." So kann man z.B. das Versanddatum statt des Bestelldatums für eine spezifische Kennzahl nutzen.*

**Rollenspieldimension kurz erklären:**
- Beispiel: Datumstabelle mit Bestelldatum und Versanddatum in der Faktentabelle
  *Rollenspieldimension bedeutet: Dieselbe Tabelle (hier: Datum) spielt mehrere Rollen. Einmal ist sie das Bestelldatum, einmal das Versanddatum. Power BI kann aber nur eine aktive Beziehung zwischen zwei Tabellen haben.*
- Lösung 1: eine aktive, eine inaktive Beziehung + USERELATIONSHIP
- Lösung 2: zwei separate Datumstabellen

**Demo: Modellansicht öffnen, Beziehungen anlegen**
- Drag & Drop zwischen Spalten im Diagramm
- Doppelklick auf Linie: Eigenschaften zeigen
- 1 und * Symbole, Pfeilrichtung

**Frage ans Plenum:** Wir haben customers, orders, products, salesreps. Welche Tabelle ist die Faktentabelle?

> **Erwartete Antwort:** orders. Die anderen sind Dimensionen.
> Beziehungen gehen von den Dimensionen (1-Seite) zur Faktentabelle (mehrere-Seite).

---

## Block 2 - Tabellen konfigurieren

**Überleitung:** Beziehungen stehen. Jetzt verfeinern wir das Modell. Tabelleneigenschaften sind der erste Schritt.

**Tabelleneigenschaften kurz durchgehen:**

- Name: benutzerfreundlich, wird mit Power Query-Abfragename synchronisiert
- Beschriftung: erscheint als Tooltip im Datenbereich
  *Tooltip ist der kleine Hilfetext, der erscheint wenn man mit der Maus über ein Element fährt ohne zu klicken. Eine gute Beschriftung hilft Berichtsautoren zu verstehen, was diese Tabelle enthält.*
- Synonyme: alternative Namen für Q&A und Copilot
  *Q&A ist eine Power BI-Funktion, bei der man eine Frage in natürlicher Sprache stellt und Power BI ein Visual generiert. Synonyme helfen dabei: Wenn die Tabelle "customers" heißt, aber Schüler "Kunden" tippen, wird das durch ein Synonym erkannt.*
- Ist ausgeblendet: für Brückentabellen und Hilfstabellen sinnvoll

**Datumstabellen markieren ansprechen:**

- Auto Datum/Uhrzeit deaktivieren: Optionen - Daten laden - Auto Datum/Uhrzeit deaktivieren
  *Auto Datum/Uhrzeit ist eine Power BI-Standardeinstellung, die für jede Datumsspalte automatisch eine versteckte Hilfstabelle erstellt. Das klingt hilfreich, bläht aber das Modell auf - vor allem wenn es viele Datumsspalten gibt.*
- Stattdessen eigene Datumstabelle verwenden
  *Eine eigene Datumstabelle ist eine Tabelle mit einer Zeile pro Tag und Spalten für Jahr, Quartal, Monat, Wochentag usw. Sie wird einmal zentral erstellt und dann mit allen Datumsspalten im Modell verbunden.*
- Markierung: Tabellentools - Als Datumstabelle markieren
- Voraussetzung: eindeutige Werte, keine Leerwerte, lückenlose Datumsangaben

**Frage ans Plenum:** Warum sollte Auto Datum/Uhrzeit deaktiviert werden?

> **Erwartete Antwort:** Power BI erstellt für jede Datumsspalte automatisch versteckte Tabellen. Das bläht das Modell auf und kann Zeitintelligenz-Berechnungen beeinflussen wenn man später eigene Datumstabellen hinzufügt.
> Für professionelle Modelle immer deaktivieren und eigene Datumstabelle verwenden.

---

## Block 3 - Spalten konfigurieren

**Frage ans Plenum:** Ihr habt eine Spalte "Monat" mit Werten wie "2024 Jan", "2024 Feb" und so weiter. Power BI sortiert sie alphabetisch. Was ist das Problem?

> **Erwartete Antwort:** Alphabetisch ergibt keine chronologische Reihenfolge. "2024 Apr" kommt vor "2024 Jan".
> Nach Spalte sortieren löst das: MonthKey als Sortiergrundlage.

*MonthKey ist eine Hilfsspalte mit einer Zahl für den Monat: Januar = 1, Februar = 2 usw. Man sortiert dann die lesbare "2024 Jan"-Spalte nach der numerischen MonthKey-Spalte. Power BI zeigt "Jan" an, sortiert aber nach der Zahl.*

**Spalteneigenschaften kurz durchgehen:**

- Datentyp: bestimmt wie Werte gespeichert werden
- Format: bestimmt wie Werte in Visuals dargestellt werden
  *Beispiel: Eine Zahl wie 1234567 kann als "1.234.567 EUR" formatiert werden. Der Datentyp bleibt Dezimalzahl, die Darstellung ändert sich durch das Format.*
- Nach Spalte sortieren: andere Spalte als Sortiergrundlage festlegen
- Datenkategorie: semantische Beschreibung für räumliche Werte, Web-URLs, Bild-URLs
  *Datenkategorie teilt Power BI mit, was die Werte in dieser Spalte bedeuten. Wenn eine Spalte Städtenamen enthält und die Datenkategorie "Stadt" gesetzt ist, kann Power BI die Daten automatisch auf einer Landkarte darstellen.*
- Zusammenfassen nach: Standardaggregation für numerische Spalten
  *Wenn man eine numerische Spalte aus dem Datenbereich in ein Visual zieht, aggregiert Power BI sie automatisch. Standardmäßig ist das "Summe". Wenn man z.B. eine Jahresspalte hat, soll die nicht summiert werden - man stellt dann "Keine" ein.*

**Anzeigeordner ansprechen:**
- Spalten und Measures in Ordner gruppieren
  *Anzeigeordner ist ein logischer Ordner im Datenbereich (rechte Seite in der Berichtsansicht). Er sortiert nichts in der Datenbank, sondern nur die Darstellung für den Berichtsautor.*
- Datenbereich übersichtlicher bei vielen Feldern
- Sinnvoll ab 10+ Feldern in einer Tabelle

**Wichtige Empfehlung:**
- Numerische Spalten die nicht aggregiert werden sollen: Zusammenfassen nach = Keine
- Oder: Spalte ausblenden und Measure erstellen
  *Das ist oft die bessere Lösung: Die rohe numerische Spalte ausblenden, sodass Berichtsautoren sie nicht versehentlich falsch nutzen, und stattdessen ein explizites Measure erstellen, das die gewünschte Berechnung klar definiert.*

---

## Block 4 - Hierarchien konfigurieren

**Überleitung:** Datumshierarchien kennen die meisten aus Excel. In Power BI lassen sie sich für beliebige Spalten erstellen.

**Hierarchien erklären:**
- Definieren natürliche Navigationspfade zwischen Spalten einer Tabelle
  *Navigationspfad bedeutet: Eine Abfolge vom Groben zum Feinen. Jahr ist grob, Quartal ist feiner, Monat noch feiner, Tag am feinsten. Eine Hierarchie definiert diesen Weg.*
- Beispiel Datum: Year - Quarter - Month
- Berichtsautoren können im Visual auf- und abwärts navigieren (Drill-up/down)
  *Drill-down bedeutet: Vom groben Level in ein feineres Level wechseln. Ich sehe Jahreszahlen, klicke auf 2024, und sehe dann die Quartale von 2024. Drill-up ist die Rückrichtung.*

**Einschränkung betonen:**
- Hierarchieebenen müssen aus Spalten derselben Tabelle stammen
- Keine tabellenübergreifenden Hierarchien

**Demo: Hierarchie anlegen**
- Rechtsklick auf Spalte im Datenbereich - Hierarchie erstellen
- Weitere Spalten per Drag & Drop als Ebenen hinzufügen
- Reihenfolge der Ebenen anpassen

**Frage ans Plenum:** Braucht ein Berichtsautor eine Hierarchie um Drill-down zu nutzen?

> **Erwartete Antwort:** Nein. Er kann auch mehrere Spalten manuell zum Visual hinzufügen. Aber eine Hierarchie macht das einfacher und gibt den Navigationspfad vor.
> Hierarchien sind eine Komfortfunktion für Berichtsautoren.

---

## Block 5 - Measures und Parameter konfigurieren

**Frage ans Plenum:** Was ist der Unterschied zwischen einer berechneten Spalte und einem Measure?

> **Erwartete Antwort:** Berechnete Spalte: wird für jede Zeile berechnet und im Modell gespeichert. Measure: wird zur Abfragezeit berechnet, kein Speicherverbrauch.
> Measures sind flexibler und performanter. Für fast alle Berechnungen die Erste Wahl.

*Abfragezeit bedeutet: der Moment, in dem ein Visual gerendert wird. Das Measure wird nicht vorab berechnet, sondern immer neu - und dabei automatisch im aktuellen Filterkontext. Das macht Measures so flexibel: Derselbe "Umsatz"-Measure zeigt den richtigen Wert, egal ob er in einem Jahreschart, einem Regionenfilter oder einer Kundentabelle steht.*

**Measures kurz erklären:**
- Benannte DAX-Formel, einer Modelltabelle zugeordnet
- Taschenrechnersymbol im Datenbereich
  *Das Taschenrechnersymbol unterscheidet Measures von normalen Spalten (die ein anderes Symbol haben). So erkennt man im Datenbereich auf einen Blick, was eine Berechnung und was eine Rohdatenspalte ist.*
- Name muss im gesamten Modell eindeutig sein
- Startseite: Measure kann einer beliebigen Tabelle zugeordnet werden

**Quickmeasures ansprechen:**
- Ohne DAX-Kenntnisse Berechnungsvorlage auswählen
- Felder zuweisen, Power BI generiert DAX-Code
- Gut zum Einstieg und zum Verstehen von DAX-Mustern
  *Quickmeasures sind fertige Vorlagen für häufige Berechnungen: prozentualer Anteil, laufende Summe, Vergleich zu Vorperiode. Man wählt die Vorlage, befüllt die Felder - Power BI schreibt den DAX-Code. Wer DAX lernen will, liest diesen generierten Code und versteht das Muster.*

**Numerischer Bereichsparameter:**
- Erzeugt automatisch unverbundene Tabelle und Measure
- Berichtsnutzer stellt Wert über Datenschnitt ein
  *Unverbundene Tabelle bedeutet: Diese Tabelle hat keine Beziehung zu anderen Tabellen im Modell. Sie enthält nur die Werte für den Parameter-Datenschnitt. Das Measure liest den ausgewählten Wert aus dieser Tabelle.*
- Klassischer Einsatz: Was-wäre-wenn-Szenarien, Wechselkurs, Rabattsatz
  *Was-wäre-wenn-Szenarien: Wie entwickelt sich der Umsatz wenn der Wechselkurs 1,10 statt 1,05 ist? Der Benutzer schiebt den Datenschnitt, das Measure rechnet sofort neu. Kein Neuaufruf der Datenbank, alles im Modell.*

**Feldparameter:**
- Gruppe verschiedener Modellfelder
  *Feldparameter ist eine Sammlung von Feldern (Spalten oder Measures), aus denen der Berichtsnutzer eines auswählen kann. Das ausgewählte Feld wird dann dynamisch in einem Visual verwendet.*
- Berichtsnutzer wählt dynamisch welches Feld ein Visual verwendet
- Beispiel: Produktgruppierung nach Kategorie, Unterkategorie, Produkt oder Farbe

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
