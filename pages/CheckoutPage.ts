import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface AddressData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address1: string;
  zip: string;
  phone: string;
}

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Step 1: Billing
  private billingContinue = this.page.locator(
    '#billing-buttons-container .button-1'
  );

  // Step 2: Shipping address
  private shippingAddressContinue = this.page.locator(
    '#shipping-buttons-container .button-1.new-address-next-step-button'
  );

  // Step 3: Shipping method
  private shippingOptions = this.page.locator(
    'input[type="radio"][name="shippingoption"]'
  );
  private shippingMethodContinue = this.page.locator(
    '#shipping-method-buttons-container .button-1.shipping-method-next-step-button'
  );

  // Step 4: Payment method
  private paymentOptions = this.page.locator(
    'input[type="radio"][name="paymentmethod"]'
  );
  private paymentMethodContinue = this.page.locator(
    '#payment-method-buttons-container .button-1.payment-method-next-step-button'
  );

  // Step 5: Payment info
  private paymentInfoText = this.page.locator(
    '#checkout-payment-info-load p'
  );
  private paymentInfoContinue = this.page.locator(
    '#payment-info-buttons-container .button-1.payment-info-next-step-button'
  );

  // Step 6: Confirm order
  private confirmOrderButton = this.page.locator(
    '#confirm-order-buttons-container .button-1.confirm-order-next-step-button'
  );

  // Totals block on Confirm Order
  private totalsTable = this.page.locator('.cart-total');

  async fillBillingAddress(addr: AddressData) {
    await this.page.selectOption('#BillingNewAddress_CountryId', {
      label: addr.country,
    });
    await this.page.fill('#BillingNewAddress_FirstName', addr.firstName);
    await this.page.fill('#BillingNewAddress_LastName', addr.lastName);
    await this.page.fill('#BillingNewAddress_Email', addr.email);
    await this.page.fill('#BillingNewAddress_City', addr.city);
    await this.page.fill('#BillingNewAddress_Address1', addr.address1);
    await this.page.fill('#BillingNewAddress_ZipPostalCode', addr.zip);
    await this.page.fill('#BillingNewAddress_PhoneNumber', addr.phone);

    await expect(this.billingContinue).toBeVisible();
    await this.billingContinue.click();
  }

  // Step 2: Shipping address – just hit Continue, we use the already-selected address
  async continueShippingAddress() {
    await expect(
      this.page.locator('#checkout-step-shipping')
    ).toBeVisible();

    await expect(this.shippingAddressContinue).toBeVisible();
    await this.shippingAddressContinue.click();
  }

  // Step 3: Shipping method – wait for radios, but keep default selection, then Continue
  async chooseShippingMethodAndContinue() {
    const firstOption = this.shippingOptions.first();

    await expect(firstOption).toBeVisible(); // wait until options are rendered

    // Optional: assert some option is checked (default Ground)
    // const checked = this.shippingOptions.filter({ has: this.page.locator(':checked') });

    await expect(this.shippingMethodContinue).toBeVisible();
    await this.shippingMethodContinue.click();
  }

  // Step 4: Payment method – COD already selected, just Continue
  async choosePaymentMethodAndContinue() {
    const firstPaymentOption = this.paymentOptions.first();

    await expect(firstPaymentOption).toBeVisible(); // radios loaded

    // Optional: verify COD is selected by default:
    // await expect(firstPaymentOption).toBeChecked();

    await expect(this.paymentMethodContinue).toBeVisible();
    await this.paymentMethodContinue.click();
  }

  // Step 5: Payment info – optional check, then Continue
  async continuePaymentInfo() {
    // Optional assertion: text reflects COD
    await expect(this.paymentInfoText).toContainText('You will pay by COD');

    await expect(this.paymentInfoContinue).toBeVisible();
    await this.paymentInfoContinue.click();
  }

  // Step 6: Confirm order – verify totals and confirm
  async getConfirmSubTotal() {
    const txt =
      (await this.totalsTable
        .locator('tr', { hasText: 'Sub-Total:' })
        .locator('.product-price')
        .first()
        .textContent()) ?? '0';
    return parseFloat(txt.replace(/[^0-9.]/g, ''));
  }

  async getConfirmPaymentFee() {
    const txt =
      (await this.totalsTable
        .locator('tr', { hasText: 'Payment method additional fee:' })
        .locator('.product-price')
        .first()
        .textContent()) ?? '0';
    return parseFloat(txt.replace(/[^0-9.]/g, ''));
  }

  async getConfirmTotal() {
    const txt =
      (await this.totalsTable
        .locator('tr', { hasText: 'Total:' })
        .locator('.product-price.order-total strong')
        .first()
        .textContent()) ?? '0';
    return parseFloat(txt.replace(/[^0-9.]/g, ''));
  }

  async assertConfirmTotals(expectedSubTotal: number) {
    const subTotal = await this.getConfirmSubTotal();
    const fee = await this.getConfirmPaymentFee();
    const total = await this.getConfirmTotal();

    // Sub-Total should match product price (qty 1)
    expect(subTotal).toBeCloseTo(expectedSubTotal, 2);

    // Total should reflect sub + fee; shipping/tax are 0 for this scenario
    expect(total).toBeCloseTo(subTotal + fee, 2);
  }

  async confirmOrder() {
    await expect(this.confirmOrderButton).toBeVisible();
    await this.confirmOrderButton.click();
  }

  // Existing summary helpers (for name/price/address checks)
  async getOrderSummaryProductName() {
    return this.page
      .locator('.order-summary-content .product a')
      .first()
      .textContent();
  }

  async getOrderSummaryProductPrice() {
    const txt =
      (await this.page
        .locator('.order-summary-content .product-unit-price')
        .first()
        .textContent()) ?? '';
    return parseFloat(txt.replace(/[^0-9.]/g, ''));
  }

  async getOrderSummaryAddressBlock() {
    return this.page
      .locator('.billing-info .info, .billing-info')
      .first()
      .textContent();
  }
}
