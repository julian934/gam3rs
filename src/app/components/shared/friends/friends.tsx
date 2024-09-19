'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { friendsList } from '@/app/lib/database/connections';
type Props = {}

const FriendsList = (props: Props) => {
  /* 
  const {data,isLoading,isError}=useQuery({
        queryKey:['friends'],
        queryFn:friendsList
    })

  */
    
    //console.log(data)
  return (
    <div className='flex ' >FriendsList</div>
  )
}

export default FriendsList