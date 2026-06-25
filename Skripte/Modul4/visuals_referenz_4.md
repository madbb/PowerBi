# Power BI Visuals – Referenz Teil 4

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 18 · Schüler-Skript</div>
  <div class="pbi-page-title">Visuals in Power BI – Teil 4</div>
  <div class="pbi-page-sub">Kartenvisual (Card) · KPI-Visual · Messgerät · Mehrzeilige Karte</div>
</div>

> Dieser Teil behandelt vier numerische Visuals — alle spezialisiert auf die Anzeige einzelner Kennzahlen oder weniger Werte. Sie sind das Herzstück jedes Dashboards. Die Kontrollwerte beziehen sich auf das techtrade-Modell.

---

# 1. Kartenvisual (Card)

## Zweck

Das Kartenvisual zeigt **einen einzelnen Wert** — groß, deutlich, sofort lesbar. Es ist das wichtigste Element auf einem Dashboard. Eine Führungskraft soll auf einen Blick erkennen: Wie hoch ist der Umsatz? Wie viele Bestellungen? Wie ist der Zielerreichungsgrad?

**Wann verwenden:**
- Einen einzelnen KPI hervorheben
- Wichtigste Kennzahl eines Berichts auf den ersten Blick kommunizieren
- Als Teil einer Reihe gleichartiger Karten (z.B. drei KPI-Karten nebeneinander)

**Wann nicht verwenden:**
- Wenn mehr als ein Wert gezeigt werden soll — Mehrzeilige Karte
- Wenn ein Zielwert verglichen werden soll — KPI-Visual
- Wenn ein Fortschritt visualisiert werden soll — Messgerät

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Felder | Measure oder aggregiertes Feld | Ja | Nur ein Feld — mehrere Felder erzeugen mehrere Karten oder wechseln auf Mehrzeilige Karte. |

## Wichtige Format-Optionen

**Format → Visual → Legende**
- *Beschriftung:* Der Text unter dem Wert — standardmäßig der Feldname. Umbenennen im Well per Rechtsklick oder hier im Format.
- *Schriftart, Größe, Farbe:* Beschriftung kleiner als der Wert halten.

**Format → Visual → Wert**
- *Schriftart, Größe:* Der Hauptwert — so groß wie möglich für gute Lesbarkeit. Ab 28pt für Dashboards.
- *Anzeigeeinheiten:* **Immer manuell setzen.** "Auto" erzeugt unschöne Dezimalwerte. Optionen: Keine, Tausend (T), Millionen (Mio.), Milliarden.
- *Dezimalstellen:* Bei Währungen: 0 oder 2. Bei Prozent: 1.

**Format → Visual → Trendlinie**
- *Anzeigen:* Zeigt eine kleine Sparkline unter dem Wert — Zeitreihe im Miniformat.
- *Daten:* Welches Feld als Zeitachse verwendet wird.

**Format → Allgemein → Titel**
- Eigener Titel statt dem Feldnamen. Kurz und beschreibend — z.B. "Umsatz 2024" statt "Umsatz".

## Best Practices

Gleichrangige Karten immer gleich groß und einheitlich formatiert. Unterschiedliche Größen suggerieren Priorität — wenn das nicht beabsichtigt ist, verwirrt es.

Drei bis fünf Karten nebeneinander sind das klassische Dashboard-Muster für eine Führungskraft.

## Kontrollwerte (techtrade)

| Karteninhalt | Erwarteter Wert |
|---|---|
| `[Umsatz]` | 3.286.373 |
| `[Anzahl Bestellungen]` (alle) | 3.000 |
| `[Anzahl Bestellungen]` (abgeschlossen) | 2.107 |
| `[Durchschnittlicher Bestellwert]` | 1.560 |
| `[Bruttoumsatz]` | 3.423.096 |
| `[Rabattbetrag]` | 136.723 |

## Häufige Fehler

**Anzeigeeinheiten auf "Auto" lassen.** Power BI wählt dann automatisch Tausend wenn der Wert unter einer Million liegt — das ergibt "168,37 Tsd." statt eines sauberen Werts. Immer manuell auf "Keine" oder "Tausend" setzen.

**Zu viele Karten auf einer Seite.** Mehr als sechs Karten nebeneinander überfordern den Blick. Auf die wichtigsten drei bis fünf beschränken.

**Feldname als Beschriftung belassen.** `[Umsatz]` als Beschriftung sagt nichts über den Kontext — "Nettoumsatz 2024 (abgeschlossen)" ist besser.

## Abgrenzung

**Kartenvisual vs. Mehrzeilige Karte:** Kartenvisual: ein Wert. Mehrzeilige Karte: mehrere Werte eines Objekts (z.B. alle Kennzahlen eines Salesreps).

