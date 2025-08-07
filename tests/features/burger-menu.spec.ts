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
    await pm.homePage.openBurgerMenu()

})

// ===========================================
// test scenarios
// ===========================================

test.describe('Validate Burger Menu Navigation Options', { tag: '@smoke' }, async () => {

    test('should redirect user to Sauce Labs website when clicking "About"', async ({ page }) => {

        await pm.homePage.clickOnAboutLink()

        await expect(page).toHaveURL('https://saucelabs.com')

    })

    test('should navigate to All Items page from cart', async ({ page }) => {

        await pm.homePage.clickOnCartIcon()
        await pm.cartPage.goToAllItemsPage()

        await expect(page).toHaveURL('/inventory.html')
        await expect(pm.homePage.btn_addToCartItem.first()).toBeVisible()

    })

    test('should logout user and redirect to login page', async ({ page }) => {

        await pm.homePage.clickOnLogoutLink()

        await expect(page).toHaveURL('/')
        await expect(pm.loginPage.field_username).toBeVisible()

    })

})
