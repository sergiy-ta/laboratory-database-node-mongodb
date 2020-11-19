import CompanyClass from '../interface/class/company_class';
import Company from '../interface/object/company';
import Project from '../interface/object/project';

import CompanyDatabase from '../database/company.database';

export default class CompanyModel implements CompanyClass {
    private readonly companyDatabase: CompanyDatabase;

    constructor() {
        this.companyDatabase = new CompanyDatabase();
    }

    public async create(name: string): Promise<Company | null> {
        return await this.companyDatabase.create(name);
    }

    public async get(id: string): Promise<Company | null> {
        return await this.companyDatabase.get(id);
    }

    public async getList(): Promise<Company[]> {
        return await this.companyDatabase.getList();
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
}