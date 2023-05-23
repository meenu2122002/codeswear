import Product from "../../models/product.js"
import connectDB  from "../../middlewares/mongoose.js";

const  handler=async(req, res)=> {
    let products=await Product.find();
let tshirts={};
for(let item of products){
  if(item.title in tshirts){
if(item.availability>0 && !tshirts[item.title].color.includes(item.color)){
  tshirts[item.title].color.push(item.color);
}
if(item.availability>0 && !tshirts[item.title].size.includes(item.size)){
  tshirts[item.title].size.push(item.size);
}




  }
  else{
    tshirts[item.title]=JSON.parse(JSON.stringify(item));
    if(item.availability>0){
      tshirts[item.title].color=[item.color];
      tshirts[item.title].size=[item.size];

      

    }
  }
}


    res.status(200).json(tshirts);
  }
  export default connectDB(handler)