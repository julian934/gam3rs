'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import MuxPlayer from '@mux/mux-player-react'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import { filteredLatestVideos } from '@/app/lib/database/connections'
import Featured from '@/app/components/ui/templates/featuredvideos/featured'
import FeaturedPlaceHolder from '@/app/components/ui/templates/placeholders/featured'
import Link from 'next/link'
import { useEffect } from 'react'
import Thumbnail from '../thumbnail/thumbnail'
import { cn } from '@/app/lib/utils'
import Gif from '../gif/gif'
type Props = {}

const Latest = (props: Props) => {
    //const [dataState,setDataState]=useState<any>();
    const {data}=useQuery({
        queryKey:['latestVideos'],
        queryFn:()=>filteredLatestVideos(),
        enabled: !!filteredLatestVideos
    });
useEffect(()=>{
if(data!=undefined){
  const currData=data
  //setDataState(currData)
}

},[data])
if(data){
  console.log(data)
}

const dataState = data?.data?.data || []; // Directly access nested data safely
if(dataState){
  console.log(dataState)
}
  return (
    <div className='flex justify-around bg-white max-sm:self-center max-sm:flex-col bg-slate-50 rounded-md  md:w-full md:h-1/4 ' >
    <div className='w-[200px]  space-y-5 p-4 flex  max-sm:flex-col bg-white md:self-center' >
      
      <h1 className='flex justify-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-32 text-white ' > 
        Latest Videos 
        </h1>
      {/*  <h1>{props?.currentUser}</h1>*/}
    </div>
    {data!==undefined?<div className='w-[200px]  space-y-5  p-4 max-sm:self-center flex  max-sm:flex-col bg-white  md:mb-2 md:justify-self-center md:self-center  md:z-60 md:flex-row md:self-start  md:w-full md:h-full md:space-x-4' >
      <h1 className='' >{dataState?.data?.data?.title} </h1>
      {dataState && dataState.map((vals:any)=>
      <Link className=' md:flex md:self-start  md:self-end ' href={`/videos/${vals?.playbackID}`} key={vals?.playbackID}  >
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
    
  <div className='flex z-60' >
      <Link className='self-center text-lg' href='/allVideos' >
      <h1 className='flex justify-center text-lg flex rounded-sm transition ease-in-out animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-24 text-white ' > 
        View All
        </h1>
        </Link>
  </div>
    </div>
  )
}

export default Latest