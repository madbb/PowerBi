# Aufgaben: Analysen in Power BI durchführen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 21 · Aufgabenblatt</div>
  <div class="pbi-page-title">Analysen in Power BI durchführen</div>
  <div class="pbi-page-sub">Histogramm · Ausreißer · Was-wäre-wenn · Analysebaum · Wichtigste Einflussfaktoren · Q&A</div>
</div>

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Datenbasis für dieses Aufgabenblatt</span>
  Verwende weiterhin <code>uebung_modul4.pbix</code> mit dem vollständigen techtrade-Modell (orders, customers, products, salesreps, Datumstabelle). Das Measure <code>[Umsatz]</code> muss vorhanden sein. Lege für jede Aufgabe eine neue Berichtsseite an, damit die Visuals übersichtlich bleiben.
</div>

<div class="pbi-szenario">
  <strong>Szenario</strong><br>
  Du arbeitest als Vertriebsanalystin bei TechTrade GmbH. Die Vertriebsleitung will verstehen, wie der Umsatz zusammensetzt, welche Faktoren ihn beeinflussen und was passiert wenn die Preise angehoben werden. Du sollst analytische Visuals und interaktive Szenarien aufbauen, die die Fragen der Vertriebsleitung direkt beantworten.
</div>

---

## Aufgabe 1 — Histogramm der Bestellmengen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">1</span>
    <span class="pbi-task-title">Quantisierungsgruppe anlegen und Histogramm aufbauen</span>
  </div>
  <div class="pbi-task-body">

Die Vertriebsleitung fragt: Sind unsere Aufträge eher klein oder groß? Kommen viele kleine Bestellungen oder wenige große?

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Berichtsseite an. Klicke im Bereich <strong>Daten</strong> mit der rechten Maustaste auf <strong>orders[Menge]</strong> → <strong>Neue Gruppe</strong>. Wähle Gruppentyp <strong>Lagerplatz</strong>, Lagerplatztyp <strong>Lagerplatzgröße</strong>, Lagerplatzgröße <strong>2</strong>. Klicke OK. Welcher neue Eintrag erscheint im Bereich Daten unter orders?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege ein gruppierten Säulendiagramm an. Ziehe das neu erstellte Feld <strong>orders[Menge (Intervalle)]</strong> auf die X-Achse. Ziehe <strong>orders[OrderID]</strong> auf die Y-Achse und stelle die Aggregation auf <strong>Anzahl</strong>. Beschreibe die Verteilung: In welchem Mengenbereich liegen die meisten Bestellungen?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke mit der rechten Maustaste auf das Gruppenfeld im Bereich Daten → <strong>Gruppen bearbeiten</strong>. Ändere die Lagerplatzgröße auf <strong>5</strong>. Wie verändert sich das Histogramm? Wann ist ein kleineres Intervall sinnvoller, wann ein größeres?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Was ist der Unterschied zwischen einer <strong>manuellen Gruppe</strong> (Strg+Klick auf Datenpunkte → Gruppendaten) und einer <strong>Quantisierungsgruppe</strong> (Neue Gruppe → Lagerplatz)? Für welchen Anwendungsfall eignet sich welche Methode?</span>
  </div>
</div>

  <strong>a) Neuer Eintrag im Datenbereich nach der Gruppenerstellung:</strong>
  <br><br>
  <strong>b) Beschreibung der Mengenverteilung:</strong>
  <br><br>
  <strong>c) Veränderung des Histogramms und Wahl des richtigen Intervalls:</strong>
  <br><br>
  <strong>d) Unterschied manuelle Gruppe vs. Quantisierungsgruppe:</strong>

  </div>
</div>

---

