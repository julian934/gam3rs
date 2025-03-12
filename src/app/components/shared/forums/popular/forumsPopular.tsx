'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useQuery } from '@tanstack/react-query'
import { getPopularForums } from '@/app/lib/database/connections'
import Link from 'next/link'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
//import { HoverEffect } from '@/app/components/ui/hover-effect/hover-effect'
import { HoverEffect } from '@/app/components/ui/hover-effect/forums-hover-effect'
type Props = {}

const Popular = (props: Props) => {
  //Create an array of forums based on which three have the largest number of threads.
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['popularForums'],
    queryFn:()=>getPopularForums()
  });
  data && console.log(data)
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
  return (
    <div className='flex max-sm:flex-col max-sm:self-center justify-around rounded-md bg-white md:w-full md:h-1/4' >
    <div className='w-[200px] space-y-5 p-4 flex  max-sm:flex-col bg-white md:self-center' >
      <h1 className='flex justify-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-32 text-white ' >Popular Forums</h1>
     </div>
    
    {data? <div className='w-[200px] space-y-5 max-sm:self-center max-sm:w-[350px]  p-4  flex  max-sm:flex-col bg-white  md:mb-0 md:justify-self-center md:self-start md:border-black md:flex-row md:w-full md:h-full md:space-x-4' >
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
     <div className='flex z-60' >
    <Link className='self-center text-lg' href='/allForums' >
    <h1 className='flex justify-center text-lg flex rounded-sm transition ease-in-out animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-24 text-white ' > 
      View All
      </h1>
      </Link>
</div>
    
    </div>
  )
}

export default Popular