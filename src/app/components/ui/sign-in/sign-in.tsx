'use client'
import { Label } from "../label/label";
import { Input } from "../input/input";
import { cn } from "../../../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import React,{useState,useRef, SetStateAction,useEffect,useContext} from 'react';
import { useSession } from "next-auth/react";
import { StoreStateContext } from "@/app/lib/context/storeContext";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { signup } from '../../../lib/signup/signup';
import axios from "axios";
import Link from "next/link";

type Props = {}

const SignIn = (props: Props) => {
  const [testState,setTestState]=useState([]);
  //type inputTypes=`${SetStateAction<string>}`
  const [username,setUserName]=useState<string>('johnsmith@gmail.com');
  const [password,setPassWord]=useState<string>('johnsmith111');
  const [authStatus,setAuthStatus]=useState('Unauthenticated')
  const [signin,setSignIn]=useState('signup')
  const ctx=useContext(StoreStateContext);
  const {data:session,status,update}=useSession();
  const userNameRef=useRef<HTMLInputElement | null>(null);//implement typescript types
   const passwordRef=useRef<HTMLInputElement | null>(null);
   useEffect(()=>{
      if(session){
        setAuthStatus('Authenticated')
      }
   },[authStatus])
    const submitSignUp=async()=>{
      
      if(signup){
        const data=await signup
        data.username=await username;
        data.password=await password;
        let check=await ctx.userCheck(username,password)
        
        const sendData=await fetch('/api/db/signup',{
          method:"POST",
          body:JSON.stringify({data:data}),
          headers:{
            "Content-Type":"application/json"
          }
         })

         const result=await sendData.json();
         console.log(result);
         return sendData;
      }
       

    }
    const handleUserChange=()=>{
      setUserName(userNameRef?.current?.value || '');

    }
    const handlePassChange=()=>{
      setPassWord(passwordRef?.current?.value || '' );
    }
    const handleSignIn=()=>{
      if(signin){
        setSignIn('signin');
      };
      setSignIn('signup');
    };
    const submitSignIn=()=>{
      signIn('credentials',{username:username,password:password,redirect:false})
    }
      console.log('user:'+ username, 'password: ' + password)
      console.log(session)
    if(session) return(<div className='flex flex-col' >
      <h1 className='' >Welcome User!</h1>
      <button onClick={()=>signOut()} >Sign Out</button>
    </div>)
   if(signin == 'signin') return ( <div className='flex flex-col' >
   
    <div className='' >
        <button className='' onClick={handleSignIn}  >Click to Sign Up </button>
        </div> 
    {!username || !password && <div className='' >
      <h1 className='' >Please enter a username and password</h1>
      </div>}
  </div>)
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl  p-4 md:p-8 shadow-input bg-white dark:bg-black z-0 ">
    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
      Welcome to The Gam3r Network
    </h2>
    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
      Login to The Gam3r Network if you have an account. If you don't have one, you 
      can  <Link href='/signupRedux' >create an account here.</Link>
    </p>

    <div className="my-8" >
      
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input  onChange={handleUserChange} ref={userNameRef}  id="email" placeholder="projectmayhem@fc.com" type="email" />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input  onChange={handlePassChange} ref={passwordRef} id="password" placeholder="••••••••" type="password" />
      </LabelInputContainer>
    

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
        onClick={()=>signIn('credentials',{username:username,password:password,callbackUrl:'/'})}
      >
         
        Sign In &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            GitHub
          </span>
          <BottomGradient />
        </button>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
       
      </div>
    </div>
  </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignIn