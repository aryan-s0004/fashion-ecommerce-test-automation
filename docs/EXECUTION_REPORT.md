# Myntra automated regression testing

## Final execution: 11 November 2026

Command: `npm run demo`. Vite started once on port 4173. Google Chrome launched once and Microsoft Edge launched once; each used one visible window, one main tab, and one sequential 28-step Playwright test. After both demonstrations, the full isolated suite ran headlessly in both browsers: 59 tests per browser, 118 total.

| Execution | Browser | Passed | Failed | Skipped | Duration |
|---|---|---:|---:|---:|---:|
| Visible sequential demo | Chrome | 28 scenarios | 0 | 0 | 96.2 s |
| Visible sequential demo | Edge | 28 scenarios | 0 | 0 | 95.1 s |
| Isolated regression suite | Chrome + Edge | 118 tests | 0 | 0 | 161.3 s |

Total measured browser and regression time was 352.6 seconds (about 5 minutes 53 seconds). Each demo is one Playwright test containing 28 named `test.step()` scenarios. Registration, refresh persistence, logout, and login with that same synthetic account are demonstrated. The overlay reports browser, module, test case, scenario, expected result, actual result, status, and progress. The production build and TypeScript checks passed after the run.

## Evidence

- Chrome recording: `test-results/demo-videos/myntra-full-demo-chrome.webm` (2,927,016 bytes; FFmpeg decoded a frame successfully).
- Edge recording: `test-results/demo-videos/myntra-full-demo-edge.webm` (2,911,218 bytes; FFmpeg decoded a frame successfully).
- Browser demo reports: `playwright-report/demo-chrome/index.html` and `playwright-report/demo-edge/index.html`.
- Full regression report: `playwright-report/index.html`.
- JSON results: `test-results/demo-results-chrome.json`, `test-results/demo-results-edge.json`, `test-results/results.json`, and `test-results/demo-summary.json`.
- Playwright captures screenshots and traces when a test fails. This run had no failures, so it generated no failure screenshots or traces.

## Result

Both visible browser demonstrations passed all 28 scenarios. All 118 isolated regression tests passed with no failures or skips. The browser recordings were validated, and no unresolved failure remains from this run.
