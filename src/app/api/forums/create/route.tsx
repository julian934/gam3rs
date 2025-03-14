import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request:NextRequest){

    const client= new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
    const currClient=await client.connect();
    const db=await currClient.db('users')
    
   console.log(db)
   if(request.method==='POST'){
      /*console.log(request)
      const body=await request.json();
      if(body){
         console.log(body)
      }
      let data=body?.data
      
      console.log(data)*/
      //const result=await db.collection(`${currColl?.toString()}`).insertOne(data)
      //const result=await db.collection('gam3rs').insertOne({user:data});
      //restructure mongod
      /*
      if (!ObjectId.isValid(process?.env?.GAM3RS_OBJECT_ID)) {
         return NextResponse.json({ error: 'Invalid ObjectId format' }, { status: 400 });
     }*/
      console.log(process.env.GAM3RS_OBJECT_ID)
      const myObjectID=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`)
      const result = await db.collection('gam3rs').findOne({
         _id: myObjectID, // Use the correct ObjectId format
         "gam3rsinfo.users": {$exists:true}
     });
     const currResult=result?.gam3rsinfo?.users
     if(result){
      const users = result?.gam3rsinfo?.users;
      const forums = result?.gam3rsinfo?.forums;
      const games = result?.gam3rsinfo?.games;
    
      console.log('Found document: ', result);
      console.log('Users: ', users);
      console.log('Forums: ', forums);
      console.log('Games: ', games);
      console.log('found id: ' + result + "found data: " + currResult)
      if(!forums){
         return NextResponse.json({message:'No users'})
      }
      console.log(request)
      const body=await request.json();
      if(body){
         console.log(body)
      }
      let newData=body
      
      console.log(newData)
      const currName=newData?.name;
      const desc=newData?.desc;
      const tags=newData?.tags;
      const creator=newData?.creator;
      const created=newData?.created;
      const id=new ObjectId()
      console.log(currName)
      const forumData={
         _id:id,
         name:currName,
         description:desc,
         tags:tags,
         creator:creator,
         created:created,
         threads:[],
         
      }
      await forums.push(forumData);
      console.log(forums)
      const updateResult=await db.collection('gam3rs')?.updateOne({_id:myObjectID},
         {$set:{"gam3rsinfo.forums":forums}}
      )
      console.log('Updated forums:', forums);
      console.log('Update result:', updateResult);

      return NextResponse.json({
         message:'Data inserted successfully',
         forums:forums
      })
     }
      
      return NextResponse.json({
         message:'Data inserted successfully',
         
      })
   }
    return NextResponse.json({message:'sent'});

}

//export {sendForum as POST, sendForum as GET}