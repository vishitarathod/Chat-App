import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'

  },
  receiverId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  notification_count: {
    type: String,
    default:0
  }
});  


