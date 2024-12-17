'use client'
import React from 'react';
import { useState,useEffect,useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

type Props = {}

const Account = (props: Props) => {
    const [username,setUsername]=useState<string>('');
    const [password,setPassWord]=useState<string>('');
    const user=useRef<HTMLInputElement | null>(null);
    const pass=useRef<HTMLInputElement | null>(null);
    const handleUser=()=>{
        setUsername(user?.current?.value || '')
    }
    const handlePass=()=>{
        setPassWord(pass?.current?.value || '')
    }
    const handleSubmit=()=>{

    }
    const handleDelete=()=>{

    }
  return (
    <div className=''>
        <h1 className='' >Account</h1>
        <form className='' onSubmit={handleSubmit} >
        <input className='' ref={user} onChange={handleUser} />
        <input className='' ref={pass} onChange={handlePass} />
        <button className='' onClick={handleDelete} >Delete Account?</button>
        </form>
        
    </div>
  )
}

export default Account