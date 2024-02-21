import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, updateClientDto } from './dto/client.dto';
import { ClientPropertiesService } from 'src/client-properties/client-properties.service';
import { WorkoutsService } from 'src/workouts/workouts.service';
import { MovesService } from 'src/moves/moves.service';

@Controller('client')
export class ClientsController {
  constructor(private clientsService: ClientsService,
    private clientProperty: ClientPropertiesService,
    private workout : WorkoutsService,
    private moveService : MovesService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
  @Get()
  async get(@Body() body: any) {
    if (body.action == null || body.value == null) {
      return "Please give true action and value ";
    }
    switch (body.action) {
      case "id":
        let properties = await this.clientProperty.findByClientID(body.value);
        let client = await this.clientsService.find(body.value);
        let idResult = {
          client : client,
          properties : properties
        }
        return idResult;
      case "status":
        return this.clientsService.findByStatus(body.value);
      case "workout":
        let client4Workout = await this.clientsService.find(body.value);
        let workout = await this.workout.findByClientID(body.value);
        let workoutMoves = workout[0].moves.split(',');
        let moves = await Promise.all(workoutMoves.map(async item => {
          return this.moveService.findByID(item);
        }));
        let result = {
          client: client4Workout,
          workout: workout,
          moves: moves
        };
        return result;
      case "username":
        let userClient = await this.clientsService.findByUsername(body.value);
        let userProperties = await this.clientProperty.findByClientID(userClient[0]._id.toString());
        let userResult = {
          client: userClient,
          properties: userProperties
        };
        return userResult;
      case "mail":
        let mailClient = await this.clientsService.findByMail(body.value);
        let mailProperties = await this.clientProperty.findByClientID(mailClient[0]._id.toString());
        let mailResult = {
          client: mailClient,
          properties: mailProperties
        };
        return mailResult;

      case "all":
        return this.clientsService.findAll();
      default:
        return "Please give true action and value ";
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: updateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }
}
