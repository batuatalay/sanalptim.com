import { Injectable } from '@nestjs/common';
import { CreateCoachDto, UpdateCoachDto } from './dto/coach.dto';
import { ResourceService } from 'libs/resorce.service';
import { coachModel } from './model/coach.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkoutsService } from 'src/workouts/workouts.service';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class CoachsService extends ResourceService<
coachModel,
CreateCoachDto,
UpdateCoachDto> { 
  constructor(@InjectModel('Coach') private readonly coachMongo : Model <coachModel>,
  private readonly workout : WorkoutsService,
  private readonly client : ClientsService) {
    super(coachMongo);
  }
  async findByStatus (status : string) {
    return this.coachMongo.find({"status" : status}).exec();
  }

  async findWorkoutByCoachID (id :string) {
    let workouts =[];
    let workoutResults = await this.workout.findByCoachID(id);
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

  async findByUsername (username : string) {
    let coach= await this.coachMongo.find({"username" : username});
    if(coach.length>0) {
      return {
        status : 200,
        coach : coach[0]
      };
    } else {
      return {
        status : 400,
        detail : "Antranör Bulunamadı"
      };
    }
  }

  async findByMail (mail : string) {
    let coach= await this.coachMongo.find({"mail" : mail});
    if(coach.length>0) {
      return {
        status : 200,
        coach : coach[0]
      };
    } else {
      return {
        status : 400,
        detail : "Antranör Bulunamadı"
      };
    }
  }
}
