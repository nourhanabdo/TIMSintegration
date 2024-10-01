import { Page, Locator } from 'playwright';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import {step} from '../utils/StepDecorator'
import { expect } from 'playwright/test';
import { TIMEOUT } from 'dns';

export default class Actions {
    readonly page: Page;
    readonly newButton: Locator;
    readonly saveButton: Locator;
    readonly nextButton: Locator;
    readonly moreTabs: Locator;
    readonly files: Locator;
    readonly upload: Locator;
    readonly uploadFiles: Locator;
    readonly done: Locator;
    readonly done2: Locator;
    readonly appLuncher: Locator;
    readonly appsSearchbox: Locator;
    readonly objectValue: Locator;
    readonly searchSite: Locator;
    readonly siteValue: Locator;
    readonly customerAccount: Locator;
    readonly customerValue: Locator;
    readonly scopeOfWork: Locator;
    readonly siteConfigRequired: Locator;
    readonly siteConfigRequiredValue: Locator;
    readonly companyCodeTXT: Locator;
    readonly DECompanyCodeOption: Locator;
    readonly EScompanyCodeOption: Locator
    readonly IEcompanyCodeOption: Locator;
    readonly HUcompanyCodeOption: Locator;
    readonly PTcompanyCodeOption: Locator;
    readonly TIMSCode: Locator;

    constructor(page: Page) {
        this.page = page;
        this.TIMSCode = page.locator('lightning-formatted-text');
        this.newButton = page.getByRole('button', { name: 'New' });
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.moreTabs = page.locator('ul').filter({ hasText: 'DetailsProjectsRental' }).getByRole('button');
        //this.moreTabs = page.getByText('MoreTabs');
        //this.moreTabs = page.locator('forcegenerated-flexipageregion_application_record_page_main_application__c__view_js').getByText('MoreTabs');
        this.files = page.getByRole('menuitem', { name: 'Files' });
        //this.upload = page.getByTitle('Upload');
        this.upload = page.getByText('Upload');
        this.uploadFiles = page.getByText('Upload Files', { exact: true });
        this.done = page.getByText('Done');
        this.done2 = page.getByRole('button', { name: 'Done' });
        //this.appLuncher = page.getByTitle('App Launcher');
        this.appLuncher = page.getByRole('button', { name: 'App Launcher' });
        this.appsSearchbox = page.getByPlaceholder('Search apps and items...');
        //this.searchSite = page.getByPlaceholder('Search Sites...');
        this.searchSite = page.getByRole('combobox', { name: 'TIMS Site Code' })
        this.customerAccount = page.getByLabel('*Customer Account');
        this.customerValue = page.getByRole('option', { name: 'Vodafone - DE', exact: true });
        
        //this.customerValue = page.getByText('Vodafone - DE', { exact: true });
        //this.customerValue = page.getByRole('option', { name: 'Vodafone - DE' });
        //this.customerValue = page.getByRole('option', { name: 'Vodafone - DE' });
        //this.customerValue = page.getByText('Vodafone - DE');
        this.scopeOfWork = page.getByLabel('*Scope of Work');
        //this.siteConfigRequired = page.getByRole('combobox', { name: 'Site Config Required (' })
        this.siteConfigRequired = page.getByRole('combobox', { name: 'Site Config Required' });
        this.siteConfigRequiredValue = page.getByText('Standard', { exact: true });
        //this.siteConfigRequiredValue = page.getByRole('option', { name: 'Standard', exact: true }).locator('span').nth(1)
        this.companyCodeTXT = page.getByPlaceholder('Search Company Code...');
        //this.DECompanyCodeOption = page.getByRole('option', { name: 'DE91 DE91' }).locator('span').nth(2);
        this.DECompanyCodeOption= page.getByText('DE91', { exact: true });
        this.EScompanyCodeOption = page.getByRole('option', { name: 'ES91 ES91' }).locator('span').nth(2);
        this.IEcompanyCodeOption = page.getByRole('option', { name: 'IE91 IE91' }).locator('span').nth(2);
        this.HUcompanyCodeOption = page.getByRole('option', { name: 'HU91 HU91' }).locator('span').nth(2);
        this.PTcompanyCodeOption = page.getByRole('option', { name: 'PT91 PT91' }).locator('span').nth(2);



    }

    @step("Get the Created Code")
    async getText(locator: Locator, text: string) :Promise<string>{
        return await this.page.innerText(text);
    }
    
    @step("Create New Object")
    async createNewObject():Promise<void> {
        await this.newButton.click();
    }
    
    @step("Enter DE Company Code")
    async enterDECompanyCode(DEcompanyCode: string):Promise<void>{
        await this.companyCodeTXT.click();
        await this.companyCodeTXT.fill(DEcompanyCode);
        await this.DECompanyCodeOption.click();
    }
    
    @step("Enter ES Company Code")
    async enterESCompanyCode(EScompanyCode: string):Promise<void> {
        await this.companyCodeTXT.click();
        await this.companyCodeTXT.fill(EScompanyCode);
        await this.EScompanyCodeOption.click();
    }
    
    @step("Enter IE Company Code")
    async enterIECompanyCode(IEcompanyCode: string) :Promise<void>{
        await this.companyCodeTXT.click();
        await this.companyCodeTXT.fill(IEcompanyCode);
        await this.IEcompanyCodeOption.click();
    }
    async enterHUCompanyCode(HUcompanyCode: string) {
        await this.companyCodeTXT.click();
        await this.companyCodeTXT.fill(HUcompanyCode);
        await this.HUcompanyCodeOption.click();
    }
    async enterPTCompanyCode(PTcompanyCode: string) {
        await this.companyCodeTXT.click();
        await this.companyCodeTXT.fill(PTcompanyCode);
        await this.PTcompanyCodeOption.click();
    }