## Aufgabe 2 — Ausreißer mit dem Punktdiagramm identifizieren

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">2</span>
    <span class="pbi-task-title">Auffällige Produkte visuell isolieren</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege auf einer neuen Seite ein <strong>Punktdiagramm</strong> an. X-Achse: <strong>[Umsatz]</strong>. Y-Achse: <strong>orders[Menge]</strong> (Aggregation: Summe). Werte: <strong>products[Produktname]</strong>. Jeder Punkt steht für ein Produkt. Beschreibe die Verteilung: Liegen die meisten Punkte nah beieinander oder weit verstreut?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Identifiziere visuell einen Ausreißer: ein Produkt, das sich deutlich vom Rest abhebt — entweder wegen sehr hohem Umsatz oder sehr hoher Menge. Bewege den Mauszeiger über den Punkt. Wie heißt das Produkt? Notiere Umsatz und Menge dieses Produkts.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Klicke auf den Ausreißer-Punkt im Diagramm. Beobachte was in anderen Visuals auf der Seite passiert (füge einen Slicer für products[Kategorie] hinzu wenn noch keiner da ist). Was macht der Klick auf einen Datenpunkt im Punktdiagramm mit anderen Visuals auf der Seite?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Klicke mit der rechten Maustaste auf einen Datenpunkt in einem anderen Visual auf der Seite (z.B. auf einen Balken in einem Balkendiagramm). Wähle <strong>Analysieren → Anstieg erklären</strong> oder <strong>Unterschiede in dieser Verteilung ermitteln</strong>. Was zeigt das neue Fenster? Kann dieses automatisch generierte Visual dem Bericht hinzugefügt werden?</span>
  </div>
</div>

  <strong>a) Beschreibung der Punktverteilung im Diagramm:</strong>
  <br><br>
  <strong>b) Ausreißer-Produkt mit Umsatz und Menge:</strong>
  <br><br>
  <strong>c) Wirkung des Klicks auf andere Visuals:</strong>
  <br><br>
  <strong>d) Inhalt des Analysieren-Fensters und Möglichkeit zum Hinzufügen:</strong>

  </div>
</div>

---

## Aufgabe 3 — Was-wäre-wenn-Parameter für Preisszenarien

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">3</span>
    <span class="pbi-task-title">Interaktives Preisszenario aufbauen</span>
  </div>
  <div class="pbi-task-body">

Die Vertriebsleitung überlegt, alle Preise um 5 bis 30 Prozent anzuheben. Sie möchten sehen, wie sich das auf den Gesamtumsatz auswirkt.

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Berichtsseite an. Wähle <strong>Modellierung → Neuer Parameter</strong>. Konfiguriere den Parameter wie folgt: Name: <code>Preisfaktor</code>, Datentyp: Dezimalzahl, Minimum: <code>1,00</code>, Maximum: <code>1,30</code>, Inkrement: <code>0,05</code>, Standardwert: <code>1,00</code>. Lasse "Dieser Seite Datenschnitt hinzufügen" aktiviert. Klicke OK. Welche zwei Elemente legt Power BI im Bereich Daten an?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Lege ein neues Measure an. Name: <code>Umsatz Prognose</code>. Formel: <code>[Umsatz] * [Preisfaktor Wert]</code>. Ziehe <strong>[Umsatz]</strong> und <strong>[Umsatz Prognose]</strong> als zwei Säulen in ein gruppiertes Balkendiagramm. Ziehe <strong>products[Kategorie]</strong> auf die X-Achse. Stelle den Schieberegler auf 1,10. Welche Kategorie hat die größte absolute Differenz zwischen Ist-Umsatz und Prognose?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Stelle den Schieberegler auf 1,20, dann auf 1,30. Notiere jeweils den Gesamtumsatz Prognose (füge ein Kartenvisual mit [Umsatz Prognose] hinzu). Um wie viel Euro steigt der Prognosewert von 1,00 auf 1,30? Berechne das prozentuale Wachstum.</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Füge dem Liniendiagramm eine Konstantenlinie hinzu: Formatbereich → <strong>Analyse → Konstantenlinie</strong>. Trage als Wert den aktuellen Gesamtumsatz (bei Preisfaktor 1,00) ein. Was zeigt die Linie im Kontext des Diagramms? Welche Frage kann die Vertriebsleitung damit direkt beantworten?</span>
  </div>
