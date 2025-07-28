'use client'
import React,{useState,useRef, SetStateAction, useContext} from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTest } from '@/app/lib/actions/connections'
import { postTest } from '@/app/lib/actions/connections'
import { getSession, useSession } from 'next-auth/react'
import { QueryClient } from '@tanstack/react-query'
import News from '@/app/components/shared/news/news'
//import Games from '@/app/components/shared/games/games'
import GamesRedux from '@/app/components/shared/gamesRedux/gamesRedux'
//import Forums from '@/app/components/shared/forums/forums'
import Forums from '@/app/components/shared/forums/forumsRedux'
import SideBar from '@/app/components/shared/sidebar/sidebar'
import LiveStreams from '@/app/components/shared/livestreams/home/livestreams'
import { Suspense } from 'react'
import Spinner from '@/app/components/ui/spinner/spinner'
import { useEffect } from 'react'
import Footer from '@/app/components/shared/footer/home/footer'
import { connectDB } from '@/app/lib/database/connections'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import Placeholder from '@/app/components/ui/placeholder/placeholder'
import { user } from '@nextui-org/theme'
import { getUser } from '@/app/lib/database/connections'
import FriendsList from '@/app/components/shared/friends/friends'
//import Videos from '@/app/components/shared/videos/home/videos'
import Videos from '@/app/components/shared/videos/home/videosRedux'
//import { InfiniteMovingCardsDemo } from '@/app/components/ui/infinite-cards-demo/demo'
import Notifications from '@/app/components/shared/notifications/notifications'
import MobileNav from '@/app/components/shared/modals/mobileNav'
//Include METADATA
type Props = {}

