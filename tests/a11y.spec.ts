import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const paths = ['/es/', '/en/', '/es/experiencias/', '/es/legal/cookies/'];

for (const path of paths) {
  test(`axe WCAG 2.2 AA — ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('el skip link recibe foco con teclado', async ({ page }) => {
  await page.goto('/es/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
});

test('la elección de la Travesía revela un desenlace y persiste', async ({ page }) => {
  await page.goto('/es/');
  const btn = page.locator('journey-choice button[data-option="0"]').first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('journey-choice .choice-outcome.is-open').first()).toBeVisible();
  await page.reload();
  await expect(page.locator('journey-choice button[data-option="0"]').first()).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
