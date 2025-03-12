import { CldUploadWidget, CldImage } from "next-cloudinary";
import test from "node:test";
import { useState,useEffect,useContext } from "react";
import { StoreStateContext } from "@/app/lib/context/storeContext";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/database/connections";
import { useQuery } from "@tanstack/react-query";
export default function UploadWidget({testImage}:any) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageData,setImageData]=useState<any>();
  const [userData,setUserData]=useState<any>();
  const [updated,setUpdated]=useState<any>(null)
  const [currData,setCurrData]=useState<any>()
    const [dataState,setDataState]=useState<any>()
   const {data:session}=useSession();
  const ctx=useContext(StoreStateContext); 
  //const user:any=localStorage.getItem("userdata");
  //const finUserData=JSON.parse(user);
  //setUserData(ctx.getUserData);
  if(imageUrl){
    console.log(imageUrl)
  }
  //if(finUserData!=null){
    //setUserData(finUserData)
 // }
 const {data}=useQuery({
  queryKey:['dataTest', session?.user?.name],
  queryFn:async()=>{
    const userName=session?.user?.name
    if(userName){
      return getUser(userName); //Replace with actual fetch function
    }

    throw new Error("User is not logged in or username is undefined.");
  },
  initialData:null,
  enabled: !!session?.user?.name 
});

  if(userData){
    console.log(userData)
  }

   useEffect(()=>{
      if(session?.user){
       let user=session?.user?.name;
       //setUserName(user);
       //console.log(userName);
       //const currUser=getUser(userName);
       //console.log(currUser);
       //const userObj={
        //username:currUser
       //}
       //setCurrData(currUser);
        //ctx.getUser(user);
        //connectDB(userName)
      }
      if(data!=undefined){
       // setCurrData(data)
      }
      if(userData){
        setCurrData(userData)
        console.log("User data fetched:", userData)
      }
      if(data!=undefined){
        
        let currentData=data.data
       
        setDataState(currentData);
        localStorage.setItem("userdata",JSON.stringify(currentData));//Update global state to check if localStorage "get" is empty.
        localStorage.setItem("testdata",dataState);
        ctx.getUser(currentData);
        console.log(ctx.userData);
      }
     
   },[userData,data]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result) => {
          console.log("Full upload result:", result);

          if (result?.event === "success" && typeof result?.info  === "object" && result.info !== null) {
            const uploadedUrl =(result.info as { secure_url?: string }).secure_url; // ✅ Extract correct URL
            
            if (typeof uploadedUrl === "string" && uploadedUrl.trim() !== "") {
              console.log("Validated URL before setting state:", uploadedUrl);
                    //userData?.settings?.thumbnails.push(uploadedUrl);
                    const dataPoint:any=localStorage.getItem('username')
                    const user=JSON.parse(dataPoint)
                    const userObj={
                      userName:user,
                      imageURL:uploadedUrl
                    }
                    axios.post('/api/updates/userThumbNailUpdate',userObj)
              setImageUrl(uploadedUrl);
              redirect('/')
            } else {
              console.error("Invalid URL received:", uploadedUrl);
            }
            
            if (typeof uploadedUrl === "string" && uploadedUrl.trim() !== "") {
              const userObj={
                username:session?.user?.name,
                imageURL:uploadedUrl
              }
              axios.post('/api/updates/userThumbNailUpdate',{data:userObj})
        setImageUrl(uploadedUrl);
        redirect('/')
              console.log("Uploaded Image URL:", uploadedUrl);
            } else {
              console.error("Invalid URL received:", uploadedUrl);
            }
          } else {
            console.error("Unexpected upload result structure", result);
          }
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>

      {/*imageUrl && imageUrl.startsWith("http") ? (
        <CldImage
          width="300"
          height="300"
          src={imageUrl}
          alt="Uploaded Image"
          className="rounded-md"
        />
      ) : (
        <p className="text-gray-500">No image uploaded yet</p>
      )*/}
    </div>
  );
}
