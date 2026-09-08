import { test, expect } from '@playwright/test';
import { credentials } from '../test-data/testData';
import { loginLocators } from '../locators/loginLocators';

test.skip('SalesForce Login', async ({ page }) => {
  await page.goto('https://oemsalesaftersalesorg--qa.sandbox.lightning.force.com/lightning/page/home');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Login | Salesforce/);
  await loginLocators.username(page).click();
  await loginLocators.username(page).fill(credentials.username);
  await loginLocators.password(page).click();
  await loginLocators.password(page).fill(credentials.password);
  await loginLocators.loginButton(page).click();
  await page.pause();


});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
