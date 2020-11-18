import * as fs from 'fs';

const mongodbUrl: string = fs.readFileSync('src/database/mongodb_url.txt', 'utf8');

const dbUsers: string = "users";

const database = {
    mongodbUrl,
    dbUsers
}

export default database;