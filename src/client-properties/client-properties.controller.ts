import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientPropertiesService } from './client-properties.service';
import { CreateClientPropertyDto, UpdateClientPropertyDto } from './dto/clientProperty.dto';

@Controller('clientProperties')
export class ClientPropertiesController {
  constructor(private readonly clientPropertiesService: ClientPropertiesService) {}

  @Post()
  create(@Body() createClientPropertyDto: CreateClientPropertyDto) {
    return this.clientPropertiesService.create(createClientPropertyDto);
  }

  @Get()
  findAll() {
    return this.clientPropertiesService.findAll();
  }

  @Get(':clientID')
  findOne(@Param('clientID') clientID: string) {
    return this.clientPropertiesService.findByClientID(clientID);
  }

  @Patch(':clientID')
  async update(@Param('clientID') clientID: string, @Body() createClientPropertyDto: CreateClientPropertyDto) {
    return this.clientPropertiesService.updateProperties(clientID, createClientPropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientPropertiesService.delete(id);
  }
}
