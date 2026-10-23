# Fashion Ecommerce Test Automation

Black-box browser automation for the **real public Myntra website** at [myntra.com](https://www.myntra.com/). This repository contains tests, not an ecommerce clone. Live-site availability and automation restrictions can affect execution; report those as blockers rather than passes.

## Stack

- Node.js and npm
- Playwright Test
- TypeScript
- GitHub Actions (planned)

## Project status

The initial environment audit found that Myntra was unreachable on TCP port 443. The repository is being built incrementally; see [PROJECT_STATE.md](PROJECT_STATE.md) and [the roadmap](docs/PROJECT_ROADMAP.md) for verified status and next steps.

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

The tests target the real live site. The initial Chromium smoke attempt was blocked before an HTTP response by `net::ERR_HTTP2_PROTOCOL_ERROR`; see [the execution report](docs/EXECUTION_REPORT.md). Do not interpret blocked navigation as a pass.

## Reports and evidence

HTML and JSON reports are generated under `reports/`. Playwright retains failure screenshots, videos and traces under `test-results/`; these generated files are ignored by Git. Open a trace with `npx playwright show-trace <path-to-trace.zip>`.
