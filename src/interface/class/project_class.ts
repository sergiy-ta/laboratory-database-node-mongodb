import Project from "../object/project";
import User from "../object/user";

export default interface ProjectClass {
    create(name: string, description: string, responsible_for_the_project: User | { _id: string }): Promise<Project | null>;

    get(id: string): Promise<Project | null>;

    getList(): Promise<Project[]>;

    addUser(id: string, user: User | { _id: string }): Promise<boolean>;

    update(id: string, name: string, description: string, responsible_for_the_project: User | { _id: string }): Promise<boolean>;

    popUser(id: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}