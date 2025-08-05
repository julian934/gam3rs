'use client'
import React,{useState,useEffect,useRef,useContext} from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/app/lib/database/connections';
import NotificationCircle from '@/app/utils/images/notification-circle.png'
type Props = {}

const Notifications = (props: Props) => {
  const ctx=useContext(StoreStateContext);
  const [notificationsList, setNotificationsList]=useState<any>([]);
  const {data}=useQuery({
    queryKey:['notifications'],
    queryFn:()=>getNotifications()
  })
  useEffect(()=>{
    if(data!=undefined){
      setNotificationsList(data)
    }

  },[data]);
  if(notificationsList){
    console.log(notificationsList)
  }

  return (
    <div className='flex flex-col' >
      
      <h1 className='flex self-center' > Notifications</h1>
      </div>
  )
}

export default Notifications