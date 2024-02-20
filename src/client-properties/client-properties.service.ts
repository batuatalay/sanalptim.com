import { Injectable } from '@nestjs/common';
import { CreateClientPropertyDto, UpdateClientPropertyDto } from './dto/clientProperty.dto';
import { ResourceService } from 'libs/resorce.service';
import { clientPropertyModel } from './model/client-properties.model';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Injectable()
export class ClientPropertiesService extends ResourceService<
clientPropertyModel,
CreateClientPropertyDto,
UpdateClientPropertyDto> { 
  constructor(@InjectModel('ClientProperty') private readonly clientPropertyMongo : Model <clientPropertyModel>) {
    super(clientPropertyMongo);
  }

  async findByClientID (clientID : string) {
    let results = await this.clientPropertyMongo.find({"client_id" : clientID}).exec();
    return results;
  }

  async updateProperties (clientID : string, body : any) {
    await this.clientPropertyMongo.deleteMany({"client_id" : clientID});
    await this.clientPropertyMongo.insertMany(body);
    return "Property Update Successfully";
  }
}
