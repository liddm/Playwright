import { Locator, Page } from "@playwright/test";

export abstract class BasePage {

    // ===========================================
    // Locators
    // ===========================================

    // Header

    readonly page: Page
    readonly header: Locator
    readonly badge_cartItemQuantity: Locator

    // Burger Menu

    readonly btn_cartIcon: Locator
    readonly btn_burgerMenuIcon: Locator
    readonly link_allItems: Locator
    readonly link_about: Locator
    readonly link_logout: Locator
    readonly link_resetAppState: Locator


    constructor(page: Page) {
        this.page = page

        // Header

        this.header = this.page.getByTestId('primary-header')
        this.badge_cartItemQuantity = this.page.getByTestId('shopping-cart-badge')
        this.btn_cartIcon = this.page.getByTestId('shopping-cart-link')

        // Burger Menu

        this.btn_burgerMenuIcon = this.page.getByRole('button', { name: 'Open Menu' })
        this.link_allItems = this.page.getByTestId('inventory-sidebar-link')
        this.link_about = this.page.getByTestId('about-sidebar-link')
        this.link_logout = this.page.getByTestId('logout-sidebar-link')
        this.link_resetAppState = this.page.getByTestId('reset-sidebar-link')
    }

    // ===========================================
    // Actions
    // ===========================================

    async clickOnCartIcon(): Promise<void> {
        await this.btn_cartIcon.click()
    }

    async openBurgerMenu(): Promise<void> {
        await this.btn_burgerMenuIcon.click()
    }

    async clickOnLogoutLink(): Promise<void> {
        await this.link_logout.click()
    }

    async logout(): Promise<void> {
        await this.openBurgerMenu()
        await this.clickOnLogoutLink()
    }

    async clickOnAboutLink(): Promise<void> {
        await this.link_about.click()
    }

    async goToAboutPage(): Promise<void> {
        await this.openBurgerMenu()
        await this.clickOnAboutLink()

    }

    async clickOnAllItemsLink(): Promise<void> {
        await this.link_allItems.click()
    }

    async goToAllItemsPage(): Promise<void> {
        await this.openBurgerMenu()
        await this.clickOnAllItemsLink()

    }

    async clickOnResetStateLink(): Promise<void> {
        await this.link_resetAppState.click()
    }

    async resetAppState(): Promise<void> {
        await this.openBurgerMenu()
        await this.clickOnResetStateLink()
    }
}