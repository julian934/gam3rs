'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useQuery } from '@tanstack/react-query'
import { getAllVideos } from '@/app/lib/database/connections'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/general/page'
import type { AxiosResponse } from 'axios'
import Link from 'next/link'
type Props = {}

const AllVideos = (props: Props) => {
 // const ctx=useContext(StoreStateContext);
 const [videoData,setVideoData]=useState<AxiosResponse<any,any> | any>([]);
  const {data}=useQuery({
    queryKey:['allVideos'],
    queryFn:()=>getAllVideos()
  });
  useEffect(()=>{
    if(data &&  data!="Videos not found"){
      const currData=data?.data?.data
      setVideoData(currData)
    }
  },[data])

  data && console.log(data);
  data && console.log(videoData);
  return (
    <div className='flex grid grid-cols-4 grid-rows-4 bg-white' >
      <div className='col-start-1 col-span-4 row-start-1' >
        <NavBar/>
      </div>
      
      <div className='row-start-2 max-sm:col-start-1 max-sm:col-span-4 bg-white' >
         {videoData && videoData?.data?.map((vals:any)=><div className=' w-full h-full' key={vals.id} >
          <Link href={`/videos/${vals.id}`} >
          
             <h1 className='' >{vals.passthrough}</h1>
             </Link>
         </div>)}
      </div>
      <div className='col-start-1 col-span-4 row-start-4' >
        <Footer/>
      </div>
      </div>
  )
}

export default AllVideos