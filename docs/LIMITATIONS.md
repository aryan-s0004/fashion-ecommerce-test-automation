# Limitations

The current authoritative status is in [FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md](FINAL_DEFECT_AND_LIMITATIONS_REGISTER.md). The older run notes below are superseded by the 2026-11-01 execution report.

- The latest full suite was Firefox-only: 20 passed, 6 failed, 1 skipped out of 27 discovered.
- A separate four-project smoke run had 5 passes and 3 failures; desktop Chromium navigation reported `ERR_HTTP2_PROTOCOL_ERROR`, and mobile search did not match the desktop search-input locator.
- The image-alt and three responsive overflow assertions failed in the Firefox run; these observations need confirmation and do not yet establish Myntra production defects.
- The long-query test timed out while setting up a page, before testing the query itself.
- Four category-to-bag journeys and two product tests passed in Firefox. Sorting and filter reset are not implemented as current tests.
- One authenticated flow was skipped because no local storage state was available. Manual sign-in, OTP, and CAPTCHA behavior is not executed test coverage.
- Accessibility checks are limited and do not establish WCAG conformance. No load, payment, backend, or visual-baseline testing is claimed.
- Reports and traces are generated locally and may be overwritten. Use their timestamp when presenting them.
- Do not bypass network/site protections, automate OTP/CAPTCHA, or place orders/payments.
