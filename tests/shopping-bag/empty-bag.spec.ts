import { expect, test } from '@playwright/test';

test('an empty shopping bag explains how to add items', { tag: ['@bag', '@regression', '@responsive'] }, async ({ page }) => {
  const response = await page.goto('/checkout/cart');

  if (!response) {
    throw new Error('Shopping-bag navigation did not return an HTTP response.');
  }
  expect(response.status(), 'shopping bag should return a successful response').toBeLessThan(400);
  await expect(page).toHaveTitle(/shopping bag/i);
  await expect(page.getByText(/there is nothing in your bag/i)).toBeVisible();
});
