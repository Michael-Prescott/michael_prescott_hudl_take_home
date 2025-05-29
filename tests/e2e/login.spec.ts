import { HomeSelectors } from '../../selectors/home.selectors';
import { test } from '../../fixtures/test-fixtures';
import { config } from "../../utils/env";
import { INVALID_USERNAME } from '../../fixtures/test-data';

test('login happy path', async ({ loginPage }) => {
    await loginPage.fillUsername(config.username);
    await loginPage.clickContinue();
    await loginPage.fillPassword(config.password);
    await loginPage.clickContinue();
    await loginPage.verifyLoginSuccessful();
});

test('login invalid email', async ({ loginPage }) => {
    await loginPage.fillUsername(INVALID_USERNAME);
    await loginPage.clickContinue();
    await loginPage.verifyInvalidEmail();
});