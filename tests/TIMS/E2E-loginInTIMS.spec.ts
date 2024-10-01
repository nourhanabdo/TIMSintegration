import { test } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
let pm;

test.describe("Login in TIMS", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
    });

    test('The user should login successfully in TIMS', async ({ page , baseURL }) => {
        pm = new PageManager(page);
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
        // await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        // await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    })
 })