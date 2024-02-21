import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  create(@Body() createCoachDto: CreateCoachDto) {
    return this.coachsService.create(createCoachDto);
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
      case "all":
        return this.coachsService.findAll();
      case "id":
        return this.coachsService.find(body.value);
      case "status":
        return this.coachsService.findByStatus(body.value);
      case "workout":
        let workouts =[];
        let workoutResults = await this.workout.findByCoachID(body.value);
        await Promise.all(workoutResults.map(async item => {
          let client = await this.client.find(item.client_id);
          let obj = {
            title : item.title,
            desc: item.description,
            client : client.name,
            client_mail : client.mail
          }
          workouts.push(obj);
        }));
        return workouts;
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachsService.update(id, updateCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachsService.delete(id);
  }
}
