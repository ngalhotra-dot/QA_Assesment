import { Page } from '@playwright/test';
import { log } from 'console';

export const tpiLocators = {

  tpiDetails: (page: Page) =>
    page.locator("//lightning-modal"),

  documentsTab: (page: Page) =>
    page.getByRole('tab', { name: 'Document' }),

  symptomsTab: (page: Page) =>
    page.getByRole('tab', { name: 'Symptoms' }),

  attachmentsTab: (page: Page) =>
    page.locator("//a[contains(@data-label,'Attachments')] "),

  extractButton: (page: Page) =>
    page.getByRole('button', { name: 'Extract' }),

  closeButton: (page: Page) =>
    page.locator("(//button[contains(text(),'Close')])[2]"),
};

