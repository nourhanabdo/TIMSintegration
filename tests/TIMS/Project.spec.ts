import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsProjectData from '../../TestData/TIMS/projectData.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Projects", () => {
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

    test('@Regression-The User can create new Project successfully', async ({ page }) => {
        await pm.projectTIMS().openProjectPage();
        await pm.projectTIMS().createProject(timsProjectData.projectTamplate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 90000 });
        const projectID = await action.getCodeValue();
        console.log("###### Project ID: " + projectID);
        await action.addRecordtoExcel(projectID, 2);
    })

})