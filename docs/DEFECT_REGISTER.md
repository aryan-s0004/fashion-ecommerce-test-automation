# Defect Register

No Myntra production defect has been confirmed.

| ID | Observation | Classification | Status | Evidence |
|---|---|---|---|---|
| ENV-001 | Latest full serial run: desktop Chromium navigation failed with `net::ERR_HTTP2_PROTOCOL_ERROR` for all five tests; Firefox and WebKit passed all cases | Browser/network-specific execution blocker | Open; rerun when site/network is stable | `reports/results.json`; screenshot/video/trace under `test-results/` |
| ENV-002 | Initial sandboxed run could not create `test-results` (`EPERM`); approved retry allowed test execution | Environment permission | Resolved for this run | Command output |
| ENV-003 | The mobile accessibility snapshot exposes `SEARCH_BAR` as a generic clickable banner, not a textbox; three role-based mobile search checks therefore fail before interaction | Mobile locator/interaction remains unverified; not a confirmed product defect | Open; inspect the mobile search interaction before implementing an assertion | Mobile failure screenshot and trace under `test-results/` |
| ENV-004 | Default local parallelism started 10 workers and Node.js ran out of memory | Local test-runner resource limit | Mitigated by setting local default to 1 worker; CI remains at 2 | Initial test-run output |
