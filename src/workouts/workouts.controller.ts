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
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let workout = await this.workoutsService.find(id);
    let workoutMoves = workout.moves.split(',');
    let moves = [] ;
    await Promise.all(workoutMoves.map(async item => {
      let move = await this.moveService.findByID(item);
      moves.push(move);

    }));
    let result = {
      details : workout,
      moves: moves
    }
    return result;
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
