# Demonstration Failure Backup Plan (Contingency Strategy)

**Objective:** Ensure a completely defensible, flawless practical examination presentation even if the live Myntra public website experiences unexpected server downtime, Akamai rate-limiting, CAPTCHA challenges, or local internet disruption.

---

## 1. Risk Matrix for Live Demonstration

| Potential Failure Mode | Root Cause | Impact | Automated Framework Response | Backup Defense Action |
|---|---|---|---|---|
| **Akamai HTTP/2 Protocol Error** | Headless Chromium reset on edge node | Navigation timeout | Detected by diagnostic handler | Switch to headed Google Chrome (`--channel=chrome`) or Firefox |
| **Complete Internet Disconnect** | Local WiFi outage | Cannot load live domain | Tests throw navigation error | Execute static preflight verification and review pre-recorded traces & HTML reports |
| **Myntra Bot Challenge / CAPTCHA**| Rapid requests from local IP | Interstitial bot shield | Framework pauses | Demonstrate manual handoff script (`setup-auth.mjs`) or inspect trace evidence |
| **Product Out of Stock** | Item sold out during demo | PDP size selection disabled | Test skips gracefully | Framework dynamically selects next visible in-stock card |

---

## 2. Step-by-Step Contingency Action Plans

### Contingency Plan A: Chromium HTTP/2 Failure During Demo
1. **Immediate Diagnosis:** If desktop Chromium fails with `net::ERR_HTTP2_PROTOCOL_ERROR`, immediately explain to the examiner:  
   *"This is an Akamai edge network multiplexing behavior known as `ENV-001`. Playwright's Firefox and WebKit engines bypass this restriction."*
2. **Execute Alternate Command:**
   ```powershell
   # Run live search and category journey using Firefox
   npx playwright test tests/smoke/homepage.spec.ts tests/search/search.spec.ts --project=firefox-desktop --headed
   ```
3. **Outcome:** Live browser opens visibly in Firefox and executes flawlessly.

---

### Contingency Plan B: Live Site Down / Internet Outage
If the physical venue loses internet connectivity during the viva:
1. **Explain the SQA Architecture:**  
   *"Because we adhere to enterprise SQA standards, our framework includes independent static validation and local report inspection that functions completely offline without internet access."*
2. **Demonstrate Static Architecture:**
   ```powershell
   # 1. Show preflight verification
   npm run preflight

   # 2. Show strict TypeScript compilation
   npm run typecheck

   # 3. Show full test suite discovery (all 40+ tests across 4 browsers)
   npx playwright test --list
   ```
3. **Open Interactive Local HTML Report:**
   ```powershell
   # Serves the local HTML report from previous verified run
   npx playwright show-report reports/html
   ```
4. **Demonstrate Trace Viewer:**
   ```powershell
   # Inspect recorded DOM snapshots, network timelines, and execution traces offline
   npx playwright show-trace reports/traces/
   ```

---

## 3. Examiner Talking Points (Turning Failures into High-Scoring Strengths)
- *"A naive automation suite blindly crashes when a third-party site blocks it. Our enterprise framework defensively catches protocol exceptions, logs them in a structured defect register, and preserves forensic traces."*
- *"We deliberately avoid mocking production responses because real black-box SQA must observe authentic CDN behavior."*
