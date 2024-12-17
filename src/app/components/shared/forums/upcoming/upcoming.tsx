'use client'
import React,{useState, useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useQuery } from '@tanstack/react-query'
import { getUpcomingForums } from '@/app/lib/database/connections'
type Props = {}

const Upcoming = (props: Props) => {
 
  //Upcoming conversations with the developers/owners of the site that will be made public 
  //at a later date, sorted based on how soon it happens compared to current date.
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['upcomingForums'],
    queryFn:()=>getUpcomingForums()
  });
  data && console.log(data)
  return (
    <div className='' >
      Upcoming
      </div>
  )
}

export default Upcoming