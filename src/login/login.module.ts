import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { CoachsModule } from 'src/coachs/coachs.module';
import { coachModel } from 'src/coachs/model/coach.model';

@Module({
  imports : [CoachsModule],
  controllers : [LoginController],
  providers : [LoginService, coachModel],
})
export class LoginModule {}
