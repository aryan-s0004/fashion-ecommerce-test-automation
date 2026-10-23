import { expect, test } from '@playwright/test';

// Search behavior must be confirmed by live reconnaissance before these
// assertions can be treated as accepted requirements.
test('search control is available from the homepage', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('textbox', { name: /search/i });
  await expect(search).toBeVisible();
  await expect(search).toBeEnabled();
});

test('non-empty search submits a query-specific navigation', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('textbox', { name: /search/i });
  await expect(search).toBeVisible();
  await search.fill('women kurta');
  await search.press('Enter');
  await expect(page).toHaveURL(/women%20kurta|women-kurta|women kurta/i);
});

test('empty search preserves the current URL', async ({ page }) => {
  await page.goto('/');
  const initialUrl = page.url();
  const search = page.getByRole('textbox', { name: /search/i });
  await expect(search).toBeVisible();
  await search.fill('');
  await search.press('Enter');
  await expect(page).toHaveURL(initialUrl);
});
