
import axios from "axios"
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

export const getGames=async(userData:User)=>{

  const gameData=await fetch('/')

  return gameData;

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

export const filteredPopVideos=()=>{
  
}

export const filteredLatestVideos=()=>{

}

export const filteredUpcomingVideos=()=>{
  
}

