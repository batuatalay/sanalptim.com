import { Module } from '@nestjs/common';
import { CoachsService } from './coachs.service';
import { CoachsController } from './coachs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoachSchema } from './model/coach.model';

@Module({
  imports : [
    MongooseModule.forFeature([{name: "Coach", schema: CoachSchema}]),
  ],
  controllers: [CoachsController],
  providers: [CoachsService],
})
export class CoachsModule {}
