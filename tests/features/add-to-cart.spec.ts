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

})

// ===========================================
// test scenarios
// ===========================================

test.describe('Shopping Cart Functionality Tests', { tag: '@smoke' }, async () => {


    test.describe('Adding a Single Item to the Cart', async () => {

        test.beforeEach(async () => {

            await pm.homePage.addToCartFirstItem()

        })

        test('should display "Remove" button after item is added', async () => {

            await expect(pm.homePage.btn_removeFromCartItem).toBeVisible()
            await expect(pm.homePage.btn_removeFromCartItem).toHaveText('Remove')

        })

        test('should display cart badge with quantity 1', async () => {

            await expect(pm.homePage.badge_cartItemQuantity).toHaveText('1')

        })

        test('should match item name and price between homepage and cart', async () => {

            const homePageFirstItem = await pm.homePage.getFirstItemInformation()

            await pm.homePage.clickOnCartIcon()

            const cartPageItem = await pm.cartPage.getItemInformation()

            expect(homePageFirstItem).toMatchObject(cartPageItem)

            // const firstItemName: string = await homePage.getFirstItemName()
            // const firstItemPrice: string = await homePage.getFirstItemPrice()
            // await homePage.clickOnCartIcon()

            // await expect(cartPage.link_itemName).toHaveText(firstItemName)
            // await expect(cartPage.text_itemPrice).toHaveText(firstItemPrice)

        })

        test('should match item info between HomePage and ItemPage', async () => {

            const homePageFirstItem = await pm.homePage.getFirstItemInformation()

            await pm.homePage.openFirstItem()

            const itemPageItem = await pm.itemPage.getItemInformation()

            expect(homePageFirstItem).toMatchObject(itemPageItem)

        })
    })

    test.describe('Adding Multiple Items to the Cart', async () => {

        let clickItemCount: number

        test.beforeEach(async () => {

            clickItemCount = await pm.homePage.addToCartAllItems()

        })

        test('should display correct badge count when multiple items are added', async () => {

            await expect(pm.homePage.badge_cartItemQuantity).toHaveText(clickItemCount.toString())

        })

        test('should display "Remove" buttons for all added items', async () => {

            await expect(pm.homePage.btn_removeFromCartItem).toHaveCount(clickItemCount)

        })

        test('should match all item names between homepage and cart', async () => {

            const allItemsNameHomePage: string[] = await pm.homePage.getAllItemsName()

            await pm.homePage.clickOnCartIcon()

            const allItemsNameCartPage: string[] = await pm.cartPage.getAllItemsName()

            expect(allItemsNameHomePage).toMatchObject(allItemsNameCartPage)

        })

    })
})


test.describe('App State Reset Functionality', async () => {

    test('should reset app state from Home Page and remove cart indicators', { tag: '@smoke' }, async () => {

        await pm.homePage.addToCartFirstItem()
        await pm.homePage.openBurgerMenu()
        await pm.homePage.clickOnResetStateLink()

        await expect(pm.homePage.badge_cartItemQuantity).not.toBeVisible()


        //  Issue found:
        //  Given that user added item to the cart, AND clicking on Reset App State, 'Remove' button from first item should NOT be visible.


    })

    test('should reset app state from Cart and clear item visibility', async () => {

        await pm.homePage.addToCartFirstItem()
        await pm.homePage.openBurgerMenu()
        await pm.homePage.clickOnResetStateLink()
        await pm.homePage.clickOnCartIcon()

        await expect(pm.cartPage.btn_removeFromCartItem.first()).not.toBeVisible()

    })

})
