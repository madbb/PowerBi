# DAX Grundlagen – Berechnungstypen, Syntax und Formeln

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 3 · Skript 09</div>
  <div class="pbi-page-title">DAX Grundlagen</div>
  <div class="pbi-page-sub">Berechnungstypen, Formelsyntax und Referenzen auf Modellobjekte</div>
</div>

**DAX (Data Analysis Expressions)** ist die Formelsprache von Power BI. Mit DAX lassen sich leistungsstarke Berechnungen erstellen, die weit über einfache Spaltenaggregationen hinausgehen — von Umsatzwachstum im Jahresvergleich bis zur Anzahl eindeutiger Kunden, auch bei lückenhaften Daten.

Dieses Skript legt das Fundament: Was sind die drei Berechnungstypen in DAX, wie ist eine Formel aufgebaut, und wie verweist man korrekt auf Tabellen, Spalten und Measures?

---

## Die drei DAX-Berechnungstypen

Mit DAX können einem semantischen Modell drei Arten von Berechnungen hinzugefügt werden:

<div class="pbi-definition">
  <strong>Berechnete Tabelle</strong> Eine neue Modelltabelle, die durch eine DAX-Formel erzeugt wird. Die Formel transformiert oder dupliziert vorhandene Modelldaten — oder erzeugt eine vollständig neue Datenreihe. Berechnete Tabellendaten werden immer ins Modell importiert und erhöhen damit die Modellgröße und die Aktualisierungszeit.
</div>

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Eine berechnete Tabelle kann <strong>nicht</strong> auf externe Datenquellen zugreifen. Dafür ist Power Query zuständig.
</div>

<div class="pbi-definition">
  <strong>Berechnete Spalte</strong> Eine neue Spalte, die durch eine DAX-Formel einer vorhandenen Modelltabelle hinzugefügt wird. Die Formel wird für jede Tabellenzeile ausgewertet und gibt einen einzelnen Wert zurück. Bei Importspeichermodus-Tabellen erfolgt die Auswertung bei der Datenaktualisierung; bei DirectQuery-Tabellen bei der Abfrage durch die Quelldatenbank. Berechnete Spalten sind im Datenbereich mit einem speziellen Symbol gekennzeichnet.
</div>

<div class="pbi-definition">
  <strong>Measure (explizites Measure)</strong> Eine benannte DAX-Formel, die einer Modelltabelle hinzugefügt wird und eine Aggregation über Modelldaten berechnet. Im Gegensatz zu berechneten Spalten werden Measures <strong>zum Zeitpunkt der Abfrage</strong> ausgewertet — ihre Ergebnisse werden nie im Modell gespeichert. Measures sind im Datenbereich mit dem Taschenrechnersymbol (⊞) erkennbar.
</div>

### Explizite vs. implizite Measures

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Der Begriff "Measure" bezieht sich in DAX immer auf <strong>explizite Measures</strong> — in DAX geschriebene Formeln. Davon zu unterscheiden sind <strong>implizite Measures</strong>: das sind normale Spalten, die von Visuals automatisch aggregiert werden können (z. B. Summe, Anzahl). Sie sind im Datenbereich mit dem Sigma-Symbol (∑) gekennzeichnet. Ein "berechnetes Measure" ist kein DAX-Begriff — "berechnet" wird ausschließlich für berechnete Tabellen und berechnete Spalten verwendet.
</div>

### Vergleich der drei Berechnungstypen

| | Berechnete Tabelle | Berechnete Spalte | Measure |
|---|---|---|---|
| **Ergebnis** | Tabellenobjekt | Einzelwert pro Zeile | Einzelwert (aggregiert) |
| **Auswertung** | Bei Modellladezeit | Bei Datenaktualisierung / Abfrage | Zur Abfragezeit |
| **Gespeichert im Modell** | Ja — erhöht Modellgröße | Ja — erhöht Modellgröße | Nein |
| **Typisches Szenario** | Datumstabellen, Rollenspieldimensionen, Was-wäre-wenn | Neue Attribute pro Zeile (z. B. Altersgruppe) | Aggregierte KPIs (z. B. Umsatz, Gewinn) |

### Einsatzszenarien für berechnete Tabellen

