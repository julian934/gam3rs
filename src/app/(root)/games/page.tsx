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
        console.log(currData)
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
    <div className='flex max-sm:flex-col md:flex-row row-start-2 row-span-2 col-start-2 col-span-2 flex-wrap w-2/3 self-center h-full z-50 p-4 space-y-4' >
    {/*games && games?.sort().map((vals:any)=>(<div key={vals.id} className='flex w-92 h-92 bg-slate-200 p-4 ' >
         <Link className='text-black'  href={vals.game_url} >
         <Image className='h-62 w-62 justify-self-center self-center ' width={100} height={100} quality={100}  src={vals.thumbnail} alt={vals.title} />
         
         <h1 className='text-center' >{vals.title}</h1>
         <h2 className='text-center' >Platform:{vals.platform}</h2>
         </Link>
      </div>))*/}

       {games && games?.sort().map((vals:any)=>
            <div  key={vals.id} className='flex md:w-92 md:h-92 md:flex-wrap md:flex-row max-sm:flex-col ' >
             
              <div className=' flex md:mt-12 grid max-sm:mt-4 h-full w-full grid-cols-6 grid-rows-4 flex-row  bg-gray-300   col-start-2 col-span-4 row-start-2 row-span-2 flex-col px-2 ' >
              {/* Add Design to this page. */}
           
              <div className='flex  -mt-4 py-2 px-2 ml-2 mt-0 row-start-1 col-start-4 col-span-3 bg-white w-3/4 max-sm:w-full h-1/2 skew-x-12 z-50 space-x-2' >
              {/* Upper Right white area & black design */}
              <div className=' bg-gray-300 h-full w-1/4 self-center  -skew-x-24  ' >
        
                </div>
              <div className='  bg-gray-300 h-full w-1/4 self-center -skew-x-24 ' >
      
                </div>
              <div className=' bg-gray-300 h-full w-1/4  self-center  -skew-x-24 ' >
      
                  </div>
         
            </div>
            
          
           <div className='flex size-4 bg-gray-50 col-start-1 border-2 border-black row-start-1 row-span-2' >
      
      
           </div>
           <div className='flex  flex-col  -ml-4 max-sm:-ml-6 w-1/3 max-sm:w-8 col-start-1 col-span-1 row-start-1 row-span-4 bg-white z-40 ' >
           {/* Left side white area */}
             <div className='flex max-sm:h-16 max-sm:w-full max-sm:ml-6  -mt-16 max-sm:-mt-8 ml-0 w-full h-1/2 bg-white rotate-45 ' >
              {/*Left Side Upper Corner */}
      
             </div>
      
           </div>
           <div className='flex  -left-8 row-start-1 col-start-1 h-full w-1/2  ' >
              {/* left side lower slant */}
      
           </div>
           <div className='flex md:-mt-10 md:ml-10 md:w-full md:h-full md:-rotate-45 max-sm:ml-0 max-sm:-z-40 max-sm:mr-4 max-sm:pr-2 max-sm:mt-2 max-sm:h-1/2  rotate-45 max-sm:-rotate-45 row-start-1 row-span-2  col-start-6 z-50 ml-8 max-sm:ml-12 -mt-4 max-sm:mt-6 w-3/4 max-sm:w-full h-24 bg-white ' >
                 {/*Extra top right white piece */}
            </div>
           <div className='flex md:border-2 md:border-black md:mt-6 md:-ml-6 max-sm:mt-0 max-sm:-ml-2 max-sm:z-40 row-start-4 row-span-2 col-start-1 -ml-8 mt-10 max-sm:mt-8 h-full w-full rotate-45 max-sm:-rotate-45 bg-white  ' >
              {/* Left Side Lower Corner */}
           </div>
           
           <div className='flex  row-start-1 col-start-6 -mt-2 ml-16 max-sm:ml-8 max-sm:mt-0 w-full h-full bg-white rotate-45 max-sm:rotate-0 ' >
                {/* right side upper block */}
               
           </div>
           <div className='flex  col-start-6 ml-20 max-sm:ml-8 mt-12 max-sm:mt-24 row-start-1 row-span-4 bg-white z-50 w-3/5 max-sm:w-4/5 h-5/6 max-sm:h-4/5 max-sm:w-4/5' >
              {/* right side bar */}
           </div>
           <div className='flex md:z-50 md:ml-10 md:border-2 md:border-black max-sm:-z-40  row-start-4 col-start-6 bg-white -rotate-45 max-sm:rotate-45 ml-2 mt-12 w-full h-full' >
               {/* right side lower */}
           </div>
            <div className='flex  border-2 border-black  flex-col rounded-md self-center justify-self-center  col-start-2 col-span-4 max-sm:row-start-1 max-sm:row-span-4 row-start-2 row-span-3 max-sm:w-full' >
              {/*  Space for Data */} 
              <Image className='flex w-full' src={vals.thumbnail} alt={vals.title} width={100} height={100} />
              <h1 className='flex' >{vals.title}</h1>
            
            </div>
            </div> 
      
            </div>)}
    </div>
      <div className='row-start-4 col-start-1 col-span-4' >
          <Footer/>
      </div>
    </div>
  )
}

export default Games