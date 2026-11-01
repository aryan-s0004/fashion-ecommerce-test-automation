# Comprehensive Test Plan

**Application Under Test:** Myntra Fashion Storefront (`https://www.myntra.com/`)
**Test Framework:** Playwright Test 1.56.1 + TypeScript 5.9.3 + Node.js 22
**Status:** Planning document; listed scope and techniques are not proof of implementation or execution.

The project currently has 27 unique test definitions. The latest full run and separate smoke outcomes are recorded in [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md). Candidate features in this plan—including sorting, suggestions, zero-results behavior, broad accessibility, and pairwise filter coverage—must not be described as implemented unless verified in current source.

---

## 1. Introduction & Objectives

The primary objective of this testing campaign is to conduct black-box functional, negative, boundary, cross-browser, responsive, and accessibility validation against the live, public Myntra ecommerce web application.

The framework is architected to be defensible, reliable, non-destructive, and resilient against real-world third-party CDN behaviors, ensuring strict separation between genuine application defects and external environment blockers.

---

## 2. Scope of Testing

### In-Scope:
1. **Homepage & Navigation:** Response status codes, page titles, header sticky navigation, footer landmarks, flyout menus, breadcrumb history traversal (back/forward).
2. **Search Engine & Boundary Analysis:** Empty queries, valid queries, whitespace padding, unicode characters, punctuation, length limits, auto-suggestions, and zero-result empty states.
3. **Category Listings (Data-Driven Journeys):** Four core datasets:
   - Men's Winter Wear (`men-winter-wear`)
   - Men's Formal Shoes (`formal-shoes`)
   - Men's Sports Shoes (`sports-shoes`)
   - Men's Sneakers (`sneakers`)
4. **Product Detail Page (PDP):** Image gallery rendering, title and brand consistency, currency formatting (₹), available vs out-of-stock size selection, mandatory size validation.
5. **Filters & Sorting:** Brand checkbox filters, filter chips, URL query parameter synchronization, and monotonic price ordering ("Price: Low to High").
6. **Shopping Bag & Cart Lifecycle:** Idempotent cart state verification, item count integrity, product ID matching, and guaranteed two-step modal removal in `finally` blocks.
7. **Responsive & Viewport Emulation:** Desktop (1280×720), Tablet (768×1024), and Mobile (390×844) layout checks with strict zero-horizontal-overflow assertions.
8. **Accessibility (A11y):** ARIA roles, accessible names, landmark regions (`banner`, `main`), heading hierarchy, and keyboard Tab navigation.
9. **CI/CD & Observability:** Two-tier GitHub Actions validation, preflight health checks, HTML/JSON reporting, traces, failure screenshots, and videos.

### Out-of-Scope (Strict Safety Boundaries):
- Order placement, checkout completion, and payment processing (strictly simulated/prohibited to protect real finances).
- Account creation, password modification, or destructive profile mutations.
- Circumvention of CAPTCHA, WAF, or anti-bot security mechanisms.
- Heavy load or stress testing against live Myntra infrastructure.

---

## 3. Test Design Techniques Applied

1. **Equivalence Partitioning (EP):** Partitioning search inputs into valid keywords, empty inputs, and non-existent inventory terms.
2. **Boundary Value Analysis (BVA):** Min length (empty `""`), 1-char, leading/trailing whitespace, multi-spaces, 120+ char long strings, and monotonic numerical price checks.
3. **Decision Table Testing (DT):** Rules governing Add-to-Bag operations (Size selected + In stock = Enabled; Size unselected = Prompted; Out of stock = Disabled).
4. **State Transition Testing (ST):** Empty Bag -> Add Item (Count = 1) -> Verify Bag -> Remove Item -> Empty Bag Restored.
5. **Use Case Testing (UC):** Complete end-to-end user journeys from Homepage -> Search -> Category -> PDP -> Size Select -> Bag -> Teardown.
6. **Error Guessing (EG):** Testing special characters, injection patterns (`<script>`), expired sessions, and disconnected network handling.
7. **Pairwise Testing:** Combinatorial evaluation of brand filters with price brackets.
8. **Risk-Based Testing:** Enforcing strict cart precondition checks before any test mutation.

---

## 4. Test Environment & Browser Configuration

```typescript
// playwright.config.ts matrix
projects: [
  { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox-desktop',  use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit-desktop',   use: { ...devices['Desktop Safari'] } },
  { name: 'chromium-mobile',  use: { ...devices['iPhone 13'] } }
]
```
- **Base URL:** `https://www.myntra.com/` (configurable via `MYNTRA_BASE_URL`).
- **Timeouts:** Navigation: 45,000ms | Action: 15,000ms | Assertions: 10,000ms.
- **Concurrency:** Local: `workers: 1` (serial execution to avoid Node.js OOM and Akamai rate limiting). CI: `workers: 2`.

---

## 5. Execution & Reporting Policy

- **Web-First Assertions:** Zero arbitrary `page.waitForTimeout()` calls. All waits are event-driven or driven by auto-retrying assertions.
- **Test Isolation:** Each test runs in an independent `BrowserContext`.
- **Reporting:** Automatic generation of HTML (`reports/html/index.html`) and JSON (`reports/results.json`).
- **Failure Artifacts:** Screenshots (`only-on-failure`), Traces (`retain-on-failure`), and Videos (`retain-on-failure`).
- **Summary Command:** `npm run report:summary` provides instant terminal breakdowns by module, browser, status, and failure reason.
