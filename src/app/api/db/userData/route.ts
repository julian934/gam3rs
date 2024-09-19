import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export type username={
  username:string
}
const client= new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`)
export async function handler(request:NextRequest){
    
    console.log(client)
    const body:any=request
    const user=body?.username
    console.log(user)
    console.log('user info:', body, )
    const conn=await client.connect()
    const db=await conn?.db('users')?.collection('gam3rs').findOne({"user.username":'jborner111@gmail.com'})
    console.log(body)
    console.log(db)
    //remove password from return object by creating a new object.
    if(db){
      return NextResponse.json({data:db?.user})
    }
      return NextResponse.json({data:'data not found'})
}

export {handler as GET,handler as POST}