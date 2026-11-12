# Myntra examiner demonstration guide

1. Install Node.js 20+, Google Chrome, and Microsoft Edge; run `npm install` once.
2. Run `npm run demo`.
3. Watch the site start once at `http://127.0.0.1:4173/`.
4. Chrome opens once with one tab. A status overlay identifies the browser, module, scenario, test case, expected and actual result, status, and progress. The terminal prints `[01/28]` through `[28/28]` as the page performs real interactions and assertions.
5. Chrome closes after its 28-step journey. Edge then opens once and performs the same journey in one tab.
6. Both browsers close after their demonstration. The 59-test-per-browser suite then runs headlessly in each browser so the visible demonstration is not fragmented into per-test windows.
7. Review the HTML report and video evidence listed below.

The application is a local Myntra-inspired clone for demonstration, not the production Myntra website. Demo login is `demo@myntra.com` / `myntra123`. Checkout is simulated; no payment is taken.

## Modules shown

Homepage and branding, navigation, Men/Women/Kids categories, product search and edge cases, product details and size selection, cart and calculations, wishlist, refresh persistence, login and registration validation, checkout validation and order confirmation, mobile/tablet/desktop responsive layouts, and final regression assertions.

## Evidence

- Complete Chrome video: `test-results/demo-videos/myntra-full-demo-chrome.webm`.
- Complete Edge video: `test-results/demo-videos/myntra-full-demo-edge.webm`.
- Demo reports: `playwright-report/demo-chrome/` and `playwright-report/demo-edge/`.
- Full regression report: `playwright-report/index.html`.
- Combined summary: `test-results/demo-summary.json`; regression JSON: `test-results/results.json`.
- Playwright captures screenshots and traces for failures. The successful final regression run had no failed tests, so it generated no failure screenshots or traces.

Both final videos were decoded with Playwright's current FFmpeg build to verify they can be read. Chrome/Edge detection checks for real installed browsers and never substitutes bundled Chromium.
