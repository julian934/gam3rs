'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { useQuery } from '@tanstack/react-query';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import Banner from '../banners/home/banner'
import { CarouselDemo } from '../carousel/newsCarousel'
import { Suspense } from 'react'
import Skeleton from '../../ui/skeleton/skeleton'
import { getNews } from '@/app/lib/actions/connections'
import { ExpandableCardDemo } from '../../ui/expandable-card-demo/expandable-card-demo';
//import { InfiniteMovingCardsDemo } from '../../ui/infinite-cards-demo/demo';
import { InfiniteMovingCardsDemo } from '../../ui/news-modal/modal';
import { InfiniteMovingCards } from '../../ui/infinite-moving-cards/infinite-moving-cards';
import { Expand } from 'lucide-react';
import  Gam3rs_News_Modal from '@/app/utils/images/redesign/Gam3rs_News_Modal.png'
import Image from 'next/image';
type Props = {}
//Configure props.
const News = ({user}:any) => {
  const ctx=useContext(StoreStateContext);
    const {data}=useQuery({
      queryKey:['news'],
      queryFn:getNews
    });

    

    //Need a header, description and link over entire thing. 
    
  return (
    <div className='flex  max-sm:w-96 max-sm:max-w-[400px]  md:z-0 max-sm:z-0 max-sm:px-10 max-w-[700px] max-h-[600px]  lg:justify-self-center  max-sm:py-10 grid grid-cols-4 grid-rows-4   md:w-full md:h-full flex-col rounded-lg md:justify-between' >
    {/*  <div className='col-start-1 border-2 border-black md:flex md:space-between -ml-2 -mt-4 row-start-1 inline-block -left-24  mt-20 h-20 w-60 z-60  skew-x-12 bg-white absolute rotate-90  ' >
           <div className=' border-2 border-black w-1/2 flex h-20 skew-x-12 bg-white  bottom-2  ' >
             
              <div className='w-5/6 self-end skew-x-12 ml-8 mt-2 self-center justify-between rounded-sm h-1/2 bg-slate-200 ' >
                   
              </div>
           </div>
           <div className='w-1/2 flex h-20 bg-white bottom-2 skew-x-12 ' >
             
              <div className='w-1/2 flex h-4 bg-slate-200 skew-x-12 self-end mb-4 -ml-2 rounded-sm '  >

              </div>
           </div>
         </div>  
          */}
          <div className='absolute flex scale-[1.75] -top-48 md:left-4' >
            <Image className='w-full h-full' src={Gam3rs_News_Modal} alt='News Modal' />

          </div>
      <div className='flex flex-col col-start-1 z-10 row-start-1 p-4' >
       
      <h1 className='flex font-Gardion md:ml-20 mt-20 justify-center text-xl flex transition ease-in-out rounded-sm animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > 
        News 
        </h1>
      {/* News & user personalization*/}
      
         {/* {user?<h1 className='flex transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20' >
        Welcome {`${user}`}! 
         </h1>:
         <h1 className='flex justify-center' > Welcome!</h1>}*/}
      </div>
      <div className='flex md:w-full z-50  md:col-start-1 self-center md:col-span-4 max-sm:col-start-1 max-sm:col-span-1   max-sm:self-center  max-sm:justify-self-start col-start-2 col-span-2 row-start-1 md:row-start-2 md:w-full md:justify-center md:h-full row-span-3 md:-mt-28 z-10 p-4' >
      <div className='flex w-full max-sm:w-72 md:w-5/6   justify-center md:items-center md:self-center md:h-full z-50  ' >
       <InfiniteMovingCardsDemo/>
        {/*   <Suspense fallback={<div className='' > Loading... </div>} >
          <CarouselDemo/>
        </Suspense>*/}
      </div>
      </div>
    
     
      </div>
  )
}

export default News