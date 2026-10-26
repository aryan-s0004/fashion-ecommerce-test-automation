# Requirement Traceability Matrix

| Requirement | Test case | Priority | Implementation / execution |
|---|---|---|---|
| Public homepage responds and identifies Myntra | MYN-HOME-001 | P1 | Latest full run passed in Firefox, WebKit and mobile Chromium; desktop Chromium failed with `ERR_HTTP2_PROTOCOL_ERROR` |
| Homepage search is accessible | MYN-SEARCH-001 | P1 | Latest full run passed in Firefox and WebKit; desktop Chromium was blocked at navigation and mobile did not expose a textbox locator |
| Non-empty query submits query-specific navigation | MYN-SEARCH-002 | P1 | Latest full run passed in Firefox and WebKit; integrated browser observed “women kurta” navigation to `/women-kurta?rawQuery=women%20kurta` |
| Empty query preserves current URL | MYN-SEARCH-003 | P2 | Latest full run passed in Firefox and WebKit; desktop Chromium navigation was blocked and mobile locator was not found |

Category, product detail, filters, sorting, bag, accessibility, responsive, and account validation requirements remain unimplemented pending observation.
