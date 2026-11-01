# Viva Preparation Guide

**Project-specific source of truth:** Current code and the 2026-11-01 runs documented in [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md). Older claims of 40/80/447 executed tests, complete WCAG coverage, or a score of 95+/100 are not current results.

## 100 project-specific viva questions and answers

Each answer includes a short spoken response, a technical explanation, a current project example, a likely follow-up, and a mistake to avoid.

### A. Project fundamentals

#### Q1. What is this project?
- **Short:** It is black-box browser automation for selected journeys on Myntra’s public website.
- **Detail:** Playwright Test and TypeScript exercise the live UI and assert observed outcomes; this repository is not Myntra’s source code.
- **Project example:** Homepage, search, product, bag, responsive, and accessibility specs live under `tests/`.
- **Follow-up:** Which journeys passed most recently?
- **Avoid:** Saying that the project tests Myntra’s backend or entire website.

#### Q2. What problem does the project address?
- **Short:** It makes a subset of repeatable storefront checks executable and reportable.
- **Detail:** Browser automation can detect regressions in observable journeys, but a live external target introduces network and UI variability.
- **Project example:** The JSON report records both passes and failures from real runs.
- **Follow-up:** What makes the target difficult to automate?
- **Avoid:** Claiming that every failure is a Myntra defect.

#### Q3. Why choose Myntra?
- **Short:** It provides realistic e-commerce search, listing, product, and bag behavior.
- **Detail:** These user-facing workflows offer practical examples for functional and non-functional testing without access to application internals.
- **Project example:** Four data sets cover winter wear, formal shoes, sports shoes, and sneakers.
- **Follow-up:** Could the same approach test another retailer?
- **Avoid:** Claiming privileged access or permission to test private systems.

#### Q4. What is the project objective?
- **Short:** Validate selected public UI behavior and preserve execution evidence.
- **Detail:** The objective is bounded: automate safe, visible workflows, diagnose failures, and distinguish implemented tests from planned scenarios.
- **Project example:** The latest full Firefox run is reported as 20 passed, 6 failed, and 1 skipped.
- **Follow-up:** Is the project production-ready?
- **Avoid:** Describing the score target as achieved.

#### Q5. What is in scope?
- **Short:** Selected homepage, navigation, search, product, bag, responsive, and semantic checks.
- **Detail:** The scope is defined by current specs, not every requirement in the candidate catalog.
- **Project example:** `tests/search/search.spec.ts` implements normal, empty, whitespace, Unicode, punctuation, and long-input cases.
- **Follow-up:** How do you know an item is implemented?
- **Avoid:** Counting a row in a planning document as automation.

#### Q6. What is out of scope?
- **Short:** Payments, order placement, CAPTCHA bypass, and backend testing.
- **Detail:** Tests must not create real purchases or bypass protections; authentication is a manual human handoff.
- **Project example:** Shopping journeys stop in the bag and remove only the test item.
- **Follow-up:** Why stop before checkout?
- **Avoid:** Saying the project verifies payment processing.

#### Q7. What is the technology stack?
- **Short:** TypeScript, Playwright Test, Node.js, npm, and GitHub Actions.
- **Detail:** `package.json` pins Playwright Test 1.56.1 and TypeScript 5.9.3; `tsconfig.json` enables strict type checking.
- **Project example:** `npm run typecheck` invokes `tsc --noEmit`.
- **Follow-up:** What does TypeScript add?
- **Avoid:** Calling Playwright a programming language.

#### Q8. What is black-box testing?
- **Short:** Testing externally visible behavior without inspecting the application’s implementation.
- **Detail:** The browser interacts with rendered UI and checks outcomes; no access to Myntra’s private code or database is assumed.
- **Project example:** A search test asserts the resulting URL after submitting a query.
- **Follow-up:** What is white-box testing?
- **Avoid:** Claiming the tests inspect Myntra’s internal source.

#### Q9. How many unique automated tests exist?
- **Short:** There are 27 unique definitions discovered across 12 spec files.
- **Detail:** Four configured projects produce 108 project-specific listings, not 108 unique cases.
- **Project example:** `npx playwright test --list` reports the configured listings.
- **Follow-up:** How many executed in the latest full run?
- **Avoid:** Reporting browser-project copies as separate unique test cases.

#### Q10. What is the biggest project limitation?
- **Short:** The live-site results are variable, and the full suite is not yet stable across all browsers.
- **Detail:** The latest full run covered Firefox; the separate smoke run covered four projects and had failures.
- **Project example:** Desktop Chromium encountered an HTTP/2 navigation error in smoke.
- **Follow-up:** What would you improve first?
- **Avoid:** Saying external variability excuses every test failure.

### B. Software testing fundamentals

#### Q11. What is the difference between verification and validation?
- **Short:** Verification checks the work product; validation checks behavior against expectations.
- **Detail:** Type checking is static verification; browser tests validate observed UI behavior.
- **Project example:** `npm run typecheck` versus a live search test.
- **Follow-up:** Can one replace the other?
- **Avoid:** Treating them as synonyms.

#### Q12. How do QA and QC differ?
- **Short:** QA improves the process; QC evaluates the product or result.
- **Detail:** Test planning and standards support QA; executing Playwright assertions is QC activity.
- **Project example:** The test plan is process guidance; the run report is execution evidence.
- **Follow-up:** Is automation itself QA?
- **Avoid:** Saying a passing test guarantees quality.

#### Q13. What are SDLC and STLC?
- **Short:** SDLC covers software development; STLC covers testing activities.
- **Detail:** STLC commonly includes analysis, planning, design, setup, execution, and closure.
- **Project example:** Requirements and test cases precede execution and reporting in this repository.
- **Follow-up:** Where does defect retesting fit?
- **Avoid:** Saying STLC only means running scripts.

#### Q14. Scenario versus test case?
- **Short:** A scenario is a high-level behavior; a test case specifies preconditions, steps, and expected results.
- **Detail:** A scenario may produce several precise tests.
- **Project example:** “Search works” is broad; `SEARCH-006` checks that an empty query preserves the current URL.
- **Follow-up:** What is a test script?
- **Avoid:** Treating a scenario as detailed execution evidence.

