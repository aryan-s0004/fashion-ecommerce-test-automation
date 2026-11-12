# Architecture

```text
Browser
  └─ React single-page interface (src/App.jsx)
      ├─ Local catalog import (src/products.json)
      └─ LocalStorage cart, wishlist, and mock user

Playwright runner
  ├─ playwright.config.ts: Chrome and Edge, Vite server, reporters/evidence
  ├─ tests/pages/Pages.ts: reusable page objects
  └─ tests/*.spec.ts: 55 isolated regression tests per browser
      └─ tests/demo/myntra-full-demo.spec.ts: one sequential 28-step visible journey
```

Hash routes preserve navigation on refresh. Cart lines are identified by product ID and size. Checkout validates fields and displays a simulated confirmation without a network transaction. The visible demo uses one Playwright context and page per real browser for all 28 scenarios. The separate regression suite uses normal isolated per-test contexts.
