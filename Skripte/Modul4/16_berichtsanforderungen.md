# Berichtsanforderungen bestimmen

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 4 · Skript 16</div>
  <div class="pbi-page-title">Berichtsanforderungen bestimmen</div>
  <div class="pbi-page-sub">Zielgruppen, Berichtstypen, UI- und UX-Anforderungen als Grundlage für gutes Berichtsdesign</div>
</div>

Bevor die erste Seite in Power BI Desktop angelegt wird, sollten die Anforderungen des Berichts klar sein. Wer nutzt den Bericht? Auf welchem Gerät? Mit welchem Ziel? Diese Fragen bestimmen Typ, Layout und Funktionalität eines Berichts — und sparen aufwendige Nacharbeit.

---

## Die Zielgruppe identifizieren

Das Bestimmen der Zielgruppe ist einer der wichtigsten Schritte beim Berichtsdesign. Es gibt drei Hauptzielgruppen:

<div class="pbi-definition">
  <strong>Führungskraft</strong> Verantwortlich für Pläne und Entscheidungen mit mittel- bis langfristigem Fokus. Benötigt schnell interpretierbare Übersichten auf hoher Ebene — oft auf dem Smartphone oder Tablet, immer auf dem Weg.
</div>

<div class="pbi-definition">
  <strong>Analyst</strong> Übernimmt eine beratende Funktion: analysiert die Effektivität von Strategien, entwickelt Prozesse, setzt Änderungen um. Erwartet interaktive Berichte mit tiefen Drill-down-Möglichkeiten.
</div>

<div class="pbi-definition">
  <strong>Arbeitskraft im Informationsbereich</strong> Nutzt Daten für operative Entscheidungen und tägliche Aufgaben — z. B. ein Lagerverwalter, der aktuelle Bestandsdaten benötigt. Erwartet klare, handlungsorientierte Berichte mit integrierten Aktionsmöglichkeiten.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 3-1-report-audience-mapping.jpg — Diagramm mit der Zuordnung der drei Zielgruppentypen zu den entsprechenden Berichtstypen.</span>
</div>

---

## Berichtstypen bestimmen

Die Zielgruppe beeinflusst direkt den Berichtstyp. Es gibt vier Grundtypen:

### Dashboard

Das primäre Ziel ist schnelles Überwachen und Interpretieren. Das Dashboard zeigt häufig die wichtigsten KPIs auf einer einzigen Seite. Benutzerinteraktionen sind auf kurierte Erkenntnisse beschränkt — keine komplexe Analyse, keine Ablenkung.

Leitfragen: *„Wie geht es uns?"* und *„Sind wir am Ziel?"*

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 3-2-report-type-dashboard.png — Dashboard mit KPI-Karten, Statusanzeigen und Trendlinien.</span>
</div>

### Analysebericht

Der häufigste Berichtstyp. Ziel ist die Beantwortung vieler verschiedener Fragen durch interaktive Exploration — mit Slicern, Drill-down, Drillthrough und QuickInfos. Analyseberichte gehen über *„Wie geht es uns?"* hinaus zu *„Warum ist das passiert?"* und *„Was könnte als Nächstes passieren?"*

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 3-3-report-type-analytical-report.png — Analysebericht mit Datumsbereichsslicer und interaktiven Visuals zur Umsatzanalyse.</span>
</div>

### Operativer Bericht

Ermöglicht die Überwachung von Echtzeit- oder aktuellen Daten und direkte Aktionen. Operative Berichte enthalten oft Schaltflächen, über die Benutzer in externe Systeme wechseln können — z. B. um eine Bestellung auszulösen oder einen Wartungsauftrag einzuleiten. Die Anzahl der Analysefunktionen wird bewusst minimiert, um den Fokus auf den operativen Ablauf zu halten.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">⚠️ Wichtig</span>
  Bei operativen Berichten kann übermäßiges Klicken oder ein unlogischer Ablauf zu hoher Frustration und Produktivitätsverlust führen. UX-Qualität ist hier besonders kritisch.
</div>

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 3-4-report-type-operational-report.png — Operativer Bestandsbericht mit Echtzeit-Lagerstatistiken und Schaltfläche „Auftrag senden".</span>
</div>

### Bildungsbericht

Geht davon aus, dass die Benutzer nicht mit den Daten vertraut sind. Enthält klare narrative Details, Leitlinien und Kontextinformationen. Typisch für journalistische oder behördliche Veröffentlichungen.

---

## UI-Anforderungen definieren

UI-Anforderungen beschreiben, wie ein Bericht verwendet wird und wie er aussieht und sich verhält.

### Formfaktor

Der Formfaktor ist die Größe und Ausrichtung des Geräts:

| Gerät | Formfaktor | Designhinweis |
|---|---|---|
| Desktop / großer Monitor | Groß, Querformat | Mehrere komplexe Visuals möglich |
| Tablet | Mittel, Hochformat | Weniger Visuals, gut erkennbare Elemente |
| Smartphone | Klein, Hochformat | Sehr wenige Visuals, Touchgesten-freundlich |
| AR/MR-Gerät | Variabel | Bericht überlagert die reale Umgebung |

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">📷 Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 4-1-form-factor.jpg — Vergleich desselben Berichts auf großem Monitor vs. mobilem Gerät im Hochformat.</span>
</div>

