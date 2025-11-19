import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Header cart link showing "Shopping cart (1)" etc.
  readonly cartLink = this.page.getByRole('link', { name: /Shopping cart \(\d+\)/ });

  readonly productNameCell = this.page.locator('.cart-item-row .product a');
  readonly unitPriceCell = this.page.locator('.cart-item-row .unit-price');
  readonly quantityInput = this.page.locator('.cart-item-row input.qty-input');
  readonly subtotalCell = this.page.locator('.cart-item-row .subtotal');
  readonly checkoutButton = this.page.locator('button[name="checkout"], input[name="checkout"]');

  constructor(page: Page) {
    super(page);
  }

  async openCart() {
    await this.cartLink.click();
    await this.assertUrlContains('/cart');
  }

  async getProductName() {
    return this.productNameCell.textContent();
  }

  async getUnitPrice() {
    const txt = (await this.unitPriceCell.textContent()) ?? '';
    return parseFloat(txt.replace(/[^0-9.]/g, ''));
  }

  async getQuantity() {
    const val = await this.quantityInput.inputValue();
    return parseInt(val, 10);
  }

  async getSubtotal() {
    const txt = (await this.subtotalCell.textContent()) ?? '';
    return parseFloat(txt.replace(/[^0-9.]/g, ''));
  }

  async expectPriceCalculationsMatch() {
    const unit = await this.getUnitPrice();
    const qty = await this.getQuantity();
    const subtotal = await this.getSubtotal();
    expect(subtotal).toBeCloseTo(unit * qty, 2);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
