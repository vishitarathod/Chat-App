import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'

  },
  receiverId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  message: {
    type: String
  },
  time:{
    type:String
  }
});  
