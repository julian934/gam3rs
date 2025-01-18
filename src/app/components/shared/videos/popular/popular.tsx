'use client'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { filteredPopVideos } from '@/app/lib/database/connections'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import Featured from '@/app/components/ui/templates/featuredvideos/featured'
import Link from 'next/link'
import Thumbnail from '../thumbnail/thumbnail'
type Props = {}

const Popular = (props: Props) => {
    const {data}=useQuery({
        queryKey:['popularVideos'],
        queryFn:()=>filteredPopVideos()
    })
    
    if(data){
      console.log("Popular Videos: ", data)
    }
    useEffect(()=>{

    })
  return (
    <div className='flex h-92 w-92 flex-col md:flex-row md:w-full md:border-2 md:border-black md:h-[200px] ' 
    >
      {/*  <h1 className='' >Popular</h1>
      <div className='' >
           {/*data && data.map((vals:any)=>{
            <MuxPlayer
            playbackId={playBackID}
           metadata={{
              video_id:userVideoID,
              video_title:userVideoTitle,
              viewer_user_id:viewer_user_id
          }}/>
          })
      </div>
      {!data && <div className='flex flex-row justify-around md:flex-row' >
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
        </div>}
        {data && data?.data?.data.map((vals:any)=><div className='flex max-sm:flex-col md:flex-row space-y-4 p-2 ' key={vals._id} >
        <Featured key={vals._id}  currentData={vals} />
        </div>)}*/}

     <h1 className='' >Popular</h1>
     {data && data?.data?.data.map((vals:any)=><div className='flex flex-col md:w-full space-y-4 p-2 md:h-[200px]  ' key={vals.playbackID} >
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

export default Popular