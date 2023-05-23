// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../middlewares/mongoose.js"
import Product from "../../models/product.js"


const handler = async (req, res) => {
  // res.status(200).json(req.body)
  try {
    console.log(req.body)
  if (req.method == 'POST') {
    for (let i = 0; i < req.body.length; i++) {
      let item = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img,
        category: req.body[i].category,

        size: req.body[i].size,
        price: req.body[i].price,
        color: req.body[i].color,

        availability: req.body[i].availability,
        address: req.body[i].address,
        amount: req.body[i].amount,
        status: req.body[i].status

      })
      let res = await item.save();

    }
    res.status(200).json({ success: "success" })



  }
  else {
    res.status(500).json({ error: "no data to post" })
  }
  } catch (error) {
    res.status(500).json({ error:error })
  }
  

}
export default connectDB(handler)