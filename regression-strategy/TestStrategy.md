# Regression Test Strategy – Demo Web Shop

This document describes the regression testing strategy for the Demo Web Shop purchase flow (focusing on the “14.1-inch Laptop” scenario and related core e-commerce functionality).

---

## 1. Risk Assessment

### 1.1 Critical user journeys

Key business-critical flows:

1. Browse & Product Discovery  
   - Home → Category (Computers, Notebooks) → Product details (14.1-inch Laptop)
2. Cart & Checkout  
   - Add to cart → View cart → Accept TOS → Checkout → Billing → Shipping → Payment → Confirm order
3. Identity & Accounts  
   - Registration → Login/Logout  
   - Managing addresses
4. Order Visibility  
   - Order confirmation → Order history → Order details

If any of these break, users are blocked from discovering products, purchasing, or viewing orders.

### 1.2 Risk Matrix

Risk is based on **Impact × Probability**.

| Area / Feature                    | Priority | Impact if Broken                          | Probability | Risk Level | Notes                                       |
|----------------------------------|----------|-------------------------------------------|-------------|-----------:|---------------------------------------------|
| Checkout (all steps)             | P0       | Cannot place orders → revenue stop        | Medium      |      High | Multiple integrated steps, more fragile     |
| Cart (add, update qty, totals)   | P0       | Users cannot build or trust orders        | Medium      |      High | Shared price/total logic                    |
| Payment methods (COD, others)    | P0       | Orders fail at final step                 | Medium      |      High | Integration points, fee logic               |
| Login / Registration             | P0       | Users blocked from purchasing / account   | Medium      |      High | Validation, email uniqueness                |
| Product details (PDP)            | P1       | Users can’t see accurate price/stock      | Medium      |      High | Price mismatch, incorrect data              |
| Order confirmation / Thank You   | P1       | Confusion about success; support load     | Low         |    Medium | Order placed but feedback missing           |
| Order history / details          | P1       | Users can’t verify past purchases         | Low         |    Medium | Impacts trust, not immediate revenue stop   |
| Account management (addresses)   | P2       | Inconvenience; workarounds possible       | Low         |       Low | Fewer changes expected                      |
| Wishlist, reviews, newsletter    | P2       | Minor feature loss, UX only               | Low         |       Low | Non-critical traffic                        |
| UI look & feel (styling only)    | P3       | Cosmetic; core flows still usable         | Medium      |       Low | Visual only                                 |

High-risk areas (Checkout, Cart, Payment, Login/Registration, PDP) must be the **focus of regression** and **always covered by automation** as much as possible.

---

## 2. Test Selection Strategy

### 2.1 Test suites

We define three main levels:

1. **Smoke Suite** (small, fast, high-value)
2. **Core Regression Suite** (focused but broader)
3. **Full Regression Suite** (maximum coverage)

#### 2.1.1 Smoke Suite (must-run)

Objective: Quickly detect critical breakages on every commit / pull request.

Included (example mapping to existing tests):

- Site availability:
  - Can open home page.
- Identity:
  - Simple login scenario (existing user).
- Cart + Checkout (main flow):
  - Add “14.1-inch Laptop” to cart.
  - Verify price and cart quantity.
  - Run main E2E purchase flow (US customer) with:
    - Ground shipping
    - COD payment
    - Confirmation & order number check

Execution:

- Triggered on:
  - Every PR / commit to the main branch.
- Environment:
  - CI on a stable test/staging environment.

Pass criteria:

- All smoke tests must be **green** before merge.

#### 2.1.2 Core Regression Suite

Objective: Cover all **P0 and P1** areas efficiently when changes are moderate.

Includes:

- All Smoke Suite tests, plus:
  - Additional E2E dataset(s):
    - UK customer flow (different country/address format).
  - Cart behavior:
    - Update quantity (1, multiple, remove item).
  - Checkout variations:
    - New shipping address.
    - Alternate shipping methods (Next Day Air).
    - Alternate payment methods (Check/Money Order).
  - Basic order history check (if available).

Execution:

- Triggered on:
  - Every minor release that touches:
    - Checkout
    - Payment
    - Cart
    - Registration/Login
    - Product details / price logic
- Frequency:
  - At least nightly on CI.

Pass criteria:

- All P0 tests must pass.
- P1 failures must be triaged; release is blocked until risk is accepted or fixed.

#### 2.1.3 Full Regression Suite

Objective: Validate the system **end-to-end** (high confidence) before major changes go live.

Includes:

- Core Regression Suite
- Additional coverage:
  - All manual test cases from Part 2 (especially negatives, boundary, compatibility, accessibility).
  - Cross-browser scenarios (Chrome, Firefox, possibly Edge).
  - Mobile viewport checks for main flows.
  - Broader account management/secondary features (wishlist, newsletter, reviews) as manual tests.

Execution:

