# Datensicherheit und Row Level Security

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 5 · Skript 25</div>
  <div class="pbi-page-title">Datensicherheit und Row Level Security</div>
  <div class="pbi-page-sub">RLS statisch · RLS dynamisch · RLS testen · Sicherheit auf Objektebene</div>
</div>

Bisher haben wir gesteuert, wer welche Berichte sehen darf. Aber manchmal reicht das nicht: Wenn 50 Vertriebsmitarbeiter denselben Bericht sehen, jeder aber nur seine eigenen Kunden sehen soll, braucht es eine Filterung auf Datenebene. Genau das leistet **Row Level Security (RLS)**: ein einziger Bericht, ein einziges semantisches Modell, aber jeder Nutzer sieht nur die Datenzeilen, für die er berechtigt ist.

---

## Grundprinzip

RLS funktioniert durch DAX-Filterausdrücke, die auf Tabellenebene definiert werden. Diese Filter werden als **Rollen** gespeichert. Jeder Nutzer, der einer Rolle zugewiesen ist, sieht nur die Daten, die der DAX-Filter zulässt.

**Wichtiger Hinweis:** RLS gilt nur für Nutzer mit der Arbeitsbereichsrolle **Betrachter**. Administratoren, Mitglieder und Mitwirkende im Arbeitsbereich sehen immer alle Daten, unabhängig von RLS-Rollen.

RLS wird in **zwei Phasen** konfiguriert:
1. **Rollen und DAX-Regeln** in Power BI Desktop definieren und testen
2. **Mitglieder den Rollen zuweisen** im Power BI Service nach dem Veröffentlichen

---

## Statische RLS

Bei der statischen Methode enthält der DAX-Filter einen festen Wert. Für jede Gruppe von Nutzern, die unterschiedliche Daten sehen sollen, wird eine separate Rolle angelegt.

### Rollen in Power BI Desktop anlegen

**Registerkarte Modellierung → Rollen verwalten**

Im Dialogfenster **Sicherheitsrollen verwalten**:
1. Schaltfläche **Rolle erstellen** klicken
2. Namen vergeben, z.B. "Region Nord"
3. Tabelle auswählen, auf die der Filter angewendet wird
4. DAX-Filterausdruck eingeben

**Beispiel: Filter auf Salesreps-Tabelle nach Region:**

```dax
[Region] = "Nord"
```

Für jede Region wird eine separate Rolle angelegt: "Region Nord", "Region Süd", "Region Mitte" usw.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Wie Beziehungen den Filter weitertragen</span>
  Es reicht, die Dimensionstabelle zu filtern. Weil Beziehungen den Filterkontext von der Dimensionstabelle zur Faktentabelle übertragen (1-zu-viele, Filterrichtung Einzeln), werden automatisch auch alle verbundenen Bestellungen gefiltert. Kein zusätzlicher Filter auf der Faktentabelle notwendig.
</div>

**Nachteil der statischen Methode:** Wenn eine neue Region hinzukommt, muss eine neue Rolle angelegt, das Modell neu veröffentlicht werden. Bei vielen Rollen wird der Verwaltungsaufwand hoch.

---

## Dynamische RLS

Bei der dynamischen Methode enthält der DAX-Filter keine feste Zeichenfolge, sondern eine Funktion, die den angemeldeten Nutzer zur Laufzeit ausliest.

### Die Funktion USERPRINCIPALNAME()

```dax
[Email] = USERPRINCIPALNAME()
```

`USERPRINCIPALNAME()` gibt die E-Mail-Adresse des aktuell angemeldeten Nutzers zurück, z.B. `max.mustermann@firma.de`. Dieser Wert wird mit einer Spalte in der Modelltabelle verglichen.

**Voraussetzung:** Das Modell muss eine Tabelle enthalten, in der die E-Mail-Adressen der Nutzer gespeichert sind — und diese Tabelle muss mit den Daten verbunden sein, die gefiltert werden sollen.

**Vorteil:** Es wird nur eine einzige Rolle angelegt. Neue Mitarbeiter werden in der Datentabelle (nicht im Modell) ergänzt. Das Modell muss nicht neu veröffentlicht werden.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">USERNAME vs. USERPRINCIPALNAME</span>
  In Power BI Desktop gibt <code>USERNAME()</code> den Nutzer im Format "DOMÄNE\Benutzername" zurück. Im Power BI Service gibt dieselbe Funktion das UPN-Format "nutzer@firma.de" zurück. Um konsistente Ergebnisse in Desktop und Service zu erhalten, <code>USERPRINCIPALNAME()</code> verwenden — diese Funktion gibt immer das UPN-Format zurück.
</div>

---

## RLS testen

### In Power BI Desktop

**Registerkarte Modellierung → Als Rollen anzeigen**

Im Dialogfenster eine Rolle auswählen. Der Bericht wird sofort so gerendert, als wäre man Mitglied dieser Rolle. Alle Visuals zeigen nur die gefilterten Daten. Über "Als Rollen anzeigen" erneut öffnen → "Keine" auswählen, um zur normalen Ansicht zurückzukehren.

### Im Power BI Service

Nach dem Veröffentlichen: Im Arbeitsbereich das semantische Modell suchen → Drei-Punkte-Menü → **Sicherheit**. Im Bildschirm **Sicherheit auf Zeilenebene** erscheinen alle definierten Rollen.

