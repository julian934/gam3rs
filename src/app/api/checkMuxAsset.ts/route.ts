import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function GET(request: NextRequest) {
  const assetId = request.nextUrl.searchParams.get('assetId');
  if (!assetId) {
    return NextResponse.json({ error: 'No asset ID provided' }, { status: 400 });
  }

  try {
    const asset = await video.assets.retrieve(assetId); // returns the Asset object directly

    // Check the status
    if (asset.status === "ready") {
      return NextResponse.json({
        status: 'ready',
        assetId: asset.id,
        playbackIds: asset.playback_ids, // array of playback IDs
      });
    } else {
      return NextResponse.json({ status: asset.status });
    }
  } catch (err) {
    console.error('Error fetching asset:', err);
    return NextResponse.json({ error: 'Failed to fetch asset info' }, { status: 500 });
  }
}

