import LoadingBar from 'react-top-loading-bar'

import '@/styles/globals.css'
import { useRouter } from 'next/router'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { useEffect, useState } from 'react';
import Context from './components/context';


export default function App({ Component, pageProps }) {
const [token,settoken]=useState(null);
const [key,setkey]=useState(0)
const router = useRouter()

const [progress, setProgress] = useState(0)

// setInterval(()=>{
//   let t=localStorage.getItem("token");
//   if(!t){
//     settoken(null);
//     setkey(Math.random())
//   }
   
// },4000)

const logout=()=>{
  localStorage.removeItem("token");
  settoken(null)
  setkey(Math.random())
  
}

  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })

    router.events.on('routeChangeComplete',()=>{
      
      setProgress(100)

     
    })
    let t=localStorage.getItem("token");
    if(t){
      settoken(t);
      setkey(Math.random())
    }
   
   
   },[router.query])
  return (

    <>
<Context>
<LoadingBar
        color='#c227a0'
        progress={progress}
        waitingTime	={400}
        // loaderSpeed={200}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar key={key} token={token} logout={logout}/>
     
      <Component {...pageProps} />
      
      <ToastContainer position="bottom-center" duration="1000" />
      <Footer />
      </Context>
    </>
  )
}
