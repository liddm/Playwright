import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
//import { CartPage } from '../pages/CartPage'

// ===========================================
// variables
// ===========================================

let homePage: HomePage
//let cartPage: CartPage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page)
    //   cartPage = new CartPage(page)

    await page.goto('/inventory.html')
    await homePage.addToCartFirstItem()
    await homePage.clickOnCartIcon()

}
)

// ===========================================
// test scenarios
// ===========================================


