# Viva preparation: Myntra Clone Site

**Project:** Myntra Clone Site  
**Description:** Myntra-Inspired E-Commerce Website with Automated Regression Testing

1. **What problem does the project demonstrate?**  
   It demonstrates common e-commerce shopping flows and how to automate their regression checks in a browser.

2. **Why is Myntra described as a fictional demo brand?**  
   The storefront is a local learning clone. It is not the production Myntra website and does not connect to its services.

3. **Which parts are client-side only?**  
   Catalog rendering, search, filters, cart, wishlist, mock account forms, and mock checkout run in the browser.

4. **Where is the product catalog stored?**  
   The 60-item local catalog is in `src/products.json` and is imported into the React app.

5. **Why is LocalStorage used for the cart?**  
   It preserves a demonstration cart across page refreshes without requiring a backend.

6. **How is wishlist state persisted?**  
   React saves the wishlist array under the `myntra-wishlist` LocalStorage key.

7. **How does React refresh the UI after a cart update?**  
   A state setter changes the cart state, causing React to render the updated UI; an effect persists it to LocalStorage.

8. **What does Vite provide?**  
   Vite serves the development app and bundles the React application for production.

9. **Why use Playwright?**  
   It automates real browser interactions and assertions across installed browsers, with reports and evidence capture.

10. **What is a Page Object Model?**  
    It groups page actions and locators into reusable classes, such as `HomePage`, `CartPage`, and `CheckoutPage`.

11. **Which locators are used for reliable tests?**  
    Tests prefer accessible roles, labels, and stable page-specific selectors; ambiguous header controls are scoped to the banner.

12. **Why prefer accessible role locators?**  
    They reflect how people and assistive technology identify controls and make tests less tied to styling.

13. **What does an assertion prove?**  
    It checks an observed browser state against the expected result for that scenario.

14. **What does the HTML report show?**  
    Test names, browser projects, outcomes, durations, and failure attachments.

15. **What does the JSON report preserve?**  
    Machine-readable test suites, test results, statistics, durations, and errors from the actual run.

16. **When are screenshots captured?**  
    Playwright captures failure screenshots; the sequential demo also saves a screenshot at a failed scenario.

17. **What is a Playwright trace useful for?**  
    It provides a timeline of actions, page snapshots, and network/browser activity for debugging a failure.

18. **How does video help?**  
    The full Chrome and Edge demo videos show the complete visible 28-step journey in each browser.

19. **What is regression testing?**  
    It reruns existing checks after changes to catch behavior that used to work but may have broken.

20. **What is smoke testing?**  
    It checks that core app entry points, such as the homepage and navigation, work at a basic level.

21. **How does functional testing differ from regression testing?**  
    Functional testing checks a feature’s behavior; regression testing repeats established checks after changes.

22. **What does cross-browser testing compare?**  
    It runs the same checks in different browser engines or channels; this project validates real Chrome and Edge.

23. **Why use real Chrome and Edge channels?**  
    The project requirement is to demonstrate compatibility in the installed browsers people will actually open.

24. **How can Firefox and WebKit be included?**  
    Install them with Playwright and set `EXTRA_BROWSERS=1` to enable their configured optional projects.

25. **What is equivalence partitioning?**  
    It groups inputs expected to behave alike, such as matching, blank, and non-matching search queries.

26. **Give a search input partition.**  
    A known product query should match; an unknown query should show an empty state; blank or whitespace input should return the catalog.

27. **What is boundary value analysis?**  
    It checks values at and around a limit, where validation defects commonly occur.

28. **Which telephone boundary is tested?**  
    The form requires exactly ten digits, and a nine-digit value is rejected.

29. **Which PIN boundary is tested?**  
    The form requires exactly six digits; a five-digit value is invalid.

30. **What is a decision table?**  
    It lists combinations of conditions and the expected outcome for each combination.

31. **How could login be represented in a decision table?**  
    Valid email plus valid demo password succeeds; wrong email or wrong password fails; missing required fields are blocked by form validation.

32. **What is state transition testing?**  
    It verifies that the app moves correctly between states after user actions.

33. **Name a cart state transition.**  
    An empty cart becomes populated after adding a sized product, then the quantity can increase or the item can be removed.

34. **Why must a size be selected before adding apparel?**  
    The cart identifies a product and its size as a distinct line, so size is required to identify the item.

35. **How is the subtotal calculated?**  
    Each line contributes unit price multiplied by quantity; the cart sums those line totals.

36. **What happens after removing the last item?**  
    The cart shows its empty state and no cart line remains.

37. **What is the free-delivery threshold?**  
    A subtotal of ₹1,999 or more receives free delivery; lower totals show a delivery fee.

38. **How is an invalid search communicated?**  
    The results area displays a helpful “No pieces found” empty state.

39. **How are product categories represented?**  
    Category values in the local product data drive category navigation, filtering, and category-name searches.

40. **What checkout validation is used for the phone?**  
    A native HTML pattern accepts exactly ten numeric digits.

41. **Why is checkout described as simulated?**  
    It validates a demo form and renders a confirmation; it does not submit an order to a server or take payment.

42. **What does mock login authenticate?**  
    It checks the demo credentials locally and displays a mock signed-in profile; it is not production authentication.

43. **What are LocalStorage limitations?**  
    Data stays in that browser profile, is not shared between devices, and is not a secure account database.

44. **What makes the interface responsive?**  
    CSS layout rules and mobile navigation adapt the page to different viewport widths.

45. **How does the suite check for horizontal overflow?**  
    It compares document scroll width with client width at mobile, tablet, and desktop sizes.

46. **Why should image alt text be meaningful?**  
    It gives assistive technology a text alternative describing the image’s content.

47. **What is keyboard navigation testing?**  
    It checks that users can focus and activate controls without relying on a mouse.

48. **How do reports avoid fabricated outcomes?**  
    They are generated by Playwright’s reporters from executed browser tests, not prefilled counts.

49. **Why are some test cases manual?**  
    They are planned checks not included in the automated suite; they must not be counted as executed until run.

50. **Which artifacts help diagnose a failure?**  
    A failure screenshot, trace, video, and HTML/JSON report provide visual, temporal, and machine-readable evidence.

51. **What is a flaky test?**  
    A test that passes or fails inconsistently without a relevant code change, often due to unstable waits or data.

52. **How do stable labels reduce maintenance?**  
    Tests can locate controls by user-facing names rather than brittle DOM position or CSS appearance.

53. **Why keep test data deterministic?**  
    A fixed local catalog makes expected results repeatable and independent of changing external product APIs.

54. **How does this app differ from the actual Myntra website?**  
    It is a local educational clone with fictional demo behavior, no real accounts, no inventory, no backend, and no payment processing.

55. **How does registration store a demo account?**  
    The app saves a synthetic email, name, and password in browser LocalStorage so the registered user can sign in again during the demo.

56. **Why is LocalStorage authentication unsuitable for a real shop?**  
    Browser storage is accessible to page scripts and has no server-side identity verification, password hashing, or access controls.

57. **How is the brand filter verified?**  
    The test selects a brand and asserts every visible product card carries that brand name.

58. **How is the discount filter verified?**  
    Product cards expose their calculated discount to the test, which checks every displayed product meets the selected threshold.

59. **What does a continuous demonstration session mean here?**  
    Each browser runs the named scenarios sequentially on one page in one visible browser launch, while the separate regression tests use isolated contexts.

60. **What makes a test result trustworthy?**  
    The test executes a user action, checks the resulting application state, and lets Playwright generate the report from that actual outcome.
