# Das richtige Modellframework wählen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 2 · Skript 07</div>
  <div class="pbi-page-title">Das richtige Modellframework wählen</div>
  <div class="pbi-page-sub">Modellgrundlagen, Import, DirectQuery, zusammengesetztes Modell und Entscheidungshilfe</div>
</div>

Power BI bietet drei verschiedene Modellframeworks — Import, DirectQuery und zusammengesetzt. Die Wahl des richtigen Frameworks ist eine der grundlegendsten Entwurfsentscheidungen und hat direkte Auswirkungen auf Leistung, Aktualität der Daten und die Möglichkeiten bei der Modellentwicklung. Dieses Skript legt die Grundlagen, beschreibt die Merkmale jedes Frameworks und gibt Orientierung für die Auswahl.

---

## Modellgrundlagen

### Datenmodell und semantisches Modell

<div class="pbi-definition">
  <strong>Power BI-Datenmodell (semantisches Modell)</strong> Eine für Analysen optimierte, abfragbare Datenressource. Berichte fragen Datenmodelle über zwei Analysesprachen ab: <strong>DAX</strong> (Data Analysis Expressions) für Power BI-Berichte und <strong>MDX</strong> (Multidimensional Expressions) für paginierte Berichte und „In Excel analysieren". Das Modell wird im Power BI-Dienst als <em>Dataset</em> veröffentlicht.
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Nicht alle Datasets stammen aus in Power BI Desktop entwickelten Modellen. Einige stellen Verbindungen mit extern gehosteten Modellen in Azure Analysis Services (AAS) oder SQL Server Analysis Services (SSAS) dar. Andere repräsentieren Echtzeitdatenstrukturen (Push-, Streaming- oder Hybriddatasets). Dieses Skript behandelt ausschließlich Modelle, die in Power BI Desktop entwickelt werden.
</div>

### Die drei Phasen einer Analyseabfrage

Jedes Mal, wenn ein Visual in einem Power BI-Bericht gerendert wird, sendet Power BI intern eine Analyseabfrage an das Modell. Diese Abfrage durchläuft immer drei Phasen in dieser Reihenfolge:

<div class="pbi-card">
  <span class="pbi-card-num">①</span>
  <span class="pbi-card-title">Filtern</span>
  <span class="pbi-card-body">Schränkt die Datenmenge auf eine relevante Teilmenge ein. Filterwerte erscheinen nicht im Ergebnis. Filter kommen aus Datenschnitten, Berichts-/Seiten-/Visual-Ebenenfiltern, Sicherheit auf Zeilenebene (RLS) oder Measures.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">②</span>
  <span class="pbi-card-title">Gruppieren</span>
  <span class="pbi-card-body">Unterteilt das Ergebnis in sichtbare Gruppen — z. B. nach Quartal oder Produktkategorie. Jede Gruppe ist selbst ein Filter, dessen Wert im Ergebnis sichtbar ist.</span>
</div>

<div class="pbi-card">
  <span class="pbi-card-num">③</span>
  <span class="pbi-card-title">Zusammenfassen</span>
  <span class="pbi-card-body">Erzeugt einen einzelnen Ergebniswert je Gruppe — z. B. Summe, Anzahl, Minimum, Maximum oder ein komplexes DAX-Measure.</span>
</div>

<div class="pbi-example">
  <span class="pbi-badge">Beispiel</span>
  Ein Säulendiagramm zeigt vierteljährliche Umsätze für das Jahr 2021. Der Datenschnitt <em>filtert</em> nach 2021. Das Säulendiagramm <em>gruppiert</em> nach Quartal. Die Säulenhöhen stellen die <em>zusammengefassten</em> Umsatzwerte je Quartal dar.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: model-frameworks-analytic-query-example.png — Power BI-Bericht mit Datenschnitt (Jahr 2021) und Säulendiagramm mit vierteljährlichen Umsätzen als Beispiel für die drei Abfragephasen.</span>
</div>

### Tabellarisches Modell und Sternschema

Ein Power BI-Modell ist ein **tabellarisches Modell** — es besteht aus einer oder mehreren Tabellen mit Spalten, ergänzt durch Beziehungen, Hierarchien und Berechnungen.

Der empfohlene Entwurfsansatz ist das **Sternschema**:

<div class="pbi-definition">
  <strong>Dimensionstabellen</strong> Beschreiben Geschäftsentitäten — Produkte, Kunden, Orte, Zeit. Werden in Analyseabfragen <em>gefiltert</em> oder <em>gruppiert</em>.
