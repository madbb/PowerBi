# Trainer-Skript 08 — Semantisches Modell konfigurieren

> **Themen:** Beziehungen · Kardinalität · Kreuzfilterrichtung · Tabellen & Spalten · Hierarchien · Measures · Parameter
> **Schüler-Skript:** 08_semantisches_modell_konfigurieren.md

---

## Einstieg

**Frage ans Plenum:** Wir haben in Skript 06 Daten bereinigt und geladen. Was fehlt noch, bevor wir einen sinnvollen Bericht bauen können?

- Antworten sammeln: Beziehungen, Berechnungen, Struktur
- Überleitung: Genau. Power Query liefert saubere Tabellen. Aber die Tabellen wissen noch nichts voneinander. Das semantische Modell schließt diese Lücke.

**Kerngedanke ansprechen:**
- Ziel ist eine Semantikebene über den Daten
- Das Modell soll Berichtsanforderungen unterstützen, intuitiv bedienbar sein und korrekte Ergebnisse liefern
- Alles beginnt mit Beziehungen

---

## Block 1 — Beziehungen konfigurieren

**Frage ans Plenum:** Was passiert, wenn ihr in einem Bericht nach Produktkategorie filtert, aber Kategorie und Umsatz in verschiedenen Tabellen liegen?

> **Erwartete Antwort:** Ohne Beziehung passiert nichts. Der Filter greift nicht über Tabellengrenzen hinaus.
> => Beziehungen sind der Mechanismus, der Filterkontext von einer Tabelle in eine andere überträgt.

**Beziehungsgrundlagen durchgehen:**

- Jede Beziehung verbindet genau eine Spalte aus Tabelle A mit einer Spalte aus Tabelle B
- Datentypen müssen übereinstimmen
- Bei mehrspaltigen Schlüsseln in der Quelle: in Power Query zu einer einspaltigen Schlüsselspalte zusammenführen

**Kardinalitätstypen als Tabelle zeigen:**

- 1:* (Eins-zu-viele): häufigster Typ, Dimensionstabelle zur Faktentabelle
- *:1 (Viele-zu-eins): dasselbe, andere Richtung
- 1:1 (Eins-zu-eins): selten, besser in Power Query zusammenführen
- *:* (Viele-zu-viele): wenn keine eindeutige Seite vorhanden ist

**Kreuzfilterrichtung erklären:**
- Einzeln (Standard bei 1:*): Filter fließt von der 1-Seite zur *-Seite
- Beide: Filter fließt in beide Richtungen

**Warnung zu bidirektionaler Filterung betonen:**
- Verschlechtert Abfrageleistung
- Kann zu unerwarteten Ergebnissen führen
- Nur nutzen wenn es einen triftigen Grund gibt, z.B. n:n-Analyse über Brückentabelle

**Aktive vs. inaktive Beziehungen ansprechen:**
- Nur eine aktive Beziehung zwischen zwei Tabellen möglich
- Zweite Beziehung wird inaktiv gesetzt
- Inaktive Beziehung gezielt per USERELATIONSHIP in DAX aktivieren

**Rollenspieldimension kurz erklären:**
- Beispiel: Datumstabelle mit Bestelldatum und Versanddatum in der Faktentabelle
- Lösung 1: eine aktive, eine inaktive Beziehung + USERELATIONSHIP
- Lösung 2: zwei separate Datumstabellen

**Demo: Modellansicht öffnen, Beziehungen anlegen**
- Drag & Drop zwischen Spalten im Diagramm
- Doppelklick auf Linie: Eigenschaften zeigen
- 1 und * Symbole, Pfeilrichtung

**Frage ans Plenum:** Wir haben customers, orders, products, salesreps. Welche Tabelle ist die Faktentabelle?

> **Erwartete Antwort:** orders. Die anderen sind Dimensionen.
> => Beziehungen gehen von den Dimensionen (1-Seite) zur Faktentabelle (mehrere-Seite).

---

## Block 2 — Tabellen konfigurieren

**Überleitung:** Beziehungen stehen. Jetzt verfeinern wir das Modell. Tabelleneigenschaften sind der erste Schritt.

**Tabelleneigenschaften kurz durchgehen:**

- Name: benutzerfreundlich, wird mit Power Query-Abfragename synchronisiert
- Beschriftung: erscheint als Tooltip im Datenbereich
- Synonyme: alternative Namen für Q&A und Copilot
- Ist ausgeblendet: für Brückentabellen und Hilfstabellen sinnvoll

