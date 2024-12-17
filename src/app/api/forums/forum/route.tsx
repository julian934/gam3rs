import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest } from "next";

export async function getForum(request:NextRequest){
    const client= new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`);
    const currClient=await client.connect();
    const db=await currClient.db('users')
    const query= request.nextUrl.searchParams;
    const id=query?.get('id');
    if(id){
        console.log(id);
    }
    const myObjectID=await new ObjectId('6718571a68fdc2dc1117ebf8')
    const result = await db.collection('gam3rs').findOne({
       _id: myObjectID, // Use the correct ObjectId format
       "gam3rsinfo.users": {$exists:true}
   });
   const currResult=result?.gam3rsinfo;
   if(result){
    const forum=currResult.forums.filter((vals:any)=>vals._id==id);
    console.log(forum?.name)
    //Connection successful, update with new threads.
    return NextResponse.json({data:forum});
   }
   
    return NextResponse.json({message:'data'})
}

export {getForum as GET, getForum as POST}