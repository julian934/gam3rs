import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
export async function updateUser(request:NextRequest){
    const client= new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
    try{
       
        const currClient=await client.connect();
        const db = currClient.db('users');
        const query = await request.nextUrl.searchParams;
        const id = query?.get('id');
        const currBody = await request.json();
        console.log("Current Body " + currBody)
        if (id) console.log("Forum ID:", id);

        if(request.method=='POST'){
            const myObjectID = new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`) ;
            const userId = new ObjectId(`${currBody.userID}`)
            const newObjectID= new ObjectId().toString();
            
            if (!myObjectID || !userId) {
                return NextResponse.json({ error: 'Invalid ObjectId format' }, { status: 400 });
            }
            /*
             const forumPost = {
                forumID:forumId,
                forumName:currBody.forumName,
                id: newObjectID,
                time: currBody.time,
                message: currBody.message,
                user: currBody.user,
                replies: currBody.replies
            }; 
            console.log(forumPost) 
            */
            const updateResult = await db.collection('gam3rs').updateOne(
                {
                    _id: myObjectID,
                    "gam3rsinfo.users._id": userId
                },
                {
                      $set:{
                        "gam3rsinfo.users.$": currBody  as any
                      }
                }
            );
            return NextResponse.json({
                message: 'Data Sent!',
                data: updateResult
            });
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }finally{
        await client.close();
    }
    
    return NextResponse.json({message: 'Update User Data'})
}

export {updateUser as POST, updateUser as GET}