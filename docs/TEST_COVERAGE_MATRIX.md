# Test coverage matrix

| Module | Automated scenarios | Isolated spec coverage | Visible demo step |
|---|---|---|---|
| Homepage and branding | title, hero, categories, featured items, logo route | homepage, branding | 1–2, 27 |
| Navigation | primary categories, footer, mobile menu, keyboard | navigation, responsive, accessibility | 3–6 |
| Search | exact/partial/case-insensitive, blank/unknown, category/brand, suggestions, whitespace, punctuation | search, expanded, branding | 7–8, 27 |
| Categories | category/type/price/brand/rating/discount filters, combined filters, ascending/descending/name/rating/discount sorting | category, expanded | 3-6, 27 |
| Product details | details, price, sizes, missing-size feedback, wishlist | product, expanded | 9–10 |
| Cart | add, quantity, lower bound, row identity by size, removal, persistence, totals, delivery threshold | cart, expanded | 11–15, 18 |
| Wishlist | add/remove, heart state, persistence | wishlist, product, expanded | 16–18 |
| Authentication | valid/invalid login, native required fields, password boundary, registration, mismatch, account persistence, logout and re-login | authentication, expanded | 19–20 |
| Checkout | required fields, phone/PIN patterns, address/email boundaries, confirmation | checkout, expanded | 21–23 |
| Responsive | small mobile, mobile, tablet, desktop, wide desktop overflow and menu | responsive, branding, expanded | 24–26 |
| Accessibility | named navigation, search control, image alt attributes, keyboard activation, named controls | accessibility | asserted across steps |

The isolated suite contains 59 tests per browser (118 total in the final Chrome+Edge run). The visible journey contains 28 named scenarios per browser. These are test counts, not source-line coverage. The final recorded run passed 118/118 regression tests and both visible demos passed 28/28 scenarios.
