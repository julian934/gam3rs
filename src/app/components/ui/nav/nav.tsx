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
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/app/lib/database/connections'
type Props = {}
//Use context to give application access to session across all components.
const NavBar = (props: Props) => {
  const [settingsMenu,setSettingsMenu]=useState(false);
  const [userStatus,setUserStatus]=useState<SetStateAction<any>>()
  const [mobileMenu,setHamburgerMenu]=useState(false);
  const [userThumbnail,setUserThumbnail]=useState<any>();
   const {data:session}=useSession();
   const ctx=useContext(StoreStateContext);
   const [dataState, setDataState] = useState<any>(null);

   // 🟢 Fetch user data using React Query
   const { data } = useQuery({
     queryKey: ["dataTest", session?.user?.name], // Ensures refetching when username changes
     queryFn: async () => {
       if (session?.user?.name) {
         return getUser(session.user.name);
       }
       throw new Error("User is not logged in or username is undefined.");
     },
     initialData: null,
     enabled: !!session?.user?.name, // Prevents query if user is not logged in
   });
   
   useEffect(() => {
    if (!data) return; // Prevent unnecessary execution when data is undefined

    const currentData = data?.data;
    if (JSON.stringify(currentData) !== JSON.stringify(dataState)) {
      setDataState(currentData);
      localStorage.setItem("userdata", JSON.stringify(currentData));

      // Update context only if data changes
      if (JSON.stringify(ctx.userData) !== JSON.stringify(currentData)) {
        ctx.getUser(currentData);
      }
    }
  }, [data]); // Only runs when `data` changes

  // 🟢 Debugging Logs (Remove Later)
  useEffect(() => {
    console.log("Session:", session);
    console.log("User Data:", dataState);
    console.log("Context Data:", ctx.userData);
    console.log("mobileMenu changed:", mobileMenu);
  }, [session, dataState, ctx.userData]);
  const menu=()=>{
    if(!settingsMenu){
        setSettingsMenu(true)
    }else{
      setSettingsMenu(false)
    }
  }
  /*
  const menuChanger=()=>{
    if(mobileMenu==false){
      setHamburgerMenu(true)
    }else{
      setHamburgerMenu(false)
    }
  }*/
    const [, forceRender] = useState(0);
  const menuChanger = () => {
    setHamburgerMenu((prev) => !prev);
    forceRender((n) => n + 1);
    console.log("Mobile Menu State:", mobileMenu); // Debugging
  };
  
 


  
  return (
    <div className='flex flex-row max-sm:flex-col bg-black h-10vw md:col-start-1 md:row-start-1 md:col-span-4 w-full top-0 self-start z-50 max-sm:z-auto' >
      <div className=' inline-block  max-sm:z-0 max-sm:mt-28 max-sm:ml-12 flex flex-col -inset-x-36 inset-y-24  md:mt-12 h-20    w-2/3  bg-white absolute md:z-0' >
           <div className='w-20 flex self-end h-20 bg-white  origin-top-right -rotate-45 bottom-2  ' >
              {/* use CHatgpt to learn how to take element out of order */}
           </div>
          </div>

       <div className='flex flex-row max-sm:px-4 max-sm:justify-start md:self-center md:items-center md:justify-between md:w-2/3 md:pl-4 md:h-1/2  ' >
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
       <div className='flex max-sm:px-2 flex-row max-sm:justify-around md:self-center md:items-center md:justify-center md:z-50 md:w-3/4 ' >
         <SearchBar/>
        
         {/*  <Image className='text-white' src='' alt='notifications' /> */}
         <div className='pt-4 z-40 max-sm:z-50 text-white space-y-2' >
            {/* Profile Picture if signed in, blank if signed out, with drop down menu option. */}
            {session?  <> 
              <button className=' z-30  ' onClick={menu}  >
            {dataState?.settings?<Image className='rounded-3xl md:h-12 md:w-12 md:self-center max-sm:ml-10 md:justify-self-center ' width={100} height={100} src={`${dataState?.settings?.thumbnails[0]}`} alt='User Profile Pic' />:<Image width={100} height={100} className='bg-slate-200 rounded-3xl md:h-12 md:w-12' src={placeholder} alt='default image' />}
          
          <h2 className='' >Current User: {session?.user?.name}</h2>
          


</button> 
        <div className='flex z-50 transition duration-500 ease-in-out hover:bg-yellow-600 active:scale-50 transform active:-translate-y-1  max-sm:ml-14 py-2 -mt-8  max-sm:-mt-12 bg-white rounded-xl max-sm:h-14  max-sm:w-20 md:hidden max-sm:z-50 max-sm:block' > 
            <div className='flex  max-sm:h-full max-sm:w-full self-center max-sm:self-center justify-self-center z-50  ' >
               <button className='flex w-4/5 h-full max-sm:self-end max-sm:pl-4  max-sm:z-50  ' onClick={menuChanger} >
                <Image src={hamburgerMenu} className='  flex md:hidden max-sm:block' alt="mobile menu" />
               </button>
            </div>
           
          </div>
          {mobileMenu && <div className='flex md:hidden md:-z-50 max-sm:z-100 rounded-md transition duration-500 ease-in-out bg-white flex-col self-end justify-self-end right-0 z-50 absolute  space-y-4 w-1/2  border-2 border-gray-200 ' >
              <div className=' max-sm:mr-4 flex max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 ' >
          {/*Drop-down menu UI element for the following options under Livestreams */}
          <div className='  flex  z-50 hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110   ' >
          <Link className=' text-white text-center' href='/videos' > Videos  </Link>
          </div>
         
        
        </div>
        <div className='flex max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:scale-110 hover:via-red-300 hover:to-red-900 -skew-x-12 w-24  ' >
          {/* Drop down menu UI element for the following under Forums */}
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white text-center '  href='/forums' >Forums</Link>
          </div>
         
        
        </div>
        <div className=' flex max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:scale-110 hover:to-red-900 -skew-x-12 w-20 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/games' >Games</Link>
          </div>
        </div>
        <div className=' flex max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:scale-110 hover:to-red-900 -skew-x-12 w-20 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/store' >Store</Link>
          </div>
        </div>
        <div className='flex max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-28 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/about' >About Us</Link>
          </div>
        </div>
        <div className='flex max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-24 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/signin' >Sign In</Link>
          </div>
        </div>
        <div className='flex max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-24 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/signup' >Sign Up</Link>
          </div>
        </div>
              </div>}
         
          </>:<>
          <div className='flex z-50 transition duration-500 active:scale-50  ease-in-out hover:scale-110 transform active:-translate-y-1  active:bg-yellow-600 -mt-8 max-sm:-mt-10 bg-white rounded-md max-sm:h-10  max-sm:w-14 md:hidden max-sm:block' > 
            <div className='flex transition duration-500 ease-in-out hover:scale-150 max-sm:h-full max-sm:w-full self-center max-sm:self-center justify-self-center z-60  ' >
               <button className='flex w-4/5 h-full max-sm:self-end max-sm:pl-2    ' onClick={menuChanger} >
                <Image src={hamburgerMenu} className='  flex md:hidden max-sm:block' alt="mobile menu" />
               </button>
            </div>
           
          </div>
          {mobileMenu && <div className='flex md:hidden md:-z-50 max-sm:z-100 rounded-md transition duration-500 ease-in-out bg-white flex-col self-end justify-self-end right-0 z-50 absolute  space-y-4 w-1/2  border-2 border-gray-200 ' >
              <div className=' flex  max-sm:mr-4 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 ' >
          {/*Drop-down menu UI element for the following options under Livestreams */}
          <div className='  flex  z-50 hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110   ' >
          <Link className=' text-white text-center' href='/videos' > Videos  </Link>
          </div>
         
        
        </div>
        <div className='flex  max-sm:mr-4  z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:scale-110 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28  ' >
          {/* Drop down menu UI element for the following under Forums */}
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white text-center '  href='/forums' >Forums</Link>
          </div>
         
        
        </div>
        <div className=' flex  max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:scale-110 hover:to-red-900 -skew-x-12 w-20 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/games' >Games</Link>
          </div>
        </div>
        <div className=' flex  max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:scale-110 hover:to-red-900 -skew-x-12 w-20 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/store' >Store</Link>
          </div>
        </div>
        <div className='flex  max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-28 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/about' >About Us</Link>
          </div>
        </div>
        <div className='flex  max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-28 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/signin' >Sign In</Link>
          </div>
        </div>
        <div className='flex  max-sm:mr-4 z-50 max-sm:self-end md:block transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 hover:scale-110 -skew-x-12 w-28 z-50 ' >
          <div className=' flex max-sm:z-50 hover:border hover:border-x-2 px-4 border-double hover:border-slate-300 w-full hover:scale-110 ' >
          <Link className='text-white' href='/signupRedux' >Sign Up</Link>
          </div>
        </div>
              </div>}
          <Link className='flex hidden md:block justify-center py-2 max-sm:z-50 ' href='/settings' >
          <Image className='bg-slate-200  z-50 rounded-3xl md:ml-4  max-sm:h-8 max-sm:w-8 md:h-12 md:w-12 justify-center' src={placeholder} alt='default image' />
          <h2 className='py-2 pl-4 justify-center ' >Guest</h2>
          </Link>
          <div className='flex hidden md:block max-sm:space-x-8  md:flex-row max-sm:px-4 md:-ml-20  md:justify-around  w-60  ' >
            <div className=' flex md:justify-self-start md:self-center transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20' >
              <div className='flex hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110  ' >
              <Link className='text-white text-center' href='/signin' >Sign In</Link>
              </div>
              
            </div>
           
           <div className='flex hidden md:justify-self-end md:self-start md:-mt-6 md:block  transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20' >
            <div className='flex hover:border hover:border-x-2 px-2 border-double hover:border-slate-300 w-full hover:scale-110' >
              <Link className='text-white text-center' href='/signupRedux' >Sign Up</Link>
            </div>
             
           </div>
           
          
          </div>
          
         
          </>}
              
              {/* Remember to add customizable settings and apply site-wide.*/}
         </div>
         
          
         
          {settingsMenu? <div className='relative max-sm:top-20 max-sm:right-48 md:right-48 md:top-28   z-50 ' >
            <Settings/>
            </div> :<></>}
       

       </div>
       
       
    </div>
  )
}

export default NavBar