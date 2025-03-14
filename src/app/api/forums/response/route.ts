import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    const client = new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
    try {
        const currClient = await client.connect();
        const db = currClient.db('users');
        const query = request.nextUrl.searchParams;
        const id = query?.get('id');
        const currBody = await request.json();
        console.log(currBody)
        if (id) console.log("Forum ID:", id);

        if (request.method === 'POST') {
            const myObjectID = new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`) ;
            const forumId = new ObjectId(`${currBody.forumID}`)
            const newObjectID= new ObjectId().toString();

            if (!myObjectID || !forumId) {
                return NextResponse.json({ error: 'Invalid ObjectId format' }, { status: 400 });
            }

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
            const updateResult = await db.collection('gam3rs').updateOne(
                {
                    _id: myObjectID,
                    "gam3rsinfo.forums._id": forumId
                },
                {
                    $push: { "gam3rsinfo.forums.$.threads": forumPost } as any
                }
            );

            return NextResponse.json({
                message: 'Data Sent!',
                data: updateResult
            });
        }
    } catch (error) {
        console.error("Error updating forum:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await client.close();
    }
}

//export { updateForum as POST, updateForum as GET };