</div>

  <strong>a) Zwei Elemente die Power BI im Bereich Daten anlegt:</strong>
  <br><br>
  <strong>b) Kategorie mit der größten absoluten Differenz bei Preisfaktor 1,10:</strong>
  <br><br>
  <strong>c) Prognosewerte bei 1,20 und 1,30, absoluter und prozentualer Anstieg:</strong>
  <br><br>
  <strong>d) Bedeutung der Konstantenlinie und Frage die sie beantwortet:</strong>

  </div>
</div>

---

## Aufgabe 4 — Analysebaum aufbauen

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">4</span>
    <span class="pbi-task-title">Umsatz mehrdimensional aufschlüsseln</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Lege eine neue Berichtsseite an. Füge ein <strong>Analysebaum</strong>-Visual hinzu (Baumstruktur-Symbol im Visualisierungsbereich). Ziehe das Visual so, dass es die gesamte Seite einnimmt. Weise die Felder zu: <strong>Analysieren</strong>: <code>[Umsatz]</code>. <strong>Erläuterung nach</strong>: <code>products[Kategorie]</code>, <code>customers[Bundesland]</code>, <code>salesreps[Name]</code>. Was zeigt die Startbox des Analysebaums?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Klicke auf das <strong>+</strong> Symbol neben der Gesamt-Box. Wähle <strong>Kategorie</strong> aus dem Dropdown. Der Baum splittet. Welche Kategorie hat den höchsten Umsatz? Klicke auf das <strong>+</strong> neben dieser Kategorie und wähle diesmal das <strong>Glühbirnen-Symbol</strong> (KI-Vorschlag). Welche Dimension wählt die KI als beste nächste Aufschlüsselung?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Füge eine zweite Aufschlüsselung beim zweitgrößten Ast auf der ersten Ebene hinzu. Wähle diesmal <strong>Bundesland</strong>. Welches Bundesland hat den größten Anteil am Umsatz dieser Kategorie? Beschreibe die Baumstruktur, die jetzt sichtbar ist: Wie viele Ebenen, wie viele Äste?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Klicke erneut auf das <strong>+</strong> neben einer Ebene und wähle eine Dimension aus. Beobachte das Symbol neben der Dimension: erscheint ein Schloss oder eine Glühbirne? Was bedeutet das Symbol? Unter welchem Umstand möchte ein Berichtsautor eine Aufschlüsselung mit einem Schloss fixieren?</span>
  </div>
</div>

  <strong>a) Inhalt der Startbox:</strong>
  <br><br>
  <strong>b) Kategorie mit höchstem Umsatz und KI-Vorschlag für die nächste Ebene:</strong>
  <br><br>
  <strong>c) Bundesland mit größtem Anteil und Beschreibung der Baumstruktur:</strong>
  <br><br>
  <strong>d) Symbol und Bedeutung, Anwendungsfall für Fixierung:</strong>

  </div>
</div>

---

## Aufgabe 5 — Wichtigste Einflussfaktoren und Q&A

<div class="pbi-task">
  <div class="pbi-task-header">
    <span class="pbi-task-num">5</span>
    <span class="pbi-task-title">KI-Visuals für Zusammenhangs- und Sprachanalyse nutzen</span>
  </div>
  <div class="pbi-task-body">

