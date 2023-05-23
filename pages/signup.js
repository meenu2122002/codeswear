import React, { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';
import { useEffect } from 'react'
import { useRouter } from 'next/router'





const Signup = () => {
  const [user, setuser] = useState({ name: "", email: "", password: "" });
  
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push("/")
    }
  })
  const handleclick = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
    };
    const response = await fetch('http://localhost:3000/api/signup', requestOptions);
    const res = await response.json();
    if(res.success){
      toast(' ✅ You signed up successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setuser({name:"",email:"",password:""})
    }
    else{
      toast(' ❌ Please fill the form correctly!', {
        position: "top-right",
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
    console.log(user)
  }



  return (
    <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-2">
        <div>
          <img class="mx-auto h-12 w-auto" src="./codeswearcircle.png" alt="Your Company" />
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up for your account</h2>
          <div class="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href={"/login"} className='' legacyBehavior><div> <a class="font-medium text-pink-600 hover:text-pink-500 cursor-pointer">  Login</a></div>
            </Link>
          </div>
        </div>
        <form class="mt-2 space-y-4" method="POST">
          <input type="hidden" name="remember" value="true" onChange={handlechange} />
          <div class="flex flex-col rounded-md shadow-sm">
            <div className='mt-4 '>
              <label for="name" class="sr-only">Name</label>
              <input value={user.name} id="name" name="name" type="text" autocomplete="name" required class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Username" onChange={handlechange} />
            </div>
            <div className='mt-4 '>
              <label for="email-address" class="sr-only">Email address</label>
              <input value={user.email} id="email" name="email" type="email" autocomplete="email" required class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Email address" onChange={handlechange} />
            </div>
            <div className='mt-4'>
              <label for="password" class="sr-only">Password</label>
              <input value={user.password} id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={handlechange} />
            </div>
          </div>



          <div>
            <button  type="submit" class="group relative flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600" onClick={handleclick} >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <divath fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
              </span>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
