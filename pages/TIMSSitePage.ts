import { expect } from '@playwright/test';
import { Page, Locator, FrameLocator } from 'playwright';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

export default class TIMSsiteInfoPage {
  readonly page: Page;
  readonly action: Actions;

  //Header Elements
  readonly sitesTab: Locator;
  readonly newSiteButton: Locator;

  //Create site elements
  readonly siteNameTxt: Locator;
  readonly marketList: Locator;
  readonly smartSiteList: Locator;
  readonly YesSmartSiteOption: Locator;
  readonly lat: Locator;
  readonly long: Locator;
  readonly saveBtn: Locator;
  readonly Region: Locator;
  readonly Country: Locator;

  //Locators for Leases
  readonly select: Locator;
  readonly frame: FrameLocator;
  readonly createNewButton: Locator;

  //Update site elements
  readonly siteStatusEditBtn: Locator;
  readonly siteStatusList: Locator;
  readonly siteStatusOption: Locator;
  readonly criticalSiteList: Locator;
  readonly criticalSiteYes: Locator;
  readonly windZoneList: Locator;
  readonly saveBtn_Details: Locator;
  readonly saveBtn_Address: Locator;
  readonly TIMSsiteCode: Locator;
  //----------------------------------
  readonly searchBoxforTIMSCode: Locator;
  readonly siteRecord: Locator;
  readonly createnewAppButton: Locator;
  readonly projectTab: Locator;
  readonly candidateTab: Locator;
  readonly leaseTab: Locator;
  readonly requestTab: Locator;

  //DE 
  readonly DEmarketOption: Locator;
  readonly DEwindZoneComboBox: Locator;
  readonly DEwindZoneOption: Locator;
  readonly territoryField: Locator;
  readonly territorySearch: Locator;
  readonly territoryOption: Locator;
  readonly timsSiteCodeRecord: string;

  // ES
  readonly ESmarketOption: Locator;
  readonly ESRegion: Locator;
  readonly ESCountry: Locator;
  readonly ESwindZoneOption: Locator;

  //IE
  readonly IEmarketOption: Locator;
  readonly countryComboBox: Locator;
  readonly countryComboxBoxChoice: Locator;
  readonly IEwindZoneOption: Locator;
  readonly countyTxtBox: Locator;

  //HU
  readonly HUmarketOption: Locator;
  readonly HURegion: Locator;
  readonly HUCountry: Locator;
  readonly HUwindZoneOption: Locator;

