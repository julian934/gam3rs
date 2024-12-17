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
  return (
    <div className='flex grid grid-cols-4 grid-rows-4 h-screen '>
      <div className='flex row-start-1 col-start-1 col-span-4' > 
        <NavBar/>
      </div>
    <form className='flex flex-col self-center col-start-2 col-span-2 row-start-2 row-span-2 z-50 ' onSubmit={handleSubmit}  >
      {!sent && <input className='' onChange={handleUser} ref={username}  placeholder='Username/email' />}
      {!sent && <input className=''  onChange={handlePass}  ref={password}  placeholder='password' />}  
      {!sent &&  <button className='' type='submit' >Sign Up </button>}
   
      
      {sent && <Link href='/home' >Account created! Return to home.</Link>}
      {errored && <h1></h1>}
    </form>
    <div className='flex row-start-4 col-start-1 col-span-4 self-center justify-center' >
    <Footer/>
    </div>
    
    </div>
  )
}

export default SignUp