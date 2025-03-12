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
import addbutton from '../../utils/images/addbutton.png'
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
      <div className='flex z-50 max-sm:px-4 max-sm:col-start-1 max-sm:col-span-6 md:col-start-1 md:row-start-1 md:row-span-2 md:mt-56 bg-gray-300 max-sm:bg-white md:px-2 ' >
        <Notifications/>

      </div>
      <div className='flex flex-col max-sm:mt-16 md:mt-48 z-50 max-sm:border-2 max-sm:w-full max-sm:px-4 max-sm:border-black justify-start self-start md:self-end -mt-8 max-sm:-mt-48 max-sm:mb-12 col-start-2 max-sm:col-start-1 col-span-4 max-sm:col-span-6 row-start-2 md:row-start-1 row-span-2 max-sm:row-span-3 bg-black rounded-lg' >
        <div className='flex w-full max-sm:justify-between max-sm:p-2 justify-around h-32 p-4' >
          
           {/*  <h1 className='text-2xl' > Current Videos </h1>*/}
           <h1 className='flex max-sm:mt-12 h-8 justify-center text-2xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-48 text-white ' > 
        Current Videos 
        </h1>

           <div className=' rounded-3xl shadow-2xl bg-gray-400 hover:bg-white w-10 h-10 max-sm:mt-12' >
           <Link href='/testUploadRedux' className=' ' > <Image className='h-10 w-10' src={addbutton} alt='upload' /> </Link>
           </div>
           
           <div className=' rounded-lg   flex-col w-28 h-6 justify-center max-sm:mt-12 ' >
            <Link className=' text-xl' href='/allVideos' >
              <h1 className='flex h-8 justify-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28 text-white ' > 
               View All
                </h1>
        </Link>
           </div>
          
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
      <div className='flex max-sm:col-start-1 max-sm:px-4 max-sm:col-span-6 md:col-start-6 md:row-start-1 md:row-span-2 z-50 md:mt-48 bg-gray-300 max-sm:bg-white md:px-2 ' >
          <FriendsList/>
      </div>
      
      <div className='flex max-sm:hidden max-sm:z-50   max-sm:bottom-0 row-start-4 max-sm:row-start-4 col-start-1 col-span-6 w-screen justify-around  '  >
        <Footer/>
      </div>
      </div>
  )
}

export default Videos