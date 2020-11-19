import ProjectClass from '../interface/class/project_class';
import Project from '../interface/object/project';

import ProjectDatabase from '../database/project.database';
import User from '../interface/object/user';

export default class ProjectModel implements ProjectClass {
    private readonly projectDatabase: ProjectDatabase;

    constructor() {
        this.projectDatabase = new ProjectDatabase();
    }

    public async create(name: string, description: string, responsible_for_the_project: User | { _id: string }): Promise<Project | null> {
        return await this.projectDatabase.create(name, description, responsible_for_the_project);
    }

    public async get(id: string): Promise<Project | null> {
        return await this.projectDatabase.get(id);
    }

    public async getList(): Promise<Project[]> {
        return await this.projectDatabase.getList();
    } 

    public async addUser(id: string, user: User | { _id: string }): Promise<boolean> {
        return await this.projectDatabase.addUser(id, user);
    }

    public async update(id: string, name: string, description: string, responsible_for_the_project: User | { _id: string }): Promise<boolean> {
        return await this.projectDatabase.update(id, name, description, responsible_for_the_project);
    }

    public async popUser(id: string): Promise<boolean> {
        return await this.projectDatabase.popUser(id);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.projectDatabase.delete(id);
    }
}