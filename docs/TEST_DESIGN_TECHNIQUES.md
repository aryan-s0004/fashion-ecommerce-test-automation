# Test Design Techniques

## Equivalence partitioning

Search inputs are initially partitioned into empty and non-empty strings (`MYN-SEARCH-002/003`). More partitions (whitespace, valid term, punctuation, very long text, and no-result term) require live observation and should be added only when the site behavior can be verified.

## Boundary-value analysis

The empty string is the current lower boundary case. Maximum supported query length and adjacent values are unknown and deliberately not guessed.

## Decision table

| Query entered | Expected observable behavior | Test |
|---|---|---|
| Empty | Stay on current page | MYN-SEARCH-003 (provisional) |
| Non-empty | Navigate to query-specific result URL | MYN-SEARCH-002 (provisional) |

## Risk-based testing

Homepage and search are prioritized as core public entry workflows. Shopping, account, and checkout flows require observed public behavior and safe conditions; no purchase or account changes are in scope.