    @step("Save The Record")
    async saveRecord() :Promise<void>{
        await this.saveButton.click();
    }
    
    @step("Go to the Next")
    async gotoNext() :Promise<void>{
        await this.nextButton.click();
    }

    @step("search and Open the Object")
    async searchOpenObject(objectName: string):Promise<void>{
        await this.appLuncher.click({ timeout: 150000 });
        await this.appsSearchbox.fill(objectName,{ timeout: 150000 });
        await this.page.getByRole('option', { name: `${objectName}`, exact: true }).click({ timeout: 150000 });
        //await expect(this.page.getByRole('button', { name: 'Sort by: Request ID' })).toBeVisible();
    }

    @step("Enter TIMS Site Code")
    async enterTIMSSiteCode(timsSiteCode: string):Promise<void>{
        await this.searchSite.fill(timsSiteCode);
        await this.searchSite.click();
        await this.page.getByRole('option', { name: `${timsSiteCode}`, exact: true }).click();
    }
    
    @step("Enter the Scope of Work")
    async enterScopeOfWork(scopeText: string):Promise<void> {
        await this.scopeOfWork.fill(scopeText);
    }
    
    @step("Enter The Customer Account")
    async enterCustomerAccount(customerAccount: string):Promise<void> {
        await this.customerAccount.fill(customerAccount);
        await this.customerAccount.click();
        await this.customerValue.click();
    }
    
    @step("Enter The Site Config")
    async enterSiteConfig():Promise<void>{
        await this.siteConfigRequired.click();
        await this.siteConfigRequiredValue.click();
    }
    
    @step("Open the More Option Tab")
    async opemMoreTabs() :Promise<void>{
        await this.moreTabs.click();
    }

    @step("Upload File")
    async uploadFile() :Promise<void>{
        await this.moreTabs.click();
        await this.files.click();
        await this.upload.click();
        //await this.uploadFiles.click();
        let [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.uploadFiles.click(),
        ]);
        await fileChooser.setFiles("./TestData/testUpload.png");
        //await expect(this.page.getByText('1 of 1 file uploaded')).toBeVisible();
        await this.done.click();
        //await expect(this.page.getByLabel('Pending')).toBeVisible();
        await this.done2.click();
    }
    
    @step("Add the Created Records to the Excel Sheet")
    async addRecordtoExcel(recordID: string, index: number):Promise<void>{
        const results: any[] = [];
        try {
            const resultObj = { result: recordID };
            results.push(resultObj);
        } catch (error) {
            results.push({ testName: 'example test', result: 'Failed', error: error.message });
        }
        await this.testWritetoExcel(results, 'C:/Users/AbdoN2/Downloads/Playwright Repo/TIMSintegration/createdRecords.xlsx', index);
    }

    @step("Prepare the File Data")
    async prepareFileData(sheetname: string, title: string, value: string):Promise<void> {
        const worksheetData = [
            [title],
            [value],
        ];
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
        XLSX.writeFile(workbook, 'createdRecords.xlsx');
    }
    
    @step("Get the Created Code Value")
    async getCodeValue():Promise<string|undefined> {
        await this.page.waitForSelector('lightning-formatted-text[slot="primaryField"][lwc-f6gbo863ml-host]');
        const recordIDSelector = await this.page.$('lightning-formatted-text[slot="primaryField"][lwc-f6gbo863ml-host]');
        const recordID = await recordIDSelector?.innerText();
        return recordID;
    }

    @step("Push Values to the Excel sheet")
    async pushValues(value: string) :Promise<any[]>{
        const results: any[] = [];
        try {
            const resultObj = { result: value };
            results.push(resultObj);
        } catch (error) {
            results.push({ testName: 'example test', result: 'Failed', error: error.message });
        }
        return results;
    }  

    @step("Test Write to Excel Sheet")
    async testWritetoExcel(results: any[], filePath: string, index: number) :Promise<void>{
        try {
            if (!Array.isArray(results)) {
                throw new TypeError('The provided results are not an array');
            }
            const fileExists = fs.existsSync(filePath);
            let workbook: XLSX.WorkBook;
            let worksheet: XLSX.WorkSheet;
            if (fileExists) {
                workbook = XLSX.readFile(filePath);
                worksheet = workbook.Sheets[workbook.SheetNames[index]];
            } else {
                workbook = XLSX.utils.book_new();
                worksheet = XLSX.utils.aoa_to_sheet([['Test Name', 'Result', 'Error']]);
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
            }
            const newData = results.map(result => [result.result]);
            XLSX.utils.sheet_add_aoa(worksheet, newData, { origin: -1 });
            XLSX.writeFile(workbook, filePath);
            console.log("Data written to Excel successfully");
        } catch (error) {
            console.error("Error writing to Excel:", error.message);
        }
    }
    
    @step("Read Data from Excel Sheet")
    async readExcelFile(filePath: string, sheetName: string): Promise<string[]> {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][]; // Type assertion
        // Return the last record
        if (data.length > 0) {
            const lastRecord =  data[data.length - 1];
            console.log("last reocr = " + lastRecord);
            return lastRecord;
        } else {
            throw new Error('The sheet is empty.');
        }
    }
}
