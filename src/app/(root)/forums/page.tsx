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
    <div className='flex flex-col grid grid-cols-4 grid-rows-4 bg-white ' >
      <div className='col-start-1 col-span-4 row-start-1' >
      <NavBar/>
      </div>
     
      <div className='flex flex-col col-start-2 col-span-2 row-start-2 row-span-2 z-50 border-2 border-slate-200 rounded-md ' >
      {userState && <div className='' >
         <h1 className='' >Current User: {userState.currentUser.userName}</h1>
        </div>}
        <div className='flex self-end p-4' >
           <Link href='/allForums'>See All</Link>
        </div>
       <div className='flex w-full h-1/3' >
           <Recent/>
        </div>
       <div className='flex w-full h-1/3' >
          <Popular/>
        </div>
        <div className='flex w-full h-1/3' >
           <Upcoming/>
          </div>
      </div>
      
      <div className='flex col-start-1 col-span-4 row-start-4 self-end justify-self-center h-full' >
      <Footer/>
      </div>
      
      </div>
  )
}

export default Forums