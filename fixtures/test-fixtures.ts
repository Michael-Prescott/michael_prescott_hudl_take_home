import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { UserDashboardSelectors } from "../selectors/userdashboard.selectors";
import { UserDashboardPage } from "../pages/userdashboard.page";
import { HomePage } from "../pages/home.page";

type TestFixtures = {
    loginPage: LoginPage;
}

export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        if(await page.locator(UserDashboardSelectors.userDropdown).isVisible()) {
            const userDashboardPage = new UserDashboardPage(page);
            userDashboardPage.logoutUser();
            userDashboardPage.verifyLogoutSuccessful();
        }
        const homePage = new HomePage(page);
        homePage.navigateToLoginPage();
    
        const loginPage = new LoginPage(page);
        await use(loginPage)
    }
});