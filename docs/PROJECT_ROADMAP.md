# Project Roadmap

The project tests the real public Myntra website at `https://www.myntra.com/` with Playwright Test and TypeScript. No substitute application is in scope.

## Milestones

0. Audit environment, repository, network and browsers; checkpoint constraints.
1. Establish project scope, README, ignore rules and repository standards.
2. Configure Playwright, TypeScript, npm scripts, lockfile and smoke scaffold.
3. Observe and test homepage behavior against the live site.
4. Add observed search and category navigation coverage.
5. Add observed product, filter, sorting and safe bag scenarios. The anonymous empty-bag state is implemented; product browsing and bag mutation remain pending live reconnaissance.
6. Add useful negative, responsive, keyboard and accessibility checks.
7. Trace implemented tests and document test design techniques.
8. Record real execution results, evidence, limitations and verified defects.
9. Add GitHub Actions for reproducible, low-volume checks.
10. Prepare final report, viva questions and demonstration materials.
11. Verify Git state, commands, reports, execution counts, browser coverage and remote status.

Each milestone is validated and committed separately; push only when the result is coherent and verified. A blocked website, registry or GitHub action must be recorded as a blocker, never as a pass. Do not bypass site controls, mutate accounts, place orders, or claim unverified defects.

## Initial risks

- Myntra may block or limit automation or be unreachable from the execution network.
- Dynamic product content can make hard-coded assertions unreliable.
- Browser binaries and npm registry connectivity may differ from cached environment state.
- Browser-specific navigation can differ; desktop Chromium currently reports `ERR_HTTP2_PROTOCOL_ERROR`.
- Product listing/detail, filter/sorting, bag mutation and authenticated scenarios remain out of verified scope.
