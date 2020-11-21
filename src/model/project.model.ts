import ProjectClass from '../interface/class/project_class';
import Project from '../interface/object/project';
import User from '../interface/object/user';

import ProjectDatabase from '../database/project.database';

import UserModel from './user.model';

export default class ProjectModel implements ProjectClass {
    private readonly projectDatabase: ProjectDatabase;

    constructor() {
        this.projectDatabase = new ProjectDatabase();
    }

    public async create(name: string, description: string, responsible_for_the_project: User | { _id: string }): Promise<Project | null> {
        return await this.projectDatabase.create(name, description, responsible_for_the_project);
    }

    public async get(id: string): Promise<Project | null> {
        let project: Project | null = await this.projectDatabase.get(id);
        
        if (project?.responsible_for_the_project) project.responsible_for_the_project = await this.addResponsibleForTheProject(project);
        if (project) project.user_list = await this.addUserToProject(project);

        return project;
    }

    public async getList(): Promise<Project[]> {
        return new Promise<Project[]>(async (resolve) => {
            let project_list: Project[] = await this.projectDatabase.getList();

            if (project_list.length > 0) {
                project_list.forEach(async (project, index: number) => {
                    if (project?.responsible_for_the_project) project.responsible_for_the_project = await this.addResponsibleForTheProject(project);
                    if (project) project.user_list = await this.addUserToProject(project);

                    if (index === project_list.length - 1) resolve(project_list);
                });
            } else {
                resolve(project_list);
            }
        })
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

    private async addResponsibleForTheProject(project: Project): Promise<User | { _id: string }> {
        let userModel: UserModel = new UserModel();

        let user: User | null = null;
        if (project?.responsible_for_the_project) user = await userModel.get(project.responsible_for_the_project._id);
        if (project?.responsible_for_the_project && user) project.responsible_for_the_project = user;

        return project.responsible_for_the_project; 
    }

    private async addUserToProject(project: Project): Promise<User[] | { _id: string; }[]> {
        return new Promise<User[] | { _id: string }[]> ((resolve) => {
            let userModel: UserModel = new UserModel();

            let user_list: User[] | { _id: string }[] = project ? project?.user_list : [];
            if (user_list.length > 0) {
                user_list.forEach(async (user: User | { _id: string }, index: number) => {
                    let user_more: User | null = await userModel.get(user?._id);
                    if (user_more) user_list[index] = user_more;
                    if (index === user_list.length - 1) resolve(user_list);
                });
            } else {
                resolve(user_list);
            }
        });
    }
}