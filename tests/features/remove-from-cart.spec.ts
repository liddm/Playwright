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

test.describe('Remove First Item from Cart on Home Page', { tag: '@smoke' }, async () => {

    test.beforeEach(async () => {

        await homePage.removeFromCartFirstItem()

    })

    test('should hide "Remove" button and display "Add to cart" again', async () => {

        await expect(homePage.btn_removeFromCartItem).not.toBeVisible()
        await expect(homePage.btn_addToCartItem.first()).toBeVisible()
        await expect(homePage.btn_addToCartItem.first()).toHaveText('Add to cart')

    })

    test('should remove cart badge after item is removed', async () => {

        await expect(homePage.badge_cartItemQuantity).not.toBeVisible()

    })

})

test.describe('Remove Items from Cart Page', { tag: '@smoke' }, async () => {

    test.beforeEach(async () => {

        await homePage.clickOnCartIcon()
        await cartPage.removeFromCartFirstItem()

    })

    test('should delete first item from cart and return to empty state', async () => {

        await expect(cartPage.btn_removeFromCartItem).not.toBeVisible()

        await cartPage.continueShopping()

        await expect(homePage.btn_removeFromCartItem).not.toBeVisible()

    })

    test('should hide cart badge when all items are removed', async () => {

        await expect(cartPage.badge_cartItemQuantity).not.toBeVisible()

    })

})