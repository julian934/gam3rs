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
import Image from 'next/image'
import addbutton from '../../../../utils/images/icons8-add-new-50.png'
type Props = {}

const Latest = (props: Props) => {
    //const [dataState,setDataState]=useState<any>();
    const {data}=useQuery({
        queryKey:['latestVideos'],
        queryFn:()=>filteredLatestVideos()
        //enabled: !!filteredLatestVideos
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
    <div className='flex flex-col  justify-around bg-white max-sm:self-center max-sm:flex-col bg-slate-50 rounded-md  md:w-full md:h-1/4 ' >
    <div className='w-full space-y-5 p-4 flex  max-sm:flex-col bg-white md:self-center md:justify-between md:p-4 ' >
   
   {/*  <h1 className='text-xl' >Games</h1> */}
   <h1 className='flex max-sm:relative max-sm:left-2 h-8 font-Gardion justify-center md:z-[9999]  md:self-center text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-40 text-white ' > 
    Recent Videos
     </h1>
    
     <div className='flex max-sm:relative max-sm:top-6 max-sm:space-x-2 md:z-[9999] md:justify-around md:w-[10vw]  ' >
     <div className=' relative  -top-2 rounded-md shadow-2xl bg-white hover:bg-gray-400 w-10  h-10  ' >
           <Link href='/testUploadRedux' className=' ' > <Image className='h-8 w-8' src={addbutton} alt='upload' /> </Link>
           </div>
     <div>
   <Link className='self-center  max-sm:relative max-sm:-top-2  max-sm:left-32 text-lg md:z-[9999] md:mt-10 ' href='/allVideos' >
   <h1 className='flex md:z-[9999]  font-Gardion justify-center text-lg flex transition ease-in-out rounded-sm animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-24 text-white ' > 
     View All 
     </h1>
   </Link>
</div>
     </div>
   
 </div>
    {data!==undefined?<div className='w-[200px]  space-y-5  p-4 max-sm:self-center flex  max-sm:flex-col bg-white  md:mb-2 md:justify-self-center md:self-center  md:z-60 md:flex-row md:self-start  md:w-full md:h-full md:space-x-4' >
      <h1 className='' >{data?.data?.data?.title} </h1>
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
    
 
    </div>
  )
}

export default Latest