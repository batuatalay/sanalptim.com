import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { LoginCoachDto } from 'src/coachs/dto/coach.dto';
import { CoachsService } from 'src/coachs/coachs.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() loginCoachDto: LoginCoachDto) {
    return this.loginService.login(loginCoachDto);
  }
}
