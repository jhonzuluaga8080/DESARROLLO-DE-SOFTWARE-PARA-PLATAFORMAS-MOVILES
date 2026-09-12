import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots');

const session = {
  username: 'dr.garcia',
  name: 'Dr. Carlos García',
  specialty: 'Medicina General',
};

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

async function shot(name) {
  await page.screenshot({ path: join(outDir, name), fullPage: true });
  console.log('Saved:', name);
}

await page.goto('http://localhost:4174');
await page.waitForLoadState('networkidle');
await shot('ionic-login.png');

await page.evaluate((s) => {
  localStorage.setItem('mediclinic_doctor_session', JSON.stringify(s));
}, session);

await page.goto('http://localhost:4174/tabs/visitas');
await page.waitForTimeout(1500);
await shot('ionic-visitas.png');

await page.locator('ion-item').first().click();
await page.waitForTimeout(1500);
await shot('ionic-detalle.png');

await page.goto('http://localhost:4174/tabs/perfil');
await page.waitForTimeout(1500);
await shot('ionic-perfil.png');

await page.goto('http://localhost:4174/tabs/pacientes');
await page.waitForTimeout(1500);
await shot('ionic-pacientes.png');

await browser.close();
