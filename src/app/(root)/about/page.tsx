'use client'
import React from 'react';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import Image from 'next/image';
import Link from 'next/link';
import Instagram from '../../utils/images/socials/icons8-instagram-96.png'
import Twitter from '../../utils/images/socials/icons8-twitterx-100.png';
import Twitch from '../../utils/images/socials/icons8-twitch-100.png'
type Props = {}

const About = (props: Props) => {
  return (
    <div className='flex grid grid-cols-6 grid-rows-4 h-screen bg-white
    ' >
     
      <div className='col-start-1 col-span-6 row-start-1' >
      <NavBar/>
      </div>
      {/*<h1 className='flex row-start-2 col-start-2 col-span-4 justify-center text-3xl' >About</h1> */}
      
     <div className='flex grid grid-cols-4 grid-rows-4 row-start-2 row-span-2 col-start-2 col-span-4 border-2 border-black rounded-lg' >
      <div className='flex w-full row-start-1 row-span-2 col-start-1 col-span-2 border-black border-2 p-4 border-slate-200 ' >
      
      <h1 className=' flex  justify-center self-center p-2 text-6xl ' >Who are we?</h1>
     
      
      {/* <Image className='flex w-1/2 justify-center '  src='' alt='The Gam3r Network Logo' />*/}
      
    
      </div>
      <div className='flex row-start-3 row-span-2 col-start-1 col-span-2 border-2 border-slate-200 ' >
         <h1 className=' flex  justify-center self-center text-6xl ' >The <span className='text-red-600 px-4' >Gam3r</span> Network </h1>
      </div>
      <div className='flex flex-col row-start-1 row-span-3 col-start-3 col-span-2   ' >
      <div className='flex border-2 border-slate-200' >
        <p className='flex ' >The Gam3r Network is your place for unfiltered, unedited content that is by Gamers, for Gamers. 
        On our YouTube Channel, we make videos about games and gaming-related subjects, as well as host livestreasm where we go in-depth 
        about these topics and interact with our viewers to get your opinions about the topic. Over here on The Gam3r Network website, 
        we continue the conversation with forums, videos and livestreams that we can't host on YouTube. Jump down the rabbit hole and 
        join the network! Be sure to join us on social media where we post every day!
       </p>
      </div>
        <div className='flex flex-col' >
        <h2 className='' >Meet the team</h2>
        <div className='flex flex-col ' >
        {/*Add Scroll Wheel animation for teammates */}
        <Image className='' src='' alt='Julian Borner' />
        <p className='' >Julian Borner is the founder of The Gam3r Network and also host of the Gam3r Network YouTube channel. 
                         Julian has been playing video games and watching movies since he was a kid. His passion for games and media are what motivated him 
                         to build The Gam3r Network and bring together people with wild ideas and thoughts about Games, so there can be a platform that supports 
                         and uplifts the Gamer. Be sure to join the Friday night LiveStreams so you can connect with him and learn what's next for the Gam3r Network
        </p>
        </div>
        </div>
       
        
      </div>

      
      
      
      
     </div>
     <div className='flex row-start-4 col-start-2 col-span-4 justify-around ' >
     <Link className='self-center' href='/' >
       <Image className='w-12 h-12  ' src={Instagram} alt='Instagram'  />
       </Link>
       <Link className='self-center' href='/' >
       <Image className='w-12 h-12 border-2 border-black rounded-lg ' src={Twitter} alt='X/Twitter'  />
       </Link>
       <Link className='self-center' href='/' >
       <Image className='w-12 h-12  ' src={Twitch} alt='Twitch'  />
       </Link>

     </div>
     <div className='flex col-start-1 col-span-6 row-start-4 self-end justify-around ' >
     <Footer/>
     </div>
      
    </div>
  )
}

export default About