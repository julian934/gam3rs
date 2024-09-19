'use client'
import React, { SetStateAction } from 'react'
import { useState,useEffect,useContext,useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getGames } from '@/app/lib/actions/connections';
import type { AxiosResponse } from 'axios';
import Link from 'next/link';
import Image from 'next/image';
type Props = {}

const Games = (props: Props) => {
  const [games,setGames]=useState<AxiosResponse<any, any> | SetStateAction<never[] > | SetStateAction<any[] | any>>([]);
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
  return (
    <div className='flex ' >Games
    <div className='flex flex-wrap w-full h-full ' >
    {games && games?.map((vals:any)=>(<div key={vals.id} className='w-92 h-92' >
         <Link className='text-black'  href={vals.game_url} >
         <Image className='h-[50px] w-[50px]' width={100} height={100} quality={100}  src={vals.thumbnail} alt={vals.title} />
         {vals.title}
         <h2 className='' >Platform:{vals.platform}</h2>
         </Link>
      </div>))}
    </div>
      
    </div>
  )
}

export default Games