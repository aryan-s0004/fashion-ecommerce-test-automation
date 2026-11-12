import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { test, expect } from '@playwright/test';

const rupees = '2,998';

test('Myntra full visible demonstration: 28 sequential QA scenarios', async ({ page }, testInfo) => {
  test.setTimeout(10 * 60 * 1000);
  const browserName = testInfo.project.name === 'edge' ? 'Edge' : 'Chrome';
  const failures: string[] = [];
  const screenshotDir = path.resolve('test-results', 'screenshots', 'demo', browserName.toLowerCase());
  await mkdir(screenshotDir, { recursive: true });
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.addInitScript((activeBrowser: string) => {
    const storageKey = 'myntra-demo-status';
    const draw = () => {
      if (!document.body) return;
      const value = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
      let panel = document.getElementById('myntra-demo-panel');
      if (!panel) {
        panel = document.createElement('aside');
        panel.id = 'myntra-demo-panel';
        panel.setAttribute('aria-label', 'Automated testing demonstration status');
        document.body.append(panel);
      }
      panel.style.cssText = 'position:fixed;z-index:2147483647;right:16px;bottom:16px;width:310px;padding:14px 16px;background:#20201e;color:#fff;border-left:4px solid #ff3f6c;border-radius:10px;box-shadow:0 8px 28px #0004;font:12px/1.5 Arial,sans-serif;pointer-events:none;white-space:pre-line;';
      const caseId = `TC_${String(value.module || 'START').toUpperCase().replace(/[^A-Z0-9]+/g, '_')}_${String(value.progress || 0).padStart(2, '0')}`;
      panel.textContent = `Myntra | Automated Testing\nBrowser: ${activeBrowser}\nModule: ${value.module || 'Starting'}\nTest case: ${caseId}\nScenario: ${value.scenario || 'Preparing browser'}\nExpected: ${value.expected || 'Application state matches the scenario'}\nActual: ${value.status === 'PASSED' ? 'Assertions passed' : value.status === 'FAILED' ? 'Assertion failed' : 'Checking current state'}\nStatus: ${value.status || 'Running'}\nProgress: ${value.progress || 0} / 28\nCompleted: ${value.completed || 'None yet'}`;
    };
    (window as any).__myntraDemoUpdate = (value: unknown) => {
      sessionStorage.setItem(storageKey, JSON.stringify(value));
      draw();
    };
    document.addEventListener('DOMContentLoaded', draw);
  }, browserName);

  const show = async (n: number, moduleName: string, scenario: string, status = 'RUNNING') => {
    const progress = `${String(n).padStart(2, '0')}/28`;
    if (status === 'RUNNING') console.log(`[${progress}] ${scenario}`);
    if (page.isClosed()) return;
    await page.evaluate(({ n, moduleName, scenario, status }) => {
      (window as any).__myntraDemoUpdate?.({ progress: n, module: moduleName, scenario, status, expected: `Verify: ${scenario}`, completed: `${Math.max(0, n - (status === 'RUNNING' ? 1 : 0))} scenarios` });
    }, { n, moduleName, scenario, status });
  };

  const step = async (n: number, moduleName: string, scenario: string, action: () => Promise<void>) => {
    await show(n, moduleName, scenario);
    try {
      await test.step(`[${String(n).padStart(2, '0')}/28] ${scenario}`, action);
      await show(n, moduleName, scenario, 'PASSED');
    } catch (error) {
      failures.push(`${n}. ${scenario}: ${error instanceof Error ? error.message : String(error)}`);
      await show(n, moduleName, scenario, 'FAILED');
      const screenshot = path.join(screenshotDir, `${String(n).padStart(2, '0')}-${scenario.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`);
      await page.screenshot({ path: screenshot, fullPage: true }).catch(() => undefined);
      console.error(`[${String(n).padStart(2, '0')}/28] FAILED: ${failures[failures.length - 1]} | Screenshot: ${screenshot}`);
      if (n < 28) await page.goto('/#home').catch(() => undefined);
    }
    // Give the viewer time to read the status panel and see the result before
    // the next scenario changes the page.
    if (n < 28) await page.waitForTimeout(3000);
  };

  await step(1, 'Homepage', 'Launch Myntra homepage', async () => {
    await page.goto('/#home');
    await expect(page).toHaveTitle('Myntra');
    await expect(page.locator('#myntra-demo-panel')).toContainText('Browser: ' + browserName);
  });
  await step(2, 'Homepage', 'Verify homepage elements', async () => {
    await expect(page.getByRole('heading', { name: /Wear your own story/i })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Shop categories' })).toBeVisible();
    await expect(page.locator('.featured .card')).toHaveCount(4);
  });
  await step(3, 'Navigation', 'Test category navigation links', async () => {
    await page.getByRole('banner').getByRole('button', { name: 'Accessories', exact: true }).click();
    await expect(page.locator('.listing h2')).toContainText('Accessories');
    await expect(page.locator('.card').first()).toBeVisible();
  });
  await step(4, 'Categories', 'Test Men category', async () => {
    await page.getByRole('banner').getByRole('button', { name: 'Men', exact: true }).click();
    await expect(page.locator('.listing h2')).toContainText('Men');
    expect(await page.locator('.card').count()).toBeGreaterThan(0);
  });
  await step(5, 'Categories', 'Test Women category', async () => {
    await page.getByRole('banner').getByRole('button', { name: 'Women', exact: true }).click();
    await expect(page.locator('.listing h2')).toContainText('Women');
    expect(await page.locator('.card').count()).toBeGreaterThan(0);
  });
  await step(6, 'Categories', 'Test Kids category', async () => {
    await page.getByRole('banner').getByRole('button', { name: 'Kids', exact: true }).click();
    await expect(page.locator('.listing h2')).toContainText('Kids');
    expect(await page.locator('.card').count()).toBeGreaterThan(0);
  });
  await step(7, 'Search', 'Search for a known product', async () => {
    for (const [keyword, expected] of [['Relaxed Cotton', 'Relaxed Cotton Overshirt'], ['NORTH & CO.', 'NORTH & CO.'], ['Classic Straight Jeans', 'Classic Straight Jeans']] as const) {
      await page.getByLabel('Search products').fill(keyword);
      await page.getByRole('button', { name: 'Submit search' }).click();
      await expect(page.locator('.card').first()).toContainText(expected);
    }
  });
  await step(8, 'Search', 'Test empty and whitespace search edge cases', async () => {
    await page.getByLabel('Search products').fill('no-such-product-xyz');
    await page.getByRole('button', { name: 'Submit search' }).click();
    await expect(page.locator('.empty')).toBeVisible();
    await page.getByLabel('Search products').fill('   ');
    await page.getByRole('button', { name: 'Submit search' }).click();
    await expect(page.locator('.card')).toHaveCount(60);
  });
  await step(9, 'Product details', 'Open product details', async () => {
    await page.getByLabel('Search products').fill('Relaxed Cotton');
    await page.getByRole('button', { name: 'Submit search' }).click();
    await page.locator('.card .card-info').first().click();
    await expect(page.getByRole('heading', { name: 'Relaxed Cotton Overshirt' })).toBeVisible();
  });
  await step(10, 'Product details', 'Select a product size', async () => {
    await page.getByRole('button', { name: 'M', exact: true }).click();
    await expect(page.getByRole('button', { name: 'M', exact: true })).toHaveAttribute('aria-pressed', 'true');
  });
  await step(11, 'Shopping cart', 'Add the selected product to cart', async () => {
    await page.getByRole('button', { name: /Add to bag/ }).click();
    await expect(page.locator('.cart-item')).toHaveCount(1);
  });
  await step(12, 'Shopping cart', 'Verify cart product and size', async () => {
    await expect(page.locator('.cart-item')).toContainText('Relaxed Cotton Overshirt');
    await expect(page.locator('.cart-item')).toContainText('Size: M');
  });
  await step(13, 'Shopping cart', 'Update cart quantity', async () => {
    await page.getByRole('button', { name: 'Increase quantity' }).click();
    await expect(page.locator('.qty span')).toHaveText('2');
  });
  await step(14, 'Shopping cart', 'Verify subtotal and delivery calculation', async () => {
    await expect(page.locator('.summary')).toContainText(rupees);
    await expect(page.locator('.summary')).toContainText('FREE');
  });
  await step(15, 'Shopping cart', 'Remove the cart item', async () => {
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByText(/taking a little breather/i)).toBeVisible();
  });
  await step(16, 'Wishlist', 'Add a product to wishlist', async () => {
    await page.getByRole('banner').getByRole('link', { name: /myntra/i }).click();
    await page.getByRole('button', { name: 'Add Relaxed Cotton Overshirt to wishlist' }).first().click();
    await page.getByRole('banner').getByRole('button', { name: 'Wishlist' }).click();
    await expect(page.locator('.card')).toHaveCount(1);
  });
  await step(17, 'Wishlist', 'Remove a product from wishlist', async () => {
    await page.getByRole('button', { name: 'Add Relaxed Cotton Overshirt to wishlist' }).click();
    await expect(page.locator('.card')).toHaveCount(0);
    await expect(page.locator('.empty-state')).toBeVisible();
  });
  await step(18, 'Persistence', 'Verify cart survives a page refresh', async () => {
    await page.getByRole('banner').getByRole('link', { name: /myntra/i }).click();
    await page.locator('.featured .card .card-info').first().click();
    await page.getByRole('button', { name: 'M', exact: true }).click();
    await page.getByRole('button', { name: /Add to bag/ }).click();
    await page.reload();
    await expect(page.locator('.cart-item')).toHaveCount(1);
  });
  await step(19, 'Authentication', 'Test login form validation', async () => {
    await page.getByRole('banner').getByRole('button', { name: 'Profile' }).click();
    await expect(page.getByLabel('Email address')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute('required', '');
    await page.getByLabel('Email address').fill('wrong@example.com');
    await page.getByLabel('Password', { exact: true }).fill('incorrect123');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('status')).toContainText(/did not match/i);
  });
  await step(20, 'Authentication', 'Test registration validation', async () => {
    await page.getByRole('button', { name: /Create an account/ }).click();
    await page.getByLabel('Full name').fill('Jamie Taylor');
    await page.getByLabel('Email address').fill('jamie@example.com');
    await page.getByLabel('Password', { exact: true }).fill('shopping123');
    await page.getByLabel('Confirm password', { exact: true }).fill('different123');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByRole('status')).toContainText('Passwords do not match');
    await page.getByLabel('Confirm password', { exact: true }).fill('shopping123');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByText(/Signed in as Jamie Taylor/)).toBeVisible();
    await page.reload();
    await expect(page.getByText(/Signed in as Jamie Taylor/)).toBeVisible();
    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await page.getByLabel('Email address').fill('jamie@example.com');
    await page.getByLabel('Password', { exact: true }).fill('shopping123');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText(/Signed in as Jamie Taylor/)).toBeVisible();
  });
  await step(21, 'Checkout', 'Test required fields and phone boundary', async () => {
    await page.getByRole('banner').getByRole('button', { name: 'Shopping bag' }).click();
    await page.getByRole('button', { name: /Continue to checkout/ }).click();
    await page.getByLabel('Phone number').fill('123456789');
    await page.getByRole('button', { name: /Place demo order/ }).click();
    await expect(page.getByLabel('Full name')).toHaveAttribute('required', '');
    const invalidPhone = await page.getByLabel('Phone number').evaluate((input: HTMLInputElement) => input.validity.patternMismatch);
    expect(invalidPhone).toBe(true);
  });
  await step(22, 'Checkout', 'Complete the mock checkout form', async () => {
    await page.getByLabel('Full name').fill('Alex Morgan');
    await page.getByLabel('Phone number').fill('9876543210');
    await page.getByLabel('Email address').fill('alex@example.com');
    await page.getByLabel('Address', { exact: true }).fill('14 Park Street, Central District');
    await page.getByLabel('City').fill('Pune');
    await page.getByLabel('PIN code').fill('411001');
    await page.getByRole('button', { name: /Place demo order/ }).click();
    await expect(page.getByRole('heading', { name: /It.s official/i })).toBeVisible();
  });
  await step(23, 'Checkout', 'Verify order confirmation and payment notice', async () => {
    await expect(page.getByText(/TL-2026-1042/)).toBeVisible();
    await expect(page.getByText(/no payment has been taken/i)).toBeVisible();
  });
  await step(24, 'Responsive design', 'Check mobile layout and navigation', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#home');
    const width = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(width).toBeLessThanOrEqual(1);
    const menu = page.getByRole('button', { name: 'Open categories' });
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('navigation', { name: 'Mobile categories' }).getByRole('button', { name: 'Kids' }).click();
    await expect(page.locator('.listing h2')).toContainText('Kids');
  });
  await step(25, 'Responsive design', 'Check tablet layout', async () => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/#home');
    await expect(page.locator('.hero')).toBeVisible();
    const width = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(width).toBeLessThanOrEqual(1);
  });
  await step(26, 'Responsive design', 'Check desktop layout', async () => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/#home');
    await expect(page.getByRole('navigation', { name: 'Shop categories' })).toBeVisible();
    const width = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(width).toBeLessThanOrEqual(1);
  });
  await step(27, 'Regression checks', 'Run final branding, search, and category assertions', async () => {
    await expect(page).toHaveTitle('Myntra');
    await page.getByLabel('Search products').fill('NORTH');
    await page.getByRole('button', { name: 'Submit search' }).click();
    await expect(page.locator('.card').first()).toContainText('NORTH');
    await page.getByRole('banner').getByRole('button', { name: 'Women', exact: true }).click();
    await expect(page.locator('.listing h2')).toContainText('Women');
  });
  await show(28, 'Execution summary', 'Display final execution summary', failures.length ? 'FAILED' : 'PASSED');
  await test.step('[28/28] Display final execution summary', async () => {
    console.log(`[28/28] Final summary for ${browserName}: 28 scenarios, ${28 - failures.length} passed, ${failures.length} failed.`);
    if (failures.length) console.error(failures.join('\n'));
    expect(failures, failures.join('\n')).toHaveLength(0);
  });
  // Leave the finished summary visible before Playwright closes this browser.
  await page.waitForTimeout(10000);
});
