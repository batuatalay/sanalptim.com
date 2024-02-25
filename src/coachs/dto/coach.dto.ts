export class CreateCoachDto {
    name : string;
    mail : string;
    username : string;
    password : string;
    status : string;
    created_at : Date;
    last_login : Date;
    image : string;
}


export class UpdateCoachDto {
    name : string;
    mail : string;
    username : string;
    password : string;
    status : string;
    last_login : Date;
    image : string;
}

export class LoginCoachDto {
    username : string;
    password : string;
}