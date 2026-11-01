# Executable Test Cases

**Application:** Public Myntra storefront
**Source of truth:** Playwright specs under `tests/` and the run evidence in [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md).

This document inventories the **27 unique test definitions** currently discovered across 12 spec files. IDs grouped in a single test title are labels for related checks, not separate automated test definitions. The 447-case master inventory is a candidate catalog only; it is not an implemented or executed test count.

## Current test definitions

| Suite | Count | Implemented behavior | Latest full Firefox outcome |
|---|---:|---|---|
| `tests/smoke/homepage.spec.ts` | 2 | Homepage identity/search entry; reload, bag route, and back navigation | Both passed |
| `tests/navigation/navigation.spec.ts` | 2 | Menu hover/category route; back/forward and logo return | One passed; one failed to find the menu |
| `tests/search/search.spec.ts` | 7 | Search control, normal and empty queries, whitespace, Unicode, punctuation, 80-character input | Six passed; long-input test timed out during page setup |
| `tests/product/product.spec.ts` | 2 | Product details/available sizes; add-to-bag without size | Both passed |
| `tests/shopping-bag/empty-bag.spec.ts` | 1 | Empty-bag guidance | Passed |
| `tests/accessibility/accessibility.spec.ts` | 3 | Page title/landmarks, sampled image alt attributes, search accessible name | One failed; two passed |
| `tests/responsive/responsive.spec.ts` | 5 | Overflow at four viewport sizes; empty-bag mobile layout | Three overflow checks failed; two passed |
| `tests/shopping-journeys/` | 5 | Four category-to-bag journeys; one authenticated flow gated on local state | Four passed; auth flow skipped |
| **Total** | **27** | Unique test definitions | **20 passed, 6 failed, 1 skipped** |

The latest all-project smoke run is separate: 8 executions, 5 passed and 3 failed. Do not combine its totals with the Firefox run.

## Test design represented in code

- Search equivalence classes and boundary inputs: normal, empty, whitespace, Unicode, punctuation, and long query.
- Negative precondition: add-to-bag without a selected size.
- State transition and safety: check bag state, add one test item, verify identity/size, remove that item.
- Use-case journeys: winter wear, formal shoes, sports shoes, and sneakers.
- Responsive measurement: horizontal overflow at fixed viewport dimensions.

The inventory does not imply full site coverage, source-code coverage, full accessibility conformance, or successful execution in every configured browser project.
