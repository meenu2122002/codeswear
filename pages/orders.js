import React from 'react'
import Link from 'next/link'
import Order from "models/order.js"
// import connectDB  from "../../middlewares/mongoose.js";
import mongoose from 'mongoose'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const Orders = () => {
 const [orders, setorders] = useState([])
 const myfun=async ()=>{
    console.log("hello")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  token:localStorage.getItem("token") })
      };
      const response = await fetch('http://localhost:3000/api/myorders', requestOptions);
      const res = await response.json(); 
      console.log("orders here",res)
      setorders(res);
      console.log("o",orders)
 }
  useEffect(  ()=>{
    if(!localStorage.getItem("token")){
      router.push("/")
    }
    else{
       myfun()
    }
  },[])



  return (
  
<div class="max-w-2xl mx-auto my-10">
<h1 className="bg-slate-200 px-2 shadow-stone-200">My orders</h1>
	<div class="flex flex-col">
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden ">
                <div class="min-w-full divide-y divide-gray-200 div-fixed dark:divide-gray-700">
                    <div class="bg-gray-100 dark:bg-gray-700">
                        <div className='flex justify-between px-10'>
                           
                           
                            <span scope="col" class="py-3  text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                OrderId
                            </span>
                            <span scope="col" class="py-3  text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                             Name   
                            </span>
                            <span scope="col" class="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Email
                            </span>
                            <span scope="col" class="py-3  text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Price
                            </span>
                           
                            
                        </div>
                    </div>
                    <div class="bg-white divide-y flex flex-col divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 w-[100%]">
                      {
                        orders.map(e=>{
                            return <Link href={`/order?id=${e.orderId}`} className='cursor-pointer'>
                             <div class="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td class="py-3 px-6  w-2/3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                {e.orderId}
                            </td>
                            <td class="py-3 px-6  w-2/3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                {e.name}
                            </td>
                            <td class="py-3 px-6  w-2/3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                {e.email}
                            </td>
                            
                            {/* <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{e.category}</td> */}
                            <td class="py-3 px-6 w-1/3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">₹{e.amount}</td>
                            
                        </div>
                            </Link>
                        })
                      }  
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


</div>
  )
}




export default Orders
