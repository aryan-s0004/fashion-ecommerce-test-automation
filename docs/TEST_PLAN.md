# Test Plan

## Scope

Current automation covers public homepage response/identity plus search visibility and representative non-empty/empty inputs. Search locators and expected navigation are provisional until verified against the live interface. Product, category, filter, bag and account behavior have not been observed and are not yet asserted.

## Design and priority

- **P1:** Homepage response, page identity, and search availability.
- **P2:** Non-empty search navigation and empty-string boundary behavior.
- **Equivalence partitioning:** Empty versus non-empty query.
- **Boundary value:** Empty string; whitespace, length limits and unusual characters remain future cases.
- **Decision rule:** Empty input is expected to remain on the current URL; non-empty input is expected to produce query-specific navigation. Confirm this rule with the live site before treating as accepted behavior.
- **Risk-based:** Start with public entry and search; do not attempt account mutation or order/payment flows.

## Execution policy

Each test is independent. A navigation/network/bot restriction is recorded as blocked environment execution, not as a passing test or confirmed Myntra defect. Failure screenshots, video, traces, HTML and JSON reports are retained locally and excluded from Git.
