import { NextRequest,NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function handler(request:NextRequest){
   const username=process.env.MONGO_USERNAME;
const password=process.env.MONGO_PASSWORD;
const cluster=process.env.MONGO_CLUSTER
const mongo_db=process.env.MONGO_DB
const currColl=process.env.MONGO_COLLECTION
   const client= new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`)
   const currClient=await client.connect()
   console.log(currClient)
  // const db= await currClient.db(`${mongo_db?.toString()}`)
  const db=await currClient.db('users')

   console.log(db)
   if(request.method==='POST'){
      console.log(request)
      const body=await request.json();
      if(body){
         console.log(body)
      }
      let data=body?.data
      
      console.log(data)
      //const result=await db.collection(`${currColl?.toString()}`).insertOne(data)
      const result=await db.collection('gam3rs').insertOne({user:data})
      return NextResponse.json({
         message:'Data inserted successfully',
         result:result
      })
   }
   if(request.method==='GET'){
      //const collection=await db?.collection(`${currColl}`)?.find({_id:new ObjectId('66b51e0e7d0b77358018f845')})?.toArray();
      const collection=await db?.collection('gam3rs')?.find({_id:new ObjectId('66b51e0e7d0b77358018f845')})?.toArray();
      return NextResponse.json({data:collection})
   }
   //const collection=await db?.collection(`${currColl}`)?.find({_id:new ObjectId('66b51e0e7d0b77358018f845')})?.toArray()
   const collection=await db?.collection('gam3rs')?.find({_id:new ObjectId('66b51e0e7d0b77358018f845')})?.toArray();
   //insert data for collection.
   //return NextResponse.json({data:'Data received.',mongo:collection})
   return NextResponse.json({data:collection})
}

export {handler as GET,handler as POST}