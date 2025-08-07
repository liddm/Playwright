import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'
import { ItemPage } from '../pages/ItemPage'

// ===========================================
// variables
// ===========================================

let homePage: HomePage
let cartPage: CartPage
let itemPage: ItemPage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page)
    cartPage = new CartPage(page)
    itemPage = new ItemPage(page)

    await page.goto('/inventory.html')

})

// ===========================================
// test scenarios
// ===========================================

test('Check Item info between HomePage and CartPage', async () => {

    const homePageFirstItem = await homePage.getFirstItemInformation()

    await homePage.openFirstItem()

    const itemPageItem = await itemPage.getItemInformation()

    expect(homePageFirstItem).toMatchObject(itemPageItem)

})
