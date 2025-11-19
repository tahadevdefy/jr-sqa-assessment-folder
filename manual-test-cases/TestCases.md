# Manual Test Cases – 14.1-inch Laptop Purchase Flow

---

### TC_001_Registration_ValidUser_USAddress

**Objective:** Verify that a new user can register and complete purchase with a valid US address.  
**Priority:** P0  
**Type:** Functional

**Prerequisites:**
- Demo site is available.
- Test email is not already registered.

**Test Data:**
- Email: `manual_us_001@example.com`
- Password: `Password123!`
- Country: `United States`
- City: `New York`
- Address: `123 Main St`
- Zip: `10001`
- Phone: `1234567890`

**Test Steps:**
1. Open `https://demowebshop.tricentis.com/`.
2. Click `Register` and choose gender.
3. Enter first name, last name, email, password and confirm password from test data.
4. Submit the registration form.
5. Verify user is logged in (email visible in header).
6. Navigate `Computers > Notebooks`.
7. Click product `14.1-inch Laptop`.
8. Note product name and price.
9. Click `Add to cart`.
10. Verify `Shopping cart (1)` in header.
11. Open `Shopping cart`.
12. Click `I agree with the terms of service` checkbox (if shown).
13. Click `Checkout`.
14. On Billing address step, fill fields with test data and click `Continue`.
15. On Shipping address step, keep existing address and click `Continue`.
16. On Shipping method, leave default (Ground) and click `Continue`.
17. On Payment method, leave default (COD) and click `Continue`.
18. On Payment information, verify COD message and click `Continue`.
19. On Confirm order, click `Confirm`.

**Expected Results:**
- Registration succeeds and user is logged in.
- Cart shows 1 item with correct product name and price.
- Checkout completes without validation errors.
- Thank You page is displayed with order number.

**Acceptance Criteria:**
- Test passes if the order is placed successfully and a Thank You page with a numeric order number is displayed.

---

### TC_002_Registration_ValidUser_UKAddress

**Objective:** Verify purchase flow with a valid UK address.  
**Priority:** P1  
**Type:** Functional

**Prerequisites:**
- Site available.
- Email not registered.

**Test Data:**
- Email: `manual_uk_001@example.com`
- Password: `Password123!`
- Country: `United Kingdom`
- City: `London`
- Address: `10 Downing St`
- Zip: `SW1A 2AA`
- Phone: `02070000000`

**Test Steps:**
1. Register a new user with the test data.
2. Navigate to `Computers > Notebooks`.
3. Open `14.1-inch Laptop`.
4. Add to cart.
5. Open `Shopping cart`, accept TOS, click `Checkout`.
6. Fill billing address using UK data, click `Continue`.
7. Use existing shipping address, click `Continue`.
8. Keep default shipping and payment, click `Continue` on each step.
9. Confirm order.

**Expected Results:**
- UK address is accepted without errors.
- Order completes and Thank You page is shown with order number.

**Acceptance Criteria:**
- Test passes if order completes successfully with the UK address and a valid order number is displayed.

---

### TC_003_Login_ExistingUser_Purchase

**Objective:** Verify that an existing user can log in and purchase without re-registering.  
**Priority:** P1  
**Type:** Functional

**Prerequisites:**
- User from TC_001 (US) is already registered.
- User is logged out.

**Test Data:**
- Existing email and password from TC_001.

**Test Steps:**
1. Open site.
2. Click `Log in`.
3. Enter existing email/password and sign in.
4. Confirm user email appears in header.
5. Navigate `Computers > Notebooks`.
6. Open `14.1-inch Laptop`.
7. Add to cart.
8. Open `Shopping cart`, accept TOS, click `Checkout`.
9. Use existing billing address, click `Continue`.
10. Use existing shipping address, click `Continue`.
11. Keep default shipping and payment methods, click `Continue` through steps.
12. Confirm order.

