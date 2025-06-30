import { Locator, Page } from "@playwright/test";

export class HomePage {

    // ===========================================
    // Locators
    // ===========================================

    private readonly page: Page
    private readonly _header: Locator
    private readonly link_firstItem: Locator
    private readonly _btn_addToCartFirstItem: Locator
    private readonly _btn_removeFromCartFirstItem: Locator
    private readonly _badge_cartItemQuantity: Locator
    private readonly _btn_cartIcon: Locator

    constructor(page: Page) {
        this.page = page
        this._header = this.page.getByTestId('primary-header')
        this.link_firstItem = this.page.getByTestId('inventory-item-name').first()
        this._btn_addToCartFirstItem = this.page.getByTestId(/add-to-cart/).first()
        this._btn_removeFromCartFirstItem = this.page.getByTestId(/remove/).first()
        this._badge_cartItemQuantity = this.page.getByTestId('shopping-cart-badge')
        this._btn_cartIcon = this.page.getByTestId('shopping-cart-link')
    }

    // ===========================================
    // Getters
    // ===========================================

    get header() {
        return this._header
    }
    get btn_addToCartFirstItem() {
        return this._btn_addToCartFirstItem
    }
    get btn_removeFromCartFirstItem() {
        return this._btn_removeFromCartFirstItem
    }
    get badge_cartItemQuantity() {
        return this._badge_cartItemQuantity
    }

    // ===========================================
    // Actions
    // ===========================================

    async addToCartFirstItem(): Promise<void> {
        await this._btn_addToCartFirstItem.click()

    }

    async removeFromCartFirstItem(): Promise<void> {
        await this._btn_removeFromCartFirstItem.click()
    }

    async clickToCartIcon(): Promise<void> {
        await this._btn_cartIcon.click()
    }
}