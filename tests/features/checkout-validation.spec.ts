import { test, expect, Locator } from '@playwright/test'
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
    await pm.homePage.addToCartFirstItem()
    await pm.homePage.clickOnCartIcon()
    await pm.cartPage.clickOnCheckoutInfoPage()
    await pm.checkoutInfoPage.fillCheckoutWithValidInfo()
    await pm.checkoutInfoPage.clickOnContinueButton()
})

// ===========================================
// test scenarios
// ===========================================

test.describe('UI Page Check', { tag: '@ui' }, async () => {


    test('UI Elements should be visible', async () => {

        await expect(pm.checkoutOverviewPage.text_checkoutOverviewTitle).toHaveText('Checkout: Overview')

        const locators: Locator[] = [
            pm.checkoutOverviewPage.link_itemName,
            pm.checkoutOverviewPage.text_itemPrice,
            pm.checkoutOverviewPage.text_itemDescription,
            pm.checkoutOverviewPage.text_paymentInformationLabel,
            pm.checkoutOverviewPage.text_paymentInformationValue,
            pm.checkoutOverviewPage.text_shippingInformationLabel,
            pm.checkoutOverviewPage.text_priceTotalLabel,
            pm.checkoutOverviewPage.text_itemSubtotalLabel,
            pm.checkoutOverviewPage.text_taxLabel,
            pm.checkoutOverviewPage.text_totalLabel,
            pm.checkoutOverviewPage.btn_cancelCheckout,
            pm.checkoutOverviewPage.btn_finishCheckout
        ]

        await Promise.all(locators.map((locator) => expect(locator).toBeVisible()))

    })
})




