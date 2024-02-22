import { Injectable } from '@nestjs/common';
import { CreateClientDto, updateClientDto } from './dto/client.dto';
import { clientModel } from './model/client.model';
import { ResourceService } from 'libs/resorce.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientPropertiesService } from 'src/client-properties/client-properties.service';
import { WorkoutsService } from 'src/workouts/workouts.service';
import { MovesService } from 'src/moves/moves.service';

@Injectable()
export class ClientsService extends ResourceService<
clientModel,
CreateClientDto,
updateClientDto> { 
  constructor(@InjectModel('Client') private readonly clientMongo : Model <clientModel>,
  private readonly clientProperty : ClientPropertiesService,
  private readonly workout : WorkoutsService,
  private readonly move : MovesService) {
    super(clientMongo);
  }
  async findClientProperties (id : string) {
    return await this.clientProperty.findByClientID(id);
  }
  async find4ID (id: string) {
    let client = await this.clientMongo.findById(id);
    let clientProperties = await this.clientProperty.findByClientID(id);
    let result = {
      client : client,
      properties : clientProperties
    }
    return result;
  }

  async clientWorkout (id: string) {
    let client = await this.clientMongo.findById(id);
    let workout = await this.workout.findByClientID(id);
    let workouts = [];
    let moves = await Promise.all(workout.map(async item => {
      let workout = {
        details : item,
        moves : await this.move.find4workout(item.moves)
      }
      workouts.push(workout);
    }));
    let result = {
      client: client,
      workouts: workouts
    };
    return result;
  }
  async findByStatus (status : string) {
    return this.clientMongo.find({"status" : status}).exec();
  }
  
  async findByUsername (username : string) : Promise <any> {
    let client = await this.clientMongo.find({'username' : username});
    let clientProperties = await this.findClientProperties(client[0]._id.toString());
    let result = {
      client : client[0],
      properties : clientProperties
    }
    return result;
  }
  async findByMail (mail : string) {
    let client = await this.clientMongo.find({'mail' : mail});
    let clientProperties = await this.findClientProperties(client[0]._id.toString());
    let result = {
      client : client[0],
      properties : clientProperties
    }
    return result;
  }
}
