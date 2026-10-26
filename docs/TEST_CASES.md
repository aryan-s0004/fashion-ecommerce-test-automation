# Test Cases

Actual results below reflect the recorded execution only. Unexecuted cases are not passed.

| ID | Objective | Preconditions / automation | Expected result | Actual result / status | Priority | Evidence |
|---|---|---|---|---|---|---|
| MYN-HOME-001 | Verify homepage response and identity | Reachable public site; `tests/smoke/homepage.spec.ts` | HTTP <400, Myntra title, non-empty body | Latest full serial run: Firefox, WebKit and mobile Chromium passed; desktop Chromium failed at navigation with `ERR_HTTP2_PROTOCOL_ERROR` | P1 | `reports/results.json`; desktop failure artifacts under `test-results/` |
| MYN-SEARCH-001 | Verify search is visible/enabled | Homepage accessible; `tests/search/search.spec.ts` | Accessible search textbox visible and enabled | Latest full serial run: Firefox and WebKit passed; desktop Chromium failed before navigation; mobile Chromium did not expose a role-based textbox | P1 | Mobile failure screenshot, trace and video under `test-results/` |
| MYN-SEARCH-002 | Submit non-empty query | Homepage/search available; fill `women kurta`, Enter | Query-specific URL | Latest full serial run: Firefox and WebKit passed; desktop Chromium failed at navigation; mobile locator was not found. Integrated browser reconnaissance confirmed result URL `/women-kurta?rawQuery=women%20kurta` and “Women Kurta” title | P1 | `reports/results.json`; browser observation recorded in `docs/EXECUTION_REPORT.md` |
| MYN-SEARCH-003 | Empty query boundary | Homepage/search available; Enter empty input | URL remains unchanged | Latest full serial run: Firefox and WebKit passed; desktop Chromium failed at navigation; mobile locator was not found | P2 | `reports/results.json`; failure artifacts under `test-results/` |
