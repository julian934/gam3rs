'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { notificationsList } from '@/app/lib/database/connections'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useContext } from 'react'
type Props = {}

const Notifications = (props: Props) => {
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['notifications'],
    queryFn:()=>{}
  })
  return (
    <div className='' >Notifications</div>
  )
}

export default Notifications