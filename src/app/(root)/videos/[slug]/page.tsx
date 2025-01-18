'use client'
import React,{useState,useRef,useEffect} from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import { getVideoInfo } from '@/app/lib/database/connections';
import { thumbNailPic } from '@/app/lib/actions/connections';
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
   },[])
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
    <div className='flex grid max-sm:flex-col grid-cols-6 grid-rows-4 bg-white' >
      
      <div className='row-start-1 col-start-1 col-span-6' >
        <NavBar/>
      </div>
      <div className=' flex md:mt-12 grid max-sm:mt-4 h-full w-full grid-cols-6 grid-rows-4 flex-row  bg-gray-300   col-start-2 col-span-4 row-start-2 row-span-2 flex-col px-2 ' >
        {/* Add Design to this page. */}
     
        <div className='flex  -mt-4 py-2 px-2 ml-2 mt-0 row-start-1 col-start-4 col-span-3 bg-white w-3/4 max-sm:w-full h-1/2 skew-x-12 z-50 space-x-2' >
        {/* Upper Right white area & black design */}
        <div className=' bg-gray-300 h-full w-1/4 self-center  -skew-x-24  ' >
  
          </div>
        <div className='  bg-gray-300 h-full w-1/4 self-center -skew-x-24 ' >

          </div>
        <div className=' bg-gray-300 h-full w-1/4  self-center  -skew-x-24 ' >

            </div>
   
      </div>
      
    
     <div className='flex size-4 bg-gray-50 col-start-1 border-2 border-black row-start-1 row-span-2' >


     </div>
     <div className='flex  flex-col  -ml-4 max-sm:-ml-6 w-1/2 max-sm:w-10 col-start-1 col-span-1 row-start-1 row-span-4 bg-gray-50 z-40 ' >
     {/* Left side white area */}
       <div className='flex  -mt-16 ml-0 w-full h-1/2 bg-white rotate-45 ' >
        {/*Left Side Upper Corner */}

       </div>

     </div>
     <div className='flex -left-8 row-start-1 col-start-1 h-full w-1/2  ' >
        {/* left side lower slant */}

     </div>
     <div className='flex rotate-45 max-sm:-rotate-45 row-start-1 row-span-2  col-start-6 z-50 ml-8 max-sm:ml-12 -mt-4 max-sm:mt-6 w-3/4 max-sm:w-full h-24 bg-white ' >
           {/*Extra top right white piece */}
      </div>
     <div className='flex  row-start-4 row-span-2 col-start-1 -ml-8 mt-10 max-sm:mt-8 h-full w-full rotate-45 max-sm:-rotate-45 bg-white  ' >
        {/* Left Side Lower Corner */}
     </div>
     
     <div className='flex  row-start-1 col-start-6 -mt-2 ml-16 max-sm:ml-8 max-sm:mt-0 w-full h-full bg-white rotate-45 max-sm:rotate-0 ' >
          {/* right side upper block */}
         
     </div>
     <div className='flex  col-start-6 ml-20 max-sm:ml-8 mt-12 max-sm:mt-24 row-start-1 row-span-4 bg-white z-50 w-3/5 max-sm:w-4/5 h-5/6 max-sm:h-4/5 max-sm:w-4/5' >
        {/* right side bar */}
     </div>
     <div className='flex  row-start-4 col-start-6 bg-white -rotate-45 max-sm:rotate-45 ml-2 mt-12 w-full h-full' >
         {/* right side lower */}
     </div>
      <div className='flex  border-2 border-black  flex-col rounded-md self-center justify-self-center  col-start-2 col-span-4 max-sm:row-start-1 max-sm:row-span-4 row-start-2 row-span-3 max-sm:w-full' >
        {/*  Space for Data */} 
        <h1 className='flex self-center' >{videoState?.data?.data?.fileName}</h1>
        <MuxPlayer className='rounded-md flex'
          playbackId={playBackID}
         metadata={{
            video_id:userVideoID,
            video_title:userVideoTitle,
            viewer_user_id:viewer_user_id
        }}/>
        
        <h3 className='flex' >{videoState?.data?.data?.user}</h3>
        <h4 className='flex' >{videoState?.data?.data?.tags}</h4>
      </div>
      </div> 
      
      
        <div className='flex col-start-1 col-span-6 justify-self-center self-center row-start-4 max-sm:mt-20 ' >
        <Footer/>
        </div>
       
      </div>
  )
}

export default VideoPlayer