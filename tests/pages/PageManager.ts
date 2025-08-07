import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage'
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage'
import { ItemPage } from '../pages/ItemPage'
import { LoginPage } from '../pages/LoginPage'
import { Page } from '@playwright/test'

export class PageManager {

    readonly page: Page
    readonly homePage: HomePage
    readonly cartPage: CartPage
    readonly checkoutInfoPage: CheckoutInfoPage
    readonly checkoutOverviewPage: CheckoutOverviewPage
    readonly itemPage: ItemPage
    readonly loginPage: LoginPage

    constructor(page: Page) {

        this.page = page
        this.homePage = new HomePage(page)
        this.cartPage = new CartPage(page)
        this.checkoutInfoPage = new CheckoutInfoPage(page)
        this.checkoutOverviewPage = new CheckoutOverviewPage(page)
        this.itemPage = new ItemPage(page)
        this.loginPage = new LoginPage(page)
    }

}