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
    <div className='flex h-92 w-92 flex-col md:flex-row md:w-full md:border-2 md:border-black md:h-[200px] ' >
      
      <h1 className='' >Latest</h1>
      
      <div className='' >
          {/*data && data.map((vals:any)=>{
            <MuxPlayer
            playbackId={playBackID}
           metadata={{
              video_id:userVideoID,
              video_title:userVideoTitle,
              viewer_user_id:viewer_user_id
          }}/>
          })*/}
      </div>
      
      {/*!data && <div className='flex flex-row justify-around h-60 ' >
        <Card className="w-60 space-y-5 p-4 flex max-sm:flex-col bg-red-200 " radius="lg">
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
        </div>*/}
        {dataState && dataState.map((vals:any)=><div className='flex flex-col md:w-full space-y-4 p-2 md:h-[200px]  ' key={vals.playbackID} >
          <Link  href={`/videos/${vals.playbackID}`} >
                <Thumbnail playbackId={`${vals.playbackID}`} />
                <div className="flex flex-col  z-60 ">
                <h2 className='flex text-center self-center ' >{vals.fileName}</h2>
                
            </div>
             
              {/* <Featured  currentData={vals} /> */}
          </Link>
         
        </div>)}
      </div>
  )
}

export default Latest