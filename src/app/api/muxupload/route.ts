import { NextRequest, NextResponse } from 'next/server';
import Mux from '@mux/mux-node';

const {video} = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

/*
export const config = {
  api: {
    bodyParser: false,
  },
};
*/

export async function Upload(request: NextRequest) {
  try {
    // Check if request method is POST (or handle other methods if needed)
    if (request.method !== 'POST') {
      return NextResponse.json({ error: 'Invalid request method' }, { status: 405 });
    }

    // Create the direct upload URL in Mux
    const searchParams=request.nextUrl.searchParams;
    const query=searchParams.get('filename');
    const testFile=await request.json()
    console.log("testFile Data" + testFile)
    const upload = await video.uploads.create({
      cors_origin: 'localhost:3000', // Optional, set CORS as needed
      new_asset_settings: {
        playback_policy: ['public'],
        //mp4_support: 'capped-1080p',
        passthrough:`filename:${query}`
      },
    });

    // Send back the direct upload URL to the client
    return NextResponse.json({
      message: 'Upload URL created',
      uploadUrl: upload.url, // The client will upload the file directly to this URL
      assetId: upload.asset_id, // You may want to store the asset ID for future reference
    });

  } catch (error: any) {
    console.error('Error creating direct upload:', error.message);
    return NextResponse.json(
      { error: 'File upload failed', details: error.message },
      { status: 500 }
    );
  }
}

export { Upload as GET, Upload as POST };
