import { expect, Locator, Page } from "@playwright/test";
import { UserDashboardSelectors } from '../selectors/userdashboard.selectors';
import { HUDL_URL } from "../fixtures/test-data";

export class UserDashboardPage {
    private page: Page;
    private userDropdown: Locator;
    private logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userDropdown = page.locator(UserDashboardSelectors.userDropdown);
        this.logoutButton = page.locator(UserDashboardSelectors.logoutButton);
    }

    async logoutUser() {
        await this.userDropdown.hover();
        await this.logoutButton.click()
    }

    async verifyLogoutSuccessful() {
        await expect(this.page).toHaveURL(HUDL_URL);
    }
}