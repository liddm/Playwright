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
    await homePage.addToCartFirstItem()

})

// ===========================================
// test scenarios
// ===========================================

test.describe('Add First Item To Cart', { tag: '@smoke' }, async () => {

    test('Verify Button', async () => {

        await expect(homePage.btn_removeFromCartFirstItem).toBeVisible()
        await expect(homePage.btn_removeFromCartFirstItem).toHaveText('Remove')

    })

    test('Verify Badge', async () => {

        await expect(homePage.badge_cartItemQuantity).toHaveText('1')

    })

})

test.describe('Reset App State', { tag: '@smoke' }, async () => {

    test('Reset App State from Home Page', async () => {

        await homePage.openBurgerMenu()
        await homePage.clickOnResetStateLink()

        await expect(homePage.badge_cartItemQuantity).not.toBeVisible()

        //  Issue found:
        //  Given that user added item to the cart, AND clicking on Reset App State, 'Remove' button from first item should NOT be visible.
        //  After bugfix, implement test: await expect(homePage.btn_removeFromCartFirstItem).not.toHaveText('Remove')

    })

    test('Reset App State from Cart', async () => {

        await homePage.openBurgerMenu()
        await homePage.clickOnResetStateLink()
        await homePage.clickOnCartIcon()

        await expect(cartPage.btn_removeFromCartPageFirstItem).not.toBeVisible()

    })

})
