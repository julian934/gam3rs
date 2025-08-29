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
import { HoverEffect } from '@/app/components/ui/forums/forumHover';
import MobileNav from '@/app/components/shared/modals/mobileNav';

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
        const currData:any=data
        const preview:any=currData?.data?.data
        const filteredData=preview?.map((vals:any)=>{
           return {
            title:vals.name,
            description:vals.description,
            link:`/forum/${vals._id}`
           }
        });
        setforumData(filteredData);
      }
      //setforumData(currData)
      console.log(forumData)
    
    
  },[data])
  data && console.log(data)
  data && console.log(forumData)
  return (
    <div className='flex grid grid-cols-4 grid-rows-4 bg-white ' >
      <div className='col-start-1 col-span-4 row-start-1' >
         <NavBar/>
      </div>
      <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
     
      <div className='flex z-60 p-6' >
     
      <h1 className='flex justify-center h-10 text-lg flex rounded-sm transition ease-in-out animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-24 text-white ' > 
      All Forums
        </h1> 
        
  </div>
      <div className=' flex flex-wrap row-start-2 row-span-3  col-start-2 self-center col-span-2 z-50 '  >{/*Body */}
          {/*forumData && forumData.map((vals:any)=><div key={vals._id} className='' > 
            <Link href={`/forum/${vals._id}`} >
            <HoverEffect items={forumData} />
            <h1 className='' >{vals.name}</h1>
            </Link>
          </div>)*/}
          {forumData && data && <HoverEffect items={forumData} />}
      </div>
      <div className='col-start-1 col-span-4 flex justify-center row-start-4 ' >
         <Footer/>
      </div>
      </div>
  )
}

export default AllForums