import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/app/lib/mongodb";

export async function GET(request:NextRequest){
  /*  const mongodb=await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`,{
      maxPoolSize:10
    })*/
    const currId=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
    const req=request.nextUrl.searchParams;
    const id=req.get('id');
    console.log('Current ID: ', id)
    try {
       // const data=await mongodb.connect();
       const data=await connectToDB();
       // const currData=await data.db('users').collection('gam3rs');
       const currData=await data?.collection('gam3rs')
        const results=await currData.findOne({
            _id:currId
        })
        if (!results) {
            return NextResponse.json({ message: "No videos found" }, { status: 404 });
        }
        const vidData = results?.gam3rsinfo?.videos || [];
      //  const recents = vidData.sort((itemOne: any, itemTwo: any) => itemTwo.time - itemOne.time);
        //const currRecents = recents?.reverse()?.slice(0, 3); // Avoid unnecessary reverse
        const currVid=vidData.filter((vids:any)=>vids.playbackId==id);
        console.log('Testing recents: ', currVid)
        return NextResponse.json({ data: currVid });
        
        
   
    } catch (error) {
        NextResponse.json({message:error},{status:500})
    }

}

//export {getLatestVideos as GET}