**Kartenvisual vs. KPI-Visual:** Kartenvisual: absoluter Wert ohne Zielvergleich. KPI-Visual: Istwert + Ziel + Trendlinie.

---

# 2. KPI-Visual

## Zweck

Das KPI-Visual zeigt **Istwert, Zielwert und Trendlinie** in einem kompakten Visual. Es beantwortet die Frage: "Sind wir im Plan?" — mit einem Blick auf Farbcodierung (grün/rot) und Abweichung in Prozent.

**Wann verwenden:**
- Wenn ein Zielwert vorhanden ist und die Abweichung kommuniziert werden soll
- Regelmäßig verfolgte KPIs auf Dashboards
- Wenn der Trend (Auf-/Abwärtstendenz) zusätzlich zur aktuellen Zahl relevant ist

**Wann nicht verwenden:**
- Wenn kein sinnvoller Zielwert existiert — dann Kartenvisual
- Wenn mehrere Ziele gleichzeitig verfolgt werden sollen — mehrere KPI-Visuals

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Wert | Measure | Ja | Der Istwert. Erscheint groß im Visual. |
| Trendachse | Datum oder Zahl | Ja | Zeitdimension für die Sparkline unten im Visual. |
| Ziel | Measure | Ja | Der Zielwert. Muss ein Measure sein — kein direkt eingetragener Wert. |

> **Ziel muss ein Measure sein.** Ein fester Zielwert (z.B. 3.500.000) muss als Measure angelegt werden: `Umsatzziel = 3500000`. Direkte Wertangabe im Well ist nicht möglich.

## Wichtige Format-Optionen

**Format → Visual → Richtung**
- *Hoch ist gut / Niedrig ist gut:* Bestimmt die Farblogik. "Hoch ist gut" → über Ziel = grün, unter Ziel = rot. Bei Kennzahlen wie Fehlerquote oder Stornoquote: "Niedrig ist gut".

**Format → Visual → Abweichung**
- *Anzeigeeinheiten:* Prozentual (Standard) oder absolut.
- *Schriftgröße:* Die Abweichung (+6,8% oder -12,5%) sollte gut lesbar sein.

**Format → Visual → Trendachse**
- *Anzeigen:* Sparkline ein- oder ausblenden.
- *Farbe:* Einheitlich mit dem Berichtsdesign.

## Kontrollwerte (techtrade)

KPI: `[Umsatz]` als Wert, `Datum[Quartal]` als Trendachse, `[Umsatz Vorjahr]` als Ziel:

| Jahr | Umsatz | Vorjahr | Abweichung |
|---|---|---|---|
| 2022 | 747.066 | — | — |
| 2023 | 747.488 | 747.066 | +0,1% |
| 2024 | 798.191 | 747.488 | +6,8% → grün |

Quartalsentwicklung 2023 vs. 2022:

| Quartal | 2022 | 2023 | Abweichung |
|---|---|---|---|
| Q1 | 262.943 | 196.210 | −25,4% → rot |
| Q2 | 142.523 | 128.300 | −10,0% → rot |
| Q3 | 152.842 | 254.272 | +66,4% → grün |
| Q4 | 188.758 | 168.705 | −10,6% → rot |

## Häufige Fehler

**Ziel als festen Wert direkt im Well eingeben.** Das Well akzeptiert nur Measures. Zielwert als eigenes Measure anlegen: `Umsatzziel = 3500000`.

**Richtung nicht gesetzt.** Standardmäßig ist "Hoch ist gut" aktiv. Bei Kennzahlen wo ein niedrigerer Wert besser ist (Fehlerquote, Ablehnungsrate, Stornoquote) auf "Niedrig ist gut" umstellen — sonst ist die Farbcodierung invertiert.

**Trendachse fehlt.** Ohne Trendachse zeigt das Visual keinen Trend — es bleibt ein einfaches Kartenvisual mit Zielvergleich. Immer eine Datumsebene in das Trendachsen-Well ziehen.

## Abgrenzung

**KPI-Visual vs. Kartenvisual:** Kartenvisual für einen einzelnen Wert ohne Zielvergleich. KPI-Visual wenn Ziel, Abweichung und Trend gleichzeitig kommuniziert werden sollen.

**KPI-Visual vs. Messgerät:** KPI-Visual zeigt den Trend über Zeit. Messgerät zeigt einen Wert auf einer Skala zwischen Minimum und Maximum — ohne Zeitbezug.

---

# 3. Messgerät (Gauge)

## Zweck

Das Messgerät zeigt einen Wert auf einer **halbkreisförmigen Skala** zwischen Minimum und Maximum. Es kommuniziert sofort: Wie weit sind wir? Wie viel Spielraum ist noch? Ein Fortschrittsbalken im Halbkreisformat.