#### Q15. Test case versus test execution?
- **Short:** A test case is a specification; an execution is one run of it in an environment.
- **Detail:** The same unique case can have multiple browser executions and different outcomes.
- **Project example:** 27 definitions yielded 27 Firefox entries in the full Firefox run.
- **Follow-up:** Why report both?
- **Avoid:** Calling 108 project listings 108 unique tests.

#### Q16. Functional versus non-functional testing?
- **Short:** Functional checks what the system does; non-functional checks qualities such as usability or compatibility.
- **Detail:** Both need measurable oracles and a defined environment.
- **Project example:** Search navigation is functional; horizontal-overflow measurement is responsive.
- **Follow-up:** Is accessibility only non-functional?
- **Avoid:** Saying non-functional tests have no assertions.

#### Q17. Smoke versus regression testing?
- **Short:** Smoke testing checks a small critical subset; regression testing checks a wider set for unintended changes.
- **Detail:** Tags select the configured cases; a smoke result does not imply regression success.
- **Project example:** `npm run test:smoke` selects `@smoke`; `npm run test:regression` selects `@regression`.
- **Follow-up:** How many smoke executions passed?
- **Avoid:** Describing a smoke run as full coverage.

#### Q18. Retesting versus regression?
- **Short:** Retesting checks a specific fix; regression checks related behavior for collateral effects.
- **Detail:** A failed case should be rerun after a targeted change, then relevant neighboring cases run.
- **Project example:** A future mobile locator fix needs both its focused test and smoke coverage.
- **Follow-up:** Does retrying equal retesting?
- **Avoid:** Using retries to conceal a deterministic failure.

#### Q19. Severity versus priority?
- **Short:** Severity is impact; priority is urgency.
- **Detail:** A localized layout issue may be medium severity but scheduled later than a release blocker.
- **Project example:** Responsive overflow is recorded as a potential medium issue pending confirmation.
- **Follow-up:** Who sets priority?
- **Avoid:** Treating severity and priority as interchangeable.

#### Q20. What is a test oracle?
- **Short:** A rule or observation that determines whether behavior meets expectation.
- **Detail:** A useful oracle is specific, measurable, and tied to a requirement.
- **Project example:** `toHaveURL(/women-kurta/i)` checks query navigation.
- **Follow-up:** Can an assertion be too weak?
- **Avoid:** Calling any green result a meaningful oracle.

### C. Test design techniques

#### Q21. What is equivalence partitioning?
- **Short:** Group inputs expected to behave alike and sample representative values.
- **Detail:** It reduces redundant cases while preserving meaningful input classes.
- **Project example:** A non-empty search query and an empty query represent different classes.
- **Follow-up:** What class is missing?
- **Avoid:** Claiming all search classes are covered.

#### Q22. What is boundary value analysis?
- **Short:** Test values at or near an input boundary.
- **Detail:** Defects often occur at minimums, maximums, and transitions between valid and invalid data.
- **Project example:** Empty input and an 80-character query exist; the long case timed out before its assertion.
- **Follow-up:** What boundary values would you add?
- **Avoid:** Calling every unusual string a boundary test.

#### Q23. What is decision-table testing?
- **Short:** Test combinations of conditions and their resulting actions.
- **Detail:** It is useful when behavior depends on multiple Boolean rules.
- **Project example:** Add-to-bag without a selected size is tested for a size prompt.
- **Follow-up:** Which rule is untested?
- **Avoid:** Claiming all stock/size combinations are covered.

#### Q24. What is state-transition testing?
- **Short:** Verify states and transitions triggered by actions.
- **Detail:** It checks both valid transition behavior and invalid transitions.
- **Project example:** Empty bag → test item → verify → remove → empty bag.
- **Follow-up:** Which safety precondition is used?
- **Avoid:** Testing a state without checking its starting condition.

#### Q25. What is use-case testing?
- **Short:** Test an end-to-end user goal through connected steps.
- **Detail:** It validates interactions across multiple pages or components.
- **Project example:** Four category journeys search, inspect a product, select a size, and verify safe bag cleanup.
- **Follow-up:** What can make an end-to-end test fragile?
- **Avoid:** Assuming a long journey is automatically high quality.

#### Q26. What is error guessing?
- **Short:** Use experience to target likely failure points.
- **Detail:** It complements systematic techniques but is not a substitute for documented expected behavior.
- **Project example:** Punctuation and Unicode search inputs exercise likely parsing edge cases.
- **Follow-up:** How do you avoid arbitrary guessing?
- **Avoid:** Presenting untested ideas as executed cases.

#### Q27. What is pairwise testing?
- **Short:** Select combinations so each pair of parameter values appears at least once.
- **Detail:** It reduces combinatorial test count while targeting interaction faults.
- **Project example:** Broad category/brand/price pairwise coverage is documented as a future idea, not current automation.
- **Follow-up:** What is the limitation?
- **Avoid:** Claiming pairwise coverage without a generated/recorded matrix.

#### Q28. What is risk-based testing?
- **Short:** Prioritize by likelihood and impact of failure.
- **Detail:** High-impact operations and data safety deserve stronger controls.
- **Project example:** Cart mutation is gated on an empty bag and identity checks.
- **Follow-up:** Which action is prohibited?
- **Avoid:** Running payment or order tests on a real public site.

#### Q29. What is exploratory testing?
- **Short:** Learn and test through structured investigation without a fully scripted path.
- **Detail:** Notes should record scope, observations, and environment to make findings reproducible.
- **Project example:** Inspecting whether the mobile search affordance is interactive is a useful next exploratory task.
- **Follow-up:** How do you turn an observation into a test?
- **Avoid:** Claiming undocumented exploration as evidence.

#### Q30. What are positive and negative tests?
- **Short:** Positive tests use valid conditions; negative tests check invalid or disallowed conditions.
- **Detail:** Both confirm the application handles inputs and state appropriately.
- **Project example:** Normal search is positive; add-to-bag without size selection is negative.
- **Follow-up:** What should a negative test assert?
- **Avoid:** Assuming a failed request is a successful negative test.

### D. Playwright

#### Q31. What is Playwright?
- **Short:** A browser automation and testing framework.
- **Detail:** Playwright Test provides fixtures, assertions, projects, parallelism, reporters, and trace tooling.
- **Project example:** `@playwright/test` runs the TypeScript specs.
- **Follow-up:** Which browser engines are configured?
- **Avoid:** Calling Playwright a browser itself.

