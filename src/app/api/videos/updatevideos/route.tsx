import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request:NextRequest){
    const client= await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
    const gam3rObjID=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
    try {
        const currClient=await client.connect();
        const reqData=await request.json();
       
        const videoData= await reqData.currData;
        console.log("Current Video Data: ", videoData);
        const db=await currClient.db('users');
        if(currClient){ 
            const results=await db.collection('gam3rs').updateOne({
              _id:gam3rObjID
            },{
                $push:{
                    "gam3rsinfo.videos":videoData as any
                }
            })
            console.log("Returned Data: ", results);
            return NextResponse.json({data:results});
        }
        return NextResponse.json({message: "No Connection!"});
    } catch (error) {
        return NextResponse.json({message: "No Data!"}, {status:500});
    }

}

//export {updateVideos as GET,updateVideos as POST}