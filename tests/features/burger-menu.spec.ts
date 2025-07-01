import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'

// ===========================================
// constants
// ===========================================

const VALID_PASSWORD = 'secret_sauce'
const VALID_USER = 'standard_user'

// ===========================================
// variables
// ===========================================

let loginPage: LoginPage
let homePage: HomePage
let cartPage: CartPage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    cartPage = new CartPage(page)

    await page.goto('/')
    await loginPage.login(VALID_USER, VALID_PASSWORD)
    await homePage.openBurgerMenu()

})

// ===========================================
// test scenarios
// ===========================================

test.describe('Burger Menu Validation', { tag: '@smoke' }, async () => {

    test('About', async ({ page }) => {

        await homePage.clickOnAboutLink()

        await expect(page).toHaveURL('https://saucelabs.com')

    })

    test('All Items', async ({ page }) => {

        await homePage.clickOnCartIcon()
        await cartPage.goToAllItemsPage()

        await expect(page).toHaveURL('/inventory.html')
        await expect(homePage.btn_addToCartFirstItem).toBeVisible()

    })

    test('Logout User', async ({ page }) => {

        await homePage.clickOnLogoutLink()

        await expect(page).toHaveURL('/')
        await expect(loginPage.field_username).toBeVisible()

    })

})