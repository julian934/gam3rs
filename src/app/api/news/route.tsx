import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { connectToDB } from "@/app/lib/mongodb";
let client: MongoClient | null = null;

/*async function connectToDB() {
  if (!client) {
    client = new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`,{
      maxPoolSize:10
    });
    await client.connect();
  }
  return client.db("users");
}*/

export async function GET(request: NextRequest) {
  try {
    const db = await connectToDB();
    const collection = db.collection("gam3rs");

    const currId = new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
    const results = await collection.findOne({ _id: currId });

    if (!results || !results.gam3rsinfo) {
      return NextResponse.json({ data: "No news found" }, { status: 404 });
    }

    const newsData = results.gam3rsinfo.news || [];
    
    const defaultData = [
      {
        title: "Welcome to the Gam3r Network",
        description: "The Gam3r Network is your home for unfiltered, game-related content and the place to find your gaming community. Stay tuned for news and updates!",
        image: "The Gam3r Network",
      },
    ];

    const currRecents = Array.isArray(newsData) && newsData.length > 0 ? newsData : defaultData;

    console.log("Current Data:", currRecents);
    return NextResponse.json({ data: currRecents });
  } catch (error) {
    return NextResponse.json({ message: error?.toString() }, { status: 500 });
  }
}

//export { getNews as GET };
