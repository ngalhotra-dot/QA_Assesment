import { generateOTP } from "../utils/otp";
import { environment } from '../config/enviornment.ts';
import { test, expect } from "@playwright/test";
import { homePageLocators } from '../locators/homePageLocators.ts';
import { getTestData } from '../utils/csvUtils.ts';
import { tpiLocators } from '../locators/tpiLocators.ts';
import { chatBotLocators } from '../locators/chatBotLocators.ts';
import { ChatBotHandlerRefine } from '../utils/chatBotHandlerRefine.ts';
import dotenv from 'dotenv';
import { loginLocators } from "../locators/loginLocators.ts";
import { getOrderDetailsUrl } from '../utils/urlUtils.ts';
dotenv.config();
console.log(process.env.OTP_KEY);
test.skip("Login with 2FA enabled Access Workshop Order improve customer Statement", async ({ page }) => {

  test.setTimeout(1000 * 1000);
  const otpKey = process.env.OTP_KEY;
  const username = process.env.username;
   const password = process.env.password;
  await page.goto(environment.baseUrl);
  await expect(page).toHaveTitle(/Login | Salesforce/);
  if (!otpKey) {
    throw new Error("Environment variable OTP_KEY is not set");
  }
  const otpCode = generateOTP(otpKey);
  if (!username || !password) {
  throw new Error('Username or Password is not set');
}
  //const { orderId, jd, username,
   // password } = await getTestData();
     

  await loginLocators.grpLogin(page).click();
  await loginLocators.grpUsername(page).click();
  await loginLocators.grpUsername(page).fill(username);
  await loginLocators.grpPassword(page).click();
  await loginLocators.grpPassword(page).fill(password);
  await loginLocators.grpLoginButton(page).click();
  await loginLocators.totpLoginButton(page).click();
  await loginLocators.otp(page).click();
  await loginLocators.otp(page).fill(otpCode);
  console.log(`Generated OTP code: ${otpCode}`);
  await loginLocators.verifyButton(page).click();
  await homePageLocators.searchWorkshopOrder(page).waitFor();
  const { orderId, jd, username1,
   password1 } = await getTestData();
  const url = getOrderDetailsUrl(orderId);
  console.log('Order Details URL:', url);
  await page.goto(url);
  await homePageLocators.addJobButton(page).click();
  await page.pause();
  await homePageLocators.jobDescription(page).click();
  await homePageLocators.jobDescription(page).fill(jd);
  await homePageLocators.createJobButton(page).click();
  await homePageLocators.successNotification(page).waitFor();
  await homePageLocators.searchIcon(page).click();
  await homePageLocators.refreshTpiIcon(page).click();
  if (await homePageLocators.openTpi(page).count() > 0) {
    await homePageLocators.openTpi(page).click();
  }
  await tpiLocators.tpiDetails(page);
  if (await homePageLocators.openTpi(page).count() > 0) {
    await tpiLocators.symptomsTab(page).click();
    if (await tpiLocators.attachmentsTab(page).count() > 0) {
      await tpiLocators.attachmentsTab(page).click();
    }
    await tpiLocators.documentsTab(page).click();
  }
  if (await homePageLocators.openTpi(page).count() > 0) {
    await tpiLocators.extractButton(page).click();
  }
  if (await homePageLocators.openTpi(page).count() > 0) {
    await tpiLocators.closeButton(page).click();
  }
  await homePageLocators.agentForceIcon(page).click();
  if (await chatBotLocators.gotIt(page).count() > 0) {
    await chatBotLocators.gotIt(page).click();
  }
  await chatBotLocators.improveCustomerStatement(page).click();
  const chatBot = new ChatBotHandlerRefine(page);
  await chatBot.processTPIFlow(
    jd
  );
  await homePageLocators.viewProfileIcon(page).click();
  await homePageLocators.logoutButton(page).click();

});