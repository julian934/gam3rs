'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useQuery } from '@tanstack/react-query'
import { getAllVideos } from '@/app/lib/database/connections'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/general/page'
import type { AxiosResponse } from 'axios'
import Link from 'next/link'
import VideoCard from '@/app/components/shared/videos/gif/gif'
import Gif from '../../components/shared/videos/gif/gif'
import MobileNav from '@/app/components/shared/modals/mobileNav'

type Props = {}



const AllVideos = (props: Props) => {
 // const ctx=useContext(StoreStateContext);
 const [videoData,setVideoData]=useState<AxiosResponse<any,any> | any>([]);
  const {data}=useQuery({
    queryKey:['allVideos'],
    queryFn:()=>getAllVideos(),
    enabled:!!getAllVideos()
  });
  useEffect(()=>{
    if(data){
      const currData=data?.data?.data
     // setVideoData(currData)
     
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
    <div className='max-sm:flex max-sm:grid max-sm:grid-cols-4 max-sm:grid-rows-4 bg-white' >
      <div className='col-start-1 col-span-4 row-start-1' >
        <NavBar/>
      </div>
      <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      
      <div className=' flex flex-row flex-wrap w-full  max-sm:row-start-2 max-sm:row-span-2 flex-wrap max-sm:col-start-1 max-sm:col-span-4 bg-white' >
      {dataState && dataState.map((vals:any)=>
      <Link className=' p-2 md:h-92 md:w-92  max-sm:self-end ' href={`/videos/${vals?.playbackId}`} key={vals?.playbackId} >
       <Gif playbackID={vals?.playbackId} fileName={vals?.fileName} />
       </Link>)}
      </div>
      <div className='col-start-1 col-span-4 row-start-4' >
        <Footer/>
      </div>
      </div>
  )
}

export default AllVideos