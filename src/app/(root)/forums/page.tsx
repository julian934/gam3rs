'use client'
import React,{useState,useRef,useEffect,useContext} from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/home/footer'
import { useQuery } from '@tanstack/react-query'
import Recent from '@/app/components/shared/forums/recent/forumsRecent'
//import Popular from '@/app/components/shared/forums/popular/popular'
import Popular from '@/app/components/shared/forums/popular/forumsPopular'
import Upcoming from '@/app/components/shared/forums/upcoming/upcoming'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import addbutton from '../../utils/images/icons8-add-new-50.png'
import Link from 'next/link'
import Image from 'next/image'
import Notifications from '@/app/components/shared/notifications/notifications'
import FriendsList from '@/app/components/shared/friends/friends'
import MobileNav from '@/app/components/shared/modals/mobileNav'
type Props = {}

const Forums = (props: Props) => {
    //Utilize MongoDB for forums & optimize.
    //Implement Forums search option.
    const ctx=useContext(StoreStateContext);
    const [userState,setUserState]=useState<any>();
    const [testState,setTestState]=useState<any>();
    useEffect(()=>{
      let currUser=localStorage.getItem("userdata");
      let currData=currUser?JSON.parse(currUser) : null;
      setTestState(currData)
      if(currData){
        //ctx.getUserData();
        //const testData= ctx.currUserData();
         //setUserState(currData)
         //setTestState(testData)
         //console.log(ctx.userData)
      }
      
      
    },[])
    
    
    if(userState){
      console.log(userState)
    }
    if(testState){
      console.log(testState.testUser)
      testState.videos.push("testing")
      console.log(testState)
    }
  return (
    <div className='flex grid grid-cols-6 grid-rows-2  bg-white ' >
      <div className='flex w-screen col-start-1 col-span-6   row-start-1' >
      <NavBar/>
      </div>
      <div className=' max-sm:visible fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      <div className='flex max-sm:invisible max-sm:z-50  max-sm:-pt-10 md:z-50 md:relative md:top-20 bg-slate-200 max-sm:bg-white max-sm:-mt-10 max-sm:self-center max-sm:w-full max-sm:z-auto max-sm:p-4 md:h-5/6 md:w-4/5 max-sm:h-20 md:mt-40  md:col-start-1 md:row-start-1 md:row-span-2 p-4 rounded-md p-4  ' >
       <div className='relative md:top-4 md:-left-2' >
         <Notifications/>
        </div>
      
      </div>
      
      <div className='flex  flex-col max-sm:mt-0 md:mt-48 z-50 max-sm:border-2 max-sm:w-full max-sm:px-4 max-sm:border-black justify-start self-start md:self-end -mt-8 max-sm:-mt-48 max-sm:mb-12 col-start-2 max-sm:col-start-1 col-span-4 max-sm:col-span-7 row-start-2 md:row-start-1 row-span-2 max-sm:row-span-3 bg-black rounded-lg' >
        <div className='flex w-full max-sm:w-5/6 max-sm:space-around justify-around h-32 p-4  md:w-2/3 md:ml-0 ' >
           <h1 className='flex h-8 font-Gardion relative max-sm:left-8 md:left-36 justify-center text-2xl max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-56 text-white ' > Current Forums </h1>

          
           
          
          
        </div>
        <div className='flex flex-col max-sm:w-full  p-2  md:h-full ' >
          
          <div className='flex flex-col  p-2 max-sm:w-full' >
            
            <div className='' >
               <Recent/>  {/* Latest Videos calculated by most recent timestamp/
                smallest difference between today and the day it was created */}
            </div>

          </div>
          <div className='flex  flex-col p-2' >
           
            <div className='' > 
               <Popular/>
            </div>

          </div>
          <div className='flex flex-col bg-white rounded-md p-2 ' >
            <h1 className=' text-xl ' >Upcoming Videos</h1>
            <div className='' >
               <Upcoming/>{/* Upcoming Videos from the team, created in mongodb with a pre-determined release date */}
            </div>

          </div>

        </div>
      </div>
      <div className=' flex max-sm:invisible md:z-[9999] max-sm:border-2 md:top-20 md:left-60 md:-right-10  max-sm:border-black max-sm:h-full md:relative row-start-1 md:mt-40 row-span-2 md:h-5/6 md:w-4/5 md:px-8 justify-self-end rounded-md self-start md:col-start-5 bg-slate-200 ' >
      <div className='relative md:left-4 md:top-4' >
          <FriendsList  />
      </div>
       
        </div>
      
      <div className='md:flex  md:row-start-4 md:col-start-1 md:col-span-6 w-screen justify-around   '  >
        <Footer/>
      </div>
      </div>
  )
}

export default Forums