// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middlewares/mongoose.js";
import Order from "../../models/order.js"
const handler = async (req, res) => {
   let orders=await Order.find({token:req.body.token})


    res.status(200).send(orders)
  }
  export default connectDB(handler)