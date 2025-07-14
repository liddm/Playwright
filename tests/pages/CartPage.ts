import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    readonly link_itemName: Locator
    readonly text_itemPrice: Locator
    readonly btn_removeFromCartItem: Locator
    readonly btn_continueShopping: Locator

    constructor(page: Page) {
        super(page)
        this.link_itemName = this.page.getByTestId('inventory-item-name')
        this.text_itemPrice = this.page.getByTestId('inventory-item-price')
        this.btn_removeFromCartItem = this.page.getByTestId(/remove/)
        this.btn_continueShopping = this.page.getByTestId('continue-shopping')

    }

    // ===========================================
    // Actions
    // ===========================================

    async removeFromCartFirstItem(): Promise<void> {
        await this.btn_removeFromCartItem.first().click()
    }

    async continueShopping(): Promise<void> {
        await this.btn_continueShopping.click()
    }

    async getAllItemsName(): Promise<string[]> {

        const itemsNameList: string[] = []

        const allItemsName = await this.link_itemName.all()

        for (const itemName of allItemsName) {

            const itemNameText: string | null = await itemName.textContent()

            if (!itemNameText) throw new Error("Item name does not exist in cart.")

            itemsNameList.push(itemNameText)

        }

        return itemsNameList
    }

}