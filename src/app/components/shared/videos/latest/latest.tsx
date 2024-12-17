'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import MuxPlayer from '@mux/mux-player-react'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import { filteredLatestVideos } from '@/app/lib/database/connections'
import Featured from '@/app/components/ui/templates/featuredvideos/featured'
import FeaturedPlaceHolder from '@/app/components/ui/templates/placeholders/featured'
type Props = {}

const Latest = (props: Props) => {

    const {data}=useQuery({
        queryKey:['latestVideos '],
        queryFn:()=>filteredLatestVideos()
    });

  return (
    <div className='flex h-92 w-92 flex-col' >
      
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
        {data && data?.data?.data.map((vals:any)=><div className='flex max-sm:flex-col md:flex-row space-y-8 ' key={vals._id} >
        <Featured key={vals._id}  currentData={vals} />
        </div>)}
      </div>
  )
}

export default Latest