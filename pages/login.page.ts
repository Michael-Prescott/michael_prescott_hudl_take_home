import { expect, Locator, Page } from "@playwright/test";
import { LoginSelectors } from '../selectors/login.selectors';
import {
    APPLE_SIGNIN_URL_REGEX,
    FACEBOOK_SIGNIN_URL_REGEX,
    GOOGLE_SIGNIN_URL_REGEX,
    HUDL_USER_HOMEPAGE,
    INVALID_EMAIL_ADDRESS_MESSAGE,
    INVALID_PASSWORD_MESSAGE,
    INVALID_USERNAME_AND_PASSWORD_MESSAGE
} from "../fixtures/test-data";

/**
 * Page Object Model for the Hudl Login Page that contains the necessary methods to interact with the login page
 */
export class LoginPage {

    private page: Page;

    /**
     * Locators for the commonly used elements on the Hudl login page.
     * Less frequently used locators are called directly in the methods that use them
     */
    private usernameInput: Locator;
    private passwordInput: Locator;
    private continueButton: Locator;
    private invalidUsernameMessage: Locator;
    private createAccountButton: Locator;
    private invalidPasswordMessage: Locator;
    private editUsernameButton: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private emailInput: Locator;


    /**
     * Constructor for the LoginPage class
     * @param page - The Playwright Page object representing the current browser page
     */
    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator(LoginSelectors.usernameInput);
        this.passwordInput = page.locator(LoginSelectors.passwordInput);
        this.continueButton = page.locator(LoginSelectors.continueButton);
        this.invalidUsernameMessage = page.locator(LoginSelectors.invalidUsernameMessage);
        this.invalidPasswordMessage = page.locator(LoginSelectors.invalidPasswordMessage);
        this.editUsernameButton = page.locator(LoginSelectors.editUsernameButton);
        this.createAccountButton = page.locator(LoginSelectors.createAccountButton);
        this.firstNameInput = page.locator(LoginSelectors.firstNameInput);
        this.lastNameInput = page.locator(LoginSelectors.lastNameInput);
        this.emailInput = page.locator(LoginSelectors.emailInput);
    }

    // --------------- Data Entry Methods ---------------

    /**
     * Enters the username on the main Hudl login page
     * @param username - The username to be entered on the login page
     */
    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    /**
     * Enters the password on the main Hudl login page
     * @param password - The password to be entered on the login page
     */
    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    /**
     * Enters the first name on the create user page
     * @param firstName - The first name to be entered on the create user page
     */
    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Enters the last name on the create user page
     * @param lastName - The last name to be entered on the create user page
     */
    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Enters the email address on the create user page
     * @param email - The email address to be entered on the create user page
     */
    async enterEmailAddress(email: string) {
        await this.emailInput.fill(email);
    }


    // --------------- Button Click Methods ---------------

    /**
     * Clicks the continue button on the main Hudl login page
     */
    async clickContinue() {
        await this.continueButton.click();
    }

    /**
     * Clicks the edit user button on the main Hudl login page
     */
    async clickEditUsername() {
        await this.editUsernameButton.click();
    }

    /**
     * Clicks the create account button on the main Hudl login page
     */
    async clickCreateAccount() {
        await this.createAccountButton.click();
    }

    /**
     * Clicks the Google login button on the main Hudl login page
     */
    async clickGoogleSignInButton() {
        await this.page.locator(LoginSelectors.googleLoginButton).click();
    }

    /**
     * Clicks the Facebook login button on the main Hudl login page
     */
    async clickFacebookSignInButton() {
        await this.page.locator(LoginSelectors.facebookLoginButton).click();
    }

    /**
     * Clicks the Apple login button on the main Hudl login page
     */
    async clickAppleSignInButton() {
        await this.page.locator(LoginSelectors.appleLoginButton).click();
    }


    // --------------- Combination Helper Methods ---------------

    /**
     * Fully logs in a user to Hudl with the provided username and password
     * @param username - The username to be entered on the login page
     * @param password - The password to be entered on the login page
     */
    async loginWithCredentials(username: string, password: string) {
        await this.enterUsername(username);
        await this.clickContinue();
        await this.enterPassword(password);
        await this.clickContinue();
    }


    // --------------- Verification Methods ---------------

    /**
     * Verifies that the user is directed to the user dashboard after a successful login
     */
    async verifyUserDirectedToUserDashboard() {
        await expect(this.page).toHaveURL(HUDL_USER_HOMEPAGE);
    }

    /**
     * Verifies that an invalid email address message is present on the login page from improper email formatting
     */
    async verifyInvalidEmailMessagePresent() {
        await expect(this.invalidUsernameMessage).toContainText(INVALID_EMAIL_ADDRESS_MESSAGE);
    }

    /**
     * Verifies that an invalid password message is present on the login page from an incorrect password
     */
    async verifyInvalidPasswordMessagePresent() {
        await expect(this.invalidPasswordMessage).toContainText(INVALID_PASSWORD_MESSAGE);
    }

    /**
     * Verifies that an invalid passwrod message is present on the login page from an incorrect username and password
     */
    async verifyInvalidUsernameAndPasswordMessagePresent() {
        await expect(this.invalidPasswordMessage).toContainText(INVALID_USERNAME_AND_PASSWORD_MESSAGE);
    }

    /**
     * Verifies that the user is on the initial username input page
     */
    async verifyUserOnUsernameInputPage() {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeHidden();
    }

    /**
     * Verifies that the user is on the create user page
     */
    async verifyUserOnCreateUserPage() {
        await expect(this.page.locator(LoginSelectors.firstNameInput)).toBeVisible();
        await expect(this.page.locator(LoginSelectors.lastNameInput)).toBeVisible();
        await expect(this.page.locator(LoginSelectors.emailInput)).toBeVisible();
    }

    /**
     * Verifies that the user is directed to the Google sign in page
     */
    async verifyUserDirectedToGoogleSignInPage() {
        await expect(this.page).toHaveURL(new RegExp(GOOGLE_SIGNIN_URL_REGEX));
    }

    /**
     * Verifies that the user is directed to the Facebook sign in page
     */
    async verifyUserDirectedToFacebookSignInPage() {
        await expect(this.page).toHaveURL(new RegExp(FACEBOOK_SIGNIN_URL_REGEX));
    }

    /**
     * Verifies that the user is directed to the Apple sign in page
     */
    async verifyUserDirectedToAppleSignInPage() {
        await expect(this.page).toHaveURL(new RegExp(APPLE_SIGNIN_URL_REGEX));
    }
}