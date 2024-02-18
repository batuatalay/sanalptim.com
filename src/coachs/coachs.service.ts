import { Injectable } from '@nestjs/common';
import { CreateCoachDto, UpdateCoachDto } from './dto/coach.dto';
import { ResourceService } from 'libs/resorce.service';
import { coachModel } from './model/coach.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoachsService extends ResourceService<
coachModel,
CreateCoachDto,
UpdateCoachDto> { 
  constructor(@InjectModel('Coach') private readonly coachMongo : Model <coachModel>) {
    super(coachMongo);
  }
  async findByStatus (status : string) {
    return this.coachMongo.find({"status" : status}).exec();
  }
}
