import { MongoClient, Db } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGO_DB!;

let cached = (global as any)._mongo || { client: null, promise: null };

export async function connectToDB(): Promise<Db> {
  if (cached.client) {
    return cached.client.db("users");
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, {
      maxPoolSize: 10,
    }).then((client) => {
      console.log("✅ MongoDB connected");
      cached.client = client;
      return client;
    });
  }

  const client = await cached.promise;
  return client.db("users");
}

(global as any)._mongo = cached;
