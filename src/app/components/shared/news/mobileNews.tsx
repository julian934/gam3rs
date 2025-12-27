'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { useQuery } from '@tanstack/react-query';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import Banner from '../banners/home/banner'
import { CarouselDemo } from '../carousel/newsCarousel'
import { Suspense } from 'react'
import Skeleton from '../../ui/skeleton/skeleton'
import { getNews } from '@/app/lib/actions/connections'
import { useSession } from 'next-auth/react';
//import { InfiniteMovingCardsDemo } from '../../ui/news-modal/modal';
import { InfiniteMovingCardsDemo } from '../../ui/news-modal/mobile';
import Image from 'next/image';
import  Gam3rs_News_Modal from '@/app/utils/images/redesign/Gam3rs_News_Modal.png'
type Props = {}
//Configure props.
const Mobile_News = ({user}:any) => {
  const ctx=useContext(StoreStateContext);
    const {data}=useQuery({
      queryKey:['news'],
      queryFn:getNews
    });
  const session=useSession();
    

    //Need a header, description and link over entire thing. 

    
  return (
    <div className='flex max-sm:relative  max-sm:top-4 max-sm:left-6 md:max-h-[600px] max-sm:max-h-[250px] max-sm:max-w-[375px]   grid grid-cols-4 grid-rows-4   md:w-full md:h-1/2 flex-col rounded-lg md:justify-between' >
      
         <div className='absolute flex scale-x-[2] scale-y-[2.5] overflow-hidden -top-28 left-4 px-4' >
                    <Image className='w-full h-full' src={Gam3rs_News_Modal} alt='News Modal' />
        
                  </div>
       <div className='flex  max-sm:relative max-sm:-left-14 max-sm:w-[300px] max-sm:top-4 md:w-full md:col-start-1 md:col-span-4 z-50    max-sm:justify-start self-center col-start-2 col-span-2 row-start-1 md:row-start-2 md:w-full md:justify-center row-span-3 md:-mt-12 z-10 p-4' >
           
            {/*  <div className='flex flex-col w-full self-start self-center max-sm:w-[70vw]  justify-center md:items-center  ' >
             <h1 className='text-white self-center  justify-self-center text-7xl 2xl:text-9xl font-Gardion' >GAM<span className='text-red-500' >3RS</span></h1>
             <h3 className='text-red-500 max-sm:relative self-center max-sm:justify-center max-sm:w-full max-sm:w-[70vw]  justify-self-center text-3xl max-sm:text-2xl z-50 max-sm:left-4  font-Gardion' > Join the Network  </h3>
            </div>*/}
              <InfiniteMovingCardsDemo/>
            </div>
           
      
     
      </div>
  )
}

export default Mobile_News