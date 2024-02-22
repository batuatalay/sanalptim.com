import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { ResourceService } from 'libs/resorce.service';
import { workoutModel } from './model/workout.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovesService } from 'src/moves/moves.service';

@Injectable()
export class WorkoutsService extends ResourceService<
workoutModel,
CreateWorkoutDto,
UpdateWorkoutDto> {
  constructor (@InjectModel('Workout') private readonly workoutMongo : Model <workoutModel>,
  private readonly move : MovesService) {
    super(workoutMongo);
  }
  async findByClientID (clientID) {
    return this.workoutMongo.find({'client_id': clientID});
  }

  async findByCoachID (coachID) {
    return this.workoutMongo.find({'coach_id': coachID});
  }

  async find4ID (id : string) {
    let workout = await this.workoutMongo.findById(id);
    let workoutMoves = await this.move.find4workout(workout.moves);
    let result = {
      details : workout,
      moves: workoutMoves
    }
    return result;
  }
}