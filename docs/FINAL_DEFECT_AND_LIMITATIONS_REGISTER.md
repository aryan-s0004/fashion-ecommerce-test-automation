# Final Defect and Limitations Register

**Last evidence date:** 2026-11-01  
**Scope:** Observed test failures and project limitations. No Myntra production defect is confirmed.

## Observed issues

| ID | Area / classification | Severity / priority | Reproduction evidence | Expected / actual | Status |
|---|---|---|---|---|---|
| NET-001 | Desktop Chromium navigation / network or edge behavior | Medium / Medium | Latest smoke run, two homepage cases, Chromium desktop | Expected page navigation; `page.goto` returned `net::ERR_HTTP2_PROTOCOL_ERROR`. Other engines passed their smoke cases in that run. Not evidence of a Myntra application defect. | Open; rerun when network/site permits |
| LOC-001 | Mobile search locator / automation compatibility | Medium / Medium | Latest smoke run, Chromium mobile | Expected desktop `HomePage.searchInput` to be visible; locator was not visible on the mobile storefront. A previous report describes a generic mobile search affordance, but this run did not verify interaction. | Open; inspect current mobile DOM and implement a truthful mobile-specific test |
| A11Y-001 | Sampled image alternative text / potential product accessibility issue | Medium / Medium | Firefox full run, `A11Y-005 & A11Y-019` | Test found sampled images but none in its sample had an `alt` attribute. The current assertion does not identify image purpose or distinguish decorative images; confirm manually before reporting a product defect. | Needs investigation; not confirmed |
| NAV-001 | Category menu / locator or live UI behavior | Medium / Medium | Firefox full run, `NAV-001 & NAV-002` | Expected menu locator was not visible after hover. Determine whether the selector, viewport, site state, or menu behavior caused the failure. | Needs investigation |
| RESP-001 | Horizontal overflow / potential layout issue | Medium / Medium | Firefox full run, overflow assertions at 360×640, 390×844, 768×1024 | Expected no horizontal overflow; the measured document width exceeded viewport width at all three tested dimensions. A single run does not establish cause or reproducibility. | Needs repeat and inspect offending element |
| ENV-001 | Long-query test setup timeout / environment reliability | Low / Medium | Firefox full run, `SEARCH-010` | The test timed out while Playwright was setting up a page (`browserContext.newPage`), before the long-query assertion. This does not establish a search defect. | Open; investigate runner/network/resource state |

## Execution totals backing this register

- Full Firefox run: 27 discovered, 20 passed, 6 failed, 1 skipped; 0 retries and 0 flaky results.
- All-project smoke run: 8 executions, 5 passed, 3 failed.
- The 6 full Firefox failure outcomes include 3 responsive viewport failures. The 3 smoke failures include two Chromium navigation failures and one mobile locator failure.
- The authenticated shopping case was skipped because local authentication state was unavailable.

Failure screenshots/traces are retained under the local, Git-ignored `test-results/` directory. They may be overwritten by later runs. Regenerate evidence before presenting it; do not treat a report path as proof that an artifact still exists.

## Confirmed product defects

**None confirmed.** The image-alt and responsive observations may represent product issues, but need repeated reproduction and manual inspection. The Chromium transport failure, mobile locator mismatch, and test setup timeout are not classified as product defects.

## Other limitations

- The target is a changing public site; network, bot protection, content, and layout can vary independently of the test code.
- The latest complete regression execution covered Firefox only. The latest all-project run covered smoke checks only.
- Browser projects configured in Playwright are not proof that all projects passed.
- Authentication, OTP, and CAPTCHA are manual; no account journey was verified.
- No payment, order placement, load testing, backend testing, visual regression baseline, or complete WCAG audit is included.
- Brand filtering appears in selected journeys; sorting, filter reset, broad combinations, and many inventory ideas are not implemented.
- `reports/results.json` and browser artifacts are generated, local evidence and may be stale after later runs.
- The worktree contains pre-existing uncommitted code and documentation changes; no commit/push was performed in this audit.
