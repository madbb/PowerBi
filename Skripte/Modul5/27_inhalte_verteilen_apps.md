# Inhalte verteilen und Apps

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 5 · Skript 24</div>
  <div class="pbi-page-title">Inhalte verteilen und Apps</div>
  <div class="pbi-page-sub">Freigabemodelle · Power BI Apps · Zielgruppen · Vertraulichkeitsbezeichnungen · Nutzungsmetriken</div>
</div>

Ein fertig gebauter und veröffentlichter Bericht muss die richtigen Personen erreichen — ohne dass jeder alles sieht. Power BI bietet drei grundlegende Wege, Inhalte zu verteilen: Arbeitsbereichsrollen, Freigabe auf Elementebene und Apps. Dieses Skript zeigt, wann welcher Weg geeignet ist, wie Apps erstellt und verwaltet werden und wie die Nutzung von Berichten nachverfolgt werden kann.

---

## Die drei Freigabemodelle im Vergleich

| Methode | Granularität | Typischer Anwendungsfall | Einschränkung |
|---|---|---|---|
| **Arbeitsbereichsrollen** | Ganzer Arbeitsbereich | Internes Team, das gemeinsam an Berichten arbeitet | Alles-oder-Nichts: Wer Zugriff hat, sieht alle Elemente |
| **Freigabe auf Elementebene** | Einzelner Bericht oder Dashboard | Gezielter Zugriff für externe Partner oder einzelne Personen | Nur lesen. Empfänger erhalten auch Zugriff auf das semantische Modell (außer bei RLS) |
| **Power BI App** | Kuratierte Auswahl aus einem Arbeitsbereich | Verteilung an eine größere Zielgruppe (Abteilung, Unternehmen) | Ein Arbeitsbereich = eine App. Inhalt nur aus dem eigenen Arbeitsbereich |

---

## Freigabe auf Elementebene

Mit der Freigabe auf Elementebene können einzelne Berichte oder Dashboards direkt für bestimmte Personen oder Gruppen freigegeben werden, ohne sie in einen Arbeitsbereich einzuladen.

**Zugriffstypen bei Link-Freigabe:**
- **Personen in Ihrer Organisation** — jeder mit einem Unternehmenskonto kann über den Link zugreifen
- **Personen mit vorhandenem Zugriff** — der Link funktioniert nur für Personen, die bereits Zugriff haben (sicherer)
- **Bestimmte Personen** — nur die namentlich genannten Personen haben Zugriff

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">Achtung</span>
  Wer einen freigegebenen Bericht sehen kann, hat in der Regel auch Lesezugriff auf das zugrundeliegende semantische Modell — es sei denn, RLS ist aktiv. RLS stellt sicher, dass Nutzer nur die Datenzeilen sehen, für die sie berechtigt sind. RLS ist Thema von Skript 25.
</div>

---

## Power BI Apps

### Was ist eine App?

Eine App ist eine kuratierte Zusammenstellung von Berichten und Dashboards aus einem Arbeitsbereich, die als gebündeltes Paket an Benutzer verteilt wird. Der Arbeitsbereich dient als Entwicklungsumgebung (Staging), die App ist das, was Endnutzer sehen.

**Kernvorteile:**
- Benutzer brauchen keinen direkten Zugriff auf den Arbeitsbereich
- Änderungen im Arbeitsbereich sind für App-Nutzer unsichtbar, bis die App neu veröffentlicht wird
- Eine App kann mehrere Zielgruppen mit unterschiedlichem Inhalt bedienen

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Einschränkung</span>
  Jeder Arbeitsbereich kann nur eine App haben. Der Inhalt der App muss aus diesem Arbeitsbereich stammen.
</div>

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">Lizenzvoraussetzung für App-Nutzer</span>
  Wenn der Arbeitsbereich auf freigegebener Kapazität (Pro oder PPU) läuft, benötigen alle App-Betrachter eine Pro- oder PPU-Lizenz. Nur bei F64+ Fabric-Kapazität können Betrachter ohne Pro-Lizenz App-Inhalte ansehen — aber keine Berichte kopieren oder auf Basis des Modells neue Berichte erstellen.
</div>

### App erstellen

Im Arbeitsbereich: Schaltfläche **App erstellen** klicken.

**Drei Registerkarten im App-Konfigurations-Assistenten:**

**1. Einrichten** — Name, Beschreibung, Designfarbe, Kontaktinformationen, optionaler Link zur Support-Site.

**2. Inhalt** — Berichte und Dashboards aus dem Arbeitsbereich auswählen und anordnen. Mit **Inhalt hinzufügen** werden Elemente in die App aufgenommen. Reihenfolge per Drag & Drop anpassen.

**3. Zielgruppe** — Zugriffsberechtigungen konfigurieren. Standardmäßig gibt es eine Zielgruppe ("Alle"). Weitere Zielgruppen können angelegt werden.

Abschluss: **App veröffentlichen** — ein teilbarer Link wird generiert.

### Zielgruppen

Mit Zielgruppen lässt sich steuern, welcher Teil des App-Inhalts für welche Nutzergruppe sichtbar ist.

**Beispiel:** Eine App enthält Berichte für Vertrieb, Marketing und Controlling. Vertriebsmitarbeiter sollen nur die Vertriebsberichte sehen, Controlling-Mitarbeiter nur die Finanzberichte. Statt drei separate Apps zu erstellen, werden drei Zielgruppen in einer App angelegt.

