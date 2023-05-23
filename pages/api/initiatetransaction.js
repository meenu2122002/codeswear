const https = require('https');
import Order from "../../models/order.js"
import connectDB  from "../../middlewares/mongoose.js";
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
// const Paytm =require('paytmchecksum');
// const Paytm = require('paytmchecksum');
let jwt = require('jsonwebtoken');



const  handler=async(req, res)=>  {
console.log("ini",req.body)
let neworder=new Order({
    email:req.body.email,
    pincode:req.body.pincode,
    phoneno:req.body.phoneno,
    address:req.body.address,
    name:req.body.name,
    orderId:req.body.oid,
    products:req.body.cart,
    amount:req.body.subtotal,
    token:req.body.token
})
let rest=await neworder.save()
console.log("resp",rest)
// let token = jwt.sign({ orderId: req.body.orderId }, process.env.NEXT_PUBLIC_SECRETKEY,{ expiresIn: "2 days" });
res.status(200).json({orderId:rest.orderId})
    // var paytmParams = {};

    // paytmParams.body = {
    //     "requestType"   : "Payment",
    //     "mid"           :process.env.NEXT_PUBLIC_PAYTM_MID,
    //     "websiteName"   : "YOUR_WEBSITE_NAME",
    //     "orderId"       :req.body.oid,
    //     "callbackUrl"   : "http://localhost:3000/api/posttransaction",
    //     "txnAmount"     : {
    //         "value"     : req.body.subtotal,
    //         "currency"  : "INR",
    //     },
    //     "userInfo"      : {
    //         "custId"    :req.body.email,
    //     },
    // };
    
    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
//     */
//   Paytm.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MKEY).then( async function(checksum){
    
//         paytmParams.head = {
//             "signature"    : checksum
//         };
    
//         // var post_data = JSON.stringify(paytmParams);
//     //     const requestasync=()=>{
//     //         return new Promise((resolve,reject)=>{
//     //             var options = {
    
//     //                 /* for Staging */
//     //                 // hostname: 'securegw-stage.paytm.in',
            
//     //                 /* for Production */
//     //                 hostname: 'securegw.paytm.in',
            
//     //                 port: 443,
//     //                 path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
//     //                 method: 'POST',
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                     'Content-Length': post_data.length
//     //                 }
//     //             };
            
//     //             var response = "";
//     //             var post_req = https.request(options, function(post_res) {
//     //                 post_res.on('data', function (chunk) {
//     //                     response += chunk;
//     //                 });
            
//     //                 post_res.on('end', function(){
//     //                     console.log('Response: ', response);
//     //                     resolve(response.body.txnToken);
//     //                 });
//     //             });
            
//     //             post_req.write(post_data);
//     //             post_req.end();
//     //         })
//     //     }
//     // const res=await requestasync();
//     res.status(200).json({res})
        
//     });
  }
  export default connectDB(handler)