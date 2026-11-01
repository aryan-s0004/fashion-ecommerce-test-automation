# Execution Report

**Target:** `https://www.myntra.com/`
**Execution date:** 2026-11-01 (timestamps below are UTC)
**Tooling:** Playwright Test 1.56.1, TypeScript 5.9.3

## Latest full Firefox run

- Command: `npx playwright test --project=firefox-desktop --workers=1`
- Started: `2026-11-01T13:36:17.720Z`
- Duration: 349.86 seconds
- Discovered: 27; executed: 26
- Passed: 20; failed: 6; skipped: 1
- Flaky/retries: 0/0
- Skipped: Authenticated shopping flow; local authentication state was not available.
- Failures: sampled image-alt assertion; category-menu locator; overflow checks at 360×640, 390×844, and 768×1024; `SEARCH-010` page setup timed out before its query assertion.

## Latest all-project smoke run

- Command: `npm run test:smoke`
- Started: `2026-11-01T13:33:30.458Z`
- Duration: 92.91 seconds
- Executions: 8; passed: 5; failed: 3; skipped/flaky/retries: 0/0/0.
- Firefox desktop: 2 passed; WebKit desktop: 2 passed.
- Chromium desktop: 2 navigation failures with `net::ERR_HTTP2_PROTOCOL_ERROR`.
- Chromium mobile: 1 passed and 1 failed because the desktop search-input locator was not visible.

These are separate runs and their counts must not be added together. The full run was only Firefox; the smoke run covered all four configured projects.

## Verification and CI

- `npm run typecheck`: passed.
- `npx playwright test --list`: passed; 27 unique definitions in 12 spec files, or 108 project-specific listings.
- `npm run preflight`: 11 passed, 0 failed.
- `npm run verify:demo`: 6 passed, 0 failed. This checks prerequisites, not live browser behavior.
- Latest visible GitHub Actions run (2026-10-28, commit `abbd54a`): typecheck passed; live-smoke was skipped because the event was a push.

## Classification

The HTTP/2 error is a navigation/network blocker, not a confirmed application defect. The mobile issue is a locator/UI-shape mismatch pending investigation. The image-alt and overflow failures are potential product observations requiring repeatability and manual inspection. The long-query case timed out during page setup, before validating query behavior. No Myntra production defect is confirmed.

The latest generated JSON/HTML report and failure screenshots/traces are local, generated artifacts. Regenerate them before another presentation; do not assume historical files remain.

For interpretation and current counts, see [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md) and [FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md](FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md).
