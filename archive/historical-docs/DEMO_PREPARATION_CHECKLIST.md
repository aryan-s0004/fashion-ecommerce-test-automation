# Demo Preparation Checklist

Check the environment immediately before presenting. Status reflects this audit where applicable; time-sensitive items need a fresh check.

| Check | Status | Action |
|---|---|---|
| Laptop charged and power available | Pending | Confirm before leaving |
| Correct repository and branch open | Partially verified | Repository is open on `main`; working tree has uncommitted changes |
| Dependencies installed | Verified | `node_modules/` is present; use `npm ci` for a clean checkout |
| Environment variables configured | Partially verified | `.env.example` documents the default URL; do not expose `.env` or authentication state |
| Playwright browsers installed | Verified | Preflight checked configured Chromium, Firefox, and WebKit executables |
| Internet available | Pending | Open Myntra in the intended exam network |
| Myntra homepage reachable | Pending | Verify manually; browser behavior can differ by engine/network |
| Terminal opened at repository root | Pending | Confirm with `Get-Location` |
| Smoke command tested | Partially verified | All-project smoke was run; Firefox passed, Chromium/mobile blockers remain |
| HTML/JSON report current | Partially verified | Latest local report came from the full Firefox run; rerun summary immediately before showing |
| Screenshot/trace available | Partially verified | Failure artifacts are generated locally and may be overwritten |
| GitHub accessible | Verified | `origin` is configured; latest visible Actions run is older than this workspace |
| Backup evidence available | Partially verified | Keep a current report and trace locally, clearly label run timestamp |
| Credentials/OTP/storage state protected | Verified by source/preflight | Never type credentials into terminal/chat or open storage-state JSON to the examiner |
| Unnecessary tabs/windows closed | Pending | Close unrelated personal pages before presentation |
| Stable demonstration scenario selected | Partially verified | Prefer Firefox smoke; retry only with permission and time |
| Purchase/payment actions excluded | Verified | Do not click order/payment actions |

Useful final checks:

```powershell
npm run preflight
npx playwright test --list
npm run report:summary
```

See [FINAL_DEMONSTRATION_GUIDE.md](FINAL_DEMONSTRATION_GUIDE.md) for the full flow and fallback.
