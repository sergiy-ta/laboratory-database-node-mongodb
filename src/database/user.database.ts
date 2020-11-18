import { MongoClient, ObjectID } from 'mongodb';

import database from './database';

import UserClass from '../interface/class/user_class';
import User from '../interface/object/user';

export default class UserDatabase implements UserClass {
    private readonly collection: string = "users";

    constructor() { }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(last_name: string, first_name: string, age: number, email: string): Promise<User | null> {
        let promise = new Promise<User | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).insertOne({
                    last_name: last_name,
                    first_name: first_name,
                    age: age,
                    email: email,
                    phone_number: [],
                    address: [],
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

    public get(id: string): Promise<User | null> {
        let promise = new Promise<User | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOne({
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

    public getList(): Promise<User[]> {
        let promise = new Promise<User[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).find({
                    
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

    public addPhoneNumber(id: string, phone_number: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$push': {
                    phone_number: phone_number
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

    public addAddress(id: string, city_id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$push': {
                    address: { city_id: city_id }
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

    public update(id: string, last_name: string, first_name: string, age: number, email: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$set': {
                    last_name: last_name,
                    first_name: first_name,
                    age: age,
                    email: email
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

    public popPhoneNumber(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$pop': {
                    phone_number: -1
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

    public popAddress(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$pop': {
                    address: -1
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
                client.db(database.dbUsers).collection(this.collection).deleteOne({ 
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