#### Q32. Why use Playwright here?
- **Short:** It supports browser projects, auto-waiting, isolated contexts, and built-in reports.
- **Detail:** These features suit UI automation and diagnosis across engines.
- **Project example:** The config defines Chromium, Firefox, WebKit, and mobile Chromium projects.
- **Follow-up:** What are its limitations here?
- **Avoid:** Claiming it removes live-site instability.

#### Q33. How does Playwright differ from Selenium?
- **Short:** They are different browser-automation ecosystems with distinct APIs and execution models.
- **Detail:** Both can automate browsers; choice depends on language, browser, tooling, and project needs.
- **Project example:** This repository uses Playwright Test fixtures and projects.
- **Follow-up:** Is one always faster?
- **Avoid:** Making absolute performance claims without a benchmark.

#### Q34. Browser, context, and page?
- **Short:** Browser is the engine process; context is an isolated session; page is a tab.
- **Detail:** Contexts isolate cookies and storage; pages can open popups.
- **Project example:** `full-shopping-flow.spec.ts` creates a context with local storage state.
- **Follow-up:** How are tests isolated by default?
- **Avoid:** Saying every page is a separate browser process.

#### Q35. What are fixtures?
- **Short:** Reusable test resources provided to a test.
- **Detail:** Playwright supplies `page`, `browser`, and other fixtures and manages their lifecycle.
- **Project example:** Most tests receive `{ page }` from the runner.
- **Follow-up:** Why use a custom fixture?
- **Avoid:** Confusing fixtures with test data alone.

#### Q36. What is auto-waiting?
- **Short:** Playwright waits for actionability conditions before actions and retries web assertions.
- **Detail:** It reduces timing races without fixed sleeps, but cannot fix wrong locators or unavailable sites.
- **Project example:** `expect(locator).toBeVisible()` retries until timeout.
- **Follow-up:** What causes a timeout anyway?
- **Avoid:** Saying auto-wait means tests cannot be flaky.

#### Q37. Locator versus selector?
- **Short:** A locator is a deferred query with auto-waiting; a selector is one way to identify elements.
- **Detail:** Semantic locators often express user intent better than CSS.
- **Project example:** Search helper prefers roles/labels and includes CSS fallbacks for the live UI.
- **Follow-up:** Which locators should be preferred?
- **Avoid:** Using brittle positional CSS without justification.

#### Q38. What are web-first assertions?
- **Short:** Assertions that retry until the expected browser state appears or times out.
- **Detail:** They synchronize around observable conditions rather than fixed delays.
- **Project example:** Product tests assert a PDP title is visible.
- **Follow-up:** When should a plain assertion be used?
- **Avoid:** Adding arbitrary waits to hide a race.

#### Q39. Why use browser projects?
- **Short:** Projects run the same suite with different browser/device settings.
- **Detail:** This creates compatibility evidence only for cases actually executed.
- **Project example:** The four current projects yield 108 discovery entries from 27 tests.
- **Follow-up:** Did all four full suites pass?
- **Avoid:** Confusing configuration with successful execution.

#### Q40. What do traces and reports provide?
- **Short:** They preserve test steps, browser state, diagnostics, and outcomes.
- **Detail:** HTML/JSON reporters summarize runs; traces help inspect actions, DOM snapshots, and network context.
- **Project example:** The config retains traces, screenshots, and videos on failure.
- **Follow-up:** How long are local artifacts retained?
- **Avoid:** Presenting a stale report as a current run.

### E. TypeScript, code, and architecture

#### Q41. Why TypeScript?
- **Short:** It adds static type checking to JavaScript.
- **Detail:** Types catch many interface mistakes before browser execution.
- **Project example:** `tsconfig.json` enables strict mode and `npm run typecheck` runs `tsc --noEmit`.
- **Follow-up:** Does type safety prove behavior?
- **Avoid:** Treating compilation as functional validation.

#### Q42. What is `async`/`await`?
- **Short:** Syntax for working with promises in a readable sequential style.
- **Detail:** Browser actions and navigation return promises and should be awaited.
- **Project example:** `await search.fill(query)` precedes `await search.press('Enter')`.
- **Follow-up:** What if the promise rejects?
- **Avoid:** Omitting awaits on asynchronous UI actions.

#### Q43. What is the Page Object Model?
- **Short:** A pattern that encapsulates page locators and actions behind page-specific classes.
- **Detail:** It can localize UI changes, though it should not hide assertions or add needless abstraction.
- **Project example:** `HomePage`, `ProductPage`, and `ShoppingBagPage` are in `pages/`.
- **Follow-up:** Is every locator semantic?
- **Avoid:** Claiming all selectors use roles; some are CSS.

#### Q44. What does `BasePage` do?
- **Short:** It provides common navigation and page helpers.
- **Detail:** Shared operations reduce repeated code where they are genuinely common.
- **Project example:** It implements `navigateTo`, `reloadPage`, and title/URL assertions.
- **Follow-up:** What could be removed if unused?
- **Avoid:** Claiming every helper is used by every page.

#### Q45. How is search-field discovery implemented?
- **Short:** It tries semantic locators first, then site-specific attribute/CSS candidates.
- **Detail:** It checks that a candidate is a text-entry element before returning it.
- **Project example:** `tests/support/search.ts` has `findSearchField` and `requireSearchTextField`.
- **Follow-up:** Why not force the mobile banner into this helper?
- **Avoid:** Returning an arbitrary clickable element as a text field.

#### Q46. How are popups handled?
- **Short:** Wait for the popup event while triggering the click.
- **Detail:** `Promise.all` prevents missing a fast popup event.
- **Project example:** Category journeys pair `page.waitForEvent('popup')` with product-link click.
- **Follow-up:** How do you close it?
- **Avoid:** Clicking first and waiting afterward.

#### Q47. How does safe bag cleanup work?
- **Short:** The journey checks the bag is empty, verifies the added product, and removes only that item.
- **Detail:** `finally` attempts cleanup even if an assertion fails; identity/count mismatches stop unsafe removal.
- **Project example:** `addVerifyAndRemoveTestItem` in `category-journey.ts`.
- **Follow-up:** Does it place an order?
- **Avoid:** Saying cleanup is infallible under network loss.

