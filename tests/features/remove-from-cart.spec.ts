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

test.describe('Home Page: Remove First Item From Cart', { tag: '@smoke' }, async () => {

    test.beforeEach(async () => {
        await homePage.removeFromCartFirstItem()
    })

    test('Verify Button', async () => {

        await expect(homePage.btn_removeFromCartFirstItem).not.toBeVisible()
        await expect(homePage.btn_addToCartFirstItem).toBeVisible()
        await expect(homePage.btn_addToCartFirstItem).toHaveText('Add to cart')

    })

    test('Verify Badge', async () => {

        await expect(homePage.badge_cartItemQuantity).not.toBeVisible()

    })

})

test.describe('Cart Page: Remove Itens from cart', { tag: '@smoke' }, async () => {

    test.beforeEach(async () => {
        await homePage.clickOnCartIcon()
        await cartPage.removeFromCartPageFirstItem()
    })

    test('Delete first item from cart', async () => {

        await expect(cartPage.btn_removeFromCartPageFirstItem).not.toBeVisible()
        await cartPage.continueShopping()
        await expect(homePage.btn_removeFromCartFirstItem).not.toBeVisible()
    })

    test('Verify Badge', async () => {

        await expect(cartPage.badge_cartItemQuantity).not.toBeVisible()

    })

})
