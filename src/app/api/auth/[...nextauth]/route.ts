import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient, ObjectId } from "mongodb";

const db = new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`);

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "password123" }
      },
      async authorize(credentials) {
        try {
          await db.connect();
          const usersCollection = db.db("users").collection("gam3rs");
          const targetObjectId = new ObjectId("6718571a68fdc2dc1117ebf8");

          // Find the document with the specified ObjectId
          const document = await usersCollection.findOne({ _id: targetObjectId });

          if (document && document.gam3rsinfo?.users) {
            // Search for the user in the users array
            const foundUser = document.gam3rsinfo.users.find(
              (user: any) => user.username === credentials?.username && user.password === credentials?.password
            );

            if (foundUser) {
              return { id: foundUser._id, name: foundUser.username };
            } else {
              console.log("User not found in users array");
              return null;
            }
          } else {
            console.log("Document not found or missing gam3rsinfo.users");
            return null;
          }
        } catch (error) {
          console.error("Database error:", error);
          return null;
        } finally {
          await db.close();
        }
      }
    }),
    GoogleProvider({
      clientId: 'clientID data',
      clientSecret: 'client secret data'
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return session;
    }
  }
});

export { handler as GET, handler as POST };