### Eingabemethode

Auf Desktops wird hauptsächlich mit Maus und Tastatur interagiert. Auf mobilen Geräten werden Gesten verwendet (Tippen, Wischen, Pinch-to-Zoom). Augmented-Reality-Geräte werden durch Handgesten oder Körperbewegungen gesteuert.

Wenn ein Bericht in eine Anwendung eingebettet ist, kann die Eingabe auch programmgesteuert erfolgen — z. B. wird beim Öffnen einer Kundenseite automatisch ein Kundenfilter übergeben.

### Stil und Design

Das Berichtsdesign sollte das Branding der Organisation widerspiegeln. Ein vollständiges Theme enthält mindestens:

- Logo oder Markenzeichen
- Farbpalette (Unternehmensfarben mit ausreichend Kontrast)
- Texteinstellungen (Schriftarten, Größen, Farben)

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">💡 Tipp</span>
  Speichere Bilder und Themes in einem zentralen Repository. So werden Änderungen automatisch in alle Berichte übernommen — ohne manuelle Anpassung in jedem einzelnen Bericht.
</div>

### Barrierefreiheit

Berichte sollten für eine möglichst breite Zielgruppe zugänglich sein — auch für Personen mit Sehbehinderung oder körperlichen Einschränkungen:

- Gut lesbare, große Schriftarten
- Große Visuals mit ausreichend Abstand
- Klare, kontrastreiche Farben
- Tastaturnavigation und Bildschirmleser-Unterstützung
- Alternativtexte für Visuals
- Tabulatorreihenfolge für Tastaturnavigation festlegen

---

## UX-Anforderungen definieren

UX-Anforderungen beschreiben, wie Benutzer mit dem Bericht interagieren und was sie damit erreichen können.

### Interaktives Erkunden ermöglichen

Benutzer sollen selbst Erkenntnisse gewinnen können — durch Drill-down, Drillthrough, Navigation zwischen Seiten, Filter und Slicer. Drillthrough-Schaltflächen helfen Benutzern, von einer Übersichtsseite zu einer Detailseite zu navigieren.

### Flexiblen Datenzugriff bereitstellen

Verschiedene Wege, Daten aus dem Bericht zu nutzen:

- Export als Excel- oder CSV-Datei
- Fragen in natürlicher Sprache über das Q&A-Visual
- Datenwarnungen für Schlüsselwerte im Power BI-Dienst
- Links zu externen Webseiten oder Aktionen in Anwendungen

### Szenarioanalyse und Anpassung unterstützen

Was-wäre-wenn-Parameter ermöglichen es Benutzern, Szenarien durchzuspielen — z. B. einen Schieberegler für ein hypothetisches Umsatzwachstum.

### Bereitstellung und Zusammenarbeit automatisieren

Berichte können abonniert werden, sodass sie nach einem festen Zeitplan als Dokument zugestellt werden. Kommentarfunktionen ermöglichen Diskussionen direkt im Bericht.

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">👥</div>
    <div class="pbi-summary-title">Drei Zielgruppen</div>
    <div class="pbi-summary-body">Führungskraft (schnelle Übersichten), Analyst (tiefe Exploration), Arbeitskraft im Informationsbereich (operative Entscheidungen + Aktionen). Die Zielgruppe bestimmt Typ und Komplexität des Berichts.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📊</div>
    <div class="pbi-summary-title">Vier Berichtstypen</div>
    <div class="pbi-summary-body">Dashboard (KPI-Übersicht), Analysebericht (interaktive Exploration), Operativer Bericht (Echtzeit + Aktionen), Bildungsbericht (Kontext für unbekannte Zielgruppen). Kombinationen möglich.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">📱</div>
    <div class="pbi-summary-title">Formfaktor & Eingabe</div>
    <div class="pbi-summary-body">Gerätegröße und Ausrichtung bestimmen Anzahl und Komplexität der Visuals. Eingabemethode (Maus, Touch, Geste) beeinflusst Abstände, interaktive Elemente und Slicer-Gestaltung.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🎨</div>
    <div class="pbi-summary-title">Stil & Design</div>
    <div class="pbi-summary-body">Theme mit Logo, Farbpalette und Schriftarten aus zentralem Repository. Änderungen wirken automatisch auf alle Berichte. Farben: ausreichend Kontrast, sparsam einsetzen.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">♿</div>
    <div class="pbi-summary-title">Barrierefreiheit</div>
    <div class="pbi-summary-body">Von Anfang an mitdenken: große Schriften, Kontrast, Tastaturnavigation, Alternativtexte, Tabulatorreihenfolge. Status nicht nur über Farbe kommunizieren — auch Symbole verwenden.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon">🔁</div>
    <div class="pbi-summary-title">UX-Prioritäten</div>
    <div class="pbi-summary-body">Drill-down/through für Detailtiefe, Datenzugriff über Export/Q&A/Warnungen, Was-wäre-wenn für Szenarios, Abonnements und Kommentare für Zusammenarbeit.</div>
  </div>
</div>
