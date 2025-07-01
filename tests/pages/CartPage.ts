import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    private readonly _btn_removeFromCartPageFirstItem: Locator
    private readonly _btn_continueShopping: Locator

    constructor(page: Page) {
        super(page)
        this._btn_removeFromCartPageFirstItem = this.page.getByTestId(/remove/).first()
        this._btn_continueShopping = this.page.getByTestId('continue-shopping')

    }

    // ===========================================
    // Getters
    // ===========================================

    get header() {
        return this._header
    }
    get btn_removeFromCartPageFirstItem() {
        return this._btn_removeFromCartPageFirstItem
    }
    get badge_cartItemQuantity() {
        return this._badge_cartItemQuantity
    }
    get btn_continueShopping() {
        return this._btn_continueShopping
    }

    // ===========================================
    // Actions
    // ===========================================

    async removeFromCartPageFirstItem(): Promise<void> {
        await this._btn_removeFromCartPageFirstItem.click()
    }

    async continueShopping(): Promise<void> {
        await this._btn_continueShopping.click()
    }
}