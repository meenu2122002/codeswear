import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const forgot= new Schema({
  
 email:{type:String,required:true},
 token:{
    type:String,required:true
 }

  
  },{timestamps:true});
mongoose.models={}
  const usermodel=mongoose.model('forgot', forgot);
  export default usermodel;