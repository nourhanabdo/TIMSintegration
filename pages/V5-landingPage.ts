import { Page, Locator } from "@playwright/test";
import { step } from "../utils/StepDecorator";
import { expect } from "@playwright/test";

export default class V5LandingPage {

    readonly page: Page;
    readonly timsSearchBox: Locator;
    readonly searchBtn: Locator;
    readonly ellipsisMenu:Locator;
    readonly approveSite:Locator;
    readonly activeState: Locator;
    readonly openSite: Locator;
    readonly staticInformationTab: Locator;
    readonly siteTab: Locator;


    constructor(page: Page) {
        this.page = page
        this.timsSearchBox = page.getByPlaceholder('Enter TIMS code');
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.ellipsisMenu = page.locator('.h-max > .p-4 > div > div')
        this.approveSite = page.locator("xpath=//*[contains(text(),'Approve for Rollout')]");
        this.activeState = page.getByText('Active').nth(2);
        this.openSite =  page.locator('.px-4 > .w-full > .px-4');
        this.staticInformationTab = page.getByRole('button', { name: 'Static Information' });
        this.siteTab = page.getByText('Site', { exact: true });
    }

    @step("Search for the smart site in V5 site configurator")
    async searchForSmartSite(timsSiteCode: string): Promise<void> {

        await expect(this.timsSearchBox).toBeVisible({ timeout: 10000 })
        await this.timsSearchBox.fill(timsSiteCode);
        await this.page.keyboard.press('Enter');

        const SiteCode = this.page.getByRole('cell', { name: timsSiteCode });


        await expect(SiteCode).toBeVisible({ timeout: 5000 }).catch(async () => {
            // Retry mechanism
            while (!(await SiteCode.isVisible())) {
                await this.timsSearchBox.fill(timsSiteCode);
                await this.page.keyboard.press('Enter');
            }
        });
        console.log(`Found Smart Site in V5: ${timsSiteCode}`);

        // if (await SiteCode.isVisible()) {
        //     console.log("Found Smart Site in V5: " + timsSiteCode);
        //     await expect(SiteCode).toBeVisible({ timeout: 5000 });
        // } else {
        //     while (!(SiteCode.isVisible())) {
        //         await this.timsSearchBox.fill(timsSiteCode);
        //         await this.page.keyboard.press('Enter');
        //     }
        //     console.log("Found Smart Site " + timsSiteCode + " in Commander V5");
        // }
        await SiteCode.click();
        await this.ellipsisMenu.click();
        await this.approveSite.click();
        await expect(this.activeState).toHaveText('Active', {timeout:30000});
        await this.openSite.click();
        await this.staticInformationTab.click();
        await this.siteTab.click();
    }
}