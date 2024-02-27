import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginCoachDto } from 'src/coachs/dto/coach.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() loginCoachDto: LoginCoachDto) {
    return this.loginService.login(loginCoachDto);
  }
}
