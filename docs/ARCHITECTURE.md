# Architecture

```text
Browser
  └─ React single-page interface (src/App.jsx)
      ├─ Local catalog import (src/products.json)
      ├─ React view and filter state
      └─ LocalStorage: myntra-cart, myntra-wishlist, myntra-user

Playwright runner
  ├─ playwright.config.ts: Chromium, local Vite server, reporters/evidence
  ├─ tests/pages/Pages.ts: reusable page objects
  └─ tests/*.spec.ts: module specs and full regression journey
```

`App.jsx` owns the small demo's view state and user flows. Hash routes allow refresh-safe local navigation without a routing dependency. Product JSON is imported at build time. Cart lines are identified by product ID plus selected size. The demo checkout validates native form constraints and then changes to an order confirmation state; it makes no network transaction.

`scripts/demo.js` starts one Vite process, waits for port readiness, and runs Playwright in headed mode with the `DEMO=1` setting. The test runner manages its own browser process and writes reports/evidence. UI persistence survives refresh through LocalStorage; Playwright contexts isolate separate test cases.
