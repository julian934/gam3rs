'use client'
import React,{useState,useRef,useEffect} from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import { getVideoInfo } from '@/app/lib/database/connections';
import { thumbNailPic } from '@/app/lib/actions/connections';
import Notifications from '@/app/components/shared/notifications/notifications';
import FriendsList from '@/app/components/shared/friends/friends';
type Props = {}

const VideoPlayer = ({params}:{params:{slug:string}}) => {
  const [userVideoID, setUserVideoID]=useState('');
  const [userVideoTitle, setUserVideoTitle]=useState('');
  const [viewer_user_id, setViewer_User_ID]=useState('');
  const [playBackID,setPlayBackID]=useState('')
  const [addView,setAddView]=useState<any>();
  const [videoState,setVideoState]=useState<any>();
  const [nail,setNail]=useState<any>();
  const {data}=useQuery({
    queryKey:['videoplayer'],
    queryFn:()=>getVideoInfo(params?.slug)
  })
   data && console.log(data);
   console.log(params);
   console.log(params?.slug)
   const addUserView=(user:any)=>{
    //Add video to videos viewed on user account 
    //Increase views on user viewed videos on Mongodb.
   }
   useEffect(()=>{
    if(params.slug!=undefined){
      setPlayBackID(params.slug)
      //const thumbnail=thumbNailPic(params.slug);
      
    }
    if(data){
      const currData=data
      if(currData){
         setVideoState(data);
      }
    }
   },[data])
   if(playBackID){
    console.log(playBackID)
   }
   if(videoState){
    console.log(videoState)
   }
   if(nail){
    console.log("thumbnail: ", nail)
   }
  return (
    <div className='flex grid max-sm:flex-col grid-cols-6 grid-rows-3 bg-white' >
      
      <div className=' max-sm:z-50 row-start-1 col-start-1 col-span-6' >
        <NavBar/>
      </div>
      <div className=' h-full flex max-sm:z-0 max-sm:col-start-1 max-sm:-mt-44 max-sm:h-24 col-start-1 max-sm:col-span-6 rounded-md row-start-2 md:row-span-2 bg-slate-300 ' >
          <Notifications/>
      </div>
      <div className='flex self-center max-sm:z-50 max-sm:justify-self-center md:self-center grid max-sm:mt-4 h-full w-full col-start-2 max-sm:col-start-1  col-span-4 max-sm:col-span-6 row-start-2   row-span-2  flex-col px-2' >
        <div className='rounded-xl   flex w-full md:h-5/6' >
        <MuxPlayer className='flex rounded-xl w-full '
          playbackId={playBackID}
         metadata={{
            video_id:userVideoID,
            video_title:userVideoTitle,
            viewer_user_id:viewer_user_id
        }}/>
        </div>
      
         <div className='flex flex-col md:space-x-4 md:justify-around md:-mt-16' >
         
          <div className='md:w-1/3 flex max-sm:w-full' >
             <h1 className='flex self-center text-4xl ' >{videoState?.data?.data?.fileName}</h1>
          </div>
            <div className='md:w-1/3 flex py-2' >
              {/* Uploader Info */}
              <h3 className='flex self-center text-xl' >{videoState?.data?.data?.user}</h3>
            </div>
            <div className='md:w-1/3 flex ' >
              {/* Video options */}
              <h4 className='flex  self-center text-lg ' >{videoState?.data?.data?.tags=='user-selected-tags'? '': videoState?.data?.tags}</h4>
            </div>
         </div>

      </div>
       <div className='flex h-full max-sm:row-start-3 max-sm:col-start-1 max-sm:col-span-6 max-sm:mt-48 max-sm:h-24 rounded-md md:col-start-6 md:row-start-2 md:row-span-2 bg-slate-300 ' >
           <FriendsList/>
       </div>
      
        <div className='flex bg-white col-start-1 col-span-6 justify-self-center self-center md:self-end row-start-4 max-sm:mt-20 ' >
        <Footer/>
        </div>
       
      </div>
  )
}

export default VideoPlayer