**Expected Results:**
- No registration is required.
- Existing address data is reused.
- Order completes and Thank You page is shown.

**Acceptance Criteria:**
- Test passes if the existing user can complete the purchase successfully.

---

### TC_004_Cart_MultipleQuantity_Purchase

**Objective:** Verify that increasing quantity in cart updates totals and allows purchase.  
**Priority:** P1  
**Type:** Functional

**Prerequisites:**
- Registered and logged-in user.
- Cart is empty.

**Test Data:**
- Quantity: `3`.

**Test Steps:**
1. Log in as an existing user.
2. Navigate to `14.1-inch Laptop` and add to cart.
3. Open `Shopping cart`.
4. In quantity field, change quantity to `3`.
5. Click `Update shopping cart`.
6. Verify subtotal = unit price × 3.
7. Accept TOS, click `Checkout`.
8. Complete checkout using existing billing/shipping and default methods.
9. Confirm order.

**Expected Results:**
- Cart quantity updates to 3.
- Subtotal reflects 3 units.
- Order completes successfully.

**Acceptance Criteria:**
- Test passes if quantities and subtotals are correct and the order completes.

---

### TC_005_Cart_UpdateQuantity_Zero_NotAllowed

**Objective:** Verify that setting quantity to 0 removes item or is not allowed.  
**Priority:** P2  
**Type:** Negative / Functional

**Prerequisites:**
- Logged-in user.
- Cart has 1 `14.1-inch Laptop`.

**Test Data:**
- Quantity: `0`.

**Test Steps:**
1. Open `Shopping cart`.
2. Set quantity to `0`.
3. Click `Update shopping cart`.

**Expected Results:**
- Item is either removed from cart or a validation message is shown, and quantity resets to a valid value.
- No negative quantity or 0 quantity persists.

**Acceptance Criteria:**
- Test passes if the system does not allow a persisted quantity of 0 without clearly handling it (remove item or show error).

---

### TC_006_Cart_RemoveItem_ThenAddAgain

**Objective:** Verify that removing an item from cart and adding it again works correctly.  
**Priority:** P2  
**Type:** Functional

**Prerequisites:**
- Logged-in user.
- Cart has `14.1-inch Laptop`.

**Test Steps:**
1. Open `Shopping cart`.
2. Mark the item for removal (checkbox) and update cart.
3. Confirm cart is empty.
4. Navigate back to `14.1-inch Laptop`.
5. Add to cart again.
6. Confirm `Shopping cart (1)` and that the item appears in cart.

**Expected Results:**
- Item is removed successfully.
- Item can be added again without issues.

**Acceptance Criteria:**
- Test passes if cart behaves correctly in both removal and re-add.

---

### TC_007_ShippingAddress_SelectNewAddress

**Objective:** Verify selecting “New Address” at Shipping Address step and filling new data.  
**Priority:** P2  
**Type:** Functional

**Prerequisites:**
- Logged-in user with at least one saved address.
- `14.1-inch Laptop` already in cart.

**Test Data:**
- New shipping city/address/zip/phone different from billing.

**Test Steps:**
1. Open `Shopping cart`, accept TOS, click `Checkout`.
2. On Billing, use existing address, click `Continue`.
3. On Shipping address, choose `New Address` from the dropdown.
4. Fill all required fields with new shipping data.
5. Click `Continue`.
6. Complete remaining checkout with default methods and confirm order.

**Expected Results:**
- New shipping address is accepted.
- Order uses new shipping address and completes successfully.

**Acceptance Criteria:**
- Test passes if the new shipping address flow works and no validation errors occur.

---

### TC_008_ShippingMethod_ChangeToNextDayAir

**Objective:** Verify changing shipping method from Ground to Next Day Air.  
**Priority:** P2  
**Type:** Functional

**Prerequisites:**
- Logged-in user.
- Item in cart.
- Reached Shipping method step.

