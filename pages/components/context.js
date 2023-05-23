import { useEffect, useState } from 'react'
import Context from './mcontext.js';
import { useRouter } from 'next/router'
 export default function MyApp(props) {
  const router = useRouter()
  const [cart, setcart] = useState({});
  const [subtotal, setsubtotal] = useState(0);
  
  const savecart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));
   let keys=Object.keys(mycart);
   let subt=0;
   for(let i=0;i<keys.length;i++){
subt+=mycart[keys[i]].qty*mycart[keys[i]].price;
   }
   setsubtotal(subt);
  
  }
  
  const addtocart = (itemcode, name, size, qty, price, variant) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = newcart[itemcode].qty + qty;
    
    }
    else {
      // console.log("size",size)
      newcart[itemcode] = { name, size, qty, price, variant };
    

    }
  

    setcart(newcart)
    // console.log(cart)
    savecart(newcart);
    // console.log( cart[itemcode].qty)
  }
  const clearcart = () => {
    console.log("fi")
    setcart({});
    setsubtotal(0);
    savecart({});
  }
  const buynow=(itemcode, name, size, qty, price, variant)=>{
    clearcart();
    let newcart = {};
      // if (itemcode in cart) {
      //   newcart[itemcode].qty = newcart[itemcode].qty + qty;
      
      // }
      // else {
      //   // console.log("size",size)
        newcart[itemcode] = { name, size, qty, price, variant };
      
  
      // }
    
  
      setcart(newcart)
      // console.log(cart)
      savecart(newcart);
    // addtocart(product.title+s+presentcolor,product.title,s,1,product.price,presentcolor);
    router.push("/checkout")
  }
  const removefromcart = (itemcode, name, size, qty, price, variant) => {
    let newcart = cart;
    try {
      if (cart[itemcode]) {
        newcart[itemcode].qty = newcart[itemcode].qty - qty;
        if (newcart[itemcode].qty <= 0) {
          delete newcart[itemcode];
        
        }
    

      }
     
      setcart(newcart)
      savecart(newcart);
  
    } catch (error) {
      console.log("error");
      localStorage.clear();
    }

  }
    return (
      <Context.Provider value={{cart,setcart,addtocart,removefromcart,savecart,clearcart,subtotal,buynow}}>
      {props.children}
      </Context.Provider>
    )
  }