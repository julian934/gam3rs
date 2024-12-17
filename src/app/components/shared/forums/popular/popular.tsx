'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useQuery } from '@tanstack/react-query'
import { getPopularForums } from '@/app/lib/database/connections'
type Props = {}

const Popular = (props: Props) => {
  //Create an array of forums based on which three have the largest number of threads.
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['popularForums'],
    queryFn:()=>getPopularForums()
  });
  data && console.log(data)
  return (
    <div className='flex' >
      <h1 className='' > Popular </h1>
      <div className='' >
           {data && data?.data?.data.map((vals:any)=><div>
            <h1 className='' >{vals.name}</h1>
            <p className='' >{vals.description}</p>
           </div>)}
      </div>
      </div>
  )
}

export default Popular