**Test Steps:**
1. Start checkout and progress until Shipping method step.
2. Select `Next Day Air` radio button.
3. Click `Continue`.
4. Complete payment method and payment info steps.
5. Confirm order.
6. On Confirm/Order details, verify selected shipping method shows as `Next Day Air`.

**Expected Results:**
- Shipping method selection updates to Next Day Air.
- Order completes with that method.

**Acceptance Criteria:**
- Test passes if the chosen shipping method is reflected in the order.

---

### TC_009_PaymentMethod_ChangeToCheckMoneyOrder

**Objective:** Verify selecting Check/Money Order payment method.  
**Priority:** P2  
**Type:** Functional

**Prerequisites:**
- Logged-in user with item in cart.

**Test Steps:**
1. Go through checkout to Payment method step.
2. Select `Check / Money Order` radio option.
3. Click `Continue`.
4. On Payment information, verify content mentions Check / Money Order.
5. Click `Continue`.
6. Confirm order.

**Expected Results:**
- Payment method section content matches Check / Money Order.
- Order completes successfully.

**Acceptance Criteria:**
- Test passes if order completes and the selected payment method is correctly shown.

---

### TC_010_RepeatPurchase_SecondOrderSameUser

**Objective:** Verify that the same user can place multiple orders in sequence.  
**Priority:** P2  
**Type:** Functional

**Prerequisites:**
- Existing registered user.
- At least one previous order placed.

**Test Steps:**
1. Log in as the existing user.
2. Ensure cart is empty.
3. Add `14.1-inch Laptop` to cart.
4. Complete checkout using saved addresses and default shipping/payment.
5. Confirm a new order number is generated.

**Expected Results:**
- User can place another order without issues.
- Another valid order number is generated.

**Acceptance Criteria:**
- Test passes if the second order completes successfully and has a unique order number.

---

### TC_011_Registration_InvalidEmailFormat

**Objective:** Verify registration fails with invalid email format.  
**Priority:** P1  
**Type:** Negative / Functional

**Prerequisites:**
- Site available.

**Test Data:**
- Email: `invalid-email` (no `@`).
- Valid password and other fields.

**Test Steps:**
1. Open site and click `Register`.
2. Fill all required fields with valid data except email (`invalid-email`).
3. Submit registration.

**Expected Results:**
- Registration fails.
- Email field shows validation error (e.g., “Wrong email”).

**Acceptance Criteria:**
- Test passes if user is not registered and a clear validation message is displayed for email.

---

### TC_012_Registration_MissingRequiredField_FirstName

**Objective:** Verify registration fails when First name is missing.  
**Priority:** P1  
**Type:** Negative / Functional

**Prerequisites:**
- Site available.

**Test Data:**
- Leave first name blank.
- Other fields valid.

**Test Steps:**
1. Open `Register`.
2. Leave First name empty.
3. Fill other required fields with valid data.
4. Submit registration.

**Expected Results:**
- Registration fails.
- First name field shows “First name is required” (or similar).

**Acceptance Criteria:**
- Test passes if registration is blocked and a clear error is shown.

---

### TC_013_Checkout_EmptyCart_NotAllowed

**Objective:** Verify user cannot proceed to checkout with an empty cart.  
**Priority:** P1  
**Type:** Negative / Functional

**Prerequisites:**
- Logged-in user.
- Cart is empty.

**Test Steps:**
1. Open `Shopping cart`.
2. Verify there are no items.
3. Attempt to find and click `Checkout` (if available).

**Expected Results:**
- Checkout is disabled or redirects user appropriately.
- User cannot access checkout steps without items.

**Acceptance Criteria:**
- Test passes if an empty cart cannot be checked out.

---

### TC_014_Checkout_TermsOfService_NotAccepted

**Objective:** Verify checkout is blocked when terms of service are not accepted.  
**Priority:** P0  
**Type:** Negative / Functional

**Prerequisites:**
- Logged-in user.
- Item in cart.

