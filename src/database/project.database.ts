import { MongoClient, ObjectID } from 'mongodb';

import database from './database';

import ProjectClass from '../interface/class/project_class';
import Project from '../interface/object/project';
import User from '../interface/object/user';

export default class ProjectDatabase implements ProjectClass {
    private readonly collection: string = "projects";

    constructor() { }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(name: string, description: string, responsible_for_the_project: User | { _id: string }): Promise<Project | null> {
        let promise = new Promise<Project | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).insertOne({
                    name: name,
                    description: description,
                    responsible_for_the_project: {
                        _id: new ObjectID(responsible_for_the_project._id.toString())
                    },
                    user_list: [
                        {
                            _id: new ObjectID(responsible_for_the_project._id.toString())
                        }
                    ],
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

    public get(id: string): Promise<Project | null> {
        let promise = new Promise<Project | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).findOne({
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

    public getList(): Promise<Project[]> {
        let promise = new Promise<Project[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).find({
                    
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

    public addUser(id: string, user: User | { _id: string }): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$push': {
                    user_list: {
                        _id: new ObjectID(user._id.toString())
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

    public update(id: string, name: string, description: string, responsible_for_the_project: User | { _id: string }): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$set': {
                    name: name,
                    description: description,
                    responsible_for_the_project: {
                        _id: new ObjectID(responsible_for_the_project._id.toString())
                    },
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

    public popUser(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$pop': {
                    user: -1
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
                client.db(database.dbProjects).collection(this.collection).deleteOne({ 
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