import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Leases", () => {
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

     test('@Regression-User can Create LeaseIn', async ({ page }) => {
          await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().createNewLeaseIn();
          const LeaseID = await action.getCodeValue();
          console.log("###### Lease ID: " + LeaseID);
          await action.addRecordtoExcel(LeaseID, 4);
     });

     test('@Regression-User can Create Lease-Out Anchor Tenant', async ({ page }) => {
          await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().createNewLeaseOutAnchorTenant();
          const LeaseID = await action.getCodeValue();
          console.log("###### Lease ID: " + LeaseID);
          await action.addRecordtoExcel(LeaseID, 4);
     });

     test('@Regression-User can Create Lease-Out 3rd Party Tenant', async ({ page }) => {
          await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().createNewLeaseOut3rdPartyTenant();
          const LeaseID = await action.getCodeValue();
          console.log("###### Lease ID: " + LeaseID);
          await action.addRecordtoExcel(LeaseID, 4);
     });

     test('@Regression-User can Create GLBO', async ({ page }) => {
          await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().createNewGLBO();
          const LeaseID = await action.getCodeValue();
          console.log("###### Lease ID: " + LeaseID);
          await action.addRecordtoExcel(LeaseID, 4);

     });

})