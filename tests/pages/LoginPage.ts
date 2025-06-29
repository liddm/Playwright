import { Locator, Page } from "@playwright/test";

export class LoginPage {

    // ===========================================
    // Locators
    // ===========================================

    private readonly page: Page
    private readonly field_username: Locator
    private readonly field_password: Locator
    private readonly btn_login: Locator
    private readonly _error: Locator

    constructor(page: Page) {
        this.page = page
        this.field_username = this.page.getByTestId('username')
        this.field_password = this.page.getByTestId('password')
        this.btn_login = this.page.getByTestId('login-button')
        this._error = this.page.getByTestId('error')

    }

    // ===========================================
    // Getters
    // ===========================================

    get error() {
        return this._error
    }

    // ===========================================
    // Actions
    // ===========================================

    async login(username: string, password: string): Promise<void> {
        await this.field_username.fill(username)
        await this.field_password.fill(password)
        await this.btn_login.click()
    }
}