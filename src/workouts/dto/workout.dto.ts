export class CreateWorkoutDto {
    client_id : String;
    coach_id : String;
    moves : String;
    title : String;
    description : string;
}

export class UpdateWorkoutDto {
    moves : String;
    title : String;
    description : String;
}