#### Q48. How are tests tagged?
- **Short:** Playwright tags select smoke, search, bag, accessibility, responsive, and regression cases.
- **Detail:** npm scripts map to `--grep` or project selectors.
- **Project example:** `npm run test:search` selects `@search`.
- **Follow-up:** Does a tag change the test oracle?
- **Avoid:** Counting tags as separate tests.

#### Q49. How are errors handled?
- **Short:** Assertions fail with diagnostics; unsafe conditions throw or skip with a reason.
- **Detail:** A failure should remain visible and be classified rather than converted to a pass.
- **Project example:** Bag cleanup refuses to remove an unexpected item count.
- **Follow-up:** When is a skip justified?
- **Avoid:** Catching all errors and reporting success.

#### Q50. What is the role of test data?
- **Short:** It supplies inputs and expected conditions for a scenario.
- **Detail:** Data-driven cases are useful when the same journey applies to different categories.
- **Project example:** `CategoryJourney` defines query, path, title pattern, and relevant product.
- **Follow-up:** How is data kept safe?
- **Avoid:** Putting credentials or OTP values in fixtures.

### F. E-commerce test design

#### Q51. What is tested in search?
- **Short:** Control discovery, a normal query, empty query, whitespace, Unicode, punctuation, and long input.
- **Detail:** These tests assert visibility, URL behavior, or a safe page outcome.
- **Project example:** The 80-character case exists but timed out during page setup in the latest full run.
- **Follow-up:** Is zero-result messaging tested?
- **Avoid:** Claiming suggestions and zero-results coverage.

#### Q52. How do you test category listings?
- **Short:** Search for a category and inspect matching cards and product details.
- **Detail:** Current journeys cover four product themes, not every Myntra category.
- **Project example:** Winter, formal, sports, and sneaker specs use shared journey code.
- **Follow-up:** Are all filter combinations covered?
- **Avoid:** Saying the suite covers all categories.

#### Q53. How is product detail behavior tested?
- **Short:** The spec checks visible product name, price, image, and available sizes.
- **Detail:** These are observable UI assertions, not a backend inventory check.
- **Project example:** `ProductPage.expectLoaded()` checks name, price, and main image.
- **Follow-up:** Does the test validate every image?
- **Avoid:** Claiming complete PDP coverage.

#### Q54. What happens when size is not selected?
- **Short:** The test clicks Add to Bag and expects a size-selection prompt.
- **Detail:** This is a negative case for a required precondition.
- **Project example:** `PRODUCT-030 & SIZE-003` in `tests/product/product.spec.ts`.
- **Follow-up:** Are out-of-stock sizes covered?
- **Avoid:** Claiming all variant rules are tested.

#### Q55. Is sorting tested?
- **Short:** No, not in current executable specs.
- **Detail:** Price-sorting descriptions in older documents are candidate/planned coverage only.
- **Project example:** No active spec selects a sort option and checks numeric order.
- **Follow-up:** How would you test it?
- **Avoid:** Citing a documented helper as an executed test.

#### Q56. Is filtering tested?
- **Short:** Brand filtering is used in selected category journeys; reset and broad combinations are not.
- **Detail:** Executable filtering is limited to visible brand selection in some flows.
- **Project example:** `applyBrandFilter` in `CategoryPage` and journey helper.
- **Follow-up:** What would clear-filter testing require?
- **Avoid:** Claiming full faceted filtering.

#### Q57. How is the bag tested safely?
- **Short:** Start empty, add one selected-size item, verify identity/size, remove it.
- **Detail:** Tests must stop if bag state is unexpected and never place an order.
- **Project example:** `ShoppingBagPage.removeOnlyTestItem` refuses mismatched product IDs.
- **Follow-up:** What if another item exists?
- **Avoid:** Removing all cart items indiscriminately.

#### Q58. What authentication tests exist?
- **Short:** One account-changing journey is gated on local state and was skipped.
- **Detail:** Manual login setup allows human OTP/CAPTCHA handling; that does not constitute a verified auth test.
- **Project example:** `scripts/setup-auth.mjs` stores state locally after a visible sign-in check.
- **Follow-up:** How are secrets protected?
- **Avoid:** Automating CAPTCHA or storing credentials in source.

#### Q59. Is checkout tested?
- **Short:** The test flow stops in the shopping bag before order placement.
- **Detail:** Payment and order completion are intentionally excluded.
- **Project example:** The full shopping flow asserts the bag and order button, then cleanup occurs.
- **Follow-up:** Why is this boundary important?
- **Avoid:** Clicking “Place Order” in a real environment.

#### Q60. How do you avoid test-data pollution?
- **Short:** Use isolated contexts and guarded cleanup.
- **Detail:** Before mutation, verify the expected initial state; after mutation, remove only identified test data.
- **Project example:** Each category journey checks the bag is empty.
- **Follow-up:** What if cleanup itself fails?
- **Avoid:** Assuming isolated browser contexts protect a server-side account bag.

### G. Non-functional testing

#### Q61. What cross-browser tests are configured?
- **Short:** Chromium desktop, Firefox desktop, WebKit desktop, and Chromium mobile emulation.
- **Detail:** The latest full suite was Firefox-only; only smoke was run across all projects.
- **Project example:** Names are in `playwright.config.ts`.
- **Follow-up:** What did the latest smoke show?
- **Avoid:** Claiming all four full suites passed.

#### Q62. What is responsive testing?
- **Short:** Checking whether UI remains usable at specified viewport sizes.
- **Detail:** A viewport check is one signal, not proof of device-wide usability.
- **Project example:** The suite measures overflow at 360, 390, 768, and 1280 widths.
- **Follow-up:** Which widths failed?
- **Avoid:** Claiming all mobile layouts pass.

#### Q63. What is horizontal overflow?
- **Short:** Content width exceeds the visible viewport width.
- **Detail:** It can make content inaccessible or require unintended horizontal scrolling.
- **Project example:** Firefox reported overflow at 360×640, 390×844, and 768×1024.
- **Follow-up:** Is the root element known?
- **Avoid:** Calling the observation a confirmed product defect before inspection.

