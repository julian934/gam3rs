'use client'
import React,{useState,useRef, SetStateAction, useContext} from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import { useQuery } from '@tanstack/react-query'
import { getTest } from '@/app/lib/actions/connections'
import { postTest } from '@/app/lib/actions/connections'
import { getSession, useSession } from 'next-auth/react'
import News from '@/app/components/shared/news/news'
import Games from '@/app/components/shared/games/games'
import Forums from '@/app/components/shared/forums/forums'
import SideBar from '@/app/components/shared/sidebar/sidebar'
import LiveStreams from '@/app/components/shared/livestreams/home/livestreams'
import { Suspense } from 'react'
import Spinner from '@/app/components/ui/spinner/spinner'
import { useEffect } from 'react'
import Footer from '@/app/components/shared/footer/footer'
import { connectDB } from '@/app/lib/database/connections'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import Placeholder from '@/app/components/ui/placeholder/placeholder'
import { user } from '@nextui-org/theme'
import FriendsList from '@/app/components/shared/friends/friends'
import Videos from '@/app/components/shared/videos/home/videos'


//Include METADATA
type Props = {}

const HomePage = (props: Props) => {
  const ctx=useContext(StoreStateContext);
  const [userInfo,setUserInfo]=useState('');
  const [userData,setUserData]=useState([]);
  const {data:session}=useSession();
  
  console.log(session);
  console.log(session?.user);
  const {data}=useQuery({
    queryKey:['dataTest'],
    queryFn:async()=>{
      const sess= await session?.user?.name
      console.log(sess)
      return connectDB(sess)
    }
  });
   data && console.log(data);
   
   console.log(data);
   useEffect(()=>{
      if(session?.user){
       let user=data?.data?.user

        //ctx.getUser(user)
        //connectDB(userName)
      }
      if(data?.data){
        let user=data?.data?.data;
        setUserData(user);
        console.log(userData);
        ctx.getUser(user);
        console.log(ctx.userData)
      }
   },[session,data]);
   if(session?.user){
    console.log(session)
   }
  data && console.log(data?.data)
  data && console.log(userData)
  data && console.log(ctx.userData)
  return (
    <main className='flex md:flex-row md:position md:grid md:grid-cols-4 md:grid-rows-2 max-sm:flex-col  bg-white  ' >
      <NavBar/>
      <div className='flex max-sm:self-center   max-sm:w-5/6 max-sm:h-20 md:mt-40 md:w-1/3 md:col-start-1 md:row-start-1 md:row-span-2 p-4 bg-gray-200 rounded-md p-4  ' >
       <Suspense fallback={<div className='' ><Spinner/></div>} >
       {session ?<SideBar currentUser={userData[0]}   /> :  <SideBar/>}
        
       </Suspense>
      </div>
      <div className='flex md:row-start-1 md:relative md:-top-48 md:col-start-2 md:col-span-2 md:items-end ' >
      <News user={session?.user?.name} />
      </div>
      <div className='relative  md:w-full   md:h-full md:-top-20  md:row-start-2 md:col-start-2 md:col-span-2 md:self-start md:items-start  max-sm:h-3/4 md:h-96 max-sm:w-3/4 rounded-md  p-4 bg-gray-200 md:space-y-2  ' >
        {session?<LiveStreams  /> : <LiveStreams/>}
        {session? <Games  /> : <Games/>}
        {session? <Forums currentUser={userData[0]} /> : <Forums/>}
        {session? <Videos currentUser={userData[0]} />: <Videos/>}
      </div>
      <div className=' flex row-start-1 md:mt-40 row-span-2 md:h-5/6 md:w-1/3 justify-self-end rounded-md self-start md:col-start-4 bg-slate-200 ' >
        <FriendsList/>
        </div>
      <div className='row-start-3 row-span-2 md:position row-span-2 flex justify-center  self-end col-start-1 col-span-4   z-90' >
      <Footer/>
      </div>
      
    </main>
  )
}

export default HomePage