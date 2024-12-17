import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function updateVideos(request:NextRequest){
    const currClient=new MongoClient("mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/");
    const client=await currClient.connect();
    const db=await client.db('users');
    const req=await request.json();
    const myObjectID=await new ObjectId('6718571a68fdc2dc1117ebf8');
    const body=req
    console.log(body);
    try {
        const currUserName=body.currData.user
        console.log(currUserName)
        const currUserVideo=await body.currData;
        console.log(currUserVideo)
           const result=await db.collection('gam3rs').updateOne({
            _id:myObjectID,
            "gam3rsinfo.users.username":currUserName
           },
           {
            $push:{
                "gam3rsinfo.users.$.videos":currUserVideo
            }
           }
        )
        const updatedvideos= await db.collection('gam3rs').updateOne({
            _id:myObjectID
          },{
              $push:{
                  "gam3rsinfo.videos":currUserVideo as any
              }
          })
             if(result && updatedvideos){
                console.log("currentbody:", body)
                
                  if (result.modifiedCount > 0) {
                    return NextResponse.json({ message: "Forum post added successfully!" });
                } else {
                    return NextResponse.json(
                        { message: "User not found or no changes made." },
                        { status: 404 }
                    );
                }
               }
        return NextResponse.json({message:"Data not updated!"})
    } catch (error) {
        return NextResponse.json({message:"Error, data not added!"})
    }
}

export {updateVideos as GET, updateVideos as POST}