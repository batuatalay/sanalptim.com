import * as mongoose from 'mongoose';
import { clientPropertyModel } from 'src/client-properties/model/client-properties.model';


export class clientModel {
    name : string;
    mail : string;
    username : string;
    password : string;
    created_at : Date;
    last_login : Date;
    properties : clientPropertyModel[];
}


export const ClientSchema = new mongoose.Schema({
    name : String,
    mail : String,
    username : { type: String, unique: true },
    password : String,
    created_at: { type: Date, default: Date.now },
    last_login : Date,
    properties : String
});