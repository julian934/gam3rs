'use client'
import React,{useState,useEffect,useContext} from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {}

const MobileNav = (props: Props) => {
    const [activated,setActivated]=useState<undefined | null | boolean>(null);
    const [signModal,setSignModal]=useState<undefined | null | boolean>(null);

  return (
    <div className='max-sm:w-screen max-w-screen max-sm:h-screen sticky top-0 md:visible max-sm:top-12 fixed  max-sm:sticky ' >
       
        <div className='max-sm:bg-black  relative -top-12 fixed max-sm:sticky max-h-30v bg-black h' >

            {/* Left Upper slant */}
            <div className='w-[20vw] h-[5vh]  fixed top-16 rotate-45 -left-8  bg-white ' >

            </div>
            {/* Right Upper Slant */}
            <div className='w-[20vw] h-[5vh]  fixed top-16 right-20 -rotate-45  bg-white ' >

            </div>
            <div className='w-full flex flex-col ' >
             <h1 className='text-red-500  self-center text-2xl' > Gam3rs </h1>
             <button className='self-center flex justify-center ' onClick={()=>{}}  >
               <Image className='flex   ' src='' alt='downward Arrow' />
             </button>
             

            </div>
            

        </div>
        <motion.div className=' flex bg-black  max-w-2/3   max-h-25vh' >
        {/* Middle Modal */}
        {activated!=null && activated==true && <motion.div className='' >
            

             </motion.div>}


        </motion.div>

        <div className='' >
            {/* Bottom Modal */}

            {/* Left Modal */}
            <div className='w-5vw h-5vh ' >

            </div>

            {/* left slant */}
            <div  >

            </div>

            {/* Center top white space */}
            <div className='bg-white h-2/3 border-2 border-black ' >
              

            </div>


               {/* right slant */}
            <div className='' >

              </div>

            {/* right modal */}
            <div className='w-5vw h-5vh ' >

              </div>

           {/* Content Buttons */}

           <div className=''  >
            <motion.div className='' >
              <Link href='/videos' > <Image className='' src='' alt='Videos Symbol' /> </Link>
            </motion.div>
            <motion.div className='' >
              <Link href='/forums' > <Image className='' src='' alt='Forums Symbol' /> </Link>
            </motion.div>
            <motion.div className='' >
              <Link href='/games' > <Image className='' src='' alt='Games Symbol' /> </Link>
            </motion.div>

           {/* Sign Up Options */} 
            {signModal?
            <motion.div className='' >

                <motion.div className='' >
                    <Link className='' href='/signup' >
                       <Image className='' src='' alt='Sign Up' />
                    </Link>
                    <Link className='' href='/signin' >
                    <Image className='' src='' alt='Sign In' />
                    </Link>


                </motion.div>
                <button className='' onClick={()=>{setSignModal(!signModal)}} >
                    <Image className='' src='' alt='Sign Up/Sign In' />
                </button>

            </motion.div>:
            <motion.div className='' >
                <button className='' onClick={()=>{setSignModal(!signModal)}} >
                    <Image className='' src='' alt='Sign Up/Sign In' />
                </button>

                </motion.div>}


           <motion.div className='' >
              <Link href='/about' > <Image className='' src='' alt='About Symbol' /> </Link>
            </motion.div>

            </div>    




        </div>
        

        </div>
  )
}

export default MobileNav