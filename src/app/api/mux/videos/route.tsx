import { NextRequest,NextResponse } from 'next/server';
import Mux from '@mux/mux-node'
import axios from 'axios';
export async function getVideos(request:NextRequest){

   try{
    const muxData=await axios.get('https://api.mux.com/video/v1/assets',{
        auth:{
            username:`${process.env.MUX_TOKEN_ID}` || '',
            password:`${process.env.MUX_TOKEN_SECRET}` || ''
        }
    })
    console.log("Mux Data" + muxData);
    const videoData=await muxData["data"]
    console.log("Video Data: ", videoData)
        return NextResponse.json({data:videoData})
   }catch(error){
    console.log("Error fetching Mux data:", error)
   }
   
  return NextResponse.json({message:'Test'})
}

export {getVideos as GET}