'use client'
import React from 'react'
import TestVideo from '@/app/components/shared/videos/testVideo/videos'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/general/page'
import Link from 'next/link'
import upload from '../../utils/images/icons8-plus-48.png'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
//import Latest from '@/app/components/shared/videos/latest/latest';
//import Popular from '@/app/components/shared/videos/popular/popular';
import Upcoming from '@/app/components/shared/videos/upcoming/upcoming';
import addbutton from '../../utils/images/icons8-add-new-50.png'
import { useEffect } from 'react'
import Latest from '@/app/components/shared/videos/latest/latestRedux'
import Popular from '@/app/components/shared/videos/popular/popularRedux'
import Notifications from '@/app/components/shared/notifications/notifications'
import FriendsList from '@/app/components/shared/friends/friends'
type Props = {}

const Videos = (props: Props) => {
     
    //customize mobile.
  return (
    <div className='flex grid grid-cols-6 grid-rows-2 bg-white ' >
      <div className='flex w-screen col-start-1 col-span-6 row-start-1' >
      <NavBar/>
      </div>
      <div className='flex max-sm:z-50  max-sm:-pt-10 md:z-50 md:relative md:top-20 bg-slate-200 max-sm:bg-white max-sm:-mt-10 max-sm:self-center max-sm:w-full max-sm:z-auto max-sm:p-4 md:h-5/6 md:w-2/3 max-sm:h-20 md:mt-40  md:col-start-1 md:row-start-1 md:row-span-2 p-4 rounded-md p-4  ' >
       <div className='relative md:top-4 md:-left-2' >
         <Notifications/>
        </div>
      
      </div>
      <div className='flex flex-col max-sm:mt-16 md:mt-48 z-50 max-sm:border-2 max-sm:w-full max-sm:px-4 max-sm:border-black justify-start self-start md:self-end -mt-8 max-sm:-mt-48 max-sm:mb-12 col-start-2 max-sm:col-start-1 col-span-4 max-sm:col-span-6 row-start-2 md:row-start-1 row-span-2 max-sm:row-span-3 bg-black rounded-lg' >
        <div className='flex w-full max-sm:justify-between max-sm:p-2 justify-around h-32 p-4  md:w-2/3 md:ml-0' >
          
           {/*  <h1 className='text-2xl' > Current Videos </h1>*/}
           <h1 className='flex font-Gardion relative md:left-32 max-sm:mt-12 h-8 justify-center text-2xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-48 text-white ' > 
        Current Videos 
        </h1>

         
          
        </div>
        <div className='flex flex-col max-sm:w-full  p-2  md:h-full ' >
          
          <div className='flex flex-col p-2 ' >
           
            {/*  <h1 className=' text-xl ' >Latest Videos</h1> */}
            <div className='' >
               <Latest/>  {/* Latest Videos calculated by most recent timestamp/
                smallest difference between today and the day it was created */}
            </div>

          </div>
          <div className='flex  flex-col p-2' >
            {/* Most Popular Videos calculated by number of views */}
            {/*  <h1 className=' text-xl ' >Popular Videos</h1>*/}
            <div className='' > 
               <Popular/>
            </div>

          </div>
          <div className='flex flex-col bg-white rounded-md p-2 ' >
            
            {/* <h1 className=' text-xl ' >Upcoming Videos</h1>*/}
            <div className='' >
               <Upcoming/>{/* Upcoming Videos from the team, created in mongodb with a pre-determined release date */}
            </div>

          </div>

        </div>
      </div>
      <div className=' flex md:z-[9999] max-sm:border-2 md:top-20 md:left-60 md:-right-10  max-sm:border-black max-sm:h-full md:relative row-start-1 md:mt-40 row-span-2 md:h-5/6 md:w-2/3 md:px-8 justify-self-end rounded-md self-start md:col-start-5 bg-slate-200 ' >
      <div className='relative md:left-4 md:top-4' >
          <FriendsList  />
      </div>
       
        </div>
      
      <div className='flex max-sm:hidden max-sm:z-50   max-sm:bottom-0 row-start-4 max-sm:row-start-4 col-start-1 col-span-6 w-screen justify-around  '  >
        <Footer/>
      </div>
      </div>
  )
}

export default Videos