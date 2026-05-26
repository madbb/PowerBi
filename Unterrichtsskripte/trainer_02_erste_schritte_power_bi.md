# Trainer-Skript 02 — Erste Schritte mit Power BI

> **Themen:** Drei Komponenten · Der Flow · Bausteine · Power BI-Dienst  
> **Schüler-Skript:** 02_erste_schritte_power_bi.md

---

## Einstieg

**Frage ans Plenum:** Wer hat Power BI schon mal geöffnet — egal ob nur kurz angeschaut oder wirklich gearbeitet?

- Kurz Handzeichen zählen — gibt ein Gefühl für den Wissensstand
- Überleitung: Egal ob Neuling oder nicht — wir schauen uns heute die Architektur an, die alles zusammenhält

**Kerngedanke:**
- Power BI ist kein einzelnes Tool, sondern ein Ökosystem aus drei Teilen
- Wer nur Desktop kennt, kennt nur ein Drittel

---

## Block 1 — Die drei Hauptkomponenten

**Frage ans Plenum:** Wo glaubt ihr — erstellt man Berichte? Und wo schaut man sie an?

> **Erwartete Antwort:** Erstellen in Desktop, anschauen irgendwo online  
> → Genau — Desktop zum Bauen, Dienst zum Verteilen, Mobile zum Konsumieren

**Die drei Komponenten vorstellen:**

- **Power BI Desktop** — Windows-Anwendung, kostenlos, alles passiert hier: Daten verbinden, transformieren, modellieren, Berichte bauen
- **Power BI-Dienst** — Online-Plattform unter app.powerbi.com, Schul- oder Geschäftskonto nötig, hier werden Berichte veröffentlicht, geteilt, verwaltet
- **Power BI Mobile** — App für iOS, Android, Windows — liest was im Dienst liegt. Mobile Layouts werden in Desktop erstellt

> 💡 Demo-Tipp: Power BI Desktop kurz öffnen und Dienst im Browser nebeneinander zeigen — visuell sofort klar

**Wichtig betonen:**
- Desktop ist kostenlos downloadbar — Windows Store oder direktes Installationsprogramm
- Mobile Ansichten entstehen in Desktop, nicht in der App selbst

---

## Block 2 — Der Flow von Power BI

**Frage ans Plenum:** Wenn ihr einen Bericht bauen müsst — welche Schritte würdet ihr intuitiv machen?

> **Erwartete Antworten:** Daten holen, irgendwie aufbereiten, Diagramme bauen, fertig  
> → Fast richtig — Power BI hat dafür einen klar strukturierten 6-Schritt-Flow

**Die sechs Schritte durchgehen — als logische Kette:**

1. **Daten verbinden** — Verbindung zu einer oder mehreren Quellen herstellen (Excel, SQL, Web, ...)
2. **Daten transformieren** — Power Query-Editor: bereinigen, umformen, vorbereiten
3. **Daten modellieren** — Beziehungen zwischen Tabellen, Berechnungen (DAX), semantisches Modell aufbauen
4. **Bericht erstellen** — Visualisierungen auf die Canvas, interaktiver Bericht
5. **Bericht veröffentlichen** — aus Desktop in den Dienst hochladen (ein Klick)
6. **Verteilen und verwalten** — im Dienst für Nutzer freigeben, Aktualisierungen einrichten

**Frage ans Plenum:** Welche dieser Schritte passieren in Desktop — welche im Dienst?

> **Erwartete Antwort:** Schritte 1–5 in Desktop, Schritt 6 im Dienst  
> → Korrektur: Schritt 5 (Veröffentlichen) ist der Übergang — passiert aus Desktop heraus, landet im Dienst

---

## Block 3 — Die Bausteine von Power BI

**Überleitung:** Jetzt schauen wir uns an, womit wir in Power BI eigentlich arbeiten — die zwei grundlegenden Bausteine.

**Semantisches Modell erklären:**
- Alle verbundenen Daten + Transformationen + Beziehungen + Berechnungen zusammen
- Entsteht durch Schritte 1–3 des Flows
- Die unsichtbare Grundlage — ohne gutes Modell kein guter Bericht

**Visualisierung (Visual) erklären:**
- Ein einzelnes Diagramm, eine Karte, eine Tabelle auf der Canvas
- Power BI ist Low-Code: Felder per Drag & Drop, Power BI wählt automatisch ein passendes Visual vor
- Aber: automatische Auswahl nicht immer die beste — man wählt selbst

**Frage ans Plenum:** Was ist der Unterschied zwischen einem Bericht und einem Dashboard?

> **Erwartete Antwort:** Viele kennen den Unterschied nicht oder verwechseln es  
> → Guter Moment für die klare Abgrenzung:

**Bericht vs. Dashboard — klar abgrenzen:**

- **Bericht** — mehrere Seiten, volle Interaktivität, entsteht in Desktop, basiert auf einem semantischen Modell
- **Dashboard** — eine einzige Seite im Dienst, besteht aus Kacheln (angeheftete Visuals aus Berichten), Kacheln sind NICHT interaktiv, Klick öffnet den Bericht

> Analogie: Dashboard = Armaturenbrett im Auto — Überblick über die wichtigsten Werte, für Details schaut man woanders hin

---

## Block 4 — Der Power BI-Dienst im Detail

