# Examiner Demo Speaking Script

Use this as a guide, not a claim that every configured test passed.

## Two-minute project introduction

“Good morning. My project is a black-box test automation framework for selected user journeys on Myntra’s public e-commerce website. It uses Playwright Test, TypeScript, and Node.js. The repository contains 27 unique discovered test definitions across homepage, navigation, search, product, shopping bag, responsive, accessibility, and shopping-journey specs. Four browser/device projects are configured, but the latest full-suite run covered Firefox only. The latest Firefox run had 20 passes, 6 failures, and 1 skipped test. I report those failures rather than hiding them. The work does not place orders or payments, and it does not bypass login challenges.”

## Two-minute architecture explanation

“The Playwright configuration defines the test directory, browser projects, timeouts, worker policy, reporters, and failure artifacts. Individual specs express scenarios and assertions. Page objects under `pages/` encapsulate commonly used Myntra locators and actions, while `tests/support/search.ts` handles search-field discovery. Shopping journeys share a helper for category-to-product-to-bag steps. Each Playwright test normally receives an isolated context. Cart-changing journeys first check that the bag is empty, verify the product and size, remove only the test item, and stop before order placement. The project uses some site-specific CSS selectors, so UI changes can require locator maintenance.”

## Two-minute execution and reporting explanation

“I first run the local preflight and test discovery. In the latest full Firefox run, Playwright discovered 27 cases; 26 executed, 20 passed, 6 failed, and 1 authenticated case was skipped because local auth state was unavailable. Failures included a sampled image-alt assertion, a menu locator, three viewport overflow checks, and a page setup timeout. In the separate all-project smoke run, five of eight executions passed; two desktop Chromium navigations failed with an HTTP/2 protocol error, and mobile search did not match the desktop search-input locator. These results identify test/environment observations, not automatically confirmed Myntra defects. The JSON/HTML report and retained traces are run-specific evidence.”

## Closing

“This project demonstrates practical test design, browser automation, assertions, test isolation, failure diagnostics, traceability, and safe test-data cleanup. It is selective coverage of a live public site, not proof that the entire site is defect-free. The highest-priority next steps are to investigate the responsive overflow and image-alt observations, improve the mobile search test, stabilize the live-site run, and expand tests only where behavior can be verified.”