- Triggered on:
  - Major releases.
  - Large refactors (checkout, cart, pricing, auth).
  - Framework/library upgrades (Playwright, front-end frameworks, etc.).
- Recommended cadence:
  - Before each major deployment window (e.g., release candidate builds).

Pass criteria:

- No open P0 or P1 failures.
- P2/P3 issues are reviewed and accepted explicitly if not fixed.

---

### 2.2 Targeted Regression Selection

When changes are smaller and localized, we **select** tests based on impact:

- If change is in **product price calculation**:
  - Run:
    - PDP price tests.
    - Cart subtotal tests.
    - Checkout totals (confirm page) tests.
- If change is in **shipping methods or fees**:
  - Run:
    - Shipping method selection tests.
    - Confirm page totals verifying shipping/fee behavior.
- If change is in **registration or validation**:
  - Run:
    - Positive registration & login tests.
    - Negative registration validation (invalid email, missing required fields).
- If change is in **UI layout only**:
  - Run:
    - Smoke Suite for sanity.
    - Manual UI checks for affected pages and key flows.

This keeps regression **focused**, reducing runtime while still covering impacted risk areas.

---

### 2.3 Automation vs Manual Split

**Automated tests (high frequency, deterministic):**

- Core purchase flows (like Part 1 E2E).
- Cart calculations and quantity updates.
- Login/registration happy paths.
- Checkout path variations for supported methods.
- Basic compatibility checks (e.g., Chromium + one additional browser in CI, if configured).

**Manual tests (lower frequency, judgment-heavy):**

- Deep UI and visual checks:
  - Cross-browser layout differences.
  - Mobile responsiveness on various devices.
- Rich negative and boundary scenarios:
  - Complex data combinations not covered in automation yet.
- Accessibility checks:
  - Keyboard-only navigation across flows.
  - Screen-reader behavior.
  - Detailed label/heading/ARIA validation.
- Exploratory testing after major changes.

---

## 3. Execution & Maintenance

### 3.1 Prioritization

All tests are tagged conceptually by priority (P0/P1/P2/P3) and type:

- **P0**: must pass for any release (checkout, cart, login, critical data consistency).
- **P1**: should pass for minor releases; must pass for major.
- **P2/P3**: can be deferred if time-boxed, but should be covered periodically and on major releases.

Decision rule:

- No release if any **P0** test is failing.
- P1 failures require explicit risk acceptance by product/engineering leadership.
- P2/P3 are planned into future sprints if not fixed immediately.

### 3.2 Suite Maintenance

To keep regression suites reliable:

1. **Flaky Test Management**
   - Immediately triage flakiness (network timing, unstable locators).
   - Fix root cause or quarantine test temporarily with clear tracking.
2. **Locator & Flow Updates**
   - When UI or flows change:
     - Update Page Objects first.
     - Keep locators stable and semantic.
3. **Coverage Review**
   - Periodic review (e.g., monthly) to ensure:
     - New features are represented in regression.
     - Obsolete tests are removed or updated.
4. **Test Tagging (optional implementation)**
   - Use tags/annotations to group tests:
     - `@smoke` – smoke suite
     - `@checkout`, `@cart`, `@auth` – feature areas
   - Allows selective execution:
     - `npx playwright test --grep @smoke`

### 3.3 Execution Schedule

Recommended schedule:

- **On every commit / PR**:
  - Smoke Suite (fast, P0 checks) on CI.
- **Nightly**:
  - Core Regression Suite on CI.
  - Optionally on multiple browsers.
- **Before each release to higher environment (staging/production)**:
  - Core Regression Suite automatically.
  - A curated subset of manual tests from Part 2 (negative, boundary, compatibility, accessibility).
- **Before major releases / big changes**:
  - Full Regression Suite:
    - All automated tests.
    - Manual passes focusing on:
      - Checkout & payments.
      - Price/totals correctness.
      - Key UX/accessibility items.

### 3.4 Environments & Test Data

- **Environments**:
  - Prefer a dedicated **staging** environment that mirrors production as closely as possible.
  - Use a stable base URL in the Playwright config for consistent automation runs.

- **Test Data**:
  - Maintain reusable test accounts and addresses:
    - US customer
    - UK customer
    - Additional locales as needed
  - Use deterministic data where possible to reduce flakiness (e.g., predictable emails with timestamps or fixtures).
  - Avoid cross-test data dependencies (each test sets up its own state or uses well-scoped fixtures).

---

## 4. Summary

- The **Risk Assessment** identifies Checkout, Cart, Payment, Login, and PDP as P0/P1 areas that must always be protected by regression.
- The **Test Selection Strategy** defines when to run smoke, core regression, or full regression and how to select tests based on impact.
- The **Execution & Maintenance** section ensures tests remain reliable, prioritized, and integrated with the CI/CD process.

This strategy is designed so that:

- Small changes get **fast, targeted** regression.
- Larger releases get **broader, deeper** coverage.
- The most critical revenue-impacting flows are **continuously protected**.
