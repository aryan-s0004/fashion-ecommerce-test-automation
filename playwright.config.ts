import { defineConfig, devices } from '@playwright/test';

const demo = process.env.DEMO === '1';
const projectFilter = process.env.DEMO_PROJECT;
const reportDir = process.env.REPORT_DIR || 'playwright-report';
const jsonPath = process.env.JSON_PATH || 'test-results/results.json';
const sharedUse = {
  ...devices['Desktop Chrome'],
  baseURL: 'http://127.0.0.1:4173',
  headless: !demo,
  screenshot: 'only-on-failure' as const,
  video: demo ? 'on' as const : 'retain-on-failure' as const,
  trace: 'retain-on-failure' as const,
  // Keep the visible demo readable while Playwright performs each interaction.
  launchOptions: demo ? { slowMo: 1000 } : undefined,
};

export default defineConfig({
  testDir: './tests',
  testIgnore: demo ? [] : ['tests/demo/**'],
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  expect: { timeout: 8000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: reportDir, open: 'never', title: 'Myntra — Automated Regression Testing' }],
    ['json', { outputFile: jsonPath }],
  ],
  outputDir: process.env.OUTPUT_DIR || 'test-results/artifacts',
  use: sharedUse,
  projects: [
    { name: 'chrome', use: { ...sharedUse, channel: 'chrome' } },
    { name: 'edge', use: { ...sharedUse, channel: 'msedge' } },
    ...(process.env.EXTRA_BROWSERS === '1' ? [
      { name: 'firefox', use: { ...devices['Desktop Firefox'], ...sharedUse, browserName: 'firefox' as const } },
      { name: 'webkit', use: { ...devices['Desktop Safari'], ...sharedUse, browserName: 'webkit' as const } },
    ] : []),
  ].filter((project) => !projectFilter || project.name === projectFilter),
  webServer: process.env.DEMO_SERVER_EXTERNAL === '1' ? undefined : {
    command: 'npm run dev -- --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 30000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
