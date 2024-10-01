import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as CommanderLoginData from '../../TestData/Commander/userLogin.json'
import * as  timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsSiteData from '../../TestData/TIMS/siteData.json'

let pm;

test.describe("DE smart site integration with V5", async () => {

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
    })

    test("Create smart DE site in TIMS and search in V5", async ({ page }) => {
        //Create smart site in TIMS
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createSmartDESite(timsSiteData.siteName,  timsSiteData.DEcompanyCode, timsSiteData.lat, timsSiteData.long);
        
        //get tims site code
        const TIMSsiteCodeText = await pm.siteTIMS().getTIMSCode();
        console.log("###### Site Code in TIMS: " + TIMSsiteCodeText);

        //get site status
        // const siteStatus = await pm.siteTIMS().getSiteStatus();
        // console.log("XXXXX " + siteStatus);

        await pm.siteTIMS().updateDESmartSite(timsSiteData.territory);

        //Check for smart site in V5
        await pm.loginCommander().navigateToURL(CommanderLoginData.commanderURL);
        await pm.loginCommander().login(await CommanderLoginData.commanderUernameTxt, await CommanderLoginData.commanderPasswordTxt);
        await pm.quickAccessCommander().openSiteConfigurator();
        await pm.v5LandingPage().searchForSmartSite(TIMSsiteCodeText);

    })
})