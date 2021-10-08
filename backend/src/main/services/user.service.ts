import { ConflictException, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Request ,Response} from 'express'
import { GenerateHashPasswordService } from './helper/generate-hash-password.service';
import { AuthenticationService } from './helper/authentication.service';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel : Model<User>,
    private generateHashPasswordService: GenerateHashPasswordService,
    private authenticationService: AuthenticationService,) {}

      //registration function
  async registerUser(@Req() req: Request, @Res() res: Response) {
    try {
      console.log(req.body)
      const count = await this.userModel.count({ phoneNo: req.body.phoneNo });

      if (count > 0) {
        throw new ConflictException(`${req.body.phoneNo} is alreday exits`);
      }

      const hashPassword =
        await this.generateHashPasswordService.generatePassword(
          req.body.password,
        );

        req.body.password = hashPassword;
        const newUser= new this.userModel(req.body)
        const saveduser = await newUser.save()
        return saveduser;

    } catch (e) {
      console.log('=========', e);
      res.status(400).send(e);
    }
  }

  //login function
  async loginUser(@Req() req: Request, @Res() res: Response) {
    try {
        const count = await this.userModel.count({ phoneNo: req.body.phoneNo });

      if (count <= 0) {
        throw new NotFoundException(`${req.body.phoneNo} is not register`);
      }
      // var date=new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit',hour12:false})
      //   console.log(date);
        // await this.userModel.findOneAndUpdate({phoneNo: req.body.phoneNo}, { lastseen: "online" })
      const userOne = await this.userModel.findOne({ phoneNo: req.body.phoneNo });
      const accessToken = await this.authenticationService.getJwtAccessToken(
        userOne._id,
      );
    const userId=userOne._id
      return {userId,accessToken};
    } catch (e) {
      console.log('=========', e);
      res.status(400).send(e);
    }
  }
}
