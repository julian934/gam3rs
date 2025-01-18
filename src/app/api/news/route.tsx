import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
 

export async function getNews(request:NextRequest){
    const currClient=new MongoClient("mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/");
    const client=await currClient.connect();
    const db=await client.db('users');
    const req=await request.json();
    const myObjectID=await new ObjectId('6718571a68fdc2dc1117ebf8');
    const body=req;
    console.log(body);
    if(req){

        return NextResponse.json({data:''})
    }
   
    return NextResponse.json({data:"Could not connect to database!"})
}

export {getNews as GET}