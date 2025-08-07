import { test, expect, Locator } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage'
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

let homePage: HomePage
let cartPage: CartPage
let checkoutInfoPage: CheckoutInfoPage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page)
    cartPage = new CartPage(page)
    checkoutInfoPage = new CheckoutInfoPage(page)

    await page.goto('/inventory.html')
    await homePage.addToCartFirstItem()
    await homePage.clickOnCartIcon()
    await cartPage.clickOnCheckoutInfoPage()

})

// ===========================================
// test scenarios
// ===========================================

test.describe('UI Page Check', { tag: '@ui' }, async () => {


    test('UI Elements should be visible', async () => {

        await expect(checkoutInfoPage.text_checkoutTitle).toHaveText('Checkout: Your Information')

        const locators: Locator[] = [
            checkoutInfoPage.field_firstName, checkoutInfoPage.field_lastName, checkoutInfoPage.field_postalCode, checkoutInfoPage.btn_cancel, checkoutInfoPage.btn_continueCheckout
        ]
        await Promise.all(locators.map((locator) => expect(locator).toBeVisible()))

    })

})

test.describe('Field Validation', { tag: '@smoke' }, async () => {

    test('Fill Checkout with Valid Info', { tag: '@smoke' }, async ({ page }) => {

        await checkoutInfoPage.fillCheckoutWithValidInfo()
        await checkoutInfoPage.clickOnContinueButton()

        await expect(page).toHaveURL('/checkout-step-two.html')

    })
})

test.describe('Field Validation with Invalid Info', { tag: '@smoke' }, async () => {

    test('should display error for blank First Name', { tag: '@smoke' }, async () => {

        await checkoutInfoPage.fillCheckoutInfo(BLANK_FIRSTNAME, BLANK_LASTNAME, BLANK_POSTALCODE)
        await checkoutInfoPage.clickOnContinueButton()

        await expect(checkoutInfoPage.error).toContainText('Error: First Name is required')

    })

    test('should display error for blank Last Name', { tag: '@smoke' }, async () => {

        await checkoutInfoPage.fillCheckoutInfo(VALID_FIRSTNAME, BLANK_LASTNAME, VALID_POSTALCODE)
        await checkoutInfoPage.clickOnContinueButton()

        await expect(checkoutInfoPage.error).toContainText('Error: Last Name is required')

    })

    test('should display error for blank Zip/PostalCode', { tag: '@smoke' }, async () => {

        await checkoutInfoPage.fillCheckoutInfo(VALID_FIRSTNAME, VALID_LASTNAME, BLANK_POSTALCODE)
        await checkoutInfoPage.clickOnContinueButton()

        await expect(checkoutInfoPage.error).toContainText('Error: Postal Code is required')

    })

})

test('Cancel Button lead to Cart Page', { tag: '@smoke' }, async ({ page }) => {

    await checkoutInfoPage.clickOnCancelButton()

    await expect(page).toHaveURL('/cart.html')

})