</div>

<div class="pbi-definition">
  <strong>Faktentabellen</strong> Speichern Beobachtungen oder Ereignisse — Aufträge, Transaktionen, Messwerte. Enthalten numerische Measures und Fremdschlüssel zu Dimensionstabellen. Werden in Analyseabfragen <em>zusammengefasst</em>.
</div>

Im Sternschema bildet die Faktentabelle das Zentrum, die Dimensionstabellen bilden die Zacken des Sterns.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: model-frameworks-star-schema-design.png — Sternschema mit Faktentabelle im Zentrum und mehreren Dimensionstabellen als Zacken.</span>
</div>

### Tabellenspeichermodus und Modellframework

Jede Tabelle im Modell (außer berechneten Tabellen) hat eine **Speichermoduseigenschaft**. Die Kombination dieser Einstellungen aller Tabellen bestimmt das **Modellframework**:

| Speichermodus | Verhalten | Framework |
|---|---|---|
| **Import** | Daten werden im Modell gespeichert/zwischengespeichert | Importmodell (alle Tabellen = Import) |
| **DirectQuery** | Abfragen werden direkt an die Datenquelle weitergeleitet | DirectQuery-Modell (alle Tabellen = DQ, gleiche Quelle) |
| **Dual** | Import oder DirectQuery — Power BI wählt den effizienteren Weg | Teil eines zusammengesetzten Modells |

<div class="pbi-definition">
  <strong>Quellgruppe</strong> Eine Gruppe von Modelltabellen, die mit derselben Datenquelle verknüpft sind. Ein Import- oder DirectQuery-Modell hat genau eine Quellgruppe. Ein <strong>zusammengesetztes Modell</strong> hat mehr als eine Quellgruppe.
</div>

---

## Das Importmodell

Ein Importmodell besteht ausschließlich aus Tabellen mit Speichermodus **Import** sowie berechneten Tabellen (die per DAX-Formel definiert werden). Es ist das **am häufigsten verwendete Framework** und der Standard beim Erstellen neuer Power BI-Berichte.

### Vorteile

- Unterstützt alle Power BI-Datenquellentypen (Datenbanken, Dateien, Feeds, Webseiten, Dataflows u. v. m.)
- Kann Quelldaten aus verschiedenen Quellen in einem Modell integrieren
- Unterstützt alle DAX- und Power Query (M)-Funktionen vollständig
- Unterstützt berechnete Tabellen
- Liefert die **beste Abfrageleistung** — Daten sind im Arbeitsspeicher gespeichert und für Analyseabfragen optimiert

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: model-frameworks-import.png — Importmodell im Sternschema, das Daten aus verschiedenen Quellen lädt (relationale Datenbank, Excel, Social Media-Feed, Dataflow).</span>
</div>

### Einschränkungen

**Modellgröße:**

Power BI erzwingt Größenlimits pro Dataset:

| Kapazität | Größenlimit |
|---|---|
| Freigegebene Kapazität | 1 GB (komprimierte Modellgröße) |
| Dedizierte/Premium-Kapazität | Über 10 GB möglich (mit aktiviertem Large Dataset Storage Format) |

Methoden zur Datenreduktion, um Modelle kleiner zu halten:

- Unnötige Spalten und Zeilen entfernen
- Faktentabellen auf höherem Aggregationsniveau speichern (z. B. täglich statt transaktional)
- Spaltendatentypen optimieren — numerische Typen bevorzugen
- Benutzerdefinierte Spalten in Power Query statt berechneter Spalten im Modell
- Laden für Staging-Abfragen deaktivieren
- Automatische Datum-/Uhrzeiteinstellung deaktivieren
- DirectQuery-Speichermodus für große Faktentabellen verwenden (→ zusammengesetztes Modell)

**Datenaktualisierung:**

Importierte Daten sind nur so aktuell wie die letzte erfolgreiche Aktualisierung. Grenzen für geplante Aktualisierungen:

| Kapazität | Maximale tägliche Aktualisierungen |
|---|---|
| Freigegebene Kapazität | 8× pro Tag |
| Dedizierte/Premium-Kapazität | 48× pro Tag |

Bei jeder Standard-Aktualisierung werden alle Daten einer Tabelle gelöscht und neu geladen — bei großen Faktentabellen kann das eine erhebliche Last auf dem Quellsystem erzeugen. Die **inkrementelle Aktualisierung** löst dieses Problem, indem sie Tabellenpartitionen nach Zeitraum anlegt und nur die tatsächlich geänderten Partitionen aktualisiert.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title"> Hinweis</span>
  Sind die Aktualisierungsgrenzen nicht tolerierbar, sind DirectQuery-Tabellen, eine Hybridtabelle oder ein Echtzeitdataset als Alternativen zu erwägen.
