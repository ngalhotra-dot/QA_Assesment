import { Page } from '@playwright/test';


export const loginLocators = {

    username: (page: Page) =>
        page.getByRole('textbox', { name: 'Username' }),
     grpLogin: (page: Page) =>
        page.getByRole('button', { name: 'Log in with GRP' }),
       grpUsername: (page: Page) =>
        page.getByRole('textbox', { name: 'Username ' }),
          password: (page: Page) =>
        page.getByRole('textbox', { name: 'Password' }),

    grpPassword: (page: Page) =>
        page.getByRole('textbox', { name: 'Password' }),

    loginButton: (page: Page) =>
        page.getByRole('button', { name: 'Log In to Sandbox' }),
     grpLoginButton: (page: Page) =>
        page.getByRole('button', { name: 'LOGIN' }),
       totpLoginButton: (page: Page) =>
        page.getByRole('button', { name: 'TOTP LOGIN' }),

    verificationCode: (page: Page) =>
        page.getByRole('textbox', { name: 'Verification Code' }),

    verifyButton: (page: Page) =>
        page.getByRole('button', { name: 'Verify' }),
    otp: (page: Page) =>
    page.locator("#otp"),

   
};

