# Visuelle Berechnungen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 14</div>
  <div class="pbi-page-title">Visuelle Berechnungen</div>
  <div class="pbi-page-sub">DAX auf Visual-Ebene — einfacher als Measures, direkt am Visual</div>
</div>

**Visuelle Berechnungen** sind DAX-Berechnungen, die nicht im semantischen Modell, sondern direkt im Visual gespeichert werden. Sie wurden eingeführt, um gängige Berechnungen wie laufende Summen, gleitende Durchschnitte oder Vorjahresvergleiche einfacher zugänglich zu machen — ohne die volle Komplexität von Filterkontext und Modellbeziehungen.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Visuelle Berechnungen befinden sich zum Zeitpunkt der Erstellung dieses Skripts in der Vorschauversion (Preview). Einschränkungen und verfügbare Funktionen können sich noch ändern. Aktuelle Informationen sind in der Microsoft-Dokumentation verfügbar.
</div>

---

## Was sind visuelle Berechnungen?

<div class="pbi-definition">
  <strong>Visuelle Berechnung</strong> Eine DAX-Berechnung, die direkt an ein Visual (Tabelle, Matrix, Balkendiagramm usw.) gebunden ist. Sie wird im Visual gespeichert, nicht im semantischen Modell. Die Berechnung kann nur auf Daten zugreifen, die bereits im Visual vorhanden sind.
</div>

Das ist der zentrale Unterschied zu Measures: Ein Measure ist im Modell verankert und kann von jedem Visual genutzt werden. Eine visuelle Berechnung existiert nur für das eine Visual, für das sie erstellt wurde — und arbeitet ausschließlich mit dem, was im Visual sichtbar ist.

### Vorteile gegenüber Measures

| Aspekt | Visuelle Berechnung | Measure |
|---|---|---|
| **Speicherort** | Im Visual | Im semantischen Modell |
| **Zugriff auf Daten** | Nur was im Visual sichtbar ist | Gesamtes Modell |
| **DAX-Komplexität** | Einfacher — kein Filterkontext-Wissen nötig | Komplexer — Filterkontext muss verstanden werden |
| **Modellanforderungen** | Keine Beziehungslogik | Vollständige Modellbeziehungen nutzen |
| **Leistung** | Oft besser (arbeitet mit aggregierten Daten) | Kann aufwendiger sein |
| **Wiederverwendbarkeit** | Nur in diesem Visual | Überall im Bericht |
| **Beziehungsfunktionen** | Nicht verfügbar (RELATED, USERELATIONSHIP usw.) | Vollständig verfügbar |

Visuelle Berechnungen kombinieren den einfachen Zeilenkontext berechneter Spalten mit der On-Demand-Auswertung von Measures — ohne dabei die Komplexität des Filterkontexts zu erfordern.

---

## Eine visuelle Berechnung erstellen

Das Fenster für visuelle Berechnungen öffnet sich über **Neues Measure → Neue Berechnung** wenn ein Visual ausgewählt ist. Es zeigt drei Hauptbereiche:

1. **Visuelle Vorschau** — das aktuelle Visual
2. **Bearbeitungsleiste** — hier wird der DAX-Ausdruck eingegeben
3. **Visuelle Matrix** — die Rohdaten des Visuals mit Echtzeitvorschau der Berechnung

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: visual-calculation-overview.png — Fenster für visuelle Berechnungen mit den drei Abschnitten: Visuelle Vorschau (oben), Bearbeitungsleiste (Mitte), Visuelle Matrix (unten).</span>
</div>

### Einfaches Beispiel: Gewinn berechnen

```dax
Profit = [Sales Amount] - [Total Product Cost]
```

Diese visuelle Berechnung subtrahiert die Gesamtproduktkosten vom Umsatz — Zeile für Zeile, genau wie eine berechnete Spalte, aber zur Abfragezeit und direkt im Visual.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  In visuellen Berechnungen sind keine Aggregatfunktionen wie <code>SUM</code> notwendig — die Daten im Visual sind bereits aggregiert. Das Hinzufügen unnötiger Aggregate erschwert die Lesbarkeit. Aggregate nur einsetzen, wenn sie inhaltlich sinnvoll sind.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: profit-visual-calculation.png — Matrixvisual mit Geschäftsjahr in den Zeilen sowie den Spalten Sales Amount, Total Product Cost und der neuen visuellen Berechnung Profit.</span>
</div>

