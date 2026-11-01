# Observed Test Failures and Defect Register

**Evidence date:** 2026-11-01
**Scope:** Test and live-site observations. No Myntra production defect is confirmed.

The prior version of this document reported unsupported resolutions and root causes. This register replaces those claims with observations from the latest recorded runs. A failed assertion is not, by itself, proof of a product defect.

| ID | Area | Evidence | Classification/status |
|---|---|---|---|
| NET-001 | Desktop Chromium navigation | Two homepage smoke executions failed at navigation with `net::ERR_HTTP2_PROTOCOL_ERROR`. | Transport/edge behavior observed; not a confirmed application defect. Rerun when conditions permit. |
| LOC-001 | Chromium mobile search | One smoke check could not find the desktop search-input locator. The run did not establish the mobile affordance's behavior. | Automation/site-UI mismatch to investigate; no resolution claimed. |
| NAV-001 | Category menu | Firefox full run could not find the expected menu element after hover. | Locator, viewport, state, or live UI issue undetermined. |
| A11Y-001 | Sampled image alternative text | Firefox full run failed the sampled `alt`-attribute assertion. The test does not distinguish informative from decorative images. | Potential issue requiring inspection; not a WCAG finding or confirmed product defect. |
| RESP-001 | Horizontal overflow | Firefox full run failed measurements at 360×640, 390×844, and 768×1024. | Potential layout issue; repeat and identify the overflowing element before attribution. |
| ENV-001 | Long-query test setup | Firefox full run timed out during `browserContext.newPage`, before the long-query assertion. | Test/environment setup failure; no conclusion about search behavior. |

## Execution evidence

- Full Firefox suite: 27 discovered; 20 passed, 6 failed, 1 skipped.
- Separate all-project smoke run: 8 executions; 5 passed, 3 failed.
- The authentication-dependent flow was skipped because local browser storage state was unavailable.
- The smoke and Firefox totals are separate runs and must not be added together.

See [FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md](FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md) for reproduction context and project limitations. Local traces and reports can be overwritten; regenerate them before presenting evidence.
