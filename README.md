## Github Actions

[![Playwright Tests](https://github.com/liddm/Playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/liddm/Playwright/actions/workflows/playwright.yml)

# Playwright

> #### ⚠️ Project in Progress  
> **More features and test scenarios will be added over time. A comprehensive test plan will be documented soon, including requirements written using Behavior-Driven Development (BDD) practices.**

## ❇️ Project Description

This repository is for TypeScript | Playwright practice and demonstration for QA automation. It uses [Playwright](https://playwright.dev/) to perform UI and functional testing for the website [Sauce Demo](https://www.saucedemo.com/), a test website that simulates a virtual store.

Automation tests are being developed using the Page Object Model (POM) design pattern, with a focus on good practices.  
The main goal is to cover critical functionalities of the Sauce Demo test website, including:

- Login tests  
- UI tests  
- Home page feature tests  
- Product page and product description tests  
- Cart page tests  
- Checkout page tests  
- Order simulation tests  

These tests ensure the quality of key user flows on the site, validating both the user interface and the business logic.

## ❇️ Features

- Cross-browser testing (Chromium, Firefox, WebKit)  
- Tests for UI elements and workflows  
- Page Object Model (POM) design pattern for maintainability  
- Smoke test tagging for quick validation  
- Setup and teardown hooks for clean test runs  


## ❇️ Project Structure

| Path / File                     | Description                                        |
|----------------------------------|---------------------------------------------------|
| `pages/`                         | Page Object classes                               |
| ├── `LoginPage.ts`              | Page object for login screen                       |
| ├── `HomePage.ts`               | Page object for home/inventory screen              |
| ├── `CartPage.ts`               | Page object for cart screen                        |
| ├── `ItemPage.ts`               | Page object for item screen                        |
| └── `BasePage.ts`                 | Page object for common elements                  |
| `features/`                      | Test files grouped by feature                     |
| ├── `login.spec.ts`             | Tests for login functionality                      |
| ├── `cart.spec.ts`              | Tests for cart page features                       |
| ├── `burger-menu.spec.ts`       | Tests for navigation menu links                    |
| ├── `add-to-cart.spec.ts`       | Tests for adding items to the cart on home page    |
| ├── `remove-from-cart.spec.ts`  | Tests for removing items from cart on home page    |
| └── `item-page.spec.ts`          | Tests for item page                               |
| `playwright.config.ts`          | Playwright configuration file                      |
| `package.json`                  | Project metadata and dependencies                  |
| `README.md`                     | Project documentation (this file)                  |
| `testplan.md`                     | Project test plan documentation                  |
| `.env`                            | Test user credentials                            |

## ❇️ Technologies & Tools Used

- [Playwright](https://playwright.dev/)  
- Typescript  
- Page Object Model (POM)  
- Behavior-Driven Development (BDD)  
- Test-Driven Development (TDD)  
- Visual Studio Code  
- Git / GitHub  
- Node.js & npm  
