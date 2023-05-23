import User from "../../models/user.js"
import connectDB from "../../middlewares/mongoose.js";
import { useRouter } from 'next/router'
let CryptoJS = require("crypto-js");
let jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    console.log("login", req.body)
    try {
        if (req.method == 'POST') {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                let bytes = CryptoJS.AES.decrypt(user.password, 'secretkey123');
                let originalText = bytes.toString(CryptoJS.enc.Utf8);

                // console.log(originalText)
                if (originalText == req.body.password) {
                    console.log("hello")
                    let token = jwt.sign({ email: user.email }, 'shhhhh',{ expiresIn: 1000 });
                    // console.log(token)
                  
                    res.status(200).json({ success: "successful",token })


                }
            }
            else {
                res.status(500).json({ error: "Please enter the valid credentails" })
            }
        }
        else {
            res.status(500).json({ error: "Please enter the valid credentails" })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}



export default connectDB(handler)