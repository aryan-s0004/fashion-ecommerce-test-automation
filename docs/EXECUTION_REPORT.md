# Execution Report

## Actual browser checks

- Date: 2026-10-27 (client local date).
- Target: `https://www.myntra.com/`.
- Playwright 1.56.1; Node.js v22.23.1; Windows.
- `npm run typecheck` passed.
- Focused search run (`npx playwright test tests/search/search.spec.ts --workers=1`): 6 passed, 6 failed. Firefox and WebKit passed all three search cases. Desktop Chromium failed all three at homepage navigation with `net::ERR_HTTP2_PROTOCOL_ERROR`; mobile Chromium loaded the page but the role-based textbox locator did not match the observed mobile search bar.
- Latest full serial run (`npx playwright test --workers=1`): 9 passed, 7 failed across 16 cases. Firefox and WebKit passed all four cases each. Mobile Chromium passed the homepage check but failed all three search cases because the search bar was exposed as a generic clickable banner rather than a textbox. Desktop Chromium failed all four checks at homepage navigation with `net::ERR_HTTP2_PROTOCOL_ERROR`.
- Live browser reconnaissance observed the desktop textbox named “Search for products, brands and more”. Submitting “women kurta” navigated to `/women-kurta?rawQuery=women%20kurta` and displayed the “Women Kurta” page title and heading. Search assertions remain live-site checks, not stable guarantees.
- The mobile screenshot shows a visually rendered search banner, but the banner is not exposed as a textbox. No search interaction was claimed as validated on mobile.
- A first default-parallel run selected 10 workers and ended with a Node.js out-of-memory crash. Local Playwright execution now defaults to one worker; CI remains configured for two.
- The latest full-run HTML and JSON reports are under `reports/`; failure screenshots, videos and traces are under `test-results/` (ignored by Git).

These are live-site/browser/network blockers and a mobile locator mismatch, not confirmed Myntra production defects. Search visibility and query navigation passed in Firefox and WebKit during both focused and full runs; the integrated browser also confirmed one desktop search flow. Repeat when the site and network are stable.
