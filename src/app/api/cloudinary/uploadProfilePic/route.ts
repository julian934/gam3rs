import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function uploadProfilePic(request:NextRequest){
    const body=request.json();

    return NextResponse.json({message:'Could not connect to database!'},{status:500})

}

export {uploadProfilePic as GET}