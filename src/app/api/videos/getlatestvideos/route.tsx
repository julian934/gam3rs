import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function getLatestVideos(request:NextRequest){
    const mongodb=await new MongoClient('mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/')
    const currId=await new ObjectId('6718571a68fdc2dc1117ebf8');
  
    try {
        const data=await mongodb.connect();
        const currData=await data.db('users').collection('gam3rs');
        const results=await currData.findOne({
            _id:currId
        })
        if(results){
              const vidData=await results?.gam3rsinfo?.videos;
              const recents=vidData.sort((itemOne:any,itemTwo:any)=>itemOne.time-itemTwo.time);
        console.log("algo: ", recents)
        const currRecents=recents.reverse().slice(0,3);
        return NextResponse.json({data:currRecents});
        }
        
        NextResponse.json({message: "Could not access videos, please wait!"})
    } catch (error) {
        NextResponse.json({message:error},{status:500})
    }

}

export {getLatestVideos as GET}