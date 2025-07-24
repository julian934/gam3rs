'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { friendsList } from '@/app/lib/database/connections';
//import { InfiniteMovingCardsDemo } from '../../ui/infinite-cards-demo/demo';
type Props = {}

const FriendsList = ({friends}:any) => {
   
  /*const {data,isLoading,isError}=useQuery({
        queryKey:['friends'],
        queryFn:()=>{}
    })*/

     if(friends){
      console.log(friends)
     }
    
    //console.log(data)
  return (
    <div className='flex max-sm:h-40 flex-col w-full bg-slate-200 rounded-md md:space-y-4' >
     
      <h1 className='flex font-Gardion max-sm:w-48 h-8 max-sm:text-xl max-sm:ml-4 justify-center text-3xl w-full flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-64 text-white ' > Friends {friends && friends?.length}</h1>
      
        {!friends && <h1 className='flex flex-wrap px-4' >Your friends list will apear here once you sign in!</h1>}
       
        {friends && <div className='flex' >
          <h3 className='self-center' >Online: </h3>
          <div className='flex flex-col ' >
             {/* Map online friends list */}
             {friends.length>0? friends.map((vals:any)=><div className='flex max-sm:flex-wrap md:flex-col  ' key={vals?._id} >
                        <h1 className='flex' >{vals.username}</h1>
              </div>): <h1 className='flex' >No friends online.</h1>}
            </div>
         
        <h3 className='flex self-center' >  Offline: </h3>
            <div className='flex flex-col ' >
                     {/* Map offline friends list */}
                     {friends.length>0?friends.map((vals:any)=><div className='flex border-2 border-rounded-md overflow-y-auto' key={vals?._id} >
                         <h1 className='flex' >{vals.username}</h1>
                     </div>):<h1 className=' flex' > Be sure to check out our Forums to find users to connect with!</h1>}
              </div>
          </div>}
      
      </div>
  )
}

export default FriendsList