import Project from "./project";

export default interface Company {
    readonly _id: string;
    name: string;
    project_list: Project[] | {
        _id: string;
    }[];
    readonly date_of_creation: Date;
}