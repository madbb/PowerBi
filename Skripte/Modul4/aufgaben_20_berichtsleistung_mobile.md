# Aufgaben: Berichtsleistung und Mobile Design

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 20 · Aufgabenblatt</div>
  <div class="pbi-page-title">Berichtsleistung und Mobile Design</div>
  <div class="pbi-page-sub">Leistungsanalysator · Cache leeren · Visuals optimieren · Mobile Layout · Responsive Slicer</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis für dieses Aufgabenblatt</span>
  Öffne deine Berichtsdatei aus Modul 4 (<code>uebung_modul4.pbix</code>). Die Datei sollte mindestens eine Berichtsseite mit vier oder mehr Visuals enthalten: ein Kartenvisual, ein Balkendiagramm, ein Liniendiagramm und einen Slicer. Falls du noch keine solche Datei hast, lege eine neue Seite an und füge diese vier Visuals mit Feldern aus dem techtrade-Modell hinzu.
</div>

<div class="pbi-szenario">
  <strong>Szenario</strong><br>
  Du bist Berichtsverantwortliche bei TechTrade GmbH. Ein Kollege aus dem Vertrieb hat gemeldet, dass der Sales-Überblicksbericht beim Öffnen mehrere Sekunden braucht. Du sollst herausfinden, welches Visual das Problem verursacht, und den Bericht anschließend für Smartphone-Nutzer optimieren.
</div>

---

## Aufgabe 1 — Caches leeren und Leistungsanalysator starten

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Messung vorbereiten</span>
  </div>
  <div class="pbi-task-body">

Bevor du misst, müssen beide Caches geleert werden. Sonst misst du nicht die echten Ladezeiten, sondern die Zeit für bereits gespeicherte Ergebnisse.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge am Ende deines Berichts eine neue, leere Seite hinzu (Klick auf das <strong>+</strong> Symbol unten in der Seitenleiste). Speichere die Datei mit dieser leeren Seite als aktiver Seite (<strong>Strg+S</strong>). Schließe Power BI Desktop und öffne die Datei erneut. Auf welcher Seite öffnet sich die Datei? Warum ist das wichtig für die Messung?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Öffne den Leistungsanalysator: Registerkarte <strong>Ansicht</strong> im Menüband → Schaltfläche <strong>Leistungsanalyse</strong>. Der Bereich öffnet sich. Klicke auf <strong>Aufzeichnung beginnen</strong>. Wechsle danach zur Berichtsseite mit deinen vier Visuals. Warte bis alle Visuals geladen sind. Klicke dann auf <strong>Beenden</strong>.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klappe im Bereich Leistungsanalyse das erste Listenelement auf (Klick auf den Pfeil links). Welche drei Unterkategorien erscheinen? Notiere die Bezeichnungen und erkläre in einem Satz, was jede Kategorie misst.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Sortiere die Ergebnisse nach Gesamtdauer (absteigend). Welches Visual hat die längste Gesamtladezeit? Welche der drei Kategorien macht bei diesem Visual den größten Anteil aus?</span>
  </div>
</div>

  <strong>a) Startseite beim Öffnen und Bedeutung für die Messung:</strong>
  <br><br>
  <strong>b) Notiz: Aufzeichnung gestartet und beendet (Haken setzen wenn erledigt):</strong>
  <br><br>
  <strong>c) Drei Unterkategorien und ihre Bedeutung:</strong>
  <br><br>
  <strong>d) Langsamstes Visual und dominierende Kategorie:</strong>

  </div>
</div>

---

## Aufgabe 2 — Ergebnisse interpretieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Ladezeiten analysieren und einordnen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Notiere die Gesamtladezeit aller vier Visuals in einer kleinen Tabelle (Visual-Name, Gesamtdauer in ms, dominierende Kategorie). Welches Visual ist am schnellsten, welches am langsamsten?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Klicke auf <strong>Abfrage kopieren</strong> beim langsamsten Visual. Was wird in die Zwischenablage kopiert? Für welches Werkzeug ist dieser Text gedacht, und was könnte man damit untersuchen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Interagiere mit dem Slicer auf deiner Seite: Wähle einen Wert aus. Beobachte wie sich die Ladezeiten im Bereich Leistungsanalyse verändern. Werden neue Einträge hinzugefügt oder werden die alten aktualisiert? Wie werden erneute Ladevorgänge nach einer Slicer-Interaktion im Bereich angezeigt?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Ein Kollege berichtet, dass derselbe Bericht im Power BI Service für ihn deutlich langsamer lädt als bei dir in Desktop. Der Leistungsanalysator zeigt in Desktop gute Werte. Was könnten externe Faktoren sein, die diesen Unterschied erklären? Nenne mindestens zwei.</span>
  </div>
