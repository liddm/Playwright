import { test as setup } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'

setup('Login with valid user', async ({ page }) => {

    const loginPage = new LoginPage(page)

    await page.goto('/')
    await loginPage.login(process.env.VALID_USER as string, process.env.VALID_PASSWORD as string)
    await page.context().storageState({ path: '.auth/user.json' })

})