**Test Steps:**
1. Open `Shopping cart`.
2. Ensure TOS checkbox is **not** checked.
3. Click `Checkout`.

**Expected Results:**
- User is shown an error message about accepting terms of service.
- Checkout is not started until TOS is accepted.

**Acceptance Criteria:**
- Test passes if TOS acceptance is enforced before checkout.

---

### TC_015_Billing_InvalidZipFormat

**Objective:** Verify invalid ZIP/postal code format is rejected on Billing address.  
**Priority:** P2  
**Type:** Negative / Functional

**Prerequisites:**
- Logged-in user.
- Item in cart.

**Test Data:**
- Country: `United States`.
- Zip: `ABCDEF`.

**Test Steps:**
1. Start checkout.
2. On Billing, select United States.
3. Fill all fields valid except ZIP as `ABCDEF`.
4. Click `Continue`.

**Expected Results:**
- Validation error is shown for ZIP (if enforced).
- Billing step is not passed until ZIP is corrected.

**Acceptance Criteria:**
- Test passes if invalid ZIP is either rejected with clear message or cannot proceed.

---

### TC_016_Billing_InvalidPhone_TooShort

**Objective:** Verify phone number field rejects too-short values.  
**Priority:** P2  
**Type:** Negative / Functional

**Prerequisites:**
- Logged-in user.
- Item in cart.

**Test Data:**
- Phone: `12`.

**Test Steps:**
1. Start checkout.
2. On Billing, enter a 2-digit phone number.
3. Click `Continue`.

**Expected Results:**
- If phone validation is implemented, an error is shown.
- Billing step cannot be completed with too-short phone.

**Acceptance Criteria:**
- Test passes if invalid phone is handled (blocked or clearly flagged).

---

### TC_017_Cart_QuantityBoundary_Min1

**Objective:** Verify quantity boundary at minimum valid value (1).  
**Priority:** P3  
**Type:** Boundary / Functional

**Prerequisites:**
- Logged-in user.
- Item in cart.

**Test Steps:**
1. Open `Shopping cart`.
2. Set quantity to `1`.
3. Update cart.
4. Verify no errors and subtotal = unit price × 1.
5. Complete checkout.

**Expected Results:**
- Quantity 1 works as expected.
- Order completes with correct subtotal.

**Acceptance Criteria:**
- Test passes if min valid quantity works correctly through to order completion.

---

### TC_018_Cart_QuantityBoundary_LargeValue

**Objective:** Verify cart behavior with a large quantity.  
**Priority:** P3  
**Type:** Boundary / Functional

**Prerequisites:**
- Logged-in user.
- Item in cart.

**Test Data:**
- Quantity: `50` (or higher, depending on business rules).

**Test Steps:**
1. Open `Shopping cart`.
2. Enter quantity `50`.
3. Click `Update shopping cart`.
4. Observe subtotal and any performance/validation messages.

**Expected Results:**
- Application either:
  - Accepts 50 and recalculates subtotal correctly, or
  - Restricts and shows a message if there is a max limit.

**Acceptance Criteria:**
- Test passes if large quantity is handled correctly (no crashes, correct messages/calculation).

---

### TC_019_Input_MaxLength_NameFields

**Objective:** Verify maximum length handling on First/Last name fields.  
**Priority:** P3  
**Type:** Boundary / UI

**Prerequisites:**
- Site available.

**Test Data:**
- First name = 50+ characters.
- Last name = 50+ characters.

**Test Steps:**
1. Open `Register` page.
2. Paste very long strings into First name and Last name.
3. Complete other fields with valid data.
4. Submit registration.

**Expected Results:**
- Either:
  - Fields are truncated to allowed length without error, or
  - Validation errors show if exceeded.
- Registration outcome is consistent with business rules (but app does not break).

**Acceptance Criteria:**
- Test passes if long input is handled gracefully with clear behavior.

---

