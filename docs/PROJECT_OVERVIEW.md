# Project Overview

## Objective

Evaluate selected publicly accessible Myntra workflows through black-box browser tests using Playwright Test and TypeScript. The intended deliverable includes reproducible execution, evidence, traceability and an honest record of website and environment limitations.

## Scope

Start with public homepage and search behavior, then extend to navigation, listings, products, filters, sorting and safe unauthenticated bag behavior only after observing the live interface. Responsive and keyboard checks may be added when stable. No order, payment, account mutation, private API probing, load testing, or bypassing of site protections is allowed.

## Architecture decisions

- Use Playwright Test as the only browser automation and test runner.
- Use TypeScript for typed, maintainable test code.
- Keep tests independent and prefer accessible locators.
- Configure desktop browser projects and mobile coverage only where binaries support them.
- Treat network failure, bot protection and login barriers as blocked execution, not passing assertions or production defects.
- Keep reports, browser binaries, secrets and authentication state out of Git.

## Current evidence

The live desktop homepage search field is a textbox named “Search for products, brands and more.” Submitting `women kurta` produced a “Women Kurta” results page. The public shopping bag displayed the empty-state message “There is nothing in your bag.” These observations support the current homepage, search, and read-only empty-bag checks.

The latest full Playwright run is recorded in [EXECUTION_REPORT.md](EXECUTION_REPORT.md) and can be summarized from the generated JSON with `npm run report:summary`. Desktop Chromium navigation and the mobile search locator remain execution limitations. No production defect has been confirmed. Current repository state and remaining work are tracked in [PROJECT_STATE.md](../PROJECT_STATE.md).
