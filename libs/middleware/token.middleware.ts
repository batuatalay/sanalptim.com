import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import environment from 'environment';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const authJWT = req.headers.authorization;
    if (req.path !== "/login") { 
        if (!authJWT) {
            throw new HttpException("Forbidden Token", HttpStatus.FORBIDDEN);
        } else {
            try {
                const coach = jwt.verify(
                    authJWT.slice(7),
                    environment.jwtText
                );
                if (coach) {
                    req['coach'] = coach;
                    next();
                } else {
                    throw new HttpException("Oops! Something went wrong", HttpStatus.GATEWAY_TIMEOUT);
                }
            } catch (ex) {
                throw new HttpException(ex.message, HttpStatus.UNAUTHORIZED);
            }
        }
    } else {
        next();
    }
  }
}
