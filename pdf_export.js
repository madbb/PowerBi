const puppeteer = require('puppeteer');
const fs = require('fs');

const pages = [
  'skripte/modul1/einfuehrung-datenanalyse',
  'skripte/modul1/erste-schritte-power-bi',
  'skripte/modul1/microsoft-fabric',
  'skripte/modul1/copilot-power-bi',
  'skripte/modul2/daten-abrufen',
  'skripte/modul2/daten-abrufen-aufgaben',
  'skripte/modul2/power-query-bereinigen',
  'skripte/modul2/aufgaben-06-power-query-bereinigen',
  'skripte/modul2/modellframework',
  'skripte/modul3/semantisches-modell-konfigurieren',
  'skripte/modul3/dax-grundlagen-berechnungstypen',
  'skripte/modul3/dax-datentypen-funktionen-operatoren',
  'skripte/modul3/dax-berechnungen-erstellen',
  'skripte/modul3/dax-filterkontext-calculate',
  'skripte/modul3/dax-zeitintelligenz',
  'skripte/modul3/visuelle-berechnungen',
  'skripte/modul3/modelloptimierung',
  'skripte/modul4/berichtsanforderungen',
  'skripte/modul4/berichte-layouten-gestalten',
  'skripte/modul4/berichtsobjekte-visual-auswahl',
  'skripte/modul4/filtern-interaktivitaet-ux',
  'skripte/modul4/berichtsleistung-mobile',
  'skripte/modul4/analysen-power-bi',
];

(async () => {
  const browser = await puppeteer.launch();
  for (const p of pages) {
    const parts = p.split('/');
    const dir = `exports/${parts[0]}_${parts[1]}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const page = await browser.newPage();
    await page.goto(`http://localhost:3000/${p}`, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: `${dir}/${parts[2]}.pdf`,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });
    console.log(`Exportiert: ${p}`);
    await page.close();
  }
  await browser.close();
})();