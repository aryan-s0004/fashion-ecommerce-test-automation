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

The initial TCP connection to `www.myntra.com:443` failed. No current page structure has been observed yet. Repository setup and test implementation status are tracked in [PROJECT_STATE.md](../PROJECT_STATE.md).
