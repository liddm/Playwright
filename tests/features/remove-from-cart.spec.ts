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
    await homePage.clickToCartIcon()
    await cartPage.removeFromCartPageFirstItem()

}
)

// ===========================================
// test scenarios
// ===========================================

test.describe('Remove Itens from cart', { tag: '@smoke' }, async () => {

    test('Delete first item from cart', async () => {

        await expect(cartPage.btn_removeFromCartPageFirstItem).not.toBeVisible()
        await cartPage.continueShopping()
        await expect(homePage.btn_removeFromCartFirstItem).not.toBeVisible()
    })

    test('Verify Badge', async () => {

        await expect(cartPage.badge_cartItemQuantity).not.toBeVisible

    })

})

