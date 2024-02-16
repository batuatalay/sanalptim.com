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
  constructor(@InjectModel('Client') clientMongo : Model <clientModel>) {
    super(clientMongo);
  }
}
