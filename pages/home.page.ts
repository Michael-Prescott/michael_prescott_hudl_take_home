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

    async navigate() {
        await this.page.goto(HUDL_URL)
    }
}