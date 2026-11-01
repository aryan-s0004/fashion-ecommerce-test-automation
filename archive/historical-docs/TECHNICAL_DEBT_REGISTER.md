# Technical Debt and Follow-Up Register

**Evidence date:** 2026-11-01  
**Scope:** Current test-framework and evidence gaps; no unverified resolution is marked complete.

| ID | Area | Observed gap | Next evidence-based action | Status |
|---|---|---|---|---|
| DEBT-001 | Live-site reliability | Two desktop Chromium smoke navigations failed with `ERR_HTTP2_PROTOCOL_ERROR`. | Rerun and collect browser/network diagnostics; do not claim a product root cause without evidence. | Open |
| DEBT-002 | Mobile search | Desktop input locator was not visible in the Chromium mobile smoke run; mobile interaction was not verified. | Inspect mobile DOM and build a test for the actual interactive affordance. | Open |
| DEBT-003 | Navigation locator | Expected category menu element was not visible in the Firefox full run. | Reproduce and inspect locator, viewport, menu state, and current DOM. | Open |
| DEBT-004 | Responsive behavior | Overflow assertions failed at 360×640, 390×844, and 768×1024 in the Firefox run. | Repeat the measurements and identify the overflowing element. | Open |
| DEBT-005 | Accessibility evidence | Sampled image-alt assertion failed and does not distinguish decorative imagery. | Review image purpose and test semantics; do not treat as WCAG certification. | Open |
| DEBT-006 | Test setup | Long-query test timed out while creating a page, before its query assertion. | Investigate browser startup/resource conditions and rerun the focused test. | Open |
| DEBT-007 | Feature coverage | Sorting, filter reset, and broad combinations are not covered. | Add only after confirming current public-site behavior and safe assertions. | Backlog |
| DEBT-008 | Cross-browser evidence | Four projects are configured, but only Firefox has a latest full-suite result. | Run a full multi-project suite when live-site conditions permit. | Open |
| DEBT-009 | Documentation | Several earlier documents overstated candidate counts, coverage, or score. | Use the final audit, coverage report, and scorecard as authoritative. | Reconciled in current docs |

Latest full Firefox result: 20 passed, 6 failed, 1 skipped. Separate all-project smoke result: 5 passed, 3 failed. These are separate runs and must not be added together. See [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md).
