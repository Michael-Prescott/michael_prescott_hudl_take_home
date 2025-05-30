/**
 * E2E tests for the Hudl login page.
 * These tests cover various scenarios including valid and invalid login attempts,
 * account creation, and social media sign-in options.
 */

import { test } from '../../fixtures/test-fixtures';
import { config, MACOS } from "../../utils/env";
import { INVALID_PASSWORD, INVALID_USERNAME, NONEXISTANT_USERNAME, SAMPLE_NAME } from '../../fixtures/test-data';
import { UserDashboardPage } from '../../pages/userdashboard.page';

// Hudl Login Page Test Scenarios
test.describe('Hudl Login Page Test Cases', () => {

    /**
     * TC1: Verify that the user is able to navigate to the user dashboard page by logging in with valid credentials
     * Acceptance Criteria:
     * - User lands on the user dashboard page after logging in with valid credentials
     */
    test('TC1: Logging in with valid credentials navigates user to user dashboard page', async ({ page, loginPage }) => {
        await loginPage.loginWithCredentials(config.username, config.password);
        
        const userDashboardPage = new UserDashboardPage(page);
        await userDashboardPage.verifyUserIsOnUserDashboardPage();
    });

    /**
     * TC2: Verify that the login page does not allow the user to enter a password without a username
     * Acceptance Criteria:
     * - The login page does not display a password input field without a username being entered
     */
    test('TC2: Log in page prevents user from entering password without a username', async ({ loginPage }) => {
        await loginPage.clickContinue();
        await loginPage.verifyUserOnUsernameInputPage();
    });

    /**
     * TC3: Verify that the login page does not allow the user to enter a username that is not in a valid email format
     * Acceptance Criteria:
     * - Entering an improperly formatted email address displays an error message
     */
    test('TC3: Log in page does not allow user to use an improperly formatted email address', async ({ loginPage }) => {
        await loginPage.enterUsername(INVALID_USERNAME);
        await loginPage.clickContinue();
        await loginPage.verifyInvalidEmailMessagePresent();
    });

    /**
     * TC4: Verify that the login page displays an invalid password message when the user enters a valid email address and an invalid password
     * Acceptance Criteria:
     * - The login page displays an invalid password message when an incorrect password is entered
     */
    test('TC4: Log in page displays error message when user enters a valid email address and invalid password', async ({ loginPage }) => {
        await loginPage.enterUsername(config.username);
        await loginPage.clickContinue();
        await loginPage.enterPassword(INVALID_PASSWORD);
        await loginPage.clickContinue();
        await loginPage.verifyInvalidPasswordMessagePresent();
    });

    /**
     * TC5: Verify that login page displays an invalid password message when the user enters a non-existent email address and an invalid password
     * Acceptance Criteria:
     * - The login page displays an invalid password message when a non-existent email address and an incorrect password are entered
     */
    test('TC5: Log in page displays error message when user enter invalid email address and invalid password', async ({ loginPage }) => {
        await loginPage.enterUsername(NONEXISTANT_USERNAME);
        await loginPage.clickContinue();
        await loginPage.enterPassword(INVALID_PASSWORD);
        await loginPage.clickContinue();
        await loginPage.verifyInvalidUsernameAndPasswordMessagePresent();
    });

    /**
     * TC6: Verify that the edit username button on the login page navigates the user back to the username entry page
     * Acceptance Criteria:
     * - Clicking the edit username button navigates the user back to the username input page
     */
    test('TC6: Edit username button navigates user back to username entry', async ({ loginPage }) => {
        await loginPage.enterUsername(config.username);
        await loginPage.clickContinue();
        await loginPage.clickEditUsername();
        await loginPage.verifyUserOnUsernameInputPage();
    });

    /**
     * TC7: Verify that the create account page does not allow the user to create an account without a first name
     * Acceptance Criteria:
     * - The create account page does not generate an account when there is no first name entered
     */
    test('TC7: Create account screen prevents user from creating account without a first name', async ({ loginPage }) => {
        await loginPage.clickCreateAccount();
        await loginPage.enterLastName(SAMPLE_NAME);
        await loginPage.enterEmailAddress(NONEXISTANT_USERNAME);
        await loginPage.clickContinue()
        await loginPage.verifyUserOnCreateUserPage();
    });

    /**
     * TC8: Verify that the create account page does not allow the user to create an account without a last name
     * Acceptance Criteria:
     * - The create account page does not generate an account when there is no last name entered
     */
    test('TC8: Create account screen prevents user from creating account without a last name', async ({ loginPage }) => {
        await loginPage.clickCreateAccount();
        await loginPage.enterFirstName(SAMPLE_NAME);
        await loginPage.enterEmailAddress(NONEXISTANT_USERNAME);
        await loginPage.clickContinue()
        await loginPage.verifyUserOnCreateUserPage();
    });

    /**
     * TC9: Verify that the create account page does not allow the user to create an account without an email address
     * Acceptance Criteria:
     * - The create account page does not generate an account when there is no email address entered
     */
    test('TC9: Create account screen prevents user from creating account without an email', async ({ loginPage }) => {
        await loginPage.clickCreateAccount();
        await loginPage.enterFirstName(SAMPLE_NAME);
        await loginPage.enterLastName(SAMPLE_NAME);
        await loginPage.clickContinue()
        await loginPage.verifyUserOnCreateUserPage();
    });
    
    /**
     * TC10: Verify that the Google sign in button navigates the user to the Google authentication page
     * Acceptance Criteria:
     * - Clicking the Google sign in button redirects the user to the Google authentication page
     */
    test('TC10: Google sign in button navigates user to Google auth page', async ({ loginPage }) => {
        await loginPage.clickGoogleSignInButton();
        await loginPage.verifyUserDirectedToGoogleSignInPage();
    });

    /**
     * TC11: Verify that the Facebook sign in button navigates the user to the Facebook authentication page
     * Acceptance Criteria:
     * - Clicking the Facebook sign in button redirects the user to the Facebook authentication page
     */
    test('TC11: Facebook sign in button navigates user to Facebook auth page', async ({ loginPage }) => {
        await loginPage.clickFacebookSignInButton();
        await loginPage.verifyUserDirectedToFacebookSignInPage();
    });

    /**
     * TC12: Verify that the Apple sign in button navigates the user to the Apple authentication page
     * Acceptance Criteria:
     * - Clicking the Apple sign in button redirects the user to the Apple authentication page
     * Note: This test will be skipped if running on macOS due to OS level prompts interfering 
     *       with the test execution when using Webkit browsers (i.e. Safari)
     */
    test('TC12: Apple sign in button navigates user to Apple auth page', async ({ loginPage }) => {
        test.skip(process.platform === MACOS, 
            'Skipping Apple sign in test on macOS due to OS level prompts interfering with the test execution');

        await loginPage.clickAppleSignInButton();
        await loginPage.verifyUserDirectedToAppleSignInPage();
    });
});