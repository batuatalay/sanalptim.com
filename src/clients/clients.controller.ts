import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  async create(@Body() createClientDto: CreateClientDto) {
    let usernameExist = await this.clientsService.findByUsername(createClientDto.username);
    let mailExist = await this.clientsService.findByMail(createClientDto.mail);
    if(usernameExist.status == 200) {
      return {
        status : 400,
        detail : "Bu kullanıcı adında kullanıcı mevcut lütfen başka bir kullanıcı adı kullanınız"
      };
    } else if (mailExist.status == 200) {
      return {
        status : 400,
        detail : "Bu mail adresinde kullanıcı mevcut lütfen başka bir mail adresi kullanınız"
      };
     }
    return this.clientsService.create(createClientDto);
  }
  @Get()
  async get(@Query() body: any) {
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
  async update(@Param('id') id: string, @Body() updateClientDto: updateClientDto) {
    let usernameExist = await this.clientsService.findByUsername(updateClientDto.username);
    let mailExist = await this.clientsService.findByMail(updateClientDto.mail);
    if(usernameExist.status == 200 && usernameExist.client._id != id) {
      return {
        errorCode : 400,
        detail : "Bu kullanıcı adında kullanıcı mevcut lütfen başka bir kullanıcı adı kullanınız"
      };
    } else if (mailExist.status == 200 && mailExist.client._id != id) {
      return {
        errorCode : 400,
        detail : "Bu mail adresinde kullanıcı mevcut lütfen başka bir mail adresi kullanınız"
      };
     }
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      this.clientsService.delete(id);
      this.clientProperty.deleteProperties(id);
      return {
        status : 200,
        detail : "Üye başarıyla silindi"
      }
    } catch (error) {
      return {
        status : "400",
        detail : "Üye silinemedi. Lütfen yöneticinize başvurunuz => " + error 
      }
    }
  }
}
