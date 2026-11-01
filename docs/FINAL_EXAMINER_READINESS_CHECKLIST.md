# Final Examiner Readiness Checklist

**Status meanings:** **Verified** = checked in this workspace; **Partially verified** = some evidence exists, with gaps/failures; **Pending** = not yet demonstrated; **Blocked** = depends on external access or user-controlled authentication.

| Item | Status | Evidence / action before examination |
|---|---|---|
| Project setup and npm dependencies | Verified | Dependencies are installed; `npm ci` is the clean-checkout setup command |
| TypeScript validation | Verified | `npm run typecheck` passed, also exercised by preflight |
| Playwright discovery | Verified | 27 unique definitions; 108 project-specific listings |
| Preflight | Verified | `npm run preflight`: 11 passed, 0 failed |
| Demo readiness check | Verified | `npm run verify:demo`: 6 passed, 0 failed |
| Smoke execution | Partially verified | 5/8 passed across four projects; live-site failures remain |
| Full regression execution | Partially verified | Firefox: 20 passed, 6 failed, 1 skipped |
| Search execution | Partially verified | Six search cases passed in Firefox; long-input case timed out during page setup |
| Product and category flows | Verified in Firefox | Two product tests and four category journeys passed in the latest full run |
| Shopping bag | Verified in limited flows | Empty-bag and guarded add/remove behavior passed; no purchase performed |
| Browser configuration | Verified | Chromium desktop, Firefox desktop, WebKit desktop, Chromium mobile configured |
| Cross-browser regression | Pending | Only smoke suite ran across all four projects; complete suite was Firefox-only |
| Responsive testing | Partially verified | Overflow checks fail at 360, 390, and 768 widths; rerun and inspect |
| Accessibility testing | Partially verified | Limited semantic checks; sampled image-alt test failed; not WCAG certification |
| HTML/JSON report | Verified as generated | Run `npm run report:summary`; regenerate after any new execution |
| Screenshots and traces | Partially verified | Failure artifacts generated locally; retain current paths and do not assume files persist |
| Test-case documentation | Partially verified | Use the current 27-case inventory and coverage report; candidate scenarios are separate |
| Traceability matrix | Partially verified | Current matrix should only mark source-backed cases and actual run evidence |
| Defect register | Partially verified | Six observed failure classes are recorded; no production defect confirmed |
| Final project report | Verified as documentation | Must be read with the latest run date and known limitations |
| Demo guide and speaking script | Verified as documentation | Use the truthful script; network fallback is included |
| Viva preparation | Partially verified | Use current 27-case / run totals; do not repeat legacy 447/95+ claims as results |
| GitHub repository access | Verified | `origin` is configured |
| GitHub Actions | Partially verified | Latest visible run passed typecheck; live-smoke job was skipped on push |
| Authentication flow | Blocked | Requires a dedicated account and local manual state; do not expose credentials or OTP |
| Five-minute backup demonstration | Partially verified | Use generated local reports and source; label results by their exact run |

## Final commands

```powershell
npm ci
npx playwright install
npm run preflight
npx playwright test --list
npm run test:smoke
npx playwright test --project=firefox-desktop --workers=1
npm run report:summary
npm run verify:demo
```

The full Firefox command takes about six minutes in the recorded run and depends on the live storefront. If the site is unavailable, show the latest genuine local HTML/JSON report and explain its timestamp and environment instead of claiming a current pass.
