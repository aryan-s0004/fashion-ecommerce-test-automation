# Fashion Ecommerce Test Automation

Black-box browser automation for the **real public Myntra website** at [myntra.com](https://www.myntra.com/). This repository contains tests, not an ecommerce clone. Live-site availability and automation restrictions can affect execution; report those as blockers rather than passes.

## Stack

- Node.js and npm
- Playwright Test
- TypeScript
- GitHub Actions

## Project status

The latest full serial run completed 16 tests: 9 passed and 7 failed. Firefox and WebKit passed all four cases; mobile Chromium passed the homepage check but its search banner was not exposed as a textbox; desktop Chromium failed navigation with `ERR_HTTP2_PROTOCOL_ERROR`. A separate live browser check successfully searched for “women kurta” and observed the result page. See [PROJECT_STATE.md](PROJECT_STATE.md), [the execution report](docs/EXECUTION_REPORT.md), and [the roadmap](docs/PROJECT_ROADMAP.md) for details.

## Safety and source control

Tests use low-volume public workflows only. They must not bypass CAPTCHA or access controls, probe private APIs, change account data, place orders, or process payments. Never commit credentials, cookies, session tokens, or authentication storage. Generated reports and browser artifacts should be excluded from source control unless a small sanitized evidence item is intentionally selected.

## Setup and commands (PowerShell)

```powershell
npm ci
npx playwright install chromium
npm run typecheck
npm run test:smoke
npm test
npm run test:headed
npm run test:ui
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run report
```

The tests target the real live site. Local runs use one Playwright worker by default to avoid resource exhaustion; CI uses two. Do not interpret blocked navigation as a pass.

## Optional manual sign-in

Run `npm run auth:setup` to open a visible Chromium browser. Sign in manually in that browser, including any OTP or challenge presented by Myntra, then press Enter in the terminal. The script stores Playwright storage state at `playwright/.auth/myntra.json`; this directory is ignored by Git. Never enter credentials in the terminal or commit, share, or upload the state file. The state may contain active session cookies; delete it when no longer needed and repeat setup if it expires.

No authenticated account scenarios have been executed or claimed. Public tests remain independent of this optional state.

## Reports and evidence

HTML and JSON reports are generated under `reports/`. Playwright retains failure screenshots, videos and traces under `test-results/`; these generated files are ignored by Git. Open a trace with `npx playwright show-trace <path-to-trace.zip>`.
