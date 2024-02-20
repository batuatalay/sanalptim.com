import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.movesService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.movesService.findByCode(code);
  }

  async find(@Param('id') id : string) {
    return this.movesService.find(id);
  }

  @Get('category/:code')
  findMovesByParentID (@Param('code') code: string) {
    return this.movesService.findByParentID(code);
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
