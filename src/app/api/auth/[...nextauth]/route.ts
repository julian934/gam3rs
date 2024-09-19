import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { MongoClient, ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

//This is a catch-all route, so it will receive any data passed to the auth folder at all. 
//Access database for authorized users and passs the information here. If valid, session will be created and token will be given.
const db=new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`) //MongoDB Integration

const handler = NextAuth({
    
    providers:[
        CredentialsProvider({ // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "email", type: "text",placeholder:'password123' }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              const user={id:'1',name:'jsmith', email:'password123'}
              console.log("User credentials: ", credentials?.username,credentials?.password)
              const conn=await db.connect();
              console.log(conn)
              const coll=await conn?.db('users')?.collection('gam3rs').findOne(); //Found Data!
              //testData

              const test=await conn?.db('users')?.collection('gam3rs')?.findOne({"user.username":credentials?.username,"user.password":credentials?.password}) //convert to json. 
              /*Returned data: 
                Data found: {
  _id: new ObjectId('66bc021f3527a12918f3f089'),
  user: {
    username: 'johnsmith@gmail.com',
    password: 'johnsmith111',
    wishlistItems: [],
    cartItems: [],
    currentSettings: []
  }
}
              */
             
             console.log("Request Data: ", req?.query?.user, req?.query?.email, req?.query)
             console.log("Entered Data: ",credentials?.username, credentials?.password)
             const userData=await {
              username:test?.user?.username,
              wishList:test?.user?.wishlistItems,
              cartItems:test?.user?.cartItems,
              currentSettings:test?.user?.currentSettings
             }
             const testUser=await{
              name:test?.user?.username
             }
              console.log("Data found:",test)
              console.log("Returned Data:", userData)
              console.log("Test User:", test)
              //query data within mongodb
              const newUserData=await {
                id:test?.user?._id,
                name:test?.user?.username,
                email:test?.user?.email
              }

              if(test){
                   let user=testUser
                return user
              }else{
                return null
              }
                
             
           
              const res=await fetch('/testAuth/',{
                method:'GET',body:JSON.stringify(credentials),
                headers:{"Content-Type":"application/json"}
              })
                
              const currUser=await res.json();
              if(res){
                return currUser
              }else{
                return {error:'no connection'}
              }
             // const conn=await db.connect();
              //console.log(conn)
              //const coll=await conn?.db('users')?.collection('gam3rs');
              //console.log(coll)
              //const users=await coll.findOne({username:req?.query?.username});
              //console.log(users)
             
              //const user = { id: "1", name: "jsmith", password: "jsmith500" }
                 let userName=credentials?.username;
                 console.log(userName);
                
                 let passWord=credentials?.password;
                 console.log(passWord)
               db.close()  
              
              if (req) {
                // Any object returned will be saved in `user` property of the JWT
                return req
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
                
            }}),
        GoogleProvider({
            clientId:'clientID data',
            clientSecret:'client secret data',
        })
    ],
    callbacks:{
        async session({session,token,user}){
             //Set user image and email.
            return session
        }
    },
   
})

export {handler as GET, handler as POST}

