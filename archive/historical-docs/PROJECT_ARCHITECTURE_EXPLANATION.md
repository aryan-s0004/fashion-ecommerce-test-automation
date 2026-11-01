# Project Architecture Explanation

**System under test:** Public Myntra storefront  
**Automation stack:** Playwright Test, TypeScript, Node.js

## Scope

This repository is a black-box browser automation project; it is not the Myntra application. Current tests exercise selected homepage, navigation, search, product, bag, responsive, accessibility, and shopping-journey behaviors. The source-backed inventory is [TEST_CASES.md](TEST_CASES.md), and actual run evidence is in [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md).

## Structure and responsibilities

- `playwright.config.ts` defines test discovery, timeouts, retries/workers, reporters, failure artifacts, and four browser/device projects.
- `tests/` contains the executable Playwright test definitions.
- `pages/` contains page objects for common page interactions and locators.
- `tests/support/search.ts` contains shared search-field discovery helpers.
- `tests/shopping-journeys/category-journey.ts` shares category-to-product-to-bag journey logic and guarded cleanup.
- `scripts/` contains preflight, demo, authentication handoff, and report utilities.

Playwright fixtures provide per-test browser pages and contexts. Context isolation does not guarantee isolation of server-side account state, so bag-mutating journeys check preconditions and verify product identity before cleanup.

## Verification and limitations

The project uses strict TypeScript checking and Playwright's web-first assertions. Some live-site interactions depend on site-specific CSS selectors and can fail when the DOM changes. Four projects are configured, but the latest full test run covered Firefox only; the separate smoke run attempted all projects and had failures. Accessibility checks are limited and are not a WCAG audit. See [FINAL_PROJECT_AUDIT.md](FINAL_PROJECT_AUDIT.md) and [FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md](FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md).

Sorting and filter reset are not implemented in the current test suite. Claims in older drafts describing them as verified are withdrawn.
