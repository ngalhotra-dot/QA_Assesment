import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page ,expect,test} from '@playwright/test';

import { credentials } from '../test-data/testData';
import { generateOTP } from "../utils/otp";
import dotenv from 'dotenv';

import { loginLocators } from '../locators/loginLocators.ts';
import { environment } from '../config/enviornment.ts';
import { getTestData } from '../utils/csvUtils.ts';
//import { getOrderDetailsUrl } from '../utils/urlUtils.ts';
import { setDefaultTimeout } from '@cucumber/cucumber';

import { handleChatFlow } from '../utils/chatResponseHandler.ts';
import { Status } from '@cucumber/cucumber';
import { homePageLocators } from '../locators/homePageLocators.ts';
import { tpiLocators } from '../locators/tpiLocators.ts';
import { chatBotLocators } from '../locators/chatBotLocators.ts';
import { continueConversationUntilTarget } from '../utils/conversationHelper.ts';
import { ChatBotHandler } from '../utils/chatBotResponseHandler.ts';
import { ChatBotPage } from '../utils/chatBotHandler.ts';
import { ChatBotHandlerRefine } from '../utils/chatBotHandlerRefine.ts';

setDefaultTimeout(1000 * 1000);

let browser: Browser;
let page: Page;

Before(async () => {
    browser = await chromium.launch({
        headless: false
    });

    page = await browser.newPage();
});

/*After(async () => {
    await browser.close();
});
*/

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await page.screenshot();

        await this.attach(screenshot, 'image/png');
    }
    await browser.close();
});


Given('User launches the application', async function () {

    await page.goto(environment.baseUrl);
    await expect(page).toHaveTitle(/Login | Salesforce/);
});

