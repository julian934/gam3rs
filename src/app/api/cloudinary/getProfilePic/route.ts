import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function getProfilePic(request:NextRequest){

    return NextResponse.json({message:"Data not found"}, {status:500})
}

export {getProfilePic as GET}