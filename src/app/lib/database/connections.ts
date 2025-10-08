
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
/*export const getAllVideos=async()=>{
  const conn=axios.get('/api/mux/videos')
  if(conn){
    return conn
  }
  return 'Videos not found'
}*/
export const getVideoInfo=async(id:string)=>{
  try {
    //const response = await axios.get(`/api/mux/video?id=${id}`)
     const response = await axios.get(`/api/videos/getVideo?id=${id}`)
    return response.data  // Always returns an object
  } catch (err) {
    return { message: 'Videos not found', status: 404 }
  }
}
export const cloudConnect=async()=>{
    const conn=await axios.get('/api/db/cloudinary');

    return conn
}

export const friendsList=async(userData:User)=>{

}

export const notificationsList=async(userData:User)=>{
  const notificationData=await axios.get('/api/games');
  console.log("Notification data: ", notificationData )
  const currData=notificationData
  return currData;

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

export const videoUpdate=(video?:object| void | null,user?:string | null | undefined)=>{
  try {
    if(video){
      const currData=video;
      const backendConnect=axios.post(`/api/updates/userVideoUpdate?username=${user}`,{currData});
      return backendConnect;
    }
    return {message:"Invalid Data"};
  } catch (error) {
    console.log(error);
  }

}


export const notificationUpdate=(video?:object| void | null)=>{
  try {
    if(video){
      const currData=video;
      const backendConnect=axios.post('/api/updates/notificationsUpdate',{currData});
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
export const getAllVideos=async()=>{
  const data=await axios.get(`/api/videos/getAllVideos`);

  return data

}

export const getNews=async()=>{

  const data=await axios.get('/api/news');
  /*const defaultData:any={
    title:'Welcome to the Gam3r Network',
    description:'The Gam3r Network is your home for unfiltered, game-related content and the place to find your gaming community.',
    image:'The Gam3r Network'
   }
   if(!data){
    console.log(defaultData)
    return defaultData
   }
    */
  
  console.log("current news data: ", data)
  
  return data?.data
}

export const getNotifications=async()=>{
  const data=await axios.get('/api/getnotifications');
  console.log("Notifications: ", data?.data?.data);
  //default data for infinite cards: name, quote, title
  
 // const finalData=await data?.data?.data?.slice(0,2);
  
  return {data:data?.data?.data?.reverse(),flag:'notifications'}
}

export const likeVideo=async(data:any)=>{
   let liked=await axios.post('/api/updates/likeUpdate', data);
   return liked;
}

export const dislikeVideo=async(data:any)=>{
   let disLiked=await axios.post('/api/updates/dislikeUpdate', data);

   return disLiked;
}

export const commentUpdate=async(data:any)=>{
   let commentUpdate=await axios.post('/api/updates/commentUpdate', data);
    return commentUpdate;
}

export const getSearchData=async()=>{
  const getBackEndData=await axios.get('/api/search');
  const gameData=await axios.get('/api/games');
  const currBackendData=getBackEndData?.data?.data
  const currGameData=gameData?.data?.data
  const allData=[currBackendData,currGameData].flat();
   return allData
}

export const getAdmin=async(currAdmin:any)=>{
  const user=currAdmin.username;
  const pass=currAdmin.password
  const getCurrAdmin=await axios.get(`/api/auth/findadmin/?username=${user}&password=${pass}`);
  const currAdd= await getCurrAdmin;
  console.log('Current Admin: ', currAdd);


  return currAdd.data
}