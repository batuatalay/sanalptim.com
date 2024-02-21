import { Module } from '@nestjs/common';
import { CoachsService } from './coachs.service';
import { CoachsController } from './coachs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoachSchema } from './model/coach.model';
import { WorkoutsModule } from 'src/workouts/workouts.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports : [
    MongooseModule.forFeature([{name: "Coach", schema: CoachSchema}]),
    WorkoutsModule,
    ClientsModule
  ],
  controllers: [CoachsController],
  providers: [CoachsService]
})
export class CoachsModule {}
