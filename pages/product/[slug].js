import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import Context from "../components/mcontext.js"
import Product from "models/product.js"
// import connectDB  from "../../middlewares/mongoose.js";
import mongoose from 'mongoose'
import React from 'react';
import { toast } from 'react-toastify';




export default function Page({ product, variants }) {
  // console.log("var",variants)
  const { cart, setcart, addtocart, removefromcart, clearcart, savecart, buynow } = useContext(Context);
  const router = useRouter()
  const { slug } = router.query

  const [color, setcolor] = useState(Object.keys(variants));
  const [sizes, setsizes] = useState(Object.keys(variants[color[0]]));
  const [presentcolor, setpresentcolor] = useState(color[0]);
  const [s, sets] = useState(sizes[0])
  // console.log(sizes)

  const [pin, setpin] = useState()
  const [service, setservice] = useState()
  const setc = (e) => {
    setpresentcolor(e)
  }
  const handlechange = (e) => {

    setpin(parseInt(e.target.value));
  }
  const handleclicks = (e) => {
    setsizes(Object.keys(variants[e]));
    setpresentcolor(e);
    sets(Object.keys(variants[e])[0]);
    // window.URL=`http://localhost:3000/product/${slug}`
  }
  const sf = (e) => {
    sets(e.target.value)
  }
// const [message,setmessage]=useState("")


  // const Greet = () => {
  //   return <div>{message}</div>

  // }

  const handleclick = async () => {

    const res = await fetch("http://localhost:3000/api/pincode");
    const dt = await res.json();
// console.log("pin",typeof(pin),typeof(Object.keys(dt)[0]))

    if (Object.keys(dt).includes(pin.toString())) {
      // setmessage("Yoh! Product is serviceable")
      setservice(true)
      
      
      toast.success('Yoh! Product is Serviceable',{autoClose:1000,  
      icon: '👏',
    });

    }
    else {
      // setmessage("Sorry! Product is not serviceable")
      toast.error('Sorry ! Product is not serviceable',{autoClose:1000,icon: '😢'});
      setservice(false)
    }
    
  }
  return (
    <>
      <section class="text-gray-600 body-font overflow-hidden z-2">
        <div class="container px-5 py-14 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-72 w-full lg:h-full h-84 object-cover object-top rounded" src={product.img} />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">  Codeswear</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({s}/{presentcolor})</h1>
              <div class="flex mb-4">
                {/* <span class="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span> */}
              </div>
              <p class="leading-relaxed">{product.desc}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div class="flex">
                  <span class="mr-3">Color</span>
                  <div className='flex space-x-1'>
                    {color.includes("red") && <button class={`border-2 border-red-300 rounded-full w-8 h-8 focus:outline-none bg-red-700 ${presentcolor == "red" ? "border-black" : ""}`} onClick={() => { handleclicks("red") }} ></button>}
                    {color.includes("pink") && <button class={`border-2 border-pink-300 rounded-full w-8 h-8 focus:outline-none bg-pink-800 ${presentcolor == "pink" ? "border-black" : ""}`} onClick={() => { handleclicks("pink") }}></button>}
                    {color.includes("blue") && <button class={`border-2 border-blue-300 rounded-full w-8 h-8 focus:outline-none bg-blue-800 ${presentcolor == "blue" ? "border-black" : ""}`} onClick={() => { handleclicks("blue") }}></button>}
                    {color.includes("green") && <button class={`border-2 border-green-300 rounded-full w-8 h-8 focus:outline-none bg-green-500 ${presentcolor == "green" ? "border-black" : ""}`} onClick={() => { handleclicks("green") }}></button>}
                    {color.includes("yellow") && <button class={`border-2 border-red-300 rounded-full w-8 h-8 focus:outline-none bg-yellow-400 ${presentcolor == "yellow" ? "border-black" : ""}`} onClick={() => { handleclicks("yellow") }}></button>}

                  </div>

                </div>
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="relative">
                    <select onChange={(e) => sf(e)} class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {sizes.includes("S") && <option>S</option>}
                      {sizes.includes("M") && <option>M</option>}
                      {sizes.includes("L") && <option>L</option>}
                      {sizes.includes("XL") && <option>XL</option>}
                      {sizes.includes("XXL") && <option>XXL</option>}


                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                <button class="flex ml-[0.6rem] md:ml-60px text-white bg-pink-500 border-0 md:py-2 md:px-6 px-2 py-2 focus:outline-none hover:bg-pink-600 rounded" onClick={() => { buynow(product.title + s + presentcolor, product.title, s, 1, product.price, presentcolor) }}>Buy Now</button>
                <button class="flex ml-[0.6rem] md:ml-60px text-white bg-pink-500 border-0 md:py-2 md:px-6 px-2 py-2 focus:outline-none hover:bg-pink-600 rounded" onClick={() => {
                  // console.log("f")
                  // console.log(slug)
                  addtocart(product.title + s + presentcolor, product.title, s, 1, product.price, presentcolor)
                }}>Add to Cart</button>

                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className='flex mt-4 '>
                <input type="number" className='border-gray-100 rounded-md border-4 px-2' onChange={handlechange} placeholder='Enter Your Pincode' />
                <button className='flex ml-2  text-white bg-pink-500 border-0 py-1 px-6 focus:outline-none hover:bg-pink-600 rounded' onClick={handleclick}>Check</button>
              </div>
              {
                service && <div className='text-green-500 mt-1 '>Yoy! This Pincode is serviceable</div>
              }
              {
                !service && service != null && <div className='text-red-500 mt-1 '>Sorry!  We don't deliver to pincode yet</div>
              }
            </div>

          </div>

        </div>
      </section>
    </>
  )
}
export async function getServerSideProps(context) {
  const a = await mongoose.connect(process.env.MONGODB_URI)
  let product = await Product.findOne({ slug: context.query.slug });
  console.log("pro", product)
  let products = await Product.find({ title: product.title,category:product.category });
  let colorsize = {}
  for (let item of products) {

    if (item.color in colorsize) {
      if (item.availability > 0)
        colorsize[item.color][item.size] = { slug: item.slug };
    }
    else {
      if (item.availability > 0) {
        colorsize[item.color] = {};
        colorsize[item.color][item.size] = { slug: item.slug };
      }

    }

  }
  console.log("he", colorsize)

  return {
    props: { variants: JSON.parse(JSON.stringify(colorsize)), product: JSON.parse(JSON.stringify(product)), }, // will be passed to the page component as props
  }
}