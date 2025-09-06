## Github Actions

[![Playwright Tests](https://github.com/liddm/Playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/liddm/Playwright/actions/workflows/playwright.yml)

## ❇️ Table of Contents
- [Project Description](#️-project-description)
- [Features](#️-features)
- [Project Structure](#️-project-structure)
- [Technologies & Tools Used](#️-technologies--tools-used)
- [Project Setup](#️-project-setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Running Tests](#running-tests)

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
|---------------------------------|----------------------------------------------------|
| `pages/`                        | Page Object classes                                |
| `features/`                     | Test files grouped by feature                      |
| `playwright.config.ts`          | Playwright configuration file                      |
| `package.json`                  | Project metadata and dependencies                  |
| `README.md`                     | Project documentation (this file)                  |
| `testplan.md`                   | Project test plan documentation                    |
| ⚠️ `.env`                      | Test user credentials                               |

##### ⚠️ _Usually .env file wouldn't be available, but since this is an automation for a test website, it is included in this project._  

## ❇️ Technologies & Tools Used

- [Playwright](https://playwright.dev/)  
- Typescript  
- Page Object Model (POM)  
- Behavior-Driven Development (BDD)  
- Test-Driven Development (TDD)  
- Visual Studio Code  
- Git / GitHub  
- Node.js & npm


## ❇️ Project Setup
### Requirements:
- Node.js installed in your system

### Installation:
#### 1. Clone repository
- ```git clone https://github.com/liddm/Playwright.git```
#### 2. Install packages
- ```npm install```
#### 3. Install Playwright browsers
- ```npx playwright install --with-deps chromium```



### Running tests:
#### 1. Recommended: All tests with Typescript and ESLint verification
- ```npm run test```
#### 2. Specific tests
- ```npx playwright test tests/test-name.spec.ts```
#### 3. Using UI mode
- ```npx playwright test --ui```


