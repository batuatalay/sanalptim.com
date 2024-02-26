import { HttpException, Injectable } from '@nestjs/common';
import { CoachsService } from 'src/coachs/coachs.service';
import { LoginCoachDto } from 'src/coachs/dto/coach.dto'; 
import * as jwt from 'jsonwebtoken';
import environment from 'environment';

@Injectable()
export class LoginService {
  
  constructor(
  private coachService : CoachsService){
  }
  async login(loginData : LoginCoachDto) {
    const findCoach = await this.coachService.findByUsername(loginData.username);
    if(findCoach.status == 200) {
      try {
        let checkPwd;
        await this.coachService.compareHashes(loginData.password,findCoach.coach.password).then(
          (response) => checkPwd = response
        )
        if(checkPwd) {
          const constAuthJwtToken = jwt.sign(
            {username : findCoach.coach.username, status : findCoach.coach.status},
            environment.jwtText,
            {expiresIn: '6h' });
          return {
            status : 200,
            value : constAuthJwtToken
          };
        } else {
          return {
            status : 401,
            value : "User's password is incorrect"
          }
        }
        
      } catch (ex) {
        throw new HttpException("Oppsy poopsy something went worng",420);
      }
    } else {
      return {
        status : 400,
        value : "User doesn't exist"
      }
    }
  }
}
