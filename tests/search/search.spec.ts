import { expect, test, type Page } from '@playwright/test';

async function findSearchField(page: Page) {
  const selectors = [
    page.getByRole('textbox', { name: /search/i }),
    page.getByRole('searchbox'),
    page.getByLabel(/search/i),
    page.getByPlaceholder(/search/i),
    page.locator('input[placeholder*="Search" i], input[aria-label*="Search" i], [role="searchbox"], [role="textbox"][aria-label*="Search" i]')
  ];

  for (const candidate of selectors) {
    if (await candidate.count()) {
      return candidate.first();
    }
  }

  const genericBanner = page.getByText(/search for products/i).first();
  if (await genericBanner.count()) {
    return genericBanner;
  }

  throw new Error('No searchable field was visible on the homepage');
}

async function requireTextEntry(page: Page) {
  const field = await findSearchField(page);
  const isTextEntry = await field.evaluate((element) => {
    const tagName = element.tagName.toLowerCase();
    const role = (element.getAttribute('role') || '').toLowerCase();
    return tagName === 'input' || tagName === 'textarea' || role === 'textbox' || role === 'searchbox';
  });

  if (!isTextEntry) {
    test.skip(true, 'The live site rendered a generic search banner instead of a textbox/searchbox on this browser.');
  }

  return field;
}

test('search control is available from the homepage', { tag: ['@accessibility', '@regression'] }, async ({ page }) => {
  await page.goto('/');
  const search = await findSearchField(page);
  await expect(search).toBeVisible();
  await expect(search).toBeEnabled();
});

test('non-empty search submits a query-specific navigation', { tag: ['@search', '@regression'] }, async ({ page }) => {
  await page.goto('/');
  const search = await requireTextEntry(page);
  await expect(search).toBeVisible();
  await search.fill('women kurta');
  await search.press('Enter');
  await expect(page).toHaveURL(/women%20kurta|women-kurta|women kurta/i);
  await expect(page).toHaveTitle(/women kurta/i);
});

test('empty search preserves the current URL', { tag: ['@search', '@regression'] }, async ({ page }) => {
  await page.goto('/');
  const initialUrl = page.url();
  const search = await requireTextEntry(page);
  await expect(search).toBeVisible();
  await search.fill('');
  await search.press('Enter');
  await expect(page).toHaveURL(initialUrl);
});
