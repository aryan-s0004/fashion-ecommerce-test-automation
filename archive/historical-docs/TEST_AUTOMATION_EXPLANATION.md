# Test Automation Explanation

**Project:** Black-box Playwright automation for the public Myntra storefront  
**Stack:** Playwright Test, TypeScript, Node.js

## Architecture

- Playwright configuration defines the four browser/device projects, timeouts, worker/retry policy, reporters, and failure artifacts.
- Specs in `tests/` define the current 27 unique test cases across 12 files.
- Page objects in `pages/` encapsulate commonly used site locators and actions.
- Shared helpers support search-field discovery and category-to-bag journeys.
- Scripts provide preflight checks, demo readiness checks, authentication handoff, and report summarization.

Playwright creates isolated browser contexts for tests; this does not isolate remote server-side account state. Bag-changing journeys therefore check the bag precondition, verify the added item, and refuse cleanup if identity or count is unexpected.

## Browser and responsive coverage

Four projects are configured: Chromium desktop, Firefox desktop, WebKit desktop, and Chromium mobile emulation. The latest full run covered Firefox only. A separate smoke run attempted all four projects and recorded failures; project configuration is not proof of successful cross-browser regression.

The responsive specs measure overflow at four viewport sizes and check the empty-bag view at a mobile size. Three overflow assertions failed in the latest Firefox run. Mobile search did not match the desktop search-input locator in the smoke run; the mobile interaction needs a specific test.

## Test inputs and techniques

Current code includes normal/empty search, whitespace, Unicode, punctuation, and an 80-character query, plus a missing-size prompt, responsive measurements, empty-bag guidance, and four category-to-bag journeys. The long-query case timed out during page setup in the latest full run. Sorting, filter reset, pairwise combinations, suggestions, and zero-results behavior are not current executable coverage.

## Reporting and current evidence

The Playwright configuration writes list, HTML, and JSON reports and retains screenshots, videos, and traces on failure. Generated artifacts are run-specific and may be overwritten.

- Full Firefox run: 20 passed, 6 failed, 1 skipped.
- Separate all-project smoke run: 5 passed, 3 failed.
- TypeScript typecheck, preflight, demo readiness, and discovery passed.
- No Myntra production defect is confirmed.

For detailed outcomes and limitations, see [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md), [FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md](FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md), and [FINAL_PROJECT_AUDIT.md](FINAL_PROJECT_AUDIT.md).
