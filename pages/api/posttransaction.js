import Order from "../../models/order.js"
import connectDB  from "../../middlewares/mongoose.js";

const handler= async (req, res) =>{
    // // checksum after paytm 
    // // query in database and mark status of person's order as paid
    // // if(req.body.STATUS=='TXN_SUCCESS'){
        
    //     let a= await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:"Paid",paymentinfo:req.body}); 
    //     res.redirect("/order")
    // }
    // else if(req.body.STATUS=="PENDING"){
    //     let a= await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:"Pending",paymentinfo:req.body}); 
    //     res.redirect("/order")
    // }
    // res.status(200).send({body:req.body})
    // res.redirect(`/order?id=${req.body.ORDERID}`)
    res.redirect("/order?id=6436869b2ce51912366688f1")
  }
  
  export default connectDB(handler)