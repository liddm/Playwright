import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    readonly link_firstItem: Locator
    readonly btn_addToCartFirstItem: Locator
    readonly btn_removeFromCartFirstItem: Locator


    constructor(page: Page) {
        super(page)
        this.link_firstItem = this.page.getByTestId('inventory-item-name').first()
        this.btn_addToCartFirstItem = this.page.getByTestId(/add-to-cart/).first()
        this.btn_removeFromCartFirstItem = this.page.getByTestId(/remove/).first()

    }

    // ===========================================
    // Actions
    // ===========================================

    async addToCartFirstItem(): Promise<void> {
        await this.btn_addToCartFirstItem.click()
    }

    async removeFromCartFirstItem(): Promise<void> {
        await this.btn_removeFromCartFirstItem.click()
    }

}