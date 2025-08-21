'use client'
import React,{useState,useEffect,useContext} from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import aboutIcon from '@/app/utils/images/aboutIcon.png'
import forumsIcon from '@/app/utils/images/forumIcon.png'
import gamesIcon from '@/app/utils/images/gamesIcon.png'
import signIn from '@/app/utils/images/signIn.png'
import SignUp from '@/app/utils/images/signUp.png'
import videoIcon from '@/app/utils/images/videoIcon.png'
import minimizeButton from '@/app/utils/images/minimize-button.png'
import NotificationCircle from '@/app/utils/images/notification-circle.png'
import { HoverEffect } from '../../ui/hover-effect/hover-effect'
import Gif from '../../shared/videos/gif/mobileGif'
import { getNotifications } from '@/app/lib/database/connections'
import { useQuery } from '@tanstack/react-query'

type Props = {}

const MobileNav = (props: Props) => {
    const [activated,setActivated]=useState<undefined | null | boolean>(null);
    const [signModal,setSignModal]=useState<undefined | null | boolean>(null);

    const {data}=useQuery({
      queryKey:['latestVideos'],
      queryFn:()=>getNotifications(),
      enabled: !!getNotifications
  });

    useEffect(() => {
        const setVh = () => {
          document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        };
        setVh();
        window.addEventListener('resize', setVh);
        return () => window.removeEventListener('resize', setVh);
      }, []);
      

  return (
    <div className='max-sm:w-screen md:invisible max-w-screen max-sm:h-[calc(var(--vh)*100)] top-0 md:visible max-sm:top-0 fixed  max-sm:sticky z-[9999] ' >
        <div className='max-sm:bg-black  relative -mt-4 -top-48 fixed max-sm:sticky max-h-30v bg-black ' >

            {/* Left Upper slant */}
            <div className='w-[20vw] h-[5vh]  fixed top-12 rotate-45 -left-10  bg-white ' >

            </div>
            {/* Right Upper Slant */}
            <div className='w-[20vw] h-[5vh]  fixed top-12 -right-8 -rotate-45  bg-white ' >

            </div>
            <div className='w-full flex flex-col ' >
              
                <div className='relative top-[4.0vh] pointer-events-auto flex self-center  justify-center transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-36 h-8 z-50 ' >
                <Link href='/home' >
                   <h1 className='flex text-2xl text-white hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 font-Gardion ' > Gam3rs </h1>
                   </Link>
                </div>
               
             <button className='relative top-10 self-center pointer-events-auto flex justify-center z-[9999] rounded-md bg-white w-14 h-10  ' onClick={()=>setActivated(!activated)}  >
               {/*<Image className='flex   ' src='' alt='downward Arrow' />*/}
               {activated?<motion.div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
</svg></motion.div>
:
<motion.div>
<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="rotate-0 size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg></motion.div>}


             </button>
             

            </div>
            

        </div>
        {activated &&  <motion.div className=' fixed pointer-events-auto bg-slate-200  max-w-[80vw]  rounded-md top-36 left-10 w-[80vw] h-[45vh] max-h-25vh' >
        {/* Middle Modal */}
        <motion.div className='bg-slate-200 ' >
            
            <div className=' flex flex-col max-h-[40vh] py-2 space-y-20 border-2 border-black max-w-[60vw] self-center justify-self-center overflow-y-auto' >
            {data && data?.data?.reverse()?.map((vals:any)=>
      <Link className='flex flex-col justify-center self-center h-[10vh] w-3/5  ' href={`/videos/${vals?.playbackID}`} key={vals?.playbackID}  >
        <h1 className='' >{vals?.user} just posted {vals?.fileName}:  </h1>
        <div className='flex w-full px-4 max-h-[5vh]' > 
          <Gif playbackID={vals.playbackID} fileName={vals.fileName} />
        </div>
       
       </Link>)}
            </div>
          
            

             </motion.div>


        </motion.div>
}
      
        <div className='relative  bg-black h-[12vh] w-full top-[80vh]' >
            {/* Bottom Modal */}

           

            {/* left slant */}
            <div  >

            </div>

            {/* Center top white space */}
            


               {/* right slant */}
            <div className='flex' >
                 {/* Left Modal */}
            <div className=' relative -top-10 z-[9998]  skew-x-12 w-[25vw]  -left-2 h-[7.5vh]  bg-black  ' >

</div>

                  {/* right modal */}
            <div className='relative -top-10 z-[9998]  -skew-x-12 w-[25vw]  left-52 h-[7.5vh]  bg-black   ' >

</div>

              </div>
                {/*  <hr className='relative -top-12 w-full' />*/}
                  
                    {/* Red HR */}

           {/* Content Buttons */}

           <div className='relative left-[2vw] pointer-events-auto fixed flex justify-around space-around -top-[6vh] z-[9999] h-[12.5vh]  w-[95vw]'  >
            <motion.div className=' relative -top-6 flex self-center transition ease-in-out rounded-md hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-16 h-20 z-50 ' >
              <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' href='/videos' > <Image className=' relative top-2 h-4/5' quality={100} width={1000} height={1000} src={videoIcon} alt='Videos Symbol' /> </Link>
            </motion.div>
            <motion.div className='flex  relative -top-2 self-center transition ease-in-out rounded-md hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-16 h-12 z-50 ' >
              <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' href='/forums' > <Image className='' quality={100}  width={1000} height={1000} src={forumsIcon} alt='Forums Symbol' /> </Link>
            </motion.div>
            <motion.div className='flex relative -top-2  self-center transition ease-in-out rounded-md hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-16 h-12 z-50 ' >
              <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110' href='/games' > <Image className='' quality={100}  width={1000} height={1000} src={gamesIcon} alt='Games Symbol' /> </Link>
            </motion.div>

           {/* Sign Up Options */} 
            {signModal?
            <motion.div className='pointer-events-auto' >

                <motion.div className='relative -top-20 left-10 -bottom-2 ' >
                    <motion.div className=  ' flex relative transition ease-in-out rounded-md hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-10 h-6 z-50 ' >
                     <button className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110' onClick={()=>{setSignModal(!signModal)}} >
                       <Image className='  ' quality={100}  width={1000} height={1000} src={minimizeButton} alt='Sign Up/Sign In Modal' />
                     </button>
                    </motion.div>
                   


                </motion.div>

                <motion.div className='flex  -top-16 left-6 relative transition ease-in-out rounded-md hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-12 h-10 z-50' >
                    <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110' href='/signin' >
                    <Image className='' quality={100}  width={1000} height={1000} src={signIn} alt='Sign In' />
                    </Link>
                    </motion.div>
                <motion.div className='relative -top-16 mt-2 self-center flex transition ease-in-out rounded-md hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-16 h-12 z-50' >
                  <Link href='/signupRedux' >
                <button className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110' onClick={()=>{setSignModal(!signModal)}} >
                    <Image className='h-[7vh]' quality={100}  width={1000} height={1000} src={SignUp} alt='Sign Up/Sign In' />
                </button>
                </Link>
                </motion.div>

            </motion.div>:
            <motion.div className=' relative -top-2 pointer-events-auto self-center flex transition ease-in-out rounded-md hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-16 h-12 z-50' >
                <button className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110' onClick={()=>{setSignModal(!signModal)}} >
                    <Image className='' quality={100}  width={1000} height={1000} src={SignUp} alt='Sign Up/Sign In' />
                </button>

                </motion.div>}


           <motion.div className=' relative -top-6 flex self-center transition ease-in-out rounded-md hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-16 h-20 z-50' >
              <Link className='flex relative top-0 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full h-full hover:scale-110' href='/about' > <Image className='  relative top-2 h-4/5' quality={100}  width={1000} height={1000} src={aboutIcon} alt='About Symbol' /> </Link>
            </motion.div>

            </div>    




        </div>
        

        </div>
  )
}

export default MobileNav