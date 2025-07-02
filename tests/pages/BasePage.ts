import { Locator, Page } from "@playwright/test";

export abstract class BasePage {

    // ===========================================
    // Locators
    // ===========================================

    // Header

    protected readonly page: Page
    protected readonly _header: Locator
    protected readonly _badge_cartItemQuantity: Locator

    // Burger Menu

    protected readonly _btn_cartIcon: Locator
    protected readonly _btn_burgerMenuIcon: Locator
    protected readonly _link_allItems: Locator
    protected readonly _link_about: Locator
    protected readonly _link_logout: Locator
    protected readonly _link_resetAppState: Locator


    constructor(page: Page) {
        this.page = page

        // Header

        this._header = this.page.getByTestId('primary-header')
        this._badge_cartItemQuantity = this.page.getByTestId('shopping-cart-badge')
        this._btn_cartIcon = this.page.getByTestId('shopping-cart-link')

        // Burger Menu

        this._btn_burgerMenuIcon = this.page.getByRole('button', { name: 'Open Menu' })
        this._link_allItems = this.page.getByTestId('inventory-sidebar-link')
        this._link_about = this.page.getByTestId('about-sidebar-link')
        this._link_logout = this.page.getByTestId('logout-sidebar-link')
        this._link_resetAppState = this.page.getByTestId('reset-sidebar-link')
    }

    // ===========================================
    // Actions
    // ===========================================

    async clickOnCartIcon(): Promise<void> {
        await this._btn_cartIcon.click()
    }

    async openBurgerMenu(): Promise<void> {
        await this._btn_burgerMenuIcon.click()
    }

    async clickOnLogoutLink(): Promise<void> {
        await this._link_logout.click()
    }

    async logout(): Promise<void> {
        await this.openBurgerMenu()
        await this.clickOnLogoutLink()
    }

    async clickOnAboutLink(): Promise<void> {
        await this._link_about.click()
    }

    async goToAboutPage(): Promise<void> {
        await this.openBurgerMenu()
        await this.clickOnAboutLink()

    }

    async clickOnAllItemsLink(): Promise<void> {
        await this._link_allItems.click()
    }

    async goToAllItemsPage(): Promise<void> {
        await this.openBurgerMenu()
        await this.clickOnAllItemsLink()

    }

    async clickOnResetStateLink(): Promise<void> {
        await this._link_resetAppState.click()
    }

    async resetAppState(): Promise<void> {
        await this.openBurgerMenu()
        await this.clickOnResetStateLink()
    }
}