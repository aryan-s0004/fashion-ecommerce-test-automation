# Myntra Playwright QA Project Report

## Abstract and objectives

This project establishes a TypeScript/Playwright framework for black-box testing of the real public Myntra website. It prioritizes repeatable public workflows, accessible locators, diagnostics and truthful reporting.

## Scope and method

Implemented tests cover homepage response/identity and search visibility, non-empty query navigation, and empty-input handling. Search expectations remain provisional because live reconnaissance was blocked. Tests use Playwright Test with Chromium desktop, Firefox desktop, WebKit desktop and mobile Chromium projects configured.

## Architecture and test design

The project uses npm, TypeScript, Playwright Test, per-test browser contexts and HTML/JSON reporting. Failure screenshots, video and traces are enabled. Design documentation covers equivalence partitioning, the empty-string boundary, a two-row search decision table and risk-based priorities.

## Actual execution

On 2026-10-24, `npm run typecheck` passed and test discovery found 4 cases across four projects. Across separate homepage-only runs there were 3 passes and 2 desktop Chromium failures with `net::ERR_HTTP2_PROTOCOL_ERROR` before an HTTP response. Search cases were not executed. The latest JSON report is for the desktop/mobile Chromium run and records 1 pass and 1 failure; Firefox/WebKit terminal output from the preceding run recorded 2 passes. A screenshot, video and trace were generated for the desktop Chromium failure.

## Defect analysis and limitations

No Myntra production defect is confirmed. Desktop Chromium's error is classified as a browser/network-specific execution blocker; Firefox and WebKit observed the branded homepage. Search assertions remain provisional. Product, category, filter, bag, responsive, accessibility, visual and account workflows remain unverified.

## Deliverables and next steps

The repository includes the Playwright setup, smoke/search tests, traceability and execution documents, GitHub Actions workflow, README, demonstration script and presentation outline. Next, rerun the smoke test when Myntra is reachable, inspect the live interface, validate search assumptions, and expand only to workflows observed to be publicly accessible.