### Felder ausblenden

Wenn die Quellfelder einer visuellen Berechnung nicht im Visual erscheinen sollen — z. B. wenn nur `Profit` angezeigt werden soll, nicht `Sales Amount` und `Total Product Cost` — können diese Felder im Bearbeitungsmodus ausgeblendet werden.

Ausgeblendete Felder bleiben in der visuellen Matrix erhalten und sind für andere visuelle Berechnungen weiterhin nutzbar, werden aber nicht im resultierenden Visual angezeigt.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: hide-fields.png — Bearbeitungsmodus für visuelle Berechnungen mit hervorgehobener Einblenden/Ausblenden-Funktion für Felder.</span>
</div>

---

## Vorlagen für häufige Berechnungen

Visuelle Berechnungen bieten eingebaute **Vorlagen** für die häufigsten Geschäftsberechnungen. Eine Vorlage auswählen generiert automatisch den DAX-Ausdruck in der Bearbeitungsleiste:

| Vorlage | Berechnet |
|---|---|
| **Laufende Summe** | Kumulierten Wert — aktueller Wert + alle vorherigen |
| **Gleitender Durchschnitt** | Durchschnitt über ein Fenster von Werten |
| **Prozent des übergeordneten Elements** | Anteil eines Werts am übergeordneten Gesamtwert |
| **Durchschnitt der untergeordneten Elemente** | Durchschnitt der untergeordneten Werte |
| **Vergleich vorheriger** | Differenz oder Verhältnis zum vorherigen Wert |
| **Vergleich nächster** | Differenz oder Verhältnis zum nachfolgenden Wert |

Jede Vorlage fügt die entsprechende DAX-Funktion in die Bearbeitungsleiste ein und kann anschließend angepasst werden.

### Verfügbare DAX-Funktionen

Die meisten DAX-Funktionen stehen in visuellen Berechnungen zur Verfügung. Ausgenommen sind Funktionen, die Modellbeziehungen voraussetzen:

- `USERELATIONSHIP` — nicht verfügbar
- `RELATED` — nicht verfügbar
- `RELATEDTABLE` — nicht verfügbar

Dafür gibt es in visuellen Berechnungen spezifische Funktionen, die als einfachere Varianten der DAX-Fensterfunktionen fungieren — z. B. `RUNNINGSUM`, `MOVINGAVERAGE`, `PREVIOUS`, `NEXT`.

---

## Parameter in visuellen Berechnungen

Viele Funktionen für visuelle Berechnungen akzeptieren zwei optionale Parameter, die das Verhalten der Berechnung in der visuellen Matrix steuern: **Axis** und **Reset**.

### Axis-Parameter

`Axis` steuert, wie die Berechnung die visuelle Matrix **durchläuft** — in welche Richtung sie iteriert:

| Wert | Richtung |
|---|---|
| `ROWS` (Standard) | Von oben nach unten, Zeile für Zeile |
| `COLUMNS` | Von links nach rechts, Spalte für Spalte |
| `ROWS COLUMNS` | Erst alle Zeilen einer Spalte, dann die nächste Spalte |
| `COLUMNS ROWS` | Erst alle Spalten einer Zeile, dann die nächste Zeile |

Bei den meisten Visuals ist `ROWS` der Standard — die Berechnung wird zeilenweise von oben nach unten ausgewertet.

### Reset-Parameter

`Reset` steuert, ob und wann eine kumulierende Berechnung (z. B. laufende Summe) **auf 0 zurückgesetzt** wird:

| Wert | Verhalten |
|---|---|
| `NONE` (Standard) | Kein Zurücksetzen — läuft durch das gesamte Visual |
| `HIGHESTPARENT` | Zurücksetzen wenn das **höchste** übergeordnete Element wechselt |
| `LOWESTPARENT` | Zurücksetzen wenn das **niedrigste** übergeordnete Element wechselt |
| Ganzzahl (positiv) | Absolute Ebene von oben (1 = erstes Feld, 2 = zweites usw.) |
| Ganzzahl (negativ) | Relative Ebene über der aktuellen Zeile |

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Eine Hierarchie mit den Ebenen <em>Jahr → Quartal → Monat</em>:

