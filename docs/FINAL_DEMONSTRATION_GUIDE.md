# Final Practical Demonstration Guide

**Recommended duration:** 12–15 minutes  
**Project:** Myntra public-site test automation with Playwright and TypeScript  
**Important:** This is a live third-party site. Present the actual run result, including failures; do not promise a pass.

## Before the demonstration

Run the checks in [DEMO_PREPARATION_CHECKLIST.md](DEMO_PREPARATION_CHECKLIST.md). Use Firefox for a live run because its smoke cases passed in the latest all-project smoke run. This is a best-supported choice, not a guarantee of future site availability.

Verified commands:

```powershell
npm run preflight
npx playwright test --list
npm run test:smoke
npx playwright test --project=firefox-desktop --workers=1
npm run report:summary
npm run verify:demo
```

For a visible browser, the following is the headed equivalent of the smoke command; headed mode was not separately exercised during this audit:

```powershell
npx playwright test tests/smoke/homepage.spec.ts --project=firefox-desktop --workers=1 --headed
```

## Full demonstration sequence

| Time | Screen and action | Expected observation | What to explain | SQA concept / evidence | Follow-up and backup |
|---|---|---|---|---|---|
| 0:00–1:00 | Show repository README and public Myntra homepage | README names the public target; site may or may not respond | This is black-box automation of a live third-party storefront, not a clone or full product audit | Scope and test strategy; README and [FINAL_PROJECT_AUDIT.md](FINAL_PROJECT_AUDIT.md) | If the site is blocked, state that immediately and use the local report |
| 1:00–3:00 | Show project tree: `tests/`, `pages/`, `scripts/`, `docs/`, config, workflow | Test specs, page objects, shared search helper, npm scripts and workflow are visible | Tests own scenarios/assertions; page objects centralize common page interactions; Playwright owns contexts and browser projects | Separation of concerns; `playwright.config.ts`, `tests/search/search.spec.ts`, `pages/` | If asked about full framework coverage, distinguish current tests from candidate documents |
| 3:00–4:30 | Run `npm run preflight` | 11 local checks pass | It checks configuration, writable output folders, typecheck, discovery, browser binaries, Git exclusion, and target URL format; it does not prove live-site health | Shift-left verification; preflight output | If a check fails, show the error instead of bypassing it |
| 4:30–7:30 | Run the Firefox headed smoke command above | Browser performs homepage checks; live result may differ from the recorded run | Assertions verify observable behavior; one pass is evidence for that case/run only, not proof the entire site is defect-free | Functional smoke testing; screenshot/trace on failure | If navigation fails, classify it using the actual error and switch to local report |
| 7:30–9:00 | Open a real test, e.g. `tests/product/product.spec.ts` or `tests/shopping-journeys/category-journey.ts` | Actual locator, user action, assertion, and cleanup are visible | Product checks cover title/price/size; shopping journeys check an empty-bag precondition, test-item identity, and cleanup; they stop before ordering | Test oracle, state transitions, non-destructive testing | If asked about authentication, explain the one gated flow was skipped |
| 9:00–10:30 | Show `playwright.config.ts` and `tests/responsive/responsive.spec.ts` | Four configured projects and viewport assertions are visible | Configuration is not proof every project passes; the latest full run was Firefox only | Cross-browser and responsive testing | Show the recorded 360/390/768 overflow failures without calling them confirmed product defects |
| 10:30–12:30 | Run `npm run report:summary`; open latest HTML report and one failure trace/screenshot | Run counts, browser, test names, and failure evidence appear | Full Firefox: 20 pass, 6 fail, 1 skip. Latest smoke: 5 pass, 3 fail. Do not combine these runs | Evidence-based reporting and defect triage | If report was overwritten, rerun a small suite or show current console output with timestamp |
| 12:30–14:00 | Show current test case table, traceability, limitations, and scorecard | Executable cases are separated from candidate requirements | Explain how a requirement maps to a spec and execution; disclose planned-only areas | Traceability, risk-based scope, honest defect classification | Use [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md) for counts |
| 14:00–15:00 | Show GitHub workflow and latest visible run | Latest visible run passed `typecheck`; live-smoke job was skipped on push | CI validates types on pushes/PRs; live tests require manual dispatch. The run is from the committed revision, not this dirty working tree | CI/CD, reproducibility | If asked for current local changes, show `git status`; do not imply they were pushed |

## Five-minute backup demonstration

1. **0:00–0:30 — Intro:** State the target, stack, and safe scope.
2. **0:30–1:20 — Real journey:** Show Myntra if reachable; otherwise state the current network limitation.
3. **1:20–2:10 — Code:** Open a real test and explain one locator, action, and assertion.
4. **2:10–3:10 — Execution:** Run `npx playwright test --project=firefox-desktop --workers=1` only if time permits; otherwise show the existing exact run summary.
5. **3:10–4:20 — Evidence:** Run `npm run report:summary` and show one actual failed artifact.
6. **4:20–5:00 — Close:** State actual coverage, limitations, and that no order/payment is performed.

## Network-failure / command-only fallback

Use the latest local `reports/results.json` and `reports/html/` only if their start time matches the run being discussed. Use `test-results/` for the corresponding failure screenshot/trace. Identify the run as local and timestamped; never present historical data as a current browser run.

If report artifacts are missing or stale, show:

```powershell
npm run preflight
npx playwright test --list
npm run typecheck
```

Then show the actual source and explain that static verification is not a substitute for live execution.

## Safety and examiner-facing claims

- Never place an order, submit payment, bypass CAPTCHA, automate OTP, or expose local authentication state.
- The authenticated flow is gated and was skipped in the latest full run.
- Do not claim sorting, complete filter coverage, full accessibility, all-browser regression, or complete site coverage.
- For a suspected issue, state the observed assertion, environment, and reproduction count; distinguish a candidate product defect from a confirmed one.

See also [EXAMINER_DEMO_SPEAKING_SCRIPT.md](EXAMINER_DEMO_SPEAKING_SCRIPT.md), [DEMO_PREPARATION_CHECKLIST.md](DEMO_PREPARATION_CHECKLIST.md), and [FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md](FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md).
