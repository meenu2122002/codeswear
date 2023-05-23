// import React, { useEffect,useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';




const Login = () => {
  // localStorage.setItem("hello","hello")
  const router = useRouter()

  const [user, setuser] = useState({email: "", password: "" });
  const handleclick = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  email: user.email, password: user.password })
    };
    const response = await fetch('http://localhost:3000/api/login', requestOptions);
    const res = await response.json();
    if(res.success){
      localStorage.setItem("token", res.token)
      toast(' ✅ Login successfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setuser({email:"",password:""})
      console.log("t",res.token)
     
      setTimeout(() => {
        router.push("/")
      }, 1000);
     
    }
    else{
      toast(' ❌ Invalid credentials!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  //  setuser({})
  }
  const handlechange = (e) => {
    setuser({ ...user, [e.target.id]: e.target.value });
    // console.log(user)
  }

useEffect(()=>{
  if(localStorage.getItem("token")){
    router.push("/")
  }
})

  return (
    <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="./codeswearcircle.png" alt="Your Company"/>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <div class="mt-2 text-center text-sm text-gray-600">
        Or
      <Link href={"/signup"} className='' legacyBehavior><div> <a  class="font-medium text-pink-600 hover:text-pink-500 cursor-pointer">  Create Account</a></div>
     </Link>  
      </div>
    </div>
    <form class="mt-8 space-y-6"  method="POST">
      <input type="hidden" name="remember"  />
      <div class="-space-y-px rounded-md shadow-sm">
        <div className='my-4 '>
          <label for="email-address" class="sr-only">Email address</label>
          <input value={user.email}  id="email" name="email" type="email" autocomplete="email" required class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Email address" onChange={handlechange}/>
        </div>
        <div className=''>
          <label for="password" class="sr-only">Password</label>
          <input value={user.password }id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Password" onChange={handlechange}/>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-600"/>
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>
 <div class="text-sm">
         <a  href='/forgot' class="font-medium text-pink-600 hover:text-pink-500">Forgot your password?</a> </div>
       
      </div>

      <div>
        <button  onClick={handleclick} type="submit" class="group relative flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <divath fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
  )
}

export default Login
