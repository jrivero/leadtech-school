import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import curriculum from '../src/data/curriculum.json' with { type: 'json' };
const topics = curriculum.modules.flatMap((module) => module.lessons.map((lesson) => ({ id: `${module.id}/${lesson.slug}`, title: lesson.title })));
const first = topics[0]!;
const firstHref = `/lecciones/${first.id}/`;

test('La landing enlaza las 96 lecciones y todas responden con su título', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Leadtech School/);
  await expect(page.locator('h1')).toHaveCount(1);
  for (const topic of topics) {
    await expect(page.locator(`a[href="/lecciones/${topic.id}/"]`).first()).toBeAttached();
    const response = await request.get(`/lecciones/${topic.id}/`);
    expect(response.status(), topic.id).toBe(200);
    const html = await response.text();
    expect(html).toContain(topic.title.replaceAll('&', '&amp;'));
  }
});

test('Buscar un tema, limpiar y comprobar el estado vacío', async ({ page }) => {
  await page.goto('/');
  const search = page.locator('input[type="search"]');
  await search.fill('Docker');
  await expect(page.locator(`a[href*="contenedores-reproducibles-con-docker"]`).first()).toBeVisible();
  await search.fill('zzzxsinresultados');
  await expect(page.getByText(/no (?:hemos encontrado|hay|encontramos).*resultad|ningún resultado/i).first()).toBeVisible();
  await search.fill('');
  await expect(page.locator(`a[href="${firstHref}"]`).last()).toBeAttached();
});

test('Filtrar por fase muestra solo los bloques del tramo elegido', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-phase-filter="2"]').click();
  await expect(page.locator('[data-phase-filter="2"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-module-card][data-phase="1"]').first()).toBeHidden();
  await expect(page.locator('[data-module-card][data-phase="2"]').first()).toBeVisible();
  await expect(page.locator('[data-results-count]')).toContainText('21 lecciones');
  await page.locator('[data-phase-filter="all"]').click();
  await expect(page.locator('[data-module-card][data-phase="1"]').first()).toBeVisible();
});

test('El enlace de salto permite llegar al contenido con teclado', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#contenido')).toBeFocused();
});

test('Guardar progreso y desmarcar, incluso tras recargar', async ({ page }) => {
  await page.goto(firstHref);
  const button = page.getByRole('button', { name: /marcar como completada/i });
  await button.click();
  await expect(page.getByRole('button', { name: /completada.*desmarcar/i })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  const completed = page.getByRole('button', { name: /completada.*desmarcar/i });
  await expect(completed).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('leadtech:completed:v1') || '[]'))).toEqual([first.id]);
  await completed.click();
  await expect(page.getByRole('button', { name: /marcar como completada/i })).toHaveAttribute('aria-pressed', 'false');
});

test('Progreso corrupto o almacenamiento bloqueado no impiden estudiar', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('leadtech:completed:v1', '{bad'));
  await page.goto(firstHref);
  await expect(page.getByRole('button', { name: /marcar como completada/i })).toBeVisible();
  await expect(page.locator('.completion-status')).toContainText('0 de 96');
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('blocked', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('blocked', 'SecurityError'); };
  });
  await page.reload();
  await expect(page.locator('h1')).toHaveText(first.title);
  await page.getByRole('button', { name: /marcar como completada/i }).click();
  await expect(page.locator('.completion-status')).toContainText('no permite guardar');
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});

test('Contenido y enlaces disponibles sin JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  for (const topic of topics) await expect(page.locator(`a[href="/lecciones/${topic.id}/"]`).first()).toBeAttached();
  await page.goto(firstHref);
  await expect(page.locator('article.prose')).toBeVisible();
  await expect(page.locator('h1')).toHaveText(first.title);
  await expect(page.locator('noscript p')).toBeVisible();
  await expect(page.locator('noscript p')).toContainText('sin JavaScript');
  await context.close();
});

test('Navegación secuencial y enlaces del índice de artículo', async ({ page }) => {
  await page.goto(firstHref);
  await page.locator('.lesson-nav a').last().click();
  await expect(page.locator('h1')).toHaveText(topics[1]!.title);
  const toc = page.locator('.toc');
  await toc.locator('summary').click();
  const link = toc.locator('a').first();
  const href = await link.getAttribute('href');
  await link.click();
  expect(page.url()).toContain(href!);
});

test('No hay desbordamiento en móvil ni errores JavaScript', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  for (const href of ['/', firstHref, `/lecciones/${topics[40]!.id}/`, `/lecciones/${topics[70]!.id}/`]) {
    await page.goto(href);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), href).toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test('Accesibilidad automatizada en landing y artículo', async ({ page }) => {
  for (const href of ['/', firstHref]) {
    await page.goto(href);
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(scan.violations.map((item) => ({ id: item.id, description: item.description, nodes: item.nodes.map((node) => node.target) }))).toEqual([]);
  }
});

test('Capturas de entrega en escritorio y móvil', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.screenshot({ path: 'docs/screenshots/landing-preview.png', fullPage: false });
  await page.screenshot({ path: 'docs/screenshots/landing-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'docs/screenshots/landing-mobile.png', fullPage: true });
  await page.goto(firstHref);
  await page.screenshot({ path: 'docs/screenshots/lesson-mobile.png', fullPage: true });
});
