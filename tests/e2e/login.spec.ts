 import { HomeSelectors } from '../../selectors/home.selectors';
import { test } from '../../fixtures/test-fixtures';
import { config } from "../../utils/env";
import { INVALID_PASSWORD, INVALID_USERNAME, NONEXISTANT_USERNAME, SAMPLE_NAME } from '../../fixtures/test-data';

test('Logging in with valid credentials navigates user to user dashboard page', async ({ loginPage, userDashboardPage }) => {
    await loginPage.loginWithCredentials(config.username, config.password);
    await loginPage.verifyUserDirectedToUserDashboard();
});

test('Log in page prevents user from entering password without a username', async ({ loginPage }) => {
    await loginPage.clickContinue();
    await loginPage.verifyUserOnUsernameInputPage();
});

test('Log in page does not allow user to use an improperly formatted email address', async ({ loginPage }) => {
    await loginPage.enterUsername(INVALID_USERNAME);
    await loginPage.clickContinue();
    await loginPage.verifyInvalidEmailMessagePresent();
});

test('Log in page displays error message when user enters a valid email address and invalid password', async ({ loginPage }) => {
    await loginPage.enterUsername(config.username);
    await loginPage.clickContinue();
    await loginPage.enterPassword(INVALID_PASSWORD);
    await loginPage.clickContinue();
    await loginPage.verifyInvalidPasswordMessagePresent();
});

test('Log in page displays error message when user enter invalid email address and invalid password', async ({ loginPage }) => {
    await loginPage.enterUsername(NONEXISTANT_USERNAME);
    await loginPage.clickContinue();
    await loginPage.enterPassword(INVALID_PASSWORD);
    await loginPage.clickContinue();
    await loginPage.verifyInvalidPasswordMessagePresent();
});

test('Edit username button navigates user back to username entry', async ({ loginPage }) => {
    await loginPage.enterUsername(config.username);
    await loginPage.clickContinue();
    await loginPage.clickEditUsername();
    await loginPage.verifyUserOnUsernameInputPage();
});

test('Create account screen prevents user from creating account without a first name', async ({ loginPage }) => {
    await loginPage.clickCreateAccount();
    await loginPage.enterLastName(SAMPLE_NAME);
    await loginPage.enterEmailAddress(NONEXISTANT_USERNAME);
    await loginPage.clickContinue()
    await loginPage.verifyUserOnCreateUserPage();
});

test('Create account screen prevents user from creating account without a last name', async ({ loginPage }) => {
    await loginPage.clickCreateAccount();
    await loginPage.enterFirstName(SAMPLE_NAME);
    await loginPage.enterEmailAddress(NONEXISTANT_USERNAME);
    await loginPage.clickContinue()
    await loginPage.verifyUserOnCreateUserPage();
});

test('Create account screen prevents user from creating account without an email', async ({ loginPage }) => {
    await loginPage.clickCreateAccount();
    await loginPage.enterFirstName(SAMPLE_NAME);
    await loginPage.enterLastName(SAMPLE_NAME);
    await loginPage.clickContinue()
    await loginPage.verifyUserOnCreateUserPage();
});

/*
test('Google sign in button navigates user to Google auth page', async ({ loginPage }) => {
    await loginPage.clickGoogleSignInButton();
    await loginPage.verifyGoogleSignInPage();
});

test('Facebook sign in button navigates user to Facebook auth page', async ({ loginPage }) => {
    await loginPage.clickFacebookSignInButton();
    await loginPage.verifyFacebookSignInPage();
});

test('Apple sign in button navigates user to Apple auth page', async ({ loginPage }) => {
    await loginPage.clickAppleSignInButton();
    await loginPage.verifyAppleSignInPage();
});
*/

/*
test('', async ({ loginPage }) => {
    
});
*/