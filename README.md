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

npm test

Run tests in headed mode:

npm run test:headed

Run tests in debug mode:

npm run test:debug

View HTML report:

npm run report

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

**E-Commerce Functional Testing**
| Functional Area | Positive Scenarios              | Negative / Edge Scenarios                                              |
| --------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Registration    | Valid registration              | Existing email, invalid email, weak password, mandatory fields missing |
| Login           | Valid credentials               | Invalid password, invalid username, locked account, empty fields       |
| Product Search  | Search existing product         | No results, special characters, partial search                         |
| Product Details | Correct price/details displayed | Out-of-stock product, missing image                                    |
| Product Listing | Sorting/filtering works         | Conflicting filters, no products                                       |
| Cart            | Add/remove/update quantity      | Quantity exceeds stock, unavailable product                            |
| Checkout        | Successful checkout             | Missing address, invalid address, payment failure                      |
| Payment         | Successful payment              | Declined card, expired card, duplicate payment                         |
| Orders          | Order created correctly         | Failed order, cancelled order                                          |
| Coupons         | Valid coupon applied            | Expired/invalid coupon, minimum order not met                          |
| Inventory       | Stock updated after purchase    | Concurrent purchase of last item                                       |
| Logout          | User successfully logged out    | Back button should not expose authenticated pages                      |
| Security        | Authorization enforced          | Access checkout/order pages without login                              |

**Important edge cases**
Product becomes out of stock while it is already in the cart.
Price changes between adding to cart and checkout.
Multiple tabs/windows.
Double-clicking Place Order.
Refresh during payment.
Network interruption during checkout.
Session expiration during checkout.
Browser back button after logout.
Duplicate order creation.
Concurrent users purchasing the last available item.

**Automation Prioritization**
I would prioritize automation based on business criticality, risk, execution frequency, stability and return on investment rather than simply automating everything.
**Priority 1 – Critical business flows**

Automate first:

Login
Product search
Add to cart
Checkout
Payment
Order creation

These directly impact revenue and customer experience.

**Priority 2 – High-frequency regression**

Automate:

Frequently executed regression scenarios
Smoke tests
Critical API validations
Data validation
Cross-browser scenarios

**Priority 3 – Stable repetitive scenarios**

Examples:

Search
Filtering
Sorting
Profile management
Order history

**Lower priority**

Avoid automating initially:

Frequently changing UI
One-time scenarios
Exploratory testing
Tests requiring subjective visual assessment
Features with very low business value
