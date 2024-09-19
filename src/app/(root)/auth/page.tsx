'use client'
import React,{useState,useRef} from 'react'
import {useSession,signIn,signOut} from "next-auth/react"
type Props = {}

const Auth = (props: Props) => {
    const {data:session}=useSession();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    if(session){
      console.log('curr session is:'+ session)
    }
    const handleEmailChange=()=>{
      if(emailRef?.current){
        setEmail(emailRef?.current?.value)
      }
       
    }
    const handlePassChange=()=>{
      if(passwordRef?.current){
        setPassword(passwordRef?.current?.value)
      }
    }
    if (session) {
        return (
          <>
            Signed in as {session?.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )
      }
  return (
    <div className='' >
         Not signed in <br />
          <input className='' value={emailRef?.current?.value} placeholder='input user email' onChange={handleEmailChange} ref={emailRef} />
          <input className='' value={passwordRef?.current?.value} placeholder='input user password' onChange={handlePassChange} ref={passwordRef} />
          <button onClick={() => signIn('credentials',{username:email,password:password, callbackUrl:'http://localhost:3000/home'})}>Sign in with Email</button>
    </div>
  )
}

export default Auth