import { expect, test } from '@playwright/test';

test('homepage responds and identifies Myntra', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
  const response = await page.goto('/');

  if (!response) {
    throw new Error('Homepage navigation did not return an HTTP response.');
  }
  expect(response.status(), 'homepage should not return an HTTP error').toBeLessThan(400);
  await expect(page).toHaveTitle(/myntra/i);
  await expect(page.locator('body')).not.toBeEmpty();
});
