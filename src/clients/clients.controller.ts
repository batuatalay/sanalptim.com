import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, updateClientDto } from './dto/client.dto';
import { ClientPropertiesService } from 'src/client-properties/client-properties.service';

@Controller('client')
export class ClientsController {
  constructor(private clientsService: ClientsService,
    private clientProperty: ClientPropertiesService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: updateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }
}
