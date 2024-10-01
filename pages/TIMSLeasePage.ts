import { Page, Locator, FrameLocator } from 'playwright';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

export default class TIMSLeasePage {
  readonly page: Page;
  readonly actionObj: Actions;
  readonly leaseButton: Locator;
  readonly createNewButton: Locator;
  readonly leaseSelection: Locator;
  readonly select: Locator;
  readonly leaseOutAnchorTenant: Locator;
  readonly leaseOut3rdPartyTenant: Locator;
  readonly GLBO: Locator;
  readonly frame: FrameLocator;
  //readonly createNewNButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.actionObj = new Actions(this.page);
    this.leaseButton = page.getByTitle('Leases');
    //this.createNewButton = page.getByText('value="Create New"');
    this.frame = page.frameLocator('//iframe[contains(@name,"vfFrameId")]').nth(1);
    this.select = this.frame.getByLabel('*Lease Type');
    this.createNewButton = this.frame.getByRole('button', { name: 'Create New' })
  }

  async openLeasePage() {
    await this.leaseButton.click();
    //this.actionObj.createNewObject();
    await this.page.getByRole('button', { name: 'New' }).click();
  }

  async createNewLeaseIn() {
    await this.select.selectOption('Lease_In');
    await this.createNewButton.click();
  }

  async createNewLeaseOutAnchorTenant() {
    await this.select.selectOption('Lease-Out Anchor Tenant');
    await this.createNewButton.click();
  }

  async createNewLeaseOut3rdPartyTenant() {
    await this.select.selectOption('Lease-Out 3rd Party Tenant');
    await this.createNewButton.click();
  }

  async createNewGLBO() {
    await this.select.selectOption('GLBO');
    await this.createNewButton.click();
  }

  async selectLeaseType(leaseType: string) {
    switch (leaseType) {
      case "leaseIn":
        break;

      case "leaseOutAnchorTenant":
        break;

      case "leaseOut3rdPartyTenant":
        break;

      case "GLBO":
        break;

      default:
        console.log("Unknown Lease Selection.");
    }
  }

}