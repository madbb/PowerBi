[README-PowerBi.md](https://github.com/user-attachments/files/31778491/README-PowerBi.md)
# PL-300 Power BI Data Analyst - Kursmaterialien

4-Wochen-Intensivkurs zur Vorbereitung auf die Microsoft-Zertifizierung PL-300 Power BI Data Analyst.

## Projektübersicht

Dieses Repository enthält die vollständigen Kursmaterialien für die PL-300-Zertifizierung: von den Grundlagen der Datenanalyse über Datenmodellierung und DAX bis zu Visualisierung, Verwaltung und Prüfungsvorbereitung. Die Inhalte sind als MyST-Markdown-Site aufgebaut und werden über GitHub Pages veröffentlicht.

| Eigenschaft | Details |
|---|---|
| Zertifizierung | PL-300 Power BI Data Analyst |
| Kursdauer | 4 Wochen |
| Sprache | Deutsch |
| Format | MyST-Markdown-Site (Jupyter-Book-Nachfolger) |
| Veröffentlichung | GitHub Pages, Deployment über deploy.bat |

## Kursstruktur

| Woche | Thema | Inhalte |
|---|---|---|
| 1 | Grundlagen und Daten | Datenanalyse, Power BI-Einstieg, Daten abrufen und transformieren |
| 2 | Modellierung und DAX | Datenmodelle, Beziehungen, DAX-Grundlagen und Measures |
| 3 | Visualisierung | Berichte gestalten, Visuals, Interaktivität und Barrierefreiheit |
| 4 | Verwaltung und Prüfung | Power BI Service, Sicherheit, Deployment und Prüfungsvorbereitung |

## Projektstruktur

```
PowerBi/
│
├── Abfragen/           Beispiel- und Übungsabfragen aus dem Kurs
├── Skripte/             Hilfsskripte für Kurs und Build
├── datenbanken/         Beispieldatenbanken für die Übungen
├── exports/             Generierte Exporte (z. B. PDF-Fassungen der Kapitel)
├── _build/               Build-Output der MyST-Site
├── _static/              Statische Assets der Site (CSS, Bilder)
├── .github/workflows/    CI/CD-Workflows für Build und Deployment
│
├── index.md              Startseite mit Kursübersicht
├── downloads.md           Sammlung der Download-Materialien
├── myst.yml               MyST-Konfiguration der Site
├── deploy.bat              Deployment-Skript für GitHub Pages
├── pdf_export.js            PDF-Export der Kursseiten via Puppeteer
├── Joins.xlsx               Übungsdatei zu SQL-Joins
├── package.json              Node-Abhängigkeiten (Puppeteer)
└── .gitignore
```

## Nutzung

### Site lokal bauen

Die Site basiert auf MyST-Markdown. Mit den MyST-CLI-Tools lässt sich die Site lokal starten und bauen, gesteuert über `myst.yml`.

### Deployment

`deploy.bat` automatisiert den Build- und Veröffentlichungsschritt für GitHub Pages.

### PDF-Export

`pdf_export.js` erzeugt über Puppeteer PDF-Fassungen der Kursseiten. Die benötigte Abhängigkeit ist in `package.json` hinterlegt und wird mit

```
npm install
```

installiert.

## Kursmaterialien

Die Downloads für Teilnehmer, darunter Übungsdateien und Zusatzmaterial, sind in `downloads.md` verlinkt.

---

Erstellt mit MyST Markdown und veröffentlicht über GitHub Pages.
