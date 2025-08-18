import { NextRequest, NextResponse } from 'next/server';
import Mux from '@mux/mux-node';
import { MongoClient } from 'mongodb';
const { video } = new Mux({
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

export async function POST(request: NextRequest) {//update backend with body data from front-end.
  const client = new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
  try {
    if (request.method !== 'POST') {
      return NextResponse.json({ error: 'Invalid request method' }, { status: 405 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get('filename');
    const testFile=await request.json()
    console.log("testFile Data" + testFile)
    console.log(testFile?.filename)
    console.log(testFile?.data)
   
    const upload = await video.uploads.create({
      cors_origin: `${process.env.NEXT_PUBLIC_APP_URL}/testUploadRedux`, // Replace '*' with your actual frontend URL
      new_asset_settings: {
        playback_policy: ['public'],
        passthrough: `filename:${testFile?.filename}`,
      },
    });
     //Create a playback id and store playback ID in personal user database, and all site video database as well.
     console.log("Current Upload Obj: ", upload)
     console.log('Current Asset ID: ', upload.asset_id);
     
    return NextResponse.json({
      message: 'Upload URL created',
      uploadUrl: upload.url,
      assetId: upload.asset_id,
    });

  } catch (error) {
    console.error('Error creating direct upload:', error);
    return NextResponse.json(
      { error: 'File upload failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}

//export { Upload as GET, Upload as POST };
