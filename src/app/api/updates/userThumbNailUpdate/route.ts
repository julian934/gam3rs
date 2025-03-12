import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import axios from "axios";

export async function UpdateThumbNails(request:NextRequest){
    const client= new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
    const currClient=await client.connect();
    const db=await currClient.db('users');
    const req=await request.json();
    console.log(req)
    const body=req

    try {
        const myObjectID=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`)
        console.log("Current Thumbnail:", body)
        const result = await db.collection('gam3rs').updateOne(
            {
                _id: myObjectID,
                "gam3rsinfo.users.username": body.userName,
            },
            {
                $push: { "gam3rsinfo.users.$.currentSettings.thumbnails": body.imageURL },//Send an object with username and user URL.
            }
        );
       console.log("Current User: ", result)
       const usersCollection=db.collection('gam3rs');
       if(result){
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
      
        return NextResponse.json({message: "Could not find User"})
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:"No data sent!!"})
}

export {UpdateThumbNails as POST}