**Datumstabellen markieren ansprechen:**

- Auto Datum/Uhrzeit deaktivieren: Optionen → Daten laden → Auto Datum/Uhrzeit deaktivieren
- Stattdessen eigene Datumstabelle verwenden
- Markierung: Tabellentools → Als Datumstabelle markieren
- Voraussetzung: eindeutige Werte, keine Leerwerte, lückenlose Datumsangaben

**Frage ans Plenum:** Warum sollte Auto Datum/Uhrzeit deaktiviert werden?

> **Erwartete Antwort:** Power BI erstellt für jede Datumsspalte automatisch versteckte Tabellen. Das bläht das Modell auf und kann Zeitintelligenz-Berechnungen beeinflussen wenn man später eigene Datumstabellen hinzufügt.
> => Für professionelle Modelle immer deaktivieren und eigene Datumstabelle verwenden.

---

## Block 3 — Spalten konfigurieren

**Frage ans Plenum:** Ihr habt eine Spalte "Monat" mit Werten wie "2024 Jan", "2024 Feb" und so weiter. Power BI sortiert sie alphabetisch. Was ist das Problem?

> **Erwartete Antwort:** Alphabetisch ergibt keine chronologische Reihenfolge. "2024 Apr" kommt vor "2024 Jan".
> => Nach Spalte sortieren löst das: MonthKey als Sortiergrundlage.

**Spalteneigenschaften kurz durchgehen:**

- Datentyp: bestimmt wie Werte gespeichert werden
- Format: bestimmt wie Werte in Visuals dargestellt werden
- Nach Spalte sortieren: andere Spalte als Sortiergrundlage festlegen
- Datenkategorie: semantische Beschreibung für räumliche Werte, Web-URLs, Bild-URLs
- Zusammenfassen nach: Standardaggregation für numerische Spalten

**Anzeigeordner ansprechen:**
- Spalten und Measures in Ordner gruppieren
- Datenbereich übersichtlicher bei vielen Feldern
- Sinnvoll ab 10+ Feldern in einer Tabelle

**Wichtige Empfehlung:**
- Numerische Spalten die nicht aggregiert werden sollen: Zusammenfassen nach = Keine
- Oder: Spalte ausblenden und Measure erstellen

---

## Block 4 — Hierarchien konfigurieren

**Überleitung:** Datumshierarchien kennen die meisten aus Excel. In Power BI lassen sie sich für beliebige Spalten erstellen.

**Hierarchien erklären:**
- Definieren natürliche Navigationspfade zwischen Spalten einer Tabelle
- Beispiel Datum: Year → Quarter → Month
- Berichtsautoren können im Visual auf- und abwärts navigieren (Drill-up/down)

**Einschränkung betonen:**
- Hierarchieebenen müssen aus Spalten derselben Tabelle stammen
- Keine tabellen-übergreifenden Hierarchien

**Demo: Hierarchie anlegen**
- Rechtsklick auf Spalte im Datenbereich → Hierarchie erstellen
- Weitere Spalten per Drag & Drop als Ebenen hinzufügen
- Reihenfolge der Ebenen anpassen

**Frage ans Plenum:** Braucht ein Berichtsautor eine Hierarchie um Drill-down zu nutzen?

> **Erwartete Antwort:** Nein. Er kann auch mehrere Spalten manuell zum Visual hinzufügen. Aber eine Hierarchie macht das einfacher und gibt den Navigationspfad vor.
> => Hierarchien sind eine Komfortfunktion für Berichtsautoren.

---

## Block 5 — Measures und Parameter konfigurieren

**Frage ans Plenum:** Was ist der Unterschied zwischen einer berechneten Spalte und einem Measure?

> **Erwartete Antwort:** Berechnete Spalte: wird für jede Zeile berechnet und im Modell gespeichert. Measure: wird zur Abfragezeit berechnet, kein Speicherverbrauch.
> => Measures sind flexibler und performanter. Für fast alle Berechnungen die Erste Wahl.

**Measures kurz erklären:**
- Benannte DAX-Formel, einer Modelltabelle zugeordnet
- Taschenrechnersymbol im Datenbereich
- Name muss im gesamten Modell eindeutig sein
- Startseite: Measure kann einer beliebigen Tabelle zugeordnet werden

**Quickmeasures ansprechen:**
- Ohne DAX-Kenntnisse Berechnungsvorlage auswählen
- Felder zuweisen, Power BI generiert DAX-Code
- Gut zum Einstieg und zum Verstehen von DAX-Mustern

