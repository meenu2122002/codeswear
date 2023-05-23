import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const userschema= new Schema({
  name:{
    type:String,
    required:true
  },
 password:{
    type:String,required:true
 },
 email:{type:String,required:true,unique:true}

  
  },{timestamps:true});
mongoose.models={}
  const usermodel=mongoose.model('user', userschema);
  export default usermodel;