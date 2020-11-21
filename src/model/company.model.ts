import CompanyClass from '../interface/class/company_class';
import Company from '../interface/object/company';
import Project from '../interface/object/project';

import CompanyDatabase from '../database/company.database';

import ProjectModel from './project.model';
import BudgetModel from './budget.model';

export default class CompanyModel implements CompanyClass {
    private readonly companyDatabase: CompanyDatabase;

    constructor() {
        this.companyDatabase = new CompanyDatabase();
    }

    public async create(name: string): Promise<Company | null> {
        return await this.companyDatabase.create(name);
    }

    public async get(id: string): Promise<Company | null> {
        let company: Company | null =  await this.companyDatabase.get(id);
        if (company) company.project_list = await this.addProjectToCompany(company);

        return company;
    }

    public async getWithBudget(id: string): Promise<Company | null> {
        let company: Company | null =  await this.companyDatabase.get(id);
        if (company) {
            company.project_list = await this.addProjectToCompany(company);

            let budgetModel: BudgetModel = new BudgetModel();
            company.budget_history = await budgetModel.getListCompany(company);

            let budget_array: number[] = Array.from(company.budget_history, ({ number }) => number);
            company.budget = budget_array.reduce((accamulator, currentValue) => accamulator + currentValue, 0);

            return company;
        } else {
            return company;
        }
    }

    public async getList(): Promise<Company[]> {
        return new Promise<Company[]>(async (resolve) => {
            let company_list: Company[] = await this.companyDatabase.getList();

            if (company_list.length > 0) {
                company_list.forEach(async (company, index: number) => {
                    if (company) company.project_list = await this.addProjectToCompany(company);

                    if (index === company_list.length - 1) resolve(company_list);
                });
            } else {
                resolve(company_list);
            }
        });
    }

    public async getListWithBudget(): Promise<Company[]> {
        return new Promise<Company[]>(async (resolve) => {
            let company_list : Company[] = await this.companyDatabase.getList();

            if (company_list.length > 0) {
                company_list.map(async (company, index: number) => {
                    if (company) company.project_list = await this.addProjectToCompany(company);
    
                    let budgetModel: BudgetModel = new BudgetModel();
                    company.budget_history = await budgetModel.getListCompany(company);
    
                    let budget_array: number[] = Array.from(company.budget_history, ({ number }) => number);
                    company.budget = budget_array.reduce((accamulator, currentValue) => accamulator + currentValue, 0);

                    if (index === company_list.length - 1) resolve(company_list);
                });
            } else {
                resolve(company_list);
            }
        });
        
    }

    public async addProject(id: string, project: Project | { _id: string }): Promise<boolean> {
        return await this.companyDatabase.addProject(id, project);
    }

    public async update(id: string, name: string): Promise<boolean> {
        return await this.companyDatabase.update(id, name);
    }

    public async popProject(id: string): Promise<boolean> {
        return await this.companyDatabase.popProject(id);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.companyDatabase.delete(id);
    }

    private async addProjectToCompany(company: Company): Promise<Project[] | { _id: string; }[]> {
        return new Promise<Project[] | { _id: string; }[]> ((resolve) => {
            let projectModel: ProjectModel = new ProjectModel();

            let project_list: Project[] | { _id: string }[] = company ? company?.project_list : [];
            if (project_list.length > 0) {
                project_list.map(async (project: Project | { _id: string }, index: number) => {
                    let project_more: Project | null = await projectModel.get(project?._id);
                    if (project_more) project_list[index] = project_more;
                    if (index === project_list.length - 1) resolve(project_list);
                });
            } else {
                resolve(project_list);
            }
        });   
    }
}