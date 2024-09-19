'use client'
import React, { SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchBar from '../searchbar/search'
import Settings from '../settings/settings'
import { useState,useContext } from 'react'
import { useSession } from 'next-auth/react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useEffect } from 'react';
import { signOut } from 'next-auth/react'
import placeholder from '../../../utils/images/placeholders/placeholder-profile.jpg'

type Props = {}
//Use context to give application access to session across all components.
const NavBar = (props: Props) => {
  const [settingsMenu,setSettingsMenu]=useState(false);
  const [userStatus,setUserStatus]=useState<SetStateAction<any>>()
   const {data:session}=useSession();
   const ctx=useContext(StoreStateContext);
  const menu=()=>{
    if(!settingsMenu){
        setSettingsMenu(true)
    }else{
      setSettingsMenu(false)
    }
  }
  useEffect(()=>{
   if(session?.user){
    setUserStatus(ctx.userData)
    console.log(userStatus)
    console.log(ctx.userData)
   }
  },[session])
  
  return (
    <div className='flex flex-row bg-black h-10vw md:col-start-1 md:row-start-1 md:col-span-4 w-full top-0 self-start ' >
       <div className='flex flex-row max-sm:justify-around md:self-center md:items-center md:justify-between md:w-1/2 md:pl-4' >
        <h1 className=' text-2xl text-white ' >GAM<span className='text-red-500'>3RS</span></h1>
        
        <div className='' >
          {/*Drop-down menu UI element for the following options under Livestreams */}
        <Link className=' text-white' href='/videos' > Videos  </Link>
        
        </div>
        <div className='' >
          {/* Drop down menu UI element for the following under Forums */}
          <Link className='text-white'  href='/livestreams' >LiveStreams</Link>
        
        </div>
        <Link className='text-white' href='/' >Games</Link>
        <Link className='text-white' href='/' >Store</Link>
        <Link className='text-white' href='/' >About us</Link>
       </div>
       <div className='flex flex-row max-sm:justify-around md:self-center md:items-center md:justify-center  md:w-1/2 ' >
         <SearchBar/>
         <Image className='' src='' alt='notifications' />
         <div className='pt-4 z-40 text-white space-y-2' >
            {/* Profile Picture if signed in, blank if signed out, with drop down menu option. */}
            {session?<> 
          <Image className='' src={userStatus?.image} alt='User Profile Pic' />
          <h2 className='' >Current User: {userStatus?.name}</h2>
          <button className='text-red-600' onClick={()=>signOut()} > Sign Out</button>
          </>:<>
          <Link href='/testAuth' >
          <Image className='bg-slate-200 rounded-3xl md:h-12 md:w-12 ' src={placeholder} alt='default image' />
          <h2 className='py-2' >Guest</h2>
          <h3 className=' text-red-600'  >Sign In</h3>
          </Link>
          </>}
              
              {/* Remember to add customizable settings and apply site-wide.*/}
         </div>
         <button className=' z-30 ' onClick={menu}  >
          
          
          {settingsMenu? <Settings/>:<></>}
        </button> 

       </div>
        
       
    </div>
  )
}

export default NavBar