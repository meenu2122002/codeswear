// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../models/forgot.js"
import connectDB  from "../../middlewares/mongoose.js";
import User from "@/models/user.js";
var CryptoJS = require("crypto-js");
const  handler=async(req, res)=>  {
    console.log(req.body.token)
const user= await Forgot.findOne({token:req.body.token});
console.log("userre",user)
if(user){
    try {
        var ciphertext = CryptoJS.AES.encrypt(req.body.password, 'secretkey123').toString();
        const newuser =await  User.findOneAndUpdate({email:user.email},{password:ciphertext});
        
        res.status(200).json({newuser,success:"success"})
    } catch (error) {
        console.log("reset",error)
        res.status(500).json({error:"error"})
    }
   

}
else{
    res.status(500).json({error:"error"})
}
  }
  export default connectDB(handler)