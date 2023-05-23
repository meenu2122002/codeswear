import User from "../../models/user.js"
import connectDB  from "../../middlewares/mongoose.js";
var CryptoJS = require("crypto-js");



const  handler=async(req, res)=> {
    console.log("signup",req.body)
    try {
    if(req.method=='POST'){
        var ciphertext = CryptoJS.AES.encrypt(req.body.password, 'secretkey123').toString();
const user=new User({email:req.body.email,name:req.body.name,password:ciphertext});
await user.save();
res.status(200).json({success:"successful"})
    }
    else{
        res.status(500).json({error:"Please fill the form for signup"})
    }
        

    } catch (error) {
        res.status(500).json({error:error})
    }
}


    
  export default connectDB(handler)