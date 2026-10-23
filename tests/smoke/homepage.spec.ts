import { expect, test } from '@playwright/test';

test('homepage responds and identifies Myntra', async ({ page }) => {
  const response = await page.goto('/');

  expect(response, 'homepage navigation should receive an HTTP response').not.toBeNull();
  expect(response!.status(), 'homepage should not return an HTTP error').toBeLessThan(400);
  await expect(page).toHaveTitle(/myntra/i);
  await expect(page.locator('body')).not.toBeEmpty();
});
