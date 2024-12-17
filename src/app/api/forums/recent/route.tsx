import { NextRequest, NextResponse } from "next/server";
import { MongoClient,ObjectId } from "mongodb";


export async function getRecentForums(request:NextRequest){
    const client=new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`);
    const objectID=new ObjectId("6718571a68fdc2dc1117ebf8");
   try {
    const recentClient=await client.connect();
    const currClient=await recentClient.db('users').collection('gam3rs');
    console.log(currClient)
    const results=await currClient.findOne({
        _id:objectID
    });
    console.log("results: ", results)
      if(results){
        const recents=results.gam3rsinfo.forums.sort((itemOne:any,itemTwo:any)=>itemOne.created-itemTwo.created);
        console.log("algo: ", recents)
        const currRecents=recents.reverse().slice(0,3);
        console.log("final results: ", currRecents)
        return NextResponse.json({data:currRecents});
      }
    return NextResponse.json({message:"Data not found!"});
   } catch (error) {
    return NextResponse.json({message:"Error, server-side error:"},{status:500});
   }
}

export {getRecentForums as GET}