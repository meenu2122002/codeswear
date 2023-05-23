import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const orderschema= new Schema({
  orderId:{
    type:String,
    required:true
  },
  email:{
type:String,
required:true
  },
  pincode:{
type:Number,
required:true
  },
  phoneno:{
type:Number,
required:true
  },
  
  name:{
type:String,
required:true
  },
  
  address:{
type:String,
required:true
  },
  
  products:{
type:Object
  },
  address:{
    type:String,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    default:'Initiated',
    required:true
  },
  paymentinfo:{
    type:Object,

  },
  token:{
    type:String,
    
  }
  },{timestamps:true});
mongoose.models={}
  const ordermodel=mongoose.model('Order', orderschema);
  export default ordermodel

  // export default mongoose.model.User || mongoose.model('User', orderschema);