</div>

  <strong>a) Tabelle: Ladezeiten aller vier Visuals:</strong>
  <br><br>
  <strong>b) Inhalt der Zwischenablage und Verwendungszweck:</strong>
  <br><br>
  <strong>c) Verhalten der Anzeige nach Slicer-Interaktion:</strong>
  <br><br>
  <strong>d) Zwei externe Faktoren die den Unterschied erklären könnten:</strong>

  </div>
</div>

---

## Aufgabe 3 — Leistung verbessern

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Visuals und Modelleinstellungen optimieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge auf deiner Berichtsseite ein Tabellenvisual mit folgenden Feldern hinzu: <strong>orders[OrderID]</strong>, <strong>customers[Name]</strong>, <strong>products[Produktname]</strong>, <strong>orders[Menge]</strong>, <strong>orders[Einzelpreis]</strong>, <strong>orders[Rabatt]</strong>, <strong>orders[Bestelldatum]</strong>. Starte eine neue Aufzeichnung im Leistungsanalysator und lade die Seite. Wie hoch ist die Ladezeit dieses Tabellenvisuals im Vergleich zu den anderen Visuals?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Entferne das Tabellenvisual wieder. Starte erneut eine Aufzeichnung. Wie verändert sich die Gesamtladezeit der Seite? Notiere den Unterschied in Millisekunden und schätze: War das Tabellenvisual das leistungskritische Element?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Prüfe ob in deinem Modell <strong>Auto Datum/Uhrzeit</strong> aktiv ist: <strong>Datei → Optionen und Einstellungen → Optionen → Aktuelle Datei → Daten laden</strong>. Ist die Option aktiviert? Was legt Power BI im Hintergrund an, wenn diese Option aktiv ist? Deaktiviere sie falls aktiv.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Du hast ein Measure <code>[Umsatz]</code> und möchtest damit einen prozentualen Anteil berechnen: <code>Anteil = [Umsatz] / [Gesamtumsatz]</code>. Warum wäre es besser, diesen Wert mit VAR zu berechnen statt den Ausdruck zweimal in die Formel zu schreiben? Schreibe die Measure-Formel einmal ohne und einmal mit VAR/RETURN.</span>
  </div>
</div>

  <strong>a) Ladezeit des Tabellenvisuals im Vergleich:</strong>
  <br><br>
  <strong>b) Unterschied nach Entfernen des Tabellenvisuals:</strong>
  <br><br>
  <strong>c) Status Auto Datum/Uhrzeit und was Power BI anlegt:</strong>
  <br><br>
  <strong>d) Measure ohne VAR und mit VAR/RETURN:</strong>

  </div>
</div>

---

## Aufgabe 4 — Mobile Layout erstellen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Optimierte Hochformat-Ansicht aufbauen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Öffne die Seite mit deinen Visuals. Wähle <strong>Ansicht → Layout für Mobilgeräte</strong>. Wie verändert sich die Ansicht? Beschreibe was links (Canvas) und rechts (Bereich Visualisierungen) erscheint. Was zeigt der Bereich Visualisierungen rechts?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Ziehe zwei Visuals per Drag & Drop in den mobilen Canvas: zuerst ein KPI- oder Kartenvisual, darunter ein Balkendiagramm. Passe die Größe beider Visuals so an, dass sie die volle Breite des Canvas einnehmen und gut lesbar sind. Warum sollte man auf dem Smartphone weniger Visuals zeigen als auf dem Desktop?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke auf das X in der oberen rechten Ecke des Balkendiagramms im mobilen Canvas. Was passiert? Prüfe danach: Ist das Visual noch auf der Desktop-Seite vorhanden? Was zeigt dir das über den Zusammenhang zwischen Desktop- und Mobile-Layout?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Kehre zur Desktop-Ansicht zurück (<strong>Ansicht → Layout für Mobilgeräte</strong> nochmals klicken). Hat sich an der Desktop-Seite etwas verändert? Füge das Balkendiagramm nochmals in den mobilen Canvas ein. Wie viele Visuals enthält deine mobile Ansicht jetzt insgesamt?</span>
  </div>