**Datumstabellen** — DAX-Zeitintelligenzfunktionen erfordern eine als Datumstabelle markierte Tabelle. Wenn die Quelldaten keine enthalten, kann eine mit `CALENDAR()` oder `CALENDARAUTO()` als berechnete Tabelle erzeugt werden.

**Rollenspieldimensionen** — Wenn eine Faktentabelle zwei Datumsspalten hat (z. B. Bestelldatum und Versanddatum), kann nur eine Beziehung zur Datumstabelle aktiv sein. Eine berechnete Tabelle dupliziert die Datumstabelle, sodass beide Beziehungen aktiv sein können.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-sales-data-relationships-1-ss.png — Modelldiagramm mit einer aktiven (durchgezogene Linie) und einer inaktiven (gestrichelten Linie) Beziehung zwischen Sales und Date.</span>
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: dax-sales-data-relationships-2-ss.png — Modelldiagramm mit zwei Datumstabellen (Date und Ship Date), jeweils mit einer aktiven Beziehung zur Tabelle Sales.</span>
</div>

**Was-wäre-wenn-Parameter** — Wenn ein numerischer Bereichsparameter erstellt wird, erzeugt Power BI Desktop automatisch eine berechnete Tabelle im Hintergrund. Diese ist als *getrennte Tabelle* nicht mit anderen Modelltabellen verknüpft.

---

## DAX-Formelsyntax

Jede Modellberechnung — egal ob berechnete Tabelle, berechnete Spalte oder Measure — wird nach demselben Grundmuster definiert:

```dax
<Berechnungsname> = <DAX-Formel>
```

Der Name steht links vom Gleichheitszeichen, die Formel rechts davon. Berechnete Tabellenformeln müssen ein **Tabellenobjekt** zurückgeben. Berechnete Spalten und Measures müssen einen **skalaren Wert** (Einzelwert) zurückgeben.

### Bausteine einer DAX-Formel

Eine DAX-Formel setzt sich aus folgenden Elementen zusammen:

- **DAX-Funktionen** — die eigentlichen Berechnungsbausteine (z. B. `SUM`, `CALCULATE`, `IF`)
- **DAX-Operatoren** — für arithmetische, logische und Vergleichsoperationen
- **Verweise auf Modellobjekte** — Tabellen, Spalten und Measures
- **Konstante Werte** — z. B. die Zahl `24` oder der Text `"GJ"` (für Geschäftsjahr)
- **DAX-Variablen** — zwischengespeicherte Ausdrucksergebnisse (`VAR`)
- **Leerzeichen** — für Lesbarkeit und Formatierung (ohne Auswirkung auf Logik oder Leistung)

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Power BI Desktop bietet beim Schreiben von Formeln <strong>IntelliSense</strong> — eine automatische Vervollständigung, die Funktionen und Modellobjekte vorschlägt und bei ausgewählten Funktionen eine Beschreibung anzeigt. IntelliSense nutzen beschleunigt das Schreiben korrekter Formeln erheblich.
</div>

---

## Verweise auf Modellobjekte

DAX-Formeln können auf drei Typen von Modellobjekten verweisen: **Tabellen**, **Spalten** und **Measures**. Auf Hierarchien oder Hierarchieebenen kann nicht direkt verwiesen werden — nur auf die zugrunde liegenden Spalten.

### Tabellenreferenzen

Tabellennamen werden in **einfache Anführungszeichen** gesetzt:

```dax
Ship Date = 'Date'
```

Die einfachen Anführungszeichen können weggelassen werden, wenn beide Bedingungen erfüllt sind:
1. Der Tabellenname enthält keine Leerzeichen
2. Der Tabellenname ist kein reserviertes DAX-Wort (z. B. ist `Date` ein DAX-Funktionsname und muss daher immer in Anführungszeichen stehen)

```dax
Arrival Airport = Airport
```

### Spaltenreferenzen

Spaltennamen werden in **eckige Klammern** gesetzt:

```dax
Revenue = SUM([Sales Amount])
```

Da Spaltennamen zwar innerhalb einer Tabelle, aber nicht unbedingt im gesamten Modell eindeutig sind, empfiehlt es sich, den Tabellennamen voranzustellen — die sogenannte **vollqualifizierte Spalte**:

