import { Page } from '@playwright/test';

export const homePageLocators = {

    practiceForm: (page: Page) =>
       page.getByText('Practice Form', { exact: true })
};

