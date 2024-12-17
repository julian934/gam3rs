'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import { getForums } from '@/app/lib/database/connections';
import type { AxiosResponse } from 'axios';
import type { SetStateAction } from 'react';
import Link from 'next/link';
type Props = {}

const AllForums = (props: Props) => {
  const [forumData,setforumData]=useState<AxiosResponse<any, any> | SetStateAction<never[] > | SetStateAction<any[] | any>>([]);
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['forums'],
    queryFn:getForums
  });
  useEffect(()=>{
    
      
      if(data){
       // console.log(data?.data?.data)
        const currData:any=data
        setforumData(currData?.data?.data)
      }
      
      //setforumData(currData)
      console.log(forumData)
    
    
  },[forumData,data])
  data && console.log(data)
  data && console.log(forumData)
  return (
    <div className='flex grid grid-cols-4 grid-rows-4 bg-white ' >
      <div className='col-start-1 col-span-4 row-start-1' >
         <NavBar/>
      </div>
      AllForums
      <div className='row-start-2 row-span-2 col-start-2 z-50 '  >{/*Body */}
          {forumData && forumData.map((vals:any)=><div key={vals._id} className='' > 
            <Link href={`/forum/${vals._id}`} >
            <h1 className='' >{vals.name}</h1>
            </Link>
          </div>)}
      </div>
      <div className='col-start-4 row-start-4' >
         <Footer/>
      </div>
      </div>
  )
}

export default AllForums