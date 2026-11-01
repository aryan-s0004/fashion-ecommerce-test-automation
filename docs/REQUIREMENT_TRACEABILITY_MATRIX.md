# Requirement Traceability Matrix

**Project:** Black-box UI automation for the public Myntra storefront
**Evidence date:** 2026-11-01

This matrix traces only behavior represented by current executable specs. IDs grouped in test names are descriptive labels and do not inflate the count of unique tests. Older requirement IDs that have no matching current test are not represented here; consult [MASTER_TEST_CASE_INVENTORY.md](MASTER_TEST_CASE_INVENTORY.md) for candidate ideas only.

| Requirement | Observable requirement | Current test source and case labels | Latest full Firefox result |
|---|---|---|---|
| REQ-HOME-01 | Storefront loads with Myntra identity and a usable desktop search entry | `tests/smoke/homepage.spec.ts` — `HOME-001` to `HOME-006` | Passed |
| REQ-HOME-02 | Homepage can reload and browser history returns from the bag route | `tests/smoke/homepage.spec.ts` — `HOME-010`, `HOME-012` | Passed |
| REQ-NAV-01 | Category menu can be opened and a category route reached | `tests/navigation/navigation.spec.ts` — `NAV-001`, `NAV-002` | Failed at menu visibility; route assertion not reached |
| REQ-NAV-02 | Back/forward navigation and logo return work | `tests/navigation/navigation.spec.ts` — `NAV-008`, `NAV-009`, `NAV-015` | Passed |
| REQ-SEARCH-01 | Search control is visible and enabled when an interactive text field exists | `tests/search/search.spec.ts` — `SEARCH-001`, `SEARCH-003` | Passed |
| REQ-SEARCH-02 | A normal query navigates to matching results | `tests/search/search.spec.ts` — `SEARCH-004` | Passed |
| REQ-SEARCH-03 | Submitting an empty query preserves the current URL | `tests/search/search.spec.ts` — `SEARCH-006` | Passed |
| REQ-SEARCH-04 | Whitespace, Unicode, punctuation, and long input are handled without an unsafe action | `tests/search/search.spec.ts` — `SEARCH-008`, `SEARCH-038`, `SEARCH-037`, `SEARCH-010` | Three passed; long-input case timed out during page setup |
| REQ-PRODUCT-01 | A listing product opens a PDP with visible details and available sizes | `tests/product/product.spec.ts` — `PRODUCT-001` to `PRODUCT-007` | Passed |
| REQ-PRODUCT-02 | Adding without a required size prompts for size selection | `tests/product/product.spec.ts` — `PRODUCT-030`, `SIZE-003` | Passed |
| REQ-BAG-01 | An empty bag explains that no items are present | `tests/shopping-bag/empty-bag.spec.ts` — `BAG-001`, `BAG-002` | Passed |
| REQ-A11Y-01 | Page exposes a non-empty descriptive title and primary landmarks | `tests/accessibility/accessibility.spec.ts` — `A11Y-011`, `A11Y-013` | Passed |
| REQ-A11Y-02 | Sampled images expose an `alt` attribute | `tests/accessibility/accessibility.spec.ts` — `A11Y-005`, `A11Y-019` | Failed; sample and decorative-image handling need review |
| REQ-A11Y-03 | Search control has a semantic accessible name or placeholder | `tests/accessibility/accessibility.spec.ts` — `A11Y-014` | Passed |
| REQ-RESP-01 | Tested viewports have no measured horizontal overflow | `tests/responsive/responsive.spec.ts` — `RESP-013` to `RESP-016` | 360, 390, and 768 widths failed; 1280 passed |
| REQ-RESP-02 | Empty-bag content is visible at the mobile viewport without overflow | `tests/responsive/responsive.spec.ts` — `RESP-006` | Passed |
| REQ-JOURNEY-01 | Four product-category journeys verify product/bag state and safe cleanup | `tests/shopping-journeys/{men-winter-wear,formal-shoes,sports-shoes,sneakers}.spec.ts` | Four journeys passed |
| REQ-AUTH-01 | Authenticated journey runs only with local auth state and remains before order placement | `tests/shopping-journeys/full-shopping-flow.spec.ts` | Skipped; local state unavailable |

## Execution totals

There are 27 unique test definitions across 12 spec files. The latest full Firefox run had 20 passes, 6 failures, and 1 skip. The separate all-project smoke run had 5 passes and 3 failures. These run totals are not requirements-coverage percentages and should not be combined.

Sorting, filter reset, broad accessibility conformance, and other candidate-only requirements are not covered by current executable specs.