const HomePage = (props: Props) => {
  const ctx=useContext(StoreStateContext);
  const [userInfo,setUserInfo]=useState('');
  const [userData,setUserData]=useState<any>();
  const {data:session}=useSession();
  const [userName,setUserName]=useState<any>('')
  const [currData,setCurrData]=useState<any>()
  const [dataState,setDataState]=useState<any>()
  console.log(session);
  console.log(session?.user);
  if(session?.user!=undefined){
       const user=session?.user?.name
       localStorage.setItem('username',JSON.stringify(user))
  }
 
  const {data}=useQuery({
    queryKey:['dataTest', session?.user?.name],
    queryFn:async()=>{
      const userName=session?.user?.name
      if(userName){
        return getUser(userName); //Replace with actual fetch function
      }

      throw new Error("User is not logged in or username is undefined.");
    },
    initialData:null,
    enabled: !!session?.user?.name 
  });
  
 //user Type: 
 /*
 username?:string | null | undefined,
    password?: string | null | undefined,
    wishlistItems?:any[] | null | undefined,
    cartItems?: any[] | null | undefined,
    currentSettings?:any[] | null | undefined,
    uploadedVideos?:any[] | null | undefined | {fileName:any, assetId:any, tags:any[], user:any}[],
    uploadedLiveStreams?: any[] | null | undefined | {fileName:any, assetId:any, tags:any[], user:any}[],
    uploadedGames?: any[] | null | undefined | {fileName:any, assetId:any, tags:any[], user:any}[],
    viewedContent?:any[] | null | undefined | {fileName:any, assetId:any, tags:any[], user:any}[]
  } 
 */
  useEffect(()=>{
    if(session?.user){
     let user=session?.user?.name;
     //setUserName(user);
     //console.log(userName);
     //const currUser=getUser(userName);
     //console.log(currUser);
     //const userObj={
      //username:currUser
     //}
     //setCurrData(currUser);
      //ctx.getUser(user);
      //connectDB(userName)
    }
    if(data!=undefined){
     // setCurrData(data)
    }
    if(userData){
      setCurrData(userData)
      console.log("User data fetched:", userData)
    }
    if(data!=undefined){
      
      let currentData=data.data
     
      setDataState(currentData);
      localStorage.setItem("userdata",JSON.stringify(currentData));//Update global state to check if localStorage "get" is empty.
      localStorage.setItem("testdata",dataState);
      ctx.getUser(currentData);
      console.log(ctx.userData);
    }
   
 },[userData,data]);
   //data && console.log(data);
   currData && console.log(currData)
   //console.log(data);
  
   
   if(userData){
    console.log(userData)
   }
   
   if(session?.user){
    console.log(session)
   }
   session && console.log(userName)
   
  if(data!=undefined){
    console.log(data)
    console.log(ctx.userData)
  }
  
  return (
    <main className='flex max-sm:py-4 md:flex-row  md:position grid md:grid-cols-4 md:grid-rows-2 max-sm:flex-col max-sm:space-y-2 bg-white md:z-30  ' >
     
      <NavBar/>
      <div className=' max-sm:visible fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      
 
      <div className='md:invisible' >


      </div>
     
      <div className='flex max-sm:invisible max-sm:z-50  max-sm:-pt-10 md:z-50 md:relative md:top-20 bg-slate-200 max-sm:bg-white max-sm:-mt-10 max-sm:self-center max-sm:w-full max-sm:z-auto max-sm:p-4 md:h-5/6 md:w-2/3 max-sm:h-20 md:mt-40  md:col-start-1 md:row-start-1 md:row-span-2 p-4 rounded-md p-4  ' >
       <div className='relative max-sm:invisible md:top-4 md:-left-2' >
         <Notifications/>
        </div>
      
      </div>

      <div className='flex max-sm:h-2/5 max-sm:pt-0 max-sm:relative max-sm:-top-20 max-sm:left-4 max-sm:self-center lg:justify-self-center max-w-[1000px] max-sm:z-20 md:z-10 max-sm:w-full md:row-start-1  md:h-2/5  md:relative md:top-56 md:col-start-2 md:col-span-2 md:items-end z-40 md:z-50' >
      <News user={session?.user?.name} />
      </div>
      {/* Border-pieces */}
      <div className=' relative md:-top-[204vh] md:left-[21vw] bg-white rotate-45  w-[5vw] h-[10vh] z-[9999]' >

        </div>
        <div className=' relative md:-top-[204vh] md:left-[48vw]  bg-white rotate-45  w-[5vw] h-[10vh] z-[9999]' >

        </div>
        <div className=' relative md:-top-[41vh] md:-left-[27vw]  bg-white rotate-45 w-[5vw] h-[10vh] z-[9999]' >

</div>
<div className=' relative md:-top-[40vh] md:-left-[2.3vw]  bg-white rotate-45  w-[5vw] h-[10vh] z-[9999]' >

</div>
      <div className='relative max-sm:z-40 max-sm:py-4 max-sm:flex max-sm:flex-col max-sm:justify-self-center max-sm:self-center max-sm:w-full max-sm:px-4 md:w-full space-y-8  md:h-full md:-top-72 lg:-top-60  md:row-start-2 md:col-start-2 md:col-span-2 md:self-start md:items-start  max-sm:h-3/4 md:h-96 max-sm:w-full  rounded-md  p-4 md:pt-4 bg-black md:space-y-12 md:z-50 ' >
      
        {/*session?<LiveStreams  /> : <LiveStreams/>*/}
        {session && userData? <GamesRedux  /> : <GamesRedux/>}
        
         {session && userData? <Forums currentUser={userData[0]} /> : <Forums/>}  
        
          {session && userData? <Videos currentUser={userData[0]} />: <Videos/>}
          {/* Bottom Bars */}
        {/* <div className='flex self-center justify-self-start bg-white justify-around w-1/3 h-8 border-2 mt-12 border-black z-50 space-x-6 -skew-x-12 ' >
        
          <div className='flex bg-gray-200 border-2 border-black w-1/4 -skew-x-12 ' >
              
              </div>
              <div className='flex bg-gray-200 border-2 border-black w-1/4 -skew-x-12 ' >
    
              </div>
              <div className='flex bg-gray-200 border-2 border-black w-1/4 -skew-x-12 ' >
    
              </div>
              <div className='flex bg-white border-2 border-black w-1/4 -skew-x-12 ' >
    
               </div>
            </div> */}
          {/* Bottom left corner */}
          {/*<div className='flex bg-white w-16 h-16 rotate-45 border-2 border-black -ml-14 -mt-12' >
          
        </div> */}
        
      </div>
      <div className=' flex max-sm:border-2 max-sm:border-black max-sm:h-full md:relative md:top-20 row-start-1 md:mt-40 row-span-2 md:h-5/6 md:w-2/3 md:px-8 justify-self-end rounded-md self-start md:col-start-4 bg-slate-200 ' >
      <div className='relative md:left-10 md:top-4' >
          <FriendsList  friends={currData?.data?.friends} />
      </div>
       
        </div>
      <div className='row-start-4 row-span-2 md:mt-20 row-span-2 flex justify-center  self-end col-start-1 col-span-4 static  z-90' >
      <Footer/>
      </div>
      
    </main>
  )
}

export default HomePage