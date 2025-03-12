import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
export async function replyForum(request:NextRequest){
    const client= new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
    const currClient=await client.connect();
    const db=await currClient.db('users')
    console.log(db);
    const query= request.nextUrl.searchParams;
    const forumId=query?.get('forum');
    const postId=query?.get('post');
    const currBody=await request.json();
    if(forumId){
        console.log("forumID " + forumId);
        console.log("postID " + postId);
    }
    console.log(currBody)
    console.log(currBody?.data)
    if(request.method=='POST'){   
        console.log(process.env.GAM3RS_OBJECT_ID)
      const myObjectID=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
      const forumID=await new ObjectId(`${forumId}`);
      const postID=await new ObjectId(`${postId}`);
      //const messageId = new ObjectId(`${currBody.thread}`);
      const newId=new ObjectId().toString();
      
      const forumReply={
        thread:currBody.thread,
        forum:currBody.forum,
        id:newId,
        time:currBody.time,
        message:currBody.message,
        user:currBody.user,
        replies:currBody.replies
      }
      console.log(forumReply)
     try{
      const updateResult=await db.collection('gam3rs')?.updateOne(
        {
          _id:myObjectID,
          "gam3rsinfo.forums._id":forumID,
          "gam3rsinfo.forums.threads._id":postID
        },
        {
          $push:{"gam3rsinfo.forums.$[forumElem].threads.$[postElem].replies":forumReply} as any
        },{
          arrayFilters:[
            {"forumElem._id":forumID},
            {"postElem._id":postID}
          ]
        }
     );
     console.log("Update Result ",updateResult);
     return NextResponse.json({
      message:'Reply added successfully!',
      data:updateResult
     })
     }catch(error){
      console.error("Error updating document:", error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
     } finally {
      await client.close();
  }
      
    
    }
    return NextResponse.json({message:'Connection successful.'})
}

export {replyForum as GET, replyForum as POST}