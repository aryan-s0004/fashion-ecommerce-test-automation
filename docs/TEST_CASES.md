# Test Cases

Actual results below reflect the recorded execution only. Unexecuted cases are not passed.

| ID | Objective | Preconditions / automation | Expected result | Actual result / status | Priority | Evidence |
|---|---|---|---|---|---|---|
| MYN-HOME-001 | Verify homepage response and identity | Reachable public site; `tests/smoke/homepage.spec.ts` | HTTP <400, Myntra title, non-empty body | Chromium run failed before response: `ERR_HTTP2_PROTOCOL_ERROR`; 1 failed execution | P1 | `test-results/.../test-failed-1.png`, `trace.zip`; HTML report |
| MYN-SEARCH-001 | Verify search is visible/enabled | Homepage accessible; `tests/search/search.spec.ts` | Accessible search textbox visible and enabled | Implemented, not run | P1 | None yet |
| MYN-SEARCH-002 | Submit non-empty query | Homepage/search available; fill `women kurta`, Enter | Query-specific URL | Implemented, not run; expected URL is provisional | P1 | None yet |
| MYN-SEARCH-003 | Empty query boundary | Homepage/search available; Enter empty input | URL remains unchanged | Implemented, not run; expected behavior is provisional | P2 | None yet |
