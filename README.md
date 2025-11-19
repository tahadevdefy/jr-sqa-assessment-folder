# Jr SQA Assessment

Automation + manual testing solution for the Jr SQA Assessment.

Application under test: `https://demowebshop.tricentis.com/`  
Primary automated flow: purchase of **“14.1-inch Laptop”**.


## 1. Environment

Suite was created and executed with:

- OS: Windows 10 (64-bit)
- Language: TypeScript (`.ts` files)
- Node.js: ≥ 18 (tested with Node 20.x)
- npm: ≥ 10.x
- Playwright Test: `@playwright/test@1.56.1`
- Browser: Chromium (`Desktop Chrome` device profile)

## 2. Project Structure (high-level)

- `pages/` – Page Object Model (BasePage, HomePage, ProductPage, CartPage, CheckoutPage, OrderConfirmationPage)
- `tests/e2e/purchase.spec.ts` – Main end-to-end purchase test (Task 01)
- `tests/specs/example.spec.ts` – Sample/spec playground
- `test-data/checkoutData.ts` – Test data used by E2E flow
- `manual-test-cases/TestCases.md` – Manual test cases (Task 02)
- `regression-strategy/TestStrategy.md` – Regression strategy (Task 03)
- `fixtures/` – Playwright fixtures (if needed)
- `utils/` – Shared helpers
- `playwright.config.ts` – Playwright configuration (base URL, trace/video/screenshot settings)
- `.github/` – CI configuration (if enabled)


## 3. Setup Instructions

From the project root:

```bash
# 1) Install dependencies
npm install

# 2) Install Playwright browsers
npx playwright install
```

## 4. Running the Suite

To Run Script
```bash
npm run test:e2e
```

## 5. Test Scenarios
- Automated (Playwright – Task 01)
- Main coverage in tests/e2e/purchase.spec.ts:
- Open Demo Web Shop home page.
- Register a new user (unique email) and log in.
- Navigate: Computers → Notebooks → "14.1-inch Laptop".
- Add product to cart and verify cart state.
- Proceed through checkout:
- Billing address
- Shipping address
- Shipping method
- Payment method
- Payment information
- Confirm order and validate:
- “Thank you” page
- Presence of order number.

tests/specs/example.spec.ts is a sample file and not part of the main assessment flow.

Manual (Task 02)
Additional scenarios (positive, negative, boundary, etc.) are documented in:
manual-test-cases/TestCases.md

Regression Strategy (Task 03)
Regression approach and risk analysis are documented in:
regression-strategy/TestStrategy.md

## 6. Artifacts (Traces, Videos, Screenshots, Report)

- Configured in playwright.config.ts:
- screenshot: 'only-on-failure'
- video: 'on'
- trace: 'retain-on-failure'
- HTML reporter: reporter: [['html', { open: 'never' }]]
- After a test run:
- Raw artifacts:
- test-results/
- Per-test folders with:
- trace.zip (Playwright trace)
- .webm video files
- Failure screenshots
- HTML report:
- playwright-report/

View the report:
```bash
npx playwright show-report
```

## 7. Assumptions & Limitations

- Tests target the public demo environment at https://demowebshop.tricentis.com/; orders are safe to create.
- Network is assumed to be stable; no custom retry logic beyond Playwright defaults.
- Automated suite is scoped to Chromium Desktop Chrome only; broader browser/device coverage is handled manually via manual-test-cases/TestCases.md.
- Test data is generated at runtime (e.g., unique emails); no external data management.
- Framework is focused on the 14.1-inch Laptop purchase flow and does not cover every Demo Web Shop feature.
