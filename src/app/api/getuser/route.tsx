import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const db = new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);

export async function GET(request:NextRequest){
    
    try {

      const searchParams = request.nextUrl.searchParams;
      const currentUser = searchParams.get("user");
      
      console.log("Current User:", currentUser);
  
      if (!currentUser) {
        return NextResponse.json({ message: "User parameter missing." }, { status: 400 });
      }
  
      // Connect to the database
      await db.connect();
      const usersCollection = db.db("users").collection("gam3rs");
      const targetObjectId = new ObjectId(process.env.NEXT_PUBLIC_MONGO_OBJECT_ID || "");
  
      // Aggregate query for finding the user and their data
      const document = await usersCollection.aggregate([
        {
          "$match": {
            _id: targetObjectId
          }
        },
        {
          $project: {
            currentUser: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$gam3rsinfo.users",
                    as: "users",
                    cond: {
                      $eq: ["$$users.username", currentUser]
                    }
                  }
                },
                0
              ]
            }
          }
        },
        {
          $project: {
            currentUser: {
              userName: "$currentUser.username",
            },
            wishlist: "$currentUser.wishlistItems",
            cart: "$currentUser.cartItems",
            settings: "$currentUser.currentSettings",
            videos: "$currentUser.videos",
            livestreams: "$currentUser.livestreams",
            forumPosts: "$currentUser.forumPosts"
          }
        }
      ]).toArray();
  
      console.log("Document found:", document);
  
      if (!document || !document[0]?.currentUser) {
        return NextResponse.json({ message: "User not found in users array." });
      }
  
      return NextResponse.json({ data: document[0] });
     } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({message: "Internal server error."});
      } 
    return NextResponse.json({message:'Data'})
}

//export {getCurrentUser as GET}