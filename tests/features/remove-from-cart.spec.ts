import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/PageManager'

// ===========================================
// variables
// ===========================================

let pm: PageManager

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    pm = new PageManager(page)

    await page.goto('/inventory.html')
    await pm.homePage.addToCartFirstItem()

})

// ===========================================
// test scenarios
// ===========================================

test.describe('Remove First Item from Cart on Home Page', { tag: '@smoke' }, async () => {

    test.beforeEach(async () => {

        await pm.homePage.removeFromCartFirstItem()

    })

    test('should hide "Remove" button and display "Add to cart" again', async () => {

        await expect(pm.homePage.btn_removeFromCartItem).not.toBeVisible()
        await expect(pm.homePage.btn_addToCartItem.first()).toBeVisible()
        await expect(pm.homePage.btn_addToCartItem.first()).toHaveText('Add to cart')

    })

    test('should remove cart badge after item is removed', async () => {

        await expect(pm.homePage.badge_cartItemQuantity).not.toBeVisible()

    })

})

test.describe('Remove Items from Cart Page', { tag: '@smoke' }, async () => {

    test.beforeEach(async () => {

        await pm.homePage.clickOnCartIcon()
        await pm.cartPage.removeFromCartFirstItem()

    })

    test('should delete first item from cart and return to empty state', async () => {

        await expect(pm.cartPage.btn_removeFromCartItem).not.toBeVisible()

        await pm.cartPage.continueShopping()

        await expect(pm.homePage.btn_removeFromCartItem).not.toBeVisible()

    })

    test('should hide cart badge when all items are removed', async () => {

        await expect(pm.cartPage.badge_cartItemQuantity).not.toBeVisible()

    })

})