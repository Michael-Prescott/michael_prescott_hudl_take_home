/**
 * Custom Playwright test fixtures for the Hudl E2E test suite
 */
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { UserDashboardPage } from "../pages/userdashboard.page";
import { HomePage } from "../pages/home.page";

/**
 * Definition for the fixtures availble to the Playwright tests in the Hudl E2E test suite
 * - loginPage: An instance of the LoginPage class that provides methods to interact with the Hudl login page
 * - userDashboardPage: An instance of the UserDashboardPage class that provides methods to interact with the Hudl user dashboard page
 */
type TestFixtures = {
    loginPage: LoginPage;
};

/**
 * Extension of the base Playwright test with custom fixtures for the Hudl E2E test suite
 */
export const test = base.extend<TestFixtures>({

    /**
     * Initializes the LoginPage by navigating to the Hudl home landing page and
     * navigating to the login page
     */
    loginPage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateToLoginPage();

        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});