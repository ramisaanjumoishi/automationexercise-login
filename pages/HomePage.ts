import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly loggedInAs: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.loggedInAs = page.locator('a:has-text("Logged in as")');
    this.logoutLink = page.locator('a[href="/logout"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.dismissConsentIfShown();
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  // A cookie consent dialog appears in some regions (EU etc.). Close it if present.
  async dismissConsentIfShown(): Promise<void> {
    const consent = this.page.getByRole('button', { name: /consent/i });
    if (await consent.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await consent.click();
    }
  }

  async goToLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }
}
