import { MongoClient, ObjectID } from 'mongodb';

import database from './database';

import CompanyClass from '../interface/class/company_class';
import Company from '../interface/object/company';
import Project from '../interface/object/project';

export default class CompanyDatabase implements CompanyClass {
    private readonly collection: string = "companys";

    constructor() { }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(name: string): Promise<Company | null> {
        let promise = new Promise<Company | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbCompany).collection(this.collection).insertOne({
                    name: name,
                    project_list: [],
                    date_of_creation: new Date(new Date().toISOString())
                }, (error: any, data: any) => {
                    if (!error) resolve(data['ops'][0] ?? null);
                    else rejects(error);
                });

                client.close();
            }).catch(error => {
                return error;
            });
        });

        return promise;
    }

    public get(id: string): Promise<Company | null> {
        let promise = new Promise<Company | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbCompany).collection(this.collection).findOne({
                    _id: new ObjectID(id)
                }, (error: any, user: any) => {
                    if (!error) resolve(user ?? null);
                    else rejects(error);
                });

                client.close();
            }).catch(error => {
                rejects(error);
            });
        });

        return promise;
    }

    public getList(): Promise<Company[]> {
        let promise = new Promise<Company[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbCompany).collection(this.collection).find({
                    
                }).toArray((error: any, data: any) => {
                    if (!error) resolve(data ?? []);
                    else rejects(error);
                });

                client.close();
            }).catch(error => {
                rejects(error);
            });
        });

        return promise;
    }

    public addProject(id: string, project: Project | { _id: string }): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbCompany).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$push': {
                    project_list: {
                        _id: new ObjectID(project._id.toString())
                    }
                }}, (error: any, user: any) => {
                    if (!error) resolve(user ? true : false);
                    else {
                        rejects(error);
                        resolve(false);
                    }
                });
    
                client.close();
            }).catch(error => {
                rejects(error);
                resolve(false);
            });
        });
        
        return promise;
    }

    public update(id: string, name: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbCompany).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$set': {
                    name: name
                }}, (error: any, user: any) => {
                    if (!error) resolve(user ? true : false);
                    else {
                        rejects(error);
                        resolve(false);
                    }
                });
    
                client.close();
            }).catch(error => {
                rejects(error);
                resolve(false);
            });
        });
        
        return promise;
    }

    public popProject(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbCompany).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$pop': {
                    project_list: -1
                }}, (error: any, user: any) => {
                    if (!error) resolve(user ? true : false);
                    else {
                        rejects(error);
                        resolve(false);
                    }
                });
    
                client.close();
            }).catch(error => {
                rejects(error);
                resolve(false);
            });
        });
        
        return promise;
    }

    public delete(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbCompany).collection(this.collection).deleteOne({ 
                    _id: new ObjectID(id)
                }, (error: any, user: any) => {
                    if (!error) resolve(user ? true : false);
                    else {
                        rejects(error);
                        resolve(false);
                    }
                });
    
                client.close();
            }).catch(error => {
                rejects(error);
                resolve(false);
            });
        });
        
        return promise;
    }
}