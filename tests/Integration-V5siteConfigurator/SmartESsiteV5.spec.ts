import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as CommanderLoginData from '../../TestData/Commander/userLogin.json'
import * as  timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsSiteData from '../../TestData/TIMS/siteData.json'

let pm;

test.describe("ES smart site integration with V5", async () => {

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
    })

    test("Create smart site in TIMS and search in V5", async ({ page }) => {
        //Create smart site in TIMS
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createSmartESSite(timsSiteData.siteName,  timsSiteData.EScompanyCode, timsSiteData.lat, timsSiteData.long);
        const TIMSsiteCodeText = await pm.siteTIMS().getTIMSCode();
        console.log("###### Site Code in TIMS: " + TIMSsiteCodeText);
        await pm.siteTIMS().updateESSmartSite();

        //Check for smart site in V5
        await pm.loginCommander().navigateToURL(CommanderLoginData.commanderURL);
        await pm.loginCommander().login(await CommanderLoginData.commanderUernameTxt, await CommanderLoginData.commanderPasswordTxt);
        await pm.quickAccessCommander().openSiteConfigurator();
        await pm.v5LandingPage().searchForSmartSite(TIMSsiteCodeText);
    })
})