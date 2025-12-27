'use client'
import React from 'react'
import Image from 'next/image'
import Envelope from '@/app/utils/images/icons8-envelope-50.png'
import Triangle from '@/app/utils/images/icons8-triangle-24.png'

type Props = {
    title:string | undefined | null
}

const CyberHeader = ({title}:Props) => {
  return (
    <div className='flex font-Gardion relative z-[9999]  rounded-md  max-sm:w-48 md:w-72 max-sm:text-xl h-12 max-sm:ml-4 md:-right-2  justify-center text-xl md:text-md flex rounded-sm 
     bg-gradient-to-r from-red-900 via-red-500  to-red-900 
      hover:via-red-300 hover:to-red-900  w-72 ' >

      
        <div className='flex justify-around self-center w-full px-4 py-2' >
             <Image className='relative top-[0.15rem] w-6 h-6' src={Envelope} alt='Notifications' />
             <h1 className='font-Gardion flex justify-start ml-10 py-2 w-full px-2 md:text-sm ' >{title && title}</h1>
            
        </div>
         <Image className='absolute w-2 h-2 left-48 -right-2 top-2 -rotate-[20deg] ' src={Triangle} alt='triangle' />
        <hr className=' absolute top-10 left-32 bg-black border-black rotate-180 w-1/3 bg-white' />
       
        </div>
  )
}

export default CyberHeader