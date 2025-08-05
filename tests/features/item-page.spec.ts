import { test, expect, Locator } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { ItemPage } from '../pages/ItemPage'
import { features } from 'process'

// ===========================================
// variables
// ===========================================

let homePage: HomePage
let itemPage: ItemPage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page)
    itemPage = new ItemPage(page)

    await page.goto('/inventory.html')

})

// ===========================================
// test scenarios
// ===========================================

test('Open first item', async ({ page }) => {

    const locators: Locator[] = [

        itemPage.text_itemName,
        itemPage.text_itemDescription,
        itemPage.text_itemPrice,
        itemPage.btn_addToCart,
        itemPage.img_item,
        itemPage.btn_backToItems

    ]

    await homePage.openFirstItem()
    await Promise.all(locators.map((locator) => expect(locator).toBeVisible()))

    const requestImageStatus = await itemPage.getImageRequestStatus(itemPage.img_item)

    expect(requestImageStatus).toBe(200)

})

test.describe('Adding Item to the Cart', async () => {

    test.beforeEach(async () => {

        await homePage.openFirstItem()
        await itemPage.addToCart()

    })

    test('should display "Remove" button after item is added', async () => {

        await expect(itemPage.btn_removeFromCart).toBeVisible()
        await expect(itemPage.btn_removeFromCart).toHaveText('Remove')

    })

    test('should display cart badge with quantity 1', async () => {

        await expect(itemPage.badge_cartItemQuantity).toHaveText('1')

    })
})

test('Back to Items', async ({ page }) => {

    await homePage.openFirstItem()
    await itemPage.backToItems()

    await expect(page).toHaveURL('/inventory.html')
    await expect(homePage.header).toBeVisible()

})

test('Check Item info between HomePage and ItemPage', async () => {

    const homePageFirstItem = await homePage.getFirstItemInformation()

    await homePage.openFirstItem()

    const itemPageItem = await itemPage.getItemInformation()

    expect(homePageFirstItem).toMatchObject(itemPageItem)

})