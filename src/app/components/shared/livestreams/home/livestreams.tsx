'use client'
import React from 'react'
import Featured from '../../banners/livestreams/featured'
import { useQuery } from '@tanstack/react-query'
import Placeholder from '@/app/components/ui/placeholder/placeholder'
//import { Card,Skeleton } from '@nextui-org/react';
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import { connectDB } from '@/app/lib/database/connections'
import Link from 'next/link'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useContext } from 'react'
type User={
  username?:string | null | undefined,
  password: string | null | undefined,
  wishlistItems:any[] | null | undefined,
  cartItems: any[] | null | undefined,
  currentSettings:any[] | null | undefined
}
/* 
type Props = {
  
  name?:string | null | undefined,
  id?:string | number | undefined,
  image?: string | ImageData | undefined
  currentUser?:string | null | undefined    
}
*/
type Props={
  user?:User | undefined | null | never
}

const LiveStreams = (props: any) => {
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['homelive'],
    queryFn:()=>connectDB(props?.username)
  });
  const user=ctx.userData?.username
  //Get Data from context
   return(<div className='flex  justify-around bg-slate-50 rounded-md  md:w-full md:h-1/4 ' >
    <div className='' >
    <h1 className='text-xl' >LiveStreams</h1>
    <h1 className='text-xl' >User:{user}</h1>
    </div>
    
    <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-red-200 " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
  <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-red-200 " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
  <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-red-200 " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
  <div className='flex' >
      <Link className='self-center text-lg ' href='/livestreams' >View All</Link>
  </div>
   </div>)
  if(data!=undefined && data!=null ) return (
    <div className='flex z-60  ' >LiveStreams
    
        
    </div>
  )
}

export default LiveStreams