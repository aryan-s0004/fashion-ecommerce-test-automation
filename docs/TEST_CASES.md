# Test cases

The following 54 project-specific manual/execution cases form the coverage inventory. Automated cases are marked **A** and live in the Playwright specs. Cases marked **M** are manual extensions or suggested checks and must not be counted as executed until run and recorded. Separately, the final full suite contains 55 individual Playwright tests per browser (110 cross-browser test executions); `tests/demo/myntra-full-demo.spec.ts` performs 28 named sequential scenarios per visible browser run.

| ID | Module | Scenario / expected result | Type |
|---|---|---|---|
| TC01 | Home | Load home and show brand title | A |
| TC02 | Home | Hero message and collection CTA appear | A |
| TC03 | Home | Three shop-by-mood tiles appear | A |
| TC04 | Home | Featured products appear | A |
| TC05 | Home | Logo returns from listing to home | A |
| TC06 | Home | Footer informational link opens story | A |
| TC07 | Navigation | Men opens Men listing | A |
| TC08 | Navigation | Women opens Women listing | A |
| TC09 | Navigation | Kids opens Kids listing | A |
| TC10 | Navigation | Accessories category is reachable | M |
| TC11 | Search | Exact valid product search returns match | A |
| TC12 | Search | Partial product search returns match | A |
| TC13 | Search | Uppercase query matches lowercase catalog | A |
| TC14 | Search | Unknown query shows empty state | A |
| TC15 | Search | Empty query displays full catalog | A |
| TC16 | Search | Brand name can be used in search | M |
| TC17 | Category | Men listing contains ten items | A |
| TC18 | Category | Type filter narrows Men to shirts | A |
| TC19 | Category | Price ceiling limits Women's products | A |
| TC20 | Category | Low-to-high sorting orders prices | A |
| TC21 | Category | High-to-low sorting reverses price order | M |
| TC22 | Category | Name sorting orders alphabetically | M |
| TC23 | Product | Product name and price are visible | A |
| TC24 | Product | Size can be selected | A |
| TC25 | Product | Add to bag without size gives feedback | A |
| TC26 | Product | Add to bag after size selection succeeds | A |
| TC27 | Product | Product can be wishlisted | A |
| TC28 | Product | Product image has descriptive alt text | A |
| TC29 | Cart | Added item is visible in cart | A |
| TC30 | Cart | Increase quantity updates count and subtotal | A |
| TC31 | Cart | Decrease quantity cannot go below one | M |
| TC32 | Cart | Remove item restores empty state | A |
| TC33 | Cart | Cart persists after reload | A |
| TC34 | Cart | Delivery is free at ₹1,999 | M |
| TC35 | Wishlist | Add item and see in wishlist | A |
| TC36 | Wishlist | Wishlist persists after reload | A |
| TC37 | Wishlist | Remove item returns empty state | A |
| TC38 | Authentication | Valid demo login identifies Alex | A |
| TC39 | Authentication | Invalid credentials are rejected | A |
| TC40 | Authentication | Logout returns to login form | A |
| TC41 | Authentication | Required fields block empty submission | A |
| TC42 | Checkout | Required delivery fields are enforced | A |
| TC43 | Checkout | Phone boundary rejects nine digits | A |
| TC44 | Checkout | PIN boundary rejects five digits | A |
| TC45 | Checkout | Valid form confirms simulated order | A |
| TC46 | Checkout | Confirmation includes order reference | A |
| TC47 | Checkout | Confirmation states no payment taken | A |
| TC48 | Responsive | Mobile viewport has no horizontal overflow | A |
| TC49 | Responsive | Tablet viewport has no horizontal overflow | A |
| TC50 | Responsive | Desktop viewport has no horizontal overflow | A |
| TC51 | Responsive | Mobile category entry remains reachable | A |
| TC52 | Accessibility | Navigation has accessible name | A |
| TC53 | Accessibility | Keyboard can activate navigation | A |
| TC54 | Accessibility | Main action controls have names | A |

Automated status is determined solely by the current JSON/HTML Playwright report. Manual cases above remain planned until separately evidenced.
