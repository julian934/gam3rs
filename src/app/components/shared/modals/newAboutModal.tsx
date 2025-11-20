'use client'
import React from 'react'

type Props = {}

const NewAboutModal = (props: Props) => {
  return (
    <div className='flex max-sm:min-w-[100px] md:min-w-[600px] max-sm:min-h-[100px] md:min-h-[300px] ' >
          <div className='bg-black w-full h-full' >
              {/* Background */}
        </div>
        <div className=' absolute -top-6 left-72 z-50' >
             {/* Upper Design */}
            <div className='absolute w-8 h-4 bg-red-900   -skew-x-[0.7rad] rotate-180 ' >

            </div>
             <div className='absolute w-36 h-4 bg-red-900 top-0  left-12 -skew-x-[0.7rad]  ' >

            </div>
             <div className='absolute w-36 h-4 bg-red-900 left-24   skew-x-[0.7rad] rotate-180 ' >

            </div>

        </div>
        <h1 className=' absolute text-5xl top-28 left-16 font-Gardion text-red-900 ' >  The Gam3r Network  </h1>
        <div className=' flex absolute -left-4 -ml-2 -top-6 bg-white w-12 h-12 -rotate-45 ' >
              {/* Top Left */}
        </div>
         <div className=' flex left-96 rotate-45 ml-40  -mt-2 top-0 absolute bg-white w-24 h-12' >
              {/* Top Right */}
        </div>
         <div className='flex absolute  rotate-45 -left-12 top-64 bg-white w-28 h-12' >
               {/* Bottom Left */}
        </div>
           <div className='flex absolute left-96 ml-48 top-72 -mt-2  bg-white w-12 h-12 -rotate-45' >
               {/* Bottom Right*/}
        </div>

        <div className='absolute ' >
            {/* Lower Design*/}
            <div className='absolute bg-red-900 top-72 left-96 ml-44 mt-8 -rotate-45 rotate-270 w-10 h-[1rem] -skew-x-[0.7rad] ' >

            </div>
              <div className='absolute bg-red-900 top-72 mt-4 left-0 rotate-45 w-20 h-[1rem] skew-x-[0.7rad] ' >

            </div>
              <div className='absolute bg-red-900 w-[25rem] h-6 top-72 mt-10 ml-0 left-14 skew-x-[0.7rad]  ' >

            </div>
             <div className='absolute bg-red-900 w-[25.0rem] h-6 top-72 mt-10 left-44 -skew-x-[0.7rad]  ' >

            </div>
        </div>

        </div>
  )
}

export default NewAboutModal