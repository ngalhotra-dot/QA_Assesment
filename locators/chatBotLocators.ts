import { Page } from '@playwright/test';


export const chatBotLocators = {

  improveCustomerStatement: (page: Page) =>
    page.locator("//div[@class='recommendation-text']//span[contains(text(),'Improve')]"),

  recommendTpi: (page: Page) =>
    page.locator("//div[@class='recommendation-text']//span[contains(text(),'Recommend')]"),

  refineTpi: (page: Page) =>
    page.locator("//div[@class='recommendation-text']//span[contains(text(),'Refine')]"),

  agentTextArea: (page: Page) =>
    page.locator("//textarea[contains(@placeholder, 'Describe')]"),

  agentForceCloseIcon: (page: Page) =>
    page.locator("//*[@class='slds-panel__close']"),

  gotIt: (page: Page) =>
    page.locator("//button[@title='Got It']"),

  chatBotResponse: (page: Page) =>
    page.locator('//runtime_copilot_base-base-markdown-text//div//p').last(),

};

