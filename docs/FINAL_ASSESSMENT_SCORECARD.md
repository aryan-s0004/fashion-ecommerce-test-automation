# Final Assessment Scorecard

**Framework:** Internal proposed 100-mark assessment; not an official university rubric.  
**Assessment date:** 2026-11-01  
**Estimated evidence-based score:** **56/100**. This is a preparation estimate, not a guaranteed academic result.

| Area | Max | Estimate | Evidence expected and present | Missing evidence / highest-impact improvement | Demonstration |
|---|---:|---:|---|---|---|
| Problem statement and objectives | 5 | 3 | README and final report explain a black-box Myntra project | Clarify measurable objectives and align all older documents | State target, scope, out-of-scope actions |
| Requirements and test plan | 10 | 5 | Test plan, requirements catalog, traceability files exist | Legacy requirements overstate implemented behavior; label candidate-only items and map only source-backed requirements | Show one requirement-to-test trace |
| Test design and coverage | 15 | 8 | 27 executable cases include normal/empty/boundary search, state transitions, journeys | Many planned scenarios (sorting, filter reset, login, zero results) are absent; avoid count inflation | Explain one boundary case and one risk-based safety check |
| Architecture and code quality | 15 | 10 | Strict TypeScript; page objects; shared helper; isolated Playwright tests | CSS selector fragility and some weak conditional assertions remain; improve semantic and failure diagnostics | Explain a real page object and test |
| Functional automation | 15 | 7 | Product, size validation, category, search, and bag code exists; most journeys passed in Firefox | Live-site reliability and partial navigation/search limitations; add only verified flows | Run smoke and explain actual result |
| Execution, debugging, reliability | 10 | 5 | Typecheck, discovery, preflight, report summary, traces, and full Firefox run | Full run had 6 failures and 1 skip; multi-browser full regression not verified | Show an actual failure trace and classify it |
| Cross-browser, responsive, accessibility | 8 | 3 | Four projects configured; smoke attempted all four | Full suite only Firefox; overflow and image-alt assertions failed; no WCAG audit | Show config and state exactly which run used each browser |
| Reporting and defect management | 7 | 5 | HTML/JSON report and failure artifacts; final register records observations | Failure artifacts can be overwritten; suspected product behavior needs confirmation | Show report timestamp, totals, and one failure artifact |
| CI, Git, and security | 5 | 4 | Workflow, ignore rules, manual live-smoke gate; latest CI typecheck succeeded | Latest run is from an earlier commit; working tree is dirty; live job skipped | Explain why CI success does not imply live tests passed |
| Documentation and demonstration | 5 | 3 | Final audit, coverage, demo, readiness, and defect docs | Align remaining legacy documents and rehearse a live/fallback flow | Follow the 12–15 minute guide |
| Viva and technical explanation | 5 | 3 | Project-specific explanations and revision material are present | Replace old invented counts/claims; rehearse technical details from actual code | Answer with source and run evidence |
| **Total** | **100** | **56** |  |  |  |

## Interpretation

The score is intentionally conservative. It awards no credit for a documented feature unless the current implementation and execution evidence support it. A green typecheck, a configured browser project, or a candidate test inventory does not count as a successful functional test.

## Highest-impact improvements

1. Resolve the 360/390/768 overflow observations with repeated evidence and identify the offending element before classifying a product defect.
2. Fix or accurately scope the mobile search and category-menu locator tests.
3. Stabilize the full Firefox run and then execute a full cross-browser run when the live site/network supports it.
4. Correct outdated requirements, test-case, viva, and scorecard documents so candidate and implemented test totals are distinct.
5. Add verified filter-reset and sorting coverage only after observing those interactions on the public site.

## Evidence to show an examiner

- Current test listing and full Firefox report.
- `tests/` and `pages/` source.
- A failure trace and the corresponding classification.
- GitHub Actions run 12: typecheck passed; live-smoke skipped.
- A clear statement that the latest complete browser run is Firefox-only and the current worktree has uncommitted changes.
