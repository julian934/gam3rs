'use client'
import React,{useState,useEffect} from 'react'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import { useQuery } from '@tanstack/react-query'
import { connectDB } from '@/app/lib/database/connections';
//import { getForums } from '@/app/api/forums/getall/route'
import { getForums } from '@/app/lib/database/connections'
import Link from 'next/link'
import Image from 'next/image'
//import { HoverEffect } from '../../ui/hover-effect/hover-effect'
import { HoverEffect } from '../../ui/forums/forumHover'
type Props = {
  
  name?:string | null | undefined,
  id?:string | number | undefined,
  image?: string | ImageData | undefined
  currentUser?:string | null | undefined    
}
const Forums = (props: Props) => {
  const {data,error,isLoading}=useQuery({
    queryKey:['forums'],
    queryFn:()=>getForums()
  });
  const [dataState,setDataState]=useState<any>([]);
  useEffect(()=>{
    const currData:any=data;
    if(currData){
      const preview:any=currData.data.data.slice(0,3)
      const filteredData=preview.map((vals:any)=>{
         return {
          title:vals.name,
          description:vals.description,
          link:`/forum/${vals._id}`
         }
      });
      setDataState(filteredData);
    }

  },[data])
  if(dataState){
    console.log(dataState)
  }
    {/* <h1 className='flex' >{vals.name}</h1> */}
  return (
    <div className='flex flex-col max-sm:self-center max-sm:w-full max-sm:px-4 justify-around rounded-md bg-white md:w-full md:h-1/4' >
      <div className='w-full space-y-5 p-4 flex  max-sm:flex-col bg-white md:self-center md:justify-between md:p-4 ' >
     
     {/*  <h1 className='text-xl' >Games</h1> */}
     <h1 className='flex h-8 justify-center md:self-center text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > 
       Forums
       </h1>
       <div>
       <div className='flex' >
     <Link className='self-center text-lg' href='/allForums' >
     <h1 className='flex  justify-center text-xl flex transition ease-in-out rounded-sm animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > 
       View All 
       </h1>
     </Link>
 </div>
       </div>
     
   </div>
       {data? <div className='w-[200px] max-sm:w-full relative md:-top-20 p-4  flex  max-sm:flex-col bg-white  md:mb-0 md:justify-self-center md:self-start md:border-black md:flex-row md:w-full md:h-1/4 md:space-x-4' >
           <HoverEffect items={dataState} />
         </div>:<>
        <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-red-200 " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
  <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-red-200 " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
  <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-red-200 " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
       </>}
      
  
    </div>
  )
}

export default Forums