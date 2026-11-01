# Test Design Techniques Evidenced in Current Source

**Source of truth:** Executable cases under `tests/`; see [TEST_CASES.md](TEST_CASES.md) and [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md).

| Technique | Current example | Evidence and limitation |
|---|---|---|
| Equivalence partitioning | Non-empty versus empty search | `tests/search/search.spec.ts`; representative cases only |
| Boundary-value analysis | Empty, whitespace, Unicode, punctuation, and 80-character query | Long-query test timed out during setup in the latest Firefox run |
| Negative/precondition testing | Add to bag without selecting a size | `tests/product/product.spec.ts` |
| State-transition testing | Empty bag, add test item, verify, remove, restore empty state | Shared category journey helper; safety checks are present |
| Use-case testing | Four category-to-product-to-bag journeys | Winter wear, formal shoes, sports shoes, sneakers |
| Risk-based testing | Refuse unsafe bag mutation and stop before order placement | Shopping journey helpers |
| Responsive testing | Measure horizontal overflow at fixed viewport sizes | Three widths failed in the latest Firefox run; one viewport passed |
| Accessibility checks | Page title/landmarks, sampled image alt, search name | Limited checks only; image-alt assertion failed; not a WCAG audit |

Sorting, filter reset, pairwise combinations, full keyboard accessibility, XSS testing, and complete WCAG conformance are not current executable coverage. Candidate ideas are not execution evidence.
