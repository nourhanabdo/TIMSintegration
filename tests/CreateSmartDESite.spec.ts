import { test, expect } from '@playwright/test'
import TIMSloginPage from '../pages/TIMS_loginPage';
import TIMShomePage from '../pages/TIMS_homePage';
import newSitePage from '../pages/TIMS_newSitePage';
import TIMSsiteInfoPage from '../pages/TIMS_siteInfoPage';
import CommanderLoginPage from '../pages/Commander-loginPage';
import CommanderQuickAccessPage from '../pages/Commander_QuickAccessPage';
import CommanderHomePage from '../pages/Commander_homePage';
import CommanderEntityMNGPage from '../pages/Commander-entityMNGpage';
import fs from 'fs';


const userLoginData = JSON.parse(fs.readFileSync('E2E-testData/userLoginData.json', 'utf8'));

test.describe("DE smart site integration", () => {

    let loginObj: TIMSloginPage;
    let homeObj: TIMShomePage;
    let DEsiteObj: newSitePage;
    let siteInfoObj: TIMSsiteInfoPage;

    let commanderLoginObj: CommanderLoginPage;
    let commaderQuickAccObj: CommanderQuickAccessPage;
    let commanderHomeObj: CommanderHomePage;
    let commanderEntityObj: CommanderEntityMNGPage;

    test.beforeEach(async ({ page }) => {
        loginObj = new TIMSloginPage(page);
        homeObj = new TIMShomePage(page);
        DEsiteObj = new newSitePage(page);
        siteInfoObj = new TIMSsiteInfoPage(page);

        commanderLoginObj = new CommanderLoginPage(page);
        commaderQuickAccObj = new CommanderQuickAccessPage(page);
        commanderHomeObj = new CommanderHomePage(page);
        commanderEntityObj = new CommanderEntityMNGPage(page);
    });

    test('create smart DE site in TIMS', async ({ page }) => {

        await loginObj.navigateToURL(userLoginData.timsFullURL);
        await loginObj.login(userLoginData.timsUsername, userLoginData.timsPassword);
        await homeObj.createNewSite();
        await DEsiteObj.createSmartDESite();
        // let TIMSsiteCode = page.locator('lightning-formatted-text').filter({hasText: 'DE-TIMS-'});
        await expect(siteInfoObj.TIMSsiteCode).toBeVisible({ timeout: 60000 });
        console.log("###### Site Code: " + await siteInfoObj.TIMSsiteCode.textContent());
        await siteInfoObj.updateSmartSite();
    })

    test("Find DE site in commander", async ({ page }) => {

        await commanderLoginObj.navigateToURL(userLoginData.commanderURL);
        await commanderLoginObj.login(userLoginData.commanderUernameTxt, userLoginData.commanderPasswordTxt);
        await commaderQuickAccObj.openPortal();
        await commanderHomeObj.clickEntityMNG();
        await commanderEntityObj.searchForSmartSite();

    //new branch
    console.log("")
    })
})

