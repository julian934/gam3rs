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
  
}

export async function getGames(){
  const games=await axios.get('/api/games')

  return games
}