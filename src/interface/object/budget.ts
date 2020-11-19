import Company from "./company";
import Currency from "./currency";

export default interface Budget {
    readonly _id: string;
    company: Company | { _id: string };
    number: number;
    currency: Currency | { _id: string };
    readonly date_of_creation: Date;
}