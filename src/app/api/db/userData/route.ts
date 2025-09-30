import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { connectToDB } from "@/app/lib/mongodb"

export type username={
  username:string
}
const client= new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`,{
      maxPoolSize:10
    })
export async function GET(request:NextRequest){
    
    console.log(client)
    const body:any=request
    const user=body?.username
    console.log(user)
    console.log('user info:', body, )
    const conn=await connectToDB();
    const db=await conn?.collection('gam3rs').findOne({"user.username":'jborner111@gmail.com'})
    console.log(body)
    console.log(db)
    //remove password from return object by creating a new object.
    if(db){
      return NextResponse.json({data:db?.user})
    }
      return NextResponse.json({data:'data not found'})
}

//export {handler as GET,handler as POST}