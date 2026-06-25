# Bedingte Formatierung in Power BI - Referenzblatt

Zwei Demo-Tabellen decken alle sinnvollen Formatierungsarten ab.
Alle Zahlen sind verifikationsfertig -- kein Schätzen nötig.

---

## Feature-Map: Was zeige ich womit

| Feature | Formatierungsart | Tabelle | Spalte | Besonderheit |
|---|---|---|---|---|
| Datenbalken (positiv) | Datenbalken | kpi_vertrieb | Umsatz_2024 | Wertebereich 296k bis 860k |
| Datenbalken (divergierend) | Datenbalken | kpi_vertrieb | Wachstum_EUR | 3 Regionen negativ, 5 positiv |
| Farbskala (2 Farben) | Hintergrundfarbe - Farbskala | kpi_vertrieb | Umsatz_2024 | Min weiss, Max dunkelblau |
| Farbskala (3 Farben) | Hintergrundfarbe - Farbskala | kpi_vertrieb | Zielerreichung_Pct | Min rot (78), Mitte gelb (90), Max grün (107) |
| Regeln (Zahlen) | Hintergrundfarbe - Regeln | kpi_vertrieb | Zielerreichung_Pct | Ampel-Logik, s. u. |
| Regeln (Text) | Hintergrundfarbe - Regeln | lagerampel | Bestandsstatus | Wert ist "Kritisch" -> Rot |
| Regeln (Zeit/Tage) | Hintergrundfarbe - Regeln | lagerampel | Letzter_Eingang_Tage | > 60 Tage -> Eskalation |
| Feldwert (Hex-Code) | Hintergrundfarbe - Feldwert | kpi_vertrieb | Ampel_Hex | Spalte enthält #RRGGBB |
| Feldwert (CSS-Name) | Schriftfarbe - Feldwert | lagerampel | Status_Farbe | Spalte enthält "red", "green" etc. |
| Symbole - Ampel | Symbole - Regeln | kpi_vertrieb | Zielerreichung_Pct | Drei Schwellen wie bei Regeln |
| Symbole - Pfeile | Symbole - Regeln | kpi_vertrieb | Wachstum_Pct | Abwärts / neutral / aufwärts |
| Web-URL | Web-URL | kpi_vertrieb | Region_URL | Spalte muss als Web-URL aktiv sein |
| Measure-gesteuert | Hintergrundfarbe - Feldwert | kpi_vertrieb | [Ampel_Farbe] | DAX-Measure gibt Hex zurück |

---

## Regeln im Detail

### Ampel: Zielerreichung_Pct

| Bedingung | Farbe | Hex |
|---|---|---|
| Wert ist kleiner als 85 | Rot | #C0392B |
| Wert ist groesser oder gleich 85 und kleiner als 100 | Gelb | #F39C12 |
| Wert ist groesser oder gleich 100 | Grün | #27AE60 |

Ergebnis in kpi_vertrieb: 2x Rot (Ost 78,2 / Südwest 83,6), 3x Gelb, 3x Grün.

### Pfeile: Wachstum_Pct

| Bedingung | Symbol | Bedeutung |
|---|---|---|
| Wert ist kleiner als -3 | Pfeil nach unten (rot) | Rückgang |
| Wert ist groesser oder gleich -3 und kleiner als 5 | Pfeil nach rechts (gelb) | Stagnation |
| Wert ist groesser oder gleich 5 | Pfeil nach oben (grün) | Wachstum |

Ergebnis: Ost (-5,38) und Südwest (-6,07) nach unten; West (+3,14) und Bayern (-1,79) neutral; Nord, Süd, Mitte, Nordost nach oben.

### Lagerampel: Letzter_Eingang_Tage

| Bedingung | Farbe |
|---|---|
| Wert ist kleiner als 30 | Grün |
| Wert ist groesser oder gleich 30 und kleiner als 60 | Orange |
| Wert ist groesser oder gleich 60 | Rot |

