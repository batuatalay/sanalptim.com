import * as mongoose from 'mongoose';


export class coachModel {
    name : string;
    mail : string;
    username : string;
    password : string;
    status : string;
    created_at : Date;
    last_login : Date;
    image : string;
}

export const CoachSchema = new mongoose.Schema({
    name : String,
    mail : { type: String, unique: true },
    username : { type: String, unique: true },
    password : String,
    status : { type: String, default: "Active" },
    created_at: { type: Date, default: Date.now },
    last_login : Date,
    image : String
});