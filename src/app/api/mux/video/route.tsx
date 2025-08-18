import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import axios from "axios";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
export async function GET(request: NextRequest) {
    const videoID = request.nextUrl.searchParams.get('id');
    if (!videoID) {
      return NextResponse.json({ message: 'No video ID provided', status: 400 });
    }
  
    const client = new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
    try {
      await client.connect();
      const currId = new ObjectId(process.env.NEXT_PUBLIC_MONGO_OBJECT_ID);
      const userDoc = await client.db('users').collection('gam3rs').findOne({ _id: currId });
  
      if (!userDoc?.gam3rsinfo?.videos) {
        return NextResponse.json({ message: 'Videos not found', status: 404 });
      }
  
      const video = userDoc.gam3rsinfo.videos.find((v: any) => v.playbackID === videoID);
  
      if (!video) {
        return NextResponse.json({ message: 'Video not found', status: 404 });
      }
  
      return NextResponse.json({ data: video });
    } finally {
      await client.close();
    }
  }
  