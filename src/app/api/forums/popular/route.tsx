import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function getPopularForums(request:NextRequest){ 
    //Filter based on forum thread count. 
    const currClient=new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`);
    const objectID=new ObjectId('6718571a68fdc2dc1117ebf8');
   
    try {
        const client=await currClient.connect();
        const db=await client.db('users').collection('gam3rs');
        const result=await db.findOne({
            _id:objectID
        });
        if(result){
            const currPop=result.gam3rsinfo.forums;
            console.log("forums: ",currPop);
            const sortedForums=currPop.sort((firstItem:any,secondItem:any)=>firstItem.threads.length-secondItem.threads.length);
            console.log("Sorted: ", sortedForums);
            const popularForums=sortedForums.reverse().slice(0,3);
            console.log("Popular: ", popularForums);
            return NextResponse.json({data:popularForums})
        }
       
        return NextResponse.json({message:"Unable to fetch data!"})
    } catch (error) {
        return NextResponse.json({message:"Error, server error!"}, {status:500})
    }
}

export {getPopularForums as GET}