import { Page, Locator } from 'playwright';
import { step } from '../utils/StepDecorator';

export default class CommanderQuickAccessPage {
    readonly page: Page;
    readonly portal: Locator;
    readonly siteConfigurator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.portal = page.locator('#recently-used-apps').getByRole('link', { name: 'Portal Portal' });
        this.siteConfigurator = page.getByRole('link', { name: 'site-configurator site-' });
    }

    @step("Select Portal in Commander Quick Access")
    async openPortal(): Promise <void> {
        await this.portal.click();
    }


    @step("Select site configurator in Commander Quick Access")
    async openSiteConfigurator(): Promise <void> {
        await this.siteConfigurator.dblclick();
    }
}