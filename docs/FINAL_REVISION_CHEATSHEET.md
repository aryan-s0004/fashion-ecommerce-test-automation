# Final Revision Cheatsheet

## Project facts to memorize

- **Target:** Real public Myntra storefront; this repository is the automation, not the application.
- **Stack:** Playwright Test 1.56.1, TypeScript 5.9.3, npm, GitHub Actions.
- **Unique cases:** 27 definitions in 12 spec files.
- **Projects configured:** Chromium desktop, Firefox desktop, WebKit desktop, Chromium mobile emulation.
- **Latest full run:** Firefox, 27 discovered / 26 executed / 20 passed / 6 failed / 1 skipped.
- **Separate all-project smoke:** 8 executions / 5 passed / 3 failed.
- **Confirmed Myntra production defects:** None.
- **Do not claim:** Sorting automation, full accessibility, all-browser regression success, full website coverage, payment testing, or 95+/100 achievement.

## Commands

```powershell
npm run preflight
npx playwright test --list
npm run typecheck
npm run test:smoke
npx playwright test --project=firefox-desktop --workers=1
npm run report:summary
npm run verify:demo
```

`npm run verify:demo` checks demo prerequisites; it does not execute a browser test.

## Ten key definitions

- **Verification:** Check work products against requirements.
- **Validation:** Check actual behavior against user needs.
- **Test case:** Preconditions, data, steps, oracle, and result.
- **Scenario:** High-level behavior under test.
- **Regression:** Recheck existing behavior after a change.
- **Equivalence partition:** Inputs expected to behave alike.
- **Boundary value analysis:** Test values at input limits.
- **Severity:** Defect impact.
- **Priority:** Fix urgency.
- **Traceability:** Requirement-to-test-to-result linkage.

## What to say about current failures

- **Chromium `ERR_HTTP2_PROTOCOL_ERROR`:** Navigation/transport failure; not a confirmed product defect.
- **Mobile search:** The current desktop input locator did not match the mobile control; mobile interaction is unverified.
- **Image alt:** A sample assertion failed; inspect whether images are informative or decorative before filing a product defect.
- **Overflow:** Observed at 360, 390, and 768 widths once in Firefox; repeat and identify the overflowing element.
- **Long query:** Page creation timed out before the assertion; search behavior is unverified.
- **Authentication:** One test was skipped because local state was unavailable; OTP/CAPTCHA are human-only.

## Safety and evidence

- Never place orders/payments, bypass CAPTCHA, automate OTP, or reveal storage-state files.
- A configured browser is not a passing browser.
- A test listing is not an execution.
- A historical report is not a current run.
- Use [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md), [FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md](FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md), and [FINAL_DEMONSTRATION_GUIDE.md](FINAL_DEMONSTRATION_GUIDE.md) as references.
