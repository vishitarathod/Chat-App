import {Injectable, Req, Res} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Request ,Response} from 'express'
import { Chat } from '../interfaces/chat.interface';

@Injectable()
export class ChatService {
    constructor(@InjectModel('User') private readonly userModel : Model<User>,
    @InjectModel('Chat') private readonly chatModel : Model<Chat>) {}

    //get all user
  async allUser(@Req() req: Request, @Res() res: Response) {
    try {
        // console.log(req.body);
        const users= await this.userModel.find({_id: { $ne: req.body.senderId}})
      return users
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async saveMessage(@Req() req: Request, @Res() res: Response){
    // console.log(req.body);
    try {
        const newMessage= new this.chatModel(req.body)
        const savedMessage = await newMessage.save()
        // console.log(savedMessage)
        return savedMessage;
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getMessages(@Req() req: Request, @Res() res: Response){
    try {
      // console.log(req.body);
    //  const send= await this.chatModel.find({senderId:req.body.senderId,receiverId:req.body.receiverId})

    const messages= await this.chatModel.find({$or: [{senderId:req.body.receiverId,receiverId:req.body.senderId},{senderId:req.body.senderId,receiverId:req.body.receiverId}]})
    
    //  console.log(messages);
     return messages
  } catch (e) {
    res.status(400).send(e);
  }
  }

  async disconnectedUser(@Req() req: Request, @Res() res: Response) {
    try {
        console.log("disconnected.......",req.body);
        var date=new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit',hour12:false})
        console.log(date);
        const updatedUser =await this.userModel.updateOne({_id:req.body.id},{ $set: { lastseen: date } })
       console.log(updatedUser);
      return date
    } catch (e) {
      res.status(400).send(e);
    }
  }
  async connectedUser(@Req() req: Request, @Res() res: Response) {
    try {
        console.log("re1.",req.body);
        const updatedUser =await this.userModel.updateOne({_id:req.body.id},{ $set: { lastseen: "online" } })
       console.log(updatedUser);
      return "online"
    } catch (e) {
      res.status(400).send(e);
    }
  }
}
