export class CreateClientDto {
    name : string;
    mail : string;
    username : string;
    password : string;
    status : string;
    created_at : Date;
    last_login : Date;
    properties : string;
}

export class updateClientDto {
    name : string;
    mail : string;
    username : string;
    password : string;
    status : string;
    last_login : Date;
}
