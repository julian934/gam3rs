import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function getForums(request?:NextRequest){
    const client= new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`);
    const currClient=await client.connect();
    const db=await currClient.db('users')
    console.log(process.env.GAM3RS_OBJECT_ID)
      const myObjectID=await new ObjectId('6718571a68fdc2dc1117ebf8')
      const result = await db.collection('gam3rs').findOne({
         _id: myObjectID, // Use the correct ObjectId format
         "gam3rsinfo.users": {$exists:true}
     });
     const currResult=result?.gam3rsinfo?.forums
     if(result){
        return NextResponse.json({data:currResult})
     }
   return NextResponse.json({message:'No data found'})
}

export {getForums as GET}