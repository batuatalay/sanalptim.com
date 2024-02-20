import * as mongoose from 'mongoose';

export class moveModel {
    title : string;
    code : string;
    parent_id : string;
    description : string;
    media : string;
}


export const moveSchema = new mongoose.Schema ({
    title : String,
    code : {type : String, unique : true},
    parent_id : String,
    description : String,
    media : String
})