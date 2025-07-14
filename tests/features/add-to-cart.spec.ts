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

})

// ===========================================
// test scenarios
// ===========================================

test.describe('Shopping Cart Functionality Tests', { tag: '@smoke' }, async () => {


    test.describe('Adding a Single Item to the Cart', async () => {

        test.beforeEach(async () => {

            await homePage.addToCartFirstItem()

        })

        test('should display "Remove" button after item is added', async () => {

            await expect(homePage.btn_removeFromCartItem).toBeVisible()
            await expect(homePage.btn_removeFromCartItem).toHaveText('Remove')

        })

        test('should display cart badge with quantity 1', async () => {

            await expect(homePage.badge_cartItemQuantity).toHaveText('1')

        })

        test('should match item name and price between homepage and cart', async () => {

            const firstItemName: string = await homePage.getFirstItemName()
            const firstItemPrice: string = await homePage.getFirstItemPrice()
            await homePage.clickOnCartIcon()

            await expect(cartPage.link_itemName).toHaveText(firstItemName)
            await expect(cartPage.text_itemPrice).toHaveText(firstItemPrice)

        })
    })

    test.describe('Adding Multiple Items to the Cart', async () => {

        let clickItemCount: number

        test.beforeEach(async () => {

            clickItemCount = await homePage.addToCartAllItems()

        })

        test('should display correct badge count when multiple items are added', async () => {

            await expect(homePage.badge_cartItemQuantity).toHaveText(clickItemCount.toString())

        })

        test('should display "Remove" buttons for all added items', async () => {

            await expect(homePage.btn_removeFromCartItem).toHaveCount(clickItemCount)

        })

        test('should match all item names between homepage and cart', async () => {

            const allItemsNameHomePage: string[] = await homePage.getAllItemsName()

            await homePage.clickOnCartIcon()

            const allItemsNameCartPage: string[] = await cartPage.getAllItemsName()

            expect(allItemsNameHomePage).toMatchObject(allItemsNameCartPage)

        })

    })
})


test.describe('App State Reset Functionality', async () => {

    test('should reset app state from Home Page and remove cart indicators', { tag: '@smoke' }, async () => {

        await homePage.addToCartFirstItem()
        await homePage.openBurgerMenu()
        await homePage.clickOnResetStateLink()

        await expect(homePage.badge_cartItemQuantity).not.toBeVisible()


        //  Issue found:
        //  Given that user added item to the cart, AND clicking on Reset App State, 'Remove' button from first item should NOT be visible.


    })

    test('should reset app state from Cart and clear item visibility', async () => {

        await homePage.addToCartFirstItem()
        await homePage.openBurgerMenu()
        await homePage.clickOnResetStateLink()
        await homePage.clickOnCartIcon()

        await expect(cartPage.btn_removeFromCartItem.first()).not.toBeVisible()

    })

})
