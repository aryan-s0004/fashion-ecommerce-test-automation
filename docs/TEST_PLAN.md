# Test Plan

## Scope

Current automation covers public homepage response/identity, desktop search visibility and representative non-empty/empty inputs, plus the public empty shopping-bag state. The desktop search control, one query-to-results flow and empty-bag guidance have been observed on the live interface. Mobile search, product details, filters, sorting, bag mutation and account behavior have not been verified and are not yet asserted.

## Design and priority

- **P1:** Homepage response, page identity, and search availability.
- **P2:** Non-empty search navigation, empty-string boundary behavior and empty-bag guidance.
- **Equivalence partitioning:** Empty versus non-empty query.
- **Boundary value:** Empty string; whitespace, length limits and unusual characters remain future cases.
- **Decision rule:** Empty input remained on the current URL and non-empty input navigated to query-specific results in the executed Firefox and WebKit runs. Site content and behavior may change.
- **Risk-based:** Start with public entry and search; do not attempt account mutation or order/payment flows.

## Execution policy

Each test is independent. A navigation/network/bot restriction is recorded as blocked environment execution, not as a passing test or confirmed Myntra defect. Failure screenshots, video, traces, HTML and JSON reports are retained locally and excluded from Git.

## Test selection and reporting

Playwright tags select the current implemented scope: `@smoke`, `@search`, `@bag`, `@accessibility`, `@responsive`, and `@regression`. The mobile responsive subset currently contains the empty-bag visibility test; the accessibility subset checks the semantic search textbox/name only, not WCAG conformance. Product commands are intentionally absent until public product workflows are inspected and automated.

Run `npm run report:summary` after a test run to derive total outcomes, retry count, duration and browser-project breakdown from the JSON report; its numbers describe the last report only.
