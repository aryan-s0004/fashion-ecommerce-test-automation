# Limitations

- Chromium desktop navigation to Myntra failed twice with `net::ERR_HTTP2_PROTOCOL_ERROR`; Firefox, WebKit and mobile Chromium homepage checks passed.
- Browser behavior differs in this environment. The desktop Chromium blocker remains unresolved.
- Search locators and behavior assertions remain provisional pending live interaction checks.
- Only the homepage smoke case has executed across projects: Firefox, WebKit and mobile Chromium passed; desktop Chromium failed twice. Search cases are not run.
- No category, product, filter, sorting, bag, responsive-specific, accessibility, visual, or account flows have been verified.
- No production defect is claimed. Do not bypass network/site restrictions or bot protections.
