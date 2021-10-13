import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request ,Response} from 'express'
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    //get all user api
    @Post('/all-user')
    async allUser(@Req() req: Request, @Res() res: Response) {
      try {
        res.send(await this.chatService.allUser(req, res));
      } catch (error) {
        res.send(error);
      }
    }

    @Post('/save-message')
    async saveMessage(text:any){
      try {
        
        return this.chatService.saveMessage(text)
      } catch (error) {
        // res.send(error);
        return error
      }
    }

    @Post('/get-messages')
    async getMessages(@Req() req: Request, @Res() res: Response){
      try {
        res.send(await this.chatService.getMessages(req, res));
      } catch (error) {
        res.send(error);
      }
    }

    @Post('/disconnected-user')
    async disconnectedUser(@Req() req: Request, @Res() res: Response){
      try {
        res.send(await this.chatService.disconnectedUser(req, res));
      } catch (error) {
        res.send(error);
      }
    }
    @Post('/connected-user')
    async connectedUser(@Req() req: Request, @Res() res: Response){
      try {
        res.send(await this.chatService.connectedUser(req, res));
      } catch (error) {
        res.send(error);
      }
    }
    @Post('/create-chat-id')
    async createChatId(@Req() req: Request, @Res() res: Response){
      try {
        res.send(await this.chatService.createChatId(req, res));
      } catch (error) {
        res.send(error);
      }
    }

    @Post('/update-notification')
    async updateNotificationCount(@Req() req: Request, @Res() res: Response){
      try {
        res.send(await this.chatService.updateNotificationCount(req, res));
      } catch (error) {
        res.send(error);
      }
    }

     @Post('/all-notification')
     async allNotification(@Req() req: Request, @Res() res: Response) {
       try {
         res.send(await this.chatService.allNotification(req, res));
       } catch (error) {
         res.send(error);
       }
     }
}
