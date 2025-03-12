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
    <div className='flex grid grid-cols-4 grid-rows-4 bg-white' >
      <div className='col-start-1 col-span-4 row-start-1' >
        <NavBar/>
      </div>
      
      <div className=' flex flex-row  row-start-2 row-span-2 flex-wrap max-sm:col-start-1 max-sm:col-span-4 bg-white' >
      {dataState && dataState.map((vals:any)=>
      <Link className=' md:flex md:self-start border-2 border-black md:self-end ' href={`/videos/${vals?.playbackID}`} >
       <Gif playbackID={vals.playbackID} fileName={vals.fileName} />
       </Link>)}
      </div>
      <div className='col-start-1 col-span-4 row-start-4' >
        <Footer/>
      </div>
      </div>
  )
}

export default AllVideos