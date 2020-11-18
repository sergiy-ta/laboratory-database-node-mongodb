import User from '../object/user';

export default interface UserClass {
    create(last_name: string, first_name: string, age: number, email: string): Promise<User | null>;

    get(id: string): Promise<User | null>;

    getList(): Promise<User[]>;

    addPhoneNumber(id: string, phone_number: string): Promise<boolean>;

    addAddress(id: string, city_id: string): Promise<boolean>;

    update(id: string, last_name: string, first_name: string, age: number, email: string): Promise<boolean>;

    popPhoneNumber(id: string): Promise<boolean>;

    popAddress(id: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}