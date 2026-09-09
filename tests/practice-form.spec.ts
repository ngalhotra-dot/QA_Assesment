import { test, expect } from '@playwright/test';
import { homePageLocators } from '../locators/homePageLocators';
import { practiceFormPage } from '../locators/PracticeFormPage';
import { studentData } from '../test-data/studentData';
test('Successful Registration', async ({ page }) => {
    await page.goto('/forms');
    await homePageLocators.practiceForm(page).click();
    await expect(practiceFormPage.formHeading(page)
    ).toBeVisible();
    await practiceFormPage.firstName(page).fill(studentData.firstName);
    await practiceFormPage.lastName(page).fill(studentData.lastName);
    await practiceFormPage.email(page).fill(studentData.email);
    await practiceFormPage.selectGender(page, studentData.gender);
    await practiceFormPage.mobile(page).fill(studentData.mobile);
    await practiceFormPage.selectHobby(page, studentData.hobby);
    await practiceFormPage.selectState(studentData.state, page);
    await practiceFormPage.selectCity(studentData.city, page);
    await practiceFormPage.currentAddress(page).fill(studentData.address);
    await practiceFormPage.dob(page).click();
    await practiceFormPage.dob(page).fill(studentData.dob);
    await practiceFormPage.dob(page).press('Enter');
    await practiceFormPage.subjects(page).click();
    await practiceFormPage.subjects(page).fill(studentData.subjects);
    await practiceFormPage.subjects(page).press('Enter');
    await practiceFormPage.submitButton(page).click();
    await practiceFormPage.verifySubmission(page);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentData.firstName);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentData.lastName);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentData.email);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentData.mobile);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentData.address);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentData.subjects);
});

test('Should display validation when mandatory fields are missing', async ({ page }) => {
    await page.goto('/forms');
    await homePageLocators.practiceForm(page).click();
    await expect(practiceFormPage.formHeading(page)
    ).toBeVisible();

    await practiceFormPage.submitButton(page).click();

    await expect(practiceFormPage.firstName(page))
        .toHaveJSProperty('validity.valid', false);
    await expect(
        page.getByRole('heading', {
            name: 'Student Registration Form'
        })
    ).toBeVisible();
});