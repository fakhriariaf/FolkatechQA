import loginPage from "../locator/loginPage";
import { expect } from "@playwright/test";

export default class LoginActions {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.loginPage = new loginPage();
        this.emailInput = page.locator(this.loginPage.emailInput);
        this.passwordInput = page.locator(this.loginPage.passwordInput);
        this.loginButton = page.locator(this.loginPage.loginButton);
        this.errorMessage = page.locator(this.loginPage.errorMessage);

        this.validEmail = 'admin@example.com';
        this.validPassword = 'password';
    }

    async goto() {
        await this.page.goto('https://lapor.folkatech.com/');
        await this.page.waitForTimeout(2000);
    }

    async validLogin() {
        await this.emailInput.fill(this.validEmail);
        await this.passwordInput.fill(this.validPassword);
        await this.loginButton.click();
        await this.page.waitForTimeout(2000);

        await expect(this.page).toHaveURL('https://lapor.folkatech.com/admin/dashboard');
    }

    async invalidLogin(email, password, expectedError) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(2000);

        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedError);
    }
}
