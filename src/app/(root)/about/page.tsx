'use client'
import React, { useState } from 'react';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import Image from 'next/image';
import Link from 'next/link';
import Instagram from '../../utils/images/socials/revised/instagram.png'
import Twitter from '../../utils/images/socials/revised/x_icon.png';
import Twitch from '../../utils/images/socials/revised/twitch.png'
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import News_Modal from '@/app/components/shared/banners/news/news';
import About_Modal from '@/app/components/shared/modals/about';
import MobileNav from '@/app/components/shared/modals/mobileNav';
//import AboutJulian from '@/app/components/ui/about/aboutJulian';
import AboutJulian from '@/app/components/ui/about/aboutJulianRedux';
import JB_Profile_Pic from '@/app/utils/images/JB_Professional_Pic.jpg'

type Props = {}



const About = (props: Props) => {

  
   
   useEffect(()=>{
       
      
   },[])

  return (
    <div className=' max-sm:flex-col grid grid-cols-6 grid-rows-4 min-h-screen bg-white
    ' >
     
      <div className='col-start-1 col-span-6 row-start-1 z-20 max-sm:z-40' >
      <NavBar/>
      </div>
      <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      {/*<h1 className='flex row-start-2 col-start-2 col-span-4 justify-center text-3xl' >About</h1> */}
      
     <div className='flex md:space-x-2 max-sm:flex-col grid z-60 md:-mb-12 md:p-4 grid-cols-4 grid-rows-4 max-sm:row-start-1 md:row-start-2 md:self-center md:justify-self-center row-span-2 col-start-1 col-span-6  rounded-lg  ' >
     
      <div className=' flex  max-sm:h-[35vh] max-sm:self-start max-sm:justify-center relative md:-top-48 max-sm:-left-2 max-sm:top-32 max-w-[800px]  md:max-h-[600px]  max-sm:col-start-1 max-sm:col-span-4 md:row-start-1 md:row-span-3 col-start-1 md:col-span-2
        1 max-sm:col-start-1 max-sm:col-span-6 max-sm:h-full md:relative md:-top-4  md:self-center max-sm:z-50 max-sm:px-4 md:pt-0' >
          <About_Modal/>
      </div>
      <div className='flex md:relative md:-top-48 flex-col row-start-1 row-span-4 justify-center col-start-3  self-center col-span-2 
       max-sm:col-start-1 max-sm:col-span-6 max-sm:row-start-2 z-50 max-sm:justify-end max-sm:z-50 max-sm:self-start mt-14 ' >
        <div className='flex self-center relative md:top-4' >
            <h1 className=' flex  justify-center self-center p-2 text-5xl 2xl:text-8xl font-Gardion ' >What We Do</h1> {/* Add Design */}
        </div>
      <div className='flex  rounded-md  bg-white' >
        <p className='flex flex-wrap  p-4 max-sm:px-6 2xl:text-lg ' >The Gam3rs Network is your place for unfiltered, unedited content that is by Gamers, for Gamers. 
        On our YouTube Channel, we make videos about games and gaming-related subjects, as well as host livestreams where we go in-depth 
        about these topics and interact with our viewers to get your opinions about the topic. Over here on The Gam3r Network website, 
        we continue the conversation with forums, videos and livestreams that we can&apos;t host on YouTube. Jump down the rabbit hole and 
        join the network! Be sure to join us on social media where we post every day!
       </p>
      </div>
      
       {/*  <div className='flex flex-col' >
        <h2 className='' >Meet the team</h2>
        <div className='flex flex-col ' >
       
        <Image className='' src='' alt='Julian Borner' />
        <p className='' >Julian Borner is the founder of The Gam3r Network and also host of the Gam3r Network YouTube channel. 
                         Julian has been playing video games and watching movies since he was a kid. His passion for games and media are what motivated him 
                         to build The Gam3r Network and bring together people with wild ideas and thoughts about Games, so there can be a platform that supports 
                         and uplifts the Gamer. Be sure to join the Friday night LiveStreams so you can connect with him and learn what's next for the Gam3r Network
        </p>
        </div>
        </div> */}
        <div className='flex flex-col bg-white max-sm:space-y-4' >
          <h1 className='font-Gardion relative max-sm:left-6' >Meet The Team</h1>
       
          <div className='flex max-sm:flex-col max-sm:self-center max-sm:justify-self-center max-sm:space-y-4' >
                 <Image className='max-sm:relative max-sm:left-0 max-sm:justify-around rounded-md md:w-[20vw]  md:h-[40vh] max-sm:w-[90vw] max-sm:h-[60vh] '  quality={100} height={400} width={400} src={JB_Profile_Pic} alt='Julian Borner Profile Pic' />
                 <div className='relative max-sm:right-0 md:-right-4  '   > 
                 <AboutJulian/>
                 </div>
                
      </div>

         </div>

      
      
      
      
     </div>
     
     {/* <div className='flex max-sm:flex-col  row-start-3 col-start-1 col-span-4 bg-white' >
      

     </div>*/}
     <div className='flex relative max-sm:top-28 top-10 row-start-4 col-start-1 col-span-4 justify-around bg-white ' >
     <Link className='self-center' href='/' >
       <Image className='w-12 h-12  ' src={Instagram} alt='Instagram'  /> {/* Instagram out of place, find one that is black and white. */}
       </Link>
       <Link className='self-center' href='/' >
       <Image className='w-12 h-12 rounded-lg ' src={Twitter} alt='X/Twitter'  />
       </Link>
       <Link className='self-center' href='/' >
       <Image className='w-12 h-12  ' src={Twitch} alt='Twitch'  />
       </Link>

     </div>
    
     <div className='flex relative md:top-10 max-sm:top-36 bg-white top-10 max-sm:top-48  col-start-1 col-span-6 row-start-4  self-end justify-around 
      ' >
     <Footer/>
     </div>
      
    </div>
    </div>
  )
}

export default About