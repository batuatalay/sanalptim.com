import { Injectable } from '@nestjs/common';
import { CreateMoveDto, UpdateMoveDto } from './dto/move.dto';
import { ResourceService } from 'libs/resorce.service';
import { moveModel } from './model/move.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MovesService extends ResourceService<
moveModel,
CreateMoveDto,
UpdateMoveDto
> {
  constructor (@InjectModel('Move') private readonly moveMongo : Model <moveModel>) {
    super(moveMongo);
  }
  async findByParentID (code : string) {
    let result = await this.findByCode(code);
    let parent = result[0];
    return this.moveMongo.find({"parent_id" : parent.id}).exec();
  }
  async findByCode (code : string) {
     return this.moveMongo.find({"code" : code}).exec();
  }

  async findByID(id : string) {
    let move = await this.moveMongo.find({'_id': id}).exec();
    return move[0];
  }

  async find4workout (ids : string) {
    let result = [];
    let moves = ids.split(',');
   await Promise.all(moves.map(async item => {
      result.push(await this.findByID(item));
    }));
    return result;
  }

  async findParentMoves () {
    let moves = await this.moveMongo.find({'parent_id': ""});
    return moves;
  }
  
}
