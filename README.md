# QA Technical Assessment

Playwright + TypeScript automation solution for the QA Technical Assessment.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Chromium
- Page Object Model

## Prerequisites

- Node.js 18+
- npm

## Installation

Clone the repository:

git clone <repository-url>

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

## Execute Tests

Run all tests:

npx playwright test 

View HTML report:

npx playwright show-report

## Framework Structure

tests/
Contains automated test cases.

pages/
Contains Page Object classes.

test-data/
Contains test data.

utils/
Contains reusable utilities.

playwright.config.ts
Contains Playwright configuration.

## Retry Mechanism

Playwright's built-in `retries` configuration is used.

The configuration is:

retries: 3

A failed test is retried up to three times before being marked as failed.

Retries are intended to handle transient failures and should not be used to hide genuine application defects.

## Locator Strategy

The automation primarily uses user-facing locators such as:

- getByRole()
- getByLabel()
- getByPlaceholder()

These locators are preferred because they are more maintainable and closely represent how a user interacts with the application.

## Wait Strategy

No `waitForTimeout()` is used.

Playwright's auto-waiting and assertion mechanisms are used wherever possible.

## Assumptions

- The DemoQA application is available during test execution.
- The assessment uses the Practice Form available under the Forms section.
- Test data is non-sensitive.
- No authentication is required for the Practice Form.
