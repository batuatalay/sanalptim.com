import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CoachsService } from './coachs.service';
import { CreateCoachDto, UpdateCoachDto } from './dto/coach.dto';
import { WorkoutsService } from 'src/workouts/workouts.service';
import { ClientsService } from 'src/clients/clients.service';

@Controller('coach')
export class CoachsController {
  constructor(
    private readonly coachsService: CoachsService,
    private readonly workout: WorkoutsService,
    private readonly client: ClientsService
    ) {}

  @Post()
  async create(@Body() createCoachDto: CreateCoachDto) {
    let usernameExist = await this.coachsService.findByUsername(createCoachDto.username);
    let mailExist = await this.coachsService.findByMail(createCoachDto.mail);
    createCoachDto.password = await this.coachsService.convertToHash(createCoachDto.password);
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
    return this.coachsService.create(createCoachDto);
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
      case "all":
        return this.coachsService.findAll();
      case "id":
        return this.coachsService.find(body.value);
      case "status":
        return this.coachsService.findByStatus(body.value);
      case "workout":
        return this.coachsService.findWorkoutByCoachID(body.value);
      case "mail":
        return this.coachsService.findByMail(body.value);
      case "username":
        return this.coachsService.findByUsername(body.value);
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    let usernameExist = await this.coachsService.findByUsername(updateCoachDto.username);
    let mailExist = await this.coachsService.findByMail(updateCoachDto.mail);
    if(usernameExist.status == 200 && usernameExist.coach._id.toString() != id) {
      return {
        status : 400,
        detail : "Bu kullanıcı adında kullanıcı mevcut lütfen başka bir kullanıcı adı kullanınız"
      };
    } else if (mailExist.status == 200 && mailExist.coach._id.toString() != id) {
      return {
        status : 400,
        detail : "Bu mail adresinde kullanıcı mevcut lütfen başka bir mail adresi kullanınız"
      };
     }
    return this.coachsService.update(id, updateCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      this.coachsService.delete(id);
      return {
        status : 200,
        detail : "Antranör başarıyla silindi"
      }
    } catch (error) {
      return {
        status : "400",
        detail : "Antranör silinemedi. Lütfen yöneticinize başvurunuz"
      }
    }
  }
}
