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
  const [currData,setCurrData]=useState<any>();
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
      setCurrData(data?.data[0])
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
 console.log('Testing Data: ', data?.data)
 console.log('Current Data: ', currData);
 console.log('testing title: ', data?.data[0]?.fileName?.split(':')?.filter((val:string)=>val!='filename' && val!=':')?.join(''));
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
      <div className=" justify-self-center z-[9999] max-sm:z-50 md:w-3/4 px-4 md:top-8 self-start rounded-md  md:relative ">
        <div className="rounded-xl w-full md:h-full flex  z-[9999]  ">
            <div className='absolute flex w-10 h-10  rotate-45 left-[4.75rem] bg-white top-8 z-[9999] ' >
                {/* Top Left Corner */}
          </div>
           <div className='absolute flex  w-10 h-10 left-[53.45rem] top-8 bg-white -rotate-45 z-[9999] ' >
                {/* Top Right Corner */}
          </div>
          <div className='absolute flex  w-10 h-10 rotate-45 bg-white left-[4.75rem] top-[28.6rem] z-[9999] ' >
                {/* Bottom Left Corner */}
          </div>
          <div className='absolute flex  w-10 h-10  rotate-45 bg-white left-[53.35rem] top-[28.65rem] z-[9999] ' >
                {/* Bottom Right Corner */}
          </div>
          <div className='absolute flex self-center left-24 justify-self-center bg-black rounded-sm w-4/5 h-2/5 z-0 ' >
             {/* Black Background*/}
          </div>
          <div className='absolute  flex  -skew-x-[0.7rad] h-10 w-96 top-4 left-36  bg-black z-[9999]  ' >
                {/* top design 1*/}
          </div>
           <div className='absolute left-12 flex  skew-x-[0.7rad] h-10 w-96 top-4 left-48  bg-black z-[9999]  ' >
                {/* top design 2*/}
          </div>
          <div  className='absolute  flex  skew-x-[0.7rad] h-20 w-96 top-[27.5rem] left-36  bg-black ' >
            {/* Lower Design 1 */}
          </div>
          <div className='absolute  flex  -skew-x-[0.7rad] h-20 w-96 top-[27.5rem] left-64  bg-black ' >
            {/* Lower Design 2 */}
          </div>
           <div  className='absolute  flex  skew-x-[0.7rad] h-6 w-56 top-[29.5rem] left-[35rem]  bg-black  z-50' >
            {/* Lower Design 3 */}
          </div>
          <div className='absolute  flex  -skew-x-[0.7rad] h-6 w-20 top-[29.5rem] left-[47rem]   bg-black  z-50' >
            {/* Lower Design 4 */}
          </div>
          <div className='absolute w-10 h-10 ' >
               
          </div>
           <div className='absolute w-10 h-10 ' >

          </div>
         
          {playBackID  ? (
            <MuxPlayer
              className="rounded-xl w-full md:scale-75 z-30 "
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
              <div className="flex  rounded-sm bg-red-500 bg-gradient-to-r from-red-900 via-red-500 to-red-900  ml-4 ">
                <div className='absolute w-4 h-6 rotate-45 bg-white  left-40 top-4  ' >

                </div>
                
                 {data?  <h1 className="text-xl text-white  max-sm:text-md w-full px-2">{data?.data[0]?.fileName?.split(':')?.filter((val:string)=>val!='filename' && val!=':')?.join('')}</h1> : <h1></h1> }
             </div>
             <div className='' >
                 <h1 className='font-semibold' >Views: {data?.data[0]?.views}</h1>
             </div>
          </div>
          <div className='flex justify-between' >
              <div className="flex  rounded-sm  h-3/4  bg-gray-400     ">
              <div className='absolute rotate-45 bg-white w-6 h-6 left-64 ml-4 mt-4 ' >


              </div>
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
         
        <div className='flex  transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-1/3 max-sm:w-full' >
              <h1 className='text-white font-Gardion  px-2 text-md' >Comments</h1>
             
        </div>
        
         <div className=' flex flex-col self-center relative -top-2 max-sm:top-2  left-10 max-sm:left-0 justify-center md:min-w-[60vw] max-sm:min-w-[80vw] z-[9999] py-10' >
          {currData && currData?.comments?.length > 0 ?<div className='flex flex-col z-[9999]  w-full h-[250px] overflow-y-auto  ' >
            {currData?.comments?.map((comment:any)=>{
             return( <div className='flex flex-col z-[50] space-y-4  py-4 px-6' key={`${comment?.playbackId}`}  >
                   <div className='flex  transition ease-in-out rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl self-end  to-red-900 -skew-x-12  ' >
                    <h1 className='text-white w-1/2  font-Gardion  px-2 text-md' >{comment && comment?.videoData?.data[0]?.user}</h1>
                    </div>
                     
                  <div className='-skew-x-12 bg-gray-400 min-h-[50px] rounded-sm px-2 max-sm:w-full text-white' >
                    {comment && comment?.comment}
                    </div>
                </div>)

            })}
          </div>:<h1 className='-skew-x-12 bg-gray-400 rounded-sm px-2 max-sm:w-full text-white' > No Comments Yet. Be the first! </h1>}
             

        </div>
        
      </div>
        <div className='flex flex-col relative overflow-hidden' >
              {/*activeComments && data?.data?.comments ? data?.data?.comments?.map((vals:any)=><div className='border-2 border-black' >
          <h1 className='' >testing Data</h1>
        </div>):null*/}

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
