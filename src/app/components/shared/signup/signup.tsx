import { useContext, useState,useRef } from "react"
import React from 'react'
import { useSession } from "next-auth/react"
import { StoreStateContext } from "@/app/lib/context/storeContext"
import { signup } from "@/app/lib/signup/signup"
type Props = {}

const SignUp = (props: Props) => {
    const [testState,setTestState]=useState([]);
  //type inputTypes=`${SetStateAction<string>}`
  const [username,setUserName]=useState<string>('johnsmith@gmail.com');
  const [password,setPassWord]=useState<string>('johnsmith111');
  const [signin,setSignIn]=useState('signup')
  const ctx=useContext(StoreStateContext);
  const {data:session,status,update}=useSession();
  const userNameRef=useRef<HTMLInputElement | null>(null);//implement typescript types
   const passwordRef=useRef<HTMLInputElement | null>(null);
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
  return (
    <div className="" >
        <form className='' onSubmit={submitSignUp} >
         <div className='' >
        <h2>Input UserName</h2>
         <input className=''  onChange={handleUserChange} ref={userNameRef} type="text" name='name'  />
      </div>
      <div className='' >
        <h2 className='' >Input Password</h2>
        <input className='' onChange={handlePassChange} ref={passwordRef} type="text" name='pass'  />
      </div>
      <div className='' >
        <button className='' type='submit' >Sign Up </button>
      </div>
      {!username || !password && <div className='' >
        <h1 className='' >Please enter a username and password</h1>
        </div>}
      </form>
     
    </div>
  )
}

export default SignUp