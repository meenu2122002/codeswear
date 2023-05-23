import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const productschema= new Schema({
  title:{
    type:String,
    required:true
  },
 
  slug:{
    type:String,
    unique:true
  },
  desc:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true

  },
  category:{
    type:String,
    required:true
  },
  size:{
type:String
  },price:{
    type:Number,
    required:true
  },
  color:{
type:String,

  },
  availability:{
type:Number,
required:true
  },
  
 
  
  },{timestamps:true});

  mongoose.models={}
 
  export default  mongoose.model('Product', productschema);