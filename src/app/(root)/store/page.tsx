'use client'
import React from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import { useState,useEffect } from 'react'
import Footer from '@/app/components/shared/footer/general/page'
import { useQuery } from '@tanstack/react-query'
type Props = {}

const Store = (props: Props) => {
  return (
    <div className='flex grid grid-cols-6 grid-rows-4 bg-white ' >
        <div className='flex col-start-1 col-span-6 row-start-1 ' >
           <NavBar/>
        </div>
        {/* Copy UI from video to here.  */}
        <div className='flex  justify-self-center self-center col-start-1  col-span-6 row-start-2 row-span-2 ' >
        <h1 className='flex self-center  ' > Stay tuned, Merch Store coming soon! </h1>
        </div>
       <div className='flex row-start-4 col-start-1 col-span-6 self-center justify-self-center' >
            <Footer/>
       </div>
        </div>
  )
}

export default Store