**Wann verwenden:**
- Zielerreichungsgrad visualisieren (z.B. 93,9% von 3.500.000 Euro)
- Auslastungsquoten (z.B. Kapazität: 80% ausgelastet)
- Wenn das Maximum einen fachlichen Grenzwert hat

**Wann nicht verwenden:**
- Wenn kein sinnvolles Minimum und Maximum definierbar sind
- Wenn der Zeitverlauf wichtig ist — dann KPI-Visual mit Trendlinie
- Wenn mehrere Werte verglichen werden sollen

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Wert | Measure | Ja | Position des Zeigers auf der Skala. |
| Mindestwert | Measure oder Zahl | Nein | Linkes Ende der Skala. Standard: 0. |
| Maximalwert | Measure oder Zahl | Nein | Rechtes Ende der Skala. Standard: doppelter Wert — fast immer falsch. |
| Zielwert | Measure oder Zahl | Nein | Markierung auf der Skala — zeigt wo das Ziel liegt. |

> **Maximalwert immer manuell setzen.** Der Standardwert ist das Doppelte des aktuellen Werts — das macht die Skala bedeutungslos. Immer einen fachlich sinnvollen Maximalwert eintragen (z.B. Umsatzziel, Kapazitätsgrenze, 100% bei Auslastung).

## Wichtige Format-Optionen

**Format → Visual → Messgerät-Achse**
- *Minimum, Maximum:* Skala definieren — wichtigste Einstellung.
- *Zielwert:* Markierungslinie auf der Skala.
- *Farbbereiche:* Drei Bereiche mit eigenen Farben definierbar (z.B. 0–70%: rot, 70–90%: gelb, 90–100%: grün). Einstellbar als Prozentwert der Skala.

**Format → Visual → Callout-Wert**
- Der große Zahlenwert in der Mitte des Halbkreises.
- *Anzeigeeinheiten:* Manuell setzen.

**Format → Visual → Zielwert**
- *Anzeigen:* Zielwert-Beschriftung ein- oder ausblenden.
- *Farbe:* Farbe der Zielmarkierung auf der Skala.

## Kontrollwerte (techtrade)

Messgerät: Wert = `[Umsatz]`, Mindestwert = 0, Maximalwert = 3.500.000, Zielwert = 3.500.000:

- Zeiger bei **3.286.373** — 93,9% der Skala
- Zielmarkierung am rechten Ende bei 3.500.000
- Farbbereiche sinnvoll: 0–70% = rot (0–2.450.000), 70–90% = gelb (2.450.000–3.150.000), 90–100% = grün (3.150.000–3.500.000)

## Häufige Fehler

**Maximalwert nicht gesetzt.** Power BI setzt den Maximalwert automatisch auf das Doppelte des aktuellen Werts (6.572.746). Der Zeiger steht dann in der Mitte der Skala — obwohl 93,9% des Ziels erreicht sind. Immer manuell setzen.

**Messgerät für Zeitreihen verwenden.** Das Messgerät zeigt einen Schnappschuss — keinen Verlauf. Für Trendanalysen KPI-Visual verwenden.

**Zu viele Messgeräte auf einer Seite.** Messgeräte benötigen viel Platz. Mehr als drei auf einer Seite wirken überladen. Für viele KPIs Kartenvisuals mit bedingter Formatierung verwenden.

## Abgrenzung

**Messgerät vs. KPI-Visual:** Messgerät: aktueller Stand auf einer Skala, kein Zeitverlauf. KPI-Visual: Abweichung vom Ziel plus Trendlinie über Zeit.

**Messgerät vs. Fortschrittsbalken (bedingte Formatierung):** Bei vielen Kategorien ist ein Tabellenvisual mit Datenbalken effizienter als viele einzelne Messgeräte.

---

# 4. Mehrzeilige Karte (Multi-row Card)

## Zweck

Die Mehrzeilige Karte zeigt **mehrere Kennzahlen eines Objekts** übersichtlich in einem Visual — wie ein Steckbrief. Gut für Detailansichten eines ausgewählten Elements nach Filterung oder Drillthrough.

**Wann verwenden:**
- Alle relevanten Kennzahlen eines ausgewählten Salesreps, Produkts oder Kunden zeigen
- Als Steckbrief auf einer Drillthrough-Seite
- Wenn eine Kartenreihe zu viel Platz benötigt und die Informationen gebündelt dargestellt werden sollen

**Wann nicht verwenden:**
- Wenn die Werte verglichen werden sollen — dann Tabellen- oder Matrixvisual
- Wenn nur ein Wert gezeigt werden soll — dann Kartenvisual
- Wenn viele Zeilen entstehen (mehr als sechs bis acht) — schwer lesbar

## Wells

