'use client'
import React, { useEffect ,useState} from 'react'
import Featured from '../../banners/livestreams/featured'
import { useQuery } from '@tanstack/react-query'
import Placeholder from '@/app/components/ui/placeholder/placeholder'
//import { Card,Skeleton } from '@nextui-org/react';
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import { connectDB } from '@/app/lib/database/connections'
import Link from 'next/link'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useContext } from 'react'
import Image from 'next/image'
import { filteredLatestVideos } from '@/app/lib/database/connections'
import Thumbnail from '../thumbnail/thumbnail'
import { cn } from '@/app/lib/utils'
import Gif from '../gif/homeGif'

type User={
  username?:string | null | undefined,
  password: string | null | undefined,
  wishlistItems:any[] | null | undefined,
  cartItems: any[] | null | undefined,
  currentSettings:any[] | null | undefined
}
/* 
type Props = {
  
  name?:string | null | undefined,
  id?:string | number | undefined,
  image?: string | ImageData | undefined
  currentUser?:string | null | undefined    
}
*/
type Props={
  user?:User | undefined | null | never
}

const Videos = (props: any) => {
  const ctx=useContext(StoreStateContext);
 // const [dataState,setDataState]=useState<any>([]);
  const {data}=useQuery({
    queryKey:['homevideo'],
    queryFn:()=>filteredLatestVideos(),
    enabled: !!filteredLatestVideos
  });//default to most popular videos
  
  useEffect(()=>{
    //const user:any=ctx.userData?.username
    if(data!=undefined){
      // setDataState(data)
    }
  },[data])
  //Get Data from context
  const dataState = data?.data?.data || []; // Directly access nested data safely
  if(dataState){
    console.log("Current Data: ", data)
  }
   return(  <div className='flex justify-around  max-sm:self-center flex-col max-sm:w-full max-sm:px-4 bg-white rounded-md  md:w-full md:h-1/4 ' >
    <div className='w-full space-y-5 p-4 flex  max-sm:flex-col bg-white md:self-center md:justify-between md:p-4 ' >
     
     {/*  <h1 className='text-xl' >Games</h1> */}
     <h1 className='flex h-8 justify-center md:self-center text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > 
       Videos
       </h1>
       <div>
       <div className='flex' >
     <Link className='self-center text-lg' href='/games' >
     <h1 className='flex  justify-center text-xl flex transition ease-in-out rounded-sm animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > 
       View All 
       </h1>
     </Link>
 </div>
       </div>
     
   </div>
    {data!==undefined?<div className='w-[200px] max-sm:w-full  space-y-5  p-4  flex  max-sm:flex-col bg-white   md:mb-0 md:justify-self-center md:self-center md:border-black md:z-60 md:flex-row md:self-start  md:w-full md:h-full md:space-x-4' >
      <h1 className='' >{dataState?.data?.data?.title} </h1>
      {dataState && dataState.map((vals:any)=>
      <Link className=' max-sm:w-full md:flex md:self-start  md:self-end  ' href={`/videos/${vals.playbackID}`} key={vals?.playbackID} >
        
       <Gif playbackID={vals.playbackID} fileName={vals.fileName} />
      </Link>)}
    </div>:
    <><Card className="w-[200px] space-y-5 p-4 flex  max-sm:flex-col bg-white " radius="lg">
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
  <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-white " radius="lg">
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
  <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-white " radius="lg">
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

export default Videos