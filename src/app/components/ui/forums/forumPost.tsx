'use client'
import React,{useState} from 'react'
import * as Motion from 'motion/react-client'
import UpArrow from '@/app/utils/images/up-arrow.png'
import DownArrow from '@/app/utils/images/down-arrow.png'
import Image from 'next/image'

type Props = {
    user:any,
    message:any,
    forum:any
}

const ForumPost = (props: Props) => {
     const [activeModal,setActiveModal]=useState<boolean | null>(null);
  return (
    <div className=' w-full h-full z-[9999]' >
        
        {/* Build Forum Posts in style of figma cyberpunk forum post */}
        
       
        
        
        <div className='flex h-[7.5vh] max-sm:h-[6vh] max-sm:left-8 w-[30vw] max-sm:min-w-[60vw] relative md:left-60 justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl   to-red-900  -skew-x-12 w-40 text-white' >
        <div className='relative md:right-12 top-4 text-sm text-black z-[9999]' >
            <h1 className='font-Gardion' >
              
            </h1>
        
        </div>
        <div className='relative left-20 max-sm:left-0 top-4 text-sm text-black z-[9999]' >
            <h1 className='font-Gardion' >
               {props.user}
            </h1>
        
        </div>
        </div>
        <div className='flex h-8 justify-center h-[7.5vh] max-sm:h-[6vh] w-[30vw] max-sm:min-w-[60vw] z-[9999] relative md:left-48 relative text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900  -skew-x-12 w-40 text-white' >
        <div className='relative text-black  top-2 ' >
            <h1 className='text-md text-white font-Gardion' >
            {props.forum}
            </h1>
       
        </div>
        </div>
        <Motion.div className='relative md:left-[15vw] md:top-[5vh] max-sm:p-2  max-sm:-left-4  flex flex-col z-[9998]' >
          
          {/* <button onClick={()=>setActiveModal(!activeModal)} >{activeModal?<Image className='relative z-[9999] w-8 h-8' src={DownArrow} alt='Open Modal' />:<Image className='relative w-8 h-8' src={UpArrow}  alt='Down Modal' />}</button>*/}
          <Motion.div className=' md:min-h-[20vh] max-sm:h-full relative max-sm:min-w-[60vw] max-sm:max-w-[80vw]  md:min-w-[25vw] md:max-w-[20vw] md:-top-6 md:left-10 bg-black text-white' >
            <p className=' relative top-20vh p-4 font-Gardion  ' >
           
            {props.message}
            </p>
            <div className='absolute w-10 h-10  max-sm:-top-[5vh] max-sm:-left-[5.3vw] md:-top-6 md:left-[23.6vw] bg-white rotate-45 ' >
                   {/* Top Left*/}
            </div>
            <div className='absolute w-10 h-10  max-sm:top-[7.5vh] max-sm:-left-[5vw] md:-top-6 md:-left-[1.4vw] bg-white rotate-45 ' >
                 {/* bottom Left*/}
</div>
<div className='absolute w-10 h-10  max-sm:-top-[3vh] max-sm:left-[61vw] md:-left-6 bg-white md:top-[17vh] rotate-45 ' >
    {/* Top right*/}
</div>
<div className='absolute w-10 h-10  max-sm:top-[7.5vh] max-sm:left-[58vw] md:left-[23.6vw] md:top-[17vh] bg-white rotate-45 ' >

</div>
            

          </Motion.div>


        </Motion.div>
       
       
        </div>
  )
}

export default ForumPost