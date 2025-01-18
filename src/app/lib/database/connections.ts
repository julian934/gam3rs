
import axios,{AxiosResponse} from "axios"
import { Session } from "next-auth"
import type { User } from "../context/storeContext"
//export type User={ name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; } | undefined | string | null;
export const connectDB=async(user:string | null | undefined)=>{
    const userName= await user
    console.log('User Name: ', userName)
    //if(user){
     
    //}
    const conn=await axios.post('/api/db/userData',{
      username:userName,
     }).then((vals)=>{
       return vals;
     })
     return conn
 
  //return {info:"No data available."}
}
export const getUser=async(user:string | null | undefined)=>{
  const userName=await user;

  const conn=await axios.get(`/api/getuser?user=${userName}`); 
  console.log(conn.data);
  return conn.data;
}
export const getForums=async()=>{
  const data=await axios.get('/api/forums/getall');
  if(data){
    return data
  }
  return "Data not found"
}
export const getForum=async (id:any)=>{
   const data:any=await axios.get(`/api/forums/forum?id=${id}`);
   if(data){
    return data;
   }
  
}
export const getReplies=async(forum:any, post:any)=>{
  const data:any=await axios.get(`api/forums/reply?forums=${forum}&post=${post}`)
  return data
}
export const getRecentForums=async()=>{
  const data:any=await axios.get('/api/forums/recent')
  
  return data
      
}
export const getPopularForums=async()=>{
  const data:any=await axios.get(`api/forums/popular`)
  return data
}
export const getUpcomingForums=async()=>{

}
export const getAllVideos=async()=>{
  const conn=axios.get('/api/mux/videos')
  if(conn){
    return conn
  }
  return 'Videos not found'
}
export const getVideoInfo=async(id:string)=>{
  const conn=axios.get(`/api/mux/video?id=${id}`)
  if(conn){
    return conn
  }
  return 'Videos not found'
}
export const cloudConnect=async()=>{
    const conn=await axios.get('/api/db/cloudinary');

    return conn
}

export const friendsList=async(userData:User)=>{

}

export const notificationsList=async(userData:User)=>{

}

export const getVideos=async(userData:User)=>{
  const videoData=await fetch('/')

  return videoData
}

export const livestreams=async(userData:User)=>{
  const liveData=await fetch('/')
  return liveData
}

export const upload=async(userData:User)=>{

}
export const analytics=async()=>{

}

export const videoPlayer=async(userData:User)=>{

}

export const getGames=async()=>{

  const gameData=await axios.get('/api/games');
  console.log("game data: ",gameData )
  const currData=gameData
  return gameData;

}
export const forumUpdate=(forum?:object | void | null)=>{
  try {
      if(forum){
          const currData=forum;
          const backendConnect=axios.post('/api/updates/userForumUpdate',{currData});
          return backendConnect;
      }
      return {message:"Invalid Data"};
  } catch (error) {
      console.log(error);
  }
}

export const videoUpdate=(video?:object| void | null)=>{
  try {
    if(video){
      const currData=video;
      const backendConnect=axios.post('/api/updates/userVideoUpdate',{currData});
      return backendConnect;
    }
    return {message:"Invalid Data"};
  } catch (error) {
    console.log(error);
  }

}

export const filteredPopLives=()=>{

}

export const filteredLastestLives=()=>{

}

export const filteredUpcomingLives=()=>{

}

export const filteredPopGames=()=>{

}

export const filteredLatestGames=()=>{
  
}

export const filteredUpcomingGames=()=>{

}

export const filteredPopVideos=async()=>{
  const data=await axios.get('/api/videos/getpopularvideos');

  return data
  
}

export const filteredLatestVideos=async()=>{
  const data=await axios.get('/api/videos/getlatestvideos');

  return data

}

export const filteredUpcomingVideos=async()=>{
  const data=await axios.get('/api/videos/getupcomingvideos');

  return data
  
}