</div>

---

## Das DirectQuery-Modell

Ein DirectQuery-Modell besteht aus Tabellen mit Speichermodus **DirectQuery**, die alle zur gleichen Quellgruppe gehören. Keine Daten werden im Modell gespeichert — jede Visualisierung sendet eine Live-Abfrage an die Datenquelle.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: model-frameworks-direct-query.png — DirectQuery-Modell im Sternschema: Power BI leitet alle Abfragen direkt an die Quelldatenbank (Azure SQL) weiter.</span>
</div>

### Wann DirectQuery geeignet ist

- **Große oder sich schnell ändernde Datenquellen** — Daten eines Data Warehouse vollständig zu importieren ist unpraktisch. DirectQuery liefert Abfrageergebnisse in Quasi-Echtzeit ohne Aktualisierungsaufwand.
- **Sicherheit auf Zeilenebene in der Quelle** — Wenn die Quelldatenbank RLS erzwingt, kann DirectQuery diese Regeln direkt nutzen, statt sie im Modell zu replizieren (nur für bestimmte relationale Datenbanken mit Single Sign-On).
- **Einschränkungen der Datenhoheit** — Wenn Sicherheitsrichtlinien verbieten, dass Daten das System verlassen, ermöglicht DirectQuery Berichte ohne lokale Datenkopie.
- **Spezialisierte Datasets** — Über DirectQuery lässt sich eine Verbindung mit einem bestehenden Power BI-Dataset oder AAS-Modell herstellen, das dann als Remotemodell dient. Das neue lokale Modell kann es erweitern (Umbenennen, Measures hinzufügen). Das Verketten von bis zu drei Modellen ist möglich.

### Einschränkungen

- Nicht alle Datenquellen werden unterstützt — hauptsächlich große relationale Datenbanken, Power BI-Datasets und AAS-Modelle
- Nicht alle Power Query (M)-Transformationen verfügbar — Pivot/Unpivot und viele andere sind nicht möglich, da Abfragen in native Datenbankabfragen übersetzt werden müssen
- Abfrageleistung kann langsam sein, wenn die Quelldatenbank nicht optimiert ist (fehlende Indizes, materialisierte Sichten) oder unter Last steht
- Analyseabfragen belasten das Quellsystem zusätzlich — auch OLTP-Vorgänge können verlangsamt werden

### Leistung verbessern

**Datenquellenoptimierungen:** Indizes und materialisierte Sichten in der Quelldatenbank anlegen, ausreichende Ressourcen für die Analyseworkload sicherstellen. Immer mit dem Datenbankbesitzer abstimmen.

**Benutzerdefinierte Aggregationstabellen:** Versteckte Aggregationstabellen im Modell befriedigen Abfragen mit höherem Aggregationsintervall über große Faktentabellen. Sie können als Import- oder DirectQuery-Tabellen angelegt werden. Wird die Aggregationstabelle im Importspeichermodus angelegt, entsteht ein zusammengesetztes Modell.

---

## Das zusammengesetzte Modell

Ein zusammengesetztes Modell hat **mehr als eine Quellgruppe** — typischerweise eine Import- und eine DirectQuery-Quellgruppe kombiniert.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label"> Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: model-frameworks-composite.png — Zusammengesetztes Sternschema: einige Tabellen sind importiert, andere leiten Abfragen per DirectQuery an eine Azure SQL-Datenbank weiter.</span>
</div>

### Vorteile

- **Entwurfsflexibilität** — Import und DirectQuery können für unterschiedliche Tabellen kombiniert werden, um das beste Gleichgewicht zwischen Aktualität und Leistung zu finden
- **Leistungssteigerung für DirectQuery** — Importierte Aggregationstabellen bedienen häufige Abfragen mit höherem Aggregationsintervall aus dem Cache
- **Erweiterung von Remotemodellen** — Ein bestehendes Power BI-Dataset kann als Basis genutzt und um neue Tabellen, Spalten oder Measures erweitert werden

### Einschränkungen

