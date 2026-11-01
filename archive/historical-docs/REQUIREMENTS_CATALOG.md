# Requirements Catalog

**Application Under Test:** Myntra Web Storefront (`https://www.myntra.com/`)  
**Domain:** Fashion & Lifestyle Ecommerce  
**Status:** Proposed requirements baseline; not a statement of implemented or verified coverage

The requirements below describe intended behavior and candidate scope. Only requirements traced to current specs in [REQUIREMENT_TRACEABILITY_MATRIX.md](REQUIREMENT_TRACEABILITY_MATRIX.md) have a current automation mapping; even a mapped test may have failed or been skipped. The current suite has 27 unique test definitions. Sorting, filter reset, suggestions, zero-results behavior, broad keyboard accessibility, and most catalog entries are not verified by current automated tests. See [FINAL_TEST_COVERAGE_REPORT.md](FINAL_TEST_COVERAGE_REPORT.md) for actual run outcomes.

---

## 1. Functional Requirements (FR)

### Module 1: Storefront Access & Homepage (REQ-HOME)
- **REQ-HOME-001:** The system shall respond to HTTP GET requests on `/` with a successful status code (<400) and render a non-empty HTML document.
- **REQ-HOME-002:** The homepage shall display the official Myntra brand identity, including logo, title tag matching `/myntra/i`, and favicon.
- **REQ-HOME-003:** The homepage shall provide an accessible search entry point and primary category navigation headers (Men, Women, Kids, Home & Living, Beauty).
- **REQ-HOME-004:** The storefront header shall remain accessible across scrolling, browser resize, reload, and history traversal (back/forward).

### Module 2: Store Navigation & Taxonomy (REQ-NAV)
- **REQ-NAV-001:** Hovering over primary menu items shall display structured flyout dropdowns organized by product categories.
- **REQ-NAV-002:** Clicking any category or subcategory link shall navigate to the correct URL slug without redirect loops.
- **REQ-NAV-003:** Category listings and product detail pages shall display hierarchical breadcrumbs allowing return navigation to parent categories.
- **REQ-NAV-004:** Clicking the brand logo from any internal page shall safely navigate back to the homepage root.

### Module 3: Search Engine & Suggestions (REQ-SEARCH)
- **REQ-SEARCH-001:** The search input shall expose an accessible name, role (`textbox` or `searchbox`), and clear placeholder text.
- **REQ-SEARCH-002:** Submitting a non-empty alphanumeric search query shall transition the browser to a dedicated search results listing URL containing `rawQuery`.
- **REQ-SEARCH-003:** Submitting an empty or whitespace-only search query shall preserve the current page URL without initiating unwanted page transitions.
- **REQ-SEARCH-004:** The search engine shall gracefully handle boundary inputs, including leading/trailing whitespace, punctuation, unicode characters, long strings, and special characters without throwing unhandled application errors.
- **REQ-SEARCH-005:** Typing query prefixes into the search box shall invoke real-time search suggestions with keyboard (ArrowDown/Enter) and mouse selection support.
- **REQ-SEARCH-006:** Searching for non-existent items shall render a friendly zero-results empty state.

### Module 4: Category Listing & Product Grid (REQ-CATEGORY)
- **REQ-CATEGORY-001:** Category listings shall display a structured grid of product cards with title, brand name, price (in Indian Rupees ₹), and primary product image.
- **REQ-CATEGORY-002:** Product images shall be progressively loaded with valid `naturalWidth > 0` upon scroll into viewport.
- **REQ-CATEGORY-003:** Clicking a product card shall open the corresponding Product Detail Page (PDP) in a new tab or current context with a valid `/buy` URL route.
- **REQ-CATEGORY-004:** The listing shall dynamically update product cards when filters or sorting criteria are applied.

### Module 5: Product Detail Page (REQ-PRODUCT)
- **REQ-PRODUCT-001:** The PDP shall display the full product title, brand name, numeric price with currency symbol, and image gallery.
- **REQ-PRODUCT-002:** The PDP shall render available size options (apparel or footwear) with clear visual indicators for available vs disabled/out-of-stock sizes.
- **REQ-PRODUCT-003:** Attempting to click "ADD TO BAG" without selecting a mandatory size shall trigger a prompt to select a size.
- **REQ-PRODUCT-004:** Selecting an available size shall highlight the size button and enable the "ADD TO BAG" action.

