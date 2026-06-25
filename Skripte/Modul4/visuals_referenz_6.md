# Power BI Visuals – Referenz Teil 6

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 18 · Schüler-Skript</div>
  <div class="pbi-page-title">Visuals in Power BI – Teil 6</div>
  <div class="pbi-page-sub">Kartenvisual mit Blasen (Map) · Gefüllte Karte (Filled Map)</div>
</div>

> Dieser Teil behandelt die beiden geografischen Visuals in Power BI. Beide setzen geocodierbare Daten voraus — also Werte die Bing Maps einer geografischen Position zuordnen kann. Die Kontrollwerte beziehen sich auf das techtrade-Modell.

---

# 1. Kartenvisual mit Blasen (Map)

## Zweck

Das Kartenvisual zeigt **Standorte als Blasen auf einer interaktiven Karte**. Blasengröße und Blasenfarbe können je einen Wert codieren. Gut für Kundendichte, Umsatzverteilung nach Standort und geografische Muster.

**Wann verwenden:**
- Wenn die geografische Position des Standorts inhaltlich relevant ist
- Kundendichte oder Umsatz nach Städten visualisieren
- Wenn Nutzer die Karte zoomen und erkunden sollen

**Wann nicht verwenden:**
- Wenn Regionsbezeichnungen unternehmensspezifisch sind (z.B. "Nord", "Süd") — diese können nicht geocodiert werden
- Wenn präzise Wertvergleiche wichtig sind — Balkendiagramm ist genauer
- Wenn keine Internetverbindung vorhanden ist — Geocodierung benötigt Bing Maps

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Ort | Textfeld (Stadt, Land, PLZ) oder Measure | Ja | Wird an Bing Maps gesendet zur Geocodierung. Eindeutige Bezeichnungen bevorzugen. |
| Breitengrad | Dezimalzahl (Measure) | Nein | Alternative zu Ort — präzise Koordinaten. Kein Geocodierungsaufruf nötig. |
| Längengrad | Dezimalzahl (Measure) | Nein | Zusammen mit Breitengrad verwenden. |
| Legende | Textfeld | Nein | Farbe der Blasen nach Kategorie. |
| Blasengröße | Measure | Nein | Durchmesser der Blasen proportional zum Wert. |
| QuickInfo | Beliebig | Nein | Hover-Tooltip. |

## Geocodierung — wie sie funktioniert

Wenn ein Wert in das Ort-Well gezogen wird, sendet Power BI diesen Wert an Bing Maps und erhält geografische Koordinaten zurück. Das passiert beim ersten Laden und bei jeder Datenaktualisierung.

**Voraussetzungen für erfolgreiche Geocodierung:**
- Internetverbindung vorhanden
- Wert ist ein erkannter geografischer Begriff (Stadtname, Ländername, Bundesstaat, offizielle PLZ)
- Datenkategorie der Spalte korrekt gesetzt

**Datenkategorie setzen:** Spalte in der Tabellensicht anklicken → Spaltentools → Datenkategorie → passende Kategorie wählen (Ort, Bundesland/Kanton, Land/Region, Postleitzahl, Breitengrad, Längengrad). Power BI geocodiert dann präziser.

> **Hinweis zu techtrade:** Die PLZ-Werte im techtrade-Modell sind fiktiv und stimmen nicht mit echten deutschen Postleitzahlen überein. Geocodierung über `customers[PLZ]` schlägt fehl. Die Stadtnamen in `customers[Stadt]` sind reale deutsche Städtenamen und können geocodiert werden — jedoch sind einige in Großschreibung (AACHEN, HANNOVER). Bing Maps erkennt diese meistens trotzdem, aber für professionelle Berichte sollte die Schreibweise vereinheitlicht werden (Power Query: `Text.Proper()`).

## Wichtige Format-Optionen

**Format → Visual → Blasen**
- *Maximale Blasengröße:* Prozentualer Anteil des Kartenbereichs für die größte Blase. Erhöhen wenn kleine Blasen kaum sichtbar sind.
- *Blasenfarbe:* Einheitliche Farbe wenn kein Legendenfeld gesetzt.

**Format → Visual → Kartensteuerelemente**
- *Zoom-Schaltflächen:* Ein- oder ausblenden.
- *Typ:* Straßenkarte, Luftbild, Graustufen, Dunkel. Graustufen oder Dunkel lassen farbige Blasen besser hervorstechen.

**Format → Visual → Datenbeschriftungen**
- *Ein/Aus:* Stadtnamen oder Werte direkt an den Blasen anzeigen. Bei vielen Blasen ausschalten — sonst überlappen Beschriftungen.

## Kontrollwerte (techtrade)

Kartenvisual: Ort: `customers[Stadt]`, Blasengröße: `[Umsatz]`:

Top-Städte nach Umsatz (Blasengröße):

