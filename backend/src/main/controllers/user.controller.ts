import { Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request ,Response} from 'express'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    //registration api
    @Post('/register')
    async register(@Req() req: Request, @Res() res: Response) {
      try {
        res.send(await this.userService.registerUser(req, res));
      } catch (error) {
        res.send(error);
      }
    }

     //login api
    @Post('/login')
    async loginUser(@Req() req: Request, @Res() res: Response) {
        try {
        res.send(await this.userService.loginUser(req, res));
        } catch (error) {
        res.send(error);
        }
  }

}
