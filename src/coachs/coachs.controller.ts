import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoachsService } from './coachs.service';
import { CreateCoachDto, UpdateCoachDto } from './dto/coach.dto';

@Controller('coach')
export class CoachsController {
  constructor(private readonly coachsService: CoachsService) {}

  @Post()
  create(@Body() createCoachDto: CreateCoachDto) {
    return this.coachsService.create(createCoachDto);
  }

  @Get()
  findAll() {
    return this.coachsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachsService.find(id);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status : string) {
    return this.coachsService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachsService.update(id, updateCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachsService.delete(id);
  }
}
