// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/order.js"
import connectDB  from "../../middlewares/mongoose.js";
let jwt = require('jsonwebtoken');


const  handler=async(req, res)=>  {
    let item= jwt.verify(req.body.myordertoken,process.env.NEXT_PUBLIC_SECRETKEY)
 if(item){
let order= await Order.findOne({orderId:item.orderId});
if(order){
    res.status(200).json(order);
}
else{
    res.status(400).json({error:"no orderid"})
}
 }
 else{
    res.status(400).json({error:"no token found"})
 }
  }
  export default connectDB(handler)