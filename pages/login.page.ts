import { expect, Locator, Page } from "@playwright/test";
import { LoginSelectors } from '../selectors/login.selectors';
import {
    APPLE_SIGNIN_URL_REGEX,
    FACEBOOK_SIGNIN_URL_REGEX,
    GOOGLE_SIGNIN_URL_REGEX,
    HUDL_LOGIN_URL,
    HUDL_USER_HOMEPAGE,
    INVALID_EMAIL_ADDRESS_MESSAGE,
    INVALID_PASSWORD_MESSAGE
} from "../fixtures/test-data";

export class LoginPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private continueButton: Locator;
    private invalidUsernameMessage: Locator;
    private createAccountButton: Locator;
    private invalidPasswordMessage: Locator;
    private editUsernameButton: Locator;


    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator(LoginSelectors.usernameInput);
        this.passwordInput = page.locator(LoginSelectors.passwordInput);
        this.continueButton = page.locator(LoginSelectors.continueButton);
        this.invalidUsernameMessage = page.locator(LoginSelectors.invalidUsernameMessage);
        this.invalidPasswordMessage = page.locator(LoginSelectors.invalidPasswordMessage);
        this.editUsernameButton = page.locator(LoginSelectors.editUsernameButton);
        this.createAccountButton = page.locator(LoginSelectors.createAccountButton);
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async enterFirstName(firstName: string) {
        await this.page.locator(LoginSelectors.firstNameInput).fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.page.locator(LoginSelectors.lastNameInput).fill(lastName);
    }

    async enterEmailAddress(email: string) {
        await this.page.locator(LoginSelectors.emailInput).fill(email);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickEditUsername() {
        await this.editUsernameButton.click();
    }

    async clickCreateAccount() {
        await this.createAccountButton.click();
    }

    async clickGoogleSignInButton() {
        await this.page.locator(LoginSelectors.googleLoginButton).click();
    }

    async clickFacebookSignInButton() {
        await this.page.locator(LoginSelectors.facebookLoginButton).click();
    }

    async clickAppleSignInButton() {
        await this.page.locator(LoginSelectors.appleLoginButton).click();
    }

    async loginWithCredentials(username: string, password: string) {
        await this.enterUsername(username);
        await this.clickContinue();
        await this.enterPassword(password);
        await this.clickContinue();
    }

    async verifyUserDirectedToUserDashboard() {
        await expect(this.page).toHaveURL(HUDL_USER_HOMEPAGE);
    }

    async verifyLoginUnsuccessful() {
        await expect(this.page).toHaveURL(HUDL_LOGIN_URL);
    }

    async verifyInvalidEmailMessagePresent() {
        await expect(this.invalidUsernameMessage).toContainText(INVALID_EMAIL_ADDRESS_MESSAGE);
    }

    async verifyInvalidPasswordMessagePresent() {
        await expect(this.invalidPasswordMessage).toContainText(INVALID_PASSWORD_MESSAGE);
    }

    async verifyUserOnUsernameInputPage() {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeHidden();
    }

    async verifyUserOnCreateUserPage() {
        await expect(this.page.locator(LoginSelectors.firstNameInput)).toBeVisible();
        await expect(this.page.locator(LoginSelectors.lastNameInput)).toBeVisible();
        await expect(this.page.locator(LoginSelectors.emailInput)).toBeVisible();
    }

    async verifyUserDirectedToGoogleSignInPage() {
        await expect(this.page).toHaveURL(new RegExp(GOOGLE_SIGNIN_URL_REGEX));
    }

    async verifyUserDirectedToFacebookSignInPage() {
        await expect(this.page).toHaveURL(new RegExp(FACEBOOK_SIGNIN_URL_REGEX));
    }

    async verifyUserDirectedToAppleSignInPage() {
        await expect(this.page).toHaveURL(new RegExp(APPLE_SIGNIN_URL_REGEX));
    }
}