#### Q64. What accessibility checks exist?
- **Short:** Limited title, landmark, image-alt, and search-name checks.
- **Detail:** These are selected automated checks and do not assess all WCAG criteria.
- **Project example:** The sampled image-alt assertion failed in Firefox.
- **Follow-up:** What is not tested?
- **Avoid:** Claiming WCAG conformance.

#### Q65. Why is `alt=""` sometimes valid?
- **Short:** Decorative images may use empty alt text so assistive technology can skip them.
- **Detail:** Informative images need meaningful alternatives; automated checks must know the image’s role.
- **Project example:** The current test checks attribute presence too broadly and needs refinement.
- **Follow-up:** How would you improve it?
- **Avoid:** Requiring non-empty alt text for every decorative image.

#### Q66. What is keyboard accessibility?
- **Short:** Users can reach and operate controls using a keyboard with clear focus.
- **Detail:** It requires testing tab order, focus indication, and control operation.
- **Project example:** The current specs do not provide complete keyboard navigation coverage.
- **Follow-up:** What would you automate first?
- **Avoid:** Claiming that an accessible name proves keyboard usability.

#### Q67. Is performance tested?
- **Short:** No dedicated performance or load test is present.
- **Detail:** Navigation timeouts are test controls, not performance benchmarks.
- **Project example:** The 45-second test timeout prevents indefinite waiting.
- **Follow-up:** How would performance testing differ?
- **Avoid:** Calling a page-load timeout a performance measurement.

#### Q68. What is compatibility testing?
- **Short:** Checking consistent behavior across browsers, devices, and environments.
- **Detail:** It needs comparable scenarios and environment records.
- **Project example:** Four projects are configured, but full comparative results are incomplete.
- **Follow-up:** What evidence is needed?
- **Avoid:** Inferring compatibility from configuration alone.

#### Q69. What is visual regression testing?
- **Short:** Comparing rendered output to an approved baseline.
- **Detail:** It requires stable baselines and handling dynamic content.
- **Project example:** No screenshot baseline comparison is configured; failure screenshots are diagnostics only.
- **Follow-up:** Would snapshots help this live site?
- **Avoid:** Calling failure screenshots visual regression tests.

#### Q70. What security testing is performed?
- **Short:** The project enforces safe scope and secret-exclusion checks; it is not a security penetration test.
- **Detail:** No auth bypass or private API probing is allowed.
- **Project example:** `.gitignore` excludes environment/auth state; preflight checks tracked auth state.
- **Follow-up:** Are there credentials in test data?
- **Avoid:** Claiming a full security audit.

### H. Debugging and reliability

#### Q71. What is a flaky test?
- **Short:** A test whose outcome varies without a relevant code or product change.
- **Detail:** Causes include timing, network variability, shared state, and unstable locators.
- **Project example:** Live-site transport issues can cause nondeterministic navigation.
- **Follow-up:** How do you diagnose it?
- **Avoid:** Treating one retry as proof of stability.

#### Q72. What does `ERR_HTTP2_PROTOCOL_ERROR` mean here?
- **Short:** Browser navigation failed at the HTTP/2 transport/protocol layer.
- **Detail:** The observed error does not by itself identify Myntra as the cause.
- **Project example:** Two desktop Chromium smoke cases failed with this error.
- **Follow-up:** How do other browsers help?
- **Avoid:** Filing it as a confirmed application bug.

#### Q73. How do you classify a network failure?
- **Short:** Record the exact error, browser, URL, timestamp, and comparison results.
- **Detail:** Separate transport failures from a page that loaded but violated an assertion.
- **Project example:** Chromium smoke navigation failed; Firefox and WebKit smoke passed.
- **Follow-up:** What would you rerun?
- **Avoid:** Relabeling the failure as skipped or passed.

#### Q74. Why avoid fixed waits?
- **Short:** Fixed waits waste time and still may be too short.
- **Detail:** Prefer event waits and web-first assertions that reflect application state.
- **Project example:** Specs use `toBeVisible` and `domcontentloaded`, not arbitrary `waitForTimeout`.
- **Follow-up:** When might a fixed delay be justified?
- **Avoid:** Using sleeps as the first synchronization strategy.

#### Q75. What caused the long-query failure?
- **Short:** The test timed out while Playwright created a page, before the search assertion.
- **Detail:** This run does not show whether an 80-character query is handled correctly.
- **Project example:** `SEARCH-010` failed during fixture setup in the Firefox run.
- **Follow-up:** What next?
- **Avoid:** Claiming the search feature rejected the query.

#### Q76. How do you investigate an assertion failure?
- **Short:** Inspect the expected/actual values, error context, trace, screenshot, and run metadata.
- **Detail:** Reproduce with the smallest relevant test before changing the oracle or locator.
- **Project example:** The menu hover failure needs a locator/DOM check, not a silent skip.
- **Follow-up:** What do you change first?
- **Avoid:** Weakening an assertion just to get green.

#### Q77. Why might a mobile locator fail?
- **Short:** Responsive UI may use a different control or accessible structure.
- **Detail:** A desktop input selector may not identify a mobile banner or button.
- **Project example:** Mobile smoke did not find `HomePage.searchInput`.
- **Follow-up:** How can you test it correctly?
- **Avoid:** Assuming a visual banner is a textbox.

#### Q78. How do retries work?
- **Short:** The runner can rerun failed tests according to configured retry policy.
- **Detail:** Retries can help diagnose transient failures but should not hide instability.
- **Project example:** Local retries are zero; CI sets one retry.
- **Follow-up:** What is a flaky result?
- **Avoid:** Reporting only the final retry pass.

#### Q79. What is test isolation?
- **Short:** Each test receives controlled independent browser state.
- **Detail:** Browser contexts isolate client-side storage but not necessarily external account state.
- **Project example:** The authenticated flow checks server-side bag state before mutations.
- **Follow-up:** Why still need cleanup?
- **Avoid:** Assuming browser contexts isolate remote shopping bags.

#### Q80. What if Myntra is unavailable during the exam?
- **Short:** State the limitation and show a timestamped genuine report and source.
- **Detail:** Historical evidence demonstrates prior execution, not a current pass.
- **Project example:** Use the latest local JSON/HTML report and its trace, if still present.
- **Follow-up:** What can still be verified offline?
- **Avoid:** Presenting an old report as live execution.

### I. GitHub, CI, and security

