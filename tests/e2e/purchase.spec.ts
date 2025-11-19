import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { OrderConfirmationPage } from '../../pages/OrderConfirmationPage';
import { datasets } from '../../test-data/checkoutData';

test.describe('E2E purchase flow - 14.1-inch Laptop', () => {
  for (const data of datasets) {
    test(`should complete order successfully - ${data.name}`, async ({ page }) => {
      const home = new HomePage(page);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);
      const confirmationPage = new OrderConfirmationPage(page);

      // 1. Open home
      await home.open();

      // 2. Register new user
      await home.goToRegister();
      await page.check('#gender-male'); // adjust if needed
      await page.fill('#FirstName', data.billingAddress.firstName);
      await page.fill('#LastName', data.billingAddress.lastName);
      await page.fill('#Email', data.userEmail);
      await page.fill('#Password', data.userPassword);
      await page.fill('#ConfirmPassword', data.userPassword);
      await page.click('#register-button');

await expect(page.locator('.result')).toContainText('completed');

// CLICK CONTINUE after register
const continueButton = page.locator(
  'input[name="register-continue"], input.register-continue-button, a.register-continue-button'
);
await continueButton.click();

      // 3. Login if needed (site often auto-logs in after registration)
      const logoutVisible = await page.locator('a[href="/logout"]').isVisible();
      if (!logoutVisible) {
        await home.goToLogin();
        await page.fill('#Email', data.userEmail);
        await page.fill('#Password', data.userPassword);
        await page.click('input[value="Log in"]');
      }

      // 4. Go to Computers > Notebooks > 14.1-inch Laptop
      await home.goToNotebooks();
      await productPage.openNotebook('14.1-inch Laptop');

      const productName = (await productPage.getProductName())?.trim();
      const productPrice = await productPage.getProductPrice();

      // 5. Add to cart
      await productPage.addToCart();

      // 6. Verify cart badge quantity
      await productPage.expectCartQty(1);

      // 7. Go to cart
      await cartPage.openCart();

      // 8. Assertions: product name & price consistency
      const cartProductName = (await cartPage.getProductName())?.trim();
      const cartUnitPrice = await cartPage.getUnitPrice();

      expect(cartProductName).toBe(productName);
      expect(cartUnitPrice).toBeCloseTo(productPrice, 2);

      // 9. Assert cart subtotal calculation
      await cartPage.expectPriceCalculationsMatch();

      // 10. Proceed to checkout
      await cartPage.proceedToCheckout();

      // Site may require accepting terms of service
      const terms = page.locator('#termsofservice');
      if (await terms.isVisible()) {
        await terms.check();
        await cartPage.proceedToCheckout();
      }

// 11. Checkout steps: billing -> shipping address -> shipping method -> payment -> payment info
await checkoutPage.fillBillingAddress(data.billingAddress);
await checkoutPage.continueShippingAddress();              // just click Continue on Shipping Address
await checkoutPage.chooseShippingMethodAndContinue();      // Ground is default, just Continue
await checkoutPage.choosePaymentMethodAndContinue();       // COD is default, just Continue
await checkoutPage.continuePaymentInfo();                  // verify COD text + Continue

// 12. Assertions on Confirm Order page

// Product name & price consistency
const summaryName = (await checkoutPage.getOrderSummaryProductName())?.trim();
const summaryPrice = await checkoutPage.getOrderSummaryProductPrice();

expect(summaryName).toBe(productName);
expect(summaryPrice).toBeCloseTo(productPrice, 2);

// Billing address correctness
const billingBlock = (await checkoutPage.getOrderSummaryAddressBlock()) ?? '';
expect(billingBlock).toContain(data.billingAddress.firstName);
expect(billingBlock).toContain(data.billingAddress.lastName);
expect(billingBlock).toContain(data.billingAddress.city);

// Totals: Sub-Total, fee, total
await checkoutPage.assertConfirmTotals(productPrice);

// 13. Confirm order
await checkoutPage.confirmOrder();

// 14. Thank you page + order number
await confirmationPage.assertThankYouPageVisible();
await confirmationPage.assertOrderNumberFormat();

    });
  }
});
