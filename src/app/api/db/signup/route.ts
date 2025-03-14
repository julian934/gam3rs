import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request:NextRequest){
   const username=process.env.MONGO_USERNAME;
const password=process.env.MONGO_PASSWORD;
const cluster=process.env.MONGO_CLUSTER
const mongo_db=process.env.MONGO_DB
const currColl=process.env.MONGO_COLLECTION
   const client= new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`)
   const currClient=await client.connect()
   console.log(currClient)
  // const db= await currClient.db(`${mongo_db?.toString()}`)
  const db=await currClient.db('users')
    
   console.log(db)
   if(request.method==='POST'){
      console.log(request)
      const body=await request.nextUrl.searchParams;
      if(body){
         console.log(body)
      }
      let first=body?.get('username');
      let last=body?.get('password');
      console.log(first);
      console.log(last);
      //console.log(data);
      const defaultSettings={
         thumbnails:['https://res.cloudinary.com/dmtt3jfwg/image/upload/v1740513562/nb6vdozttv7xjrmsrujk.jpg'],
         theme:'Dark',
         
      }
      const userData={
         username:first,
         password:last,
         wishlistItems:[],
         cartItems:[],
         currentSettings:defaultSettings,
         videos:[],
         livestreams:[],
         forumPosts:[],
         friends:[]
      }
      //const result=await db.collection(`${currColl?.toString()}`).insertOne(data)
      //const result=await db.collection('gam3rs').insertOne({user:userData})
      const myObjectID=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`)
    const result = await db.collection('gam3rs').findOne({
       _id: myObjectID, // Use the correct ObjectId format
       "gam3rsinfo.users": {$exists:true}
   });
   const updateResult = await db.collection('gam3rs').updateOne(
      {
          _id: myObjectID
         
      },
      {
          $push: { "gam3rsinfo.users": userData } as any
      }
  );
      return NextResponse.json({
         message:'Data inserted successfully',
         result:updateResult
      })
   }
  
   //const collection=await db?.collection(`${currColl}`)?.find({_id:new ObjectId('66b51e0e7d0b77358018f845')})?.toArray()
   const collection=await db?.collection('gam3rs')?.insertOne({user:'john117'});
   //insert data for collection.
   //return NextResponse.json({data:'Data received.',mongo:collection})
   return NextResponse.json({data:collection})
}

//export {POST as POST,handler as GET}