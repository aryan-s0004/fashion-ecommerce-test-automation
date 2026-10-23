# Execution Report

## Actual browser checks

- Date: 2026-10-24 (client local date).
- Target: `https://www.myntra.com/`.
- Commands: initial `npm run test:chromium`; homepage-only runs with Firefox/WebKit and desktop/mobile Chromium projects.
- Playwright 1.56.1; Node.js v22.23.1; Windows; Chromium 141.0.7390.37 (build 1194).
- Homepage smoke checks executed: 5 total across separate runs, 3 passed, 2 failed, 0 skipped, 0 flaky.
- Firefox desktop: passed; direct read-only navigation returned HTTP 200 and the Myntra-branded page title.
- WebKit desktop: passed; direct read-only navigation returned HTTP 200 and the same title.
- Chromium mobile: passed response, title and non-empty body assertions.
- Chromium desktop: failed twice at navigation with `net::ERR_HTTP2_PROTOCOL_ERROR`, before receiving an HTTP response or checking page assertions.
- Search cases are implemented but not executed.
- Latest Playwright report (`reports/html/index.html`, `reports/results.json`) covers the desktop/mobile Chromium run: 1 passed, 1 failed. The separate Firefox/WebKit report was overwritten by the later run; its terminal output showed 2 passes. Failure screenshot, video and trace are under `test-results/`.

The desktop Chromium issue is browser/network-specific and is not evidence of a Myntra production defect.
