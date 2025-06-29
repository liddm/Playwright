import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'

// ===========================================
// constants
// ===========================================

const VALID_PASSWORD = 'secret_sauce'
const INVALID_PASSWORD = 'XXX'
const VALID_USER = 'standard_user'
const LOCKED_USER = 'locked_out_user'
const INVALID_USER = 'xxx'

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

test('valid user', { tag: '@smoke' }, async ({ page }) => {

    await loginPage.login(VALID_USER, VALID_PASSWORD)

    await expect(page).toHaveURL('/inventory.html')
    await expect(homePage.header).toBeVisible()

})

test('locked user', async () => {

    await loginPage.login(LOCKED_USER, VALID_PASSWORD)

    await expect(loginPage.error).toContainText('Sorry, this user has been locked out.')

})

test('invalid user', async () => {

    await loginPage.login(INVALID_USER, INVALID_PASSWORD)

    await expect(loginPage.error).toContainText('Username and password do not match any user in this service')

})