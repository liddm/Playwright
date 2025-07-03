import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'

// ===========================================
// variables
// ===========================================

let homePage: HomePage
let cartPage: CartPage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page)
    cartPage = new CartPage(page)

    await page.goto('/inventory.html')
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

test.describe('Reset App State', async () => {

    test('Reset App State from Home Page', { tag: '@smoke' }, async () => {

        await homePage.openBurgerMenu()
        await homePage.clickOnResetStateLink()

        await expect(homePage.badge_cartItemQuantity).not.toBeVisible()

        //  Issue found:
        //  Given that user added item to the cart, AND clicking on Reset App State, 'Remove' button from first item should NOT be visible.

    })

    test('Reset App State from Cart', async () => {

        await homePage.openBurgerMenu()
        await homePage.clickOnResetStateLink()
        await homePage.clickOnCartIcon()

        await expect(cartPage.btn_removeFromCartPageFirstItem).not.toBeVisible()

    })

})
