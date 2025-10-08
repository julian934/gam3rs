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

  const { user, videos } = body;

  const myObjectID = new ObjectId(process.env.NEXT_PUBLIC_MONGO_OBJECT_ID);

  const latestVideo = videos[videos.length - 1];
//  const currAssetID = latestVideo?.assetID // fix casing
console.log('Current Upload ID: ', latestVideo?.videos?.uploadID)
  const currAssetID = await video.uploads.retrieve(body?.videos?.uploadID); 
  console.log('Current Asset Info: ', currAssetID)
  if (!currAssetID?.asset_id) {
  return NextResponse.json({ message: "Asset not created yet" }, { status: 400 });
}
   const finalAssetID=await video.assets.retrieve(currAssetID?.asset_id) 
   console.log('Curr Upload: ', currAssetID)
   console.log('Current Asset ID: ', finalAssetID)
  console.log('Curr Data: ', currAssetID)
   const assetId = await finalAssetID as any
  const asset=await finalAssetID
 // console.log('Curr Item Data: ', latestVideo?.newUpload)
//console.log("Fetching Mux asset at URL:", `https://api.mux.com/video/v1/assets/${currAssetID && currAssetID?.asset_id}`);
  try {
    // Fetch asset from Mux
    if (!currAssetID) {
  console.error("No asset ID found for latest video", latestVideo);
  return NextResponse.json(
    { message: "No asset ID provided" },
    { status: 400 }
  );
}

    

   /* const muxConnect = await axios.get(
      `https://api.mux.com/video/v1/assets/${currAssetID}`,
      {
        auth: {
          username: process.env.MUX_TOKEN_ID!,
          password: process.env.MUX_TOKEN_SECRET!,
        },
      }
    );*/
console.log('curr data: ', finalAssetID)
    const asset = finalAssetID; 
    const playbackId = asset?.playback_ids?.[0]?.id || null ;

    const dataObj = {
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
    console.log('Curr Data Fields: ', dataObj)

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
    const result = await db.collection("gam3rs").updateOne(
  {
    _id: myObjectID,
    "gam3rsinfo.users.username": user, // ensure the user exists
  },
  {
    $push: {
      "gam3rsinfo.users.$.videos": dataObj, // push into user's videos array
      "gam3rsinfo.videos": dataObj,         // push into global videos array
      "gam3rsinfo.notifications":dataObj    //push into global notifications array
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
