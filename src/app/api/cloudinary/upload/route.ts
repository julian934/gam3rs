import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import axios from "axios"

export async function getUpload(request:NextRequest){

 const getData=await axios.get(`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`);
 if(getData){
    console.log(getData)
 }
   
  return NextResponse.json({message:"Data could not be found."}, {status:500})
}

export {getUpload as GET}