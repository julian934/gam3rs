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
const About_Modal = ({user}:any) => {
  const ctx=useContext(StoreStateContext);
    const {data}=useQuery({
      queryKey:['news'],
      queryFn:getNews
    });

    

    //Need a header, description and link over entire thing. 
    
  return (
    <div className='flex max-sm:relative max-sm:-right-2 md:max-h-[600px]  max-sm:py-10  grid grid-cols-4 grid-rows-4  bg-black md:w-full md:h-1/2 flex-col rounded-lg md:justify-between' >
         <div className='flex max-sm:w-full md:w-3/4 md:left-6 md:-top-12 relative max-sm:-left-2 max-sm:h-full max-sm:-mt-24 max-sm:-ml-6  col-start-1 rotate-45 max-sm:-rotate-45 row-start-2 w-1/2   -ml-8 -mt-16  2xl:-mt-80  bg-white ' >
            {/* Upper left slant */}
          </div>
          <div className='flex  max-sm:-ml-20 max-sm:w-full   max-sm:h-1/2 max-sm:mt-20 max-sm:-ml-2  col-start-1 row-start-2 w-1/2 h-1/2 2xl:w-3/4  bg-white -skew-x-12 rotate-90  -ml-6 2xl:-ml-12 mt-16 2xl:mt-12' >
               {/* Mid Left gap upper*/}
          </div>
          <div className='flex   max-sm:-z-50 max-sm:w-1/2 max-sm:h-1/2 max-sm:rotate-0 max-sm:h-full   max-sm:mt-0 max-sm:-ml-20  col-start-1 row-start-2 w-3/4 h-6  bg-black -skew-x-12 max-sm:skew-x-0 max-sm:rotate-0  -rotate-90 z-50  -ml-16 mt-16 2xl:mt-20 max-sm:-ml-24 -mr-2 ' >
             {/* Mid Left Design Upper */}
          </div>
          <div className='flex   max-sm:w-full  max-sm:bg-white max-sm:h-full max-sm:-mt-2 max-sm:-ml-14  col-start-1 row-start-2 w-1/2 h-1/3  bg-black -skew-x-12 -rotate-90  -ml-6 max-sm:mt-24 max-sm:w-2/3 max-sm:h-1/2 mt-24 2xl:mt-28 -mt-6  z-50' >
             {/* Mid left Design Lower */}
          </div>
          <div className='flex   max-sm:w-full max-sm:z-50 max-sm:h-1/2  max-sm:mt-20 max-sm:-ml-14  col-start-1 row-start-2 w-1/2 h-1/2 2xl:w-3/4   bg-white skew-x-12 rotate-90 -ml-6 2xl:-ml-12 mt-28 ' >
            {/* Mid Left gap lower*/}  
          </div>
       <div className='flex  max-sm:relative max-sm:-left-14 md:w-full md:col-start-1 md:col-span-4 z-50    max-sm:justify-start self-center col-start-2 col-span-2 row-start-1 md:row-start-2 md:w-full md:justify-center row-span-3 md:-mt-12 z-10 p-4' >
            <div className='flex flex-col w-full self-start self-center max-sm:w-[70vw]  justify-center md:items-center  ' >
             <h1 className='text-white self-center  justify-self-center text-7xl 2xl:text-9xl font-Gardion' >GAM<span className='text-red-500' >3RS</span></h1>
             <h3 className='text-red-500 max-sm:relative self-center max-sm:justify-center max-sm:w-full max-sm:w-[70vw]  justify-self-center text-3xl max-sm:text-2xl z-50 max-sm:left-4  font-Gardion' > Join the Network  </h3>
            </div>
            </div>
            <div className='flex relative max-sm:top-0  md:-top-4 md:left-2   max-sm:h-4/5 max-sm:w-4/5  md:z-50 max-sm:-mt-44 max-sm:-mr-4 2xl:mr-12 self-center pb-2 space-around -mt-16 2xl:-mt-80 w-3/5 max-sm:w-full h-3/5  col-start-3 row-start-2 col-span-3 justify-self-end bg-white skew-x-12 space-x-4 space-y-8 px-2  z-50 ' >
          {/* Right side upper design */}
          <div className='flex max-sm:relative max-sm:top-0 w-full h-1/4 lg:h-2/5  max-sm:h-4/5 bg-black skew-x-12 self-end max-sm:self-end' >

          </div>
          <div className='flex  max-sm:relative max-sm:top-0  w-full h-1/4 lg:h-2/5 max-sm:h-4/5 bg-red-600 skew-x-12 self-end' >

          </div>
          <div className='flex max-sm:relative max-sm:top-0  w-full h-1/4 lg:h-2/5 max-sm:h-4/5  bg-black skew-x-12 self-end' >

          </div>
          <div className='flex max-sm:relative max-sm:top-0 w-full h-1/4 lg:h-2/5 bg-white skew-x-12 self-end' >

          </div>
      </div>
      <div className='flex  max-sm:relative  z-50  w-1/6  md:-ml-2   h-full self-start row-start-2 col-start-5 z-50 ' >
         {/* Rightside mid Design*/}
      </div>
      <div className=' max-sm:flex max-sm:relative max-sm:top-2 max-sm:mt-2  max-sm:w-20 max-sm:-mb-24 col-start-1 row-start-4 md:self-center md:flex md:space-between w-24 h-24 -ml-12  origin-center rotate-45 md:-mb-20  bg-white' >
           {/* Bottom Left white area */}
      </div>
      <div className=' max-sm:flex   max-sm:ml-0 max-sm:-mb-12 col-start-1 col-span-2 justify-center space-x-2 space-between bg-white flex self-end ml-12 w-48 h-8 row-start-4 skew-x-12 ' >
        <div className=' w-10 bg-black h-4 lg:h-6 skew-x-12  self-end max-sm:self-center ' >
            {/* Bottom Left design */}
        </div>
        <div className='w-10  bg-red-600  h-4 lg:h-6  skew-x-12 self-end max-sm:self-center ' >

        </div>
        <div className='w-10  bg-black  h-4 lg:h-6  skew-x-12 self-end max-sm:self-center ' >

        </div>

      </div>
      <div className='flex max-sm:relative max-sm:-left-2 max-sm:top-2   z-50 row-start-1 col-start-4 w-3/4 h-3/4  bg-white rotate-45 ml-32 2xl:ml-32 mt-28 2xl:-mt-2
                      max-sm:-mt-8 max-sm:ml-20 max-sm:w-1/2  ' >
        {/* Upper right slant*/}
      </div>
      <div className='flex  max-sm:mt-10 max-sm:ml-12 max-sm:w-full max-sm:h-2/3 z-60 max-sm:z-50 row-start-3 col-start-4 w-1/2 h-1/2 -rotate-90 bg-white  skew-x-12 ml-32 mt-20 ' >
        {/* Mid-right slant*/}
      </div>
      <div className='flex max-sm:mt-18 max-sm:ml-10  max-sm:h-full max-sm:w-full   z-60 row-start-4 col-start-4 w-full h-full bg-white  -rotate-45 ml-14 mt-12 ' >
        {/* Bottom Right */}
          
      </div>
     
      </div>
  )
}

export default About_Modal