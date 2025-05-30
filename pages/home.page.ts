import { expect, Locator, Page } from "@playwright/test";
import { HomeSelectors } from '../selectors/home.selectors';
import { HUDL_URL } from "../fixtures/test-data";

/**
 * Page Object Model for the Hudl Home Page that contains the necessary methods to interact with the home page
 */
export class HomePage {

    private page: Page;

    /**
     * Locators for the commonly used elements on the Hudl home page
     */
    private loginDropdown: Locator;
    private hudlLoginOption: Locator;

    /**
     * Constructor for the HomePage class
     * @param page - The Playwright Page object representing the current browser page
     */
    constructor(page: Page) {
        this.page = page;
        
        this.loginDropdown = page.locator(HomeSelectors.loginDropdown);
        this.hudlLoginOption = page.locator(HomeSelectors.hudlLoginOption);
    }

    // --------------- Combination Helper Methods ---------------

    /**
     * Opens the main Hudl landing page and navigates to the Hudl login page
     */
    async navigateToLoginPage() {
        await this.page.goto(HUDL_URL)
        await this.loginDropdown.click();
        await this.hudlLoginOption.click();
    }
}