import * as mongoose from 'mongoose';


export class clientPropertyModel {
    client_id : String;
    prop : String;
    value : String;
}

export const ClientPropertySchema = new mongoose.Schema({
    client_id : String,
    prop : String,
    value : String
});