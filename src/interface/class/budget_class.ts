import Budget from "../object/budget";
import Company from "../object/company";
import Currency from "../object/currency";

export default interface BudgetClass {
    create(company: Company | { _id: string }, number: number, currency: Currency | { _id: string }): Promise<Budget | null>;

    get(id: string): Promise<Budget | null>;

    getList(): Promise<Budget[]>;

    getListCompany(company: Company | { _id: string }): Promise<Budget[]>;

    update(id: string, number: number, currency: Currency | { _id: string}): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}