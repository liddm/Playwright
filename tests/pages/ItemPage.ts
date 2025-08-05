import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ItemPage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    readonly img_item: Locator
    readonly text_itemName: Locator
    readonly text_itemDescription: Locator
    readonly text_itemPrice: Locator
    readonly btn_addToCart: Locator
    readonly btn_removeFromCart: Locator
    readonly btn_backToProducts: Locator

    constructor(page: Page) {
        super(page)

        this.img_item = this.page.getByTestId(/item-sauce-labs/)
        this.text_itemName = this.page.getByTestId('inventory-item-name')
        this.text_itemDescription = this.page.getByTestId('inventory-item-desc')
        this.text_itemPrice = this.page.getByTestId('inventory-item-price')
        this.btn_addToCart = this.page.getByTestId('add-to-cart')
        this.btn_removeFromCart = this.page.getByTestId('remove')
        this.btn_backToProducts = this.page.getByTestId('back-to-products')

    }

    // ===========================================
    // Actions
    // ===========================================

    async addToCart(): Promise<void> {

        await this.btn_addToCart.click()

    }

    async removeFromCart(): Promise<void> {

        await this.btn_removeFromCart.click()

    }

    async backToProducts(): Promise<void> {

        await this.btn_backToProducts.click()

    }

    async getImageLink(image: Locator): Promise<string> {

        const imgUrl: string | null = await image.getAttribute('src')

        if (!imgUrl) throw new Error('Image link not found')
        return imgUrl

    }

    async getImageRequestStatus(image: Locator): Promise<number> {

        const imageLink = await this.getImageLink(image)
        const request = await this.page.request.get(imageLink)
        return request.status()

    }

    async getItemName(): Promise<string> {

        const itemName: string | null = await this.text_itemName.textContent()

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