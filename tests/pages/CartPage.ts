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
    readonly btn_checkoutInfo: Locator
    readonly text_itemDescription: Locator

    constructor(page: Page) {
        super(page)
        this.link_itemName = this.page.getByTestId('inventory-item-name')
        this.text_itemPrice = this.page.getByTestId('inventory-item-price')
        this.text_itemDescription = this.page.getByTestId('inventory-item-desc')
        this.btn_removeFromCartItem = this.page.getByTestId(/remove/)
        this.btn_continueShopping = this.page.getByTestId('continue-shopping')
        this.btn_checkoutInfo = this.page.getByTestId('checkout')

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

    async clickOnCheckoutInfoPage(): Promise<void> {

        await this.btn_checkoutInfo.click()

    }

    async getItemName(): Promise<string> {

        const itemName: string | null = await this.link_itemName.textContent()

        if (!itemName) throw new Error("Item name does not exist.")

        return itemName

    }

    async getItemDescription(): Promise<string> {

        const itemDescription: string | null = await this.text_itemDescription.textContent()

        if (!itemDescription) throw new Error("Item description does not exist.")

        return itemDescription

    }

    async getItemPrice(): Promise<string> {

        const itemPrice: string | null = await this.text_itemPrice.textContent()

        if (!itemPrice) throw new Error("Item Price does not exist.")

        return itemPrice

    }

    async getItemInformation(): Promise<{ itemName: string, itemDescription: string, itemPrice: string }> {

        const itemName = await this.getItemName()
        const itemDescription = await this.getItemDescription()
        const itemPrice = await this.getItemPrice()

        return {

            itemName, itemDescription, itemPrice

        }

    }

}