import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import curriculum from '../src/data/curriculum.json' with { type: 'json' };

const modules = curriculum.modules.map((module) => JSON.parse(readFileSync(new URL(`../src/data/i18n/en/${module.id}.json`, import.meta.url), 'utf8')) as typeof module);
const topics = modules.flatMap((module) => module.lessons.map((lesson) => ({ id: `${module.id}/${lesson.slug}`, title: lesson.title })));
const first = topics[0]!;
const firstHref = `/en/lessons/${first.id}/`;
const switchTo = (page: import('@playwright/test').Page, locale: string) => page.locator(`[data-language-switch] a[lang="${locale}"]`);

test('English home links all 96 complete English lessons with correct metadata and language counterparts', async ({ page, request }) => {
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('AI');
  await expect(switchTo(page, 'en')).toHaveAttribute('aria-current', 'page');
  for (const topic of topics) {
    const href = `/en/lessons/${topic.id}/`;
    await expect(page.locator(`a[href="${href}"]`).first()).toBeAttached();
    const response = await request.get(href);
    expect(response.status(), topic.id).toBe(200);
    const html = await response.text();
    expect(html).toMatch(/<html[^>]*lang="en"/);
    expect(html).toContain(topic.title.replaceAll('&', '&amp;'));
    expect(html).toContain(`href="/lecciones/${topic.id}/"`);
    expect(html).toMatch(/<article[^>]*class="prose"/);
    expect(html).not.toMatch(/>Al terminar podrás<|>Documentación para seguir aprendiendo<|>En esta lección</);
  }
});

test('Language selection preserves the same lesson, completion and both explicit language routes', async ({ page }) => {
  await page.goto(`/lecciones/${first.id}/`);
  await page.locator('.completion-button').click();
  await switchTo(page, 'en').click();
  await expect(page).toHaveURL(firstHref);
  await expect(page.locator('h1')).toHaveText(first.title);
  await expect(page.locator('.completion-button')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.completion-status')).toContainText('1 of 96');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('leadtech:completed:v1') || '[]'))).toEqual([first.id]);
  await page.locator('.completion-button').click();
  await switchTo(page, 'es').click();
  await expect(page).toHaveURL(`/lecciones/${first.id}/`);
  await expect(page.locator('.completion-button')).toHaveAttribute('aria-pressed', 'false');
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});

test('English home search, phase filters and empty state are localized', async ({ page }) => {
  await page.goto('/en/');
  const search = page.locator('input[type="search"]');
  await search.fill('Docker');
  await expect(page.locator('a[href*="contenedores-reproducibles-con-docker"]').first()).toBeVisible();
  await expect(page.locator('[data-results-count]')).toContainText('lesson');
  await search.fill('zzznomatch');
  await expect(page.locator('[data-empty-state]')).toBeVisible();
  await expect(page.locator('[data-empty-state]')).not.toContainText('No encontramos');
  await page.locator('[data-filter-reset]').click();
  await page.locator('[data-phase-filter="2"]').click();
  await expect(page.locator('[data-results-count]')).toContainText('21 lessons');
  await expect(page.locator('[data-module-card][data-phase="1"]').first()).toBeHidden();
  await expect(page.locator('[data-module-card][data-phase="2"]').first()).toBeVisible();
});

test('English continue-learning link stays in English and uses the shared progress', async ({ page }) => {
  await page.goto(firstHref);
  await page.locator('.completion-button').click();
  await page.goto('/en/');
  await expect(page.locator('[data-progress-count]')).toHaveText('1');
  await expect(page.locator('[data-continue-link]')).toHaveAttribute('href', `/en/lessons/${topics[1]!.id}/`);
  await page.locator('[data-continue-link]').click();
  await expect(page.locator('h1')).toHaveText(topics[1]!.title);
});

test('English lesson navigation and translated article table of contents work', async ({ page }) => {
  await page.goto(firstHref);
  await page.locator('.lesson-nav a').last().click();
  await expect(page).toHaveURL(`/en/lessons/${topics[1]!.id}/`);
  await expect(page.locator('h1')).toHaveText(topics[1]!.title);
  await page.locator('.toc summary').click();
  const link = page.locator('.toc a').first();
  const href = await link.getAttribute('href');
  await link.click();
  expect(page.url()).toContain(href!);
  await page.locator('.back-to-course').click();
  await expect(page).toHaveURL(/\/en\/#temario$/);
});

test('English content and language selection work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/en/');
  await expect(page.locator(`a[href="${firstHref}"]`).first()).toBeAttached();
  await switchTo(page, 'es').click();
  await expect(page).toHaveURL('/');
  await switchTo(page, 'en').click();
  await expect(page).toHaveURL('/en/');
  await page.goto(firstHref);
  await expect(page.locator('article.prose')).toBeVisible();
  await expect(page.locator('noscript p')).toContainText('JavaScript');
  await switchTo(page, 'es').click();
  await expect(page).toHaveURL(`/lecciones/${first.id}/`);
  await context.close();
});

