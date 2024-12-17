'use client'
import React,{useState,useRef,useEffect} from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import { getVideo } from '@/app/lib/database/connections';
type Props = {}

const VideoPlayer = ({params}:{params:{slug:string}}) => {
  const [userVideoID, setUserVideoID]=useState('');
  const [userVideoTitle, setUserVideoTitle]=useState('');
  const [viewer_user_id, setViewer_User_ID]=useState('');
  const [playBackID,setPlayBackID]=useState('')
  const [addView,setAddView]=useState<any>();
  const {data}=useQuery({
    queryKey:['videoplayer'],
    queryFn:()=>getVideo(params?.slug)
  })
   data && console.log(data);
   console.log(params);
   console.log(params?.slug)
   const addUserView=(user:any)=>{
    //Add video to videos viewed on user account 
    //Increase views on user viewed videos on Mongodb.
   }
   
  return (
    <div className='flex grid grid-cols-6 grid-rows-4 ' >
      VideoPlayer
      <div className='row-start-1 col-start-1 col-span-6' >
        <NavBar/>
      </div>
      <div className='col-start-2 col-span-4 row-start-2 ' >
      <MuxPlayer
          playbackId={playBackID}
         metadata={{
            video_id:userVideoID,
            video_title:userVideoTitle,
            viewer_user_id:viewer_user_id
        }}/>
      </div>
      
        <div className='flex col-start-1 col-span-4 row-start-4' >
        <Footer/>
        </div>
       
      </div>
  )
}

export default VideoPlayer