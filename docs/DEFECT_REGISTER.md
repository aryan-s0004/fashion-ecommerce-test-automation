# Defect Register

No Myntra production defect has been confirmed.

| ID | Observation | Classification | Status | Evidence |
|---|---|---|---|---|
| ENV-001 | Browser navigation to Myntra failed with `net::ERR_HTTP2_PROTOCOL_ERROR` before an HTTP response | Network/availability blocker | Open; retest when access changes | `reports/results.json`; screenshot/video/trace under `test-results/` |
| ENV-002 | Initial sandboxed run could not create `test-results` (`EPERM`); approved retry allowed test execution | Environment permission | Resolved for this run | Command output |
