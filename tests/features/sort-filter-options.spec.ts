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

test('should open sort/filter option', async () => {

    await expect(pm.homePage.dropdown_sortFilter).toBeVisible()
    await pm.homePage.selectSortFilterByValue('lohi')

})

test('validate filter options', async () => {

    let itemNames

    const sortByNameAToZ = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
    ]

    const sortByNameZToA = [
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Onesie',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Bike Light',
        'Sauce Labs Backpack',
    ]

    const sortByPriceLowToHigh = [
        'Sauce Labs Onesie',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Backpack',
        'Sauce Labs Fleece Jacket',
    ]

    const sortByPriceHighToLow = [
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Backpack',
        'Sauce Labs Bolt T-Shirt',
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Bike Light',
        'Sauce Labs Onesie',
    ]

    await pm.homePage.selectSortFilterByValue('az')
    itemNames = await pm.homePage.getAllItemsName()
    expect(sortByNameAToZ).toStrictEqual(itemNames)

    await pm.homePage.selectSortFilterByValue('za')
    itemNames = await pm.homePage.getAllItemsName()
    expect(sortByNameZToA).toStrictEqual(itemNames)

    await pm.homePage.selectSortFilterByValue('lohi')
    itemNames = await pm.homePage.getAllItemsName()
    expect(sortByPriceLowToHigh).toStrictEqual(itemNames)

    await pm.homePage.selectSortFilterByValue('hilo')
    itemNames = await pm.homePage.getAllItemsName()
    expect(sortByPriceHighToLow).toStrictEqual(itemNames)

})
