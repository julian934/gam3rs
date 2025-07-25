'use client'
import React from 'react'

type Props = {
    user:any,
    message:any,
    forum:any
}

const ForumPost = (props: Props) => {
  return (
    <div className=' w-full h-full' >
        
        {/* Build Forum Posts in style of figma cyberpunk forum post */}
        
       
        
        
        <div className='flex h-[7.5vh] w-[30vw]  relative left-60 justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl   to-red-900  -skew-x-12 w-40 text-white' >
        <div className='relative right-12 top-4 text-sm text-black z-[9999]' >
            <h1 className='font-Gardion' >
               {props.forum}
            </h1>
        
        </div>
        <div className='relative left-20 top-4 text-sm text-black z-[9999]' >
            <h1 className='font-Gardion' >
               {props.user}
            </h1>
        
        </div>
        </div>
        <div className='flex h-8 justify-center h-[7.5vh] w-[30vw] relative left-48 relative text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900  -skew-x-12 w-40 text-white' >
        <div className='relative text-black  top-2 ' >
            <h1 className='text-md text-white font-Gardion' >
            {props.message}
            </h1>
       
        </div>
        </div>
       
        </div>
  )
}

export default ForumPost