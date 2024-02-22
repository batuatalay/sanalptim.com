import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovesService } from './moves.service';
import { CreateMoveDto, UpdateMoveDto } from './dto/move.dto';

@Controller('move')
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

  @Post()
  create(@Body() createMoveDto: CreateMoveDto) {
    return this.movesService.create(createMoveDto);
  }
  @Get()
  async get(@Query() body: any) {
    /*
      {
        "action" : "all",
        "value" : "all"
      }
    */
    if (body.action == "" || body.value == "") {
      return "Please give true action and value ";
    }
    switch (body.action) {
      case 'code':
        let codeMove = await this.movesService.findByCode(body.value);
        return codeMove[0];
      case 'id':
        return this.movesService.find(body.value);
      case 'category':
        return this.movesService.findByParentID(body.value);
      case 'all':
        return this.movesService.findAll();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoveDto: UpdateMoveDto) {
    return this.movesService.update(id, updateMoveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movesService.delete(id);
  }
}
