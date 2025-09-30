'use client'
import React, { useState, useEffect,useRef } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import { useQuery } from '@tanstack/react-query'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/general/page'
import { getVideoInfo } from '@/app/lib/database/connections'
import Notifications from '@/app/components/shared/notifications/notifications'
import FriendsList from '@/app/components/shared/friends/friends'
import MobileNav from '@/app/components/shared/modals/mobileNav'
import Image from 'next/image'
import { likeVideo } from '@/app/lib/database/connections'
import { dislikeVideo } from '@/app/lib/database/connections'
import { commentUpdate } from '@/app/lib/database/connections'
import LikeIcon from '@/app/utils/images/like_icon.png'
import BlackLike from '@/app/utils/images/like_black.png'
import DislikeIcon from '@/app/utils/images/dislike_icon.png'
import BlackDislike from '@/app/utils/images/dislike_black.png'
import axios from 'axios'
//import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
const VideoPlayer = ({ params }: { params: { slug: string } }) => {
  const [playBackID, setPlayBackID] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [liked, setLiked]=useState<boolean>(false);
  const [disliked,setDisliked]=useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [activeComments, setActiveComments]=useState<boolean>(false);
  const {data:session}=useSession();
  const commentRef=useRef<any>();
  const { data } = useQuery({
    queryKey: ['videoplayer', params.slug],
    queryFn: () => getVideoInfo(params?.slug),
     retry: false, // optional: avoid retries if asset not found,
     staleTime:Infinity,
     enabled:!hasFetched,
    // onSuccess: () => setHasFetched(true), // disable after first success
  })

  // videoData from backend
  const videoData = data && 'data' in data ? data.data : null

  useEffect(() => {
    if (params?.slug) {
      setPlayBackID(params?.slug)
    }
    if(data && data!=undefined){
      setHasFetched(true)
    }

  }, [params.slug,data])

  // Poll until asset is ready
  useEffect(() => {
    if (!videoData) return

    const checkReady = async () => {
      if (videoData.status === 'ready') {
        setIsReady(true)
      } else {
        // poll every 2 seconds until ready
        const interval = setInterval(async () => {
          const updated = await getVideoInfo(params.slug)
          const updatedData = 'data' in updated ? updated.data.data : null
          if (updatedData?.status === 'ready') {
            setIsReady(true)
            clearInterval(interval)
          }
        }, 2000)
      }
    }

    checkReady()
  }, [videoData, params.slug])

  const likedVideo=async()=>{
    //let liked=await axios.post('/api/updates/likeUpdate', data);
    setLiked(true)
    setDisliked(false)
      let liked={
      currentUser:session?.user?.name,
      like:1,
      videoData:data
    };

   let finData= await likeVideo(data);
   return finData
  }

  const dislikedVideo=async()=>{
    //let disliked=await axios.post('/api/updates/dislikeUpdate',data);
    setDisliked(true);
    setLiked(false);
    let disliked={
      currentUser:session?.user?.name,
      dislike:1,
      videoData:data
    };
    await dislikeVideo(data);
   
  }
  const newComment=async()=>{
    let comment={
      currentUser:session?.user?.name,
      comment:commentRef?.current?.value,
      videoData:data
    }
    await commentUpdate(comment)
  }
 console.log('Current Video Data: ', params);
 console.log('Testing Data: ', data)
  return (
    <div className="max-sm:flex  max-sm:flex-col  bg-white">
      {/* Nav */}
      <div className="row-start-1 col-start-1 col-span-6">
        <NavBar />
      </div>

      {/* Mobile Nav */}
      <div className="fixed z-[9999] max-sm:visible pointer-events-none max-sm:w-screen max-sm:h-screen">
        <MobileNav />
      </div>

      {/* Notifications */}
      <div className="h-full max-sm:invisible col-start-1 row-start-1 md:relative md:top-6 md:left-72 md:h-2/5 md:w-2/3 z-[30] rounded-md">
        <Notifications />
      </div>

      {/* Player */}
      <div className=" justify-self-center z-[9999] max-sm:z-50 md:w-3/4 px-4 md:top-8 self-start rounded-md md:relative ">
        <div className="rounded-xl w-full md:h-full flex">
          {playBackID  ? (
            <MuxPlayer
              className="rounded-xl w-full"
              playbackId={playBackID}
              metadata={{
                video_id: videoData?._id ?? '',
                video_title: videoData?.fileName ?? '',
                viewer_user_id: 'viewer-id',
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-black text-white">
              Loading video...
            </div>
          )}
          {/* {playBackID && isReady ? (
            <MuxPlayer
              className="rounded-xl w-full"
              playbackId={playBackID}
              metadata={{
                video_id: videoData?._id ?? '',
                video_title: videoData?.fileName ?? '',
                viewer_user_id: 'viewer-id',
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-black text-white">
              Loading video...
            </div>
          )}*/}
        </div>

        {/* Video Info */}
        <div className="flex flex-col relative bg-white max-sm:top-2 md:top-6 md:space-x-4 space-y-4 md:justify-around  z-[9999] ">
          <div className='flex justify-between' >
              <div className="flex  rounded-sm bg-red-500 bg-gradient-to-r from-red-900 via-red-500 to-red-900 shadow-xl  -skew-x-12 ">
                
                 {data?  <h1 className="text-xl text-white  max-sm:text-md w-full px-2">{data?.data[0]?.fileName}</h1> : <h1></h1> }
             </div>
             <div className='' >
                 <h1 className='font-semibold' >Views: {data?.data[0]?.views}</h1>
             </div>
          </div>
          <div className='flex justify-between' >
              <div className="flex  rounded-sm  h-3/4 shadow-xl bg-gray-400    -skew-x-12 ">
            <h3 className="text-xl text-white px-4">{data?.data[0]?.user} </h3>
          </div>
          <div className="md:w-1/4 flex justify-around border-2 border-gray-500  rounded-3xl p-2 ">
            <button onClick={()=>likedVideo()} className="text-lg  font-Gardion">
              {/*videoData?.tags === 'user-selected-tags' ? '' : videoData?.tags*/}
              
              {liked && disliked==false?<Image className='overflow-hidden' src={BlackLike} alt='Like Icon' />:<Image src={LikeIcon} alt='Like Icon' />}
              
            </button>
            <div className='w-full  overflow-hidden h-full' >
              <hr className=' bg-gray-500 rotate-90 ' />
            </div>
             <button onClick={()=>dislikedVideo()} className="text-lg overflow-hidden font-Gardion">
              {/*videoData?.tags === 'user-selected-tags' ? '' : videoData?.tags*/}
              {disliked && liked==false? <Image className=' overflow-hidden' src={BlackDislike} alt='Dislike icon' />: <Image src={DislikeIcon} alt='Dislike icon' />}
             
               
            </button>
          </div>
          </div>
          <div className='p-2 rounded-md bg-gray-300 text-black ' >

            {data?.data?.description ? <div>
              {data?.data?.description}
            </div> :<h1 className='text-white' >Description....</h1>
            }


          </div>
         
        </div>
      
      <div className='flex flex-col relative top-10 justify-self-start self-start w-full  min-w-full space-y-4 ' >
        
         {/* <h1 className='' ></h1> */}
         <div className='self-center  w-3/4 min-h-12  z-50  rounded-lg ' >
          <input className='text-gray-400 text-center w-full rounded-md  p-2  '  placeholder='Comment Here...'  ref={commentRef} />
         </div>
         <button className='' onClick={()=>newComment()} >
         <div className='flex  transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12  w-36' >
              <h1 className='text-white font-Gardion  px-2 text-md ' >Post Comment</h1>
         </div>
            </button>
        </div>
          <div className='relative top-12 w-1/3  p-4 md:min-h-[300px]' >
         <button onClick={()=>setActiveComments(!activeComments)} >
        <div className='flex  transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-full max-sm:w-full' >
              <h1 className='text-white font-Gardion  px-2 text-md' >Comments</h1>
             
        </div>
        </button>
         <div className=' flex self-center relative top-10 max-sm:top-2  left-10 max-sm:left-20 justify-center  w-full  max-sm:min-w-[200px] ' >
          {activeComments && data?.data?.comments ?<div></div>:<h1 className='-skew-x-12 bg-gray-400 rounded-sm px-2 max-sm:w-full text-white' > No Comments Yet. Be the first! </h1>}
             

        </div>
        
      </div>
        <div className='flex flex-col relative overflow-hidden' >
              {activeComments && data?.data?.comments ? data?.data?.comments?.map((vals:any)=><div className='border-2 border-black' >
          <h1 className='' >testing Data</h1>
        </div>):null}

        </div>
      
    
    </div>
      {/* Friends List */}
      {/*  <div className="flex max-sm:invisible relative md:-top-[265vh] md:left-4 justify-self-end self-start h-full md:h-1/5 md:w-1/5 md:relative md:top-0 md:col-start-1 md:row-start-1  bg-slate-300 rounded-md max-sm:row-start-3 max-sm:col-start-1 max-sm:col-span-6">
        <FriendsList />
      </div>*/}
     

      {/* Footer */}
      <div className="flex md:relative bg-white md:min-h-[100px] bg-white col-start-1 col-span-6 justify-self-center self-center md:self-start row-start-4 max-sm:mt-20">
        <Footer />
      </div>
    </div>
  )
}

export default VideoPlayer
