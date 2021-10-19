import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //get Access token using jwt
  public getJwtAccessToken(userId: string) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}m`,
    });
    return token;
  }

  //verify access token 
  async verifyAccessToken(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.headers['authorization']) return next(Error());
      const authHeader = req.headers['authorization'];
      const bearerToken = authHeader.split(' ');
      const token = bearerToken[1];
      //verify token
      const user = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });
      // // console.log(user);
      // if (!user) {
      //    res.status(401).json({ error: 'Unauthorized' });
      // }
      // req.payload = payload;
      const userId = user.userId
      next();
  
      // return user.userId;
    } catch (error) {
      throw error
    }
   
  }
}
