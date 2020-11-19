import User from "./user";

export default interface Project {
    readonly _id: string;
    name: string;
    description: string;
    responsible_for_the_project: User | {
        _id: string;
    };
    user_list: User[] | {
        _id: string;
    };
    readonly date_of_creation: Date;
}