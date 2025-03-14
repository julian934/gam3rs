import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const playbackId = searchParams.get('playbackId');
     console.log(playbackId)
    if (!playbackId) {
        return NextResponse.json({ error: 'Missing playbackId' }, { status: 400 });
    }
     
    //Testing: https://image.mux.com/FCBE00cduOl3Dwkrxd9tqdaz1vxaZNZhd02SDfObQHOXo/thumbnail.png
    try {
        //const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png?width=640&height=360&fit_mode=preserve`;
        const thumbnailUrl=`https://image.mux.com/${playbackId}/thumbnail.png`
        return NextResponse.json({ thumbnailUrl });
    } catch (error) {
        console.error('Error generating thumbnail:', error);
        return NextResponse.json({ error: 'Error generating thumbnail' }, { status: 500 });
    }
}

//export {getData as GET}

/*import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";
  export async function getThumbNail(request:NextRequest){
    const id=await request.nextUrl.searchParams;
    const currID=await id.get('id');
    console.log("current id: ", currID)
    if(currID!=undefined){
        console.log(currID);
        const thumbNailData=await axios.get(`https://image.mux.com/${currID}/thumbnail.png?width=400&height=400&fit_mode=smartcrop&time=8`, {
            auth:{
                username:`${process.env.MUX_TOKEN_ID}`,
                password:`${process.env.MUX_TOKEN_SECRET}`
            }
        });
        if(thumbNailData){
            console.log(thumbNailData);
            
            return NextResponse.json({data:thumbNailData})
        }
       return NextResponse.json({data:" Unable to connect"})
    }
    
    return NextResponse.json({data:'Data not found'})
}

export {getThumbNail as GET}
*/