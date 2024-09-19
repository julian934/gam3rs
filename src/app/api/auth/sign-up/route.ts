import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export async function handler(request:NextRequest){
   return NextResponse.json({message:'test'})
}

export {handler as GET,handler as POST}