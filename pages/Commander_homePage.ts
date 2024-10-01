import { Page, Locator } from 'playwright';
import { step } from '../utils/StepDecorator';


export default class CommanderHomePage {
    readonly page: Page;
    readonly entityManagment: Locator;


    constructor(page: Page) {
        this.page = page;
        this.entityManagment = page.locator('xpath=//a[@id="entity-manager"]');
    }

    @step("Select Entity Managment form the Menu in Commander")
    async clickEntityMNG(): Promise <void> {
        await this.entityManagment.click();
    }
}