### Module 6: Filtering & Sorting Engine (REQ-FILTER & REQ-SORT)
- **REQ-FILTER-001:** The listing sidebar shall expose filter dimensions (Brand, Price, Color, Discount, Size) relevant to the active category.
- **REQ-FILTER-002:** Applying a filter shall update the product listing and URL parameters, rendering filter chips.
- **REQ-FILTER-003:** Removing a filter chip or clicking "Clear All" shall restore the original listing results.
- **REQ-SORT-001:** The sorting dropdown shall offer options including "Recommended", "Price: Low to High", "Price: High to Low", and "Customer Rating".
- **REQ-SORT-002:** Selecting "Price: Low to High" shall reorder products such that each card price is mathematically greater than or equal to the preceding card price (monotonic ordering).

### Module 7: Shopping Bag & Cart Lifecycle (REQ-BAG)
- **REQ-BAG-001:** Unauthenticated users navigating to `/checkout/cart` shall see an empty bag guidance message ("There is nothing in your bag").
- **REQ-BAG-002:** Adding an item from PDP shall accurately transfer product title, product ID, selected size, and price into the shopping bag.
- **REQ-BAG-003:** The bag shall enforce test safety: automated tests must verify the cart is initially empty before mutating, and verify item ID matching before removal.
- **REQ-BAG-004:** Removing an item shall invoke a confirmation modal; upon confirmation, the item is removed and the bag restored to its initial empty state.
- **REQ-BAG-005:** Automated tests must never trigger the "PLACE ORDER" or payment completion flow.

### Module 8: Authentication & Session (REQ-AUTH)
- **REQ-AUTH-001:** Unauthenticated access to protected account routes (`/my/orders`) shall redirect to the login gateway (`/login`).
- **REQ-AUTH-002:** Login form shall validate phone number inputs and enforce minimum digit rules.
- **REQ-AUTH-003:** Manual authentication handoff shall allow human entry of OTP/CAPTCHA without storing plain-text credentials in automated code.

---

## 2. Non-Functional Requirements (NFR)

### Module 9: Responsive Layout & Viewports (REQ-RESP)
- **REQ-RESP-001:** Storefront layouts shall be fluid across Mobile (375px/390px), Tablet (768px), and Desktop (1280px) viewports.
- **REQ-RESP-002:** The page shall have zero horizontal overflow across all supported viewports (`document.body.scrollWidth <= window.innerWidth`).
- **REQ-RESP-003:** Primary navigation, search, and action buttons shall remain visible and interactable in mobile viewports.

### Module 10: Accessibility & Semantic HTML (REQ-A11Y)
- **REQ-A11Y-001:** Interactive controls (buttons, links, search inputs) shall expose accessible names and semantic ARIA roles.
- **REQ-A11Y-002:** Informational images shall have non-empty `alt` attributes.
- **REQ-A11Y-003:** The document shall maintain an accessible heading hierarchy (`h1` -> `h2` -> `h3`) and standard landmark regions (`banner`, `main`, `contentinfo`).
- **REQ-A11Y-004:** Interactive elements shall maintain visible focus indicators during keyboard Tab traversal.

### Module 11: Network Resilience & Reliability (REQ-NETWORK)
- **REQ-NETWORK-001:** The test framework shall distinguish between application defects, CDN edge restrictions, and browser protocol negotiation issues (`ERR_HTTP2_PROTOCOL_ERROR`).
- **REQ-NETWORK-002:** Live tests shall use serial execution (`workers: 1`) to prevent local Node.js memory exhaustion and server rate limiting.
- **REQ-NETWORK-003:** Test assertions shall utilize Playwright web-first auto-waiting rather than arbitrary sleeps.

### Module 12: CI/CD, Reporting & Security (REQ-CI & REQ-SEC)
- **REQ-CI-001:** Continuous Integration shall validate TypeScript compile (`tsc --noEmit`) and test discovery on push/PR without relying on external live-site availability.
- **REQ-CI-002:** Live-site tests shall run via manual dispatch (`workflow_dispatch`) with automatic 14-day retention of failure screenshots, traces, and HTML reports.
- **REQ-SEC-001:** Git repositories shall never track `.env`, session tokens, cookies, or OTP data.
- **REQ-SEC-002:** The framework shall provide a standalone preflight health check (`npm run preflight`) and one-command headed examiner demo (`npm run demo`).