```dax
-- Laufende Summe ohne Reset (läuft über alle Jahre durch):
RUNNINGSUM([Sales Amount])

-- Laufende Summe, die für jedes Jahr neu beginnt:
RUNNINGSUM([Sales Amount], HIGHESTPARENT)

-- Laufende Summe, die für jedes Quartal neu beginnt:
RUNNINGSUM([Sales Amount], LOWESTPARENT)
```

Bei `HIGHESTPARENT` ist Jahr die höchste Ebene — die Summe startet zu Beginn jedes Jahres bei 0. Bei `LOWESTPARENT` ist Quartal die niedrigste übergeordnete Ebene — die Summe startet zu Beginn jedes Quartals neu.
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Hinweis</span>
  Der Reset-Parameter setzt eine mehrstufige Hierarchie auf der Achse voraus. Wenn die Achse nur eine Ebene hat, kann stattdessen <code>PARTITIONBY</code> verwendet werden.
</div>

---

## Visuelle Berechnung oder Measure?

Die Entscheidung hängt von Anwendungsfall und Anforderung ab:

**Visuelle Berechnungen verwenden, wenn:**
- Die Berechnung nur für ein bestimmtes Visual benötigt wird
- Es sich um eine Standard-Aggregation über die Visual-Struktur handelt (laufende Summe, gleitender Durchschnitt, Rangfolge, Vorjahresvergleich)
- Die Berechnung einfach bleiben und keine Modellbeziehungen benötigen soll
- Die Leistung ein Faktor ist (visuelle Berechnungen arbeiten mit bereits aggregierten Daten)

**Measures verwenden, wenn:**
- Die Berechnung in mehreren Visuals oder Berichten wiederverwendet werden soll
- Auf Modellbeziehungen (RELATED, USERELATIONSHIP) zugegriffen werden muss
- Filterkontext-Manipulationen mit CALCULATE notwendig sind
- Die Berechnung Teil des semantischen Modells und damit zentral verwaltbar sein soll

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📊</div>
    <div class="pbi-summary-title">Was sind visuelle Berechnungen?</div>
    <div class="pbi-summary-body">DAX-Ausdrücke, die direkt im Visual gespeichert werden. Können nur auf Daten zugreifen, die im Visual sichtbar sind. Kein Filterkontext-Wissen nötig — einfacher als Measures für viele häufige Berechnungen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🛠️</div>
    <div class="pbi-summary-title">Erstellen</div>
    <div class="pbi-summary-body">Über "Neue Berechnung" wenn ein Visual ausgewählt ist. Drei Bereiche: Visuelle Vorschau, Bearbeitungsleiste, Visuelle Matrix mit Echtzeitvorschau. Felder können ausgeblendet werden, ohne sie zu löschen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📋</div>
    <div class="pbi-summary-title">Vorlagen</div>
    <div class="pbi-summary-body">Laufende Summe, Gleitender Durchschnitt, Prozent des übergeordneten Elements, Durchschnitt untergeordneter Elemente, Vergleich vorheriger, Vergleich nächster. Jede Vorlage fügt automatisch den DAX-Code ein.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">↔️</div>
    <div class="pbi-summary-title">Axis-Parameter</div>
    <div class="pbi-summary-body">Steuert die Durchlaufrichtung: ROWS (Standard), COLUMNS, ROWS COLUMNS, COLUMNS ROWS. Legt fest, in welcher Reihenfolge die visuelle Matrix für die Berechnung durchlaufen wird.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔄</div>
    <div class="pbi-summary-title">Reset-Parameter</div>
    <div class="pbi-summary-body">Steuert Neustart bei kumulativen Berechnungen: NONE (läuft durch), HIGHESTPARENT (bei höchstem übergeordneten Element), LOWESTPARENT (bei niedrigstem), oder numerische Hierarchieebene.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">⚖️</div>
    <div class="pbi-summary-title">Wann welche Berechnungsart?</div>
    <div class="pbi-summary-body">Visuelle Berechnung: visual-spezifisch, einfache Aggregation, Leistung. Measure: wiederverwendbar, Modellbeziehungen, CALCULATE/Filterkontext, zentrale Verwaltung. Beide ergänzen sich.</div>
  </div>
</div>
