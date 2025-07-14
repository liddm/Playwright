import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    readonly link_itemName: Locator
    readonly text_itemPrice: Locator
    readonly btn_addToCartItem: Locator
    readonly btn_removeFromCartItem: Locator

    constructor(page: Page) {
        super(page)
        this.link_itemName = this.page.getByTestId('inventory-item-name')
        this.text_itemPrice = this.page.getByTestId('inventory-item-price')
        this.btn_addToCartItem = this.page.getByTestId(/add-to-cart/)
        this.btn_removeFromCartItem = this.page.getByTestId(/remove/)

    }

    // ===========================================
    // Actions
    // ===========================================

    async addToCartFirstItem(): Promise<void> {

        await this.btn_addToCartItem.first().click()

    }

    async removeFromCartFirstItem(): Promise<void> {

        await this.btn_removeFromCartItem.first().click()

    }

    async addToCartAllItems(): Promise<number> {

        let clickItemCount: number = 0

        while (await this.btn_addToCartItem.first().isVisible()) {

            await this.btn_addToCartItem.first().click()
            clickItemCount++

        }

        return clickItemCount

    }

    async getFirstItemName(): Promise<string> {

        const itemName: string | null = await this.link_itemName.first().textContent()

        if (!itemName) throw new Error("Item name does not exist.")

        return itemName
    }

    async getFirstItemPrice(): Promise<string> {

        const itemPrice: string | null = await this.text_itemPrice.first().textContent()

        if (!itemPrice) throw new Error("Item price does not exist.")

        return itemPrice
    }

    async getAllItemsName(): Promise<string[]> {

        const itemsNameList: string[] = []

        const allItemsName = await this.link_itemName.all()

        for (const itemName of allItemsName) {

            const itemNameText: string | null = await itemName.textContent()

            if (!itemNameText) throw new Error("Item name does not exist.")

            itemsNameList.push(itemNameText)

        }

        return itemsNameList
    }

}