#### Q81. What is Git?
- **Short:** A version-control system for tracking changes.
- **Detail:** Git history records committed states; uncommitted changes are not part of the last commit.
- **Project example:** The current branch is `main` and the worktree is dirty.
- **Follow-up:** What is the current HEAD?
- **Avoid:** Claiming new local docs were pushed.

#### Q82. What is GitHub?
- **Short:** A hosted platform for Git repositories and collaboration.
- **Detail:** It also provides Actions workflows, pull requests, issues, and artifacts.
- **Project example:** The repository remote is configured on GitHub.
- **Follow-up:** Is the latest CI run for current uncommitted code?
- **Avoid:** Equating remote status with local worktree status.

#### Q83. What does CI do here?
- **Short:** It runs type checking on push and pull request events.
- **Detail:** Live browser smoke is gated behind manual workflow dispatch.
- **Project example:** The latest visible action passed `typecheck`; `live-smoke` was skipped on push.
- **Follow-up:** Does CI prove live tests pass?
- **Avoid:** Saying a typecheck-only run is a regression pass.

#### Q84. What is a GitHub Actions workflow?
- **Short:** YAML configuration defining events, jobs, runners, and steps.
- **Detail:** Job conditions can decide whether live tests run.
- **Project example:** `.github/workflows/playwright.yml`.
- **Follow-up:** How are artifacts uploaded?
- **Avoid:** Claiming an artifact exists unless the run shows it.

#### Q85. What is a commit?
- **Short:** A recorded snapshot of staged changes.
- **Detail:** It includes a message and points to a parent revision.
- **Project example:** Audit changes remain uncommitted; no new commit was created.
- **Follow-up:** Why is the worktree dirty?
- **Avoid:** Saying generated artifacts are part of the commit.

#### Q86. What is a pull request?
- **Short:** A proposed change for review and integration.
- **Detail:** It provides a discussion and validation surface before merging.
- **Project example:** The workflow includes a pull-request trigger.
- **Follow-up:** What check should block merging?
- **Avoid:** Confusing a push with a pull request.

#### Q87. What are environment variables?
- **Short:** External configuration values supplied to a process.
- **Detail:** They allow environment-specific settings without hardcoding sensitive values.
- **Project example:** `MYNTRA_BASE_URL` can override the default public URL.
- **Follow-up:** Where should secrets live?
- **Avoid:** Committing a `.env` file.

#### Q88. How are secrets protected?
- **Short:** Ignore local environment/auth state and keep credentials out of code/reports.
- **Detail:** Manual sign-in allows OTP/CAPTCHA without automation or disclosure.
- **Project example:** `playwright/.auth/` is Git-ignored and checked by preflight.
- **Follow-up:** What does preflight verify?
- **Avoid:** Opening or uploading storage-state JSON.

#### Q89. What is `.gitignore`?
- **Short:** Rules for excluding untracked files from Git status/addition.
- **Detail:** It does not remove secrets that were already committed.
- **Project example:** It excludes `node_modules`, reports, test results, `.env`, and auth state.
- **Follow-up:** How would you remove a tracked secret?
- **Avoid:** Assuming ignore rules erase Git history.

#### Q90. What does the demo verifier prove?
- **Short:** It checks expected demo files, scripts, reporter config, output folder, and Playwright CLI availability.
- **Detail:** It is not a browser run and does not prove Myntra is reachable.
- **Project example:** `npm run verify:demo` passed six checks.
- **Follow-up:** Which command checks live behavior?
- **Avoid:** Calling the verifier a successful live demo.

### J. Examiner challenge questions

#### Q91. What is genuinely automated?
- **Short:** Twenty-seven test definitions are discoverable; the latest full run executed 26 in Firefox.
- **Detail:** Twenty passed, six failed, and one gated auth test skipped.
- **Project example:** Use the current report, not the 447-case candidate inventory.
- **Follow-up:** What is manual?
- **Avoid:** Inflating the count with each browser listing.

#### Q92. What actual Myntra defects did you find?
- **Short:** None is confirmed.
- **Detail:** The image-alt and responsive observations need repeated inspection before product-defect classification.
- **Project example:** Three viewport overflow assertions failed once in the Firefox run.
- **Follow-up:** Why record them?
- **Avoid:** Claiming a confirmed defect based on one run alone.

#### Q93. How do you know assertions are correct?
- **Short:** They are tied to observable requirements, but each oracle must be reviewed.
- **Detail:** Assertions can be weak or wrong; test failures expose both product and automation issues.
- **Project example:** The mobile desktop-input assertion likely needs a mobile-specific oracle.
- **Follow-up:** How do you validate an oracle?
- **Avoid:** Saying any assertion is automatically valid.

#### Q94. Why is this more than scripts?
- **Short:** It combines executable tests, test design, configuration, reporting, safety, and traceability.
- **Detail:** The evidence is limited and must be stated honestly.
- **Project example:** Page objects, reusable journey helper, CI, and generated reports are included.
- **Follow-up:** What is its weakest part?
- **Avoid:** Calling it enterprise-grade or complete without evidence.

#### Q95. What would happen if the test ran twice?
- **Short:** Read-only cases should remain repeatable; bag journeys check state and clean up.
- **Detail:** External state or interrupted cleanup can still affect later runs, so preconditions are essential.
- **Project example:** A non-empty bag causes the mutation journey to refuse to proceed.
- **Follow-up:** How do you recover safely?
- **Avoid:** Assuming repeated execution is always harmless.

#### Q96. Why is the score below the 95+ target?
- **Short:** Current results show limited coverage, unresolved failures, and incomplete cross-browser validation.
- **Detail:** The target was aspirational; the estimate is evidence-based and not an official grade.
- **Project example:** The scorecard estimates 56/100.
- **Follow-up:** What raises it most?
- **Avoid:** Treating documentation volume as implementation evidence.

#### Q97. Why not skip the failed tests?
- **Short:** Failures are part of the actual result and need diagnosis.
- **Detail:** Skipping would obscure reliability and reduce evidence quality.
- **Project example:** Responsive and image-alt failures remain recorded.
- **Follow-up:** When is skip appropriate?
- **Avoid:** Skipping a case solely to improve pass percentage.

