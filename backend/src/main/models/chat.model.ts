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
  },
  // tick:{
  //   type: Number
  // }
  send:{
    type : Boolean,
    default:false
  },
  delivered:{
    type : Boolean,
    default:false
  },
  read:{
    type : Boolean,
    default:false
  },
  
  
  

});  


