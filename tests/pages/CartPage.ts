import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    readonly btn_removeFromCartPageFirstItem: Locator
    readonly btn_continueShopping: Locator

    constructor(page: Page) {
        super(page)
        this.btn_removeFromCartPageFirstItem = this.page.getByTestId(/remove/).first()
        this.btn_continueShopping = this.page.getByTestId('continue-shopping')

    }

    // ===========================================
    // Actions
    // ===========================================

    async removeFromCartPageFirstItem(): Promise<void> {
        await this.btn_removeFromCartPageFirstItem.click()
    }

    async continueShopping(): Promise<void> {
        await this.btn_continueShopping.click()
    }
}