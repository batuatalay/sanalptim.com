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
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let properties = await this.clientProperty.findByClientID(id);
    let client = await this.clientsService.find(id);
    client.properties = properties;
    return client;
  }
  
  @Get('status/:status') 
  async findByStatus (@Param('status') status : string) {
    return this.clientsService.findByStatus(status);
  }

  @Get('workout/:id') 
  async findClientWorkout (@Param('id') id : string) {
    let client = await this.clientsService.find(id);
    let workout = await this.workout.findByClientID(id);
    let workoutMoves = workout[0].moves.split(',');
    let moves = [] ;
    await Promise.all(workoutMoves.map(async item => {
      let move = await this.moveService.findByID(item);
      moves.push(move);

    }));
    let result = {
    client : client,
    workout : workout,
    moves : moves
    }
    return result;
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
