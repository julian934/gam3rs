'use client'
import React,{useState,useRef, SetStateAction,useEffect} from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';
import { signup } from '../../lib/signup/signup';
import SignUp from '@/app/components/shared/signup/signup';
import SignIn from '@/app/components/shared/signin/signin';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
type Props = {}

const Auth = (props: Props) => {
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
    <div className='flex flex-col' >
       <div className='' >
        <h2>Username</h2>
         <input className=''  onChange={handleUserChange} ref={userNameRef} type="text" name='user'  />
      </div>
      <div className='' >
        <h2 className='' >Password</h2>
        <input className='' onChange={handlePassChange} ref={passwordRef} type="text" name='email'  />
      </div>
      <div className='' >
        <button className='' onClick={()=>signIn('credentials',{username:username,password:password,callbackUrl:'/'})} >Sign In </button>
      </div>
    
      
    </div>
  )
}

export default Auth