import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

async function shot(page, name) {
  await page.screenshot({ path: join(outDir, name), fullPage: true });
  console.log('Saved:', name);
}

// PWA screenshots
const pwa = await context.newPage();
await pwa.goto('http://localhost:4173');
await pwa.waitForLoadState('networkidle');
await shot(pwa, 'pwa-login.png');

await pwa.fill('#username', 'admin');
await pwa.fill('#password', 'admin123');
await pwa.click('button[type="submit"]');
await pwa.waitForTimeout(500);
await shot(pwa, 'pwa-pacientes-vacio.png');

await pwa.fill('#nombre', 'María');
await pwa.fill('#apellido', 'Fernández');
await pwa.fill('#cc', '1020304050');
await pwa.fill('#telefono', '3001234567');
await pwa.click('.patient-form button[type="submit"]');
await pwa.waitForTimeout(300);

await pwa.fill('#nombre', 'Juan');
await pwa.fill('#apellido', 'Pérez');
await pwa.fill('#cc', '1030405060');
await pwa.fill('#telefono', '3109876543');
await pwa.click('.patient-form button[type="submit"]');
await pwa.waitForTimeout(300);
await shot(pwa, 'pwa-pacientes.png');

await pwa.fill('#search', 'María');
await pwa.waitForTimeout(300);
await shot(pwa, 'pwa-busqueda.png');
await pwa.close();

// Ionic screenshots
const ionic = await context.newPage();
await ionic.goto('http://localhost:4174');
await ionic.waitForLoadState('networkidle');
await shot(ionic, 'ionic-login.png');

await ionic.locator('ion-input').first().locator('input').fill('dr.garcia');
await ionic.locator('ion-input').nth(1).locator('input').fill('medico123');
await ionic.locator('ion-button', { hasText: 'Ingresar' }).click();
await ionic.waitForTimeout(800);
await shot(ionic, 'ionic-visitas.png');

await ionic.locator('ion-item').first().click();
await ionic.waitForTimeout(800);
await shot(ionic, 'ionic-detalle.png');

await ionic.goto('http://localhost:4174/tabs/perfil');
await ionic.waitForTimeout(800);
await shot(ionic, 'ionic-perfil.png');

await ionic.goto('http://localhost:4174/tabs/pacientes');
await ionic.waitForTimeout(800);
await shot(ionic, 'ionic-pacientes.png');

await browser.close();
console.log('All screenshots captured in', outDir);
