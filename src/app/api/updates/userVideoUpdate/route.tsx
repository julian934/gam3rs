import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import axios from "axios";

export async function POST(request:NextRequest){
    const currClient=new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
    const client=await currClient.connect();
    const db=await client.db('users');
    const req=await request.json();
    const myObjectID=await new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
    const body=req
    console.log(body);
    const muxConnect=await axios.get('https://api.mux.com/video/v1/assets',{
        auth:{
            username:`${process.env.MUX_TOKEN_ID}`,
            password:`${process.env.MUX_TOKEN_SECRET}`
        }
    });
    try {
        if(muxConnect.data!=null || muxConnect.data!=undefined){
          //  console.log('Mux Data: ', muxConnect.data) //Go to uploads and change filename to
                                                       //user-defined states. 
            let currentData=muxConnect?.data?.data
            let currData=currentData.filter((val:any)=>val.passthrough=body?.currData?.fileName);
            const currUserName=body.currData.user;
            console.log( "current user name:", currUserName);
            console.log("current user data: ", currData)

            if(currData){
                let currentID=currData[0].id;
                let currentPlayBackID=currData[0].playback_ids[0]
                console.log("Current Playback ID: ", currentPlayBackID);
                //console.log("Matched Mux Object: ", currData)
                console.log("Mathched Mux ID: ", currentID); //Asset ID captured. 
              /*  const setCurrentPlaybackID=await axios.post(`https://api.mux.com/video/v1/assets/${currentID}/playback-ids`,
                    {
                        policy:"public"
                    },
                { auth:{
                    username:`${process.env.MUX_TOKEN_ID}`,
                    password:`${process.env.MUX_TOKEN_SECRET}`,
                    
                },
                  
            },).then(response=>{
                console.log(response.data.data.id)
            }).catch(error=>{
                console.log(error)
            });*/
            
           /* if(setCurrentPlaybackID!=undefined){
                console.log("Set Current Playback ID: ",setCurrentPlaybackID)
            }*/
           
               const dataObj=await {
                user:body.currData.user,
                fileName:body.currData.fileName,
                tags:body.currData.tags,
                url:body.currData.url,
                time:body.currData.time,
                views:body.currData.views,
                assetID:currentID,
                playbackID:currentPlayBackID? currentPlayBackID.id : ''//Connect to Mux and create a playbackID
               }
              console.log(dataObj)
              const result=await db.collection('gam3rs').updateOne({
                _id:myObjectID,
                "gam3rsinfo.users.username":currUserName
               },
               {
                $push:{
                    "gam3rsinfo.users.$.videos":dataObj as any
                }
               }
            )
            const updatedvideos= await db.collection('gam3rs').updateOne({
                _id:myObjectID
              },{
                  $push:{
                      "gam3rsinfo.videos":dataObj as any
                  }
              })
                 if(result && updatedvideos){
                    console.log("currentbody:", body)
                    
                      if (result.modifiedCount > 0) {
                        return NextResponse.json({ message: "Forum post added successfully!" });
                    } else {
                        return NextResponse.json(
                            { message: "User not found or no changes made." },
                            { status: 404 }
                        );
                    }
                   }
            }
            //Upload asset ID to user Videos
        }
        const currUserName=body.currData.user
        console.log(currUserName)
        const currUserVideo=await body.currData;
        console.log("current video: ", currUserVideo)
           const result=await db.collection('gam3rs').updateOne({
            _id:myObjectID,
            "gam3rsinfo.users.username":currUserName
           },
           {
            $push:{
                "gam3rsinfo.users.$.videos":currUserVideo
            }
           }
        )
        const updatedvideos= await db.collection('gam3rs').updateOne({
            _id:myObjectID
          },{
              $push:{
                  "gam3rsinfo.videos":currUserVideo as any
              }
          })
             if(result && updatedvideos){
                console.log("currentbody:", body)
                
                  if (result.modifiedCount > 0) {
                    return NextResponse.json({ message: "Forum post added successfully!" });
                } else {
                    return NextResponse.json(
                        { message: "User not found or no changes made." },
                        { status: 404 }
                    );
                }
               }
        return NextResponse.json({message:"Data not updated!"})
    } catch (error) {
        return NextResponse.json({message:"Error, data not added!"})
    }
}

//export {updateVideos as GET, updateVideos as POST}