'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import About_Modal from '@/app/utils/images/redesign/Gam3rs_About_Modal_Design.png'

type Props = {}

const NewAboutModal = (props: Props) => {
  return (
    <div className='flex max-sm:min-w-[100px] overflow-hidden md:min-w-[600px] max-sm:min-h-[400px] max-sm:min-w-[400px] md:min-h-[300px] z-0 ' >
          <div className='absolute md:w-full  overflow-hidden flex  md:-top-48 max-sm:left-4 ' >
            <Image className='w-full h-full flex scale-[2.0] overflow-hidden' src={About_Modal} alt='ABout Modal' />
              
          </div>
           <h1 className=' absolute text-4xl top-32 max-sm:top-44 max-sm:left-28 left-24 font-Gardion text-black ' >  The Gam3r Network  </h1>
        

        </div>
  )
}

export default NewAboutModal