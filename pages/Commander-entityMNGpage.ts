import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';
import { step } from '../utils/StepDecorator';

export default class CommanderEntityMNGPage {
    readonly page: Page;
    readonly searchTxt: Locator;
    readonly searchBtn: Locator;
    readonly searchResult: Locator;
    readonly propertySearchBox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchTxt = page.locator('xpath=//input[@class="dx-texteditor-input"] [@role="textbox"]');
        this.searchBtn = page.getByLabel('fa fa-search');
        this.searchResult = page.locator('tree-search-item div').first();
    }

    @step("Search for the smart site in Commander")
    async searchForSmartSite(timsSiteCode: string) : Promise<void>{
        await this.searchTxt.fill(timsSiteCode);
        await this.searchBtn.click();

        if (await this.searchResult.isVisible()) {
            console.log("Found Smart Site");
            await expect(this.searchResult).toBeVisible({ timeout: 40000 });
        } else {
            while (!(await this.searchResult.isVisible())) {
                await this.searchBtn.click();
            }
            console.log("Found Smart Site " + timsSiteCode + " in Commander");
        }
    }
}
