'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { notificationsList } from '@/app/lib/database/connections'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useContext } from 'react'
import { getNotifications } from '@/app/lib/database/connections'
//import { HoverEffect } from '../../ui/hover-effect/hover-effect'
import { HoverEffect } from '../../ui/hover-effect/search-hover-effect'
import NotificationCircle from '@/app/utils/images/notification-circle.png'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Gif from '../../shared/videos/gif/notificationGif'
type Props = {}

const Notifications = (props: Props) => {
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['notifications'],
    queryFn:()=>getNotifications()
  })
  const [notificationData,setNotificationData]=useState<any>([]);
  const [defaultData,setDefaultData]=useState<any>(null)
  //Use infinite moving cards from aceternity for notifications
  /*
  useEffect(()=>{
   
    if(data?.flag=='notifications'){
      const info=data?.data?.map((vals:any)=>{
        return{
          title:vals.title,
          description:vals.description
        }
      })
      setNotificationData(info)
    }else{
      const flag=data?.flag
      const mappedData= flag=='default' ? data:null
      setDefaultData(mappedData)
    }
   
  },[data,defaultData,notificationData])*/
  if(data){
    console.log("Current Data: ", data)
  }
 if(notificationData){
  console.log('Current Notifications: ', notificationData)
 }
 if(defaultData){
  console.log("Current Default Data: ", defaultData)
 }
  return (
    <div className='flex space-y-8 max-h-[45vh]  flex-col rounded-md z-[9999] max-sm:z-30 w-full max-sm:h-40 md:-mt-8 max-sm:py-4 ' >
    <h1 className='flex font-Gardion relative z-[9999]  max-sm:w-48 md:w-36 max-sm:text-xl h-8 max-sm:ml-4 md:-right-2  justify-center text-3xl md:text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-64 text-white' > Notifications </h1>
     
        {defaultData &&  <div className='flex flex-col self-center space-y-2 md:space-y-4  md:w-full' >
           <h3 className='flex px-2 md:w-full text-lg' >{defaultData?.data?.title}</h3>
           <p className='flex px-2 text-sm ' > {defaultData?.data?.description} </p>
          </div>}
          <motion.div className=' md:w-full max-h-[45vh] z-[9999]' >
            
            <div className=' flex flex-row z-[9999]  relative max-h-[45vh]  right-0 max-h-full  space-x-12 max-w-[50vw]  overflow-y-auto' >
            {data && data?.data?.map((vals:any)=>
      <Link className='flex flex-col rounded-md  max-h-[45vh]   ' href={`/videos/${vals?.playbackId}`} key={vals?.playbackId}  >
        <h1 className='w-full relative left-8 font-Gardion text-sm' >{vals?.user} just posted a video  </h1>
        <div className='flex justify-center w-full  max-h-[15vh]' > 
          <Gif playbackID={vals.playbackId} fileName={vals.fileName} />
        </div>
       
       </Link>)}
            </div>
          
            

             </motion.div>
         {/*  <div className='flex overflow-x-auto' >
              
              {notificationData &&  <div className='' >
                <HoverEffect  items={notificationData} />
                 </div>}
              {}
          </div> */}
    </div>
  )
}

export default Notifications