**Mitglieder zuweisen:** Neben einer Rolle → **Mitglieder** → Microsoft Entra ID-Nutzer oder Sicherheitsgruppen eingeben → Hinzufügen.

**Als Rolle testen:** Drei-Punkte-Menü neben der Rolle → **Als Rolle testen**. Der Bericht öffnet sich und simuliert die Sicht des Rollenmitglieds.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 02-row-level-security-ss.png — Bildschirm "Sicherheit auf Zeilenebene" im Service mit Rollenliste und Option zum Hinzufügen von Mitgliedern.</span>
</div>

---

## Sicherheit auf Objektebene (OLS)

Während RLS einzelne **Zeilen** filtert, schränkt die **Sicherheit auf Objektebene (OLS)** den Zugriff auf ganze **Tabellen oder Spalten** ein.

**Typischer Anwendungsfall:** Eine Mitarbeitertabelle enthält eine Spalte "Gehalt". Normale Berichtsnutzer dürfen die Tabelle sehen (Name, Abteilung, Standort), aber nicht die Gehaltsspalte. Nur die HR-Abteilung sieht die vollständige Tabelle.

**Konfiguration:** OLS kann in Power BI Desktop über die **TMDL-Ansicht** (Vorschaufunktion) per Code konfiguriert werden. Alternativ über externe Tools wie Tabular Editor.

```yaml
role 'Alle Mitarbeiter (ohne HR)'
    tablePermission Mitarbeiter
        columnPermission Gehalt = none
```

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">Wichtig</span>
  Wenn ein Nutzer einen Bericht öffnet, der eine für ihn gesperrte Spalte abfragt, erhält er eine Fehlermeldung ("Das Objekt existiert nicht"). Das kann verwirrend wirken und wie ein Berichtsfehler aussehen. OLS gut dokumentieren und betroffene Berichte entsprechend gestalten.
</div>

---

## SSO für DirectQuery

Bei Import-Modellen definiert der Datenmodellierer RLS-Rollen in Power BI Desktop. Bei **DirectQuery-Modellen** gibt es eine Alternative: Wenn die Datenquelle **Single Sign-On (SSO)** unterstützt (z.B. Azure SQL mit derselben Microsoft Entra ID), kann die Datenquelle ihre eigene Datenbankebenen-Sicherheit direkt erzwingen.

**Funktionsweise:**
1. DirectQuery-Modell ohne RLS-Rollen in Desktop erstellen
2. Im Service veröffentlichen
3. In den Datenquellenanmeldeinformationen des semantischen Modells **SSO aktivieren**

Wenn ein Nutzer den Bericht öffnet, übergibt Power BI seine Identität (Microsoft Entra ID) an die Datenquelle. Die Datenquelle wendet ihre eigene Sicherheitslogik an und gibt nur die Zeilen zurück, auf die der Nutzer Zugriff hat.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Wann SSO sinnvoll ist</span>
  SSO eignet sich wenn in der Quelldatenbank bereits Row Level Security konfiguriert ist und diese Logik nicht in Power BI dupliziert werden soll. Einschränkung: Berechnete Tabellen und Spalten mit Verweis auf DirectQuery-Tabellen mit SSO werden im Service nicht unterstützt.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">RLS-Grundprinzip</div>
    <div class="pbi-summary-body">DAX-Filterausdrücke auf Tabellenebene. Definiert als Rollen in Desktop. Gilt nur für Betrachter-Rolle im Arbeitsbereich. Admins, Mitglieder, Mitwirkende sind von RLS ausgenommen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Statische RLS</div>
    <div class="pbi-summary-body">Feste Werte im DAX-Filter. Eine Rolle pro Gruppe. Einfach einzurichten, aber wartungsintensiv bei vielen Gruppen. Jede neue Gruppe erfordert eine neue Rolle und Neuveröffentlichung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Dynamische RLS</div>
    <div class="pbi-summary-body">USERPRINCIPALNAME() vergleicht den angemeldeten Nutzer mit einer E-Mail-Spalte in der Datentabelle. Eine einzige Rolle für alle Nutzer. Neue Nutzer in der Datentabelle ergänzen, kein Modell-Update nötig.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">RLS testen</div>
    <div class="pbi-summary-body">In Desktop: Modellierung → Als Rollen anzeigen. Im Service: Semantisches Modell → Sicherheit → Als Rolle testen. Mitglieder im Service zuweisen, nicht in Desktop.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Sicherheit auf Objektebene</div>
    <div class="pbi-summary-body">Schränkt Zugriff auf Tabellen oder Spalten ein, nicht auf Zeilen. Konfiguration über TMDL-Ansicht (Vorschau) oder Tabular Editor. Fehlermeldung für gesperrte Objekte kann Nutzer verwirren.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Wann welche Methode</div>
    <div class="pbi-summary-body">Statisch: wenige, stabile Gruppen. Dynamisch: viele Nutzer oder häufig wechselnde Zuordnungen, E-Mail-Adressen in der Datentabelle vorhanden. OLS: Spalten- oder Tabellenzugriff einschränken (z.B. Gehalt).</div>
  </div>
</div>
