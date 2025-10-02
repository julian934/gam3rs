'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { filteredUpcomingVideos } from '@/app/lib/database/connections'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
type Props = {}

const Upcoming = (props: Props) => {

    const {data}=useQuery({
        queryKey:['upcomingVids'],
        queryFn:()=>filteredUpcomingVideos()
    });

  return (
    <div className='flex' >
    
      <h1 className='flex justify-self-center self-center ' >  Stay tuned! Videos released by the Gam3rs Network will be released soon! </h1>
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
      {/*!data && <div className='flex flex-row justify-around' >
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
      </div>
  )
}

export default Upcoming