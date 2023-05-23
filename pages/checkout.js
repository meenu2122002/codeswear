import React, { useState } from 'react'
import Context from "./components/mcontext"
import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BsFillBagCheckFill } from "react-icons/bs"
import Script from 'next/script';
import { RiOrderPlayFill } from 'react-icons/ri';





const Checkout = () => {
  const router = useRouter()
  const [disable, setdisable] = useState(true)
  const [orderinguser, setorderinguser] = useState({ name: "", email: "", address: "", phoneno: 0, pincode: "", state: "", city: "" })


  const handlechange = async (e) => {
    if(e.target.id!="pincode"){
      setorderinguser({ ...orderinguser, [e.target.id]: e.target.value });
      console.log( "other",orderinguser)
    }
  else{
    setorderinguser({ ...orderinguser, [e.target.id]: e.target.value });
    console.log( "pin",orderinguser)
    if (e.target.value.length == 6) {
      console.log("hello")
      const res = await fetch("http://localhost:3000/api/pincode");
      const dt = await res.json();
      if (Object.keys(dt).includes(orderinguser.pincode.toString())) {
        console.log("hellos")
        setorderinguser({ name: orderinguser.name, email: orderinguser.email, address: orderinguser.address, phoneno: orderinguser.phoneno, pincode: orderinguser.pincode, state: dt[orderinguser.pincode.toString()][0], city: dt[orderinguser.pincode.toString()][1] });
      }
      // else {
      //   setorderinguser({ ...orderinguser, [e.target["state"]]: "" })
      //   setorderinguser({ ...orderinguser, [e.target["city"]]: "" })
      // }
    }
    // else{
    //   setorderinguser({ ...orderinguser, [e.target["state"]]: "" })
    //     setorderinguser({ ...orderinguser, [e.target["city"]]: "" })
    //     setdisable(true)
    // }
  }
    
    if (orderinguser.name.length > 3 && orderinguser.email.endsWith("@gmail.com") && orderinguser.address.length > 3 && orderinguser.pincode.length == 6 && orderinguser.name.length > 10) {
      setdisable(false)
      console.log(disable)
    }
    else {
      setdisable(true)
    }
  }


  const { cart, setcart, addtocart, removefromcart, clearcart, savecart, subtotal } = useContext(Context);
  const onScriptLoad = async () => {


    let oid = Math.floor(Math.random() * Date.now())
    const data = { cart, subtotal, oid, email: orderinguser.email, phoneno: orderinguser.phoneno, address: orderinguser.address, pincode: orderinguser.pincode, name: orderinguser.name, token: localStorage.getItem("token") }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const response = await fetch('http://localhost:3000/api/initiatetransaction', requestOptions);
    // initaite trnsaction is actually returning soe token from paytm so continue by using that but for now just on clickinh pay button I am just taking the order into database and marking its status as pending but at after successful payment confirmation from paytm we will be redirected to mentioned url ie. posttransaction in our case where after performing checksum we mark order as paid
    // response will be token from initaitetransaction
    const TXN_TOKEN = await response.json();

    console.log("res orderID", TXN_TOKEN.orderId);
    // localStorage.setItem("myordertoken",TXN_TOKEN.token)
    router.push(`/order?id=${TXN_TOKEN.orderId}`)
    // router.push("api/posttransaction")


    // var config = {
    //   "root": "",
    //   "flow": "DEFAULT",
    //   "data": {
    //     "orderId": oid, /* update order id */
    //     "token": TXN_TOKEN, /* update token value */
    //     "tokenType": "TXN_TOKEN",
    //     "amount": amount /* update amount */
    //   },
    //   "handler": {
    //     "notifyMerchant": function (eventName, data) {
    //       console.log("notifyMerchant handler function called");
    //       console.log("eventName => ", eventName);
    //       console.log("data => ", data);
    //     }
    //   }
    // };

    // window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
    //   // after successfully updating configuration, invoke JS Checkout
    //   window.Paytm.CheckoutJS.invoke();
    // }).catch(function onError(error) {
    //   console.log("error => ", error);
    // });

  }




  return (
    <div className='my-10  mx-20'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>

      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} crossorigin="anonymous"></Script>

      <h1 className='text-center text-lg'>Checkout</h1>
      <h1 >1.Delivery Details</h1>
      <div className='grid justify-center grid-cols-2  my-2 space-x-3'>

        <div>
          <label htmlFor="name" class="leading-7 text-sm text-gray-600">Name</label>
          <input onChange={handlechange} value={orderinguser.name} type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>

        <div>
          <label htmlFor="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input onChange={handlechange} value={orderinguser.email} type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>

      </div>
      <div>
        <label htmlFor="address" class="leading-7 text-sm text-gray-600">Address</label>
        <textarea onChange={handlechange} value={orderinguser.address} type="text" id="address" name="address" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" cols="100" rows="2" />
        <div className='grid justify-center grid-cols-2  my-2 space-x-3'>

          <div>
            <label htmlFor="state" class="leading-7 text-sm text-gray-600">State</label>
            <input value={orderinguser.state} readOnly type="text" id="state" name="state" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div>
            <label htmlFor="pincode" class="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handlechange} value={orderinguser.pincode} type="number" id="pincode" name="pincode" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

        </div>
        <div className='grid justify-center grid-cols-2  my-2 space-x-3'>

          <div>
            <label htmlFor="phone" class="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handlechange} type="number" id="phone" name="phone" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div>
            <label htmlFor="city" class="leading-7 text-sm text-gray-600">City</label>
            <input value={orderinguser.city} readOnly type="text" id="city" name="city" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

        </div>
      </div>

      <h1>Review Cart Items & Pay</h1>
      <div className=' cart p-10  bg-pink-200  md:w-70 w-50 lg:70 h-full z-1 my-3' >



        <ol className='list-decimal'>
          {
            Object.keys(cart).map(e => {
              return <li key={e}>
                <div className="flex py-2  item ml-2">
                  <div className='text-sm w-1/3  '>
                    {cart[e].name} : Wear the code ({cart[e].size},{cart[e].variant})
                  </div>
                  <div className='flex items-center space-x-1 justify-center  w-1/10 '>
                    <AiFillMinusCircle className='text-pink-500 cursor-pointer' onClick={() => {
                      removefromcart(e, cart[e].name, cart[e].size, 1, cart[e].price, cart[e].variant);
                    }} /><span>{cart[e].qty}</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' onClick={() => {
                      addtocart(e, cart[e].name, cart[e].size, 1, cart[e].price, cart[e].variant)
                    }} />
                  </div>
                </div>
              </li>
            })
          }

          {
            Object.keys(cart).length == 0 ? <div className='text-sm font-base mt-2'>Your Cart is Empty!!</div> : ""
          }

          <span className='font-bold m-2 '>Subtotal :₹{subtotal}</span>
        </ol>
        <div class="p-2 w-full flex space-x-2">

          <button onClick={onScriptLoad} disabled={disable} class={`disabled:bg-pink-400 mx-auto text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm items-center space-x-1`} ><BsFillBagCheckFill /><span>Pay ₹{subtotal}</span>
          </button>
        </div>
      </div>
    </div>

  )
}

export default Checkout
