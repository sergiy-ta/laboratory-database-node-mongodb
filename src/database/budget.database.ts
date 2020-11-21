import { MongoClient, ObjectID } from 'mongodb';

import database from './database';

import BudgetClass from '../interface/class/budget_class';
import Budget from '../interface/object/budget';
import Company from '../interface/object/company';
import Currency from '../interface/object/currency';

export default class BudgetDatabase implements BudgetClass {
    private readonly collection: string = "company_budgets";

    constructor() { }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(company: Company | { _id: string }, number: number, currency: Currency | { _id: string }): Promise<Budget | null> {
        let promise = new Promise<Budget | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbBudgets).collection(this.collection).insertOne({
                    company: { _id: new ObjectID(company._id) },
                    number: number,
                    currency: { _id: currency._id },
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

    public get(id: string): Promise<Budget | null> {
        let promise = new Promise<Budget | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbBudgets).collection(this.collection).findOne({
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

    public getList(): Promise<Budget[]> {
        let promise = new Promise<Budget[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbBudgets).collection(this.collection).find({
                    
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

    public getListCompany(company: Company | { _id: string }): Promise<Budget[]> {
        let promise = new Promise<Budget[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbBudgets).collection(this.collection).find({
                    company: { _id: new ObjectID(company._id) },
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

    public update(id: string, number: number, currency: Currency | { _id: string}): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbBudgets).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$set': {
                    number: number,
                    currency: { _id: new ObjectID(currency._id) },
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
                client.db(database.dbBudgets).collection(this.collection).deleteOne({ 
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