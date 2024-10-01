import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { step } from '../utils/StepDecorator';


export default class CommanderLoginPage {
    readonly page: Page;
    readonly commanderUernameTxt: Locator;
    readonly commanderPasswordTxt: Locator;
    readonly commanderLoginBtn: Locator;
    readonly showPass: Locator;


    constructor(page: Page) {
        this.page = page;
        this.commanderUernameTxt = page.locator("#Username");
        this.commanderPasswordTxt = page.locator("#Password");
        this.commanderLoginBtn = page.locator("#btnSubmitLoginForm");
        this.showPass = page.locator(".fa-eye-slash");
    }

    @step("Navigate to Commander")
    async navigateToURL(commanderURL): Promise <void> {
        await this.page.goto(commanderURL)
    }

    async getTitle() {
        return await this.page.title();
    }

    @step("Login to Commander")
    async login(commanderUernameTxt, commanderPasswordTxt): Promise <void> {
        await this.commanderUernameTxt.fill(commanderUernameTxt);
        await this.commanderPasswordTxt.fill(commanderPasswordTxt);
        await this.commanderUernameTxt.waitFor({ state: 'attached' });
        await this.commanderPasswordTxt.waitFor({ state: 'attached' });

        await expect(this.commanderUernameTxt).toHaveValue(commanderUernameTxt);
        await expect(this.commanderPasswordTxt).toHaveValue(commanderPasswordTxt);
        // await this.showPass.click()
        await this.commanderLoginBtn.click();
    }

}