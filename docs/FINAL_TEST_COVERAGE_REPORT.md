# Final Test Coverage Report

**Audit date:** 2026-11-01  
**Application:** Public Myntra storefront  
**Automation:** Playwright Test, TypeScript

## Counts and terminology

| Measure | Count | Meaning |
|---|---:|---|
| Unique automated test definitions | 27 | Test cases discovered in the current 12 `*.spec.ts` files |
| Configured browser/device projects | 4 | Chromium desktop, Firefox desktop, WebKit desktop, Chromium mobile emulation |
| Project-specific discovery entries | 108 | 27 definitions listed once per configured project; not unique test cases |
| Latest full Firefox run | 27 discovered | 20 passed, 6 failed, 1 skipped; 26 executed |
| Latest all-project smoke run | 8 executions | 5 passed, 3 failed |
| Documented candidate scenarios | 447 in the older inventory | Proposed scenarios only; not implemented/executed totals |
| Manual cases actually executed | Not recorded | No verified manual test log was provided |

Never add the latest smoke counts to the full Firefox counts. They are separate runs with overlapping test cases.

## Latest execution details

### Full Firefox suite

- Command: `npx playwright test --project=firefox-desktop --workers=1`
- Start timestamp: `2026-11-01T13:36:17.720Z`
- Duration: 349.86 seconds
- Discovered: 27
- Executed: 26
- Passed: 20
- Failed: 6
- Skipped: 1
- Flaky/retries: 0/0
- Skipped case: Authenticated shopping flow; local Playwright storage state was not present.
- Failures: sampled image-alt assertion; category menu hover locator; overflow at 360×640, 390×844, and 768×1024; page fixture setup timeout for the 80-character search case.

### All-project smoke suite

- Command: `npm run test:smoke`
- Start timestamp: `2026-11-01T13:33:30.458Z`
- Duration: 92.91 seconds
- Executions: 8
- Passed: 5
- Failed: 3
- Skipped/flaky/retries: 0/0/0
- Firefox desktop: 2 passed; WebKit desktop: 2 passed; Chromium desktop: 2 failed at navigation with `net::ERR_HTTP2_PROTOCOL_ERROR`; Chromium mobile: 1 passed and 1 failed because the desktop search-input locator was not visible.

The live-site failures are preserved as failures. No passing result is inferred from configuration, test discovery, or an earlier run.

## Implemented tests by suite

| Suite | Unique cases | Current assertions |
|---|---:|---|
| `tests/smoke/homepage.spec.ts` | 2 | Homepage response/identity/search entry, reload, cart route, browser back |
| `tests/navigation/navigation.spec.ts` | 2 | Men hover/menu, category URL, back/forward, logo return |
| `tests/search/search.spec.ts` | 7 | Search control, normal query, empty query, whitespace, Unicode, punctuation, long input |
| `tests/product/product.spec.ts` | 2 | PDP details/available sizes; missing-size add-to-bag validation |
| `tests/shopping-bag/empty-bag.spec.ts` | 1 | Empty-bag guidance |
| `tests/accessibility/accessibility.spec.ts` | 3 | Title/landmarks, sampled image alt attributes, search accessible name |
| `tests/responsive/responsive.spec.ts` | 5 | Four viewport overflow checks and mobile bag layout |
| `tests/shopping-journeys/` | 5 | Four category add/verify/remove journeys; one gated authenticated flow |
| **Total** | **27** | Unique test definitions |

## Test design techniques evidenced in executable code

- **Equivalence partitioning:** A normal search term and an empty search term.
- **Boundary value analysis:** Empty input, padded whitespace, Unicode, punctuation, and an 80-character input.
- **Decision table:** Product add-to-bag attempt without selecting a size.
- **State transition:** Empty bag → test item → identity/size verification → removal → empty bag.
- **Use-case testing:** Four category-to-product-to-bag journeys.
- **Risk-based testing:** Bag-empty precondition, item identity checks before removal, no order placement.
- **Responsive checks:** Measured horizontal overflow at specific viewport dimensions.

Sorting, filter reset, pairwise combinations, full keyboard accessibility, and controlled network failure are described or suggested in documents but are not current executable coverage.

## Traceability

Use the current source-backed matrix in [REQUIREMENT_TRACEABILITY_MATRIX.md](REQUIREMENT_TRACEABILITY_MATRIX.md). Candidate-only IDs in older documents must not be counted as implemented tests. Failure evidence is in the ignored local `test-results/` directory; generated reports are local and should be regenerated before a later demonstration.

## Coverage conclusion

The project has meaningful functional automation, but its coverage is selective and live-site-dependent. It does not provide complete Myntra coverage, source-code coverage, full accessibility certification, or verified four-project regression results.
