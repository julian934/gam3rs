'use client'
import React,{useState,useRef,useEffect,useContext} from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/home/footer'
import { useQuery } from '@tanstack/react-query'
import Recent from '@/app/components/shared/forums/recent/recents'
import Popular from '@/app/components/shared/forums/popular/popular'
import Upcoming from '@/app/components/shared/forums/upcoming/upcoming'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import Link from 'next/link'
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
    <div className='flex grid grid-cols-6 grid-rows-4  bg-white ' >
      <div className='flex w-screen col-start-1 col-span-6   row-start-1' >
      <NavBar/>
      </div>
      <div className='flex flex-col md:justify-start md:self-start md:-mt-8 col-start-2 col-span-4 row-start-2 row-span-2 bg-gray-200 rounded-lg' >
        <div className='flex w-full justify-around h-32 p-4' >
           <h1 className='text-2xl' > Current Forums </h1>

           <div className=' rounded-lg shadow-2xl bg-gray-400 hover:bg-gray-700 w-6 h-6' >
           <Link href='/testUpload' className=' ' >Create a New Forum</Link>
           </div>
           
           <div className=' rounded-lg sha2dow-2xl bg-gray-400 hover:bg-gray-700 flex-col w-10 h-6' >
            <Link className=' text-xl' href='/allForums' >All Forums</Link>
           </div>
          
        </div>
        <div className='flex flex-col  p-2 border-2 md:h-full ' >
          
          <div className='flex border-2 flex-col p-2 md:bg-white border-2 border-black ' >
            <h1 className=' text-xl ' >Latest Videos</h1>
            <div className='flex md:flex-row md:w-2/3 md:h-full' >
               <Recent/>  {/* Latest Videos calculated by most recent timestamp/
                smallest difference between today and the day it was created */}
            </div>

          </div>
          <div className='flex border-2 flex-col p-2' >
            <h1 className=' text-xl ' >Popular Videos</h1> {/* Most Popular Videos calculated by number of views */}
            <div className='' > 
               <Popular/>
            </div>

          </div>
          <div className='flex flex-col  p-2 ' >
            <h1 className=' text-xl ' >Upcoming Videos</h1>
            <div className='' >
               <Upcoming/>{/* Upcoming Videos from the team, created in mongodb with a pre-determined release date */}
            </div>

          </div>

        </div>
      </div>
      
      
      <div className='flex  row-start-4 col-start-1 col-span-6 w-screen justify-around  '  >
        <Footer/>
      </div>
      </div>
  )
}

export default Forums