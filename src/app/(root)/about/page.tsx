'use client'
import React, { useState } from 'react';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import Image from 'next/image';
import Link from 'next/link';
import Instagram from '../../utils/images/socials/icons8-instagram-96.png'
import Twitter from '../../utils/images/socials/icons8-twitterx-100.png';
import Twitch from '../../utils/images/socials/icons8-twitch-100.png'
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import News_Modal from '@/app/components/shared/banners/news/news';
import About_Modal from '@/app/components/shared/modals/about';
type Props = {}

const About = (props: Props) => {
  const [aboutData,setAboutData]=useState<any>([]);
  const {data}=useQuery({
    queryKey:['aboutPage'],
    queryFn:()=>{} 
  })
   
   useEffect(()=>{
        const currData=data;
        setAboutData(currData);
   },[data])

  return (
    <div className='flex max-sm:flex-col grid grid-cols-6 grid-rows-4 h-screen bg-white
    ' >
     
      <div className='col-start-1 col-span-6 row-start-1 z-20 max-sm:z-40' >
      <NavBar/>
      </div>
      {/*<h1 className='flex row-start-2 col-start-2 col-span-4 justify-center text-3xl' >About</h1> */}
      
     <div className='flex md:space-x-2 max-sm:flex-col grid z-60 md:-mb-12 md:p-4 grid-cols-4 grid-rows-4 row-start-2 md:self-center md:justify-self-center row-span-2 col-start-1 col-span-6  rounded-lg  ' >
     
      <div className=' flex  max-sm:col-start-1 max-sm:col-span-4 row-start-1 row-span-3 col-start-1 col-span-2
        max-sm:row-start-1 max-sm:row-span-3 max-sm:col-start-1 max-sm:col-span-6 max-sm:h-full  self-center max-sm:z-50 max-sm:px-4' >
          <About_Modal/>
      </div>
      <div className='flex flex-col row-start-1 row-span-4 justify-center col-start-3  self-center col-span-2 
       max-sm:col-start-1 max-sm:col-span-6 max-sm:row-start-3 z-50 max-sm:justify-end max-sm:z-50 max-sm:self-start max-sm:mt-14 ' >
        <div className='flex self-center' >
            <h1 className=' flex  justify-center self-center p-2 text-6xl ' >What We Do</h1> {/* Add Design */}
        </div>
      <div className='flex  rounded-md  bg-white' >
        <p className='flex flex-wrap p-4 ' >The Gam3rs Network is your place for unfiltered, unedited content that is by Gamers, for Gamers. 
        On our YouTube Channel, we make videos about games and gaming-related subjects, as well as host livestreams where we go in-depth 
        about these topics and interact with our viewers to get your opinions about the topic. Over here on The Gam3r Network website, 
        we continue the conversation with forums, videos and livestreams that we can't host on YouTube. Jump down the rabbit hole and 
        join the network! Be sure to join us on social media where we post every day!
       </p>
      </div>
      <div className='flex row-start-4 col-start-2 col-span-4 justify-around bg-white ' >
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
        <div className='flex flex-col bg-white ' >
          <h1 className='' >Meet The Team</h1>
          {aboutData && <></>}

         </div>

      
      
      
      
     </div>
    
     <div className='flex col-start-1 col-span-6 row-start-4  self-end justify-around 
      max-sm:row-start-4 max-sm:row-span-2 max-sm:self-start max-sm:mt-96 max-sm:z-50 bg-white max-sm:w-full max-sm:h-full max-sm:space-y-10 ' >
     <Footer/>
     </div>
      
    </div>
    </div>
  )
}

export default About