# Myntra Playwright QA Project Report

## Abstract and objectives

This project establishes a TypeScript/Playwright framework for black-box testing of the real public Myntra website. It prioritizes repeatable public workflows, accessible locators, diagnostics and truthful reporting.

## Scope and method

Implemented tests cover homepage response/identity and search visibility, non-empty query navigation, and empty-input handling. Search expectations remain provisional because the public site behaved inconsistently during cross-browser runs. Tests use Playwright Test with Chromium desktop, Firefox desktop, WebKit desktop and mobile Chromium projects configured.

## Architecture and test design

The project uses npm, TypeScript, Playwright Test, per-test browser contexts and HTML/JSON reporting. Failure screenshots, video and traces are enabled. Design documentation covers equivalence partitioning, the empty-string boundary, a two-row search decision table and risk-based priorities.

## Actual execution

On 2026-10-27, `npm run typecheck` passed. The latest full serial run completed 16 tests with 9 passes and 7 failures: all Firefox and WebKit cases passed, the mobile homepage passed, and four desktop Chromium plus three mobile search cases failed. Desktop Chromium failed before navigation with `ERR_HTTP2_PROTOCOL_ERROR`; mobile search could not locate a textbox in the observed banner. A live browser check independently observed a successful “women kurta” search result page. An initial 10-worker run exhausted Node.js memory, so local execution now defaults to one worker. No live-site blocker is reported as a product pass or confirmed product defect.

## Defect analysis and limitations

No Myntra production defect is confirmed. Desktop Chromium's error is a browser/network-specific execution blocker. The mobile accessibility snapshot shows a generic search banner rather than a textbox, so mobile search behavior needs further live reconnaissance. Product, category, filter, bag, accessibility, visual and account workflows remain unverified. A manual sign-in state setup is provided but has not been exercised with a personal account.

## Deliverables and next steps

The repository includes the Playwright setup, smoke/search tests, traceability and execution documents, GitHub Actions workflow, README, demonstration script and presentation outline. Next, rerun the cross-browser suite when Myntra and DNS are stable, inspect the mobile search interaction, and expand only to workflows observed to be publicly accessible.
