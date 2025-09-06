import { test, expect, Locator } from '@playwright/test'
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

})

// ===========================================
// test scenarios
// ===========================================

test('Open first item', async () => {

    const locators: Locator[] = [

        pm.itemPage.text_itemName,
        pm.itemPage.text_itemDescription,
        pm.itemPage.text_itemPrice,
        pm.itemPage.btn_addToCart,
        pm.itemPage.img_item,
        pm.itemPage.btn_backToProducts

    ]

    await pm.homePage.openFirstItem()
    await Promise.all(locators.map((locator) => expect(locator).toBeVisible()))

    const requestImageStatus = await pm.itemPage.getImageRequestStatus(pm.itemPage.img_item)

    expect(requestImageStatus).toBe(200)

})

test.describe('Verify UI from ADD and REMOVE buttons', async () => {

    test.beforeEach(async () => {

        await pm.homePage.openFirstItem()
        await pm.itemPage.addToCart()

    })

    test('should display "Remove" button after item is added', async () => {

        await expect(pm.itemPage.btn_removeFromCart).toBeVisible()
        await expect(pm.itemPage.btn_removeFromCart).toHaveText('Remove')

    })

    test('should display cart badge with quantity 1', async () => {

        await expect(pm.itemPage.badge_cartItemQuantity).toHaveText('1')

    })
})

test('Back to Products', async ({ page }) => {

    await pm.homePage.openFirstItem()
    await pm.itemPage.backToProducts()

    await expect(page).toHaveURL('/inventory.html')
    await expect(pm.homePage.header).toBeVisible()

})
