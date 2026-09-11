import { test, expect } from '@playwright/test';
import { homePageLocators } from '../locators/homePageLocators';
import { practiceFormPage } from '../locators/PracticeFormPage';
import { studentData } from '../test-data/studentData';
test.only('Successful Registration', async ({ page }) => {
    await page.goto('https://demoqa.com/forms');
    await homePageLocators.practiceForm(page).click();
    await expect(practiceFormPage.formHeading(page)
    ).toBeVisible();
    for (const student of studentData) {
    await practiceFormPage.firstName(page).fill(student.firstName);
    await practiceFormPage.lastName(page).fill(student.lastName);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const defaultEmail = 'test@example.com';
    const emailToEnter = emailRegex.test(student.email)
        ? student.email
        : defaultEmail;

    await practiceFormPage.email(page).fill(emailToEnter);
    console.log('Email entered:', emailToEnter);
    await practiceFormPage.selectGender(page, student.gender);
    await page.pause();
    await practiceFormPage.mobile(page).fill(student.mobile);
    await practiceFormPage.selectHobby(page, student.hobby);
    await page.pause();
    await practiceFormPage.selectState(student.state, page);
    await practiceFormPage.selectCity(student.city, page);
    await practiceFormPage.currentAddress(page).fill(student.address);
    await practiceFormPage.dob(page).click();
    await practiceFormPage.dob(page).fill(student.dob);
    await practiceFormPage.dob(page).press('Enter');
    await practiceFormPage.subjects(page).click();
    await practiceFormPage.subjects(page).fill(student.subjects);
    await practiceFormPage.subjects(page).press('Enter');
    await practiceFormPage.submitButton(page).click();

   


   await practiceFormPage.verifySubmission(page);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(student.firstName);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(student.lastName);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(emailToEnter);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(student.mobile);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(student.address);
    await expect(practiceFormPage.verifyDetails(page)).toContainText(student.subjects);

    await page.goto('https://demoqa.com/automation-practice-form');
    }
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