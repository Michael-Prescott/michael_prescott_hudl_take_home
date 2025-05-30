import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { UserDashboardSelectors } from "../selectors/userdashboard.selectors";
import { UserDashboardPage } from "../pages/userdashboard.page";
import { HomePage } from "../pages/home.page";

type TestFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    userDashboardPage: UserDashboardPage;
};

export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateToLoginPage();
    },

    loginPage: async ({ page }, use) => {    
        const loginPage = new LoginPage(page);
        await use(loginPage)
    },

    userDashboardPage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateToLoginPage();
    }
});