- Importierte Tabellen müssen weiterhin regelmäßig aktualisiert werden und können mit DirectQuery-Daten asynchron werden
- Wenn eine Abfrage importierte und DirectQuery-Daten kombiniert, muss Power BI Ergebnisse aus mehreren Quellgruppen konsolidieren — das kann die Leistung beeinflussen
- Beim Verketten von Modellen können Änderungen an Upstream-Modellen Downstream-Modelle beschädigen — vor Änderungen immer eine **Dataset-Auswirkungsanalyse** durchführen
- Beziehungen zwischen Tabellen aus verschiedenen Quellgruppen sind **eingeschränkte Beziehungen** — sie haben keine garantierte „1"-Seite und können zu abweichenden Abfrageergebnissen führen

### Spezielle Tabellentypen im zusammengesetzten Modell

**Importaggregationstabellen:** Versteckte Tabellen mit Speichermodus Import, die aggregierte Werte großer Faktentabellen vorhalten. Für Abfragen mit höherem Aggregationsintervall liefern sie Ergebnisse direkt aus dem Cache. Für maximale Wirkung sollten die verknüpften Dimensionstabellen auf **Dual-Speichermodus** gesetzt werden.

**Speichermodus Dual:** Eine Dual-Tabelle kann je nach Abfragekontext entweder aus dem Cache (Import) oder per Live-Abfrage (DirectQuery) bedient werden. Power BI wählt automatisch den effizienteren Weg. Datenschnitte und Filterkarten, die auf Dual-Dimensionstabellen basieren, werden deutlich schneller gerendert.

**Hybridtabellen:** Wenn für eine Importtabelle mit inkrementeller Aktualisierung die Option **„Aktuelle Daten in Echtzeit mit DirectQuery abrufen"** aktiviert wird, erzeugt Power BI automatisch eine DirectQuery-Partition für den aktuellen Zeitraum. Ältere Daten liegen als Importpartitionen im Cache; aktuelle Daten werden per DirectQuery direkt aus der Quelle geholt. Diese Option erfordert eine Premium-Lizenz.

---

## Framework wählen

| Situation | Empfohlenes Framework |
|---|---|
| Standardfall, beste Leistung und volle DAX/M-Unterstützung benötigt | **Import** |
| Sehr große Datenmengen oder Quasi-Echtzeit-Anforderungen | **DirectQuery** |
| DirectQuery-Leistung erhöhen (Aggregationstabellen) | **Zusammengesetzt** |
| Importmodell mit Echtzeitdaten für aktuelle Periode | **Zusammengesetzt** (Hybridtabelle) |
| Bestehendes Power BI-Dataset erweitern | **Zusammengesetzt** |

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">️ Wichtig</span>
  In Power BI Desktop lässt sich eine DirectQuery-Tabelle jederzeit in eine Importtabelle konvertieren. Der umgekehrte Weg — von Import zu DirectQuery — ist jedoch <strong>nicht möglich</strong>. Die Framework-Wahl sollte daher sorgfältig vor Beginn der Entwicklung getroffen werden.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Analyseabfrage</div>
    <div class="pbi-summary-body">Jedes Visual sendet eine Abfrage in drei Phasen: Filtern → Gruppieren → Zusammenfassen. Dimensionstabellen werden gefiltert/gruppiert, Faktentabellen werden zusammengefasst.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Importmodell</div>
    <div class="pbi-summary-body">Beste Leistung, volle Feature-Unterstützung. Einschränkungen: Modellgröße (1 GB / >10 GB Premium) und Aktualisierungsfrequenz (8×/48× täglich). Datenreduktion und inkrementelle Aktualisierung entschärfen die Limits.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">DirectQuery-Modell</div>
    <div class="pbi-summary-body">Live-Abfragen, keine Datenkopie. Geeignet für große Datenmengen, Quasi-Echtzeit und Datenhoheitspflichten. Eingeschränkte M-Transformationen, potenzielle Leistungsprobleme.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Zusammengesetztes Modell</div>
    <div class="pbi-summary-body">Mehr als eine Quellgruppe. Kombiniert Import und DirectQuery für Flexibilität. Schlüsselkonzepte: Aggregationstabellen, Dual-Modus, Hybridtabellen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Entscheidungsregel</div>
    <div class="pbi-summary-body">Import ist der Standard. DirectQuery bei sehr großen Daten oder Echtzeit. Zusammengesetzt, wenn DirectQuery-Leistung gesteigert oder ein Remotemodell erweitert werden soll.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Eingeschränkte Beziehungen</div>
    <div class="pbi-summary-body">Beziehungen zwischen Tabellen aus verschiedenen Quellgruppen haben keine garantierte „1"-Seite. Können zu abweichenden Berechnungsergebnissen führen — sorgfältig prüfen.</div>
  </div>
</div>
