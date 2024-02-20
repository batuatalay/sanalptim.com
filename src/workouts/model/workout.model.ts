import * as mongoose from 'mongoose';

export class workoutModel {
    client_id : string;
    coach_id : string;
    moves : string;
    title : string;
    description : string;
}

export const workoutSchema = new mongoose.Schema({
    client_id : String,
    coach_id : String,
    moves : String,
    title : String,
    description : String
})