# Master Test Scenario Inventory — Candidate Ideas Only

**Important:** This is a planning catalog, not an execution report. Its historical count of 447 scenarios is not independently verified as a current inventory, and none of its rows should be interpreted as implemented, automated, manually executed, or passed based on this document alone.

The authoritative executable inventory is [TEST_CASES.md](TEST_CASES.md): 27 unique Playwright test definitions across 12 spec files. Actual outcomes are in [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md). A case is implemented only when represented in current source; an execution status requires a timestamped run result.

## How to use this catalog

The older catalog below is retained as a backlog of possible scenarios. Its historical module totals, per-row automation statuses, execution outcomes, evidence paths, and pass rates have not been re-audited and must not be used as current metrics. Before selecting a candidate for implementation:

1. Confirm the behavior exists on the current public site.
2. Define safe preconditions, expected result, and a measurable assertion.
3. Implement and review the test in `tests/`.
4. Execute it and record browser, date, and result.
5. Update the source-backed test and coverage reports.

Do not automate purchases, OTP/CAPTCHA bypass, destructive account changes, or any action that changes user data without explicit authorization and safeguards.
