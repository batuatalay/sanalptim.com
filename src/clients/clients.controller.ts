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
    /*
      {
        "action" : "all",
        "value" : "all"
      }
    */
    if (body.action == "" || body.value == "") {
      return "Please give true action and value ";
    }
    switch (body.action) {
      case "id":
        return await this.clientsService.find4ID(body.value);
      case "status":
        return this.clientsService.findByStatus(body.value);
      case "workout":
        return await this.clientsService.clientWorkout(body.value);
      case "username":
        return await this.clientsService.findByUsername(body.value);
      case "mail":
        return await this.clientsService.findByMail(body.value);
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
