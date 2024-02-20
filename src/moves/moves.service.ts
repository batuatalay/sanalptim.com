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
  
}
