import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function getUpcomingVids(request:NextRequest){
    const client=await new MongoClient('mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/');
    const id=await new ObjectId('6718571a68fdc2dc1117ebf8');
    try {
        const currClient= await client.connect();
         const result=await currClient.db('users').collection('gam3rs').findOne({
            _id:id
         })
         if(result){
            const upcoming=await result.gam3rsinfo.upcoming //create object property on gam3rsinfo for upcoming videos. 
            
            return NextResponse.json({data:upcoming})
         }
        NextResponse.json({message:"Data not found!"})
    } catch (error) {
        return NextResponse.json({message:" Internal Server Errror!"},{status:500})
    }

}

export {getUpcomingVids as GET}