import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsSiteData from '../../TestData/TIMS/siteData.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Request", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        pm = new PageManager(page);
        action = new Action(page);
        const env = test.info().project.name;
        const username = env == 'TIMSFULL' ? process.env.TIMSFULL_USERNAME : process.env.TIMSPartial_USERNAME;
        const password = env == 'TIMSFULL' ? process.env.TIMSFULL_PASSWORD : process.env.TIMSPartial_PASSWORD;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);
    
    //     await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
    //     await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
     });

    test('@Regression-The User can create new Remove Unused Equipment Request successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await action.searchOpenObject("Requests");
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('removeUnusedEquipment');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createRemoveUnusedEquipmentRequest(timsSiteData.customerAccount);
        const RequestID = await action.getCodeValue();
        console.log("###### Project ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression-The User can create new Equipment Relocation Request successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await action.searchOpenObject("Requests");
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('equipmentRelocation');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createEquipmentRelocationRequest(timsSiteData.customerAccount);
        const RequestID = await action.getCodeValue();
        console.log("###### Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression-The User can create new Higher Position Request successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await action.searchOpenObject("Requests");
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('higherPositiont');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createHigherPositionRequest(timsSiteData.customerAccount);
        const RequestID = await action.getCodeValue();
        console.log("###### Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression-The User can create new Signal Repeat Request successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await action.searchOpenObject("Requests");
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('signalRepeat');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createSignalRepeatRequest(timsSiteData.customerAccount, timsSiteData.scopeOfWork);
        const RequestID = await action.getCodeValue();
        console.log("###### Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression-The User can create new Site Decommissioning Request successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await action.searchOpenObject("Requests");
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('siteDecommissioning');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createSSiteDecommissioningRequest(timsSiteData.customerAccount, timsSiteData.scopeOfWork);
        const RequestID = await action.getCodeValue();
        console.log("###### Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression-The User can create new Site Offer by TowerCo Request successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await action.searchOpenObject("Requests");
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('siteOfferbyTowerCo');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createSiteOfferbyTowerCoRequest(timsSiteData.customerAccount, timsSiteData.scopeOfWork);
        const RequestID = await action.getCodeValue();
        console.log("###### Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })
})