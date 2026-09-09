import { test, expect } from '@playwright/test';
import { homePageLocators } from '../locators/homePageLocators';
import { practiceFormPage } from '../locators/PracticeFormPage';
import { studentdata2 } from '../test-data/studentdata2';
test.only('Successful Registration', async ({ page }) => {
    await page.goto('/forms');
    await homePageLocators.practiceForm(page).click();
    await expect(practiceFormPage.formHeading(page)
    ).toBeVisible();
    await practiceFormPage.firstName(page).fill(studentdata2[1].firstName);
    await practiceFormPage.lastName(page).fill(studentdata2[1].lastName);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const defaultEmail = 'test@example.com';
    const emailToEnter = emailRegex.test(studentdata2[1].email)
        ? studentdata2[1].email
        : defaultEmail;

    await practiceFormPage.email(page).fill(emailToEnter);
    console.log('Email entered:', emailToEnter);
    await practiceFormPage.selectGender(page, studentdata2[1].gender);
    await practiceFormPage.mobile(page).fill(studentdata2[1].mobile);
    await practiceFormPage.selectHobby(page, studentdata2[1].hobby);
    await practiceFormPage.selectState(studentdata2[1].state, page);
    await practiceFormPage.selectCity(studentdata2[1].city, page);
    await practiceFormPage.currentAddress(page).fill(studentdata2[1].address);
    await practiceFormPage.dob(page).click();
    await practiceFormPage.dob(page).fill(studentdata2[1].dob);
    await practiceFormPage.dob(page).press('Enter');
    await practiceFormPage.subjects(page).click();
    await practiceFormPage.subjects(page).fill(studentdata2[1].subjects);
    await practiceFormPage.subjects(page).press('Enter');
    await practiceFormPage.submitButton(page).click();
    await practiceFormPage.verifySubmission(page);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentdata2[1].firstName);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentdata2[1].lastName);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(emailToEnter);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentdata2[1].mobile);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentdata2[1].address);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(studentdata2[1].subjects);

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
    await page.waitForTimeout(5000);
});