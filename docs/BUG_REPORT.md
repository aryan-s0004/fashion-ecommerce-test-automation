# Bug report log

## Resolved during the 11 November 2026 audit

| ID | Module | Finding | Fix and retest |
|---|---|---|---|
| BUG-001 | App startup | Vite served React’s CommonJS entry without the needed named exports, leaving the page blank. | Enabled dependency optimization for React, React DOM, and Lucide in `vite.config.js`. Build passed and Chrome rendered the full homepage. |
| BUG-002 | Branding | The visible header logo used lowercase `myntra`, while the required brand is `Myntra`. | Capitalized the header and footer wordmark; branding tests passed in Chrome and Edge. |
| BUG-003 | Automated locators | Tests requested a textbox for an input with a datalist and used non-scoped header/footer labels. | Switched search to label locators, scoped header controls to the banner, and made ambiguous form labels exact. Affected tests passed in both browsers. |
| BUG-004 | Catalog test expectations | Price-filter and partial-search assertions did not match the local 60-item catalog. | Updated assertions to the actual category result count and product matches; Chrome and Edge tests passed. |
| BUG-005 | Test video recording | Playwright could not create pages because its FFmpeg dependency was missing. | Installed the matching Playwright FFmpeg package; complete Chrome and Edge demo videos were produced and decoded successfully. |
| BUG-006 | Sequential demo lifecycle | Prior per-test headed execution repeatedly opened browser sessions. | Replaced the visible path with one 28-step test per browser using one page/context, then ran isolated regression headlessly. Both browser journeys and all 110 regressions passed. |

No unresolved application or automation defect was reported by the final run. The full execution details are in [EXECUTION_REPORT.md](EXECUTION_REPORT.md).
