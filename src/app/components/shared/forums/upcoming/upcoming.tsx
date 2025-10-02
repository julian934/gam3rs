'use client'
import React,{useState, useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useQuery } from '@tanstack/react-query'
import { getUpcomingForums } from '@/app/lib/database/connections'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
type Props = {}

const Upcoming = (props: Props) => {
 
  //Upcoming conversations with the developers/owners of the site that will be made public 
  //at a later date, sorted based on how soon it happens compared to current date.
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['upcomingForums'],
    queryFn:()=>getUpcomingForums()
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
    <div className='flex max-sm:flex-col' >
    
      <h1 className='flex justify-self-center self-center ' >  Stay tuned! New Forums released by the Gam3rs Network will be released soon! </h1>
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