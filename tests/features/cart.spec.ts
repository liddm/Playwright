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

test('Check Item info between HomePage and CartPage', async () => {

    const homePageFirstItem = await pm.homePage.getFirstItemInformation()

    await pm.homePage.openFirstItem()

    const itemPageItem = await pm.itemPage.getItemInformation()

    expect(homePageFirstItem).toMatchObject(itemPageItem)

})
