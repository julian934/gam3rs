'use client'
import React,{useState,useEffect,useRef,useContext} from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useQuery } from '@tanstack/react-query';
type Props = {}

const Notifications = (props: Props) => {
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['notifications'],
    queryFn:()=>{}
  })
  return (
    <div className='flex flex-col' >
      
      <h1 className='flex self-center' > Notifications</h1>
      </div>
  )
}

export default Notifications