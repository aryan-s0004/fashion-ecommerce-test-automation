# Test plan

## Objectives

Demonstrate repeatable functional checks for the local shopping journey, catch breaks in core state transitions, and provide inspectable browser evidence.

## Scope

Homepage, category navigation and filters, search, product details and sizes, wishlist, cart calculations and persistence, mock authentication, checkout validation and confirmation, responsive layout, and basic accessibility. Real Myntra, real payment, server security, production load, and image-CDN availability are out of scope.

## Approach

Playwright with TypeScript and Page Object Model helpers. The visible demonstration runs serially in real Google Chrome and Microsoft Edge with one browser session and page per browser, 600 ms action slow motion plus observation pauses, and 28 named steps. After both visible runs, `npm run demo` executes the 59-test-per-browser regression suite headlessly. The HTML/JSON reporters record actual outcomes. Complete demo videos are saved; failure screenshots and traces are captured when applicable.

## Entry and exit

Entry: Node.js 20+, installed npm dependencies, and real Chrome and Edge installations. The test server is local Vite at port 4173. Exit: completed reports with actual outcomes and no hidden failures. Operational risks include port conflicts, browser installation, and remote product-photo availability. The visible demo uses one context/page per browser; regression tests use isolated contexts.

## Technique mapping

- Equivalence partitioning: matching, invalid, blank, and whitespace search text; valid and invalid mock credentials.
- Boundary value analysis: ten-digit phone, six-digit PIN, product price limits, and ₹1,999 free-delivery threshold.
- Decision tables: login credential combinations and delivery threshold outcomes.
- State transitions: anonymous to signed in to signed out; empty to filled to removed cart; selected size to cart; cart to checkout to confirmation.
- Smoke testing: homepage and navigation.
- Functional testing: module-focused specs.
- Regression testing: complete shopping journey and 55 existing cases per browser.
- Cross-browser testing: installed Chrome and Edge; optional Firefox/WebKit projects can be enabled with `EXTRA_BROWSERS=1` when installed.
