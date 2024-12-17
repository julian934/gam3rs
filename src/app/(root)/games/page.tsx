'use client'
import React, { SetStateAction } from 'react'
import { useState,useEffect,useContext,useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getGames } from '@/app/lib/actions/connections';
import type { AxiosResponse } from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page'; 
import Notifications from '@/app/components/shared/notifications/notifications';
type Props = {}

const Games = (props: Props) => {
  const [games,setGames]=useState<AxiosResponse<any, any> | SetStateAction<never[] > | SetStateAction<any[] | any>>([]);
  const [userGame,setUserGame]=useState<any>([]);
    const {data}=useQuery({
        queryKey:['gameslist'],
        queryFn:getGames
    })
    useEffect(()=>{
      if(data){
        console.log(data?.data?.data)
      
        const currData=data;
        setGames(currData?.data?.data)
    }
    
    },[data])
    if(data){
      console.log(games)
    }
    const addGame=(game:any,user:any)=>{
        //Add Game to user viewed game 
        //Increase views on MongoDB game views object by 1.
    }
  return (
    <div className='flex flex-col bg-white grid-cols-4 grid-rows-4 ' >
    <div className='row-start-1 col-start-1 col-span-4' >
       <NavBar/>
    </div>
    {/* Add option to skip to the bottom. */}
    <div className='flex flex-col row-start-2 row-span-2 col-start-1 z-50 bg-slate-200 ' >
        <Notifications/>
    </div>
    <div className='' >
        <button className='' >Skip to Bottom</button> 
    </div>
    <div className='flex row-start-2 row-span-2 col-start-2 col-span-2 flex-wrap w-2/3 self-center h-full z-50 p-4 space-y-4' >
    {games && games?.sort().map((vals:any)=>(<div key={vals.id} className='flex w-92 h-92 bg-slate-200 p-4 ' >
         <Link className='text-black'  href={vals.game_url} >
         <Image className='h-62 w-62 justify-self-center self-center ' width={100} height={100} quality={100}  src={vals.thumbnail} alt={vals.title} />
         
         <h1 className='text-center' >{vals.title}</h1>
         <h2 className='text-center' >Platform:{vals.platform}</h2>
         </Link>
      </div>))}
    </div>
      <div className='row-start-4 col-start-1 col-span-4' >
          <Footer/>
      </div>
    </div>
  )
}

export default Games