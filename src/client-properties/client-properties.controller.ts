import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientPropertiesService } from './client-properties.service';
import { CreateClientPropertyDto } from './dto/clientProperty.dto';

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
  async update(@Param('clientID') clientID: string, @Body() CreateClientPropertyDto: CreateClientPropertyDto) {
    let properties =await this.clientPropertiesService.findByClientID(clientID);
    let flag = false;
    properties.map(item => {
      if (item.prop == CreateClientPropertyDto.prop) {
        item.value = CreateClientPropertyDto.value;
        flag = true;
      }
    })
    if(flag) {
      return this.clientPropertiesService.updateProperties(clientID, properties);
    } else {
      return "property doesn't found";
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientPropertiesService.delete(id);
  }
}
