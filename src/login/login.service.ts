import { HttpException, Injectable } from '@nestjs/common';
import { CoachsService } from 'src/coachs/coachs.service';
import { LoginCoachDto } from 'src/coachs/dto/coach.dto'; 

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
          const result = {
            code :200,
            value : {username : findCoach.coach.username, status : findCoach.coach.status}
          }
          return result;
        } else {
          return {
            status : 401,
            value : "User's password is incoorect"
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
