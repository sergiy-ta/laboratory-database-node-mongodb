import BudgetClass from '../interface/class/budget_class';
import Budget from '../interface/object/budget';
import Company from '../interface/object/company';
import Currency from '../interface/object/currency';

import BudgetDatabase from '../database/budget.database';

export default class BudgetModel implements BudgetClass {
    private readonly budgetDatabase: BudgetDatabase;

    constructor() {
        this.budgetDatabase = new BudgetDatabase();
    }

    public async create(company: Company | { _id: string }, number: number, currency: Currency | { _id: string}): Promise<Budget | null> {
        return await this.budgetDatabase.create(company, number, currency);
    }

    public async get(id: string): Promise<Budget | null> {
        return await this.budgetDatabase.get(id);
    }

    public async getList(): Promise<Budget[]> {
        return await this.budgetDatabase.getList();
    }

    public async getListCompany(company: Company | { _id: string }): Promise<Budget[]> {
        return await this.budgetDatabase.getListCompany(company);
    }

    public async update(id: string, number: number, currency: Currency | { _id: string }): Promise<boolean> {
        return await this.budgetDatabase.update(id, number, currency);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.budgetDatabase.delete(id);
    }
}