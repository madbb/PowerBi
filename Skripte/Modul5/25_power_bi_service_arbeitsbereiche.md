# Power BI Service und Arbeitsbereiche

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 5 · Skript 22</div>
  <div class="pbi-page-title">Power BI Service und Arbeitsbereiche</div>
  <div class="pbi-page-sub">Berichte veröffentlichen, Arbeitsbereiche verwalten, Dashboards erstellen</div>
</div>

Bisher haben wir ausschließlich in Power BI Desktop gearbeitet. Berichte und Modelle bleiben dort lokal auf dem eigenen Rechner. Der **Power BI Service** ist die webbasierte Plattform, über die Berichte veröffentlicht, geteilt und gemeinsam genutzt werden. Dieses Skript zeigt, wie der Übergang vom Desktop in den Dienst funktioniert und welche Konzepte dabei eine Rolle spielen.

---

## Power BI Service im Überblick

Der Power BI Service ist unter **app.powerbi.com** erreichbar. Es handelt sich um den Software-as-a-Service-Teil von Power BI. Berichte werden hier im Browser angezeigt und können mit anderen Nutzern geteilt werden, ohne dass eine Desktop-Installation notwendig ist.

Der Dienst besteht aus fünf zentralen Bausteinen:

| Baustein | Beschreibung |
|---|---|
| **Arbeitsbereich** | Container für Berichte, semantische Modelle und Dashboards. Organisiert Inhalte nach Team oder Projekt. |
| **Bericht** | Interaktives Dokument mit einer oder mehreren Seiten. Basiert auf genau einem semantischen Modell. |
| **Semantisches Modell** | Datenmodell mit Tabellen, Beziehungen und Measures. Wird beim Veröffentlichen mitübertragen. |
| **Dashboard** | Einseitige Sammlung angehefteter Visuals (Kacheln) aus einem oder mehreren Berichten. Nur im Service verfügbar. |
| **App** | Gebündelte Zusammenstellung von Berichten und Dashboards für eine bestimmte Zielgruppe. |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Power BI Desktop ist das Werkzeug zum <strong>Erstellen</strong> von Berichten. Der Power BI Service ist das Werkzeug zum <strong>Verteilen und Verwalten</strong>. Beide Teile ergänzen sich, ersetzen sich aber nicht gegenseitig.
</div>

---

## Arbeitsbereiche

### Typen

Es gibt zwei Arten von Arbeitsbereichen:

- **Mein Arbeitsbereich** — privater Bereich, nur für den eigenen Nutzer sichtbar. Geeignet für persönliche Berichte und Tests. Keine Zusammenarbeit möglich.
- **Freigegebene Arbeitsbereiche** — mehrbenutzerfähige Umgebung für Teams. Rollen steuern, wer was tun darf.

### Arbeitsbereich anlegen

Im Power BI Service: linke Navigationsleiste → **Arbeitsbereiche** → **Arbeitsbereich erstellen**. Ein eindeutiger Name ist Pflicht. Optional: Beschreibung und Bild zur besseren Identifikation.

### Lizenzmodus

Beim Anlegen eines freigegebenen Arbeitsbereichs wird der Lizenzmodus festgelegt. Er bestimmt, welche Funktionen verfügbar sind und welche Lizenz andere Nutzer benötigen:

| Lizenzmodus | Voraussetzung Berichtsautor | Voraussetzung Workspace-Zuschauer | Besonderheiten |
|---|---|---|---|
| **Pro** | Power BI Pro | Power BI Pro | Standard für Teams. Alle Nutzer benötigen Pro-Lizenz. |
| **Premium-Einzelbenutzer (PPU)** | PPU-Lizenz | PPU-Lizenz | Mehr Aktualisierungen, größere Modelle. Weniger flexibel bei der Freigabe. |
| **Fabric-Kapazität** | Pro oder PPU | Pro oder PPU | Dedizierte Ressourcen. Voller Fabric-Funktionsumfang. App-Betrachter können bei F64+ auch ohne Pro-Lizenz App-Inhalte einsehen (nicht Workspace direkt). |

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Praxis-Hinweis</span>
  In den meisten Unternehmen ist Power BI Pro der Standard. PPU kommt zum Einsatz, wenn einzelne Analysten mehr Kapazität benötigen. Fabric-Kapazität ist ein Thema für Enterprise-Umgebungen.
</div>

### Rollen im Arbeitsbereich

Rollen steuern, was ein Nutzer im Arbeitsbereich tun darf. Rollen werden über **Zugriff verwalten** zugewiesen — an Einzelpersonen oder an Gruppen (Sicherheitsgruppen, Microsoft 365-Gruppen):

