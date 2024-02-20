import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { workoutSchema } from './model/workout.model';
import { MongooseModule } from '@nestjs/mongoose';
import { MovesService } from 'src/moves/moves.service';
import { MovesModule } from 'src/moves/moves.module';

@Module({
  imports : [
    MongooseModule.forFeature([{name : "Workout", schema: workoutSchema}]),
    MovesModule 
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  
})
export class WorkoutsModule {}
