'use client'
import React,{useState, useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useQuery } from '@tanstack/react-query'
import { getRecentForums } from '@/app/lib/database/connections'
type Props = {}

const Recent = (props: Props) => {
  //Find threads from all the different forums and choose the top three that have the shortest amount of time difference from then to now.
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['RecentForums'],
    queryFn:()=>getRecentForums()
  });
  data && console.log(data)
  return (
    <div className='flex flex-col' >
      
      <h1 className='' >Recent Forums</h1>
      <div className='' >
      {data && data?.data?.data?.map((vals:any)=><div className='flex flex-col' >
         <h1 className='text-lg' >{vals.name}</h1>
         <p className='' >{vals.description}</p>
      </div>)}
      </div>
      
      </div>
  )
}

export default Recent