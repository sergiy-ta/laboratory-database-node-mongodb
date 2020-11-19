import * as fs from 'fs';

const mongodbUrl: string = fs.readFileSync('src/database/mongodb_url.txt', 'utf8');

const dbUsers: string = "users";
const dbProjects: string = "projects";
const dbCompany: string = "companys";

const database = {
    mongodbUrl,
    dbUsers,
    dbProjects,
    dbCompany
}

export default database;