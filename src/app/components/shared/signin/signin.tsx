'use client'
import { useSession } from 'next-auth/react'
import React,{useState,useContext,useRef} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { signIn } from 'next-auth/react'
type Props = {}

const SignIn = (props: Props) => {
    const [username,setUserName]=useState<string>('johnsmith@gmail.com');
  const [password,setPassWord]=useState<string>('johnsmith111');
  const [signin,setSignIn]=useState('signup')
  const ctx=useContext(StoreStateContext);
  const {data:session,status,update}=useSession();
  const userNameRef=useRef<HTMLInputElement | null>(null);//implement typescript types
   const passwordRef=useRef<HTMLInputElement | null>(null);
   const handleUserChange=()=>{
    setUserName(userNameRef?.current?.value || '');

  }
  const handlePassChange=()=>{
    setPassWord(passwordRef?.current?.value || '' );
  }
    const submitSignIn=()=>{
        signIn('credentials',{username:username,password:password,callbackUrl:'/'})
      }
      console.log(username)
      console.log(password)
      console.log(session)
      console.log(status)
      
  return (
    <div className='' >
        <form className='' onSubmit={()=>signIn('credentials',{user:username,email:password,callbackUrl:'/'})} >
         <div className='' >
        <h2>Username</h2>
         <input className=''  onChange={handleUserChange} ref={userNameRef} type="text" name='user'  />
      </div>
      <div className='' >
        <h2 className='' >Password</h2>
        <input className='' onChange={handlePassChange} ref={passwordRef} type="text" name='email'  />
      </div>
      <div className='' >
        <button className='' type='submit' >Sign In </button>
      </div>
      {!username || !password && <div className='' >
        <h1 className='' >Please enter a username and password</h1>
        </div>}
      </form>
    </div>
  )
}

export default SignIn