Ergebnis: ART-010 (105 Tage) und ART-002 (90 Tage) werden rot markiert.

### Bestandsstatus (Text-Regeln)

| Bedingung | Farbe |
|---|---|
| Wert ist "Kritisch" | #C0392B |
| Wert ist "Niedrig" | #E67E22 |
| Wert ist "Optimal" | #27AE60 |
| Wert ist "Überschuss" | #3498DB |

---

## DAX-gesteuerte Formatierung

Der entscheidende Unterschied zu statischen Regeln: Ein Measure reagiert auf
den Filterkontext. Wenn der Nutzer einen Slicer bedient, passt sich die Farbe
dynamisch an -- Regeln tun das nicht.

### Basismaß: Zielerreichung_Ratio

```dax
Zielerreichung_Ratio =
DIVIDE(SUM(kpi_vertrieb[Umsatz_2024]), SUM(kpi_vertrieb[Zielwert_2024]))
```

### Measure: Ampel_Farbe (gibt Hex-Code zurück)

```dax
Ampel_Farbe =
VAR ZE = [Zielerreichung_Ratio]
RETURN
    IF(ZE >= 1, "#27AE60",
        IF(ZE >= 0.85, "#F39C12",
            "#C0392B"
        )
    )
```

Verwendung: Spalte "Zielerreichung_Pct" auswählen -> Bedingte Formatierung ->
Hintergrundfarbe -> Feldwert -> Measure "Ampel_Farbe" wählen.

### Measure: Bestandsstatus_Num (für Symbol-Regeln)

```dax
Bestandsstatus_Num =
SWITCH(
    MAX(lagerampel[Bestandsstatus]),
    "Kritisch",  1,
    "Niedrig",   2,
    "Optimal",   3,
    "Überschuss", 4,
    BLANK()
)
```

Dann Symbole-Regel auf Bestandsstatus_Num konfigurieren:
1 = rotes Symbol, 2 = oranges Symbol, 3 = grünes Symbol, 4 = blaues Symbol.

---

## Divergierende Datenbalken (Wachstum_EUR)

Einstellung unter Datenbalken -> "Negative Balken und Achse":
- Negativbalken-Farbe: Rot (#C0392B)
- Achse: Automatisch (zentriert bei 0)
- Positiv: Blau oder Grün

Regionen mit negativem Wachstum in kpi_vertrieb: Ost (-20.000 EUR),
Südwest (-27.000 EUR), Bayern (-13.000 EUR).

---

## Matrix-Heatmap mit techtrade-Daten

Keine neue Tabelle nötig -- die vorhandene orders.csv reicht.

Aufbau der Matrix:
- Zeilen: salesreps[Name] oder customers[Kundenname]
- Spalten: Datum[MonatName] (aus berechneter Datumstabelle)
- Werte: [Umsatz] (Measure: SUMX)
- Bedingte Formatierung: Hintergrundfarbe -> Farbskala auf Werte

Wichtig: "Auf Werte anwenden" muss explizit auf "Alle Werte" gesetzt werden,
sonst greift die Formatierung nur auf die Gesamtsummen.

---

## Hinweise für die Demo

**Web-URL**: Die Datenkategorie der Spalte muss auf "Web-URL" gesetzt sein
(Modellansicht -> Spalte auswählen -> Eigenschaften -> Datenkategorie).
Alternativ greift die Formatierungsoption "Web-URL" direkt im Visual.

**Feldwert vs. Measure**: Power BI akzeptiert sowohl Hex-Codes (#RRGGBB) als
auch englische CSS-Farbnamen (red, green, orange, blue). Hex-Codes sind
praxistauglicher, weil sie exakte Farbtöne erlauben.

**Reihenfolge der Regeln**: Power BI wertet Regeln von oben nach unten aus
und stoppt bei der ersten zutreffenden Bedingung. Die restriktivste Bedingung
(kleinster Wert, engste Spanne) gehört nach oben.
