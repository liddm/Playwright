import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'

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

    await page.goto('/inventory.html')
    await homePage.openBurgerMenu()

})

// ===========================================
// test scenarios
// ===========================================

test.describe('Validate Burger Menu Navigation Options', { tag: '@smoke' }, async () => {

    test('should redirect user to Sauce Labs website when clicking "About"', async ({ page }) => {

        await homePage.clickOnAboutLink()

        await expect(page).toHaveURL('https://saucelabs.com')

    })

    test('should navigate to All Items page from cart', async ({ page }) => {

        await homePage.clickOnCartIcon()
        await cartPage.goToAllItemsPage()

        await expect(page).toHaveURL('/inventory.html')
        await expect(homePage.btn_addToCartItem.first()).toBeVisible()

    })

    test('should logout user and redirect to login page', async ({ page }) => {

        await homePage.clickOnLogoutLink()

        await expect(page).toHaveURL('/')
        await expect(loginPage.field_username).toBeVisible()

    })

})
