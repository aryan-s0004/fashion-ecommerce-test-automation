import { expect, test } from '@playwright/test';

test('search control is available from the homepage', { tag: ['@accessibility', '@regression'] }, async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('textbox', { name: /search/i });
  await expect(search).toBeVisible();
  await expect(search).toBeEnabled();
});

test('non-empty search submits a query-specific navigation', { tag: ['@search', '@regression'] }, async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('textbox', { name: /search/i });
  await expect(search).toBeVisible();
  await search.fill('women kurta');
  await search.press('Enter');
  await expect(page).toHaveURL(/women%20kurta|women-kurta|women kurta/i);
  await expect(page).toHaveTitle(/women kurta/i);
});

test('empty search preserves the current URL', { tag: ['@search', '@regression'] }, async ({ page }) => {
  await page.goto('/');
  const initialUrl = page.url();
  const search = page.getByRole('textbox', { name: /search/i });
  await expect(search).toBeVisible();
  await search.fill('');
  await search.press('Enter');
  await expect(page).toHaveURL(initialUrl);
});
