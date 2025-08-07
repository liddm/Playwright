import { test, expect, Locator } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage'
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage'

// ===========================================
// variables
// ===========================================

let homePage: HomePage
let cartPage: CartPage
let checkoutInfoPage: CheckoutInfoPage
let checkoutOverviewPage: CheckoutOverviewPage

// ===========================================
// pre conditions
// ===========================================

test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page)
    cartPage = new CartPage(page)
    checkoutInfoPage = new CheckoutInfoPage(page)
    checkoutOverviewPage = new CheckoutOverviewPage(page)

    await page.goto('/inventory.html')
    await homePage.addToCartFirstItem()
    await homePage.clickOnCartIcon()
    await cartPage.clickOnCheckoutInfoPage()
    await checkoutInfoPage.clickOnContinueButton()
})

// ===========================================
// test scenarios
// ===========================================

test.describe('UI Page Check', { tag: '@ui' }, async () => {


    test('UI Elements should be visible', async () => {

        await expect(checkoutOverviewPage.text_checkoutOverviewTitle).toHaveText('Checkout: Overview')

        const locators: Locator[] = [
            checkoutOverviewPage.link_itemName,
            checkoutOverviewPage.text_itemPrice,
            checkoutOverviewPage.text_itemDescription,
            checkoutOverviewPage.text_paymentInformationLabel,
            checkoutOverviewPage.text_paymentInformationValue,
            checkoutOverviewPage.text_shippingInformationLabel,
            checkoutOverviewPage.text_priceTotalLabel,
            checkoutOverviewPage.text_itemSubtotalLabel,
            checkoutOverviewPage.text_taxLabel,
            checkoutOverviewPage.text_totalLabel,
            checkoutOverviewPage.btn_cancelCheckout,
            checkoutOverviewPage.btn_finishCheckout
        ]

        await Promise.all(locators.map((locator) => expect(locator).toBeVisible()))

    })
})




