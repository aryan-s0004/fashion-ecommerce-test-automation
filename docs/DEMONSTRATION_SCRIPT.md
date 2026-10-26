# Demonstration Script (5–8 minutes)

1. Introduce the real Myntra target, black-box goal and safe scope (45 sec).
2. Show the Playwright + TypeScript configuration, reports and browser projects (75 sec).
3. Explain homepage, observed desktop search, and the read-only empty shopping-bag scenarios (90 sec).
4. Show actual run output: Firefox/WebKit passed implemented checks; desktop Chromium navigation failed with `ERR_HTTP2_PROTOCOL_ERROR`; mobile search lacked an accessible textbox (60 sec).
5. Run `npm run report:summary` to derive the latest counts/duration, then open the generated HTML/JSON report and a retained failure trace (60 sec).
6. Review tags and targeted commands, traceability, manual local auth-state protection, CI trigger policy and limitations (90 sec).
7. Close with next steps: inspect mobile search and more public workflows before expanding assertions (30 sec).

Show only generated evidence. State the exact run totals from the report, distinguish browser/network failures from test assertions, and do not claim a Myntra defect from a blocked page.
