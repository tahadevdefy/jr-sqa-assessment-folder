import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  // Unique heading on the thank-you page: <h1>Thank you</h1>
  readonly successTitle = this.page.getByRole('heading', {
    name: 'Thank you',
    level: 1,
  });

  // "Order number: 2136054" line inside the thank-you section
  readonly orderNumberElement = this.page
    .locator('div.section')
    .filter({ hasText: 'Your order has been successfully processed!' })
    .locator('li')
    .filter({ hasText: 'Order number:' })
    .first();

  constructor(page: Page) {
    super(page);
  }

  async assertThankYouPageVisible() {
    await expect(this.successTitle).toBeVisible();
  }

  async getOrderNumber(): Promise<string> {
    const text = (await this.orderNumberElement.textContent()) ?? '';
    // e.g. "Order number: 2136054"
    const match = text.match(/(\d+)/);
    return match ? match[1] : text.trim();
  }

  async assertOrderNumberFormat() {
    const num = await this.getOrderNumber();
    expect(num).toMatch(/^\d+$/);
  }
}
