
import mongoose from "mongoose";
const connectDB=handler=>async (req,res)=>{
  if(mongoose.connections[0].readyState){
    return handler(req,res)
  }
  console.log(process.env.MONGODB_URI)
  const a=await mongoose.connect(process.env.MONGODB_URI)
  console.log(a)
  return handler(req,res);
}
export default connectDB;