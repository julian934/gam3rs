import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { NextApiRequest } from "next"
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/app/lib/mongodb";

export async function POST(request:NextRequest){ //Updates Mongo User Data on every request with the request body.
    //customize aggregation pipeline to accept request body object
    const body=request.json();
   /* const client = new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`,{
      maxPoolSize:10
    });*/
    const client=await connectToDB();
    const targetObjectId = new ObjectId(`${process.env.NEXT_PUBLIC_MONGO_OBJECT_ID}`);
    
    try{
      //  await client.connect();
      //  const usersCollection = await client.db("users").collection("gam3rs");
      const usersCollection=await client?.collection("gam3rs");
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
                             //currentUser
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
               currUser:"$currentUser.name",
               currThreads:"$currentUser.forumPosts"
              }
            }
          ]).toArray();
          console.log(document);//begin testing
          const currDocument=document[0]
          console.log(currDocument);
          const newDocs=await usersCollection.findOneAndUpdate(currDocument,{
            $set:{
              "currThreads ":" Inserted Data" //DOuble check and test based on return values
            }
          })
    }catch(error){
        console.log(error)
    }
    console.log(body);

   
    return NextResponse.json({message:"Test Connection"})
}

//export {UpdateUser as GET, UpdateUser as POST}