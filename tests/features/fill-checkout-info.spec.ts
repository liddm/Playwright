import { test, expect, Locator } from '@playwright/test'
import { PageManager } from '../pages/PageManager'
import { faker } from '@faker-js/faker';

// ===========================================
// constants
// ===========================================

const VALID_FIRSTNAME = faker.person.firstName()
const VALID_LASTNAME = faker.person.lastName()
const VALID_POSTALCODE = faker.location.zipCode()
const BLANK_FIRSTNAME = ""
const BLANK_LASTNAME = ""
const BLANK_POSTALCODE = ""

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
    await pm.homePage.clickOnCartIcon()
    await pm.cartPage.clickOnCheckoutInfoPage()

})

// ===========================================
// test scenarios
// ===========================================

test.describe('UI Page Check', { tag: '@ui' }, async () => {


    test('UI Elements should be visible', async () => {

        await expect(pm.checkoutInfoPage.text_checkoutTitle).toHaveText('Checkout: Your Information')

        const locators: Locator[] = [
            pm.checkoutInfoPage.field_firstName, pm.checkoutInfoPage.field_lastName, pm.checkoutInfoPage.field_postalCode, pm.checkoutInfoPage.btn_cancel, pm.checkoutInfoPage.btn_continueCheckout
        ]
        await Promise.all(locators.map((locator) => expect(locator).toBeVisible()))

    })

})

test.describe('Field Validation', { tag: '@smoke' }, async () => {

    test('Fill Checkout with Valid Info', { tag: '@smoke' }, async ({ page }) => {

        await pm.checkoutInfoPage.fillCheckoutWithValidInfo()
        await pm.checkoutInfoPage.clickOnContinueButton()

        await expect(page).toHaveURL('/checkout-step-two.html')

    })
})

test.describe('Field Validation with Invalid Info', { tag: '@smoke' }, async () => {

    test('should display error for blank First Name', { tag: '@smoke' }, async () => {

        await pm.checkoutInfoPage.fillCheckoutInfo(BLANK_FIRSTNAME, BLANK_LASTNAME, BLANK_POSTALCODE)
        await pm.checkoutInfoPage.clickOnContinueButton()

        await expect(pm.checkoutInfoPage.error).toContainText('Error: First Name is required')

    })

    test('should display error for blank Last Name', { tag: '@smoke' }, async () => {

        await pm.checkoutInfoPage.fillCheckoutInfo(VALID_FIRSTNAME, BLANK_LASTNAME, VALID_POSTALCODE)
        await pm.checkoutInfoPage.clickOnContinueButton()

        await expect(pm.checkoutInfoPage.error).toContainText('Error: Last Name is required')

    })

    test('should display error for blank Zip/PostalCode', { tag: '@smoke' }, async () => {

        await pm.checkoutInfoPage.fillCheckoutInfo(VALID_FIRSTNAME, VALID_LASTNAME, BLANK_POSTALCODE)
        await pm.checkoutInfoPage.clickOnContinueButton()

        await expect(pm.checkoutInfoPage.error).toContainText('Error: Postal Code is required')

    })

})

test('Cancel Button lead to Cart Page', { tag: '@smoke' }, async ({ page }) => {

    await pm.checkoutInfoPage.clickOnCancelButton()

    await expect(page).toHaveURL('/cart.html')

})

