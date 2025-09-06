import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/PageManager'

test.use({ storageState: { cookies: [], origins: [] } });

// ===========================================
// variables
// ===========================================

let pm: PageManager

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    pm = new PageManager(page)

    await page.goto('/')

})

// ===========================================
// test scenarios
// ===========================================


test.describe('Login Page Credential Validation Scenarios', async () => {

    test('should successfully log in with valid user credentials', { tag: '@smoke' }, async ({ page }) => {

        await pm.loginPage.login(process.env.VALID_USER as string, process.env.VALID_PASSWORD as string)

        await expect(page).toHaveURL('/inventory.html')
        await expect(pm.homePage.header).toBeVisible()

    })

    test('should display error message for locked out user', async () => {

        await pm.loginPage.login(process.env.LOCKED_USER as string, process.env.VALID_PASSWORD as string)

        await expect(pm.loginPage.error).toContainText('Sorry, this user has been locked out.')

    })

    test('should display error for invalid username or password', { tag: '@smoke' }, async () => {

        await pm.loginPage.login(process.env.INVALID_USER as string, process.env.INVALID_PASSWORD as string)

        await expect(pm.loginPage.error).toContainText('Username and password do not match any user in this service')

    })

    test('should display error for blank username or password', { tag: '@smoke' }, async () => {

        await pm.loginPage.login(process.env.BLANK_USER as string, process.env.BLANK_PASSWORD as string)

        await expect(pm.loginPage.error).toContainText('Epic sadface: Username is required')

        await pm.loginPage.login(process.env.VALID_USER as string, process.env.BLANK_PASSWORD as string)

        await expect(pm.loginPage.error).toContainText('Epic sadface: Password is required')

        await pm.loginPage.login(process.env.BLANK_USER as string, process.env.VALID_PASSWORD as string)

        await expect(pm.loginPage.error).toContainText('Epic sadface: Username is required')

    })

})
