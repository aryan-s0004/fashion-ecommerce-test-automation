# Test Plan

## Scope

Current automation covers public homepage response/identity plus desktop search visibility and representative non-empty/empty inputs. The desktop search control and one query-to-results flow have been observed on the live interface. Mobile search, product, category, filter, bag and account behavior have not been verified and are not yet asserted.

## Design and priority

- **P1:** Homepage response, page identity, and search availability.
- **P2:** Non-empty search navigation and empty-string boundary behavior.
- **Equivalence partitioning:** Empty versus non-empty query.
- **Boundary value:** Empty string; whitespace, length limits and unusual characters remain future cases.
- **Decision rule:** Empty input remained on the current URL and non-empty input navigated to query-specific results in the executed Firefox and WebKit runs. Site content and behavior may change.
- **Risk-based:** Start with public entry and search; do not attempt account mutation or order/payment flows.

## Execution policy

Each test is independent. A navigation/network/bot restriction is recorded as blocked environment execution, not as a passing test or confirmed Myntra defect. Failure screenshots, video, traces, HTML and JSON reports are retained locally and excluded from Git.
