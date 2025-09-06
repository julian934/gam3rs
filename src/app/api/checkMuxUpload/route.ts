import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function GET(request: NextRequest) {
  const uploadId = request.nextUrl.searchParams.get("uploadId");
  if (!uploadId) {
    return NextResponse.json({ error: "No upload ID provided" }, { status: 400 });
  }

  try {
    const upload = await video.uploads.retrieve(uploadId);

    if (upload.asset_id) {
      return NextResponse.json({ status: "asset_created", assetId: upload.asset_id });
    } else {
      return NextResponse.json({ status: upload.status });
    }
  } catch (err) {
    console.error("Error fetching upload:", err);
    return NextResponse.json({ error: "Failed to fetch upload info" }, { status: 500 });
  }
}
