import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function GET(request:NextRequest){
    const client=await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`,{
      maxPoolSize:10
    });
    const id=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
    try {
        const currClient= await client.connect();
         const result=await currClient.db('users').collection('gam3rs').findOne({
            _id:id
         })
         if(result){
            const upcoming=await result.gam3rsinfo.upcoming //create object property on gam3rsinfo for upcoming videos. 
            
            return NextResponse.json({data:upcoming})
         }
        NextResponse.json({message:"Data not found!"})
    } catch (error) {
        return NextResponse.json({message:" Internal Server Errror!"},{status:500})
    }

}

//export {getUpcomingVids as GET}