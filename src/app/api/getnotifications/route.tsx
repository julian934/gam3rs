import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId ,Db} from "mongodb";
import { connectToDB } from "@/app/lib/mongodb";

let client: MongoClient | null = null;
const uri = process.env.NEXT_PUBLIC_MONGO_DB!;

// Use a global cache to persist across hot reloads and requests
/*let cached = (global as any)._mongo || { client: null, promise: null };

export async function newConnectToDB(): Promise<Db> {
  if (cached.client) {
    return cached.client.db("users");
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, {
      maxPoolSize: 10, // ✅ Prevents too many sockets
    }).then((client) => {
      console.log("✅ MongoDB connected (native driver)");
      cached.client = client;
      return client;
    });
  }

  const client = await cached.promise;
  return client.db("users");
}*/

// Save back into global object so it's reused
//(global as any)._mongo = cached;

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
   // const db = await connectToDB();
   const db=await connectToDB();
    const collection = db.collection("gam3rs");

    const currId = new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
    const results = await collection.findOne({ _id: currId });

    if (!results || !results.gam3rsinfo) {
      return NextResponse.json({ data: "No news found" }, { status: 404 });
    }

    const notificationData = results.gam3rsinfo.notifications || [];
    
    const defaultData = [
      {
        title: "Welcome to the Gam3r Network",
        description: "The Gam3r Network is your home for unfiltered, game-related content and the place to find your gaming community. Stay tuned for news and updates!",
        image: "The Gam3r Network",
      },
    ];

    const currRecents = Array.isArray(notificationData) && notificationData.length > 0 ? notificationData : defaultData;

    console.log("Current Data:", currRecents);
    return NextResponse.json({ data: currRecents });
  } catch (error) {
    return NextResponse.json({ message: error?.toString() }, { status: 500 });
  }
}