| Rolle | Berichte anzeigen | Inhalte erstellen und bearbeiten | Apps veröffentlichen | Arbeitsbereich verwalten |
|---|---|---|---|---|
| **Betrachter** | Ja | Nein | Nein | Nein |
| **Mitwirkender** | Ja | Ja | Nein | Nein |
| **Mitglied** | Ja | Ja | Ja | Eingeschränkt |
| **Administrator** | Ja | Ja | Ja | Ja (inkl. Löschen) |

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">Wichtig</span>
  Arbeitsbereichsrollen funktionieren nach dem Prinzip "Alles oder Nichts": Wer Zugriff auf einen Arbeitsbereich hat, sieht alle darin enthaltenen Elemente. Wenn einzelne Berichte gezielt für bestimmte Personen freigegeben werden sollen, ist Freigabe auf Elementebene oder eine App die geeignetere Methode.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 3-manage-access.png — Bereich "Zugriff verwalten" im Power BI Service mit den vier Rollenoptionen.</span>
</div>

---

## Berichte veröffentlichen

### Aus Power BI Desktop veröffentlichen

Der einfachste Weg: In Power BI Desktop die Registerkarte **Start** öffnen → Schaltfläche **Veröffentlichen** klicken. Falls noch nicht angemeldet, wird ein Login-Fenster angezeigt. Dann: Ziel-Arbeitsbereich auswählen → Veröffentlichen starten.

Was beim Veröffentlichen passiert:
- Der Bericht (Visuals, Seiten, Layout) wird in den Service übertragen
- Das semantische Modell (Tabellen, Beziehungen, Measures, Daten) wird ebenfalls übertragen
- Im Arbeitsbereich erscheinen zwei separate Einträge: ein Bericht und ein semantisches Modell

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Erneut veröffentlichen</span>
  Wenn ein Bericht nach Änderungen erneut veröffentlicht wird, zeigt Power BI eine Warnung: Wie viele Berichte und Dashboards könnten durch das neue semantische Modell betroffen sein. Bestätigung erforderlich, bevor das vorhandene Modell ersetzt wird.
</div>

### Direkt hochladen

Alternativ kann eine `.pbix`-Datei direkt im Power BI Service hochgeladen werden. Im Arbeitsbereich: **Neu** → **Bericht hochladen**. Dort entweder eine lokale Datei auswählen oder eine Datei aus OneDrive/SharePoint verknüpfen. Bei einer SharePoint-Verknüpfung synchronisiert Power BI automatisch etwa stündlich.

---

## Dashboards erstellen

### Dashboard vs. Bericht

Ein Dashboard ist keine Seite eines Berichts. Es ist ein eigenständiges Objekt im Power BI Service mit eigenen Regeln:

| Eigenschaft | Bericht | Dashboard |
|---|---|---|
| Seiten | Mehrere möglich | Immer einseitig |
| Semantische Modelle | Genau eines | Aus mehreren Berichten kombinierbar |
| Interaktivität | Hoch (Filter, Drill, Slicer) | Begrenzt (Kacheln nur navigieren) |
| Erstellung | Power BI Desktop | Nur im Power BI Service |
| Datenwarnungen | Nein | Ja (auf Kacheln) |
| Mobiloptimierung | Über mobile Layout-Ansicht | Automatisch responsiv |

Dashboards eignen sich für Executive-Summaries: ein Blick auf die wichtigsten Kennzahlen, verlinkt mit den jeweiligen Berichten für Details.

### Kacheln anheften

Kacheln entstehen, indem Visuals aus Berichten an ein Dashboard angeheftet werden. Im Power BI Service einen Bericht öffnen → mit dem Mauszeiger über ein Visual fahren → das **Nadel-Symbol** (Anheften) erscheint oben rechts im Visual-Header → klicken.

Im Dialogfenster wählen:
- **Vorhandenes Dashboard** — das Visual zu einem bestehenden Dashboard hinzufügen
- **Neues Dashboard** — ein neues Dashboard anlegen und das Visual als erste Kachel setzen

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 01-pin-single-tile-ss.png — Anheften-Symbol am Visual-Header und Dialogfenster zur Dashboard-Auswahl.</span>
</div>

Kacheln aus verschiedenen Berichten oder semantischen Modellen können auf demselben Dashboard zusammengeführt werden. Das ist der wesentliche Unterschied zum Bericht, der immer nur auf einem Modell basiert.

### Datenwarnungen

Auf numerischen Kacheln (Karten, Messgeräte) können Datenwarnungen eingerichtet werden. Überschreitet oder unterschreitet ein Wert einen definierten Schwellenwert, wird eine E-Mail-Benachrichtigung versendet. Konfiguration: Kachel auf dem Dashboard auswählen → Auslassungspunkte (**...**) → **Warnung verwalten**.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Datenwarnungen prüfen die Grenzwerte nur bei einer Aktualisierung des semantischen Modells. Eine Warnung wird maximal einmal pro Stunde pro Nutzer ausgelöst, auch wenn die Daten häufiger aktualisiert werden.
</div>

