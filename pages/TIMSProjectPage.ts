import { Page, Locator } from 'playwright';
import Actions from '../utils/Actions';
import {step} from '../utils/StepDecorator';

export default class TIMSApplicationPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly projectPage: Locator;
    readonly projectTemplate: Locator;
    readonly projectTemplateValue: Locator;
    
    constructor(page: Page) {
        this.actionObj = new Actions(page);
        this.projectPage = page.getByRole('link', { name: 'Projects', exact: true});
        this.projectTemplate = page.getByPlaceholder('Search Project Templates...');
                                
        //page.getByLabel('New Project').getByTitle('New BTS Site');
        this.projectTemplateValue = page.getByRole('option', { name: 'New BTS Site', exact: true });
        //this.projectTemplateValue = page.getByRole('option', { name: 'New BTS Site' }).locator('svg');
    }

    @step("Open Project Page")
    async openProjectPage():Promise<void> {
        await this.projectPage.click();
        this.actionObj.createNewObject();
    }
    
    @step("User Create new Project")
    async createProject(tamplateProject: string):Promise<void>{
        await this.projectTemplate.fill(tamplateProject);
        await this.projectTemplate.click();
        await this.projectTemplateValue.click();
        await this.actionObj.saveRecord();
    }
}