**Numerischer Bereichsparameter:**
- Erzeugt automatisch unverbundene Tabelle und Measure
- Berichtsnutzer stellt Wert über Datenschnitt ein
- Klassischer Einsatz: Was-wäre-wenn-Szenarien, Wechselkurs, Rabattsatz

**Feldparameter:**
- Gruppe verschiedener Modellfelder
- Berichtsnutzer wählt dynamisch welches Feld ein Visual verwendet
- Beispiel: Produktgruppierung nach Kategorie, Unterkategorie, Produkt oder Farbe

**Frage ans Plenum:** Wann würdet ihr einen Feldparameter einsetzen statt einfach mehrere Visuals nebeneinander?

> **Erwartete Antworten:** Wenn der Bericht nicht zu voll werden soll, wenn der Nutzer selbst entscheiden soll welche Dimension er sieht, wenn der Platz begrenzt ist.
> => Feldparameter geben dem Berichtsnutzer Kontrolle ohne den Bericht zu überladen.

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
> "Das Modell steht und die Struktur ist klar. Im nächsten Skript steigen wir in DAX ein: was DAX ist, wie es funktioniert und welche Berechnungstypen es gibt."

---

## Mini-Quiz

*Laut vorlesen oder an die Wand projizieren — Schüler antworten mündlich oder per Handzeichen.*

---

**Frage 1:** Welcher Kardinalitätstyp ist der häufigste in einem Sternschema?

- a) Viele-zu-viele
- b) Eins-zu-eins
- c) Eins-zu-viele ✅
- d) Viele-zu-eins

> **Antwort:** c) Eins-zu-viele. Dimensionstabelle (eindeutige Werte, 1-Seite) zur Faktentabelle (mehrere Zeilen je Dimensionswert, *-Seite).

---

**Frage 2:** Was ist eine Rollenspieldimension?

- a) Eine Tabelle die nur für Testdaten verwendet wird
- b) Eine Dimensionstabelle mit mehreren Beziehungen zur Faktentabelle, z.B. Datumstabelle mit Bestelldatum und Versanddatum ✅
- c) Eine Tabelle die ausgeblendet ist und nur für DAX-Berechnungen genutzt wird
- d) Eine berechnete Tabelle ohne Beziehung zum Rest des Modells

> **Antwort:** b) Klassisches Beispiel ist die Datumstabelle. Lösung: aktive und inaktive Beziehung, inaktive per USERELATIONSHIP in DAX aktivieren.

---

**Frage 3:** Warum sollte bidirektionale Kreuzfilterung vermieden werden?

- a) Sie funktioniert nur bei DirectQuery-Modellen
- b) Sie verschlechtert die Abfrageleistung und kann zu unerwarteten Filterergebnissen führen ✅
- c) Sie ist nur für Viele-zu-viele-Beziehungen verfügbar
- d) Sie verhindert die Nutzung von Hierarchien

> **Antwort:** b) Bidirektionale Filter verdoppeln den Filteraufwand und können zirkuläre Abhängigkeiten erzeugen. Nur einsetzen wenn es einen klaren fachlichen Grund gibt.

---

**Frage 4:** Was ist der Unterschied zwischen Datentyp und Format einer Spalte?

- a) Es gibt keinen Unterschied, beide Begriffe meinen dasselbe
- b) Datentyp bestimmt wie Werte gespeichert werden, Format bestimmt wie sie in Visuals dargestellt werden ✅
- c) Datentyp gilt nur für Textspalten, Format nur für Zahlenspalten
- d) Format wird in Power Query festgelegt, Datentyp in der Modellansicht

> **Antwort:** b) Beispiel: ein Dezimalzahlwert kann als Währung formatiert werden. Der Datentyp bleibt Dezimalzahl, das Format ändert die Darstellung.

---

**Frage 5:** Wofür wird ein numerischer Bereichsparameter typischerweise eingesetzt?

- a) Um Tabellen nach einer numerischen Spalte zu sortieren
- b) Um die Anzahl der Zeilen im Modell zu begrenzen
- c) Für Was-wäre-wenn-Szenarien, bei denen Berichtsnutzer einen Wert über einen Datenschnitt einstellen ✅
- d) Um Beziehungen zwischen numerischen Spalten herzustellen

> **Antwort:** c) Typisches Beispiel: Wechselkurs oder Rabattsatz als Parameter. Der Berichtsnutzer stellt den Wert ein, ein Measure verwendet ihn für Berechnungen.