test('Blocked or malformed storage never blocks English reading or language switching', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('leadtech:completed:v1', '{bad'));
  await page.goto(firstHref);
  await expect(page.locator('.completion-status')).toContainText('0 of 96');
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('blocked', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('blocked', 'SecurityError'); };
  });
  await page.reload();
  await expect(page.locator('h1')).toHaveText(first.title);
  await page.locator('.completion-button').click();
  await expect(page.locator('.completion-status')).not.toContainText('navegador');
  await switchTo(page, 'es').click();
  await expect(page).toHaveURL(`/lecciones/${first.id}/`);
});

test('English mobile layout retains visible language selection with no overflow or JS errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const href of ['/en/', firstHref, `/en/lessons/${topics[40]!.id}/`, `/en/lessons/${topics[70]!.id}/`]) {
      await page.goto(href);
      await expect(switchTo(page, 'es')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}: ${href}`).toBeTruthy();
    }
  }
  expect(errors).toEqual([]);
});

test('English keyboard navigation and automated accessibility on home and lesson', async ({ page }) => {
  await page.goto('/en/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#contenido')).toBeFocused();
  for (const href of ['/en/', firstHref]) {
    await page.goto(href);
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(scan.violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ target }) => target) }))).toEqual([]);
  }
});

test('English screenshots for desktop and mobile visual review', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en/');
  await page.screenshot({ path: 'docs/screenshots/landing-en-desktop.png', fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'docs/screenshots/landing-en-mobile.png', fullPage: true });
  await page.screenshot({ path: 'docs/screenshots/landing-en-mobile-preview.png', fullPage: false });
  await page.goto(firstHref);
  await page.screenshot({ path: 'docs/screenshots/lesson-en-mobile.png', fullPage: true });
  await page.screenshot({ path: 'docs/screenshots/lesson-en-mobile-preview.png', fullPage: false });
});

test('Language switching retains shared anchors but never carries a broken translated heading anchor', async ({ page }) => {
  await page.goto('/#temario');
  await switchTo(page, 'en').click();
  await expect(page).toHaveURL('/en/#temario');
  await page.goto(firstHref);
  const headingId = await page.locator('article.prose h2').first().getAttribute('id');
  await page.goto(`${firstHref}#${headingId}`);
  await switchTo(page, 'es').click();
  await expect(page).toHaveURL(`/lecciones/${first.id}/`);
});

test('Malformed URL fragments do not trigger JavaScript errors or break language selection', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/en/#%E0%A4%A');
  await expect(page.locator('h1')).toBeVisible();
  await switchTo(page, 'es').click();
  await expect(page).toHaveURL('/');
  expect(errors).toEqual([]);
});

test('English error page is translated and has a working Spanish counterpart', async ({ page }) => {
  await page.goto('/en/404/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Page not found · Leadtech School');
  await expect(page.locator('main')).toContainText('curriculum');
  await switchTo(page, 'es').click();
  await expect(page).toHaveURL('/404.html');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});
