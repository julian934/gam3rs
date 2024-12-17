import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function getPopularVideos(request:NextRequest){
    const client= await new MongoClient('mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/');
    const id=await new ObjectId('6718571a68fdc2dc1117ebf8')
    try {
        const data=await client.connect();
        const currData= await data.db('users').collection('gam3rs');
        const results=await currData.findOne({
            _id:id
        });
        if(results){
            const vidData=await results?.gam3rsinfo?.videos;
            const recents=vidData.sort((itemOne:any,itemTwo:any)=>itemOne.views-itemTwo.views);
      console.log("algo: ", recents)
      const currRecents=recents.reverse().slice(0,3);
      return NextResponse.json({data:currRecents});
      }

        return NextResponse.json({message: "Data not found"})
    } catch (error) {
        NextResponse.json({message:"Internal Server Error"}, {status:500});
    }

}

export {getPopularVideos as GET};