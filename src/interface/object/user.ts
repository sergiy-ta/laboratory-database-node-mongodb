export default interface User {
    readonly _id: string,
    last_name: string,
    first_name: string,
    age: number,
    email: string,
    phone_number: string[],
    address: {
        city_id: string,
    }[];
    readonly date_of_creation: Date
}