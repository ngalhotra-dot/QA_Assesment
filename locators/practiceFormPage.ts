import { Page, expect } from '@playwright/test';

export const practiceFormPage = {

    formHeading: (page: Page) =>
        page.getByRole('heading', { name: 'Student Registration Form' }),
    firstName: (page: Page) =>
        page.getByPlaceholder('First Name'),
    lastName: (page: Page) =>
        page.getByPlaceholder('Last Name'),
    email: (page: Page) =>
        page.getByPlaceholder('name@example.com'),
    mobile: (page: Page) =>
        page.getByPlaceholder('Mobile Number'),
    currentAddress: (page: Page) =>
        page.getByPlaceholder('Current Address'),
    submitButton: (page: Page) =>
        page.getByRole('button', { name: 'Submit' }),
    dob: (page: Page) =>
        page.locator('#dateOfBirthInput'),
    subjects: (page: Page) =>
        page.locator('#subjectsInput'),

    async selectGender(page: Page, gender: 'Male' | 'Female' | 'Other'): Promise<void> {
        await page.getByLabel(gender, { exact: true }).check();
    },
    async selectHobby(page: Page, hobby: 'Sports' | 'Reading' | 'Music'): Promise<void> {
        await page.getByLabel(hobby, { exact: true }).check();
    },
    async verifySubmission(page: Page): Promise<void> {
        await expect(
            page.getByRole('dialog')
        ).toBeVisible();

        await expect(
            page.getByRole('dialog').getByText('Student Name')
        ).toBeVisible();
    },

    verifyDetails: (page: Page) =>
        page.getByRole('dialog'),

    async selectState(state: string, page: Page): Promise<void> {
        await page.locator('#state').click();
        await page.locator('#state input').fill(state);
        await page.getByText(state, { exact: true }).click();
    },

    async selectCity(city: string, page: Page): Promise<void> {
        await page.locator('#city').click();
        await page.locator('#city input').fill(city);
        await page.getByText(city, { exact: true }).click();
    }

};

