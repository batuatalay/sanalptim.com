import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { ResourceService } from 'libs/resorce.service';
import { workoutModel } from './model/workout.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WorkoutsService extends ResourceService<
workoutModel,
CreateWorkoutDto,
UpdateWorkoutDto> {
  constructor (@InjectModel('Workout') private readonly workoutMongo : Model <workoutModel>) {
    super(workoutMongo);
  }
  async findByClientID (clientID) {
    return this.workoutMongo.find({'client_id': clientID});
  }
}