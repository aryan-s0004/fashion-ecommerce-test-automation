import { test, expect } from './fixtures';

test('search matches a brand name', async ({ page, pages }) => {
  await pages.home.open(); await pages.search.search('NORTH & CO.');
  await expect(page.locator('.card')).toHaveCount(6);
  await expect(page.locator('.card').first()).toContainText('NORTH & CO.');
});

test('search matches category names', async ({ page, pages }) => {
  await pages.home.open(); await pages.search.search('Accessories');
  await expect(page.locator('.card')).toHaveCount(12);
});

test('search trims surrounding whitespace', async ({ page, pages }) => {
  await pages.home.open(); await pages.search.search('  Relaxed Cotton  ');
  await expect(page.locator('.card')).toHaveCount(1);
});

test('search accepts punctuation and long input without breaking the page', async ({ page, pages }) => {
  await pages.home.open(); await pages.search.search('!@#$%^&*()_+'.repeat(20));
  await expect(page.locator('.empty')).toBeVisible();
  await expect(page.locator('.header')).toBeVisible();
});

test('matching search suggestions are offered for a product query', async ({ page, pages }) => {
  await pages.home.open();
  await page.getByLabel('Search products').fill('Relaxed Cotton');
  await expect(page.locator('#suggestions option')).toHaveCount(1);
});

test('category sort supports descending price order', async ({ page, pages }) => {
  await pages.home.open(); await pages.category.open('Women');
  await pages.category.sort('price-high');
  const values = await page.locator('.card strong').allInnerTexts();
  expect(values.length).toBeGreaterThan(1);
  expect(values.map((v) => Number(v.replace(/[^0-9]/g, '')))).toEqual(
    [...values.map((v) => Number(v.replace(/[^0-9]/g, '')))].sort((a, b) => b - a),
  );
});

test('category sort supports alphabetical product names', async ({ page, pages }) => {
  await pages.home.open(); await pages.category.open('Kids'); await pages.category.sort('name');
  const names = await page.locator('.card-info h3').allInnerTexts();
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
});

test('accessories category contains its own catalog items', async ({ page, pages }) => {
  await pages.home.open(); await pages.category.open('Accessories');
  await expect(page.locator('.listing h2')).toContainText('Accessories');
  await expect(page.locator('.card')).toHaveCount(12);
});

test('type and price filters can be combined', async ({ page, pages }) => {
  await pages.home.open(); await pages.category.open('Men');
  const before = await page.locator('.card').count();
  await page.getByLabel('Type filter').selectOption('Shirts');
  const after = await page.locator('.card').count();
  expect(after).toBeGreaterThan(0); expect(after).toBeLessThan(before);
  await page.getByLabel('Maximum price').fill('1000');
  await expect(page.locator('.card')).toHaveCount(0);
  await expect(page.locator('.empty')).toBeVisible();
});

test('brand filter returns products from only the selected brand', async ({ page, pages }) => {
  await pages.home.open(); await pages.category.open('Women');
  await page.getByLabel('Brand filter').selectOption('NORTH & CO.');
  const brands = await page.locator('.card-info small').allInnerTexts();
  expect(brands.length).toBeGreaterThan(0);
  expect(brands.every((brand) => brand === 'NORTH & CO.')).toBe(true);
});

test('minimum rating filter excludes lower-rated products', async ({ page, pages }) => {
  await pages.home.open(); await pages.category.open('Women');
  await page.getByLabel('Minimum rating').selectOption('4.5');
  const ratings = await page.locator('.card').evaluateAll((cards) => cards.map((card) => Number(card.getAttribute('data-rating'))));
  expect(ratings.length).toBeGreaterThan(0);
  expect(ratings.every((rating) => rating >= 4.5)).toBe(true);
  await page.getByLabel('Sort products').selectOption('rating');
  const sorted = await page.locator('.card').evaluateAll((cards) => cards.map((card) => Number(card.getAttribute('data-rating'))));
  expect(sorted).toEqual([...sorted].sort((a, b) => b - a));
});

test('discount filter shows only products meeting the selected discount', async ({ page, pages }) => {
  await pages.home.open(); await pages.category.open('Women');
  await page.getByLabel('Minimum discount').selectOption('40');
  const discounts = await page.locator('.card').evaluateAll((cards) => cards.map((card) => Number(card.getAttribute('data-discount'))));
  expect(discounts.length).toBeGreaterThan(0);
  expect(discounts.every((discount) => discount >= 40)).toBe(true);
});

test('adding the same size twice increments one cart row', async ({ page, pages }) => {
  await pages.home.open(); await pages.product.openFirst();
  await pages.product.selectSize('M'); await pages.product.addToBag();
  await page.goto('/#home'); await pages.product.openFirst();
  await pages.product.selectSize('M'); await pages.product.addToBag();
  await expect(page.locator('.cart-item')).toHaveCount(1);
  await expect(page.locator('.cart-item')).toContainText('2');
});

test('different sizes are kept as separate cart rows', async ({ page, pages }) => {
  await pages.home.open(); await pages.product.openFirst();
  await pages.product.selectSize('S'); await pages.product.addToBag();
  await page.goto('/#home'); await pages.product.openFirst();
  await pages.product.selectSize('M'); await pages.product.addToBag();
  await expect(page.locator('.cart-item')).toHaveCount(2);
});

