
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function GET(request:NextRequest){
     const mongodb=await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`)
     const currId=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
     //const req=await request.json();
     //const body=req;
     //console.log(body);
     try {
        const data=await mongodb.connect();
        const currData=await data.db('users').collection('gam3rs');
        const result = await currData.findOne({
            _id: currId, // Use the correct ObjectId format
            "gam3rsinfo.users": {$exists:true}
        });
        const currResult=result?.gam3rsinfo;
        /* if (!results || !results.gam3rsinfo) {
            const defaultArr=[]; 
            return NextResponse.json({ data: "No news found" }, { status: 404 });
        }*/

        const newsData = await result?.gam3rsinfo?.notifications 
        const defaultData={
            title:'Welcome to the Gam3r Network',
            description:'The Gam3r Network is your home for unfiltered, game-related content and the place to find your gaming community.',
            image:'The Gam3r Network',
            default:true
           }
           const currRecents = Array.isArray(newsData) && newsData.length > 0 ? newsData : defaultData;
           console.log("current notification data: ",currRecents)
           return NextResponse.json({data:currRecents});
     } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Data not found"},{status:500})
     }

    
}

//export {getNotifications as GET}