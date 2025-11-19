import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productTitle = this.page.locator('div.product-name h1');

  // <span itemprop="price" class="price-value-31">1590.00</span>
  readonly productPrice = this.page.locator(
    'span[itemprop="price"][class^="price-value-"]'
  );

  readonly addToCartButton = this.page.locator('#add-to-cart-button-31');
  readonly cartQtyLabel = this.page.locator('span.cart-qty');

  constructor(page: Page) {
    super(page);
  }

  async openNotebook(productName = '14.1-inch Laptop') {
    const productLink = this.page.locator('a', { hasText: productName });
    await productLink.click();
  }

  async addToCart() {
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }

  async getProductName() {
    await expect(this.productTitle).toBeVisible();
    const txt = (await this.productTitle.innerText()) ?? '';
    return txt.trim();
  }

  async getProductPrice() {
    await expect(this.productPrice).toBeVisible();
    const txt = (await this.productPrice.innerText()) ?? '';
    return parseFloat(txt.replace(/[^0-9.]/g, ''));
  }

  async getCartBadgeQty() {
    const txt = (await this.cartQtyLabel.textContent()) ?? '(0)';
    const match = txt.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  async expectCartQty(expected: number) {
    // Let Playwright wait until the cart badge updates, instead of checking
    // the parsed number immediately (which was giving 0).
    await expect(this.cartQtyLabel).toHaveText(`(${expected})`);

    // Optional extra numeric check if you want to keep it:
    const qty = await this.getCartBadgeQty();
    expect(qty).toBe(expected);
  }
}
