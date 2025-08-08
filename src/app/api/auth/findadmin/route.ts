import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);

export async function GET(request:NextRequest){

    const currData=await request.nextUrl.searchParams;
    const username=currData?.get('username')
    const password=currData?.get('password')
    console.log('User: ', username);
    console.log('Pass: ',password);

    try {
              await client.connect();
              const usersCollection = client.db("users").collection("gam3rs");
              const targetObjectId = new ObjectId("6718571a68fdc2dc1117ebf8");
    
              // Find the document with the specified ObjectId
              const document = await usersCollection.findOne({ _id: targetObjectId });
    
              if (document && document.gam3rsinfo?.admins) {
                // Search for the user in the users array
                const foundUser = document.gam3rsinfo.admins.find(
                  (user: any) => user.username === username && user.password === password
                );
    
                if (foundUser) {
                    const result= { id: foundUser._id, name: foundUser.username };
                  return NextResponse.json({
                    message: "Data inserted successfully",
                    result: result,
                  });
                  
                } else {
                  console.log("User not found in users array");
                  return NextResponse.json({ error: "Failed to insert data" }, { status: 500 });
                }
              } else {
                console.log("Document not found or missing gam3rsinfo.users");
                return NextResponse.json({ error: "Failed to insert data" }, { status: 500 });
              }
            } catch (error){
                console.error("Error in POST request:", error);
                return NextResponse.json({ error: "Failed to insert data" }, { status: 500 });
              } finally {
              await client.close();
            }

}