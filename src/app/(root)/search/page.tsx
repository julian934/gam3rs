'use client'
import React,{useEffect,useState,useRef} from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/home/footer'
import Notifications from '@/app/components/shared/notifications/notifications'
import FriendsList from '@/app/components/shared/friends/friends'
import Link from 'next/link'

type Props = {}

const Search = (props: Props) => {
  const [currSearchData,setSearchData]=useState<any>([]);
  useEffect(()=>{
    const returnedData=localStorage.getItem("searchData");
    const searchData=returnedData?JSON.parse(returnedData):null
    if(searchData!=null){
      console.log(searchData)
      setSearchData(searchData)
    }
  },[])
  if(currSearchData){
    console.log(currSearchData)
  }
  return (
    <div className='flex max-sm:py-4 md:flex-row  md:position md:grid md:grid-cols-4 md:grid-rows-2 max-sm:flex-col max-sm:space-y-8 bg-white md:z-30  ' >
          <NavBar/>
          <div className='flex max-sm:z-50  max-sm:-pt-10 md:z-50 bg-slate-200 max-sm:bg-white max-sm:-mt-10 max-sm:self-end max-sm:w-full max-sm:z-auto max-sm:p-4 md:h-5/6 md:w-2/3 max-sm:h-20 md:mt-40  md:col-start-1 md:row-start-1 md:row-span-2 p-4 rounded-md p-4  ' >
       
       <Notifications/>
      </div>
      
      <div className='flex flex-col  rounded-md px-4 border-2 border-black overflow-y-auto md:self-start md:z-50 md:-mt-36 space-y-2 h-[300px] md:h-[500px]  md:w-[800px] md:-pt-20' >
        <h1 className='flex max-sm:w-36 max-sm:text-xl md:mt-4 h-8 max-sm:ml-4 px-8 justify-center text-3xl w-full flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl md:w-1/2 hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-36 space-y-4 text-white ' >Search Results:</h1>
      {currSearchData && currSearchData.map((vals:any)=><div className='flex self-center' key={vals?.playbackID} >
                {vals.id && <Link href={vals.game_url} > {vals.title} </Link>}
                {vals.playbackID && <Link href={`/videos/${vals.playbackID}`} >{vals.fileName}</Link> }
            </div>)}

      </div>
      <div className=' flex max-sm:border-2 max-sm:border-black max-sm:h-full row-start-1 md:mt-40 row-span-2 md:h-5/6 md:w-2/3 md:px-8 justify-self-end rounded-md self-start md:col-start-4 bg-slate-200 ' >
        
        {/* <FriendsList  friends={currData?.data?.friends} />*/}
        </div>
        <div className='row-start-4 row-span-2 md:mt-56 row-span-2 flex justify-center  self-center md:self-end col-start-1 col-span-4 static  z-90' >
      <Footer/>
      </div>
      </div>
  )
}

export default Search