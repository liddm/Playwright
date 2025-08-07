import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutOverviewPage extends BasePage {

    // ===========================================
    // Locators
    // ===========================================

    readonly text_checkoutOverviewTitle: Locator
    readonly link_itemName: Locator
    readonly text_itemPrice: Locator
    readonly text_itemDescription: Locator
    readonly text_paymentInformationLabel: Locator
    readonly text_paymentInformationValue: Locator
    readonly text_shippingInformationLabel: Locator
    readonly text_shippingInformationValue: Locator
    readonly text_priceTotalLabel: Locator
    readonly text_itemSubtotalLabel: Locator
    readonly text_taxLabel: Locator
    readonly text_totalLabel: Locator
    readonly btn_finishCheckout: Locator
    readonly btn_cancelCheckout: Locator

    constructor(page: Page) {
        super(page)
        this.text_checkoutOverviewTitle = this.page.getByTestId('title')
        this.link_itemName = this.page.getByTestId('inventory-item-name')
        this.text_itemPrice = this.page.getByTestId('inventory-item-price')
        this.text_itemDescription = this.page.getByTestId('inventory-item-desc')
        this.text_paymentInformationLabel = this.page.getByTestId('payment-info-label')
        this.text_paymentInformationValue = this.page.getByTestId('payment-info-value')
        this.text_shippingInformationLabel = this.page.getByTestId('shipping-info-label')
        this.text_shippingInformationValue = this.page.getByTestId('shipping-info-value')
        this.text_priceTotalLabel = this.page.getByTestId('total-info-label')
        this.text_itemSubtotalLabel = this.page.getByTestId('subtotal-label')
        this.text_taxLabel = this.page.getByTestId('tax-label')
        this.text_totalLabel = this.page.getByTestId('total-label')
        this.btn_finishCheckout = this.page.getByTestId('finish')
        this.btn_cancelCheckout = this.page.getByTestId('cancel')

    }

    // ===========================================
    // Actions
    // ===========================================

    async getCheckoutOverviewTitle(): Promise<string> {

        const checkoutOverviewTitle: string | null = await this.text_checkoutOverviewTitle.textContent()

        if (!checkoutOverviewTitle) throw new Error("Checkout Overview Title is not being displayed.")

        return checkoutOverviewTitle

    }

    async clickOnCancelCheckoutButton(): Promise<void> {

        await this.btn_cancelCheckout.click()

    }

    async clickOnFinishCheckoutButton(): Promise<void> {

        await this.btn_finishCheckout.click()

    }

}