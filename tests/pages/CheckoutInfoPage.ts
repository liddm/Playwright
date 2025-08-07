import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { faker } from '@faker-js/faker';

export class CheckoutInfoPage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    readonly text_checkoutTitle: Locator
    readonly field_firstName: Locator
    readonly field_lastName: Locator
    readonly field_postalCode: Locator
    readonly btn_cancel: Locator
    readonly btn_continueCheckout: Locator
    readonly error: Locator

    constructor(page: Page) {
        super(page)
        this.text_checkoutTitle = this.page.getByTestId('title')
        this.field_firstName = this.page.getByTestId('firstName')
        this.field_lastName = this.page.getByTestId('lastName')
        this.field_postalCode = this.page.getByTestId('postalCode')
        this.btn_cancel = this.page.getByTestId('cancel')
        this.btn_continueCheckout = this.page.getByTestId('continue')
        this.error = this.page.getByTestId('error')

    }

    // ===========================================
    // Actions
    // ===========================================

    async getCheckoutTitle(): Promise<string> {

        const checkoutTitle: string | null = await this.text_checkoutTitle.textContent()

        if (!checkoutTitle) throw new Error("Checkout Title is not being displayed.")

        return checkoutTitle

    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {

        await this.field_firstName.fill(firstName)
        await this.field_lastName.fill(lastName)
        await this.field_postalCode.fill(postalCode)

    }

    async fillCheckoutWithValidInfo(): Promise<void> {

        await this.field_firstName.fill(faker.person.firstName())
        await this.field_lastName.fill(faker.person.lastName())
        await this.field_postalCode.fill(faker.location.zipCode())

    }

    async fillCheckoutWithMissingInfo(): Promise<void> {

        await this.field_lastName.fill(faker.person.lastName())
        await this.field_postalCode.fill(faker.location.zipCode())

    }

    async clickOnCancelButton(): Promise<void> {

        await this.btn_cancel.click()

    }

    async clickOnContinueButton(): Promise<void> {

        await this.btn_continueCheckout.click()

    }
}