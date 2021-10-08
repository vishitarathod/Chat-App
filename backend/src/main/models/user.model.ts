import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age: {
    type:Number,
    required:true
  },
  phoneNo: {
    type:Number,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  lastseen:{
    type:String,

  }
});  
