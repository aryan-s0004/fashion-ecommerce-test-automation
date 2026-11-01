# What to Do Before the Exam

## One-time setup

From the repository root in PowerShell:

```powershell
npm ci
npx playwright install firefox
npm run verify:demo
```

`npm ci` installs the locked project dependencies. Browser installation is required once per machine if Firefox is not already installed.

## Run a scenario and save evidence

Each command opens a headed Firefox browser, runs real actions and assertions, generates an HTML/JSON report, and copies Playwright's actual video attachment into `demo-videos/<run-id>/`. The command exits non-zero if the test fails or its recording is missing.

| Scenario | Exact command | Test case |
|---|---|---|
| Homepage loading | `npm run demo:homepage` | `DEMO-HOME-001` |
| Product search | `npm run demo:search` | `DEMO-SEARCH-001` |
| Navigation | `npm run demo:navigation` | `DEMO-NAV-001` |
| Product/category listing | `npm run demo:listing` | `DEMO-LIST-001` |
| Product details | `npm run demo:product` | `DEMO-PRODUCT-001` |
| Shopping bag | `npm run demo:bag` | `DEMO-BAG-001` |
| Responsive shopping bag | `npm run demo:responsive` | `DEMO-RESP-001` |

Run every demonstration scenario in a single serial browser session:

```powershell
npm run demo:all
```

Refresh the evidence index and mark missing HTML reports unavailable without rerunning browser tests:

```powershell
npm run demo:index
```

`npm run demo` is an alias for the same all-scenarios workflow. Shopping-only subset:

```powershell
npm run demo:shopping
```

The standard regression command remains:

```powershell
npm test
```

Regression recordings remain efficient (`retain-on-failure`); always-on video and screenshots apply only to the separate demo configuration.

## Where the evidence is saved

- **Videos, screenshots, trace archives, and per-run summary:** `demo-videos/<run-id>/`
- **Video/execution index:** `demo-videos/index.html` and `demo-videos/index.json`
- **Run-specific raw Playwright JSON and HTML report:** `reports/demo/<run-id>/results.json` and `reports/demo/<run-id>/html/index.html`
- **Most recent-run JSON summary:** Open `execution-summary.json` in that run's video folder.

The evidence index maps each real test case ID to its scenario, browser, execution timestamp, result, video, screenshot, and trace where Playwright produced them. Failed tests are recorded as failed, and available failure artifacts are kept. A missing video is explicitly noted and causes the runner to exit unsuccessfully.

## Open the report or play a recording

Open the combined video index (recommended):

```powershell
Start-Process .\demo-videos\index.html
```

The index contains playable video controls and links to the screenshot, trace, per-test summary, and Playwright HTML report. To open a specific report, substitute the run ID printed by the command:

```powershell
npx playwright show-report .\reports\demo\<run-id>\html
```

The Playwright report can also be opened from `demo-videos/index.html`. Individual WebM files can be opened in a browser or media player.

## Suggested 5–10 minute examiner demonstration

1. **0:00–1:00 — Overview:** Open `demo-videos/index.html`; explain that each row is backed by an actual browser test and dated report.
2. **1:00–2:00 — Homepage:** Play `DEMO-HOME-001` and open its corresponding Playwright report.
3. **2:00–3:00 — Search:** Play `DEMO-SEARCH-001`; point out the typed query, Enter action, URL assertion, and result.
4. **3:00–4:30 — Listing/product:** Show `DEMO-LIST-001`, then `DEMO-PRODUCT-001` if it passed. Explain live inventory can change and show any recorded failure honestly.
5. **4:30–5:30 — Bag/responsive:** Play `DEMO-BAG-001` and `DEMO-RESP-001`; explain these do not place orders or payments.
6. **5:30–7:00 — Navigation and evidence:** Play `DEMO-NAV-001`; inspect one test's execution date, status, screenshot/trace, and HTML report.
7. **7:00–9:00 — Results and limitations:** Show the latest run summary. State failures and skips explicitly; never combine results from different runs.

If time is short, prioritize homepage, search, product listing/details, and bag. Choose videos with a `PASSED` result in the index. Do not select or describe a failed video as successful.

## What still needs your attention

- The first run requires internet access to Myntra and may fail because the public site, network, or anti-bot controls change. The workflow records actual outcomes; it does not bypass CAPTCHA or OTP.
- Firefox opens automatically in a visible window. Do not close it while the command is still running.
- No authenticated account is required for these seven scenarios. Do not run the separate account flow for this demonstration; authentication may require a human and private account state.
- The test run, report generation, evidence copying, index generation, and artifact/playback verification are automatic. `npm run verify:demo` checks that indexed files exist and that saved videos decode and play in Firefox. You must still open the index/report and choose which saved clips to play during the examiner presentation.
- Run-specific evidence is preserved and not overwritten by later runs. Keep `demo-videos/` and `reports/demo/` if you want to retain the examination record.

The end-to-end sequence is: **run scenario → visible browser test → saved video → generated report/summary → updated evidence index → examiner presentation.**
