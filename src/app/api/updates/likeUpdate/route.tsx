import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import axios from "axios";
import Mux from "@mux/mux-node";
import { connectToDB } from "@/app/lib/mongodb";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});


export async function POST(request: NextRequest) {
/*  const client = await new MongoClient(process.env.NEXT_PUBLIC_MONGO_DB!,{
      maxPoolSize:10
    }).connect();*/
//  const db = client.db("users");
const db=await connectToDB();
  const body = await request.json();
  // This prints the entire body, nested objects included
console.log("Full body object:", JSON.stringify(body, null, 2));

  //const { user, videos } = body;

  const myObjectID = new ObjectId(process.env.NEXT_PUBLIC_MONGO_OBJECT_ID);


  try {
    // Fetch asset from Mux


    

   /* const muxConnect = await axios.get(
      `https://api.mux.com/video/v1/assets/${currAssetID}`,
      {
        auth: {
          username: process.env.MUX_TOKEN_ID!,
          password: process.env.MUX_TOKEN_SECRET!,
        },
      }
    );*/
//console.log('curr data: ', finalAssetID)
  //  const asset = finalAssetID; 
//    const playbackId = asset?.playback_ids?.[0]?.id || null ;

   /* const dataObj = {
      user,
      fileName: asset?.passthrough,
      tags: body?.videos?.tags,
      url: latestVideo?.url,
      time: body?.videos?.time,
      views: 0,
      assetId: finalAssetID?.id,
      playbackId,
      likes:0,
      dislikes:0,
      comments:[]
    };
    console.log('Curr Data Fields: ', dataObj)*/

    // Push into user-specific videos
    /*
    const result = await db.collection("gam3rs").updateOne(
      { _id: myObjectID, "gam3rsinfo.users.username": user },
      { $push: { "gam3rsinfo.users.$.videos": dataObj } }
    );

    // Push into global videos list
    const updatedvideos = await db.collection("gam3rs").updateOne(
      { _id: myObjectID },
      { $push: { "gam3rsinfo.videos": dataObj } }
    );*/
    const updateDocument={
        $inc:{
            quantity:1
        }
    }
    const fileName=body?.data[0]?.fileName;
    console.log("Check Body: ", body)
    console.log('Check Data: ', fileName);
    const result = await db.collection("gam3rs").updateOne(
  {
    _id: myObjectID,
    "gam3rsinfo.videos.fileName": fileName, // ensure the user exists
  },
  {
    $inc: {
      "gam3rsinfo.videos.$.likes": +1, // Increases likes by 1
      
    } as any,
  }
);

if (result.matchedCount === 0) {
  return NextResponse.json(
    { message: "User not found or document does not exist" },
    { status: 404 }
  );
}

return NextResponse.json({ message: "Videos added successfully!" });


   
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Mux API error:", {
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return NextResponse.json({ message: "Error, data not added!" }, { status: 500 });
  }
}
