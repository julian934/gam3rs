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

        const body=request.nextUrl.searchParams;
        const currentUser=await body.get('user');
        console.log(currentUser)
        console.log('User name:' + currentUser)
       console.log("current Data " + body)
        await db.connect();
        const usersCollection = await db.db("users").collection("gam3rs");
        const targetObjectId = new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);

        // Find the document with the specified ObjectId
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
                        $eq: [
                          "$$users.username",
                           currentUser
                        ]
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
              testUser:{
                testData:`${currentUser}`
              },
              wishlist:"$currentUser.wishlistItems",
              cart:"$currentUser.cartItems",
              settings:"$currentUser.currentSettings",
              videos:"$currentUser.videos",
              livestreams:"$currentUser.livestreams",
              forumPosts:"$currentUser.forumPosts"
            }
          }
        ]).toArray();
        console.log(document)
        if (document) {
          // Search for the user in the users array
          const currentUser=body.get('user');
          
          console.log("Current User " + body)
          /* const foundUser = document.gam3rsinfo.users.aggregate({
            _id: targetObjectId,
          "users.username":currentUser
          }); */

          // ** Try setting the document itself to array, then try setting the returned findOne value to an array.
         const foundUser=await document
         console.log("test data: ", foundUser[0])
         //const testUser=await usersCollection.findOne(document);
         
         //console.log("Test Data: " + testUser)
         console.log("CurrData: " + foundUser )
           console.log("current Data " + foundUser)
         if(!document || !document[0].currentUser){
          console.log("User not found in users array or document missing.");
      return NextResponse.json({ message: "User not found in users array." });
         }
         console.log("Found user:", document[0].currentUser);
    return NextResponse.json({ data: document[0] });
      }
     } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({message: "Internal server error."});
      } 
    return NextResponse.json({message:'Data'})
}

//export {getCurrentUser as GET}