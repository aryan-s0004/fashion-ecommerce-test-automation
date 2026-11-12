# Myntra E-Commerce Website Test Automation Using Playwright and TypeScript

**Myntra-Inspired E-Commerce Website with Automated Regression Testing**

A locally developed demonstration storefront inspired by Myntra. It is not the production website and is not affiliated with Myntra. The React/Vite app uses a local JSON catalog and LocalStorage; account and checkout flows are mock demonstrations with no real payment or backend. The automated tests validate this local demo application, not the public Myntra storefront.

## Start

Requires Node.js 20 or newer. Install dependencies with `npm install`. Install Google Chrome and Microsoft Edge for the headed demo. Then run:

```powershell
npm run dev
npm run build
npm run demo
```

`npm run demo` starts Vite once, checks for installed real Chrome and Edge, runs one visible 28-step journey in a single browser session per browser, saves one complete video per browser, then runs the all 59 isolated regression tests in each browser headlessly. It exits with a nonzero status if a demo or regression test fails. The app is available at `http://127.0.0.1:4173` during automation.

## Commands

| Command | Purpose |
|---|---|
| `npm install` | Install app and Playwright dependencies |
| `npm run dev` | Start Vite for local browsing |
| `npm run build` | Create production assets in `dist/` |
| `npm run typecheck` | Check TypeScript test and Playwright configuration types |
| `npm run test` | Run the configured Chrome and Edge projects headlessly |
| `npm run test:headed` | Run the Chrome suite with a visible browser |
| `npm run test:chrome` | Run real Google Chrome headed |
| `npm run test:edge` | Run real Microsoft Edge headed |
| `npm run test:regression` | Run the end-to-end regression journey |
| `npm run test:smoke` | Run homepage and navigation smoke checks |
| `npm run report` | Open the most recent Playwright HTML report |
| `npm run demo` | Run full headed Chrome and Edge demonstrations with video evidence |

Install Firefox and WebKit engines using `npx playwright install firefox webkit`, then set `EXTRA_BROWSERS=1` when invoking Playwright to include those optional projects.

Demo account: `demo@myntra.com` / `myntra123`. Catalog: [src/products.json](src/products.json). Test case inventory: [docs/TEST_CASES.md](docs/TEST_CASES.md).

## Evidence and results

The demo creates `test-results/demo-results-chrome.json`, `test-results/demo-results-edge.json`, `test-results/results.json`, and `test-results/demo-summary.json`. Browser demo reports are in `playwright-report/demo-chrome/` and `playwright-report/demo-edge/`; the full regression report is `playwright-report/index.html`. Complete recordings are `test-results/demo-videos/myntra-full-demo-chrome.webm` and `test-results/demo-videos/myntra-full-demo-edge.webm`. Failure screenshots and traces stay in their Playwright artifact folders. Reports contain actual runs; no results are prefilled.
