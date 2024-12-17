import { NextRequest, NextResponse } from "next/server";

export async function getUpcomingForums(request:NextRequest){ //Create upcoming item property on MongoDB.
    try {
        return NextResponse.json({message:"No data found!"})
    } catch (error) {
        return NextResponse.json({message:"error"},{status:500})
    }

}

export {getUpcomingForums as GET}