#### Q98. Can the suite test Myntra’s backend?
- **Short:** No, it exercises the browser UI only.
- **Detail:** Backend APIs, databases, payment processing, and internal services are outside access and scope.
- **Project example:** The test observes the bag page after a UI action.
- **Follow-up:** What would API testing require?
- **Avoid:** Inferring backend correctness from a visible page.

#### Q99. What is the next highest-impact improvement?
- **Short:** Investigate the overflow observations and fix/accurately scope mobile and navigation locators.
- **Detail:** Repeat each failure under controlled conditions and inspect traces before changing tests.
- **Project example:** Start with 390×844 and the `NAV-001` failure.
- **Follow-up:** What comes after?
- **Avoid:** Adding many unverified scenarios first.

#### Q100. What should the examiner remember?
- **Short:** The project is real, selective automation with transparent results and clear safety limits.
- **Detail:** It demonstrates practical testing, but the latest suite has failures and does not certify the whole site.
- **Project example:** 27 unique cases; latest full Firefox result was 20/6/1.
- **Follow-up:** Which result will you show?
- **Avoid:** Claiming complete coverage or 95+ achievement.

## 50 rapid-fire prompts and answer cues

1. **Target?** Public Myntra storefront.
2. **Testing style?** Black-box UI automation.
3. **Language?** TypeScript.
4. **Runner?** Playwright Test.
5. **Current unique definitions?** 27.
6. **Spec files?** 12.
7. **Configured projects?** Four.
8. **Latest full suite engine?** Firefox.
9. **Latest full result?** 20 pass, 6 fail, 1 skip.
10. **Latest all-project smoke?** 5 pass, 3 fail.
11. **Typecheck command?** `npm run typecheck`.
12. **Discovery command?** `npx playwright test --list`.
13. **Preflight command?** `npm run preflight`.
14. **Demo verification?** `npm run verify:demo`.
15. **Report summary?** `npm run report:summary`.
16. **Base URL setting?** `MYNTRA_BASE_URL`.
17. **POM folder?** `pages/`.
18. **Test folder?** `tests/`.
19. **Search helper?** `tests/support/search.ts`.
20. **Browser config?** `playwright.config.ts`.
21. **First search case?** Search control availability.
22. **Empty query?** URL should remain unchanged.
23. **Long query result?** Setup timed out; behavior unverified.
24. **Category journeys?** Four product themes.
25. **Sort test?** Not implemented.
26. **Filter reset test?** Not implemented.
27. **Brand filter?** Selected journeys only.
28. **Bag mutation guard?** Empty bag precondition.
29. **Order placement?** Prohibited.
30. **Auth flow result?** Skipped without local state.
31. **OTP?** Human-only.
32. **CAPTCHA?** Never bypass.
33. **HTTP2 error?** Transport/navigation blocker.
34. **Mobile search?** Current locator mismatch.
35. **Overflow widths?** 360, 390, 768 failed.
36. **1280 overflow?** Passed in Firefox.
37. **WCAG certified?** No.
38. **Visual baseline?** None.
39. **Load test?** None.
40. **Report formats?** HTML and JSON.
41. **Failure trace?** Retained on failure.
42. **Local worker count?** One.
43. **CI worker count?** Two.
44. **Push CI?** Typecheck.
45. **Live CI?** Manual dispatch.
46. **Latest remote CI?** Typecheck success; live job skipped.
47. **Current worktree?** Dirty, uncommitted changes.
48. **Commit made in audit?** No.
49. **Confirmed product defects?** None.
50. **Assessment estimate?** 56/100, internal only.

## 20 difficult examiner questions

The responses below are self-contained; they are not cross-references to unrelated question numbers in the main bank.

1. **Why not file a protocol failure as a production defect immediately?** The observed Chromium error occurred during navigation (`ERR_HTTP2_PROTOCOL_ERROR`). It identifies a transport/edge failure, not a confirmed application bug; reproduce it and compare browser/network evidence before assigning a product root cause.
2. **How do you determine whether mobile search or the test is wrong?** Inspect the current mobile DOM and interaction, then define an assertion for the actual affordance. The smoke run only showed that the desktop input locator was not visible; it did not verify the mobile banner's behavior.
3. **Why does the 80-character case not prove long queries work?** It was discovered, but its latest Firefox execution timed out during `browserContext.newPage`, before the query was entered or asserted.
4. **Discovered versus executed?** Discovery lists definitions. Execution means a runner started a test and recorded an outcome. A project-specific listing is not a new unique definition.
5. **How could an isolated context still affect a remote cart?** Context isolation separates browser storage, not necessarily account/server-side state. Check that the bag is empty, verify the item identity, and remove only the test item.
6. **Why might an `alt`-attribute check be inadequate?** Attribute presence does not establish useful alternative text, and decorative images can correctly have empty alternatives. The current sampled assertion needs review and is not a WCAG audit.
7. **Why is configured WebKit not cross-browser proof?** Configuration proves only that a project exists. A browser-specific run with recorded outcomes is required; the latest full run covered Firefox only.
8. **What evidence is needed before calling overflow a product defect?** Repeat at the affected viewport, capture current page state, identify the element causing overflow, and rule out test/environment conditions.
9. **Why is skipped authentication not a pass?** The flow did not run because local auth state was absent. It provides no result about authenticated behavior.
10. **What is the risk of broad CSS selectors?** They may match the wrong element or break when the live site's DOM changes. Prefer user-facing locators where reliable and keep selectors specific and asserted.
11. **Why is one successful search not proof of reliability?** It covers only one input, browser, and moment. Search behavior needs representative cases and repeatable runs.
12. **What may cause `browserContext.newPage` to time out?** Resource pressure, browser startup, process contention, or runner/environment problems are possibilities. The observed timeout happened before the search assertion, so its root cause is not established.
13. **How do you prevent cleanup deleting a user's item?** Refuse to mutate a non-empty bag, verify the selected product ID and expected item count, and stop with an explicit error on mismatch.
14. **Why preserve a failure if a retry later passes?** Report the initial failure and retry outcome separately; retries are diagnostic evidence, not permission to hide instability.
15. **How can stale reports mislead?** Generated reports can reflect a different run and may be overwritten. Check timestamp, command, project, and totals before presenting them.
16. **Why is the 447-case catalog not a coverage metric?** It is a historical candidate catalog, not a verified list of implemented or executed cases. Current source has 27 unique discovered definitions.
17. **What does the latest CI run prove?** The visible run passed type checking; its live-smoke job was skipped on a push event. It does not prove browser tests passed.
18. **Why is an internal estimate not an academic mark?** It uses a proposed rubric, not the examiner's criteria or evaluation. The 56/100 figure is only a preparation estimate.
19. **What is the next step for responsive failures?** Reproduce the 360, 390, and 768 pixel observations, identify the overflowing element, and update the test or report based on evidence.
20. **What remains outside the evidence?** Backend behavior, payment/order placement, full authentication, comprehensive site coverage, complete WCAG conformance, load testing, and verified full-suite results in all four projects.

