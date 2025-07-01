import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    private readonly link_firstItem: Locator
    private readonly _btn_addToCartFirstItem: Locator
    private readonly _btn_removeFromCartFirstItem: Locator


    constructor(page: Page) {
        super(page)
        this.link_firstItem = this.page.getByTestId('inventory-item-name').first()
        this._btn_addToCartFirstItem = this.page.getByTestId(/add-to-cart/).first()
        this._btn_removeFromCartFirstItem = this.page.getByTestId(/remove/).first()

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
    get btn_burguerMenu() {
        return this._btn_burgerMenuIcon
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

}