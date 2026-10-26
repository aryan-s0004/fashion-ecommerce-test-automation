import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { chromium } from '@playwright/test';

const baseURL = process.env.MYNTRA_BASE_URL ?? 'https://www.myntra.com/';
const storageStatePath = resolve('playwright', '.auth', 'myntra.json');
const browser = await chromium.launch({ headless: false });

try {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

  console.log('Sign in manually in the browser window. Enter passwords and OTPs only on Myntra.');
  const prompt = createInterface({ input: stdin, output: stdout });
  try {
    await prompt.question('After sign-in is complete, press Enter here to save local browser state: ');
  } finally {
    prompt.close();
  }

  await mkdir(dirname(storageStatePath), { recursive: true });
  await context.storageState({ path: storageStatePath });
  console.log(`Saved browser state locally to ${storageStatePath}. Keep this file private.`);
} finally {
  await browser.close();
}