| Well | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Felder | Beliebig (Measures und Felder) | Ja | Jedes Feld = eine Zeile in der Karte. Reihenfolge per Drag & Drop ändern. |

## Wichtige Format-Optionen

**Format → Visual → Datenbeschriftungen**
- *Schriftart, Größe, Farbe:* Werte optisch von Beschriftungen abheben — Werte größer oder fetter.
- *Anzeigeeinheiten:* Für jeden Wert individuell über das Measure formatierbar.

**Format → Visual → Kategoriebeschriftungen**
- *Ein/Aus:* Feldnamen als Beschriftung anzeigen oder ausblenden.
- Umbenennen: Rechtsklick auf das Feld im Well → Umbenennen. Der neue Name erscheint als Beschriftung.

**Format → Visual → Karte**
- *Ausrichtung:* Horizontal (Beschriftung links, Wert rechts) oder vertikal (Beschriftung oben, Wert unten).
- *Trennlinie:* Linie zwischen den Zeilen ein- oder ausblenden.

## Kontrollwerte (techtrade)

Mehrzeilige Karte für Salesrep Heinz-Jürgen Heintze (nach Slicer oder Drillthrough auf Region Nord, dann Salesrep Heintze):

| Feld | Erwarteter Wert |
|---|---|
| `salesreps[Vorname]` | Heinz-Jürgen |
| `salesreps[Nachname]` | Heintze |
| `salesreps[Region]` | Nord |
| `[Umsatz]` | 256.626 |
| `[Anzahl Bestellungen]` | 102 |
| `[Durchschnittlicher Bestellwert]` | 2.516 |

Top 5 Salesreps nach Umsatz (für Vergleich):

| Salesrep | Region | Umsatz | Bestellungen |
|---|---|---|---|
| Heinz-Jürgen Heintze | Nord | 256.626 | 102 |
| Karl Heinz Henschel | West | 217.781 | 124 |
| Ansgar Davids | Mitte | 197.881 | 116 |
| Friedlinde Tintzmann | Mitte | 191.211 | 112 |
| Hans-Uwe Trubin | Ost | 189.948 | 98 |

## Häufige Fehler

**Feldnamen nicht umbenannt.** `[Umsatz]` als Beschriftung ist oft ausreichend, aber technische Namen wie `SalesRepID` oder `orders[Einzelpreis]` müssen umbenannt werden.

**Zu viele Felder.** Mehr als acht Zeilen in einer mehrzeiligen Karte werden unübersichtlich. Nebenwichtige Felder weglassen oder in eine Tabelle auslagern.

**Auf falscher Berichtsseite verwendet.** Die Mehrzeilige Karte ergibt nur Sinn wenn der Filterkontext auf ein einzelnes Objekt eingeschränkt ist — z.B. durch einen Drillthrough oder einen Slicer der genau einen Salesrep auswählt. Ohne Filterung aggregiert das Measure über alle Objekte.

## Abgrenzung

**Mehrzeilige Karte vs. Kartenvisual:** Kartenvisual: ein Wert. Mehrzeilige Karte: mehrere Werte gebündelt.

**Mehrzeilige Karte vs. Tabellenvisual:** Tabellenvisual zeigt viele Zeilen (alle Salesreps). Mehrzeilige Karte zeigt einen gefilterten Ausschnitt — einen Salesrep, ein Produkt.

---

## Vergleich der vier Visuals

| Visual | Zeigt | Wann verwenden | Typisches Element |
|---|---|---|---|
| Kartenvisual | Einen einzigen KPI | Dashboard-Überblick | Gesamtumsatz: 3.286.373 |
| KPI-Visual | Istwert + Ziel + Trend | Zielverfolgung mit Trendlinie | Umsatz 2024: +6,8% über Vorjahr |
| Messgerät | Wert auf einer Skala | Fortschritt zum Maximum | 93,9% des Umsatzziels erreicht |
| Mehrzeilige Karte | Mehrere Werte eines Objekts | Steckbrief nach Filterung | Salesrep-Kennzahlen nach Drillthrough |

---

## Gemeinsame Hinweise

**Anzeigeeinheiten.** Bei allen vier Visuals Anzeigeeinheiten immer manuell setzen — "Auto" erzeugt unschöne Dezimalwerte.

**Kontextabhängigkeit.** Alle vier Visuals zeigen den Wert im aktuellen Filterkontext. Ohne Filter und ohne Slicer zeigen sie den Gesamtwert. Mit Region-Slicer zeigen sie nur den Wert der gewählten Region.

**Beschriftungen umbenennen.** Technische Feldnamen (`[Umsatz_Abgeschlossen_Netto]`) immer durch lesbare Beschriftungen ersetzen — entweder per Rechtsklick im Well oder im Format-Bereich unter Datenbeschriftungen.
