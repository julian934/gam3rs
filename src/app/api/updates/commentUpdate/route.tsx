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

//  const { user, videos } = body;

  const myObjectID = new ObjectId(process.env.NEXT_PUBLIC_MONGO_OBJECT_ID);
  console.log('body data: ', body);

 // currentUser:session?.user?.name,
   //   comment:commentRef?.current?.value,
     // videoData:data

      let newData={
        currentUser:body?.currentUser? body?.currentUser: 'Anonymous',
        comment:body?.comment,
        videoData:body?.videoData?.data
      }
      console.log('New Data: ', newData)

  try {
 
    const result = await db.collection("gam3rs").updateOne(
  {
    _id: myObjectID,
    "gam3rsinfo.videos.fileName": body?.videoData?.data[0]?.fileName // ensure the user exists
  },
  {
    $push: {
      "gam3rsinfo.videos.$.comments": body, // push into user's videos array
               // push into global videos array
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
