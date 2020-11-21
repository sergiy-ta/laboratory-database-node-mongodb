import BudgetClass from '../interface/class/budget_class';
import Budget from '../interface/object/budget';
import Company from '../interface/object/company';
import Currency from '../interface/object/currency';

import BudgetDatabase from '../database/budget.database';
import CompanyModel from './company.model';

export default class BudgetModel implements BudgetClass {
    private readonly budgetDatabase: BudgetDatabase;

    constructor() {
        this.budgetDatabase = new BudgetDatabase();
    }

    public async create(company: Company | { _id: string }, number: number, currency: Currency | { _id: string}): Promise<Budget | null> {
        return await this.budgetDatabase.create(company, number, currency);
    }

    public async get(id: string): Promise<Budget | null> {
        let budget: Budget | null  = await this.budgetDatabase.get(id);
        let budget_company: Company | undefined;
        if (budget) budget_company = await this.addCompanyToBudget(budget);
        if (budget && budget_company) budget.company = budget_company;
        return budget;
    }

    public async getList(): Promise<Budget[]> {
        return new Promise<Budget[]>(async (resolve) => {
            let budget_list: Budget[] = await this.budgetDatabase.getList();
            if (budget_list.length > 0) {
                budget_list.forEach(async (budget: Budget, index: number) => {
                    let budget_company: Company | undefined;
                    if (budget) budget_company = await this.addCompanyToBudget(budget);
                    if (budget && budget_company) budget.company = budget_company;
                    if (index === budget_list.length - 1) resolve(budget_list);
                });
            } else {
                resolve(budget_list);
            }
        });
    }

    public async getListCompany(company: Company | { _id: string }): Promise<Budget[]> {
        let budget_list: Budget[] = await this.budgetDatabase.getListCompany(company);
        budget_list.forEach(async (budget: Budget) => {
            let budget_company: Company | undefined;
            if (budget) budget_company = await this.addCompanyToBudget(budget);
            if (budget && budget_company) budget.company = budget_company;
        });
        return budget_list;
    }

    public async update(id: string, number: number, currency: Currency | { _id: string }): Promise<boolean> {
        return await this.budgetDatabase.update(id, number, currency);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.budgetDatabase.delete(id);
    }

    private async addCompanyToBudget(budget: Budget): Promise<Company | undefined> {
        return new Promise<Company | undefined>(async (resolve) => {
            let companyModel: CompanyModel = new CompanyModel();
            let company: Company | null = await companyModel.get(budget?.company._id);

            if (company) resolve(company);
        });
    }
}