<div class="pbi-task-steps">
  <div class="pbi-task-step">
    <span class="pbi-step-label">a</span>
    <span class="pbi-step-text">Füge auf einer neuen Seite ein <strong>Wichtigste Einflussfaktoren</strong>-Visual hinzu. Ziehe es groß. Weise zu: <strong>Analysieren</strong>: <code>orders[Rabatt]</code>. <strong>Erläuterung nach</strong>: <code>products[Kategorie]</code>, <code>customers[Bundesland]</code>, <code>salesreps[Name]</code>. Warte bis das Visual geladen hat. Welcher Faktor steht an erster Stelle der Einflussliste?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">b</span>
    <span class="pbi-step-text">Klicke auf den stärksten Einflussfaktor in der linken Liste. Was zeigt das Visual rechts daneben? Wie lautet die Aussage des Visuals in eigenen Worten — welcher Zusammenhang wird beschrieben?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">c</span>
    <span class="pbi-step-text">Wechsle oben im Visual auf den Tab <strong>Wichtigste Segmente</strong>. Was zeigt dieser Tab? Wie unterscheidet sich diese Ansicht vom Tab "Wichtigste Einflussfaktoren"?</span>
  </div>
  <div class="pbi-task-step">
    <span class="pbi-step-label">d</span>
    <span class="pbi-step-text">Füge auf einer weiteren Seite ein <strong>Q&A</strong>-Visual hinzu. Tippe die Frage: <code>top 5 products by sales</code>. Was zeigt Power BI als Antwort? Ändere die Frage auf <code>sales by Bundesland as map</code>. Wechselt Power BI den Visualtyp? Klicke auf das Symbol <strong>"Dieses Visual zur Berichtsseite hinzufügen"</strong> (Pfeil-Icon oben rechts im Q&A-Visual). Was passiert?</span>
  </div>
</div>

  <strong>a) Stärkster Einflussfaktor auf den Rabatt:</strong>
  <br><br>
  <strong>b) Aussage des rechten Vergleichsvisuals in eigenen Worten:</strong>
  <br><br>
  <strong>c) Unterschied Tab "Wichtigste Einflussfaktoren" vs. "Wichtigste Segmente":</strong>
  <br><br>
  <strong>d) Q&A-Ergebnisse für beide Fragen und Wirkung des Hinzufügen-Symbols:</strong>

  </div>
</div>

---

## Reflexionsfragen

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R1</span>
  <span class="pbi-reflect-text">Das Visual "Wichtigste Einflussfaktoren" zeigt: "Wenn die Kategorie gleich Software ist, ist der Rabatt 1,8-mal so hoch wie in anderen Kategorien." Ein Kollege sagt: "Das bedeutet, Software-Produkte verursachen hohe Rabatte." Warum ist diese Schlussfolgerung problematisch? Was wäre eine korrekte Formulierung?</span>
</div>

<div class="pbi-reflect">
  <span class="pbi-reflect-label">R2</span>
  <span class="pbi-reflect-text">Ein Berichtsnutzer beschwert sich: "Das Q&A-Visual zeigt bei meiner Frage immer ein falsches Ergebnis." Als Berichtsautorin hast du zwei Möglichkeiten zu reagieren. Welche sind das und wie würdest du konkret vorgehen?</span>
</div>

---

<div class="pbi-checklist">
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 1</strong> Quantisierungsgruppe angelegt, Histogramm aufgebaut, Unterschied manuelle Gruppe vs. Quantisierung erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 2</strong> Punktdiagramm konfiguriert, Ausreißer identifiziert und benannt, Analysieren-Funktion genutzt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 3</strong> Was-wäre-wenn-Parameter angelegt, Prognose-Measure geschrieben, Szenarien mit Schieberegler durchgespielt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 4</strong> Analysebaum aufgebaut, KI-Vorschlag genutzt, Schloss-Symbol erklärt</span>
  </div>
  <div class="pbi-checklist-item">
    <span class="pbi-checklist-icon">☐</span>
    <span class="pbi-checklist-label"><strong>Aufgabe 5</strong> Wichtigste Einflussfaktoren konfiguriert, Q&A-Fragen gestellt, Visual aus Q&A dem Bericht hinzugefügt</span>
  </div>
</div>
