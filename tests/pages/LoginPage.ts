import { Locator, Page } from "@playwright/test";

export class LoginPage {

    // ===========================================
    // Locators
    // ===========================================

    readonly page: Page
    readonly field_username: Locator
    readonly field_password: Locator
    readonly btn_login: Locator
    readonly error: Locator

    constructor(page: Page) {
        this.page = page
        this.field_username = this.page.getByTestId('username')
        this.field_password = this.page.getByTestId('password')
        this.btn_login = this.page.getByTestId('login-button')
        this.error = this.page.getByTestId('error')

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