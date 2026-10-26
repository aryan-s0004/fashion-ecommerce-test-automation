# Limitations

- In the latest full run (20 test executions), desktop Chromium navigation to Myntra failed with `net::ERR_HTTP2_PROTOCOL_ERROR` for all five cases. Firefox and WebKit passed all five; mobile Chromium passed homepage and empty-bag checks.
- In the latest full run, the three mobile search checks could not locate an accessible textbox. The captured mobile snapshot exposed a clickable `SEARCH_BAR` generic instead; the mobile search interaction remains unverified.
- Desktop search was observed in the integrated browser: submitting “women kurta” reached `/women-kurta?rawQuery=women%20kurta`. This does not eliminate live-site or browser variability.
- No category browsing, product details, filters, sorting, shopping-bag mutation, responsive-specific assertions, accessibility audit, visual snapshots, or account scenarios have been verified.
- No production defect is claimed. Do not bypass network/site restrictions or bot protections.
- Manual sign-in setup saves browser storage state locally, but it has not been exercised with a personal account. No authenticated test results are claimed.
