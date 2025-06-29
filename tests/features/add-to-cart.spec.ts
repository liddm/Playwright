import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'

// ===========================================
// constants
// ===========================================

const VALID_PASSWORD = 'secret_sauce'
const VALID_USER = 'standard_user'

// ===========================================
// variables
// ===========================================

let loginPage: LoginPage
let homePage: HomePage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await page.goto('/')
    await loginPage.login(VALID_USER, VALID_PASSWORD)
    await homePage.addToCartFirstItem()

})

// ===========================================
// test scenarios
// ===========================================

test.describe('Add First Item To Cart', { tag: '@smoke' }, async () => {

    test('Verify Button', async () => {

        await expect(homePage.btn_removeFromCartFirstItem).toBeVisible()
        await expect(homePage.btn_removeFromCartFirstItem).toHaveText('Remove')

    })

    test('Verify Badge', async () => {

        await expect(homePage.badge_cartItemQuantity).toHaveText('1')

    })

})

