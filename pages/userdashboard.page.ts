import { expect, Locator, Page } from "@playwright/test";
import { UserDashboardSelectors } from '../selectors/userdashboard.selectors';
import { HUDL_URL } from "../fixtures/test-data";

/**
 * Page Object Model for the Hudl User Dashboard Page that contains the necessary methods to interact with the user dashboard page
 */
export class UserDashboardPage {

    private page: Page;

    /**
     * Locators for the commonly used elements on the Hudl user dashboard page
     */
    private userDropdown: Locator;
    private logoutButton: Locator;

    /**
     * Constructor for the UserDashboardPage class
     * @param page - The Playwright Page object representing the current browser page
     */
    constructor(page: Page) {
        this.page = page;

        this.userDropdown = page.locator(UserDashboardSelectors.userDropdown);
        this.logoutButton = page.locator(UserDashboardSelectors.logoutButton);
    }

    // --------------- Combination Helper Methods ---------------
    
    /**
     * Fully logs out the user from the Hudl user dashboard page
     */
    async logoutUser() {
        await this.userDropdown.hover();
        await this.logoutButton.click()
    }

    /**
     * Verifies that the user has successfully logged out by checking the URL
     */
    async verifyLogoutSuccessful() {
        await expect(this.page).toHaveURL(HUDL_URL);
    }

    /**
     * Verifies that the user is on the user dashboard page by checking for the presence of the nav bar and home content
     */
    async verifyUserIsOnUserDashboardPage() {
        await expect(this.page.locator(UserDashboardSelectors.userDashboardNavBar)).toBeVisible();
        await expect(this.page.locator(UserDashboardSelectors.userDashboardHomeContent)).toBeVisible();
    }
}