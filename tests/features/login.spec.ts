import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'

test.use({ storageState: { cookies: [], origins: [] } });

// ===========================================
// variables
// ===========================================

let loginPage: LoginPage
let homePage: HomePage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await page.goto('/')
})

// ===========================================
// test scenarios
// ===========================================


test.describe('Login Validation', async () => {

    test('Valid User', { tag: '@smoke' }, async ({ page }) => {

        await loginPage.login(process.env.VALID_USER as string, process.env.VALID_PASSWORD as string)

        await expect(page).toHaveURL('/inventory.html')
        await expect(homePage.header).toBeVisible()

    })

    test('Locked User', async () => {

        await loginPage.login(process.env.LOCKED_USER as string, process.env.VALID_PASSWORD as string)

        await expect(loginPage.error).toContainText('Sorry, this user has been locked out.')

    })

    test('Invalid User', { tag: '@smoke' }, async () => {

        await loginPage.login(process.env.INVALID_USER as string, process.env.INVALID_PASSWORD as string)

        await expect(loginPage.error).toContainText('Username and password do not match any user in this service')

    })

})

