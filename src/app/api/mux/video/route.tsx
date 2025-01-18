import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import axios from "axios";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
export async function currVideo(request:NextRequest){
    const mongodb=await new MongoClient('mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/')
    const currId=await new ObjectId('6718571a68fdc2dc1117ebf8');
    const currData=await request.nextUrl.searchParams;
    const videoID=await currData.get('id');
    console.log("current ID:", videoID)
    if(videoID){
       const mongoClient=await mongodb.connect();
       const currItems=await mongoClient.db('users').collection('gam3rs').find({
        _id:currId
       
       }).toArray()
        const currItem=await currItems[0].gam3rsinfo.videos;
        const currID=await currItem.filter((vals:any)=>vals.playbackID==videoID);
        console.log('Test Item: ', currID)
       console.log("current data:", currItem);
       const finObj=await currID[0];
       console.log(finObj)
       return NextResponse.json({data:finObj});
    }
    const assetID='';
    const playbackID='';
   
  

    return NextResponse.json({message:'Data not found!',status:500})

}

export {currVideo as GET}