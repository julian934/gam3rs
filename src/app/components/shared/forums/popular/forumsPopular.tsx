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
import Image from 'next/image'
import addbutton from '../../../../utils/images/icons8-add-new-50.png'
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
    <div className='flex flex-col md:z-[9999] max-sm:self-center max-sm:w-full max-sm:px-4 justify-around rounded-md bg-white md:w-full md:h-1/4' >
    <div className='w-full space-y-5 p-4 flex  max-sm:flex-col bg-white md:self-center md:justify-between md:p-4 ' >
   
   {/*  <h1 className='text-xl' >Games</h1> */}
   <h1 className='flex h-8 font-Gardion  justify-center md:z-[9999]  md:self-center text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-48 text-white ' > 
    Popular Forums
     </h1>
    
     <div className='flex  md:z-[9999] md:justify-around md:w-[10vw]  ' >
     <div className=' md:relative md:md:relative md:-top-2 rounded-md shadow-2xl bg-white hover:bg-gray-400 w-10 h-10' >
           <Link href='/createForum' className=' ' > <Image className='h-10 w-10' src={addbutton} alt='createForum' /> </Link>
           </div>
     <div>
   <Link className='self-center text-lg md:z-[9999] md:mt-10 ' href='/allForums' >
   <h1 className='flex font-Gardion md:z-[9999]  justify-center text-xl flex transition ease-in-out rounded-sm animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-24 text-white ' > 
     View All 
     </h1>
   </Link>
</div>
     </div>
   
 </div>
     {data? <div className='w-[200px] max-sm:w-full relative md:-top-12 p-4  flex  max-sm:flex-col bg-white  md:mb-0 md:justify-self-center md:self-start md:border-black md:flex-row md:w-full md:h-1/4 md:space-x-4' >
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

export default Popular