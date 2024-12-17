'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { useQuery } from '@tanstack/react-query';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import Banner from '../banners/home/banner'
import { CarouselDemo } from '../carousel/newsCarousel'
import { Suspense } from 'react'
import Skeleton from '../../ui/skeleton/skeleton'
import { getNews } from '@/app/lib/actions/connections'
type Props = {}
//Configure props.
const News = ({user}:any) => {
  const ctx=useContext(StoreStateContext);
    const {data}=useQuery({
      queryKey:['news'],
      queryFn:getNews
    });
    
  return (
    <div className='flex grid grid-cols-4 grid-rows-4 bg-slate-200 md:w-full md:h-1/2 flex-col rounded-lg md:justify-between' >
      <div className='col-start-1 md:flex md:space-between -ml-2 -mt-4 row-start-1 inline-block -left-24  mt-20 h-20 w-60 z-60  skew-x-12 bg-white absolute rotate-90  ' >
           <div className='w-1/2 flex h-20 skew-x-12 bg-white  bottom-2  ' >
              {/* use CHatgpt to learn how to take element out of order */}
              <div className='w-5/6 self-end skew-x-12 ml-8 mt-2 self-center justify-between rounded-sm h-1/2 bg-slate-200 ' >
                   
              </div>
           </div>
           <div className='w-1/2 flex h-20 bg-white bottom-2 skew-x-12 ' >
              {/* use CHatgpt to learn how to take element out of order */}
              <div className='w-1/2 flex h-4 bg-slate-200 skew-x-12 self-end mb-4 -ml-2 rounded-sm '  >

              </div>
           </div>
         </div>  
      <div className='flex flex-col col-start-1 z-10 row-start-1 p-4' >
       
      <h1 className='flex justify-center text-xl flex transition ease-in-out rounded-sm animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > News </h1>
      {/* News & user personalization*/}
      {user?<h1 className='flex transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20' >
        Welcome {`${user}`}! 
         </h1>:
         <h1 className='flex justify-center' > Welcome!</h1>}
      </div>
      <div className='flex col-start-2 col-span-2 row-start-1 row-span-3 z-10 p-4' >
      <div className='flex w-full self-start justify-center md:items-center  ' >
        <Suspense fallback={<div className='' > Loading... </div>} >
          <CarouselDemo/>
        </Suspense>
      </div>
      </div>
      <div className='col-start-1 row-start-4 md:flex md:space-between w-32 h-32 -ml-16 mt-8  origin-center rotate-45  bg-white' >

      </div>
      <div className='col-start-1 col-span-2 justify-center space-x-2 space-between bg-white flex self-end ml-12 w-48 h-8 row-start-4 skew-x-12 ' >
        <div className=' w-10 bg-slate-200 h-4 skew-x-12  self-end ' >

        </div>
        <div className='w-10  bg-slate-200  h-4 skew-x-12 self-end ' >

        </div>
        <div className='w-10  bg-slate-200  h-4 skew-x-12 self-end' >

        </div>

      </div>
       <div className='flex col-start-4 row-start-1 row-span-3 p-4' >
            {/* News Description*/}
       </div>
     
      </div>
  )
}

export default News