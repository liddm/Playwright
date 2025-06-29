import { Locator, Page } from "@playwright/test";

export class HomePage {
    private readonly page: Page
    private readonly _header: Locator

    constructor(page: Page) {
        this.page = page
        this._header = this.page.getByTestId('primary-header')

    }
    get header() {
        return this._header
    }

}