**Arbeitsbereiche:**
- Organisatorischer Grundbaustein — hier liegen Berichte, Modelle, Dashboards, Apps
- Jeder hat automatisch **Mein Arbeitsbereich** — nur für private Tests, NICHT für geteilte Inhalte
- Für alles was andere sehen sollen: **freigegebener Arbeitsbereich**

**Frage ans Plenum:** Warum sollte man nicht alles in "Mein Arbeitsbereich" veröffentlichen?

> **Erwartete Antwort:** Andere können es nicht sehen / keine Zusammenarbeit möglich  
> → Richtig. Außerdem: kein Rollen-Management, keine App-Erstellung möglich

**Apps und Verteilung:**

- **App** — gebündelte Sammlung aus einem Arbeitsbereich, vereinfachte Oberfläche für Verbraucher
- Drei Verteilungsmethoden im Vergleich:
  - App → volle Kontrolle, Änderungen erst sichtbar wenn App aktualisiert wird → empfohlen
  - Arbeitsbereichszugriff → Nutzer sehen ggf. mehr als gewollt → Vorsicht
  - Einzelnes Element teilen → Änderungen sofort sichtbar → riskant bei unfertigen Berichten

> ⚠️ Wichtig betonen: Nach jeder Änderung muss die App manuell aktualisiert werden — das ist ein Feature, kein Bug. Gibt Kontrolle über den Zeitpunkt der Veröffentlichung.

**Vorlagen-Apps kurz ansprechen:**
- Fertige Apps aus dem Marketplace, die man mit eigenen Daten verbinden kann
- Beispiel: GitHub-App zeigt direkt Beiträge, Pull Requests etc.
- Einstieg: Dienst → Apps → Apps abrufen

**Beispielberichte:**
- Für den Einstieg ohne eigene Daten
- Im Dienst unter dem Punkt **Learn** verfügbar
- Werden in Mein Arbeitsbereich geladen

**Geplante Aktualisierung:**
- Semantische Modelle können im Dienst automatisch aktualisiert werden
- Häufigkeit und Uhrzeit konfigurierbar
- Zusätzlich jederzeit manuelle Aktualisierung möglich

---

## Abschluss & Übergang

**Kurze Zusammenfassung:**
- 3 Komponenten: Desktop (bauen) · Dienst (verteilen) · Mobile (konsumieren)
- 6-Schritt-Flow: Verbinden → Transformieren → Modellieren → Bericht → Veröffentlichen → Verwalten
- 2 Bausteine: Semantisches Modell + Visualisierung
- Bericht ≠ Dashboard — klarer Unterschied in Funktion und Entstehungsort
- Apps = empfohlene Verteilungsmethode

**Übergang zu Skript 03:**
> "Power BI ist Teil einer größeren Plattform — Microsoft Fabric. Im nächsten Skript schauen wir uns an, was Fabric ist, warum es existiert und welche Rolle Power BI darin spielt."

---

## Mini-Quiz

---

**Frage 1:** Wo erstellt man in Power BI einen Bericht?

- a) Im Power BI-Dienst
- b) In Power BI Mobile
- c) In Power BI Desktop ✅
- d) In beiden — Desktop und Dienst gleichwertig

> **Antwort:** c) Power BI Desktop — der Dienst dient der Verteilung, nicht der Erstellung.

---

**Frage 2:** Was ist der Unterschied zwischen einer Kachel im Dashboard und einem Visual im Bericht?

- a) Kacheln zeigen mehr Daten als Visuals
- b) Kacheln sind nicht interaktiv — ein Klick öffnet den Bericht ✅
- c) Dashboards können nur im Desktop erstellt werden
- d) Es gibt keinen Unterschied

> **Antwort:** b) Kacheln sind nicht interaktiv. Ein Klick auf eine Kachel navigiert zum zugrundeliegenden Bericht.

---

**Frage 3:** Ein Kollege hat einen Bericht in "Mein Arbeitsbereich" veröffentlicht und fragt, warum andere ihn nicht sehen können. Was ist die Ursache?

- a) Der Bericht wurde nicht korrekt veröffentlicht
- b) Power BI Mobile ist nicht installiert
- c) "Mein Arbeitsbereich" ist privat — für geteilte Inhalte braucht man einen freigegebenen Arbeitsbereich ✅
- d) Der Bericht muss zuerst als App verpackt werden

> **Antwort:** c) "Mein Arbeitsbereich" ist ausschließlich für private Tests gedacht.

---

**Frage 4:** Eine App wurde veröffentlicht. Der Entwickler ändert danach einen Bericht im Arbeitsbereich. Sehen Verbraucher die Änderung sofort?

- a) Ja, sofort
- b) Nein — die App muss nach der Änderung explizit aktualisiert werden ✅
- c) Nur wenn die Verbraucher die App neu öffnen
- d) Änderungen an Berichten sind in Apps nicht möglich

> **Antwort:** b) Die App muss manuell aktualisiert werden — das gibt dem Entwickler Kontrolle über den Zeitpunkt.

---

**Frage 5:** In welchem Schritt des Power BI Flows wird Power Query verwendet?

- a) Schritt 1 — Daten verbinden
- b) Schritt 2 — Daten transformieren ✅
- c) Schritt 3 — Daten modellieren
- d) Schritt 4 — Bericht erstellen

> **Antwort:** b) Power Query ist der integrierte Transformations-Editor — Schritt 2 des Flows.
