# SQA Concepts Applied

**Project:** Myntra Fashion Ecommerce SQA Automation  
**Author:** Aryan Sahu  
**Status:** Learning notes; current implementation and execution evidence are summarized in [FINAL_PROJECT_AUDIT.md](FINAL_PROJECT_AUDIT.md).

---

## 1. Quality Assurance (QA) vs Quality Control (QC)
- **Quality Assurance (QA):** Process-oriented activities ensuring that test strategies, frameworks, coding standards, CI quality gates, and traceability matrices prevent defects during development.
  - *Applied in Project:* Establishing strict TypeScript compilation (`tsconfig.json`), least-privilege CI gates (`.github/workflows/playwright.yml`), preflight validation (`scripts/preflight.mjs`), and pre-condition safety checks.
- **Quality Control (QC):** Product-oriented activities identifying defects in the finished software deliverable.
  - *Applied in Project:* Automated Playwright test runs executing real assertions against the live Myntra storefront to identify broken links, missing elements, or layout overflow.

---

## 2. Verification vs Validation
- **Verification ("Are we building the product right?"):** Evaluating artifacts, architecture, and static code against specifications without executing the software.
  - *Applied in Project:* `npm run typecheck` (`tsc --noEmit`), lint checks, schema audits, and requirement traceability reviews.
- **Validation ("Did we build the right product?"):** Evaluating the live executing software against user requirements and business expectations.
  - *Applied in Project:* Selected browser executions against the public storefront. Four category journeys passed in the latest Firefox full run; other tests failed or were skipped as recorded in the coverage report.

---

## 3. The Test Automation Pyramid
The framework recognizes the classic testing pyramid:
```
           / \
          /   \         Manual / Exploratory (OTP, CAPTCHA, visual nuance)
         /-----\
        /  E2E  \       End-to-End Shopping Journeys (4 Core Categories, Bag, PDP)
       /---------\
      / Integration\    Component Integration (Search -> Listing, Size -> Bag)
     /-------------\
    /  Unit/Static  \   TypeScript strict typecheck, Preflight health checks
   +-----------------+
```
The black-box nature of public website automation concentrates our work in the **E2E and Integration layers**, supported by strict **Static Typecheck verification** at the base.

---

## 4. Test Oracles
A Test Oracle is the mechanism used to determine whether a test passed or failed. In this project, test oracles are implemented as:
1. **HTTP Status Code Oracle:** Response status `< 400`.
2. **Page Identity Oracle:** Document title regex `/myntra/i`.
3. **URL Parameter Oracle:** `rawQuery` parameter present and URL matching expected category slug.
4. **DOM Entity Oracle:** Element count, text content, and CSS class presence (`size-buttons-size-button-selected`).
5. **Geometry / Viewport Oracle:** Measures document width against viewport width. Three viewport assertions failed in the latest Firefox run; this is an observed test result, not a guarantee of zero overflow.

---

## 5. Defect Density & False Positives
- **False Positive:** A test reports a failure when the application is actually working correctly (commonly caused by flaky locators or arbitrary timeouts).
- **False Negative:** A test reports a pass when the application contains a defect (caused by weak assertions or missing checks).
- *Project Defense:* Auto-waiting and explicit assertions can reduce some timing ambiguity, but they do not prevent all false positives/negatives. Protocol errors are recorded as transport observations unless application-level evidence confirms a product defect.
