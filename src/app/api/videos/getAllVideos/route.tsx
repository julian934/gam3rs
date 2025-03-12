import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function getAllVideos(request:NextRequest){
      const mongodb=await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`)
         const currId=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
    try {
        const data=await mongodb.connect();
        const currData=await data.db('users').collection('gam3rs');
        const results=await currData.findOne({
            _id:currId
        })
        if (!results) {
            return NextResponse.json({ message: "No videos found" }, { status: 404 });
        }
        const vidData = results?.gam3rsinfo?.videos || [];
        return NextResponse.json({data:vidData})
    } catch (error) {
        return NextResponse.json({message:"Data not found"},{status:500})
    }

}

export {getAllVideos as GET}