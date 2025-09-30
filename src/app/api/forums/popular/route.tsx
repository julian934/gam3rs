import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { connectToDB } from "@/app/lib/mongodb";

export async function GET(request:NextRequest){ 
    //Filter based on forum thread count. 
   /* const currClient=new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`,{
      maxPoolSize:10
    });*/
    const objectID=new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
   
    try {
        const client=await connectToDB();
        const db=await client?.collection('gam3rs');
        const result=await db.findOne({
            _id:objectID
        });
        if(result){
            const currPop=result.gam3rsinfo.forums;
            console.log("forums: ",currPop);
            const sortedForums=currPop.sort((firstItem:any,secondItem:any)=>firstItem.threads.length-secondItem.threads.length);
            console.log("Sorted: ", sortedForums);
            const popularForums=sortedForums.reverse().slice(0,3);
            console.log("Popular: ", popularForums);
            return NextResponse.json({data:popularForums})
        }
       
        return NextResponse.json({message:"Unable to fetch data!"})
    } catch (error) {
        return NextResponse.json({message:"Error, server error!"}, {status:500})
    }
}

//export {getPopularForums as GET}