# Myntra Project Presentation and Demonstration Handbook

**Project:** Myntra E-Commerce Website Test Automation Using Playwright and TypeScript<br>
**Student:** Aryan Sahu<br>
**Student ID:** 24BCS10159<br>
**University:** Chandigarh University<br>
**Repository:** [aryan-s0004/fashion-ecommerce-test-automation](https://github.com/aryan-s0004/fashion-ecommerce-test-automation)<br>
**Prepared:** 2 November 2026

> This is a practical guide to the repository as inspected on 2 November 2026. The target is the real, public Myntra website. This repository is a test automation project, not a Myntra clone. The site, network, browser behavior, reports, and recorded results can change; rerun tests before presenting results as current.

## 1. Quick start: presentation-day sequence

Use this order if preparation time is limited:

1. Open the repository root in VS Code and make sure the terminal is at the root.
2. Run `npm run typecheck`.
3. Run `npx playwright test --list` to show what Playwright currently discovers.
4. Run `npm run preflight`.
5. If the internet and site are behaving normally, run `npm run demo:homepage`. This launches the dedicated headed Firefox demonstration, records evidence, and writes a timestamped report.
6. Open `demo-videos/index.html` and show the actual result and saved artifacts.
7. Explain any failure honestly. A configured browser is not proof of a pass.
8. Keep the saved homepage recording available as a fallback, and clearly label it as a previous recording.

The latest verification performed while preparing this handbook:

| Check | Result | Interpretation |
|---|---|---|
| `npm run typecheck` | Passed | Static TypeScript check only; it does not visit Myntra. |
| `npx playwright test --list` | 136 project-specific entries in 13 spec files | Four projects are configured. This is discovery, not execution. It corresponds to 34 test definitions multiplied by 4 projects. |
| `npm run preflight` | 11 passed, 0 warnings, 0 failed | Checks local setup and test discovery, not live Myntra reachability. |
| `npm run verify:demo` | 9 passed, 0 failed | Verifies the demo setup and indexed evidence; it does not run a new site scenario. |
| Current `reports/results.json` | 136 skipped, 0 passed, 0 failed; started 2026-11-01 20:08:40 UTC | This is not a successful execution. Do not present it as a fresh passing test run. |
| Indexed demo recording | One standalone homepage demo passed on 2026-11-01; video, screenshot, trace, and report are saved | This is genuine, earlier evidence, not a recording made today. See [the demo evidence index](demo-videos/index.html). |

Earlier project documentation records a different baseline from 1 November: 27 definitions in 12 spec files; a Firefox full run of 20 passed, 6 failed, and 1 skipped; and a separate all-project smoke run of 5 passed and 3 failed. These are historical runs and must be introduced as such. The current checkout has since expanded. Do not combine counts from separate runs.

## 2. Project introduction

### Problem statement

The project applies repeatable browser checks to important public storefront workflows on Myntra. Manual checking is useful, but repeating the same navigation, search, product, and shopping-bag checks by hand takes time and makes the evidence harder to reproduce. Playwright automates selected actions and assertions so that the same checks can be run again and their outcomes inspected.

### Objectives

- Check selected storefront pages and user-visible behavior in real browsers.
- Exercise search inputs, product details, size validation, navigation, responsive layouts, and limited shopping-bag behavior.
- Keep test logic understandable through TypeScript, Playwright Test, page objects, shared helpers, and tags.
- Produce actionable HTML/JSON reports and failure evidence.
- Keep claims honest when the public site or the test environment blocks execution.

### What the system under test means

The **system under test (SUT)** is the public Myntra website at `https://www.myntra.com/`. The project does not build or host Myntra. Playwright opens a real browser, visits the public site, interacts with the rendered page, and checks observable outcomes.

**Black-box testing** means checking externally visible behavior without changing or inspecting the target site's private implementation. This project uses public browser workflows; it does not call private APIs or try to bypass access controls.

### Actual scope

The repository currently includes:

- Homepage identity, visibility, reload, and browser history checks.
- Search control and normal, empty, whitespace, Unicode, punctuation, and long-input checks.
- Category-menu navigation and logo/history navigation.
- Product detail and size validation checks.
- A shopping-bag empty-state check.
- Four category-to-product-to-bag journeys with guarded add/verify/remove behavior.
- One optional, authentication-dependent shopping flow.
- Viewport overflow checks and mobile empty-bag rendering.
- Limited semantic/accessibility assertions.
- Seven headed demo scenarios for homepage, search, navigation, listing, product detail, empty bag, and mobile empty bag.

The latest discovery lists 34 unique definitions across 13 spec files, once in each of four configured projects. Some tests are skipped conditionally, including the authenticated flow when local authentication state is unavailable.

### Out of scope and limitations

- The project is not a complete test of all Myntra pages, products, or user accounts.
- It does not place orders or make payments.
- It does not perform load testing, backend testing, private API testing, or visual-baseline comparison.
- It does not bypass CAPTCHA, OTP, bot protection, or other access controls.
- The accessibility checks are limited assertions, not a WCAG audit.
- The public site can change its markup, content, availability, and behavior without notice.
- Network, browser, runner, and disk issues can cause failures unrelated to a confirmed product defect.
- Authentication is manual and optional; no successful authenticated user journey is claimed.
- Sorting and broad filter/reset combinations are not established as current test coverage.

### Short spoken introduction

> “My project is a black-box browser automation suite for the real public Myntra website. It uses Playwright Test with TypeScript to check selected user-visible journeys such as homepage loading, search, navigation, product details, and safe shopping-bag behavior. It is not a Myntra application clone. The tests generate reports and failure evidence, but because they depend on a changing live site, I report failures and limitations honestly rather than calling every configured browser a pass.”

## 3. Technology stack

| Technology | What it is and why it is used | Where this project uses it | Examiner-friendly explanation |
|---|---|---|---|
| Node.js | JavaScript runtime used to run npm, Playwright, and project scripts. | `scripts/*.mjs`, npm commands, Playwright CLI. | “Node.js runs the project's tools and helper scripts.” |
| npm | Package manager and script runner. | `package.json`, `package-lock.json`. | “npm installs the pinned test dependencies and gives short commands for the workflows.” |
| TypeScript | JavaScript with static type checking. | Page objects, test specs, `tsconfig.json`. | “TypeScript catches many mistakes before browser execution.” |
| Playwright Test | Browser automation and test runner with fixtures, projects, assertions, reporters, and traces. | `playwright.config.ts`, `tests/`, `@playwright/test`. | “Playwright opens isolated browser sessions, runs tests, and records results.” |
| Chromium | Browser engine used for desktop Chromium and mobile emulation. | Projects in `playwright.config.ts`; demo uses Firefox instead. | “The Chromium project checks behavior in a Chromium-based browser.” |
| Firefox | Browser engine used as a desktop project and the dedicated demo browser. | `firefox-desktop`; `playwright.demo.config.ts`. | “Firefox is one independent browser implementation; it can expose different site behavior.” |
| WebKit | Browser engine used for the desktop Safari-like project. | `webkit-desktop` in `playwright.config.ts`. | “WebKit provides an additional browser engine, but configuration alone does not mean tests passed.” |
| Mobile emulation | Device viewport, touch, and user-agent profile managed by Playwright. | `chromium-mobile` uses the iPhone 13 device descriptor. | “This simulates a mobile browser profile; it is not a physical phone.” |
| Page Object Model | A design pattern that keeps page locators and actions in page classes. | `pages/BasePage.ts` and the other `pages/*.ts` files. | “Tests call meaningful page methods instead of repeating every locator and action.” |
| Git | Version control for tracking source and documentation changes. | Repository history and working tree. | “Git lets me review exactly what changed and keep commits focused.” |
| GitHub | Hosted repository and workflow platform. | The project remote and Actions workflow. | “GitHub stores the repository and can run configured checks.” |
| GitHub Actions | Hosted automation triggered by push, pull request, or manual dispatch. | `.github/workflows/playwright.yml`. | “The workflow runs typechecking on changes; live browser testing is a manual workflow.” |
| HTML reporting | Interactive view of test outcomes and attachments. | Default output: `reports/html/`; demo output: `reports/demo/<run-id>/html/`. | “The HTML report makes it easier to inspect individual tests and failures.” |
| JSON reporting | Machine-readable structured test outcomes. | `reports/results.json`; demo JSON under `reports/demo/<run-id>/results.json`. | “JSON supports scripts that summarize counts and failures.” |
| Screenshots | Image evidence captured by Playwright. | Failure screenshots by default; demo screenshots for every completed demo test. | “A screenshot shows the page at a point in the test.” |
| Videos | Browser recording attached to demo tests. | `demo-videos/<run-id>/*.webm`. | “A video shows the actual recorded browser run; it is not generated if the test produced no video attachment.” |
| Traces | Playwright timeline with actions, snapshots, and diagnostic details. | `test-results/` on failure and `demo-videos/<run-id>/*-trace.zip`. | “A trace helps explain what the test did before it passed or failed.” |

## 4. Repository structure

The relevant current layout is:

```text
fashion-ecommerce-test-automation/
|-- .github/
|   `-- workflows/
|       `-- playwright.yml
|-- archive/
|   |-- historical-docs/
|   `-- personal/
|-- demo-videos/
|   |-- <timestamped-run>/
|   |-- index.html
|   `-- index.json
|-- docs/
|   |-- FINAL_PROJECT_AUDIT.md
|   |-- FINAL_TEST_COVERAGE_REPORT.md
|   |-- FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md
|   |-- FINAL_DEMONSTRATION_GUIDE.md
|   `-- other project documentation
|-- pages/
|   |-- BasePage.ts
|   |-- HomePage.ts
|   |-- SearchPage.ts
|   |-- CategoryPage.ts
|   |-- ProductPage.ts
|   `-- ShoppingBagPage.ts
|-- presentation/
|-- reports/
|   |-- html/
|   |-- results.json
|   `-- demo/<timestamped-run>/
|-- scripts/
|   |-- preflight.mjs
|   |-- run-demo.mjs
|   |-- setup-auth.mjs
|   |-- summarize-report.mjs
|   `-- verify-demo.mjs
|-- test-results/                    generated Playwright output
|-- tests/
|   |-- accessibility/
|   |-- demo/
|   |-- navigation/
|   |-- product/
|   |-- responsive/
|   |-- search/
|   |-- shopping-bag/
|   |-- shopping-journeys/
|   |-- smoke/
|   `-- support/
|-- .editorconfig
|-- .env.example
|-- .gitignore
|-- package.json
|-- package-lock.json
|-- playwright.config.ts
|-- playwright.demo.config.ts
|-- PROJECT_STATE.md
|-- Project_guide_final_1234.md
|-- README.md
`-- tsconfig.json
```

Generated reports and recordings may be local/ignored and can differ by checkout. `node_modules/` is installed dependency content and should not be committed. `archive/` preserves historical material; it is not a runtime dependency.

| Path | Purpose | Needed to execute? | Show in presentation? |
|---|---|---:|---:|
| `README.md` | Project summary, setup, commands, safety notes, and links to handover docs. | No, but useful onboarding. | Yes, first or last. |
| `PROJECT_STATE.md` | Detailed project history and recorded validation evidence. Some sections are historical and may be stale. | No. | Only with evidence date explained. |
| `package.json` | Pinned direct dependencies and supported npm scripts. | Yes. | Yes; show commands. |
| `package-lock.json` | Exact dependency tree for reproducible npm installation. | Yes for `npm ci`. | Briefly. |
| `playwright.config.ts` | Test discovery, timeouts, reporters, base URL, diagnostics, and four browser/device projects. | Yes. | Yes. |
| `playwright.demo.config.ts` | Dedicated one-worker Firefox setup that records demo video/screenshots and writes timestamped reports. Requires `DEMO_RUN_ID`, set by the demo runner. | For `npm run demo:*`. | Yes, after explaining the runner sets the ID. |
| `tsconfig.json` | Strict TypeScript compiler settings and included files. | Yes for typecheck. | Yes. |
| `.env.example` | Documents the optional public base URL setting. | No. | Optional. |
| `.gitignore` | Excludes dependencies, reports, test output, environment files, and authentication state. | No, but important safety. | Yes when discussing security. |
| `pages/` | Page Object Model classes and shared page behavior. | Yes. | Yes; show one or two classes. |
| `tests/` | Playwright test cases, demo scenarios, and the shared search helper. | Yes. | Yes; smoke and one focused test. |
| `scripts/` | Local preflight, evidence collection, authentication setup, summary, and demo checks. | Used by the corresponding npm commands. | Show `run-demo.mjs` and `summarize-report.mjs`. |
| `.github/workflows/playwright.yml` | Typecheck on pushes/PRs; live smoke only on manual dispatch. | Not for local tests. | Yes; explain the two jobs. |
| `reports/` | HTML and JSON outputs; outputs can be overwritten or stale. | Output destination, created as needed. | Yes only after refreshing or labeling as historical. |
| `test-results/` | Playwright test artifacts, including failure screenshots, video, and traces. | Output destination. | Show one real trace if available. |
| `demo-videos/` | Saved demo evidence and evidence index. | Only for demo evidence. | Yes; verify timestamp and result. |
| `docs/` | Test plan, coverage, audit, limitations, and presentation documents. | No. | Show the audit/defect register. |
| `archive/` | Historical reference material moved out of the main documentation flow. | No. | Mention briefly if asked about organization. |
| `Project_guide_final_1234.md` | This practical presentation handbook. | No. | Open when preparing; not necessary to read aloud. |

## 5. Architecture and code walkthrough

### End-to-end flow

```text
Test specification
       |
       v
Playwright Test runner and project selection
       |
       v
Browser, isolated context, and page fixture
       |
       v
Page objects and shared helpers
       |
       v
Public Myntra website
       |
       v
Browser actions and user-visible assertions
       |
       v
Test outcome and attached diagnostics
       |
       v
HTML report + JSON report + screenshots/videos/traces
```

1. A spec calls Playwright's `test` function and declares a scenario.
2. Playwright selects the browser project and creates an isolated browser context and `page`.
3. A page object or shared helper provides locators and reusable actions.
4. The page visits the public base URL and performs low-volume browser interaction.
5. Playwright assertions check visible, enabled, URL, title, text, count, or layout outcomes.
6. The reporter records results; configured screenshots, videos, and traces provide evidence.

### Configuration highlights

`playwright.config.ts` sets `testDir` to `./tests`, uses one local worker by default and two in CI, sets a 45-second test timeout, and creates list, HTML, and JSON output. The site base URL defaults to `https://www.myntra.com/` and can be overridden with `MYNTRA_BASE_URL`. It retains traces, screenshots, and videos on failure. The project names are `chromium-desktop`, `firefox-desktop`, `webkit-desktop`, and `chromium-mobile`.

The separate demo config sets a single headed Firefox project with video and screenshots always enabled and traces retained on failure. `scripts/run-demo.mjs` generates and injects `DEMO_RUN_ID`; do not launch that config directly without the runner.

### Page objects

#### `pages/BasePage.ts`

Base class shared by page objects. It receives a Playwright `Page`, navigates to relative paths using `domcontentloaded`, exposes title and URL assertions, reloads pages, measures horizontal overflow, and returns the current pathname.

```ts
export class BasePage {
  constructor(readonly page: Page) {}

  async navigateTo(path: string = '/'): Promise<Response | null> {
    return this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }
}
```

Explain that `page` is the browser tab-like object supplied by Playwright, and `Response | null` acknowledges that some navigations may not return a document response.

#### `pages/HomePage.ts`

Defines homepage locators such as logo, navigation, search, footer, profile, and bag. `open()` navigates to the home page and checks the response status when present plus the title. `hoverCategoryMenu()` and `clickBrandLogo()` express common interactions as readable methods.

#### `pages/SearchPage.ts`

Uses `findSearchField` and `requireSearchTextField` from `tests/support/search.ts`. `searchFor()` checks the field, fills a query, and presses Enter. It also includes result URL and empty-state assertions. In current demo specs, some direct interactions use `HomePage.searchInput`; explain this distinction rather than claiming every test uses `SearchPage`.

#### `pages/CategoryPage.ts`

Defines product card, filter, sort, and breadcrumb locators. It can count and verify products, apply the first visible brand filter, open a matching product popup, and verify an ascending sample of prices. A helper's existence does not prove a spec currently tests that behavior; describe only the actual use in the tests.

#### `pages/ProductPage.ts`

Defines product name, brand, price, main image, add-to-bag button, and enabled size-button locators. It checks product details, extracts a product ID from the URL, selects the first available size, and provides an add-to-bag action.

#### `pages/ShoppingBagPage.ts`

Checks the bag title and empty state, verifies item identity and size, and contains guarded removal logic. The category journey has its own cleanup helper too: it refuses to remove more than one item and verifies the product ID matches the test product before removal.

### Representative test

`tests/shopping-bag/empty-bag.spec.ts` is an appropriate low-risk example:

```ts
test('BAG-001 & BAG-002: an empty shopping bag explains how to add items',
  { tag: ['@bag', '@regression', '@responsive'] },
  async ({ page }) => {
    const bagPage = new ShoppingBagPage(page);
    await bagPage.open();
    await bagPage.expectEmpty();
  });
```

This checks the bag's empty guidance only. It does not add an item, alter an account, or place an order. It still visits the live site and can fail if the site is unavailable or changes.

### Shared search helper

`tests/support/search.ts` tries semantic roles and accessible labels before its CSS-selector fallbacks. It validates that the matched element is an actual text-entry element. `requireSearchTextField()` uses a conditional test skip when no usable search text field is present. This helps avoid assuming that mobile and desktop expose the same control.

### Safe shopping-journey cleanup

`tests/shopping-journeys/category-journey.ts` checks that the bag starts empty. Before removing an item, it checks there is exactly one item and that the item's product ID is the same as the test product. If the bag has unexpected contents, it throws rather than removing unrelated user data. The journeys stop before order placement or payment.

### TypeScript configuration

`tsconfig.json` enables `strict` and `noEmit`, uses ES2022/CommonJS settings, and includes the Playwright configuration and `tests/**/*.ts`. `npm run typecheck` runs `tsc --noEmit`; it validates types without generating JavaScript and without visiting Myntra.

## 6. Setup and execution on Windows

### Required tools

- Windows 10/11.
- Node.js 18 or newer; the recorded development environment used Node.js 22.
- npm, installed with Node.js.
- Git.
- VS Code.
- Internet access for dependencies and live tests.
- Playwright browser binaries. The project setup command can install them.

Check versions in PowerShell:

```powershell
node --version
npm --version
git --version
```

### Clone and open the project

If the repository is not already on your computer:

```powershell
git clone https://github.com/aryan-s0004/fashion-ecommerce-test-automation.git
Set-Location .\fashion-ecommerce-test-automation
code .
```

If it is already present, open that existing folder in VS Code. In VS Code use **Terminal > New Terminal**, then check:

```powershell
Get-Location
Test-Path .\package.json
```

The second command should return `True`. Do not run npm commands from a parent folder.

### Mandatory setup

```powershell
npm ci
npx playwright install
```

- `npm ci` installs the exact dependency tree from `package-lock.json`. It does not test Myntra.
- `npx playwright install` installs Playwright browser binaries. It does not test Myntra.
- If installation fails, check internet access and available disk space; the project has previously recorded a disk-full (`ENOSPC`) failure during evidence generation.

### Recommended local validation

```powershell
npm run typecheck
npx playwright test --list
npm run preflight
npm run verify:demo
```

| Command | What it checks | Visits live site? | Result location |
|---|---|---:|---|
| `npm run typecheck` | Strict TypeScript compilation without emitting files. | No | Terminal. |
| `npx playwright test --list` | Discovers configured test cases and projects; does not execute tests. | No | Terminal. |
| `npm run preflight` | Node/npm presence, required files, page objects, tests, writable output folders, typecheck, discovery, browser binaries, secret exclusions, URL format. | No | Terminal; latest observed result: 11 passed. |
| `npm run verify:demo` | Checks demo scenario/config, scripts, npm aliases, browser installation, and indexed evidence signatures/playback. It does not run a new scenario. | No | Terminal; latest observed result: 9 passed. |

### Individual test commands

Every test command below visits the live public website unless the selected tests skip before navigation. Failures are real outcomes and should remain visible.

```powershell
npm run test:smoke
npm run test:search
npm run test:bag
npm run test:a11y
npm run test:responsive
npm run test:regression
npm test
```

| Command | Selection |
|---|---|
| `npm run test:smoke` | Tests tagged `@smoke`. |
| `npm run test:search` | Tests tagged `@search`. |
| `npm run test:bag` | Tests tagged `@bag`. |
| `npm run test:a11y` | Tests tagged `@accessibility`; limited checks, not a WCAG audit. |
| `npm run test:responsive` | `@responsive` tests in `chromium-mobile`. |
| `npm run test:regression` | Tests tagged `@regression` across configured projects. |
| `npm test` | Entire Playwright suite across configured projects. This can take longer and may produce live-site failures. |

To select one desktop browser from a tag command, pass Playwright options through npm:

```powershell
npm run test:smoke -- --project=firefox-desktop
npm run test:smoke -- --project=webkit-desktop
npm run test:smoke -- --project=chromium-desktop
```

The explicit full-project aliases are:

```powershell
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

To show the browser while running a regular suite:

```powershell
npm run test:smoke -- --project=firefox-desktop --headed
```

### Test commands for specific journeys

These are configured in `package.json`:

```powershell
npm run test:winter
npm run test:formal
npm run test:sports
npm run test:sneakers
```

These category journeys visit Myntra and can add/remove a test item only after confirming the bag is empty. Do not use them as a low-risk first demo if a stable homepage or empty-bag check is enough.

The optional authentication command is discussed in the security section. Do not run it during a presentation unless you have a dedicated account, permission, and time to complete manual sign-in.

### Demonstration commands

The dedicated demo command opens headed Firefox, records the actual run, and saves artifacts:

```powershell
npm run demo:homepage
```

Available demo selections:

```powershell
npm run demo:search
npm run demo:navigation
npm run demo:listing
npm run demo:product
npm run demo:bag
npm run demo:responsive
npm run demo:shopping
npm run demo:all
```

The individual scenarios are lower-risk than authenticated or bag-mutating journeys. `demo:all` attempts all demo scenarios and may fail if the site/network is unreliable. Do not treat the whole run as passed merely because some individual scenarios passed.

### Reports and evidence

After an ordinary test run:

```powershell
npm run report
npm run report:summary
```

- `npm run report` opens the Playwright HTML report in a browser. Default location: `reports/html/`.
- `npm run report:summary` reads `reports/results.json` and summarizes statuses and failures. Run a test first to refresh the JSON. If the file is absent, the script prints an informational message and exits; that is not evidence that tests passed.
- HTML and JSON are generated output and may be overwritten by later runs.

To open the saved demo evidence index:

```powershell
Start-Process .\demo-videos\index.html
```

The index links timestamped demo results, videos, screenshots, traces, and HTML reports when available. Run `npm run demo:index` after moving or restoring indexed evidence to refresh the links.

To list trace archives:

```powershell
Get-ChildItem .\test-results, .\demo-videos -Recurse -Filter *.zip
```

Open a specific trace using its actual path:

```powershell
npx playwright show-trace ".\test-results\<actual-trace-name>.zip"
```

Use the real path returned by `Get-ChildItem`; angle-bracket text is a placeholder, not a literal filename.

### Recommended presentation-day command sequence

```powershell
node --version
npm --version
Test-Path .\package.json
npm run typecheck
npx playwright test --list
npm run preflight
npm run verify:demo
npm run demo:homepage
Start-Process .\demo-videos\index.html
```

The demo command visits Myntra. If the site is not responding, do not repeat it rapidly. Explain the blocker, show the prior recording with its date, and label the recording as historical.

## 7. Live examiner demonstration runbook

### Stage 1: Introduction (30-60 seconds)

Say:

> “This repository automates selected browser checks on the live Myntra storefront. Playwright runs the checks in isolated browser contexts and validates visible behavior such as page identity and empty-bag guidance. The project also has search, navigation, product, responsive, and guarded shopping-journey tests. It does not place orders or process payments. Since the site is external and changes over time, I distinguish code validation from actual live execution.”

### Stage 2: GitHub repository

Open the repository URL. Show:

1. `README.md` for purpose, setup, current project status, and safety.
2. `pages/`, `tests/`, and `scripts/` as source organization.
3. `docs/FINAL_PROJECT_AUDIT.md` and `docs/FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md` for evidence-based scope.
4. The root handbook and the `archive/` folder only if asked about documentation organization.
5. The commit history. Explain that the archive and examiner documentation changes were separately committed. A commit records a change; it does not certify test success.
6. **Actions** tab. Explain that `typecheck` runs on pushes and pull requests. `live-smoke` is guarded to run only on manual dispatch. A skipped live job is not a passing live test.

### Stage 3: VS Code source walkthrough (recommended order)

| Open | Highlight | Say |
|---|---|---|
| `package.json` | Scripts, pinned Playwright and TypeScript versions. | “These npm commands are the supported entry points; the lockfile makes installs reproducible.” |
| `playwright.config.ts` | Target URL, reporters, artifacts, timeouts, worker count, four projects. | “This config controls execution; project names show targets, not pass results.” |
| `tsconfig.json` | `strict`, `noEmit`, included files. | “The typecheck validates TypeScript without generating output.” |
| `pages/BasePage.ts` | Page constructor, navigation, reusable assertion helpers. | “Shared behavior is centralized for page objects.” |
| `pages/HomePage.ts` or `pages/ShoppingBagPage.ts` | Locators and meaningful page methods. | “The page object groups page-specific controls and actions.” |
| `tests/smoke/homepage.spec.ts` | Use of a page object and assertions. | “The test expresses expected outcomes, while the page object holds the UI details.” |
| `tests/shopping-bag/empty-bag.spec.ts` | Low-risk test; no mutation. | “This checks only the empty state.” |
| `tests/support/search.ts` | Semantic-first search detection and skip behavior. | “The mobile page may not expose the same text field as desktop, so the helper checks rather than assuming.” |
| `tests/shopping-journeys/category-journey.ts` | Empty-bag precondition and guarded cleanup. | “The test verifies identity and stops cleanup if the cart is not exactly the expected test item.” |
| `scripts/run-demo.mjs` | Timestamped runner, video collection, index and failure handling. | “It preserves actual artifacts and does not invent a successful video when none exists.” |
| `.github/workflows/playwright.yml` | Separate typecheck and manual live smoke jobs. | “CI checks types by default; live-site testing is explicitly triggered.” |

### Stage 4: Live automated execution

Recommended command:

```powershell
npm run demo:homepage
```

- **Mode:** Headed, so Firefox is visible.
- **Browser:** Dedicated `demo-firefox` project.
- **Scenario:** `DEMO-HOME-001`.
- **Expected actions:** Navigate to the Myntra homepage and inspect the response, title, and visible body.
- **Assertions:** Navigation returns a response below HTTP 400; page title contains Myntra; body is visible.
- **Side effects:** No account change, cart mutation, order, or payment.
- **Evidence:** Timestamped WebM video, screenshot, JSON summary, HTML report, and trace if attached; locations are linked from `demo-videos/index.html`.

Say while it runs:

> “This is a live run against the public website. Playwright opens a real browser and evaluates the test assertions. If a network or site issue blocks navigation, the correct result is a failure, not a pass. The runner records only artifacts actually produced by this execution.”

The command should be run once after checking internet access and local disk space. If it fails, do not keep retrying aggressively; explain what failed and use a dated recording as fallback.

### Stage 5: Cross-browser coverage

The four projects are configured in `playwright.config.ts`:

| Project | Meaning | Example command |
|---|---|---|
| Chromium desktop | Desktop Chromium browser profile. | `npm run test:chromium` |
| Firefox desktop | Desktop Firefox browser profile. | `npm run test:firefox` |
| WebKit desktop | Desktop WebKit browser profile. | `npm run test:webkit` |
| Chromium mobile | iPhone 13 emulation with Chromium. | `npm run test:responsive` |

For a focused smoke by browser, use e.g. `npm run test:smoke -- --project=firefox-desktop`. Read the terminal summary or fresh report. State the actual project and counts. Do not say “all browsers passed” unless the current report shows that.

### Stage 6: Reports and artifacts

1. Run the demonstration or an ordinary test suite first to create fresh evidence.
2. Read the printed run ID and completion status.
3. Open `demo-videos/index.html`; select the matching run by timestamp.
4. Open its Playwright HTML report and inspect the test list.
5. Select a passed test to show its result and attachments.
6. Select a failed test only if present; explain the assertion or setup failure and classify it carefully.
7. Open the run's `results.json` or execution summary to show machine-readable statuses.
8. Open an image using the index link or Windows Photos.
9. Open a trace with `npx playwright show-trace "<actual trace path>"`.
10. Identify the run timestamp. Never call an old report fresh.

For ordinary runs, the standard reporter writes `reports/html/` and `reports/results.json`. A run can overwrite these paths, so the timestamp and new test start time matter. The dedicated demo runner creates timestamped report paths under `reports/demo/`.

### Stage 7: Technical quality

- **POM:** `pages/` contains reusable page objects.
- **Helper:** `tests/support/search.ts` probes semantic search controls and checks element type.
- **Assertions:** Playwright `expect()` verifies URL, title, visibility, text, counts, and classes.
- **Organization:** tests are grouped by behavior under `tests/`.
- **Configuration:** four named projects, reporters, timeouts, and diagnostics in Playwright config.
- **Failure evidence:** screenshots, video, trace, HTML and JSON reports.
- **Safety:** journeys verify an empty bag and product identity before removing their own item.
- **CI:** GitHub Actions typechecks on change; live smoke is manual.

### Stage 8: Conclusion

Say:

> “The project demonstrates how Playwright and TypeScript can automate selected public storefront workflows and preserve diagnostic evidence. The strongest next improvements are stabilizing live-site behavior, reproducing the current responsive and locator issues, and running a fresh full cross-browser regression when the environment permits. The current results are selective, not full Myntra certification.”

## 8. Reporting and honest result interpretation

### Current checkout discovery versus historical results

The latest discovery command in this checkout reports 136 project-specific entries in 13 spec files. Since there are four configured projects, this represents 34 unique definitions multiplied by four projects; it does not mean 136 unique test scenarios have been authored.

The current local `reports/results.json` has timestamp `2026-11-01T20:08:40.363Z`, and records 136 skipped, 0 passed, and 0 failed. It is not an execution pass. Before using it, run a test and inspect the newly generated report.

The documentation records earlier evidence from a smaller test baseline:

- Firefox full suite: 27 discovered; 20 passed, 6 failed, 1 skipped.
- Separate all-project smoke suite: 8 executions; 5 passed, 3 failed.
- Latest known GitHub Actions record described in the audit: typecheck passed and live smoke was skipped on push.

Those are historical records from November 1 or earlier; the current tests have grown since then. Do not combine their totals with current discovery or with one another.

### Observed failure categories from the recorded baseline

| Observation | Evidence-based interpretation |
|---|---|
| Chromium desktop navigation returned `net::ERR_HTTP2_PROTOCOL_ERROR`. | Transport/edge/environment behavior observed; not proof of a Myntra application defect. |
| Mobile smoke could not find the desktop search-input locator. | Automation/site UI mismatch is unresolved; interaction with a mobile search affordance was not verified. |
| Firefox category-menu hover could not find the expected element. | Locator, viewport, state, or live UI cause remains undetermined. |
| Sampled image-alt check failed. | Potential issue only; the test does not identify image purpose or distinguish decorative images. Not a WCAG finding. |
| Responsive overflow assertion failed at 360x640, 390x844, and 768x1024. | Potential layout issue requiring repeat and identification of the overflowing element. |
| Long-query test timed out while creating a page. | Setup/environment timeout occurred before the query assertion; no search behavior conclusion follows. |
| Authentication flow skipped when storage state was missing. | Conditional skip, not a pass and not proof of successful authentication. |

No Myntra production defect is confirmed by the register. Use wording such as “the test observed…” or “the run failed at…” rather than “Myntra is broken.”

## 9. Professional demonstration video

### Recommended recording setup

Use OBS Studio for a complete screen-and-voice recording. Download it from the official OBS website and install the Windows version. If OBS is unavailable, Windows Snipping Tool screen recording can be a simple fallback, but check whether your Windows version captures microphone audio before relying on it.

OBS setup:

1. Open OBS and use the Auto-Configuration Wizard if it appears.
2. Set canvas and output to 1920x1080 if the display supports it; otherwise use the display's native resolution.
3. Add a **Display Capture** source for the VS Code/editor/terminal workflow. Use **Window Capture** when you want to limit capture to VS Code or the browser.
4. Add **Audio Input Capture** and choose the correct microphone.
5. Speak at normal volume and check that the audio meter moves without clipping.
6. Record a 20-second test; play it back and confirm that text is readable and the voice is clear.
7. Set recording format to MKV for crash safety if available, then use OBS **File > Remux Recordings** to create MP4 after recording. Alternatively select MP4 if your setup requires a direct MP4.
8. Save only the final, verified recording under `demo-videos/recordings/` if the project owner chooses to keep it there. Do not invent a recording or claim one exists before it is actually recorded.

### Preparation checklist

- Close unrelated apps, personal email, messaging notifications, and unrelated browser tabs.
- Turn off desktop notifications and avoid showing account names, passwords, cookies, OTPs, or local auth-state files.
- Open the repository root in VS Code and keep the Explorer readable.
- Use a clean PowerShell terminal at the project root.
- Confirm `package.json` is visible and `Test-Path .\package.json` returns `True`.
- Check internet connection and verify available disk space.
- Run `npm run typecheck`, `npm run preflight`, and `npm run verify:demo` before recording.
- Ensure that any prior report shown is labeled with its timestamp and status.
- Prepare an existing valid homepage recording and screenshot as backup evidence.
- Check microphone selection, room noise, cursor visibility, screen resolution, and font size.
- Never show `.env`, `playwright/.auth/`, browser profiles, cookies, or personal credentials.

### Video storyboard (about 9 minutes)

| Time | Scene | Screen content and action | Voice-over purpose |
|---|---|---|---|
| 0:00-0:20 | Opening | Simple title card with project name and student name. | Establish topic without effects. |
| 0:20-1:00 | Introduction | Show project root and README. | Explain live public Myntra target and black-box scope. |
| 1:00-1:40 | Stack | Show `package.json` and `playwright.config.ts`. | Explain TypeScript, Playwright, browser projects, and reporters. |
| 1:40-2:20 | Structure | Expand `pages/`, `tests/`, `scripts/`, `.github/`. | Orient the examiner to the repository. |
| 2:20-3:15 | Architecture | Show `HomePage.ts`, `BasePage.ts`, and a smoke spec. | Explain separation of locators/actions from assertions. |
| 3:15-4:00 | Safety | Show empty-bag test and cleanup guard. | Explain low-risk behavior and refusal to remove unexpected items. |
| 4:00-5:30 | Live run | Run `npm run demo:homepage`; show headed Firefox. | Narrate actual navigation and assertions. |
| 5:30-6:20 | Results | Show terminal outcome and exact run timestamp. | Explain passed/failed/skipped truthfully. |
| 6:20-7:20 | HTML/JSON | Open the run's HTML report and JSON summary. | Show one test and structured result evidence. |
| 7:20-8:00 | Evidence | Play saved video, open screenshot, mention trace. | Explain the distinct purposes of artifacts. |
| 8:00-8:35 | GitHub/CI | Show repository and Actions workflow. | Explain commit history and manual live-smoke gate. |
| 8:35-9:00 | Limitations and close | Show defect register or final audit. | End with scope, observed limitations, and future work. |

If live execution fails, stop after recording the failure, state the cause shown by the output, and use the previously recorded homepage demo with its true timestamp. Do not edit the video to make a failure appear as a pass.

### Complete narration with screen cues

**Opening**

> “Hello, I am Aryan Sahu. This presentation demonstrates my Myntra e-commerce website test automation project using Playwright and TypeScript.”

`[SHOW PROJECT ROOT]`

> “This repository contains browser automation for selected flows on the real public Myntra storefront. It is not a local Myntra clone. The goal is to make selected checks repeatable and to retain useful evidence.”

`[OPEN PACKAGE.JSON]`

> “The package file defines the project scripts and pins Playwright Test and TypeScript. The lockfile supports a reproducible installation. The commands include focused test groups, browser selection, preflight validation, demo recording, and report summaries.”

`[OPEN PLAYWRIGHT.CONFIG.TS]`

> “This configuration sets the public base URL, one local worker by default, timeouts, HTML and JSON reporters, and failure diagnostics. It defines Chromium desktop, Firefox desktop, WebKit desktop, and Chromium mobile emulation. These are targets, not claims that every project has passed.”

`[SHOW PROJECT STRUCTURE]`

> “The page objects are under pages, tests are grouped by purpose, and scripts support setup and evidence handling. The workflow under GitHub Actions checks types for changes; its live browser job is manual.”

`[SHOW PAGE OBJECT]`

> “This page object keeps locators and page-specific actions in one place. The tests can call a meaningful operation such as opening the empty bag, then assert the expected user-visible state.”

`[SHOW SAFE TEST]`

> “This empty-bag test only reads the public empty state. The shopping journeys use additional guards: they require an empty bag, verify the selected product identity, and refuse cleanup if the bag contains unexpected items.”

`[RUN PLAYWRIGHT TEST]`

> “I am starting a headed Firefox homepage demonstration. It visits the public website and checks the navigation response, page title, and visible body. This run can be affected by the live site or the network.”

`[SHOW BROWSER ACTIONS]`

> “The visible browser is controlled by Playwright. The test uses assertions to decide its result; seeing a page render is not by itself the test result.”

`[SHOW TEST RESULTS]`

> “The terminal shows the actual result for this execution. I will report the exact status and timestamp. A failure remains a failure, and a skipped test is not a pass.”

`[OPEN HTML REPORT]`

> “The HTML report gives a navigable view of tests and attachments. I am selecting the report for the run I just performed, rather than relying on an older report.”

`[OPEN JSON REPORT]`

> “The JSON report stores structured data such as test status and timing. A summary script can read this JSON, but it does not create a new test execution.”

`[SHOW SCREENSHOT OR TRACE]`

> “A screenshot records the page at a point in time. A trace contains a more detailed timeline that can help explain which action or assertion failed.”

`[SHOW GITHUB ACTIONS]`

> “The workflow automatically typechecks changes. The live smoke job runs only when manually dispatched because it depends on an external public site. A skipped job does not mean the browser test passed.”

`[SHOW LIMITATIONS]`

> “This project covers selected flows, not the entire Myntra system. The live site has produced transport, locator, responsive, and setup observations. None is reported as a confirmed production defect without repeated evidence. The next steps are to stabilize the live checks and expand only verified coverage. Thank you.”

### Editing and export

- Remove long pauses and accidental dead time, but preserve context needed to understand test outcomes.
- Keep terminal text large enough to read; zoom the editor before capture.
- Use simple section labels and a short opening title; avoid distracting transitions.
- Keep the cursor out of important text and avoid fast scrolling.
- Normalize microphone volume so narration remains clear and consistent.
- Export as MP4, review the entire video, and check picture/audio synchronization.
- A suggested final name is `Myntra_Project_Demonstration_Aryan_Sahu.mp4`.
- Keep original evidence intact. Do not modify a recording to hide a test failure or make it look like a different run.

### Presenting a recording to the examiner

Prefer a live demonstration first if the site is reachable. Introduce the recording as supporting evidence:

> “This is a genuine Playwright recording from the indexed run shown on screen. It was recorded on the date shown; it is not today's live execution.”

If the site is unavailable, say so plainly, show the exact error or status, then play the dated recording. Be prepared to explain the test code and its assertions. A video demonstrates a prior event; it does not prove the current site behaves the same way.

## 10. Presentation scripts

### A. Five-minute version

**0:00-0:40 — Introduction**<br>
`[SHOW README]`<br>
> “My project automates selected browser checks on the public Myntra storefront using Playwright Test and TypeScript. It is a black-box QA project, not an ecommerce application clone.”

**0:40-1:20 — Stack and configuration**<br>
`[OPEN package.json, THEN playwright.config.ts]`<br>
> “npm provides reproducible setup and scripts. Playwright configures four browser/device projects, HTML and JSON reports, and failure artifacts. Configuration tells us what can run; it does not prove a pass.”

**1:20-2:10 — Architecture and code**<br>
`[SHOW pages/BasePage.ts, pages/HomePage.ts, tests/smoke/homepage.spec.ts]`<br>
> “The page object contains locators and reusable actions. The test contains the expected outcomes. TypeScript's strict check helps catch mistakes before browser execution.”

**2:10-3:10 — Live execution**<br>
`[RUN npm run demo:homepage; SHOW BROWSER ACTIONS]`<br>
> “This is a headed Firefox run against the live public site. It checks the response, title, and visible body. No order or payment is performed.”

**3:10-4:10 — Results and evidence**<br>
`[OPEN demo-videos/index.html, THEN THE CURRENT RUN]`<br>
> “The index records the run, status, and attachments. I distinguish today's result from a previous recording and will not call a skipped or failed test a pass.”

**4:10-5:00 — Limitations and conclusion**<br>
`[SHOW FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md]`<br>
> “The suite covers selected workflows. Live-site and locator issues remain under investigation; no production defect is confirmed. I would next stabilize cross-browser behavior and reproduce the responsive observations.”

### B. Ten-minute version

**0:00-0:50 — Introduction**<br>
`[SHOW README]`<br>
> “This is a black-box Playwright project for the real public Myntra website. The goal is repeatable checks for selected workflows with reports and failure evidence.”

**0:50-1:40 — Repository and stack**<br>
`[SHOW PROJECT ROOT, package.json]`<br>
> “The code is divided into page objects, tests, and support scripts. npm and the lockfile define repeatable setup. The project uses Node.js, TypeScript, and Playwright Test.”

**1:40-2:40 — Configuration**<br>
`[OPEN playwright.config.ts, tsconfig.json]`<br>
> “Playwright has three desktop engines and one mobile emulation profile, one local worker by default, HTML and JSON reporters, and failure diagnostics. TypeScript is strict and does not emit build output.”

**2:40-4:10 — Architecture**<br>
`[SHOW BasePage.ts, HomePage.ts, SearchPage.ts]`<br>
> “The runner provides an isolated page. Page objects keep browser actions and locators readable. The search helper checks semantic controls first and can skip when no text field exists.”

**4:10-5:10 — Test example and safety**<br>
`[SHOW empty-bag.spec.ts, category-journey.ts]`<br>
> “The empty-bag test is read-only. Mutating journeys start only from an empty bag, verify item identity, and refuse to remove an unexpected item. The project does not place an order.”

**5:10-6:20 — Live run**<br>
`[RUN npm run demo:homepage; SHOW BROWSER ACTIONS]`<br>
> “This headed Firefox demo visits Myntra and checks response status, page title, and body visibility. If the network fails, the test should report that accurately.”

**6:20-7:40 — Reports**<br>
`[SHOW TEST RESULTS, THEN OPEN HTML AND JSON]`<br>
> “HTML supports interactive investigation; JSON supports summaries. The timestamp identifies the run. I do not present old output as fresh.”

**7:40-8:30 — Evidence and CI**<br>
`[SHOW SCREENSHOT/TRACE, THEN GITHUB ACTIONS]`<br>
> “The screenshot captures a page; the trace captures a timeline. The workflow typechecks on changes and runs live smoke only on manual dispatch.”

**8:30-10:00 — Results, limits, and close**<br>
`[SHOW AUDIT AND DEFECT REGISTER]`<br>
> “The latest project discovery and historical execution counts are different measures. Earlier full Firefox and smoke results are dated; the latest local JSON currently shows all discovered entries skipped, so it is not a pass. No Myntra production defect is confirmed. Future work is to stabilize live checks and repeat responsive investigations.”

### C. Fifteen-minute version

**0:00-1:00 — Purpose and scope**<br>
`[SHOW README]`<br>
> “The project automates selected user-visible tests on the public Myntra storefront. It is black-box because it interacts through a browser and does not modify or inspect Myntra's private implementation.”

**1:00-2:00 — Objectives and boundaries**<br>
`[SHOW README SAFETY SECTION]`<br>
> “The goals are repeatable browser checks and diagnostic evidence. Orders, payments, private API probing, CAPTCHA bypass, and complete WCAG certification are outside scope.”

**2:00-3:00 — Stack**<br>
`[OPEN package.json]`<br>
> “Node.js runs npm and scripts; npm installs locked dependencies; TypeScript improves static checking; Playwright controls browsers and generates reports.”

**3:00-4:15 — Configuration**<br>
`[OPEN playwright.config.ts, tsconfig.json]`<br>
> “The config defines the URL, timeouts, worker policy, reporters, screenshots/video/traces, and browser projects. The typecheck uses strict mode and no emit.”

**4:15-5:30 — Page Object Model**<br>
`[SHOW BasePage.ts, HomePage.ts, ShoppingBagPage.ts]`<br>
> “BasePage holds common navigation and assertions. Concrete page objects group page-specific controls. This improves readability, but locators still need maintenance when the live site changes.”

**5:30-6:45 — Representative specs**<br>
`[SHOW homepage.spec.ts AND empty-bag.spec.ts]`<br>
> “The smoke test checks homepage identity, search entry point, reload, and browser history. The bag test checks the empty guidance and makes no cart changes.”

**6:45-7:45 — Helper and safe journey**<br>
`[SHOW tests/support/search.ts AND category-journey.ts]`<br>
> “The helper seeks a real text-entry search field and avoids assuming identical mobile and desktop UI. Journey cleanup checks the bag count and product ID before removing the test item.”

**7:45-9:00 — Validation**<br>
`[RUN typecheck, test list, preflight]`<br>
> “These commands validate types, discovery, and local prerequisites. None by itself proves the public site passed a browser test.”

**9:00-10:30 — Live test**<br>
`[RUN PLAYWRIGHT TEST: npm run demo:homepage; SHOW BROWSER ACTIONS]`<br>
> “The demo is headed Firefox and records actual evidence. I will read the resulting status exactly as shown.”

**10:30-12:00 — Report and diagnostics**<br>
`[OPEN HTML REPORT, JSON, SCREENSHOT, TRACE]`<br>
> “The HTML report is interactive, JSON is structured, screenshot is a visual snapshot, and trace is a detailed timeline. The report timestamp matters.”

**12:00-13:00 — Cross-browser and CI**<br>
`[SHOW PROJECT LIST AND GITHUB ACTIONS]`<br>
> “The four projects are configured but must be run independently to establish outcomes. GitHub Actions typechecks by default; the live smoke job is manual.”

**13:00-14:00 — Results and failure classification**<br>
`[SHOW FINAL_TEST_COVERAGE_REPORT.md and FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md]`<br>
> “Earlier runs recorded navigation, locator, responsive, and setup observations. These are not automatically product defects. The current local JSON report shows 136 skipped entries and is not a success.”

**14:00-15:00 — Conclusion**<br>
`[RETURN TO PROJECT ROOT]`<br>
> “The project provides a useful foundation and selected end-to-end coverage. Next I would reproduce the current failures, improve locator stability only with evidence, and perform a fresh full cross-browser run when the live site and environment support it. Thank you.”

## 11. Viva questions and answers (100)

Use the spoken answer as the short response. The technical note adds detail and points to project evidence. Paths are relative to the repository root.

| # | Question | Simple spoken answer | Technical explanation, project connection, and file |
|---:|---|---|---|
| 1 | What is your project? | It is browser test automation for selected Myntra storefront flows. | It uses Playwright Test and TypeScript against the public site; `README.md`. |
| 2 | Is this a Myntra clone? | No, it tests the real public Myntra site. | The base URL is an external public URL in `playwright.config.ts`. |
| 3 | What is the problem addressed? | Repeating important browser checks manually is slow and hard to reproduce. | The suite turns selected workflows into repeatable assertions; `tests/`. |
| 4 | What is the system under test? | The public Myntra website. | SUT is `https://www.myntra.com/`, set as the default in `playwright.config.ts`. |
| 5 | What does black-box mean here? | I check visible browser behavior without changing Myntra's internals. | Tests use browser pages and public UI, not private implementation; `tests/`. |
| 6 | What are the main objectives? | Repeat selected checks and save useful outcome evidence. | Reports and diagnostics are configured in `playwright.config.ts`. |
| 7 | What is the project's scope? | Homepage, navigation, search, product, limited bag, responsive, and semantic checks. | Executable scope is under `tests/`; current discovery is 34 definitions. |
| 8 | What is outside scope? | Orders, payments, backend and private API testing, load tests, and full accessibility certification. | Safety and limitations are explained in `README.md` and `docs/FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md`. |
| 9 | Why choose Myntra? | It is a public retail storefront with useful search and product journeys. | Public UI makes it suitable for black-box browser checks, subject to availability. |
| 10 | What is a test case? | A defined scenario with actions and expected results. | Playwright `test()` definitions in files such as `tests/smoke/homepage.spec.ts`. |
| 11 | What is software testing? | It is evaluating a system against expected behavior to find problems and reduce risk. | Here, assertions compare observed page behavior with expectations in `tests/`. |
| 12 | Verification versus validation? | Verification asks whether the implementation meets its specification; validation asks whether it meets user needs. | Typecheck is a verification activity; browser journeys validate selected user-visible behavior. |
| 13 | What is regression testing? | Re-running checks after changes to detect unintended breakage. | `npm run test:regression` selects `@regression` tests in `package.json`. |
| 14 | What is smoke testing? | A small set of checks that quickly tests basic health. | `npm run test:smoke` selects tests tagged `@smoke`. |
| 15 | Manual versus automated testing? | Manual testing is performed by a person; automation repeats scripted checks. | Automation is useful for stable repetition but still needs human review of failures. |
| 16 | What is a test assertion? | An assertion compares actual behavior with an expected condition. | Playwright `expect()` checks title, URL, visibility, text, count, and state. |
| 17 | What is a test oracle? | It is the basis for deciding whether the observed result is correct. | Assertions such as the Myntra title or empty-bag guidance are the oracle; page objects/specs in `pages/` and `tests/`. |
| 18 | What is a false positive? | It is a test failure that does not represent a real system defect. | Live network and brittle locators may cause failures; the defect register avoids overclaiming. |
| 19 | What is a false negative? | It is a test pass when a real problem exists. | Weak assertions can miss defects; assertions must reflect meaningful user behavior. |
| 20 | What is risk-based testing? | It prioritizes tests by likelihood and impact of failure. | Bag preconditions and safe cleanup protect user data; `tests/shopping-journeys/category-journey.ts`. |
| 21 | What is Node.js? | It runs JavaScript programs outside a browser. | It executes npm scripts and `.mjs` helpers; `scripts/`. |
| 22 | What is npm? | It manages packages and runs project scripts. | `package.json` defines scripts and dependencies; lockfile records exact versions. |
| 23 | Why use TypeScript? | It adds types that catch many coding mistakes before execution. | `tsconfig.json` enables `strict` and `noEmit`; page/test source is typed. |
| 24 | What does strict mode do? | It enables stronger compiler checks. | The `strict` option is enabled in `tsconfig.json`. |
| 25 | What does `noEmit` mean? | The compiler checks types but does not write compiled files. | `npm run typecheck` executes `tsc --noEmit`. |
| 26 | What is a package lockfile? | It records the resolved dependency tree for reproducible installs. | `package-lock.json` is used by `npm ci`. |
| 27 | Why use `npm ci`? | It installs the locked dependencies cleanly. | It is used in GitHub Actions and setup guidance; it does not run Myntra tests. |
| 28 | What is a dependency? | A package the project relies on. | `@playwright/test`, TypeScript, and Node type definitions are in `package.json`. |
| 29 | What is a CLI? | A command-line interface for using a tool in a terminal. | `npx playwright test --list` uses Playwright's CLI. |
| 30 | What does the compiler validate? | Type consistency and related static constraints. | It cannot prove the live site's behavior; `npm run typecheck`. |
| 31 | What is Playwright? | A tool for controlling browsers and running browser tests. | `@playwright/test` is the test dependency in `package.json`. |
| 32 | What is Playwright Test? | Playwright's test runner with assertions, fixtures, projects, and reporting. | The tests import `test` and `expect` from `@playwright/test`. |
| 33 | What is a browser project? | A named set of browser/device settings for running tests. | Four projects are configured in `playwright.config.ts`. |
| 34 | Which browsers are configured? | Chromium desktop, Firefox desktop, WebKit desktop, and Chromium mobile emulation. | Their project names appear in `playwright.config.ts`. |
| 35 | Does configuration prove a browser passed? | No; it only defines a possible run target. | A real run result is needed for each project; inspect the HTML/JSON report. |
| 36 | What is a browser context? | An isolated browser session with its own cookies and storage. | Playwright's `page` fixture is created in an isolated context for tests. |
| 37 | What is a Playwright page? | A browser tab-like object for navigation and interaction. | Page objects receive `Page`; for example `pages/BasePage.ts`. |
| 38 | What is a fixture? | Reusable test setup/teardown data supplied to a test. | Tests receive the built-in `{ page }` fixture from Playwright. |
| 39 | What is `test()`? | It declares an executable test scenario. | Example: `tests/shopping-bag/empty-bag.spec.ts`. |
| 40 | What is `expect()`? | It expresses the condition the test requires. | Used in specs and page objects to assert observed UI behavior. |
| 41 | What is auto-waiting? | Playwright waits for many actions and assertions to become ready instead of relying on fixed sleeps. | Assertions such as `toBeVisible()` wait within configured timeouts. |
| 42 | What is a locator? | A query that identifies an element in the page. | Page object fields such as `HomePage.searchInput`. |
| 43 | Why prefer semantic locators? | They better represent how users and assistive technology identify controls. | `tests/support/search.ts` tries roles and labels before CSS fallbacks. |
| 44 | What is a Playwright project timeout? | The maximum allowed duration for a test. | Base config uses 45 seconds; demo config uses 90 seconds. |
| 45 | What are retries? | Re-attempts of failed tests under configured conditions. | Base config uses one retry in CI and zero locally; demo config uses zero. |
| 46 | What is the Page Object Model? | A pattern that separates page controls/actions from test scenarios. | Classes are in `pages/`; tests call their methods. |
| 47 | Why use `BasePage`? | It avoids repeating common navigation and page assertion helpers. | `pages/BasePage.ts` provides navigation, title/URL checks, reload, and overflow measurement. |
| 48 | What does a constructor do? | It initializes an object with the data it needs. | Page object constructors accept a Playwright `Page` and define locators. |
| 49 | What is a TypeScript `Locator`? | A typed handle for locating an element in a page. | `HomePage` and other page objects declare `Locator` properties. |
| 50 | What is a CSS selector? | A syntax for selecting elements based on document structure or attributes. | Some Myntra-specific selectors are in page objects; they may need updates if the site changes. |
| 51 | What is a role locator? | A locator based on an accessibility role such as textbox or button. | Search helper first checks `searchbox` and named `textbox` roles. |
| 52 | What does `toBeVisible()` check? | That a matched element is visible to the user. | Used for homepage body, search controls, products, and bag guidance. |
| 53 | What does `toHaveURL()` check? | That the current browser URL matches an expected value or pattern. | Search and navigation tests assert route behavior. |
| 54 | Why use `domcontentloaded`? | It waits until the document has been parsed without waiting for every resource. | `BasePage.navigateTo()` uses this wait state. |
| 55 | What is a popup in a browser test? | A new page opened by an interaction such as clicking a product link. | Category journey waits for a popup when opening product details. |
| 56 | Why store locators in page objects? | It centralizes page-specific selectors and makes tests easier to read. | `ProductPage` and `ShoppingBagPage` define their controls. |
| 57 | What is a helper function? | Reusable logic that does not belong solely to one test. | `tests/support/search.ts` finds an appropriate search field. |
| 58 | How does the project handle mobile search mismatch? | It checks for a usable text input and may skip rather than assume the desktop control exists. | `requireSearchTextField()` uses conditional skip behavior; `tests/support/search.ts`. |
| 59 | What is equivalence partitioning? | Grouping inputs expected to behave similarly and testing representative groups. | Search tests include normal and empty input; `tests/search/search.spec.ts`. |
| 60 | What is boundary value analysis? | Testing values at or near input boundaries. | Search tests include empty, whitespace, Unicode, punctuation, and an 80-character string. |
| 61 | What is a negative test? | A test that checks handling of invalid or disallowed input. | Add-to-bag without a selected size checks validation in `tests/product/product.spec.ts`. |
| 62 | What is a state transition test? | It checks behavior as a system moves between states. | Shopping journey moves from empty bag to one test item and back to empty. |
| 63 | What is an end-to-end journey? | A test that follows a user flow across multiple pages or features. | Category-to-product-to-bag scenarios live in `tests/shopping-journeys/`. |
| 64 | Why test an empty bag first? | To avoid changing or removing unrelated user content. | Journey helper asserts empty-bag guidance before proceeding. |
| 65 | How is test data cleaned up? | The test checks the item identity and removes only its own expected item. | `removeOnlyTestItem()` in `tests/shopping-journeys/category-journey.ts`. |
| 66 | What if there are multiple cart items? | Cleanup stops and reports the unsafe state. | It checks count is exactly one before removal in the journey helper. |
| 67 | Does the suite place orders? | No. | The guarded journeys stop after bag checks and do not proceed to payment. |
| 68 | Are all planned scenarios automated? | No, only implemented and discovered scenarios count as automated. | `npx playwright test --list` is the current discovery evidence. |
| 69 | Does the presence of a helper prove a test uses it? | No, I check the specs and calls before making that claim. | For example, `CategoryPage` has sorting logic, but that alone does not prove sorting test coverage. |
| 70 | What is a test tag? | Metadata that allows selecting a group of tests. | Examples: `@smoke`, `@search`, `@bag`, `@regression` in specs and npm scripts. |
| 71 | What is cross-browser testing? | Running the same checks in multiple browser engines. | Chromium, Firefox, and WebKit projects are configured in `playwright.config.ts`. |
| 72 | Is Chromium mobile the same as a physical phone? | No, it is browser device emulation. | The project uses Playwright's iPhone 13 device descriptor. |
| 73 | What is responsive testing? | Checking layout behavior at different viewport sizes. | `tests/responsive/responsive.spec.ts` measures horizontal overflow and bag presentation. |
| 74 | What is horizontal overflow? | Content extends wider than the viewport and may require sideways scrolling. | `BasePage.hasHorizontalOverflow()` compares scroll width and client width. |
| 75 | Is this a full accessibility audit? | No, it has only a few semantic assertions. | Accessibility specs check title/landmarks, image alt attributes, and search name. |
| 76 | What is an accessible name? | The text label assistive technology uses to identify a control. | Search checks inspect the accessible search control in `tests/accessibility/`. |
| 77 | What is an `alt` attribute? | Text alternative associated with an image. | The test samples image alt attributes but does not classify image purpose; no WCAG conclusion is claimed. |
| 78 | How can the live site affect test results? | It can change markup, content, availability, and protection behavior. | Failures can be network, site, locator, or test issues; see the defect register. |
| 79 | What is a flaky test? | A test whose outcome varies without a relevant code change. | Playwright can report flaky outcomes after retries; inspect report attempts and evidence. |
| 80 | How do you avoid overclaiming? | I report the exact run, browser, counts, and failure evidence. | Separate full Firefox and all-project smoke totals in `docs/FINAL_TEST_COVERAGE_REPORT.md`. |
| 81 | What reports does Playwright create? | HTML for interactive inspection and JSON for structured data. | Both are configured in `playwright.config.ts`. |
| 82 | Where is the standard HTML report? | Under `reports/html/`. | Generated by the HTML reporter; use `npm run report` after running tests. |
| 83 | Where is the standard JSON report? | At `reports/results.json`. | Read by `scripts/summarize-report.mjs`; it may be stale or overwritten. |
| 84 | What does the report summary script do? | It reads JSON and prints outcome counts and failures. | `npm run report:summary`; it does not run tests. |
| 85 | What is a screenshot? | A visual snapshot attached to a test outcome. | Failure screenshots are configured; demo tests also request screenshots. |
| 86 | What is a video artifact? | A recording of the browser session. | The demo runner copies actual Playwright video attachments under `demo-videos/`. |
| 87 | What is a Playwright trace? | A diagnostic archive with actions, snapshots, and timing. | Use `npx playwright show-trace "<path>"` for an actual trace. |
| 88 | How do you avoid stale evidence? | Run the scenario, note its timestamp, and inspect its run-specific output. | Demo reports use IDs under `reports/demo/`; the evidence index links saved runs. |
| 89 | What is Git? | A distributed version-control system. | The repository history records focused project changes. |
| 90 | What is a Git commit? | A saved snapshot of staged changes with a message. | A commit does not imply tests passed; it records repository changes. |
| 91 | Why stage selected files? | To keep unrelated working changes out of a commit. | `git add -- <path>` stages only an explicitly selected path. |
| 92 | What is GitHub Actions? | GitHub's hosted workflow runner. | `.github/workflows/playwright.yml` defines typecheck and manual live smoke. |
| 93 | What does CI currently verify automatically? | It installs dependencies and runs the TypeScript check on changes. | Workflow `typecheck` job; live smoke is only for `workflow_dispatch`. |
| 94 | How does the project protect authentication state? | It keeps local auth state ignored and should never commit it. | `.gitignore` excludes `playwright/.auth/`; setup script writes a local storage-state file. |
| 95 | What is the latest test discovery count? | The latest listing showed 136 project entries, not 136 unique scenarios. | 34 definitions across 13 spec files multiplied by four projects; `npx playwright test --list`. |
| 96 | What does the current local JSON report say? | It currently says all 136 entries were skipped, so it is not a passing run. | `reports/results.json` started 2026-11-01 20:08:40 UTC; rerun before presenting. |
| 97 | What did an earlier full Firefox run show? | It recorded 20 passed, 6 failed, and 1 skipped out of 27 discovered. | This is a historical baseline documented in final coverage docs, not current expanded-suite proof. |
| 98 | What did the earlier all-project smoke run show? | It recorded 5 passed and 3 failed in a separate run. | Do not add it to the full Firefox run; its failures included Chromium navigation and mobile locator observations. |
| 99 | Is a failed test automatically a product defect? | No; it can be an environment, network, locator, or test issue. | The defect register says no Myntra production defect is confirmed. |
| 100 | What would you improve next? | I would repeat the failures, stabilize verified locators, and run fresh cross-browser checks. | Priorities include network reliability, mobile search, menu behavior, responsive overflow, and evidence freshness. |

## 12. Results, limitations, and the assessment rubric

### How to explain result categories

- **Passed:** The test's assertions succeeded in that specific run and project.
- **Failed:** An assertion, setup step, or other test operation failed. State where and why if known.
- **Skipped:** The test did not run to completion. It is not a pass.
- **Flaky:** A retry changed the outcome; inspect attempts and do not report only the final green label without context.
- **Discovered/listed:** Playwright found a test definition. It has not necessarily executed.
- **Configured:** A browser project exists. It has not necessarily passed.

### Rubric check

No verified official university marking rubric with authoritative point allocations was found in the repository. `archive/historical-docs/95_PLUS_EXAMINER_MARKING_SCHEME.md` explicitly marks itself as a superseded draft, and `docs/FINAL_ASSESSMENT_SCORECARD.md` says its proposed 100-point scale is internal and non-official. Do not quote either as the university's official marking scheme or guarantee a grade.

| Likely evaluation area | Evidence available | What to show | What to prepare honestly |
|---|---|---|---|
| Problem and objectives | README and final report. | Project introduction and boundaries. | State measurable scope without claiming complete site coverage. |
| Requirements and traceability | `docs/REQUIREMENT_TRACEABILITY_MATRIX.md`. | One implemented requirement linked to a test. | Separate implemented from candidate-only requirements. |
| Test design | Search boundaries, product validation, journey tests. | One normal case and one boundary/safety case. | Avoid counting test IDs in old planning docs as executed cases. |
| Architecture | Page objects, helpers, config. | Follow test-to-page-object flow. | Explain locator fragility and maintenance needs. |
| Implementation | TypeScript tests and page classes. | Show a real test and its assertion. | Distinguish current source from older baseline documentation. |
| Execution | Current commands and actual reports. | Run a focused scenario and show timestamp. | State live site failures and skips accurately. |
| Cross-browser/responsive | Four configured projects and responsive tests. | Show project config and actual per-browser output. | Do not claim a full passing matrix without a fresh run. |
| Reporting and analysis | HTML/JSON and demo evidence index. | Show one pass and one failure if present. | Identify report timestamps and stale outputs. |
| CI and source control | Actions workflow and commit history. | Explain automated typecheck and manual live job. | A successful typecheck is not a browser pass. |
| Security and safe use | Ignore rules, auth setup, journey guards. | Show no secrets and explain limited actions. | Never reveal credentials, OTPs, or storage-state files. |
| Documentation and viva | Audit, limitations, guide, source. | Use this handbook and source anchors. | Use simple explanations tied to actual files. |
| Demonstration | `npm run demo:homepage`, saved artifacts. | Run or show dated recording. | Label any prerecorded evidence as a previous run. |

## 13. Final presentation checklist

### One day before

- [ ] Confirm Node.js, npm, Git, and VS Code are available.
- [ ] Open the correct repository root.
- [ ] Run `npm ci` only if dependencies need installing.
- [ ] Run `npx playwright install` if browser binaries are missing.
- [ ] Run `npm run typecheck`.
- [ ] Run `npx playwright test --list` and note current discovered counts.
- [ ] Run `npm run preflight` and record its actual result.
- [ ] Run `npm run verify:demo` and record its actual result.
- [ ] If conditions permit, run `npm run demo:homepage` once and inspect the outcome.
- [ ] Check the timestamp, JSON, HTML, screenshot, video, and trace that were actually produced.
- [ ] Prepare an existing valid recording as a fallback and label its date.
- [ ] Rehearse the 5-, 10-, or 15-minute script.
- [ ] Review the final audit, coverage, and defect register.
- [ ] Check that no credentials, cookies, OTPs, private account information, or auth-state files are visible.

### Thirty minutes before

- [ ] Charge laptop and connect power.
- [ ] Confirm internet and available disk space.
- [ ] Open VS Code at the repository root.
- [ ] Open a PowerShell terminal in that root.
- [ ] Close unrelated apps and silence notifications.
- [ ] Prepare Firefox and the report browser tabs.
- [ ] Confirm the latest report timestamp; do not assume it is fresh.
- [ ] Open the demo index and verify the backup recording plays.
- [ ] Confirm microphone and screen capture if recording.
- [ ] Keep the final audit and limitations docs ready.

### During the examiner session

- [ ] Introduce the project as black-box testing against the real public site.
- [ ] Show the repository and actual source structure.
- [ ] Explain one page object, one test, and one assertion.
- [ ] Run a low-risk scenario only if site and environment are available.
- [ ] Show the exact report timestamp and outcome.
- [ ] Explain failures and skips without turning them into passes.
- [ ] Show a genuine saved video or trace if useful.
- [ ] State boundaries: no order/payment, no full WCAG certification, no full-site coverage.
- [ ] Answer questions using source files and observed evidence.

### If a test fails during the demonstration

1. Stop and read the first actionable error rather than repeatedly rerunning.
2. Note the project, test name, timestamp, and whether the failure occurred during setup, navigation, action, or assertion.
3. Inspect the HTML report and trace if available.
4. Say: “This execution failed at [step]. I am preserving it as a failure while I classify whether it is a site, network, locator, or test issue.”
5. Do not call it a product defect unless repeated evidence supports that conclusion.
6. If the live site is unavailable, use the dated recording as prior evidence and say it is not a current run.

## 14. Exact commands reference

This compact table is checked against the current `package.json`.

| Purpose | Command |
|---|---|
| Install locked packages | `npm ci` |
| Install Playwright browsers | `npx playwright install` |
| Typecheck | `npm run typecheck` |
| List discovered tests | `npx playwright test --list` |
| Local preflight | `npm run preflight` |
| Verify demo readiness/evidence | `npm run verify:demo` |
| Smoke suite | `npm run test:smoke` |
| Search suite | `npm run test:search` |
| Bag suite | `npm run test:bag` |
| Accessibility-tagged suite | `npm run test:a11y` |
| Mobile responsive suite | `npm run test:responsive` |
| Regression-tagged suite | `npm run test:regression` |
| Full configured test suite | `npm test` |
| Chromium desktop suite | `npm run test:chromium` |
| Firefox desktop suite | `npm run test:firefox` |
| WebKit desktop suite | `npm run test:webkit` |
| One project from a tag | `npm run test:smoke -- --project=firefox-desktop` |
| Headed smoke for one project | `npm run test:smoke -- --project=firefox-desktop --headed` |
| Low-risk recorded demo | `npm run demo:homepage` |
| Demo evidence index | `Start-Process .\demo-videos\index.html` |
| Refresh demo index | `npm run demo:index` |
| Open standard HTML report | `npm run report` |
| Summarize standard JSON report | `npm run report:summary` |
| Show all demo scenarios | `npm run demo:all` |
| Optional manual auth-state setup | `npm run auth:setup` |

## 15. Final reminder

The strongest presentation is accurate, calm, and evidence-based. Show real source, run a safe test if conditions allow, identify the exact result, and explain what remains uncertain. A visible limitation honestly described is better than an unsupported claim of complete coverage or a fabricated pass.
