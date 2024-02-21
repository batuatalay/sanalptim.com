import { Injectable } from '@nestjs/common';
import { CreateClientDto, updateClientDto } from './dto/client.dto';
import { clientModel } from './model/client.model';
import { ResourceService } from 'libs/resorce.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService extends ResourceService<
clientModel,
CreateClientDto,
updateClientDto> { 
  constructor(@InjectModel('Client') private readonly clientMongo : Model <clientModel>) {
    super(clientMongo);
  }
  async findByStatus (status : string) {
    return this.clientMongo.find({"status" : status}).exec();
  }
  
  async findByUsername (username : string) {
    return this.clientMongo.find({'username' : username});
  }
}
