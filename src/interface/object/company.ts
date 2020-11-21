import Budget from "./budget";
import Project from "./project";

export default interface Company {
    readonly _id: string;
    name: string;
    budget?: number;
    budget_history?: Budget[];
    project_list: Project[] | {
        _id: string;
    }[];
    readonly date_of_creation: Date;
}