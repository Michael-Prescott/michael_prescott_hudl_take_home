import { expect, Locator, Page } from "@playwright/test";
import { HomeSelectors } from '../selectors/home.selectors';
import { HUDL_URL } from "../fixtures/test-data";

export class HomePage {
    private page: Page;
    private loginDropdown: Locator;
    private hudlLoginOption: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.loginDropdown = page.locator(HomeSelectors.loginDropdown);
        this.hudlLoginOption = page.locator(HomeSelectors.hudlLoginOption);
    }

    async navigateToLoginPage() {
        await this.page.goto(HUDL_URL)
        await this.loginDropdown.click();
        await this.hudlLoginOption.click();
    }

    async navigateToHudlHomePage() {
        await this.page.goto(HUDL_URL);
    }

    async clickLoginDropdown() {
        await this.loginDropdown.click();
    }

    async clickHudlLoginOption() {
        await this.hudlLoginOption.click();
    }
}