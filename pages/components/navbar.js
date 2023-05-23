import React, { useContext, useRef,useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AiOutlineShoppingCart, AiFillCloseCircle,AiFillMinusCircle,AiFillPlusCircle } from 'react-icons/ai';
import {BsFillBagCheckFill} from "react-icons/bs"
import Context from "./mcontext"
import {RiAccountPinCircleFill} from "react-icons/ri"


const Navbar = ({token,logout}) => {
// console.log(cart,addtocart,removefromcart,clearcart,subtotle)
const [display,setdisplay]=useState(false)
const {cart,setcart,addtocart,removefromcart,clearcart,savecart,subtotal}=useContext(Context);
  const ref = useRef()
  const togglecart = () => {
    console.log("fired")
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    }
    else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }
  }
  useEffect(() => {
   try {
    if(localStorage.getItem("cart")){

      setcart(JSON.parse(localStorage.getItem("cart")));
      savecart(JSON.parse(localStorage.getItem("cart")))
      console.log("sub"+subtotal)
    }
   } catch (error) {
    console.log(error);
   }
    
  },[])
  return (
    <>
    <div className="flex flex-col  md:flex-row  md:justify-start items-center shadow-xl  top-0 z-10  bg-white ">
      <div className='logo mx-5'>
        <Link href="/" legacyBehavior><a > <Image src="/logo.png" width={200} height={40} alt="codes wear" />
        </a></Link>

      </div>
      <div className="flex justify-evenly my-2 space-x-2 md:space-x-5 font-bold mx-20 ">
        <Link href="/tshirts" className='hover:text-pink-500'>Tshirts</Link>
        <Link href="/hoodies" className='hover:text-pink-500'>Hoodies</Link>
        <Link href="/stickers" className='hover:text-pink-500'>Stickers</Link>
        <Link href="/mugs" className='hover:text-pink-500'>Mugs</Link>
      </div>
      <div className="cartlogo px-4 absolute right-0 top-0 text-4xl cursor-pointer" onClick={togglecart}>
        <AiOutlineShoppingCart />
      </div>
 { token ? <Link href={"/"}> <div className="cartlogo px-4 absolute right-10 top-0 text-4xl cursor-pointer" >
 <RiAccountPinCircleFill onMouseOver={()=>{setdisplay(true)}} onMouseLeave={()=>{setdisplay(false)}}/>
 {display?<div onMouseOver={()=>{setdisplay(true)}} onMouseLeave={()=>{setdisplay(false)}} className=' md:text-xl text-sm bg-white    absolute top-7 right-3 py-1 pl-5  rounded-md md:w-[15vw] '><ul>
  <Link href={"/myaccount"}><li className='hover:text-pink-700 '>My account</li></Link>
<Link href={"/orders"}> <li className='hover:text-pink-700 '>Products</li>
</Link> <li className='hover:text-pink-700 ' onClick={logout}>Logout</li></ul></div>:""}
      </div>
      </Link> :<Link href={"/login"}> <div className="cartlogo px-7 py-1 absolute right-20 top-1 rounded-md text-xl cursor-pointer bg-pink-500" >
 Login
      </div>
      </Link> }
    </div>
    <div className=' cart p-10 overflow-y-scroll absolute top-0 right-0 bg-pink-200 transition translate-x-full md:w-70 w-50 lg:70 h-full z-1' ref={ref}>
        <span className='absolute top-2 right-2 cursor-pointer text-pink-500' onClick={togglecart}>
          <AiFillCloseCircle />
        </span>

        <h1 className='font-bold text-center'>Shopping Cart</h1>
       <ol className='list-decimal'>
       {
  Object.keys(cart).map(e =>{
    return  <li key={e}>
    <div className="flex py-2 items-center item">
      <div className='text-sm w-2/3  '>
{cart[e].name} : Wear the code ({cart[e].size},{cart[e].variant})
      </div>
      <div className='flex items-center space-x-1 justify-center  w-1/3'>
        <AiFillMinusCircle className='text-pink-500 cursor-pointer' onClick={()=>{
          removefromcart(e, cart[e].name, cart[e].size, 1, cart[e].price, cart[e].variant);
        }}/><span>{cart[e].qty}</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' onClick={()=>{addtocart(e, cart[e].name, cart[e].size, 1, cart[e].price, cart[e].variant)
        }}/>
      </div>
    </div>
  </li>
  })
       }
       
        {
         Object.keys(cart).length==0?<div className='text-sm font-base mt-2'>Your Cart is Empty!!</div>:""
        }
        <div className='font-bold'>Subtotal:₹{subtotal}</div>
        <div class="p-2 w-full flex space-x-2">
         <Link href={"/checkout"}> <button class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm items-center space-x-1"><BsFillBagCheckFill/><span>Checkout</span>
          </button></Link>
          <button class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm items-center space-x-1" onClick={clearcart}><BsFillBagCheckFill/><span>Clear Cart</span>
          </button>
        </div>
       </ol>
      </div>
    </>
  )
}

export default Navbar
