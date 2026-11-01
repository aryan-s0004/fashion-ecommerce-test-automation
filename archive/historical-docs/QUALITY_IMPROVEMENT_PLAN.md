# Quality Improvement Priorities

This is a forward-looking backlog, not a record of completed work or a promised grade. Priorities are based on the failures and limits in [FINAL_PROJECT_AUDIT.md](FINAL_PROJECT_AUDIT.md).

1. Reproduce the 360, 390, and 768 pixel overflow observations; identify the overflowing element and distinguish site behavior from test setup.
2. Inspect the mobile search control and test its actual interaction rather than expecting the desktop textbox.
3. Investigate the category-menu locator failure and the long-query page-setup timeout.
4. Review the sampled image-alt assertion to distinguish informative and decorative imagery.
5. Run the full suite in additional browser projects when site/network conditions permit.
6. Add sorting, filter reset, or broader accessibility checks only after confirming site behavior and defining maintainable assertions.

The current full Firefox run had 20 passes, 6 failures, and 1 skip; the separate smoke run had 5 passes and 3 failures. Do not describe this backlog as resolved until fresh source and execution evidence supports that status.
