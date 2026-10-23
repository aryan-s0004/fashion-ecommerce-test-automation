# Execution Report

## Actual run

- Date: 2026-10-24 (client local date).
- Target: `https://www.myntra.com/`.
- Command: `npm run test:chromium`.
- Playwright: 1.56.1; Node.js v22.23.1; Windows; Chromium 141.0.7390.37 (build 1194).
- Executed: 1 test, 0 passed, 1 failed, 0 skipped, 0 flaky.
- Failure: `page.goto('/')` raised `net::ERR_HTTP2_PROTOCOL_ERROR` before an HTTP response or page assertions.
- Browser coverage: Chromium desktop executed. Firefox, WebKit and mobile Chromium are configured but not executed.
- Reports: `reports/html/index.html` and `reports/results.json` were generated. Screenshot, video and trace are present under the matching `test-results/` case folder.

The failure is an environment/network blocker, not evidence of a Myntra production defect. Three search tests are implemented but not run.
