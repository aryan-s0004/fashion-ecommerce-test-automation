# Defect Register

No Myntra production defect has been confirmed.

| ID | Observation | Classification | Status | Evidence |
|---|---|---|---|---|
| ENV-001 | Chromium desktop navigation failed with `net::ERR_HTTP2_PROTOCOL_ERROR`; Firefox, WebKit and mobile Chromium homepage checks passed | Browser/network-specific execution blocker | Open; investigate desktop Chromium | `reports/results.json`; screenshot/video/trace under `test-results/` |
| ENV-002 | Initial sandboxed run could not create `test-results` (`EPERM`); approved retry allowed test execution | Environment permission | Resolved for this run | Command output |