When('User enters valid username and password', async function () {
const { orderId, jd,username,
  password } = await getTestData();

  
  /*  await loginLocators.username(page).click();
    await loginLocators.username(page).fill(username);
    await loginLocators.password(page).click();
    await loginLocators.password(page).fill(password);*/
    console.log('Username:', username);
    //console.log('Password:', password);

     await page.getByRole('button', { name: 'Log in with GRP' }).click();
  await page.getByRole('textbox', { name: 'Username ' }).click();
  await page.getByRole('textbox', { name: 'Username ' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

});



When('User clicks Login button', async function () {

//await loginLocators.loginButton(page).click();
 await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('button', { name: 'TOTP LOGIN' }).click();
 

});

Then('User should fill the verification code and click verify button', async function () {
  dotenv.config();
  
  console.log(process.env.OTP_KEY);
  // console.log('Login success clicked');
  const otpKey = process.env.OTP_KEY;
  
  //await loginLocators.verificationCode(page).fill(credentials.verificationCode);
  if (!otpKey) {
    throw new Error("Environment variable OTP_KEY is not set");
  }
  const otpCode = generateOTP(otpKey);
    await page.locator('#otp').click();
  await page.locator('#otp').fill(otpCode);
  console.log(`Generated OTP code: ${otpCode}`);
  await page.getByRole('button', { name: 'Verify' }).click();

});

Then('User navigate to the order page', async function () {

 await homePageLocators.searchWorkshopOrder(page).waitFor();
 /* const orderId = await getOrderId();

  console.log('Order ID:', orderId);

  const url = getOrderDetailsUrl(orderId);

  console.log('Order Details URL:', url);

  await page.goto(url);
  */
const { orderId, jd,username,
  password } = await getTestData();
  const urlPart1 = 'https://oemsalesaftersalesorg--scaletest.sandbox.lightning.force.com/lightning/r/WorkOrder/';
const urlPart2 = '/view';
 console.log('Order ID:', orderId);

const finalUrl = `${urlPart1}${orderId}${urlPart2}`;

console.log(finalUrl);
//console.log(jd);

await page.goto(finalUrl);
});

Then ('User clicks on Add Job', async function () {
  //  await page.pause();
   await homePageLocators.addJobButton(page).click();
   // await page.pause();

});
Then('User enters job description', async function () {
 //  await page.pause();
 const { orderId, jd } = await getTestData();
     await homePageLocators.jobDescription(page).click();
    await homePageLocators.jobDescription(page).fill(jd);
    
 //   await page.pause();

});
Then('User clicks on Create Job button', async function () {
  
     await homePageLocators.createJobButton(page).click();
   
});

Then('User clicks on Search',async  function () {

  await homePageLocators.successNotification(page).waitFor();
  await homePageLocators.searchIcon(page).click();
   
});

Then('User clicks on Refresh TPI', async function () {
   await homePageLocators.refreshTpiIcon(page).click();
   
});

Then('User clicks on Open TPI', async function () {
  //await homePageLocators.openTpi(page).click();
  if(await homePageLocators.openTpi(page).count() > 0){
        await homePageLocators.openTpi(page).click();
      }
 
});

Then('User access TPI Details', async function () {
   await tpiLocators.tpiDetails(page);
  
});

Then('User click on Document, attachment and Symptoms tab', async function () {
   if(await homePageLocators.openTpi(page).count() > 0){
        await tpiLocators.symptomsTab(page).click();
      //await page.pause();
      if(await tpiLocators.attachmentsTab(page).count() > 0){
        await tpiLocators.attachmentsTab(page).click();
      }
   
    await tpiLocators.documentsTab(page).click();
      }
 
   
   
});

Then('User extract TPI Details', async function () {
   if(await homePageLocators.openTpi(page).count() > 0){
      await tpiLocators.extractButton(page).click();
      }
   
  
});

Then('User click on Close button', async function () {
   if(await homePageLocators.openTpi(page).count() > 0){
         await tpiLocators.closeButton(page).click();
      }


});

Then('User click on AgentForce', async function () {
  await homePageLocators.agentForceIcon(page).click();
  
});

Then('User improve customer Statement', async function () {
  if(await chatBotLocators.gotIt(page).count() > 0){
        await chatBotLocators.gotIt(page).click();
      }
       await chatBotLocators.improveCustomerStatement(page).click();
       //console.log('this = ', this);
//console.log('page = ', this.page);
 // await handleChatFlow(page);
 /* const TARGET_TEXT =
  "Would you like me to search TPIs for any of these jobs or match all jobs for this Workshop Order with available vehicle diagnostic data?";
    await continueConversationUntilTarget(
    page,
    TARGET_TEXT,
    "Search TPI for Job 2"
  );*/
  const { orderId, jd } = await getTestData();
//const chatbot = new ChatBotHandler(page);


//await chatbot.processTPIFlow(jd);

/*const chatBotPage = new ChatBotPage();

await chatBotPage.processTPIFlow(
    page,
    jd
);*/

const chatBot = new ChatBotHandlerRefine(page);

await chatBot.processTPIFlow(
  jd
);
    
});

Then('User click on Recommend TPI', async function () {
   if(await chatBotLocators.gotIt(page).count() > 0){
        await chatBotLocators.gotIt(page).click();
      }
await chatBotLocators.recommendTpi(page).click();
  

  //  console.log('this = ', this);
//console.log('page = ', this.page);
    //await handleChatFlow(page);
const TARGET_TEXT =
  "Would you like me to search TPIs for any of these jobs or match all jobs for this Workshop Order with available vehicle diagnostic data?";
    await continueConversationUntilTarget(
    page,
    TARGET_TEXT,
    "Recommend TPI"
  );

    
});

Then('User click on Refine TPI', async function () {
   if(await chatBotLocators.gotIt(page).count() > 0){
        await chatBotLocators.gotIt(page).click();
      }
await chatBotLocators.refineTpi(page).click();
   // await page.pause();
   //  await handleChatFlow(page);
   const TARGET_TEXT =
  "Would you like me to search TPIs for any of these jobs or match all jobs for this Workshop Order with available vehicle diagnostic data?";
    await continueConversationUntilTarget(
    page,
    TARGET_TEXT,
    "Refine TPI for Job 2"
  );
});

Then('User click on Reload', async function () {
  await chatBotLocators.agentForceCloseIcon(page).click();
 // await page.pause();
await homePageLocators.reloadButton(page).click();
   // await page.pause();
});

Then('User logs out', async function () {
  // Write code here that turns the phrase above into concrete actions
  await homePageLocators.viewProfileIcon(page).click();
   // await page.pause();
  await homePageLocators.logoutButton(page).click();
   // await page.pause();
});

