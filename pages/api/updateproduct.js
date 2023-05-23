// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../middlewares/mongoose.js"
import Product from "../../models/product.js"


const handler=async (req, res) =>{
    // res.status(200).json(req.body)
    console.log(req.body)
    if(req.method=='POST'){
        for(let i=0;i<req.body.length;i++){
      let item=await Product.findByIdAndUpdate(req.body[i]._id,req.body[i]);
          
          
    }
    res.status(200).json({sucess:"success"})
  


   }
   else{
    res.status(500).json({error:"no data to post"})
   }
   
  }
  export default connectDB(handler)