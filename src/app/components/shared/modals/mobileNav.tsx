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
//import Gif from '../../shared/videos/gif/mobileGif'
import { getNotifications } from '@/app/lib/database/connections'
import { useQuery } from '@tanstack/react-query'
import Mobile_Icon from '@/app/utils/images/redesign/Gam3rs_Mobile_Menu_Options_Lower.png'
import Mobile_Notification_Icon from '@/app/utils/images/redesign/Gam3rs_notifications_modal.png'
import Notification_Modal from '@/app/utils/images/redesign/Gam3rs_notifications_modal.png'
import CyberHeader from '../../ui/headers/cyber-header'
//import Link from 'next/link'
//import { motion } from 'framer-motion'
import Gif from '../../shared/videos/gif/notificationGif'
//import Image from 'next/image'

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
    <div className='max-sm:w-screen md:invisible max-w-screen max-sm:h-[calc(var(--vh)*100)] top-0 max-sm:top-0 fixed  max-sm:sticky z-[9999] ' >
        <div className='max-sm:bg-black  relative -mt-4 -top-48 fixed max-sm:sticky max-h-30v bg-black ' >

            {/* Left Upper slant */}
            {/*   <div className='w-[20vw] h-[5vh]  fixed top-12 rotate-45 -left-10  bg-white ' >

            </div>*/}
          
            {/* Right Upper Slant */}
            {/*  <div className='w-[20vw] h-[5vh]  fixed top-12 -right-8 -rotate-45  bg-white ' >

            </div>*/}
           
            <div className='w-full flex flex-col ' >
              
                <div className='relative top-[2.0vh] pointer-events-auto flex self-center  justify-center transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-36 h-8 z-50 ' >
                <Link href='/home' >
                   <h1 className='flex text-2xl text-white hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 font-Gardion ' > Gam3rs </h1>
                   </Link>
                </div>
               
             <button className='relative top-10 self-center pointer-events-auto flex justify-center z-[9999] rounded-md bg-gray-400 w-14 h-10  ' onClick={()=>setActivated(!activated)}  >
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
        <motion.div className='bg-slate-200 rounded-md p-4 ' >
            <div className='relative top-[0vh] pointer-events-auto flex self-center  justify-center transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-48 h-8 z-50 ' >
                
                   <h1 className='flex text-2xl text-white hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 font-Gardion ' > Notifications</h1>
                   
                </div>

            <div className=' flex relative top-4 max-h-[40vh] py-6 space-x-20 max-w-[60vw] self-center justify-self-center overflow-x-auto' >
            {data && data?.data?.map((vals:any)=>vals?.playbackId && vals!==null?
      <Link className='flex flex-col rounded-md  max-h-[100vh]  space-y-2 pb-4' href={`/videos/${vals?.playbackId}`} key={vals?.playbackId}  >
        <h1 className='w-full relative left-0 top-10 font-semibold text-sm text-red-900 z-[9999] overflow-hidden ' >{vals?.user?.split('@')?.filter((val:string)=>val!='@' && val!='yahoo.com' &&val!='gmail.com' && val!='hotmail.com' )} ... </h1>
        <div className='flex relative left-0 top-4 justify-center w-full  max-h-[12.5vh] py-4 min-w-[10vw] z-[9999]' > 
          <Gif playbackID={vals.playbackId} fileName={vals.fileName} />
        </div>
       <Image className='absolute w-96 h-96  -top-28 overflow-hidden scale-[1.5] ' src={Notification_Modal} alt='Notification Background' />
       
       </Link>:vals?.forumID && vals!==null? <Link className='flex flex-col self-center' href={`/forums/${vals.forumID}`} >

           <h1 className=' px-2 relative text-red-900 font-semibold text-sm z-[9999] md:left-4 md:-top-2 ' >{vals.user} just posted to </h1>
           <h1 className='flex text-red-900 relative z-[9999] px-2  max-sm:w-48 md:w-72 md:-top-2 max-sm:text-xl h-8  md:-right-4  text-xl w-64 text-white' >
            {vals.forumName}
           </h1>
           <Image className='absolute w-96 h-96  -top-28 overflow-hidden scale-[1.5] ' src={Notification_Modal} alt='Notification Background' />
                   
       </Link>:<div></div>)}
       
            </div>
          
            

             </motion.div>
             <motion.div className='bg-slate-200 p-4' >

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
            <motion.div className=' relative -top-6 flex self-center transition ease-in-out rounded-md hover:animate-pulse  w-16 h-20 z-50 overflow-hidden ' >
             
              <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-[2] overflow-hidden  z-20' href='/videos' > <Image className=' relative top-4 h-12 w-12' quality={100} width={1000} height={1000} src={videoIcon} alt='Videos Symbol' /> </Link>
               <Image className='absolute w-full h-full scale-[6] hover:scale-[8] overflow-hidden' src={Mobile_Icon} alt='Mobile Icon' />
            </motion.div>
            <motion.div className='relative -top-6 flex self-center transition ease-in-out rounded-md hover:animate-pulse w-16 h-20 z-50 overflow-hidden' >
              <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-[2] overflow-hidden z-20' href='/forums' > <Image className='relative top-4 h-12 w-12' quality={100}  width={1000} height={1000} src={forumsIcon} alt='Forums Symbol' /> </Link>
               <Image className='absolute w-full h-full scale-[6] hover:scale-[8] overflow-hidden' src={Mobile_Icon} alt='Mobile Icon' />
            </motion.div>
            <motion.div className='relative -top-6 flex self-center transition ease-in-out rounded-md hover:animate-pulse w-16 h-20 z-50 overflow-hidden' >
              <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-[2]  overflow-hidden z-20' href='/games' > <Image className='relative top-4 h-12 w-12' quality={100}  width={1000} height={1000} src={gamesIcon} alt='Games Symbol' /> </Link>
              <Image className='absolute w-full h-full scale-[6] hover:scale-[8] overflow-hidden ' src={Mobile_Icon} alt='Mobile Icon' />
            </motion.div>

           {/* Sign Up Options */} 
            {signModal?
            <motion.div className='pointer-events-auto' >

                <motion.div className='relative -top-20 left-4 -bottom-2 overflow-hidden' >
                    <motion.div className=  ' flex relative  rounded-md shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110  w-10 h-6 z-50  overflow-hidden' >
                     <button className='flex z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 overflow-hidden' onClick={()=>{setSignModal(!signModal)}} >
                       <Image className='  ' quality={100}  width={1000} height={1000} src={minimizeButton} alt='Sign Up/Sign In Modal' />
                        
                     </button>
                    <Image className='absolute w-full h-full scale-[6] hover:scale-[8] overflow-hidden ' src={Mobile_Icon} alt='Mobile Icon' />
                    </motion.div>
                   


                </motion.div>

                <motion.div className='flex  -top-16 left-2 relative  w-12 h-10 z-50' >
                    <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 overflow-hidden' href='/signin' >
                    <Image className='z-50' quality={100}  width={1000} height={1000} src={signIn} alt='Sign In' />
                    
                    </Link>
                    <Image className='absolute w-full h-full scale-[6] hover:scale-[8] overflow-hidden ' src={Mobile_Icon} alt='Mobile Icon' />
                    </motion.div>
                <motion.div className='relative -top-16 mt-2 self-center flex transition  rounded-md shadow-xl hover:scale-110  w-16 h-12 z-0 overflow-hidden' >
                  <Link href='/signupRedux' >
                <button className='flex  w-full overflow-hidden  z-50 ' onClick={()=>{setSignModal(!signModal)}} >
                    <Image className='absolute left-4 h-[5vh] w-[10vw] z-50' quality={100}  width={1000} height={1000} src={SignUp} alt='Sign Up/Sign In' />
                    
                </button>
                <Image className='absolute top-0 w-full h-full scale-y-[10] scale-x-[6] hover:scale-[8] overflow-hidden z-40 ' src={Mobile_Icon} alt='Mobile Icon' />
                </Link>
                </motion.div>

            </motion.div>:
            <motion.div className=' relative -top-6 flex self-center transition ease-in-out rounded-md hover:animate-pulse w-16 h-20 z-50 overflow-hidden' >
                <button className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full overflow-hidden  z-50' onClick={()=>{setSignModal(!signModal)}} >
                    <Image className='relative top-4 h-12 w-12 ' quality={100}  width={1000} height={1000} src={SignUp} alt='Sign Up/Sign In' />
                </button>
                  <Image className='absolute w-full h-full scale-[6] hover:scale-[8] overflow-hidden' src={Mobile_Icon} alt='Mobile Icon' />
                </motion.div>}


           <motion.div className='relative  -top-6 flex self-center transition ease-in-out rounded-md hover:animate-pulse w-16 h-20 z-50 overflow-hidden' >
              <Link className='flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full overflow-hidden  z-50' href='/about' > <Image className=' relative top-4 h-12 w-12' quality={100}  width={1000} height={1000} src={aboutIcon} alt='About Symbol' /> </Link>
              <Image className='absolute w-full h-full scale-[6] hover:scale-[8] border-2 border-white hover:overflow-hidden overflow-hidden' src={Mobile_Icon} alt='Mobile Icon' />
            </motion.div>

            </div>    




        </div>
        

        </div>
  )
}

export default MobileNav