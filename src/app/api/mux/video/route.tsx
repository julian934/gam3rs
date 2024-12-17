import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import axios from "axios";
export async function currVideo(request:NextRequest){
    const currData=request.nextUrl.searchParams;
    const videoData=currData.get('id');
    if(videoData){
        console.log(videoData);
        const muxData=axios.get(`https://api.mux.com/video/v1/assets/${videoData}/playback-ids`,{
            auth:{
                username: process.env.MUX_TOKEN_ID || '',
                password:process.env.MUX_TOKEN_SECRET || ''
            }
        })
        console.log(muxData)
        return NextResponse.json({data:muxData})
    }
  

    return NextResponse.json({message:'Message CHeck'})

}

export {currVideo as GET}