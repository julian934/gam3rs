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
import Plus from '../../../../utils/images/icons8-add-new-50.png'
import Gam3rs_Video_Modal from '@/app/utils/images/redesign/Gam3rs_Videos_Menu_Modal.png'
import Add_Button from '@/app/utils/images/redesign/Gam3rs_Mobile_Menu_Options_Lower.png'
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
console.log('Current available latest videos: ', data)
const dataState = data?.data || []; // Directly access nested data safely
if(dataState){
  console.log(dataState)
}
  return (
    <div className='flex flex-col  justify-around  max-sm:self-center max-sm:justify-center max-sm:flex-col bg-black rounded-md  w-full md:h-1/4 ' >
    <div className='w-full space-y-5 p-4 flex  max-sm:flex-col  md:self-center md:justify-between md:p-4 ' >
   
   {/*  <h1 className='text-xl' >Games</h1> */}
   <h1 className='flex max-sm:relative max-sm:left-2 h-8 font-Gardion justify-center md:z-[9999]  self-center text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-40 text-white ' > 
    Recent Videos
     </h1>
    
     <div className='flex max-sm:relative max-sm:top-6 max-sm:space-x-2 md:z-[9999] md:justify-around md:w-[10vw]  ' >
     <div className=' relative  -top-2 rounded-md shadow-2xl -left-2 w-10  h-10 hover:scale-125 ' >
           <Link href='/testUploadRedux' className='  ' > 
            <Image className='absolute h-6 w-6 top-2 left-[0.5vw]  z-50  ' src={Plus} alt='Plus' /> 
            <Image className='absolute scale-[5.5] -top-2   z-40 ' src={Add_Button} alt='Add_Body' />
          
           </Link>
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
    {data!==undefined?<div className='w-[300px]  space-y-5  p-4 max-sm:self-center flex  max-sm:flex-col bg-black md:-mt-4 md:mb-8 md:pb-8 md:justify-self-center md:self-center  md:z-60 md:flex-row md:self-start  md:w-full md:h-full md:space-x-10' >
      <h1 className='' >{data?.data?.title?.split(':')?.filter((val:string)=>val!='filename' && val!=':')?.join('')} </h1>
      {/*dataState && dataState?.length>0 && dataState?.slice(0, 3)?.map((vals:any)=>
      <Link className='md:flex md:self-start  rounded-md md:w-[300px]  border-2 border-black ' href={`/videos/${vals?.playbackId}`} key={vals?.playbackId}  >
         <div className='absolute bg-red-900 w-36 h-6 top-[108.75vh] left-[7vw] skew-x-[0.85rad] ' >
            
            </div> 
            <div className='absolute bg-red-900 w-10 h-6 top-[107vh]  -rotate-45  left-[17.5vw] z-[9999] ' >

            </div>
            <div className='absolute bg-red-900 w-36 h-6 top-[92.5vh] -skew-x-[0.85rad]  rotate-90  left-[15vw] -ml-2 top-12  ' >

            </div>
         
       <div className='md:w-full z-[9999] ' > 
        
           <Gif playbackID={vals?.playbackId} fileName={vals?.fileName} />
       </div>
      
       </Link>)*/}
       {dataState && dataState.length > 0 && dataState.filter((val:any)=>val?.playbackId!=null && val?.playbackId!=undefined).slice(0, 3).map((vals: any) => (
  <Link
    href={`/videos/${vals?.playbackId}`}
    key={vals?.playbackId}
    className="relative flex flex-col items-center rounded-md md:w-[300px] md:-mt-8  "
  >
    {/* Decorative shapes positioned relative to this card */}
    {/*vals.playbackId!=undefined && <div className="absolute bg-red-900 w-36 h-10 top-96 left-36 -mt-8 -ml-4  skew-x-[0.85rad] rounded-md " />*/}
    {/*vals.playbackId!=undefined &&  <div className="absolute bg-red-900 w-8 h-2 top-96 -mt-2 -ml-2 left-72 z-[9999] right-4 -skew-x-[0.65rad] -rotate-45 z-20 rounded-2xl" />*/}
    {/*vals.playbackId!=undefined &&  <div className="absolute bg-red-900 w-36 h-6 bottom-20 left-48 ml-8 -skew-x-[0.85rad] rotate-90  rounded-md" />*/}
  

    {/* Main content */}
   
    <div className="w-full z-30  ">
       <div className='absolute z-50 md:-left-20 md:pl-4 md:-top-32 md:mt-0 min-w-full min-h-full md:w-[35vw] md:h-[82.5vh]'   >
      <Image className='w-full' src={Gam3rs_Video_Modal} alt='File Modal' />
    </div>
      <Gif playbackID={vals?.playbackId} fileName={vals?.fileName?.split(':')?.filter((val:string)=>val!='filename' && val!=':')?.join('')} />
    </div>
  </Link>
))}

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