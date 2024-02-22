import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { MovesService } from 'src/moves/moves.service';

@Controller('workout')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService,
    private moveService : MovesService) {}

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(createWorkoutDto);
  }
  @Get()
  async get(@Body() body: any) {
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
      case "all":
        return this.workoutsService.findAll();
      case "id":
        return this.workoutsService.find4ID(body.value);
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.delete(id);
  }
}
