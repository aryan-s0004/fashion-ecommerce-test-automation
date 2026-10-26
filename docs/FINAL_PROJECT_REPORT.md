# Myntra Playwright QA Project Report

## Abstract and objectives

This project establishes a TypeScript/Playwright framework for black-box testing of the real public Myntra website. It prioritizes repeatable public workflows, accessible locators, diagnostics and truthful reporting.

## Scope and method

Implemented tests cover homepage response/identity, desktop search visibility, non-empty query navigation, empty-input handling, and read-only empty-bag guidance. Search results are live-site-dependent; the desktop search field and one query result were independently observed. Tests use Playwright Test with Chromium desktop, Firefox desktop, WebKit desktop and mobile Chromium projects configured.

## Architecture and test design

The project uses npm, TypeScript, Playwright Test, isolated per-test browser contexts and HTML/JSON reporting. Failure screenshots, video and traces are enabled. Smoke, search, bag, accessibility, responsive, and regression subsets use Playwright tags. `npm run report:summary` reads actual Playwright JSON results for total outcomes, retries, duration and project breakdown. No page-object layer was added: the small, independent scenarios do not yet justify extra indirection. Design documentation covers equivalence partitioning, the empty-string boundary, a two-row search decision table and risk-based priorities. The read-only empty-bag check passed in three projects.

## Actual execution

On 2026-10-27, the final hardening regression completed 20 tests: 12 passed, 8 failed, 0 skipped, 0 flaky, and 0 retries in 130.00 seconds. Firefox and WebKit passed all 5 cases each; mobile Chromium passed 2/5; desktop Chromium passed 0/5. Desktop Chromium failed before navigation with `ERR_HTTP2_PROTOCOL_ERROR`; mobile search could not locate an accessible textbox in the observed banner. The read-only empty-bag check passed in Firefox, WebKit and mobile Chromium. `npm run typecheck` passed and `npm audit --audit-level=moderate` reported zero vulnerabilities. A live browser check independently observed a successful “women kurta” result page. An initial 10-worker run exhausted Node.js memory, so local execution defaults to one worker. No live-site blocker is reported as a product pass or confirmed product defect.

## Defect analysis and limitations

No Myntra production defect is confirmed. Desktop Chromium's error is a browser/network-specific execution blocker. The mobile accessibility snapshot shows a generic search banner rather than a textbox, so mobile search behavior needs further live reconnaissance. Product, category, filter, sorting, bag mutation, accessibility, visual and account workflows remain unverified. The public empty-bag state is covered; a manual sign-in state setup is provided but has not been exercised with a personal account.

## Deliverables and next steps

The repository includes Playwright setup, tagged smoke/search/empty-bag checks, a local-only manual authentication capture helper, generated-result summary tooling, traceability and execution documents, GitHub Actions workflow, README, demonstration script and presentation outline. Next, inspect mobile search interaction and product/listing behavior when the live browser is stable, then add tests only for verified public workflows.
