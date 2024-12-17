'use client'
import React from 'react'
import TestVideo from '@/app/components/shared/videos/testVideo/videos'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/general/page'
import Link from 'next/link'
import upload from '../../utils/images/icons8-plus-48.png'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Latest from '@/app/components/shared/videos/latest/latest';
import Popular from '@/app/components/shared/videos/popular/popular';
import Upcoming from '@/app/components/shared/videos/upcoming/upcoming';
type Props = {}

const Videos = (props: Props) => {
     
    
  return (
    <div className='flex grid grid-cols-6 grid-rows-4  bg-white ' >
      <div className='flex w-screen col-start-1 col-span-6   row-start-1' >
      <NavBar/>
      </div>
      <div className='flex flex-col col-start-2 col-span-4 row-start-2 row-span-2 bg-gray-200 rounded-lg' >
        <div className='flex w-full justify-around h-32 p-4' >
           <h1 className='' > Current Videos </h1>

           <div className=' rounded-lg shadow-2xl bg-gray-400 hover:bg-gray-700 w-6 h-6' >
           <Link href='/testUpload' className=' ' > <Image className='h-6 w-6' src={upload} alt='upload' /> </Link>
           </div>
          
        </div>
        <div className='flex flex-col  p-2 border-2 ' >
          
          <div className='flex border-2 flex-col p-2 ' >
            <h1 className=' text-xl ' >Latest Videos</h1>
            <div className='' >
               <Latest/>  {/* Latest Videos calculated by most recent timestamp/
                smallest difference between today and the day it was created */}
            </div>

          </div>
          <div className='flex border-2 flex-col p-2' >
            <h1 className=' text-xl ' >Popular Videos</h1> {/* Most Popular Videos calculated by number of views */}
            <div className='' > 
               <Popular/>
            </div>

          </div>
          <div className='flex flex-col  p-2 ' >
            <h1 className=' text-xl ' >Upcoming Videos</h1>
            <div className='' >
               <Upcoming/>{/* Upcoming Videos from the team, created in mongodb with a pre-determined release date */}
            </div>

          </div>

        </div>
      </div>
      
      
      <div className='flex  row-start-4 col-start-1 col-span-6 w-screen justify-around  '  >
        <Footer/>
      </div>
      </div>
  )
}

export default Videos