    //PT
    readonly PTmarketOption: Locator;
    readonly PTRegion: Locator;
    readonly PTCountry: Locator;
    readonly PTwindZoneOption: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.action = new Actions(page);
    this.sitesTab = page.getByRole('button', { name: 'Sites List' });
    this.newSiteButton = page.getByRole('menuitem', { name: 'New Site' });
   this.siteStatusEditBtn = page.locator('div:nth-child(5) > .slds-grid > button').first();
    this.siteStatusList = page.locator('[name="sitetracker__Site_Status__c"]');
    this.siteStatusOption = page.locator('span').filter({ hasText: 'Pipeline' }).first();
    this.criticalSiteList = page.locator('[name="Critical_Site__c"]');
    this.criticalSiteYes = page.locator('span').filter({ hasText: 'Yes' }).first();
    //this.windZoneList = page.getByText('*Wind Zone', { exact: true });
    this.windZoneList=page.locator('xpath=//*[@name="Wind_Zone__c"]');
    this.saveBtn_Details = page.locator('form').filter({ hasText: 'VF Customer Sharing MarketVF' }).locator('button[name="update"]');
    this.saveBtn_Address = page.locator('form').filter({ hasText: 'AddressAddressCountryCountry' }).locator('button[name="update"]');
    //need to pass it as variable to be dynamic record
    //this.siteRecord = page.getByRole('link', { name: `${this.timsSiteCodeRecord}`});
    //this.searchBoxforTIMSCode = page.locator(`[name='Site-search-input']`);
    this.searchBoxforTIMSCode = page.getByPlaceholder('Search this list...');
    this.TIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: '-TIMS-' });
    this.createnewAppButton = page.locator('records-highlights-details-item').filter({ hasText: 'Start New ApplicationCreate' }).getByRole('link');
    this.projectTab = page.getByRole('tab', { name: 'Projects' });
    this.candidateTab = page.getByRole('tab', { name: 'Candidates' });
    this.leaseTab = page.getByRole('tab', { name: 'Leases' });
    this.requestTab = page.getByRole('tab', { name: 'Requests' });

    //Locators for Leases
    this.frame = page.frameLocator('//iframe[contains(@name,"vfFrameId")]').nth(2);
    this.select = this.frame.getByLabel('*Lease Type');
    this.createNewButton = this.frame.getByRole('button', { name: 'Create New' });
    //------------------------------------------------
    this.siteNameTxt = page.locator('[name="Site_Name__c"]');
    this.marketList = page.getByRole('combobox', { name: 'Market' });
    this.Country = page.getByRole('combobox', { name: 'Country' });
    this.smartSiteList = page.getByRole('combobox', { name: 'Smart Site' });
    this.YesSmartSiteOption = page.getByRole('option', { name: 'Yes' });
    this.lat = page.getByLabel('*Lat');
    this.long = page.getByLabel('*Long');
    this.Region = page.getByRole('combobox', { name: 'Region (TDb)' });
    this.saveBtn = page.locator('.slds-button.slds-button_brand');
    //DE
    this.DEmarketOption = page.getByRole('option', { name: 'DE', exact: true }).locator('span').nth(1);
   // this.DEwindZoneOption = page.locator('span').filter({ hasText: '1' }).nth(1);
   this.DEwindZoneComboBox= page.locator('xpath=//button[@name="Wind_Zone__c"]');
   this.DEwindZoneOption = page.getByTitle('0', { exact: true });
    this.territoryField = page.locator('lightning-output-field').filter({ hasText: 'Territory (TDb)Territory (TDb' }).locator('lightning-formatted-lookup');
    this.territorySearch = page.getByPlaceholder('Search Territories...');
    this.territoryOption = page.locator('span').filter({ hasText: 'New Test' }).nth(4);

    // ES 
    this.ESmarketOption = page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.ESCountry = page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.ESRegion = page.getByRole('option', { name: 'R1' }).locator('span').nth(1);
    this.ESwindZoneOption = page.getByTitle('A', { exact: true });


    //IE
    this.IEmarketOption = page.locator('xpath=//*[@title="IE"]');
    this.countryComboBox = page.locator('[name="Country__c"]');
    this.countryComboxBoxChoice = page.getByTitle("IE").locator('nth=1');
    this.IEwindZoneOption = page.getByTitle('1', { exact: true });
    this.countyTxtBox = page.locator('[name="sitetracker__County__c"]');

    //HU
    this.HUCountry = page.getByRole('option', { name: 'HU', exact: true }).locator('span').nth(1);
    this.HUmarketOption = page.locator('xpath=//*[@aria-label="Market"]//span[@title="HU"]');
    this.HURegion = page.locator('xpath=//span[@title="Pest"]');
    this.HUwindZoneOption = page.getByTitle('N/A', { exact: true });

   //PT
   this.PTCountry = page.getByRole('option', { name: 'PT', exact: true }).locator('span').nth(1);
   this.PTmarketOption = page.locator('xpath=//*[@aria-label="Market"]//span[@title="PT"]');
   this.PTRegion = page.locator('xpath=//span[@title="NORTE"]');
  this.PTwindZoneOption = page.getByTitle('0', { exact: true });
  }

  //Function to get the tims code
  @step("Store TIMS site Code")
  async getTIMSCode(): Promise<string> {
    const timsCode = await this.TIMSsiteCode.innerText();
    return timsCode;
  }

  @step("Create new site")
  async createNewSite(): Promise<void> {
    await this.sitesTab.click();
    await this.newSiteButton.click();
  }

  @step("Open Site Page and Select Record")
  async openSite(timsSiteCodeRecord: string): Promise<void> {
    await this.searchBoxforTIMSCode.fill(timsSiteCodeRecord);
    await this.searchBoxforTIMSCode.press('Enter');
    await this.page.getByRole('link', { name: timsSiteCodeRecord }).click();
    //this.siteRecord.click();
  }

  @step("Create Smart DE site in TIMS")
  async createSmartDESite(siteName: string, DECompanyCode: string, lat: string, long: string): Promise<void> {
    await this.siteNameTxt.fill(siteName);
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.action.enterDECompanyCode(DECompanyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.saveBtn.click();
  }

  @step("Create Smart ES site in TIMS")
  async createSmartESSite(siteName: string, EScompanyCode:string, lat: string, long: string): Promise<void> {
    await this.siteNameTxt.fill(siteName);
    await this.marketList.click();
    await this.ESmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.Country.click();
    await this.ESCountry.click();
    await this.Region.click();
    await this.ESRegion.click();
    await this.action.enterESCompanyCode(EScompanyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.saveBtn.click();
  }

  @step("Create Smart IE site in TIMS")
  async createSmartIESite(siteName: string, IEcompanyCode: string, lat: string, long: string, county: string): Promise<void> {
    await this.siteNameTxt.fill(siteName);
    await this.marketList.click();
    await this.IEmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.action.enterIECompanyCode(IEcompanyCode)
    await this.countryComboBox.click();
    await this.page.keyboard.type('I');
    await this.page.keyboard.press('Enter');
    //await this.countryComboxBoxChoice.click();
    await this.countyTxtBox.fill(county);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.saveBtn.click();
  }
  @step("Create Smart HU site in TIMS")
  async createSmartHUSite(siteName: string, HUCompanyCode: string,  lat: string, long: string) :Promise<void>{
    await this.siteNameTxt.fill(siteName);
    await this.marketList.click();
    await this.HUmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.Country.click();
    await this.HUCountry.click();
    await this.Region.click();
    await this.HURegion.click();
   await this.action.enterHUCompanyCode(HUCompanyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.saveBtn.click();
  }

  @step("Create Smart PT site in TIMS")
  async createSmartPTSite(siteName: string, PTCompanyCode: string,  lat: string, long: string) :Promise<void>{
    await this.siteNameTxt.fill(siteName);
    await this.marketList.click();
    await this.PTmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.Country.click();
    await this.PTCountry.click();
    await this.Region.click();
    await this.PTRegion.click();
   await this.action.enterPTCompanyCode(PTCompanyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.saveBtn.click();
  }
  @step("Create DE Normal Site")
  async createNormalSite(siteName: string, companyCode: string, lat: string, long: string): Promise<void> {
    await this.siteNameTxt.fill(siteName);
    await this.action.enterDECompanyCode(companyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.action.saveRecord();
  }

  @step("Update Smart DE site in TIMS")
  async updateDESmartSite(territory: string): Promise<void> {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    console.log("critical site done");
    await this.windZoneList.dblclick();
    console.log("wind list selected");
    await this.DEwindZoneComboBox.click();
    console.log("wind list 2 selected");
    await this.DEwindZoneOption.click();
    console.log("wind option selected");
    await this.saveBtn_Details.click();
    console.log("save btn 1 done");
    await this.territoryField.dblclick();
    console.log("territory btn selected");
    await this.territorySearch.fill(territory);
    await this.territorySearch.click();
    await expect(this.territoryOption).toBeVisible();
    await this.territoryOption.click();
    await this.saveBtn_Address.click();
    await this.page.waitForTimeout(6000);
  }

  @step("Update Smart ES site in TIMS")
  async updateESSmartSite(): Promise<void> {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click({ timeout: 900 });
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.ESwindZoneOption.click();
    await this.saveBtn_Details.click();
    await expect(this.saveBtn_Details).not.toBeVisible();
  }

  @step("Update Smart IE site in TIMS")
  async updateIESmartSite(): Promise<void> {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click({ timeout: 900 });
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.IEwindZoneOption.click();
    await this.saveBtn_Details.click();
    await expect(this.saveBtn_Details).not.toBeVisible();
  }

  @step("Update Smart HU site in TIMS")
  async updateHUSmartSite() {
    console.log("update function started");
    await expect(this.siteStatusEditBtn).toBeVisible();
    console.log("visible");
   await this.siteStatusEditBtn.click();
    await this.siteStatusEditBtn.click();
    console.log("site edit");
    await this.siteStatusList.click();
    await this.siteStatusOption.click({ timeout: 900 });
    console.log("site status entered");
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    console.log("critical site entered");
    await this.windZoneList.click();
    console.log("wind list selected");
    await this.HUwindZoneOption.click();
    console.log("wind entered");
    await this.saveBtn_Details.click();
    console.log("save btn selected");
    await expect(this.saveBtn_Details).not.toBeVisible();
  }
  @step("Update Smart PT site in TIMS")
  async updatePTSmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    console.log("site status list open");
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    console.log("critical site done");
    await this.windZoneList.click();
    await this.PTwindZoneOption.click();
    console.log("critical site done");
    await this.saveBtn_Details.click();
    await expect(this.saveBtn_Details).not.toBeVisible();
  }

  @step("Create New LeaseIn from Site")
  async createNewLeaseInfromSite(): Promise<void> {
    await this.select.selectOption('Lease_In');
    await this.createNewButton.click();
  }

  @step("Create New Lease Out Anchor Tenant from Site")
  async createNewLeaseOutAnchorTenantFromSite(): Promise<void> {
    await this.select.selectOption('Lease-Out Anchor Tenant');
    await this.createNewButton.click();
  }

  @step("Create New Lease Out Third Party Tenant from Site")
  async createNewLeaseOutThirdPartyTenantFromSite(): Promise<void> {
    await this.select.selectOption('Lease-Out 3rd Party Tenant');
    await this.createNewButton.click();
  }

  @step("Create New GLBO from Site")
  async createNewGLBOFromSite(): Promise<void> {
    await this.select.selectOption('GLBO');
    await this.createNewButton.click();
  }

  @step("Upload File from Site")
  async uploadFilefromSite(timsSiteCodeInput: string): Promise<void> {
    await this.openSite(timsSiteCodeInput);
    await this.action.uploadFile();
  }

}