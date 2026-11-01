# Test Coverage Matrix

**Application:** Public Myntra storefront  
**Evidence date:** 2026-11-01  
**Authoritative detail:** [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md)

## Measured counts

| Measure | Result | Interpretation |
|---|---:|---|
| Unique test definitions | 27 | Source-discovered cases across 12 spec files |
| Configured projects | 4 | Chromium desktop, Firefox desktop, WebKit desktop, Chromium mobile emulation |
| Project-specific discovery entries | 108 | Four project listings per unique definition; not 108 unique cases |
| Latest full Firefox run | 20 passed, 6 failed, 1 skipped | 27 discovered; 26 executed |
| Latest all-project smoke run | 5 passed, 3 failed | 8 executions; separate from the Firefox run |
| Candidate scenarios in older inventory | 447 | Planning ideas only; not implemented/executed coverage |

## Coverage by implemented suite

| Suite | Unique definitions | Implemented scope | Latest full Firefox result |
|---|---:|---|---|
| Homepage smoke | 2 | Homepage, identity, search entry, reload, bag route, history | 2 passed |
| Navigation | 2 | Menu hover, category route, history, logo navigation | 1 passed, 1 failed |
| Search | 7 | Control, valid/empty query, whitespace, Unicode, punctuation, long query | 6 passed, 1 failed during page setup |
| Product | 2 | PDP details/sizes and missing-size validation | 2 passed |
| Shopping bag | 1 | Empty-bag message | 1 passed |
| Accessibility | 3 | Title/landmarks, sampled image alt, search name | 2 passed, 1 failed |
| Responsive | 5 | Four viewport overflow measurements and mobile bag state | 2 passed, 3 failed |
| Shopping journeys | 5 | Four category/bag journeys and one auth-gated flow | 4 passed, 1 skipped |
| **Total** | **27** | Selective UI automation | **20 passed, 6 failed, 1 skipped** |

## Scope not covered by current automated tests

Sorting, filter reset, broad filter combinations, complete authentication, payment/order placement, backend behavior, load testing, visual regression baselines, and a complete WCAG audit are not covered. A feature described in a candidate catalog or older report is not evidence that it is automated.

For browser-specific failure details and limitations, see [FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md](FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md). Browser projects being configured does not mean a full suite passed in each project.
