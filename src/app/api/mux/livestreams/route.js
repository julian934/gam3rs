import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({data:'Data not found!'})
}