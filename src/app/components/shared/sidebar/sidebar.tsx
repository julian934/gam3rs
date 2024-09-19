'use client'
import React from 'react'
import { connectDB } from '@/app/lib/database/connections'
import { useQuery } from '@tanstack/react-query'
import Notifications from '../notifications/notifications'
import { notificationsList } from '@/app/lib/database/connections'
type Props = {
  
  name?:string | null | undefined,
  id?:string | number | undefined,
  image?: string | ImageData | undefined
  currentUser?:string | null | undefined    
}

const SideBar = (props: Props) => {
  //Shows news, updates, ongoing events, etc. like ticker tape
  //filtered info and relevant information to the user like upcoming lives, games and popular forums in genres that they like.
  const {data,isLoading}=useQuery({
    queryKey:['notifications'],
    queryFn:notificationsList
  })
  console.log(data)
  return (
    <div className='' >
      Notifications
      <h1 className='' >{props?.currentUser}</h1>
      <div className='' >
      <Notifications/>
      </div>
      
    </div>
  )
}

export default SideBar