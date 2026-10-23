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

## Setup and commands

Commands will be documented here as the Playwright framework is added and validated. Do not run commands before their scripts and lockfile exist. The intended setup is `npm ci` followed by `npx playwright install`; see the project checkpoint for current availability.
