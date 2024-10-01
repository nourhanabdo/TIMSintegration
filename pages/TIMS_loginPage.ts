import { Page, Locator } from 'playwright';
import { step } from '../utils/StepDecorator';

export default class TIMSloginPage{
    readonly page: Page;
    readonly usernameTxt: Locator;
    readonly passwordTxt: Locator;
    readonly loginBtn: Locator;
    readonly closeBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameTxt = page.locator("#username").filter();
        this.passwordTxt = page.locator("#password");
        this.loginBtn = page.locator("#Login");
        this.closeBtn = page.getByRole('button', { name: 'Close' })
    }
    @step("Navigate to TIMS URL")
    async navigateToURL(timsFullURL: string): Promise<void> {
        await this.page.goto(timsFullURL);
    }

    @step("Login to TIMS")
    async login(timsUsername: string , timsPassword: string):Promise<void> {
        await this.usernameTxt.fill(timsUsername);
        await this.passwordTxt.fill(timsPassword);
        await this.loginBtn.click();
        await this.closeBtn.click(); 
    }
}