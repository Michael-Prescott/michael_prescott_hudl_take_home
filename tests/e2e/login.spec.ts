import { HomeSelectors } from '../../selectors/home.selectors';
import { test } from '../../fixtures/test-fixtures';
import { config } from "../../utils/env";

test('login happy path', async ({ loginPage }) => {
    await loginPage.fillUsername(config.username);
    await loginPage.clickContinue();
    await loginPage.fillPassword(config.password);
    await loginPage.clickContinue();
    await loginPage.verifyLoginSuccessful();
});

test('login invalid email', async ({ loginPage }) => {
    await loginPage.fillUsername("test");
    await loginPage.clickContinue();
    await loginPage.verifyInvalidEmail();
});