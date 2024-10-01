import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as CommanderLoginData from '../../TestData/Commander/userLogin.json'
import * as  timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsSiteData from '../../TestData/TIMS/siteData.json'

let pm;

test.describe("PT smart site integration", () => {

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
    });
    
    test('@smoke create smart PT site in TIMS', async ({ page }) => {
        //Create PT smart site in TIMS
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createSmartPTSite(timsSiteData.siteName, timsSiteData.PTcompanyCode, timsSiteData.lat, timsSiteData.long);
        const TIMSsiteCodeText = await pm.siteTIMS().getTIMSCode();
        console.log("###### Site Code: " + TIMSsiteCodeText);
        await pm.siteTIMS().updatePTSmartSite(timsSiteData.territory);
        
        //Check for smart site in Commander
        await pm.loginCommander().navigateToURL(CommanderLoginData.commanderURL); 
        await pm.loginCommander().login(await CommanderLoginData.commanderUernameTxt, await CommanderLoginData.commanderPasswordTxt);
        await pm.quickAccessCommander().openPortal();
        await pm.homePageCommander().clickEntityMNG();
        await pm.entityMNGCommander().searchForSmartSite(TIMSsiteCodeText);
    })
})