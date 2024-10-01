import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsProjectData from '../../TestData/TIMS/projectData.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Candidate", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        pm = new PageManager(page);
        action = new Action(page);
        const env = test.info().project.name;
        const username = env == 'TIMSFULL' ? process.env.TIMSFULL_USERNAME : process.env.TIMSPartial_USERNAME;
        const password = env == 'TIMSFULL' ? process.env.TIMSFULL_PASSWORD : process.env.TIMSPartial_PASSWORD;

        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        // await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        // await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);
    });

    test('@Regression-The User can create new Candidate successfully', async ({ page }) => {
        await pm.cadidateObj.openCandidatePage();
        await pm.cadidateObj.openNewCandidate();
        await pm.cadidateObj.createCandidate();
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 90000 });
        const candidateID = await action.getCodeValue();
        console.log("###### Candidate ID: " + candidateID);
        await action.addRecordtoExcel(candidateID, 5);
    })

})