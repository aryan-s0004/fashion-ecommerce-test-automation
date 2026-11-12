# Regression testing

The project has two test layers. The visible demonstration is one Playwright test per browser, with 28 named sequential steps on one page and one browser launch. The isolated regression suite keeps the 55 individual tests per browser and runs them headlessly after the visible demos.

Run `npm run demo` for both layers. It starts Vite once, checks for installed Google Chrome and Microsoft Edge, records one complete video per visible run, then produces the regression reports. For a single headless full suite, run `npm test`. Run `npm run test:chrome` or `npm run test:edge` to execute an individual headed browser suite; `npm run test:regression` runs the core end-to-end journey.

The final verified execution on 11 November 2026 passed both 28-step demos and all 118 isolated cross-browser tests (59 per browser). Check [EXECUTION_REPORT.md](EXECUTION_REPORT.md) for actual counts and evidence locations. HTML reports are generated from the test run; planned cases are never presented as executed results.