| Stadt | Umsatz | Kunden |
|---|---|---|
| Hannover | 190.289 | 99 |
| Aachen | 173.866 | 139 |
| Darmstadt | 173.837 | 113 |
| Kiel | 169.725 | 86 |
| Köln | 159.211 | 88 |
| Erfurt | 144.955 | 89 |
| Leipzig | 142.843 | 68 |
| Rostock | 136.738 | 69 |

Aachen hat die meisten Kunden (139) aber nicht den höchsten Umsatz (173.866). Hannover hat weniger Kunden (99) aber den höchsten Umsatz (190.289) — das heißt der durchschnittliche Bestellwert in Hannover ist höher.

## Häufige Fehler

**Geocodierung schlägt fehl bei mehrdeutigen Ortsnamen.** "Frankfurt" gibt es in Deutschland (Frankfurt am Main, Frankfurt an der Oder) und in anderen Ländern. Bing Maps wählt automatisch — das kann falsch sein. Lösung: Zusatzfeld mit Land hinzufügen (Ort-Well: zwei Felder — Stadt + Land) oder Datenkategorie "Ort" setzen und ein Land-Feld im Modell anlegen.

**PLZ statt Stadtname verwenden wenn PLZ fiktiv sind.** Im techtrade-Modell sind PLZ-Werte nicht echt — geocodieren über `customers[Stadt]` statt `customers[PLZ]`.

**Regionsbezeichnungen ins Ort-Well.** `salesreps[Region]` mit Werten wie "Nord" und "Süd" lässt sich nicht geocodieren — das sind unternehmensspezifische Bezeichnungen ohne geografische Koordinate. Für Regionsdaten Balkendiagramm verwenden.

**Blasengröße bei ähnlichen Werten.** Wenn alle Städte ähnlichen Umsatz haben, sind alle Blasen gleich groß — das Visual liefert dann keinen Mehrwert gegenüber einer Tabelle.

**Karte auf mobilen Geräten.** Kartenvisuals laden langsam auf Mobilgeräten. Im mobilen Layout alternative Visuals (Balkendiagramm nach Stadt) verwenden.

## Abgrenzung

**Kartenvisual vs. Gefüllte Karte:** Kartenvisual zeigt Punkte/Blasen an Standorten. Gefüllte Karte färbt Gebiete ein (Länder, Bundesländer). Für Stadtdaten: Kartenvisual. Für Länder- oder Bundeslandvergleiche: Gefüllte Karte.

**Kartenvisual vs. Balkendiagramm:** Kartenvisual wenn die räumliche Position die Botschaft trägt ("Wo sind unsere Kunden?"). Balkendiagramm wenn Wertvergleiche zwischen Standorten wichtig sind ("Welche Stadt hat den höchsten Umsatz?").

---

# 2. Gefüllte Karte (Filled Map)

## Zweck

Die Gefüllte Karte färbt **Gebiete** (Länder, Bundesländer, Kreise) proportional zu einem Wert ein. Je dunkler die Farbe, desto höher der Wert. Auch bekannt als Choroplethenkarte.

**Wann verwenden:**
- Werte auf Länder- oder Bundeslandebene vergleichen
- Wenn die Gebietsform und -lage inhaltlich bedeutsam ist
- Nationale oder internationale Vergleiche ("Welches Land hat den höchsten Umsatz?")

**Wann nicht verwenden:**
- Wenn Gebietsbezeichnungen unternehmensspezifisch sind — "Nord", "Mitte" sind keine offiziellen Gebiete
- Für Stadtdaten — Städte sind zu klein für Gebietsfärbung
- Wenn präzise Wertunterschiede erkennbar sein sollen — Farbabstufungen sind schwer zu vergleichen

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Ort | Textfeld (Land, Bundesland) | Ja | Muss ein offiziell erkannter Gebietsname sein. |
| Farbsättigung | Measure | Ja | Bestimmt die Farbintensität — höherer Wert = dunklere Farbe. |
| QuickInfo | Beliebig | Nein | Hover-Tooltip. |

## Geocodierung bei der Gefüllten Karte

Gebietsnamen müssen exakt mit den Namen übereinstimmen die Bing Maps kennt. Für Deutschland:

- **Länderebene:** "Deutschland", "Germany", "DE" — alle funktionieren
- **Bundeslandebene:** "Bayern", "Nordrhein-Westfalen", "Baden-Württemberg" — voller Name nötig, keine Abkürzungen
- **Kreisebene:** Nur mit vollständigem offiziellem Kreisname — fehleranfällig

> **Wichtig für techtrade:** Das techtrade-Modell hat keine Bundesland-Spalte und keine Länderspalte. `salesreps[Region]` (Nord/West/Mitte/Ost/Süd) sind unternehmensspezifische Vertriebsregionen — keine geocodierbaren Gebiete. Eine Gefüllte Karte ist mit dem techtrade-Modell in der aktuellen Form **nicht sinnvoll nutzbar**. Für eine Demo bräuchte man entweder eine separate Bundesland-Tabelle im Modell oder ein anderes Dataset.

