import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../utils/env';

test.describe('Login - automationexercise.com', () => {
  test('TC-01: registered user can log in successfully', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await test.step('Launch the website', async () => {
      await home.open();
    });

    await test.step('Navigate to the Login page', async () => {
      await home.goToLogin();
      await login.expectLoaded();
    });

    await test.step('Enter email and password, then submit', async () => {
      await login.login(credentials.email, credentials.password);
    });

    await test.step('Verify login was successful', async () => {
      await expect(home.loggedInAs).toBeVisible();
      await expect(home.loggedInAs).toContainText(credentials.name);
      await expect(home.logoutLink).toBeVisible();
      await expect(login.errorMessage).toBeHidden();
    });
  });

  test('TC-02: wrong password shows an error and does not log in', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.open();
    await home.goToLogin();
    await login.login(credentials.email, 'WrongPassword!123');

    await expect(login.errorMessage).toBeVisible();
    await expect(home.loggedInAs).toBeHidden();
  });
});
