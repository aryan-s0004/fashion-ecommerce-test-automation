import { test, expect } from './fixtures';

test('Myntra branding appears in the browser title and site header', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Myntra');
  await expect(page.locator('header .logo')).toContainText('Myntra');
});

test('Myntra header remains usable on a compact mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await expect(page.locator('header .logo')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open categories' })).toBeVisible();
});

test('unknown product search shows the empty result state', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Search products').fill('no-such-myntra-product');
  await page.getByRole('button', { name: 'Submit search' }).click();
  await expect(page.locator('.empty')).toBeVisible();
});