```dax
Revenue = SUM(Sales[Sales Amount])
```

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Einige DAX-Funktionen setzen vollqualifizierte Spaltenverweise voraus. Es ist daher generell empfehlenswert, Spaltennamen <strong>immer</strong> mit dem Tabellennamen zu qualifizieren.
</div>

### Measurereferenzen

Auch Measure-Namen werden in **eckige Klammern** gesetzt — genau wie Spalten. Der Unterschied liegt im Kontext: In DAX werden Spalten und Measures auf unterschiedliche Weise verwendet, was mit der Zeit erkennbar wird.

```dax
Profit = [Revenue] - [Cost]
```

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  Obwohl es technisch möglich ist, empfiehlt es sich, Measure-Referenzen <strong>niemals</strong> mit einem Tabellennamen zu qualifizieren. Measures sind Objekte auf Modellebene — die Zuweisung zu einer "Heimattabelle" ist rein kosmetisch zur Strukturierung im Datenbereich. Die Empfehlung lautet daher: Spalten immer mit Tabellennamen, Measures niemals.
</div>

---

## Formelformatierung

DAX ist gegenüber Leerzeichen (Leerzeichen, Tabstopps, Zeilenumbrüche) vollständig tolerant — sie ändern weder die Formellogik noch die Leistung. Gut formatierte Formeln sind jedoch deutlich einfacher zu lesen, zu warten und zu debuggen.

**Bewährte Formatierungsregeln:**

- Leerzeichen zwischen Operatoren verwenden
- Geschachtelte Funktionsaufrufe per Tabstopp einrücken
- Funktionsargumente durch Zeilenumbrüche trennen, wenn sie nicht in eine Zeile passen
- Im Zweifelsfall mehr Leerzeichen als zu wenig verwenden

In Power BI Desktop gilt: **Umschalt+Eingabetaste** fügt einen Zeilenumbruch in der Bearbeitungsleiste ein. Ein einfaches **Eingabetaste** schreibt die Formel fest.

**Beispiel — dieselbe Formel unformatiert und formatiert:**

```dax
Revenue YoY % = DIVIDE([Revenue] - CALCULATE([Revenue], SAMEPERIODLASTYEAR('Date'[Date])), CALCULATE([Revenue], SAMEPERIODLASTYEAR('Date'[Date])))
```

```dax
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

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Das externe Tool <strong>DAX Formatter</strong> (daxformatter.com) kann verwendet werden, um eine Formel aus Power BI Desktop einzufügen, automatisch formatieren zu lassen und dann zurück einzufügen.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Berechnete Tabelle</div>
    <div class="pbi-summary-body">Erzeugt eine neue Tabelle aus vorhandenen Modelldaten per DAX. Typische Einsatzfälle: Datumstabellen, Rollenspieldimensionen, Was-wäre-wenn-Parameter. Erhöht Modellgröße.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Berechnete Spalte</div>
    <div class="pbi-summary-body">Neue Spalte pro Tabellenzeile, augewertet bei Datenaktualisierung. Ergebnis wird gespeichert — erhöht Modellgröße. Für zeilenbasierte Attribute, die nicht aus der Quelle kommen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">⊞</div>
    <div class="pbi-summary-title">Measure (explizit)</div>
    <div class="pbi-summary-body">Formel wird zur Abfragezeit ausgewertet, nie gespeichert. Für aggregierte KPIs und komplexe Berechnungen. Ergebnis hängt vom jeweiligen Filterkontext ab.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Formelsyntax</div>
    <div class="pbi-summary-body"><code>Name = DAX-Formel</code> — Funktionen, Operatoren, Objektverweise, Konstanten, Variablen und Leerzeichen. IntelliSense hilft beim fehlerfreien Schreiben.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Objektreferenzen</div>
    <div class="pbi-summary-body">Tabellen: einfache Anführungszeichen (<code>'Date'</code>). Spalten: eckige Klammern mit Tabellenpräfix (<code>Sales[Amount]</code>). Measures: eckige Klammern ohne Präfix (<code>[Revenue]</code>).</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Formatierung</div>
    <div class="pbi-summary-body">Leerzeichen, Tabstopps und Zeilenumbrüche haben keine Auswirkung auf Logik oder Leistung. Gut formatierte Formeln sind leichter zu lesen und zu debuggen. Umschalt+Enter für Zeilenumbruch.</div>
  </div>
</div>
