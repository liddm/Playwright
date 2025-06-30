import { Locator, Page } from "@playwright/test";

export class CartPage {

    // ===========================================
    // Locators
    // ===========================================

    private readonly page: Page
    private readonly _header: Locator
    private readonly _btn_removeFromCartPageFirstItem: Locator
    private readonly _badge_cartItemQuantity: Locator
    private readonly _btn_continueShopping: Locator

    constructor(page: Page) {
        this.page = page
        this._header = this.page.getByTestId('primary-header')
        this._btn_removeFromCartPageFirstItem = this.page.getByTestId(/remove/).first()
        this._badge_cartItemQuantity = this.page.getByTestId('shopping-cart-badge')
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