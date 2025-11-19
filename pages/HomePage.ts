import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly registerLink = this.page.locator('a[href="/register"]');
  readonly loginLink = this.page.locator('a[href="/login"]');
  readonly computersMenu = this.page.locator('a[href="/computers"]');
  readonly notebooksLink = this.page.locator('a[href="/notebooks"]');

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/');
  }

  async goToRegister() {
    await this.registerLink.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

async goToNotebooks() {
  // Top menu "Computers"
  const computersMenu = this.page.locator('ul.top-menu a[href="/computers"]');

  // Submenu "Notebooks"
  const notebooksSubmenu = this.page.locator('ul.top-menu a[href="/notebooks"]');

  // Hover to open submenu, then click "Notebooks"
  await computersMenu.hover();
  await notebooksSubmenu.click();

  // Optional: assert we are on Notebooks page
  await this.assertUrlContains('/notebooks');
}


}