## 20 code-based questions mapped to the detailed bank

| Code question | Source | Full answer |
|---|---|---|
| What does `BasePage.navigateTo` return? | `pages/BasePage.ts` | Q44 |
| How is the home page title checked? | `pages/HomePage.ts` | Q4, Q43 |
| How does `findSearchField` choose a candidate? | `tests/support/search.ts` | Q45 |
| Why does the helper return `null`? | `tests/support/search.ts` | Q45 |
| How does a missing search field skip a case? | `tests/support/search.ts` | Q49 |
| How is empty search asserted? | `tests/search/search.spec.ts` | Q21, Q51 |
| How is the long-query case structured? | `tests/search/search.spec.ts` | Q22, Q75 |
| How are multiple test inputs iterated? | `tests/search/search.spec.ts` | Q50 |
| How does the product popup open? | `tests/product/product.spec.ts` | Q46 |
| What does `ProductPage.expectLoaded` verify? | `pages/ProductPage.ts` | Q53 |
| How are available sizes selected? | `pages/ProductPage.ts` | Q54 |
| What does the missing-size case prove? | `tests/product/product.spec.ts` | Q54 |
| How is a category journey parameterized? | `tests/shopping-journeys/category-journey.ts` | Q25, Q50 |
| How does the journey check the bag precondition? | `tests/shopping-journeys/category-journey.ts` | Q47, Q57 |
| How does cleanup identify the selected product? | `tests/shopping-journeys/category-journey.ts` | Q47 |
| Why does cleanup use `finally`? | `tests/shopping-journeys/category-journey.ts` | Q47 |
| How is horizontal overflow measured? | `tests/responsive/responsive.spec.ts` | Q62–63 |
| What does the auth-state gate do? | `tests/shopping-journeys/full-shopping-flow.spec.ts` | Q58 |
| Which artifacts are retained on failure? | `playwright.config.ts` | Q40 |
| What runs on push versus dispatch? | `.github/workflows/playwright.yml` | Q83–84 |

## 15 scenario-based questions

Use the full five-part answer format for Q71–80 and Q92–100. These are the scenario prompts:

1. Chromium cannot open the homepage but Firefox can.
2. The mobile UI shows a search banner but no textbox.
3. The bag already has an item before a mutation journey.
4. A selected product ID differs from the cart item.
5. Cleanup fails after adding the test item.
6. A query test times out before executing its action.
7. The overflow check fails at tablet width only.
8. The image-alt check fails but the image may be decorative.
9. Myntra is offline during the exam.
10. A retry passes after the first attempt failed.
11. The examiner asks for the number of tests.
12. GitHub Actions is green but live tests were skipped.
13. The examiner asks whether the project found a product defect.
14. A category filter behaves differently from the assertion.
15. A payment path appears in the UI during the demonstration.

## Ten Playwright/SQA code patterns to explain

These patterns are present in current source; use the linked file rather than presenting them as test results.

1. **Web-first assertion —** `await expect(locator).toBeVisible();` (`tests/product/product.spec.ts`).
2. **Semantic search discovery —** `page.getByRole('searchbox')` (`tests/support/search.ts`).
3. **Explicit text entry —** `await search.fill(query);` (`tests/search/search.spec.ts`).
4. **Keyboard submission —** `await search.press('Enter');` (`tests/search/search.spec.ts`).
5. **Popup synchronization —** `Promise.all([page.waitForEvent('popup'), productLink.click()])` (`tests/shopping-journeys/category-journey.ts`).
6. **Page object —** `new ProductPage(detailsPage)` (`tests/product/product.spec.ts`).
7. **Size availability —** `.size-buttons-size-button-default:not(.size-buttons-size-button-disabled)` (`pages/ProductPage.ts`).
8. **Test cleanup —** `try/finally` around add/verify/remove (`tests/shopping-journeys/category-journey.ts`).
9. **Viewport measurement —** compare document `scrollWidth` and `clientWidth` (`tests/responsive/responsive.spec.ts`).
10. **Configurable base URL —** `process.env.MYNTRA_BASE_URL ?? 'https://www.myntra.com/'` (`playwright.config.ts`).

## Ten SQA definitions

1. **Test case:** Preconditions, data, steps, expected result, and status for a check.
2. **Test scenario:** A high-level behavior or risk to evaluate.
3. **Test suite:** A related collection of test cases.
4. **Test oracle:** The rule used to judge actual versus expected behavior.
5. **Equivalence partition:** A group of inputs expected to behave similarly.
6. **Boundary value analysis:** Testing values at or near class boundaries.
7. **Regression testing:** Rechecking existing behavior after changes.
8. **Severity:** Impact of a defect.
9. **Priority:** Urgency for addressing a defect.
10. **Traceability:** Links between requirements, cases, implementation, results, and defects.

## Five project limitations and defensible answers

1. **Live-site dependence:** “The target can change or block traffic; I report the browser, timestamp, and observed error.”
2. **Incomplete cross-browser evidence:** “Four projects are configured, but the latest full suite is Firefox-only.”
3. **Accessibility scope:** “These are a few automated checks, not a WCAG audit.”
4. **Authentication:** “OTP/CAPTCHA remain manual; the gated account test was skipped.”
5. **Feature scope:** “Sorting and several filter scenarios are candidate work, not implemented tests.”

## Two-minute project introduction, architecture, and run explanation

Use the matching scripts in [EXAMINER_DEMO_SPEAKING_SCRIPT.md](EXAMINER_DEMO_SPEAKING_SCRIPT.md). Rehearse the full Firefox result (20/6/1) and the separate smoke result (5/3). Never combine them.
