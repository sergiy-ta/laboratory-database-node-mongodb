import Company from "../object/company";
import Project from "../object/project";

export default interface CompanyClass {
    create(name: string): Promise<Company | null>;

    get(id: string): Promise<Company | null>;

    getList(): Promise<Company[]>;

    addProject(id: string, project: Project | { _id: string }): Promise<boolean>;

    update(id: string, name: string): Promise<boolean>;

    popProject(id: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}