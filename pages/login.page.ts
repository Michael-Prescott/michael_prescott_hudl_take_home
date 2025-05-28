import { expect, Locator, Page } from "@playwright/test";
import { LoginSelectors } from '../selectors/login.selectors';
import { HUDL_LOGIN_URL, HUDL_USER_HOMEPAGE } from "../fixtures/test-data";

export class LoginPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator(LoginSelectors.usernameInput);
        this.passwordInput = page.locator(LoginSelectors.passwordInput);
        this.submitButton = page.locator(LoginSelectors.submitButton);
    }

    async navigate() {
        await this.page.goto(HUDL_LOGIN_URL);
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickContinue() {
        await this.submitButton.click();
    }

    async verifyLoginSuccessful() {
        await expect(this.page).toHaveURL(HUDL_USER_HOMEPAGE);
    }
}