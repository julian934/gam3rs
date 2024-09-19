import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
export async function handler(request:NextRequest){
    return NextResponse.json({message:'test'})
}

export {handler as POST, handler as GET}