import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { moveSchema } from './model/move.model';

@Module({
  imports : [
    MongooseModule.forFeature([{name : "Move", schema: moveSchema}])
  ],
  controllers: [MovesController],
  providers: [MovesService],
  exports: [MovesService],
})
export class MovesModule {}
