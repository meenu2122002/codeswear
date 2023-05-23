import React from 'react'
import Link from 'next/link'
import Product from "models/product.js"
// import connectDB  from "../../middlewares/mongoose.js";
import mongoose from 'mongoose'


const Tshirts = ({tshirts}) => {
  // console.log(tshirts)
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-2 py-14  w-[75vw]">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {

          Object.keys(tshirts).map(e=>{
            return  <Link href={`/product/${tshirts[e].slug}`} legacyBehavior key={e._id}>
          
            <div className=" shadow-lg cursor-pointer m-2">
            <a className="block relative  rounded overflow-hidden">
                  <img alt="ecommerce" className=" h-[36vh]  object-top w-auto md:w-auto  block md:h-[70vh] md:m-0 m-auto" src={tshirts[e].img}/>
                </a>
                <div className="mt-4 text-center md:text-left ml-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{tshirts[e].category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{e.title}</h2>
                  <p className="mt-1">₹{tshirts[e].price}.00</p>
                  {/* <p className="mt-1">{tshirts[e].size}</p> */}
                  
                </div>
           
                <div className="mt-1 ml-2">
              {
              tshirts[e].color.includes("pink") &&  <button class="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>
              }
              {
              tshirts[e].color.includes("blue") &&  <button class="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
              }
              {
              tshirts[e].color.includes("green") &&  <button class="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
              }
              {
              tshirts[e].color.includes("white") &&  <button class="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
              }
              {
              tshirts[e].color.includes("yellow") &&  <button class="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
              }
              {
              tshirts[e].color.includes("red") &&  <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
              }
             
            </div>
            <div className="mt-1  ml-3 ">
              {tshirts[e].size.includes("S") &&  <span className=' border border-gray-500 px-1 mx-1'>S</span>}
              {tshirts[e].size.includes("M") &&  <span className=' border border-gray-500 px-1 mx-1'>M</span>}
              {tshirts[e].size.includes("L") &&  <span className=' border border-gray-500 px-1 mx-1'>L</span>}
              {tshirts[e].size.includes("XL") &&  <span className=' border border-gray-500 px-1 mx-1'>XL</span>}
              {tshirts[e].size.includes("XXL") &&  <span className=' border border-gray-500 px-1 mx-1'>XXL</span>}
              {/* {tshirts[e].size.includes("S") &&  <span>S</span>} */}
            </div>
            </div>
            
              </Link>  
          })
          }
       
     
          </div>
       
      </div>
    </section>
  )
}


export async function getServerSideProps(context) {
  const a=await mongoose.connect(process.env.MONGODB_URI)
  // console.log(a)
  // return handler(req,res);

  let products=await Product.find({category:"tshirts"});
  // let products=await Product.find();
  let tshirts={};
  for(let item of products){
    if(item.title in tshirts){
  if(item.availability>0 && !tshirts[item.title].color.includes(item.color)){
    tshirts[item.title].color.push(item.color);
  }
  if(item.availability>0 && !tshirts[item.title].size.includes(item.size)){
    tshirts[item.title].size.push(item.size);
  }
  
  
  
  
    }
    else{
      tshirts[item.title]=JSON.parse(JSON.stringify(item));
      if(item.availability>0){
        tshirts[item.title].color=[item.color];
        tshirts[item.title].size=[item.size];
  
        
  
      }
    }
  }
  
  
  return {
    props: {tshirts:JSON.parse(JSON.stringify(tshirts))}, // will be passed to the page component as props
  }
}

export default Tshirts
