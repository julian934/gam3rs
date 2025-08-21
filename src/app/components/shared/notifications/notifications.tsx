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
    console.log(data)
  }
 if(notificationData){
  console.log(notificationData)
 }
 if(defaultData){
  console.log(defaultData)
 }
  return (
    <div className='flex space-y-8  flex-col rounded-md z-20 max-sm:z-30 w-full max-sm:h-40 md:-mt-4 max-sm:py-4 ' >
    <h1 className='flex font-Gardion relative z-[9999]  max-sm:w-48 md:w-36 max-sm:text-xl h-8 max-sm:ml-4 md:-right-2  justify-center text-3xl md:text-lg w-full flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-64 text-white' > Notifications </h1>
     
        {defaultData &&  <div className='flex flex-col self-center space-y-2 md:space-y-4  md:w-full' >
           <h3 className='flex px-2 md:w-full text-lg' >{defaultData?.data?.title}</h3>
           <p className='flex px-2 text-sm ' > {defaultData?.data?.description} </p>
          </div>}
          <motion.div className=' md:w-4/5' >
            
            <div className=' flex flex-col relative right-2 max-h-full py-2 space-y-28  max-w-[50vw] self-center justify-self-center overflow-y-auto' >
            {data && data?.data?.reverse()?.map((vals:any)=>
      <Link className='flex flex-col justify-center self-center h-[10vh] w-full  ' href={`/videos/${vals?.playbackID}`} key={vals?.playbackID}  >
        <h1 className='w-4/5 relative left-8 font-Gardion text-sm' >{vals?.user} just posted a video  </h1>
        <div className='flex justify-center w-full px-4 max-h-[5vh]' > 
          <Gif playbackID={vals.playbackID} fileName={vals.fileName} />
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