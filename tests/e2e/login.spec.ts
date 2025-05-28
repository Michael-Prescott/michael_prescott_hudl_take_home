import { HomeSelectors } from '../../selectors/home.selectors';
import { test } from '../../fixtures/test-fixtures';
import { config } from "../../utils/env";

test('login', async ({ loginPage }) => {
    await loginPage.navigate()
    await loginPage.fillUsername(config.username);
    await loginPage.clickContinue();
    await loginPage.fillPassword(config.password);
    await loginPage.clickContinue();
    await loginPage.verifyLoginSuccessful();
});