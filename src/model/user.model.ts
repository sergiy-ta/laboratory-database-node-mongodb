import UserClass from '../interface/class/user_class';
import User from '../interface/object/user';

import UserDatabase from '../database/user.database';

export default class UserModel implements UserClass {
    private readonly userDatabase: UserDatabase;

    constructor() { 
        this.userDatabase = new UserDatabase();
    }

    public async create(last_name: string, first_name: string, age: number, email: string): Promise<User | null> {
        return this.userDatabase.create(last_name, first_name, age, email);
    }

    public async get(id: string): Promise<User | null> {
        return this.userDatabase.get(id);
    }

    public async getList(): Promise<User[]> {
        return this.userDatabase.getList();
    }

    public async addPhoneNumber(id: string, phone_number: string): Promise<boolean> {
        return this.userDatabase.addPhoneNumber(id, phone_number);
    }

    public async addAddress(id: string, city_id: string): Promise<boolean> {
        return this.userDatabase.addAddress(id, city_id);
    }

    public async update(id: string, last_name: string, first_name: string, age: number, email: string): Promise<boolean> {
        return this.userDatabase.update(id, last_name, first_name, age, email);
    }

    public async popPhoneNumber(id: string): Promise<boolean> {
        return this.userDatabase.popPhoneNumber(id);
    }

    public async popAddress(id: string): Promise<boolean> {
        return this.userDatabase.popAddress(id);
    }

    public async delete(id: string): Promise<boolean> { 
        return this.userDatabase.delete(id);
    }
}