test('cart quantity cannot decrease below one', async ({ page, pages }) => {
  await pages.home.open(); await pages.product.openFirst();
  await pages.product.selectSize('M'); await pages.product.addToBag();
  await page.getByRole('button', { name: 'Decrease quantity' }).click();
  await expect(page.locator('.qty span')).toHaveText('1');
});

test('free delivery is applied once subtotal reaches the threshold', async ({ page, pages }) => {
  await pages.home.open(); await pages.product.openFirst();
  await pages.product.selectSize('M'); await pages.product.addToBag();
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.locator('.summary')).toContainText('FREE');
});

test('registration creates a persisted mock profile', async ({ page, pages }) => {
  await pages.home.open(); await pages.login.open();
  await page.getByRole('button', { name: /Create an account/ }).click();
  await page.getByLabel('Full name').fill('Jamie Taylor');
  await page.getByLabel('Email address').fill('jamie@example.com');
  await page.getByLabel('Password', { exact: true }).fill('shopping123');
  await page.getByLabel('Confirm password', { exact: true }).fill('shopping123');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByText(/Signed in as Jamie Taylor/)).toBeVisible();
  await page.reload(); await expect(page.getByText(/Signed in as Jamie Taylor/)).toBeVisible();
});

test('registration rejects mismatched passwords', async ({ page, pages }) => {
  await pages.home.open(); await pages.login.open();
  await page.getByRole('button', { name: /Create an account/ }).click();
  await page.getByLabel('Full name').fill('Jamie Taylor');
  await page.getByLabel('Email address').fill('jamie@example.com');
  await page.getByLabel('Password', { exact: true }).fill('shopping123');
  await page.getByLabel('Confirm password', { exact: true }).fill('different123');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('status')).toContainText('Passwords do not match');
});

test('registered demo account can sign out and sign back in after refresh', async ({ page, pages }) => {
  await pages.home.open(); await pages.login.open();
  await page.getByRole('button', { name: /Create an account/ }).click();
  await page.getByLabel('Full name').fill('Casey Demo');
  await page.getByLabel('Email address').fill('casey.demo@example.com');
  await page.getByLabel('Password', { exact: true }).fill('fashion123');
  await page.getByLabel('Confirm password', { exact: true }).fill('fashion123');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByText(/Signed in as Casey Demo/)).toBeVisible();
  await page.reload(); await expect(page.getByText(/Signed in as Casey Demo/)).toBeVisible();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByLabel('Email address').fill('casey.demo@example.com');
  await page.getByLabel('Password', { exact: true }).fill('fashion123');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText(/Signed in as Casey Demo/)).toBeVisible();
});

test('login enforces the minimum password length', async ({ page, pages }) => {
  await pages.home.open(); await pages.login.open();
  await page.getByLabel('Email address').fill('alex@example.com');
  await page.getByLabel('Password').fill('1234567');
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(await page.getByLabel('Password').evaluate((el: HTMLInputElement) => el.validity.tooShort)).toBe(true);
});

test('checkout rejects a short delivery address', async ({ page, pages }) => {
  await pages.home.open(); await pages.product.openFirst();
  await pages.product.selectSize('M'); await pages.product.addToBag(); await pages.cart.checkout();
  await pages.checkout.fill(); await page.getByLabel('Address', { exact: true }).fill('Short');
  await pages.checkout.place();
  expect(await page.getByLabel('Address', { exact: true }).evaluate((el: HTMLInputElement) => el.validity.tooShort)).toBe(true);
});

test('checkout rejects malformed email addresses', async ({ page, pages }) => {
  await pages.home.open(); await pages.product.openFirst();
  await pages.product.selectSize('M'); await pages.product.addToBag(); await pages.cart.checkout();
  await page.getByLabel('Full name').fill('Alex Morgan');
  await page.getByLabel('Phone number').fill('9876543210');
  await page.getByLabel('Email address').fill('invalid-email');
  await page.getByLabel('Address', { exact: true }).fill('14 Park Street, Central District');
  await page.getByLabel('City').fill('Pune'); await page.getByLabel('PIN code').fill('411001');
  await pages.checkout.place();
  expect(await page.getByLabel('Email address').evaluate((el: HTMLInputElement) => el.validity.typeMismatch)).toBe(true);
});

test('mobile category menu can be opened and closed without navigation', async ({ page, pages }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await pages.home.open();
  const menu = page.getByRole('button', { name: 'Open categories' });
  await menu.click(); await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await menu.click(); await expect(page.getByRole('navigation', { name: 'Mobile categories' })).toHaveCount(0);
});

test('wishlist heart exposes whether an item is saved', async ({ page, pages }) => {
  await pages.home.open();
  const heart = page.getByRole('button', { name: 'Add Relaxed Cotton Overshirt to wishlist' });
  await heart.click();
  await expect(page.getByRole('button', { name: 'Add Relaxed Cotton Overshirt to wishlist' }).first()).toHaveClass(/active/);
});

test('full catalog is available and product descriptions are shown', async ({ page, pages }) => {
  await pages.home.open(); await pages.search.search('');
  await expect(page.locator('.card')).toHaveCount(60);
  await pages.product.openFirst();
  await expect(page.locator('.product-info > p').last()).not.toBeEmpty();
});
