'use client'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { filteredPopVideos } from '@/app/lib/database/connections'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import Featured from '@/app/components/ui/templates/featuredvideos/featured'
import Link from 'next/link'
import Thumbnail from '../thumbnail/thumbnail'
import { cn } from '@/app/lib/utils'
import Gif from '../gif/gif'
import Image from 'next/image'
//import addbutton from '../../../../utils/images/icons8-add-new-50.png'
import Plus from '../../../../utils/images/icons8-add-new-50.png'
import Gam3rs_Video_Modal from '@/app/utils/images/redesign/Gam3rs_Videos_Menu_Modal.png'
import Add_Button from '@/app/utils/images/redesign/Gam3rs_Mobile_Menu_Options_Lower.png'
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
    if(data){
      console.log(data)
    }
    
    const dataState = data?.data?.data || []; // Directly access nested data safely
  return (
    <div className='flex flex-col justify-around max-sm:relative max-sm:left-[15vw]  max-sm:self-center max-sm:flex-col  rounded-md  w-full md:h-1/3 ' >
   <div className='w-full space-y-5 p-4 flex  max-sm:flex-col  md:self-center md:justify-between md:p-4 ' >
   
   {/*  <h1 className='text-xl' >Games</h1> */}
   <h1 className='flex md:h-8 font-Gardion justify-center md:z-[9999]  md:self-center text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-48 text-white ' > 
    Popular Videos
     </h1>
    
     <div className='flex max-sm:relative max-sm:top-6 max-sm:space-x-2 md:z-[9999] md:justify-around md:w-[10vw]  ' >
      <div className=' relative  -top-2 rounded-md shadow-2xl -left-2 w-10  h-10 hover:scale-125  ' >
           <Link href='/testUploadRedux' className='  ' > 
            <Image className='absolute h-6 w-6 top-2 left-[0.5vw]  z-50  ' src={Plus} alt='Plus' /> 
            <Image className='absolute scale-[5.5] -top-2   z-40 ' src={Add_Button} alt='Add_Body' />
          
           </Link>
           </div>
     <div>
   <Link className='self-center max-sm:relative max-sm:-top-2  max-sm:left-32  text-lg md:z-[9999] md:mt-10 ' href='/allVideos' >
   <h1 className='flex md:z-[9999] font-Gardion justify-center text-lg flex transition ease-in-out rounded-sm animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-24 text-white ' > 
     View All 
     </h1>
   </Link>
</div>
     </div>
   
 </div>
    {data!==undefined?<div className='w-[200px]  max-sm:self-center max-sm:justify-around space-y-5  p-4  md:mb-2 flex  max-sm:flex-col    md:-mb-2 justify-self-center md:self-center  md:z-60 md:flex-row md:self-start  md:w-full md:h-full md:space-x-4' >
      <h1 className='' >{dataState?.data?.data?.title} </h1>
      {dataState && dataState.map((vals:any)=>
      <Link className=' md:flex md:self-center  rounded-md md:w-[200px] ' href={`/videos/${vals?.playbackId}`} key={vals?.playbackId}  >
        <div className='absolute z-50 max-sm:left-[0.5vw] max-sm:-top-[37.5vh] max-sm:w-full max-sm:h-full md:pl-[1px] md:-ml-10 md:top-[44rem]  md:w-full md:s md:h-1/2  space-x-4'   >
      <Image className='w-1/3 max-sm:w-full h-full max-sm:overflow-hidden max-sm:scale-y-[0.475] max-sm:scale-x-[1.2]  md:left-2 ' quality={100} src={Gam3rs_Video_Modal} alt='File Modal' />
    </div>
        <div className='md:w-full' >
            <Gif playbackID={vals.playbackId} fileName={vals.fileName?.split(':')?.filter((val:string)=>val!='filename' && val!=':')?.join('')} />
        </div>
         
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

export default Popular