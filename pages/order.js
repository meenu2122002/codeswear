import React from 'react'
import Order from "models/order.js"
// import connectDB  from "../../middlewares/mongoose.js";
import mongoose from 'mongoose'
import { useRouter } from 'next/router';

const MyOrder =  ({order}) => {
  console.log("orderon",order)
  return (
    <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">ORDER ID: {order.orderId}</h1>
          <h3> {`${order.status=="paid"?"Your order has been successfully placed":"Payment Pending"}`}</h3>
          <div class="flex mb-4">
        
            <a class="flex-grow text-pink-500 border-b-2 border-pink-500 py-2 text-lg px-1"> ITEM Description</a>
            <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
            <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
          </div>
         
        { Object.keys(order.products).map(e=>{
return <div class="flex border-t border-gray-200 py-2">
<span class="text-gray-500 w-[14.5rem]">{order.products[e].name}</span>
<span class="ml-auto text-gray-900">{order.products[e].qty}</span>
<span class="ml-auto text-gray-900">₹{order.products[e].price}</span>
</div>
        })   }
          
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900 mt-2">Subtotal:₹{order.amount}.00</span>
           
            {/* <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button> */}
          </div>
          <div className='flex my-5 space-x-5'>

          <button class="flex  text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
          </div>
        </div>
        <img alt="ecommerce" class="  lg:w-1/2 w-full lg:h-[70vh] h-64 object-cover object-center rounded" src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=600"/>
      </div>
    </div>
  </section>
  )
}
export async function getServerSideProps(context) {
  const a=await mongoose.connect(process.env.MONGODB_URI)
  // console.log(a)
  // return handler(req,res);

  let order=await Order.findOne({orderId:context.query.id});
  console.log("order",order)
  // let products=await Product.find();
  
  
  
  return {
    props: {order:JSON.parse(JSON.stringify(order))}, // will be passed to the page component as props
  }
}

export default MyOrder