## Wichtige Format-Optionen

**Format → Visual → Füllfarben**
- *Minimum, Mittlere, Maximum:* Farbverlauf von niedrigstem zu höchstem Wert. Typisch: Weiß (niedrig) → Blau oder Grün (hoch).
- *Abweichende Farbe:* Aktivieren um einen dreiteiligen Farbverlauf zu definieren (niedrig → mittel → hoch).

**Format → Visual → Kartensteuerelemente**
- Identisch mit Kartenvisual.

## Häufige Fehler

**Unternehmensspezifische Regionen verwenden.** "Nord", "Süd", "Mitte" sind keine offiziellen Gebiete — Bing Maps kann sie nicht geocodieren. Nur offizielle Gebietsbezeichnungen (Bundesländer, Länder) verwenden.

**Bundesland-Abkürzungen verwenden.** "NRW" statt "Nordrhein-Westfalen", "BW" statt "Baden-Württemberg" — Bing Maps erkennt viele Abkürzungen nicht zuverlässig. Immer den vollständigen offiziellen Namen verwenden.

**Kleine Gebiete visuell ignoriert.** Stadtstaaten wie Berlin, Hamburg, Bremen sind auf Bundeslandebene winzig — ihre Farbe ist kaum erkennbar. Für solche Fälle besser ein Balkendiagramm verwenden.

**Farbverlauf für nicht-lineare Daten.** Wenn ein Wert in einem Gebiet extrem hoch ist (Ausreißer), erscheinen alle anderen Gebiete in fast identischer heller Farbe. Logarithmische Skala oder Wertebereich manuell begrenzen.

## Abgrenzung

**Gefüllte Karte vs. Kartenvisual:** Gefüllte Karte für Gebiete (Länder, Bundesländer). Kartenvisual für Punkte und Standorte (Städte, Filialen, Kunden).

**Gefüllte Karte vs. Balkendiagramm:** Gefüllte Karte wenn die räumliche Lage und Nachbarschaft der Gebiete die Botschaft trägt. Balkendiagramm wenn präzise Wertvergleiche wichtig sind — Längenvergleiche sind für Menschen genauer lesbar als Farbintensitäten.

---

## Vergleich der beiden geografischen Visuals

| Visual | Datenebene | Geocodierung | Stärke | Wann nicht verwenden |
|---|---|---|---|---|
| Kartenvisual | Punkte und Standorte | Stadtname, PLZ, Koordinaten | Zeigt wo etwas ist und wie viel | Unternehmensspezifische Regionen, fehlende Internetverbindung |
| Gefüllte Karte | Gebiete und Regionen | Offizielle Gebietsbezeichnungen | Zeigt regionale Verteilung über Flächen | Stadtdaten, unternehmensspezifische Regionen, präzise Vergleiche |

---

## Gemeinsame Hinweise

**Internetverbindung.** Beide Visuals benötigen eine aktive Internetverbindung für die Geocodierung über Bing Maps. In Umgebungen ohne Internet Koordinaten-Wells (Breitengrad/Längengrad) mit vorberechneten Koordinaten im Modell verwenden.

**Datenschutz.** Beim Einsatz von Kartenvisuals werden Ortsnamen oder Koordinaten an Bing Maps (Microsoft) gesendet. In datenschutzsensiblen Umgebungen prüfen ob das zulässig ist.

**Leistung.** Karten laden langsamer als andere Visuals — besonders auf mobilen Geräten und bei vielen Datenpunkten. Im Performance Analyzer auf die Visualanzeige-Dauer achten.

**Barrierefreiheit.** Geografische Karten sind für Screenreader kaum zugänglich. Alternativtext (Format → Allgemein → Alternativtext) ausfüllen und eine tabellarische Darstellung als Alternative anbieten.

---

## Abschluss: Gesamtübersicht aller Visual-Referenz-Teile

| Teil | Datei | Visuals |
|---|---|---|
| 1 | 18_visuals_referenz.md | Balken, Säule, Linie, Fläche, Kreis/Ring, Tabelle, Matrix |
| 2 | 19_visuals_referenz_2.md | Treemap, Trichter, Wasserfall, Menüband |
| 3 | 20_visuals_referenz_3.md | Streudiagramm, Blasendiagramm, Decomposition Tree, Key Influencers |
| 4 | 21_visuals_referenz_4.md | Kartenvisual (Card), KPI-Visual, Messgerät, Mehrzeilige Karte |
| 5 | 22_visuals_referenz_5.md | Datenschnitt, Q&A-Visual, Smart Narrative |
| 6 | 23_visuals_referenz_6.md | Kartenvisual (Map), Gefüllte Karte |
