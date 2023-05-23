// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../models/forgot.js"
import connectDB from "../../middlewares/mongoose.js";
import User from "@/models/user.js";
"use strict";
const nodemailer = require("nodemailer");
async function main(text,email) {
    console.log("called")
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'techexploread2@gmail.com',
        pass: 'iwvhitzkqmdoaxrn'
      }
    });
    
    var mailOptions = {
      from: 'techexploread2@gmail.com',
      to: email,
      subject: 'Reset Email',
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
       return "error"
      } else {
        console.log(info)
       return "success"
      }
    });
}


const handler = async (req, res) => {
    //    check email and create user in forgot database and send mail with token
    console.log("hlo")

    // async..await is not allowed in global scope, must use a wrapper


    const user = await User.findOne({ email: req.body.email });
    console.log("user",user)
    if (user) {
        console.log(user)
        let token = Math.floor(Math.random() * Date.now())
        const newforgot = new Forgot({ email: user.email, token: token });
        await newforgot.save();
        let url = `http://localhost:3000/forgot?token=${token}`
        let email = `

Hi ${user.name},

There was a request to change your password!

If you did not make this request then please ignore this email.

Otherwise, please click this link to change your password:${url} 
`
     const rest= await  main(email,req.body.email)
     if(rest =="error"){
        res.status(400).json({error:"error"})
     }
     else {
        res.status(200).json({success:"success"})
     }
    }


    else {
        console.log("err")
        res.status(400).json({ error: "error" })
    }

}
export default connectDB(handler)