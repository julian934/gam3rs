import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { connectToDB } from "@/app/lib/mongodb";

export async function GET(request:NextRequest){
   /* const client= await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`,{
      maxPoolSize:10
    });*/
    const currId=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
   // const currClient=await client.connect();
   // const db=await currClient.db('users');
   const db=await connectToDB();

    try {
       // const data=await mongodb.connect();
        const currData=await db.collection('gam3rs');
        const results=await currData.findOne({
            _id:currId
        })
        if (!results) {
            return NextResponse.json({ message:"No videos found"}, { status:404});
        }
        console.log(results)
        const vidData = results?.gam3rsinfo?.videos || [];
        console.log(vidData)
        const forumData=results?.gam3rsinfo?.forums;
        const backendData=[...vidData,...forumData].flat();
        console.log("Combined Data:",backendData)    
        return NextResponse.json({data:backendData})

    } catch (error) {
        return NextResponse.json({message:"Data not found"},{status:500})
    }

}

//export {getSearchData as GET}