### TC_020_Compatibility_ChromeDesktop_HappyPath

**Objective:** Verify full happy path purchase on Chrome desktop.  
**Priority:** P1  
**Type:** Compatibility / Functional

**Prerequisites:**
- Browser: Chrome latest on desktop.
- Site available.

**Test Steps:**
1. Using Chrome on desktop resolution (e.g., 1920x1080), execute the same steps as TC_001.
2. Observe layout and behavior at each step.

**Expected Results:**
- All pages render correctly.
- No layout breaks, scroll issues, or missing controls.
- Purchase completes successfully.

**Acceptance Criteria:**
- Test passes if the full flow is usable and correct on Chrome desktop.

---

### TC_021_Compatibility_FirefoxDesktop_HappyPath

**Objective:** Verify full happy path purchase on Firefox desktop.  
**Priority:** P2  
**Type:** Compatibility / Functional

**Prerequisites:**
- Browser: Firefox latest on desktop.

**Test Steps:**
1. Using Firefox, repeat TC_001 steps.
2. Observe any visual or functional differences.

**Expected Results:**
- Functionality matches Chrome behavior.
- No critical layout or interaction issues.

**Acceptance Criteria:**
- Test passes if the full flow works as expected on Firefox.

---

### TC_022_Compatibility_MobileViewport_HappyPath

**Objective:** Verify core purchase flow on a mobile-like viewport.  
**Priority:** P2  
**Type:** Compatibility / UI

**Prerequisites:**
- Browser with dev tools (e.g., Chrome).
- Mobile viewport (e.g., 375x812, iPhone X) enabled.

**Test Steps:**
1. Open site with mobile viewport enabled.
2. Execute TC_001 steps.
3. Pay attention to navigation menus, buttons, and forms.

**Expected Results:**
- Pages remain usable on smaller screen.
- Menu and buttons are accessible without horizontal scrolling.
- Purchase completes successfully.

**Acceptance Criteria:**
- Test passes if the flow can be completed on a mobile-sized viewport without major usability issues.

---

### TC_023_Accessibility_KeyboardOnly_CheckoutFlow

**Objective:** Verify that checkout steps are navigable using keyboard only.  
**Priority:** P2  
**Type:** Accessibility

**Prerequisites:**
- Browser open on site.
- User ready to start checkout with item in cart.

**Test Steps:**
1. Using only keyboard (Tab, Shift+Tab, Enter, Space), navigate from homepage to registration/login.
2. Log in or register using keyboard only.
3. Navigate to `14.1-inch Laptop`, add to cart.
4. Open cart, accept TOS, and proceed to checkout using keyboard only.
5. Complete all checkout steps without using the mouse.

**Expected Results:**
- All interactive elements (links, buttons, form fields) can be focused and activated via keyboard.
- Focus order is logical.
- No step is blocked due to inaccessible controls.

**Acceptance Criteria:**
- Test passes if the entire purchase flow can be completed using keyboard only.

---

### TC_024_Accessibility_LabelsAndHeadings_Checkout

**Objective:** Verify basic accessibility of labels and headings on checkout pages.  
**Priority:** P3  
**Type:** Accessibility / UI

**Prerequisites:**
- Browser with dev tools or basic accessibility tools.
- Checkout page reachable.

**Test Steps:**
1. Start checkout and go through each step (Billing, Shipping address, Shipping method, Payment method, Payment info, Confirm).
2. For each form field, check that:
   - It has a visible label.
   - Label text is meaningful (e.g., “First name”, “Email”, etc.).
3. Verify that main sections (Billing address, Shipping address, etc.) are rendered as headings (`h1`, `h2`, etc.).
4. Optionally use a screen reader or accessibility inspector to verify associations.

**Expected Results:**
- All required fields have clear labels.
- Sections have appropriate headings, aiding navigation.

**Acceptance Criteria:**
- Test passes if labels and headings are present and meaningful for all major checkout sections.