**Zielgruppe einrichten:**
1. In der App-Bearbeitung auf die Registerkarte **Zielgruppe** wechseln
2. **Neue Zielgruppe** anlegen, benennen
3. Pro Zielgruppe: Sichtbarkeit der einzelnen Berichte über das Auge-Symbol steuern (sichtbar / ausgeblendet)
4. Nutzer oder Gruppen der Zielgruppe zuweisen

### App aktualisieren und löschen

**Aktualisieren:** Im Arbeitsbereich das Bleistift-Symbol **App bearbeiten** wählen → Änderungen vornehmen → **App aktualisieren**. Nutzer sehen die neue Version sofort nach der Aktualisierung.

**Löschen:** Drei-Punkte-Menü im Arbeitsbereich → **Veröffentlichung der App aufheben**. Die App verschwindet für alle Nutzer. Ihre Anpassungen (Lesezeichen, Kommentare) werden gelöscht. Der Arbeitsbereich und sein Inhalt bleiben erhalten.

---

## Data Governance

### Vertraulichkeitsbezeichnungen

Power BI unterstützt **Vertraulichkeitsbezeichnungen** (Sensitivity Labels) aus Microsoft Purview Information Protection. Typische Bezeichnungen: "Vertraulich", "Streng vertraulich", "Öffentlich".

**Zweck:** Das Label bleibt beim Export erhalten. Wenn ein als "Vertraulich" bezeichneter Bericht als PDF oder Excel exportiert wird, trägt die exportierte Datei dieselbe Bezeichnung und die damit verbundenen Schutzregeln.

**Anwenden im Service:** Bericht oder semantisches Modell öffnen → Weitere Optionen (**...**) → Einstellungen → Abschnitt **Vertraulichkeitsbezeichnung**.

**Anwenden in Desktop:** Symbolleiste → **Vertraulichkeit** → Bezeichnung auswählen. Wird beim Veröffentlichen auf Bericht und Modell im Service übertragen.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Welche Bezeichnungen verfügbar sind, wird vom Administrator im Microsoft 365 Compliance Center konfiguriert. Power BI setzt die Bezeichnungen durch, erstellt sie aber nicht selbst.
</div>

---

## Nutzung nachverfolgen

### Abonnements

Berichte und Dashboards können abonniert werden. Abonnenten erhalten automatisch E-Mails mit einer Momentaufnahme des Inhalts.

**Konfiguration im Service:** Bericht oder Dashboard öffnen → Menüleiste → **Abonnieren**. Optionen:
- Häufigkeit: stündlich, täglich, wöchentlich, monatlich
- Zeitpunkt der Zustellung
- Format: Vorschaubild, Link oder Anhang (PDF/PowerPoint bei Premium-Arbeitsbereichen)

### Nutzungsmetriken

Für jeden Bericht und jedes Dashboard im Service gibt es einen automatisch generierten **Nutzungsmetriken-Bericht**. Er zeigt:
- Anzahl der Aufrufe
- Eindeutige Betrachter (Unique Viewers)
- Aufrufe nach Plattform (Service, Mobil, eingebettet)
- Öffnungszeiten und Leistungstrends

**Zugriff:** Im Arbeitsbereich: Drei-Punkte-Menü neben dem Bericht → **Nutzungsmetriken anzeigen**.

*Nutzungsmetriken sind ein Qualitätssignal: Ein Bericht, den niemand öffnet, braucht entweder mehr Sichtbarkeit oder sollte überarbeitet oder entfernt werden.*

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Freigabemodelle</div>
    <div class="pbi-summary-body">Drei Methoden: Arbeitsbereichsrollen (Alles-oder-Nichts), Elementebene (gezielt, einzelne Berichte), Apps (kuratiert, für größere Zielgruppen). Je nach Szenario die richtige Methode wählen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Power BI Apps</div>
    <div class="pbi-summary-body">Erstellt über "App erstellen" im Arbeitsbereich. Drei Tabs: Einrichten, Inhalt, Zielgruppe. Staging im Arbeitsbereich, Veröffentlichung trennt Entwicklung von Produktion. Ein Arbeitsbereich = eine App.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">️</div>
    <div class="pbi-summary-title">Zielgruppen</div>
    <div class="pbi-summary-body">Verschiedene Nutzergruppen mit unterschiedlichem Inhalt in einer einzigen App. Sichtbarkeit pro Bericht und Zielgruppe steuerbar. Erspart separate Arbeitsbereiche und Apps für jede Abteilung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Vertraulichkeitsbezeichnungen</div>
    <div class="pbi-summary-body">Labels aus Microsoft Purview klassifizieren und schützen Inhalte. Bleiben beim Export (PDF, Excel, PowerPoint) erhalten. In Desktop oder Service anwendbar. Konfiguration durch Tenant-Administrator.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Abonnements</div>
    <div class="pbi-summary-body">Automatische E-Mails mit Berichts-Snapshots. Stündlich bis monatlich konfigurierbar. PDF/PPT-Anhänge nur in Premium-Arbeitsbereichen. Hält Betrachter ohne manuelles Öffnen auf dem Laufenden.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Nutzungsmetriken</div>
    <div class="pbi-summary-body">Automatischer Bericht pro Bericht und Dashboard. Zeigt Aufrufe, eindeutige Betrachter, Plattformen, Ladezeiten. Drei-Punkte-Menü → "Nutzungsmetriken anzeigen". Entscheidungshilfe für Priorisierung und Archivierung.</div>
  </div>
</div>
