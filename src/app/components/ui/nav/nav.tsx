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
import placeholder from '../../../utils/images/placeholders/placeholder-profile.jpg';
import hamburgerMenu from '../../../utils/mobile/icons8-hamburger-menu-50.png'

type Props = {}
//Use context to give application access to session across all components.
const NavBar = (props: Props) => {
  const [settingsMenu,setSettingsMenu]=useState(false);
  const [userStatus,setUserStatus]=useState<SetStateAction<any>>()
  const [mobileMenu,setHamburgerMenu]=useState(false);
   const {data:session}=useSession();
   const ctx=useContext(StoreStateContext);
  const menu=()=>{
    if(!settingsMenu){
        setSettingsMenu(true)
    }else{
      setSettingsMenu(false)
    }
  }
  const menuChanger=()=>{
    if(mobileMenu==false){
      setHamburgerMenu(true)
    }else{
      setHamburgerMenu(false)
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
    <div className='flex flex-row max-sm:flex-col bg-black h-10vw md:col-start-1 md:row-start-1 md:col-span-4 w-full top-0 self-start max-sm:z-auto' >
      <div className=' inline-block flex flex-col -inset-x-36 inset-y-24  md:mt-12 h-20    w-2/3  bg-white absolute md:z-0' >
           <div className='w-20 flex self-end h-20 bg-white  origin-top-right -rotate-45 bottom-2  ' >
              {/* use CHatgpt to learn how to take element out of order */}
           </div>
          </div>

       <div className='flex flex-row max-sm:px-4 max-sm:justify-start md:self-center md:items-center md:justify-between md:w-1/2 md:pl-4 md:h-1/2 ' >
       <Link className='max-sm:flex max-sm:self-start'   href='/' >
       <h1 className=' text-2xl text-white ' >GAM<span className='text-red-500'>3RS</span></h1>
       </Link>
        
        
        <div className=' flex hidden md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 ' >
          {/*Drop-down menu UI element for the following options under Livestreams */}
          <div className='  flex hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110   ' >
          <Link className=' text-white text-center' href='/videos' > Videos  </Link>
          </div>
         
        
        </div>
        <div className='flex hidden md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:scale-110 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28  ' >
          {/* Drop down menu UI element for the following under Forums */}
          <div className=' flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white text-center '  href='/forums' >Forums</Link>
          </div>
         
        
        </div>
        <div className=' flex hidden md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:scale-110 hover:to-red-900 -skew-x-12 w-20 z-50 ' >
          <div className=' flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/games' >Games</Link>
          </div>
        </div>
        <div className=' flex hidden md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:scale-110 hover:to-red-900 -skew-x-12 w-20 z-50 ' >
          <div className=' flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/store' >Store</Link>
          </div>
        </div>
        <div className='flex hidden md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-28 z-50 ' >
          <div className=' flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/about' >About Us</Link>
          </div>
        </div>
        
       
       </div>
       <div className='flex flex-row max-sm:justify-around md:self-center md:items-center md:justify-center z-50 md:w-3/4 ' >
         <SearchBar/>
         <Image className='text-white' src='' alt='notifications' />
         
         <div className='pt-4 z-40 text-white space-y-2' >
            {/* Profile Picture if signed in, blank if signed out, with drop down menu option. */}
            {session?<> 
              <button className=' z-30 ' onClick={menu}  >
            {userStatus?.image?<Image className='' src={userStatus?.image} alt='User Profile Pic' />:<Image className='bg-slate-200 rounded-3xl md:h-12 md:w-12' src={placeholder} alt='default image' />}
          
          <h2 className='' >Current User: {session?.user?.name}</h2>
          
<button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
<span className="sr-only">Open user menu</span>
<Image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" width={100} height={100} alt="user photo"/>
</button>

</button> 


         
          </>:<>
          <div className='flex z-60  -mt-8  border-2 border-red-300 bg-white rounded-md  max-sm:w-full md:hidden max-sm:block' > 
            <div className='flex max-sm:h-1/2 max-sm:w-1/2 self-center justify-self-center z-60  ' >
               <button className='flex w-4/5 h-full  ' onClick={menuChanger} >
                <Image src={hamburgerMenu} className='  flex md:hidden max-sm:block' alt="mobile menu" />
               </button>
            </div>
           
          </div>
          {mobileMenu ? <div className='flex  flex-col self-end justify-self-end right-0 z-50 absolute  space-y-4 w-1/2  border-2 border-gray-200  ' >
              <div className=' flex max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 ' >
          {/*Drop-down menu UI element for the following options under Livestreams */}
          <div className='  flex  hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110   ' >
          <Link className=' text-white text-center' href='/videos' > Videos  </Link>
          </div>
         
        
        </div>
        <div className='flex  max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:scale-110 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28  ' >
          {/* Drop down menu UI element for the following under Forums */}
          <div className=' flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white text-center '  href='/forums' >Forums</Link>
          </div>
         
        
        </div>
        <div className=' flex  max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:scale-110 hover:to-red-900 -skew-x-12 w-20 z-50 ' >
          <div className=' flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/games' >Games</Link>
          </div>
        </div>
        <div className=' flex  max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:scale-110 hover:to-red-900 -skew-x-12 w-20 z-50 ' >
          <div className=' flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/store' >Store</Link>
          </div>
        </div>
        <div className='flex  max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-28 z-50 ' >
          <div className=' flex hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/about' >About Us</Link>
          </div>
        </div>
              </div>: <>

              </>}
          <Link className='flex hidden md:block justify-center py-2 max-sm:z-50 ' href='/settings' >
          <Image className='bg-slate-200 rounded-3xl  max-sm:h-8 max-sm:w-8 md:h-12 md:w-12 ' src={placeholder} alt='default image' />
          <h2 className='py-2 pl-4 ' >Guest</h2>
          </Link>
          <div className='flex hidden md:block max-sm:space-x-8  md:flex-row max-sm:px-4 md:-ml-20  md:justify-around  w-60 ' >
            <div className=' flex md:justify-self-start md:self-center transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20' >
              <div className='flex hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110  ' >
              <Link className='text-white text-center' href='/testAuth' >Sign In</Link>
              </div>
              
            </div>
           
           <div className='flex hidden md:justify-self-end md:self-start md:-mt-6 md:block  transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20' >
            <div className='flex hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110' >
              <Link className='text-white text-center' href='/signup' >Sign Up</Link>
            </div>
             
           </div>
           
          
          </div>
          
         
          </>}
              
              {/* Remember to add customizable settings and apply site-wide.*/}
         </div>
         
          
         
          {settingsMenu? <Settings/>:<></>}
       

       </div>
       
       
    </div>
  )
}

export default NavBar