</div>

  <strong>a) Beschreibung der Mobile-Layout-Ansicht (Canvas links, Bereich rechts):</strong>
  <br><br>
  <strong>b) Begründung warum auf Smartphone weniger Visuals sinnvoll sind:</strong>
  <br><br>
  <strong>c) Was nach dem Entfernen passiert und was das über das Layout aussagt:</strong>
  <br><br>
  <strong>d) Zustand der Desktop-Seite und Anzahl Visuals im Mobile-Layout:</strong>

  </div>
</div>

---

## Aufgabe 5 — Slicer und Responsive Visuals konfigurieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">Slicer mobilgerecht einstellen und Reaktionsfähigkeit prüfen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Wechsle zur <strong>Desktop-Ansicht</strong>. Klicke auf den Slicer auf deiner Seite. Öffne den Formatbereich (Pinsel-Symbol). Suche unter <strong>Visuelle Objekte → Slicer-Einstellungen → Optionen</strong> nach der Einstellung <strong>Ausrichtung</strong>. Welche Optionen stehen zur Auswahl? Stelle die Ausrichtung auf <strong>Responsiv</strong> und beschreibe was sich am Slicer optisch verändert.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Suche im Formatbereich des Slicers unter <strong>Slicer-Einstellungen → Auswahl</strong> die Option für Einzel- oder Mehrfachauswahl. Aktiviere <strong>Einzelauswahl</strong>. Was ändert sich am Verhalten des Slicers? Warum ist Einzelauswahl für mobile Nutzer oft sinnvoller als Mehrfachauswahl?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Ziehe den Slicer jetzt in den mobilen Canvas (Mobile-Layout-Ansicht öffnen). Verkleinere ihn auf ein sehr kleines Format. Was passiert mit der Darstellung des Slicers bei sehr kleiner Größe? Was ist der Vorteil dieser Darstellung auf einem Smartphone?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Wechsle zurück zur Desktop-Ansicht. Klicke auf das Balkendiagramm. Öffne den Formatbereich → <strong>Allgemein → Reaktionsfähig</strong>. Deaktiviere die Option. Verkleinere das Visual manuell auf ein Viertel seiner ursprünglichen Größe. Was verändert sich im Vergleich zu einem responsiven Visual? In welchem Fall wäre es sinnvoll, die Reaktionsfähigkeit zu deaktivieren?</span>
  </div>
</div>

  <strong>a) Ausrichtungsoptionen und Veränderung bei "Responsiv":</strong>
  <br><br>
  <strong>b) Verhalten bei Einzelauswahl und Begründung für Mobile:</strong>
  <br><br>
  <strong>c) Darstellung des Slicers bei sehr kleiner Größe:</strong>
  <br><br>
  <strong>d) Unterschied responsiv/nicht responsiv und Anwendungsfall für Deaktivierung:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Ein Bericht läuft in Power BI Desktop gut, aber im Power BI Service beschweren sich Nutzer über langsame Ladezeiten. Der Leistungsanalysator zeigt keine auffälligen DAX-Zeiten. Was sind mögliche Ursachen und an wen würdest du dich als Berichtsverantwortliche wenden?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Du hast eine mobile Ansicht mit drei Visuals erstellt und den Bericht veröffentlicht. Ein Smartphone-Nutzer fragt: "Muss ich irgendwas einstellen um die optimierte Ansicht zu sehen?" Was antwortest du?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Cache geleert, Leistungsanalysator gestartet, drei Kategorien benannt und erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Ladezeiten tabelliert, "Abfrage kopieren" erklärt, externe Faktoren benannt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Tabellenvisual-Auswirkung gemessen, Auto Datum/Uhrzeit geprüft, VAR-Measure geschrieben</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Mobile Layout geöffnet, zwei Visuals platziert, Unabhängigkeit von Desktop-Layout verstanden</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Slicer auf Responsiv und Einzelauswahl gestellt, in Mobile-Canvas platziert, Reaktionsfähigkeit verglichen</span>
  </div>
</div>
