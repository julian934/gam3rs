'use client'
import React,{useState,useContext} from 'react'
import * as Motion from 'motion/react-client'
import UpArrow from '@/app/utils/images/up-arrow.png'
import DownArrow from '@/app/utils/images/down-arrow.png'
import Image from 'next/image'

type Props = {}

const AboutJulian = (props: Props) => {
  const [activeModal,setActiveModal]=useState<boolean | null>(null);

  return (
    <div>
       
        <div className='flex max-sm:relative max-sm:left-52 h-[6vh] max-sm:w-[80vw] md:w-[30vw]  relative left-56 justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl   to-red-900  -skew-x-12 w-40  text-white' >
        <div className='relative max-sm:left-4 md:-right-2 top-2 text-sm text-black z-[9999]' >
            <h1 className='font-Gardion text-xl' >
               Julian Borner
            </h1>
        
        </div>
       
        {/* <div className='relative max-sm:left-4 md:left-32 md:top-2 max-sm:top-2 text-sm text-black z-[9999]' >
            <h1 className='font-Gardion text-sm md:w-3/5' >
              Gam3r Network Founder and Lead Engineer
            </h1>
        
        </div> */}
        </div>
        <div className='flex z-[9999] h-8 justify-center md:h-[6vh] max-sm:h-[10vh] md:w-[30vw]  max-sm:w-[82.5vw] relative left-48 max-sm:left-44 relative text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900  -skew-x-12 w-40 text-white' >
        <div className='relative text-black  top-2  md:left-2' >
            <h1 className='text-md text-white font-Gardion px-2 ' >
            Gam3r Network Founder and Lead Engineer
                
            </h1>
       
        </div>
        </div>
        <Motion.div className='absolute md:left-48 md:top-24 flex flex-col ' >
          <button onClick={()=>setActiveModal(!activeModal)} >{activeModal?<Image className='relative w-8 h-8' src={DownArrow} alt='Open Modal' />:<Image className='relative w-8 h-8' src={UpArrow}  alt='Down Modal' />}</button>
          {activeModal?<Motion.div className=' md:min-h-[20vh] relative md:min-w-[25vw] md:max-w-[20vw] md:-top-10 md:left-10 bg-black text-white' >
            <p className=' relative top-20vh p-4 font-Gardion  ' >
            Julian Borner is the founder and Lead Engineer of the Gam3r Network Company and Website 

            </p>
            <div className='absolute w-10 h-10  md:-top-6 md:left-[23.6vw] bg-white rotate-45 ' >

            </div>
            <div className='absolute w-10 h-10 md:-top-6 md:-left-[1.4vw] bg-white rotate-45 ' >

</div>
<div className='absolute w-10 h-10 md:-left-6 bg-white md:top-[17vh] rotate-45 ' >

</div>
<div className='absolute w-10 h-10 md:left-[23.6vw] md:top-[17vh] bg-white rotate-45 ' >

</div>
            

          </Motion.div>:
          <Motion.div>

            </Motion.div>}


        </Motion.div>
       
        </div>
  )
}

export default AboutJulian