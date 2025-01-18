'use client'
import React from 'react';
import { useState,useEffect,useRef,useContext } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import axios from 'axios';
import { Navbar } from '@nextui-org/react';
import Link from 'next/link';
type Props = {}

const SignUp = (props: Props) => {
  const [user,setUser]=useState<string>('');
  const [pass,setPass]=useState<string>('');
  const [errored,setErrored]=useState(false);
  const [sent,setSent]=useState(false);
  const username=useRef<HTMLInputElement | null>(null);
  const password=useRef<HTMLInputElement | null>(null);
  const handleUser=()=>{
    setUser(username?.current?.value || '')
  }
  const handlePass=()=>{
    setPass(password?.current?.value || '')
  }
  const handleSubmit=()=>{
        if(!user && !pass){
          setErrored(true)
        } 

      const users=axios.post(`/api/db/signup?username=${user}&password=${pass}`);
     
      return users
  }

  {/*  <form className='flex flex-col self-center col-start-2 col-span-2 row-start-2 row-span-2 z-50 ' onSubmit={handleSubmit}  >
      {!sent && <input className='' onChange={handleUser} ref={username}  placeholder='Username/email' />}
      {!sent && <input className=''  onChange={handlePass}  ref={password}  placeholder='password' />}  
      {!sent &&  <button className='' type='submit' >Sign Up </button>}
   
      
      {sent && <Link href='/home' >Account created! Return to home.</Link>}
      {errored && <h1></h1>}
    </form> */}
  return (
    <div className='flex flex-col grid grid-cols-4 grid-rows-5 bg-white h-screen ' >
    <div className='col-start-1 col-span-4 row-start-1' >
        <NavBar/>
    </div>
    <div className=' flex flex-col max-sm:w-full max-sm:h-full md:h-full self-center md:self-start rounded-sm  justify-center p-2  max-sm:col-start-1 col-start-2 space-x-2 space-y-2 max-sm:col-span-4 md:col-span-3 row-start-2  row-span-3 z-50 border-2 max-sm:bg-white' >
    <div className=' flex md:mt-12 grid max-sm:mt-4 h-full w-full grid-cols-6 grid-rows-4 flex-row  bg-gray-300   col-start-2 col-span-4 row-start-2 row-span-2 flex-col px-2 ' >
      {/* Add Design to this page. */}
   
      <div className='flex  -mt-4 py-2 px-2 ml-2 mt-0 row-start-1 col-start-4 col-span-3 bg-white w-3/4 max-sm:w-full h-1/2 md:h-2/3 skew-x-12 z-50 space-x-2' >
      {/* Upper Right white area & black design */}
      <div className=' bg-gray-300 h-full w-1/4 self-center  -skew-x-24  ' >

        </div>
      <div className='  bg-gray-300 h-full w-1/4 self-center -skew-x-24 ' >

        </div>
      <div className=' bg-gray-300 h-full w-1/4  self-center  -skew-x-24 ' >

          </div>
 
    </div>
    
  
   <div className='flex size-4 bg-gray-50 col-start-1 border-2 border-black row-start-1 row-span-2' >


   </div>
   <div className='flex  flex-col  -ml-4 max-sm:-ml-6 w-1/2 max-sm:w-10 col-start-1 col-span-1 row-start-1 row-span-4 bg-gray-50 z-40 ' >
   {/* Left side white area */}
     <div className='flex   max-sm:-mt-12 max-sm:ml-4 -mt-16 ml-0 w-full h-1/2 bg-white rotate-45 ' >
      {/*Left Side Upper Corner */}

     </div>

   </div>
   <div className='flex  -left-8 row-start-1 col-start-1 h-full w-1/2  ' >
      {/* left side lower slant */}

   </div>
   <div className='flex  rotate-45 max-sm:-rotate-45 row-start-1 row-span-2  col-start-6 z-50 ml-8 max-sm:ml-8 -mt-4  max-sm:mt-6 w-3/4 max-sm:w-1/4 max-sm:h-1/3  h-24 bg-white ' >
         {/*Extra top right white piece */}
    </div>
   <div className='flex  row-start-4 row-span-2 col-start-1 -ml-8 mt-10 max-sm:mt-8 h-full w-full rotate-45 max-sm:-rotate-45 bg-white  ' >
      {/* Left Side Lower Corner */}
   </div>
   
   <div className='flex max-sm:border-2 max-sm:border-black max-sm:w-2/3 max-sm:h-full max-sm:mt-8 row-start-1 col-start-6 -mt-2 ml-16 max-sm:ml-8 max-sm:mt-0 w-full h-full bg-white rotate-45 max-sm:rotate-0 ' >
        {/* right side upper block */}
       
   </div>
   <div className='flex  col-start-6 ml-20 max-sm:ml-8 mt-12 max-sm:mt-24 row-start-1 row-span-4 bg-white z-50 w-3/5 max-sm:w-4/5 h-5/6 max-sm:h-4/5 max-sm:w-4/5' >
      {/* right side bar */}
   </div>
   <div className='flex  row-start-4 col-start-6 bg-white -rotate-45 max-sm:rotate-45 ml-2 mt-12 w-full h-full' >
       {/* right side lower */}
   </div>
    <div className='flex  flex-col max-sm:w-full rounded-md self-center justify-self-center  col-start-2 col-span-4 max-sm:row-start-1 max-sm:row-span-4 row-start-2 
    md:row-start-1 md:py-6 md:row-span-3 row-span-3 md:w-full md:self-end max-sm:w-full' >
      {/*  Space for Data */} 
      <form className='flex flex-col self-center col-start-2 col-span-2 row-start-2 row-span-2 z-50 ' onSubmit={handleSubmit}  >
      <div className='flex flex-col w-1/2  self-center py-2 ' >
      <h2 className='text-2xl -skew-x-12' >Username</h2>
      {!sent && <input className='border-2 -skew-x-12' onChange={handleUser} ref={username}  placeholder='Username/email' />}
    </div>
    <div className='flex flex-col w-1/2 self-center py-2 ' >
      <h2 className='text-2xl -skew-x-12 ' >Password</h2>
      {!sent && <input className='border-2 -skew-x-12 '  onChange={handlePass}  ref={password}  placeholder='password' />}  
    </div>
    <div className='flex flex-col justify-center  self-center w-full md:w-3/4 bg-red-200 ' >
    <div className=' flex md:justify-self-start md:self-center transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-full' >
            <div className='flex hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110  ' >
            {/* <Link className='text-white text-center' href='/testAuth' >Sign In</Link> */}
            {!sent &&  <button className='text-center text-xl w-full' type='submit' >Sign Up </button>}
            {sent && <Link href='/home' >Account created! Return to home.</Link>}
      {errored && <h1></h1>}
            </div>
            
          </div>
    </div>
    </form>
      
    </div>
    </div> 
    
    </div>
    <div className='col-start-1 col-span-4 row-start-5 max-sm:self-start md:self-center ' >
      <Footer/>
    </div>
  
    
  </div>
  )
}

export default SignUp