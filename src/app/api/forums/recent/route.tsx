import { NextRequest, NextResponse } from "next/server";
import { MongoClient,ObjectId } from "mongodb";
import { connectToDB } from "@/app/lib/mongodb";


export async function GET(request:NextRequest){
    const client=new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`,{
      maxPoolSize:10
    });
    const objectID=new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
   try {
   // const recentClient=await client.connect();
   const recentClient=await connectToDB()
   // const currClient=await recentClient.db('users').collection('gam3rs');
   const currClient=await recentClient?.collection('gam3rs');
    console.log(currClient)
    const results=await currClient.findOne({
        _id:objectID
    });
    console.log("results: ", results)
      if(results){
        const recents=results.gam3rsinfo.forums.sort((itemOne:any,itemTwo:any)=>itemOne.created-itemTwo.created);
        console.log("algo: ", recents)
        const currRecents=recents.reverse().slice(0,3);
        console.log("final results: ", currRecents)
        return NextResponse.json({data:currRecents});
      }
    return NextResponse.json({message:"Data not found!"});
   } catch (error) {
    return NextResponse.json({message:"Error, server-side error:"},{status:500});
   }
}

//export {getRecentForums as GET}