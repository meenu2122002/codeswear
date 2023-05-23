import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

const Forgot = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
  const [disable, setdisable] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/")
    }
  })
  const sendmail = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    };
    const response = await fetch('http://localhost:3000/api/forgot', requestOptions);
    const res = await response.json();
    if (res.success) {
      toast.success('Yoh! Password reset Email has been send successfully', {
        autoClose: 1000,
        icon: '👏', position: "top-center"
      })
      router.push("/")
    } else {
      toast.error("No user exists with provided email ", { autoClose: 1000, icon: '😢', position: "top-center" });
      router.push("/")
    }

  }
  const resetpassword = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: router.query.token, password })
    };
    const response = await fetch('http://localhost:3000/api/resetpassword', requestOptions);
    const res = await response.json();
    if (res.success) {
      toast.success('Yoh! Password has been updated successfully', {
        autoClose: 1000,
        icon: '👏', position: "top-center"
      })
      router.push("/login")
    } else {
      toast.error("Password could'nt be updated", { autoClose: 1000, icon: '😢', position: "top-center" });
    }
    //   console.
  }
  const handlechange = (e) => {
    if (e.target.id == "email")
      setemail(e.target.value)
    else if (e.target.id == "password") {

      setpassword(e.target.value)
      if (e.target.value == cpassword)
        setdisable(false)

    }
    else if (e.target.id == "cpassword") {

      setcpassword(e.target.value)
      if (password == e.target.value)
        setdisable(false)
    }
  }

  return (
    <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto" src="./codeswearcircle.png" alt="Your Company" />
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot Password</h2>
          <div class="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href={"/Forgot"} className='' legacyBehavior><div> <a class="font-medium text-pink-600 hover:text-pink-500 cursor-pointer">  Login</a></div>
            </Link>
          </div>
        </div>
        {
          Object.keys(router.query).length == 0 && <form class="mt-8 space-y-6" >
           
            <div class="-space-y-px rounded-md shadow-sm">
              <div className='my-4 '>
                <label for="email" class="sr-only">Email address</label>
                <input onChange={handlechange}
                  id="email" name="email" type="email" autocomplete="email" required class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Email address" />
              </div>

              <button onClick={sendmail}  class="group relative flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <divath fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                </span>
                Continue
              </button>
            </div>
          </form>
        }
        {
          !Object.keys(router.query).length == 0 && <form class="mt-8 space-y-6" >
         
            <div class="-space-y-px rounded-md shadow-sm">
              <div className='my-4 '>
                <label for="password" class="sr-only">New Password</label>
                <input id="password" name="password" type="password" onChange={handlechange} autocomplete="password" required class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Password" />
              </div>
              <div className='my-4 '>
                <label for="cpassword" class="sr-only mb-2">Confirm Password</label>
                <input id="cpassword" name="cpassword" type="password" onChange={handlechange} autocomplete="cpassword" required class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 md:mb-5" placeholder="Confirm Password" />
              </div>

              <button onClick={resetpassword} disabled={disable} type="submit" class="group relative flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" >
                    <divath fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                </span>
                Continue
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  )
}

export default Forgot
