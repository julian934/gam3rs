'use client'
import React from 'react'

type Props = {}

const AboutJulian = (props: Props) => {
  return (
    <div>
       
        <div className='flex max-sm:relative max-sm:left-48 h-[7.5vh] max-sm:w-[80vw] md:w-[35vw]  relative left-56 justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl   to-red-900  -skew-x-12 w-40  text-white' >
        <div className='relative max-sm:left-4 md:right-6 md:top-4 max-sm:top-2 text-sm text-black z-[9999]' >
            <h1 className='font-Gardion text-sm' >
               Julian Borner
            </h1>
        
        </div>
        <div className='relative max-sm:left-4 md:left-4 md:top-4 max-sm:top-2 text-sm text-black z-[9999]' >
            <h1 className='font-Gardion text-sm' >
              Gam3r Network Founder and Lead Engineer
            </h1>
        
        </div>
        </div>
        <div className='flex h-8 justify-center md:h-[10vh] max-sm:h-[15vh] md:w-[35vw]  max-sm:w-[82.5vw] relative left-48 max-sm:left-40 relative text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900  -skew-x-12 w-40 text-white' >
        <div className='relative text-black  top-2 ' >
            <h1 className='text-md text-white font-Gardion px-2 ' >
                Julian Borner is the founder and Lead Engineer of the Gam3r Network Company and Website 
            </h1>
       
        </div>
        </div>
       
        </div>
  )
}

export default AboutJulian