---

## Weitere Dashboard-Features

### Q&A auf dem Dashboard

Im Power BI Service zeigt jedes Dashboard oben ein Suchfeld **Stellen Sie eine Frage zu Ihren Daten**. Nutzer können dort eine Frage in natürlicher Sprache (Englisch) eintippen. Power BI generiert automatisch ein passendes Visual als Antwort. Das generierte Visual kann über **Visual anheften** direkt als neue Kachel zum Dashboard hinzugefügt werden.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Das Q&A-Suchfeld auf dem Dashboard unterscheidet sich vom Q&A-Visual (Skript 21): Das Suchfeld ist direkt in die Dashboard-Oberfläche integriert und braucht nicht erst als Visual platziert zu werden. Das Ergebnis kann jedoch genauso als Kachel angeheftet werden.
</div>

### Quick Insights

Power BI kann automatisch Muster und Trends in einem semantischen Modell erkennen und als Erkenntniskarten darstellen. Im Arbeitsbereich: Drei-Punkte-Menü neben dem semantischen Modell → **Quick Insights**. Power BI analysiert das Modell und generiert bis zu 40 Erkenntniskarten, jede mit einem Diagramm und einer kurzen Beschreibung.

Erkenntniskarten können direkt aus dem Erkenntnisbildschirm an ein Dashboard angeheftet werden. Quick Insights funktioniert nur mit importierten Daten, nicht mit DirectQuery-Modellen.

### Live-Berichtsseite anheften

Statt einzelner Visuals kann auch eine ganze Berichtsseite als Kachel an ein Dashboard angeheftet werden. Der Unterschied zu einzelnen Kacheln: Die angeheftete Seite bleibt **live** — alle Änderungen am Bericht erscheinen automatisch auf dem Dashboard beim nächsten Aktualisieren.

Klick-Pfad: Bericht im Service öffnen → Auslassungspunkte (**...**) in der Navigationsleiste → **An Dashboard anheften** → Dashboard auswählen → **Live anheften**.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Eine Live-Berichtsseite behält alle Slicer und Filter des Berichts bei. Die Darstellung ist nicht frei anpassbar — die Seite wird so gezeigt wie im Bericht. Empfehlung: Für Dashboard-Kacheln in erster Linie einzelne Visuals anheften; Live-Seiten nur wenn die gesamte Berichtsseite als Einheit sinnvoll ist.
</div>

### Dashboarddesign

Dashboards können mit einem einheitlichen visuellen Design versehen werden. Im Service: Dashboard öffnen → Bearbeiten (nach unten weisender Pfeil) → **Dashboarddesign**. Verfügbare Optionen: Hell (Standard), Dunkel, Benutzerfreundlich bei Farbenblindheit, Benutzerdefiniert. Bei Benutzerdefiniert können Hintergrundbild, -farbe, Kachelfarbe und Schriftfarbe angepasst werden. Ein eigenes JSON-Design kann hochgeladen werden.

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Power BI Service</div>
    <div class="pbi-summary-body">Webbasierte Plattform unter app.powerbi.com. Fünf Bausteine: Arbeitsbereich, Bericht, Semantisches Modell, Dashboard, App. Desktop erstellt, Service verteilt und verwaltet.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Arbeitsbereiche</div>
    <div class="pbi-summary-body">Mein Arbeitsbereich (privat) vs. Freigegebene Arbeitsbereiche (Team). Lizenzmodi: Pro, PPU, Fabric-Kapazität. Rollen: Betrachter, Mitwirkender, Mitglied, Administrator.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Veröffentlichen</div>
    <div class="pbi-summary-body">Start → Veröffentlichen in Desktop. Bericht und semantisches Modell werden getrennt übertragen. Erneutes Veröffentlichen überschreibt das bestehende Modell nach Bestätigung. Alternativ: .pbix direkt hochladen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Dashboard vs. Bericht</div>
    <div class="pbi-summary-body">Dashboards sind einseitig, nur im Service verfügbar und kombinieren Kacheln aus mehreren Berichten. Berichte sind interaktiver, aber auf ein semantisches Modell beschränkt. Dashboards unterstützen Datenwarnungen, Berichte nicht.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Kacheln und Warnungen</div>
    <div class="pbi-summary-body">Kacheln entstehen durch Anheften von Visuals aus Berichten. Nadel-Symbol im Visual-Header. Datenwarnungen auf numerischen Kacheln per E-Mail. Prüfung erfolgt nur bei Modellaktualisierung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Rollen-Prinzip</div>
    <div class="pbi-summary-body">Arbeitsbereichsrollen gelten für alle Inhalte im Arbeitsbereich gleichzeitig (Alles-oder-Nichts). Für gezielten Zugriff auf einzelne Berichte: Freigabe auf Elementebene oder Apps verwenden.</div>
  </div>
</div>
