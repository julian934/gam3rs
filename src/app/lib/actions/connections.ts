import axios from "axios"
import { signup } from "../signup/signup"
export async function getTest(){
    let checkData=await fetch('/api/db/mongodb').then((response)=>{
        return response.json()
    }).catch(error=>console.log(error))
    console.log("currData:",checkData)
    return checkData
}

export async function postTest(user:string,pass:string){
    const username=user
    const password=pass
    const data=await signup
    data.username=await username;
    data.password=await password;
    const sendData=await fetch('/api/db/signup',{
      method:"POST",
      body:JSON.stringify({data:data}),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const result=await sendData.json();
     console.log(result);
     return result
}

export async function getNews(){
  const news=await axios.get('/api/')
  
}

export async function getGames(){
  const games=await axios.get('/api/games')

  return games
}

export async function thumbNailPic(thumbnail:any){
  const ID=await thumbnail?.playbackID;
  if(ID){
    const currData= await axios.get(`/api/videos/thumbnail/?id=${ID}`);
    console.log(currData);
    return currData
  }
   return "Data not found."
}

export const popularVideos=async()=>{

};

export const latestVideos=async()=>{

};

export const upcomingVideos=async()=>{

};

